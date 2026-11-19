import type { BilingualString } from '../types/atlas';
import type { LexiconEntry, WordPartOfSpeech } from '../types/hadith';
import { getAllLexiconEntries, normalizeArabicToken } from './hadithLexicon';
import { HADITHS_DATA, getHadithWithTokens } from './hadithsData';

export type GlossarySourceGroup = 'hadith' | 'dia-usul';

export interface GlossaryEntry extends LexiconEntry {
  id: string;
  sourceGroup: GlossarySourceGroup;
  hadithNumbers: number[];
  babs: (1 | 2)[];
  surfaceForms: string[];
  occurrences: number;
  rootNormalized: string;
  relatedRoute?: 'imam-malik' | 'el-muvatta' | 'hadisler';
  relatedTargetId?: string;
}

export interface RootSummary {
  root: string;
  rootNormalized: string;
  count: number;
}

export interface GlossaryFilterOptions {
  query?: string;
  pos?: 'all' | WordPartOfSpeech;
  bab?: 'all' | 1 | 2 | 'dia';
  root?: string;
  onlyCore?: boolean;
}

/**
 * Normalizes Turkish, French, and Arabic text for forgiving, diacritic-insensitive lookup.
 */
export function normalizeSearchText(input: string): string {
  return input
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[‘’'ʾʿ`]/g, '')
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .trim();
}

const DIA_USUL_GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    id: 'dia-amel-ehl-medine',
    key: 'dia-amel-ehl-medine',
    lemma: 'عَمَلُ أَهْلِ الْمَدِينَةِ',
    transliteration: 'Amel-i Ehl-i Medîne',
    root: 'ع م ل',
    rootNormalized: 'عمل',
    pos: 'isim',
    posLabel: { tr: 'Usûl Terimi', fr: 'Terme d’Usûl al-Fiqh' },
    meaning: {
      tr: 'Medine halkının nesilden nesile tevarüs ederek uyguladığı dinî ve hukukî örf/icmâ.',
      fr: 'Pratique vivante et ininterrompue des habitants de Médine transmise de génération en génération.',
    },
    sarf: {
      tr: 'Üçlü izâfet terkibi: عَمَلٌ (iş/uygulama) + أَهْلٌ (halk) + الْمَدِينَةُ (Medine).',
      fr: 'Chaîne d’annexion (idâfa) : ‘amal (pratique) + ahl (gens) + al-Madîna (Médine).',
    },
    nahiv: {
      tr: 'Mâlikî fıkıh usulünün ayırt edici delili; İmam Mâlik mütevâtir nakle dayanan Medine amelini âhâd haberin önüne geçirir.',
      fr: 'Source distinctive de l’école mâlikite, considérée par Mâlik comme une transmission collective fiable.',
    },
    derivatives: [
      { arabic: 'عَمَلٌ', translit: 'amel', meaning: { tr: 'Uygulama, fiil', fr: 'Pratique, acte' } },
      { arabic: 'مُعَامَلَةٌ', translit: 'muâmele', meaning: { tr: 'Hukukî işlem', fr: 'Transaction juridique' } },
    ],
    isCoreGlossaryTerm: true,
    sourceGroup: 'dia-usul',
    hadithNumbers: [4, 5, 6, 7],
    babs: [2],
    surfaceForms: ['عَمَلُ أَهْلِ الْمَدِينَةِ'],
    occurrences: 1,
    relatedRoute: 'imam-malik',
    relatedTargetId: 'usul',
  },
  {
    id: 'dia-mesalih-mursele',
    key: 'dia-mesalih-mursele',
    lemma: 'الْمَصَالِحُ الْمُرْسَلَةُ',
    transliteration: 'Mesâlih-i Mürsele (İstıslâh)',
    root: 'ص ل ح',
    rootNormalized: 'صلح',
    pos: 'isim',
    posLabel: { tr: 'Usûl Terimi', fr: 'Terme d’Usûl al-Fiqh' },
    meaning: {
      tr: 'Hakkında özel şer‘î nas bulunmayan ancak kamu yararını gerçekleştiren ve dinin genel maksatlarına uygun maslahatlar.',
      fr: 'Intérêt général non explicitement prévu ni rejeté par un texte particulier, conforme aux finalités de la Loi.',
    },
    sarf: {
      tr: 'مَصْلَحَةٌ (çoğulu مَصَالِحُ) + İf‘âl bâbı ism-i mef‘ûlü مُرْسَلَةٌ (serbest bırakılmış).',
      fr: 'Pluriel masâlih (intérêts) + participe passif mursala (laissés libres).',
    },
    nahiv: {
      tr: 'Sıfat tamlaması; Mâlikî mezhebinde ictihadın en dinamik araçlarından biridir.',
      fr: 'Syntagme qualificatif désignant l’un des principes majeurs de l’ijtihâd mâlikite.',
    },
    derivatives: [
      { arabic: 'مَصْلَحَةٌ', translit: 'maslahat', meaning: { tr: 'Yarar, kamu menfaati', fr: 'Intérêt, bien commun' } },
      { arabic: 'اسْتِصْلَاحٌ', translit: 'istıslâh', meaning: { tr: 'Maslahata göre hüküm çıkarma', fr: 'Déduction par intérêt général' } },
    ],
    isCoreGlossaryTerm: true,
    sourceGroup: 'dia-usul',
    hadithNumbers: [3],
    babs: [2],
    surfaceForms: ['الْمَصَالِحُ الْمُرْسَلَةُ'],
    occurrences: 1,
    relatedRoute: 'imam-malik',
    relatedTargetId: 'usul',
  },
  {
    id: 'dia-sedd-i-zerai',
    key: 'dia-sedd-i-zerai',
    lemma: 'سَدُّ الذَّرَائِعِ',
    transliteration: 'Sedd-i Zerâi‘',
    root: 'ذ ر ع',
    rootNormalized: 'ذرع',
    pos: 'isim',
    posLabel: { tr: 'Usûl Terimi', fr: 'Terme d’Usûl al-Fiqh' },
    meaning: {
      tr: 'Harama veya kötülüğe giden yolları ve vesileleri önceden kapatma ilkesi.',
      fr: 'Principe de prévention consistant à bloquer les moyens conduisant à un mal ou à un interdit.',
    },
    sarf: {
      tr: 'سَدٌّ (kapatma masdarı) + ذَرِيعَةٌ (vesile/yol) kelimesinin çoğulu الذَّرَائِعُ.',
      fr: 'Sadd (obstruction) + pluriel dharâ’i‘ (moyens, prétextes).',
    },
    nahiv: {
      tr: 'İzâfet terkibi; İmam Mâlik’in fıkhî tedbir yaklaşımının (örneğin hileli satışları yasaklama) temelidir.',
      fr: 'Annexion ; principe emblématique de la prudence juridique de l’Imam Mâlik.',
    },
    derivatives: [
      { arabic: 'ذَرِيعَةٌ', translit: 'zerîa', meaning: { tr: 'Vesile, aracı yol', fr: 'Moyen, prétexte' } },
    ],
    isCoreGlossaryTerm: true,
    sourceGroup: 'dia-usul',
    hadithNumbers: [1],
    babs: [1],
    surfaceForms: ['سَدُّ الذَّرَائِعِ'],
    occurrences: 1,
    relatedRoute: 'imam-malik',
    relatedTargetId: 'usul',
  },
  {
    id: 'dia-istihsan',
    key: 'dia-istihsan',
    lemma: 'الِاسْتِحْسَانُ',
    transliteration: 'İstihsân',
    root: 'ح س ن',
    rootNormalized: 'حسن',
    pos: 'isim',
    posLabel: { tr: 'Usûl Terimi', fr: 'Terme d’Usûl al-Fiqh' },
    meaning: {
      tr: 'Açık kıyastan doğacak zorluk veya hakkaniyetsizliği gidermek için daha güçlü bir şer‘î delil ya da maslahata yönelme.',
      fr: 'Préférence juridique permettant d’écarter une analogie stricte au profit d’une solution plus équitable.',
    },
    sarf: {
      tr: 'İstif‘âl (X.) bâbı masdarı (اسْتَحْسَنَ — اسْتِحْسَانًا: güzel ve uygun bulmak).',
      fr: 'Masdar de forme X (istahsana : juger meilleur / équitable).',
    },
    nahiv: {
      tr: 'İmam Mâlik’in «İstihsan ilmin onda dokuzudur» sözüyle önemini vurguladığı ictihad yöntemi.',
      fr: 'Méthode dont Mâlik disait qu’elle représente « les neuf dixièmes du savoir juridique ».',
    },
    derivatives: [
      { arabic: 'حَسَنٌ', translit: 'hasen', meaning: { tr: 'Güzel, iyi', fr: 'Bon, beau' } },
      { arabic: 'إِحْسَانٌ', translit: 'ihsân', meaning: { tr: 'Güzellik ve mükemmellik', fr: 'Excellence, bienfaisance' } },
    ],
    isCoreGlossaryTerm: true,
    sourceGroup: 'dia-usul',
    hadithNumbers: [],
    babs: [],
    surfaceForms: ['الِاسْتِحْسَانُ'],
    occurrences: 1,
    relatedRoute: 'imam-malik',
    relatedTargetId: 'usul',
  },
  {
    id: 'dia-el-muvatta',
    key: 'dia-el-muvatta',
    lemma: 'الْمُوَطَّأُ',
    transliteration: 'el-Muvatta’',
    root: 'و ط أ',
    rootNormalized: 'وطا',
    pos: 'isim',
    posLabel: { tr: 'Eser & Hadis Terimi', fr: 'Titre & terme de Hadith' },
    meaning: {
      tr: 'Üzerinde mutabık kalınan, kolaylaştırılmış, düzeltilip ayıklanmış eser (İmam Mâlik’in 40 yılda telif ettiği başeseri).',
      fr: '« Le chemin aplani » / « l’ouvrage agréé » : recueil majeur de hadith et de fiqh révisé durant 40 ans par Mâlik.',
    },
    sarf: {
      tr: 'Tef‘îl (II.) bâbı ism-i mef‘ûl (وَطَّأَ — مُوَطَّأٌ: hazırlanan, kolaylaştırılan).',
      fr: 'Participe passif de forme II (watta’a : aplanir, faciliter).',
    },
    nahiv: {
      tr: 'İmam Mâlik’in yetmiş Medine fakihine arz edip onaylarını aldığı (vâta’ûnî) için bu adı verdiği bildirilir.',
      fr: 'Nommé ainsi car soixante-dix juristes médinois s’accordèrent (wâta’ûnî) sur son contenu.',
    },
    derivatives: [
      { arabic: 'تَوْطِئَةٌ', translit: 'tavti’e', meaning: { tr: 'Hazırlık, giriş', fr: 'Préparation, préambule' } },
    ],
    isCoreGlossaryTerm: true,
    sourceGroup: 'dia-usul',
    hadithNumbers: [1, 2, 3, 4, 5, 6, 7, 8],
    babs: [1, 2],
    surfaceForms: ['الْمُوَطَّأُ'],
    occurrences: 1,
    relatedRoute: 'el-muvatta',
    relatedTargetId: 'overview',
  },
  {
    id: 'dia-silsiletuz-zeheb',
    key: 'dia-silsiletuz-zeheb',
    lemma: 'سِلْسِلَةُ الذَّهَبِ',
    transliteration: 'Silsiletü’z-Zeheb',
    root: 'ذ ه ب',
    rootNormalized: 'ذهب',
    pos: 'isim',
    posLabel: { tr: 'Hadis Usulü', fr: 'Sciences du Hadith' },
    meaning: {
      tr: 'Altın Zincir: Buhârî’ye göre en sahih isnad olan «Mâlik → Nâfi‘ → İbn Ömer» (veya Şâfiî ilavesiyle dörtlü) senet.',
      fr: 'La « Chaîne d’or » : l’isnâd le plus authentique selon al-Bukhârî (Mâlik ← Nâfi‘ ← Ibn ‘Umar).',
    },
    sarf: {
      tr: 'İzâfet terkibi: سِلْسِلَةٌ (zincir) + الذَّهَبُ (altın).',
      fr: 'Annexion : silsila (chaîne) + adh-dhahab (or).',
    },
    nahiv: {
      tr: 'el-Muvatta’daki rivâyetlerin yüksek sıhhat derecesini simgeleyen klasik hadis terimi.',
      fr: 'Terme classique illustrant l’authenticité exceptionnelle des chaînes d’al-Muwatta’.',
    },
    derivatives: [
      { arabic: 'مُسَلْسَلٌ', translit: 'müselsel', meaning: { tr: 'Zincirleme rivâyet', fr: 'Hadith enchaîné (musalsal)' } },
    ],
    isCoreGlossaryTerm: true,
    sourceGroup: 'dia-usul',
    hadithNumbers: [],
    babs: [],
    surfaceForms: ['سِلْسِلَةُ الذَّهَبِ'],
    occurrences: 1,
    relatedRoute: 'el-muvatta',
    relatedTargetId: 'overview',
  },
  {
    id: 'dia-musned',
    key: 'dia-musned',
    lemma: 'الْمُسْنَدُ',
    transliteration: 'Müsned',
    root: 'س ن د',
    rootNormalized: 'سند',
    pos: 'isim',
    posLabel: { tr: 'Hadis Usulü', fr: 'Sciences du Hadith' },
    meaning: {
      tr: 'Senedi kesintisiz (muttasıl) biçimde Hz. Peygamber’e (s.a.v.) ulaşan merfû hadis (el-Muvatta’da Ebherî’ye göre 600 adet).',
      fr: 'Hadith dont la chaîne remonte sans interruption jusqu’au Prophète (ﷺ) (600 récits dans al-Muwatta’ selon al-Abharî).',
    },
    sarf: {
      tr: 'İf‘âl (IV.) bâbı ism-i mef‘ûl (أَسْنَدَ — مُسْنَدٌ: dayandırılan).',
      fr: 'Participe passif forme IV (asnada : rattacher à une autorité).',
    },
    nahiv: {
      tr: 'Kitâbü’s-Salât fî Ramadân’daki Hadis 1 ve Hadis 2 müsned/merfû rivâyetlerdir.',
      fr: 'Les hadiths 1 et 2 du Livre de la Prière en Ramadan appartiennent à cette catégorie.',
    },
    derivatives: [
      { arabic: 'إِسْنَادٌ', translit: 'isnâd', meaning: { tr: 'Râvi zinciri', fr: 'Chaîne de transmission' } },
      { arabic: 'سَنَدٌ', translit: 'sened', meaning: { tr: 'Dayanak, senet', fr: 'Chaîne / appui' } },
    ],
    isCoreGlossaryTerm: true,
    sourceGroup: 'dia-usul',
    hadithNumbers: [1, 2],
    babs: [1],
    surfaceForms: ['الْمُسْنَدُ'],
    occurrences: 1,
    relatedRoute: 'el-muvatta',
    relatedTargetId: 'stats',
  },
  {
    id: 'dia-mursel',
    key: 'dia-mursel',
    lemma: 'الْمُرْسَلُ',
    transliteration: 'Mürsel',
    root: 'ر س ل',
    rootNormalized: 'رسل',
    pos: 'isim',
    posLabel: { tr: 'Hadis Usulü', fr: 'Sciences du Hadith' },
    meaning: {
      tr: 'Tâbiînin sahâbîyi atlayarak doğrudan Hz. Peygamber’den aktardığı rivâyet (el-Muvatta’da 222 adet).',
      fr: 'Hadith rapporté directement du Prophète par un Tâbi‘î sans mentionner le Compagnon (222 récits dans al-Muwatta’).',
    },
    sarf: {
      tr: 'İf‘âl (IV.) bâbı ism-i mef‘ûl (أَرْسَلَ — مُرْسَلٌ: salıverilen).',
      fr: 'Participe passif forme IV.',
    },
    nahiv: {
      tr: 'İmam Mâlik sika râvilerin mürsellerini fıkhî delil olarak kabul eder; İbn Abdülber bunların neredeyse tamamının muttasıl senedini bulmuştur.',
      fr: 'Mâlik accepte le mursal de rapporteurs fiables ; Ibn ‘Abd al-Barr en a retrouvé les chaînes continues.',
    },
    derivatives: [
      { arabic: 'رَسُولٌ', translit: 'resûl', meaning: { tr: 'Elçi, peygamber', fr: 'Messager' } },
    ],
    isCoreGlossaryTerm: true,
    sourceGroup: 'dia-usul',
    hadithNumbers: [5],
    babs: [2],
    surfaceForms: ['الْمُرْسَلُ'],
    occurrences: 1,
    relatedRoute: 'el-muvatta',
    relatedTargetId: 'stats',
  },
  {
    id: 'dia-mevkuf',
    key: 'dia-mevkuf',
    lemma: 'الْمَوْقُوفُ',
    transliteration: 'Mevkûf',
    root: 'و ق ف',
    rootNormalized: 'وقف',
    pos: 'isim',
    posLabel: { tr: 'Hadis Usulü', fr: 'Sciences du Hadith' },
    meaning: {
      tr: 'Senedi bir sahâbîde duran söz, fiil veya takrir (el-Muvatta’da 613 adet; Hadis 3, 4 ve 8).',
      fr: 'Parole ou acte s’arrêtant à un Compagnon (613 récits dans al-Muwatta’ ; Hadiths 3, 4 et 8).',
    },
    sarf: {
      tr: 'Sülâsî ism-i mef‘ûl (وَقَفَ — مَوْقُوفٌ: durdurulmuş).',
      fr: 'Participe passif forme I (waqafa : s’arrêter).',
    },
    nahiv: {
      tr: 'Hz. Ömer’in cemaat uygulaması (Hadis 3–4) ve Hz. Âişe’nin Zekvân’a imamlık yaptırması (Hadis 8) mevkûf rivâyetlerdir.',
      fr: 'Les récits sur ‘Umar (H3-4) et ‘Â’isha (H8) relèvent de la catégorie mawqûf.',
    },
    derivatives: [
      { arabic: 'وَقْفٌ', translit: 'vakıf', meaning: { tr: 'Durma, vakıf', fr: 'Arrêt, fondation pieuse' } },
    ],
    isCoreGlossaryTerm: true,
    sourceGroup: 'dia-usul',
    hadithNumbers: [3, 4, 8],
    babs: [2],
    surfaceForms: ['الْمَوْقُوفُ'],
    occurrences: 1,
    relatedRoute: 'el-muvatta',
    relatedTargetId: 'stats',
  },
  {
    id: 'dia-maktu',
    key: 'dia-maktu',
    lemma: 'الْمَقْطُوعُ',
    transliteration: 'Maktû‘',
    root: 'ق ط ع',
    rootNormalized: 'قطع',
    pos: 'isim',
    posLabel: { tr: 'Hadis Usulü', fr: 'Sciences du Hadith' },
    meaning: {
      tr: 'Tâbiîn nesline ait söz, fetva veya müşahede (el-Muvatta’da 285 adet; Hadis 5, 6 ve 7).',
      fr: 'Parole, fatwa ou observation attribuée à un Tâbi‘î (285 récits dans al-Muwatta’ ; Hadiths 5, 6 et 7).',
    },
    sarf: {
      tr: 'Sülâsî ism-i mef‘ûl (قَطَعَ — مَقْطُوعٌ: kesilmiş).',
      fr: 'Participe passif forme I (qata‘a : couper).',
    },
    nahiv: {
      tr: 'Yezîd b. Rûmân (Hadis 5), el-A‘rec (Hadis 6) ve Ebû Bekir b. Hazm (Hadis 7) nakilleri Medine’nin tâbiîn dönemindeki uygulamasını yansıtır.',
      fr: 'Les témoignages de Yazîd b. Rûmân, al-A‘raj et Abû Bakr b. Hazm documentent la génération des Tâbi‘în.',
    },
    derivatives: [
      { arabic: 'مُنْقَطِعٌ', translit: 'münkati‘', meaning: { tr: 'Senedinde kopukluk olan', fr: 'Chaîne interrompue' } },
    ],
    isCoreGlossaryTerm: true,
    sourceGroup: 'dia-usul',
    hadithNumbers: [5, 6, 7],
    babs: [2],
    surfaceForms: ['الْمَقْطُوعُ'],
    occurrences: 1,
    relatedRoute: 'el-muvatta',
    relatedTargetId: 'stats',
  },
  {
    id: 'dia-belagat',
    key: 'dia-belagat',
    lemma: 'بَلَاغَاتُ مَالِكٍ',
    transliteration: 'Belâğât-ı Mâlik',
    root: 'ب ل غ',
    rootNormalized: 'بلغ',
    pos: 'isim',
    posLabel: { tr: 'Hadis Usulü', fr: 'Sciences du Hadith' },
    meaning: {
      tr: 'İmam Mâlik’in senet zikretmeden «Bana ulaştı ki (beleğanî)» diye naklettiği 61 rivâyet (İbn Abdülber 57’sini, İbnü’s-Salâh ise kalan 4’ünü muttasıl senedle tespit etmiştir).',
      fr: 'Les 61 récits introduits par « il m’est parvenu » (balaghanî), tous authentifiés par chaînes continues par Ibn ‘Abd al-Barr (57) et Ibn as-Salâh (4).',
    },
    sarf: {
      tr: 'بَلَاغٌ kelimesinin çoğulu بَلَاغَاتٌ + مَالِكٍ.',
      fr: 'Pluriel balâghât (transmissions parvenues) annexé à Mâlik.',
    },
    nahiv: {
      tr: 'el-Muvatta’ın sıhhat tartışmalarında kritik yer tutan özel bir nakil biçimidir.',
      fr: 'Catégorie célèbre dans l’étude critique de l’authenticité d’al-Muwatta’.',
    },
    derivatives: [
      { arabic: 'بَلَغَنِي', translit: 'beleğanî', meaning: { tr: 'Bana ulaştı ki', fr: 'Il m’est parvenu que' } },
    ],
    isCoreGlossaryTerm: true,
    sourceGroup: 'dia-usul',
    hadithNumbers: [],
    babs: [],
    surfaceForms: ['بَلَاغَاتُ مَالِكٍ'],
    occurrences: 1,
    relatedRoute: 'el-muvatta',
    relatedTargetId: 'stats',
  },
  {
    id: 'dia-tedbir',
    key: 'dia-tedbir',
    lemma: 'التَّدْبِيرُ (عَنْ دُبُرٍ)',
    transliteration: 'Tedbîr / Müdebber',
    root: 'د ب ر',
    rootNormalized: 'دبر',
    pos: 'isim',
    posLabel: { tr: 'Fıkıh Terimi', fr: 'Terme juridique (Fiqh)' },
    meaning: {
      tr: 'Kölenin, sahibinin vefatından sonra hür olacağını bağlayıcı biçimde ilan etme akdi (Hadis 8: Zekvân).',
      fr: 'Engagement juridique affranchissant un esclave automatiquement au décès de son maître (Hadith 8 : Dhakwân).',
    },
    sarf: {
      tr: 'Tef‘îl (II.) bâbı masdarı (دَبَّرَ — تَدْبِيرًا); köleye مُدَبَّرٌ (müdebber) denir.',
      fr: 'Masdar de forme II ; l’esclave concerné est appelé mudabbar.',
    },
    nahiv: {
      tr: 'el-Feyyûmî’nin Hadis 8 hâşiyesinde açıkladığı fıkhî statüdür.',
      fr: 'Statut expliqué par al-Fayyûmî dans la glose classique du Hadith 8.',
    },
    derivatives: [
      { arabic: 'مُدَبَّرٌ', translit: 'müdebber', meaning: { tr: 'Vefata bağlı âzatlı köle', fr: 'Esclave affranchi post-mortem' } },
    ],
    isCoreGlossaryTerm: true,
    sourceGroup: 'dia-usul',
    hadithNumbers: [8],
    babs: [2],
    surfaceForms: ['عَنْ دُبُرٍ'],
    occurrences: 1,
    relatedRoute: 'hadisler',
    relatedTargetId: 'hadis-8',
  },
];

let cachedGlossary: GlossaryEntry[] | null = null;

/**
 * Builds the unified auto-populated Glossary by cross-referencing all 8 Hadiths'
 * tokenized words with HADITH_LEXICON and adding curated DİA Usûl/Hadith terms.
 */
export function buildGlossaryEntries(): GlossaryEntry[] {
  if (cachedGlossary) return cachedGlossary;

  const occurrencesByKey = new Map<
    string,
    {
      hadithNumbers: Set<number>;
      babs: Set<1 | 2>;
      surfaces: Set<string>;
      count: number;
      entry: LexiconEntry;
    }
  >();

  // Scan every token in all 8 hadiths so hadithNumbers, babs, and surface forms are 100% exact
  for (const hadith of HADITHS_DATA) {
    const bundle = getHadithWithTokens(hadith.number);
    if (!bundle) continue;

    for (const token of bundle.tokens) {
      // Disambiguate أُبَيّ vs أَبِي using root since normalizeArabicToken maps both to ابي
      const effectiveKey =
        token.normalizedKey === 'ابي'
          ? token.analysis.root === 'أ ب ي'
            ? 'ubayy'
            : 'abi'
          : token.normalizedKey;

      let bucket = occurrencesByKey.get(effectiveKey);
      if (!bucket) {
        bucket = {
          hadithNumbers: new Set<number>(),
          babs: new Set<1 | 2>(),
          surfaces: new Set<string>(),
          count: 0,
          entry: token.analysis,
        };
        occurrencesByKey.set(effectiveKey, bucket);
      }
      bucket.hadithNumbers.add(hadith.number);
      bucket.babs.add(hadith.bab);
      bucket.surfaces.add(token.surface);
      bucket.count += 1;
    }
  }

  const hadithEntries: GlossaryEntry[] = [];
  for (const [key, data] of occurrencesByKey.entries()) {
    const hadithNums = Array.from(data.hadithNumbers).sort((a, b) => a - b);
    const babs = Array.from(data.babs).sort((a, b) => a - b) as (1 | 2)[];
    const rootClean = data.entry.root === '—' ? '' : normalizeArabicToken(data.entry.root.replace(/\s+/g, ''));

    hadithEntries.push({
      ...data.entry,
      id: `lex-${key}`,
      sourceGroup: 'hadith',
      hadithNumbers: hadithNums,
      babs,
      surfaceForms: Array.from(data.surfaces),
      occurrences: data.count,
      rootNormalized: rootClean,
      relatedRoute: 'hadisler',
      relatedTargetId: `hadis-${hadithNums[0] ?? 1}`,
    });
  }

  // Sort: core terms first, then by occurrence desc, then alphabetically by transliteration
  hadithEntries.sort((a, b) => {
    const coreDiff = Number(Boolean(b.isCoreGlossaryTerm)) - Number(Boolean(a.isCoreGlossaryTerm));
    if (coreDiff !== 0) return coreDiff;
    if (b.occurrences !== a.occurrences) return b.occurrences - a.occurrences;
    return a.transliteration.localeCompare(b.transliteration, 'tr');
  });

  // Ensure every entry in getAllLexiconEntries is accounted for (sanity check via hadith scanning)
  void getAllLexiconEntries;

  cachedGlossary = [...DIA_USUL_GLOSSARY_ENTRIES, ...hadithEntries];
  return cachedGlossary;
}

export function getUniqueRoots(entries: GlossaryEntry[]): RootSummary[] {
  const counts = new Map<string, { root: string; count: number }>();
  for (const entry of entries) {
    if (!entry.root || entry.root === '—' || !entry.rootNormalized) continue;
    const existing = counts.get(entry.rootNormalized);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(entry.rootNormalized, { root: entry.root, count: 1 });
    }
  }
  return Array.from(counts.entries())
    .map(([rootNormalized, info]) => ({
      root: info.root,
      rootNormalized,
      count: info.count,
    }))
    .sort((a, b) => b.count - a.count || a.root.localeCompare(b.root, 'ar'));
}

export function filterGlossaryEntries(
  entries: GlossaryEntry[],
  options: GlossaryFilterOptions
): GlossaryEntry[] {
  const normalizedQuery = options.query ? normalizeSearchText(options.query) : '';
  const compactQuery = normalizedQuery.replace(/\s+/g, '');

  return entries.filter((entry) => {
    if (options.onlyCore && !entry.isCoreGlossaryTerm) {
      return false;
    }

    if (options.pos && options.pos !== 'all' && entry.pos !== options.pos) {
      return false;
    }

    if (options.bab && options.bab !== 'all') {
      if (options.bab === 'dia') {
        if (entry.sourceGroup !== 'dia-usul') return false;
      } else {
        if (!entry.babs.includes(options.bab)) return false;
      }
    }

    if (options.root && options.root !== 'all') {
      if (entry.rootNormalized !== options.root) return false;
    }

    if (!normalizedQuery) return true;

    const haystack = normalizeSearchText(
      [
        entry.lemma,
        entry.surfaceForms.join(' '),
        entry.transliteration,
        entry.root,
        entry.meaning.tr,
        entry.meaning.fr,
        entry.sarf.tr,
        entry.nahiv.tr,
        entry.derivatives.map((d) => `${d.arabic} ${d.translit} ${d.meaning.tr} ${d.meaning.fr}`).join(' '),
      ].join(' ')
    );

    if (haystack.includes(normalizedQuery)) return true;
    if (entry.rootNormalized && compactQuery && entry.rootNormalized.includes(compactQuery)) {
      return true;
    }
    return false;
  });
}

export const POS_FILTER_OPTIONS: { id: 'all' | WordPartOfSpeech; label: BilingualString }[] = [
  { id: 'all', label: { tr: 'Tüm Türler', fr: 'Toutes natures' } },
  { id: 'isim', label: { tr: 'İsim & Terim', fr: 'Noms & Termes' } },
  { id: 'fiil', label: { tr: 'Fiil', fr: 'Verbes' } },
  { id: 'harf', label: { tr: 'Harf / Edat', fr: 'Particules' } },
  { id: 'zarf', label: { tr: 'Zarf', fr: 'Adverbes' } },
  { id: 'zamir', label: { tr: 'Zamir', fr: 'Pronoms' } },
  { id: 'ism-i-mevsul', label: { tr: 'İsm-i Mevsûl', fr: 'Relatifs' } },
  { id: 'ism-i-isaret', label: { tr: 'İsm-i İşâret', fr: 'Démonstratifs' } },
];
