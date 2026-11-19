import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Compass,
  Library,
  Search,
  Sparkles,
  UserCheck,
  X,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { AtlasRoute } from '../types/atlas';
import {
  SEARCH_CATEGORY_OPTIONS,
  SUGGESTED_SEARCH_QUERIES,
  buildGlobalSearchIndex,
  runGlobalSearch,
  type SearchCategory,
} from '../utils/globalSearch';
import { BilingualText } from './BilingualText';

interface GlobalSearchViewProps {
  onNavigate: (route: AtlasRoute, targetItemId?: string) => void;
}

const CATEGORY_STYLE: Record<
  SearchCategory,
  { badge: string; border: string; icon: React.ComponentType<{ className?: string }> }
> = {
  hadisler: {
    badge: 'bg-[#722630]/10 text-[#722630] border-[#722630]/30 dark:bg-[#D47A85]/15 dark:text-[#E89CA6] dark:border-[#D47A85]/35',
    border: 'hover:border-[#722630]/60 dark:hover:border-[#D47A85]/60',
    icon: BookMarked,
  },
  sozluk: {
    badge: 'bg-[#8B6520]/10 text-[#7A5616] border-[#8B6520]/30 dark:bg-[#DFC07D]/15 dark:text-[#DFC07D] dark:border-[#DFC07D]/35',
    border: 'hover:border-[#8B6520]/70 dark:hover:border-[#DFC07D]/70',
    icon: BookOpen,
  },
  'imam-malik': {
    badge: 'bg-[#165B43]/10 text-[#165B43] border-[#165B43]/30 dark:bg-[#4FB28C]/15 dark:text-[#7AD4B2] dark:border-[#4FB28C]/35',
    border: 'hover:border-[#165B43]/60 dark:hover:border-[#4FB28C]/60',
    icon: UserCheck,
  },
  'el-muvatta': {
    badge: 'bg-[#8B6520]/12 text-[#7A5616] border-[#8B6520]/35 dark:bg-[#DFC07D]/15 dark:text-[#E6CA8E] dark:border-[#DFC07D]/35',
    border: 'hover:border-[#8B6520]/70 dark:hover:border-[#DFC07D]/70',
    icon: Library,
  },
  harita: {
    badge: 'bg-[#165B43]/10 text-[#165B43] border-[#165B43]/30 dark:bg-[#4FB28C]/15 dark:text-[#7AD4B2] dark:border-[#4FB28C]/35',
    border: 'hover:border-[#165B43]/60 dark:hover:border-[#4FB28C]/60',
    icon: Compass,
  },
};

export function GlobalSearchView({ onNavigate }: GlobalSearchViewProps) {
  const { showFrench } = useLanguage();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | SearchCategory>('all');

  const fullIndex = useMemo(() => buildGlobalSearchIndex(), []);
  const indexCounts = useMemo(() => {
    const counts: Record<SearchCategory, number> = {
      hadisler: 0,
      sozluk: 0,
      'imam-malik': 0,
      'el-muvatta': 0,
      harita: 0,
    };
    for (const doc of fullIndex) {
      counts[doc.category] += 1;
    }
    return counts;
  }, [fullIndex]);

  const searchOutput = useMemo(() => runGlobalSearch(query, category), [query, category]);
  const hasQuery = query.trim().length > 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Search Masthead */}
      <section className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#F3EFE8]/75 dark:bg-[#181614] p-5 sm:p-7 space-y-5">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
            Atlas Geneli Anlık Arama · {fullIndex.length} Dizinlenmiş Kayıt
            {showFrench && (
              <span lang="fr" className="ml-1.5 font-normal normal-case italic text-[#787066] dark:text-[#9A9287]">
                · Recherche globale ({fullIndex.length} fiches indexées)
              </span>
            )}
          </p>
          <BilingualText
            as="h1"
            text={{
              tr: 'Tüm Atlas İçinde Ara',
              fr: 'Rechercher dans tout l’Atlas',
            }}
            primaryClassName="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
            secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
            forceStacked
          />
        </div>

        {/* Main Search Bar */}
        <div className="relative">
          <label htmlFor="global-search-input" className="sr-only">
            Hadisler, sözlük, İmam Mâlik, el-Muvatta ve haritada ara
          </label>
          <Search
            className="w-5 h-5 text-[#8B6520] dark:text-[#DFC07D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="global-search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim() === '') setCategory('all');
            }}
            placeholder="Hadis metni, Arapça kelime/kök (أوزاع), şârih (Nevevî, İbn Hacer), râvi, şerh veya şehir ara..."
            className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-[#D5CBB9] dark:border-[#342F2A] bg-[#FAF8F5] dark:bg-[#121110] text-sm sm:text-base text-[#1C1917] dark:text-[#FAF8F5] placeholder:text-[#8E867B] focus:outline-2 focus:outline-[#8B6520]"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('all');
              }}
              aria-label="Arama metnini temizle"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-[#787066] hover:text-[#1C1917] dark:hover:text-[#FAF8F5] cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#787066] dark:text-[#9A9287] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6520] dark:text-[#DFC07D]" aria-hidden="true" />
            <span>
              Önerilen aramalar {showFrench ? '· Recherches suggérées' : ''}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_SEARCH_QUERIES.map((sq) => (
              <button
                key={sq.query}
                type="button"
                onClick={() => {
                  setQuery(sq.query);
                  setCategory('all');
                }}
                className="px-3 py-1.5 rounded-lg border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#141210] hover:border-[#8B6520] dark:hover:border-[#DFC07D] text-xs font-medium text-[#1C1917] dark:text-[#FAF8F5] transition-colors cursor-pointer"
              >
                <span>{sq.label.tr}</span>
                {showFrench && (
                  <span lang="fr" className="ml-1.5 text-[11px] italic text-[#787066] dark:text-[#9A9287]">
                    · {sq.label.fr}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Initial State: Corpus Index Overview */}
      {!hasQuery ? (
        <section aria-label="Dizin kapsamı" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {(
            [
              {
                id: 'hadisler',
                route: 'hadisler',
                tr: 'Hadisler & Hâşiyeler',
                fr: 'Hadiths & Gloses',
                desc: '8 hadis, isnad ve şerhler',
              },
              {
                id: 'sozluk',
                route: 'sozluk',
                tr: 'Sözlük & Kökler',
                fr: 'Lexique & Racines',
                desc: 'Arapça–TR–FR kelimeler',
              },
              {
                id: 'imam-malik',
                route: 'imam-malik',
                tr: 'İmam Mâlik (DİA)',
                fr: 'Imam Mâlik (DİA)',
                desc: 'Hayat, usûl, hikmetler',
              },
              {
                id: 'el-muvatta',
                route: 'el-muvatta',
                tr: 'el-Muvatta’ (DİA)',
                fr: 'al-Muwatta’ (DİA)',
                desc: '9 rivâyet, 15 şerh, 1.720',
              },
              {
                id: 'harita',
                route: 'harita',
                tr: 'Tarihî Harita',
                fr: 'Carte historique',
                desc: 'Medine → Endülüs 8 merkez',
              },
            ] as const
          ).map((box) => {
            const Icon = CATEGORY_STYLE[box.id].icon;
            return (
              <button
                key={box.id}
                type="button"
                onClick={() => onNavigate(box.route)}
                className="text-left rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] hover:border-[#8B6520] dark:hover:border-[#DFC07D] p-4 space-y-2 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-4 h-4 text-[#8B6520] dark:text-[#DFC07D]" aria-hidden="true" />
                  <span className="text-xs font-semibold tabular-nums text-[#165B43] dark:text-[#4FB28C]">
                    {indexCounts[box.id]}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1C1917] dark:text-[#FAF8F5]">{box.tr}</p>
                  {showFrench && (
                    <p lang="fr" className="text-[11px] italic text-[#787066] dark:text-[#9A9287]">
                      {box.fr}
                    </p>
                  )}
                </div>
                <p className="text-[11px] text-[#57514A] dark:text-[#A8A095]">{box.desc}</p>
              </button>
            );
          })}
        </section>
      ) : (
        <section className="space-y-4" aria-label="Arama sonuçları">
          {/* Category Filter Tabs with Live Counts */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Sonuç kategorisi">
              {SEARCH_CATEGORY_OPTIONS.map((opt) => {
                const count =
                  opt.id === 'all'
                    ? searchOutput.totalCount
                    : searchOutput.countsByCategory[opt.id];
                const active = category === opt.id;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(opt.id)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'border-[#1C1917] bg-[#1C1917] text-[#FAF8F5] dark:border-[#DFC07D] dark:bg-[#DFC07D] dark:text-[#121110]'
                        : 'border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#181614] text-[#57514A] dark:text-[#C5BEB4] hover:border-[#8B6520]'
                    }`}
                  >
                    <span>{opt.label.tr}</span>
                    {showFrench && (
                      <span lang="fr" className="hidden sm:inline ml-1 font-normal opacity-80">
                        · {opt.label.fr}
                      </span>
                    )}
                    <span className="ml-1.5 tabular-nums opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-[#57514A] dark:text-[#C5BEB4]" data-testid="global-search-summary">
              <strong className="font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
                {searchOutput.results.length}
              </strong>{' '}
              sonuç gösteriliyor
              {showFrench && (
                <span lang="fr" className="ml-1 italic text-[#787066] dark:text-[#9A9287]">
                  · {searchOutput.results.length} résultats
                </span>
              )}
            </p>
          </div>

          {/* Results List */}
          {searchOutput.results.length === 0 ? (
            <div className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#181614] p-10 text-center space-y-2">
              <p className="text-sm font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                “{query}” için bu kategoride sonuç bulunamadı.
              </p>
              {showFrench && (
                <p lang="fr" className="text-xs italic text-[#787066] dark:text-[#9A9287]">
                  Aucun résultat trouvé pour « {query} » dans cette catégorie.
                </p>
              )}
              {category !== 'all' && searchOutput.totalCount > 0 && (
                <button
                  type="button"
                  onClick={() => setCategory('all')}
                  className="mt-2 px-4 py-2 rounded-lg bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] text-xs font-semibold cursor-pointer"
                >
                  Tüm Kategorilerde Göster ({searchOutput.totalCount})
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3" data-testid="global-search-results">
              {searchOutput.results.slice(0, 60).map(({ doc }) => {
                const style = CATEGORY_STYLE[doc.category];
                const Icon = style.icon;
                return (
                  <article
                    key={doc.id}
                    className={`rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-4 sm:p-5 transition-colors ${style.border}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-2 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-semibold ${style.badge}`}
                          >
                            <Icon className="w-3 h-3" aria-hidden="true" />
                            <span>{doc.categoryLabel.tr}</span>
                          </span>
                          <span className="text-[11px] text-[#787066] dark:text-[#9A9287]">
                            {doc.metaBadge.tr}
                            {showFrench && (
                              <span lang="fr" className="italic ml-1">
                                · {doc.metaBadge.fr}
                              </span>
                            )}
                          </span>
                        </div>

                        <BilingualText
                          as="h2"
                          text={doc.title}
                          primaryClassName="font-editorial text-lg font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                          secondaryClassName="text-xs italic text-[#787066] dark:text-[#A8A095]"
                          forceStacked
                        />

                        {doc.arabic && (
                          <p
                            dir="rtl"
                            lang="ar"
                            className="font-arabic text-xl leading-[1.85] text-[#1C1917] dark:text-[#FAF8F5] text-right bg-[#F3EFE8]/60 dark:bg-[#141210] rounded-lg px-3.5 py-2 border border-[#E7E0D4]/80 dark:border-[#2C2824]"
                          >
                            {doc.arabic}
                          </p>
                        )}

                        <BilingualText
                          as="p"
                          text={doc.snippet}
                          primaryClassName="text-xs sm:text-sm text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                          secondaryClassName="text-xs italic text-[#787066] dark:text-[#9A9287] leading-relaxed"
                          forceStacked
                        />
                      </div>

                      <div className="shrink-0 sm:pt-1">
                        <button
                          type="button"
                          onClick={() => onNavigate(doc.route, doc.targetItemId)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          <span>Bölüme Git</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
