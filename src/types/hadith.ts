import type { BilingualString } from './atlas';

export type WordPartOfSpeech =
  | 'fiil'
  | 'isim'
  | 'harf'
  | 'zamir'
  | 'ism-i-mevsul'
  | 'ism-i-isaret'
  | 'zarf';

export interface WordDerivative {
  arabic: string;
  translit: string;
  meaning: BilingualString;
}

export interface LexiconEntry {
  key: string;
  lemma: string;
  transliteration: string;
  root: string;
  pos: WordPartOfSpeech;
  posLabel: BilingualString;
  meaning: BilingualString;
  sarf: BilingualString;
  nahiv: BilingualString;
  derivatives: WordDerivative[];
  isCoreGlossaryTerm?: boolean;
}

export interface HadithWordToken {
  id: string;
  hadithNumber: number;
  index: number;
  surface: string;
  normalizedKey: string;
  trailingPunctuation?: string;
  leadingPunctuation?: string;
  analysis: LexiconEntry;
}

export interface IsnadLink {
  name: string;
  arabicName: string;
  generation: BilingualString;
  role: 'ravi' | 'musannif' | 'tabii' | 'sahabi' | 'peygamber';
  deathDate?: string;
  bioNote: BilingualString;
}

export interface ClassicalFootnote {
  id: string;
  lemmaArabic: string;
  commentator: BilingualString;
  textArabic: string;
  translation: BilingualString;
}

export interface BabMeta {
  number: 1 | 2;
  arabicTitle: string;
  title: BilingualString;
  summary: BilingualString;
  hadithRange: string;
}

export interface HadithRecord {
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  id: string;
  bab: 1 | 2;
  pageNumber: number;
  type: 'musned' | 'mevkuf' | 'maktu';
  typeLabel: BilingualString;
  title: BilingualString;
  arabicFull: string;
  tahric?: {
    arabic: string;
    tr: string;
    fr: string;
  };
  translation: BilingualString;
  fiqhSummary: BilingualString;
  isnad: IsnadLink[];
  footnotes: ClassicalFootnote[];
}
