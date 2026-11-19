import React, { useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import { useTheme } from '../contexts/ThemeContext';
import type { ArabicFontSize, AtlasRoute, DualLanguageLayout } from '../types/atlas';
import { BilingualText } from './BilingualText';

interface SettingsViewProps {
  onNavigate: (route: AtlasRoute) => void;
}

export function SettingsView({ onNavigate }: SettingsViewProps) {
  const { theme, setTheme } = useTheme();
  const {
    showFrench,
    setShowFrench,
    dualLayout,
    setDualLayout,
    arabicFontSize,
    setArabicFontSize,
    arabicSizeClass,
  } = useLanguage();
  const { progress, levelInfo, resetProgress } = useProgress();
  const [confirmingReset, setConfirmingReset] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#57514A] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Ana Sayfaya Dön {showFrench ? '· Retour à l’accueil' : ''}</span>
        </button>

        <BilingualText
          as="h1"
          text={{
            tr: 'Görünüm, Dil ve İlerleme Ayarları',
            fr: 'Paramètres d’affichage, de langue et de progression',
          }}
          primaryClassName="font-editorial text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
          secondaryClassName="text-sm sm:text-base text-[#787066] dark:text-[#A8A095] italic"
          forceStacked
        />
      </div>

      {/* Theme Setting */}
      <section className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-6 space-y-4">
        <BilingualText
          as="h2"
          text={{ tr: 'Tema Görünümü', fr: 'Thème visuel' }}
          primaryClassName="font-editorial text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
          secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
          forceStacked
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setTheme('light')}
            aria-pressed={theme === 'light'}
            className={`text-left p-4 rounded-lg border transition-colors cursor-pointer ${
              theme === 'light'
                ? 'border-[#9A742B] bg-[#F3EFE8] text-[#1C1917]'
                : 'border-[#E7E0D4] dark:border-[#2C2824] text-[#57514A] dark:text-[#A8A095] hover:border-[#9A742B]/50'
            }`}
          >
            <p className="text-sm font-semibold">Parşömen Aydınlık Mod</p>
            <p lang="fr" className="text-xs opacity-80 italic mt-0.5">
              Mode Clair Parchemin (#FAF8F5)
            </p>
          </button>

          <button
            type="button"
            onClick={() => setTheme('dark')}
            aria-pressed={theme === 'dark'}
            className={`text-left p-4 rounded-lg border transition-colors cursor-pointer ${
              theme === 'dark'
                ? 'border-[#DFC07D] bg-[#262320] text-[#FAF8F5]'
                : 'border-[#E7E0D4] dark:border-[#2C2824] text-[#57514A] dark:text-[#A8A095] hover:border-[#9A742B]/50'
            }`}
          >
            <p className="text-sm font-semibold">Karanlık Mod (Mod Sombre)</p>
            <p lang="fr" className="text-xs opacity-80 italic mt-0.5">
              Mode Sombre Académique (#121110)
            </p>
          </button>
        </div>
      </section>

      {/* Dual-Language Settings */}
      <section className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-6 space-y-6">
        <BilingualText
          as="h2"
          text={{ tr: 'Çift Dilli Sistem (TR + FR)', fr: 'Système bilingue simultané (TR + FR)' }}
          primaryClassName="font-editorial text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
          secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
          forceStacked
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E7E0D4] dark:border-[#2C2824]">
          <div>
            <p className="text-sm font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
              Eşzamanlı Fransızca Gösterimi
            </p>
            <p className="text-xs text-[#57514A] dark:text-[#A8A095]">
              Türkçe birincil metnin yanında Fransızca karşılıkları anlık olarak gösterir.
            </p>
          </div>
          <div className="inline-flex p-1 rounded-lg bg-[#F3EFE8] dark:bg-[#221F1C] border border-[#E7E0D4] dark:border-[#2C2824] shrink-0">
            <button
              type="button"
              onClick={() => setShowFrench(true)}
              aria-pressed={showFrench}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                showFrench
                  ? 'bg-[#FAF8F5] dark:bg-[#342F2A] text-[#1C1917] dark:text-[#FAF8F5] shadow-xs'
                  : 'text-[#57514A] dark:text-[#A8A095]'
              }`}
            >
              TR + FR Açık
            </button>
            <button
              type="button"
              onClick={() => setShowFrench(false)}
              aria-pressed={!showFrench}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                !showFrench
                  ? 'bg-[#FAF8F5] dark:bg-[#342F2A] text-[#1C1917] dark:text-[#FAF8F5] shadow-xs'
                  : 'text-[#57514A] dark:text-[#A8A095]'
              }`}
            >
              Yalnızca TR
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
              Metin Yerleşim Düzeni
            </p>
            <p className="text-xs text-[#57514A] dark:text-[#A8A095]">
              Uzun çeviri ve ansiklopedi paragraflarının alt alta veya yan yana gösterimi.
            </p>
          </div>
          <div className="inline-flex p-1 rounded-lg bg-[#F3EFE8] dark:bg-[#221F1C] border border-[#E7E0D4] dark:border-[#2C2824] shrink-0">
            {(['stacked', 'side-by-side'] as DualLanguageLayout[]).map((layout) => (
              <button
                key={layout}
                type="button"
                onClick={() => setDualLayout(layout)}
                aria-pressed={dualLayout === layout}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  dualLayout === layout
                    ? 'bg-[#FAF8F5] dark:bg-[#342F2A] text-[#1C1917] dark:text-[#FAF8F5] shadow-xs'
                    : 'text-[#57514A] dark:text-[#A8A095]'
                }`}
              >
                {layout === 'stacked' ? 'Alt Alta' : 'Yan Yana'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Arabic Script Typography Scale */}
      <section className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <BilingualText
            as="h2"
            text={{ tr: 'Arapça Metin Yazı Boyutu', fr: 'Taille de la typographie arabe' }}
            primaryClassName="font-editorial text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
            secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
            forceStacked
          />
          <div className="inline-flex p-1 rounded-lg bg-[#F3EFE8] dark:bg-[#221F1C] border border-[#E7E0D4] dark:border-[#2C2824] shrink-0">
            {(
              [
                { id: 'normal', label: 'Normal' },
                { id: 'large', label: 'Büyük' },
                { id: 'xlarge', label: 'Çok Büyük' },
              ] as { id: ArabicFontSize; label: string }[]
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setArabicFontSize(opt.id)}
                aria-pressed={arabicFontSize === opt.id}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  arabicFontSize === opt.id
                    ? 'bg-[#FAF8F5] dark:bg-[#342F2A] text-[#1C1917] dark:text-[#FAF8F5] shadow-xs'
                    : 'text-[#57514A] dark:text-[#A8A095]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-lg bg-[#F3EFE8]/80 dark:bg-[#1E1B18] border border-[#E7E0D4] dark:border-[#2C2824]">
          <p dir="rtl" lang="ar" className={`font-arabic text-right text-[#1C1917] dark:text-[#FAF8F5] ${arabicSizeClass}`}>
            مَنْ قَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا ، غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ .
          </p>
        </div>
      </section>

      {/* Progress & LocalStorage Persistence */}
      <section className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#181614] p-6 space-y-4">
        <BilingualText
          as="h2"
          text={{ tr: 'Yerel İlerleme Kaydı', fr: 'Suivi local de progression' }}
          primaryClassName="font-editorial text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
          secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
          forceStacked
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-y border-[#E7E0D4] dark:border-[#2C2824] tabular-nums">
          <div>
            <p className="text-xs text-[#787066] dark:text-[#9A9287]">XP / Seviye</p>
            <p className="text-lg font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
              {progress.xp} XP · S.{levelInfo.level}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#787066] dark:text-[#9A9287]">Tamamlanan Hadis</p>
            <p className="text-lg font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
              {progress.masteredHadiths.length} / 8
            </p>
          </div>
          <div>
            <p className="text-xs text-[#787066] dark:text-[#9A9287]">Yer İmleri</p>
            <p className="text-lg font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
              {progress.bookmarks.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#787066] dark:text-[#9A9287]">Kişisel Notlar</p>
            <p className="text-lg font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
              {Object.keys(progress.notes).length}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <p className="text-xs text-[#57514A] dark:text-[#A8A095]">
            Tüm çalışma verileriniz tarayıcınızda yerel olarak (localStorage) saklanır.
          </p>

          {!confirmingReset ? (
            <button
              type="button"
              onClick={() => setConfirmingReset(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-[#722630]/40 text-xs font-semibold text-[#722630] dark:text-[#D47A85] hover:bg-[#722630]/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>İlerlemeyi Sıfırla</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  resetProgress();
                  setConfirmingReset(false);
                }}
                className="px-3.5 py-2 rounded-md bg-[#722630] text-white text-xs font-semibold hover:bg-[#8A303C] transition-colors cursor-pointer"
              >
                Evet, Sıfırla
              </button>
              <button
                type="button"
                onClick={() => setConfirmingReset(false)}
                className="px-3.5 py-2 rounded-md border border-[#E7E0D4] dark:border-[#2C2824] text-xs font-medium text-[#57514A] dark:text-[#D6CFC5] cursor-pointer"
              >
                İptal
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
