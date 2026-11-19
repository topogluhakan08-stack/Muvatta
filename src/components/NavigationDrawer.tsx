import React, { useEffect } from 'react';
import {
  BookMarked,
  BookOpen,
  Compass,
  GraduationCap,
  Home,
  Map,
  ScrollText,
  Search,
  Settings,
  UserCheck,
  X,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import { PRIMARY_NAV_ITEMS, SECONDARY_NAV_ITEMS } from '../data/homeData';
import type { AtlasRoute } from '../types/atlas';

interface NavigationDrawerProps {
  open: boolean;
  activeRoute: AtlasRoute;
  onClose: () => void;
  onNavigate: (route: AtlasRoute) => void;
}

const ROUTE_ICONS: Record<AtlasRoute, React.ComponentType<{ className?: string }>> = {
  home: Home,
  'imam-malik': UserCheck,
  'el-muvatta': BookOpen,
  hadisler: ScrollText,
  ogren: GraduationCap,
  sozluk: BookMarked,
  harita: Map,
  ara: Search,
  ayarlar: Settings,
};

export function NavigationDrawer({ open, activeRoute, onClose, onNavigate }: NavigationDrawerProps) {
  const { showFrench } = useLanguage();
  const { progress, levelInfo } = useProgress();

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSelect = (route: AtlasRoute) => {
    onNavigate(route);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Atlas gezinme ve araç menüsü"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Menüyü kapat"
        onClick={onClose}
        className="fixed inset-0 bg-[#121110]/45 dark:bg-black/65 backdrop-blur-[2px] cursor-pointer"
      />

      {/* Slide-over panel */}
      <aside
        id="atlas-navigation-drawer"
        className="relative z-10 w-full max-w-sm h-full bg-[#FAF8F5] dark:bg-[#181614] border-l border-[#E7E0D4] dark:border-[#2C2824] flex flex-col overflow-y-auto shadow-2xl"
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E7E0D4] dark:border-[#2C2824] flex items-center justify-between gap-4">
          <div>
            <p className="font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
              Atlas Araçları
            </p>
            {showFrench && (
              <p lang="fr" className="text-xs text-[#787066] dark:text-[#A8A095] italic">
                Outils &amp; Navigation de l&apos;Atlas
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Menüyü kapat"
            className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#E7E0D4] dark:border-[#2C2824] text-[#57514A] dark:text-[#D6CFC5] hover:border-[#9A742B] hover:text-[#1C1917] dark:hover:text-[#FAF8F5] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Learner Progress Compact Summary */}
        <div className="px-6 py-4 border-b border-[#E7E0D4] dark:border-[#2C2824] bg-[#F3EFE8]/70 dark:bg-[#1E1B18]">
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-medium text-[#57514A] dark:text-[#C5BEB4]">
              <Compass className="w-3.5 h-3.5 text-[#9A742B] dark:text-[#DFC07D]" aria-hidden="true" />
              <span>
                Seviye {levelInfo.level} · {levelInfo.title.tr}
              </span>
            </div>
            <span className="text-xs font-semibold tabular-nums text-[#8B6520] dark:text-[#DFC07D]">
              {progress.xp} XP
            </span>
          </div>
          {showFrench && (
            <p lang="fr" className="mt-0.5 text-[11px] text-[#787066] dark:text-[#9A9287] italic">
              Niveau {levelInfo.level} · {levelInfo.title.fr}
            </p>
          )}
          <div className="mt-2.5 h-1.5 w-full bg-[#E7E0D4] dark:bg-[#2C2824] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#9A742B] dark:bg-[#DFC07D] transition-all duration-300"
              style={{ width: `${levelInfo.progressPercent}%` }}
            />
          </div>
          <div className="mt-2.5 flex items-center gap-3 text-xs text-[#57514A] dark:text-[#A8A095] tabular-nums">
            <span>Hadis: {progress.masteredHadiths.length}/8</span>
            <span aria-hidden="true">·</span>
            <span>Yer İmi: {progress.bookmarks.length}</span>
            <span aria-hidden="true">·</span>
            <span>Not: {Object.keys(progress.notes).length}</span>
          </div>
        </div>

        {/* Utility / Secondary Links (Sözlük, Harita, Ara, Ayarlar) */}
        <div className="px-4 py-5 space-y-1">
          <div className="px-2 pb-2">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#787066] dark:text-[#9A9287]">
              Başvuru &amp; Araçlar
              {showFrench && (
                <span lang="fr" className="ml-1.5 font-normal normal-case italic">
                  · Ressources &amp; Outils
                </span>
              )}
            </p>
          </div>
          {SECONDARY_NAV_ITEMS.map((item) => {
            const Icon = ROUTE_ICONS[item.route];
            const isActive = activeRoute === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => handleSelect(item.route)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full text-left px-3 py-3 rounded-lg flex items-start gap-3 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#F3EFE8] dark:bg-[#262320] text-[#1C1917] dark:text-[#FAF8F5]'
                    : 'text-[#3A3530] dark:text-[#D6CFC5] hover:bg-[#F3EFE8]/70 dark:hover:bg-[#221F1C]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 mt-0.5 shrink-0 ${
                    isActive
                      ? 'text-[#8B6520] dark:text-[#DFC07D]'
                      : 'text-[#787066] dark:text-[#9A9287]'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold">{item.label.tr}</span>
                    {showFrench && (
                      <span lang="fr" className="text-xs text-[#787066] dark:text-[#9A9287] italic">
                        {item.label.fr}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-[#57514A] dark:text-[#A8A095] leading-relaxed">
                    {item.description.tr}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Primary Sections (especially handy on mobile) */}
        <div className="px-4 py-4 border-t border-[#E7E0D4] dark:border-[#2C2824] space-y-1">
          <div className="px-2 pb-2">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#787066] dark:text-[#9A9287]">
              Ana Bölümler
              {showFrench && (
                <span lang="fr" className="ml-1.5 font-normal normal-case italic">
                  · Sections principales
                </span>
              )}
            </p>
          </div>
          {PRIMARY_NAV_ITEMS.map((item) => {
            const Icon = ROUTE_ICONS[item.route];
            const isActive = activeRoute === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => handleSelect(item.route)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#F3EFE8] dark:bg-[#262320] text-[#1C1917] dark:text-[#FAF8F5] font-semibold'
                    : 'text-[#3A3530] dark:text-[#D6CFC5] hover:bg-[#F3EFE8]/70 dark:hover:bg-[#221F1C]'
                }`}
              >
                <span className="flex items-center gap-3 text-sm">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive
                        ? 'text-[#8B6520] dark:text-[#DFC07D]'
                        : 'text-[#787066] dark:text-[#9A9287]'
                    }`}
                  />
                  <span>{item.label.tr}</span>
                </span>
                {showFrench && (
                  <span lang="fr" className="text-xs text-[#787066] dark:text-[#9A9287] italic">
                    {item.label.fr}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
