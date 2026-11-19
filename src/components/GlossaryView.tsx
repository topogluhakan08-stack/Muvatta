import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  Filter,
  RotateCcw,
  Search,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import {
  POS_FILTER_OPTIONS,
  buildGlossaryEntries,
  filterGlossaryEntries,
  getUniqueRoots,
  type GlossaryEntry,
} from '../data/glossaryData';
import type { AtlasRoute } from '../types/atlas';
import type { WordPartOfSpeech } from '../types/hadith';
import { isSpeechSupported, speakText, stopSpeech } from '../utils/speech';
import { BilingualText } from './BilingualText';

interface GlossaryViewProps {
  focusedItemId?: string;
  onNavigate: (route: AtlasRoute, targetItemId?: string) => void;
}

const POS_ACCENT: Record<string, string> = {
  fiil: 'border-[#165B43]/35 bg-[#165B43]/10 text-[#165B43] dark:border-[#4FB28C]/40 dark:bg-[#4FB28C]/15 dark:text-[#7AD4B2]',
  isim: 'border-[#8B6520]/35 bg-[#8B6520]/10 text-[#7A5616] dark:border-[#DFC07D]/40 dark:bg-[#DFC07D]/15 dark:text-[#E6CA8E]',
  harf: 'border-[#722630]/35 bg-[#722630]/10 text-[#722630] dark:border-[#D47A85]/40 dark:bg-[#D47A85]/15 dark:text-[#E89CA6]',
  zarf: 'border-[#722630]/35 bg-[#722630]/10 text-[#722630] dark:border-[#D47A85]/40 dark:bg-[#D47A85]/15 dark:text-[#E89CA6]',
  zamir: 'border-[#57514A]/35 bg-[#57514A]/10 text-[#3A3530] dark:border-[#A8A095]/40 dark:bg-[#A8A095]/15 dark:text-[#D6CFC5]',
  'ism-i-mevsul': 'border-[#57514A]/35 bg-[#57514A]/10 text-[#3A3530] dark:border-[#A8A095]/40 dark:bg-[#A8A095]/15 dark:text-[#D6CFC5]',
  'ism-i-isaret': 'border-[#57514A]/35 bg-[#57514A]/10 text-[#3A3530] dark:border-[#A8A095]/40 dark:bg-[#A8A095]/15 dark:text-[#D6CFC5]',
};

const PAGE_STEP = 36;

export function GlossaryView({ focusedItemId, onNavigate }: GlossaryViewProps) {
  const { showFrench } = useLanguage();
  const { isBookmarked, toggleBookmark } = useProgress();

  const allEntries = useMemo(() => buildGlossaryEntries(), []);
  const allRoots = useMemo(() => getUniqueRoots(allEntries), [allEntries]);
  const topRoots = useMemo(() => allRoots.slice(0, 8), [allRoots]);

  const [query, setQuery] = useState('');
  const [posFilter, setPosFilter] = useState<'all' | WordPartOfSpeech>('all');
  const [babFilter, setBabFilter] = useState<'all' | 1 | 2 | 'dia'>('all');
  const [rootFilter, setRootFilter] = useState<string>('all');
  const [onlyCore, setOnlyCore] = useState(false);
  const [visibleLimit, setVisibleLimit] = useState(PAGE_STEP);
  const [selectedId, setSelectedId] = useState<string>(() => {
    if (focusedItemId && allEntries.some((e) => e.id === focusedItemId)) {
      return focusedItemId;
    }
    return allEntries[0]?.id ?? '';
  });
  const [speaking, setSpeaking] = useState(false);

  // Sync external navigation focus (e.g. from Global Search)
  useEffect(() => {
    if (!focusedItemId) return;
    if (allEntries.some((e) => e.id === focusedItemId)) {
      setQuery('');
      setPosFilter('all');
      setBabFilter('all');
      setRootFilter('all');
      setOnlyCore(false);
      setSelectedId(focusedItemId);
    }
  }, [focusedItemId, allEntries]);

  const filteredEntries = useMemo(
    () =>
      filterGlossaryEntries(allEntries, {
        query,
        pos: posFilter,
        bab: babFilter,
        root: rootFilter,
        onlyCore,
      }),
    [allEntries, query, posFilter, babFilter, rootFilter, onlyCore]
  );

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleLimit(PAGE_STEP);
  }, [query, posFilter, babFilter, rootFilter, onlyCore]);

  // Keep selected entry synced with visible filtered list
  const selectedEntry: GlossaryEntry | null = useMemo(() => {
    const exact = filteredEntries.find((e) => e.id === selectedId);
    if (exact) return exact;
    return filteredEntries[0] ?? null;
  }, [filteredEntries, selectedId]);

  useEffect(() => {
    stopSpeech();
    setSpeaking(false);
  }, [selectedEntry?.id]);

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const hasActiveFilters =
    query.trim() !== '' || posFilter !== 'all' || babFilter !== 'all' || rootFilter !== 'all' || onlyCore;

  const handleResetFilters = () => {
    setQuery('');
    setPosFilter('all');
    setBabFilter('all');
    setRootFilter('all');
    setOnlyCore(false);
  };

  const handleSpeakTerm = (arabicText: string) => {
    if (speaking) {
      stopSpeech();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    const ok = speakText(
      arabicText,
      'ar-SA',
      () => setSpeaking(false),
      () => setSpeaking(false)
    );
    if (!ok) setSpeaking(false);
  };

  const handleToggleBookmark = (entry: GlossaryEntry) => {
    toggleBookmark({
      id: `term-${entry.id}`,
      type: 'term',
      title: {
        tr: `${entry.lemma} (${entry.transliteration})`,
        fr: `${entry.lemma} (${entry.transliteration})`,
      },
      route: 'sozluk',
      targetId: entry.id,
      createdAt: new Date().toISOString(),
    });
  };

  const displayedEntries = filteredEntries.slice(0, visibleLimit);

  return (
    <div className="space-y-6">
      {/* Masthead */}
      <section className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#F3EFE8]/75 dark:bg-[#181614] p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
              Arapça – Türkçe – Fransızca Lügat &amp; Kavram Dizini
              {showFrench && (
                <span lang="fr" className="ml-1.5 font-normal normal-case italic text-[#787066] dark:text-[#9A9287]">
                  · Lexique trilingue (AR–TR–FR)
                </span>
              )}
            </p>
            <BilingualText
              as="h1"
              text={{
                tr: 'Sözlük ve Kök Atlası',
                fr: 'Lexique et Atlas des Racines Arabes',
              }}
              primaryClassName="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
              secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
              forceStacked
            />
            <BilingualText
              as="p"
              text={{
                tr: 'Kitâbü’s-Salât fî Ramadân’daki 8 hadisin tamamından otomatik derlenen kelime tahlilleri ile TDV DİA fıkıh ve hadis usulü terimleri.',
                fr: 'Glossaire automatiquement peuplé à partir des 8 hadiths du Kitâb as-Salât fî Ramadân et enrichi des concepts clés d’usûl al-fiqh et de hadith.',
              }}
              primaryClassName="text-xs sm:text-sm text-[#57514A] dark:text-[#C5BEB4] leading-relaxed"
              secondaryClassName="text-xs italic text-[#787066] dark:text-[#9A9287] leading-relaxed"
              forceStacked
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5 shrink-0">
            <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] px-3.5 py-2.5 text-center">
              <p className="text-lg font-editorial font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
                {allEntries.length}
              </p>
              <p className="text-[11px] text-[#787066] dark:text-[#A8A095]">
                Madde {showFrench ? '· Entrées' : ''}
              </p>
            </div>
            <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] px-3.5 py-2.5 text-center">
              <p className="text-lg font-editorial font-semibold text-[#8B6520] dark:text-[#DFC07D] tabular-nums">
                {allRoots.length}
              </p>
              <p className="text-[11px] text-[#787066] dark:text-[#A8A095]">
                Kök {showFrench ? '· Racines' : ''}
              </p>
            </div>
            <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] px-3.5 py-2.5 text-center">
              <p className="text-lg font-editorial font-semibold text-[#165B43] dark:text-[#4FB28C] tabular-nums">
                2 + DİA
              </p>
              <p className="text-[11px] text-[#787066] dark:text-[#A8A095]">
                Bab &amp; Usûl
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Root Explorer Controls */}
      <section
        aria-label="Sözlük filtreleri"
        className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#181614] p-4 sm:p-5 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <label htmlFor="glossary-search-input" className="sr-only">
              Sözlükte Arapça, Türkçe, Fransızca veya kök ara
            </label>
            <Search
              className="w-4 h-4 text-[#787066] dark:text-[#9A9287] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="glossary-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Arapça (أوزاع), Türkçe, Fransızca veya kök ara..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[#D5CBB9] dark:border-[#342F2A] bg-[#FDFBF7] dark:bg-[#121110] text-sm text-[#1C1917] dark:text-[#FAF8F5] placeholder:text-[#8E867B] focus:outline-2 focus:outline-[#8B6520]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Aramayı temizle"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#787066] hover:text-[#1C1917] dark:hover:text-[#FAF8F5] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* POS Select */}
          <div className="md:col-span-3">
            <label htmlFor="glossary-pos-select" className="sr-only">
              Kelime türü filtresi
            </label>
            <select
              id="glossary-pos-select"
              value={posFilter}
              onChange={(e) => setPosFilter(e.target.value as 'all' | WordPartOfSpeech)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#D5CBB9] dark:border-[#342F2A] bg-[#FDFBF7] dark:bg-[#121110] text-xs font-medium text-[#1C1917] dark:text-[#FAF8F5] focus:outline-2 focus:outline-[#8B6520] cursor-pointer"
            >
              {POS_FILTER_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label.tr}
                  {showFrench ? ` · ${opt.label.fr}` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Root Select */}
          <div className="md:col-span-4">
            <label htmlFor="glossary-root-select" className="sr-only">
              Arapça kök filtresi
            </label>
            <select
              id="glossary-root-select"
              value={rootFilter}
              onChange={(e) => setRootFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#D5CBB9] dark:border-[#342F2A] bg-[#FDFBF7] dark:bg-[#121110] text-xs font-medium text-[#1C1917] dark:text-[#FAF8F5] focus:outline-2 focus:outline-[#8B6520] cursor-pointer"
            >
              <option value="all">
                Tüm Kökler ({allRoots.length}) {showFrench ? '· Toutes les racines' : ''}
              </option>
              {allRoots.map((r) => (
                <option key={r.rootNormalized} value={r.rootNormalized}>
                  Kök: {r.root} ({r.count} madde)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scope / Bab Filter + Core Terms Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Kaynak ve bab filtresi">
            {(
              [
                { id: 'all', tr: 'Tümü', fr: 'Tout' },
                { id: 1, tr: '1. Bab (Hadis 1–2)', fr: 'Chap. 1' },
                { id: 2, tr: '2. Bab (Hadis 3–8)', fr: 'Chap. 2' },
                { id: 'dia', tr: 'DİA Usûl & Hadis', fr: 'Usûl DİA' },
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
                      : 'border-[#DDD4C5] dark:border-[#2E2924] bg-[#FDFBF7] dark:bg-[#141210] text-[#57514A] dark:text-[#C5BEB4] hover:border-[#8B6520]'
                  }`}
                >
                  <span>{opt.tr}</span>
                  {showFrench && (
                    <span lang="fr" className="ml-1 font-normal opacity-80">
                      · {opt.fr}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setOnlyCore((prev) => !prev)}
              aria-pressed={onlyCore}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                onlyCore
                  ? 'border-[#8B6520] bg-[#8B6520]/15 text-[#7A5616] dark:border-[#DFC07D] dark:bg-[#DFC07D]/20 dark:text-[#DFC07D]'
                  : 'border-[#DDD4C5] dark:border-[#2E2924] text-[#57514A] dark:text-[#C5BEB4] hover:border-[#8B6520]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Temel Kavramlar {showFrench ? '· Termes clés' : ''}</span>
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#722630] dark:text-[#D47A85] hover:bg-[#722630]/10 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Sıfırla</span>
              </button>
            )}
          </div>
        </div>

        {/* Productive Arabic Roots Quick Strip */}
        <div className="pt-3 border-t border-[#E7E0D4] dark:border-[#2C2824] flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#787066] dark:text-[#9A9287] flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" aria-hidden="true" />
            <span>Kök Aileleri {showFrench ? '· Racines' : ''}:</span>
          </span>
          {topRoots.map((r) => {
            const active = rootFilter === r.rootNormalized;
            return (
              <button
                key={r.rootNormalized}
                type="button"
                onClick={() => setRootFilter(active ? 'all' : r.rootNormalized)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-colors cursor-pointer ${
                  active
                    ? 'border-[#8B6520] bg-[#8B6520] text-[#FAF8F5] dark:border-[#DFC07D] dark:bg-[#DFC07D] dark:text-[#121110]'
                    : 'border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/60 dark:bg-[#1D1A17] text-[#1C1917] dark:text-[#FAF8F5] hover:border-[#8B6520]'
                }`}
              >
                <span dir="rtl" lang="ar" className="font-arabic text-base leading-none">
                  {r.root}
                </span>
                <span className="text-[10px] opacity-75 tabular-nums">({r.count})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#57514A] dark:text-[#C5BEB4]">
        <p data-testid="glossary-result-count">
          <strong className="font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
            {filteredEntries.length}
          </strong>{' '}
          madde listeleniyor
          {showFrench && (
            <span lang="fr" className="italic text-[#787066] dark:text-[#9A9287] ml-1.5">
              · {filteredEntries.length} entrées affichées
            </span>
          )}
        </p>
      </div>

      {/* Main 12-Col Glossary Workbench */}
      {filteredEntries.length === 0 ? (
        <section className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#181614] p-10 text-center space-y-3">
          <p className="text-sm font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
            Seçili filtrelere uyan sözlük maddesi bulunamadı.
          </p>
          {showFrench && (
            <p lang="fr" className="text-xs italic text-[#787066] dark:text-[#9A9287]">
              Aucune entrée ne correspond aux filtres sélectionnés.
            </p>
          )}
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] text-xs font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Filtreleri Temizle</span>
          </button>
        </section>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 7 Cols: Scannable Dictionary Cards */}
          <div className="lg:col-span-7 space-y-2.5" data-testid="glossary-entries-list">
            {displayedEntries.map((entry) => {
              const isSelected = selectedEntry?.id === entry.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setSelectedId(entry.id)}
                  aria-pressed={isSelected}
                  className={`w-full text-left rounded-xl border p-4 transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[#8B6520] bg-[#F3EFE8]/90 dark:border-[#DFC07D] dark:bg-[#1F1C18] shadow-xs'
                      : 'border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] hover:border-[#8B6520]/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded-md border text-[10px] font-semibold ${
                            POS_ACCENT[entry.pos] ?? POS_ACCENT.isim
                          }`}
                        >
                          {entry.posLabel.tr}
                        </span>
                        {entry.sourceGroup === 'dia-usul' && (
                          <span className="px-2 py-0.5 rounded-md border border-[#165B43]/35 bg-[#165B43]/10 text-[#165B43] dark:border-[#4FB28C]/35 dark:text-[#7AD4B2] text-[10px] font-semibold">
                            DİA Usûl
                          </span>
                        )}
                        {entry.root !== '—' && (
                          <span className="text-[11px] text-[#8B6520] dark:text-[#DFC07D] font-medium">
                            Kök: <span dir="rtl" lang="ar" className="font-arabic text-sm">{entry.root}</span>
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                        {entry.transliteration}
                      </p>

                      <BilingualText
                        as="p"
                        text={entry.meaning}
                        primaryClassName="text-xs text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                        secondaryClassName="text-[11px] italic text-[#787066] dark:text-[#9A9287] leading-relaxed"
                        forceStacked
                      />

                      {entry.hadithNumbers.length > 0 && (
                        <p className="text-[11px] text-[#787066] dark:text-[#9A9287] pt-0.5">
                          Hadis: {entry.hadithNumbers.join(', ')}
                          {entry.sourceGroup === 'hadith' && ` · ${entry.occurrences}×`}
                        </p>
                      )}
                    </div>

                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-2xl sm:text-3xl leading-[1.75] text-[#1C1917] dark:text-[#FAF8F5] text-right shrink-0"
                    >
                      {entry.lemma}
                    </p>
                  </div>
                </button>
              );
            })}

            {visibleLimit < filteredEntries.length && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleLimit((prev) => prev + PAGE_STEP)}
                  className="px-5 py-2.5 rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#181614] text-xs font-semibold text-[#1C1917] dark:text-[#FAF8F5] hover:border-[#8B6520] cursor-pointer"
                >
                  Daha Fazla Göster ({filteredEntries.length - visibleLimit} madde kaldı)
                </button>
              </div>
            )}
          </div>

          {/* Right 5 Cols: Sticky Detailed Lexical Card */}
          {selectedEntry && (
            <aside
              aria-label="Seçili sözlük maddesi ayrıntısı"
              data-testid="glossary-detail-card"
              className="lg:col-span-5 lg:sticky lg:top-20 self-start rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#181614] overflow-hidden lg:max-h-[calc(100vh-6.25rem)] lg:overflow-y-auto"
            >
              <div className="px-5 py-3.5 border-b border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/85 dark:bg-[#1D1A17] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#8B6520] dark:text-[#DFC07D]" aria-hidden="true" />
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] dark:text-[#FAF8F5]">
                    Madde İncelemesi
                    {showFrench && (
                      <span lang="fr" className="ml-1.5 font-normal normal-case italic text-[#787066] dark:text-[#9A9287]">
                        · Fiche lexicale
                      </span>
                    )}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5">
                  {isSpeechSupported() && (
                    <button
                      type="button"
                      onClick={() => handleSpeakTerm(selectedEntry.lemma)}
                      aria-label="Kelimeyi Arapça dinle"
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs font-medium cursor-pointer ${
                        speaking
                          ? 'border-[#165B43] bg-[#165B43] text-white dark:border-[#4FB28C] dark:bg-[#4FB28C] dark:text-[#121110]'
                          : 'border-[#D5CBB9] dark:border-[#342F2A] text-[#57514A] dark:text-[#C5BEB4] hover:border-[#8B6520]'
                      }`}
                    >
                      {speaking ? <VolumeX className="w-3.5 h-3.5" aria-hidden="true" /> : <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />}
                      <span>AR</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleToggleBookmark(selectedEntry)}
                    aria-pressed={isBookmarked(`term-${selectedEntry.id}`)}
                    aria-label="Terimi yer imlerine ekle veya kaldır"
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs font-medium cursor-pointer ${
                      isBookmarked(`term-${selectedEntry.id}`)
                        ? 'border-[#8B6520] bg-[#8B6520]/15 text-[#7A5616] dark:border-[#DFC07D] dark:bg-[#DFC07D]/20 dark:text-[#DFC07D]'
                        : 'border-[#D5CBB9] dark:border-[#342F2A] text-[#57514A] dark:text-[#C5BEB4] hover:border-[#8B6520]'
                    }`}
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${isBookmarked(`term-${selectedEntry.id}`) ? 'fill-current' : ''}`}
                      aria-hidden="true"
                    />
                    <span>Kaydet</span>
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-5">
                {/* Arabic Lemma + Root Box */}
                <div className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/70 dark:bg-[#1D1A17] p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md border text-[11px] font-semibold ${
                          POS_ACCENT[selectedEntry.pos] ?? POS_ACCENT.isim
                        }`}
                      >
                        {selectedEntry.posLabel.tr}
                        {showFrench && (
                          <span lang="fr" className="italic font-normal ml-1">
                            · {selectedEntry.posLabel.fr}
                          </span>
                        )}
                      </span>
                      <p className="text-sm font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                        {selectedEntry.transliteration}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#787066] dark:text-[#9A9287] block">
                        Kök {showFrench ? '· Racine' : ''}
                      </span>
                      <span dir="rtl" lang="ar" className="font-arabic text-xl text-[#8B6520] dark:text-[#DFC07D]">
                        {selectedEntry.root}
                      </span>
                    </div>
                  </div>

                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-3xl sm:text-4xl leading-[1.8] text-[#1C1917] dark:text-[#FAF8F5] text-right pt-1"
                  >
                    {selectedEntry.lemma}
                  </p>

                  {selectedEntry.surfaceForms.length > 0 && selectedEntry.sourceGroup === 'hadith' && (
                    <div className="pt-2 border-t border-[#E7E0D4] dark:border-[#2C2824] flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-[#787066] dark:text-[#9A9287]">
                        Metindeki biçim(ler) {showFrench ? '· Formes attestées' : ''}
                      </span>
                      <span dir="rtl" lang="ar" className="font-arabic text-lg text-[#3A3530] dark:text-[#E6E0D6]">
                        {selectedEntry.surfaceForms.join(' ، ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Meaning */}
                <div className="space-y-1">
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
                    Anlam {showFrench ? '· Définition' : ''}
                  </h3>
                  <BilingualText
                    as="p"
                    text={selectedEntry.meaning}
                    primaryClassName="text-sm font-medium text-[#1C1917] dark:text-[#FAF8F5] leading-relaxed"
                    secondaryClassName="text-xs italic text-[#6B635B] dark:text-[#A8A095] leading-relaxed"
                    forceStacked
                  />
                </div>

                {/* Sarf & Nahiv */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="rounded-lg border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FDFBF7] dark:bg-[#141210] p-3.5 space-y-1">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#165B43] dark:text-[#4FB28C]">
                      Sarf (Biçimbilim) {showFrench ? '· Morphologie' : ''}
                    </h3>
                    <BilingualText
                      as="p"
                      text={selectedEntry.sarf}
                      primaryClassName="text-xs text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                      secondaryClassName="text-[11px] italic text-[#787066] dark:text-[#9A9287] leading-relaxed"
                      forceStacked
                    />
                  </div>
                  <div className="rounded-lg border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FDFBF7] dark:bg-[#141210] p-3.5 space-y-1">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#722630] dark:text-[#D47A85]">
                      Nahiv / Bağlam {showFrench ? '· Syntaxe & portée' : ''}
                    </h3>
                    <BilingualText
                      as="p"
                      text={selectedEntry.nahiv}
                      primaryClassName="text-xs text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                      secondaryClassName="text-[11px] italic text-[#787066] dark:text-[#9A9287] leading-relaxed"
                      forceStacked
                    />
                  </div>
                </div>

                {/* Derivatives */}
                {selectedEntry.derivatives.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
                      Aynı Kökten Türevler {showFrench ? '· Dérivés' : ''}
                    </h3>
                    <ul className="space-y-1.5">
                      {selectedEntry.derivatives.map((der, idx) => (
                        <li
                          key={`${der.arabic}-${idx}`}
                          className="flex items-center justify-between gap-3 rounded-lg border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/50 dark:bg-[#1D1A17] px-3 py-2"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-[#1C1917] dark:text-[#FAF8F5]">
                              <span className="text-[#787066] dark:text-[#A8A095] mr-1.5">{der.translit}:</span>
                              {der.meaning.tr}
                            </p>
                            {showFrench && (
                              <p lang="fr" className="text-[11px] italic text-[#787066] dark:text-[#9A9287]">
                                {der.meaning.fr}
                              </p>
                            )}
                          </div>
                          <span dir="rtl" lang="ar" className="font-arabic text-xl leading-[1.6] text-[#1C1917] dark:text-[#FAF8F5] shrink-0">
                            {der.arabic}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cross-Links to Hadiths or Encyclopedia Module */}
                <div className="pt-3 border-t border-[#E7E0D4] dark:border-[#2C2824] space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#787066] dark:text-[#9A9287]">
                    Geçtiği Yerler {showFrench ? '· Occurrences dans l’atlas' : ''}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.hadithNumbers.map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => onNavigate('hadisler', `hadis-${num}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] text-xs font-semibold hover:opacity-90 cursor-pointer"
                      >
                        <span>Hadis {num}’te Gör</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    ))}

                    {selectedEntry.sourceGroup === 'dia-usul' && selectedEntry.relatedRoute && selectedEntry.relatedRoute !== 'hadisler' && (
                      <button
                        type="button"
                        onClick={() => onNavigate(selectedEntry.relatedRoute!, selectedEntry.relatedTargetId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#165B43] text-[#165B43] dark:border-[#4FB28C] dark:text-[#4FB28C] text-xs font-semibold hover:bg-[#165B43]/10 cursor-pointer"
                      >
                        <span>
                          {selectedEntry.relatedRoute === 'imam-malik'
                            ? 'Usûl-i Fıkıh Bölümüne Git'
                            : 'el-Muvatta’ Bölümüne Git'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      )}
    </div>
  );
}
