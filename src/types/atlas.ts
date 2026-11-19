export type AtlasRoute =
  | 'home'
  | 'imam-malik'
  | 'el-muvatta'
  | 'hadisler'
  | 'ogren'
  | 'sozluk'
  | 'harita'
  | 'ara'
  | 'ayarlar';

export interface BilingualString {
  tr: string;
  fr: string;
}

export type ThemeMode = 'light' | 'dark';

export type DualLanguageLayout = 'stacked' | 'side-by-side';

export type ArabicFontSize = 'normal' | 'large' | 'xlarge';

export interface QuizScoreRecord {
  id: string;
  category: string;
  score: number;
  total: number;
  dateIso: string;
}

export interface BookmarkItem {
  id: string;
  type: 'hadith' | 'section' | 'term';
  title: BilingualString;
  route: AtlasRoute;
  targetId?: string;
  createdAt: string;
}

export type FlashcardSrsRating = 'again' | 'hard' | 'good' | 'easy';

export interface FlashcardSrsState {
  box: 0 | 1 | 2 | 3 | 4;
  intervalDays: number;
  dueAtIso: string;
  reviews: number;
  lastRating: FlashcardSrsRating;
}

export interface ProgressState {
  xp: number;
  masteredHadiths: number[];
  quizScores: QuizScoreRecord[];
  bookmarks: BookmarkItem[];
  notes: Record<string, string>;
  wrongQuestionIds: string[];
  flashcardProgress: Record<string, FlashcardSrsState>;
}

export interface LevelInfo {
  level: number;
  title: BilingualString;
  currentXp: number;
  nextLevelXp: number;
  progressPercent: number;
}

export type MindMapNodeKind = 'root' | 'bab' | 'hadith' | 'theme';

export interface MindMapNode {
  id: string;
  kind: MindMapNodeKind;
  parentId?: string;
  babNumber?: 1 | 2;
  hadithNumber?: number;
  label: BilingualString;
  shortLabel: BilingualString;
  arabic?: string;
  summary: BilingualString;
  narratorChain?: string;
  keyRuling?: BilingualString;
  reference?: string;
  targetRoute: AtlasRoute;
  targetItemId?: string;
  accent: 'gold' | 'emerald' | 'burgundy';
}

export interface HeroOverviewCard {
  id: string;
  index: string;
  route: AtlasRoute;
  arabicTitle: string;
  title: BilingualString;
  period: string;
  metadata: BilingualString;
  summary: BilingualString;
  highlights: BilingualString[];
  cta: BilingualString;
  accent: 'emerald' | 'gold' | 'burgundy';
}
