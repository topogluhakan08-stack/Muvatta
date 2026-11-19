import type {
  BookmarkItem,
  FlashcardSrsRating,
  FlashcardSrsState,
  LevelInfo,
  ProgressState,
  QuizScoreRecord,
} from '../types/atlas';

export const PROGRESS_STORAGE_KEY = 'muvatta_atlas_progress_v1';

export const INITIAL_PROGRESS_STATE: ProgressState = {
  xp: 0,
  masteredHadiths: [],
  quizScores: [],
  bookmarks: [],
  notes: {},
  wrongQuestionIds: [],
  flashcardProgress: {},
};

interface LevelThreshold {
  level: number;
  minXp: number;
  title: { tr: string; fr: string };
}

export const LEVEL_THRESHOLDS: LevelThreshold[] = [
  { level: 1, minXp: 0, title: { tr: 'Mübtedî (Başlangıç)', fr: 'Débutant (Mubtadî)' } },
  { level: 2, minXp: 100, title: { tr: 'Tâlib-i İlim', fr: 'Étudiant en sciences' } },
  { level: 3, minXp: 250, title: { tr: 'Râvî Adayı', fr: 'Apprenti transmetteur' } },
  { level: 4, minXp: 500, title: { tr: 'Muhaddis-i Muvatta', fr: 'Spécialiste d’al-Muwatta’' } },
  { level: 5, minXp: 900, title: { tr: 'Fakîh-i Medîne', fr: 'Juriste de Médine' } },
  { level: 6, minXp: 1400, title: { tr: 'Hâfız & Mütebahhir', fr: 'Érudit accompli (Hâfiz)' } },
];

export function calculateLevelInfo(xp: number): LevelInfo {
  const safeXp = Math.max(0, Math.floor(xp));
  let current = LEVEL_THRESHOLDS[0];
  let next: LevelThreshold | null = LEVEL_THRESHOLDS[1] ?? null;

  for (let i = 0; i < LEVEL_THRESHOLDS.length; i += 1) {
    if (safeXp >= LEVEL_THRESHOLDS[i].minXp) {
      current = LEVEL_THRESHOLDS[i];
      next = LEVEL_THRESHOLDS[i + 1] ?? null;
    }
  }

  if (!next) {
    return {
      level: current.level,
      title: current.title,
      currentXp: safeXp,
      nextLevelXp: current.minXp,
      progressPercent: 100,
    };
  }

  const span = next.minXp - current.minXp;
  const earnedInTier = safeXp - current.minXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((earnedInTier / span) * 100)));

  return {
    level: current.level,
    title: current.title,
    currentXp: safeXp,
    nextLevelXp: next.minXp,
    progressPercent,
  };
}

export function addXpToState(state: ProgressState, amount: number): ProgressState {
  if (!Number.isFinite(amount) || amount <= 0) {
    return state;
  }
  return {
    ...state,
    xp: state.xp + Math.round(amount),
  };
}

export function toggleMasteredHadithState(state: ProgressState, hadithNumber: number): ProgressState {
  if (hadithNumber < 1 || hadithNumber > 8) {
    return state;
  }
  const exists = state.masteredHadiths.includes(hadithNumber);
  if (exists) {
    return {
      ...state,
      masteredHadiths: state.masteredHadiths.filter((num) => num !== hadithNumber),
    };
  }
  return {
    ...state,
    xp: state.xp + 25,
    masteredHadiths: [...state.masteredHadiths, hadithNumber].sort((a, b) => a - b),
  };
}

export function toggleBookmarkState(state: ProgressState, item: BookmarkItem): ProgressState {
  const exists = state.bookmarks.some((b) => b.id === item.id);
  if (exists) {
    return {
      ...state,
      bookmarks: state.bookmarks.filter((b) => b.id !== item.id),
    };
  }
  return {
    ...state,
    bookmarks: [item, ...state.bookmarks],
  };
}

export function saveNoteState(state: ProgressState, noteKey: string, content: string): ProgressState {
  const trimmedKey = noteKey.trim();
  if (!trimmedKey) return state;

  const nextNotes = { ...state.notes };
  if (content.trim() === '') {
    delete nextNotes[trimmedKey];
  } else {
    nextNotes[trimmedKey] = content;
  }

  return {
    ...state,
    notes: nextNotes,
  };
}

export function recordQuizScoreState(state: ProgressState, record: QuizScoreRecord): ProgressState {
  const xpEarned = Math.max(5, record.score * 10);
  return {
    ...state,
    xp: state.xp + xpEarned,
    quizScores: [record, ...state.quizScores].slice(0, 50),
  };
}

export function recordWrongQuestionsState(
  state: ProgressState,
  wrongIds: string[],
  correctIds: string[] = []
): ProgressState {
  const nextSet = new Set(state.wrongQuestionIds);
  for (const id of correctIds) {
    nextSet.delete(id);
  }
  for (const id of wrongIds) {
    if (id.trim()) nextSet.add(id.trim());
  }
  return {
    ...state,
    wrongQuestionIds: Array.from(nextSet),
  };
}

const GOOD_INTERVALS_BY_BOX: Record<0 | 1 | 2 | 3 | 4, number> = {
  0: 0,
  1: 1,
  2: 3,
  3: 7,
  4: 21,
};

const EASY_INTERVALS_BY_BOX: Record<0 | 1 | 2 | 3 | 4, number> = {
  0: 0,
  1: 2,
  2: 5,
  3: 14,
  4: 30,
};

export function computeNextFlashcardSrs(
  prev: FlashcardSrsState | undefined,
  rating: FlashcardSrsRating,
  nowIso: string = new Date().toISOString()
): { next: FlashcardSrsState; xpDelta: number } {
  const prevBox = prev?.box ?? 0;
  const reviews = (prev?.reviews ?? 0) + 1;
  let nextBox: 0 | 1 | 2 | 3 | 4 = prevBox;
  let intervalDays = 0;
  let xpDelta = 4;

  if (rating === 'again') {
    nextBox = 0;
    intervalDays = 0;
    xpDelta = 2;
  } else if (rating === 'hard') {
    nextBox = Math.max(1, prevBox) as 1 | 2 | 3 | 4;
    intervalDays = 1;
    xpDelta = 4;
  } else if (rating === 'good') {
    nextBox = Math.min(4, prevBox + 1) as 1 | 2 | 3 | 4;
    intervalDays = GOOD_INTERVALS_BY_BOX[nextBox];
    xpDelta = nextBox >= 3 ? 8 : 5;
  } else {
    nextBox = Math.min(4, prevBox + 2) as 2 | 3 | 4;
    intervalDays = EASY_INTERVALS_BY_BOX[nextBox];
    xpDelta = nextBox >= 3 ? 10 : 6;
  }

  const nowMs = Date.parse(nowIso);
  const safeNowMs = Number.isFinite(nowMs) ? nowMs : Date.now();
  const dueAtIso = new Date(safeNowMs + intervalDays * 24 * 60 * 60 * 1000).toISOString();

  return {
    next: {
      box: nextBox,
      intervalDays,
      dueAtIso,
      reviews,
      lastRating: rating,
    },
    xpDelta,
  };
}

export function reviewFlashcardState(
  state: ProgressState,
  cardId: string,
  rating: FlashcardSrsRating,
  nowIso: string = new Date().toISOString()
): ProgressState {
  const trimmed = cardId.trim();
  if (!trimmed) return state;

  const { next, xpDelta } = computeNextFlashcardSrs(state.flashcardProgress[trimmed], rating, nowIso);
  return {
    ...state,
    xp: state.xp + xpDelta,
    flashcardProgress: {
      ...state.flashcardProgress,
      [trimmed]: next,
    },
  };
}

export function parseStoredProgress(raw: string | null): ProgressState {
  if (!raw) return INITIAL_PROGRESS_STATE;
  try {
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    const rawWrong = Array.isArray(parsed.wrongQuestionIds)
      ? parsed.wrongQuestionIds.filter((id): id is string => typeof id === 'string' && id.trim().length > 0)
      : [];
    const rawFlashcards =
      parsed.flashcardProgress && typeof parsed.flashcardProgress === 'object'
        ? (parsed.flashcardProgress as Record<string, FlashcardSrsState>)
        : {};
    return {
      xp: typeof parsed.xp === 'number' && parsed.xp >= 0 ? parsed.xp : 0,
      masteredHadiths: Array.isArray(parsed.masteredHadiths)
        ? parsed.masteredHadiths.filter((n): n is number => typeof n === 'number' && n >= 1 && n <= 8)
        : [],
      quizScores: Array.isArray(parsed.quizScores) ? parsed.quizScores : [],
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
      notes: parsed.notes && typeof parsed.notes === 'object' ? parsed.notes : {},
      wrongQuestionIds: rawWrong,
      flashcardProgress: rawFlashcards,
    };
  } catch {
    return INITIAL_PROGRESS_STATE;
  }
}
