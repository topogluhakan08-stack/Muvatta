import type { AtlasRoute, BilingualString, HeroOverviewCard, MindMapNode } from '../types/atlas';

export interface NavItemConfig {
  route: AtlasRoute;
  label: BilingualString;
  description: BilingualString;
  stepNumber?: number;
}

export const PRIMARY_NAV_ITEMS: NavItemConfig[] = [
  {
    route: 'home',
    label: { tr: 'Ana Sayfa', fr: 'Accueil' },
    description: {
      tr: 'Genel bakış ve etkileşimli zihin haritası',
      fr: 'Vue d’ensemble et carte mentale interactive',
    },
  },
  {
    route: 'imam-malik',
    label: { tr: 'İmam Mâlik', fr: 'Imam Mâlik' },
    description: {
      tr: 'TDV DİA biyografi, kronoloji ve usûl-i fıkıh',
      fr: 'Biographie TDV DİA, chronologie et usûl al-fiqh',
    },
    stepNumber: 2,
  },
  {
    route: 'el-muvatta',
    label: { tr: "el-Muvatta'", fr: "al-Muwatta'" },
    description: {
      tr: 'Telif tarihi, 1.720 rivayet, 9 nüsha ve şerhler',
      fr: 'Compilation, 1 720 récits, 9 recensions et commentaires',
    },
    stepNumber: 3,
  },
  {
    route: 'hadisler',
    label: { tr: 'Hadisler', fr: 'Hadiths' },
    description: {
      tr: "Kitâbü's-Salât fî Ramadân: 2 bab, 8 hadis ve sarf-nahiv",
      fr: 'Kitâb as-Salât fî Ramadân : 2 chapitres, 8 hadiths et analyse',
    },
    stepNumber: 4,
  },
  {
    route: 'ogren',
    label: { tr: 'Öğren', fr: 'Apprendre' },
    description: {
      tr: '50+ soruluk sınav, SRS bilgi kartları ve hakimiyet',
      fr: 'Quiz de 50+ questions, cartes SRS et suivi de maîtrise',
    },
    stepNumber: 6,
  },
];

export const SECONDARY_NAV_ITEMS: NavItemConfig[] = [
  {
    route: 'sozluk',
    label: { tr: 'Sözlük', fr: 'Lexique' },
    description: {
      tr: 'Arapça–Türkçe–Fransızca kök ve terim sözlüğü',
      fr: 'Dictionnaire arabe–turc–français des racines et termes',
    },
    stepNumber: 5,
  },
  {
    route: 'harita',
    label: { tr: 'Harita', fr: 'Carte Historique' },
    description: {
      tr: 'Yemen’den Medine, Mısır, Kayrevan ve Endülüs’e ilim ağı',
      fr: 'Réseau savant du Yémen à Médine, l’Égypte, Kairouan et al-Andalus',
    },
    stepNumber: 2,
  },
  {
    route: 'ara',
    label: { tr: 'Ara', fr: 'Recherche Globale' },
    description: {
      tr: 'Hadis metinleri, kökler ve DİA maddelerinde tam arama',
      fr: 'Recherche transversale dans les hadiths, racines et articles DİA',
    },
    stepNumber: 5,
  },
  {
    route: 'ayarlar',
    label: { tr: 'Ayarlar', fr: 'Paramètres' },
    description: {
      tr: 'Tema, çift dil görünümü, Arapça yazı boyutu ve ilerleme',
      fr: 'Thème, affichage bilingue, taille de l’arabe et progression',
    },
  },
];

export interface ArchivalMetric {
  value: string;
  label: BilingualString;
}

export const ARCHIVAL_METRICS: ArchivalMetric[] = [
  {
    value: '93–179 H.',
    label: { tr: 'İmam Mâlik (712–795)', fr: 'Imam Mâlik (712–795)' },
  },
  {
    value: '61',
    label: { tr: 'Kitap (el-Muvatta’)', fr: 'Livres (al-Muwatta’)' },
  },
  {
    value: '1.720',
    label: { tr: 'Toplam Rivayet', fr: 'Total des récits' },
  },
  {
    value: '2 Bab · 8 Hadis',
    label: { tr: 'Kitâbü’s-Salât fî Ramadân', fr: 'Livre de la Prière en Ramadan' },
  },
  {
    value: '9',
    label: { tr: 'Günümüze Ulaşan Nüsha', fr: 'Recensions conservées' },
  },
];

export const HERO_OVERVIEW_CARDS: HeroOverviewCard[] = [
  {
    id: 'card-imam-malik',
    index: '01',
    route: 'imam-malik',
    arabicTitle: 'الإِمَامُ مَالِكُ بْنُ أَنَسٍ',
    title: {
      tr: 'İmam Mâlik b. Enes',
      fr: 'Imam Mâlik b. Anas',
    },
    period: '93–179 / 712–795',
    metadata: {
      tr: 'TDV DİA, c. 27 · Ahmet Özel · Medine',
      fr: 'TDV DİA, vol. 27 · Ahmet Özel · Médine',
    },
    summary: {
      tr: 'Hicaz ehl-i hadîs ekolünün zirvesi ve Mâlikî mezhebinin kurucusu. İbn Hürmüz, Rebîatürre’y, İbn Şihâb ez-Zührî ve Nâfi’ başta olmak üzere yaklaşık 900 hocadan ilim almış; Amel-i Ehl-i Medîne, mesâlih-i mürsele ve sedd-i zerâi’ ilkeleriyle İslâm hukuk metodolojisine yön vermiştir.',
      fr: 'Sommet de l’école du hadith du Hedjaz et fondateur du rite mâlikite. Formé auprès d’environ 900 maîtres dont Ibn Hurmuz, Rabî‘at ar-Ra’y, az-Zuhrî et Nâfi‘, il a façonné les usûl al-fiqh par la pratique médinoise (‘Amal Ahl al-Madîna), l’intérêt général et la prévention des moyens.',
    },
    highlights: [
      {
        tr: '900 civarı hoca · 1.000’i aşkın râvi',
        fr: 'Env. 900 maîtres · plus de 1 000 transmetteurs',
      },
      {
        tr: '146/763 mihnesi ve siyasî bağımsızlık',
        fr: 'Épreuve de 146/763 et indépendance politique',
      },
      {
        tr: '11 esaslı Usûl-i Fıkıh haritası (Karâfî)',
        fr: 'Système des 11 sources juridiques (al-Qarâfî)',
      },
    ],
    cta: {
      tr: 'Biyografi ve Usulü İncele',
      fr: 'Explorer la biographie et les Usûl',
    },
    accent: 'emerald',
  },
  {
    id: 'card-el-muvatta',
    index: '02',
    route: 'el-muvatta',
    arabicTitle: 'كِتَابُ المُوَطَّأِ',
    title: {
      tr: "el-Muvatta'",
      fr: "al-Muwatta'",
    },
    period: '159 / 776 · 40 Yıllık Telif',
    metadata: {
      tr: 'TDV DİA, c. 31 · M. Yaşar Kandemir · 61 Kitap',
      fr: 'TDV DİA, vol. 31 · M. Yaşar Kandemir · 61 Livres',
    },
    summary: {
      tr: 'Kitap ve bab tertibinde tasnif edilip günümüze ulaşan ilk hadis ve fıkıh mecmuası. Ebû Bekir el-Ebherî’ye göre 600 müsned, 222 mürsel, 613 mevkuf ve 285 maktû olmak üzere 1.720 rivayet içerir; İmam Mâlik’in 40 yıl boyunca gözden geçirdiği, devlet kanunu yapmayı reddettiği abidevî eser.',
      fr: 'Premier recueil de hadith et de fiqh classé par chapitres parvenu jusqu’à nous. Selon al-Abharî, il réunit 1 720 récits (600 musnad, 222 mursal, 613 mawqûf, 285 maqtû‘), affinés durant quarante ans et préservés en neuf recensions historiques.',
    },
    highlights: [
      {
        tr: 'Silsiletü’z-Zeheb: Mâlik — Nâfi’ — İbn Ömer',
        fr: 'Chaîne d’or : Mâlik — Nâfi‘ — Ibn ‘Umar',
      },
      {
        tr: '9 rivayet nüshası (Yahyâ el-Leysî, eş-Şeybânî...)',
        fr: '9 recensions majeures (Yahyâ al-Laythî, ash-Shaybânî...)',
      },
      {
        tr: 'et-Temhîd, el-İstizkâr, el-Müntekâ ve şerh geleneği',
        fr: 'Tradition des commentaires : at-Tamhîd, al-Istidhkâr, al-Muntaqâ',
      },
    ],
    cta: {
      tr: 'Rivayet ve İstatistiklere Git',
      fr: 'Consulter les recensions et statistiques',
    },
    accent: 'gold',
  },
  {
    id: 'card-kitabus-salat',
    index: '03',
    route: 'hadisler',
    arabicTitle: 'كِتَابُ الصَّلَاةِ فِي رَمَضَانَ',
    title: {
      tr: "Kitâbü's-Salât fî Ramadân",
      fr: 'Kitâb as-Salât fî Ramadân',
    },
    period: 'Kitap 6 · 2 Bab · 8 Hadis',
    metadata: {
      tr: 'Yahyâ b. Yahyâ el-Leysî Rivayeti · s. 113–116',
      fr: 'Recension de Yahyâ al-Laythî · pp. 113–116',
    },
    summary: {
      tr: 'el-Muvatta’ın 6. kitabı olan bu bölüm, Ramazan gecelerinin ihyasını (terâvih/kıyâm) iki bab ve sekiz rivayetle belgeler: Hz. Peygamber’in teşvik ve farz kılınma endişesiyle cemaati terk etmesinden, Hz. Ömer’in Übey b. Kâ’b arkasında cemaati birleştirmesine ve rekât/kıraat rivayetlerine uzanan eksiksiz bir kaynak.',
      fr: 'Sixième livre d’al-Muwatta’, consacré aux prières nocturnes de Ramadan (tarâwîh/qiyâm) en deux chapitres et huit récits : de l’incitation prophétique et la crainte de l’obligation jusqu’au rassemblement organisé par ‘Umar derrière Ubayy b. Ka‘b et aux détails liturgiques médinois.',
    },
    highlights: [
      {
        tr: 'Bab 1: Tergîb fi’s-Salât fî Ramadân (Hadis 1–2)',
        fr: 'Chap. 1 : L’incitation à la prière (Hadiths 1–2)',
      },
      {
        tr: 'Bab 2: Mâ Câe fî Kıyâmi Ramadân (Hadis 3–8)',
        fr: 'Chap. 2 : La pratique du Qiyâm (Hadiths 3–8)',
      },
      {
        tr: 'Kelime bazlı sarf-nahiv, isnad şeması ve klasik hâşiyeler',
        fr: 'Analyse mot-à-mot, schémas d’isnâd et gloses classiques',
      },
    ],
    cta: {
      tr: '8 Hadisi Derinlemesine Oku',
      fr: 'Étudier les 8 hadiths en détail',
    },
    accent: 'burgundy',
  },
];

export const MIND_MAP_NODES: MindMapNode[] = [
  {
    id: 'root',
    kind: 'root',
    label: {
      tr: "Kitâbü's-Salât fî Ramadân",
      fr: 'Livre de la Prière en Ramadan',
    },
    shortLabel: {
      tr: "Kitâbü's-Salât fî Ramadân",
      fr: 'Kitâb as-Salât fî Ramadân',
    },
    arabic: '٦ — كِتَابُ الصَّلَاةِ فِي رَمَضَانَ',
    summary: {
      tr: "el-Muvatta'ın 6. kitabı. İki bab altında toplam 8 rivayet ile Ramazan gecesi namazının (terâvih) teşriî temelini, cemaatle kılınış sürecini, rekât sayılarını, uzun kıraat geleneğini ve sahur vaktine dek uzanan Medine amelini aktarır.",
      fr: 'Sixième livre d’al-Muwatta’. À travers deux chapitres et huit récits, il retrace la légitimité des prières nocturnes de Ramadan, la réunion en congrégation sous ‘Umar, le nombre de rak‘ât, la longue récitation et la pratique médinoise jusqu’à l’aube.',
    },
    keyRuling: {
      tr: '2 Bab · 8 Hadis · Yahyâ el-Leysî Nüshası (s. 113–116)',
      fr: '2 Chapitres · 8 Hadiths · Édition Yahyâ al-Laythî (pp. 113–116)',
    },
    targetRoute: 'hadisler',
    accent: 'gold',
  },
  {
    id: 'bab-1',
    kind: 'bab',
    parentId: 'root',
    babNumber: 1,
    label: {
      tr: "Bab 1: Bâbu't-Tergîb fi's-Salât fî Ramadân",
      fr: "Chapitre 1 : L'incitation à la prière en Ramadan",
    },
    shortLabel: {
      tr: "Bab I · Tergîb fi's-Salât",
      fr: 'Chap. I · Incitation (Targhîb)',
    },
    arabic: '(١) بَابُ التَّرْغِيبِ فِي الصَّلَاةِ فِي رَمَضَانَ',
    summary: {
      tr: 'Ramazan gecelerini namazla ihya etmenin faziletini, kesin emir (azîmet) olmaksızın mendup olarak teşvik edilmesini ve farz kılınma korkusuyla mesciddeki cemaat uygulamasının Resûlullah (s.a.v.) tarafından sürdürülmemesini konu alan iki merfû rivayeti içerir.',
      fr: 'Regroupe les deux récits prophétiques (marfû‘) établissant le mérite de la prière nocturne de Ramadan, son caractère recommandé sans obligation contraignante et la raison pour laquelle le Prophète (ﷺ) cessa de la diriger en congrégation.',
    },
    keyRuling: {
      tr: 'Hüküm: Ramazan kıyâmı farz değil, kuvvetli bir teşvik (nedb ve tergîb) ile sabit sünnettir.',
      fr: 'Règle : Le qiyâm de Ramadan relève de l’incitation recommandée (nadb) et non de l’obligation.',
    },
    targetRoute: 'hadisler',
    targetItemId: 'bab-1',
    accent: 'emerald',
  },
  {
    id: 'bab-2',
    kind: 'bab',
    parentId: 'root',
    babNumber: 2,
    label: {
      tr: 'Bab 2: Bâbu Mâ Câe fî Kıyâmi Ramadân',
      fr: 'Chapitre 2 : Ce qui est rapporté sur le Qiyâm de Ramadan',
    },
    shortLabel: {
      tr: 'Bab II · Kıyâmu Ramadân',
      fr: 'Chap. II · Pratique du Qiyâm',
    },
    arabic: '(٢) بَابُ مَا جَاءَ فِي قِيَامِ رَمَضَانَ',
    summary: {
      tr: 'Hz. Ömer’in dağınık grupları Übey b. Kâ’b’ın arkasında tek cemaatte toplamasından, 11 ve 23 rekât rivayetlerine, uzun kıraat ve vitir kunutuna, sahur telaşına ve Hz. Âişe’nin müdebber kölesi Zekvân’ın imamlığına kadar 6 tarihî ve fıkhî rivayeti sunar.',
      fr: 'Rassemble six récits majeurs décrivant l’unification de la congrégation par ‘Umar derrière Ubayy b. Ka‘b, les traditions de 11 et 23 rak‘ât, la longue récitation, le qunût, la hâte du suhûr et l’imamat de Dhakwân pour ‘Â’isha.',
    },
    keyRuling: {
      tr: 'Hüküm: Cemaatle terâvih, rekât çeşitliliği, gecenin son vaktinin fazileti ve imamette ehliyet.',
      fr: 'Règle : Congrégation des tarâwîh, diversité des rak‘ât, mérite du dernier tiers de la nuit et aptitude à l’imamat.',
    },
    targetRoute: 'hadisler',
    targetItemId: 'bab-2',
    accent: 'burgundy',
  },
  // Bab 1 Hadiths (1-2)
  {
    id: 'hadith-1',
    kind: 'hadith',
    parentId: 'bab-1',
    babNumber: 1,
    hadithNumber: 1,
    label: {
      tr: 'Hadis 1 · Farz Kılınma Endişesi',
      fr: 'Hadith 1 · Crainte de l’obligation',
    },
    shortLabel: {
      tr: 'Hadis 1 · Hz. Âişe',
      fr: 'Hadith 1 · ‘Â’isha',
    },
    arabic: 'إِلَّا أَنِّي خَشِيتُ أَنْ تُفْرَضَ عَلَيْكُمْ',
    summary: {
      tr: 'Hz. Peygamber (s.a.v.) bir gece mescidde namaz kıldı; ertesi gece cemaat çoğaldı. Üçüncü veya dördüncü gece ise ümmete farz kılınır da güç yetiremezler endişesiyle dışarı çıkmadı.',
      fr: 'Le Prophète (ﷺ) pria une nuit à la mosquée, puis la foule grandit la nuit suivante ; la troisième ou quatrième nuit, il ne sortit point, craignant que cette prière ne devienne obligatoire.',
    },
    narratorChain: 'Yahyâ ← Mâlik ← İbn Şihâb ← Urve b. ez-Zübeyr ← Hz. Âişe',
    keyRuling: {
      tr: 'Şefkat ilkesi ve ibadetlerde kolaylaştırma (Müslim, Salâtü’l-müsâfirîn, 178).',
      fr: 'Principe de miséricorde et d’allègement liturgique (Muslim, n° 178).',
    },
    reference: 'Müslim, 6/25, h. 178 · Muvatta, s. 113',
    targetRoute: 'hadisler',
    targetItemId: 'hadith-1',
    accent: 'emerald',
  },
  {
    id: 'hadith-2',
    kind: 'hadith',
    parentId: 'bab-1',
    babNumber: 1,
    hadithNumber: 2,
    label: {
      tr: 'Hadis 2 · Îmânen ve İhtisâben Kıyâm',
      fr: 'Hadith 2 · Foi et espérance de récompense',
    },
    shortLabel: {
      tr: 'Hadis 2 · Ebû Hüreyre',
      fr: 'Hadith 2 · Abû Hurayra',
    },
    arabic: 'مَنْ قَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ',
    summary: {
      tr: 'Resûlullah (s.a.v.) kesin bir emir vermeksizin Ramazan kıyâmına teşvik ederdi. İbn Şihâb’ın aktardığına göre Hz. Ebû Bekir hilafeti ve Hz. Ömer’in ilk döneminde de uygulama bireysel/dağınık şekilde devam etti.',
      fr: 'Le Prophète (ﷺ) exhortait au qiyâm de Ramadan sans ordre impératif, promettant le pardon des péchés passés à qui prie avec foi et sincérité ; cet état perdura sous Abû Bakr et au début du califat de ‘Umar.',
    },
    narratorChain: 'Yahyâ ← Mâlik ← İbn Şihâb ← Ebû Seleme ← Ebû Hüreyre',
    keyRuling: {
      tr: 'Nevevî şerhi: "Azîmetsiz" = mendupluk; "ihtisâben" = riyasız yalnız Allah rızasını ummak.',
      fr: 'Glose d’an-Nawawî : « sans ordre impératif » = recommandation ; « ihtisâban » = pure intention.',
    },
    reference: 'Buhârî, Terâvîh, 1 · Müslim, h. 174 · Muvatta, s. 113–114',
    targetRoute: 'hadisler',
    targetItemId: 'hadith-2',
    accent: 'emerald',
  },
  // Bab 2 Hadiths (3-8)
  {
    id: 'hadith-3',
    kind: 'hadith',
    parentId: 'bab-2',
    babNumber: 2,
    hadithNumber: 3,
    label: {
      tr: "Hadis 3 · Hz. Ömer'in Cemaati Toplaması",
      fr: 'Hadith 3 · Rassemblement par ‘Umar',
    },
    shortLabel: {
      tr: 'Hadis 3 · Abdurrahman el-Kârî',
      fr: 'Hadith 3 · ‘Abd ar-Rahmân al-Qârî',
    },
    arabic: 'نِعْمَتِ الْبِدْعَةُ هَذِهِ ، وَالَّتِي تَنَامُونَ عَنْهَا أَفْضَلُ',
    summary: {
      tr: 'Hz. Ömer mescidde dağınık gruplar (evzâan müteferrikîn) hâlinde namaz kılanları Übey b. Kâ’b’ın arkasında topladı; ertesi gece bu manzarayı görünce "Bu ne güzel bid’attir; ancak uyuyup bıraktığınız gecenin son kısmı daha faziletlidir" dedi.',
      fr: 'Voyant les fidèles prier en groupes dispersés (awzâ‘an mutafarriqîn), ‘Umar les réunit derrière Ubayy b. Ka‘b et déclara : « Quelle excellente innovation ! Mais la fin de la nuit durant laquelle vous dormez est encore meilleure. »',
    },
    narratorChain: 'Mâlik ← İbn Şihâb ← Urve ← Abdurrahman b. Abd el-Kârî',
    keyRuling: {
      tr: 'İbn Hacer hâşiyesi: Gecenin son vaktinde kılınan namaz ilk vaktinden daha faziletlidir.',
      fr: 'Glose d’Ibn Hajar : La prière en fin de nuit surpasse en mérite celle du début de nuit.',
    },
    reference: 'Buhârî, Terâvîh, 1 · Muvatta, s. 114–115',
    targetRoute: 'hadisler',
    targetItemId: 'hadith-3',
    accent: 'burgundy',
  },
  {
    id: 'hadith-4',
    kind: 'hadith',
    parentId: 'bab-2',
    babNumber: 2,
    hadithNumber: 4,
    label: {
      tr: 'Hadis 4 · 11 Rekât ve Uzun Kıyam',
      fr: 'Hadith 4 · 11 Rak‘ât et longue station',
    },
    shortLabel: {
      tr: 'Hadis 4 · es-Sâib b. Yezîd',
      fr: 'Hadith 4 · as-Sâ’ib b. Yazîd',
    },
    arabic: 'أَمَرَ عُمَرُ بْنُ الْخَطَّابِ أُبَيَّ بْنَ كَعْبٍ وَتَمِيمًا الدَّارِيَّ أَنْ يَقُومَا لِلنَّاسِ بِإِحْدَى عَشْرَةَ رَكْعَةً',
    summary: {
      tr: 'Hz. Ömer, Übey b. Kâ’b ile Temîm ed-Dârî’ye halka 11 rekât kıldırmalarını emretti. Kârî yüzlerce âyetlik sûreleri (miîn) okuduğundan cemaat kıyamın uzunluğundan asâlara dayanır, namazdan ancak fecrin başlangıcında dağılırdı.',
      fr: '‘Umar ordonna à Ubayy b. Ka‘b et Tamîm ad-Dârî de diriger 11 rak‘ât. Le récitateur lisait des sourates de centaines de versets si bien que les fidèles s’appuyaient sur des bâtons et ne se dispersaient qu’aux premières lueurs de l’aube.',
    },
    narratorChain: 'Mâlik ← Muhammed b. Yûsuf ← es-Sâib b. Yezîd',
    keyRuling: {
      tr: 'Kādî İyâz hâşiyesi: "Furûu’l-fecr", fecrin ilk doğup yükseldiği anlardır.',
      fr: 'Glose du Qâdî ‘Iyâd : « Furû‘ al-fajr » désigne les tout premiers instants de l’aube.',
    },
    reference: 'Muvatta, s. 115 · Kādî İyâz hâşiyesi',
    targetRoute: 'hadisler',
    targetItemId: 'hadith-4',
    accent: 'burgundy',
  },
  {
    id: 'hadith-5',
    kind: 'hadith',
    parentId: 'bab-2',
    babNumber: 2,
    hadithNumber: 5,
    label: {
      tr: 'Hadis 5 · Hz. Ömer Döneminde 23 Rekât',
      fr: 'Hadith 5 · 23 Rak‘ât à l’époque de ‘Umar',
    },
    shortLabel: {
      tr: 'Hadis 5 · Yezîd b. Rûmân',
      fr: 'Hadith 5 · Yazîd b. Rûmân',
    },
    arabic: 'كَانَ النَّاسُ يَقُومُونَ فِي زَمَانِ عُمَرَ بْنِ الْخَطَّابِ فِي رَمَضَانَ بِثَلَاثٍ وَعِشْرِينَ رَكْعَةً',
    summary: {
      tr: 'Yezîd b. Rûmân, Hz. Ömer döneminde Medine halkının Ramazan gecelerinde (20 terâvih + 3 vitir olmak üzere) 23 rekât namaz kıldığını nakleder.',
      fr: 'Yazîd b. Rûmân rapporte qu’à l’époque du califat de ‘Umar b. al-Khattâb, les fidèles accomplissaient 23 rak‘ât durant les nuits de Ramadan.',
    },
    narratorChain: 'Mâlik ← Yezîd b. Rûmân (Mürsel / Maktû rivayet)',
    keyRuling: {
      tr: 'Fıkhî sentez: Kıraat hafifledikçe rekât sayısının 11’den 23’e çıkarılmasına dair klasik delil.',
      fr: 'Synthèse juridique : Témoignage classique de l’élargissement à 23 rak‘ât (20 + 3 witr).',
    },
    reference: 'Muvatta, s. 115',
    targetRoute: 'hadisler',
    targetItemId: 'hadith-5',
    accent: 'burgundy',
  },
  {
    id: 'hadith-6',
    kind: 'hadith',
    parentId: 'bab-2',
    babNumber: 2,
    hadithNumber: 6,
    label: {
      tr: 'Hadis 6 · Bakara Kıraati ve Kunut',
      fr: 'Hadith 6 · Récitation d’al-Baqara et Qunût',
    },
    shortLabel: {
      tr: 'Hadis 6 · el-A‘rec',
      fr: 'Hadith 6 · al-A‘raj',
    },
    arabic: 'وَكَانَ الْقَارِئُ يَقْرَأُ سُورَةَ الْبَقَرَةِ فِي ثَمَانِ رَكَعَاتٍ',
    summary: {
      tr: 'el-A‘rec, Ramazan’da vitir kunutunda kâfirlere beddua edildiğini ve imamın Bakara sûresini 8 rekâtta okuduğunu, 12 rekâtta okuduğunda ise halkın namazı hafifletmiş saydığını aktarır.',
      fr: 'Al-A‘raj relate la supplication du qunût en Ramadan et note que le récitateur lisait la sourate al-Baqara en 8 rak‘ât ; lorsqu’il la répartissait sur 12 rak‘ât, les fidèles estimaient qu’il avait allégé la prière.',
    },
    narratorChain: 'Mâlik ← Dâvûd b. el-Husayn ← Abdurrahman b. Hürmüz el-A‘rec',
    keyRuling: {
      tr: 'Klasik hâşiye: Bi’r-i Maûne vakası üzerine Resûlullah’ın kunut duasına ittiba ve uzun kıraat ölçüsü.',
      fr: 'Glose classique : Référence au qunût du witr et à l’intensité de la récitation coranique.',
    },
    reference: 'Muvatta, s. 115',
    targetRoute: 'hadisler',
    targetItemId: 'hadith-6',
    accent: 'burgundy',
  },
  {
    id: 'hadith-7',
    kind: 'hadith',
    parentId: 'bab-2',
    babNumber: 2,
    hadithNumber: 7,
    label: {
      tr: 'Hadis 7 · Fecir Korkusu ve Sahur Telaşı',
      fr: 'Hadith 7 · Hâte du Suhûr avant l’aube',
    },
    shortLabel: {
      tr: 'Hadis 7 · Abdullah b. Ebî Bekir',
      fr: 'Hadith 7 · ‘Abdullâh b. Abî Bakr',
    },
    arabic: 'كُنَّا نَنْصَرِفُ فِي رَمَضَانَ فَنَسْتَعْجِلُ الْخَدَمَ بِالطَّعَامِ مَخَافَةَ الْفَجْرِ',
    summary: {
      tr: 'Abdullah b. Ebî Bekir’in babasından naklettiğine göre Medineliler Ramazan gecesi kıyâmından döndüklerinde fecir girmesinden korkarak sahur yemeği için hizmetçileri acele ettirirlerdi.',
      fr: '‘Abdullâh b. Abî Bakr rapporte de son père qu’au retour de la prière nocturne de Ramadan, on pressait les serviteurs d’apporter le repas du suhûr par crainte que l’aube ne survienne.',
    },
    narratorChain: 'Mâlik ← Abdullah b. Ebî Bekir ← Ebû Bekir b. Muhammed b. Hazm',
    keyRuling: {
      tr: 'Tarihî tanıklık: Medine’de terâvih namazının gece boyunca sürdüğünün canlı belgesi.',
      fr: 'Témoignage historique : Preuve vivante de la durée nocturne du qiyâm à Médine.',
    },
    reference: 'Muvatta, s. 116',
    targetRoute: 'hadisler',
    targetItemId: 'hadith-7',
    accent: 'burgundy',
  },
  {
    id: 'hadith-8',
    kind: 'hadith',
    parentId: 'bab-2',
    babNumber: 2,
    hadithNumber: 8,
    label: {
      tr: 'Hadis 8 · Zekvân’ın Hz. Âişe’ye İmameti',
      fr: 'Hadith 8 · Imamat de Dhakwân pour ‘Â’isha',
    },
    shortLabel: {
      tr: 'Hadis 8 · Hişâm b. Urve',
      fr: 'Hadith 8 · Hishâm b. ‘Urwa',
    },
    arabic: 'أَنَّ ذَكْوَانَ أَبَا عَمْرٍو كَانَ يَقُومُ يَقْرَأُ لَهَا فِي رَمَضَانَ',
    summary: {
      tr: 'Hz. Âişe’nin vefatından sonra hür kalmak üzere âzat ettiği (müdebber) kölesi Zekvân Ebû Amr, Ramazan’da ona imamlık yaparak Kur’an okurdu.',
      fr: 'Dhakwân Abû ‘Amr, esclave affranchi par disposition testamentaire (mudabbar) par ‘Â’isha, dirigeait pour elle la prière nocturne en Ramadan.',
    },
    narratorChain: 'Mâlik ← Hişâm b. Urve ← Urve b. ez-Zübeyr',
    keyRuling: {
      tr: 'Feyyûmî hâşiyesi: Tedbîr (vefata bağlı âzat) tanımı ve kölenin nafile namazda imametinin cevazı.',
      fr: 'Glose d’al-Fayyûmî : Définition du tadbîr et licéité de l’imamat de l’esclave en prière surérogatoire.',
    },
    reference: 'Muvatta, s. 116',
    targetRoute: 'hadisler',
    targetItemId: 'hadith-8',
    accent: 'burgundy',
  },
  // Cross-cutting Jurisprudential & Historical Themes
  {
    id: 'theme-usul',
    kind: 'theme',
    parentId: 'root',
    label: {
      tr: 'Amel-i Ehl-i Medîne & Usûl',
      fr: 'Pratique de Médine & Usûl',
    },
    shortLabel: {
      tr: 'Amel-i Ehl-i Medîne',
      fr: '‘Amal Ahl al-Madîna',
    },
    summary: {
      tr: 'İmam Mâlik’in yaşayan sünnet mirasını nasıl bir hukuk deliline dönüştürdüğünü, hadis metinleriyle Medine uygulamasını nasıl harmanladığını inceleyin.',
      fr: 'Découvrez comment l’Imam Mâlik érige la pratique vivante de Médine en source juridique articulée aux récits prophétiques.',
    },
    targetRoute: 'imam-malik',
    targetItemId: 'usul',
    accent: 'gold',
  },
  {
    id: 'theme-rekat',
    kind: 'theme',
    parentId: 'bab-2',
    label: {
      tr: '11 ve 23 Rekât Sentezi',
      fr: 'Synthèse 11 vs 23 Rak‘ât',
    },
    shortLabel: {
      tr: '11 vs. 23 Rekât',
      fr: '11 vs 23 Rak‘ât',
    },
    summary: {
      tr: 'Hadis 4 (11 rekât) ve Hadis 5 (23 rekât) arasındaki fıkhî uzlaştırma: kıyamın uzunluğu ve cemaatin takatine göre şekillenen terâvih pratiği.',
      fr: 'Articulation juridique entre les Hadiths 4 (11 rak‘ât) et 5 (23 rak‘ât) selon la longueur de la récitation et la capacité de la communauté.',
    },
    targetRoute: 'hadisler',
    targetItemId: 'hadith-4',
    accent: 'gold',
  },
  {
    id: 'theme-rivayet',
    kind: 'theme',
    parentId: 'root',
    label: {
      tr: 'el-Muvatta’ Rivayet Ağı',
      fr: 'Réseau des recensions',
    },
    shortLabel: {
      tr: '9 Rivayet Nüshası',
      fr: '9 Recensions',
    },
    summary: {
      tr: 'Yahyâ b. Yahyâ el-Leysî’nin Endülüs’e taşıdığı standart nüsha ile Şeybânî, Ka’nebî, İbnü’l-Kāsım ve Ebû Mus‘ab nüshalarının karşılaştırmalı dökümü.',
      fr: 'Comparaison entre la recension andalouse de Yahyâ al-Laythî et celles d’ash-Shaybânî, al-Qa‘nabî, Ibn al-Qâsim et Abû Mus‘ab.',
    },
    targetRoute: 'el-muvatta',
    targetItemId: 'riwayahs',
    accent: 'gold',
  },
  {
    id: 'theme-map',
    kind: 'theme',
    parentId: 'root',
    label: {
      tr: 'İlim Coğrafyası (Harita)',
      fr: 'Géographie du savoir',
    },
    shortLabel: {
      tr: 'Medine → Endülüs Haritası',
      fr: 'Carte Médine → al-Andalus',
    },
    summary: {
      tr: 'Yemen’deki Asbahî köklerinden Medine’deki Mescid-i Nebevî halkasına, Mısır, Kayrevan ve Kurtuba’ya uzanan Mâlikî ilim coğrafyası.',
      fr: 'Des origines yéménites jusqu’au cercle de la Mosquée du Prophète, puis vers l’Égypte, Kairouan et Cordoue.',
    },
    targetRoute: 'harita',
    accent: 'gold',
  },
];

export function getMindMapNodeById(id: string): MindMapNode | undefined {
  return MIND_MAP_NODES.find((node) => node.id === id);
}

export function getHadithNodesByBab(babNumber: 1 | 2): MindMapNode[] {
  return MIND_MAP_NODES.filter((node) => node.kind === 'hadith' && node.babNumber === babNumber);
}

export function getThemeNodes(): MindMapNode[] {
  return MIND_MAP_NODES.filter((node) => node.kind === 'theme');
}
