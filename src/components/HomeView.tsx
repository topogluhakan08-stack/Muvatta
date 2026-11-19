import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ARCHIVAL_METRICS, HERO_OVERVIEW_CARDS } from '../data/homeData';
import type { AtlasRoute, HeroOverviewCard } from '../types/atlas';
import { BilingualText } from './BilingualText';
import { MindMap } from './MindMap';

interface HomeViewProps {
  onNavigate: (route: AtlasRoute, targetItemId?: string) => void;
}

function getCardAccentText(accent: HeroOverviewCard['accent']): string {
  switch (accent) {
    case 'emerald':
      return 'text-[#165B43] dark:text-[#4FB28C]';
    case 'burgundy':
      return 'text-[#722630] dark:text-[#D47A85]';
    case 'gold':
    default:
      return 'text-[#8B6520] dark:text-[#DFC07D]';
  }
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const { showFrench } = useLanguage();

  return (
    <div className="space-y-14">
      {/* Editorial Hero Section */}
      <section aria-labelledby="hero-title" className="pt-2 sm:pt-4 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-8 space-y-5">
            <p className="text-xs font-medium tracking-wider uppercase text-[#787066] dark:text-[#A8A095]">
              TDV İslâm Ansiklopedisi · Kitâbü&apos;s-Salât fî Ramadân · H. II / M. VIII. Yüzyıl
            </p>

            <BilingualText
              as="h1"
              text={{
                tr: "el-Muvatta' & Kitâbü's\u2011Salât fî Ramadân Atlası",
                fr: "Atlas académique d'al-Muwatta' & Kitâb as\u2011Salât fî Ramadân",
              }}
              primaryClassName="font-editorial text-4xl sm:text-5xl lg:text-[3.3rem] font-semibold tracking-tight text-[#1C1917] dark:text-[#FAF8F5] leading-[1.1]"
              secondaryClassName="font-editorial text-xl sm:text-2xl text-[#6A6258] dark:text-[#B5AEA4] italic leading-snug"
              forceStacked
            />

            <BilingualText
              as="p"
              text={{
                tr: "İmam Mâlik b. Enes’in hayatı, usûl-i fıkıh mirası ve el-Muvatta’ın rivayet tarihi ile Ramazan gecesi namazını konu alan 2 bab ve 8 hadisin kelime bazlı sarf-nahiv, isnad ve şerh incelemesini bir araya getiren çift dilli (Türkçe & Fransızca) dijital beşerî bilimler atlası.",
                fr: "Un atlas numérique bilingue (turc & français) réunissant la biographie et les usûl al-fiqh de l’Imam Mâlik b. Anas, l’histoire des recensions d’al-Muwatta’ et l’étude philologique, juridique et d’isnâd des 2 chapitres et 8 hadiths consacrés à la prière de Ramadan.",
              }}
              primaryClassName="text-base text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed max-w-3xl"
              secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic leading-relaxed max-w-3xl"
            />

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('hadisler')}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] hover:bg-[#3A3530] dark:hover:bg-[#C8A152] text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A742B]"
              >
                <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  Hadisleri İncele
                  {showFrench && <span lang="fr" className="font-normal opacity-85"> · Explorer les Hadiths</span>}
                </span>
              </button>

              <a
                href="#zihin-haritasi"
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#57514A] dark:text-[#D6CFC5] hover:text-[#8B6520] dark:hover:text-[#DFC07D] transition-colors whitespace-nowrap"
              >
                <span>
                  Zihin Haritasına İn
                  {showFrench && <span lang="fr" className="italic opacity-80"> · Carte mentale</span>}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Archival Calligraphy Monograph Plaque (Single-Level Elevation, Zero Slop) */}
          <div className="lg:col-span-4 rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/75 dark:bg-[#181614] p-7 sm:p-8 flex flex-col justify-between text-center">
            <p className="text-xs tracking-widest uppercase text-[#787066] dark:text-[#9A9287]">
              Dârü&apos;l-Hicre · Medîne
            </p>
            <div className="my-6 space-y-2" dir="rtl" lang="ar">
              <p className="font-arabic text-4xl sm:text-5xl text-[#1C1917] dark:text-[#FAF8F5] leading-snug">
                المُوَطَّأُ
              </p>
              <p className="font-arabic text-xl sm:text-2xl text-[#8B6520] dark:text-[#DFC07D]">
                لِإِمَامِ الأَئِمَّةِ وَعَالِمِ المَدِينَةِ
              </p>
              <p className="font-arabic text-lg text-[#57514A] dark:text-[#C5BEB4]">
                مَالِكِ بْنِ أَنَسٍ رَضِيَ اللَّهُ عَنْهُ
              </p>
            </div>
            <div className="pt-4 border-t border-[#E7E0D4] dark:border-[#2C2824] text-xs text-[#57514A] dark:text-[#A8A095]">
              <span>Yahyâ b. Yahyâ el-Leysî Rivayeti</span>
              {showFrench && (
                <span lang="fr" className="block mt-0.5 italic text-[#787066] dark:text-[#9A9287]">
                  Recension de Yahyâ b. Yahyâ al-Laythî
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Full-Width Archival Metric Strip (Claim-to-Proof Adjacency, Tabular Numerals) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 py-5 border-y border-[#E7E0D4] dark:border-[#2A2622]">
          {ARCHIVAL_METRICS.map((metric) => (
            <div key={metric.value} className="space-y-0.5">
              <p className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
                {metric.value}
              </p>
              <p className="text-xs font-medium text-[#57514A] dark:text-[#C5BEB4]">
                {metric.label.tr}
              </p>
              {showFrench && (
                <p lang="fr" className="text-[11px] text-[#787066] dark:text-[#9A9287] italic">
                  {metric.label.fr}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3 Hero Overview Cards */}
      <section aria-labelledby="overview-cards-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <BilingualText
            as="h2"
            text={{
              tr: 'Atlasın Üç Temel Sütunu',
              fr: "Les Trois Piliers de l'Atlas",
            }}
            primaryClassName="font-editorial text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
            secondaryClassName="text-sm sm:text-base text-[#787066] dark:text-[#A8A095] italic"
            forceStacked
          />
          <p className="text-xs text-[#787066] dark:text-[#9A9287]">
            İmam · Eser · Metin · TR &amp; FR
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {HERO_OVERVIEW_CARDS.map((card) => (
            <article
              key={card.id}
              data-testid={card.id}
              className="group rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] hover:border-[#9A742B]/60 dark:hover:border-[#DFC07D]/50 transition-colors duration-200 p-6 sm:p-7 flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                {/* Quiet Editorial Index & Unboxed Metadata */}
                <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-[#E7E0D4]/80 dark:border-[#2C2824]">
                  <span className={`text-xs font-semibold tabular-nums ${getCardAccentText(card.accent)}`}>
                    {card.index}. {card.period}
                  </span>
                  <span
                    dir="rtl"
                    lang="ar"
                    className={`font-arabic text-xl ${getCardAccentText(card.accent)}`}
                  >
                    {card.arabicTitle}
                  </span>
                </div>

                {/* Primary Title + French Subtitle */}
                <div className="space-y-1">
                  <BilingualText
                    as="h3"
                    text={card.title}
                    primaryClassName="font-editorial text-2xl sm:text-[1.7rem] font-semibold text-[#1C1917] dark:text-[#FAF8F5] leading-tight"
                    secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
                    forceStacked
                  />
                  <p className="text-xs text-[#787066] dark:text-[#9A9287] pt-0.5">
                    {card.metadata.tr}
                    {showFrench && (
                      <span lang="fr" className="block italic opacity-90">
                        {card.metadata.fr}
                      </span>
                    )}
                  </p>
                </div>

                {/* Summary (TR + FR) */}
                <BilingualText
                  as="p"
                  text={card.summary}
                  primaryClassName="text-sm text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                  secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic leading-relaxed"
                  forceStacked
                />

                {/* Key Curatorial Highlights */}
                <ul className="pt-2 space-y-2 border-t border-[#E7E0D4]/70 dark:border-[#2C2824]">
                  {card.highlights.map((item, idx) => (
                    <li key={idx} className="text-xs text-[#57514A] dark:text-[#C5BEB4] leading-snug">
                      <span className="font-medium">{item.tr}</span>
                      {showFrench && (
                        <span lang="fr" className="block text-[11px] text-[#787066] dark:text-[#9A9287] italic">
                          {item.fr}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate(card.route)}
                  className="w-full inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg border border-[#D5CBB9] dark:border-[#342F2A] bg-[#F3EFE8]/70 dark:bg-[#221F1C] text-sm font-semibold text-[#1C1917] dark:text-[#FAF8F5] hover:border-[#9A742B] dark:hover:border-[#DFC07D] hover:bg-[#9A742B]/10 dark:hover:bg-[#DFC07D]/12 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A742B]"
                >
                  <span className="truncate">{card.cta.tr}</span>
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
                {showFrench && (
                  <p lang="fr" className="mt-1.5 text-[11px] text-center text-[#787066] dark:text-[#9A9287] italic">
                    {card.cta.fr}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Mind Map */}
      <MindMap onNavigate={onNavigate} />
    </div>
  );
}
