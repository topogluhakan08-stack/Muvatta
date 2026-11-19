import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookMarked,
  BookOpen,
  Bookmark,
  Globe2,
  LayoutGrid,
  Library,
  Link2,
  ScrollText,
  Search,
  Table2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import {
  AUTHENTICITY_EVALUATIONS,
  COMMENTARY_RECORDS,
  COMPILATION_TIMELINE,
  GOLDEN_CHAINS,
  MUVATTA_ETYMOLOGY,
  MUVATTA_KEY_METRICS,
  RELATED_STUDIES,
  RIWAYAH_RECORDS,
  filterCommentaries,
  filterRiwayahs,
  type CommentaryBaseRecension,
  type CommentaryFocus,
  type RiwayahRegion,
} from '../data/elMuvattaData';
import type { AtlasRoute } from '../types/atlas';
import { isSpeechSupported, speakText, stopSpeech } from '../utils/speech';
import { BilingualText } from './BilingualText';
import { ElMuvattaCharts } from './ElMuvattaCharts';

type MuvattaSubTab = 'overview' | 'stats' | 'riwayahs' | 'commentaries';

interface ElMuvattaViewProps {
  focusedItemId?: string;
  onNavigate: (route: AtlasRoute, targetItemId?: string) => void;
}

const REGION_FILTERS: { id: 'all' | RiwayahRegion; tr: string; fr: string }[] = [
  { id: 'all', tr: 'Tümü (9)', fr: 'Toutes (9)' },
  { id: 'maghrib-andalus', tr: 'Endülüs & Mağrib', fr: 'al-Andalus & Maghreb' },
  { id: 'egypt', tr: 'Mısır', fr: 'Égypte' },
  { id: 'iraq', tr: 'Irak', fr: 'Irak' },
  { id: 'medina', tr: 'Medine', fr: 'Médine' },
];

const FOCUS_FILTERS: { id: 'all' | CommentaryFocus; tr: string; fr: string }[] = [
  { id: 'all', tr: 'Tüm Alanlar', fr: 'Tous domaines' },
  { id: 'hadis-isnad', tr: 'Hadis & İsnad', fr: 'Hadith & Isnâd' },
  { id: 'fikih', tr: 'Fıkıh & Mukayese', fr: 'Fiqh comparé' },
  { id: 'muhtasar-lugat', tr: 'Muhtasar & Lugat', fr: 'Concis & Lexique' },
  { id: 'osmanli-hint', tr: 'Osmanlı & Hint', fr: 'Ottoman & Inde' },
];

export function ElMuvattaView({ focusedItemId, onNavigate }: ElMuvattaViewProps) {
  const { showFrench } = useLanguage();
  const { isBookmarked, toggleBookmark } = useProgress();

  const [activeTab, setActiveTab] = useState<MuvattaSubTab>(() =>
    focusedItemId === 'riwayahs' || focusedItemId === 'theme-riwayahs' ? 'riwayahs' : 'overview'
  );
  const [regionFilter, setRegionFilter] = useState<'all' | RiwayahRegion>('all');
  const [riwayahLayout, setRiwayahLayout] = useState<'cards' | 'table'>('cards');

  const [baseFilter, setBaseFilter] = useState<'all' | CommentaryBaseRecension>('all');
  const [focusFilter, setFocusFilter] = useState<'all' | CommentaryFocus>('all');
  const [commentaryQuery, setCommentaryQuery] = useState('');

  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const speechAvailable = isSpeechSupported();

  useEffect(() => {
    if (focusedItemId === 'riwayahs' || focusedItemId === 'theme-riwayahs') {
      setActiveTab('riwayahs');
    } else if (focusedItemId === 'stats') {
      setActiveTab('stats');
    } else if (focusedItemId === 'commentaries') {
      setActiveTab('commentaries');
    }
  }, [focusedItemId]);

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const visibleRiwayahs = useMemo(() => filterRiwayahs(regionFilter, RIWAYAH_RECORDS), [regionFilter]);

  const visibleCommentaries = useMemo(
    () =>
      filterCommentaries(
        {
          baseRecension: baseFilter,
          focus: focusFilter,
          query: commentaryQuery,
        },
        COMMENTARY_RECORDS
      ),
    [baseFilter, focusFilter, commentaryQuery]
  );

  const handleToggleSpeech = (id: string, text: string, lang: 'ar-SA' | 'tr-TR') => {
    if (speakingId === id) {
      stopSpeech();
      setSpeakingId(null);
      return;
    }
    const started = speakText(text, lang, () => setSpeakingId(null));
    if (started) {
      setSpeakingId(id);
    }
  };

  return (
    <div className="space-y-10">
      {/* Editorial Article Header */}
      <section className="space-y-6 pb-8 border-b border-[#E7E0D4] dark:border-[#2A2622]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B6520] dark:text-[#DFC07D]">
              TDV İslâm Ansiklopedisi · c. 31, s. 414–417 · M. Yaşar Kandemir
            </p>
            <BilingualText
              as="h1"
              text={{
                tr: 'el-Muvatta’',
                fr: 'al-Muwatta’ de l’Imam Mâlik',
              }}
              primaryClassName="font-editorial text-4xl sm:text-5xl font-semibold text-[#1C1917] dark:text-[#FAF8F5] tracking-tight"
              secondaryClassName="font-editorial text-xl text-[#787066] dark:text-[#A8A095] italic"
              forceStacked
            />
            <p className="text-sm sm:text-base text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed max-w-3xl">
              {MUVATTA_ETYMOLOGY.context.tr}
              {showFrench && (
                <span lang="fr" className="block mt-1.5 text-sm text-[#787066] dark:text-[#A8A095] italic">
                  {MUVATTA_ETYMOLOGY.context.fr}
                </span>
              )}
            </p>
          </div>

          {/* Classical Title Cartouche */}
          <div className="lg:col-span-4 rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/85 dark:bg-[#181614] p-5 text-center space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B6520] dark:text-[#DFC07D]">
              159 / 776 · İlk Tasnif Eseri
            </p>
            <p dir="rtl" lang="ar" className="font-arabic text-4xl leading-[1.65] py-1 text-[#1C1917] dark:text-[#FAF8F5]">
              {MUVATTA_ETYMOLOGY.arabic}
            </p>
            <p className="text-xs text-[#57514A] dark:text-[#C5BEB4] leading-relaxed">
              {MUVATTA_ETYMOLOGY.tr}
            </p>
            {showFrench && (
              <p lang="fr" className="text-[11px] text-[#787066] dark:text-[#9A9287] italic">
                {MUVATTA_ETYMOLOGY.fr}
              </p>
            )}
          </div>
        </div>

        {/* Archival Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {MUVATTA_KEY_METRICS.map((m) => (
            <div
              key={m.id}
              className="rounded-lg border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] px-4 py-3.5"
            >
              <p className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
                {m.value}
              </p>
              <p className="text-xs font-medium text-[#57514A] dark:text-[#C5BEB4] mt-0.5">{m.label.tr}</p>
              {showFrench && (
                <p lang="fr" className="text-[11px] text-[#787066] dark:text-[#9A9287] italic">
                  {m.label.fr}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Sub-Navigation Tabs */}
        <div
          role="tablist"
          aria-label="el-Muvatta bölümleri"
          className="inline-flex flex-wrap gap-1 p-1 rounded-lg bg-[#F3EFE8] dark:bg-[#1C1A17] border border-[#E7E0D4] dark:border-[#2C2824]"
        >
          {(
            [
              {
                id: 'overview',
                icon: ScrollText,
                tr: 'Telif & Sıhhat',
                fr: 'Genèse & Authenticité',
              },
              {
                id: 'stats',
                icon: BarChart3,
                tr: 'İstatistikler (1.720)',
                fr: 'Statistiques',
              },
              {
                id: 'riwayahs',
                icon: BookMarked,
                tr: '9 Rivayet Nüshası',
                fr: '9 Recensions',
              },
              {
                id: 'commentaries',
                icon: Library,
                tr: 'Şerhler & Literatür',
                fr: 'Commentaires',
              },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#FAF8F5] dark:bg-[#2A2622] text-[#1C1917] dark:text-[#FAF8F5] shadow-xs'
                    : 'text-[#57514A] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{tab.tr}</span>
                {showFrench && (
                  <span lang="fr" className="hidden xl:inline font-normal italic text-[#787066] dark:text-[#9A9287]">
                    · {tab.fr}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* TAB 1: Compilation Timeline, Authenticity & Golden Chains */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          {/* 40-Year Compilation Timeline */}
          <section className="space-y-5">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
                Telif Süreci ve Tarihî Seyir
              </p>
              <BilingualText
                as="h2"
                text={{
                  tr: '40 Yıllık Telif, Devlet Kanunu Teklifinin Reddi ve Yayılım',
                  fr: '40 ans de compilation, refus de codification étatique et diffusion',
                }}
                primaryClassName="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
                forceStacked
              />
            </div>

            <ol className="relative border-s border-[#DDD4C4] dark:border-[#2E2924] ms-3 space-y-6">
              {COMPILATION_TIMELINE.map((item) => (
                <li key={item.id} className="ms-6">
                  <span
                    className="absolute -start-[7px] mt-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#FAF8F5] dark:border-[#121110] bg-[#8B6520] dark:bg-[#DFC07D]"
                    aria-hidden="true"
                  />
                  <article className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-5 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#8B6520] dark:text-[#DFC07D] tabular-nums">
                        {item.era}
                      </span>
                      <span className="text-[11px] text-[#787066] dark:text-[#9A9287]">
                        {item.sourceRef}
                      </span>
                    </div>
                    <BilingualText
                      as="h3"
                      text={item.title}
                      primaryClassName="font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                      secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
                      forceStacked
                    />
                    <BilingualText
                      as="p"
                      text={item.summary}
                      primaryClassName="text-sm text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                      secondaryClassName="text-xs text-[#787066] dark:text-[#9A9287] italic leading-relaxed"
                    />
                  </article>
                </li>
              ))}
            </ol>
          </section>

          {/* Silsiletü'z-Zeheb & Top Isnad Chains */}
          <section className="space-y-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#165B43] dark:text-[#4FB28C]">
                <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Hadis Otoritelerine Göre En Sahih Senedler</span>
              </div>
              <BilingualText
                as="h2"
                text={{
                  tr: 'Silsiletü’z-Zeheb (Altın Silsile) ve Medine İsnadları',
                  fr: 'Silsilat adh-Dhahab (Chaîne d’or) et isnâds médinois',
                }}
                primaryClassName="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
                forceStacked
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {GOLDEN_CHAINS.map((chain, idx) => (
                <article
                  key={chain.id}
                  className={`rounded-xl border p-5 space-y-4 ${
                    idx === 0
                      ? 'border-[#9A742B]/55 dark:border-[#DFC07D]/45 bg-[#F3EFE8]/85 dark:bg-[#1B1815]'
                      : 'border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614]'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
                      {chain.authority.tr}
                    </p>
                    <BilingualText
                      as="h3"
                      text={chain.label}
                      primaryClassName="font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                      secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
                      forceStacked
                    />
                  </div>

                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-xl text-center py-2.5 px-3 rounded-lg bg-[#FAF8F5] dark:bg-[#121110] border border-[#E7E0D4] dark:border-[#2C2824] text-[#1C1917] dark:text-[#FAF8F5]"
                  >
                    {chain.arabicChain}
                  </p>

                  <ol className="space-y-1.5">
                    {chain.chain.map((link, stepIdx) => (
                      <li
                        key={link}
                        className="flex items-center gap-2 text-xs text-[#3A3530] dark:text-[#D6CFC5]"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#E7E0D4] dark:bg-[#2A2622] text-[#1C1917] dark:text-[#FAF8F5] text-[10px] font-bold flex items-center justify-center shrink-0 tabular-nums">
                          {stepIdx + 1}
                        </span>
                        <span className="font-medium">{link}</span>
                      </li>
                    ))}
                  </ol>

                  <BilingualText
                    as="p"
                    text={chain.note}
                    primaryClassName="text-xs text-[#57514A] dark:text-[#C5BEB4] leading-relaxed pt-2 border-t border-[#E7E0D4] dark:border-[#2C2824]"
                    secondaryClassName="text-[11px] text-[#787066] dark:text-[#9A9287] italic leading-relaxed"
                  />
                </article>
              ))}
            </div>
          </section>

          {/* Classical & Modern Authenticity Evaluations */}
          <section className="space-y-5">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#722630] dark:text-[#D47A85]">
                Sıhhat Derecesi ve Metodolojik Konum
              </p>
              <BilingualText
                as="h2"
                text={{
                  tr: 'Klasik Ulemânın ve Modern Araştırmaların Değerlendirmeleri',
                  fr: 'Évaluations des maîtres classiques et de la recherche moderne',
                }}
                primaryClassName="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
                forceStacked
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {AUTHENTICITY_EVALUATIONS.map((ev) => {
                const isSpeaking = speakingId === `eval-${ev.id}`;
                return (
                  <article
                    key={ev.id}
                    className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-6 space-y-3.5 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                            {ev.scholar}
                          </h3>
                          <p className="text-xs text-[#8B6520] dark:text-[#DFC07D] font-medium">
                            {ev.dates} · {ev.stance.tr}
                          </p>
                          {showFrench && (
                            <p lang="fr" className="text-[11px] text-[#787066] dark:text-[#9A9287] italic">
                              {ev.stance.fr}
                            </p>
                          )}
                        </div>
                        {ev.arabicQuote && speechAvailable && (
                          <button
                            type="button"
                            onClick={() => handleToggleSpeech(`eval-${ev.id}`, ev.arabicQuote!, 'ar-SA')}
                            aria-label={isSpeaking ? 'Arapça seslendirmeyi durdur' : 'Şâfiî sözünü Arapça dinle'}
                            aria-pressed={isSpeaking}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium shrink-0 cursor-pointer transition-colors ${
                              isSpeaking
                                ? 'border-[#165B43] bg-[#165B43] text-white dark:border-[#4FB28C] dark:bg-[#4FB28C] dark:text-[#121110]'
                                : 'border-[#D5CBB9] dark:border-[#342F2A] text-[#57514A] dark:text-[#C5BEB4] hover:border-[#8B6520]'
                            }`}
                          >
                            {isSpeaking ? (
                              <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                            )}
                            <span>AR</span>
                          </button>
                        )}
                      </div>

                      {ev.arabicQuote && (
                        <p
                          dir="rtl"
                          lang="ar"
                          className="font-arabic text-xl text-right py-3 px-4 rounded-lg bg-[#F3EFE8] dark:bg-[#1E1B18] border border-[#E7E0D4] dark:border-[#2C2824] text-[#1C1917] dark:text-[#FAF8F5] leading-loose"
                        >
                          {ev.arabicQuote}
                        </p>
                      )}

                      <BilingualText
                        as="p"
                        text={ev.quoteOrSummary}
                        primaryClassName="text-sm text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                        secondaryClassName="text-xs text-[#787066] dark:text-[#9A9287] italic leading-relaxed"
                      />
                    </div>

                    <p className="text-[11px] text-[#787066] dark:text-[#9A9287] pt-3 border-t border-[#E7E0D4] dark:border-[#2C2824]">
                      Kaynak: {ev.citation}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: Interactive Data Visualizations */}
      {activeTab === 'stats' && <ElMuvattaCharts onNavigate={onNavigate} />}

      {/* TAB 3: 9 Surviving Riwayahs Comparison */}
      {activeTab === 'riwayahs' && (
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
                1.000’den Fazla Râvi · Günümüze Ulaşan 9 Nüsha
              </p>
              <BilingualText
                as="h2"
                text={{
                  tr: 'el-Muvatta’ın Günümüze Ulaşan 9 Rivayeti',
                  fr: 'Les 9 recensions conservées d’al-Muwatta’',
                }}
                primaryClassName="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
                forceStacked
              />
              <p className="text-xs text-[#57514A] dark:text-[#C5BEB4] leading-relaxed">
                İmam Mâlik’ten aralarında Şeybânî, Şâfiî, Yahyâ el-Kattân, Abdurrahman b. Mehdî ve Halife Hârûnürreşîd ile oğulları Emîn ve Me’mûn’un da bulunduğu 1.000’den fazla kişi rivayette bulunmuştur; TDV DİA maddesi günümüze ulaşan 9 nüshayı sıralar.
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-2">
              <div
                role="tablist"
                aria-label="Rivayet bölge filtresi"
                className="inline-flex flex-wrap gap-1 p-1 rounded-lg bg-[#F3EFE8] dark:bg-[#1C1A17] border border-[#E7E0D4] dark:border-[#2C2824]"
              >
                {REGION_FILTERS.map((f) => {
                  const active = regionFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setRegionFilter(f.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#FAF8F5] dark:bg-[#2A2622] text-[#1C1917] dark:text-[#FAF8F5] shadow-xs'
                          : 'text-[#57514A] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
                      }`}
                    >
                      {f.tr}
                    </button>
                  );
                })}
              </div>

              <div className="inline-flex p-1 rounded-lg bg-[#F3EFE8] dark:bg-[#1C1A17] border border-[#E7E0D4] dark:border-[#2C2824]">
                <button
                  type="button"
                  onClick={() => setRiwayahLayout('cards')}
                  aria-pressed={riwayahLayout === 'cards'}
                  aria-label="Kart görünümü"
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                    riwayahLayout === 'cards'
                      ? 'bg-[#FAF8F5] dark:bg-[#2A2622] text-[#1C1917] dark:text-[#FAF8F5]'
                      : 'text-[#57514A] dark:text-[#A8A095]'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Kartlar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRiwayahLayout('table')}
                  aria-pressed={riwayahLayout === 'table'}
                  aria-label="Karşılaştırma tablosu görünümü"
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                    riwayahLayout === 'table'
                      ? 'bg-[#FAF8F5] dark:bg-[#2A2622] text-[#1C1917] dark:text-[#FAF8F5]'
                      : 'text-[#57514A] dark:text-[#A8A095]'
                  }`}
                >
                  <Table2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Karşılaştırma Tablosu</span>
                </button>
              </div>
            </div>
          </div>

          {riwayahLayout === 'cards' ? (
            <div data-testid="riwayah-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleRiwayahs.map((r) => {
                const saved = isBookmarked(`riwayah-${r.id}`);
                return (
                  <article
                    key={r.id}
                    className={`rounded-xl border p-5 flex flex-col justify-between gap-4 transition-colors ${
                      r.isPrimaryForAtlas
                        ? 'border-[#165B43]/60 dark:border-[#4FB28C]/50 bg-[#165B43]/[0.04] dark:bg-[#4FB28C]/[0.06]'
                        : 'border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614]'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D] tabular-nums">
                            0{r.number} · {r.deathDate} · {r.regionLabel.tr}
                          </span>
                          <h3 className="font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                            {r.narrator}
                          </h3>
                          <p dir="rtl" lang="ar" className="font-arabic text-lg text-[#787066] dark:text-[#A8A095]">
                            {r.arabicName}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            toggleBookmark({
                              id: `riwayah-${r.id}`,
                              type: 'section',
                              title: { tr: `${r.narrator} Rivayeti`, fr: `Recension : ${r.narrator}` },
                              route: 'el-muvatta',
                              targetId: 'riwayahs',
                              createdAt: new Date().toISOString(),
                            })
                          }
                          aria-pressed={saved}
                          aria-label={`${r.narrator} rivayetini yer imlerine ekle`}
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-md border shrink-0 cursor-pointer transition-colors ${
                            saved
                              ? 'border-[#9A742B] bg-[#9A742B]/12 text-[#8B6520] dark:border-[#DFC07D] dark:text-[#DFC07D]'
                              : 'border-[#E7E0D4] dark:border-[#2C2824] text-[#787066] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
                        </button>
                      </div>

                      <div className="py-1.5 px-3 rounded-md bg-[#F3EFE8] dark:bg-[#1E1B18] border border-[#E7E0D4]/80 dark:border-[#2C2824]">
                        <p
                          className={`text-xs font-semibold ${
                            r.isPrimaryForAtlas
                              ? 'text-[#165B43] dark:text-[#4FB28C]'
                              : 'text-[#8B6520] dark:text-[#DFC07D]'
                          }`}
                        >
                          {r.distinction.tr}
                        </p>
                        {showFrench && (
                          <p lang="fr" className="text-[11px] text-[#787066] dark:text-[#9A9287] italic">
                            {r.distinction.fr}
                          </p>
                        )}
                      </div>

                      {r.alias && (
                        <p className="text-xs text-[#57514A] dark:text-[#C5BEB4]">
                          <span className="font-semibold">Diğer Adı:</span> <em>{r.alias}</em>
                        </p>
                      )}

                      <BilingualText
                        as="p"
                        text={r.description}
                        primaryClassName="text-xs text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                        secondaryClassName="text-[11px] text-[#787066] dark:text-[#9A9287] italic leading-relaxed"
                      />
                    </div>

                    <div className="pt-3 border-t border-[#E7E0D4] dark:border-[#2C2824] space-y-2">
                      <p className="text-[11px] text-[#787066] dark:text-[#9A9287] leading-relaxed">
                        <span className="font-semibold text-[#57514A] dark:text-[#C5BEB4]">Neşir:</span>{' '}
                        {r.modernEditions}
                      </p>
                      {r.isPrimaryForAtlas && (
                        <button
                          type="button"
                          onClick={() => onNavigate('hadisler')}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#165B43] text-white dark:bg-[#4FB28C] dark:text-[#121110] text-xs font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                        >
                          <span>Bu Nüshadan 8 Hadisi Oku</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div
              data-testid="riwayah-comparison-table"
              className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] overflow-x-auto"
            >
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8] dark:bg-[#1E1B18] text-[#57514A] dark:text-[#C5BEB4]">
                    <th className="py-3 px-4 font-semibold">#</th>
                    <th className="py-3 px-4 font-semibold">Râvi / Transmetteur</th>
                    <th className="py-3 px-4 font-semibold">Vefat</th>
                    <th className="py-3 px-4 font-semibold">Bölge</th>
                    <th className="py-3 px-4 font-semibold">Ayırt Edici Özellik</th>
                    <th className="py-3 px-4 font-semibold">Başlıca Neşirler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E0D4]/70 dark:divide-[#2C2824]">
                  {visibleRiwayahs.map((r) => (
                    <tr
                      key={`row-${r.id}`}
                      className={
                        r.isPrimaryForAtlas
                          ? 'bg-[#165B43]/[0.05] dark:bg-[#4FB28C]/[0.07]'
                          : 'hover:bg-[#F3EFE8]/50 dark:hover:bg-[#1E1B18]/50'
                      }
                    >
                      <td className="py-3 px-4 font-semibold tabular-nums text-[#8B6520] dark:text-[#DFC07D]">
                        0{r.number}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-[#1C1917] dark:text-[#FAF8F5]">{r.narrator}</p>
                        {r.alias && (
                          <p className="text-[11px] italic text-[#787066] dark:text-[#9A9287]">{r.alias}</p>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap tabular-nums text-[#57514A] dark:text-[#C5BEB4]">
                        {r.deathDate}
                      </td>
                      <td className="py-3 px-4 text-[#57514A] dark:text-[#C5BEB4]">
                        <p>{r.regionLabel.tr}</p>
                        {showFrench && (
                          <p lang="fr" className="text-[11px] italic text-[#787066] dark:text-[#9A9287]">
                            {r.regionLabel.fr}
                          </p>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[#3A3530] dark:text-[#D6CFC5]">
                        <p className="font-medium">{r.distinction.tr}</p>
                        {showFrench && (
                          <p lang="fr" className="text-[11px] italic text-[#787066] dark:text-[#9A9287]">
                            {r.distinction.fr}
                          </p>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[#787066] dark:text-[#9A9287] max-w-xs">
                        {r.modernEditions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Cross-link to Interactive Historical Map */}
          <div className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/75 dark:bg-[#181614] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Globe2 className="w-5 h-5 text-[#8B6520] dark:text-[#DFC07D] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                  Rivayet Nüshalarının Coğrafî Yayılımını Haritada İzleyin
                </p>
                {showFrench && (
                  <p lang="fr" className="text-xs text-[#787066] dark:text-[#A8A095] italic">
                    Suivez la diffusion géographique de ces recensions sur la carte historique.
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('harita')}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-[#D5CBB9] dark:border-[#342F2A] bg-[#FAF8F5] dark:bg-[#1C1A17] text-xs font-semibold text-[#1C1917] dark:text-[#FAF8F5] hover:border-[#8B6520] whitespace-nowrap cursor-pointer transition-colors"
            >
              <span>Tarihî Haritayı Aç</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: Filterable Commentaries & Related Studies */}
      {activeTab === 'commentaries' && (
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
                Klasik ve Çağdaş Şerh Geleneği · {COMMENTARY_RECORDS.length} Temel Şerh
              </p>
              <BilingualText
                as="h2"
                text={{
                  tr: 'el-Muvatta’ Şerhleri (Leysî ve Şeybânî Nüshalarına Göre)',
                  fr: 'Commentaires majeurs d’al-Muwatta’ (selon les recensions)',
                }}
                primaryClassName="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
                forceStacked
              />
              <p className="text-xs text-[#57514A] dark:text-[#C5BEB4] leading-relaxed max-w-3xl">
                TDV DİA tespitine göre Pîrîzâde İbrâhim, Ali el-Kārî, Kemâhî, Abdülhay el-Leknevî ve İbn Âşûr <strong>Muhammed b. Hasan eş-Şeybânî</strong> rivayetini; diğer şârihler ise <strong>Yahyâ b. Yahyâ el-Leysî</strong> rivayetini esas almıştır.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/70 dark:bg-[#181614] p-4 space-y-3">
              <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
                {/* Base Recension Segmented Filter */}
                <div
                  role="tablist"
                  aria-label="Esas alınan nüsha filtresi"
                  className="inline-flex flex-wrap gap-1 p-1 rounded-lg bg-[#FAF8F5] dark:bg-[#121110] border border-[#E7E0D4] dark:border-[#2C2824]"
                >
                  {(
                    [
                      { id: 'all', label: `Tümü (${COMMENTARY_RECORDS.length})` },
                      {
                        id: 'leysi',
                        label: `Yahyâ el-Leysî Esaslı (${COMMENTARY_RECORDS.filter((c) => c.baseRecension === 'leysi').length})`,
                      },
                      {
                        id: 'seybani',
                        label: `eş-Şeybânî Esaslı (${COMMENTARY_RECORDS.filter((c) => c.baseRecension === 'seybani').length})`,
                      },
                    ] as const
                  ).map((opt) => {
                    const active = baseFilter === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setBaseFilter(opt.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110]'
                            : 'text-[#57514A] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {/* Search Input */}
                <div className="relative w-full lg:w-72">
                  <Search
                    className="w-4 h-4 text-[#787066] dark:text-[#9A9287] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <label htmlFor="commentary-search" className="sr-only">
                    Şerh veya müellif ara
                  </label>
                  <input
                    id="commentary-search"
                    type="search"
                    value={commentaryQuery}
                    onChange={(e) => setCommentaryQuery(e.target.value)}
                    placeholder="Şerh, müellif veya konu ara..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#D5CBB9] dark:border-[#342F2A] bg-[#FAF8F5] dark:bg-[#121110] text-xs text-[#1C1917] dark:text-[#FAF8F5] placeholder:text-[#8E867B] focus:outline-2 focus:outline-[#9A742B]"
                  />
                </div>
              </div>

              {/* Focus Filter Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#787066] dark:text-[#9A9287]">
                  Odak:
                </span>
                {FOCUS_FILTERS.map((f) => {
                  const active = focusFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFocusFilter(f.id)}
                      aria-pressed={active}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                        active
                          ? 'border-[#8B6520] bg-[#9A742B]/12 text-[#1C1917] dark:border-[#DFC07D] dark:bg-[#DFC07D]/15 dark:text-[#FAF8F5]'
                          : 'border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#141210] text-[#57514A] dark:text-[#A8A095] hover:border-[#9A742B]/60'
                      }`}
                    >
                      {f.tr}
                    </button>
                  );
                })}
                <span className="ms-auto text-xs text-[#787066] dark:text-[#9A9287] tabular-nums">
                  {visibleCommentaries.length} sonuç
                </span>
              </div>
            </div>

            {/* Filtered Commentaries Grid */}
            {visibleCommentaries.length === 0 ? (
              <div className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-8 text-center space-y-3">
                <p className="text-sm font-medium text-[#1C1917] dark:text-[#FAF8F5]">
                  Seçili filtrelere uygun şerh bulunamadı.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBaseFilter('all');
                    setFocusFilter('all');
                    setCommentaryQuery('');
                  }}
                  className="px-3.5 py-1.5 rounded-md bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] text-xs font-semibold cursor-pointer"
                >
                  Filtreleri Sıfırla
                </button>
              </div>
            ) : (
              <div data-testid="commentaries-grid" className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {visibleCommentaries.map((c) => {
                  const saved = isBookmarked(`commentary-${c.id}`);
                  return (
                    <article
                      key={c.id}
                      className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-5 flex flex-col justify-between gap-3.5"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
                              {c.baseRecension === 'leysi' ? 'Yahyâ el-Leysî Esaslı' : 'eş-Şeybânî Esaslı'} ·{' '}
                              {c.century}
                            </p>
                            <h3 className="font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5] leading-snug">
                              {c.title}
                            </h3>
                            <p className="text-xs font-semibold text-[#165B43] dark:text-[#4FB28C]">
                              {c.author}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              toggleBookmark({
                                id: `commentary-${c.id}`,
                                type: 'section',
                                title: { tr: c.title, fr: `${c.title} (${c.author})` },
                                route: 'el-muvatta',
                                targetId: 'commentaries',
                                createdAt: new Date().toISOString(),
                              })
                            }
                            aria-pressed={saved}
                            aria-label={`${c.title} şerhini yer imlerine ekle`}
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-md border shrink-0 cursor-pointer transition-colors ${
                              saved
                                ? 'border-[#9A742B] bg-[#9A742B]/12 text-[#8B6520] dark:border-[#DFC07D] dark:text-[#DFC07D]'
                                : 'border-[#E7E0D4] dark:border-[#2C2824] text-[#787066] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
                            }`}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
                          </button>
                        </div>

                        <p dir="rtl" lang="ar" className="font-arabic text-lg text-right text-[#57514A] dark:text-[#C5BEB4]">
                          {c.arabicTitle}
                        </p>

                        <BilingualText
                          as="p"
                          text={c.summary}
                          primaryClassName="text-xs text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                          secondaryClassName="text-[11px] text-[#787066] dark:text-[#9A9287] italic leading-relaxed"
                        />
                      </div>

                      <p className="text-[11px] text-[#787066] dark:text-[#9A9287] pt-3 border-t border-[#E7E0D4] dark:border-[#2C2824]">
                        {c.volumesOrFormat}
                      </p>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Specialized Studies Strip */}
          <section className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/75 dark:bg-[#181614] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#8B6520] dark:text-[#DFC07D]" aria-hidden="true" />
              <BilingualText
                as="h3"
                text={{
                  tr: 'Diğer İlmî Çalışmalar: Ricâl, Garîb, Ziyâdât, Sünâiyyât ve Türkçe Tercüme',
                  fr: 'Autres travaux spécialisés : Rijâl, Gharîb, Ziyâdât, Thunâ’iyyât & traduction turque',
                }}
                primaryClassName="font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
                forceStacked
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {RELATED_STUDIES.map((study) => (
                <div
                  key={study.id}
                  className="rounded-lg border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#141210] p-4 space-y-1.5"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
                    {study.category.tr}
                    {showFrench && (
                      <span lang="fr" className="font-normal normal-case italic text-[#787066] dark:text-[#9A9287]">
                        {' '}
                        · {study.category.fr}
                      </span>
                    )}
                  </p>
                  <p className="text-sm font-semibold text-[#1C1917] dark:text-[#FAF8F5] leading-snug">
                    {study.work}
                  </p>
                  <p className="text-xs font-medium text-[#165B43] dark:text-[#4FB28C]">{study.author}</p>
                  <BilingualText
                    as="p"
                    text={study.note}
                    primaryClassName="text-xs text-[#57514A] dark:text-[#C5BEB4] leading-relaxed"
                    secondaryClassName="text-[11px] text-[#787066] dark:text-[#9A9287] italic"
                    forceStacked
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
