import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function OfflineIndicator() {
  const { showFrench } = useLanguage();
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="border-b border-[#9A742B]/30 bg-[#F6EFE1] dark:bg-[#231E15] text-[#5C4110] dark:text-[#E5C989] px-4 py-2"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs font-medium text-center flex-wrap">
        <WifiOff className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Çevrimdışı Mod · Önbellekteki verilerle çalışılıyor</span>
        {showFrench && (
          <span className="text-[#8B6520] dark:text-[#C9AC6B] italic">
            · Mode hors ligne (contenu en cache)
          </span>
        )}
      </div>
    </div>
  );
}
