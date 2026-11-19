import type { AtlasRoute, BilingualString } from '../types/atlas';

export type QuizCategoryId =
  | 'imam-malik'
  | 'el-muvatta'
  | 'hadis-metin'
  | 'isnad-ravi'
  | 'lugat-sarf'
  | 'serh-cografya';

export type QuizDifficulty = 'temel' | 'orta' | 'ileri';

export interface QuizCategoryMeta {
  id: QuizCategoryId;
  title: BilingualString;
  subtitle: BilingualString;
  accent: 'gold' | 'emerald' | 'burgundy';
}

export interface QuizQuestion {
  id: string;
  category: QuizCategoryId;
  difficulty: QuizDifficulty;
  arabicCue?: string;
  question: BilingualString;
  options: [BilingualString, BilingualString, BilingualString, BilingualString];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: BilingualString;
  sourceRef: string;
  deepLink: {
    route: AtlasRoute;
    targetItemId?: string;
  };
}

export type FlashcardDeckId = 'lugat' | 'hadis' | 'imam-malik' | 'muvatta';

export interface FlashcardDeckMeta {
  id: FlashcardDeckId;
  title: BilingualString;
  subtitle: BilingualString;
}

export interface SrsFlashcard {
  id: string;
  deck: FlashcardDeckId;
  arabic?: string;
  transliteration?: string;
  frontPrompt: BilingualString;
  backAnswer: BilingualString;
  backDetail: BilingualString;
  rootOrRef: string;
  deepLink: {
    route: AtlasRoute;
    targetItemId?: string;
  };
}

export const QUIZ_CATEGORIES: QuizCategoryMeta[] = [
  {
    id: 'imam-malik',
    title: { tr: 'İmam Mâlik & Usûl-i Fıkıh', fr: 'Imam Mâlik & Usûl al-Fiqh' },
    subtitle: {
      tr: 'Hayatı, hocaları, 146/763 mihnesi ve 11 esaslı fıkıh metodolojisi',
      fr: 'Biographie, maîtres, épreuve de 146/763 et méthodologie juridique',
    },
    accent: 'emerald',
  },
  {
    id: 'el-muvatta',
    title: { tr: 'el-Muvatta’ Tarihi & Rivayetleri', fr: 'Histoire & Recensions d’al-Muwatta’' },
    subtitle: {
      tr: '40 yıllık telif, 1.720 rivayet, 9 nüsha, belâğât ve şerhler',
      fr: '40 ans de rédaction, 1 720 récits, 9 recensions et commentaires',
    },
    accent: 'gold',
  },
  {
    id: 'hadis-metin',
    title: { tr: 'Kitâbü’s-Salât fî Ramadân', fr: 'Textes & Fiqh de la Prière en Ramadan' },
    subtitle: {
      tr: '2 bab, 8 hadis, 11–23 rekât, kıraat ve sahur rivayetleri',
      fr: '2 chapitres, 8 hadiths, 11 vs 23 rak‘ât, récitation et suhûr',
    },
    accent: 'burgundy',
  },
  {
    id: 'isnad-ravi',
    title: { tr: 'İsnad Zincirleri & Râviler', fr: 'Chaînes d’Isnâd & Transmetteurs' },
    subtitle: {
      tr: 'Zührî, Urve, Sâib b. Yezîd, A‘rec, Zekvân ve râvi tabakaları',
      fr: 'az-Zuhrî, ‘Urwa, as-Sâ’ib b. Yazîd, al-A‘raj et Dhakwân',
    },
    accent: 'emerald',
  },
  {
    id: 'lugat-sarf',
    title: { tr: 'Arapça Lügat & Sarf-Nahiv', fr: 'Lexique Arabe & Morphosyntaxe' },
    subtitle: {
      tr: 'Kök analizi, bab yapıları, nadir kelimeler ve irap incelikleri',
      fr: 'Racines, formes verbales, lexique rare et subtilités grammaticales',
    },
    accent: 'gold',
  },
  {
    id: 'serh-cografya',
    title: { tr: 'Klasik Hâşiyeler & Coğrafya', fr: 'Gloses Classiques & Géographie' },
    subtitle: {
      tr: 'Nevevî, İbn Hacer, Kādî İyâz, Feyyûmî ve Medine → Endülüs hattı',
      fr: 'an-Nawawî, Ibn Hajar, al-Qâdî ‘Iyâd, al-Fayyûmî et l’axe Médine–Cordoue',
    },
    accent: 'burgundy',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // 1. İMAM MÂLİK & USÛL-İ FIKIH (9 SORU)
  // =========================================================================
  {
    id: 'q-im-1',
    category: 'imam-malik',
    difficulty: 'temel',
    question: {
      tr: 'İmam Mâlik b. Enes’in TDV İslâm Ansiklopedisi’nde tercih edilen doğum ve vefat tarihleri hangisidir?',
      fr: 'Quelles sont les dates de naissance et de décès de l’Imam Mâlik b. Anas retenues par l’Encyclopédie TDV ?',
    },
    options: [
      { tr: '93/712 – 179/795', fr: '93/712 – 179/795' },
      { tr: '80/699 – 150/767', fr: '80/699 – 150/767' },
      { tr: '150/767 – 204/820', fr: '150/767 – 204/820' },
      { tr: '164/780 – 241/855', fr: '164/780 – 241/855' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'İmam Mâlik, 93 (712) yılında Medine’de doğmuş ve 179 (795) yılında yine Medine’de vefat ederek Cennetü’l-Bakī‘ kabristanına defnedilmiştir.',
      fr: 'L’Imam Mâlik est né à Médine en 93/712 et y est décédé en 179/795 ; il est inhumé au cimetière d’al-Baqî‘.',
    },
    sourceRef: 'TDV DİA, “Mâlik b. Enes”, c. 27',
    deepLink: { route: 'imam-malik', targetItemId: 'biography' },
  },
  {
    id: 'q-im-2',
    category: 'imam-malik',
    difficulty: 'temel',
    question: {
      tr: 'İmam Mâlik’in baba soyu (Asbahî nisbesi) hangi tarihî bölgeye dayanmaktadır?',
      fr: 'À quelle région historique remonte l’ascendance paternelle de l’Imam Mâlik (nisba al-Asbahî) ?',
    },
    options: [
      { tr: 'Yemen (Himyer / Zû Asbah)', fr: 'Yémen (Himyar / Dhû Asbah)' },
      { tr: 'Kûfe (Irak)', fr: 'Kûfa (Irak)' },
      { tr: 'Şam (Suriye)', fr: 'Damas (Syrie)' },
      { tr: 'Horasan (Merv)', fr: 'Khorassan (Merv)' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'İmam Mâlik’in ataları Yemen’deki Himyer kabilesinin Zû Asbah koluna mensuptur; dedesi Mâlik b. Ebû Âmir Medine’ye yerleşmiştir.',
      fr: 'Ses ancêtres appartiennent au clan Dhû Asbah de la tribu himyarite au Yémen ; son grand-père s’était établi à Médine.',
    },
    sourceRef: 'TDV DİA, “Mâlik b. Enes” · Harita (Yemen)',
    deepLink: { route: 'harita', targetItemId: 'yemen' },
  },
  {
    id: 'q-im-3',
    category: 'imam-malik',
    difficulty: 'orta',
    question: {
      tr: 'İmam Mâlik’in yedi yıl boyunca kesintisiz ders aldığı, fıkıh ve hadiste derinleşmesini sağlayan ilk büyük hocası kimdir?',
      fr: 'Quel maître l’Imam Mâlik a-t-il fréquenté de façon assidue durant sept années au début de sa formation ?',
    },
    options: [
      { tr: 'Abdurrahman b. Hürmüz (İbn Hürmüz)', fr: '‘Abd ar-Rahmân b. Hurmuz (Ibn Hurmuz)' },
      { tr: 'Muhammed b. Hasan eş-Şeybânî', fr: 'Muhammad b. al-Hasan ash-Shaybânî' },
      { tr: 'Sahnûn b. Saîd', fr: 'Sahnûn b. Sa‘îd' },
      { tr: 'İbn Abdülber', fr: 'Ibn ‘Abd al-Barr' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'İmam Mâlik, İbn Hürmüz’ün ders halkasına yedi-sekiz yıl boyunca devam etmiş; onun yanı sıra Rebîatürre’y, İbn Şihâb ez-Zührî ve Nâfi‘den ilim almıştır.',
      fr: 'Il étudia sept à huit ans auprès d’Ibn Hurmuz avant de compléter sa formation auprès de Rabî‘at ar-Ra’y, az-Zuhrî et Nâfi‘.',
    },
    sourceRef: 'TDV DİA, “Mâlik b. Enes” · Hocalar',
    deepLink: { route: 'imam-malik', targetItemId: 'scholars' },
  },
  {
    id: 'q-im-4',
    category: 'imam-malik',
    difficulty: 'orta',
    question: {
      tr: '146/763 yılında Medine valisi Ca‘fer b. Süleyman tarafından İmam Mâlik’e işkence edilmesine (mihne) yol açan temel fetva hangisidir?',
      fr: 'Quelle fatwa de l’Imam Mâlik a provoqué son châtiment (mihna) en 146/763 sous le gouverneur Ja‘far b. Sulaymân ?',
    },
    options: [
      { tr: 'Zorla yapılan boşamanın (talâk-ı mükreh) geçersiz olduğu fetvası', fr: 'La nullité du divorce prononcé sous contrainte (talâq al-mukrah)' },
      { tr: 'Terâvih namazının 23 rekât olduğu fetvası', fr: 'La fatwa sur les 23 rak‘ât des tarâwîh' },
      { tr: 'Mushafa bakarak namaz kılmanın caiz olduğu fetvası', fr: 'La licéité de lire sur un mushaf en prière' },
      { tr: 'el-Muvatta’ın devlet kanunu olması gerektiği görüşü', fr: 'L’idée de faire d’al-Muwatta’ un code impérial' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Muhammed en-Nefsüzzekiyye isyanı sonrasında Abbâsî biatındaki ikrah/yemin meselesiyle ilişkilendirilen “zorla boşama (talâk-ı mükreh) geçersizdir” hadisini rivayet etmeye devam etmesi sebebiyle cezalandırılmıştır.',
      fr: 'Sa persistance à rapporter le hadith invalidant le divorce sous contrainte fut interprétée politiquement vis-à-vis du serment d’allégeance abbasside.',
    },
    sourceRef: 'TDV DİA, “Mâlik b. Enes” · 146/763 Olayı',
    deepLink: { route: 'imam-malik', targetItemId: 'biography' },
  },
  {
    id: 'q-im-5',
    category: 'imam-malik',
    difficulty: 'temel',
    arabicCue: 'عَمَلُ أَهْلِ المَدِينَةِ',
    question: {
      tr: 'İmam Mâlik’in fıkıh usulünde diğer mezheplerden en belirgin biçimde ayrıştığı ve haber-i vâhide dahi takdim edebildiği delil hangisidir?',
      fr: 'Quelle source juridique distingue le plus nettement la méthodologie de l’Imam Mâlik, pouvant même prévaloir sur un hadith isolé ?',
    },
    options: [
      { tr: 'Amel-i Ehl-i Medîne (Medine halkının yerleşik uygulaması)', fr: '‘Amal Ahl al-Madîna (la pratique établie des Médinois)' },
      { tr: 'Sadece kıyas-ı hafî', fr: 'Uniquement le qiyâs subtil' },
      { tr: 'Kûfe örfü', fr: 'La coutume de Kûfa' },
      { tr: 'Devlet fermanları', fr: 'Les décrets impériaux' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Amel-i Ehl-i Medîne, Hz. Peygamber döneminden itibaren Medine’de nesilden nesile mütevâtir biçimde aktarılan canlı sünnet geleneğini ifade eder.',
      fr: 'Le ‘Amal Ahl al-Madîna reflète la Sunna vécue transmise collectivement de génération en génération à Médine depuis le Prophète.',
    },
    sourceRef: 'TDV DİA, “Mâlik b. Enes” · Usûl-i Fıkıh',
    deepLink: { route: 'imam-malik', targetItemId: 'usul' },
  },
  {
    id: 'q-im-6',
    category: 'imam-malik',
    difficulty: 'orta',
    arabicCue: 'المَصَالِحُ المُرْسَلَةُ',
    question: {
      tr: 'Mâlikî usulünde nasların açıkça itibar veya ilga etmediği, fakat şeriatın genel amaçlarıyla (makāsıd) örtüşen kamu yararını esas alan delil hangisidir?',
      fr: 'Dans les usûl mâlikites, quel principe fonde un jugement sur l’intérêt général non explicitement validé ni abrogé par un texte ?',
    },
    options: [
      { tr: 'Mesâlih-i Mürsele (İstislâh)', fr: 'al-Masâlih al-Mursala (Istislâh)' },
      { tr: 'İstishâb-ı hâl', fr: 'al-Istishâb' },
      { tr: 'Şer‘u men kablenâ', fr: 'Shar‘ man qablanâ' },
      { tr: 'Mürsel hadis', fr: 'Hadith mursal' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Mesâlih-i Mürsele, dinin beş temel gayesini koruma doğrultusunda toplumsal maslahatı gözeten ve Mâlikî fıkhına geniş dinamizm kazandıran usul ilkesidir.',
      fr: 'al-Masâlih al-Mursala (istislâh) protège l’utilité publique en harmonie avec les finalités de la Loi (maqâsid).',
    },
    sourceRef: 'TDV DİA, “Mâlik b. Enes” · Usûl-i Fıkıh',
    deepLink: { route: 'imam-malik', targetItemId: 'usul' },
  },
  {
    id: 'q-im-7',
    category: 'imam-malik',
    difficulty: 'orta',
    arabicCue: 'سَدُّ الذَّرَائِعِ',
    question: {
      tr: 'Görünüşte mubah olmakla birlikte harama veya zarara yol açan vasıtaların önünü kapatmayı ifade eden Mâlikî usul kavramı hangisidir?',
      fr: 'Quel principe mâlikite consiste à bloquer les moyens licites en apparence mais menant vers un interdit ou un préjudice ?',
    },
    options: [
      { tr: 'Sedd-i Zerâi‘', fr: 'Sadd adh-Dharâ’i‘' },
      { tr: 'İcmâ-ı sükûtî', fr: 'Ijmâ‘ sukûtî' },
      { tr: 'Tahsîs-i âm', fr: 'Takhsîs al-‘âmm' },
      { tr: 'Teâruzü’l-edille', fr: 'Ta‘ârud al-adilla' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Sedd-i Zerâi‘, fesada giden yolları baştan engelleme ilkesidir ve Şihâbüddin el-Karâfî’nin sıraladığı Mâlikî delilleri arasında kilit rol oynar.',
      fr: 'Sadd adh-Dharâ’i‘ empêche les voies menant à un mal et occupe une place centrale dans la typologie d’al-Qarâfî.',
    },
    sourceRef: 'TDV DİA, “Mâlik b. Enes” · Usûl-i Fıkıh',
    deepLink: { route: 'imam-malik', targetItemId: 'usul' },
  },
  {
    id: 'q-im-8',
    category: 'imam-malik',
    difficulty: 'ileri',
    arabicCue: 'مَنْ أَجَابَ فِي كُلِّ مَا يُسْأَلُ عَنْهُ فَهُوَ مَجْنُونٌ',
    question: {
      tr: 'İmam Mâlik’in fetva sorumluluğu ve ilmî tevazu konusundaki tutumunu yansıtan en meşhur uygulaması nedir?',
      fr: 'Quelle attitude célèbre illustre le scrupule scientifique de l’Imam Mâlik face aux questions de fatwa ?',
    },
    options: [
      { tr: 'Emin olmadığı pek çok soruya “Lâ edrî (Bilmiyorum)” diye cevap vermesi', fr: 'Répondre « Lâ adrî » (Je ne sais pas) à de nombreuses questions incertaines' },
      { tr: 'Her soruyu aynı gün kıyasla cevaplaması', fr: 'Trancher chaque question le jour même par qiyâs' },
      { tr: 'Sadece yazılı fetva vermesi', fr: 'Ne répondre que par écrit' },
      { tr: 'Bağdat kadılığını kabul etmesi', fr: 'Accepter le poste de grand cadi de Bagdad' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'İmam Mâlik, “âlimin kalkanı ‘bilmiyorum’ sözüdür” diyerek kırk sorudan otuz ikisine “lâ edrî” cevabı verecek ölçüde ilmî ihtiyat göstermiştir.',
      fr: 'Il affirmait que « le bouclier du savant est de dire : je ne sais pas », illustrant une rigueur exemplaire.',
    },
    sourceRef: 'TDV DİA, “Mâlik b. Enes” · Hikmetli Sözler',
    deepLink: { route: 'imam-malik', targetItemId: 'quotes' },
  },
  {
    id: 'q-im-9',
    category: 'imam-malik',
    difficulty: 'ileri',
    question: {
      tr: 'İmam Mâlik, Abbâsî halifeleri Ebû Ca‘fer el-Mansûr ve Hârûnürreşîd’in el-Muvatta’ı Kâbe duvarına asıp bütün İslâm ülkesinde tek resmî kanun yapma teklifini neden reddetmiştir?',
      fr: 'Pourquoi l’Imam Mâlik a-t-il refusé la proposition des califes al-Mansûr et Hârûn ar-Rashîd d’imposer al-Muwatta’ comme code unique de l’Empire ?',
    },
    options: [
      { tr: 'Sahâbenin farklı beldelere dağılarak farklı hadis ve fıkıh birikimleri taşıdığını, ümmeti tek görüşe zorlamanın doğru olmadığını savunduğu için', fr: 'Car les Compagnons s’étaient dispersés avec des traditions variées et qu’il refusait d’imposer une seule école à toute la Umma' },
      { tr: 'Eserin henüz hiç yazılmamış olması sebebiyle', fr: 'Parce que l’ouvrage n’avait pas encore été commencé' },
      { tr: 'Yalnızca Endülüs’te okutulmasını istediği için', fr: 'Parce qu’il voulait le réserver à al-Andalus' },
      { tr: 'Arapçadan Farsçaya tercüme edilmesini şart koştuğu için', fr: 'Parce qu’il exigeait d’abord sa traduction en persan' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'İmam Mâlik, fıkhî çoğulculuğu ve ilmî bağımsızlığı koruyarak “her beldeye sahâbeden farklı ilim ulaşmıştır; insanları kendi seçtikleri amel üzere bırak” demiştir.',
      fr: 'Défendant le pluralisme juridique et l’indépendance du savant, il recommanda de laisser chaque région suivre les traditions reçues des Compagnons.',
    },
    sourceRef: 'TDV DİA, “Mâlik b. Enes” & “el-Muvatta’”',
    deepLink: { route: 'el-muvatta', targetItemId: 'timeline' },
  },

  // =========================================================================
  // 2. EL-MUVATTA’ TARİHİ & RİVAYETLERİ (9 SORU)
  // =========================================================================
  {
    id: 'q-mv-1',
    category: 'el-muvatta',
    difficulty: 'temel',
    arabicCue: 'المُوَطَّأُ',
    question: {
      tr: '“el-Muvatta’” kelimesinin sözlük anlamı ve esere bu adın verilme gerekçesi nedir?',
      fr: 'Que signifie littéralement le titre « al-Muwatta’ » et pourquoi l’ouvrage porte-t-il ce nom ?',
    },
    options: [
      { tr: '“Düzeltilmiş, hazırlanmış, kolaylaştırılmış ve üzerinde uzlaşılmış yol/eser”', fr: '« Chemin aplani, préparé, facilité et approuvé unanimement »' },
      { tr: '“Yalnızca hac ahkâmını toplayan mecmua”', fr: '« Recueil consacré uniquement aux rites du pèlerinage »' },
      { tr: '“Kısa mektuplar ve fetvalar dizisi”', fr: '« Série de lettres brèves et de décrets »' },
      { tr: '“Sadece mürsel hadisler seçkisi”', fr: '« Anthologie exclusive de hadiths mursal »' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'İmam Mâlik, eserini Medine’nin yetmiş fakihine arz ettiğini ve hepsinin kendisiyle mutabık (muvâta‘a) kaldığını belirterek bu ismi vermiştir.',
      fr: 'L’Imam Mâlik expliqua l’avoir soumis à soixante-dix juristes de Médine qui tous l’approuvèrent (wâta’ûnî), d’où son nom.',
    },
    sourceRef: 'TDV DİA, “el-Muvatta’”, c. 31',
    deepLink: { route: 'el-muvatta', targetItemId: 'overview' },
  },
  {
    id: 'q-mv-2',
    category: 'el-muvatta',
    difficulty: 'temel',
    question: {
      tr: 'Ebû Bekir el-Ebherî’nin Yahyâ el-Leysî rivayeti üzerindeki sayımına göre el-Muvatta’da toplam kaç rivayet bulunmaktadır?',
      fr: 'Selon le décompte d’Abû Bakr al-Abharî sur la recension de Yahyâ al-Laythî, combien de récits al-Muwatta’ contient-il au total ?',
    },
    options: [
      { tr: '1.720 rivayet (600 müsned, 222 mürsel, 613 mevkuf, 285 maktû)', fr: '1 720 récits (600 musnad, 222 mursal, 613 mawqûf, 285 maqtû‘)' },
      { tr: '4.800 rivayet', fr: '4 800 récits' },
      { tr: '7.275 rivayet', fr: '7 275 récits' },
      { tr: '850 rivayet', fr: '850 récits' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'el-Ebherî’nin meşhur istatistiğine göre el-Muvatta’ 600 müsned, 222 mürsel, 613 mevkuf (sahâbe sözü) ve 285 maktû (tâbiîn sözü) olmak üzere 1.720 rivayet ihtiva eder.',
      fr: 'Le célèbre inventaire d’al-Abharî totalise 1 720 récits répartis en 600 musnad, 222 mursal, 613 mawqûf et 285 maqtû‘.',
    },
    sourceRef: 'TDV DİA, “el-Muvatta’” · İstatistikler',
    deepLink: { route: 'el-muvatta', targetItemId: 'stats' },
  },
  {
    id: 'q-mv-3',
    category: 'el-muvatta',
    difficulty: 'temel',
    arabicCue: 'مَالِكٌ عَنْ نَافِعٍ عَنِ ابْنِ عُمَرَ',
    question: {
      tr: 'İmam Buhârî’nin “esahhu’l-esânîd” (isnadların en sahihi) ve hadis âlimlerinin “Silsiletü’z-Zeheb” (Altın Zincir) dediği rivayet halkası hangisidir?',
      fr: 'Quelle chaîne de transmission est qualifiée par al-Bukhârî de « Chaîne d’or » (Silsilat adh-Dhahab) ?',
    },
    options: [
      { tr: 'Mâlik — Nâfi‘ — Abdullah b. Ömer', fr: 'Mâlik — Nâfi‘ — ‘Abdullâh b. ‘Umar' },
      { tr: 'Mâlik — Şeybânî — Ebû Yûsuf', fr: 'Mâlik — ash-Shaybânî — Abû Yûsuf' },
      { tr: 'Mâlik — İbn Vehb — Sahnûn', fr: 'Mâlik — Ibn Wahb — Sahnûn' },
      { tr: 'Mâlik — Zekvân — Ebû Hüreyre', fr: 'Mâlik — Dhakwân — Abû Hurayra' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'İmam Mâlik’in İbn Ömer’in âzatlısı Nâfi‘den, onun da Abdullah b. Ömer’den yaptığı rivayetler hadis ilminde Silsiletü’z-Zeheb olarak anılır.',
      fr: 'La lignée Mâlik ← Nâfi‘ ← Ibn ‘Umar est célébrée dans la science du hadith comme la « Chaîne d’or ».',
    },
    sourceRef: 'TDV DİA, “el-Muvatta’” · Silsiletü’z-Zeheb',
    deepLink: { route: 'el-muvatta', targetItemId: 'overview' },
  },
  {
    id: 'q-mv-4',
    category: 'el-muvatta',
    difficulty: 'orta',
    question: {
      tr: 'İmam Mâlik’in el-Muvatta’ı gözden geçirip sadeleştirme (tenkih) süreci yaklaşık kaç yıl sürmüştür?',
      fr: 'Pendant combien d’années environ l’Imam Mâlik a-t-il révisé et épuré al-Muwatta’ ?',
    },
    options: [
      { tr: '40 yıl (başlangıçta ~10.000 rivayetten öz seçkiye)', fr: '40 ans (d’environ 10 000 récits initiaux au recueil final)' },
      { tr: '3 yıl', fr: '3 ans' },
      { tr: '7 yıl', fr: '7 ans' },
      { tr: '12 yıl', fr: '12 ans' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Kaynaklar İmam Mâlik’in eserini yaklaşık 40 yıl boyunca sürekli gözden geçirdiğini, her yıl elemeler yaparak yalnızca en sağlam ve amele uygun rivayetleri bıraktığını aktarır.',
      fr: 'Les sources rapportent que Mâlik affina son recueil durant près de quarante ans, ne conservant que les traditions les plus sûres.',
    },
    sourceRef: 'TDV DİA, “el-Muvatta’” · 40 Yıllık Telif',
    deepLink: { route: 'el-muvatta', targetItemId: 'stats' },
  },
  {
    id: 'q-mv-5',
    category: 'el-muvatta',
    difficulty: 'orta',
    question: {
      tr: 'Bugün dünya genelinde “el-Muvatta’” denildiğinde ilk akla gelen ve bu atlasın da esas aldığı standart rivayet kime aittir?',
      fr: 'Quelle est la recension canonique d’al-Muwatta’ la plus répandue aujourd’hui et utilisée comme texte de référence dans cet atlas ?',
    },
    options: [
      { tr: 'Yahyâ b. Yahyâ el-Leysî el-Endelüsî (ö. 234/848)', fr: 'Yahyâ b. Yahyâ al-Laythî al-Andalusî (m. 234/848)' },
      { tr: 'Süveyd b. Saîd el-Hadesânî', fr: 'Suwayd b. Sa‘îd al-Hadathânî' },
      { tr: 'Ali b. Ziyâd et-Tûnisî', fr: '‘Alî b. Ziyâd at-Tûnisî' },
      { tr: 'İbnü’l-Kāsım el-Mısrî', fr: 'Ibn al-Qâsim al-Misrî' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'İmam Mâlik’in vefat yılında (179/795) Medine’de son okunuşu dinleyen Endülüslü Yahyâ b. Yahyâ el-Leysî’nin nüshası standart metin hâline gelmiştir.',
      fr: 'La recension de l’Andalou Yahyâ b. Yahyâ al-Laythî, transmise la dernière année de la vie de Mâlik, s’est imposée comme version de référence.',
    },
    sourceRef: 'TDV DİA, “el-Muvatta’” · 9 Rivayet',
    deepLink: { route: 'el-muvatta', targetItemId: 'riwayahs' },
  },
  {
    id: 'q-mv-6',
    category: 'el-muvatta',
    difficulty: 'orta',
    question: {
      tr: 'Hanefî fıkhı ile mukayeseli açıklamalar ekleyerek hazırladığı Muvatta’ rivayetiyle tanınan Iraklı meşhur fakih kimdir?',
      fr: 'Quel célèbre juriste irakien a transmis une recension d’al-Muwatta’ enrichie de comparaisons avec l’école hanafite ?',
    },
    options: [
      { tr: 'İmam Muhammed b. Hasan eş-Şeybânî (ö. 189/805)', fr: 'Imam Muhammad b. al-Hasan ash-Shaybânî (m. 189/805)' },
      { tr: 'Ebû Mus‘ab ez-Zührî', fr: 'Abû Mus‘ab az-Zuhrî' },
      { tr: 'Abdullah b. Mesleme el-Ka‘nebî', fr: '‘Abdullâh b. Maslama al-Qa‘nabî' },
      { tr: 'Yahyâ b. Bükeyr', fr: 'Yahyâ b. Bukayr' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'İmam Muhammed eş-Şeybânî, İmam Mâlik’ten üç yıl boyunca el-Muvatta’ı dinlemiş; rivayetinin ardından “Ebû Hanîfe’nin görüşü budur” şeklinde mukayeseli fıkıh notları eklemiştir.',
      fr: 'Muhammad ash-Shaybânî étudia trois ans auprès de Mâlik et accompagna sa recension d’al-Muwatta’ des avis juridiques d’Abû Hanîfa.',
    },
    sourceRef: 'TDV DİA, “el-Muvatta’” · Rivayetler',
    deepLink: { route: 'el-muvatta', targetItemId: 'riwayahs' },
  },
  {
    id: 'q-mv-7',
    category: 'el-muvatta',
    difficulty: 'ileri',
    arabicCue: 'بَلَاغَاتُ مَالِكٍ',
    question: {
      tr: 'el-Muvatta’da “Beleğanî (Bana ulaştı ki)” ifadesiyle yer alan 61 belâğ hadisin muttasıl isnadlarını kimler ortaya çıkarmıştır?',
      fr: 'Qui a établi les chaînes continues (muttasil) des 61 hadiths « balâgh » d’al-Muwatta’ ?',
    },
    options: [
      { tr: 'İbn Abdülber 57’sini, İbnü’s-Salâh ise kalan 4’ünü muttasıl isnadla tespit etmiştir', fr: 'Ibn ‘Abd al-Barr en a relié 57 et Ibn as-Salâh a complété les 4 derniers' },
      { tr: 'Hiçbirinin isnadı bulunamamıştır', fr: 'Aucune chaîne n’a pu être retrouvée' },
      { tr: 'Yalnızca Süyûtî 20’sini bulmuştur', fr: 'Seul as-Suyûtî en a identifié 20' },
      { tr: 'İmam Şâfiî tamamını tek risalede toplamıştır', fr: 'L’Imam ash-Shâfi‘î les a tous réunis dans un seul traité' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'İbn Abdülber *et-Temhîd*’de 61 belâğdan 57’sinin muttasıl isnadını bulmuş; iki asır sonra İbnü’s-Salâh özel bir risale ile kalan 4 hadisin de senedini ortaya koymuştur.',
      fr: 'Ibn ‘Abd al-Barr retrouva 57 chaînes complètes dans at-Tamhîd, puis Ibn as-Salâh identifia les 4 restantes dans un opuscule dédié.',
    },
    sourceRef: 'TDV DİA, “el-Muvatta’” · 61 Belâğ Doğrulaması',
    deepLink: { route: 'el-muvatta', targetItemId: 'stats' },
  },
  {
    id: 'q-mv-8',
    category: 'el-muvatta',
    difficulty: 'orta',
    question: {
      tr: 'el-Muvatta’ üzerine yazılmış, biri râvi alfabetik sırasına göre diğeri fıkıh bablarına göre düzenlenmiş iki dev şerhin (*et-Temhîd* ve *el-İstizkâr*) müellifi kimdir?',
      fr: 'Qui est l’auteur des deux monuments d’exégèse sur al-Muwatta’ intitulés at-Tamhîd et al-Istidhkâr ?',
    },
    options: [
      { tr: 'İbn Abdülber en-Nemerî el-Kurtubî (ö. 463/1071)', fr: 'Ibn ‘Abd al-Barr an-Namarî al-Qurtubî (m. 463/1071)' },
      { tr: 'Ebü’l-Velîd el-Bâcî', fr: 'Abû l-Walîd al-Bâjî' },
      { tr: 'Celâleddin es-Süyûtî', fr: 'Jalâl ad-Dîn as-Suyûtî' },
      { tr: 'Muhammed Zekeriyyâ el-Kândehlevî', fr: 'Muhammad Zakariyyâ al-Kândahlawî' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Endülüslü büyük muhaddis İbn Abdülber, *et-Temhîd*’i İmam Mâlik’in hocalarına göre, *el-İstizkâr*’ı ise el-Muvatta’ın fıkıh babları tertibine göre kaleme almıştır.',
      fr: 'Le grand maître andalou Ibn ‘Abd al-Barr classa at-Tamhîd par maîtres de Mâlik et al-Istidhkâr selon l’ordre thématique des chapitres.',
    },
    sourceRef: 'TDV DİA, “el-Muvatta’” · Şerhler',
    deepLink: { route: 'el-muvatta', targetItemId: 'commentaries' },
  },
  {
    id: 'q-mv-9',
    category: 'el-muvatta',
    difficulty: 'ileri',
    question: {
      tr: 'İmam Mâlik’in vefatından yaklaşık 15 yıl sonra telif edilen, *el-Müntekâ* adlı meşhur Muvatta’ şerhinin müellifi kimdir?',
      fr: 'Qui est l’auteur du célèbre commentaire d’al-Muwatta’ intitulé al-Muntaqâ ?',
    },
    options: [
      { tr: 'Ebü’l-Velîd el-Bâcî (ö. 474/1081)', fr: 'Abû l-Walîd al-Bâjî (m. 474/1081)' },
      { tr: 'Ebû Bekir İbnü’l-Arabî', fr: 'Abû Bakr Ibn al-‘Arabî' },
      { tr: 'Muhammed b. Abdülbâkī ez-Zürkānî', fr: 'Muhammad b. ‘Abd al-Bâqî az-Zurqânî' },
      { tr: 'Ali el-Kārî', fr: '‘Alî al-Qârî' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Endülüslü Mâlikî fakihi Ebü’l-Velîd el-Bâcî, hacimli *el-İstîfâ* şerhini özetleyerek bugün en çok başvurulan klasik şerhlerden biri olan *el-Müntekâ*’yı telif etmiştir.',
      fr: 'Le juriste andalou Abû l-Walîd al-Bâjî a abrégé son vaste al-Istîfâ pour produire al-Muntaqâ, l’un des commentaires les plus consultés.',
    },
    sourceRef: 'TDV DİA, “el-Muvatta’” · Şerhler',
    deepLink: { route: 'el-muvatta', targetItemId: 'commentaries' },
  },

  // =========================================================================
  // 3. KİTÂBÜ’S-SALÂT FÎ RAMADÂN METİN & FIKIH (9 SORU)
  // =========================================================================
  {
    id: 'q-hd-1',
    category: 'hadis-metin',
    difficulty: 'temel',
    arabicCue: 'كِتَابُ الصَّلَاةِ فِي رَمَضَانَ',
    question: {
      tr: 'el-Muvatta’ın 6. kitabı olan *Kitâbü’s-Salât fî Ramadân* hangi iki babdan ve toplam kaç hadisten oluşur?',
      fr: 'De quels deux chapitres et de combien de hadiths se compose le Kitâb as-Salât fî Ramadân (Livre VI d’al-Muwatta’) ?',
    },
    options: [
      { tr: 'Bâbu’t-Tergîb (Hadis 1–2) ve Bâbu Mâ Câe fî Kıyâmi Ramadân (Hadis 3–8) — toplam 8 hadis', fr: 'Bâb at-Targhîb (Hadiths 1–2) et Bâb Mâ Jâ’a fî Qiyâm Ramadân (Hadiths 3–8) — 8 hadiths' },
      { tr: 'Sadece 1 bab ve 12 hadis', fr: '1 seul chapitre et 12 hadiths' },
      { tr: '3 bab ve 15 hadis', fr: '3 chapitres et 15 hadiths' },
      { tr: '2 bab ve 6 hadis', fr: '2 chapitres et 6 hadiths' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Birinci babda Ramazan namazına teşvik ve farz kılınma endişesini anlatan 2 hadis; ikinci babda ise Hz. Ömer’in cemaati toplaması, rekât sayısı, kıraat ve sahur uygulamasını aktaran 6 hadis yer alır.',
      fr: 'Le premier chapitre rassemble 2 hadiths sur l’incitation prophétique ; le second réunit 6 récits sur l’organisation par ‘Umar, les rak‘ât et la récitation.',
    },
    sourceRef: 'el-Muvatta’, Kitâbü’s-Salât fî Ramadân, s. 113–116',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-1' },
  },
  {
    id: 'q-hd-2',
    category: 'hadis-metin',
    difficulty: 'temel',
    arabicCue: 'خَشِيتُ أَنْ تُفْرَضَ عَلَيْكُمْ',
    question: {
      tr: '1. hadiste Hz. Peygamber (s.a.v.) mescidde cemaatle namaz kıldıktan sonra üçüncü veya dördüncü gece neden çıkmamıştır?',
      fr: 'Dans le Hadith 1, pourquoi le Prophète (ﷺ) n’est-il pas sorti la troisième ou quatrième nuit après avoir prié en congrégation ?',
    },
    options: [
      { tr: 'Gece namazının ümmete farz kılınmasından korktuğu için', fr: 'Par crainte que cette prière nocturne ne devienne obligatoire pour la communauté' },
      { tr: 'Medine dışında sefere çıktığı için', fr: 'Parce qu’il était parti en voyage hors de Médine' },
      { tr: 'Mescidde yeterli yer kalmadığı için', fr: 'Par manque de place dans la mosquée' },
      { tr: 'Ramazan ayı sona erdiği için', fr: 'Parce que le mois de Ramadan était terminé' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Hz. Peygamber sabahleyin cemaate: “Sizin beklediğinizi biliyordum; ancak üzerinize farz kılınmasından korktum” buyurmuştur.',
      fr: 'Le matin, le Prophète expliqua : « Votre présence ne m’a pas échappé, mais j’ai craint qu’elle ne vous soit prescrite comme obligation. »',
    },
    sourceRef: 'el-Muvatta’, Kitâbü’s-Salât fî Ramadân, Hadis 1',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-1' },
  },
  {
    id: 'q-hd-3',
    category: 'hadis-metin',
    difficulty: 'temel',
    arabicCue: 'مَنْ قَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ',
    question: {
      tr: '2. hadise göre Ramazan gecelerini îmânen ve ihtisâben (inanarak ve sevabını yalnız Allah’tan umarak) ihya eden kişiye hangi müjde verilmiştir?',
      fr: 'Selon le Hadith 2, quelle promesse est faite à celui qui accomplit le qiyâm de Ramadan avec foi (îmânan) et espérance de récompense (ihtisâban) ?',
    },
    options: [
      { tr: 'Geçmiş günahlarının bağışlanması', fr: 'Le pardon de ses péchés passés' },
      { tr: 'Bir yıllık oruç borcunun düşmesi', fr: 'La dispense d’une année de jeûne' },
      { tr: 'Hac farizasının yerine geçmesi', fr: 'L’équivalence du pèlerinage obligatoire' },
      { tr: 'Zekât yükümlülüğünün kalkması', fr: 'L’exemption de la zakât' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Ebû Hüreyre (r.a.) rivayetinde Resûlullah (s.a.v.), kesin bir emir kipi kullanmadan teşvik ederek geçmiş günahların mağfiretini müjdelemiştir.',
      fr: 'Dans le récit d’Abû Hurayra, le Prophète encourage à cette prière sans l’imposer, annonçant le pardon des péchés antérieurs.',
    },
    sourceRef: 'el-Muvatta’, Kitâbü’s-Salât fî Ramadân, Hadis 2',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-2' },
  },
  {
    id: 'q-hd-4',
    category: 'hadis-metin',
    difficulty: 'temel',
    arabicCue: 'نِعْمَتِ الْبِدْعَةُ هَذِهِ',
    question: {
      tr: '3. hadiste Hz. Ömer (r.a.), Mescid-i Nebevî’de dağınık hâlde namaz kılan insanları hangi sahâbînin arkasında tek cemaat hâlinde toplamıştır?',
      fr: 'Dans le Hadith 3, derrière quel Compagnon ‘Umar b. al-Khattâb a-t-il réuni les fidèles dispersés dans la mosquée ?',
    },
    options: [
      { tr: 'Übey b. Kâ‘b (r.a.)', fr: 'Ubayy b. Ka‘b (r.a.)' },
      { tr: 'Zeyd b. Sâbit (r.a.)', fr: 'Zayd b. Thâbit (r.a.)' },
      { tr: 'Abdullah b. Mes‘ûd (r.a.)', fr: '‘Abdullâh b. Mas‘ûd (r.a.)' },
      { tr: 'Muâz b. Cebel (r.a.)', fr: 'Mu‘âdh b. Jabal (r.a.)' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Hz. Ömer insanları Übey b. Kâ‘b’ın arkasında toplamış, ertesi gece onları cemaatle namaz kılarken görünce “Bu ne güzel bid‘attir!” demiştir.',
      fr: '‘Umar les rassembla derrière Ubayy b. Ka‘b et, les voyant prier unis le lendemain, s’exclama : « Quelle excellente innovation que celle-ci ! »',
    },
    sourceRef: 'el-Muvatta’, Kitâbü’s-Salât fî Ramadân, Hadis 3',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-3' },
  },
  {
    id: 'q-hd-5',
    category: 'hadis-metin',
    difficulty: 'orta',
    arabicCue: 'وَالَّتِي يَنَامُونَ عَنْهَا أَفْضَلُ مِنَ الَّتِي يَقُومُونَ',
    question: {
      tr: '3. hadisin sonunda Hz. Ömer’in “Uyuyup kaldıkları (namaz), şu kıldıklarından daha faziletlidir” sözüyle kastettiği vakit hangisidir?',
      fr: 'À la fin du Hadith 3, quel moment de la nuit ‘Umar désigne-t-il en disant que la prière « pour laquelle ils dorment » est meilleure ?',
    },
    options: [
      { tr: 'Gecenin son vakti (seher / teheccüd vakti)', fr: 'La dernière partie de la nuit (fin de nuit / tahajjud)' },
      { tr: 'İkindi ile akşam arası', fr: 'Entre l’après-midi et le coucher du soleil' },
      { tr: 'Kuşluk (duhâ) vakti', fr: 'La matinée (duhâ)' },
      { tr: 'Öğle namazından hemen sonra', fr: 'Juste après la prière de midi' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Metinde bizzat râvinin açıklaması yer alır: “Yürîdü âhire’l-leyl — Gecenin sonunu kastediyordu; insanlar ise gecenin evvelinde kılıyorlardı.”',
      fr: 'Le narrateur précise dans le texte même : « Il voulait dire la fin de la nuit, tandis que les gens priaient en début de nuit. »',
    },
    sourceRef: 'el-Muvatta’, Kitâbü’s-Salât fî Ramadân, Hadis 3',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-3' },
  },
  {
    id: 'q-hd-6',
    category: 'hadis-metin',
    difficulty: 'orta',
    arabicCue: 'بِإِحْدَى عَشْرَةَ رَكْعَةً ... مِنَ الْعِصِيِّ مِنْ طُولِ الْقِيَامِ',
    question: {
      tr: '4. hadiste Sâib b. Yezîd’in aktardığına göre Übey b. Kâ‘b ve Temîm ed-Dârî’nin kıldırdığı namaz kaç rekâttı ve cemaat neden asalara dayanıyordu?',
      fr: 'Dans le Hadith 4 (as-Sâ’ib b. Yazîd), combien de rak‘ât dirigeaient Ubayy b. Ka‘b et Tamîm ad-Dârî, et pourquoi les fidèles s’appuyaient-ils sur des bâtons ?',
    },
    options: [
      { tr: '11 rekât; imam yüzlerce âyetlik sûreler okuduğu için kıyamın uzunluğundan', fr: '11 rak‘ât ; à cause de la longue station debout durant la récitation des sourates de centaines de versets' },
      { tr: '8 rekât; mescid zemini taşlık olduğu için', fr: '8 rak‘ât ; à cause du sol rocailleux de la mosquée' },
      { tr: '36 rekât; sadece yaşlılar katıldığı için', fr: '36 rak‘ât ; car seuls les anciens y participaient' },
      { tr: '20 rekât; yalnızca Fâtiha okunduğu için', fr: '20 rak‘ât ; car seule al-Fâtiha était récitée' },
    ],
    correctIndex: 0,
    explanation: {
      tr: '4. hadiste Hz. Ömer’in Übey b. Kâ‘b ve Temîm ed-Dârî’ye 11 rekât kıldırmalarını emrettiği, uzun kıraat sebebiyle cemaatin asalara dayandığı ve fecre doğru dağıldığı aktarılır.',
      fr: 'Le récit mentionne 11 rak‘ât avec de très longues récitations (al-mi’în) obligeant les fidèles à s’appuyer sur des bâtons jusqu’aux approches de l’aube.',
    },
    sourceRef: 'el-Muvatta’, Kitâbü’s-Salât fî Ramadân, Hadis 4',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-4' },
  },
  {
    id: 'q-hd-7',
    category: 'hadis-metin',
    difficulty: 'temel',
    arabicCue: 'بِثَلَاثٍ وَعِشْرِينَ رَكْعَةً',
    question: {
      tr: '5. hadiste Yezîd b. Rûmân, Hz. Ömer (r.a.) döneminde insanların Ramazan gecelerinde kaç rekât namaz kıldığını bildirmektedir?',
      fr: 'Dans le Hadith 5, combien de rak‘ât Yazîd b. Rûmân rapporte-t-il que les gens accomplissaient sous ‘Umar b. al-Khattâb ?',
    },
    options: [
      { tr: '23 rekât (20 terâvih + 3 vitir)', fr: '23 rak‘ât (20 tarâwîh + 3 witr)' },
      { tr: '11 rekât', fr: '11 rak‘ât' },
      { tr: '39 rekât', fr: '39 rak‘ât' },
      { tr: '13 rekât', fr: '13 rak‘ât' },
    ],
    correctIndex: 0,
    explanation: {
      tr: '5. hadis, 4. hadisteki 11 rekât rivayetinin hemen ardından 23 rekât uygulamasını aktararak iki rivayet arasındaki kıyam uzunluğu/rekât sayısı dengesini belgeler.',
      fr: 'Placé juste après le Hadith 4 (11 rak‘ât), le Hadith 5 documente la pratique des 23 rak‘ât (20 + 3 witr) à l’époque de ‘Umar.',
    },
    sourceRef: 'el-Muvatta’, Kitâbü’s-Salât fî Ramadân, Hadis 5',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-5' },
  },
  {
    id: 'q-hd-8',
    category: 'hadis-metin',
    difficulty: 'orta',
    arabicCue: 'يَقْرَأُ بِسُورَةِ الْبَقَرَةِ فِي ثَمَانِ رَكَعَاتٍ',
    question: {
      tr: '6. hadise göre imam Bakara sûresini 8 rekât yerine 12 rekâtta okuduğunda cemaat bunu nasıl değerlendiriyordu?',
      fr: 'Selon le Hadith 6, comment les fidèles percevaient-ils le fait que l’imam récite sourate al-Baqara en 12 rak‘ât plutôt qu’en 8 ?',
    },
    options: [
      { tr: 'İmamın kendilerine namazı hafiflettiğini (tahrîf değil tahfîf yaptığını) düşünürlerdi', fr: 'Ils considéraient qu’il avait allégé la prière pour eux (qad khaffafa)' },
      { tr: 'Namazın bozulduğuna hükmederlerdi', fr: 'Ils jugeaient la prière invalide' },
      { tr: 'Kunut duasını terk ederlerdi', fr: 'Ils abandonnaient le qunût' },
      { tr: 'Mescidi hemen terk ederlerdi', fr: 'Ils quittaient aussitôt la mosquée' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Normalde Bakara sûresi 8 rekâtta tamamlanırken 12 rekâta yayıldığında her rekât kısaldığı için cemaat “imam namazı hafifletti” derdi.',
      fr: 'Répartir al-Baqara sur 12 rak‘ât au lieu de 8 raccourcissait chaque station debout, ce que les fidèles vivaient comme un allègement.',
    },
    sourceRef: 'el-Muvatta’, Kitâbü’s-Salât fî Ramadân, Hadis 6',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-6' },
  },
  {
    id: 'q-hd-9',
    category: 'hadis-metin',
    difficulty: 'orta',
    arabicCue: 'يَؤُمُّ عَائِشَةَ فِي رَمَضَانَ مِنَ الْمُصْحَفِ',
    question: {
      tr: '8. hadiste Hz. Âişe’nin âzatlısı (müdebber kölesi) Zekvân’ın Ramazan’da ona imamlık yaparken sergilediği fıkhî açıdan dikkat çekici uygulama nedir?',
      fr: 'Dans le Hadith 8, quelle pratique juridiquement notable Dhakwân accomplissait-il lorsqu’il dirigeait la prière pour ‘Â’isha en Ramadan ?',
    },
    options: [
      { tr: 'Mushafa bakarak Kur’an okuması (el-kırâe mine’l-mushaf)', fr: 'Lire le Coran directement dans un mushaf pendant la prière' },
      { tr: 'Sadece sessiz (gizli) kıraat yapması', fr: 'Réciter uniquement à voix basse' },
      { tr: 'Oturarak imamlık yapması', fr: 'Diriger la prière en position assise' },
      { tr: 'Her rekâtta kunut okuması', fr: 'Faire le qunût à chaque rak‘a' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Bu rivayet, özellikle nâfile/terâvih namazlarında mushafa bakarak kıraat etmenin cevazına dair Mâlikî fıkhının en temel delillerinden biridir.',
      fr: 'Ce récit constitue une preuve majeure, notamment dans l’école mâlikite, autorisant la lecture sur un mushaf lors des prières surérogatoires.',
    },
    sourceRef: 'el-Muvatta’, Kitâbü’s-Salât fî Ramadân, Hadis 8',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-8' },
  },

  // =========================================================================
  // 4. İSNAD ZİNCİRLERİ & RÂVİLER (9 SORU)
  // =========================================================================
  {
    id: 'q-is-1',
    category: 'isnad-ravi',
    difficulty: 'temel',
    arabicCue: 'مَالِكٌ عَنِ ابْنِ شِهَابٍ',
    question: {
      tr: 'Kitâbü’s-Salât fî Ramadân’daki ilk üç hadisin (Hadis 1, 2 ve 3) tamamında İmam Mâlik’in doğrudan şeyhi olan ortak büyük tâbiî râvi kimdir?',
      fr: 'Quel grand maître tâbi‘î est le transmetteur direct commun de l’Imam Mâlik dans les trois premiers hadiths (1, 2 et 3) ?',
    },
    options: [
      { tr: 'İbn Şihâb ez-Zührî', fr: 'Ibn Shihâb az-Zuhrî' },
      { tr: 'Dâvûd b. el-Husayn', fr: 'Dâwûd b. al-Husayn' },
      { tr: 'Muhammed b. Yûsuf', fr: 'Muhammad b. Yûsuf' },
      { tr: 'Nâfi‘ Mevlâ İbn Ömer', fr: 'Nâfi‘ Mawlâ Ibn ‘Umar' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Hadis 1 (Urve → Hz. Âişe), Hadis 2 (Ebû Seleme → Ebû Hüreyre) ve Hadis 3 (Urve → Abdurrahman b. Abd el-Kârî) hep İbn Şihâb ez-Zührî üzerinden İmam Mâlik’e ulaşır.',
      fr: 'Les Hadiths 1, 2 et 3 passent tous directement d’Ibn Shihâb az-Zuhrî à l’Imam Mâlik.',
    },
    sourceRef: 'Kitâbü’s-Salât fî Ramadân, Hadis 1–3 İsnadları',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-1' },
  },
  {
    id: 'q-is-2',
    category: 'isnad-ravi',
    difficulty: 'temel',
    question: {
      tr: '1. hadiste Hz. Âişe (r.anhâ) ile İbn Şihâb ez-Zührî arasında yer alan, aynı zamanda Hz. Âişe’nin yeğeni olan meşhur Medineli fakih kimdir?',
      fr: 'Dans le Hadith 1, quel célèbre juriste médinois — neveu de ‘Â’isha — fait le lien entre ‘Â’isha et Ibn Shihâb az-Zuhrî ?',
    },
    options: [
      { tr: 'Urve b. ez-Zübeyr', fr: '‘Urwa b. az-Zubayr' },
      { tr: 'Ebû Seleme b. Abdurrahman', fr: 'Abû Salama b. ‘Abd ar-Rahmân' },
      { tr: 'Sâib b. Yezîd', fr: 'as-Sâ’ib b. Yazîd' },
      { tr: 'el-A‘rec', fr: 'al-A‘raj' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Medine’nin yedi fakihinden (Fukaha-i Seb‘a) biri olan Urve b. ez-Zübeyr, teyzesi Hz. Âişe’den en güvenilir rivayetleri aktaran râvidir.',
      fr: 'L’un des Sept Juristes de Médine, ‘Urwa b. az-Zubayr est le transmetteur le plus fiable de sa tante ‘Â’isha.',
    },
    sourceRef: 'Kitâbü’s-Salât fî Ramadân, Hadis 1 İsnadı',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-1' },
  },
  {
    id: 'q-is-3',
    category: 'isnad-ravi',
    difficulty: 'orta',
    question: {
      tr: '2. hadiste (“Men kâme Ramadâne îmânen ve’htisâben...”) İbn Şihâb ez-Zührî, bu merfû hadisi Ebû Hüreyre’den hangi râvi kanalıyla almıştır?',
      fr: 'Dans le Hadith 2, par quel transmetteur Ibn Shihâb az-Zuhrî tient-il le hadith d’Abû Hurayra ?',
    },
    options: [
      { tr: 'Ebû Seleme b. Abdurrahman', fr: 'Abû Salama b. ‘Abd ar-Rahmân' },
      { tr: 'Yezîd b. Rûmân', fr: 'Yazîd b. Rûmân' },
      { tr: 'Dâvûd b. el-Husayn', fr: 'Dâwûd b. al-Husayn' },
      { tr: 'Hişâm b. Urve', fr: 'Hishâm b. ‘Urwa' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'el-Muvatta’daki 2. hadisin isnadı: “Yahyâ ← Mâlik ← İbn Şihâb ← Ebû Seleme b. Abdurrahman ← Ebû Hüreyre (r.a.)” şeklindedir.',
      fr: 'L’isnâd exact du Hadith 2 dans al-Muwatta’ est : Yahyâ ← Mâlik ← Ibn Shihâb ← Abû Salama b. ‘Abd ar-Rahmân ← Abû Hurayra.',
    },
    sourceRef: 'Kitâbü’s-Salât fî Ramadân, Hadis 2 İsnadı',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-2' },
  },
  {
    id: 'q-is-4',
    category: 'isnad-ravi',
    difficulty: 'orta',
    question: {
      tr: '3. hadiste Ramazan gecesi Hz. Ömer (r.a.) ile birlikte mescide çıkıp olaya bizzat şahitlik eden râvi kimdir?',
      fr: 'Dans le Hadith 3, quel compagnon de marche accompagnait ‘Umar à la mosquée cette nuit-là et a rapporté la scène ?',
    },
    options: [
      { tr: 'Abdurrahman b. Abd el-Kārî', fr: '‘Abd ar-Rahmân b. ‘Abd al-Qârî' },
      { tr: 'Sâib b. Yezîd', fr: 'as-Sâ’ib b. Yazîd' },
      { tr: 'Abdurrahman b. Hürmüz el-A‘rec', fr: '‘Abd ar-Rahmân b. Hurmuz al-A‘raj' },
      { tr: 'Ebû Bekir b. Hazm', fr: 'Abû Bakr b. Hazm' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Hz. Ömer’in beytülmâl görevlilerinden olan Abdurrahman b. Abd el-Kārî, “Ramazan’da bir gece Ömer b. el-Hattâb ile mescide çıktım” diyerek hadisi nakleder.',
      fr: '‘Abd ar-Rahmân b. ‘Abd al-Qârî témoigne directement : « Je sortis une nuit de Ramadan avec ‘Umar b. al-Khattâb vers la mosquée... »',
    },
    sourceRef: 'Kitâbü’s-Salât fî Ramadân, Hadis 3 İsnadı',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-3' },
  },
  {
    id: 'q-is-5',
    category: 'isnad-ravi',
    difficulty: 'orta',
    question: {
      tr: '4. hadiste 11 rekât ve asalara dayanma kıssasını aktaran Sâib b. Yezîd’den İmam Mâlik bu rivayeti hangi ara râvi üzerinden almıştır?',
      fr: 'Dans le Hadith 4, par quel intermédiaire l’Imam Mâlik rapporte-t-il le témoignage d’as-Sâ’ib b. Yazîd ?',
    },
    options: [
      { tr: 'Muhammed b. Yûsuf (Sâib’in kız kardeşinin oğlu)', fr: 'Muhammad b. Yûsuf (neveu d’as-Sâ’ib)' },
      { tr: 'İbn Şihâb ez-Zührî', fr: 'Ibn Shihâb az-Zuhrî' },
      { tr: 'Yezîd b. Rûmân', fr: 'Yazîd b. Rûmân' },
      { tr: 'Zekvân', fr: 'Dhakwân' },
    ],
    correctIndex: 0,
    explanation: {
      tr: '4. hadisin isnadı “Mâlik ← Muhammed b. Yûsuf ← es-Sâib b. Yezîd” şeklindedir; Muhammed b. Yûsuf Medine’nin güvenilir tâbiîlerindendir.',
      fr: 'La chaîne du Hadith 4 est : Mâlik ← Muhammad b. Yûsuf ← as-Sâ’ib b. Yazîd.',
    },
    sourceRef: 'Kitâbü’s-Salât fî Ramadân, Hadis 4 İsnadı',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-4' },
  },
  {
    id: 'q-is-6',
    category: 'isnad-ravi',
    difficulty: 'ileri',
    question: {
      tr: '5. hadisin râvisi Yezîd b. Rûmân (ö. 130/747) hakkında hadis usulünde hangi isnad değerlendirmesi yapılır?',
      fr: 'Quelle remarque critique de science du hadith est formulée sur la chaîne du Hadith 5 rapporté par Yazîd b. Rûmân (m. 130/747) ?',
    },
    options: [
      { tr: 'Yezîd b. Rûmân Hz. Ömer dönemine yetişmediği için rivayet teknik olarak munkatı‘ / mürsel sayılır', fr: 'Yazîd b. Rûmân n’ayant pas connu l’époque de ‘Umar, la chaîne est techniquement munqati‘ / mursal' },
      { tr: 'Silsiletü’z-Zeheb kapsamındadır', fr: 'Elle fait partie de la Chaîne d’or' },
      { tr: 'Doğrudan Hz. Peygamber’e ulaşan merfû bir seneddir', fr: 'C’est une chaîne marfû‘ directe jusqu’au Prophète' },
      { tr: 'Endülüs kaynaklı bir belâğ rivayetidir', fr: 'C’est un balâgh d’origine andalouse' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Yezîd b. Rûmân sika (güvenilir) bir Medineli râvi olmakla birlikte Hz. Ömer’e yetişmemiştir; ancak Medine’deki yaygın tatbikatı aktarması sebebiyle fıkıhta güçlü destek görür.',
      fr: 'Bien que fiable (thiqa), Yazîd b. Rûmân n’a pas vécu sous ‘Umar ; son récit reflète néanmoins la pratique notoire de Médine.',
    },
    sourceRef: 'Kitâbü’s-Salât fî Ramadân, Hadis 5 İsnadı',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-5' },
  },
  {
    id: 'q-is-7',
    category: 'isnad-ravi',
    difficulty: 'orta',
    arabicCue: 'دَاوُدُ بْنُ الْحُصَيْنِ عَنِ الْأَعْرَجِ',
    question: {
      tr: '6. hadiste Bakara sûresi kıraati ve kunut rivayetini İmam Mâlik’e ulaştıran ikili isnad halkası hangisidir?',
      fr: 'Quel tandem de transmetteurs rapporte à l’Imam Mâlik le Hadith 6 sur la récitation d’al-Baqara et le qunût ?',
    },
    options: [
      { tr: 'Dâvûd b. el-Husayn ← el-A‘rec (Abdurrahman b. Hürmüz)', fr: 'Dâwûd b. al-Husayn ← al-A‘raj (‘Abd ar-Rahmân b. Hurmuz)' },
      { tr: 'İbn Şihâb ← Urve', fr: 'Ibn Shihâb ← ‘Urwa' },
      { tr: 'Muhammed b. Yûsuf ← Sâib b. Yezîd', fr: 'Muhammad b. Yûsuf ← as-Sâ’ib b. Yazîd' },
      { tr: 'Hişâm b. Urve ← Urve', fr: 'Hishâm b. ‘Urwa ← ‘Urwa' },
    ],
    correctIndex: 0,
    explanation: {
      tr: '6. hadis İmam Mâlik’e Dâvûd b. el-Husayn el-Emevî üzerinden, onun da Ebû Hüreyre’nin önde gelen talebesi el-A‘rec’ten işitmesiyle ulaşır.',
      fr: 'Le Hadith 6 parvient à Mâlik via Dâwûd b. al-Husayn d’après al-A‘raj, illustre élève d’Abû Hurayra.',
    },
    sourceRef: 'Kitâbü’s-Salât fî Ramadân, Hadis 6 İsnadı',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-6' },
  },
  {
    id: 'q-is-8',
    category: 'isnad-ravi',
    difficulty: 'orta',
    question: {
      tr: '7. hadiste (fecir korkusu ve sahur telaşı) babasından rivayet eden Medineli fakih ile 8. hadiste (Zekvân’ın imameti) babası Urve’den rivayet eden râvi ikilisi hangisidir?',
      fr: 'Quels deux fils rapportant de leur propre père apparaissent respectivement dans les Hadiths 7 (hâte du suhûr) et 8 (imamat de Dhakwân) ?',
    },
    options: [
      { tr: 'Hadis 7: Abdullah b. Ebî Bekir b. Hazm · Hadis 8: Hişâm b. Urve', fr: 'Hadith 7 : ‘Abdullâh b. Abî Bakr b. Hazm · Hadith 8 : Hishâm b. ‘Urwa' },
      { tr: 'Hadis 7: Yezîd b. Rûmân · Hadis 8: Sâib b. Yezîd', fr: 'Hadith 7 : Yazîd b. Rûmân · Hadith 8 : as-Sâ’ib b. Yazîd' },
      { tr: 'Hadis 7: Ebû Seleme · Hadis 8: Dâvûd b. el-Husayn', fr: 'Hadith 7 : Abû Salama · Hadith 8 : Dâwûd b. al-Husayn' },
      { tr: 'Hadis 7: İbn Şihâb · Hadis 8: el-A‘rec', fr: 'Hadith 7 : Ibn Shihâb · Hadith 8 : al-A‘raj' },
    ],
    correctIndex: 0,
    explanation: {
      tr: '7. hadis Abdullah b. Ebî Bekir ← babası Ebû Bekir b. Muhammed b. Hazm; 8. hadis ise Hişâm b. Urve ← babası Urve ← Hz. Âişe (r.anhâ) aile isnadıyla gelir.',
      fr: 'Le Hadith 7 suit la chaîne familiale ‘Abdullâh ← Abû Bakr b. Hazm, et le Hadith 8 celle de Hishâm ← ‘Urwa ← ‘Â’isha.',
    },
    sourceRef: 'Kitâbü’s-Salât fî Ramadân, Hadis 7–8 İsnadları',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-8' },
  },
  {
    id: 'q-is-9',
    category: 'isnad-ravi',
    difficulty: 'temel',
    question: {
      tr: '4. hadiste Hz. Ömer (r.a.) Ramazan gecelerinde 11 rekât namaz kıldırmaları için hangi iki sahâbîyi görevlendirmiştir?',
      fr: 'Dans le Hadith 4, quels deux Compagnons ‘Umar a-t-il désignés pour diriger les 11 rak‘ât ?',
    },
    options: [
      { tr: 'Übey b. Kâ‘b ve Temîm ed-Dârî', fr: 'Ubayy b. Ka‘b et Tamîm ad-Dârî' },
      { tr: 'Ebû Hüreyre ve İbn Ömer', fr: 'Abû Hurayra et Ibn ‘Umar' },
      { tr: 'Hz. Ali ve Hz. Osman', fr: '‘Alî et ‘Uthmân' },
      { tr: 'Zekvân ve Sâib b. Yezîd', fr: 'Dhakwân et as-Sâ’ib b. Yazîd' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Hadis 4’te açıkça “أَمَرَ عُمَرُ بْنُ الْخَطَّابِ أُبَيَّ بْنَ كَعْبٍ وَتَمِيمًا الدَّارِيَّ” ibaresiyle iki büyük kurrâ sahâbî anılır.',
      fr: 'Le texte arabe du Hadith 4 nomme expressément ces deux grands récitateurs : Ubayy b. Ka‘b et Tamîm ad-Dârî.',
    },
    sourceRef: 'Kitâbü’s-Salât fî Ramadân, Hadis 4',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-4' },
  },

  // =========================================================================
  // 5. ARAPÇA LÜGAT & SARF-NAHİV (9 SORU)
  // =========================================================================
  {
    id: 'q-lg-1',
    category: 'lugat-sarf',
    difficulty: 'temel',
    arabicCue: 'أَوْزَاعٌ مُتَفَرِّقُونَ',
    question: {
      tr: '3. hadiste geçen “أَوْزَاعٌ” (evzâ‘un) kelimesinin kökü ve anlamı nedir?',
      fr: 'Quelle est la racine et la signification du mot « أَوْزَاعٌ » (awzâ‘) employé dans le Hadith 3 ?',
    },
    options: [
      { tr: 'Kök: و ز ع — Dağınık gruplar, parça parça cemaatler', fr: 'Racine و ز ع — Groupes dispersés, petits rassemblements épars' },
      { tr: 'Kök: ص ل و — Uzun rekâtlar', fr: 'Racine ص ل و — Longues unités de prière' },
      { tr: 'Kök: ن و م — Gece uykusu', fr: 'Racine ن و م — Sommeil nocturne' },
      { tr: 'Kök: ق ر أ — Kur’an hâfızları', fr: 'Racine ق ر أ — Mémorisateurs du Coran' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Tekili “veza‘” (وَزَع) olan “evzâ‘” (أَوْزَاع) kelimesi, dağınık ve ayrı ayrı kümeler hâlinde bulunan toplulukları ifade eder.',
      fr: 'Pluriel de waza‘, le terme awzâ‘ désigne des groupes disparates et éparpillés dans la mosquée avant l’unification.',
    },
    sourceRef: 'Hadis 3 · Sözlük (أَوْزَاعٌ)',
    deepLink: { route: 'sozluk', targetItemId: 'lex-اوزاع' },
  },
  {
    id: 'q-lg-2',
    category: 'lugat-sarf',
    difficulty: 'orta',
    arabicCue: 'إِيمَانًا وَاحْتِسَابًا',
    question: {
      tr: '2. hadisteki “إِيمَانًا وَاحْتِسَابًا” terkibinin nahiv (irap) açısından mansûb olmasının temel sebebi nedir?',
      fr: 'En syntaxe arabe (nahw), pourquoi « إِيمَانًا وَاحْتِسَابًا » sont-ils à l’accusatif (mansûb) dans le Hadith 2 ?',
    },
    options: [
      { tr: 'Mef‘ûlün li-eclih (sebep bildiren tümleç) veya hâl olmaları', fr: 'Complément de cause (maf‘ûl li-ajlih) ou complément d’état (hâl)' },
      { tr: 'Mübtedâ ve haber olmaları', fr: 'Sujet (mubtada’) et prédicat (khabar)' },
      { tr: 'Harf-i cer ile mecrûr olmaları', fr: 'Génitif après préposition' },
      { tr: 'Nâib-i fâil olmaları', fr: 'Sujet passif (nâ’ib al-fâ‘il)' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Bu iki masdar, namazın hangi gaye ile kılındığını açıklayan mef‘ûlün li-eclih (inanarak ve ecrini umarak) yahut hâl konumundadır.',
      fr: 'Ces deux masdars précisent le motif spirituel de l’acte (maf‘ûl li-ajlih) : par foi sincère et en escomptant la récompense divine.',
    },
    sourceRef: 'Hadis 2 · Sarf ve Nahiv Analizi',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-2' },
  },
  {
    id: 'q-lg-3',
    category: 'lugat-sarf',
    difficulty: 'orta',
    arabicCue: 'أَنْ تُفْرَضَ عَلَيْكُمْ',
    question: {
      tr: '1. hadiste geçen “تُفْرَضَ” fiilinin sarf yapısı (bab ve çatı) hangisidir?',
      fr: 'Quelle est l’analyse morphologique (sarf) du verbe « تُفْرَضَ » dans le Hadith 1 ?',
    },
    options: [
      { tr: 'Sülâsî mücerred (I. bab), meçhul (edilgen) mansûb muzâri fiil — “farz kılınması”', fr: 'Forme I (trilitère), inaccompli passif subjonctif — « qu’elle soit prescrite »' },
      { tr: 'Tef‘îl babı emr-i hâzır', fr: 'Forme II impératif' },
      { tr: 'İstif‘âl babı ism-i fâil', fr: 'Forme X participe actif' },
      { tr: 'Sülâsî mâzî malum fiil', fr: 'Forme I accompli actif' },
    ],
    correctIndex: 0,
    explanation: {
      tr: '“ف ر ض” kökünden sülâsî mücerred meçhul muzâri olup “أَنْ” nasb edatı sebebiyle mansûbtur (“üzerinize farz kılınmasından korktum”).',
      fr: 'Issu de la racine ف ر ض à la forme I passive au subjonctif après « أَنْ », il exprime la crainte d’une prescription obligatoire.',
    },
    sourceRef: 'Hadis 1 · Kelime Analizi',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-1' },
  },
  {
    id: 'q-lg-4',
    category: 'lugat-sarf',
    difficulty: 'temel',
    arabicCue: 'نَعْتَمِدُ عَلَى الْعِصِيِّ',
    question: {
      tr: '4. hadisteki “الْعِصِيِّ” kelimesinin tekili ve anlamı nedir?',
      fr: 'Quel est le singulier et le sens du terme « الْعِصِيِّ » dans le Hadith 4 ?',
    },
    options: [
      { tr: 'Tekili “عَصًا” (asâ) — Asalar, değnekler', fr: 'Singulier « عَصًا » (‘asâ) — Bâtons sur lesquels on s’appuie' },
      { tr: 'Tekili “عَاصٍ” — İsyankârlar', fr: 'Singulier « عَاصٍ » — Désobéissants' },
      { tr: 'Tekili “عَصْرٌ” — İkindi vakitleri', fr: 'Singulier « عَصْرٌ » — Après-midis' },
      { tr: 'Tekili “عِصْمَةٌ” — Korunmalar', fr: 'Singulier « عِصْمَةٌ » — Protections' },
    ],
    correctIndex: 0,
    explanation: {
      tr: '“ع ص ا” kökünden gelen “الْعِصِيّ”, “عَصَا” (asa, değnek) kelimesinin kırık çoğuludur; uzun kıyamda yorulan cemaatin dayandığı değnekleri ifade eder.',
      fr: 'Pluriel brisé de ‘asâ (bâton), ce mot illustre la durée exceptionnelle des stations debout durant le qiyâm.',
    },
    sourceRef: 'Hadis 4 · Sözlük (الْعِصِيّ)',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-4' },
  },
  {
    id: 'q-lg-5',
    category: 'lugat-sarf',
    difficulty: 'temel',
    arabicCue: 'بِالْفَلَاحِ',
    question: {
      tr: '7. hadiste geçen “نَسْتَعْجِلُ الْخَدَمَ بِالطَّعَامِ” ve klasik hâşiyelerde anılan “الْفَلَاح” kelimesi bu bağlamda neyi ifade eder?',
      fr: 'Dans le contexte du Hadith 7 et de ses gloses classiques, que signifie le terme « الْفَلَاح » (al-falâh) ?',
    },
    options: [
      { tr: 'Sahur yemeği (fecirden önce yenen yemek)', fr: 'Le repas du suhûr pris avant l’aube' },
      { tr: 'Çiftçilik ve tarım', fr: 'L’agriculture' },
      { tr: 'Cuma hutbesi', fr: 'Le sermon du vendredi' },
      { tr: 'Bayram namazı', fr: 'La prière de l’Aïd' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Klasik sözlükçüler (İbn Fâris, Cevherî) “felâh” kelimesinin bir anlamının da “sahur” olduğunu, çünkü orucun devamına (bekâ/kurtuluş) vesile olduğunu kaydeder.',
      fr: 'Les lexicographes classiques (Ibn Fâris, al-Jawharî) précisent qu’al-falâh désigne aussi le suhûr, gage de force pour le jeûne.',
    },
    sourceRef: 'Hadis 7 · Klasik Hâşiye (İbn Fâris / Cevherî)',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-7' },
  },
  {
    id: 'q-lg-6',
    category: 'lugat-sarf',
    difficulty: 'orta',
    arabicCue: 'فِي فُرُوعِ الْفَجْرِ',
    question: {
      tr: '4. hadiste geçen “فِي فُرُوعِ الْفَجْرِ” (fî furû‘i’l-fecr) ifadesi hangi vakti tasvir eder?',
      fr: 'Quel moment précis décrit l’expression « فِي فُرُوعِ الْفَجْرِ » (fî furû‘ al-fajr) dans le Hadith 4 ?',
    },
    options: [
      { tr: 'Fecrin/tan yerinin ağarmaya başladığı ilk anlar', fr: 'Les toutes premières lueurs de l’aube' },
      { tr: 'Güneşin tepe noktasına ulaştığı öğle vakti', fr: 'Le zénith de midi' },
      { tr: 'Yatsı namazından hemen sonraki ilk saat', fr: 'La première heure après ‘ishâ’' },
      { tr: 'Güneşin batış anı', fr: 'Le coucher du soleil' },
    ],
    correctIndex: 0,
    explanation: {
      tr: '“Furû‘u’l-fecr”, fecrin doğuşunun başlangıcı anlamına gelir; cemaatin namazdan tan yeri ağarmaya yakın ayrıldığını gösterir.',
      fr: 'Furû‘ al-fajr évoque l’apparition initiale de l’aube, soulignant que la prière durait presque toute la nuit.',
    },
    sourceRef: 'Hadis 4 · Kelime Analizi',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-4' },
  },
  {
    id: 'q-lg-7',
    category: 'lugat-sarf',
    difficulty: 'orta',
    arabicCue: 'نَسْتَعْجِلُ الْخَدَمَ',
    question: {
      tr: '7. hadisteki “نَسْتَعْجِلُ” fiilinin babı ve anlam nüansı nedir?',
      fr: 'Quelle est la forme verbale et la nuance de sens de « نَسْتَعْجِلُ » dans le Hadith 7 ?',
    },
    options: [
      { tr: 'İstif‘âl babı (X. bab) — “Acele etmelerini isterdik / çabuklaştırırdık”', fr: 'Forme X (Istif‘âl) — « Nous pressions / demandions de se hâter »' },
      { tr: 'İnfi‘âl babı (VII. bab) — “Kendiliğinden yavaşlardık”', fr: 'Forme VII — « Nous ralentissions »' },
      { tr: 'Mufâ‘ale babı (III. bab) — “Savaşırdık”', fr: 'Forme III — « Nous combattions »' },
      { tr: 'Sülâsî meçhul — “Unutulurduk”', fr: 'Passif forme I — « Nous étions oubliés »' },
    ],
    correctIndex: 0,
    explanation: {
      tr: '“ع ج ل” kökünden X. bab (İstif‘âl) talep bildirir: “hizmetçilerden sahur yemeğini acele getirmelerini isterdik”.',
      fr: 'La forme X sur la racine ع ج ل exprime la demande : presser les serviteurs d’apporter le suhûr avant le lever de l’aube.',
    },
    sourceRef: 'Hadis 7 · Sarf Analizi',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-7' },
  },
  {
    id: 'q-lg-8',
    category: 'lugat-sarf',
    difficulty: 'ileri',
    arabicCue: 'عَبْدٌ مُدَبَّرٌ',
    question: {
      tr: '8. hadis bağlamında Zekvân için kullanılan fıkıh terimi “مُدَبَّرٌ” (müdebber / tedbîr) ne anlama gelir?',
      fr: 'Que signifie le terme juridique « مُدَبَّرٌ » (mudabbar / tadbîr) appliqué à Dhakwân dans les gloses du Hadith 8 ?',
    },
    options: [
      { tr: 'Efendisinin vefatına bağlı olarak hürriyetine kavuşması kararlaştırılmış köle', fr: 'Esclave dont l’affranchissement est lié au décès de son maître' },
      { tr: 'Savaşta esir alınmış yeni asker', fr: 'Nouveau prisonnier de guerre' },
      { tr: 'Ücretli mescid görevlisi', fr: 'Employé salarié de la mosquée' },
      { tr: 'Yolcu ve misafir statüsündeki kişi', fr: 'Voyageur de passage' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'İslâm hukukunda “tedbîr”, kişinin kölesine “ben ölünce hürsün” diyerek azadını ölüm sonrasına (dübür-i hayat) bağlamasıdır; Hz. Âişe Zekvân’ı müdebber kılmıştır.',
      fr: 'Le tadbîr lie l’affranchissement au décès du maître (« après ma mort, tu seras libre ») ; tel était le statut de Dhakwân auprès de ‘Â’isha.',
    },
    sourceRef: 'Hadis 8 · Sözlük (التَّدْبِيرُ) & Feyyûmî',
    deepLink: { route: 'sozluk', targetItemId: 'dia-tedbir' },
  },
  {
    id: 'q-lg-9',
    category: 'lugat-sarf',
    difficulty: 'ileri',
    arabicCue: 'فَرَغْبَةً فِيهِ ... مِنْ غَيْرِ أَنْ يَأْمُرَهُمْ بِعَزِيمَةٍ',
    question: {
      tr: '2. hadiste geçen “مِنْ غَيْرِ أَنْ يَأْمُرَهُمْ بِعَزِيمَةٍ” cümlesindeki “عَزِيمَة” kelimesi fıkıh/hadis dilinde neyi anlatır?',
      fr: 'Dans le Hadith 2, que signifie « بِعَزِيمَةٍ » dans « sans leur en faire une injonction impérative » ?',
    },
    options: [
      { tr: 'Kesin, bağlayıcı ve farz kılıcı emir', fr: 'Ordre ferme, impératif et contraignant' },
      { tr: 'Yolculuk hazırlığı', fr: 'Préparation d’un voyage' },
      { tr: 'Gece yarısı duası', fr: 'Invocation de minuit' },
      { tr: 'Cemaatin dağılması', fr: 'Dispersion de l’assemblée' },
    ],
    correctIndex: 0,
    explanation: {
      tr: '“Azîmet”, kesin kararlılık ve bağlayıcı yükümlülük demektir; Hz. Peygamber Ramazan kıyâmını farz derecesinde dayatmadan nafile/müstehap olarak teşvik etmiştir.',
      fr: '‘Azîma désigne ici une injonction obligatoire ; le Prophète incita au qiyâm sur le mode de la recommandation (targhîb), non de l’obligation.',
    },
    sourceRef: 'Hadis 2 · Kelime Analizi',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-2' },
  },

  // =========================================================================
  // 6. KLASİK HÂŞİYELER & İLİM COĞRAFYASI (9 SORU)
  // =========================================================================
  {
    id: 'q-sc-1',
    category: 'serh-cografya',
    difficulty: 'orta',
    question: {
      tr: '2. hadisteki “إِيمَانًا وَاحْتِسَابًا” ifadesini “faziletini tasdik ederek ve riyâsız biçimde yalnızca Allah rızasını umarak” diye şerh eden klasik müellif kimdir?',
      fr: 'Quel commentateur classique glose « îmânan wa-htisâban » (Hadith 2) par « en croyant à sa vertu et en recherchant la face de Dieu sans ostentation » ?',
    },
    options: [
      { tr: 'İmam en-Nevevî', fr: 'Imam an-Nawawî' },
      { tr: 'el-Feyyûmî', fr: 'al-Fayyûmî' },
      { tr: 'İbn Fâris', fr: 'Ibn Fâris' },
      { tr: 'Esed b. Furât', fr: 'Asad b. al-Furât' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Hadis 2’nin klasik hâşiyesinde İmam en-Nevevî, “îmânen”i hak olduğunu tasdik, “ihtisâben”i ise gösterişten uzak ihlâs niyeti olarak açıklar.',
      fr: 'Dans la glose du Hadith 2, an-Nawawî définit îmânan comme l’assentiment sincère et ihtisâban comme la pureté d’intention exempte d’ostentation.',
    },
    sourceRef: 'Kitâbü’s-Salât fî Ramadân · Hadis 2 Hâşiyesi (Nevevî)',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-2' },
  },
  {
    id: 'q-sc-2',
    category: 'serh-cografya',
    difficulty: 'orta',
    question: {
      tr: '3. hadiste Hz. Ömer’in “نِعْمَتِ الْبِدْعَةُ هَذِهِ” sözünü “şer‘î bid‘at değil, önceki hâle göre yenilik anlamında lügavî bid‘at” şeklinde tahlil eden şârih kimdir?',
      fr: 'Quel grand commentateur distingue le sens lexical (lughawî) du sens juridique (shar‘î) dans le mot « bid‘a » prononcé par ‘Umar (Hadith 3) ?',
    },
    options: [
      { tr: 'İbn Hacer el-Askalânî', fr: 'Ibn Hajar al-‘Asqalânî' },
      { tr: 'İbnü’l-Kāsım', fr: 'Ibn al-Qâsim' },
      { tr: 'el-Cevherî', fr: 'al-Jawharî' },
      { tr: 'Süveyd b. Saîd', fr: 'Suwayd b. Sa‘îd' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'İbn Hacer, terâvihin cemaatle kılınmasının Hz. Peygamber’in ilk üç gecelik sünnetine dayandığını, Hz. Ömer’in sözünün lügavî anlamda “güzel bir ihya” olduğunu vurgular.',
      fr: 'Ibn Hajar montre que la congrégation repose sur le précédent prophétique des trois nuits et que le mot bid‘a est employé ici au sens lexical.',
    },
    sourceRef: 'Kitâbü’s-Salât fî Ramadân · Hadis 3 Hâşiyesi (İbn Hacer)',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-3' },
  },
  {
    id: 'q-sc-3',
    category: 'serh-cografya',
    difficulty: 'ileri',
    question: {
      tr: '3. hadis hâşiyesinde, gecenin sonundaki namazın evvelindekinden üstünlüğünü değerlendiren Endülüs/Mağrib ekolünün meşhur âlimi kimdir?',
      fr: 'Quel savant majeur du Maghreb/al-Andalus commente la supériorité de la prière de fin de nuit dans les gloses du Hadith 3 ?',
    },
    options: [
      { tr: 'Kādî İyâz (ö. 544/1149)', fr: 'al-Qâdî ‘Iyâd (m. 544/1149)' },
      { tr: 'Ebû Hanîfe', fr: 'Abû Hanîfa' },
      { tr: 'el-Feyyûmî', fr: 'al-Fayyûmî' },
      { tr: 'el-Ebherî', fr: 'al-Abharî' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Mâlikî hadis şârihi Kādî İyâz, uykudan uyanıp seher vaktinde kılınan teheccüdün nefis mücadelesi ve icâbet vakti bakımından üstünlüğüne dikkat çeker.',
      fr: 'al-Qâdî ‘Iyâd souligne le mérite du tahajjud après le sommeil, conjuguant effort spirituel et moment privilégié d’exaucement.',
    },
    sourceRef: 'Kitâbü’s-Salât fî Ramadân · Hadis 3 Hâşiyesi (Kādî İyâz)',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-3' },
  },
  {
    id: 'q-sc-4',
    category: 'serh-cografya',
    difficulty: 'orta',
    question: {
      tr: '8. hadis hâşiyesinde *el-Misbâhu’l-Münîr* adlı lugat/fıkıh sözlüğüyle “tedbîr” kavramını açıklayan müellif kimdir?',
      fr: 'Quel lexicographe auteur d’al-Misbâh al-Munîr est cité dans les gloses du Hadith 8 pour définir le tadbîr ?',
    },
    options: [
      { tr: 'Ahmed b. Muhammed el-Feyyûmî', fr: 'Ahmad b. Muhammad al-Fayyûmî' },
      { tr: 'İmam en-Nevevî', fr: 'Imam an-Nawawî' },
      { tr: 'Ebü’l-Velîd el-Bâcî', fr: 'Abû l-Walîd al-Bâjî' },
      { tr: 'Şah Veliyyullah ed-Dihlevî', fr: 'Shâh Walî Allâh ad-Dihlawî' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'el-Feyyûmî, *el-Misbâhu’l-Münîr*’de fıkıh metinlerindeki terimleri açıklar ve tedbîri “kölenin azadını efendisinin ölüm sonrasına bağlamak” diye tanımlar.',
      fr: 'al-Fayyûmî définit le tadbîr dans al-Misbâh al-Munîr comme le rattachement de l’affranchissement au décès du maître.',
    },
    sourceRef: 'Kitâbü’s-Salât fî Ramadân · Hadis 8 Hâşiyesi (Feyyûmî)',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-8' },
  },
  {
    id: 'q-sc-5',
    category: 'serh-cografya',
    difficulty: 'temel',
    question: {
      tr: 'Tarihî Harita’da Mâlikî mezhebinin ve el-Muvatta’ın Endülüs’te resmî fıkıh geleneğine dönüşmesinde en büyük paya sahip şehir hangisidir?',
      fr: 'Sur la Carte Historique, quelle ville d’al-Andalus fut le foyer principal de l’officialisation du mâlikisme et d’al-Muwatta’ ?',
    },
    options: [
      { tr: 'Kurtuba (Endülüs)', fr: 'Cordoue (al-Andalus)' },
      { tr: 'Bağdat (Irak)', fr: 'Bagdad (Irak)' },
      { tr: 'San‘â (Yemen)', fr: 'Sanaa (Yémen)' },
      { tr: 'Şam (Dımaşk)', fr: 'Damas (Syrie)' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Ziyâd b. Abdurrahman Şebtûn ve Yahyâ b. Yahyâ el-Leysî vasıtasıyla Mâlikî mezhebi Kurtuba merkezli Endülüs’te kurumsallaşmış, İbn Abdülber ve Bâcî gibi dev şârihler yetiştirmiştir.',
      fr: 'Grâce à Shabtûn et Yahyâ al-Laythî, Cordoue devint le pôle andalou du mâlikisme, produisant Ibn ‘Abd al-Barr et al-Bâjî.',
    },
    sourceRef: 'Tarihî Harita · Endülüs (Kurtuba)',
    deepLink: { route: 'harita', targetItemId: 'endulus' },
  },
  {
    id: 'q-sc-6',
    category: 'serh-cografya',
    difficulty: 'orta',
    question: {
      tr: 'Kuzey Afrika’da (İfrîkıye) Mâlikî fıkhının ana merkezi hâline gelen, Esed b. Furât ve Sahnûn (*el-Müdevvene*) ile özdeşleşen tarihî ilim şehri hangisidir?',
      fr: 'Quelle métropole savante d’Afrique du Nord est associée à Asad b. al-Furât et Sahnûn (al-Mudawwana) ?',
    },
    options: [
      { tr: 'Kayrevan (Kuzey Afrika / Tunus)', fr: 'Kairouan (Afrique du Nord / Tunisie)' },
      { tr: 'Mekke (Hicaz)', fr: 'La Mecque (Hedjaz)' },
      { tr: 'Kûfe (Irak)', fr: 'Kûfa (Irak)' },
      { tr: 'Basra (Irak)', fr: 'Bassora (Irak)' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Kayrevan, Esed b. Furât’ın *el-Esediyye*’si ve Sahnûn’un *el-Müdevvene*’si sayesinde Mağrib’in en köklü Mâlikî ilim merkezi olmuştur.',
      fr: 'Kairouan s’est imposée comme la capitale intellectuelle du mâlikisme maghrébin avec al-Asadiyya et al-Mudawwana.',
    },
    sourceRef: 'Tarihî Harita · Kayrevan',
    deepLink: { route: 'harita', targetItemId: 'kayrevan' },
  },
  {
    id: 'q-sc-7',
    category: 'serh-cografya',
    difficulty: 'orta',
    question: {
      tr: 'İbn Vehb, İbnü’l-Kāsım ve Eşheb b. Abdülazîz gibi İmam Mâlik’in en seçkin talebelerinin fıkıh mirasını taşıdığı ve *el-Müdevvene*’nin temelini oluşturduğu bölge hangisidir?',
      fr: 'Quelle région a accueilli les grands disciples d’Imam Mâlik — Ibn Wahb, Ibn al-Qâsim et Ashhab — qui ont forgé la base d’al-Mudawwana ?',
    },
    options: [
      { tr: 'Mısır (Fustat)', fr: 'Égypte (Fustat)' },
      { tr: 'Yemen', fr: 'Yémen' },
      { tr: 'Bağdat', fr: 'Bagdad' },
      { tr: 'Şam', fr: 'Damas' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Mısır ekolü (İbn Vehb, İbnü’l-Kāsım, Eşheb), İmam Mâlik’in fıkhî görüşlerini sistemleştirerek hem Doğu’ya hem Mağrib’e köprü olmuştur.',
      fr: 'L’école égyptienne (Fustat) a systématisé les enseignements de Mâlik et servi de pont vers tout le Maghreb.',
    },
    sourceRef: 'Tarihî Harita · Mısır (Fustat)',
    deepLink: { route: 'harita', targetItemId: 'misir' },
  },
  {
    id: 'q-sc-8',
    category: 'serh-cografya',
    difficulty: 'temel',
    question: {
      tr: 'İmam Mâlik hayatı boyunca Medine’den yalnızca hangi ibadet için ayrılmıştır?',
      fr: 'Pour quel unique motif l’Imam Mâlik a-t-il quitté Médine au cours de sa vie ?',
    },
    options: [
      { tr: 'Hac ibadeti için Mekke’ye gitmek üzere', fr: 'Pour accomplir le pèlerinage (Hajj) à La Mecque' },
      { tr: 'Endülüs’te ders vermek üzere', fr: 'Pour enseigner en al-Andalus' },
      { tr: 'Bağdat’ta kadılık yapmak üzere', fr: 'Pour exercer la judicature à Bagdad' },
      { tr: 'Şam’da ticaret kervanına katılmak üzere', fr: 'Pour accompagner une caravane commerciale à Damas' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'İmam Mâlik, Hz. Peygamber’in şehrine duyduğu derin hürmet sebebiyle Hac dışındaki hiçbir amaçla Medine’den ayrılmamış, halifelerin Bağdat davetlerini nazikçe geri çevirmiştir.',
      fr: 'Par profonde vénération pour la Cité du Prophète, Mâlik ne quitta Médine que pour le Hajj à La Mecque.',
    },
    sourceRef: 'Tarihî Harita · Medine & Mekke',
    deepLink: { route: 'harita', targetItemId: 'mekke' },
  },
  {
    id: 'q-sc-9',
    category: 'serh-cografya',
    difficulty: 'ileri',
    question: {
      tr: 'el-Muvatta’ın Bağdat/Irak hattındaki etkisinin en önemli temsilcisi ve Şam’daki muasırı (el-Evzâî ile ilmî irtibat) bağlamında Irak’taki en bilinen Muvatta’ râvisi kimdir?',
      fr: 'Sur l’axe Bagdad/Irak de la Carte Historique, quel grand juriste est le principal transmetteur irakien d’al-Muwatta’ ?',
    },
    options: [
      { tr: 'Muhammed b. Hasan eş-Şeybânî', fr: 'Muhammad b. al-Hasan ash-Shaybânî' },
      { tr: 'Yahyâ b. Yahyâ el-Leysî', fr: 'Yahyâ b. Yahyâ al-Laythî' },
      { tr: 'Sahnûn b. Saîd', fr: 'Sahnûn b. Sa‘îd' },
      { tr: 'İbn Abdülber', fr: 'Ibn ‘Abd al-Barr' },
    ],
    correctIndex: 0,
    explanation: {
      tr: 'Irak’ta Ebû Hanîfe’nin öğrencisi İmam Muhammed eş-Şeybânî’nin rivayeti Hicaz ehl-i hadîs geleneği ile Irak ehl-i re’y fıkhı arasında benzersiz bir diyalog köprüsü kurmuştur.',
      fr: 'En Irak, la recension de Muhammad ash-Shaybânî établit un dialogue fécond entre l’école du hadith de Médine et l’école du ra’y irakienne.',
    },
    sourceRef: 'Tarihî Harita · Bağdat / Irak',
    deepLink: { route: 'harita', targetItemId: 'bagdat' },
  },
];

export const FLASHCARD_DECKS: FlashcardDeckMeta[] = [
  {
    id: 'lugat',
    title: { tr: 'Arapça Lügat & Kökler', fr: 'Lexique Arabe & Racines' },
    subtitle: { tr: 'Hadis metinlerindeki anahtar kelimeler (10 kart)', fr: 'Mots clés des 8 hadiths (10 cartes)' },
  },
  {
    id: 'hadis',
    title: { tr: '8 Hadis & Fıkhî Hükümler', fr: 'Les 8 Hadiths & Fiqh' },
    subtitle: { tr: 'Kitâbü’s-Salât fî Ramadân özeti (8 kart)', fr: 'Synthèse du Livre de la Prière en Ramadan (8 cartes)' },
  },
  {
    id: 'imam-malik',
    title: { tr: 'İmam Mâlik & Usûl-i Fıkıh', fr: 'Imam Mâlik & Usûl al-Fiqh' },
    subtitle: { tr: 'Biyografi ve metodoloji esasları (7 kart)', fr: 'Biographie et fondements juridiques (7 cartes)' },
  },
  {
    id: 'muvatta',
    title: { tr: 'el-Muvatta’ & Şerh Geleneği', fr: 'al-Muwatta’ & Commentaires' },
    subtitle: { tr: 'İstatistikler, 9 nüsha ve şerhler (7 kart)', fr: 'Statistiques, 9 recensions et gloses (7 cartes)' },
  },
];

export const SRS_FLASHCARDS: SrsFlashcard[] = [
  // ---- DECK 1: LÜGAT & KÖKLER (10) ----
  {
    id: 'fc-lug-1',
    deck: 'lugat',
    arabic: 'أَوْزَاعٌ مُتَفَرِّقُونَ',
    transliteration: 'evzâ‘un müteferrikūn',
    frontPrompt: {
      tr: 'Hadis 3’te Mescid-i Nebevî’deki cemaatin ilk hâlini tasvir eden bu ibare ne anlama gelir?',
      fr: 'Que décrit cette expression du Hadith 3 sur l’état initial des fidèles dans la mosquée ?',
    },
    backAnswer: {
      tr: 'Dağınık gruplar, ayrı ayrı küçük cemaatler hâlinde',
      fr: 'En groupes dispersés, en petits rassemblements séparés',
    },
    backDetail: {
      tr: '“أَوْزَاع” (kök: و ز ع) tekili “وَزَع” olan kırık çoğuldur; Hz. Ömer bu dağınıklığı Übey b. Kâ‘b arkasında birleştirmiştir.',
      fr: 'Awzâ‘ (racine و ز ع) est le pluriel brisé de waza‘ ; ‘Umar unifia ces groupes derrière Ubayy b. Ka‘b.',
    },
    rootOrRef: 'Kök: و ز ع · Hadis 3',
    deepLink: { route: 'sozluk', targetItemId: 'lex-اوزاع' },
  },
  {
    id: 'fc-lug-2',
    deck: 'lugat',
    arabic: 'إِيمَانًا وَاحْتِسَابًا',
    transliteration: 'îmânen ve’htisâben',
    frontPrompt: {
      tr: 'Hadis 2’deki bu iki masdarın anlamı ve nahiv (irap) görevi nedir?',
      fr: 'Quels sont le sens et la fonction syntaxique de ces deux masdars dans le Hadith 2 ?',
    },
    backAnswer: {
      tr: 'İnanarak ve sevabını yalnızca Allah’tan umarak (Mef‘ûlün li-eclih)',
      fr: 'Avec foi sincère et en escomptant la récompense divine (Maf‘ûl li-ajlih)',
    },
    backDetail: {
      tr: 'İmam en-Nevevî: “îmânen” hak ve faziletini tasdik; “ihtisâben” riyâsız ihlâs niyetiyle amel etmektir.',
      fr: 'An-Nawawî explique : îmânan = assentiment sincère ; ihtisâban = intention pure sans ostentation.',
    },
    rootOrRef: 'Kökler: أ م ن · ح س ب · Hadis 2',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-2' },
  },
  {
    id: 'fc-lug-3',
    deck: 'lugat',
    arabic: 'خَشِيتُ أَنْ تُفْرَضَ عَلَيْكُمْ',
    transliteration: 'haşîtü en tüfrada aleyküm',
    frontPrompt: {
      tr: 'Hadis 1’de Hz. Peygamber’in üçüncü/dördüncü gece mescide çıkmama gerekçesi nedir?',
      fr: 'Quelle raison le Prophète donne-t-il dans cette phrase du Hadith 1 ?',
    },
    backAnswer: {
      tr: '“Üzerinize farz kılınmasından korktum”',
      fr: '« J’ai craint qu’elle ne vous soit prescrite comme obligation »',
    },
    backDetail: {
      tr: '“تُفْرَضَ” fiili ف ر ض kökünden sülâsî mücerred meçhul muzâridir; “أَنْ” edatıyla mansûbtur.',
      fr: 'Tufrada est un inaccompli passif de forme I (racine ف ر ض) au subjonctif après « أَنْ ».',
    },
    rootOrRef: 'Kök: ف ر ض · Hadis 1',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-1' },
  },
  {
    id: 'fc-lug-4',
    deck: 'lugat',
    arabic: 'نِعْمَتِ الْبِدْعَةُ هَذِهِ',
    transliteration: 'ni‘meti’l-bid‘atü hâzihî',
    frontPrompt: {
      tr: 'Hz. Ömer’in (r.a.) Hadis 3’teki bu meşhur sözü ve İbn Hacer’in yorumu nedir?',
      fr: 'Que signifie cette célèbre parole de ‘Umar (Hadith 3) et comment Ibn Hajar l’explique-t-il ?',
    },
    backAnswer: {
      tr: '“Bu ne güzel bid‘attir!” — Şer‘î değil lügavî anlamda güzel bir ihya',
      fr: '« Quelle excellente innovation ! » — Au sens lexical, fondée sur la Sunna',
    },
    backDetail: {
      tr: 'İbn Hacer, terâvihin cemaatle kılınmasının nebevî aslı bulunduğunu, “bid‘at”in önceki dağınık duruma nispetle lügavî kullanıldığını belirtir.',
      fr: 'Ibn Hajar rappelle que le précédent prophétique existe et que bid‘a est employé ici au sens littéral.',
    },
    rootOrRef: 'Kök: ب د ع · Hadis 3',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-3' },
  },
  {
    id: 'fc-lug-5',
    deck: 'lugat',
    arabic: 'نَعْتَمِدُ عَلَى الْعِصِيِّ',
    transliteration: 'na‘temidü ale’l-ısiyyi',
    frontPrompt: {
      tr: 'Hadis 4’te cemaatin uzun kıyam sırasında yaptığı bu fiil ne demektir?',
      fr: 'Que signifie cette expression du Hadith 4 durant les longues stations debout ?',
    },
    backAnswer: {
      tr: '“Asalara / değneklere dayanırdık”',
      fr: '« Nous nous appuyions sur des bâtons »',
    },
    backDetail: {
      tr: '“الْعِصِيّ” kelimesi “عَصًا” (asa) kelimesinin çoğuludur (kök: ع ص ا); “نَعْتَمِدُ” İfti‘âl babından dayanmak demektir.',
      fr: 'Al-‘isiyy est le pluriel de ‘asâ (bâton) ; na‘tamidu (forme VIII) signifie s’appuyer par fatigue.',
    },
    rootOrRef: 'Kökler: ع م د · ع ص ا · Hadis 4',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-4' },
  },
  {
    id: 'fc-lug-6',
    deck: 'lugat',
    arabic: 'فِي فُرُوعِ الْفَجْرِ',
    transliteration: 'fî furû‘i’l-fecr',
    frontPrompt: {
      tr: 'Hadis 4’te namazdan ayrılma zamanını belirten bu ibare neyi ifade eder?',
      fr: 'Quel moment du matin cette expression du Hadith 4 désigne-t-elle ?',
    },
    backAnswer: {
      tr: 'Fecrin ağarmaya başladığı ilk anlarda (tan yeri sökerken)',
      fr: 'Aux toutes premières lueurs de l’aube',
    },
    backDetail: {
      tr: '“فُرُوع” (kök: ف ر ع) burada fecrin başlangıcı ve ilk ışıkları anlamındadır.',
      fr: 'Furû‘ (racine ف ر ع) renvoie ici au point de départ et aux premiers éclats de l’aube.',
    },
    rootOrRef: 'Kök: ف ر ع · Hadis 4',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-4' },
  },
  {
    id: 'fc-lug-7',
    deck: 'lugat',
    arabic: 'الْمِئِينَ',
    transliteration: 'el-mi’în',
    frontPrompt: {
      tr: 'Hadis 4’te imamın okuduğu belirtilen “el-Mi’în” sûreleri hangileridir?',
      fr: 'Que désignent les sourates « al-Mi’în » récitées dans le Hadith 4 ?',
    },
    backAnswer: {
      tr: 'Âyet sayısı yüz civarında olan uzun sûreler (Tıvâl’den sonra gelenler)',
      fr: 'Les longues sourates comptant environ une centaine de versets',
    },
    backDetail: {
      tr: '“مِائَة” (yüz) kelimesinin çoğulu olan “el-mi’în”, Yûnus, Hûd, Yûsuf gibi ~100 âyetli sûreleri ifade eder.',
      fr: 'Pluriel de mi’a (cent), le terme désigne les sourates d’environ cent versets (Yûnus, Hûd, Yûsuf...).',
    },
    rootOrRef: 'Kök: م أ ي · Hadis 4',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-4' },
  },
  {
    id: 'fc-lug-8',
    deck: 'lugat',
    arabic: 'الْفَلَاحُ · نَسْتَعْجِلُ الْخَدَمَ',
    transliteration: 'el-felâh · nesta‘cilü’l-hadem',
    frontPrompt: {
      tr: 'Hadis 7 bağlamında “el-felâh” ve “nesta‘cilü’l-hadem” ne anlama gelir?',
      fr: 'Que signifient « al-falâh » et « nasta‘jilu l-khadam » dans le contexte du Hadith 7 ?',
    },
    backAnswer: {
      tr: 'Sahur yemeği · “Hizmetçileri (yemek için) acele ettirirdik”',
      fr: 'Le repas du suhûr · « Nous pressions les serviteurs (d’apporter le repas) »',
    },
    backDetail: {
      tr: 'İbn Fâris ve Cevherî, “felâh”ın sahur anlamını aktarır; namazın fecre çok yakın bitmesi sebebiyle sahur telaşı yaşanırdı.',
      fr: 'Ibn Fâris et al-Jawharî relèvent le sens de suhûr pour falâh ; la prière s’achevait tout près de l’aube.',
    },
    rootOrRef: 'Kökler: ف ل ح · ع ج ل · Hadis 7',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-7' },
  },
  {
    id: 'fc-lug-9',
    deck: 'lugat',
    arabic: 'التَّدْبِيرُ · عَبْدٌ مُدَبَّرٌ',
    transliteration: 'et-tedbîr · abdun müdebber',
    frontPrompt: {
      tr: 'Hadis 8’deki Zekvân’ın hukukî statüsü olan “müdebber” (tedbîr) ne demektir?',
      fr: 'Que signifie le statut juridique de « mudabbar » (tadbîr) attribué à Dhakwân (Hadith 8) ?',
    },
    backAnswer: {
      tr: 'Efendisinin vefatıyla kendiliğinden hür olacak köle',
      fr: 'Esclave affranchi automatiquement au décès de son maître',
    },
    backDetail: {
      tr: 'el-Feyyûmî (*el-Misbâhu’l-Münîr*): Azadın hayatın sonuna (dübür) bağlanmasıdır; Hz. Âişe Zekvân’ı müdebber kılmıştır.',
      fr: 'al-Fayyûmî (al-Misbâh al-Munîr) : l’affranchissement rattaché à l’issue (dubur) de la vie du maître.',
    },
    rootOrRef: 'Kök: د ب ر · Hadis 8',
    deepLink: { route: 'sozluk', targetItemId: 'dia-tedbir' },
  },
  {
    id: 'fc-lug-10',
    deck: 'lugat',
    arabic: 'بِالتَّرْغِيبِ مِنْ غَيْرِ عَزِيمَةٍ',
    transliteration: 'bi’t-tergîb min gayri azîmetin',
    frontPrompt: {
      tr: '1. Bab başlığındaki “Tergîb” ve Hadis 2’deki “min gayri azîmetin” neyi vurgular?',
      fr: 'Que soulignent « Targhîb » (Chap. 1) et « min ghayri ‘azîma » (Hadith 2) ?',
    },
    backAnswer: {
      tr: 'Farz kılıcı kesin emir olmadan gönüllü teşvik ve özendirme',
      fr: 'Incitation bienveillante sans injonction obligatoire contraignante',
    },
    backDetail: {
      tr: 'Ramazan gecesi namazının (terâvih) farz değil, müekked sünnet/nafile olduğunu gösteren temel teşrî ilkesidir.',
      fr: 'Fondement normatif établissant que le qiyâm de Ramadan est une sunna recommandée et non une obligation.',
    },
    rootOrRef: 'Kökler: ر غ ب · ع ز م · Bab 1',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-2' },
  },

  // ---- DECK 2: 8 HADİS & FIKIH (8) ----
  {
    id: 'fc-hd-1',
    deck: 'hadis',
    arabic: 'الْحَدِيثُ ١ — خَشْيَةُ الْافْتِرَاضِ',
    frontPrompt: {
      tr: 'Hadis 1’in (Hz. Âişe rivayeti) ana olayı ve fıkhî hükmü nedir?',
      fr: 'Quel est l’événement central et l’enseignement juridique du Hadith 1 (‘Â’isha) ?',
    },
    backAnswer: {
      tr: 'Hz. Peygamber 3 gece cemaatle kılmış, farz kılınma korkusuyla 4. gece çıkmamıştır.',
      fr: 'Le Prophète a prié 3 nuits en groupe puis s’est abstenu la 4e par crainte d’une obligation.',
    },
    backDetail: {
      tr: 'İsnad: Mâlik ← İbn Şihâb ← Urve ← Hz. Âişe (r.anhâ). Terâvihin sünnet oluşunun temel delilidir.',
      fr: 'Isnâd : Mâlik ← az-Zuhrî ← ‘Urwa ← ‘Â’isha. Preuve fondamentale du caractère non obligatoire des tarâwîh.',
    },
    rootOrRef: 'Bab 1 · Hadis 1',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-1' },
  },
  {
    id: 'fc-hd-2',
    deck: 'hadis',
    arabic: 'الْحَدِيثُ ٢ — إِيمَانًا وَاحْتِسَابًا',
    frontPrompt: {
      tr: 'Hadis 2’nin (Ebû Hüreyre rivayeti) temel müjdesi ve tarihî tespiti nedir?',
      fr: 'Quelle est la promesse spirituelle et la précision historique du Hadith 2 (Abû Hurayra) ?',
    },
    backAnswer: {
      tr: 'İman ve ihlâsla Ramazan’ı ihya edenin geçmiş günahları bağışlanır; uygulama Hz. Ömer’in ilk dönemine dek münferit sürdü.',
      fr: 'Pardon des péchés passés ; la prière resta individuelle jusqu’au début du califat de ‘Umar.',
    },
    backDetail: {
      tr: 'İsnad: Mâlik ← İbn Şihâb ← Ebû Seleme b. Abdurrahman ← Ebû Hüreyre (r.a.).',
      fr: 'Isnâd : Mâlik ← az-Zuhrî ← Abû Salama b. ‘Abd ar-Rahmân ← Abû Hurayra.',
    },
    rootOrRef: 'Bab 1 · Hadis 2',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-2' },
  },
  {
    id: 'fc-hd-3',
    deck: 'hadis',
    arabic: 'الْحَدِيثُ ٣ — جَمْعُ عُمَرَ النَّاسَ',
    frontPrompt: {
      tr: 'Hadis 3’te Hz. Ömer (r.a.) mescidde hangi kurumsal düzenlemeyi yapmıştır?',
      fr: 'Quelle réorganisation liturgique ‘Umar b. al-Khattâb opère-t-il dans le Hadith 3 ?',
    },
    backAnswer: {
      tr: 'Dağınık grupları Übey b. Kâ‘b arkasında tek cemaatte toplamış ve seher vaktinin faziletini hatırlatmıştır.',
      fr: 'Il unifie les fidèles derrière Ubayy b. Ka‘b et rappelle la supériorité du dernier tiers de la nuit.',
    },
    backDetail: {
      tr: 'İsnad: Mâlik ← İbn Şihâb ← Urve ← Abdurrahman b. Abd el-Kārî. “Ni‘meti’l-bid‘atü hâzihî” sözü burada geçer.',
      fr: 'Isnâd : Mâlik ← az-Zuhrî ← ‘Urwa ← ‘Abd ar-Rahmân b. ‘Abd al-Qârî.',
    },
    rootOrRef: 'Bab 2 · Hadis 3',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-3' },
  },
  {
    id: 'fc-hd-4',
    deck: 'hadis',
    arabic: 'الْحَدِيثُ ٤ — إِحْدَى عَشْرَةَ رَكْعَةً',
    frontPrompt: {
      tr: 'Hadis 4’te (Sâib b. Yezîd) rekât sayısı, imamlar ve kıraat uzunluğu nasıl aktarılır?',
      fr: 'Que rapporte as-Sâ’ib b. Yazîd (Hadith 4) sur le nombre de rak‘ât, les imams et la durée ?',
    },
    backAnswer: {
      tr: 'Übey b. Kâ‘b ve Temîm ed-Dârî 11 rekât kıldırır, mi’în sûrelerini okur, cemaat asalara dayanırdı.',
      fr: 'Ubayy et Tamîm dirigeaient 11 rak‘ât avec de longues sourates ; les fidèles s’appuyaient sur des bâtons.',
    },
    backDetail: {
      tr: 'İsnad: Mâlik ← Muhammed b. Yûsuf ← Sâib b. Yezîd. Namaz tan yerinin ağarmasına dek sürerdi.',
      fr: 'Isnâd : Mâlik ← Muhammad b. Yûsuf ← as-Sâ’ib b. Yazîd.',
    },
    rootOrRef: 'Bab 2 · Hadis 4',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-4' },
  },
  {
    id: 'fc-hd-5',
    deck: 'hadis',
    arabic: 'الْحَدِيثُ ٥ — ثَلَاثٌ وَعِشْرُونَ رَكْعَةً',
    frontPrompt: {
      tr: 'Hadis 5’te Yezîd b. Rûmân’ın aktardığı rekât sayısı ve Hadis 4 ile uzlaştırılması nasıldır?',
      fr: 'Quel nombre de rak‘ât rapporte Yazîd b. Rûmân (Hadith 5) et comment le concilier avec le Hadith 4 ?',
    },
    backAnswer: {
      tr: '23 rekât (20 terâvih + 3 vitir); kıyam kısaldıkça rekât sayısı artırılarak gece ihyası dengelenmiştir.',
      fr: '23 rak‘ât (20 tarâwîh + 3 witr) ; on a raccourci les récitations tout en augmentant le nombre de rak‘ât.',
    },
    backDetail: {
      tr: 'İmam Mâlik her iki rivayeti (11 ve 23) peş peşe vererek Medine amelinin genişliğini gösterir.',
      fr: 'L’Imam Mâlik juxtapose les récits de 11 et 23 rak‘ât pour montrer l’amplitude de la pratique médinoise.',
    },
    rootOrRef: 'Bab 2 · Hadis 5',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-5' },
  },
  {
    id: 'fc-hd-6',
    deck: 'hadis',
    arabic: 'الْحَدِيثُ ٦ — سُورَةُ الْبَقَرَةِ وَالْقُنُوتُ',
    frontPrompt: {
      tr: 'Hadis 6’da (el-A‘rec) Bakara sûresinin kıraati ve kunut hakkında ne bildirilir?',
      fr: 'Que rapporte al-A‘raj (Hadith 6) sur la récitation d’al-Baqara et le qunût ?',
    },
    backAnswer: {
      tr: 'Bakara 8 rekâtta okunur, 12 rekâta yayılınca hafifletme sayılırdı; namazda kâfirlere lanet/kunut yapılırdı.',
      fr: 'Al-Baqara était récitée en 8 rak‘ât (12 étant jugé léger) et le qunût contre les mécréants était pratiqué.',
    },
    backDetail: {
      tr: 'İsnad: Mâlik ← Dâvûd b. el-Husayn ← el-A‘rec.',
      fr: 'Isnâd : Mâlik ← Dâwûd b. al-Husayn ← al-A‘raj.',
    },
    rootOrRef: 'Bab 2 · Hadis 6',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-6' },
  },
  {
    id: 'fc-hd-7',
    deck: 'hadis',
    arabic: 'الْحَدِيثُ ٧ — مَخَافَةَ الْفَجْرِ',
    frontPrompt: {
      tr: 'Hadis 7’de Ebû Bekir b. Muhammed b. Hazm’ın aktardığı sahur telaşı neyi belgelemektedir?',
      fr: 'De quoi témoigne la hâte du suhûr rapportée par Abû Bakr b. Hazm dans le Hadith 7 ?',
    },
    backAnswer: {
      tr: 'Fecir doğmasından korkarak hizmetçilerden sahur yemeğini acele getirmelerini isterlerdi.',
      fr: 'Ils pressaient les serviteurs d’apporter le repas du suhûr par crainte de l’arrivée imminente de l’aube.',
    },
    backDetail: {
      tr: 'Selefte Ramazan kıyamının gece boyunca neredeyse imsak vaktine kadar sürdüğünün canlı şahitliğidir.',
      fr: 'Témoignage vivant que la prière nocturne des pieux prédécesseurs durait presque jusqu’à l’imsâk.',
    },
    rootOrRef: 'Bab 2 · Hadis 7',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-7' },
  },
  {
    id: 'fc-hd-8',
    deck: 'hadis',
    arabic: 'الْحَدِيثُ ٨ — إِمَامَةُ ذَكْوَانَ مِنَ الْمُصْحَفِ',
    frontPrompt: {
      tr: 'Hadis 8’den çıkarılan iki önemli Mâlikî fıkıh hükmü nedir?',
      fr: 'Quels deux enseignements juridiques mâlikites découlent du Hadith 8 (Dhakwân & ‘Â’isha) ?',
    },
    backAnswer: {
      tr: '1) Nafile/terâvih namazında mushafa bakarak okumak caizdir; 2) Kölenin imameti sahihtir.',
      fr: '1) Lire sur un mushaf en prière surérogatoire est licite ; 2) L’imamat d’un esclave est valide.',
    },
    backDetail: {
      tr: 'Hz. Âişe’nin müdebber kölesi Zekvân Ramazan’da ona mushaftan okuyarak imamlık yapmıştır.',
      fr: 'Dhakwân, esclave mudabbar de ‘Â’isha, dirigeait sa prière de Ramadan en lisant sur un mushaf.',
    },
    rootOrRef: 'Bab 2 · Hadis 8',
    deepLink: { route: 'hadisler', targetItemId: 'hadis-8' },
  },

  // ---- DECK 3: İMAM MÂLİK & USÛL (7) ----
  {
    id: 'fc-im-1',
    deck: 'imam-malik',
    arabic: 'الإِمَامُ مَالِكُ بْنُ أَنَسٍ (٩٣–١٧٩ هـ)',
    frontPrompt: {
      tr: 'İmam Mâlik’in tam künyesi, yaşam tarihleri ve lakabı nedir?',
      fr: 'Quels sont la kunya, les dates de vie et le titre honorifique de l’Imam Mâlik ?',
    },
    backAnswer: {
      tr: 'Ebû Abdillah Mâlik b. Enes el-Asbahî (93–179 / 712–795) — İmâmü Dâri’l-Hicre',
      fr: 'Abû ‘Abdillâh Mâlik b. Anas al-Asbahî (93–179 / 712–795) — Imâm Dâr al-Hijra',
    },
    backDetail: {
      tr: 'Medine’de doğup vefat etmiş, ~900 hocadan ilim almış ve 1.000’i aşkın râviye hocalık yapmıştır.',
      fr: 'Né et mort à Médine, formé auprès d’environ 900 maîtres et ayant transmis à plus de 1 000 disciples.',
    },
    rootOrRef: 'TDV DİA, c. 27 · Biyografi',
    deepLink: { route: 'imam-malik', targetItemId: 'biography' },
  },
  {
    id: 'fc-im-2',
    deck: 'imam-malik',
    arabic: 'عَمَلُ أَهْلِ المَدِينَةِ',
    frontPrompt: {
      tr: 'Mâlikî usulünde “Amel-i Ehl-i Medîne” neden mütevâtir sünnet gücünde görülür?',
      fr: 'Pourquoi le « ‘Amal Ahl al-Madîna » possède-t-il une autorité quasi-mutawâtir chez Mâlik ?',
    },
    backAnswer: {
      tr: 'Medine’de binlerce sahâbî ve tâbiînin kesintisiz uyguladığı canlı gelenek, tek râvinin haberinden daha kesin kabul edilir.',
      fr: 'La pratique collective ininterrompue de milliers de Médinois est jugée plus probante qu’un récit isolé.',
    },
    backDetail: {
      tr: 'Ölçü-tartı, ezan, vakıf ve namaz tatbikatı gibi naklî amellerde İmam Mâlik bunu haber-i vâhide takdim eder.',
      fr: 'Pour la pratique transmise (adhân, mesures, rites), Mâlik la privilégie sur le khabar al-wâhid.',
    },
    rootOrRef: 'TDV DİA · Usûl-i Fıkıh #4',
    deepLink: { route: 'imam-malik', targetItemId: 'usul' },
  },
  {
    id: 'fc-im-3',
    deck: 'imam-malik',
    arabic: 'المَصَالِحُ المُرْسَلَةُ (الِاسْتِصْلَاحُ)',
    frontPrompt: {
      tr: 'Mesâlih-i Mürsele delilinin tanımı ve şartı nedir?',
      fr: 'Quelle est la définition et la condition du principe d’al-Masâlih al-Mursala ?',
    },
    backAnswer: {
      tr: 'Özel nas bulunmayan konularda şeriatın genel gayelerine (makāsıd) uygun kamu yararına göre hüküm vermek.',
      fr: 'Légiférer selon l’intérêt général conforme aux finalités de la Loi en l’absence de texte spécifique.',
    },
    backDetail: {
      tr: 'Mâlikî fıkhına toplumsal değişimlere cevap verme esnekliği kazandıran temel delillerdendir.',
      fr: 'L’un des ressorts majeurs de la souplesse et du réalisme du fiqh mâlikite.',
    },
    rootOrRef: 'TDV DİA · Usûl-i Fıkıh #8',
    deepLink: { route: 'imam-malik', targetItemId: 'usul' },
  },
  {
    id: 'fc-im-4',
    deck: 'imam-malik',
    arabic: 'سَدُّ الذَّرَائِعِ',
    frontPrompt: {
      tr: '“Sedd-i Zerâi‘” ilkesini tek cümlede nasıl tanımlarsınız?',
      fr: 'Comment définir en une phrase le principe de « Sadd adh-Dharâ’i‘ » ?',
    },
    backAnswer: {
      tr: 'Harama veya zarara götüren mubah vasıtaların önünü kapatmak (önleyici hukuk ilkesi).',
      fr: 'Fermer préventivement les moyens licites en apparence qui conduisent à un interdit ou à un préjudice.',
    },
    backDetail: {
      tr: 'Örneğin ribâya hile teşkil eden satış sözleşmelerinin (büyû‘u’l-âcâl) engellenmesi bu ilkeye dayanır.',
      fr: 'Il justifie par exemple l’interdiction des ventes détournées masquant l’usure (buyû‘ al-âjâl).',
    },
    rootOrRef: 'TDV DİA · Usûl-i Fıkıh #9',
    deepLink: { route: 'imam-malik', targetItemId: 'usul' },
  },
  {
    id: 'fc-im-5',
    deck: 'imam-malik',
    arabic: 'الِاسْتِحْسَانُ',
    frontPrompt: {
      tr: 'İmam Mâlik’in “İlmin onda dokuzu” diye nitelediği usul kavramı hangisidir?',
      fr: 'Quel principe méthodologique l’Imam Mâlik a-t-il qualifié de « neuf dixièmes de la science » ?',
    },
    backAnswer: {
      tr: 'İstihsân — katı kıyasın doğuracağı zorluktan daha güçlü bir delil veya maslahat adına vazgeçmek.',
      fr: 'L’Istihsân — préférer une solution plus équitable ou conforme à l’intérêt général au qiyâs rigide.',
    },
    backDetail: {
      tr: 'Mâlikî usulünde istihsân, keyfî tercih değil; örf, zaruret ve maslahata dayanan hakkaniyet ilkesidir.',
      fr: 'Chez les Mâlikites, l’istihsân repose sur l’équité, la nécessité et la coutume, jamais sur l’arbitraire.',
    },
    rootOrRef: 'TDV DİA · Usûl-i Fıkıh #7',
    deepLink: { route: 'imam-malik', targetItemId: 'usul' },
  },
  {
    id: 'fc-im-6',
    deck: 'imam-malik',
    arabic: 'مِحْنَةُ سَنَةِ ١٤٦ هـ',
    frontPrompt: {
      tr: '146/763 yılındaki Mihne olayı nedir ve İmam Mâlik’in siyasî duruşunu nasıl gösterir?',
      fr: 'Qu’est-ce que l’épreuve (mihna) de 146/763 et que révèle-t-elle sur l’Imam Mâlik ?',
    },
    backAnswer: {
      tr: 'Zorla boşamanın geçersizliği fetvası sebebiyle kırbaçlanıp omzu çıkarılmış; buna rağmen ilmî bağımsızlığından taviz vermemiştir.',
      fr: 'Flagellé et blessé à l’épaule pour sa fatwa sur le divorce sous contrainte, il refusa tout compromis politique.',
    },
    backDetail: {
      tr: 'Halife el-Mansûr daha sonra bizzat özür dilemiş ve İmam’ın ilmî otoritesi İslâm dünyasında daha da yükselmiştir.',
      fr: 'Le calife al-Mansûr lui présenta ensuite ses excuses et son prestige moral en sortit encore grandi.',
    },
    rootOrRef: 'TDV DİA · 146/763 Olayı',
    deepLink: { route: 'imam-malik', targetItemId: 'biography' },
  },
  {
    id: 'fc-im-7',
    deck: 'imam-malik',
    arabic: 'لَا أَدْرِي — جُنَّةُ الْعَالِمِ',
    frontPrompt: {
      tr: 'İmam Mâlik’in “Âlimin kalkanı” (cünnetü’l-âlim) dediği söz nedir?',
      fr: 'Quelle parole l’Imam Mâlik appelait-il « le bouclier du savant » ?',
    },
    backAnswer: {
      tr: '“Lâ edrî” (Bilmiyorum) diyebilmek.',
      fr: 'Savoir dire « Lâ adrî » (Je ne sais pas).',
    },
    backDetail: {
      tr: '“Kim bunu terk ederse darbe yer” buyurarak fetvada ihtiyat ve sorumluluk ahlâkını vurgulamıştır.',
      fr: '« Celui qui néglige ce bouclier s’expose aux coups mortels », soulignant l’éthique de la prudence.',
    },
    rootOrRef: 'TDV DİA · Hikmetli Sözler',
    deepLink: { route: 'imam-malik', targetItemId: 'quotes' },
  },

  // ---- DECK 4: EL-MUVATTA’ & ŞERHLER (7) ----
  {
    id: 'fc-mv-1',
    deck: 'muvatta',
    arabic: '١٧٢٠ رِوَايَةً · ٦١ كِتَابًا',
    frontPrompt: {
      tr: 'el-Ebherî’ye göre el-Muvatta’daki 1.720 rivayetin dört tür dağılımı nasıldır?',
      fr: 'Quelle est la répartition des 1 720 récits d’al-Muwatta’ selon al-Abharî ?',
    },
    backAnswer: {
      tr: '600 Müsned · 222 Mürsel · 613 Mevkuf · 285 Maktû‘ (Toplam 1.720)',
      fr: '600 Musnad · 222 Mursal · 613 Mawqûf · 285 Maqtû‘ (Total : 1 720)',
    },
    backDetail: {
      tr: '61 ana kitap (bölüm) içinde hem merfû hadisleri hem de sahâbe ve tâbiîn fetvalarını birleştirir.',
      fr: 'Répartis en 61 livres, mêlant hadiths prophétiques, paroles des Compagnons et avis des Successeurs.',
    },
    rootOrRef: 'TDV DİA, c. 31 · İstatistik',
    deepLink: { route: 'el-muvatta', targetItemId: 'stats' },
  },
  {
    id: 'fc-mv-2',
    deck: 'muvatta',
    arabic: 'سِلْسِلَةُ الذَّهَبِ',
    frontPrompt: {
      tr: 'Hadis ilminde “Silsiletü’z-Zeheb” (Altın Zincir) nedir?',
      fr: 'Qu’est-ce que la « Chaîne d’or » (Silsilat adh-Dhahab) en science du hadith ?',
    },
    backAnswer: {
      tr: 'İmam Mâlik ← Nâfi‘ ← Abdullah b. Ömer (r.a.) rivayet zinciri.',
      fr: 'La chaîne de transmission : Mâlik ← Nâfi‘ ← ‘Abdullâh b. ‘Umar.',
    },
    backDetail: {
      tr: 'İmam Buhârî bu isnadı bütün hadis edebiyatındaki en sahih sened olarak nitelendirmiştir.',
      fr: 'Al-Bukhârî l’a désignée comme la chaîne de transmission la plus authentique de toute la littérature du hadith.',
    },
    rootOrRef: 'TDV DİA, c. 31 · Silsiletü’z-Zeheb',
    deepLink: { route: 'el-muvatta', targetItemId: 'overview' },
  },
  {
    id: 'fc-mv-3',
    deck: 'muvatta',
    arabic: 'بَلَاغَاتُ مَالِكٍ (٦١ حَدِيثًا)',
    frontPrompt: {
      tr: 'el-Muvatta’daki 61 Belâğ hadisinin tamamı nasıl muttasıl hâle getirilmiştir?',
      fr: 'Comment les 61 hadiths « balâgh » d’al-Muwatta’ ont-ils été authentifiés ?',
    },
    backAnswer: {
      tr: 'İbn Abdülber 57’sinin, İbnü’s-Salâh ise kalan 4’ünün muttasıl isnadlarını ortaya koymuştur (61/61).',
      fr: 'Ibn ‘Abd al-Barr en a établi 57 chaînes complètes et Ibn as-Salâh les 4 dernières (61/61).',
    },
    backDetail: {
      tr: 'Bu sonuç, İmam Mâlik’in kısaltarak aktardığı belâğ rivayetlerinin tamamının sağlam senedli olduğunu göstermiştir.',
      fr: 'Cela confirme que tous les balâghs abrégés par Mâlik reposaient sur des chaînes solides.',
    },
    rootOrRef: 'TDV DİA, c. 31 · Belâğât',
    deepLink: { route: 'el-muvatta', targetItemId: 'stats' },
  },
  {
    id: 'fc-mv-4',
    deck: 'muvatta',
    arabic: 'رِوَايَةُ يَحْيَى بْنِ يَحْيَى اللَّيْثِيِّ',
    frontPrompt: {
      tr: 'Yahyâ b. Yahyâ el-Leysî rivayeti (ö. 234/848) neden el-Muvatta’ın en meşhur nüshasıdır?',
      fr: 'Pourquoi la recension de Yahyâ b. Yahyâ al-Laythî est-elle la version canonique d’al-Muwatta’ ?',
    },
    backAnswer: {
      tr: 'İmam Mâlik’in vefat yılında (179 H.) son revizyonu dinlemiş ve Endülüs’te standart metin hâline getirmiştir.',
      fr: 'Auditeur de la toute dernière révision en 179 H., il en a fait le texte de référence en al-Andalus et au-delà.',
    },
    backDetail: {
      tr: 'Günümüze ulaşan 9 Muvatta’ rivayeti içinde en çok şerh edilen nüshadır (et-Temhîd, el-Müntekâ, ez-Zürkānî).',
      fr: 'Parmi les 9 recensions conservées, c’est celle qui a suscité les plus grands commentaires.',
    },
    rootOrRef: 'TDV DİA, c. 31 · 9 Rivayet',
    deepLink: { route: 'el-muvatta', targetItemId: 'riwayahs' },
  },
  {
    id: 'fc-mv-5',
    deck: 'muvatta',
    arabic: 'رِوَايَةُ مُحَمَّدِ بْنِ الْحَسَنِ الشَّيْبَانِيِّ',
    frontPrompt: {
      tr: 'İmam Muhammed eş-Şeybânî’nin Muvatta’ rivayetini diğer 8 nüshadan ayıran temel özellik nedir?',
      fr: 'Quelle particularité distingue la recension de Muhammad ash-Shaybânî des 8 autres ?',
    },
    backAnswer: {
      tr: 'Her rivayetin ardından Ebû Hanîfe ve Irak fıkhının mukayeseli görüşlerini eklemesidir.',
      fr: 'Elle ajoute après chaque récit les positions comparatives d’Abû Hanîfa et de l’école irakienne.',
    },
    backDetail: {
      tr: 'Ali el-Kārî ve Abdülhay el-Leknevî gibi Hanefî âlimler özellikle bu nüsha üzerine şerhler yazmıştır.',
      fr: 'Des maîtres hanafites comme ‘Alî al-Qârî et al-Laknawî ont rédigé des commentaires dédiés à cette recension.',
    },
    rootOrRef: 'TDV DİA, c. 31 · Rivayetler',
    deepLink: { route: 'el-muvatta', targetItemId: 'riwayahs' },
  },
  {
    id: 'fc-mv-6',
    deck: 'muvatta',
    arabic: 'التَّمْهِيدُ وَالِاسْتِذْكَارُ (ابْنُ عَبْدِ الْبَرِّ)',
    frontPrompt: {
      tr: 'İbn Abdülber’in *et-Temhîd* ve *el-İstizkâr* adlı iki şerhi tertip bakımından nasıl ayrılır?',
      fr: 'Comment se distinguent at-Tamhîd et al-Istidhkâr d’Ibn ‘Abd al-Barr dans leur organisation ?',
    },
    backAnswer: {
      tr: 'et-Temhîd İmam Mâlik’in hocalarına göre alfabetik; el-İstizkâr ise fıkıh babları tertibine göredir.',
      fr: 'at-Tamhîd est classé alphabétiquement par maîtres de Mâlik ; al-Istidhkâr suit les chapitres de fiqh.',
    },
    backDetail: {
      tr: 'İki eser birlikte el-Muvatta’ın hem isnad/ricâl hem mukayeseli fıkıh ansiklopedisini oluşturur.',
      fr: 'Ensemble, ils forment l’encyclopédie complète des chaînes et du fiqh comparé d’al-Muwatta’.',
    },
    rootOrRef: 'TDV DİA, c. 31 · Şerhler',
    deepLink: { route: 'el-muvatta', targetItemId: 'commentaries' },
  },
  {
    id: 'fc-mv-7',
    deck: 'muvatta',
    arabic: 'المُنْتَقَى · تَنْوِيرُ الْحَوَالِكِ · أَوْجَزُ الْمَسَالِكِ',
    frontPrompt: {
      tr: 'Bu üç meşhur el-Muvatta’ şerhinin müellifleri kimlerdir?',
      fr: 'Qui sont les auteurs respectifs de ces trois célèbres commentaires d’al-Muwatta’ ?',
    },
    backAnswer: {
      tr: 'el-Müntekâ: el-Bâcî · Tenvîrü’l-havâlik: es-Süyûtî · Evcezü’l-mesâlik: el-Kândehlevî',
      fr: 'al-Muntaqâ : al-Bâjî · Tanwîr al-Hawâlik : as-Suyûtî · Awjaz al-Masâlik : al-Kândahlawî',
    },
    backDetail: {
      tr: 'Endülüs’ten Mısır’a ve Hint alt kıtasına uzanan bin yıllık kesintisiz şerh geleneğinin zirveleridir.',
      fr: 'Trois sommets d’une tradition exégétique millénaire s’étendant d’al-Andalus à l’Égypte et à l’Inde.',
    },
    rootOrRef: 'TDV DİA, c. 31 · Şerhler',
    deepLink: { route: 'el-muvatta', targetItemId: 'commentaries' },
  },
];
