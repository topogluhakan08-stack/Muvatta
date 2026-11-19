import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Bookmark, Compass, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import {
  HISTORICAL_MAP_LOCATIONS,
  getMapLocationById,
  type HistoricalMapLocation,
} from '../data/imamMalikData';
import type { AtlasRoute } from '../types/atlas';
import { BilingualText } from './BilingualText';

type RegionFilter = 'all' | HistoricalMapLocation['regionGroup'];

interface HistoricalMapViewProps {
  focusedItemId?: string;
  onNavigate: (route: AtlasRoute, targetItemId?: string) => void;
}

const REGION_FILTERS: { id: RegionFilter; tr: string; fr: string }[] = [
  { id: 'all', tr: 'Tümü (8)', fr: 'Tous (8)' },
  { id: 'hijaz-yemen', tr: 'Hicaz & Yemen', fr: 'Hedjaz & Yémen' },
  { id: 'mashriq', tr: 'Meşrik', fr: 'Machrek' },
  { id: 'maghrib-andalus', tr: 'Mağrib & Endülüs', fr: 'Maghreb & al-Andalus' },
];

function buildRoutePath(from: HistoricalMapLocation, to: HistoricalMapLocation): string {
  const mx = (from.x + to.x) / 2;
  const my = Math.min(from.y, to.y) - (Math.abs(from.x - to.x) > 220 ? 58 : 26);
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
}

export function HistoricalMapView({ focusedItemId, onNavigate }: HistoricalMapViewProps) {
  const { showFrench } = useLanguage();
  const { isBookmarked, toggleBookmark } = useProgress();

  const [regionFilter, setRegionFilter] = useState<RegionFilter>('all');
  const [selectedId, setSelectedId] = useState<string>(() =>
    focusedItemId && getMapLocationById(focusedItemId) ? focusedItemId : 'medine'
  );

  useEffect(() => {
    if (focusedItemId && getMapLocationById(focusedItemId)) {
      setRegionFilter('all');
      setSelectedId(focusedItemId);
    }
  }, [focusedItemId]);

  const medina = getMapLocationById('medine')!;

  const visibleLocations = useMemo(() => {
    if (regionFilter === 'all') return HISTORICAL_MAP_LOCATIONS;
    return HISTORICAL_MAP_LOCATIONS.filter((loc) => loc.regionGroup === regionFilter);
  }, [regionFilter]);

  const selectedLocation = useMemo(
    () => getMapLocationById(selectedId) ?? medina,
    [selectedId, medina]
  );

  const saved = isBookmarked(`map-${selectedLocation.id}`);

  return (
    <div className="space-y-8">
      {/* Header & Region Filter */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-[#E7E0D4] dark:border-[#2A2622]">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              Tarihî İlim Coğrafyası · 8 Merkez
              {showFrench && (
                <span lang="fr" className="font-normal normal-case italic text-[#787066] dark:text-[#A8A095]">
                  {' '}
                  · Géographie historique du savoir
                </span>
              )}
            </span>
          </div>
          <BilingualText
            as="h1"
            text={{
              tr: 'İmam Mâlik ve el-Muvatta’ Tarihî Haritası',
              fr: 'Carte historique de l’Imam Mâlik et d’al-Muwatta’',
            }}
            primaryClassName="font-editorial text-4xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
            secondaryClassName="text-base text-[#787066] dark:text-[#A8A095] italic"
            forceStacked
          />
          <p className="text-sm text-[#57514A] dark:text-[#C5BEB4] leading-relaxed">
            Yemen’deki Asbahî köklerinden Medine merkezine, oradan Mısır, Irak, Şam, Kayrevan ve Endülüs’e uzanan rivayet ağını harita üzerindeki noktalara tıklayarak inceleyin.
            {showFrench && (
              <span lang="fr" className="block mt-1 text-xs text-[#787066] dark:text-[#9A9287] italic">
                Cliquez sur un site de la carte pour explorer le réseau savant reliant Médine au Yémen, à l’Égypte, à Bagdad, à Damas, à Kairouan et à al-Andalus.
              </span>
            )}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Harita bölge filtresi"
          className="inline-flex flex-wrap sm:flex-nowrap shrink-0 gap-1 p-1 rounded-lg bg-[#F3EFE8] dark:bg-[#1C1A17] border border-[#E7E0D4] dark:border-[#2C2824]"
        >
          {REGION_FILTERS.map((f) => {
            const active = regionFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setRegionFilter(f.id);
                  const next =
                    f.id === 'all'
                      ? HISTORICAL_MAP_LOCATIONS
                      : HISTORICAL_MAP_LOCATIONS.filter((l) => l.regionGroup === f.id);
                  if (next.length > 0 && !next.some((l) => l.id === selectedId)) {
                    setSelectedId(next[0].id);
                  }
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
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
      </div>

      {/* Main Two-Zone Cartographic Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Custom Archival SVG Historical Map */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div
            data-testid="historical-world-map"
            className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8] dark:bg-[#161412] p-3 sm:p-4 overflow-hidden"
          >
            <svg
              viewBox="0 0 900 460"
              role="img"
              aria-label="İmam Mâlik ve el-Muvatta' tarihî yayılım haritası"
              className="w-full h-auto block select-none rounded-lg"
            >
              {/* Archival Sea Canvas */}
              <rect
                x="0"
                y="0"
                width="900"
                height="460"
                className="fill-[#EAE3D5] dark:fill-[#131210] pointer-events-none"
              />

              {/* Subtle Coordinate Graticule */}
              <g className="stroke-[#D8CEBC] dark:stroke-[#23201C] pointer-events-none" strokeWidth="0.8" strokeDasharray="3 5">
                <line x1="0" y1="115" x2="900" y2="115" />
                <line x1="0" y1="230" x2="900" y2="230" />
                <line x1="0" y1="345" x2="900" y2="345" />
                <line x1="180" y1="0" x2="180" y2="460" />
                <line x1="360" y1="0" x2="360" y2="460" />
                <line x1="540" y1="0" x2="540" y2="460" />
                <line x1="720" y1="0" x2="720" y2="460" />
              </g>

              {/* Stylized Historical Landmasses: Iberia / Southern Europe */}
              <path
                d="M 42 184 L 68 122 L 154 118 L 190 144 L 246 112 L 325 104 L 368 136 L 446 118 L 538 118 L 620 132 L 732 108 L 892 120 L 892 14 L 42 14 Z"
                className="fill-[#FBF8F2] stroke-[#D2C6B2] dark:fill-[#201D19] dark:stroke-[#342F2A] pointer-events-none"
                strokeWidth="1.2"
              />

              {/* North Africa, Egypt & Nile */}
              <path
                d="M 38 228 L 104 202 L 194 198 L 284 184 L 330 202 L 372 232 L 456 236 L 548 242 L 568 274 L 598 358 L 570 450 L 38 450 Z"
                className="fill-[#FBF8F2] stroke-[#D2C6B2] dark:fill-[#201D19] dark:stroke-[#342F2A] pointer-events-none"
                strokeWidth="1.2"
              />

              {/* Levant, Mesopotamia & Arabian Peninsula */}
              <path
                d="M 558 240 L 576 178 L 624 148 L 728 158 L 798 206 L 764 246 L 826 286 L 856 336 L 774 416 L 678 442 L 642 396 L 606 318 L 578 264 Z"
                className="fill-[#FBF8F2] stroke-[#D2C6B2] dark:fill-[#201D19] dark:stroke-[#342F2A] pointer-events-none"
                strokeWidth="1.2"
              />

              {/* Sea Water Labels */}
              <text
                x="395"
                y="152"
                className="fill-[#8F8474] dark:fill-[#6E665C] text-[10px] tracking-[0.28em] uppercase font-sans pointer-events-none"
                textAnchor="middle"
              >
                AKDENİZ · MÉDITERRANÉE
              </text>
              <text
                x="595"
                y="346"
                transform="rotate(64 595 346)"
                className="fill-[#8F8474] dark:fill-[#6E665C] text-[9px] tracking-[0.22em] uppercase font-sans pointer-events-none"
                textAnchor="middle"
              >
                KIZILDENİZ
              </text>

              {/* Radiating Transmission Arcs from Medina */}
              {HISTORICAL_MAP_LOCATIONS.filter((loc) => !loc.isCenter).map((loc) => {
                const isSelectedArc = selectedLocation.id === loc.id || selectedLocation.id === 'medine';
                const inFilter = visibleLocations.some((v) => v.id === loc.id);
                return (
                  <path
                    key={`arc-${loc.id}`}
                    d={buildRoutePath(medina, loc)}
                    fill="none"
                    className={`pointer-events-none ${
                      selectedLocation.id === loc.id
                        ? 'stroke-[#8B6520] dark:stroke-[#DFC07D]'
                        : isSelectedArc && inFilter
                        ? 'stroke-[#9A742B]/55 dark:stroke-[#DFC07D]/45'
                        : 'stroke-[#C9BDA9]/40 dark:stroke-[#3A3530]/45'
                    }`}
                    strokeWidth={selectedLocation.id === loc.id ? 2.4 : 1.3}
                    strokeDasharray={selectedLocation.id === loc.id ? undefined : '5 4'}
                  />
                );
              })}

              {/* Compass Rose (Bottom Left) */}
              <g transform="translate(82, 396)" className="text-[#8B6520] dark:text-[#DFC07D] pointer-events-none" opacity="0.72">
                <circle cx="0" cy="0" r="22" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M 0 -20 L 4 0 L 0 20 L -4 0 Z" fill="currentColor" opacity="0.35" />
                <path d="M -20 0 L 0 -4 L 20 0 L 0 4 Z" fill="currentColor" opacity="0.25" />
                <text x="0" y="-26" textAnchor="middle" className="fill-current text-[9px] font-semibold">
                  K / N
                </text>
              </g>

              {/* Clickable City Markers */}
              {HISTORICAL_MAP_LOCATIONS.map((loc) => {
                const active = selectedLocation.id === loc.id;
                const dimmed = !visibleLocations.some((v) => v.id === loc.id);
                const labelOffsetY =
                  loc.id === 'mekke'
                    ? 24
                    : loc.id === 'yemen' || loc.id === 'kayrevan'
                    ? 22
                    : -15;
                const labelAnchor = loc.id === 'endulus' ? 'start' : loc.id === 'bagdat' ? 'end' : 'middle';
                const labelOffsetX = loc.id === 'endulus' ? -12 : loc.id === 'bagdat' ? 12 : 0;
                const pinLabel =
                  loc.id === 'kayrevan' ? 'Kayrevan' : loc.name.tr.split(' (')[0];

                return (
                  <g
                    key={loc.id}
                    transform={`translate(${loc.x}, ${loc.y})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${loc.name.tr} (${loc.name.fr})`}
                    aria-pressed={active}
                    onClick={() => setSelectedId(loc.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedId(loc.id);
                      }
                    }}
                    className={`cursor-pointer focus:outline-none ${dimmed ? 'opacity-35' : 'opacity-100'}`}
                  >
                    {/* Generous invisible hit area covering pin + label gap */}
                    <circle cx="0" cy="-4" r="24" fill="transparent" />
                    {active && (
                      <circle
                        cx="0"
                        cy="0"
                        r={loc.isCenter ? 18 : 15}
                        className="fill-[#9A742B]/18 stroke-[#8B6520] dark:fill-[#DFC07D]/20 dark:stroke-[#DFC07D]"
                        strokeWidth="1.4"
                      />
                    )}
                    <circle
                      cx="0"
                      cy="0"
                      r={loc.isCenter ? 8 : active ? 7.5 : 6}
                      className={
                        loc.isCenter
                          ? 'fill-[#165B43] stroke-[#FAF8F5] dark:fill-[#4FB28C] dark:stroke-[#121110]'
                          : active
                          ? 'fill-[#722630] stroke-[#FAF8F5] dark:fill-[#DFC07D] dark:stroke-[#121110]'
                          : 'fill-[#8B6520] stroke-[#FAF8F5] dark:fill-[#C8A152] dark:stroke-[#121110]'
                      }
                      strokeWidth="2"
                    />
                    <text
                      x={labelOffsetX}
                      y={labelOffsetY}
                      textAnchor={labelAnchor}
                      className={`text-[11px] font-sans ${
                        active
                          ? 'fill-[#1C1917] dark:fill-[#FAF8F5] font-bold'
                          : 'fill-[#3A3530] dark:fill-[#D6CFC5] font-semibold'
                      }`}
                    >
                      {pinLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive City Selector Grid Below Map */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {visibleLocations.map((loc) => {
              const active = selectedLocation.id === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedId(loc.id)}
                  aria-pressed={active}
                  className={`text-left px-3.5 py-2.5 rounded-lg border transition-colors cursor-pointer ${
                    active
                      ? 'border-[#8B6520] bg-[#9A742B]/12 text-[#1C1917] dark:border-[#DFC07D] dark:bg-[#DFC07D]/15 dark:text-[#FAF8F5]'
                      : 'border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] text-[#3A3530] dark:text-[#D6CFC5] hover:border-[#9A742B]/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-semibold truncate">{loc.name.tr.split(' (')[0]}</span>
                    {loc.isCenter && (
                      <span className="text-[10px] font-semibold text-[#165B43] dark:text-[#4FB28C]">
                        Merkez
                      </span>
                    )}
                  </div>
                  {showFrench && (
                    <span lang="fr" className="block text-[11px] text-[#787066] dark:text-[#9A9287] italic truncate">
                      {loc.name.fr.split(' (')[0]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Location Historical Dossier Inspector */}
        <aside
          data-testid="map-location-inspector"
          aria-live="polite"
          className="lg:col-span-5 xl:col-span-4 rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-6 space-y-5 lg:sticky lg:top-24"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#8B6520] dark:text-[#DFC07D] tabular-nums">
                <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{selectedLocation.coordinatesLabel}</span>
              </div>
              <BilingualText
                as="h2"
                text={selectedLocation.name}
                primaryClassName="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
                forceStacked
              />
            </div>

            <button
              type="button"
              onClick={() =>
                toggleBookmark({
                  id: `map-${selectedLocation.id}`,
                  type: 'section',
                  title: selectedLocation.name,
                  route: 'harita',
                  targetId: selectedLocation.id,
                  createdAt: new Date().toISOString(),
                })
              }
              aria-pressed={saved}
              aria-label={saved ? 'Şehri yer imlerinden çıkar' : 'Şehri yer imlerine ekle'}
              className={`inline-flex items-center justify-center w-9 h-9 rounded-md border transition-colors shrink-0 cursor-pointer ${
                saved
                  ? 'border-[#9A742B] bg-[#9A742B]/12 text-[#8B6520] dark:border-[#DFC07D] dark:text-[#DFC07D]'
                  : 'border-[#E7E0D4] dark:border-[#2C2824] text-[#787066] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
            </button>
          </div>

          <div className="py-2.5 px-4 rounded-lg bg-[#F3EFE8]/80 dark:bg-[#1E1B18] border border-[#E7E0D4]/80 dark:border-[#2C2824] flex items-center justify-between gap-3">
            <span className="text-xs font-medium text-[#57514A] dark:text-[#C5BEB4]">
              {selectedLocation.role.tr}
            </span>
            <span dir="rtl" lang="ar" className="font-arabic text-xl text-[#8B6520] dark:text-[#DFC07D] shrink-0">
              {selectedLocation.arabicName}
            </span>
          </div>

          <BilingualText
            as="p"
            text={selectedLocation.significance}
            primaryClassName="text-sm text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
            secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic leading-relaxed"
          />

          <div className="pt-3 border-t border-[#E7E0D4] dark:border-[#2C2824] space-y-2">
            <p className="text-xs font-semibold text-[#57514A] dark:text-[#C5BEB4]">
              Öne Çıkan İsimler &amp; Râviler
              {showFrench && (
                <span lang="fr" className="font-normal italic text-[#787066] dark:text-[#9A9287]">
                  {' '}
                  · Figures clés
                </span>
              )}
            </p>
            <p className="text-xs text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed">
              {selectedLocation.keyFigures.join(' · ')}
            </p>
          </div>

          <div className="pt-3 border-t border-[#E7E0D4] dark:border-[#2C2824] space-y-1">
            <p className="text-xs font-semibold text-[#57514A] dark:text-[#C5BEB4]">
              İlmî Miras &amp; Eserler
              {showFrench && (
                <span lang="fr" className="font-normal italic text-[#787066] dark:text-[#9A9287]">
                  {' '}
                  · Héritage &amp; œuvres
                </span>
              )}
            </p>
            <BilingualText
              as="p"
              text={selectedLocation.worksAndLegacy}
              primaryClassName="text-xs text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
              secondaryClassName="text-xs text-[#787066] dark:text-[#9A9287] italic leading-relaxed"
              forceStacked
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => onNavigate('imam-malik')}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] hover:bg-[#3A3530] dark:hover:bg-[#C8A152] text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>İmam Mâlik</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('el-muvatta')}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#D5CBB9] dark:border-[#342F2A] text-xs font-semibold text-[#1C1917] dark:text-[#FAF8F5] hover:border-[#9A742B] transition-colors cursor-pointer"
            >
              <span>el-Muvatta&apos;</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
