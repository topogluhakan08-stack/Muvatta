import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Volume2,
  XCircle,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import {
  QUIZ_CATEGORIES,
  QUIZ_QUESTIONS,
  type QuizCategoryId,
  type QuizQuestion,
} from '../data/learnData';
import type { AtlasRoute } from '../types/atlas';
import {
  buildQuizSession,
  computeCategoryMastery,
  gradeQuizSession,
  type QuizGradeResult,
} from '../utils/learnEngine';
import { isSpeechSupported, speakText, stopSpeech } from '../utils/speech';
import { BilingualText } from './BilingualText';

interface QuizEngineProps {
  onNavigate: (route: AtlasRoute, targetItemId?: string) => void;
  autoLaunchWrongReview?: boolean;
  initialCategory?: QuizCategoryId | 'all';
}

type QuizPhase = 'setup' | 'active' | 'summary';
type SessionLimit = 5 | 10 | 15 | 'all';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

const DIFFICULTY_LABELS = {
  temel: { tr: 'Temel', fr: 'Fondamental' },
  orta: { tr: 'Orta', fr: 'Intermédiaire' },
  ileri: { tr: 'İleri', fr: 'Avancé' },
} as const;

export function QuizEngine({
  onNavigate,
  autoLaunchWrongReview = false,
  initialCategory = 'all',
}: QuizEngineProps) {
  const { showFrench } = useLanguage();
  const { progress, recordQuizScore, recordWrongQuestions } = useProgress();

  const [phase, setPhase] = useState<QuizPhase>('setup');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategoryId | 'all'>(initialCategory);
  const [sessionLimit, setSessionLimit] = useState<SessionLimit>(10);
  const [isWrongReviewRun, setIsWrongReviewRun] = useState(false);

  const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [summaryResult, setSummaryResult] = useState<QuizGradeResult | null>(null);
  const [speakingCue, setSpeakingCue] = useState(false);

  const categoryMastery = useMemo(
    () => computeCategoryMastery(QUIZ_QUESTIONS, progress.wrongQuestionIds, progress.quizScores),
    [progress.wrongQuestionIds, progress.quizScores]
  );

  const startQuiz = (
    cat: QuizCategoryId | 'all',
    limit: SessionLimit,
    wrongOnly: boolean
  ) => {
    stopSpeech();
    setSpeakingCue(false);
    const qs = buildQuizSession(QUIZ_QUESTIONS, {
      category: cat,
      wrongOnly,
      wrongQuestionIds: progress.wrongQuestionIds,
      limit: wrongOnly ? 'all' : limit,
      shuffle: true,
    });
    if (qs.length === 0) return;

    setSelectedCategory(cat);
    setIsWrongReviewRun(wrongOnly);
    setSessionQuestions(qs);
    setCurrentIndex(0);
    setAnswers({});
    setSummaryResult(null);
    setPhase('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (autoLaunchWrongReview && progress.wrongQuestionIds.length > 0 && phase === 'setup') {
      startQuiz('all', 'all', true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLaunchWrongReview]);

  useEffect(() => () => stopSpeech(), []);

  const currentQuestion = sessionQuestions[currentIndex];
  const chosenOption = currentQuestion ? answers[currentQuestion.id] : undefined;
  const hasAnsweredCurrent = typeof chosenOption === 'number';

  const handleChooseOption = (idx: number) => {
    if (!currentQuestion || hasAnsweredCurrent) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: idx }));
  };

  const handleNextOrFinish = () => {
    stopSpeech();
    setSpeakingCue(false);

    if (currentIndex + 1 < sessionQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const graded = gradeQuizSession(sessionQuestions, answers);
    setSummaryResult(graded);
    recordWrongQuestions(graded.wrongIds, graded.correctIds);
    recordQuizScore({
      id: `quiz-${Date.now()}`,
      category: isWrongReviewRun ? 'wrong-review' : selectedCategory,
      score: graded.score,
      total: graded.total,
      dateIso: new Date().toISOString(),
    });
    setPhase('summary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSpeakArabicCue = (text: string) => {
    if (speakingCue) {
      stopSpeech();
      setSpeakingCue(false);
      return;
    }
    setSpeakingCue(true);
    speakText(
      text,
      'ar-SA',
      () => setSpeakingCue(false),
      () => setSpeakingCue(false)
    );
  };

  const getCategoryMeta = (id: QuizCategoryId) =>
    QUIZ_CATEGORIES.find((c) => c.id === id) ?? QUIZ_CATEGORIES[0];

  const availablePoolCount = useMemo(() => {
    if (selectedCategory === 'all') return QUIZ_QUESTIONS.length;
    return QUIZ_QUESTIONS.filter((q) => q.category === selectedCategory).length;
  }, [selectedCategory]);

  // =========================================================================
  // PHASE 1: SETUP HUB
  // =========================================================================
  if (phase === 'setup') {
    const wrongCount = progress.wrongQuestionIds.length;

    return (
      <div className="space-y-6">
        {/* Wrong Answers Review Callout */}
        <section
          aria-label="Yanlış cevapları tekrar etme modu"
          className={`rounded-2xl border p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            wrongCount > 0
              ? 'border-[#722630]/35 dark:border-[#D47A85]/35 bg-[#722630]/[0.05] dark:bg-[#D47A85]/[0.08]'
              : 'border-[#DDD4C5] dark:border-[#2E2924] bg-[#F3EFE8]/70 dark:bg-[#181614]'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <RotateCcw
                className={`w-4 h-4 ${
                  wrongCount > 0
                    ? 'text-[#722630] dark:text-[#D47A85]'
                    : 'text-[#165B43] dark:text-[#4FB28C]'
                }`}
                aria-hidden="true"
              />
              <span
                className={`text-xs font-semibold uppercase tracking-[0.14em] ${
                  wrongCount > 0
                    ? 'text-[#722630] dark:text-[#D47A85]'
                    : 'text-[#165B43] dark:text-[#4FB28C]'
                }`}
              >
                {wrongCount > 0
                  ? `Yanlış Havuzu · ${wrongCount} Soru Bekliyor`
                  : 'Yanlış Cevap Havuzu Temiz'}
              </span>
              {showFrench && (
                <span lang="fr" className="text-xs italic text-[#787066] dark:text-[#A8A095]">
                  · {wrongCount > 0 ? `${wrongCount} erreurs à réviser` : 'Aucune erreur en attente'}
                </span>
              )}
            </div>
            <BilingualText
              text={
                wrongCount > 0
                  ? {
                      tr: 'Önceki sınavlarda hatalı işaretlediğiniz soruları özel tekrar oturumuyla pekiştirin; doğru bildikleriniz havuzdan otomatik çıkarılır.',
                      fr: 'Révisez uniquement les questions manquées lors des sessions précédentes ; chaque bonne réponse les retire de la liste.',
                    }
                  : {
                      tr: 'Henüz yanlış cevap kaydınız yok. Bir sınav çözdüğünüzde hatalı sorularınız otomatik olarak burada toplanır.',
                      fr: 'Aucune erreur enregistrée pour le moment. Vos réponses manquées seront automatiquement rassemblées ici.',
                    }
              }
              primaryClassName="text-sm text-[#3A3530] dark:text-[#D6CFC5]"
              secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
              forceStacked
            />
          </div>

          <button
            type="button"
            disabled={wrongCount === 0}
            onClick={() => startQuiz('all', 'all', true)}
            className={`shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              wrongCount > 0
                ? 'bg-[#722630] text-[#FAF8F5] hover:bg-[#5B1D26] dark:bg-[#D47A85] dark:text-[#121110] cursor-pointer'
                : 'bg-[#E7E0D4] text-[#8E867B] dark:bg-[#262320] dark:text-[#6E675E] cursor-not-allowed'
            }`}
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>
              Yanlışları Tekrar Et {wrongCount > 0 ? `(${wrongCount})` : ''}
            </span>
          </button>
        </section>

        {/* Category Selection Grid (All + 6 Categories) */}
        <section aria-label="Sınav kategorisi seçimi" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <BilingualText
              as="h2"
              text={{
                tr: '1. Kategori Seçin (6 Alan · 54 Soru)',
                fr: '1. Choisir une catégorie (6 domaines · 54 questions)',
              }}
              primaryClassName="font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
              secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
              forceStacked
            />
            <span className="text-xs text-[#787066] dark:text-[#A8A095]">
              Doğru cevap: +10 XP
            </span>
          </div>

          {/* All-categories banner card */}
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            aria-pressed={selectedCategory === 'all'}
            className={`w-full text-left rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              selectedCategory === 'all'
                ? 'border-[#8B6520] dark:border-[#DFC07D] bg-[#8B6520]/[0.08] dark:bg-[#DFC07D]/[0.10] ring-1 ring-[#8B6520]/40 dark:ring-[#DFC07D]/40'
                : 'border-[#DDD4C5] dark:border-[#2E2924] bg-[#FDFBF7] dark:bg-[#181614] hover:border-[#BFA980] dark:hover:border-[#52493D]'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8B6520] dark:text-[#DFC07D]" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B6520] dark:text-[#DFC07D]">
                  Karma Atlas Sınavı · 54 Soru
                </span>
              </div>
              <BilingualText
                text={{
                  tr: 'Tüm Atlası Kapsayan Karma Sınav',
                  fr: 'Examen global couvrant les 6 domaines de l’Atlas',
                }}
                primaryClassName="text-base font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
                forceStacked
              />
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] self-start sm:self-center">
              54 Soru · 6 Alan
            </span>
          </button>

          {/* 6 Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUIZ_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const stat = categoryMastery.find((m) => m.category === cat.id);
              const accentRing =
                cat.accent === 'emerald'
                  ? 'border-[#165B43] dark:border-[#4FB28C] bg-[#165B43]/[0.06] dark:bg-[#4FB28C]/[0.10]'
                  : cat.accent === 'burgundy'
                    ? 'border-[#722630] dark:border-[#D47A85] bg-[#722630]/[0.06] dark:bg-[#D47A85]/[0.10]'
                    : 'border-[#8B6520] dark:border-[#DFC07D] bg-[#8B6520]/[0.07] dark:bg-[#DFC07D]/[0.10]';

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  aria-pressed={isSelected}
                  className={`text-left rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? accentRing
                      : 'border-[#DDD4C5] dark:border-[#2E2924] bg-[#FDFBF7] dark:bg-[#181614] hover:border-[#BFA980] dark:hover:border-[#52493D]'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#787066] dark:text-[#A8A095]">
                        {stat?.totalQuestions ?? 9} Soru
                      </span>
                      <div className="flex items-center gap-1.5">
                        {stat && stat.wrongCount > 0 && (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#722630]/12 text-[#722630] dark:bg-[#D47A85]/18 dark:text-[#D47A85]">
                            {stat.wrongCount} yanlış
                          </span>
                        )}
                        {stat && stat.bestPercentage !== null && (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#165B43]/12 text-[#165B43] dark:bg-[#4FB28C]/18 dark:text-[#4FB28C]">
                            En iyi %{stat.bestPercentage}
                          </span>
                        )}
                      </div>
                    </div>

                    <BilingualText
                      text={cat.title}
                      primaryClassName="text-base font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                      secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
                      forceStacked
                    />
                    <BilingualText
                      text={cat.subtitle}
                      primaryClassName="text-xs text-[#57514A] dark:text-[#B8B0A6] leading-relaxed"
                      secondaryClassName="text-[11px] text-[#787066] dark:text-[#9A9287] italic leading-relaxed"
                      forceStacked
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Session Length & Launch Bar */}
        <section className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#F3EFE8]/75 dark:bg-[#181614] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#57514A] dark:text-[#A8A095]">
              2. Soru Sayısı {showFrench ? '· Nombre de questions' : ''}
            </p>
            <div className="flex flex-wrap gap-2">
              {([5, 10, 15, 'all'] as SessionLimit[]).map((len) => {
                const disabled = typeof len === 'number' && len > availablePoolCount;
                const active = sessionLimit === len;
                return (
                  <button
                    key={String(len)}
                    type="button"
                    disabled={disabled}
                    onClick={() => setSessionLimit(len)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      active
                        ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] dark:bg-[#DFC07D] dark:text-[#121110] dark:border-[#DFC07D]'
                        : disabled
                          ? 'opacity-40 border-[#DDD4C5] dark:border-[#2E2924] text-[#787066] cursor-not-allowed'
                          : 'bg-[#FAF8F5] dark:bg-[#121110] border-[#D5CBB9] dark:border-[#342F2A] text-[#3A3530] dark:text-[#D6CFC5] hover:border-[#8B6520] cursor-pointer'
                    }`}
                  >
                    {len === 'all' ? `Tümü (${availablePoolCount})` : `${len} Soru`}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              startQuiz(
                selectedCategory,
                typeof sessionLimit === 'number' && sessionLimit > availablePoolCount
                  ? 'all'
                  : sessionLimit,
                false
              )
            }
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#165B43] hover:bg-[#124A36] dark:bg-[#4FB28C] dark:hover:bg-[#3E9C78] text-[#FAF8F5] dark:text-[#121110] text-sm font-semibold transition-colors cursor-pointer"
          >
            <span>Sınava Başla</span>
            {showFrench && <span lang="fr" className="opacity-85 font-normal">· Commencer</span>}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </section>
      </div>
    );
  }

  // =========================================================================
  // PHASE 2: ACTIVE QUESTION STAGE
  // =========================================================================
  if (phase === 'active' && currentQuestion) {
    const catMeta = getCategoryMeta(currentQuestion.category);
    const diffLabel = DIFFICULTY_LABELS[currentQuestion.difficulty];
    const progressPercent = Math.round(((currentIndex + 1) / sessionQuestions.length) * 100);
    const isCorrect = hasAnsweredCurrent && chosenOption === currentQuestion.correctIndex;

    return (
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Top Quiz Progress Header */}
        <div className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#F3EFE8]/80 dark:bg-[#181614] p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
                Soru {currentIndex + 1} / {sessionQuestions.length}
              </span>
              <span className="text-[#787066] dark:text-[#A8A095]">·</span>
              <span className="text-[#8B6520] dark:text-[#DFC07D] font-semibold">
                {isWrongReviewRun ? 'Yanlış Tekrar Modu' : catMeta.title.tr}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded border border-[#D5CBB9] dark:border-[#342F2A] text-[11px] font-medium text-[#57514A] dark:text-[#B8B0A6]">
                {diffLabel.tr} {showFrench ? `· ${diffLabel.fr}` : ''}
              </span>
              <button
                type="button"
                onClick={() => {
                  stopSpeech();
                  setPhase('setup');
                }}
                className="text-[#787066] hover:text-[#1C1917] dark:hover:text-[#FAF8F5] underline underline-offset-2 cursor-pointer"
              >
                Çık
              </button>
            </div>
          </div>

          <div
            className="w-full h-2 rounded-full bg-[#E7E0D4] dark:bg-[#262320] overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-[#165B43] dark:bg-[#4FB28C] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <article className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FDFBF7] dark:bg-[#181614] p-5 sm:p-7 space-y-6">
          {currentQuestion.arabicCue && (
            <div className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#121110] px-4 py-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleSpeakArabicCue(currentQuestion.arabicCue!)}
                disabled={!isSpeechSupported()}
                aria-label="Arapça ibareyi dinle"
                className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  speakingCue
                    ? 'bg-[#8B6520] text-[#FAF8F5] border-[#8B6520]'
                    : 'border-[#D5CBB9] dark:border-[#342F2A] text-[#57514A] dark:text-[#C4BCB0] hover:border-[#8B6520]'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>AR</span>
              </button>
              <p
                dir="rtl"
                lang="ar"
                className="font-arabic text-xl sm:text-2xl text-[#1C1917] dark:text-[#FAF8F5] leading-[1.85] text-right flex-1"
              >
                {currentQuestion.arabicCue}
              </p>
            </div>
          )}

          <BilingualText
            as="h3"
            text={currentQuestion.question}
            primaryClassName="font-editorial text-xl sm:text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5] leading-snug"
            secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic leading-relaxed"
            forceStacked
          />

          {/* 4 Options */}
          <div className="space-y-3" role="radiogroup" aria-label="Cevap seçenekleri">
            {currentQuestion.options.map((option, idx) => {
              const isChosen = chosenOption === idx;
              const isRightOption = idx === currentQuestion.correctIndex;

              let cardStyle =
                'border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] hover:border-[#8B6520] dark:hover:border-[#DFC07D] cursor-pointer';
              let badgeStyle =
                'bg-[#E7E0D4] dark:bg-[#262320] text-[#3A3530] dark:text-[#D6CFC5]';

              if (hasAnsweredCurrent) {
                if (isRightOption) {
                  cardStyle =
                    'border-[#165B43] dark:border-[#4FB28C] bg-[#165B43]/[0.09] dark:bg-[#4FB28C]/[0.14] cursor-default';
                  badgeStyle =
                    'bg-[#165B43] dark:bg-[#4FB28C] text-[#FAF8F5] dark:text-[#121110]';
                } else if (isChosen && !isRightOption) {
                  cardStyle =
                    'border-[#722630] dark:border-[#D47A85] bg-[#722630]/[0.09] dark:bg-[#D47A85]/[0.14] cursor-default';
                  badgeStyle =
                    'bg-[#722630] dark:bg-[#D47A85] text-[#FAF8F5] dark:text-[#121110]';
                } else {
                  cardStyle =
                    'border-[#E7E0D4] dark:border-[#24211E] bg-[#FAF8F5]/50 dark:bg-[#121110]/50 opacity-65 cursor-default';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={hasAnsweredCurrent}
                  onClick={() => handleChooseOption(idx)}
                  className={`w-full text-left rounded-xl border p-4 transition-all flex items-start gap-3.5 ${cardStyle}`}
                >
                  <span
                    className={`shrink-0 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center mt-0.5 ${badgeStyle}`}
                  >
                    {OPTION_LETTERS[idx]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <BilingualText
                      text={option}
                      primaryClassName="text-sm sm:text-base font-medium text-[#1C1917] dark:text-[#FAF8F5]"
                      secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
                      forceStacked
                    />
                  </div>
                  {hasAnsweredCurrent && isRightOption && (
                    <CheckCircle2
                      className="w-5 h-5 shrink-0 text-[#165B43] dark:text-[#4FB28C] mt-0.5"
                      aria-hidden="true"
                    />
                  )}
                  {hasAnsweredCurrent && isChosen && !isRightOption && (
                    <XCircle
                      className="w-5 h-5 shrink-0 text-[#722630] dark:text-[#D47A85] mt-0.5"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Scholarly Feedback */}
          {hasAnsweredCurrent && (
            <div
              role="status"
              className={`rounded-xl border p-4 sm:p-5 space-y-3 ${
                isCorrect
                  ? 'border-[#165B43]/40 dark:border-[#4FB28C]/40 bg-[#165B43]/[0.06] dark:bg-[#4FB28C]/[0.09]'
                  : 'border-[#722630]/40 dark:border-[#D47A85]/40 bg-[#722630]/[0.06] dark:bg-[#D47A85]/[0.09]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p
                  className={`text-sm font-semibold ${
                    isCorrect
                      ? 'text-[#165B43] dark:text-[#4FB28C]'
                      : 'text-[#722630] dark:text-[#D47A85]'
                  }`}
                >
                  {isCorrect
                    ? 'Doğru Cevap! (+10 XP)'
                    : 'Yanlış Cevap — Tekrar havuzuna eklendi'}
                  {showFrench && (
                    <span lang="fr" className="ml-1.5 font-normal italic">
                      · {isCorrect ? 'Bonne réponse !' : 'Ajoutée à la liste de révision'}
                    </span>
                  )}
                </p>
                <span className="text-[11px] font-medium text-[#57514A] dark:text-[#A8A095]">
                  {currentQuestion.sourceRef}
                </span>
              </div>

              <BilingualText
                text={currentQuestion.explanation}
                primaryClassName="text-sm text-[#1C1917] dark:text-[#EFEAE2] leading-relaxed"
                secondaryClassName="text-xs text-[#57514A] dark:text-[#B8B0A6] italic leading-relaxed"
                forceStacked
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#DDD4C5]/60 dark:border-[#2E2924]/70">
                <button
                  type="button"
                  onClick={() =>
                    onNavigate(currentQuestion.deepLink.route, currentQuestion.deepLink.targetItemId)
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B6520] dark:text-[#DFC07D] hover:underline cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Kaynağa Git {showFrench ? '· Voir la source' : ''}</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={handleNextOrFinish}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#3A3530] dark:bg-[#DFC07D] dark:hover:bg-[#C8A152] text-[#FAF8F5] dark:text-[#121110] text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>
                    {currentIndex + 1 < sessionQuestions.length
                      ? 'Sonraki Soru'
                      : 'Sonucu Gör'}
                  </span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </article>
      </div>
    );
  }

  // =========================================================================
  // PHASE 3: SUMMARY SCREEN
  // =========================================================================
  const result = summaryResult ?? gradeQuizSession(sessionQuestions, answers);
  const wrongInSession = sessionQuestions.filter((q) => result.wrongIds.includes(q.id));

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <section className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#F3EFE8]/85 dark:bg-[#181614] p-6 sm:p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl mx-auto bg-[#165B43]/12 dark:bg-[#4FB28C]/18 flex items-center justify-center">
          <Award className="w-7 h-7 text-[#165B43] dark:text-[#4FB28C]" aria-hidden="true" />
        </div>

        <BilingualText
          as="h2"
          text={{
            tr: 'Sınav Tamamlandı',
            fr: 'Session d’évaluation terminée',
          }}
          primaryClassName="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
          secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
          forceStacked
        />

        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
          <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] p-3">
            <p className="text-2xl font-editorial font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
              {result.score} / {result.total}
            </p>
            <p className="text-[11px] text-[#787066] dark:text-[#A8A095]">Doğru</p>
          </div>
          <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] p-3">
            <p className="text-2xl font-editorial font-semibold text-[#165B43] dark:text-[#4FB28C] tabular-nums">
              %{result.percentage}
            </p>
            <p className="text-[11px] text-[#787066] dark:text-[#A8A095]">Başarı</p>
          </div>
          <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] p-3">
            <p className="text-2xl font-editorial font-semibold text-[#8B6520] dark:text-[#DFC07D] tabular-nums">
              +{result.xpEarned}
            </p>
            <p className="text-[11px] text-[#787066] dark:text-[#A8A095]">Kazanılan XP</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          {wrongInSession.length > 0 && (
            <button
              type="button"
              onClick={() => startQuiz('all', 'all', true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#722630] hover:bg-[#5B1D26] dark:bg-[#D47A85] dark:text-[#121110] text-[#FAF8F5] text-sm font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Yanlışları Şimdi Tekrar Et ({wrongInSession.length})</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setPhase('setup')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#3A3530] dark:bg-[#DFC07D] dark:text-[#121110] text-[#FAF8F5] text-sm font-semibold transition-colors cursor-pointer"
          >
            <span>Kategori Seçimine Dön</span>
          </button>
        </div>
      </section>

      {/* Answer Review List */}
      <section className="space-y-3" aria-label="Soru bazlı özet">
        <h3 className="font-editorial text-lg font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
          Soru Bazlı Değerlendirme {showFrench ? '· Bilan détaillé' : ''}
        </h3>

        {sessionQuestions.map((q, idx) => {
          const chosen = answers[q.id];
          const ok = chosen === q.correctIndex;
          return (
            <div
              key={q.id}
              className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FDFBF7] dark:bg-[#181614] p-4 space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  {ok ? (
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 text-[#165B43] dark:text-[#4FB28C] mt-1"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircle
                      className="w-4 h-4 shrink-0 text-[#722630] dark:text-[#D47A85] mt-1"
                      aria-hidden="true"
                    />
                  )}
                  <p className="text-sm font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                    {idx + 1}. {q.question.tr}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate(q.deepLink.route, q.deepLink.targetItemId)}
                  className="shrink-0 text-xs font-semibold text-[#8B6520] dark:text-[#DFC07D] hover:underline cursor-pointer"
                >
                  Kaynak →
                </button>
              </div>
              <p className="text-xs text-[#165B43] dark:text-[#4FB28C] pl-6">
                Doğru cevap: {q.options[q.correctIndex].tr}
              </p>
              {!ok && typeof chosen === 'number' && (
                <p className="text-xs text-[#722630] dark:text-[#D47A85] pl-6">
                  Sizin cevabınız: {q.options[chosen].tr}
                </p>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
