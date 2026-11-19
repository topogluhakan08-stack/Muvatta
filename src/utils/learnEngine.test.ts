import assert from 'node:assert/strict';
import test from 'node:test';
import {
  FLASHCARD_DECKS,
  QUIZ_CATEGORIES,
  QUIZ_QUESTIONS,
  SRS_FLASHCARDS,
} from '../data/learnData';
import {
  buildQuizSession,
  computeCategoryMastery,
  filterFlashcardsByDeck,
  getFlashcardDeckSummary,
  gradeQuizSession,
  sortFlashcardsForStudy,
} from './learnEngine';
import {
  INITIAL_PROGRESS_STATE,
  parseStoredProgress,
  recordWrongQuestionsState,
  reviewFlashcardState,
} from './progress';

test('QUIZ_QUESTIONS contains 54 unique bilingual questions across all 6 categories (9 per category)', () => {
  assert.equal(QUIZ_CATEGORIES.length, 6);
  assert.equal(QUIZ_QUESTIONS.length, 54);

  const ids = new Set(QUIZ_QUESTIONS.map((q) => q.id));
  assert.equal(ids.size, QUIZ_QUESTIONS.length, 'Question IDs must be unique');

  for (const cat of QUIZ_CATEGORIES) {
    const count = QUIZ_QUESTIONS.filter((q) => q.category === cat.id).length;
    assert.equal(count, 9, `Category ${cat.id} should have exactly 9 questions`);
  }

  for (const q of QUIZ_QUESTIONS) {
    assert.ok(q.question.tr.trim().length > 10, `Missing TR question for ${q.id}`);
    assert.ok(q.question.fr.trim().length > 10, `Missing FR question for ${q.id}`);
    assert.equal(q.options.length, 4, `Question ${q.id} must have 4 options`);
    assert.ok(q.correctIndex >= 0 && q.correctIndex <= 3);
    assert.ok(q.explanation.tr.trim().length > 10);
    assert.ok(q.explanation.fr.trim().length > 10);
    for (const opt of q.options) {
      assert.ok(opt.tr.trim().length > 0 && opt.fr.trim().length > 0);
    }
  }
});

test('SRS_FLASHCARDS contains 32 unique bilingual flashcards across all 4 decks', () => {
  assert.equal(FLASHCARD_DECKS.length, 4);
  assert.equal(SRS_FLASHCARDS.length, 32);

  const ids = new Set(SRS_FLASHCARDS.map((c) => c.id));
  assert.equal(ids.size, SRS_FLASHCARDS.length, 'Flashcard IDs must be unique');

  for (const deck of FLASHCARD_DECKS) {
    const cards = filterFlashcardsByDeck(SRS_FLASHCARDS, deck.id);
    assert.ok(cards.length >= 7, `Deck ${deck.id} should have at least 7 cards`);
  }
});

test('buildQuizSession filters by category, wrongOnly, limit, and deterministic shuffle', () => {
  const hadisOnly = buildQuizSession(QUIZ_QUESTIONS, { category: 'hadis-metin', limit: 5 });
  assert.equal(hadisOnly.length, 5);
  assert.ok(hadisOnly.every((q) => q.category === 'hadis-metin'));

  const wrongOnly = buildQuizSession(QUIZ_QUESTIONS, {
    category: 'all',
    wrongOnly: true,
    wrongQuestionIds: ['q-im-1', 'q-hd-3', 'q-lg-1'],
  });
  assert.deepEqual(
    wrongOnly.map((q) => q.id),
    ['q-im-1', 'q-hd-3', 'q-lg-1']
  );

  const s1 = buildQuizSession(QUIZ_QUESTIONS, { category: 'all', limit: 20, shuffle: true, seed: 42 });
  const s2 = buildQuizSession(QUIZ_QUESTIONS, { category: 'all', limit: 20, shuffle: true, seed: 42 });
  assert.deepEqual(
    s1.map((q) => q.id),
    s2.map((q) => q.id)
  );
  assert.deepEqual(
    s1.map((q) => q.correctIndex),
    s2.map((q) => q.correctIndex)
  );

  // Shuffled options must preserve exact correct answer text and vary correctIndex across A-D
  const distinctIndices = new Set(s1.map((q) => q.correctIndex));
  assert.ok(distinctIndices.size >= 3, 'Shuffled quiz should distribute correct answers across A-D');
  for (const shuffledQ of s1) {
    const orig = QUIZ_QUESTIONS.find((q) => q.id === shuffledQ.id)!;
    assert.equal(
      shuffledQ.options[shuffledQ.correctIndex].tr,
      orig.options[orig.correctIndex].tr,
      `Correct answer text must be preserved after shuffling options for ${shuffledQ.id}`
    );
  }
});

test('gradeQuizSession and recordWrongQuestionsState track misses and clear corrected items', () => {
  const subset = QUIZ_QUESTIONS.slice(0, 4);
  const answers: Record<string, number> = {
    [subset[0].id]: subset[0].correctIndex,
    [subset[1].id]: (subset[1].correctIndex + 1) % 4, // wrong
    [subset[2].id]: subset[2].correctIndex,
    [subset[3].id]: (subset[3].correctIndex + 2) % 4, // wrong
  };

  const graded = gradeQuizSession(subset, answers);
  assert.equal(graded.score, 2);
  assert.equal(graded.total, 4);
  assert.equal(graded.percentage, 50);
  assert.equal(graded.xpEarned, 20);
  assert.deepEqual(graded.wrongIds, [subset[1].id, subset[3].id]);

  let progress = recordWrongQuestionsState(INITIAL_PROGRESS_STATE, graded.wrongIds, graded.correctIds);
  assert.deepEqual(progress.wrongQuestionIds, [subset[1].id, subset[3].id]);

  // Later answering subset[1] correctly removes it from wrong pool
  progress = recordWrongQuestionsState(progress, [], [subset[1].id]);
  assert.deepEqual(progress.wrongQuestionIds, [subset[3].id]);
});

test('SRS reviewFlashcardState schedules intervals, awards XP, and sortFlashcardsForStudy prioritizes due cards', () => {
  const now = '2026-11-19T12:00:00.000Z';
  let state = INITIAL_PROGRESS_STATE;

  // Rate card 1 as 'easy' -> box 2, due in 5 days
  state = reviewFlashcardState(state, 'fc-lug-1', 'easy', now);
  assert.equal(state.flashcardProgress['fc-lug-1'].box, 2);
  assert.equal(state.flashcardProgress['fc-lug-1'].intervalDays, 5);
  assert.equal(state.xp, 6);

  // Rate card 1 'easy' again -> box 4 (mastered), due in 30 days
  state = reviewFlashcardState(state, 'fc-lug-1', 'easy', now);
  assert.equal(state.flashcardProgress['fc-lug-1'].box, 4);
  assert.equal(state.xp, 16);

  // Rate card 2 as 'again' -> box 0, due immediately
  state = reviewFlashcardState(state, 'fc-lug-2', 'again', now);
  assert.equal(state.flashcardProgress['fc-lug-2'].box, 0);
  assert.equal(state.flashcardProgress['fc-lug-2'].intervalDays, 0);

  const summary = getFlashcardDeckSummary(SRS_FLASHCARDS, state.flashcardProgress, now);
  assert.equal(summary.total, 32);
  assert.equal(summary.mastered, 1);
  assert.equal(summary.learning, 1);
  assert.equal(summary.newCount, 30);
  assert.equal(summary.dueNow, 31); // all except fc-lug-1 which is due in 30 days

  const sorted = sortFlashcardsForStudy(SRS_FLASHCARDS.slice(0, 3), state.flashcardProgress, now);
  assert.equal(sorted[0].id, 'fc-lug-2'); // due & box 0 first
  assert.equal(sorted[2].id, 'fc-lug-1'); // not due goes last

  // Persisted storage backward-compatibility check
  const parsed = parseStoredProgress(JSON.stringify(state));
  assert.equal(parsed.flashcardProgress['fc-lug-1'].box, 4);
});

test('computeCategoryMastery aggregates scores and open wrong questions per category', () => {
  const mastery = computeCategoryMastery(
    QUIZ_QUESTIONS,
    ['q-im-1', 'q-im-2'],
    [{ id: 'r1', category: 'imam-malik', score: 7, total: 9, dateIso: '2026-11-19T12:00:00.000Z' }]
  );
  assert.equal(mastery.length, 6);
  const im = mastery.find((m) => m.category === 'imam-malik');
  assert.ok(im);
  assert.equal(im.totalQuestions, 9);
  assert.equal(im.wrongCount, 2);
  assert.equal(im.bestPercentage, 78);
});
