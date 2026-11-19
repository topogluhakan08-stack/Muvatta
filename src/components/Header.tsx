import React from 'react';
import { Languages, Menu, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { PRIMARY_NAV_ITEMS } from '../data/homeData';
import type { AtlasRoute } from '../types/atlas';

interface HeaderProps {
  activeRoute: AtlasRoute;
  onNavigate: (route: AtlasRoute) => void;
  onOpenDrawer: () => void;
  drawerOpen: boolean;
}

export function Header({ activeRoute, onNavigate, onOpenDrawer, drawerOpen }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();
  const { showFrench, toggleFrench } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-[#E7E0D4] dark:border-[#2A2622] bg-[#FAF8F5]/95 dark:bg-[#121110]/95 backdrop-blur-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand wordmark (single-line) */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="text-left font-editorial text-xl sm:text-2xl font-semibold tracking-tight text-[#1C1917] dark:text-[#FAF8F5] hover:text-[#8B6520] dark:hover:text-[#DFC07D] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A742B] rounded-sm cursor-pointer"
        >
          el-Muvatta&apos; Atlası
        </button>

        {/* Zone 2: 5 Primary Navigation Links */}
        <nav
          aria-label="Ana gezinme"
          className="hidden md:flex items-center gap-6 lg:gap-7"
        >
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isActive = activeRoute === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => onNavigate(item.route)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A742B] rounded-sm cursor-pointer ${
                  isActive
                    ? 'text-[#1C1917] dark:text-[#FAF8F5]'
                    : 'text-[#57514A] dark:text-[#A8A095] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
                }`}
              >
                <span>{item.label.tr}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[13px] h-[2px] bg-[#9A742B] dark:bg-[#DFC07D]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language, Theme & Drawer Utility Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleFrench}
            aria-pressed={showFrench}
            aria-label={
              showFrench
                ? 'Fransızca ikincil dili gizle (TR + FR açık)'
                : 'Fransızca ikincil dili göster (sadece TR)'
            }
            title={showFrench ? 'TR + FR eşzamanlı açık' : 'Yalnızca TR açık — FR aç'}
            className={`inline-flex items-center gap-1.5 h-10 px-3 text-xs font-semibold tracking-wide rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A742B] cursor-pointer ${
              showFrench
                ? 'border-[#9A742B]/50 bg-[#9A742B]/10 text-[#724F14] dark:border-[#DFC07D]/40 dark:bg-[#DFC07D]/12 dark:text-[#DFC07D]'
                : 'border-[#E7E0D4] dark:border-[#2C2824] text-[#57514A] dark:text-[#A8A095] hover:border-[#9A742B]/40 hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
            }`}
          >
            <Languages className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{showFrench ? 'TR + FR' : 'TR'}</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? 'Aydınlık moda geç (Parşömen)' : 'Karanlık moda geç (Mod Sombre)'}
            title={isDark ? 'Aydınlık Mod / Mode Clair' : 'Karanlık Mod / Mode Sombre'}
            className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#E7E0D4] dark:border-[#2C2824] text-[#57514A] dark:text-[#D6CFC5] hover:border-[#9A742B]/50 hover:text-[#1C1917] dark:hover:text-[#FAF8F5] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A742B] cursor-pointer"
          >
            {isDark ? (
              <Sun className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={onOpenDrawer}
            aria-expanded={drawerOpen}
            aria-controls="atlas-navigation-drawer"
            aria-label="Atlas menüsünü aç (Sözlük, Harita, Ara, Ayarlar)"
            className="inline-flex items-center gap-2 h-10 px-3.5 rounded-md bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] hover:bg-[#3A3530] dark:hover:bg-[#C8A152] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A742B] cursor-pointer"
          >
            <Menu className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Menü</span>
          </button>
        </div>
      </div>
    </header>
  );
}
