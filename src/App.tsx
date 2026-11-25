import React, { useCallback, useState } from 'react';
import { ElMuvattaView } from './components/ElMuvattaView';
import { Footer } from './components/Footer';
import { GlobalSearchView } from './components/GlobalSearchView';
import { GlossaryView } from './components/GlossaryView';
import { HadithsView } from './components/HadithsView';
import { Header } from './components/Header';
import { HistoricalMapView } from './components/HistoricalMapView';
import { HomeView } from './components/HomeView';
import { ImamMalikView } from './components/ImamMalikView';
import { LearnView } from './components/LearnView';
import { NavigationDrawer } from './components/NavigationDrawer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SettingsView } from './components/SettingsView';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { ThemeProvider } from './contexts/ThemeContext';
import type { AtlasRoute } from './types/atlas';

function AtlasShell() {
  const [activeRoute, setActiveRoute] = useState<AtlasRoute>('home');
  const [focusedItemId, setFocusedItemId] = useState<string | undefined>(undefined);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigate = useCallback((route: AtlasRoute, targetItemId?: string) => {
    setActiveRoute(route);
    setFocusedItemId(targetItemId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] dark:bg-[#121110] dark:text-[#F5F2EB] transition-colors duration-200">
      <Header
        activeRoute={activeRoute}
        onNavigate={(route) => handleNavigate(route)}
        onOpenDrawer={() => setDrawerOpen(true)}
        drawerOpen={drawerOpen}
      />

      <OfflineIndicator />

      <NavigationDrawer
        open={drawerOpen}
        activeRoute={activeRoute}
        onClose={() => setDrawerOpen(false)}
        onNavigate={(route) => handleNavigate(route)}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeRoute === 'home' && <HomeView onNavigate={handleNavigate} />}
        {activeRoute === 'imam-malik' && (
          <ImamMalikView focusedItemId={focusedItemId} onNavigate={handleNavigate} />
        )}
        {activeRoute === 'el-muvatta' && (
          <ElMuvattaView focusedItemId={focusedItemId} onNavigate={handleNavigate} />
        )}
        {activeRoute === 'hadisler' && (
          <HadithsView focusedItemId={focusedItemId} onNavigate={handleNavigate} />
        )}
        {activeRoute === 'sozluk' && (
          <GlossaryView focusedItemId={focusedItemId} onNavigate={handleNavigate} />
        )}
        {activeRoute === 'ara' && <GlobalSearchView onNavigate={handleNavigate} />}
        {activeRoute === 'harita' && (
          <HistoricalMapView focusedItemId={focusedItemId} onNavigate={handleNavigate} />
        )}
        {activeRoute === 'ayarlar' && <SettingsView onNavigate={(route) => handleNavigate(route)} />}
        {activeRoute === 'ogren' && (
          <LearnView focusedItemId={focusedItemId} onNavigate={handleNavigate} />
        )}
      </main>

      <Footer onNavigate={(route) => handleNavigate(route)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProgressProvider>
          <AtlasShell />
        </ProgressProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
