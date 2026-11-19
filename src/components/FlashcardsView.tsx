import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  RotateCw,
  Volume2,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import {
  FLASHCARD_DECKS,
  SRS_FLASHCARDS,
  type FlashcardDeckId,
} from '../data/learnData';
import type { AtlasRoute, FlashcardSrsRating } from '../types/atlas';
import {
  filterFlashcardsByDeck,
  getFlashcardDeckSummary,
  isFlashcardDue,
  sortFlashcardsForStudy,
} from '../utils/learnEngine';
import { isSpeechSupported, speakText, stopSpeech } from '../utils/speech';
import { BilingualText } from './BilingualText';

interface FlashcardsViewProps {
  onNavigate: (route: AtlasRoute, targetItemId?: string) => void;
}

const RATING_BUTTONS: {
  rating: FlashcardSrsRating;
  labelTr: string;
  labelFr: string;
  intervalHint: string;
  xpHint: string;
  className: string;
}[] = [
  {
    rating: 'again',
    labelTr: 'Tekrar',
    labelFr: 'Encore',
    intervalHint: 'Şimdi',
    xpHint: '+2 XP',
    className:
      'border-[#722630]/40 bg-[#722630]/[0.08] text-[#722630] hover:bg-[#722630] hover:text-[#FAF8F5] dark:border-[#D47A85]/40 dark:bg-[#D47A85]/12 dark:text-[#D47A85] dark:hover:bg-[#D47A85] dark:hover:text-[#121110]',
  },
  {
    rating: 'hard',
    labelTr: 'Zor',
    labelFr: 'Difficile',
    intervalHint: '1 gün',
    xpHint: '+4 XP',
    className:
      'border-[#8B6520]/40 bg-[#8B6520]/[0.08] text-[#8B6520] hover:bg-[#8B6520] hover:text-[#FAF8F5] dark:border-[#DFC07D]/40 dark:bg-[#DFC07D]/12 dark:text-[#DFC07D] dark:hover:bg-[#DFC07D] dark:hover:text-[#121110]',
  },
  {
    rating: 'good',
    labelTr: 'İyi',
    labelFr: 'Bien',
    intervalHint: '3–7 gün',
    xpHint: '+5–8 XP',
    className:
      'border-[#165B43]/40 bg-[#165B43]/[0.08] text-[#165B43] hover:bg-[#165B43] hover:text-[#FAF8F5] dark:border-[#4FB28C]/40 dark:bg-[#4FB28C]/12 dark:text-[#4FB28C] dark:hover:bg-[#4FB28C] dark:hover:text-[#121110]',
  },
  {
    rating: 'easy',
    labelTr: 'Kolay',
    labelFr: 'Facile',
    intervalHint: '5–30 gün',
    xpHint: '+6–10 XP',
    className:
      'border-[#1C1917]/30 bg-[#1C1917]/[0.06] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5] dark:border-[#FAF8F5]/30 dark:bg-[#FAF8F5]/10 dark:text-[#FAF8F5] dark:hover:bg-[#FAF8F5] dark:hover:text-[#121110]',
  },
];

export function FlashcardsView({ onNavigate }: FlashcardsViewProps) {
  const { showFrench } = useLanguage();
  const { progress, reviewFlashcard } = useProgress();

  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeckId | 'all'>('all');
  const [dueOnly, setDueOnly] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const deckCards = useMemo(
    () => filterFlashcardsByDeck(SRS_FLASHCARDS, selectedDeck),
    [selectedDeck]
  );

  const summary = useMemo(
    () => getFlashcardDeckSummary(deckCards, progress.flashcardProgress),
    [deckCards, progress.flashcardProgress]
  );

  const studyCards = useMemo(() => {
    const sorted = sortFlashcardsForStudy(deckCards, progress.flashcardProgress);
    if (!dueOnly) return sorted;
    return sorted.filter((c) => isFlashcardDue(progress.flashcardProgress[c.id]));
  }, [deckCards, dueOnly, progress.flashcardProgress]);

  const safeIndex = studyCards.length > 0 ? Math.min(cardIndex, studyCards.length - 1) : 0;
  const activeCard = studyCards[safeIndex];
  const activeSrs = activeCard ? progress.flashcardProgress[activeCard.id] : undefined;

  useEffect(() => {
    setCardIndex(0);
    setIsFlipped(false);
  }, [selectedDeck, dueOnly]);

  useEffect(() => () => stopSpeech(), []);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleStep = (delta: number) => {
    if (studyCards.length === 0) return;
    stopSpeech();
    setSpeaking(false);
    setIsFlipped(false);
    setCardIndex((prev) => (prev + delta + studyCards.length) % studyCards.length);
  };

  const handleRate = (rating: FlashcardSrsRating) => {
    if (!activeCard) return;
    reviewFlashcard(activeCard.id, rating);

    const ratingMeta = RATING_BUTTONS.find((b) => b.rating === rating);
    setLastFeedback(
      `${ratingMeta?.labelTr ?? ''} kaydedildi (${ratingMeta?.intervalHint ?? ''} · ${ratingMeta?.xpHint ?? ''})`
    );

    setIsFlipped(false);
    if (studyCards.length > 1) {
      setCardIndex((prev) => (prev + 1) % studyCards.length);
    }
  };

  const handleSpeakArabic = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    if (speaking) {
      stopSpeech();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    speakText(
      text,
      'ar-SA',
      () => setSpeaking(false),
      () => setSpeaking(false)
    );
  };

  const getDeckLabel = (id: FlashcardDeckId) =>
    FLASHCARD_DECKS.find((d) => d.id === id)?.title ?? { tr: id, fr: id };

  const srsBadgeText = !activeSrs
    ? 'Yeni Kart · Nouveau'
    : activeSrs.box >= 3
      ? `Pekişti · Kutu ${activeSrs.box}/4`
      : `Öğreniliyor · Kutu ${activeSrs.box}/4`;

  return (
    <div className="space-y-6">
      {/* Deck Filter Bar */}
      <section className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#F3EFE8]/75 dark:bg-[#181614] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Bilgi kartı desteleri">
            <button
              type="button"
              role="tab"
              aria-selected={selectedDeck === 'all'}
              onClick={() => setSelectedDeck('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedDeck === 'all'
                  ? 'bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110]'
                  : 'bg-[#FAF8F5] dark:bg-[#121110] text-[#57514A] dark:text-[#B8B0A6] border border-[#D5CBB9] dark:border-[#342F2A] hover:border-[#8B6520]'
              }`}
            >
              Tümü ({SRS_FLASHCARDS.length})
            </button>

            {FLASHCARD_DECKS.map((deck) => {
              const count = SRS_FLASHCARDS.filter((c) => c.deck === deck.id).length;
              const active = selectedDeck === deck.id;
              return (
                <button
                  key={deck.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedDeck(deck.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110]'
                      : 'bg-[#FAF8F5] dark:bg-[#121110] text-[#57514A] dark:text-[#B8B0A6] border border-[#D5CBB9] dark:border-[#342F2A] hover:border-[#8B6520]'
                  }`}
                >
                  {deck.title.tr} ({count})
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-pressed={dueOnly}
            onClick={() => setDueOnly((prev) => !prev)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              dueOnly
                ? 'bg-[#165B43] text-[#FAF8F5] border-[#165B43] dark:bg-[#4FB28C] dark:text-[#121110] dark:border-[#4FB28C]'
                : 'bg-[#FAF8F5] dark:bg-[#121110] text-[#57514A] dark:text-[#B8B0A6] border-[#D5CBB9] dark:border-[#342F2A]'
            }`}
          >
            Sadece Tekrar Zamanı Gelenler ({summary.dueNow})
          </button>
        </div>

        {/* SRS Status Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] px-3 py-2 text-center">
            <p className="text-lg font-editorial font-semibold text-[#8B6520] dark:text-[#DFC07D] tabular-nums">
              {summary.dueNow}
            </p>
            <p className="text-[11px] text-[#787066] dark:text-[#A8A095]">
              Bugün Tekrar {showFrench ? '· À revoir' : ''}
            </p>
          </div>
          <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] px-3 py-2 text-center">
            <p className="text-lg font-editorial font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
              {summary.newCount}
            </p>
            <p className="text-[11px] text-[#787066] dark:text-[#A8A095]">
              Yeni {showFrench ? '· Nouvelles' : ''}
            </p>
          </div>
          <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] px-3 py-2 text-center">
            <p className="text-lg font-editorial font-semibold text-[#722630] dark:text-[#D47A85] tabular-nums">
              {summary.learning}
            </p>
            <p className="text-[11px] text-[#787066] dark:text-[#A8A095]">
              Öğreniliyor {showFrench ? '· En cours' : ''}
            </p>
          </div>
          <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5] dark:bg-[#121110] px-3 py-2 text-center">
            <p className="text-lg font-editorial font-semibold text-[#165B43] dark:text-[#4FB28C] tabular-nums">
              {summary.mastered}
            </p>
            <p className="text-[11px] text-[#787066] dark:text-[#A8A095]">
              Pekişti {showFrench ? '· Maîtrisées' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* 3D Flip Card Stage */}
      {!activeCard ? (
        <div className="max-w-2xl mx-auto rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FDFBF7] dark:bg-[#181614] p-8 text-center space-y-3">
          <Layers className="w-8 h-8 mx-auto text-[#165B43] dark:text-[#4FB28C]" aria-hidden="true" />
          <BilingualText
            text={{
              tr: 'Bu destede bugün için tekrar zamanı gelen kart kalmadı!',
              fr: 'Toutes les cartes dues aujourd’hui dans ce paquet ont été révisées !',
            }}
            primaryClassName="font-editorial text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5]"
            secondaryClassName="text-sm text-[#787066] dark:text-[#A8A095] italic"
            forceStacked
          />
          <button
            type="button"
            onClick={() => setDueOnly(false)}
            className="px-4 py-2 rounded-xl bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] text-xs font-semibold cursor-pointer"
          >
            Tüm Kartları Göster ({deckCards.length})
          </button>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-5">
          {/* Card Navigation Counter */}
          <div className="flex items-center justify-between text-xs text-[#787066] dark:text-[#A8A095]">
            <span className="font-semibold text-[#1C1917] dark:text-[#FAF8F5] tabular-nums">
              Kart {safeIndex + 1} / {studyCards.length}
            </span>
            {lastFeedback && (
              <span className="text-[#165B43] dark:text-[#4FB28C] font-medium">
                {lastFeedback}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-md border border-[#D5CBB9] dark:border-[#342F2A] text-[11px]">
              {srsBadgeText}
            </span>
          </div>

          {/* 3D Perspective Container */}
          <div className="card-scene-3d w-full">
            <div
              role="button"
              tabIndex={0}
              aria-pressed={isFlipped}
              aria-label={isFlipped ? 'Kartın ön yüzüne dön' : 'Cevabı görmek için kartı çevir'}
              onClick={handleFlip}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  handleFlip();
                } else if (e.key === 'ArrowRight') {
                  handleStep(1);
                } else if (e.key === 'ArrowLeft') {
                  handleStep(-1);
                }
              }}
              className={`card-inner-3d relative w-full min-h-[340px] sm:min-h-[370px] cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-[#8B6520] rounded-2xl ${
                isFlipped ? 'is-flipped' : ''
              }`}
            >
              {/* FRONT FACE */}
              <div className="card-face-3d absolute inset-0 rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FDFBF7] dark:bg-[#181614] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B6520] dark:text-[#DFC07D]">
                    {getDeckLabel(activeCard.deck).tr}
                    {showFrench ? ` · ${getDeckLabel(activeCard.deck).fr}` : ''}
                  </span>
                  {activeCard.arabic && isSpeechSupported() && (
                    <button
                      type="button"
                      onClick={(e) => handleSpeakArabic(e, activeCard.arabic!)}
                      aria-label="Arapça metni seslendir"
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                        speaking
                          ? 'bg-[#8B6520] text-[#FAF8F5] border-[#8B6520]'
                          : 'border-[#D5CBB9] dark:border-[#342F2A] text-[#57514A] dark:text-[#C4BCB0] hover:border-[#8B6520]'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>AR</span>
                    </button>
                  )}
                </div>

                <div className="text-center space-y-4 my-auto py-4">
                  {activeCard.arabic && (
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-2xl sm:text-3xl text-[#1C1917] dark:text-[#FAF8F5] leading-[1.9]"
                    >
                      {activeCard.arabic}
                    </p>
                  )}
                  {activeCard.transliteration && (
                    <p className="text-xs font-medium tracking-wide text-[#8B6520] dark:text-[#DFC07D]">
                      {activeCard.transliteration}
                    </p>
                  )}
                  <BilingualText
                    text={activeCard.frontPrompt}
                    primaryClassName="font-editorial text-lg sm:text-xl font-semibold text-[#1C1917] dark:text-[#FAF8F5] max-w-xl mx-auto"
                    secondaryClassName="text-xs sm:text-sm text-[#787066] dark:text-[#A8A095] italic max-w-xl mx-auto"
                    forceStacked
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E7E0D4] dark:border-[#2C2824] text-xs text-[#787066] dark:text-[#9A9287]">
                  <span>{activeCard.rootOrRef}</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#165B43] dark:text-[#4FB28C]">
                    <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Cevabı Gör {showFrench ? '· Retourner' : ''}</span>
                  </span>
                </div>
              </div>

              {/* BACK FACE */}
              <div className="card-face-3d card-face-back-3d absolute inset-0 rounded-2xl border-2 border-[#165B43]/40 dark:border-[#4FB28C]/40 bg-[#F3EFE8] dark:bg-[#1A1815] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#165B43] dark:text-[#4FB28C]">
                    Cevap &amp; İlmî Not {showFrench ? '· Réponse & Note' : ''}
                  </span>
                  <span className="text-[11px] font-medium text-[#787066] dark:text-[#A8A095]">
                    {activeCard.rootOrRef}
                  </span>
                </div>

                <div className="space-y-4 my-auto py-3">
                  <BilingualText
                    text={activeCard.backAnswer}
                    primaryClassName="font-editorial text-xl sm:text-2xl font-semibold text-[#1C1917] dark:text-[#FAF8F5] leading-snug"
                    secondaryClassName="text-sm text-[#57514A] dark:text-[#C4BCB0] italic"
                    forceStacked
                  />
                  <div className="rounded-xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FAF8F5]/85 dark:bg-[#121110]/85 p-3.5">
                    <BilingualText
                      text={activeCard.backDetail}
                      primaryClassName="text-sm text-[#3A3530] dark:text-[#E5DFD5] leading-relaxed"
                      secondaryClassName="text-xs text-[#787066] dark:text-[#A8A095] italic leading-relaxed"
                      forceStacked
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#DDD4C5] dark:border-[#2E2924] text-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(activeCard.deepLink.route, activeCard.deepLink.targetItemId);
                    }}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#8B6520] dark:text-[#DFC07D] hover:underline cursor-pointer"
                  >
                    <span>Kaynağa Git {showFrench ? '· Source' : ''}</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <span className="inline-flex items-center gap-1 text-[#787066] dark:text-[#A8A095]">
                    <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Ön Yüze Dön</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SRS Rating Controls */}
          <div className="rounded-2xl border border-[#DDD4C5] dark:border-[#2E2924] bg-[#FDFBF7] dark:bg-[#181614] p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#3A3530] dark:text-[#D6CFC5]">
                Aralıklı Tekrar (SRS) Değerlendirmesi
                {showFrench ? ' · Auto-évaluation SRS' : ''}
              </span>
              {!isFlipped && (
                <span className="text-[#8B6520] dark:text-[#DFC07D]">
                  Önce kartı çevirip cevabı kontrol edin
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {RATING_BUTTONS.map((btn) => (
                <button
                  key={btn.rating}
                  type="button"
                  onClick={() => handleRate(btn.rating)}
                  className={`rounded-xl border px-3 py-2.5 text-center transition-colors cursor-pointer ${btn.className}`}
                >
                  <p className="text-sm font-semibold">
                    {btn.labelTr}
                    {showFrench && (
                      <span lang="fr" className="ml-1 text-[11px] font-normal opacity-80">
                        · {btn.labelFr}
                      </span>
                    )}
                  </p>
                  <p className="text-[11px] opacity-80 mt-0.5">
                    {btn.intervalHint} · {btn.xpHint}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleStep(-1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#D5CBB9] dark:border-[#342F2A] bg-[#FAF8F5] dark:bg-[#181614] text-xs font-semibold text-[#3A3530] dark:text-[#D6CFC5] hover:border-[#8B6520] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              <span>Önceki Kart</span>
            </button>

            <button
              type="button"
              onClick={handleFlip}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C1917] text-[#FAF8F5] dark:bg-[#DFC07D] dark:text-[#121110] text-xs font-semibold cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Kartı Çevir</span>
            </button>

            <button
              type="button"
              onClick={() => handleStep(1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#D5CBB9] dark:border-[#342F2A] bg-[#FAF8F5] dark:bg-[#181614] text-xs font-semibold text-[#3A3530] dark:text-[#D6CFC5] hover:border-[#8B6520] cursor-pointer"
            >
              <span>Sonraki Kart</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
