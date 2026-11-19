import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_PROGRESS_STATE,
  addXpToState,
  calculateLevelInfo,
  parseStoredProgress,
  recordQuizScoreState,
  saveNoteState,
  toggleBookmarkState,
  toggleMasteredHadithState,
} from './progress';

test('calculateLevelInfo starts at level 1 and scales across thresholds', () => {
  const lvl1 = calculateLevelInfo(0);
  assert.equal(lvl1.level, 1);
  assert.equal(lvl1.progressPercent, 0);

  const midLvl1 = calculateLevelInfo(50);
  assert.equal(midLvl1.level, 1);
  assert.equal(midLvl1.progressPercent, 50);

  const lvl2 = calculateLevelInfo(100);
  assert.equal(lvl2.level, 2);
  assert.equal(lvl2.nextLevelXp, 250);

  const maxLvl = calculateLevelInfo(2000);
  assert.equal(maxLvl.level, 6);
  assert.equal(maxLvl.progressPercent, 100);
});

test('addXpToState ignores negative/non-finite inputs and adds positive XP', () => {
  const s1 = addXpToState(INITIAL_PROGRESS_STATE, 40);
  assert.equal(s1.xp, 40);
  const s2 = addXpToState(s1, -15);
  assert.equal(s2.xp, 40);
});

test('toggleMasteredHadithState toggles valid hadith numbers (1..8) and awards XP once', () => {
  const s1 = toggleMasteredHadithState(INITIAL_PROGRESS_STATE, 3);
  assert.deepEqual(s1.masteredHadiths, [3]);
  assert.equal(s1.xp, 25);

  const s2 = toggleMasteredHadithState(s1, 1);
  assert.deepEqual(s2.masteredHadiths, [1, 3]);
  assert.equal(s2.xp, 50);

  const s3 = toggleMasteredHadithState(s2, 3);
  assert.deepEqual(s3.masteredHadiths, [1]);

  const invalid = toggleMasteredHadithState(s3, 9);
  assert.deepEqual(invalid.masteredHadiths, [1]);
});

test('toggleBookmarkState and saveNoteState mutate immutably and clean empty notes', () => {
  const bookmark = {
    id: 'hadith-3',
    type: 'hadith' as const,
    title: { tr: 'Hadis 3', fr: 'Hadith 3' },
    route: 'hadisler' as const,
    createdAt: '2026-11-19T00:00:00Z',
  };
  const withBm = toggleBookmarkState(INITIAL_PROGRESS_STATE, bookmark);
  assert.equal(withBm.bookmarks.length, 1);
  const withoutBm = toggleBookmarkState(withBm, bookmark);
  assert.equal(withoutBm.bookmarks.length, 0);

  const withNote = saveNoteState(INITIAL_PROGRESS_STATE, 'hadith-3', 'Hz. Ömer teravih cemaati');
  assert.equal(withNote.notes['hadith-3'], 'Hz. Ömer teravih cemaati');
  const clearedNote = saveNoteState(withNote, 'hadith-3', '   ');
  assert.equal(clearedNote.notes['hadith-3'], undefined);
});

test('recordQuizScoreState records score and grants XP', () => {
  const updated = recordQuizScoreState(INITIAL_PROGRESS_STATE, {
    id: 'q1',
    category: 'Hadis Metinleri',
    score: 8,
    total: 10,
    dateIso: '2026-11-19T00:00:00Z',
  });
  assert.equal(updated.quizScores.length, 1);
  assert.equal(updated.xp, 80);
});

test('parseStoredProgress safely handles malformed JSON and invalid hadith IDs', () => {
  assert.deepEqual(parseStoredProgress(null), INITIAL_PROGRESS_STATE);
  assert.deepEqual(parseStoredProgress('{broken json'), INITIAL_PROGRESS_STATE);
  const parsed = parseStoredProgress(
    JSON.stringify({ xp: 120, masteredHadiths: [1, 8, 99, -2], notes: { a: 'b' } })
  );
  assert.equal(parsed.xp, 120);
  assert.deepEqual(parsed.masteredHadiths, [1, 8]);
  assert.equal(parsed.notes.a, 'b');
});
