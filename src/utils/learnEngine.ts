import type { FlashcardSrsState, QuizScoreRecord } from '../types/atlas';
import type {
  FlashcardDeckId,
  QuizCategoryId,
  QuizQuestion,
  SrsFlashcard,
} from '../data/learnData';
import { QUIZ_CATEGORIES } from '../data/learnData';

export interface QuizSessionOptions {
  category: QuizCategoryId | 'all';
  wrongOnly?: boolean;
  wrongQuestionIds?: string[];
  limit?: number | 'all';
  shuffle?: boolean;
  seed?: number;
}

export interface QuizGradeResult {
  score: number;
  total: number;
  percentage: number;
  correctIds: string[];
  wrongIds: string[];
  xpEarned: number;
}

export interface FlashcardDeckSummary {
  total: number;
  dueNow: number;
  newCount: number;
  learning: number;
  mastered: number;
}

export interface CategoryMasteryStat {
  category: QuizCategoryId;
  totalQuestions: number;
  wrongCount: number;
  attempts: number;
  bestPercentage: number | null;
  readinessPercent: number;
}

/** Deterministic PRNG (Mulberry32) for reproducible tests and optional shuffling */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffleItems<T>(items: readonly T[], seed?: number): T[] {
  const copy = [...items];
  const rand = typeof seed === 'number' ? mulberry32(seed) : Math.random;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function shuffleQuestionOptions(
  question: QuizQuestion,
  rand: () => number
): QuizQuestion {
  const indexed = question.options.map((opt, idx) => ({
    opt,
    isCorrect: idx === question.correctIndex,
  }));

  for (let i = indexed.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }

  const nextCorrectIndex = indexed.findIndex((item) => item.isCorrect) as 0 | 1 | 2 | 3;

  return {
    ...question,
    options: [indexed[0].opt, indexed[1].opt, indexed[2].opt, indexed[3].opt],
    correctIndex: nextCorrectIndex,
  };
}

export function buildQuizSession(
  allQuestions: readonly QuizQuestion[],
  options: QuizSessionOptions
): QuizQuestion[] {
  const wrongSet = new Set(options.wrongQuestionIds ?? []);

  let pool = allQuestions.filter((q) => {
    if (options.wrongOnly && !wrongSet.has(q.id)) return false;
    if (options.category !== 'all' && q.category !== options.category) return false;
    return true;
  });

  if (options.shuffle) {
    const rand = typeof options.seed === 'number' ? mulberry32(options.seed) : Math.random;
    pool = shuffleItems(pool, options.seed).map((q) => shuffleQuestionOptions(q, rand));
  }

  if (options.limit && options.limit !== 'all' && options.limit > 0) {
    pool = pool.slice(0, options.limit);
  }

  return pool;
}

export function gradeQuizSession(
  questions: readonly QuizQuestion[],
  answers: Readonly<Record<string, number>>
): QuizGradeResult {
  const correctIds: string[] = [];
  const wrongIds: string[] = [];

  for (const q of questions) {
    const chosen = answers[q.id];
    if (chosen === q.correctIndex) {
      correctIds.push(q.id);
    } else {
      wrongIds.push(q.id);
    }
  }

  const total = questions.length;
  const score = correctIds.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const xpEarned = total > 0 ? Math.max(5, score * 10) : 0;

  return {
    score,
    total,
    percentage,
    correctIds,
    wrongIds,
    xpEarned,
  };
}

export function isFlashcardDue(
  srs: FlashcardSrsState | undefined,
  nowIso: string = new Date().toISOString()
): boolean {
  if (!srs) return true;
  const dueMs = Date.parse(srs.dueAtIso);
  const nowMs = Date.parse(nowIso);
  if (!Number.isFinite(dueMs) || !Number.isFinite(nowMs)) return true;
  return dueMs <= nowMs;
}

export function filterFlashcardsByDeck(
  cards: readonly SrsFlashcard[],
  deck: FlashcardDeckId | 'all'
): SrsFlashcard[] {
  if (deck === 'all') return [...cards];
  return cards.filter((c) => c.deck === deck);
}

export function getFlashcardDeckSummary(
  cards: readonly SrsFlashcard[],
  srsMap: Readonly<Record<string, FlashcardSrsState>>,
  nowIso: string = new Date().toISOString()
): FlashcardDeckSummary {
  let dueNow = 0;
  let newCount = 0;
  let learning = 0;
  let mastered = 0;

  for (const card of cards) {
    const state = srsMap[card.id];
    if (!state) {
      newCount += 1;
      dueNow += 1;
    } else {
      if (isFlashcardDue(state, nowIso)) {
        dueNow += 1;
      }
      if (state.box >= 3) {
        mastered += 1;
      } else {
        learning += 1;
      }
    }
  }

  return {
    total: cards.length,
    dueNow,
    newCount,
    learning,
    mastered,
  };
}

/** Sorts due cards first (lowest SRS box first, then new cards, then scheduled future cards). */
export function sortFlashcardsForStudy(
  cards: readonly SrsFlashcard[],
  srsMap: Readonly<Record<string, FlashcardSrsState>>,
  nowIso: string = new Date().toISOString()
): SrsFlashcard[] {
  return [...cards].sort((a, b) => {
    const sa = srsMap[a.id];
    const sb = srsMap[b.id];
    const dueA = isFlashcardDue(sa, nowIso) ? 0 : 1;
    const dueB = isFlashcardDue(sb, nowIso) ? 0 : 1;
    if (dueA !== dueB) return dueA - dueB;

    const boxA = sa ? sa.box : 0.5;
    const boxB = sb ? sb.box : 0.5;
    if (boxA !== boxB) return boxA - boxB;

    return a.id.localeCompare(b.id);
  });
}

export function computeCategoryMastery(
  allQuestions: readonly QuizQuestion[],
  wrongQuestionIds: readonly string[],
  quizScores: readonly QuizScoreRecord[]
): CategoryMasteryStat[] {
  const wrongSet = new Set(wrongQuestionIds);

  return QUIZ_CATEGORIES.map((cat) => {
    const catQuestions = allQuestions.filter((q) => q.category === cat.id);
    const totalQuestions = catQuestions.length;
    const wrongCount = catQuestions.filter((q) => wrongSet.has(q.id)).length;
    const matchingScores = quizScores.filter((s) => s.category === cat.id);
    const attempts = matchingScores.length;
    const bestPercentage =
      attempts > 0
        ? Math.max(
            ...matchingScores.map((s) => (s.total > 0 ? Math.round((s.score / s.total) * 100) : 0))
          )
        : null;

    // Readiness combines best category score (if attempted) and absence of open wrong questions
    const cleanRatio = totalQuestions > 0 ? (totalQuestions - wrongCount) / totalQuestions : 1;
    const readinessPercent =
      bestPercentage !== null
        ? Math.round(bestPercentage * 0.7 + cleanRatio * 100 * 0.3)
        : Math.round(cleanRatio * 20);

    return {
      category: cat.id,
      totalQuestions,
      wrongCount,
      attempts,
      bestPercentage,
      readinessPercent,
    };
  });
}
