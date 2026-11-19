import React, { useEffect, useState } from 'react';
import { Award, GraduationCap, Layers, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import { QUIZ_QUESTIONS, SRS_FLASHCARDS, type QuizCategoryId } from '../data/learnData';
import type { AtlasRoute } from '../types/atlas';
import { BilingualText } from './BilingualText';
import { FlashcardsView } from './FlashcardsView';
import { MasteryDashboard } from './MasteryDashboard';
import { QuizEngine } from './QuizEngine';

interface LearnViewProps {
  focusedItemId?: string;
  onNavigate: (route: AtlasRoute, targetItemId?: string) => void;
}

type LearnSubTab = 'quiz' | 'flashcards' | 'dashboard';

export function LearnView({ focusedItemId, onNavigate }: LearnViewProps) {
  const { showFrench } = useLanguage();
  const { progress, levelInfo } = useProgress();

  const [activeTab, setActiveTab] = useState<LearnSubTab>('quiz');
  const [quizKey, setQuizKey] = useState(0);
  const [quizInitialCategory, setQuizInitialCategory] = useState<QuizCategoryId | 'all'>('all');
  const [autoWrongReview, setAutoWrongReview] = useState(false);

  useEffect(() => {
    if (!focusedItemId) return;
    if (focusedItemId === 'flashcards') {
      setActiveTab('flashcards');
    } else if (focusedItemId === 'dashboard') {
      setActiveTab('dashboard');
    } else if (focusedItemId === 'wrong-review') {
      setAutoWrongReview(true);
      setQuizKey((k) => k + 1);
      setActiveTab('quiz');
    } else if (focusedItemId === 'quiz') {
      setAutoWrongReview(false);
      setActiveTab('quiz');
    }
  }, [focusedItemId]);

  const handleLaunchWrongReview = () => {
    setQuizInitialCategory('all');
    setAutoWrongReview(true);
    setQuizKey((k) => k + 1);
    setActiveTab('quiz');
  };

  const handleLaunchCategoryQuiz = (cat: QuizCategoryId) => {
    setQuizInitialCategory(cat);
    setAutoWrongReview(false);
    setQuizKey((k) => k + 1);
    setActiveTab('quiz');
  };

  return (
    <div className="space-y-6">
      {/* Scholarly Masthead */}
      <section className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#F3EFE8]/85 dark:bg-[#181614] p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B6520] dark:text-[#DFC07D]">
              ÖĞRENME, SINAV VE TEKRAR ATÖLYESİ
              {showFrench && (
                <span lang="fr" className="ml-1.5 font-normal normal-case italic text-[#787066] dark:text-[#9A9287]">
                  · Atelier d’apprentissage et d’évaluation
                </span>
              )}
            </p>
            <BilingualText
              as="h1"
              text={{
                tr: 'Öğren, Pekiştir ve Kendini Sına',
                fr: 'Apprendre, réviser et évaluer sa maîtrise',
              }}
              primaryClassName="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
              secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
              forceStacked
            />
            <BilingualText
              text={{
                tr: '6 kategoride 54 soruluk çift dilli sınav motoru, yanlış cevapları tekrar etme modu, 32 adet 3B aralıklı tekrar (SRS) bilgi kartı ve kişisel hakimiyet panosu.',
                fr: 'Moteur de quiz bilingue de 54 questions sur 6 domaines, révision ciblée des erreurs, 32 cartes mémoire 3D à répétition espacée (SRS) et tableau de progression.',
              }}
              primaryClassName="text-sm text-[#57514A] dark:text-[#B8B0A6] leading-relaxed"
              secondaryClassName="text-xs text-[#787066] dark:text-[#9A9287] italic leading-relaxed"
              forceStacked
            />
          </div>

          {/* Live Rank & XP Summary */}
          <div className="grid grid-cols-3 gap-2.5 shrink-0">
            <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] px-3.5 py-2.5 text-center">
              <p className="text-lg font-editorial font-semibold text-[#8B6520] dark:text-[#DFC07D] tabular-nums">
                {progress.xp} XP
              </p>
              <p className="text-[11px] text-[#787066] dark:text-[#A8A095]">
                Seviye {levelInfo.level}
              </p>
            </div>
            <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] px-3.5 py-2.5 text-center">
              <p className="text-lg font-editorial font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
                {QUIZ_QUESTIONS.length}
              </p>
              <p className="text-[11px] text-[#787066] dark:text-[#A8A095]">
                Soru · 6 Alan
              </p>
            </div>
            <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] px-3.5 py-2.5 text-center">
              <p className="text-lg font-editorial font-semibold text-[#165B43] dark:text-[#4FB28C] tabular-nums">
                {SRS_FLASHCARDS.length}
              </p>
              <p className="text-[11px] text-[#787066] dark:text-[#A8A095]">
                3B SRS Kart
              </p>
            </div>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div
          role="tablist"
          aria-label="Öğrenme araçları"
          className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[#DDD4C5] dark:border-[#2E2924]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'quiz'}
            onClick={() => {
              setAutoWrongReview(false);
              setActiveTab('quiz');
            }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110]'
                : 'bg-[#FAF8F5] dark:bg-[#121110] text-[#57514A] dark:text-[#B8B0A6] border border-[#D5CBB9] dark:border-[#342F2A] hover:border-[#8B6520]'
            }`}
          >
            <GraduationCap className="w-4 h-4" aria-hidden="true" />
            <span>Sınav Motoru (54)</span>
            {showFrench && <span lang="fr" className="hidden sm:inline opacity-75 font-normal">· Quiz</span>}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'flashcards'}
            onClick={() => setActiveTab('flashcards')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'flashcards'
                ? 'bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110]'
                : 'bg-[#FAF8F5] dark:bg-[#121110] text-[#57514A] dark:text-[#B8B0A6] border border-[#D5CBB9] dark:border-[#342F2A] hover:border-[#8B6520]'
            }`}
          >
            <Layers className="w-4 h-4" aria-hidden="true" />
            <span>3B Bilgi Kartları (SRS)</span>
            {showFrench && <span lang="fr" className="hidden sm:inline opacity-75 font-normal">· Cartes 3D</span>}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110]'
                : 'bg-[#FAF8F5] dark:bg-[#121110] text-[#57514A] dark:text-[#B8B0A6] border border-[#D5CBB9] dark:border-[#342F2A] hover:border-[#8B6520]'
            }`}
          >
            <Award className="w-4 h-4" aria-hidden="true" />
            <span>Hakimiyet Panosu</span>
            {showFrench && <span lang="fr" className="hidden sm:inline opacity-75 font-normal">· Maîtrise</span>}
          </button>

          {progress.wrongQuestionIds.length > 0 && activeTab !== 'quiz' && (
            <button
              type="button"
              onClick={handleLaunchWrongReview}
              className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#722630]/10 text-[#722630] dark:bg-[#D47A85]/15 dark:text-[#D47A85] text-xs font-semibold hover:bg-[#722630] hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{progress.wrongQuestionIds.length} Yanlışı Tekrar Et</span>
            </button>
          )}
        </div>
      </section>

      {/* Active Sub-tab Content */}
      {activeTab === 'quiz' && (
        <QuizEngine
          key={quizKey}
          onNavigate={onNavigate}
          autoLaunchWrongReview={autoWrongReview}
          initialCategory={quizInitialCategory}
        />
      )}

      {activeTab === 'flashcards' && <FlashcardsView onNavigate={onNavigate} />}

      {activeTab === 'dashboard' && (
        <MasteryDashboard
          onNavigate={onNavigate}
          onStartWrongReview={handleLaunchWrongReview}
          onStartCategoryQuiz={handleLaunchCategoryQuiz}
        />
      )}
    </div>
  );
}
