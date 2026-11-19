import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookMarked,
  CheckCircle2,
  FileText,
  GitBranch,
  PenLine,
  Save,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import {
  BABS_DATA,
  BOOK_SIX_META,
  HADITHS_DATA,
  filterHadiths,
  getHadithWithTokens,
  resolveHadithNumberFromFocusId,
} from '../data/hadithsData';
import type { AtlasRoute } from '../types/atlas';
import type { HadithWordToken } from '../types/hadith';
import { isSpeechSupported, speakText, stopSpeech } from '../utils/speech';
import { BilingualText } from './BilingualText';
import { IsnadDiagram } from './IsnadDiagram';
import { WordAnalysisDrawer } from './WordAnalysisDrawer';

interface HadithsViewProps {
  focusedItemId?: string;
  onNavigate: (route: AtlasRoute, targetItemId?: string) => void;
}

type StudyTab = 'commentary' | 'isnad' | 'notes';

export function HadithsView({ focusedItemId, onNavigate }: HadithsViewProps) {
  const { showFrench, arabicSizeClass } = useLanguage();
  const {
    progress,
    isHadithMastered,
    toggleMasteredHadith,
    isBookmarked,
    toggleBookmark,
    saveNote,
  } = useProgress();

  const [babFilter, setBabFilter] = useState<'all' | 1 | 2>('all');
  const [activeHadithNumber, setActiveHadithNumber] = useState<number>(() =>
    resolveHadithNumberFromFocusId(focusedItemId)
  );
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);
  const [activeStudyTab, setActiveStudyTab] = useState<StudyTab>('commentary');
  const [speakingLang, setSpeakingLang] = useState<'ar' | 'tr' | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [noteSavedNotice, setNoteSavedNotice] = useState(false);

  // Sync with Mind Map / external focus handoff
  useEffect(() => {
    if (!focusedItemId) return;
    const targetNum = resolveHadithNumberFromFocusId(focusedItemId);
    setActiveHadithNumber(targetNum);
    setSelectedTokenId(null);
    if (focusedItemId === 'bab-1') setBabFilter(1);
    else if (focusedItemId === 'bab-2') setBabFilter(2);
    else setBabFilter('all');
  }, [focusedItemId]);

  const visibleHadiths = useMemo(() => filterHadiths(babFilter), [babFilter]);

  // Ensure active hadith stays within selected Bab filter
  useEffect(() => {
    if (!visibleHadiths.some((h) => h.number === activeHadithNumber) && visibleHadiths.length > 0) {
      setActiveHadithNumber(visibleHadiths[0].number);
      setSelectedTokenId(null);
    }
  }, [visibleHadiths, activeHadithNumber]);

  const activeBundle = useMemo(
    () => getHadithWithTokens(activeHadithNumber) ?? getHadithWithTokens(1)!,
    [activeHadithNumber]
  );

  const { hadith, tokens } = activeBundle;
  const activeBabMeta = BABS_DATA.find((b) => b.number === hadith.bab) ?? BABS_DATA[0];

  const selectedToken: HadithWordToken | null = useMemo(
    () => tokens.find((t) => t.id === selectedTokenId) ?? null,
    [tokens, selectedTokenId]
  );

  // Up to 4 distinct key glossary terms from this hadith to invite first-time clicks
  const quickPickTokens = useMemo(() => {
    const seen = new Set<string>();
    const picks: HadithWordToken[] = [];
    for (const token of tokens) {
      if (
        token.analysis.isCoreGlossaryTerm &&
        token.analysis.pos !== 'harf' &&
        !seen.has(token.normalizedKey)
      ) {
        seen.add(token.normalizedKey);
        picks.push(token);
        if (picks.length >= 4) break;
      }
    }
    return picks;
  }, [tokens]);

  const noteKey = hadith.id;
  useEffect(() => {
    setNoteDraft(progress.notes[noteKey] ?? '');
    setNoteSavedNotice(false);
  }, [noteKey, progress.notes]);

  useEffect(() => {
    stopSpeech();
    setSpeakingLang(null);
  }, [activeHadithNumber]);

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const handleSelectHadith = (num: number) => {
    setActiveHadithNumber(num);
    setSelectedTokenId(null);
  };

  const handleStepToken = (delta: -1 | 1) => {
    if (!selectedToken) return;
    const nextIndex = selectedToken.index + delta;
    if (nextIndex >= 0 && nextIndex < tokens.length) {
      setSelectedTokenId(tokens[nextIndex].id);
    }
  };

  const handleSpeakHadith = (lang: 'ar' | 'tr') => {
    if (speakingLang === lang) {
      stopSpeech();
      setSpeakingLang(null);
      return;
    }
    const text = lang === 'ar' ? hadith.arabicFull : hadith.translation.tr;
    setSpeakingLang(lang);
    const ok = speakText(
      text,
      lang === 'ar' ? 'ar-SA' : 'tr-TR',
      () => setSpeakingLang(null),
      () => setSpeakingLang(null)
    );
    if (!ok) setSpeakingLang(null);
  };

  const handleToggleBookmark = () => {
    toggleBookmark({
      id: hadith.id,
      type: 'hadith',
      title: {
        tr: `Hadis ${hadith.number}: ${hadith.title.tr}`,
        fr: `Hadith ${hadith.number} : ${hadith.title.fr}`,
      },
      route: 'hadisler',
      targetId: hadith.id,
      createdAt: new Date().toISOString(),
    });
  };

  const handleSaveNote = () => {
    saveNote(noteKey, noteDraft);
    setNoteSavedNotice(true);
    window.setTimeout(() => setNoteSavedNotice(false), 2200);
  };

  const mastered = isHadithMastered(hadith.number);
  const bookmarked = isBookmarked(hadith.id);
  const masteredCount = progress.masteredHadiths.length;

  const currentIdxInVisible = visibleHadiths.findIndex((h) => h.number === hadith.number);
  const prevHadith = currentIdxInVisible > 0 ? visibleHadiths[currentIdxInVisible - 1] : null;
  const nextHadith =
    currentIdxInVisible >= 0 && currentIdxInVisible < visibleHadiths.length - 1
      ? visibleHadiths[currentIdxInVisible + 1]
      : null;

  return (
    <div className="space-y-6">
      {/* Book 6 Masthead */}
      <section className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#F3EFE8]/75 dark:bg-[#181614] p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
              el-Muvatta’ · 6. Kitap
              {showFrench && (
                <span lang="fr" className="ml-1.5 font-normal normal-case italic text-[#787066] dark:text-[#9A9287]">
                  · Livre 6 d&apos;al-Muwatta&apos;
                </span>
              )}
            </p>
            <BilingualText
              as="h1"
              text={BOOK_SIX_META.title}
              primaryClassName="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
              secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
              forceStacked
            />
            <BilingualText
              as="p"
              text={BOOK_SIX_META.editionNote}
              primaryClassName="text-xs text-[#57514A] dark:text-[#C5BEB4]"
              secondaryClassName="text-[11px] text-[#787066] dark:text-[#9A9287] italic"
              forceStacked
            />
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-2xl sm:text-3xl leading-[1.65] py-0.5 text-[#1C1917] dark:text-[#FAF8F5]"
            >
              {BOOK_SIX_META.arabicTitle}
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-[#165B43] dark:text-[#4FB28C]">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>
                {masteredCount}/8 Hadis İncelendi
                {showFrench ? ` · ${masteredCount}/8 maîtrisés` : ''}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bab Filter & 1-8 Hadith Navigator */}
      <section aria-label="Bab filtresi ve hadis seçici" className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Bab filtresi">
            {(
              [
                { id: 'all', tr: 'Tümü (8)', fr: 'Tous (8)' },
                { id: 1, tr: '1. Bab: Tergîb (1–2)', fr: 'Chap. 1 (1–2)' },
                { id: 2, tr: '2. Bab: Kıyâm (3–8)', fr: 'Chap. 2 (3–8)' },
              ] as const
            ).map((opt) => {
              const active = babFilter === opt.id;
              return (
                <button
                  key={String(opt.id)}
                  type="button"
                  onClick={() => setBabFilter(opt.id)}
                  aria-pressed={active}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'border-[#1C1917] bg-[#1C1917] text-[#FAF8F5] dark:border-[#DFC07D] dark:bg-[#DFC07D] dark:text-[#121110]'
                      : 'border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#181614] text-[#57514A] dark:text-[#C5BEB4] hover:border-[#8B6520] dark:hover:border-[#DFC07D]'
                  }`}
                >
                  <span>{opt.tr}</span>
                  {showFrench && (
                    <span lang="fr" className="ml-1.5 font-normal opacity-80">
                      · {opt.fr}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-xs font-medium text-[#57514A] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5] transition-colors cursor-pointer"
          >
            Zihin Haritasına Dön {showFrench ? '· Carte mentale' : ''}
          </button>
        </div>

        {/* 1..8 Hadith Selector Strip */}
        <div
          className="grid grid-cols-4 sm:grid-cols-8 gap-2"
          role="navigation"
          aria-label="Hadis numaraları"
        >
          {HADITHS_DATA.map((item) => {
            const isActive = item.number === hadith.number;
            const isDimmed = babFilter !== 'all' && item.bab !== babFilter;
            const itemMastered = isHadithMastered(item.number);
            const itemBookmarked = isBookmarked(item.id);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (babFilter !== 'all' && item.bab !== babFilter) {
                    setBabFilter('all');
                  }
                  handleSelectHadith(item.number);
                }}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Hadis ${item.number}: ${item.title.tr}`}
                className={`relative rounded-lg border px-2.5 py-2 text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'border-[#8B6520] bg-[#8B6520]/12 dark:border-[#DFC07D] dark:bg-[#DFC07D]/15 text-[#1C1917] dark:text-[#FAF8F5]'
                    : 'border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] text-[#57514A] dark:text-[#C5BEB4] hover:border-[#8B6520]/60'
                } ${isDimmed ? 'opacity-45' : ''}`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold tabular-nums">Hadis {item.number}</span>
                  <span className="flex items-center gap-0.5">
                    {itemMastered && (
                      <CheckCircle2
                        className="w-3.5 h-3.5 text-[#165B43] dark:text-[#4FB28C]"
                        aria-hidden="true"
                      />
                    )}
                    {itemBookmarked && (
                      <Bookmark
                        className="w-3 h-3 text-[#8B6520] dark:text-[#DFC07D] fill-current"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </div>
                <p className="text-[10px] text-[#787066] dark:text-[#9A9287] mt-0.5 truncate">
                  Bab {item.bab} · s. {item.pageNumber}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Bab Context Bar */}
        <div className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#161412] px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="space-y-0.5">
            <BilingualText
              as="p"
              text={activeBabMeta.title}
              primaryClassName="text-xs font-semibold text-[#165B43] dark:text-[#4FB28C]"
              secondaryClassName="text-[11px] italic text-[#787066] dark:text-[#9A9287]"
              forceStacked
            />
          </div>
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-xl leading-[1.65] text-[#1C1917] dark:text-[#FAF8F5] text-right shrink-0"
          >
            {activeBabMeta.arabicTitle}
          </p>
        </div>
      </section>

      {/* Main 12-Column Study Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Hadith Text, Translation & Deep Study Tabs */}
        <article className="lg:col-span-7 space-y-5">
          {/* Hadith Card */}
          <div className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#181614] overflow-hidden">
            {/* Metadata & Actions Header */}
            <div className="px-5 py-4 border-b border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/60 dark:bg-[#1D1A17] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] font-semibold">
                    Hadis {hadith.number} / 8
                  </span>
                  <span className="px-2 py-0.5 rounded-md border border-[#8B6520]/35 bg-[#8B6520]/10 text-[#7A5616] dark:border-[#DFC07D]/35 dark:bg-[#DFC07D]/15 dark:text-[#DFC07D] font-medium">
                    {hadith.typeLabel.tr}
                    {showFrench && (
                      <span lang="fr" className="italic font-normal ml-1">
                        · {hadith.typeLabel.fr}
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] text-[#787066] dark:text-[#9A9287]">
                    s. {hadith.pageNumber}
                  </span>
                </div>

                {/* Action Controls */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {isSpeechSupported() && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSpeakHadith('ar')}
                        aria-pressed={speakingLang === 'ar'}
                        aria-label="Hadisi Arapça dinle"
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                          speakingLang === 'ar'
                            ? 'border-[#165B43] bg-[#165B43] text-white dark:border-[#4FB28C] dark:bg-[#4FB28C] dark:text-[#121110]'
                            : 'border-[#D5CBB9] dark:border-[#342F2A] text-[#57514A] dark:text-[#C5BEB4] hover:border-[#8B6520]'
                        }`}
                      >
                        {speakingLang === 'ar' ? (
                          <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                        <span>AR</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSpeakHadith('tr')}
                        aria-pressed={speakingLang === 'tr'}
                        aria-label="Hadisi Türkçe dinle"
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                          speakingLang === 'tr'
                            ? 'border-[#165B43] bg-[#165B43] text-white dark:border-[#4FB28C] dark:bg-[#4FB28C] dark:text-[#121110]'
                            : 'border-[#D5CBB9] dark:border-[#342F2A] text-[#57514A] dark:text-[#C5BEB4] hover:border-[#8B6520]'
                        }`}
                      >
                        {speakingLang === 'tr' ? (
                          <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                        <span>TR</span>
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={handleToggleBookmark}
                    aria-pressed={bookmarked}
                    aria-label={bookmarked ? 'Yer imini kaldır' : 'Yer imlerine ekle'}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                      bookmarked
                        ? 'border-[#8B6520] bg-[#8B6520]/15 text-[#7A5616] dark:border-[#DFC07D] dark:bg-[#DFC07D]/20 dark:text-[#DFC07D]'
                        : 'border-[#D5CBB9] dark:border-[#342F2A] text-[#57514A] dark:text-[#C5BEB4] hover:border-[#8B6520]'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} aria-hidden="true" />
                    <span>Yer İmi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleMasteredHadith(hadith.number)}
                    aria-pressed={mastered}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold transition-colors cursor-pointer ${
                      mastered
                        ? 'border-[#165B43] bg-[#165B43] text-white dark:border-[#4FB28C] dark:bg-[#4FB28C] dark:text-[#121110]'
                        : 'border-[#165B43]/50 text-[#165B43] dark:border-[#4FB28C]/50 dark:text-[#4FB28C] hover:bg-[#165B43]/10'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{mastered ? 'İncelendi (+25 XP)' : 'İncelendi İşaretle (+25 XP)'}</span>
                  </button>
                </div>
              </div>

              <BilingualText
                as="h2"
                text={hadith.title}
                primaryClassName="font-editorial text-xl sm:text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                secondaryClassName="text-xs sm:text-sm text-[#787066] dark:text-[#A8A095] italic"
                forceStacked
              />
            </div>

            {/* Interactive Vocalized Arabic Text Block */}
            <div className="p-5 sm:p-6 space-y-3 border-b border-[#E7E0D4] dark:border-[#2C2824]">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#787066] dark:text-[#A8A095]">
                <span>
                  Kelime tahlili için herhangi bir Arapça kelimeye tıklayın ({tokens.length} kelime)
                  {showFrench && (
                    <span lang="fr" className="ml-1 italic">
                      · Cliquez sur un mot pour son analyse ({tokens.length} mots)
                    </span>
                  )}
                </span>
              </div>

              <div
                dir="rtl"
                lang="ar"
                data-testid={`hadith-arabic-tokens-${hadith.number}`}
                className={`font-arabic text-right rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FDFBF7] dark:bg-[#121110] px-4 sm:px-5 py-5 leading-[2.45] ${arabicSizeClass}`}
              >
                {tokens.map((token) => {
                  const isSelected = selectedTokenId === token.id;
                  const isCore = Boolean(token.analysis.isCoreGlossaryTerm && token.analysis.pos !== 'harf');

                  return (
                    <React.Fragment key={token.id}>
                      {token.leadingPunctuation && (
                        <span className="text-[#8B6520] dark:text-[#DFC07D] select-none">
                          {token.leadingPunctuation}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedTokenId(token.id)}
                        aria-pressed={isSelected}
                        aria-label={`${token.surface} — ${token.analysis.meaning.tr}`}
                        className={`inline-block rounded-md px-1.5 py-0.5 mx-0.5 transition-colors cursor-pointer align-baseline focus:outline-2 focus:outline-[#8B6520] ${
                          isSelected
                            ? 'bg-[#8B6520] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] shadow-xs'
                            : isCore
                              ? 'text-[#1C1917] dark:text-[#FAF8F5] underline decoration-[#8B6520]/45 dark:decoration-[#DFC07D]/45 decoration-dotted underline-offset-8 hover:bg-[#8B6520]/14 dark:hover:bg-[#DFC07D]/18'
                              : 'text-[#1C1917] dark:text-[#FAF8F5] hover:bg-[#8B6520]/12 dark:hover:bg-[#DFC07D]/15'
                        }`}
                      >
                        {token.surface}
                      </button>
                      {token.trailingPunctuation && (
                        <span className="text-[#8B6520] dark:text-[#DFC07D] select-none ml-0.5">
                          {token.trailingPunctuation}
                        </span>
                      )}{' '}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Dual-Language Translation Block */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
                  Tercüme {showFrench ? '· Traduction simultanée (TR + FR)' : ''}
                </h3>
                <BilingualText
                  as="div"
                  text={hadith.translation}
                  primaryClassName="text-sm sm:text-[15px] text-[#292524] dark:text-[#EAE5DC] leading-relaxed"
                  secondaryClassName="text-xs sm:text-sm text-[#6B635B] dark:text-[#A8A095] italic leading-relaxed"
                />
              </div>

              {/* Tahric Citation (Hadiths 1-3) */}
              {hadith.tahric && (
                <div className="rounded-xl border border-[#165B43]/30 dark:border-[#4FB28C]/30 bg-[#165B43]/5 dark:bg-[#4FB28C]/8 p-4 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#165B43] dark:text-[#4FB28C]">
                    Tahrîc (Kütüb-i Sitte Kaynakları)
                    {showFrench ? ' · Références canoniques (Takhrîj)' : ''}
                  </p>
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-lg leading-[1.8] text-[#1C1917] dark:text-[#FAF8F5] text-right"
                  >
                    {hadith.tahric.arabic}
                  </p>
                  <BilingualText
                    as="p"
                    text={{ tr: hadith.tahric.tr, fr: hadith.tahric.fr }}
                    primaryClassName="text-xs text-[#3A3530] dark:text-[#D6CFC5]"
                    secondaryClassName="text-[11px] italic text-[#787066] dark:text-[#9A9287]"
                    forceStacked
                  />
                </div>
              )}
            </div>
          </div>

          {/* 3-Tab Deep Study Footer (Commentary & Classical Footnotes | Isnad | Personal Notes) */}
          <section className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#181614] overflow-hidden">
            <div
              role="tablist"
              aria-label="Hadis inceleme sekmeleri"
              className="flex flex-wrap border-b border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/70 dark:bg-[#1D1A17]"
            >
              {(
                [
                  {
                    id: 'commentary',
                    icon: BookMarked,
                    tr: `Şerh & Hâşiyeler (${hadith.footnotes.length})`,
                    fr: 'Gloses',
                  },
                  {
                    id: 'isnad',
                    icon: GitBranch,
                    tr: `İsnad Şeması (${hadith.isnad.length})`,
                    fr: 'Isnâd',
                  },
                  {
                    id: 'notes',
                    icon: PenLine,
                    tr: progress.notes[noteKey]?.trim() ? 'Kişisel Notlar (1)' : 'Kişisel Notlar',
                    fr: 'Notes',
                  },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const active = activeStudyTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveStudyTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                      active
                        ? 'border-[#8B6520] text-[#1C1917] dark:border-[#DFC07D] dark:text-[#FAF8F5] bg-[#FAF8F5] dark:bg-[#181614]'
                        : 'border-transparent text-[#6B635B] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{tab.tr}</span>
                    {showFrench && (
                      <span lang="fr" className="hidden sm:inline font-normal italic opacity-75">
                        · {tab.fr}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-5 sm:p-6">
              {activeStudyTab === 'commentary' && (
                <div className="space-y-5" role="tabpanel">
                  {/* Fiqh Summary */}
                  <div className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/60 dark:bg-[#1D1A17] p-4 space-y-1.5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>
                        Fıkhî Değerlendirme {showFrench ? '· Portée juridique (Fiqh)' : ''}
                      </span>
                    </h3>
                    <BilingualText
                      as="p"
                      text={hadith.fiqhSummary}
                      primaryClassName="text-sm text-[#292524] dark:text-[#E6E0D6] leading-relaxed"
                      secondaryClassName="text-xs text-[#6B635B] dark:text-[#A8A095] italic leading-relaxed"
                      forceStacked
                    />
                  </div>

                  {/* Classical Footnotes */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#722630] dark:text-[#D47A85]">
                      Klasik Şerh & Muvatta’ Hâşiyeleri
                      {showFrench ? ' · Gloses classiques' : ''}
                    </h3>
                    {hadith.footnotes.map((fn) => (
                      <div
                        key={fn.id}
                        className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FDFBF7] dark:bg-[#141210] p-4 space-y-2.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E7E0D4]/80 dark:border-[#2C2824]">
                          <BilingualText
                            as="span"
                            text={fn.commentator}
                            primaryClassName="text-xs font-semibold text-[#722630] dark:text-[#D47A85]"
                            secondaryClassName="text-[11px] italic text-[#787066] dark:text-[#9A9287]"
                            forceStacked
                          />
                          <span
                            dir="rtl"
                            lang="ar"
                            className="font-arabic text-lg leading-[1.6] text-[#8B6520] dark:text-[#DFC07D]"
                          >
                            {fn.lemmaArabic}
                          </span>
                        </div>

                        <p
                          dir="rtl"
                          lang="ar"
                          className="font-arabic text-xl leading-[1.9] text-[#1C1917] dark:text-[#FAF8F5] text-right"
                        >
                          {fn.textArabic}
                        </p>

                        <BilingualText
                          as="p"
                          text={fn.translation}
                          primaryClassName="text-xs sm:text-sm text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                          secondaryClassName="text-xs italic text-[#787066] dark:text-[#9A9287] leading-relaxed"
                          forceStacked
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStudyTab === 'isnad' && (
                <div role="tabpanel">
                  <IsnadDiagram links={hadith.isnad} hadithNumber={hadith.number} />
                </div>
              )}

              {activeStudyTab === 'notes' && (
                <div className="space-y-3" role="tabpanel">
                  <label
                    htmlFor="hadith-personal-note"
                    className="block text-xs font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                  >
                    Hadis {hadith.number} için Kişisel Çalışma Notu
                    {showFrench && (
                      <span lang="fr" className="ml-1.5 font-normal italic text-[#787066] dark:text-[#9A9287]">
                        · Note personnelle pour le Hadith {hadith.number}
                      </span>
                    )}
                  </label>
                  <textarea
                    id="hadith-personal-note"
                    rows={4}
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    placeholder="Bu hadisin isnadı, fıkhî hükmü veya dilbilgisi üzerine notlarınızı buraya kaydedebilirsiniz..."
                    className="w-full rounded-xl border border-[#D5CBB9] dark:border-[#342F2A] bg-[#FDFBF7] dark:bg-[#121110] px-3.5 py-2.5 text-sm text-[#1C1917] dark:text-[#FAF8F5] focus:outline-2 focus:outline-[#8B6520]"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleSaveNote}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] text-xs font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <Save className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Notu Kaydet {showFrench ? '· Enregistrer' : ''}</span>
                    </button>
                    {noteSavedNotice && (
                      <span className="text-xs font-medium text-[#165B43] dark:text-[#4FB28C]">
                        Kaydedildi (localStorage) {showFrench ? '· Enregistré' : ''}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Prev / Next Hadith Controls */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => prevHadith && handleSelectHadith(prevHadith.number)}
              disabled={!prevHadith}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#181614] text-xs font-semibold text-[#1C1917] dark:text-[#FAF8F5] hover:border-[#8B6520] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>
                {prevHadith ? `Önceki: Hadis ${prevHadith.number}` : 'İlk Hadis'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => nextHadith && handleSelectHadith(nextHadith.number)}
              disabled={!nextHadith}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#181614] text-xs font-semibold text-[#1C1917] dark:text-[#FAF8F5] hover:border-[#8B6520] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              <span>
                {nextHadith ? `Sonraki: Hadis ${nextHadith.number}` : 'Son Hadis'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </article>

        {/* Right 5 Cols: Sticky Every-Word Linguistic Inspector */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 self-start">
          <WordAnalysisDrawer
            token={selectedToken}
            totalTokens={tokens.length}
            quickPickTokens={quickPickTokens}
            onSelectToken={(t) => setSelectedTokenId(t.id)}
            onStepToken={handleStepToken}
            onClear={() => setSelectedTokenId(null)}
          />
        </div>
      </div>
    </div>
  );
}
