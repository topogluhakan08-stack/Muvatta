import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { IsnadLink } from '../types/hadith';
import { BilingualText } from './BilingualText';

interface IsnadDiagramProps {
  links: IsnadLink[];
  hadithNumber: number;
}

const ROLE_STYLES: Record<
  IsnadLink['role'],
  { border: string; badge: string; dot: string }
> = {
  ravi: {
    border: 'border-[#D5CBB9] dark:border-[#342F2A]',
    badge: 'bg-[#F3EFE8] text-[#57514A] dark:bg-[#26221E] dark:text-[#C5BEB4]',
    dot: 'bg-[#787066] dark:bg-[#A8A095]',
  },
  musannif: {
    border: 'border-[#8B6520]/45 dark:border-[#DFC07D]/40',
    badge: 'bg-[#8B6520]/12 text-[#7A5616] dark:bg-[#DFC07D]/15 dark:text-[#DFC07D]',
    dot: 'bg-[#8B6520] dark:bg-[#DFC07D]',
  },
  tabii: {
    border: 'border-[#165B43]/40 dark:border-[#4FB28C]/35',
    badge: 'bg-[#165B43]/10 text-[#165B43] dark:bg-[#4FB28C]/15 dark:text-[#7AD4B2]',
    dot: 'bg-[#165B43] dark:bg-[#4FB28C]',
  },
  sahabi: {
    border: 'border-[#722630]/40 dark:border-[#D47A85]/35',
    badge: 'bg-[#722630]/10 text-[#722630] dark:bg-[#D47A85]/15 dark:text-[#E89CA6]',
    dot: 'bg-[#722630] dark:bg-[#D47A85]',
  },
  peygamber: {
    border: 'border-[#165B43] dark:border-[#4FB28C]',
    badge: 'bg-[#165B43] text-white dark:bg-[#4FB28C] dark:text-[#121110]',
    dot: 'bg-[#165B43] dark:bg-[#4FB28C]',
  },
};

export function IsnadDiagram({ links, hadithNumber }: IsnadDiagramProps) {
  const { showFrench } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number>(links.length - 1);

  return (
    <div className="space-y-4" data-testid={`isnad-diagram-${hadithNumber}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-[#57514A] dark:text-[#C5BEB4]">
          Rivâyet zinciri: Râviden kaynağa doğru ({links.length} tabaka)
          {showFrench && (
            <span lang="fr" className="ml-1.5 italic text-[#787066] dark:text-[#9A9287]">
              · Chaîne de transmission du rapporteur à la source ({links.length} maillons)
            </span>
          )}
        </p>
      </div>

      <ol className="space-y-0">
        {links.map((link, idx) => {
          const style = ROLE_STYLES[link.role];
          const isSelected = activeIndex === idx;
          return (
            <li key={`${hadithNumber}-${idx}-${link.name}`} className="relative">
              <button
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-expanded={isSelected}
                className={`w-full text-left rounded-xl border p-4 transition-colors cursor-pointer ${style.border} ${
                  isSelected
                    ? 'bg-[#F3EFE8]/85 dark:bg-[#1E1B18] shadow-xs'
                    : 'bg-[#FAF8F5] dark:bg-[#151311] hover:bg-[#F3EFE8]/50 dark:hover:bg-[#1B1815]'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <span
                      className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${style.dot}`}
                      aria-hidden="true"
                    />
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold tabular-nums text-[#787066] dark:text-[#9A9287]">
                          {idx + 1}.
                        </span>
                        <span className="text-sm font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                          {link.name}
                        </span>
                        {link.deathDate && (
                          <span className="text-[11px] text-[#787066] dark:text-[#A8A095]">
                            ({link.deathDate})
                          </span>
                        )}
                      </div>
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-medium ${style.badge}`}>
                        {link.generation.tr}
                        {showFrench && (
                          <span lang="fr" className="italic font-normal ml-1">
                            · {link.generation.fr}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-xl leading-[1.65] text-[#1C1917] dark:text-[#FAF8F5] text-right shrink-0"
                  >
                    {link.arabicName}
                  </p>
                </div>

                <div className="mt-2.5 pl-5 pt-2.5 border-t border-[#E7E0D4]/80 dark:border-[#2C2824]">
                  <BilingualText
                    as="p"
                    text={link.bioNote}
                    primaryClassName="text-xs text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                    secondaryClassName="text-[11px] text-[#787066] dark:text-[#9A9287] italic leading-relaxed"
                    forceStacked
                  />
                </div>
              </button>

              {idx < links.length - 1 && (
                <div className="flex items-center justify-center py-1 text-[#8B6520] dark:text-[#DFC07D]" aria-hidden="true">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <ArrowDown className="w-3.5 h-3.5" />
                    <span dir="rtl" lang="ar" className="font-arabic text-base leading-none">
                      عَنْ
                    </span>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
