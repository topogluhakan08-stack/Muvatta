import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ArabicFontSize, DualLanguageLayout } from '../types/atlas';

const LANGUAGE_STORAGE_KEY = 'muvatta_atlas_lang_v1';

interface StoredLanguagePrefs {
  showFrench: boolean;
  dualLayout: DualLanguageLayout;
  arabicFontSize: ArabicFontSize;
}

interface LanguageContextValue {
  primaryLang: 'tr';
  secondaryLang: 'fr';
  showFrench: boolean;
  dualLayout: DualLanguageLayout;
  arabicFontSize: ArabicFontSize;
  setShowFrench: (show: boolean) => void;
  toggleFrench: () => void;
  setDualLayout: (layout: DualLanguageLayout) => void;
  setArabicFontSize: (size: ArabicFontSize) => void;
  arabicSizeClass: string;
}

const DEFAULT_PREFS: StoredLanguagePrefs = {
  showFrench: true,
  dualLayout: 'stacked',
  arabicFontSize: 'large',
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function readInitialLanguagePrefs(): StoredLanguagePrefs {
  if (typeof window === 'undefined') return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<StoredLanguagePrefs>;
    return {
      showFrench: typeof parsed.showFrench === 'boolean' ? parsed.showFrench : true,
      dualLayout: parsed.dualLayout === 'side-by-side' ? 'side-by-side' : 'stacked',
      arabicFontSize:
        parsed.arabicFontSize === 'normal' ||
        parsed.arabicFontSize === 'large' ||
        parsed.arabicFontSize === 'xlarge'
          ? parsed.arabicFontSize
          : 'large',
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<StoredLanguagePrefs>(readInitialLanguagePrefs);

  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore storage errors
    }
  }, [prefs]);

  const arabicSizeClass = useMemo(() => {
    switch (prefs.arabicFontSize) {
      case 'normal':
        return 'text-xl sm:text-2xl';
      case 'xlarge':
        return 'text-3xl sm:text-4xl';
      case 'large':
      default:
        return 'text-2xl sm:text-3xl';
    }
  }, [prefs.arabicFontSize]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      primaryLang: 'tr',
      secondaryLang: 'fr',
      showFrench: prefs.showFrench,
      dualLayout: prefs.dualLayout,
      arabicFontSize: prefs.arabicFontSize,
      setShowFrench: (show) => setPrefs((prev) => ({ ...prev, showFrench: show })),
      toggleFrench: () => setPrefs((prev) => ({ ...prev, showFrench: !prev.showFrench })),
      setDualLayout: (dualLayout) => setPrefs((prev) => ({ ...prev, dualLayout })),
      setArabicFontSize: (arabicFontSize) => setPrefs((prev) => ({ ...prev, arabicFontSize })),
      arabicSizeClass,
    }),
    [prefs, arabicSizeClass]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
