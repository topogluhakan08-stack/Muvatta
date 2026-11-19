import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type {
  BookmarkItem,
  FlashcardSrsRating,
  LevelInfo,
  ProgressState,
  QuizScoreRecord,
} from '../types/atlas';
import {
  INITIAL_PROGRESS_STATE,
  PROGRESS_STORAGE_KEY,
  addXpToState,
  calculateLevelInfo,
  parseStoredProgress,
  recordQuizScoreState,
  recordWrongQuestionsState,
  reviewFlashcardState,
  saveNoteState,
  toggleBookmarkState,
  toggleMasteredHadithState,
} from '../utils/progress';

interface ProgressContextValue {
  progress: ProgressState;
  levelInfo: LevelInfo;
  addXp: (amount: number) => void;
  toggleMasteredHadith: (hadithNumber: number) => void;
  isHadithMastered: (hadithNumber: number) => boolean;
  toggleBookmark: (item: BookmarkItem) => void;
  isBookmarked: (id: string) => boolean;
  saveNote: (noteKey: string, content: string) => void;
  recordQuizScore: (record: QuizScoreRecord) => void;
  recordWrongQuestions: (wrongIds: string[], correctIds?: string[]) => void;
  reviewFlashcard: (cardId: string, rating: FlashcardSrsRating) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

function readInitialProgress(): ProgressState {
  if (typeof window === 'undefined') return INITIAL_PROGRESS_STATE;
  try {
    return parseStoredProgress(window.localStorage.getItem(PROGRESS_STORAGE_KEY));
  } catch {
    return INITIAL_PROGRESS_STATE;
  }
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(readInitialProgress);

  useEffect(() => {
    try {
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage errors
    }
  }, [progress]);

  const addXp = useCallback((amount: number) => {
    setProgress((prev) => addXpToState(prev, amount));
  }, []);

  const toggleMasteredHadith = useCallback((hadithNumber: number) => {
    setProgress((prev) => toggleMasteredHadithState(prev, hadithNumber));
  }, []);

  const isHadithMastered = useCallback(
    (hadithNumber: number) => progress.masteredHadiths.includes(hadithNumber),
    [progress.masteredHadiths]
  );

  const toggleBookmark = useCallback((item: BookmarkItem) => {
    setProgress((prev) => toggleBookmarkState(prev, item));
  }, []);

  const isBookmarked = useCallback(
    (id: string) => progress.bookmarks.some((b) => b.id === id),
    [progress.bookmarks]
  );

  const saveNote = useCallback((noteKey: string, content: string) => {
    setProgress((prev) => saveNoteState(prev, noteKey, content));
  }, []);

  const recordQuizScore = useCallback((record: QuizScoreRecord) => {
    setProgress((prev) => recordQuizScoreState(prev, record));
  }, []);

  const recordWrongQuestions = useCallback((wrongIds: string[], correctIds: string[] = []) => {
    setProgress((prev) => recordWrongQuestionsState(prev, wrongIds, correctIds));
  }, []);

  const reviewFlashcard = useCallback((cardId: string, rating: FlashcardSrsRating) => {
    setProgress((prev) => reviewFlashcardState(prev, cardId, rating));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(INITIAL_PROGRESS_STATE);
  }, []);

  const levelInfo = useMemo(() => calculateLevelInfo(progress.xp), [progress.xp]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      levelInfo,
      addXp,
      toggleMasteredHadith,
      isHadithMastered,
      toggleBookmark,
      isBookmarked,
      saveNote,
      recordQuizScore,
      recordWrongQuestions,
      reviewFlashcard,
      resetProgress,
    }),
    [
      progress,
      levelInfo,
      addXp,
      toggleMasteredHadith,
      isHadithMastered,
      toggleBookmark,
      isBookmarked,
      saveNote,
      recordQuizScore,
      recordWrongQuestions,
      reviewFlashcard,
      resetProgress,
    ]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return ctx;
}
