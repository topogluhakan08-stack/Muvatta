import React, { useMemo, useState } from 'react';
import { ArrowRight, BarChart3, CheckCircle2, Layers } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  DISTILLATION_STAGES,
  NARRATION_CATEGORIES,
  computeNarrationShares,
  getTotalNarrationCount,
  type NarrationCategory,
} from '../data/elMuvattaData';
import type { AtlasRoute } from '../types/atlas';
import { BilingualText } from './BilingualText';

interface ElMuvattaChartsProps {
  onNavigate: (route: AtlasRoute, targetItemId?: string) => void;
}

function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function describeDonutArc(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number
): string {
  const safeEnd = endAngle - startAngle >= 359.99 ? startAngle + 359.99 : endAngle;
  const outerStart = polarToCartesian(cx, cy, outerR, safeEnd);
  const outerEnd = polarToCartesian(cx, cy, outerR, startAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, safeEnd);
  const innerEnd = polarToCartesian(cx, cy, innerR, startAngle);
  const largeArcFlag = safeEnd - startAngle <= 180 ? '0' : '1';

  return [
    `M ${outerStart.x.toFixed(2)} ${outerStart.y.toFixed(2)}`,
    `A ${outerR} ${outerR} 0 ${largeArcFlag} 0 ${outerEnd.x.toFixed(2)} ${outerEnd.y.toFixed(2)}`,
    `L ${innerEnd.x.toFixed(2)} ${innerEnd.y.toFixed(2)}`,
    `A ${innerR} ${innerR} 0 ${largeArcFlag} 1 ${innerStart.x.toFixed(2)} ${innerStart.y.toFixed(2)}`,
    'Z',
  ].join(' ');
}

export function ElMuvattaCharts({ onNavigate }: ElMuvattaChartsProps) {
  const { showFrench } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const shares = useMemo(() => computeNarrationShares(NARRATION_CATEGORIES), []);
  const totalCount = useMemo(() => getTotalNarrationCount(NARRATION_CATEGORIES), []);
  const [selectedId, setSelectedId] = useState<NarrationCategory['id']>('mevkuf');

  const selectedShare = useMemo(
    () => shares.find((s) => s.id === selectedId) ?? shares[0],
    [shares, selectedId]
  );

  return (
    <div className="space-y-8">
      {/* Primary Interactive Visualization: 1,720 Narrations Breakdown */}
      <section
        aria-label="1.720 rivayet dağılım grafiği"
        className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-6 sm:p-7 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#E7E0D4] dark:border-[#2C2824]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
              <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Ebû Bekir el-Ebherî Sayımı · Zürkānî, I, 7</span>
            </div>
            <BilingualText
              as="h2"
              text={{
                tr: '61 Kitap ve 1.720 Rivayetin Türlere Göre Dağılımı',
                fr: 'Répartition des 1 720 récits dans les 61 livres',
              }}
              primaryClassName="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
              secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
              forceStacked
            />
          </div>
          <p className="text-xs text-[#787066] dark:text-[#9A9287]">
            Bir dilime tıklayarak ayrıntıları inceleyin
            {showFrench && <span lang="fr" className="block italic">Cliquez sur un segment pour inspecter</span>}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive SVG Donut Chart */}
          <div className="lg:col-span-5 flex flex-col items-center pt-1">
            <div data-testid="muvatta-donut-chart" className="w-[260px] h-[260px] sm:w-[280px] sm:h-[280px]">
              <svg
                viewBox="0 0 280 280"
                role="img"
                aria-label="el-Muvatta 1.720 rivayet dağılım halkası: 613 Mevkuf, 600 Müsned, 285 Maktû, 222 Mürsel"
                className="w-full h-full overflow-visible"
              >
                {shares.map((seg) => {
                  const active = seg.id === selectedShare.id;
                  const fill = isDark ? seg.colorDark : seg.colorLight;
                  const outerR = active ? 124 : 116;
                  const innerR = active ? 74 : 76;
                  return (
                    <path
                      key={seg.id}
                      d={describeDonutArc(140, 140, outerR, innerR, seg.startAngle + 1.2, seg.endAngle - 1.2)}
                      fill={fill}
                      opacity={active ? 1 : 0.72}
                      role="button"
                      tabIndex={0}
                      aria-label={`${seg.name.tr}: ${seg.count} rivayet (%${seg.percentage})`}
                      aria-pressed={active}
                      onClick={() => setSelectedId(seg.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedId(seg.id);
                        }
                      }}
                      className="cursor-pointer transition-all duration-200 focus:outline-none"
                    />
                  );
                })}
                {/* Center Metric Display */}
                <text
                  x="140"
                  y="130"
                  textAnchor="middle"
                  className="fill-[#1C1917] dark:fill-[#FAF8F5] font-editorial text-[34px] font-semibold tabular-nums pointer-events-none"
                >
                  {selectedShare.count.toLocaleString('tr-TR')}
                </text>
                <text
                  x="140"
                  y="153"
                  textAnchor="middle"
                  className="fill-[#57514A] dark:fill-[#C5BEB4] text-[12px] font-semibold font-sans pointer-events-none"
                >
                  {selectedShare.name.tr} · %{selectedShare.percentage.toFixed(1)}
                </text>
                <text
                  x="140"
                  y="171"
                  textAnchor="middle"
                  className="fill-[#787066] dark:fill-[#9A9287] text-[10px] font-sans tabular-nums pointer-events-none"
                >
                  Toplam {totalCount.toLocaleString('tr-TR')}
                </text>
              </svg>
            </div>
          </div>

          {/* Interactive Selector List + Live Scholarly Inspector */}
          <div className="lg:col-span-7 space-y-5">
            {/* Horizontal Stacked Ratio Bar */}
            <div className="space-y-2">
              <div className="h-3 w-full rounded-md overflow-hidden flex gap-0.5 bg-[#EFEAE0] dark:bg-[#23201C]">
                {shares.map((seg) => {
                  const active = seg.id === selectedShare.id;
                  return (
                    <button
                      key={`bar-${seg.id}`}
                      type="button"
                      onClick={() => setSelectedId(seg.id)}
                      style={{
                        width: `${seg.percentage}%`,
                        backgroundColor: isDark ? seg.colorDark : seg.colorLight,
                      }}
                      aria-label={`${seg.name.tr} (${seg.count})`}
                      className={`h-full transition-opacity cursor-pointer ${
                        active ? 'opacity-100' : 'opacity-65 hover:opacity-90'
                      }`}
                    />
                  );
                })}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {shares.map((seg) => {
                  const active = seg.id === selectedShare.id;
                  const swatch = isDark ? seg.colorDark : seg.colorLight;
                  return (
                    <button
                      key={`legend-${seg.id}`}
                      type="button"
                      onClick={() => setSelectedId(seg.id)}
                      aria-pressed={active}
                      className={`text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                        active
                          ? 'border-[#8B6520] bg-[#9A742B]/10 dark:border-[#DFC07D] dark:bg-[#DFC07D]/12'
                          : 'border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/60 dark:bg-[#141210] hover:border-[#9A742B]/55'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-xs shrink-0"
                          style={{ backgroundColor: swatch }}
                          aria-hidden="true"
                        />
                        <span className="text-xs font-semibold text-[#1C1917] dark:text-[#FAF8F5] truncate">
                          {seg.name.tr}
                        </span>
                      </div>
                      <p className="mt-1.5 font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
                        {seg.count}
                        <span className="ml-1.5 font-sans text-[11px] font-normal text-[#787066] dark:text-[#9A9287]">
                          %{seg.percentage.toFixed(1)}
                        </span>
                      </p>
                      {showFrench && (
                        <p lang="fr" className="text-[11px] text-[#787066] dark:text-[#9A9287] italic truncate">
                          {seg.name.fr.split(' (')[0]}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Segment Scholarly Inspector */}
            <div
              data-testid="narration-category-inspector"
              aria-live="polite"
              className="rounded-lg border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/75 dark:bg-[#1E1B18] p-5 space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#8B6520] dark:text-[#DFC07D] tabular-nums">
                    {selectedShare.count} Rivayet · %{selectedShare.percentage.toFixed(1)}
                  </p>
                  <BilingualText
                    as="h3"
                    text={selectedShare.name}
                    primaryClassName="font-editorial text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                    secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
                    forceStacked
                  />
                </div>
                <span dir="rtl" lang="ar" className="font-arabic text-2xl text-[#8B6520] dark:text-[#DFC07D]">
                  {selectedShare.arabicTerm}
                </span>
              </div>

              <BilingualText
                as="p"
                text={selectedShare.definition}
                primaryClassName="text-sm font-medium text-[#1C1917] dark:text-[#FAF8F5]"
                secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
              />

              <BilingualText
                as="p"
                text={selectedShare.scholarlyNote}
                primaryClassName="text-sm text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                secondaryClassName="text-xs text-[#787066] dark:text-[#9A9287] italic leading-relaxed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Quantitative Cards: 40-Year Distillation + 61 Belag Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 40-Year Pruning Visualizer */}
        <section className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-6 space-y-5">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
              40 Yıllık İhtisar Eğrisi · Kādî İyâz, I, 193
            </p>
            <BilingualText
              as="h3"
              text={{
                tr: '10.000’den 1.720 Rivayete Titiz Ayıklama',
                fr: 'De 10 000 à 1 720 récits : 40 ans d’épuration',
              }}
              primaryClassName="font-editorial text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
              secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
              forceStacked
            />
          </div>

          <div className="space-y-4">
            {DISTILLATION_STAGES.map((stage) => {
              const widthPct = Math.max(17, Math.round((stage.count / 10000) * 100));
              const isFinal = stage.id === 'final-1720';
              return (
                <div key={stage.id} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                      {stage.label.tr}
                      {showFrench && (
                        <span lang="fr" className="ml-1.5 font-normal italic text-[#787066] dark:text-[#9A9287]">
                          · {stage.label.fr}
                        </span>
                      )}
                    </span>
                    <span className="font-editorial text-lg font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
                      {stage.count.toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-xs bg-[#EFEAE0] dark:bg-[#23201C] overflow-hidden">
                    <div
                      style={{ width: `${widthPct}%` }}
                      className={`h-full rounded-xs ${
                        isFinal
                          ? 'bg-[#165B43] dark:bg-[#4FB28C]'
                          : 'bg-[#9A742B]/70 dark:bg-[#DFC07D]/60'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-[#57514A] dark:text-[#C5BEB4] leading-relaxed">
                    {stage.detail.tr}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 61 Belag Resolution & 61-Book Corpus Bridge */}
        <section className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-6 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#165B43] dark:text-[#4FB28C]">
                Belâğ Hadislerinin Muttasıl Kılınması
              </p>
              <BilingualText
                as="h3"
                text={{
                  tr: '61 Belâğ Rivayeti → %100 Muttasıl İsnad',
                  fr: 'Les 61 balâghât → 100 % reliés par isnâd continu',
                }}
                primaryClassName="font-editorial text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
                forceStacked
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg bg-[#F3EFE8] dark:bg-[#1E1B18] border border-[#E7E0D4] dark:border-[#2C2824]">
                <p className="font-editorial text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
                  61
                </p>
                <p className="text-[11px] font-semibold text-[#57514A] dark:text-[#C5BEB4] mt-0.5">
                  Belâğ / ‘Ani’s-Sika
                </p>
                <p className="text-[11px] text-[#787066] dark:text-[#9A9287]">Başlangıç kaydı</p>
              </div>
              <div className="p-3.5 rounded-lg bg-[#F3EFE8] dark:bg-[#1E1B18] border border-[#E7E0D4] dark:border-[#2C2824]">
                <p className="font-editorial text-2xl font-semibold text-[#8B6520] dark:text-[#DFC07D] tabular-nums">
                  57
                </p>
                <p className="text-[11px] font-semibold text-[#57514A] dark:text-[#C5BEB4] mt-0.5">
                  İbn Abdülber
                </p>
                <p className="text-[11px] text-[#787066] dark:text-[#9A9287]">et-Temhîd’de vasletti</p>
              </div>
              <div className="p-3.5 rounded-lg bg-[#165B43]/10 dark:bg-[#4FB28C]/12 border border-[#165B43]/30 dark:border-[#4FB28C]/30">
                <p className="font-editorial text-2xl font-semibold text-[#165B43] dark:text-[#4FB28C] tabular-nums">
                  +4
                </p>
                <p className="text-[11px] font-semibold text-[#165B43] dark:text-[#4FB28C] mt-0.5">
                  İbnü’s-Salâh
                </p>
                <p className="text-[11px] text-[#57514A] dark:text-[#C5BEB4]">Son 4’ü tamamladı</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-[#165B43] dark:text-[#4FB28C] shrink-0 mt-0.5" aria-hidden="true" />
              <p>
                İbn Abdülber’in bulamadığı son dört belâğ hadisi, İbnü’s-Salâh’ın <em>Risâle fî vasli’l-belâgāti’l-erba‘a</em> adlı eseriyle başka tariklerden muttasıl olarak tespit edilmiştir.
                {showFrench && (
                  <span lang="fr" className="block mt-1 italic text-[#787066] dark:text-[#9A9287]">
                    Les quatre derniers balâghât non reliés par Ibn ‘Abd al-Barr furent définitivement établis par Ibn as-Salâh.
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Bridge to Book 6 */}
          <div className="pt-4 border-t border-[#E7E0D4] dark:border-[#2C2824] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-[#8B6520] dark:text-[#DFC07D] shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                  61 Kitap İçinde 6. Kitap: Kitâbü’s-Salât fî Ramadân
                </p>
                <p className="text-[11px] text-[#787066] dark:text-[#9A9287]">
                  2 Bab · 8 Rivayet (Yahyâ b. Yahyâ el-Leysî Nüshası, s. 113–116)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('hadisler')}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] hover:bg-[#3A3530] dark:hover:bg-[#C8A152] text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer"
            >
              <span>8 Hadisi İncele</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
