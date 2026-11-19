import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { AtlasRoute } from '../types/atlas';

interface FooterProps {
  onNavigate: (route: AtlasRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { showFrench } = useLanguage();

  return (
    <footer className="mt-20 border-t border-[#E7E0D4] dark:border-[#2A2622] bg-[#F3EFE8]/60 dark:bg-[#161412]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 space-y-2">
            <p className="font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
              el-Muvatta&apos; &amp; Kitâbü&apos;s-Salât fî Ramadân Atlası
            </p>
            <p className="text-xs sm:text-sm text-[#57514A] dark:text-[#A8A095] leading-relaxed max-w-2xl">
              Kaynaklar: TDV İslâm Ansiklopedisi, &ldquo;Mâlik b. Enes&rdquo; (Ahmet Özel, c. 27, s. 506–513) ve
              &ldquo;el-Muvatta&apos;&rdquo; (M. Yaşar Kandemir, c. 31, s. 414–417); İmam Mâlik, el-Muvatta&apos;,
              Kitâbü&apos;s-Salât fî Ramadân (Yahyâ b. Yahyâ el-Leysî rivayeti, s. 113–116).
            </p>
            {showFrench && (
              <p lang="fr" className="text-xs text-[#787066] dark:text-[#9A9287] italic leading-relaxed max-w-2xl">
                Sources : Encyclopédie de l&apos;Islam TDV (« Mâlik b. Anas », vol. 27 ; « al-Muwatta&apos; », vol. 31)
                et texte vocalisé du Kitâb as-Salât fî Ramadân (recension de Yahyâ al-Laythî, pp. 113–116).
              </p>
            )}
          </div>

          <div className="md:col-span-5 flex flex-wrap md:justify-end gap-x-6 gap-y-2 text-xs font-medium text-[#57514A] dark:text-[#A8A095]">
            <button
              type="button"
              onClick={() => onNavigate('imam-malik')}
              className="hover:text-[#1C1917] dark:hover:text-[#FAF8F5] transition-colors whitespace-nowrap cursor-pointer"
            >
              İmam Mâlik
            </button>
            <button
              type="button"
              onClick={() => onNavigate('el-muvatta')}
              className="hover:text-[#1C1917] dark:hover:text-[#FAF8F5] transition-colors whitespace-nowrap cursor-pointer"
            >
              el-Muvatta&apos;
            </button>
            <button
              type="button"
              onClick={() => onNavigate('hadisler')}
              className="hover:text-[#1C1917] dark:hover:text-[#FAF8F5] transition-colors whitespace-nowrap cursor-pointer"
            >
              Hadisler
            </button>
            <button
              type="button"
              onClick={() => onNavigate('harita')}
              className="hover:text-[#1C1917] dark:hover:text-[#FAF8F5] transition-colors whitespace-nowrap cursor-pointer"
            >
              Harita
            </button>
            <button
              type="button"
              onClick={() => onNavigate('ayarlar')}
              className="hover:text-[#1C1917] dark:hover:text-[#FAF8F5] transition-colors whitespace-nowrap cursor-pointer"
            >
              Ayarlar
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
