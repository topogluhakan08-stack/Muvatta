import React, { useEffect, useState } from 'react';
import { Download, PlusSquare, Share, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePWAInstall } from '../hooks/usePWAInstall';

export function PWAInstallButton() {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { showFrench } = useLanguage();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    if (!showIOSGuide) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowIOSGuide(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIOSGuide]);

  if (isInstalled || (!isInstallable && !isIOS)) {
    return null;
  }

  const handleClick = () => {
    if (isInstallable) {
      void install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Uygulamayı cihaza yükle (PWA)"
        title={
          showFrench
            ? "Uygulamayı yükle · Installer l'application"
            : 'Uygulamayı yükle'
        }
        className="inline-flex items-center gap-1.5 h-10 px-3 text-xs font-semibold tracking-wide rounded-md border border-[#165B43]/35 bg-[#165B43]/10 text-[#165B43] hover:bg-[#165B43]/16 dark:border-[#4FB28C]/35 dark:bg-[#4FB28C]/12 dark:text-[#7CD4B2] dark:hover:bg-[#4FB28C]/20 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#165B43] cursor-pointer"
      >
        <Download className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">Yükle</span>
      </button>

      {showIOSGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-install-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/60 backdrop-blur-xs"
          onClick={() => setShowIOSGuide(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#1A1816] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="ios-install-title"
                  className="font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                >
                  Ana Ekrana Ekle
                </h2>
                {showFrench && (
                  <p className="text-xs italic text-[#736B60] dark:text-[#A8A095] mt-0.5">
                    Ajouter à l&apos;écran d&apos;accueil (iOS Safari)
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                aria-label="Kapat"
                className="inline-flex items-center justify-center w-8 h-8 rounded-md text-[#57514A] dark:text-[#A8A095] hover:bg-[#EFEAE0] dark:hover:bg-[#2A2622] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <ol className="mt-5 space-y-3.5 text-sm text-[#3F3A34] dark:text-[#D6CFC5]">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#165B43]/12 text-[#165B43] dark:bg-[#4FB28C]/15 dark:text-[#7CD4B2] text-xs font-semibold shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <p className="flex items-center gap-1.5 flex-wrap">
                    <span>Safari alt çubuğundaki</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EEE4] dark:bg-[#24211E] text-xs font-medium">
                      <Share className="w-3.5 h-3.5 text-[#165B43] dark:text-[#7CD4B2]" aria-hidden="true" />
                      Paylaş
                    </span>
                    <span>düğmesine dokunun.</span>
                  </p>
                  {showFrench && (
                    <p className="text-xs text-[#736B60] dark:text-[#A8A095] mt-1">
                      Appuyez sur le bouton Partager dans la barre Safari.
                    </p>
                  )}
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#165B43]/12 text-[#165B43] dark:bg-[#4FB28C]/15 dark:text-[#7CD4B2] text-xs font-semibold shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <p className="flex items-center gap-1.5 flex-wrap">
                    <span>Açılan menüde</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EEE4] dark:bg-[#24211E] text-xs font-medium">
                      <PlusSquare className="w-3.5 h-3.5 text-[#165B43] dark:text-[#7CD4B2]" aria-hidden="true" />
                      Ana Ekrana Ekle
                    </span>
                    <span>seçeneğini seçin.</span>
                  </p>
                  {showFrench && (
                    <p className="text-xs text-[#736B60] dark:text-[#A8A095] mt-1">
                      Sélectionnez « Sur l&apos;écran d&apos;accueil » puis validez.
                    </p>
                  )}
                </div>
              </li>
            </ol>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="px-4 py-2 rounded-md bg-[#165B43] text-[#FAF8F5] hover:bg-[#114835] text-xs font-semibold transition-colors cursor-pointer"
              >
                Anladım{showFrench ? ' · Compris' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
