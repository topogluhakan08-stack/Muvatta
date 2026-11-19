import React, { useMemo } from 'react';
import {
  Award,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Circle,
  ExternalLink,
  FileText,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import { HADITHS_DATA } from '../data/hadithsData';
import {
  QUIZ_CATEGORIES,
  QUIZ_QUESTIONS,
  SRS_FLASHCARDS,
  type QuizCategoryId,
} from '../data/learnData';
import type { AtlasRoute } from '../types/atlas';
import {
  computeCategoryMastery,
  getFlashcardDeckSummary,
} from '../utils/learnEngine';
import { BilingualText } from './BilingualText';

interface MasteryDashboardProps {
  onNavigate: (route: AtlasRoute, targetItemId?: string) => void;
  onStartWrongReview: () => void;
  onStartCategoryQuiz: (cat: QuizCategoryId) => void;
}

export function MasteryDashboard({
  onNavigate,
  onStartWrongReview,
  onStartCategoryQuiz,
}: MasteryDashboardProps) {
  const { showFrench } = useLanguage();
  const { progress, levelInfo, isHadithMastered, toggleMasteredHadith } = useProgress();

  const srsSummary = useMemo(
    () => getFlashcardDeckSummary(SRS_FLASHCARDS, progress.flashcardProgress),
    [progress.flashcardProgress]
  );

  const categoryStats = useMemo(
    () => computeCategoryMastery(QUIZ_QUESTIONS, progress.wrongQuestionIds, progress.quizScores),
    [progress.wrongQuestionIds, progress.quizScores]
  );

  const noteEntries = useMemo(
    () => Object.entries(progress.notes).filter(([, v]) => v.trim().length > 0),
    [progress.notes]
  );

  const formatCategoryLabel = (catId: string) => {
    if (catId === 'all') return 'Karma Sınav';
    if (catId === 'wrong-review') return 'Yanlış Tekrar';
    return QUIZ_CATEGORIES.find((c) => c.id === catId)?.title.tr ?? catId;
  };

  const formatDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(iso));
    } catch {
      return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Level & XP Hero Banner */}
      <section className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#F3EFE8]/85 dark:bg-[#181614] p-5 sm:p-7 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#8B6520]/15 dark:bg-[#DFC07D]/18 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-[#8B6520] dark:text-[#DFC07D]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B6520] dark:text-[#DFC07D]">
                Seviye {levelInfo.level} · İlmiye Rütbesi
              </p>
              <BilingualText
                as="h2"
                text={levelInfo.title}
                primaryClassName="font-editorial text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
                secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
                forceStacked
              />
            </div>
          </div>

          <div className="w-full md:w-72 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
                {levelInfo.currentXp} XP
              </span>
              <span className="text-[#787066] dark:text-[#A8A095] tabular-nums">
                {levelInfo.progressPercent < 100
                  ? `Sonraki seviye: ${levelInfo.nextLevelXp} XP`
                  : 'Zirve Seviye'}
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#E7E0D4] dark:bg-[#262320] overflow-hidden">
              <div
                className="h-full bg-[#8B6520] dark:bg-[#DFC07D] transition-all duration-300"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 4 Summary Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] p-3.5">
            <p className="text-2xl font-editorial font-semibold text-[#165B43] dark:text-[#4FB28C] tabular-nums">
              {progress.masteredHadiths.length} / 8
            </p>
            <p className="text-xs text-[#57514A] dark:text-[#A8A095]">
              Hakim Olunan Hadis {showFrench ? '· Hadiths maîtrisés' : ''}
            </p>
          </div>
          <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] p-3.5">
            <p className="text-2xl font-editorial font-semibold text-[#8B6520] dark:text-[#DFC07D] tabular-nums">
              {progress.quizScores.length}
            </p>
            <p className="text-xs text-[#57514A] dark:text-[#A8A095]">
              Tamamlanan Sınav {showFrench ? '· Quiz terminés' : ''}
            </p>
          </div>
          <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] p-3.5">
            <p className="text-2xl font-editorial font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
              {srsSummary.mastered} / {srsSummary.total}
            </p>
            <p className="text-xs text-[#57514A] dark:text-[#A8A095]">
              Pekişen Bilgi Kartı {showFrench ? '· Cartes SRS' : ''}
            </p>
          </div>
          <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] p-3.5">
            <p className="text-2xl font-editorial font-semibold text-[#722630] dark:text-[#D47A85] tabular-nums">
              {progress.bookmarks.length} / {noteEntries.length}
            </p>
            <p className="text-xs text-[#57514A] dark:text-[#A8A095]">
              Yer İmi &amp; Not {showFrench ? '· Favoris & Notes' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* 8 Hadiths Mastery Matrix */}
      <section className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FDFBF7] dark:bg-[#181614] p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <BilingualText
            as="h3"
            text={{
              tr: 'Kitâbü’s-Salât fî Ramadân — 8 Hadis Hakimiyet Matrisi',
              fr: 'Matrice de maîtrise des 8 Hadiths',
            }}
            primaryClassName="font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
            secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
            forceStacked
          />
          <span className="text-xs text-[#165B43] dark:text-[#4FB28C] font-semibold">
            Her hadis hakimiyeti: +25 XP
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {HADITHS_DATA.map((hadith) => {
            const mastered = isHadithMastered(hadith.number);
            return (
              <div
                key={hadith.id}
                className={`rounded-xl border p-3.5 flex flex-col justify-between gap-3 transition-colors ${
                  mastered
                    ? 'border-[#165B43]/45 dark:border-[#4FB28C]/45 bg-[#165B43]/[0.06] dark:bg-[#4FB28C]/[0.10]'
                    : 'border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#121110]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8B6520] dark:text-[#DFC07D]">
                      Bab {hadith.bab} · Hadis {hadith.number}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleMasteredHadith(hadith.number)}
                      aria-pressed={mastered}
                      aria-label={
                        mastered
                          ? `Hadis ${hadith.number} hakimiyet işaretini kaldır`
                          : `Hadis ${hadith.number} hakim oldum olarak işaretle`
                      }
                      className="cursor-pointer"
                    >
                      {mastered ? (
                        <CheckCircle2 className="w-4 h-4 text-[#165B43] dark:text-[#4FB28C]" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#A8A095] hover:text-[#165B43]" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                    {hadith.title.tr}
                  </p>
                  {showFrench && (
                    <p lang="fr" className="text-[11px] italic text-[#787066] dark:text-[#A8A095]">
                      {hadith.title.fr}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('hadisler', hadith.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#165B43] dark:text-[#4FB28C] hover:underline cursor-pointer self-start"
                >
                  <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Hadisi Oku</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Two-column Analytics: Category Readiness + Quiz History / Bookmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 6 Categories Performance */}
        <section className="lg:col-span-7 rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FDFBF7] dark:bg-[#181614] p-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <BilingualText
              as="h3"
              text={{
                tr: '6 Kategori Sınav Hazırlık Durumu',
                fr: 'Progression par domaine (6 catégories)',
              }}
              primaryClassName="font-editorial text-lg font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
              secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic"
              forceStacked
            />
            {progress.wrongQuestionIds.length > 0 && (
              <button
                type="button"
                onClick={onStartWrongReview}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#722630] text-[#FAF8F5] dark:bg-[#D47A85] dark:text-[#121110] text-xs font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Yanlışları Çöz ({progress.wrongQuestionIds.length})</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {QUIZ_CATEGORIES.map((cat) => {
              const stat = categoryStats.find((s) => s.category === cat.id);
              const readiness = stat?.readinessPercent ?? 0;
              return (
                <div
                  key={cat.id}
                  className="rounded-xl border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#121110] p-3.5 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                        {cat.title.tr}
                      </p>
                      {showFrench && (
                        <p lang="fr" className="text-[11px] italic text-[#787066] dark:text-[#A8A095]">
                          {cat.title.fr}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onStartCategoryQuiz(cat.id)}
                      className="text-xs font-semibold text-[#8B6520] dark:text-[#DFC07D] hover:underline cursor-pointer"
                    >
                      Sınav Ol →
                    </button>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-[#E7E0D4] dark:bg-[#262320] overflow-hidden">
                    <div
                      className="h-full bg-[#165B43] dark:bg-[#4FB28C]"
                      style={{ width: `${readiness}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#787066] dark:text-[#A8A095]">
                    <span>
                      {stat?.bestPercentage !== null && stat
                        ? `En yüksek skor: %${stat.bestPercentage} (${stat.attempts} deneme)`
                        : 'Henüz kategori sınavı çözülmedi'}
                    </span>
                    <span>
                      {stat && stat.wrongCount > 0 ? `${stat.wrongCount} açık yanlış` : 'Hatasız'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent Quiz Runs + Bookmarks & Notes */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quiz History */}
          <section className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FDFBF7] dark:bg-[#181614] p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#8B6520] dark:text-[#DFC07D]" aria-hidden="true" />
              <h3 className="font-editorial text-lg font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                Son Sınav Sonuçları {showFrench ? '· Historique' : ''}
              </h3>
            </div>

            {progress.quizScores.length === 0 ? (
              <p className="text-xs text-[#787066] dark:text-[#A8A095] leading-relaxed">
                Henüz tamamlanmış bir sınav bulunmuyor. İlk sınavınızı çözdüğünüzde skorlarınız
                burada listelenir.
              </p>
            ) : (
              <ul className="space-y-2">
                {progress.quizScores.slice(0, 6).map((rec) => {
                  const pct = rec.total > 0 ? Math.round((rec.score / rec.total) * 100) : 0;
                  return (
                    <li
                      key={rec.id}
                      className="rounded-lg border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#121110] px-3 py-2 flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1C1917] dark:text-[#FAF8F5] truncate">
                          {formatCategoryLabel(rec.category)}
                        </p>
                        <p className="text-[11px] text-[#787066] dark:text-[#A8A095]">
                          {formatDate(rec.dateIso)}
                        </p>
                      </div>
                      <span className="shrink-0 font-semibold tabular-nums text-[#165B43] dark:text-[#4FB28C]">
                        {rec.score}/{rec.total} (%{pct})
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* Bookmarks & Personal Notes */}
          <section className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FDFBF7] dark:bg-[#181614] p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#8B6520] dark:text-[#DFC07D]" aria-hidden="true" />
              <h3 className="font-editorial text-lg font-semibold text-[#1C1917] dark:text-[#FAF8F5]">
                Yer İmleri &amp; Notlar {showFrench ? '· Favoris & Notes' : ''}
              </h3>
            </div>

            {progress.bookmarks.length === 0 && noteEntries.length === 0 ? (
              <p className="text-xs text-[#787066] dark:text-[#A8A095] leading-relaxed">
                Hadislerde, sözlük maddelerinde veya zihin haritasında kaydettiğiniz yer imleri ve
                kişisel notlar burada toplanır.
              </p>
            ) : (
              <div className="space-y-2.5">
                {progress.bookmarks.slice(0, 5).map((bm) => (
                  <button
                    key={bm.id}
                    type="button"
                    onClick={() => onNavigate(bm.route, bm.targetId)}
                    className="w-full text-left rounded-lg border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#121110] px-3 py-2 flex items-center justify-between gap-2 text-xs hover:border-[#8B6520] cursor-pointer"
                  >
                    <span className="font-medium text-[#1C1917] dark:text-[#FAF8F5] truncate">
                      {bm.title.tr}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#8B6520] dark:text-[#DFC07D]" />
                  </button>
                ))}

                {noteEntries.slice(0, 3).map(([key, content]) => (
                  <div
                    key={key}
                    className="rounded-lg border border-[#E7E0D4] dark:border-[#2C2824] bg-[#FAF8F5] dark:bg-[#121110] px-3 py-2 space-y-1 text-xs"
                  >
                    <p className="inline-flex items-center gap-1.5 font-semibold text-[#8B6520] dark:text-[#DFC07D]">
                      <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Not: {key}</span>
                    </p>
                    <p className="text-[#57514A] dark:text-[#B8B0A6] line-clamp-2">{content}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
