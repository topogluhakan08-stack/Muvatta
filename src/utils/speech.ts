export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
}

export function stopSpeech(): void {
  if (!isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    // Ignore cancellation issues in sandboxed browsers
  }
}

export function speakText(
  text: string,
  lang: 'ar-SA' | 'tr-TR' | 'fr-FR',
  onEnd?: () => void,
  onError?: () => void
): boolean {
  if (!isSpeechSupported()) {
    onError?.();
    return false;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = lang === 'ar-SA' ? 0.88 : 0.96;

    const voices = window.speechSynthesis.getVoices();
    const prefix = lang.split('-')[0].toLowerCase();
    const matchingVoice = voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onError?.();

    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    onError?.();
    return false;
  }
}
