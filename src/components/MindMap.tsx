import React, { useMemo, useState } from 'react';
import { ArrowRight, Bookmark, Check, Network } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import {
  MIND_MAP_NODES,
  getHadithNodesByBab,
  getMindMapNodeById,
  getThemeNodes,
} from '../data/homeData';
import type { AtlasRoute, MindMapNode } from '../types/atlas';
import { BilingualText } from './BilingualText';

type MindMapFilter = 'all' | 'bab-1' | 'bab-2' | 'themes';

interface MindMapProps {
  onNavigate: (route: AtlasRoute, targetItemId?: string) => void;
}

const FILTER_OPTIONS: { id: MindMapFilter; tr: string; fr: string }[] = [
  { id: 'all', tr: 'Tümü (2 Bab · 8 Hadis)', fr: 'Tout (2 Chap. · 8 Hadiths)' },
  { id: 'bab-1', tr: 'Bab I · Tergîb', fr: 'Chap. I · Targhîb' },
  { id: 'bab-2', tr: 'Bab II · Kıyâm', fr: 'Chap. II · Qiyâm' },
  { id: 'themes', tr: 'Fıkhî & Tarihî Temalar', fr: 'Thèmes Fiqh & Histoire' },
];

function getAccentRing(accent: MindMapNode['accent'], selected: boolean): string {
  if (selected) {
    if (accent === 'emerald') {
      return 'border-[#165B43] bg-[#165B43]/10 text-[#124936] dark:border-[#4FB28C] dark:bg-[#4FB28C]/15 dark:text-[#FAF8F5] shadow-sm';
    }
    if (accent === 'burgundy') {
      return 'border-[#722630] bg-[#722630]/10 text-[#5C1D25] dark:border-[#D47A85] dark:bg-[#D47A85]/15 dark:text-[#FAF8F5] shadow-sm';
    }
    return 'border-[#8B6520] bg-[#9A742B]/12 text-[#5E410E] dark:border-[#DFC07D] dark:bg-[#DFC07D]/15 dark:text-[#FAF8F5] shadow-sm';
  }
  return 'border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] text-[#1C1917] dark:text-[#F5F2EB] hover:border-[#9A742B]/60 dark:hover:border-[#DFC07D]/50';
}

export function MindMap({ onNavigate }: MindMapProps) {
  const { showFrench, arabicSizeClass } = useLanguage();
  const { isBookmarked, toggleBookmark, isHadithMastered } = useProgress();
  const [filter, setFilter] = useState<MindMapFilter>('all');
  const [selectedId, setSelectedId] = useState<string>('root');

  const selectedNode = useMemo(
    () => getMindMapNodeById(selectedId) ?? MIND_MAP_NODES[0],
    [selectedId]
  );

  const rootNode = getMindMapNodeById('root')!;
  const bab1Node = getMindMapNodeById('bab-1')!;
  const bab2Node = getMindMapNodeById('bab-2')!;
  const bab1Hadiths = useMemo(() => getHadithNodesByBab(1), []);
  const bab2Hadiths = useMemo(() => getHadithNodesByBab(2), []);
  const themeNodes = useMemo(() => getThemeNodes(), []);

  const showBab1 = filter === 'all' || filter === 'bab-1';
  const showBab2 = filter === 'all' || filter === 'bab-2';
  const showThemes = filter === 'all' || filter === 'themes';

  const bookmarked = isBookmarked(`mindmap-${selectedNode.id}`);

  const handleToggleBookmark = () => {
    toggleBookmark({
      id: `mindmap-${selectedNode.id}`,
      type: selectedNode.kind === 'hadith' ? 'hadith' : 'section',
      title: selectedNode.label,
      route: selectedNode.targetRoute,
      targetId: selectedNode.targetItemId,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <section
      id="zihin-haritasi"
      aria-labelledby="mindmap-heading"
      className="scroll-mt-24 pt-12 border-t border-[#E7E0D4] dark:border-[#2A2622]"
    >
      {/* Section Header + Segmented Filter */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-[#8B6520] dark:text-[#DFC07D]">
            <Network className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>
              Yapısal Atlas · 2 Bab · 8 Hadis
              {showFrench && (
                <span lang="fr" className="font-normal normal-case italic text-[#787066] dark:text-[#A8A095]">
                  {' '}· Carte conceptuelle
                </span>
              )}
            </span>
          </div>
          <BilingualText
            as="h2"
            text={{
              tr: 'Etkileşimli Zihin Haritası',
              fr: 'Carte Mentale Interactive',
            }}
            primaryClassName="font-editorial text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#FAF8F5] tracking-tight"
            secondaryClassName="text-sm sm:text-base text-[#787066] dark:text-[#A8A095] italic"
            forceStacked
          />
          <p className="text-sm text-[#57514A] dark:text-[#B5AEA4] leading-relaxed">
            Bir düğümü seçerek ilgili bab, hadis veya fıkhî konunun özetini inceleyin; doğrudan ilgili bölüme geçin.
            {showFrench && (
              <span lang="fr" className="block mt-1 text-xs text-[#787066] dark:text-[#9A9287] italic">
                Sélectionnez un nœud pour consulter le résumé du chapitre, du hadith ou du thème juridique et y accéder directement.
              </span>
            )}
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          role="tablist"
          aria-label="Zihin haritası filtresi"
          className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#F3EFE8] dark:bg-[#1C1A17] border border-[#E7E0D4] dark:border-[#2C2824]"
        >
          {FILTER_OPTIONS.map((opt) => {
            const active = filter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFilter(opt.id);
                  if (opt.id === 'bab-1') setSelectedId('bab-1');
                  else if (opt.id === 'bab-2') setSelectedId('bab-2');
                  else if (opt.id === 'themes') setSelectedId('theme-usul');
                  else setSelectedId('root');
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#FAF8F5] dark:bg-[#2A2622] text-[#1C1917] dark:text-[#FAF8F5] shadow-xs'
                    : 'text-[#57514A] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
                }`}
              >
                {opt.tr}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Zone Interactive Stage (65% Map / 35% Detail Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Top: Structured Interactive Mind Map Tree with Architectural Connectors */}
        <div
          data-testid="interactive-mind-map"
          className="lg:col-span-7 xl:col-span-8 rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/55 dark:bg-[#161412] p-5 sm:p-6 space-y-6"
        >
          {/* Central Root Node */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setSelectedId(rootNode.id)}
              aria-pressed={selectedId === rootNode.id}
              className={`w-full max-w-xl text-center px-5 py-4 rounded-xl border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A742B] ${getAccentRing(
                rootNode.accent,
                selectedId === rootNode.id
              )}`}
            >
              <span
                dir="rtl"
                lang="ar"
                className="block font-arabic text-xl sm:text-2xl text-[#8B6520] dark:text-[#DFC07D] leading-relaxed"
              >
                {rootNode.arabic}
              </span>
              <span className="block mt-1 font-editorial text-xl sm:text-2xl font-semibold">
                {rootNode.label.tr}
              </span>
              {showFrench && (
                <span lang="fr" className="block mt-0.5 text-xs text-[#57514A] dark:text-[#A8A095] italic">
                  {rootNode.label.fr}
                </span>
              )}
            </button>

            {/* Architectural SVG Branch Connector */}
            <svg
              viewBox="0 0 600 44"
              aria-hidden="true"
              className="w-full max-w-xl h-9 text-[#C9BDA9] dark:text-[#3A3530]"
              fill="none"
            >
              <path
                d="M300 0 V18 M300 18 C300 28 150 18 150 44 M300 18 C300 28 450 18 450 44"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="300" cy="18" r="3" fill="currentColor" />
            </svg>
          </div>

          {/* Two Babs Branches */}
          {(showBab1 || showBab2) && (
            <div
              className={`grid grid-cols-1 ${
                showBab1 && showBab2 ? 'md:grid-cols-12' : ''
              } gap-5 items-start`}
            >
              {/* Branch 1: Bab 1 + Hadiths 1-2 */}
              {showBab1 && (
                <div className={`space-y-3 ${showBab2 ? 'md:col-span-5' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(bab1Node.id)}
                    aria-pressed={selectedId === bab1Node.id}
                    className={`w-full text-left px-4 py-3.5 rounded-lg border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#165B43] ${getAccentRing(
                      bab1Node.accent,
                      selectedId === bab1Node.id
                    )}`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs text-[#165B43] dark:text-[#4FB28C] font-semibold">
                      <span>Bab I · 2 Hadis</span>
                      <span dir="rtl" lang="ar" className="font-arabic text-base font-normal">
                        بَابُ التَّرْغِيبِ
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold">{bab1Node.label.tr}</p>
                    {showFrench && (
                      <p lang="fr" className="mt-0.5 text-xs text-[#57514A] dark:text-[#A8A095] italic">
                        {bab1Node.label.fr}
                      </p>
                    )}
                  </button>

                  {/* Connector & Child Hadith Nodes 1–2 */}
                  <div className="pl-4 ml-3 border-l border-[#D5CBB9] dark:border-[#342F2A] space-y-2.5">
                    {bab1Hadiths.map((hadith) => {
                      const active = selectedId === hadith.id;
                      const mastered = hadith.hadithNumber
                        ? isHadithMastered(hadith.hadithNumber)
                        : false;
                      return (
                        <button
                          key={hadith.id}
                          type="button"
                          onClick={() => setSelectedId(hadith.id)}
                          aria-pressed={active}
                          className={`w-full text-left px-3.5 py-2.5 rounded-lg border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#165B43] ${getAccentRing(
                            hadith.accent,
                            active
                          )}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-[#165B43] dark:text-[#4FB28C] tabular-nums">
                              Hadis {hadith.hadithNumber}
                            </span>
                            {mastered && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#165B43] dark:text-[#4FB28C]">
                                <Check className="w-3 h-3" aria-hidden="true" />
                                Tamamlandı
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-sm font-medium">{hadith.label.tr.replace(/^Hadis \d+\s*·\s*/, '')}</p>
                          {showFrench && (
                            <p lang="fr" className="text-xs text-[#787066] dark:text-[#A8A095] italic">
                              {hadith.label.fr.replace(/^Hadith \d+\s*·\s*/, '')}
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Historical Bridge connecting Bab I -> Bab II (eliminates column void) */}
                  {showBab2 && (
                    <div className="mt-4 p-3.5 rounded-lg border border-dashed border-[#D5CBB9] dark:border-[#342F2A] bg-[#FAF8F5]/75 dark:bg-[#1B1916] space-y-1.5">
                      <p className="text-[11px] font-semibold tracking-wide uppercase text-[#8B6520] dark:text-[#DFC07D]">
                        Tarihsel Geçiş · Bab I → Bab II
                      </p>
                      <p className="text-xs text-[#57514A] dark:text-[#C5BEB4] leading-relaxed">
                        Resûlullah (s.a.v.) dönemi, Hz. Ebû Bekir hilâfeti ve Hz. Ömer’in ilk yıllarında münferit/dağınık kılınan terâvih, Hadis 3 ile tek imam arkasında birleştirildi.
                      </p>
                      {showFrench && (
                        <p lang="fr" className="text-[11px] text-[#787066] dark:text-[#9A9287] italic leading-relaxed">
                          De la prière individuelle sous le Prophète et Abû Bakr à la congrégation unifiée par ‘Umar (Hadith 3).
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Branch 2: Bab 2 + Hadiths 3-8 */}
              {showBab2 && (
                <div className={`space-y-3 ${showBab1 ? 'md:col-span-7' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(bab2Node.id)}
                    aria-pressed={selectedId === bab2Node.id}
                    className={`w-full text-left px-4 py-3.5 rounded-lg border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#722630] ${getAccentRing(
                      bab2Node.accent,
                      selectedId === bab2Node.id
                    )}`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs text-[#722630] dark:text-[#D47A85] font-semibold">
                      <span>Bab II · 6 Hadis</span>
                      <span dir="rtl" lang="ar" className="font-arabic text-base font-normal">
                        بَابُ قِيَامِ رَمَضَانَ
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold">{bab2Node.label.tr}</p>
                    {showFrench && (
                      <p lang="fr" className="mt-0.5 text-xs text-[#57514A] dark:text-[#A8A095] italic">
                        {bab2Node.label.fr}
                      </p>
                    )}
                  </button>

                  {/* Connector & Child Hadith Nodes 3–8 */}
                  <div className="pl-4 ml-3 border-l border-[#D5CBB9] dark:border-[#342F2A] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {bab2Hadiths.map((hadith) => {
                      const active = selectedId === hadith.id;
                      const mastered = hadith.hadithNumber
                        ? isHadithMastered(hadith.hadithNumber)
                        : false;
                      return (
                        <button
                          key={hadith.id}
                          type="button"
                          onClick={() => setSelectedId(hadith.id)}
                          aria-pressed={active}
                          className={`w-full text-left px-3.5 py-2.5 rounded-lg border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#722630] ${getAccentRing(
                            hadith.accent,
                            active
                          )}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-[#722630] dark:text-[#D47A85] tabular-nums">
                              Hadis {hadith.hadithNumber}
                            </span>
                            {mastered && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#165B43] dark:text-[#4FB28C]">
                                <Check className="w-3 h-3" aria-hidden="true" />
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-sm font-medium leading-snug">
                            {hadith.label.tr.replace(/^Hadis \d+\s*·\s*/, '')}
                          </p>
                          {showFrench && (
                            <p lang="fr" className="mt-0.5 text-[11px] text-[#787066] dark:text-[#A8A095] italic leading-snug">
                              {hadith.label.fr.replace(/^Hadith \d+\s*·\s*/, '')}
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cross-Cutting Jurisprudential & Historical Themes */}
          {showThemes && (
            <div className="pt-4 border-t border-[#E7E0D4] dark:border-[#2C2824] space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#787066] dark:text-[#9A9287]">
                  Bağlantılı Fıkhî ve Tarihî Eksenler
                  {showFrench && (
                    <span lang="fr" className="font-normal normal-case italic">
                      {' '}· Axes juridiques &amp; historiques
                    </span>
                  )}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {themeNodes.map((theme) => {
                  const active = selectedId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setSelectedId(theme.id)}
                      aria-pressed={active}
                      className={`text-left px-3.5 py-2.5 rounded-lg border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A742B] ${getAccentRing(
                        theme.accent,
                        active
                      )}`}
                    >
                      <span className="block text-xs font-semibold text-[#8B6520] dark:text-[#DFC07D]">
                        {theme.shortLabel.tr}
                      </span>
                      {showFrench && (
                        <span lang="fr" className="block mt-0.5 text-[11px] text-[#787066] dark:text-[#A8A095] italic">
                          {theme.shortLabel.fr}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: Live Detail Inspector Panel */}
        <aside
          aria-live="polite"
          data-testid="mind-map-inspector"
          className="lg:col-span-5 xl:col-span-4 rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-6 space-y-5 lg:sticky lg:top-24"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[#8B6520] dark:text-[#DFC07D]">
                {selectedNode.kind === 'root' && 'Kitap Merkezi · Livre VI'}
                {selectedNode.kind === 'bab' && `Bab ${selectedNode.babNumber} · Chapitre ${selectedNode.babNumber}`}
                {selectedNode.kind === 'hadith' &&
                  `Bab ${selectedNode.babNumber} · Hadis ${selectedNode.hadithNumber}`}
                {selectedNode.kind === 'theme' && 'Tematik Bağlantı · Axe thématique'}
              </p>
              <BilingualText
                as="h3"
                text={selectedNode.label}
                primaryClassName="font-editorial text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5] leading-snug"
                secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
                forceStacked
              />
            </div>

            <button
              type="button"
              onClick={handleToggleBookmark}
              aria-pressed={bookmarked}
              aria-label={bookmarked ? 'Yer imlerinden çıkar' : 'Yer imlerine ekle'}
              title={bookmarked ? 'Yer iminde kayıtlı' : 'Yer imine ekle'}
              className={`inline-flex items-center justify-center w-9 h-9 rounded-md border transition-colors shrink-0 cursor-pointer ${
                bookmarked
                  ? 'border-[#9A742B] bg-[#9A742B]/12 text-[#8B6520] dark:border-[#DFC07D] dark:text-[#DFC07D]'
                  : 'border-[#E7E0D4] dark:border-[#2C2824] text-[#787066] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} aria-hidden="true" />
            </button>
          </div>

          {selectedNode.arabic && (
            <div className="py-3.5 px-4 rounded-lg bg-[#F3EFE8]/80 dark:bg-[#1E1B18] border border-[#E7E0D4]/80 dark:border-[#2C2824]">
              <p
                dir="rtl"
                lang="ar"
                className={`font-arabic text-right text-[#1C1917] dark:text-[#FAF8F5] ${arabicSizeClass}`}
              >
                {selectedNode.arabic}
              </p>
            </div>
          )}

          <BilingualText
            as="p"
            text={selectedNode.summary}
            primaryClassName="text-sm text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
            secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic leading-relaxed"
          />

          {selectedNode.narratorChain && (
            <div className="pt-3 border-t border-[#E7E0D4] dark:border-[#2C2824] space-y-1">
              <p className="text-xs font-semibold text-[#57514A] dark:text-[#C5BEB4]">
                İsnad Zinciri
                {showFrench && (
                  <span lang="fr" className="font-normal italic text-[#787066] dark:text-[#9A9287]">
                    {' '}
                    · Chaîne de transmission
                  </span>
                )}
              </p>
              <p className="text-xs text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed">
                {selectedNode.narratorChain}
              </p>
            </div>
          )}

          {selectedNode.keyRuling && (
            <div className="pt-3 border-t border-[#E7E0D4] dark:border-[#2C2824] space-y-1">
              <p className="text-xs font-semibold text-[#57514A] dark:text-[#C5BEB4]">
                Fıkhî / Tarihî Vurgu
                {showFrench && (
                  <span lang="fr" className="font-normal italic text-[#787066] dark:text-[#9A9287]">
                    {' '}
                    · Point juridique / historique
                  </span>
                )}
              </p>
              <BilingualText
                as="p"
                text={selectedNode.keyRuling}
                primaryClassName="text-xs text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                secondaryClassName="text-xs text-[#787066] dark:text-[#9A9287] italic leading-relaxed"
                forceStacked
              />
            </div>
          )}

          {selectedNode.reference && (
            <p className="text-xs text-[#787066] dark:text-[#9A9287] tabular-nums">
              Kaynak: {selectedNode.reference}
            </p>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate(selectedNode.targetRoute, selectedNode.targetItemId)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] hover:bg-[#3A3530] dark:hover:bg-[#C8A152] text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A742B]"
            >
              <span>
                Bu Bölüme Git
                {showFrench && <span lang="fr" className="font-normal opacity-85"> · Ouvrir la section</span>}
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
