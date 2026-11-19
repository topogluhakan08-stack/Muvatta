import React, { useEffect, useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { HadithWordToken } from '../types/hadith';
import { isSpeechSupported, speakText, stopSpeech } from '../utils/speech';
import { BilingualText } from './BilingualText';

interface WordAnalysisDrawerProps {
  token: HadithWordToken | null;
  totalTokens: number;
  quickPickTokens: HadithWordToken[];
  onSelectToken: (token: HadithWordToken) => void;
  onStepToken: (delta: -1 | 1) => void;
  onClear: () => void;
}

const POS_ACCENT: Record<string, string> = {
  fiil: 'border-[#165B43]/35 bg-[#165B43]/10 text-[#165B43] dark:border-[#4FB28C]/40 dark:bg-[#4FB28C]/15 dark:text-[#7AD4B2]',
  isim: 'border-[#8B6520]/35 bg-[#8B6520]/10 text-[#7A5616] dark:border-[#DFC07D]/40 dark:bg-[#DFC07D]/15 dark:text-[#E6CA8E]',
  harf: 'border-[#722630]/35 bg-[#722630]/10 text-[#722630] dark:border-[#D47A85]/40 dark:bg-[#D47A85]/15 dark:text-[#E89CA6]',
  zamir: 'border-[#57514A]/35 bg-[#57514A]/10 text-[#3A3530] dark:border-[#A8A095]/40 dark:bg-[#A8A095]/15 dark:text-[#D6CFC5]',
  'ism-i-mevsul': 'border-[#57514A]/35 bg-[#57514A]/10 text-[#3A3530] dark:border-[#A8A095]/40 dark:bg-[#A8A095]/15 dark:text-[#D6CFC5]',
  'ism-i-isaret': 'border-[#57514A]/35 bg-[#57514A]/10 text-[#3A3530] dark:border-[#A8A095]/40 dark:bg-[#A8A095]/15 dark:text-[#D6CFC5]',
  zarf: 'border-[#722630]/35 bg-[#722630]/10 text-[#722630] dark:border-[#D47A85]/40 dark:bg-[#D47A85]/15 dark:text-[#E89CA6]',
};

export function WordAnalysisDrawer({
  token,
  totalTokens,
  quickPickTokens,
  onSelectToken,
  onStepToken,
  onClear,
}: WordAnalysisDrawerProps) {
  const { showFrench } = useLanguage();
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    stopSpeech();
    setSpeaking(false);
  }, [token?.id]);

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const handleSpeakWord = () => {
    if (!token) return;
    if (speaking) {
      stopSpeech();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    const ok = speakText(
      token.surface,
      'ar-SA',
      () => setSpeaking(false),
      () => setSpeaking(false)
    );
    if (!ok) setSpeaking(false);
  };

  return (
    <aside
      aria-label="Arapça kelime dilbilgisi inceleyici"
      data-testid="word-analysis-drawer"
      className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#181614] overflow-hidden lg:max-h-[calc(100vh-6.25rem)] lg:overflow-y-auto"
    >
      {/* Top Drawer Header */}
      <div className="px-5 py-3.5 border-b border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/85 dark:bg-[#1D1A17] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen className="w-4 h-4 text-[#8B6520] dark:text-[#DFC07D] shrink-0" aria-hidden="true" />
          <div className="min-w-0">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] dark:text-[#FAF8F5]">
              Kelime Tahlili
              {showFrench && (
                <span lang="fr" className="ml-1.5 font-normal normal-case italic text-[#787066] dark:text-[#9A9287]">
                  · Analyse lexicale
                </span>
              )}
            </h2>
          </div>
        </div>

        {token && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onStepToken(-1)}
              disabled={token.index <= 0}
              aria-label="Önceki kelime"
              className="p-1.5 rounded-md border border-[#DDD4C5] dark:border-[#342F2A] text-[#57514A] dark:text-[#C5BEB4] hover:text-[#1C1917] dark:hover:text-[#FAF8F5] disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <span className="text-[11px] font-medium tabular-nums text-[#787066] dark:text-[#A8A095] px-1">
              {token.index + 1}/{totalTokens}
            </span>
            <button
              type="button"
              onClick={() => onStepToken(1)}
              disabled={token.index >= totalTokens - 1}
              aria-label="Sonraki kelime"
              className="p-1.5 rounded-md border border-[#DDD4C5] dark:border-[#342F2A] text-[#57514A] dark:text-[#C5BEB4] hover:text-[#1C1917] dark:hover:text-[#FAF8F5] disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onClear}
              aria-label="Kelime seçimini kapat"
              className="ml-1 p-1.5 rounded-md text-[#787066] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5] hover:bg-[#E7E0D4]/60 dark:hover:bg-[#2C2824] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {!token ? (
        <div className="p-5 space-y-4">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-[#1C1917] dark:text-[#FAF8F5]">
              Metindeki herhangi bir Arapça kelimeye tıklayın
            </p>
            {showFrench && (
              <p lang="fr" className="text-xs italic text-[#787066] dark:text-[#9A9287]">
                Cliquez sur n&apos;importe quel mot arabe du hadith pour inspecter sa racine, sa morphologie (sarf), sa syntaxe (nahw) et ses dérivés.
              </p>
            )}
          </div>

          {quickPickTokens.length > 0 && (
            <div className="pt-3 border-t border-[#E7E0D4] dark:border-[#2C2824] space-y-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  Bu hadisteki kilit kavramlar
                  {showFrench ? ' · Termes clés de ce hadith' : ''}
                </span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickPickTokens.map((qt) => (
                  <button
                    key={qt.id}
                    type="button"
                    onClick={() => onSelectToken(qt)}
                    className="text-left rounded-lg border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/60 dark:bg-[#1E1B18] hover:border-[#8B6520] dark:hover:border-[#DFC07D] px-3 py-2 transition-colors cursor-pointer"
                  >
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-xl leading-[1.7] text-[#1C1917] dark:text-[#FAF8F5] text-right"
                    >
                      {qt.surface}
                    </p>
                    <p className="text-[11px] text-[#57514A] dark:text-[#C5BEB4] truncate">
                      {qt.analysis.transliteration} · {qt.analysis.root}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-5 space-y-5">
          {/* Arabic Word Banner */}
          <div className="rounded-lg border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/70 dark:bg-[#1D1A17] p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span
                  className={`inline-block px-2 py-0.5 rounded-md border text-[11px] font-semibold ${
                    POS_ACCENT[token.analysis.pos] ?? POS_ACCENT.isim
                  }`}
                >
                  {token.analysis.posLabel.tr}
                  {showFrench && (
                    <span lang="fr" className="font-normal italic ml-1">
                      · {token.analysis.posLabel.fr}
                    </span>
                  )}
                </span>
                <p className="text-xs font-medium text-[#57514A] dark:text-[#C5BEB4]">
                  {token.analysis.transliteration}
                </p>
              </div>

              {isSpeechSupported() && (
                <button
                  type="button"
                  onClick={handleSpeakWord}
                  aria-label={speaking ? 'Kelime seslendirmesini durdur' : `${token.surface} kelimesini Arapça dinle`}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                    speaking
                      ? 'border-[#165B43] bg-[#165B43] text-white dark:border-[#4FB28C] dark:bg-[#4FB28C] dark:text-[#121110]'
                      : 'border-[#D5CBB9] dark:border-[#342F2A] text-[#57514A] dark:text-[#C5BEB4] hover:border-[#8B6520] dark:hover:border-[#DFC07D]'
                  }`}
                >
                  {speaking ? (
                    <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                  <span>AR</span>
                </button>
              )}
            </div>

            <div className="flex items-baseline justify-between gap-4 pt-1">
              <div className="text-xs text-[#787066] dark:text-[#A8A095]">
                <span className="uppercase tracking-wider font-semibold text-[10px] block">
                  Kök {showFrench ? '· Racine' : ''}
                </span>
                <span dir="rtl" lang="ar" className="font-arabic text-xl text-[#8B6520] dark:text-[#DFC07D]">
                  {token.analysis.root}
                </span>
              </div>
              <p
                dir="rtl"
                lang="ar"
                className="font-arabic text-4xl leading-[1.75] text-[#1C1917] dark:text-[#FAF8F5] text-right"
              >
                {token.surface}
              </p>
            </div>

            {token.analysis.lemma && token.analysis.lemma !== token.surface && (
              <div className="pt-2 border-t border-[#E7E0D4] dark:border-[#2C2824] flex items-center justify-between text-xs">
                <span className="text-[#787066] dark:text-[#9A9287]">
                  Sözlük biçimi {showFrench ? '· Lemme' : ''}
                </span>
                <span dir="rtl" lang="ar" className="font-arabic text-lg text-[#3A3530] dark:text-[#E6E0D6]">
                  {token.analysis.lemma}
                </span>
              </div>
            )}
          </div>

          {/* Meaning */}
          <div className="space-y-1">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
              Anlam {showFrench ? '· Sens contextuel' : ''}
            </h3>
            <BilingualText
              as="p"
              text={token.analysis.meaning}
              primaryClassName="text-sm font-medium text-[#1C1917] dark:text-[#FAF8F5] leading-relaxed"
              secondaryClassName="text-xs text-[#6B635B] dark:text-[#A8A095] italic leading-relaxed"
              forceStacked
            />
          </div>

          {/* Sarf & Nahiv */}
          <div className="grid grid-cols-1 gap-3 pt-1">
            <div className="rounded-lg border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#141210] p-3.5 space-y-1">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#165B43] dark:text-[#4FB28C]">
                Sarf (Biçimbilim) {showFrench ? '· Morphologie (Sarf)' : ''}
              </h3>
              <BilingualText
                as="p"
                text={token.analysis.sarf}
                primaryClassName="text-xs text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                secondaryClassName="text-[11px] text-[#787066] dark:text-[#9A9287] italic leading-relaxed"
                forceStacked
              />
            </div>

            <div className="rounded-lg border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#141210] p-3.5 space-y-1">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#722630] dark:text-[#D47A85]">
                Nahiv / İ‘râb (Sözdizimi) {showFrench ? '· Syntaxe (Nahw)' : ''}
              </h3>
              <BilingualText
                as="p"
                text={token.analysis.nahiv}
                primaryClassName="text-xs text-[#3A3530] dark:text-[#D6CFC5] leading-relaxed"
                secondaryClassName="text-[11px] text-[#787066] dark:text-[#9A9287] italic leading-relaxed"
                forceStacked
              />
            </div>
          </div>

          {/* Derivatives */}
          {token.analysis.derivatives.length > 0 && (
            <div className="space-y-2 pt-1">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8B6520] dark:text-[#DFC07D]">
                Aynı Kökten Türevler {showFrench ? '· Dérivés de la même racine' : ''}
              </h3>
              <ul className="space-y-2">
                {token.analysis.derivatives.map((der, idx) => (
                  <li
                    key={`${der.arabic}-${idx}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/50 dark:bg-[#1D1A17] px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#1C1917] dark:text-[#FAF8F5]">
                        <span className="text-[#787066] dark:text-[#A8A095] mr-1.5">{der.translit}:</span>
                        {der.meaning.tr}
                      </p>
                      {showFrench && (
                        <p lang="fr" className="text-[11px] italic text-[#787066] dark:text-[#9A9287]">
                          {der.meaning.fr}
                        </p>
                      )}
                    </div>
                    <span
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-xl leading-[1.6] text-[#1C1917] dark:text-[#FAF8F5] shrink-0"
                    >
                      {der.arabic}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
