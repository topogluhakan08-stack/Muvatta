import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  Compass,
  Map,
  Quote,
  Scale,
  Square,
  Users,
  Volume2,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import {
  IMAM_MALIK_TIMELINE,
  SCHOLARS_NETWORK,
  SCHOLARLY_FACETS,
  USUL_SOURCES,
  WISDOM_QUOTES,
  getUsulByTier,
  type ScholarPerson,
  type UsulSource,
} from '../data/imamMalikData';
import type { AtlasRoute } from '../types/atlas';
import { isSpeechSupported, speakText, stopSpeech } from '../utils/speech';
import { BilingualText } from './BilingualText';

type SubTab = 'biography' | 'usul' | 'quotes';
type ScholarFilter = 'all' | ScholarPerson['role'];
type UsulTierFilter = 'all' | UsulSource['tier'];

interface ImamMalikViewProps {
  focusedItemId?: string;
  onNavigate: (route: AtlasRoute, targetItemId?: string) => void;
}

function getUsulAccentClasses(accent: UsulSource['accent'], active: boolean): string {
  if (active) {
    if (accent === 'emerald') {
      return 'border-[#165B43] bg-[#165B43]/10 dark:border-[#4FB28C] dark:bg-[#4FB28C]/15';
    }
    if (accent === 'burgundy') {
      return 'border-[#722630] bg-[#722630]/10 dark:border-[#D47A85] dark:bg-[#D47A85]/15';
    }
    return 'border-[#8B6520] bg-[#9A742B]/12 dark:border-[#DFC07D] dark:bg-[#DFC07D]/15';
  }
  return 'border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] hover:border-[#9A742B]/60 dark:hover:border-[#DFC07D]/50';
}

function getUsulNumberColor(accent: UsulSource['accent']): string {
  if (accent === 'emerald') return 'text-[#165B43] dark:text-[#4FB28C]';
  if (accent === 'burgundy') return 'text-[#722630] dark:text-[#D47A85]';
  return 'text-[#8B6520] dark:text-[#DFC07D]';
}

export function ImamMalikView({ focusedItemId, onNavigate }: ImamMalikViewProps) {
  const { showFrench, arabicSizeClass } = useLanguage();
  const { isBookmarked, toggleBookmark } = useProgress();

  const [activeTab, setActiveTab] = useState<SubTab>(() =>
    focusedItemId === 'usul' ? 'usul' : focusedItemId === 'quotes' ? 'quotes' : 'biography'
  );
  const [scholarFilter, setScholarFilter] = useState<ScholarFilter>('all');
  const [usulTier, setUsulTier] = useState<UsulTierFilter>('all');
  const [selectedUsulId, setSelectedUsulId] = useState<string>('amel-i-ehl-i-medine');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);

  useEffect(() => {
    if (focusedItemId === 'usul') {
      setActiveTab('usul');
      setSelectedUsulId('amel-i-ehl-i-medine');
    } else if (focusedItemId === 'quotes') {
      setActiveTab('quotes');
    } else if (focusedItemId === 'biography') {
      setActiveTab('biography');
    }
  }, [focusedItemId]);

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const filteredScholars = useMemo(() => {
    if (scholarFilter === 'all') return SCHOLARS_NETWORK;
    return SCHOLARS_NETWORK.filter((s) => s.role === scholarFilter);
  }, [scholarFilter]);

  const filteredUsul = useMemo(() => getUsulByTier(usulTier), [usulTier]);

  const selectedUsul = useMemo(
    () => USUL_SOURCES.find((u) => u.id === selectedUsulId) ?? USUL_SOURCES[0],
    [selectedUsulId]
  );

  const handlePlayQuote = (quoteId: string, text: string, lang: 'ar-SA' | 'tr-TR') => {
    const token = `${quoteId}-${lang}`;
    if (playingAudioId === token) {
      stopSpeech();
      setPlayingAudioId(null);
      return;
    }

    if (!isSpeechSupported()) {
      setSpeechNotice('Tarayıcınız Web Speech seslendirmesini desteklemiyor.');
      return;
    }

    setSpeechNotice(null);
    setPlayingAudioId(token);
    const started = speakText(
      text,
      lang,
      () => setPlayingAudioId(null),
      () => {
        setPlayingAudioId(null);
        setSpeechNotice('Seslendirme başlatılamadı; cihazınızda ilgili dil sesi bulunmayabilir.');
      }
    );
    if (!started) {
      setPlayingAudioId(null);
    }
  };

  return (
    <div className="space-y-10">
      {/* Monograph Header */}
      <section className="space-y-6 pb-8 border-b border-[#E7E0D4] dark:border-[#2A2622]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-3">
            <p className="text-xs font-medium tracking-wider uppercase text-[#787066] dark:text-[#A8A095]">
              TDV İslâm Ansiklopedisi, c. 27, s. 506–513 · Müellif: Ahmet Özel
            </p>
            <BilingualText
              as="h1"
              text={{
                tr: 'İmam Mâlik b. Enes',
                fr: 'Imam Mâlik b. Anas — L’Imam de Médine',
              }}
              primaryClassName="font-editorial text-4xl sm:text-5xl font-semibold text-[#1C1917] dark:text-[#FAF8F5] tracking-tight"
              secondaryClassName="font-editorial text-xl text-[#787066] dark:text-[#A8A095] italic"
              forceStacked
            />
            <p className="text-sm font-medium text-[#57514A] dark:text-[#C5BEB4]">
              Ebû Abdillâh Mâlik b. Enes b. Mâlik b. Ebî Âmir el-Asbahî el-Yemenî (93–179 / 712–795)
            </p>
            <BilingualText
              as="p"
              text={{
                tr: 'Mâlikî mezhebinin imamı, büyük müctehid ve muhaddis. Hayatının tamamına yakınını Dârü’l-Hicre’de (Medine) geçirmiş; sağlam hâfızası, râvi tenkidindeki titizliği ve yaşayan sünnet mirasını hukuk usulüne dönüştüren yaklaşımıyla İslâm ilim tarihinin kurucu zirvelerinden biri olmuştur.',
                fr: 'Fondateur de l’école juridique mâlikite, grand mujtahid et maître du hadith. Demeuré presque toute sa vie à Médine (Dâr al-Hijra), il s’est imposé par la rigueur de sa critique des transmetteurs et sa méthodologie juridique fondée sur la pratique vivante de la cité prophétique.',
              }}
              primaryClassName="text-sm sm:text-base text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
              secondaryClassName="text-xs sm:text-sm text-[#787066] dark:text-[#A8A095] italic leading-relaxed"
            />
          </div>

          {/* Right Archival Portrait Plaque + Map Jump */}
          <div className="lg:col-span-4 rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/70 dark:bg-[#181614] p-6 space-y-4">
            <div className="text-center space-y-1" dir="rtl" lang="ar">
              <p className="font-arabic text-3xl text-[#1C1917] dark:text-[#FAF8F5]">
                مَالِكُ بْنُ أَنَسٍ
              </p>
              <p className="font-arabic text-lg text-[#165B43] dark:text-[#4FB28C]">
                إِمَامُ دَارِ الهِجْرَةِ
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E7E0D4] dark:border-[#2C2824] text-xs tabular-nums">
              <div>
                <dt className="text-[#787066] dark:text-[#9A9287]">Ömür / Vie</dt>
                <dd className="font-semibold text-[#1C1917] dark:text-[#FAF8F5]">93–179 H. (86 yıl)</dd>
              </div>
              <div>
                <dt className="text-[#787066] dark:text-[#9A9287]">Hocalar / Maîtres</dt>
                <dd className="font-semibold text-[#1C1917] dark:text-[#FAF8F5]">~900 âlim</dd>
              </div>
              <div>
                <dt className="text-[#787066] dark:text-[#9A9287]">Râviler / Élèves</dt>
                <dd className="font-semibold text-[#1C1917] dark:text-[#FAF8F5]">1.000+ (K. İyâz: 1.300+)</dd>
              </div>
              <div>
                <dt className="text-[#787066] dark:text-[#9A9287]">Defnedildiği Yer</dt>
                <dd className="font-semibold text-[#1C1917] dark:text-[#FAF8F5]">Cennetü’l-Bakī‘</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => onNavigate('harita')}
              className="w-full inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg border border-[#D5CBB9] dark:border-[#342F2A] bg-[#FAF8F5] dark:bg-[#221F1C] text-xs font-semibold text-[#1C1917] dark:text-[#FAF8F5] hover:border-[#9A742B] dark:hover:border-[#DFC07D] transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <Map className="w-3.5 h-3.5 text-[#8B6520] dark:text-[#DFC07D]" aria-hidden="true" />
                <span>İlim Coğrafyası Haritasını Aç</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Sub-Tab Bar */}
        <div
          role="tablist"
          aria-label="İmam Mâlik modül sekmeleri"
          className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#F3EFE8] dark:bg-[#1C1A17] border border-[#E7E0D4] dark:border-[#2C2824]"
        >
          {(
            [
              { id: 'biography', icon: BookOpen, tr: 'Biyografi & Kronoloji', fr: 'Biographie' },
              { id: 'usul', icon: Scale, tr: 'Usûl-i Fıkıh İnfografiği (11)', fr: 'Usûl al-Fiqh' },
              { id: 'quotes', icon: Quote, tr: 'Hikmet & Özdeyişler (7)', fr: 'Sagesses & Audio' },
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
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#FAF8F5] dark:bg-[#2A2622] text-[#1C1917] dark:text-[#FAF8F5] shadow-xs'
                    : 'text-[#57514A] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{tab.tr}</span>
                {showFrench && (
                  <span lang="fr" className="hidden sm:inline font-normal italic text-xs opacity-75">
                    · {tab.fr}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* TAB 1: BIOGRAPHY & TIMELINE */}
      {activeTab === 'biography' && (
        <div className="space-y-14">
          {/* Interactive Chronological Timeline */}
          <section aria-labelledby="timeline-heading" className="space-y-6">
            <BilingualText
              as="h2"
              text={{
                tr: 'Hayat Kronolojisi (93–179 / 712–795)',
                fr: 'Chronologie biographique (93–179 H. / 712–795)',
              }}
              primaryClassName="font-editorial text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
              secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
              forceStacked
            />

            <ol className="relative space-y-5 before:hidden sm:before:block sm:before:absolute sm:before:left-[8.75rem] sm:before:top-2 sm:before:bottom-2 sm:before:w-px sm:before:bg-[#E7E0D4] dark:sm:before:bg-[#2C2824]">
              {IMAM_MALIK_TIMELINE.map((event) => (
                <li key={event.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-start">
                  <div className="sm:col-span-3 sm:pr-6 sm:text-right pt-1">
                    <p className="font-editorial text-xl font-semibold text-[#8B6520] dark:text-[#DFC07D] tabular-nums">
                      {event.hijriYear}
                    </p>
                    <p className="text-xs text-[#787066] dark:text-[#9A9287] tabular-nums">
                      {event.gregorianYear}
                    </p>
                  </div>
                  <div className="sm:col-span-9 rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-5 space-y-2.5">
                    <BilingualText
                      as="h3"
                      text={event.title}
                      primaryClassName="font-editorial text-xl sm:text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                      secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
                      forceStacked
                    />
                    <BilingualText
                      as="p"
                      text={event.summary}
                      primaryClassName="text-sm text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                      secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic leading-relaxed"
                    />
                    <p className="text-[11px] text-[#787066] dark:text-[#9A9287] pt-1">
                      Kaynak: {event.sourceRef}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Teachers (~900) & Students (1,000+) Interactive Network */}
          <section aria-labelledby="network-heading" className="space-y-6 pt-8 border-t border-[#E7E0D4] dark:border-[#2A2622]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#165B43] dark:text-[#4FB28C]">
                  <Users className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>300 Tâbiî · 600 Tebeü’t-Tâbiîn · 1.000+ Râvi</span>
                </div>
                <BilingualText
                  as="h2"
                  text={{
                    tr: 'Hocaları, Önde Gelen Talebeleri ve Çağdaş Âlimler',
                    fr: 'Maîtres, disciples majeurs et contemporains',
                  }}
                  primaryClassName="font-editorial text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                  secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
                  forceStacked
                />
              </div>

              <div className="inline-flex flex-wrap gap-1 p-1 rounded-lg bg-[#F3EFE8] dark:bg-[#1C1A17] border border-[#E7E0D4] dark:border-[#2C2824]">
                {(
                  [
                    { id: 'all', label: 'Tümü' },
                    { id: 'teacher', label: 'Hocaları' },
                    { id: 'student', label: 'Talebeleri' },
                    { id: 'peer', label: 'Çağdaş İmamlar' },
                  ] as { id: ScholarFilter; label: string }[]
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setScholarFilter(opt.id)}
                    aria-pressed={scholarFilter === opt.id}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      scholarFilter === opt.id
                        ? 'bg-[#FAF8F5] dark:bg-[#2A2622] text-[#1C1917] dark:text-[#FAF8F5] shadow-xs'
                        : 'text-[#57514A] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredScholars.map((person) => (
                <article
                  key={person.id}
                  className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-5 space-y-2"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                      {person.name}
                    </h3>
                    <span className="text-xs font-medium text-[#8B6520] dark:text-[#DFC07D] shrink-0">
                      {person.region}
                    </span>
                  </div>
                  <p className="text-xs text-[#787066] dark:text-[#9A9287]">
                    {person.categoryLabel.tr}
                    {showFrench && (
                      <span lang="fr" className="italic">
                        {' '}
                        · {person.categoryLabel.fr}
                      </span>
                    )}
                  </p>
                  <BilingualText
                    as="p"
                    text={person.note}
                    primaryClassName="text-sm text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                    secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic leading-relaxed"
                    forceStacked
                  />
                </article>
              ))}
            </div>
          </section>

          {/* Scholarly Profile, Theology & Works */}
          <section aria-labelledby="facets-heading" className="space-y-6 pt-8 border-t border-[#E7E0D4] dark:border-[#2A2622]">
            <BilingualText
              as="h2"
              text={{
                tr: 'İlmî Şahsiyeti, İtikadî Tavrı ve Eserleri',
                fr: 'Personnalité scientifique, théologie et écrits',
              }}
              primaryClassName="font-editorial text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
              secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
              forceStacked
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SCHOLARLY_FACETS.map((facet) => (
                <article
                  key={facet.id}
                  className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/50 dark:bg-[#181614] p-6 space-y-3"
                >
                  <BilingualText
                    as="h3"
                    text={facet.title}
                    primaryClassName="font-editorial text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                    secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
                    forceStacked
                  />
                  <BilingualText
                    as="p"
                    text={facet.body}
                    primaryClassName="text-sm text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                    secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic leading-relaxed"
                    forceStacked
                  />
                  <div className="pt-3 border-t border-[#E7E0D4] dark:border-[#2C2824]">
                    <BilingualText
                      as="p"
                      text={facet.keyFact}
                      primaryClassName="text-xs font-medium text-[#165B43] dark:text-[#4FB28C]"
                      secondaryClassName="text-[11px] text-[#787066] dark:text-[#9A9287] italic"
                      forceStacked
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: USUL AL-FIQH INFOGRAPHIC */}
      {activeTab === 'usul' && (
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <p className="text-xs font-medium text-[#8B6520] dark:text-[#DFC07D]">
                Karâfî (Şerhu Tenkīhi’l-fusûl, s. 445) &amp; Kādî İyâz (Tertîbü’l-medârik, I, 76)
              </p>
              <BilingualText
                as="h2"
                text={{
                  tr: 'İmam Mâlik’in Usûl-i Fıkıh İnfografiği',
                  fr: 'Infographie des Usûl al-Fiqh de l’Imam Mâlik',
                }}
                primaryClassName="font-editorial text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
                forceStacked
              />
            </div>

            <div className="inline-flex flex-wrap gap-1 p-1 rounded-lg bg-[#F3EFE8] dark:bg-[#1C1A17] border border-[#E7E0D4] dark:border-[#2C2824]">
              {(
                [
                  { id: 'all', label: 'Tümü (11)' },
                  { id: 'primary', label: 'Aslî Deliller (3)' },
                  { id: 'medina-companion', label: 'Medine & Sahâbe (3)' },
                  { id: 'ijtihad', label: 'İctihad & Maslahat (5)' },
                ] as { id: UsulTierFilter; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setUsulTier(opt.id);
                    const nextList = getUsulByTier(opt.id);
                    if (nextList.length > 0 && !nextList.some((u) => u.id === selectedUsulId)) {
                      setSelectedUsulId(nextList[0].id);
                    }
                  }}
                  aria-pressed={usulTier === opt.id}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    usulTier === opt.id
                      ? 'bg-[#FAF8F5] dark:bg-[#2A2622] text-[#1C1917] dark:text-[#FAF8F5] shadow-xs'
                      : 'text-[#57514A] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Interactive 11-Source Visual Matrix */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredUsul.map((item) => {
                const active = selectedUsul.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedUsulId(item.id)}
                    aria-pressed={active}
                    className={`text-left p-4 rounded-xl border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A742B] ${getUsulAccentClasses(
                      item.accent,
                      active
                    )}`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className={`text-xs font-semibold tabular-nums ${getUsulNumberColor(item.accent)}`}>
                        {String(item.rank).padStart(2, '0')}. Delil
                      </span>
                      <span dir="rtl" lang="ar" className="font-arabic text-lg text-[#57514A] dark:text-[#D6CFC5]">
                        {item.arabic}
                      </span>
                    </div>
                    <p className="mt-1 font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                      {item.name.tr}
                    </p>
                    {showFrench && (
                      <p lang="fr" className="text-xs text-[#787066] dark:text-[#A8A095] italic">
                        {item.name.fr}
                      </p>
                    )}
                    <p className="mt-1.5 text-xs text-[#57514A] dark:text-[#B5AEA4] leading-snug">
                      {item.shortRole.tr}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right: Sticky Usul Detail Inspector */}
            <aside
              data-testid="usul-inspector"
              aria-live="polite"
              className="lg:col-span-5 rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/60 dark:bg-[#181614] p-6 space-y-5 lg:sticky lg:top-24"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className={`text-xs font-semibold tabular-nums ${getUsulNumberColor(selectedUsul.accent)}`}>
                    Usûl Esası {String(selectedUsul.rank).padStart(2, '0')} / 11
                  </p>
                  <BilingualText
                    as="h3"
                    text={selectedUsul.name}
                    primaryClassName="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                    secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
                    forceStacked
                  />
                </div>
                <span
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl text-[#8B6520] dark:text-[#DFC07D] shrink-0"
                >
                  {selectedUsul.arabic}
                </span>
              </div>

              <BilingualText
                as="p"
                text={selectedUsul.explanation}
                primaryClassName="text-sm text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic leading-relaxed"
              />

              <div className="pt-4 border-t border-[#E7E0D4] dark:border-[#2C2824] space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
                  İmam Mâlik’e Özgü Ayırt Edici İlke
                  {showFrench && (
                    <span lang="fr" className="font-normal normal-case italic text-[#787066] dark:text-[#9A9287]">
                      {' '}
                      · Spécificité mâlikite
                    </span>
                  )}
                </p>
                <BilingualText
                  as="p"
                  text={selectedUsul.malikDistinction}
                  primaryClassName="text-sm text-[#1C1917] dark:text-[#FAF8F5] leading-relaxed"
                  secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic leading-relaxed"
                  forceStacked
                />
              </div>
            </aside>
          </div>

          {/* Conflict Resolution Hierarchy Strip */}
          <div className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#57514A] dark:text-[#C5BEB4]">
              <Compass className="w-4 h-4 text-[#8B6520] dark:text-[#DFC07D]" aria-hidden="true" />
              <span>
                Deliller Arası Tercih İlkeleri (TDV DİA, c. 27)
                {showFrench && (
                  <span lang="fr" className="font-normal normal-case italic text-[#787066] dark:text-[#9A9287]">
                    {' '}
                    · Règles de pondération juridique
                  </span>
                )}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-lg bg-[#F3EFE8]/70 dark:bg-[#1E1B18] space-y-1">
                <p className="font-semibold text-[#165B43] dark:text-[#4FB28C]">
                  Naklî Medine Ameli &gt; Âhâd Haber &amp; Kıyas
                </p>
                <p className="text-[#57514A] dark:text-[#C5BEB4] leading-relaxed">
                  Resûlullah’tan nakil yoluyla gelen Medine uygulaması mütevâtir sünnet gücündedir.
                </p>
                {showFrench && (
                  <p lang="fr" className="text-[#787066] dark:text-[#9A9287] italic">
                    La pratique médinoise transmise équivaut à une Sunna notoire.
                  </p>
                )}
              </div>
              <div className="p-4 rounded-lg bg-[#F3EFE8]/70 dark:bg-[#1E1B18] space-y-1">
                <p className="font-semibold text-[#8B6520] dark:text-[#DFC07D]">
                  Medine Ameli + Haber-i Vâhid &gt; Zâhir
                </p>
                <p className="text-[#57514A] dark:text-[#C5BEB4] leading-relaxed">
                  Medine ehlinin ameliyle takviye edilen haber-i vâhid, Kur’an’ın zâhirine takdim olunur.
                </p>
                {showFrench && (
                  <p lang="fr" className="text-[#787066] dark:text-[#9A9287] italic">
                    Un récit singulier confirmé par Médine prime sur le sens apparent.
                  </p>
                )}
              </div>
              <div className="p-4 rounded-lg bg-[#F3EFE8]/70 dark:bg-[#1E1B18] space-y-1">
                <p className="font-semibold text-[#722630] dark:text-[#D47A85]">
                  Maslahat &amp; İstihsan &gt; Güçlük Doğuran Kıyas
                </p>
                <p className="text-[#57514A] dark:text-[#C5BEB4] leading-relaxed">
                  Kıyas umumun menfaatine zarar verirse terk edilir; cüz’î maslahat ve istihsan esas alınır.
                </p>
                {showFrench && (
                  <p lang="fr" className="text-[#787066] dark:text-[#9A9287] italic">
                    L’analogie cède devant l’équité (istihsân) si elle nuit au bien commun.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WISDOM & QUOTES CARDS WITH WEB SPEECH AUDIO */}
      {activeTab === 'quotes' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <BilingualText
              as="h2"
              text={{
                tr: 'İmam Mâlik’ten Hikmetler ve İlmî İlkeler',
                fr: 'Sagesses et maximes scientifiques de l’Imam Mâlik',
              }}
              primaryClassName="font-editorial text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
              secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
              forceStacked
            />
            <p className="text-xs text-[#57514A] dark:text-[#A8A095]">
              Web Speech API ile Arapça veya Türkçe sesli dinleyebilir, seçkin sözleri yer imlerinize kaydedebilirsiniz.
            </p>
            {speechNotice && (
              <p role="status" className="text-xs text-[#722630] dark:text-[#D47A85] font-medium pt-1">
                {speechNotice}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WISDOM_QUOTES.map((quote) => {
              const saved = isBookmarked(`quote-${quote.id}`);
              const playingAr = playingAudioId === `${quote.id}-ar-SA`;
              const playingTr = playingAudioId === `${quote.id}-tr-TR`;

              return (
                <article
                  key={quote.id}
                  className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-6 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-[#F3EFE8]/80 dark:bg-[#1E1B18] border border-[#E7E0D4]/80 dark:border-[#2C2824]">
                      <p
                        dir="rtl"
                        lang="ar"
                        className={`font-arabic text-right text-[#1C1917] dark:text-[#FAF8F5] ${arabicSizeClass}`}
                      >
                        {quote.arabic}
                      </p>
                    </div>

                    <BilingualText
                      as="p"
                      text={{ tr: `“${quote.tr}”`, fr: `« ${quote.fr} »` }}
                      primaryClassName="text-sm sm:text-base font-medium text-[#1C1917] dark:text-[#FAF8F5] leading-relaxed"
                      secondaryClassName="text-xs sm:text-sm text-[#787066] dark:text-[#A8A095] italic leading-relaxed"
                      forceStacked
                    />

                    <div className="pt-2 border-t border-[#E7E0D4]/70 dark:border-[#2C2824] space-y-1">
                      <p className="text-xs font-medium text-[#57514A] dark:text-[#C5BEB4]">
                        {quote.context.tr}
                      </p>
                      {showFrench && (
                        <p lang="fr" className="text-[11px] text-[#787066] dark:text-[#9A9287] italic">
                          {quote.context.fr}
                        </p>
                      )}
                      <p className="text-[11px] text-[#787066] dark:text-[#9A9287]">
                        Kaynak: {quote.source}
                      </p>
                    </div>
                  </div>

                  {/* Audio & Bookmark Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handlePlayQuote(quote.id, quote.arabic, 'ar-SA')}
                        aria-pressed={playingAr}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold transition-colors cursor-pointer ${
                          playingAr
                            ? 'border-[#165B43] bg-[#165B43] text-white dark:border-[#4FB28C] dark:bg-[#4FB28C] dark:text-[#121110]'
                            : 'border-[#D5CBB9] dark:border-[#342F2A] text-[#3A3530] dark:text-[#D6CFC5] hover:border-[#9A742B]'
                        }`}
                      >
                        {playingAr ? (
                          <Square className="w-3 h-3 fill-current" aria-hidden="true" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                        <span>{playingAr ? 'Durdur' : 'Arapça'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePlayQuote(quote.id, quote.tr, 'tr-TR')}
                        aria-pressed={playingTr}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold transition-colors cursor-pointer ${
                          playingTr
                            ? 'border-[#8B6520] bg-[#8B6520] text-white dark:border-[#DFC07D] dark:bg-[#DFC07D] dark:text-[#121110]'
                            : 'border-[#D5CBB9] dark:border-[#342F2A] text-[#3A3530] dark:text-[#D6CFC5] hover:border-[#9A742B]'
                        }`}
                      >
                        {playingTr ? (
                          <Square className="w-3 h-3 fill-current" aria-hidden="true" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                        <span>{playingTr ? 'Durdur' : 'Türkçe'}</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        toggleBookmark({
                          id: `quote-${quote.id}`,
                          type: 'section',
                          title: { tr: `Özdeyiş · ${quote.context.tr}`, fr: `Maxime · ${quote.context.fr}` },
                          route: 'imam-malik',
                          createdAt: new Date().toISOString(),
                        })
                      }
                      aria-pressed={saved}
                      aria-label={saved ? 'Özdeyişi yer imlerinden çıkar' : 'Özdeyişi yer imlerine ekle'}
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-md border transition-colors cursor-pointer ${
                        saved
                          ? 'border-[#9A742B] bg-[#9A742B]/12 text-[#8B6520] dark:border-[#DFC07D] dark:text-[#DFC07D]'
                          : 'border-[#E7E0D4] dark:border-[#2C2824] text-[#787066] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
