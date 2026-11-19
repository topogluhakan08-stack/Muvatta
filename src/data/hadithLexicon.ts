import type { BilingualString } from '../types/atlas';
import type {
  HadithWordToken,
  LexiconEntry,
  WordDerivative,
  WordPartOfSpeech,
} from '../types/hadith';

const POS_LABELS: Record<WordPartOfSpeech, BilingualString> = {
  fiil: { tr: 'Fiil', fr: 'Verbe (Fi‘l)' },
  isim: { tr: 'İsim', fr: 'Nom (Ism)' },
  harf: { tr: 'Harf / Edat', fr: 'Particule (Harf)' },
  zamir: { tr: 'Zamir', fr: 'Pronom (Damîr)' },
  'ism-i-mevsul': { tr: 'İsm-i Mevsûl', fr: 'Pronom relatif (Mawsûl)' },
  'ism-i-isaret': { tr: 'İsm-i İşâret', fr: 'Démonstratif (Ishâra)' },
  zarf: { tr: 'Zarf', fr: 'Adverbe / Circonstant (Zarf)' },
};

/**
 * Strips Arabic diacritics, tatweel, dagger alif, and normalizes hamza/alif forms
 * for deterministic dictionary lookup.
 */
export function normalizeArabicToken(raw: string): string {
  return raw
    .replace(/[\u064B-\u065F\u0670\u0640\u06D6-\u06ED]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .trim();
}

function makeEntry(
  surfaceKey: string,
  lemma: string,
  transliteration: string,
  root: string,
  pos: WordPartOfSpeech,
  meaning: BilingualString,
  sarf: BilingualString,
  nahiv: BilingualString,
  derivatives: WordDerivative[] = [],
  isCoreGlossaryTerm = false
): LexiconEntry {
  return {
    key: normalizeArabicToken(surfaceKey),
    lemma,
    transliteration,
    root,
    pos,
    posLabel: POS_LABELS[pos],
    meaning,
    sarf,
    nahiv,
    derivatives,
    isCoreGlossaryTerm,
  };
}

const RAW_LEXICON_ENTRIES: LexiconEntry[] = [
  // --- Rivayet & İsnad lafızları / Transmission terms & Narrators ---
  makeEntry(
    'حدثني',
    'حَدَّثَ — يُحَدِّثُ',
    'haddesenî',
    'ح د ث',
    'fiil',
    { tr: 'Bana rivayet etti / anlattı', fr: 'Il m’a rapporté / transmis' },
    {
      tr: 'Tef‘îl (II.) bâbı mâzî fiil + nûn-i vikāye + mütekellim zamiri (ي)',
      fr: 'Verbe accompli forme II (fa‘‘ala) + nûn de protection + pronom « me »',
    },
    {
      tr: 'Fiil-i mâzî fetha üzere mebnî; sondaki ي mef‘ûlün bih mahallen mansub',
      fr: 'Accompli invariable ; le pronom suffixe est complément d’objet direct',
    },
    [
      { arabic: 'حَدِيثٌ', translit: 'hadîs', meaning: { tr: 'Söz, nebevî rivayet', fr: 'Parole, récit prophétique' } },
      { arabic: 'مُحَدِّثٌ', translit: 'muhaddis', meaning: { tr: 'Hadis âlimi', fr: 'Savant du hadith' } },
      { arabic: 'تَحْدِيثٌ', translit: 'tahdîs', meaning: { tr: 'Hadis rivayeti (semâ)', fr: 'Transmission orale' } },
    ],
    true
  ),
  makeEntry(
    'وحدثني',
    'وَ + حَدَّثَنِي',
    've haddesenî',
    'ح د ث',
    'fiil',
    { tr: 'Ve bana rivayet etti', fr: 'Et il m’a également rapporté' },
    {
      tr: 'Atıf vâvı (وَ) + Tef‘îl (II.) bâbı mâzî fiil + mütekellim zamiri',
      fr: 'Conjonction « wa » + verbe accompli forme II + pronom suffixe',
    },
    {
      tr: 'Önceki rivayete atfedilmiş isnad başlangıç cümlesi',
      fr: 'Proposition d’isnâd coordonnée au récit précédent',
    },
    [
      { arabic: 'حَدِيثٌ', translit: 'hadîs', meaning: { tr: 'Rivayet', fr: 'Hadith' } },
      { arabic: 'مُحَدِّثٌ', translit: 'muhaddis', meaning: { tr: 'Hadisçi', fr: 'Traditionniste' } },
    ]
  ),
  makeEntry(
    'يحيى',
    'يَحْيَىٰ',
    'Yahyâ',
    'ح ي ي',
    'isim',
    { tr: 'Yahyâ (b. Yahyâ el-Leysî, ö. 234/848)', fr: 'Yahyâ (b. Yahyâ al-Laythî, m. 234/848)' },
    {
      tr: 'Alem (özel isim), maksûr isim (elif-i maksûre ile biter)',
      fr: 'Nom propre (ism ‘alam) à terminaison alif maqsûra',
    },
    {
      tr: 'حَدَّثَنِي fiilinin fâili; elif üzerinde takdîren merfû',
      fr: 'Sujet (fâ‘il) du verbe haddathanî, au nominatif implicite',
    },
    [{ arabic: 'حَيَاةٌ', translit: 'hayât', meaning: { tr: 'Yaşam, hayat', fr: 'Vie' } }]
  ),
  makeEntry(
    'عن',
    'عَنْ',
    '‘an',
    '—',
    'harf',
    { tr: '-den, -dan (rivayet edatı: an‘ane)', fr: 'D’après, de la part de (particule d’isnâd)' },
    {
      tr: 'Harf-i cer (mebnî, çekimsiz edat)',
      fr: 'Préposition invariable (harf jarr)',
    },
    {
      tr: 'Sonraki râviyi cer eder; isnad zincirinde aktarım bağlacı (an‘ane)',
      fr: 'Gouverne le cas génitif du transmetteur suivant',
    },
    [{ arabic: 'مُعَنْعَنٌ', translit: 'mu‘an‘an', meaning: { tr: '«An» lafzıyla rivayet edilen hadis', fr: 'Hadith transmis par la formule « ‘an »' } }],
    true
  ),
  makeEntry(
    'مالك',
    'مَالِكٌ',
    'Mâlik',
    'م ل ك',
    'isim',
    { tr: 'İmam Mâlik b. Enes (93–179 / 712–795)', fr: 'Imam Mâlik b. Anas (93–179 / 712–795)' },
    {
      tr: 'Sülâsî mücerred ism-i fâil (فَاعِلٌ) kalıbında özel isim',
      fr: 'Nom propre sur le schème du participe actif (fâ‘il)',
    },
    {
      tr: 'Hadis 3’te fâil (merfû), diğerlerinde عَنْ harfiyle mecrûr',
      fr: 'Sujet au nominatif (Hadith 3) ou régi au génitif par ‘an',
    },
    [
      { arabic: 'مَلِكٌ', translit: 'melik', meaning: { tr: 'Hükümdar', fr: 'Roi' } },
      { arabic: 'مِلْكٌ', translit: 'milk', meaning: { tr: 'Mülkiyet', fr: 'Propriété' } },
    ]
  ),
  makeEntry(
    'ابن',
    'ابْنٌ',
    'ibn',
    'ب ن ي',
    'isim',
    { tr: 'Oğlu (nesep bağlacı)', fr: 'Fils de (marqueur de filiation)' },
    {
      tr: 'Sülâsî isim (hemze-i vasıl ile; iki özel isim arasında elifi düşer)',
      fr: 'Nom de filiation à hamza de liaison',
    },
    {
      tr: 'Muzâf veya sıfat/bedel konumunda; babasının adına izâfe edilir',
      fr: 'Premier terme d’annexion (mudâf) ou apposition généalogique',
    },
    [{ arabic: 'أَبْنَاءٌ', translit: 'ebnâ’', meaning: { tr: 'Oğullar', fr: 'Fils (pl.)' } }]
  ),
  makeEntry(
    'بن',
    'بْنُ',
    'bin / b.',
    'ب ن ي',
    'isim',
    { tr: 'Oğlu (iki alem arasında yazım şekli)', fr: 'Fils de (graphie entre deux noms propres)' },
    {
      tr: 'İki özel isim arasında elifsiz yazılan ابْنٌ ismi',
      fr: 'Forme sans alif d’ibn entre deux noms propres',
    },
    {
      tr: 'Önceki isme sıfat/tâbi ve sonraki isme muzâf',
      fr: 'Qualificatif généalogique suivi d’un complément au génitif',
    }
  ),
  makeEntry(
    'شهاب',
    'شِهَابٌ',
    'Şihâb',
    'ش ه ب',
    'isim',
    { tr: 'İbn Şihâb ez-Zührî (ö. 124/742, Mâlik’in en büyük hocası)', fr: 'Ibn Shihâb az-Zuhrî (m. 124/742, maître majeur de Mâlik)' },
    {
      tr: 'Fı‘âl (فِعَالٌ) kalıbında isim; sözlükte «parlak ateş / yıldız»',
      fr: 'Nom de schème fi‘âl ; littéralement « étoile filante, flamme »',
    },
    {
      tr: 'ابْنِ kelimesinin muzâfün ileyhi, kesra ile mecrûr',
      fr: 'Complément du nom (mudâf ilayhi) au génitif',
    },
    [{ arabic: 'شُهُبٌ', translit: 'şühüb', meaning: { tr: 'Kayan yıldızlar', fr: 'Étoiles filantes' } }]
  ),
  makeEntry(
    'عروة',
    'عُرْوَةُ',
    'Urve',
    'ع ر و',
    'isim',
    { tr: 'Urve b. ez-Zübeyr (Medineli yedi fakihten biri, ö. 94/713)', fr: '‘Urwa b. az-Zubayr (un des 7 juristes de Médine, m. 94/713)' },
    {
      tr: 'Müenneslik tâsı taşıyan gayr-i munsarif erkek özel ismi',
      fr: 'Nom propre masculin diptote (ghayr munsarif)',
    },
    {
      tr: 'عَنْ harf-i cerriyle fetha üzere mecrûr (gayr-i munsarif)',
      fr: 'Au génitif marqué par une fatha (nom diptote)',
    },
    [{ arabic: 'عُرْوَةٌ', translit: 'urve', meaning: { tr: 'Kulp, sağlam bağ', fr: 'Anse, lien solide' } }]
  ),
  makeEntry(
    'الزبير',
    'الزُّبَيْرُ',
    'ez-Zübeyr',
    'ز ب ر',
    'isim',
    { tr: 'ez-Zübeyr b. el-Avvâm (Aşere-i Mübeşşere’den sahâbî)', fr: 'az-Zubayr b. al-‘Awwâm (illustre Compagnon)' },
    {
      tr: 'Tasgîr (küçültme, فُعَيْلٌ) kalıbında özel isim',
      fr: 'Nom propre sur le schème diminutif fu‘ayl',
    },
    {
      tr: 'بْنِ kelimesinin muzâfün ileyhi, kesra ile mecrûr',
      fr: 'Complément d’annexion au génitif',
    }
  ),
  makeEntry(
    'عائشة',
    'عَائِشَةُ',
    'Âişe',
    'ع ي ش',
    'isim',
    { tr: 'Hz. Âişe (r.anhâ), Müminlerin Annesi (ö. 58/678)', fr: '‘Â’isha (qu’Allah l’agrée), Mère des croyants' },
    {
      tr: 'Müennes ism-i fâil (فَاعِلَةٌ) kalıbında gayr-i munsarif özel isim',
      fr: 'Nom propre féminin diptote (participe actif féminin)',
    },
    {
      tr: 'عَنْ ile mecrûr; gayr-i munsarif olduğu için cer alâmeti fethadır',
      fr: 'Génitif marqué par fatha car nom diptote',
    },
    [{ arabic: 'عَيْشٌ', translit: 'ayş', meaning: { tr: 'Yaşam, geçim', fr: 'Vie, subsistance' } }]
  ),
  makeEntry(
    'لعائشة',
    'لِ + عَائِشَةَ',
    'li-Âişete',
    'ع ي ش',
    'isim',
    { tr: 'Hz. Âişe’ye ait / Hz. Âişe’nin', fr: 'Appartenant à ‘Â’isha' },
    {
      tr: 'Mülkiyet lâmı (لِ) + gayr-i munsarif özel isim',
      fr: 'Préposition d’appartenance li- + nom propre diptote',
    },
    {
      tr: 'Câr ve mecrûr; عَبْدًا kelimesine sıfat/müteallak',
      fr: 'Syntagme prépositionnel qualifiant ‘abdan',
    }
  ),
  makeEntry(
    'زوج',
    'زَوْجٌ',
    'zevc',
    'ز و ج',
    'isim',
    { tr: 'Eş, zevce (Hz. Peygamber’in eşi)', fr: 'Épouse, conjointe' },
    {
      tr: 'Sülâsî isim; klasik Arapçada hem erkek hem kadın eş için kullanılır',
      fr: 'Nom trilitère désignant l’époux ou l’épouse en arabe classique',
    },
    {
      tr: 'عَائِشَةَ isminden bedel/sıfat; kesra ile mecrûr ve muzâf',
      fr: 'Apposition au génitif (badal) et premier terme d’annexion',
    },
    [
      { arabic: 'أَزْوَاجٌ', translit: 'ezvâc', meaning: { tr: 'Eşler', fr: 'Épouses / couples' } },
      { arabic: 'زَوَاجٌ', translit: 'zevâc', meaning: { tr: 'Evlilik', fr: 'Mariage' } },
    ]
  ),
  makeEntry(
    'النبي',
    'النَّبِيُّ',
    'en-Nebî',
    'ن ب أ',
    'isim',
    { tr: 'Peygamber (s.a.v.)', fr: 'Le Prophète (paix et salut sur lui)' },
    {
      tr: 'Fa‘îl (فَعِيلٌ) kalıbında sıfat-ı müşebbehe / isim',
      fr: 'Nom de schème fa‘îl issu de la racine « annoncer »',
    },
    {
      tr: 'زَوْجِ kelimesinin muzâfün ileyhi, kesra ile mecrûr',
      fr: 'Complément du nom au génitif',
    },
    [
      { arabic: 'نُبُوَّةٌ', translit: 'nübüvve', meaning: { tr: 'Peygamberlik', fr: 'Prophétie' } },
      { arabic: 'نَبَأٌ', translit: 'nebe’', meaning: { tr: 'Büyük haber', fr: 'Grande nouvelle' } },
    ]
  ),
  makeEntry(
    'ﷺ',
    'صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
    'sallallâhu aleyhi ve sellem',
    'ص ل و',
    'fiil',
    { tr: 'Allah’ın salât ve selâmı onun üzerine olsun', fr: 'Que la paix et la bénédiction d’Allah soient sur lui' },
    {
      tr: 'Salvele (duâ cümlesi kısaltma sembolü)',
      fr: 'Eulogie prophétique (tasliya)',
    },
    {
      tr: 'İ‘tirâziyye (ara dua cümlesi), i‘rabdan mahalli yoktur',
      fr: 'Proposition optative incise (i‘tirâdiyya)',
    }
  ),
  makeEntry(
    'ان',
    'أَنَّ / أَنْ',
    'enne / en',
    '—',
    'harf',
    { tr: 'Şüphesiz ki / -mesi, -ması (masdar veya tekit edatı)', fr: 'Que / certes (particule de subordination ou d’emphase)' },
    {
      tr: 'أَنَّ: hurûf-ı müşebbehe bi’l-fiil; أَنْ: muzâriyi nasbeden masdariye edatı',
      fr: 'Anna (particule nominale) ou an (conjonction subjonctive)',
    },
    {
      tr: 'أَنَّ ismini nasb, haberini ref‘ eder; أَنْ muzâri fiili nasbeder',
      fr: 'Régit l’accusatif du sujet (anna) ou le subjonctif du verbe (an)',
    }
  ),
  makeEntry(
    'انه',
    'أَنَّ + هُ',
    'ennehû',
    '—',
    'harf',
    { tr: 'Şüphesiz o (râvi) şöyle dedi ki', fr: 'Qu’il a dit / rapporté' },
    {
      tr: 'أَنَّ (tekit edatı) + gāib müfred zamiri (هُ)',
      fr: 'Particule anna + pronom affixe masculin singulier -hu',
    },
    {
      tr: 'هُ zamiri أَنَّ’nin ismi (mahallen mansub); sonraki fiil cümlesi haberidir',
      fr: 'Le pronom est sujet d’anna ; la proposition verbale suivante est son prédicat',
    }
  ),
  makeEntry(
    'اني',
    'أَنِّي / إِنِّي',
    'ennî / innî',
    '—',
    'harf',
    { tr: 'Şüphesiz ben / benim ... olmam', fr: 'Que je / certes je' },
    {
      tr: 'أَنَّ / إِنَّ + mütekellim yâsı (ي)',
      fr: 'Particule anna/inna + pronom de 1re personne',
    },
    {
      tr: 'ي zamiri أَنَّ / إِنَّ’nin ismi, mahallen mansub',
      fr: 'Pronom 1re pers. sujet de la particule emphatique',
    }
  ),
  makeEntry(
    'رسول',
    'رَسُولٌ',
    'Resûl',
    'ر س ل',
    'isim',
    { tr: 'Elçi, Resûl', fr: 'Messager, Envoyé' },
    {
      tr: 'Fe‘ûl (فَعُولٌ) kalıbında ism-i mef‘ûl mânalı sıfat/isim',
      fr: 'Nom de schème fa‘ûl (« envoyé »)',
    },
    {
      tr: 'أَنَّ’nin ismi (mansub) veya fiilin fâili (merfû), muzâf',
      fr: 'Sujet d’anna (accusatif) ou sujet verbal (nominatif), annexé à Allâh',
    },
    [
      { arabic: 'رِسَالَةٌ', translit: 'risâle', meaning: { tr: 'Elçilik, mesaj', fr: 'Mission prophétique, message' } },
      { arabic: 'مُرْسَلٌ', translit: 'mürsel', meaning: { tr: 'Gönderilen; mürsel hadis', fr: 'Envoyé ; hadith mursal' } },
    ]
  ),
  makeEntry(
    'الله',
    'اللَّهُ',
    'Allâh',
    'أ ل ه',
    'isim',
    { tr: 'Allah (Lafza-i Celâl)', fr: 'Allah (Dieu)' },
    {
      tr: 'Lafza-i Celâl (Yüce Allah’ın zatî özel ismi)',
      fr: 'Nom suprême de Dieu (Lafz al-Jalâla)',
    },
    {
      tr: 'رَسُولُ kelimesinin muzâfün ileyhi, kesra ile mecrûr',
      fr: 'Complément d’annexion au génitif',
    }
  ),
  makeEntry(
    'والله',
    'وَ + اللَّهِ',
    'vallâhi',
    'أ ل ه',
    'isim',
    { tr: 'Allah’a yemin olsun ki!', fr: 'Par Allah ! (serment)' },
    {
      tr: 'Kasem (yemin) vâvı + Lafza-i Celâl',
      fr: 'Wâw de serment (qasam) + Allâh',
    },
    {
      tr: 'Kasem harfiyle kesra üzere mecrûr; yemin cümlesi',
      fr: 'Génitif gouverné par la particule de serment',
    }
  ),

  // --- Hadis 1 Kelimeleri ---
  makeEntry(
    'صلى',
    'صَلَّىٰ — يُصَلِّي',
    'sallâ',
    'ص ل و',
    'fiil',
    { tr: 'Namaz kıldı', fr: 'Il pria (accomplit la salât)' },
    {
      tr: 'Tef‘îl (II.) bâbı, nâkıs-ı vâvî mâzî fiil (müfred müzekker gāib)',
      fr: 'Verbe accompli forme II (défectueux en wâw), 3e pers. masc. sg.',
    },
    {
      tr: 'Elif üzerinde mukadder fetha ile mebnî fiil-i mâzî',
      fr: 'Verbe accompli au passé (fatha implicite sur l’alif maqsûra)',
    },
    [
      { arabic: 'صَلَاةٌ', translit: 'salât', meaning: { tr: 'Namaz, dua', fr: 'Prière rituelle' } },
      { arabic: 'مُصَلٍّ', translit: 'musallî', meaning: { tr: 'Namaz kılan', fr: 'Orant, fidèle en prière' } },
    ],
    true
  ),
  makeEntry(
    'فصلى',
    'فَ + صَلَّىٰ',
    'fe-sallâ',
    'ص ل و',
    'fiil',
    { tr: 'Bunun üzerine (hemen) namaz kıldı', fr: 'Alors ils prièrent aussitôt' },
    {
      tr: 'Ta‘kîbiyye fâsı (فَ) + Tef‘îl bâbı mâzî fiil',
      fr: 'Particule consécutive fa- + verbe accompli forme II',
    },
    {
      tr: 'Önceki cümleye takibî atıf; fâili sonraki نَاسٌ kelimesidir',
      fr: 'Proposition consécutive ayant nâsun pour sujet',
    },
    [{ arabic: 'صَلَاةٌ', translit: 'salât', meaning: { tr: 'Namaz', fr: 'Prière' } }]
  ),
  makeEntry(
    'في',
    'فِي',
    'fî',
    '—',
    'harf',
    { tr: '-de, -da, içinde (zarfiyet edatı)', fr: 'Dans, durant, au cours de' },
    {
      tr: 'Harf-i cer (mekân veya zaman zarfiyeti bildirir)',
      fr: 'Préposition locative ou temporelle invariable',
    },
    {
      tr: 'Sonraki ismi cer eder; câr-mecrûr fiile müteallaktır',
      fr: 'Régit le génitif ; forme un complément circonstanciel',
    }
  ),
  makeEntry(
    'المسجد',
    'الْمَسْجِدُ',
    'el-mescid',
    'س ج د',
    'isim',
    { tr: 'Mescid (Mescid-i Nebevî)', fr: 'La Mosquée (Mosquée du Prophète à Médine)' },
    {
      tr: 'İsm-i mekân (مَفْعِلٌ — şâz/semâî kesralı kalıp)',
      fr: 'Nom de lieu (ism makân) sur le schème maf‘il',
    },
    {
      tr: 'فِي veya إِلَى harf-i cerriyle kesra üzere mecrûr',
      fr: 'Complément circonstanciel de lieu au génitif',
    },
    [
      { arabic: 'سُجُودٌ', translit: 'sücûd', meaning: { tr: 'Secde', fr: 'Prosternation' } },
      { arabic: 'سَاجِدٌ', translit: 'sâcid', meaning: { tr: 'Secde eden', fr: 'Prosterné' } },
    ],
    true
  ),
  makeEntry(
    'ذات',
    'ذَاتُ',
    'zâte',
    'ذ و',
    'isim',
    { tr: 'Bir (gece), sahibi (ذَاتَ لَيْلَةٍ: bir gece)', fr: 'Une certaine (nuit : dhâta laylatin)' },
    {
      tr: 'ذُو kelimesinin müennesi; zaman ismiyle zarf terkibi kurar',
      fr: 'Féminin de dhû ; forme une locution temporelle figée',
    },
    {
      tr: 'Zarf-ı zaman olarak fetha ile mansub ve muzâf',
      fr: 'Complément circonstanciel de temps à l’accusatif',
    }
  ),
  makeEntry(
    'ليلة',
    'لَيْلَةٌ',
    'leyletin / leyleten',
    'ل ي ل',
    'isim',
    { tr: 'Bir gece', fr: 'Une nuit' },
    {
      tr: 'İsm-i vahdet (tek bir geceyi gösteren müennes isim)',
      fr: 'Nom d’unité féminin désignant une nuit précise',
    },
    {
      tr: 'Hadis 1’de muzâfün ileyh (mecrûr); Hadis 3’te zarf-ı zaman (mansub)',
      fr: 'Au génitif après dhâta (H1) ou accusatif temporel (H3)',
    },
    [{ arabic: 'لَيَالٍ', translit: 'leyâlin', meaning: { tr: 'Geceler', fr: 'Nuits' } }]
  ),
  makeEntry(
    'بصلاته',
    'بِ + صَلَاةِ + هِ',
    'bi-salâtihî',
    'ص ل و',
    'isim',
    { tr: 'Onun namazıyla (ona uyarak / iktidâ ederek)', fr: 'En suivant sa prière (derrière lui comme imam)' },
    {
      tr: 'Bâ-yı musâhabe/istiâne (بِ) + صَلَاةٌ (isim) + gāib zamiri (هِ)',
      fr: 'Préposition bi- + nom salât + pronom possessif -hi',
    },
    {
      tr: 'Câr-mecrûr; cemaatle iktidâ mânasını ifade eder',
      fr: 'Complément indiquant le suivi de l’imam en prière',
    },
    [{ arabic: 'صَلَّىٰ', translit: 'sallâ', meaning: { tr: 'Namaz kıldı', fr: 'Prier' } }],
    true
  ),
  makeEntry(
    'بصلاة',
    'بِ + صَلَاةِ',
    'bi-salâti',
    'ص ل و',
    'isim',
    { tr: 'Namazıyla (imamına uyarak)', fr: 'En suivant la prière de' },
    {
      tr: 'Harf-i cer (بِ) + صَلَاةٌ ismi (muzâf)',
      fr: 'Préposition bi- + nom salât annexé',
    },
    {
      tr: 'بِ ile mecrûr ve sonraki قَارِئِهِمْ kelimesine muzâf',
      fr: 'Au génitif, premier terme d’annexion',
    }
  ),
  makeEntry(
    'ناس',
    'نَاسٌ',
    'nâsun',
    'أ ن س',
    'isim',
    { tr: 'Bir grup insan, bazı kimseler (nekre)', fr: 'Quelques personnes, des gens' },
    {
      tr: 'İsm-i cem‘ (topluluk ismi); aslı أُنَاسٌ olup hemzesi hazfedilmiştir',
      fr: 'Nom collectif indéfini (issu d’unâs)',
    },
    {
      tr: 'فَصَلَّىٰ fiilinin fâili; damme ile merfû',
      fr: 'Sujet (fâ‘il) au nominatif',
    },
    [{ arabic: 'إِنْسَانٌ', translit: 'insân', meaning: { tr: 'İnsan', fr: 'Être humain' } }]
  ),
  makeEntry(
    'الناس',
    'النَّاسُ',
    'en-nâs',
    'أ ن س',
    'isim',
    { tr: 'İnsanlar, halk / cemaat', fr: 'Les gens, l’assemblée des fidèles' },
    {
      tr: 'Elif-lâm ile mârifelik kazanmış ism-i cem‘',
      fr: 'Nom collectif défini par l’article al-',
    },
    {
      tr: 'Bağlama göre fâil, mübtedâ, كَانَ’nin ismi veya mef‘ûlün bih',
      fr: 'Sujet verbal, thème nominal ou complément selon le hadith',
    }
  ),
  makeEntry(
    'للناس',
    'لِ + النَّاسِ',
    'li’n-nâsi',
    'أ ن س',
    'isim',
    { tr: 'İnsanlara (imamlık yaparak)', fr: 'Pour les gens (en dirigeant leur prière)' },
    {
      tr: 'Harf-i cer (لِ) + النَّاسُ (elifi düşer)',
      fr: 'Préposition li- + an-nâs',
    },
    {
      tr: 'Câr-mecrûr; يَقُومَا fiiline müteallak',
      fr: 'Complément d’attribution du verbe yaqûmâ',
    }
  ),
  makeEntry(
    'ثم',
    'ثُمَّ',
    'sümme',
    '—',
    'harf',
    { tr: 'Sonra, ardından (terâhî / zaman aralığı ile)', fr: 'Ensuite, puis (avec intervalle temporel)' },
    {
      tr: 'Atıf harfi (fetha üzere mebnî)',
      fr: 'Conjonction de coordination marquant la succession',
    },
    {
      tr: 'İki olay arasında zaman sırası ve ara bulunduğunu bildirir',
      fr: 'Relie deux actions successives dans le récit',
    }
  ),
  makeEntry(
    'الليلة',
    'اللَّيْلَةُ',
    'el-leylete',
    'ل ي ل',
    'isim',
    { tr: 'Gece (o gece)', fr: 'La nuit' },
    {
      tr: 'Mârife müennes isim',
      fr: 'Nom féminin défini',
    },
    {
      tr: 'Zarf-ı zaman olarak mansub veya مِن ile mecrûr',
      fr: 'Complément de temps (accusatif ou génitif après min)',
    }
  ),
  makeEntry(
    'القابلة',
    'الْقَابِلَةُ',
    'el-kābilete',
    'ق ب ل',
    'isim',
    { tr: 'Ertesi, gelen (gece)', fr: 'Suivante (la nuit suivante)' },
    {
      tr: 'Sülâsî müennes ism-i fâil (فَاعِلَةٌ)',
      fr: 'Participe actif féminin (fâ‘ila)',
    },
    {
      tr: 'اللَّيْلَةَ kelimesinin sıfatı; fetha ile mansub',
      fr: 'Épithète (na‘t) de al-laylata à l’accusatif',
    },
    [
      { arabic: 'مُقْبِلٌ', translit: 'mukbil', meaning: { tr: 'Yaklaşan, gelen', fr: 'À venir' } },
      { arabic: 'قِبْلَةٌ', translit: 'kıble', meaning: { tr: 'Yön, kıble', fr: 'Direction de la prière' } },
    ],
    true
  ),
  makeEntry(
    'فكثر',
    'فَ + كَثُرَ',
    'fe-kesura',
    'ك ث ر',
    'fiil',
    { tr: 'Bunun üzerine çoğaldı', fr: 'Et ils devinrent nombreux' },
    {
      tr: 'Atıf fâsı + Sülâsî 5. bâb (فَعُلَ — lâzım) mâzî fiil',
      fr: 'Fa- consécutif + verbe statif forme I (fa‘ula)',
    },
    {
      tr: 'Fiil-i mâzî fetha üzere mebnî; fâili النَّاسُ',
      fr: 'Verbe accompli ayant an-nâsu pour sujet',
    },
    [{ arabic: 'كَثِيرٌ', translit: 'kesîr', meaning: { tr: 'Çok, kalabalık', fr: 'Nombreux' } }]
  ),
  makeEntry(
    'اجتمعوا',
    'اجْتَمَعَ — يَجْتَمِعُ',
    'icteme‘û',
    'ج م ع',
    'fiil',
    { tr: 'Toplandılar, bir araya geldiler', fr: 'Ils se rassemblèrent' },
    {
      tr: 'İfti‘âl (VIII.) bâbı mâzî fiil, cem-i müzekker gāib (و)',
      fr: 'Verbe accompli forme VIII (ifta‘ala), 3e pers. masc. pl.',
    },
    {
      tr: 'Vâv-ı cemâat üzere damme ile mebnî; و mahallen merfû fâil',
      fr: 'Verbe au pluriel dont le wâw final est le sujet',
    },
    [
      { arabic: 'جَمَاعَةٌ', translit: 'cemâ‘at', meaning: { tr: 'Topluluk, cemaat', fr: 'Congrégation' } },
      { arabic: 'جَامِعٌ', translit: 'câmi‘', meaning: { tr: 'Toplayan, cami', fr: 'Grande mosquée' } },
    ],
    true
  ),
  makeEntry(
    'من',
    'مِنْ / مَنْ',
    'min / men',
    '—',
    'harf',
    { tr: 'مِنْ: -den, -dan | مَنْ: kim ki (şart ismi)', fr: 'Min : de, depuis | Man : quiconque' },
    {
      tr: 'مِنْ harf-i cer; مَنْ şart veya mevsûl ismi (bağlama göre)',
      fr: 'Préposition partitive/temporelle (min) ou pronom conditionnel (man)',
    },
    {
      tr: 'مِنْ sonraki ismi cer eder; Hadis 2’deki مَنْ şart ismi (mübtedâ) olup قَامَ ile cezmeder',
      fr: 'Min régit le génitif ; man (H2) introduit la conditionnelle',
    }
  ),
  makeEntry(
    'الثالثة',
    'الثَّالِثَةُ',
    'es-sâliseti',
    'ث ل ث',
    'isim',
    { tr: 'Üçüncü (gece)', fr: 'Troisième (nuit)' },
    {
      tr: 'Sıra sayısı (ism-i fâil kalıbı, müennes)',
      fr: 'Adjectif numéral ordinal féminin',
    },
    {
      tr: 'اللَّيْلَةِ kelimesinin sıfatı; kesra ile mecrûr',
      fr: 'Épithète au génitif accordée avec al-laylati',
    }
  ),
  makeEntry(
    'او',
    'أَوْ',
    'ev',
    '—',
    'harf',
    { tr: 'Veya, yahut (râvi tereddüdü)', fr: 'Ou bien (hésitation du transmetteur)' },
    {
      tr: 'Atıf harfi (sükûn üzere mebnî, geçişte kesra alır)',
      fr: 'Conjonction disjonctive invariable',
    },
    {
      tr: 'الرَّابِعَةِ kelimesini الثَّالِثَةِ’ye atfeder',
      fr: 'Coordonne « quatrième » à « troisième »',
    }
  ),
  makeEntry(
    'الرابعة',
    'الرَّابِعَةُ',
    'er-râbi‘ati',
    'ر ب ع',
    'isim',
    { tr: 'Dördüncü (gece)', fr: 'Quatrième (nuit)' },
    {
      tr: 'Müennes sıra sayısı (فَاعِلَةٌ)',
      fr: 'Ordinal féminin singulier',
    },
    {
      tr: 'أَوْ ile الثَّالِثَةِ’ye ma‘tûf; kesra ile mecrûr',
      fr: 'Coordonné au génitif',
    }
  ),
  makeEntry(
    'فلم',
    'فَ + لَمْ',
    'fe-lem',
    '—',
    'harf',
    { tr: 'Bunun üzerine ...-madı (olumsuz geçmiş zaman)', fr: 'Mais il ne ... pas (négation du passé)' },
    {
      tr: 'Atıf fâsı + cezm ve kalb edatı لَمْ',
      fr: 'Fa- + particule négative d’apocopé (jussive) lam',
    },
    {
      tr: 'Muzâri fiili cezmeder ve anlamını olumsuz mâzîye çevirir',
      fr: 'Met le verbe inaccompli à l’apocopé avec valeur de passé négatif',
    }
  ),
  makeEntry(
    'ولم',
    'وَ + لَمْ',
    've lem',
    '—',
    'harf',
    { tr: 'Ve ...-madı', fr: 'Et rien ne ...' },
    {
      tr: 'Atıf vâvı + cezm edatı لَمْ',
      fr: 'Conjonction wa- + particule négative lam',
    },
    {
      tr: 'Sonraki muzâri fiili (يَمْنَعْنِي) sükûn ile cezmeder',
      fr: 'Gouverne l’apocopé du verbe suivant',
    }
  ),
  makeEntry(
    'يخرج',
    'خَرَجَ — يَخْرُجُ',
    'yahruc',
    'خ ر ج',
    'fiil',
    { tr: 'Çıkmadı (hücresinden mescide)', fr: 'Ne sortit pas (vers eux)' },
    {
      tr: 'Sülâsî 1. bâb (نَصَرَ) muzâri fiil, müfred müzekker gāib',
      fr: 'Verbe inaccompli forme I, 3e pers. masc. sg.',
    },
    {
      tr: 'لَمْ ile sükûn üzere meczûm fiil-i muzâri; fâili رَسُولُ اللَّهِ',
      fr: 'Inaccompli apocopé par lam',
    },
    [{ arabic: 'خُرُوجٌ', translit: 'hurûc', meaning: { tr: 'Çıkmak, çıkış', fr: 'Sortie' } }]
  ),
  makeEntry(
    'اليهم',
    'إِلَىٰ + هِمْ',
    'ileyhim',
    '—',
    'harf',
    { tr: 'Onlara doğru / onların yanına', fr: 'Vers eux' },
    {
      tr: 'Harf-i cer (إِلَىٰ) + cem-i müzekker gāib zamiri (هِمْ)',
      fr: 'Préposition ilâ + pronom affixe 3e pers. masc. pl.',
    },
    {
      tr: 'Câr-mecrûr; يَخْرُجْ fiiline müteallak',
      fr: 'Complément directionnel du verbe sortir',
    }
  ),
  makeEntry(
    'اليكم',
    'إِلَىٰ + كُمْ',
    'ileyküm',
    '—',
    'harf',
    { tr: 'Size doğru / sizin yanınıza', fr: 'Vers vous' },
    {
      tr: 'Harf-i cer (إِلَىٰ) + cem-i müzekker muhâtab zamiri (كُمْ)',
      fr: 'Préposition ilâ + pronom affixe 2e pers. masc. pl.',
    },
    {
      tr: 'الْخُرُوجِ masdarına müteallak câr-mecrûr',
      fr: 'Complément du nom verbal al-khurûj',
    }
  ),
  makeEntry(
    'الى',
    'إِلَىٰ',
    'ilâ',
    '—',
    'harf',
    { tr: '-e, -a doğru (yönelme edatı)', fr: 'Vers, à (préposition de direction)' },
    {
      tr: 'Harf-i cer (intihâü’l-gāye)',
      fr: 'Préposition directionnelle invariable',
    },
    {
      tr: 'Sonraki ismi (الْمَسْجِدِ) kesra ile cer eder',
      fr: 'Régit le génitif',
    }
  ),
  makeEntry(
    'فلما',
    'فَ + لَمَّا',
    'fe-lemmâ',
    '—',
    'zarf',
    { tr: 'Ne zaman ki / -ınca (sabah olunca)', fr: 'Puis lorsque (au matin venu)' },
    {
      tr: 'Atıf fâsı + mâzî fiil başına gelen zaman şart edatı لَمَّا',
      fr: 'Fa- + conjonction temporelle lammâ suivie de l’accompli',
    },
    {
      tr: 'Zaman mânalı şart zarfı; şartı أَصْبَحَ, cevabı قَالَ cümlesidir',
      fr: 'Introduit une subordonnée temporelle (protase asbaha, apodose qâla)',
    }
  ),
  makeEntry(
    'اصبح',
    'أَصْبَحَ — يُصْبِحُ',
    'esbaha',
    'ص ب ح',
    'fiil',
    { tr: 'Sabahladı / sabah vaktine girdi', fr: 'Il parvint au matin / quand vint le matin' },
    {
      tr: 'İf‘âl (IV.) bâbı tam mâzî fiil (zaman bildirir)',
      fr: 'Verbe accompli forme IV (af‘ala) employé absolument',
    },
    {
      tr: 'Tam fiil-i mâzî; müstetir fâili Hz. Peygamber (هُوَ)',
      fr: 'Verbe complet (non copule) au passé',
    },
    [{ arabic: 'صَبَاحٌ', translit: 'sabâh', meaning: { tr: 'Sabah', fr: 'Matin' } }]
  ),
  makeEntry(
    'قال',
    'قَالَ — يَقُولُ',
    'kāle',
    'ق و ل',
    'fiil',
    { tr: 'Dedi, buyurdu', fr: 'Il dit' },
    {
      tr: 'Sülâsî 1. bâb, ecvef-i vâvî (قَوَلَ → قَالَ) mâzî fiil',
      fr: 'Verbe concave (ajwaf wâwî) accompli, forme I',
    },
    {
      tr: 'Fiil-i mâzî fetha üzere mebnî; takip eden söz makūlü’l-kavl (mef‘ûl)',
      fr: 'Verbe déclaratif introduisant le discours direct',
    },
    [
      { arabic: 'قَوْلٌ', translit: 'kavl', meaning: { tr: 'Söz, görüş', fr: 'Parole, avis' } },
      { arabic: 'مَقَالَةٌ', translit: 'makāle', meaning: { tr: 'Söz, yazı', fr: 'Propos, essai' } },
    ]
  ),
  makeEntry(
    'فقال',
    'فَ + قَالَ',
    'fe-kāle',
    'ق و ل',
    'fiil',
    { tr: 'Bunun üzerine dedi ki', fr: 'Alors il dit' },
    {
      tr: 'Atıf fâsı + ecvef-i vâvî mâzî fiil',
      fr: 'Fa- consécutif + verbe qâla',
    },
    {
      tr: 'Önceki gözleme bağlı olarak söylenen sözü açar',
      fr: 'Introduit la réaction verbale immédiate',
    }
  ),
  makeEntry(
    'قد',
    'قَدْ',
    'kad',
    '—',
    'harf',
    { tr: 'Elbette, gerçekten (mâzî fiil önünde tahkik / pekiştirme)', fr: 'Certes, bel et bien (particule d’assertion)' },
    {
      tr: 'Tahkik harfi (sükûn üzere mebnî)',
      fr: 'Particule d’insistance devant l’accompli',
    },
    {
      tr: 'Mâzî fiilin gerçekleştiğini kesinleştirir; i‘rabdan mahalli yoktur',
      fr: 'Renforce la certitude de l’action accomplie',
    }
  ),
  makeEntry(
    'وقد',
    'وَ + قَدْ',
    've kad',
    '—',
    'harf',
    { tr: 'Ve gerçekten / şüphesiz', fr: 'Et en vérité, assurément' },
    {
      tr: 'Hâl veya atıf vâvı + tahkik harfi قَدْ',
      fr: 'Wâw circonstanciel ou coordinatif + qad',
    },
    {
      tr: 'Sonraki كَانَ cümlesini pekiştirir',
      fr: 'Renforce la proposition suivante',
    }
  ),
  makeEntry(
    'رايت',
    'رَأَىٰ — يَرَىٰ',
    'raeytü',
    'ر أ ي',
    'fiil',
    { tr: 'Gördüm', fr: 'J’ai vu' },
    {
      tr: 'Sülâsî 3. bâb, mehmûz-nâkıs mâzî fiil, mütekellim vahdeh (تُ)',
      fr: 'Verbe accompli forme I, 1re pers. sg.',
    },
    {
      tr: 'Sükûn üzere mebnî mâzî; تُ fâil, الَّذِي mef‘ûlün bih',
      fr: 'Verbe transitif (sujet -tu, objet alladhî)',
    },
    [{ arabic: 'رُؤْيَةٌ', translit: 'rü’yet', meaning: { tr: 'Görme, görüş', fr: 'Vision, perception' } }]
  ),
  makeEntry(
    'الذي',
    'الَّذِي',
    'ellezî',
    '—',
    'ism-i-mevsul',
    { tr: 'O şey ki (yaptığınız şey)', fr: 'Ce que (pronom relatif masc. sg.)' },
    {
      tr: 'Müfred müzekker ism-i mevsûl (mebnî)',
      fr: 'Pronom relatif masculin singulier invariable',
    },
    {
      tr: 'رَأَيْتُ fiilinin mef‘ûlün bihi (mahallen mansub); صَنَعْتُمْ sıla cümlesidir',
      fr: 'Objet direct de ra’aytu ; sana‘tum est la proposition relative (sila)',
    }
  ),
  makeEntry(
    'صنعتم',
    'صَنَعَ — يَصْنَعُ',
    'sana‘tüm',
    'ص ن ع',
    'fiil',
    { tr: 'Yaptınız (cemaatle toplanıp beklemeniz)', fr: 'Vous avez fait' },
    {
      tr: 'Sülâsî 3. bâb (فَتَحَ) mâzî fiil, cem-i müzekker muhâtab (تُمْ)',
      fr: 'Verbe accompli forme I, 2e pers. masc. pl.',
    },
    {
      tr: 'Sıla cümlesi (i‘rabdan mahalli yok); تُ fâil, مْ cemîlik alâmeti',
      fr: 'Proposition relative ; -tum est le sujet',
    },
    [{ arabic: 'صَنِيعٌ', translit: 'sanî‘', meaning: { tr: 'İş, fiil, iyilik', fr: 'Acte, œuvre' } }]
  ),
  makeEntry(
    'يمنعني',
    'مَنَعَ — يَمْنَعُ',
    'yemna‘nî',
    'م ن ع',
    'fiil',
    { tr: 'Beni alıkoymadı / engellemedi', fr: 'Ne m’a pas empêché' },
    {
      tr: 'Sülâsî 3. bâb muzâri fiil + nûn-i vikāye + mütekellim zamiri (ي)',
      fr: 'Verbe inaccompli forme I + pronom objet « me »',
    },
    {
      tr: 'لَمْ ile meczûm; ي mef‘ûlün bih; fâili إِلَّا’dan sonraki müevvel masdar (أَنِّي خَشِيتُ)',
      fr: 'Apocopé par lam ; son sujet logique est la subordonnée après illâ',
    },
    [{ arabic: 'مَانِعٌ', translit: 'mâni‘', meaning: { tr: 'Engel', fr: 'Obstacle, empêchement' } }],
    true
  ),
  makeEntry(
    'الخروج',
    'الْخُرُوجُ',
    'el-hurûc',
    'خ ر ج',
    'isim',
    { tr: 'Çıkmak (yanınıza çıkıp namaz kıldırmak)', fr: 'Le fait de sortir (vers vous)' },
    {
      tr: 'Sülâsî masdar (فُعُولٌ kalıbı)',
      fr: 'Nom d’action (masdar) de forme I',
    },
    {
      tr: 'مِنَ harf-i cerriyle kesra üzere mecrûr',
      fr: 'Complément au génitif après min',
    },
    [{ arabic: 'خَارِجٌ', translit: 'hâric', meaning: { tr: 'Çıkan, dışarı', fr: 'Sortant, extérieur' } }]
  ),
  makeEntry(
    'الا',
    'إِلَّا',
    'illâ',
    '—',
    'harf',
    { tr: 'Ancak, sadece, -den başka (hasr / istisnâ edatı)', fr: 'Si ce n’est, uniquement (particule de restriction)' },
    {
      tr: 'İstisnâ-i müferrağda hasr (sınırlama) edatı',
      fr: 'Particule d’exception restrictive (hasr)',
    },
    {
      tr: 'Olumsuz cümleden sonra gelerek gerekçeyi tek bir sebebe hasreder',
      fr: 'Restreint la cause ou l’action au seul élément qui suit',
    }
  ),
  makeEntry(
    'خشيت',
    'خَشِيَ — يَخْشَىٰ',
    'haşîtü',
    'خ ش ي',
    'fiil',
    { tr: 'Korktum, endişe ettim (ümmete şefkatten)', fr: 'J’ai craint (par miséricorde envers vous)' },
    {
      tr: 'Sülâsî 4. bâb (عَلِمَ), nâkıs-ı yâî mâzî fiil, mütekellim vahdeh',
      fr: 'Verbe défectueux en yâ’ accompli forme I, 1re pers. sg.',
    },
    {
      tr: 'أَنِّي’nin haberi (mahallen merfû); أَنْ تُفْرَضَ müevvel masdarı mef‘ûlün bihtir',
      fr: 'Prédicat d’annî ; la complétive an tufrada est objet direct',
    },
    [
      { arabic: 'خَشْيَةٌ', translit: 'haşyet', meaning: { tr: 'Saygı ve şefkat dolu korku/endişe', fr: 'Crainte révérencielle ou sollicitude' } },
      { arabic: 'خَاشٍ', translit: 'hâşin', meaning: { tr: 'Sakınan, endişe duyan', fr: 'Craignant' } },
    ],
    true
  ),
  makeEntry(
    'تفرض',
    'فَرَضَ — يَفْرِضُ',
    'tufrada',
    'ف ر ض',
    'fiil',
    { tr: 'Farz kılınması (üzerinize yükümlü kılınması)', fr: 'Qu’elle ne vous soit rendue obligatoire (fard)' },
    {
      tr: 'Sülâsî 2. bâb meçhul (edilgen) muzâri fiil, müfred müennes gāibe (صَلَاةُ اللَّيْلِ’e râci)',
      fr: 'Verbe passif (majhûl) inaccompli forme I, 3e pers. fém. sg.',
    },
    {
      tr: 'أَنْ edatıyla fetha üzere mansub; nâib-i fâili müstetir هِيَ (gece namazı)',
      fr: 'Au subjonctif après an ; sujet passif implicite (la prière nocturne)',
    },
    [
      { arabic: 'فَرْضٌ', translit: 'farz', meaning: { tr: 'Kesin dinî yükümlülük', fr: 'Obligation canonique' } },
      { arabic: 'فَرِيضَةٌ', translit: 'farîza', meaning: { tr: 'Farz ibadet', fr: 'Devoir prescrit' } },
    ],
    true
  ),
  makeEntry(
    'عليكم',
    'عَلَىٰ + كُمْ',
    'aleyküm',
    '—',
    'harf',
    { tr: 'Üzerinize (yükümlülük olarak)', fr: 'Sur vous (comme obligation)' },
    {
      tr: 'Harf-i cer (عَلَىٰ — yükümlülük/ilzam bildirir) + zamir (كُمْ)',
      fr: 'Préposition d’obligation ‘alâ + pronom 2e pers. masc. pl.',
    },
    {
      tr: 'تُفْرَضَ fiiline müteallak câr-mecrûr',
      fr: 'Complément indirect du verbe passif tufrada',
    }
  ),
  makeEntry(
    'وذلك',
    'وَ + ذَٰلِكَ',
    've zâlike',
    '—',
    'ism-i-isaret',
    { tr: 'Ve bu (olay)', fr: 'Et cela (eut lieu)' },
    {
      tr: 'İsti’nâf vâvı + uzak için müfred müzekker ism-i işâret',
      fr: 'Wâw + pronom démonstratif éloigné masc. sg.',
    },
    {
      tr: 'Mübtedâ (mahallen merfû); فِي رَمَضَانَ câr-mecrûru haberidir',
      fr: 'Sujet nominal dont le prédicat est fî Ramadâna',
    }
  ),
  makeEntry(
    'ذلك',
    'ذَٰلِكَ',
    'zâlike',
    '—',
    'ism-i-isaret',
    { tr: 'O hal / o uygulama üzere', fr: 'Cet état / cette pratique' },
    {
      tr: 'Uzak için ism-i işâret (ذَا + lâmü’l-bu‘d + kâfü’l-hitâb)',
      fr: 'Démonstratif de distance (invariable)',
    },
    {
      tr: 'عَلَىٰ harf-i cerriyle mahallen mecrûr',
      fr: 'Complément au génitif virtuel après ‘alâ',
    }
  ),
  makeEntry(
    'رمضان',
    'رَمَضَانُ',
    'Ramadân',
    'ر م ض',
    'isim',
    { tr: 'Ramazan ayı', fr: 'Le mois de Ramadan' },
    {
      tr: 'Alemiyyet ve ziyâde elif-nûn sebebiyle gayr-i munsarif isim (رَمَضَ: yakıcı sıcak)',
      fr: 'Nom propre diptote terminé en -ân (racine « brûler les péchés / chaleur »)',
    },
    {
      tr: 'فِي ile fetha üzere mecrûr; Hadis 2’de zarf-ı zaman (mansub)',
      fr: 'Génitif en fatha (diptote) ou accusatif temporel',
    },
    [{ arabic: 'رَمْضَاءُ', translit: 'ramdâ’', meaning: { tr: 'Kızgın güneşle ısınan yer', fr: 'Sol brûlant' } }],
    true
  ),

  // --- Hadis 2 Kelimeleri ---
  makeEntry(
    'ابي',
    'أَبُو / أَبِي',
    'Ebî / ebî',
    'أ ب و',
    'isim',
    { tr: 'Ebû (künye: babası) / babam (Hadis 7)', fr: 'Abû (kunya) / mon père (Hadith 7)' },
    {
      tr: 'Esmâ-i hamseden (عَنْ أَبِي: yâ ile mecrûr) veya mütekellim yâsına muzâf (أَبِي: babam)',
      fr: 'L’un des cinq noms au génitif en -î ou « mon père » (H7)',
    },
    {
      tr: 'İsnadda عَنْ ile mecrûr ve muzâf; Hadis 7’de سَمِعْتُ fiilinin mef‘ûlü',
      fr: 'Au génitif dans l’isnâd ; objet de sami‘tu dans le Hadith 7',
    },
    [{ arabic: 'آبَاءٌ', translit: 'âbâ’', meaning: { tr: 'Babalar, atalar', fr: 'Pères, ancêtres' } }]
  ),
  makeEntry(
    'سلمة',
    'سَلَمَةُ',
    'Seleme',
    'س ل م',
    'isim',
    { tr: 'Ebû Seleme b. Abdurrahman b. Avf (Medineli yedi fakihten, ö. 94/712)', fr: 'Abû Salama b. ‘Abd ar-Rahmân (un des 7 juristes de Médine)' },
    {
      tr: 'Gayr-i munsarif özel isim',
      fr: 'Nom propre diptote',
    },
    {
      tr: 'أَبِي kelimesinin muzâfün ileyhi; fetha üzere mecrûr',
      fr: 'Complément d’annexion au génitif (fatha)',
    }
  ),
  makeEntry(
    'عبد',
    'عَبْدٌ',
    'Abd',
    'ع ب د',
    'isim',
    { tr: 'Kul (Abdurrahman / Abd el-Kārî)', fr: 'Serviteur (dans ‘Abd ar-Rahmân / Ibn ‘Abd)' },
    {
      tr: 'Sülâsî isim; izâfetle bileşik özel isim kurar',
      fr: 'Nom trilitère entrant dans les noms théophores',
    },
    {
      tr: 'بْنِ kelimesinin muzâfün ileyhi, kesra ile mecrûr',
      fr: 'Complément du nom au génitif',
    },
    [{ arabic: 'عِبَادَةٌ', translit: 'ibâdet', meaning: { tr: 'Kulluk, ibadet', fr: 'Adoration, culte' } }]
  ),
  makeEntry(
    'الرحمن',
    'الرَّحْمٰنُ',
    'er-Rahmân',
    'ر ح م',
    'isim',
    { tr: 'er-Rahmân (Sonsuz merhamet sahibi Allah)', fr: 'Le Tout-Miséricordieux (ar-Rahmân)' },
    {
      tr: 'Fe‘lân (فَعْلَانُ) mübâlağa kalıbında Esmâ-i Hüsnâ’dan',
      fr: 'Nom divin intensif sur le schème fa‘lân',
    },
    {
      tr: 'عَبْدِ kelimesinin muzâfün ileyhi, kesra ile mecrûr',
      fr: 'Complément d’annexion au génitif',
    },
    [{ arabic: 'رَحْمَةٌ', translit: 'rahmet', meaning: { tr: 'Merhamet', fr: 'Miséricorde' } }]
  ),
  makeEntry(
    'عوف',
    'عَوْفٌ',
    'Avf',
    'ع و ف',
    'isim',
    { tr: 'Avf (Abdurrahman b. Avf’ın babası)', fr: '‘Awf (père du Compagnon ‘Abd ar-Rahmân b. ‘Awf)' },
    {
      tr: 'Sülâsî özel isim',
      fr: 'Nom propre masculin',
    },
    {
      tr: 'بْنِ kelimesinin muzâfün ileyhi, kesra ile mecrûr',
      fr: 'Complément d’annexion au génitif',
    }
  ),
  makeEntry(
    'هريرة',
    'هُرَيْرَةُ',
    'Hüreyre',
    'ه ر ر',
    'isim',
    { tr: 'Ebû Hüreyre (r.a., en çok hadis rivayet eden sahâbî, ö. 58/678)', fr: 'Abû Hurayra (Compagnon, principal rapporteur de hadiths)' },
    {
      tr: 'Tasgîr (küçültme: kedicik) kalıbında gayr-i munsarif künye',
      fr: 'Diminutif féminin diptote (kunya)',
    },
    {
      tr: 'أَبِي kelimesinin muzâfün ileyhi, fetha ile mecrûr',
      fr: 'Complément d’annexion au génitif (fatha)',
    }
  ),
  makeEntry(
    'كان',
    'كَانَ — يَكُونُ',
    'kâne',
    'ك و ن',
    'fiil',
    { tr: 'İdi / sürekli yapardı (muzâri ile devamlılık bildirir)', fr: 'Avait coutume de / était' },
    {
      tr: 'Nâkıs fiil-i mâzî (ecvef-i vâvî)',
      fr: 'Verbe auxiliaire / défectif (kâna) à l’accompli',
    },
    {
      tr: 'İsmini ref‘, haberini nasbeder; muzâri fiille birlikte istimrar (süreklilik) ifade eder',
      fr: 'Régit le nominatif du sujet et l’accusatif du prédicat ; exprime l’habitude devant un inaccompli',
    },
    [{ arabic: 'كَوْنٌ', translit: 'kevn', meaning: { tr: 'Oluş, varlık', fr: 'Existence, devenir' } }]
  ),
  makeEntry(
    'وكان',
    'وَ + كَانَ',
    've kâne',
    'ك و ن',
    'fiil',
    { tr: 'Ve idi / (o sırada ... yaparlardı)', fr: 'Et il était / et les gens avaient coutume' },
    {
      tr: 'Atıf veya hâl vâvı + nâkıs fiil كَانَ',
      fr: 'Wâw + auxiliaire kâna',
    },
    {
      tr: 'Bağlam veya arka plan bilgisi veren isim/fiil cümlesi kurar',
      fr: 'Introduit une proposition descriptive de contexte',
    }
  ),
  makeEntry(
    'يرغب',
    'رَغَّبَ — يُرَغِّبُ',
    'yurağğibu',
    'ر غ ب',
    'fiil',
    { tr: 'Teşvik ederdi, rağbet uyandırırdı', fr: 'Il incitait, encourageait vivement' },
    {
      tr: 'Tef‘îl (II.) bâbı müteaddî muzâri fiil',
      fr: 'Verbe inaccompli causatif forme II (yufa‘‘ilu)',
    },
    {
      tr: 'كَانَ’nin haberi (mahallen mansub); fâili müstetir هُوَ',
      fr: 'Prédicat verbal de kâna',
    },
    [
      { arabic: 'تَرْغِيبٌ', translit: 'tergîb', meaning: { tr: 'Teşvik etme (1. babın başlığı)', fr: 'Incitation, encouragement' } },
      { arabic: 'رَغْبَةٌ', translit: 'rağbet', meaning: { tr: 'İstek, arzu', fr: 'Désir, aspiration' } },
    ],
    true
  ),
  makeEntry(
    'قيام',
    'قِيَامٌ',
    'kıyâm',
    'ق و م',
    'isim',
    { tr: 'Gece namazına kalkmak (terâvih / kıyâm)', fr: 'La station nocturne en prière (qiyâm / tarâwîh)' },
    {
      tr: 'Sülâsî ecvef-i vâvî masdarı (قِوَامٌ → قِيَامٌ, kesradan sonra vâv yâ’ya dönüşmüştür)',
      fr: 'Nom d’action (masdar) de la racine concave q-w-m',
    },
    {
      tr: 'فِي harf-i cerriyle mecrûr ve muzâf',
      fr: 'Au génitif après fî, annexé à Ramadân',
    },
    [
      { arabic: 'قَائِمٌ', translit: 'kāim', meaning: { tr: 'Ayakta duran, namaz kılan', fr: 'Debout en prière' } },
      { arabic: 'إِقَامَةٌ', translit: 'ikāmet', meaning: { tr: 'Dosdoğru kılmak', fr: 'Accomplissement droit' } },
    ],
    true
  ),
  makeEntry(
    'القيام',
    'الْقِيَامُ',
    'el-kıyâm',
    'ق و م',
    'isim',
    { tr: 'Namazda ayakta durma (kıyam)', fr: 'La station debout en prière' },
    {
      tr: 'Mârife masdar (ق و م)',
      fr: 'Nom verbal défini',
    },
    {
      tr: 'طُولِ kelimesinin muzâfün ileyhi, kesra ile mecrûr',
      fr: 'Complément d’annexion au génitif après tûl',
    }
  ),
  makeEntry(
    'غير',
    'غَيْرُ',
    'ğayri',
    'غ ي ر',
    'isim',
    { tr: 'Olmaksızın, -sız (مِنْ غَيْرِ: olmaksızın)', fr: 'Sans (min ghayri : sans imposer)' },
    {
      tr: 'İzâfetten ayrılmayan isim (olumsuzluk/istisna bildirir)',
      fr: 'Nom d’altérité / négation toujours annexé',
    },
    {
      tr: 'مِنْ harf-i cerriyle mecrûr ve sonraki müevvel masdara muzâf',
      fr: 'Au génitif après min, annexé à la proposition suivante',
    },
    [{ arabic: 'تَغْيِيرٌ', translit: 'tağyîr', meaning: { tr: 'Değiştirmek', fr: 'Changement' } }]
  ),
  makeEntry(
    'يامر',
    'أَمَرَ — يَأْمُرُ',
    'ye’mura',
    'أ م ر',
    'fiil',
    { tr: 'Emretmek (kesin emir vermeksizin)', fr: 'Ordonner (sans en faire un ordre strict)' },
    {
      tr: 'Sülâsî 1. bâb mehmûzü’l-fâ muzâri fiil',
      fr: 'Verbe hamzé inaccompli forme I',
    },
    {
      tr: 'أَنْ ile fetha üzere mansub; müevvel masdar غَيْرِ’nin muzâfün ileyhidir',
      fr: 'Au subjonctif après an ; complément d’annexion de ghayr',
    },
    [{ arabic: 'أَمْرٌ', translit: 'emr', meaning: { tr: 'Emir, iş, durum', fr: 'Ordre, affaire' } }]
  ),
  makeEntry(
    'بعزيمة',
    'بِ + عَزِيمَةٍ',
    'bi-‘azîmetin',
    'ع ز م',
    'isim',
    { tr: 'Kesin/bağlayıcı emirle (vücubiyetle)', fr: 'De manière impérative / obligatoire (‘azîma)' },
    {
      tr: 'Harf-i cer (بِ) + fe‘île (فَعِيلَةٌ) kalıbında isim',
      fr: 'Préposition bi- + nom de schème fa‘îla',
    },
    {
      tr: 'Nevevî şerhine göre: «farz/vâcip kılarak değil, mendub ve teşvik yollu» demektir',
      fr: 'Selon an-Nawawî : non par obligation stricte, mais par recommandation',
    },
    [
      { arabic: 'عَزْمٌ', translit: 'azm', meaning: { tr: 'Kesin karar, irade', fr: 'Détermination ferme' } },
      { arabic: 'عَزَائِمُ', translit: 'azâim', meaning: { tr: 'Kesin hükümler', fr: 'Prescriptions strictes' } },
    ],
    true
  ),
  makeEntry(
    'فيقول',
    'فَ + يَقُولُ',
    'fe-yekūlu',
    'ق و ل',
    'fiil',
    { tr: 'Ve şöyle buyururdu', fr: 'Et il disait ainsi' },
    {
      tr: 'Atıf/tefsir fâsı + ecvef-i vâvî muzâri fiil',
      fr: 'Fa- explicatif + inaccompli yaqûlu',
    },
    {
      tr: 'يُرَغِّبُ fiiline ma‘tûf; damme ile merfû',
      fr: 'Coordonné au verbe yuraghghibu à l’indicatif',
    }
  ),
  makeEntry(
    'يقول',
    'قَالَ — يَقُولُ',
    'yekūlu',
    'ق و ل',
    'fiil',
    { tr: 'Derken / şöyle dediğini', fr: 'Disant / il disait' },
    {
      tr: 'Sülâsî 1. bâb ecvef-i vâvî muzâri fiil',
      fr: 'Verbe concave inaccompli forme I',
    },
    {
      tr: 'سَمِعَ fiilinden sonra hâl cümlesi (mahallen mansub)',
      fr: 'Proposition circonstancielle d’état (hâl) après sami‘a',
    }
  ),
  makeEntry(
    'قام',
    'قَامَ — يَقُومُ',
    'kāme',
    'ق و م',
    'fiil',
    { tr: 'İhya ederse / gece namazına kalkarsa', fr: 'Accomplit les prières nocturnes (qiyâm)' },
    {
      tr: 'Sülâsî 1. bâb ecvef-i vâvî mâzî fiil (قَوَمَ → قَامَ)',
      fr: 'Verbe concave accompli forme I',
    },
    {
      tr: 'مَنْ şart edatının şart fiili (mahallen meczûm); Hadis 6’da إِذَا’nın şartı',
      fr: 'Verbe de la conditionnelle (protase)',
    },
    [{ arabic: 'قِيَامٌ', translit: 'kıyâm', meaning: { tr: 'Kıyam, terâvih', fr: 'Veillée en prière' } }],
    true
  ),
  makeEntry(
    'ايمانا',
    'إِيمَانٌ',
    'îmânen',
    'أ م ن',
    'isim',
    { tr: 'İnanarak (hak ve faziletini tasdik ederek)', fr: 'Avec foi sincère (en attestant sa vérité)' },
    {
      tr: 'İf‘âl (IV.) bâbı masdarı (أَأْمَانٌ → إِيمَانٌ)',
      fr: 'Nom d’action (masdar) de forme IV (af‘ala)',
    },
    {
      tr: 'Mef‘ûlün li-eclih (sebep bildiren mansub) veya hâl',
      fr: 'Complément de cause (maf‘ûl li-ajlihi) à l’accusatif',
    },
    [
      { arabic: 'مُؤْمِنٌ', translit: 'mü’min', meaning: { tr: 'İnanan', fr: 'Croyant' } },
      { arabic: 'أَمَانَةٌ', translit: 'emânet', meaning: { tr: 'Güvenilirlik', fr: 'Dépôt, loyauté' } },
    ],
    true
  ),
  makeEntry(
    'واحتسابا',
    'وَ + احْتِسَابًا',
    've’htisâben',
    'ح س ب',
    'isim',
    { tr: 'Ve sevabını yalnız Allah’tan umarak (riyasız)', fr: 'Et en espérant la récompense d’Allah seul (sans ostentation)' },
    {
      tr: 'Atıf vâvı + İfti‘âl (VIII.) bâbı masdarı (احْتَسَبَ — احْتِسَابًا)',
      fr: 'Wâw + masdar de forme VIII (ifti‘âl)',
    },
    {
      tr: 'إِيمَانًا üzerine ma‘tûf mef‘ûlün li-eclih; fetha ile mansub',
      fr: 'Coordonné à îmânan à l’accusatif (cause/intention)',
    },
    [
      { arabic: 'حِسَابٌ', translit: 'hisâb', meaning: { tr: 'Hesap', fr: 'Compte, calcul' } },
      { arabic: 'مُحْتَسِبٌ', translit: 'muhtesib', meaning: { tr: 'Sevap gözeten', fr: 'Qui espère la rétribution divine' } },
    ],
    true
  ),
  makeEntry(
    'غفر',
    'غَفَرَ — يَغْفِرُ',
    'ğufira',
    'غ ف ر',
    'fiil',
    { tr: 'Bağışlanır (örtülür)', fr: 'Lui seront pardonnés' },
    {
      tr: 'Sülâsî 2. bâb meçhul (edilgen) mâzî fiil (فُعِلَ)',
      fr: 'Verbe passif (majhûl) accompli forme I',
    },
    {
      tr: 'مَنْ şartının cevabı (mahallen meczûm); nâib-i fâili مَا تَقَدَّمَ',
      fr: 'Apodose de la conditionnelle ; sujet passif : mâ taqaddama',
    },
    [
      { arabic: 'مَغْفِرَةٌ', translit: 'mağfiret', meaning: { tr: 'Bağışlama', fr: 'Pardon divin' } },
      { arabic: 'اسْتِغْفَارٌ', translit: 'istiğfâr', meaning: { tr: 'Bağışlanma dileme', fr: 'Demande de pardon' } },
    ],
    true
  ),
  makeEntry(
    'له',
    'لِ + هُ',
    'lehû',
    '—',
    'harf',
    { tr: 'Onun için / ona', fr: 'Pour lui / à lui' },
    {
      tr: 'Harf-i cer (لِ) + gāib zamiri (هُ)',
      fr: 'Préposition li- + pronom 3e pers. masc. sg.',
    },
    {
      tr: 'غُفِرَ fiiline müteallak câr-mecrûr',
      fr: 'Complément d’attribution',
    }
  ),
  makeEntry(
    'ما',
    'مَا',
    'mâ',
    '—',
    'ism-i-mevsul',
    { tr: 'O şey ki (geçmiş günahları) / -madı (olumsuzluk)', fr: 'Ce qui (relatif) / ne ... pas (négation)' },
    {
      tr: 'Hadis 2’de ism-i mevsûl; Hadis 4 ve 6’da mâzîyi olumsuzlayan nâfiye harfi',
      fr: 'Pronom relatif (H2) ou particule négative (H4, H6)',
    },
    {
      tr: 'Hadis 2’de غُفِرَ’nin nâib-i fâili (mahallen merfû); Hadis 4 ve 6’da harf-i nefy',
      fr: 'Sujet passif en H2 ; négation en H4 et H6',
    }
  ),
  makeEntry(
    'وما',
    'وَ + مَا',
    've mâ',
    '—',
    'harf',
    { tr: 'Ve ...-mazdık (olumsuzluk)', fr: 'Et nous ne ... pas' },
    {
      tr: 'Atıf vâvı + olumsuzluk edatı مَا',
      fr: 'Wâw + particule négative mâ',
    },
    {
      tr: 'Sonraki كُنَّا cümlesini olumsuz yapar (إِلَّا ile hasr kurar)',
      fr: 'Forme avec illâ une tournure restrictive (« ne ... que »)',
    }
  ),
  makeEntry(
    'تقدم',
    'تَقَدَّمَ — يَتَقَدَّمُ',
    'tekaddeme',
    'ق د م',
    'fiil',
    { tr: 'Önce geçmiş olan', fr: 'Qui a précédé (passé)' },
    {
      tr: 'Tefa‘‘ul (V.) bâbı mâzî fiil',
      fr: 'Verbe accompli forme V (tafa‘‘ala)',
    },
    {
      tr: 'مَا ism-i mevsûlünün sıla cümlesi',
      fr: 'Proposition relative après mâ',
    },
    [{ arabic: 'قَدِيمٌ', translit: 'kadîm', meaning: { tr: 'Eski, önceki', fr: 'Ancien, antérieur' } }]
  ),
  makeEntry(
    'ذنبه',
    'ذَنْبٌ + هِ',
    'zenbihî',
    'ذ ن ب',
    'isim',
    { tr: 'Günahından (küçük günahları)', fr: 'De ses péchés (fautes passées)' },
    {
      tr: 'Sülâsî isim (cins isim: tüm günahları kapsar) + zamir (هِ)',
      fr: 'Nom singulier à valeur générique + pronom possessif',
    },
    {
      tr: 'مِنْ (beyâniyye) ile mecrûr ve zamire muzâf',
      fr: 'Au génitif explicatif après min',
    },
    [{ arabic: 'ذُنُوبٌ', translit: 'zünûb', meaning: { tr: 'Günahlar', fr: 'Péchés' } }],
    true
  ),
  makeEntry(
    'فتوفي',
    'فَ + تُوُفِّيَ',
    'fe-tüvuffiye',
    'و ف ي',
    'fiil',
    { tr: 'Derken vefat etti (ruhu kabzedildi)', fr: 'Puis il décéda (fut rappelé à Dieu)' },
    {
      tr: 'Atıf fâsı + Tefa‘‘ul (V.) bâbı meçhul (edilgen) nâkıs mâzî fiil',
      fr: 'Fa- + verbe passif accompli forme V (racine w-f-y)',
    },
    {
      tr: 'Meçhul fiil-i mâzî; nâib-i fâili رَسُولُ اللَّهِ (merfû)',
      fr: 'Verbe passif ayant le Messager d’Allah comme sujet passif',
    },
    [{ arabic: 'وَفَاةٌ', translit: 'vefât', meaning: { tr: 'Ölüm, vefat', fr: 'Décès' } }]
  ),
  makeEntry(
    'والامر',
    'وَ + الْأَمْرُ',
    've’l-emru',
    'أ م ر',
    'isim',
    { tr: 'Ve durum/uygulama (terâvihin münferit kılınması)', fr: 'Tandis que la pratique demeurait' },
    {
      tr: 'Hâl vâvı + mârife isim (الْأَمْرُ)',
      fr: 'Wâw circonstanciel (hâl) + nom défini al-amr',
    },
    {
      tr: 'Mübtedâ (damme ile merfû); عَلَىٰ ذَٰلِكَ haber; cümle mahallen mansub hâl',
      fr: 'Sujet d’une proposition nominale circonstancielle',
    },
    [{ arabic: 'أُمُورٌ', translit: 'umûr', meaning: { tr: 'İşler, durumlar', fr: 'Affaires' } }],
    true
  ),
  makeEntry(
    'الامر',
    'الْأَمْرُ',
    'el-emru',
    'أ م ر',
    'isim',
    { tr: 'Durum, uygulama', fr: 'L’état des choses, la pratique' },
    {
      tr: 'Mârife sülâsî isim',
      fr: 'Nom défini singulier',
    },
    {
      tr: 'كَانَ’nin ismi; damme ile merfû',
      fr: 'Sujet de kâna au nominatif',
    }
  ),
  makeEntry(
    'على',
    'عَلَىٰ',
    '‘alâ',
    '—',
    'harf',
    { tr: 'Üzerinde, üzere, arkasında', fr: 'Sur, selon, derrière (un seul imam)' },
    {
      tr: 'Harf-i cer (isti‘lâ / dayanma / üzere olma)',
      fr: 'Préposition invariable',
    },
    {
      tr: 'Sonraki ismi cer eder (عَلَىٰ ذَٰلِكَ / عَلَىٰ قَارِئٍ / عَلَى الْعِصِيِّ)',
      fr: 'Régit le cas génitif',
    }
  ),
  makeEntry(
    'خلافة',
    'خِلَافَةٌ',
    'hilâfeti',
    'خ ل ف',
    'isim',
    { tr: 'Hilâfet (halifelik dönemi)', fr: 'Califat (période de gouvernance)' },
    {
      tr: 'Fı‘âlet (فِعَالَةٌ) kalıbında görev/makam masdarı',
      fr: 'Nom de fonction / charge (fi‘âla)',
    },
    {
      tr: 'فِي veya مِنْ ile mecrûr ve halife adına muzâf',
      fr: 'Au génitif et annexé au nom du calife',
    },
    [{ arabic: 'خَلِيفَةٌ', translit: 'halîfe', meaning: { tr: 'Halife, ardıl', fr: 'Calife, successeur' } }],
    true
  ),
  makeEntry(
    'بكر',
    'بَكْرٌ',
    'Bekr',
    'ب ك ر',
    'isim',
    { tr: 'Ebû Bekir (es-Sıddîk r.a. / veya Hadis 7’de Ebû Bekir b. Hazm)', fr: 'Abû Bakr (le 1er Calife en H2 ; Abû Bakr b. Hazm en H7)' },
    {
      tr: 'Sülâsî özel isim/künye parçası',
      fr: 'Nom entrant dans la kunya Abû Bakr',
    },
    {
      tr: 'أَبِي kelimesinin muzâfün ileyhi; kesra ile mecrûr',
      fr: 'Complément d’annexion au génitif',
    }
  ),
  makeEntry(
    'وصدرا',
    'وَ + صَدْرًا',
    've sadran',
    'ص د ر',
    'isim',
    { tr: 'Ve başlangıcında / ilk kısmında', fr: 'Et au début de (les premiers temps)' },
    {
      tr: 'Atıf vâvı + sülâsî isim (صَدْرٌ: göğüs, bir şeyin başlangıcı)',
      fr: 'Wâw + nom sadr (« poitrine », métaphoriquement « début »)',
    },
    {
      tr: 'Zarf-ı zaman olarak fetha ile mansub (كَانَ fiiline müteallak)',
      fr: 'Accusatif de temps (complément circonstanciel)',
    },
    [{ arabic: 'صُدُورٌ', translit: 'sudûr', meaning: { tr: 'Başlangıçlar, göğüsler', fr: 'Débuts, poitrines' } }],
    true
  ),
  makeEntry(
    'عمر',
    'عُمَرُ',
    'Ömer',
    'ع م ر',
    'isim',
    { tr: 'Hz. Ömer b. el-Hattâb (r.a., ikinci halife, ö. 23/644)', fr: '‘Umar b. al-Khattâb (2e Calife, m. 23/644)' },
    {
      tr: 'Adl (عَامِرٌ → عُمَرُ) ve alemiyyet sebebiyle gayr-i munsarif isim (فُعَلُ)',
      fr: 'Nom propre diptote sur le schème fu‘al',
    },
    {
      tr: 'Bağlama göre fâil (merfû) veya muzâfün ileyh (fetha ile mecrûr)',
      fr: 'Nominatif (sujet) ou génitif en fatha (diptote)',
    }
  ),
  makeEntry(
    'الخطاب',
    'الْخَطَّابُ',
    'el-Hattâb',
    'خ ط ب',
    'isim',
    { tr: 'el-Hattâb (Hz. Ömer’in babası)', fr: 'al-Khattâb (père de ‘Umar)' },
    {
      tr: 'Fa‘‘âl (فَعَّالٌ) kalıbında özel isim',
      fr: 'Nom propre intensif',
    },
    {
      tr: 'بْنِ kelimesinin muzâfün ileyhi, kesra ile mecrûr',
      fr: 'Complément du nom au génitif',
    }
  ),

  // --- Hadis 3 Kelimeleri ---
  makeEntry(
    'القاري',
    'الْقَارِيُّ',
    'el-Kārî',
    'ق و ر',
    'isim',
    { tr: 'el-Kārî (Kāre kabilesine mensup: Abdurrahman b. Abd el-Kārî)', fr: 'al-Qârî (de la tribu d’al-Qâra : ‘Abd ar-Rahmân b. ‘Abd)' },
    {
      tr: 'Nisbe ismi (Kāre kabilesine mensup sahâbî/büyük tâbiî)',
      fr: 'Nom de relation tribale (nisba)',
    },
    {
      tr: 'عَبْدِ الرَّحْمٰنِ için sıfat; kesra ile mecrûr',
      fr: 'Épithète au génitif',
    }
  ),
  makeEntry(
    'خرجت',
    'خَرَجَ — يَخْرُجُ',
    'haractü',
    'خ ر ج',
    'fiil',
    { tr: 'Çıktım', fr: 'Je suis sorti' },
    {
      tr: 'Sülâsî 1. bâb mâzî fiil, mütekellim vahdeh (تُ)',
      fr: 'Verbe accompli forme I, 1re pers. sg.',
    },
    {
      tr: 'Sükûn üzere mebnî fiil-i mâzî; تُ mahallen merfû fâil',
      fr: 'Verbe au passé ; -tu est sujet',
    }
  ),
  makeEntry(
    'مع',
    'مَعَ',
    'me‘a',
    '—',
    'zarf',
    { tr: 'İle birlikte, beraberinde', fr: 'Avec, en compagnie de' },
    {
      tr: 'Birliktelik zarfı (fetha üzere mansub)',
      fr: 'Adverbe/préposition d’accompagnement',
    },
    {
      tr: 'Zarf olarak mansub ve sonraki isme muzâf',
      fr: 'Complément d’accompagnement annexé au nom suivant',
    }
  ),
  makeEntry(
    'معه',
    'مَعَ + هُ',
    'me‘ahû',
    '—',
    'zarf',
    { tr: 'Onunla (Hz. Ömer’le) birlikte', fr: 'Avec lui (en compagnie de ‘Umar)' },
    {
      tr: 'Zarf (مَعَ) + gāib zamiri (هُ)',
      fr: 'Préposition ma‘a + pronom 3e pers. masc. sg.',
    },
    {
      tr: 'Zarf mansub; هُ zamiri muzâfün ileyh (mahallen mecrûr)',
      fr: 'Complément circonstanciel d’accompagnement',
    }
  ),
  makeEntry(
    'والناس',
    'وَ + النَّاسُ',
    've’n-nâsu',
    'أ ن س',
    'isim',
    { tr: 'Ve insanlar (cemaat halinde namaz kılarken)', fr: 'Tandis que les fidèles (priaient derrière leur imam)' },
    {
      tr: 'Hâl vâvı (وَ) + mârife topluluk ismi (النَّاسُ)',
      fr: 'Wâw circonstanciel (hâl) + nom collectif défini an-nâs',
    },
    {
      tr: 'Mübtedâ (damme ile merfû); يُصَلُّونَ cümlesi haber; bütün isim cümlesi mahallen mansub hâl',
      fr: 'Sujet au nominatif d’une proposition circonstancielle (hâl)',
    },
    [{ arabic: 'إِنْسَانٌ', translit: 'insân', meaning: { tr: 'İnsan', fr: 'Être humain' } }]
  ),
  makeEntry(
    'فاذا',
    'فَ + إِذَا',
    'fe-izâ',
    '—',
    'zarf',
    { tr: 'Bir de baktık ki / ne zaman ki', fr: 'Et voilà que / lorsque' },
    {
      tr: 'Hadis 3’te إِذَا الفُجَائِيَّة (bir de ne görelim); Hadis 6’da zaman şart zarfı (ne zaman ki)',
      fr: 'Idhâ de constatation (H3) ou conjonction temporelle (H6)',
    },
    {
      tr: 'İsim cümlesi başında müfâcee, fiil cümlesi başında zaman şart zarfıdır',
      fr: 'Soudaineté devant un nom (H3), condition temporelle devant un verbe (H6)',
    }
  ),
  makeEntry(
    'اوزاع',
    'أَوْزَاعٌ',
    'evzâ‘un',
    'و ز ع',
    'isim',
    { tr: 'Dağınık gruplar, parça parça cemaatler', fr: 'Groupes dispersés, petits rassemblements épars' },
    {
      tr: 'İsm-i cem‘ (kendi lafzından tekili olmayan çoğul isim)',
      fr: 'Nom collectif pluriel sans singulier de même racine',
    },
    {
      tr: 'النَّاسُ mübtedâsının haberi (damme ile merfû); bkz. İbn Fâris & Cevherî hâşiyesi',
      fr: 'Prédicat (khabar) au nominatif ; cf. glose d’Ibn Fâris et al-Jawharî',
    },
    [
      { arabic: 'تَوْزِيعٌ', translit: 'tevzî‘', meaning: { tr: 'Dağıtmak, paylaştırmak', fr: 'Distribution, répartition' } },
      { arabic: 'وَازِعٌ', translit: 'vâzi‘', meaning: { tr: 'Engelleyen, düzenleyen', fr: 'Modérateur, frein' } },
    ],
    true
  ),
  makeEntry(
    'متفرقون',
    'مُتَفَرِّقٌ (ج: مُتَفَرِّقُونَ)',
    'müteferrikūne',
    'ف ر ق',
    'isim',
    { tr: 'Ayrı ayrı, dağılmış halde', fr: 'Séparés, dispersés' },
    {
      tr: 'Tefa‘‘ul (V.) bâbı ism-i fâil, cem-i müzekker sâlim',
      fr: 'Participe actif forme V, pluriel masculin sain',
    },
    {
      tr: 'أَوْزَاعٌ kelimesine tekit veya tahsis sıfatı (vâv ile merfû)',
      fr: 'Épithète (na‘t) de renforcement ou de précision au nominatif',
    },
    [{ arabic: 'فُرْقَةٌ', translit: 'fürka', meaning: { tr: 'Ayrılık', fr: 'Séparation' } }],
    true
  ),
  makeEntry(
    'يصلي',
    'صَلَّىٰ — يُصَلِّي',
    'yusallî',
    'ص ل و',
    'fiil',
    { tr: 'Namaz kılıyor', fr: 'Prie (accomplit la prière)' },
    {
      tr: 'Tef‘îl (II.) bâbı nâkıs muzâri fiil, müfred müzekker gāib',
      fr: 'Inaccompli forme II, 3e pers. masc. sg.',
    },
    {
      tr: 'Yâ üzerinde takdîren merfû fiil-i muzâri',
      fr: 'Indicatif (damma implicite sur le yâ’)',
    }
  ),
  makeEntry(
    'ويصلي',
    'وَ + يُصَلِّي',
    've yusallî',
    'ص ل و',
    'fiil',
    { tr: 'Ve (bir başka adam) namaz kılıyor', fr: 'Et un autre homme prie' },
    {
      tr: 'Atıf vâvı + Tef‘îl bâbı muzâri fiil',
      fr: 'Wâw + inaccompli forme II',
    },
    {
      tr: 'Önceki يُصَلِّي الرَّجُلُ cümlesine ma‘tûf',
      fr: 'Proposition verbale coordonnée',
    }
  ),
  makeEntry(
    'فيصلي',
    'فَ + يُصَلِّي',
    'fe-yusallî',
    'ص ل و',
    'fiil',
    { tr: 'Ona uyarak namaz kılıyor', fr: 'Et un petit groupe prie derrière lui' },
    {
      tr: 'Atıf fâsı + Tef‘îl bâbı muzâri fiil',
      fr: 'Fa- + inaccompli forme II',
    },
    {
      tr: 'Fâili الرَّهْطُ (merfû)',
      fr: 'Sujet : ar-rahtu',
    }
  ),
  makeEntry(
    'يصلون',
    'صَلَّىٰ — يُصَلِّي',
    'yusallûne',
    'ص ل و',
    'fiil',
    { tr: 'Namaz kılıyorlardı', fr: 'Priaient (en commun)' },
    {
      tr: 'Tef‘îl (II.) bâbı muzâri fiil, cem-i müzekker gāib (ef‘âl-i hamse)',
      fr: 'Inaccompli forme II, 3e pers. masc. pl.',
    },
    {
      tr: 'Nûnun sübûtuyla merfû; النَّاسُ mübtedâsının haberi',
      fr: 'Indicatif pluriel ; prédicat de an-nâsu',
    }
  ),
  makeEntry(
    'الرجل',
    'الرَّجُلُ',
    'er-racülü',
    'ر ج ل',
    'isim',
    { tr: 'Kişi, bir adam', fr: 'L’homme (un individu)' },
    {
      tr: 'Cins elif-lâmı ile mârife sülâsî isim',
      fr: 'Nom masculin singulier à valeur générique',
    },
    {
      tr: 'يُصَلِّي fiilinin fâili; damme ile merfû',
      fr: 'Sujet (fâ‘il) au nominatif',
    },
    [{ arabic: 'رِجَالٌ', translit: 'ricâl', meaning: { tr: 'Adamlar, hadis râvileri', fr: 'Hommes, transmetteurs (rijâl)' } }]
  ),
  makeEntry(
    'لنفسه',
    'لِ + نَفْسِ + هِ',
    'li-nefsihî',
    'ن ف س',
    'isim',
    { tr: 'Kendi başına (münferit olarak)', fr: 'Pour lui-même (individuellement)' },
    {
      tr: 'Harf-i cer (لِ) + نَفْسٌ + zamir (هِ)',
      fr: 'Préposition li- + nafs + pronom possessif',
    },
    {
      tr: 'Câr-mecrûr; bireysel (cemaatsiz) namazı ifade eder',
      fr: 'Exprime la prière accomplie individuellement',
    },
    [{ arabic: 'نُفُوسٌ', translit: 'nüfûs', meaning: { tr: 'Nefisler, canlar', fr: 'Âmes' } }]
  ),
  makeEntry(
    'الرهط',
    'الرَّهْطُ',
    'er-rahtu',
    'ر ه ط',
    'isim',
    { tr: 'Küçük topluluk (3 ile 10 kişi arası grup)', fr: 'Petit groupe (entre trois et dix personnes)' },
    {
      tr: 'Kendi lafzından tekili olmayan topluluk ismi (ism-i cem‘)',
      fr: 'Nom collectif désignant un groupe de 3 à 10 hommes',
    },
    {
      tr: 'فَيُصَلِّي fiilinin fâili; damme ile merfû (bkz. klasik hâşiye)',
      fr: 'Sujet au nominatif (cf. glose classique : 3 à 10 personnes)',
    },
    [{ arabic: 'أَرْهُطٌ', translit: 'erhut', meaning: { tr: 'Gruplar, topluluklar', fr: 'Groupes' } }],
    true
  ),
  makeEntry(
    'لاراني',
    'لَ + أَرَىٰ + نِي',
    'le-erânî',
    'ر أ ي',
    'fiil',
    { tr: 'Elbette (kendi kanaatimce) görüyorum ki', fr: 'Certes j’estime / je pense vraiment que' },
    {
      tr: 'Lâm-ı müzahleka (tekit lâmı) + أَرَىٰ (kalbî görüş fiili) + zamir (نِي)',
      fr: 'Lâm d’emphase + verbe d’opinion arâ + pronom réfléchi',
    },
    {
      tr: 'إِنِّي’nin haberi; bir kişinin kendi fikrini tekitli ifade kalıbı',
      fr: 'Prédicat emphatique d’innî exprimant un avis réfléchi',
    }
  ),
  makeEntry(
    'لو',
    'لَوْ',
    'lev',
    '—',
    'harf',
    { tr: 'Eğer ... olsaydı / şayet ... yapsam', fr: 'Si (conditionnelle hypothétique)' },
    {
      tr: 'Cezmetmeyen şart harfi',
      fr: 'Particule conditionnelle non apocopante',
    },
    {
      tr: 'Şart cümlesi جَمَعْتُ, cevabı لَكَانَ أَمْثَلَ',
      fr: 'Protase jama‘tu, apodose la-kâna amthala',
    }
  ),
  makeEntry(
    'جمعت',
    'جَمَعَ — يَجْمَعُ',
    'cema‘tü',
    'ج م ع',
    'fiil',
    { tr: 'Toplasam / birleştirsem', fr: 'Je rassemblais / réunissais' },
    {
      tr: 'Sülâsî 3. bâb mâzî fiil, mütekellim vahdeh',
      fr: 'Verbe accompli forme I, 1re pers. sg.',
    },
    {
      tr: 'لَوْ şartının fiili; تُ fâil, هٰؤُلَاءِ mef‘ûlün bih',
      fr: 'Verbe de la protase ; -tu sujet, hâ’ulâ’i objet',
    },
    [{ arabic: 'جَمْعٌ', translit: 'cem‘', meaning: { tr: 'Birleştirme, toplama', fr: 'Rassemblement' } }]
  ),
  makeEntry(
    'فجمعهم',
    'فَ + جَمَعَ + هُمْ',
    'fe-ceme‘ahüm',
    'ج م ع',
    'fiil',
    { tr: 'Bunun üzerine onları topladı (tek cemaat yaptı)', fr: 'Il les rassembla alors (en une seule congrégation)' },
    {
      tr: 'Atıf fâsı + sülâsî 3. bâb mâzî fiil + zamir (هُمْ)',
      fr: 'Fa- + accompli forme I + pronom objet -hum',
    },
    {
      tr: 'Fâili müstetir هُوَ (Hz. Ömer); هُمْ mef‘ûlün bih',
      fr: 'Sujet implicite (‘Umar) ; -hum objet direct',
    }
  ),
  makeEntry(
    'هؤلاء',
    'هٰؤُلَاءِ',
    'hâulâi',
    '—',
    'ism-i-isaret',
    { tr: 'Bunları (mesciddeki dağınık grupları)', fr: 'Ceux-ci (ces fidèles dispersés)' },
    {
      tr: 'Yakın için çoğul ism-i işâret (kesra üzere mebnî)',
      fr: 'Pronom démonstratif pluriel de proximité',
    },
    {
      tr: 'جَمَعْتُ fiilinin mef‘ûlün bihi (mahallen mansub)',
      fr: 'Objet direct de jama‘tu',
    }
  ),
  makeEntry(
    'قارئ',
    'قَارِئٌ',
    'kāriin',
    'ق ر أ',
    'isim',
    { tr: 'Kāri’ (Kur’an okuyucu / terâvih imamı)', fr: 'Récitateur (imam dirigeant la prière)' },
    {
      tr: 'Sülâsî mehmûzü’l-lâm ism-i fâil (فَاعِلٌ)',
      fr: 'Participe actif (fâ‘il) de la racine « lire/réciter »',
    },
    {
      tr: 'عَلَىٰ ile mecrûr; hâşiyeye göre «imam» anlamındadır',
      fr: 'Au génitif après ‘alâ ; désigne ici l’imam',
    },
    [
      { arabic: 'قِرَاءَةٌ', translit: 'kırâat', meaning: { tr: 'Okuyuş, tilâvet', fr: 'Récitation' } },
      { arabic: 'قُرْآنٌ', translit: 'Kur’ân', meaning: { tr: 'Kur’an', fr: 'Coran' } },
    ],
    true
  ),
  makeEntry(
    'القارئ',
    'الْقَارِئُ',
    'el-kāriu',
    'ق ر أ',
    'isim',
    { tr: 'Kāri’ (imam)', fr: 'Le récitateur (l’imam)' },
    {
      tr: 'Mârife ism-i fâil',
      fr: 'Participe actif défini',
    },
    {
      tr: 'كَانَ’nin ismi; damme ile merfû',
      fr: 'Sujet de kâna au nominatif',
    }
  ),
  makeEntry(
    'قارئهم',
    'قَارِئِ + هِمْ',
    'kāriihim',
    'ق ر أ',
    'isim',
    { tr: 'İmamlarının / okuyucularının', fr: 'De leur récitateur (leur imam)' },
    {
      tr: 'İsm-i fâil + cem-i müzekker zamiri (هِمْ)',
      fr: 'Nom qâri’ + pronom possessif -him',
    },
    {
      tr: 'صَلَاةِ kelimesinin muzâfün ileyhi; kesra ile mecrûr',
      fr: 'Complément d’annexion au génitif',
    }
  ),
  makeEntry(
    'واحد',
    'وَاحِدٌ',
    'vâhidin',
    'و ح د',
    'isim',
    { tr: 'Tek bir', fr: 'Un seul, unique' },
    {
      tr: 'Sayı/sıfat ismi (فَاعِلٌ)',
      fr: 'Numéral / adjectif cardinal',
    },
    {
      tr: 'قَارِئٍ kelimesinin sıfatı; kesra ile mecrûr',
      fr: 'Épithète au génitif',
    }
  ),
  makeEntry(
    'لكان',
    'لَ + كَانَ',
    'le-kâne',
    'ك و ن',
    'fiil',
    { tr: 'Elbette ... olurdu', fr: 'Ce serait assurément' },
    {
      tr: 'لَوْ cevabında tekit lâmı + nâkıs fiil كَانَ',
      fr: 'Lâm d’apodose + kâna',
    },
    {
      tr: 'لَوْ şartının cevabı; ismi müstetir هُوَ (toplama işi), haberi أَمْثَلَ',
      fr: 'Apodose de law ; prédicat amthala',
    }
  ),
  makeEntry(
    'امثل',
    'أَمْثَلُ',
    'emsele',
    'م ث ل',
    'isim',
    { tr: 'Daha uygun, daha güzel, daha faziletli', fr: 'Meilleur, plus convenable, plus exemplaire' },
    {
      tr: 'İsm-i tafdîl (أَفْعَلُ — gayr-i munsarif)',
      fr: 'Élatif / comparatif diptote (af‘al)',
    },
    {
      tr: 'لَكَانَ’nin haberi; fetha ile mansub (tenvinsiz)',
      fr: 'Prédicat de kâna à l’accusatif (sans tanwîn)',
    },
    [{ arabic: 'مِثَالٌ', translit: 'misâl', meaning: { tr: 'Örnek, model', fr: 'Modèle, exemple' } }],
    true
  ),
  makeEntry(
    'ابي',
    'أُبَيٌّ',
    'Übey',
    'أ ب ي',
    'isim',
    { tr: 'Übey b. Kâ‘b (r.a., Seyyidü’l-Kurrâ / kurrâ sahâbî, ö. 30/650)', fr: 'Ubayy b. Ka‘b (maître des récitateurs parmi les Compagnons)' },
    {
      tr: 'Tasgîr kalıbında sahâbî özel ismi (أُبَيّ)',
      fr: 'Nom propre masculin (diminutif)',
    },
    {
      tr: 'Hadis 3’te عَلَىٰ ile mecrûr; Hadis 4’te أَمَرَ fiilinin mef‘ûlü (mansub)',
      fr: 'Génitif en H3 ; objet direct en H4',
    }
  ),
  makeEntry(
    'كعب',
    'كَعْبٌ',
    'Kâ‘b',
    'ك ع ب',
    'isim',
    { tr: 'Kâ‘b (Übey b. Kâ‘b’ın babası)', fr: 'Ka‘b (père d’Ubayy)' },
    {
      tr: 'Sülâsî özel isim',
      fr: 'Nom propre',
    },
    {
      tr: 'بْنِ kelimesinin muzâfün ileyhi; kesra ile mecrûr',
      fr: 'Complément du nom au génitif',
    }
  ),
  makeEntry(
    'اخرى',
    'أُخْرَىٰ',
    'uhrâ',
    'أ خ ر',
    'isim',
    { tr: 'Başka, diğer (bir gece)', fr: 'Une autre (nuit)' },
    {
      tr: 'آخَرُ kelimesinin müennesi (فُعْلَىٰ — gayr-i munsarif maksûr isim)',
      fr: 'Féminin de âkhar (invariable en alif maqsûra)',
    },
    {
      tr: 'لَيْلَةً kelimesinin sıfatı; takdîren mansub',
      fr: 'Épithète à l’accusatif implicite',
    }
  ),
  makeEntry(
    'نعمت',
    'نِعْمَ / نِعْمَتْ',
    'ni‘meti',
    'ن ع م',
    'fiil',
    { tr: 'Ne güzeldir! (övgü fiili)', fr: 'Quelle excellente (chose) ! (verbe de louange)' },
    {
      tr: 'Câmid (çekimsiz) medih/övgü fiili + müenneslik tâsı (تْ)',
      fr: 'Verbe défectif figé de louange au féminin',
    },
    {
      tr: 'Fâili الْبِدْعَةُ; mahsûs bi’l-medh هٰذِهِ',
      fr: 'Verbe de louange ayant al-bid‘atu pour sujet',
    },
    [{ arabic: 'نِعْمَةٌ', translit: 'ni‘met', meaning: { tr: 'İyilik, lütuf', fr: 'Bienfait, grâce' } }],
    true
  ),
  makeEntry(
    'البدعة',
    'الْبِدْعَةُ',
    'el-bid‘atü',
    'ب د ع',
    'isim',
    { tr: 'Yeni başlatılan güzel uygulama (lugavî anlamda bid‘at)', fr: 'Innovation (au sens linguistique : heureuse initiative)' },
    {
      tr: 'Fı‘let (فِعْلَةٌ) kalıbında isim; sözlükte «daha önce benzeri olmadan yapılan iş»',
      fr: 'Nom de schème fi‘la ; ici au sens lexical d’organisation nouvelle',
    },
    {
      tr: 'نِعْمَتِ fiilinin fâili (damme ile merfû); şer‘î değil lugavî mânadadır çünkü cemaatle kılmanın aslı sünnette mevcuttu',
      fr: 'Sujet au nominatif ; innovation purement linguistique car le fondement existait chez le Prophète',
    },
    [
      { arabic: 'بَدِيعٌ', translit: 'bedî‘', meaning: { tr: 'Eşsiz yaratan/güzel', fr: 'Novateur, admirable' } },
      { arabic: 'إِبْدَاعٌ', translit: 'ibdâ‘', meaning: { tr: 'Özgün oluşturma', fr: 'Création originale' } },
    ],
    true
  ),
  makeEntry(
    'هذه',
    'هٰذِهِ',
    'hâzihî',
    '—',
    'ism-i-isaret',
    { tr: 'Bu (tek imamla cemaat uygulaması)', fr: 'Celle-ci (cette pratique)' },
    {
      tr: 'Yakın için müfred müennes ism-i işâret (mebnî)',
      fr: 'Démonstratif féminin singulier de proximité',
    },
    {
      tr: 'Mahsûs bi’l-medh (muahhar mübtedâ veya mahzuf mübtedânın haberi)',
      fr: 'Terme spécifié par la louange (makhsûs bi-l-madh)',
    }
  ),
  makeEntry(
    'والتي',
    'وَ + الَّتِي',
    've’lletî',
    '—',
    'ism-i-mevsul',
    { tr: 'Ve o (gece vakti / namaz) ki', fr: 'Et celle (la prière de fin de nuit) dont' },
    {
      tr: 'Atıf vâvı + müfred müennes ism-i mevsûl',
      fr: 'Wâw + pronom relatif féminin singulier',
    },
    {
      tr: 'Mübtedâ (mahallen merfû); haberi أَفْضَلُ',
      fr: 'Sujet nominal dont le prédicat est afdalu',
    }
  ),
  makeEntry(
    'التي',
    'الَّتِي',
    'elletî',
    '—',
    'ism-i-mevsul',
    { tr: 'O (namaz) ki', fr: 'Celle que' },
    {
      tr: 'Müfred müennes ism-i mevsûl',
      fr: 'Pronom relatif féminin singulier',
    },
    {
      tr: 'مِنَ harf-i cerriyle mahallen mecrûr',
      fr: 'Complément au génitif virtuel après min',
    }
  ),
  makeEntry(
    'تنامون',
    'نَامَ — يَنَامُ',
    'tenâmûne',
    'ن و م',
    'fiil',
    { tr: 'Uyuyup geçirdiğiniz (gecenin son vaktindeki namaz)', fr: 'Durant laquelle vous dormez (la fin de nuit)' },
    {
      tr: 'Sülâsî 4. bâb ecvef-i vâvî muzâri fiil, cem-i müzekker muhâtab',
      fr: 'Verbe concave inaccompli forme I, 2e pers. masc. pl.',
    },
    {
      tr: 'Nûnun sübûtuyla merfû; الَّتِي’nin sıla cümlesi',
      fr: 'Indicatif pluriel dans la relative',
    },
    [{ arabic: 'نَوْمٌ', translit: 'nevm', meaning: { tr: 'Uyku', fr: 'Sommeil' } }],
    true
  ),
  makeEntry(
    'عنها',
    'عَنْ + هَا',
    '‘anhâ',
    '—',
    'harf',
    { tr: 'Ondan (gecenin son vaktinden gafil uyuyarak)', fr: 'À son sujet / en la laissant passer' },
    {
      tr: 'Harf-i cer (عَنْ) + müennes zamir (هَا)',
      fr: 'Préposition ‘an + pronom féminin -hâ',
    },
    {
      tr: 'تَنَامُونَ fiiline müteallak câr-mecrûr',
      fr: 'Complément indirect du verbe tanâmûna',
    }
  ),
  makeEntry(
    'افضل',
    'أَفْضَلُ',
    'efdalü',
    'ف ض ل',
    'isim',
    { tr: 'Daha faziletli, daha üstün', fr: 'Meilleure, plus méritoire' },
    {
      tr: 'İsm-i tafdîl (أَفْعَلُ — gayr-i munsarif)',
      fr: 'Élatif diptote (af‘al)',
    },
    {
      tr: 'وَالَّتِي mübtedâsının haberi; damme ile merfû',
      fr: 'Prédicat (khabar) au nominatif',
    },
    [{ arabic: 'فَضْلٌ', translit: 'fadl', meaning: { tr: 'Fazilet, lütuf', fr: 'Mérite, grâce' } }],
    true
  ),
  makeEntry(
    'تقومون',
    'قَامَ — يَقُومُ',
    'tekūmûne',
    'ق و م',
    'fiil',
    { tr: 'Kıldığınız / kıyama durduğunuz', fr: 'Que vous accomplissez debout' },
    {
      tr: 'Sülâsî 1. bâb ecvef-i vâvî muzâri fiil, cem-i müzekker muhâtab',
      fr: 'Verbe concave inaccompli forme I, 2e pers. masc. pl.',
    },
    {
      tr: 'Nûnun sübûtuyla merfû; الَّتِي’nin sıla cümlesi',
      fr: 'Indicatif pluriel (proposition relative)',
    }
  ),
  makeEntry(
    'يعني',
    'عَنَىٰ — يَعْنِي',
    'ya‘nî',
    'ع ن ي',
    'fiil',
    { tr: 'Yani / şunu kastediyor (râvi açıklaması)', fr: 'C’est-à-dire / il entendait par là' },
    {
      tr: 'Sülâsî 2. bâb nâkıs-ı yâî muzâri fiil',
      fr: 'Verbe défectueux inaccompli forme I',
    },
    {
      tr: 'Râvinin (Abdurrahman b. Abd el-Kārî) tefsir cümlesi; mef‘ûlü آخِرَ اللَّيْلِ',
      fr: 'Glose explicative du transmetteur',
    }
  ),
  makeEntry(
    'اخر',
    'آخِرُ',
    'âhira',
    'أ خ ر',
    'isim',
    { tr: 'Sonu (gecenin son kısmı)', fr: 'La fin (la dernière partie de la nuit)' },
    {
      tr: 'İsm-i fâil (فَاعِلٌ — أَأْخِرُ → آخِرُ)',
      fr: 'Nom / participe actif (« dernier, fin »)',
    },
    {
      tr: 'يَعْنِي fiilinin mef‘ûlün bihi; fetha ile mansub ve muzâf',
      fr: 'Objet direct à l’accusatif, annexé à al-layl',
    }
  ),
  makeEntry(
    'الليل',
    'اللَّيْلُ',
    'el-leyli',
    'ل ي ل',
    'isim',
    { tr: 'Gece (gecenin)', fr: 'De la nuit' },
    {
      tr: 'Mârife sülâsî cins isim',
      fr: 'Nom masculin défini',
    },
    {
      tr: 'آخِرَ kelimesinin muzâfün ileyhi; kesra ile mecrûr',
      fr: 'Complément d’annexion au génitif',
    }
  ),
  makeEntry(
    'يقومون',
    'قَامَ — يَقُومُ',
    'yekūmûne',
    'ق و م',
    'fiil',
    { tr: 'Gece namazı (terâvih) kılarlardı', fr: 'Accomplissaient le qiyâm (prière nocturne)' },
    {
      tr: 'Sülâsî 1. bâb ecvef-i vâvî muzâri fiil, cem-i müzekker gāib',
      fr: 'Inaccompli forme I, 3e pers. masc. pl.',
    },
    {
      tr: 'كَانَ’nin haberi (mahallen mansub)',
      fr: 'Prédicat verbal de kâna',
    }
  ),
  makeEntry(
    'اوله',
    'أَوَّلُ + هُ',
    'evvelehû',
    'أ و ل',
    'isim',
    { tr: 'Gecenin başlangıcında / ilk vaktinde', fr: 'Au début de celle-ci (la nuit)' },
    {
      tr: 'İsm-i tafdîl / zaman ismi + zamir (هُ)',
      fr: 'Nom « début » + pronom affixe renvoyant à la nuit',
    },
    {
      tr: 'Zarf-ı zaman olarak fetha ile mansub',
      fr: 'Complément circonstanciel de temps à l’accusatif',
    }
  ),

  // --- Hadis 4 Kelimeleri ---
  makeEntry(
    'محمد',
    'مُحَمَّدٌ',
    'Muhammed',
    'ح م د',
    'isim',
    { tr: 'Muhammed (b. Yûsuf el-Kindî, Medineli sika tâbiî)', fr: 'Muhammad (b. Yûsuf al-Kindî, rapporteur fiable)' },
    {
      tr: 'Tef‘îl bâbı ism-i mef‘ûl kalıbında özel isim',
      fr: 'Nom propre (participe passif forme II)',
    },
    {
      tr: 'عَنْ harf-i cerriyle kesra üzere mecrûr',
      fr: 'Au génitif après ‘an',
    }
  ),
  makeEntry(
    'يوسف',
    'يُوسُفُ',
    'Yûsuf',
    '—',
    'isim',
    { tr: 'Yûsuf (Muhammed b. Yûsuf’un babası)', fr: 'Yûsuf' },
    {
      tr: 'Ucme ve alemiyyet sebebiyle gayr-i munsarif özel isim',
      fr: 'Nom propre d’origine non-arabe (diptote)',
    },
    {
      tr: 'بْنِ kelimesinin muzâfün ileyhi; fetha ile mecrûr',
      fr: 'Génitif marqué par fatha (diptote)',
    }
  ),
  makeEntry(
    'السائب',
    'السَّائِبُ',
    'es-Sâib',
    'س ي ب',
    'isim',
    { tr: 'es-Sâib b. Yezîd (r.a., Hz. Peygamber’i çocukken gören sahâbî, ö. 91/710)', fr: 'as-Sâ’ib b. Yazîd (Compagnon médinois, m. 91/710)' },
    {
      tr: 'Ecvef-i yâî ism-i fâil kalıbında özel isim',
      fr: 'Nom propre sur le schème du participe actif',
    },
    {
      tr: 'عَنْ harf-i cerriyle kesra üzere mecrûr',
      fr: 'Au génitif après ‘an',
    }
  ),
  makeEntry(
    'يزيد',
    'يَزِيدُ',
    'Yezîd',
    'ز ي د',
    'isim',
    { tr: 'Yezîd (Hadis 4: Sâib’in babası | Hadis 5: Yezîd b. Rûmân)', fr: 'Yazîd (H4 : père d’as-Sâ’ib | H5 : Yazîd b. Rûmân)' },
    {
      tr: 'Fiil vezni ve alemiyyet sebebiyle gayr-i munsarif isim',
      fr: 'Nom propre diptote de forme verbale',
    },
    {
      tr: 'Fetha ile mecrûr (gayr-i munsarif)',
      fr: 'Génitif en fatha (diptote)',
    }
  ),
  makeEntry(
    'امر',
    'أَمَرَ — يَأْمُرُ',
    'emera',
    'أ م ر',
    'fiil',
    { tr: 'Emretti, görevlendirdi', fr: 'Il ordonna / chargea' },
    {
      tr: 'Sülâsî 1. bâb mehmûzü’l-fâ mâzî fiil',
      fr: 'Verbe hamzé accompli forme I',
    },
    {
      tr: 'Fiil-i mâzî; fâili عُمَرُ, mef‘ûlü أُبَيَّ بْنَ كَعْبٍ وَتَمِيمًا الدَّارِيَّ',
      fr: 'Sujet ‘Umar ; objets Ubayy et Tamîm',
    }
  ),
  makeEntry(
    'وتميما',
    'وَ + تَمِيمًا',
    've Temîmen',
    'ت م م',
    'isim',
    { tr: 'Ve Temîm (ed-Dârî r.a.)', fr: 'Et Tamîm (ad-Dârî, Compagnon)' },
    {
      tr: 'Atıf vâvı + fa‘îl kalıbında özel isim',
      fr: 'Wâw + nom propre masculin',
    },
    {
      tr: 'أُبَيَّ kelimesine ma‘tûf; fetha ile mansub',
      fr: 'Coordonné à l’accusatif',
    }
  ),
  makeEntry(
    'الداري',
    'الدَّارِيُّ',
    'ed-Dârî',
    'د و ر',
    'isim',
    { tr: 'ed-Dârî (Benî ed-Dâr kabilesine mensup sahâbî, ö. 40/660)', fr: 'ad-Dârî (nisba tribale du Compagnon Tamîm)' },
    {
      tr: 'Nisbe sıfatı',
      fr: 'Adjectif de relation (nisba)',
    },
    {
      tr: 'تَمِيمًا kelimesinin sıfatı; fetha ile mansub',
      fr: 'Épithète à l’accusatif',
    }
  ),
  makeEntry(
    'يقوما',
    'قَامَ — يَقُومُ',
    'yekūmâ',
    'ق و م',
    'fiil',
    { tr: 'İkisi (imam olarak) namaz kıldırmaları için', fr: 'Qu’ils dirigent tous deux la prière nocturne' },
    {
      tr: 'Sülâsî 1. bâb ecvef-i vâvî muzâri fiil, tesniye (ikil: Übey ve Temîm)',
      fr: 'Verbe inaccompli au duel (3e pers. masc. duel)',
    },
    {
      tr: 'أَنْ ile nûnun hazfi üzere mansub; elif (ا) tesniye fâilidir',
      fr: 'Subjonctif duel (chute du nûn final après an)',
    }
  ),
  makeEntry(
    'باحدى',
    'بِ + إِحْدَىٰ',
    'bi-ihdâ',
    'أ ح د',
    'isim',
    { tr: 'On bir (11 — bileşik sayının birler kısmı)', fr: 'Onze (premier élément du composé « onze »)' },
    {
      tr: 'Harf-i cer (بِ) + أَحَدٌ kelimesinin müennesi (إِحْدَىٰ)',
      fr: 'Préposition bi- + féminin de « un » dans le composé 11',
    },
    {
      tr: 'إِحْدَىٰ عَشْرَةَ iki cüzü fetha üzere mebnî bileşik sayı; mahallen mecrûr',
      fr: 'Nombre composé invariable en fatha, au génitif virtuel',
    }
  ),
  makeEntry(
    'عشرة',
    'عَشْرَةَ',
    '‘aşrate',
    'ع ش ر',
    'isim',
    { tr: 'On (11 veya 12 bileşik sayısının onlar kısmı)', fr: 'Dix (second élément de 11 ou 12)' },
    {
      tr: 'Müennes ma‘dûda (رَكْعَةً) uyumlu bileşik sayı parçası',
      fr: 'Élément féminin du numéral composé accordé à rak‘atan',
    },
    {
      tr: 'Fetha üzere mebnî bileşik sayı ikinci cüzü',
      fr: 'Partie invariable en fatha du numéral composé',
    }
  ),
  makeEntry(
    'ركعة',
    'رَكْعَةٌ',
    'rek‘aten',
    'ر ك ع',
    'isim',
    { tr: 'Rekât (namaz birimi)', fr: 'Rak‘a (unité de prière)' },
    {
      tr: 'İsm-i merre (bir kez rükû/namaz birimi)',
      fr: 'Nom d’une fois (ism marra) de la racine « s’incliner »',
    },
    {
      tr: '11–99 arası sayıların temyîzi olarak müfred mansub',
      fr: 'Spécificatif numéral (tamyîz) au singulier accusatif',
    },
    [
      { arabic: 'رَكَعَاتٌ', translit: 'reka‘ât', meaning: { tr: 'Rekâtlar', fr: 'Rak‘ât (pl.)' } },
      { arabic: 'رُكُوعٌ', translit: 'rükû‘', meaning: { tr: 'Rükû', fr: 'Inclinaison' } },
    ],
    true
  ),
  makeEntry(
    'ركعات',
    'رَكَعَاتٌ',
    'reka‘âtin',
    'ر ك ع',
    'isim',
    { tr: 'Rekât (çoğul — 8 rekâtta)', fr: 'Rak‘ât (pluriel — en huit rak‘ât)' },
    {
      tr: 'Cem-i müennes sâlim (3–10 arası sayı temyîzi)',
      fr: 'Pluriel féminin sain',
    },
    {
      tr: 'ثَمَانِ sayısının muzâfün ileyhi; kesra ile mecrûr',
      fr: 'Complément de nombre au génitif pluriel',
    }
  ),
  makeEntry(
    'يقرا',
    'قَرَأَ — يَقْرَأُ',
    'yakra’u',
    'ق ر أ',
    'fiil',
    { tr: 'Okurdu (Kur’an tilâvet ederdi)', fr: 'Récitait (le Coran en prière)' },
    {
      tr: 'Sülâsî 3. bâb mehmûzü’l-lâm muzâri fiil',
      fr: 'Verbe hamzé inaccompli forme I',
    },
    {
      tr: 'كَانَ’nin haberi (Hadis 4, 6) veya hâl (Hadis 8: Hz. Âişe’ye imamlık ederek)',
      fr: 'Prédicat de kâna (H4, H6) ou circonstanciel (H8 : dirigeant sa prière)',
    }
  ),
  makeEntry(
    'بالمئين',
    'بِ + الْمِئِينَ',
    'bi’l-mi’îne',
    'م أ ي',
    'isim',
    { tr: 'Yüzlerce âyetli sûrelerle (Miîn sûreleri)', fr: 'Les sourates d’une centaine de versets (al-Mi’în)' },
    {
      tr: 'Harf-i cer (بِ) + مِائَةٌ (yüz) kelimesinin cem-i müzekker sâlime mülhak çoğulu',
      fr: 'Préposition bi- + pluriel de mi’a (« centaine »)',
    },
    {
      tr: 'بِ ile yâ üzere mecrûr; her rekâtta yüz veya yüzlerce âyet okunduğunu gösterir',
      fr: 'Génitif en -în ; désigne les longues sourates dépassant cent versets',
    },
    [{ arabic: 'مِائَةٌ', translit: 'mi’e', meaning: { tr: 'Yüz (100)', fr: 'Cent' } }],
    true
  ),
  makeEntry(
    'حتى',
    'حَتَّىٰ',
    'hattâ',
    '—',
    'harf',
    { tr: 'Öyle ki / tâ ki (sonuç ve derece bildirir)', fr: 'Au point que / jusqu’à ce que' },
    {
      tr: 'İbtidâiyye / gāye harfi',
      fr: 'Conjonction de conséquence ou limite',
    },
    {
      tr: 'Sonraki كُنَّا نَعْتَمِدُ cümlesi kıyamın uzunluğunun sonucunu bildirir',
      fr: 'Introduit la conséquence de la longueur de la station',
    }
  ),
  makeEntry(
    'كنا',
    'كَانَ — كُنَّا',
    'künnâ',
    'ك و ن',
    'fiil',
    { tr: 'Biz ... idik / ... yapardık', fr: 'Nous étions / nous avions coutume de' },
    {
      tr: 'Nâkıs fiil كَانَ, mütekellim ma‘al-ğayr (نَا); iltikā-i sâkineyn sebebiyle vâv düşer',
      fr: 'Auxiliaire kâna, 1re pers. pl.',
    },
    {
      tr: 'نَا zamiri كَانَ’nin ismi; sonraki muzâri fiil haberidir',
      fr: 'Sujet -nâ ; l’inaccompli suivant est prédicat',
    }
  ),
  makeEntry(
    'نعتمد',
    'اعْتَمَدَ — يَعْتَمِدُ',
    'na‘temidu',
    'ع م د',
    'fiil',
    { tr: 'Dayanırdık, yaslanırdık', fr: 'Nous nous appuyions' },
    {
      tr: 'İfti‘âl (VIII.) bâbı muzâri fiil, mütekellim ma‘al-ğayr',
      fr: 'Verbe inaccompli forme VIII, 1re pers. pl.',
    },
    {
      tr: 'كُنَّا’nın haberi; damme ile merfû',
      fr: 'Prédicat verbal de kunnâ',
    },
    [
      { arabic: 'عَمُودٌ', translit: 'amûd', meaning: { tr: 'Direk, sütun', fr: 'Colonne, pilier' } },
      { arabic: 'اعْتِمَادٌ', translit: 'i‘timâd', meaning: { tr: 'Dayanmak, güvenmek', fr: 'Appui, confiance' } },
    ],
    true
  ),
  makeEntry(
    'العصي',
    'الْعَصَا (ج: الْعِصِيُّ)',
    'el-‘ısiyyi',
    'ع ص و',
    'isim',
    { tr: 'Asâlar, bastonlar', fr: 'Les bâtons, cannes' },
    {
      tr: 'عَصَا kelimesinin kırık çoğulu (فُعُولٌ → عُصُوٌّ → عِصِيٌّ)',
      fr: 'Pluriel brisé de ‘asâ (« bâton »)',
    },
    {
      tr: 'عَلَىٰ harf-i cerriyle kesra üzere mecrûr',
      fr: 'Complément au génitif après ‘alâ',
    },
    [{ arabic: 'عَصًا', translit: 'asâ', meaning: { tr: 'Asâ, değnek', fr: 'Bâton' } }],
    true
  ),
  makeEntry(
    'طول',
    'طُولٌ',
    'tûli',
    'ط و ل',
    'isim',
    { tr: 'Uzunluk, uzun sürmesi', fr: 'La longueur, la durée prolongée' },
    {
      tr: 'Sülâsî masdar/isim (فُعْلٌ)',
      fr: 'Nom verbal de longueur',
    },
    {
      tr: 'مِنْ (ta‘lîliyye / sebep) ile mecrûr ve الْقِيَامِ’a muzâf',
      fr: 'Au génitif causal après min',
    },
    [{ arabic: 'طَوِيلٌ', translit: 'tavîl', meaning: { tr: 'Uzun', fr: 'Long' } }]
  ),
  makeEntry(
    'ننصرف',
    'انْصَرَفَ — يَنْصَرِفُ',
    'nensarifu',
    'ص ر ف',
    'fiil',
    { tr: 'Ayrılırdık, dağılırdık (mescidden eve dönerdik)', fr: 'Nous nous retirions / rentrions de la mosquée' },
    {
      tr: 'İnfi‘âl (VII.) bâbı mutâvaat muzâri fiil, mütekellim ma‘al-ğayr',
      fr: 'Verbe inaccompli forme VII (infa‘ala), 1re pers. pl.',
    },
    {
      tr: 'كُنَّا’nın haberi; damme ile merfû',
      fr: 'Prédicat verbal de kunnâ',
    },
    [{ arabic: 'انْصِرَافٌ', translit: 'insırâf', meaning: { tr: 'Ayrılış, dönüş', fr: 'Départ, retour' } }],
    true
  ),
  makeEntry(
    'فروع',
    'فَرْعٌ (ج: فُرُوعٌ)',
    'furû‘i',
    'ف ر ع',
    'isim',
    { tr: 'İlk ışıkları, başlangıcı (فُرُوعُ الْفَجْرِ)', fr: 'Les premières lueurs / prémices (de l’aube)' },
    {
      tr: 'فَرْعٌ kelimesinin kırık çoğulu (فُعُولٌ); Kādî İyâz’a göre «fecrin ilk belirip yükselen ışıkları»',
      fr: 'Pluriel brisé de far‘ ; selon Qâdî ‘Iyâd : « les tout premiers éclats de l’aube »',
    },
    {
      tr: 'فِي ile mecrûr ve الْفَجْرِ kelimesine muzâf',
      fr: 'Au génitif après fî, annexé à al-fajr',
    },
    [{ arabic: 'فَرْعٌ', translit: 'fer‘', meaning: { tr: 'Dal, başlangıç ucu', fr: 'Branche, naissance' } }],
    true
  ),
  makeEntry(
    'الفجر',
    'الْفَجْرُ',
    'el-fecri',
    'ف ج ر',
    'isim',
    { tr: 'Fecir, tan yeri ağarması (imsak vakti)', fr: 'L’aube (al-Fajr, début du jeûne)' },
    {
      tr: 'Mârife sülâsî isim (karanlığı yaran ilk ışık)',
      fr: 'Nom défini désignant le point du jour',
    },
    {
      tr: 'فُرُوعِ veya مَخَافَةَ kelimesinin muzâfün ileyhi; kesra ile mecrûr',
      fr: 'Complément d’annexion au génitif',
    },
    [{ arabic: 'انْفِجَارٌ', translit: 'inficâr', meaning: { tr: 'Yarılıp fışkırma', fr: 'Jaillissement' } }],
    true
  ),

  // --- Hadis 5 Kelimeleri ---
  makeEntry(
    'رومان',
    'رُومَانُ',
    'Rûmân',
    '—',
    'isim',
    { tr: 'Yezîd b. Rûmân (Medineli meşhur tâbiî ve kurrâ, ö. 130/747)', fr: 'Yazîd b. Rûmân (éminent Successeur et lecteur de Médine)' },
    {
      tr: 'Ziyâde elif-nûn ve alemiyyetle gayr-i munsarif özel isim',
      fr: 'Nom propre diptote',
    },
    {
      tr: 'بْنِ kelimesinin muzâfün ileyhi; fetha ile mecrûr',
      fr: 'Génitif en fatha (diptote)',
    }
  ),
  makeEntry(
    'زمان',
    'زَمَانٌ',
    'zemâni',
    'ز م ن',
    'isim',
    { tr: 'Zamanında, döneminde', fr: 'À l’époque de, du temps de' },
    {
      tr: 'Sülâsî zaman ismi (فَعَالٌ)',
      fr: 'Nom de temps (époque)',
    },
    {
      tr: 'فِي ile mecrûr ve عُمَرَ’e muzâf',
      fr: 'Au génitif après fî, annexé à ‘Umar',
    },
    [{ arabic: 'أَزْمِنَةٌ', translit: 'ezmine', meaning: { tr: 'Zamanlar, çağlar', fr: 'Époques' } }]
  ),
  makeEntry(
    'بثلاث',
    'بِ + ثَلَاثٍ',
    'bi-selâsin',
    'ث ل ث',
    'isim',
    { tr: 'Üç ile (yirmi üç: 23 rekât)', fr: 'De trois (vingt-trois : 23 rak‘ât)' },
    {
      tr: 'Harf-i cer (بِ) + müennes ma‘dûda (رَكْعَةً) zıt müzekker sayı',
      fr: 'Préposition bi- + numéral « trois » en polarité de genre',
    },
    {
      tr: 'بِ ile kesra üzere mecrûr (20 terâvih + 3 vitir = 23 rekât)',
      fr: 'Au génitif (20 tarâwîh + 3 witr = 23 rak‘ât)',
    }
  ),
  makeEntry(
    'وعشرين',
    'وَ + عِشْرِينَ',
    've ‘işrîne',
    'ع ش ر',
    'isim',
    { tr: 'Ve yirmi (23 rekât)', fr: 'Et vingt (23 rak‘ât)' },
    {
      tr: 'Atıf vâvı + ukūd sayısı (cem-i müzekker sâlime mülhak)',
      fr: 'Wâw + dizaine invariable en genre (cas oblique -în)',
    },
    {
      tr: 'ثَلَاثٍ üzerine ma‘tûf; yâ ile mecrûr',
      fr: 'Coordonné au génitif en -în',
    }
  ),

  // --- Hadis 6 Kelimeleri ---
  makeEntry(
    'داود',
    'دَاوُدُ',
    'Dâvûd',
    '—',
    'isim',
    { tr: 'Dâvûd b. el-Husayn (Medineli tâbiî/râvi, ö. 135/753)', fr: 'Dâwûd b. al-Husayn (transmetteur médinois)' },
    {
      tr: 'Ucme ve alemiyyetle gayr-i munsarif özel isim',
      fr: 'Nom propre diptote',
    },
    {
      tr: 'عَنْ ile fetha üzere mecrûr',
      fr: 'Génitif en fatha (diptote)',
    }
  ),
  makeEntry(
    'الحصين',
    'الْحُصَيْنُ',
    'el-Husayn',
    'ح ص ن',
    'isim',
    { tr: 'el-Husayn (Dâvûd b. el-Husayn’ın babası)', fr: 'al-Husayn' },
    {
      tr: 'Tasgîr kalıbında özel isim (küçük kale)',
      fr: 'Nom propre diminutif',
    },
    {
      tr: 'بْنِ kelimesinin muzâfün ileyhi; kesra ile mecrûr',
      fr: 'Complément d’annexion au génitif',
    }
  ),
  makeEntry(
    'سمع',
    'سَمِعَ — يَسْمَعُ',
    'semi‘a',
    'س م ع',
    'fiil',
    { tr: 'İşitti, duydu', fr: 'Il a entendu' },
    {
      tr: 'Sülâsî 4. bâb (عَلِمَ) mâzî fiil',
      fr: 'Verbe accompli forme I (fa‘ila)',
    },
    {
      tr: 'أَنَّهُ’nun haberi; mef‘ûlü الْأَعْرَجَ',
      fr: 'Prédicat d’annahu ; objet al-A‘raj',
    },
    [{ arabic: 'سَمَاعٌ', translit: 'semâ‘', meaning: { tr: 'Hocadan bizzat dinleyerek alma', fr: 'Audition directe (samâ‘)' } }]
  ),
  makeEntry(
    'سمعت',
    'سَمِعَ — يَسْمَعُ',
    'semi‘tü',
    'س م ع',
    'fiil',
    { tr: 'İşittim, duydum', fr: 'J’ai entendu' },
    {
      tr: 'Sülâsî 4. bâb mâzî fiil, mütekellim vahdeh (تُ)',
      fr: 'Verbe accompli forme I, 1re pers. sg.',
    },
    {
      tr: 'Fiil-i mâzî; تُ fâil, أَبِي mef‘ûlün bih',
      fr: 'Sujet -tu ; objet abî',
    }
  ),
  makeEntry(
    'الاعرج',
    'الْأَعْرَجُ',
    'el-A‘rec',
    'ع ر ج',
    'isim',
    { tr: 'el-A‘rec (Abdurrahman b. Hürmüz, Ebû Hüreyre’nin baş talebesi, ö. 117/735)', fr: 'al-A‘raj (‘Abd ar-Rahmân b. Hurmuz, grand maître de Médine)' },
    {
      tr: 'Sıfat-ı müşebbehe (أَفْعَلُ) kalıbından lakap',
      fr: 'Surnom qualificatif sur le schème af‘al',
    },
    {
      tr: 'سَمِعَ fiilinin mef‘ûlün bihi; fetha ile mansub',
      fr: 'Objet direct à l’accusatif',
    }
  ),
  makeEntry(
    'ادركت',
    'أَدْرَكَ — يُدْرِكُ',
    'edrektü',
    'د ر ك',
    'fiil',
    { tr: 'Yetiştim, gördüm (önceki nesle kavuştum)', fr: 'J’ai connu / atteint (de mon vivant)' },
    {
      tr: 'İf‘âl (IV.) bâbı mâzî fiil, mütekellim vahdeh',
      fr: 'Verbe accompli forme IV, 1re pers. sg.',
    },
    {
      tr: 'مَا olumsuzluk harfiyle birlikte «ancak şu hal üzere yetiştim» hasr yapısını kurar',
      fr: 'Avec mâ ... illâ : « je n’ai jamais connu les gens autrement que... »',
    },
    [{ arabic: 'إِدْرَاكٌ', translit: 'idrâk', meaning: { tr: 'Kavrama, yetişme', fr: 'Perception, contemporanéité' } }],
    true
  ),
  makeEntry(
    'وهم',
    'وَ + هُمْ',
    've hüm',
    '—',
    'zamir',
    { tr: 'Onlar ... halde iken', fr: 'Alors qu’ils (étaient en train de)' },
    {
      tr: 'Hâl vâvı + munfasıl cem-i müzekker gāib zamiri',
      fr: 'Wâw circonstanciel + pronom sujet 3e pers. masc. pl.',
    },
    {
      tr: 'Mübtedâ; sonraki يَلْعَنُونَ haberiyle birlikte hâl cümlesi',
      fr: 'Sujet de la proposition circonstancielle d’état',
    }
  ),
  makeEntry(
    'يلعنون',
    'لَعَنَ — يَلْعَنُ',
    'yel‘anûne',
    'ل ع ن',
    'fiil',
    { tr: 'Lânet ediyorlardı (vitir kunûtunda beddua)', fr: 'Maudissaient (dans le qunût du witr)' },
    {
      tr: 'Sülâsî 3. bâb muzâri fiil, cem-i müzekker gāib',
      fr: 'Verbe inaccompli forme I, 3e pers. masc. pl.',
    },
    {
      tr: 'Hâşiyeye göre: Hz. Peygamber’in Bi’r-i Maûne şehitleri için yaptığı kunût duasına uyarak vitir kunûtunda okunurdu',
      fr: 'Selon la glose : dans le qunût du witr, à l’imitation du Prophète après Bi’r Ma‘ûna',
    },
    [{ arabic: 'لَعْنٌ', translit: 'la‘n', meaning: { tr: 'Uzaklaştırma, lânet', fr: 'Malédiction, éloignement de la grâce' } }],
    true
  ),
  makeEntry(
    'الكفرة',
    'كَافِرٌ (ج: الْكَفَرَةُ)',
    'el-keferate',
    'ك ف ر',
    'isim',
    { tr: 'Kâfirleri (muhârip inkârcıları)', fr: 'Les mécréants (hostiles)' },
    {
      tr: 'كَافِرٌ kelimesinin kırık çoğulu (فَعَلَةٌ)',
      fr: 'Pluriel brisé de kâfir (schème fa‘ala)',
    },
    {
      tr: 'يَلْعَنُونَ fiilinin mef‘ûlün bihi; fetha ile mansub',
      fr: 'Objet direct à l’accusatif',
    },
    [{ arabic: 'كُفْرٌ', translit: 'küfr', meaning: { tr: 'Örtmek, inkâr etmek', fr: 'Mécréance, négation' } }]
  ),
  makeEntry(
    'سورة',
    'سُورَةٌ',
    'sûrate',
    'س و ر',
    'isim',
    { tr: 'Sûre (Bakara sûresi)', fr: 'La sourate (d’al-Baqara)' },
    {
      tr: 'Sülâsî isim (yüksek mevki, Kur’an bölümü)',
      fr: 'Nom féminin (chapitre du Coran)',
    },
    {
      tr: 'يَقْرَأُ fiilinin mef‘ûlün bihi; fetha ile mansub ve muzâf',
      fr: 'Objet direct à l’accusatif, annexé à al-Baqara',
    },
    [{ arabic: 'سُوَرٌ', translit: 'süver', meaning: { tr: 'Sûreler', fr: 'Sourates' } }]
  ),
  makeEntry(
    'البقرة',
    'الْبَقَرَةُ',
    'el-Bakarati',
    'ب ق ر',
    'isim',
    { tr: 'el-Bakara (Kur’an’ın en uzun sûresi, 286 âyet)', fr: 'al-Baqara (la plus longue sourate du Coran, 286 versets)' },
    {
      tr: 'Mârife sûre adı',
      fr: 'Nom propre défini de la 2e sourate',
    },
    {
      tr: 'سُورَةَ kelimesinin muzâfün ileyhi; kesra ile mecrûr',
      fr: 'Complément d’annexion au génitif',
    }
  ),
  makeEntry(
    'ثمان',
    'ثَمَانٍ',
    'semâni',
    'ث م ن',
    'isim',
    { tr: 'Sekiz (8 rekâtta)', fr: 'Huit (en huit rak‘ât)' },
    {
      tr: 'Mankūs sayı ismi (izâfet halinde yâ’sı veya kesrası görünür: ثَمَانِي / ثَمَانِ)',
      fr: 'Numéral défectueux « huit » (genre masculin devant nom féminin)',
    },
    {
      tr: 'فِي ile mecrûr ve رَكَعَاتٍ kelimesine muzâf',
      fr: 'Au génitif après fî, annexé à raka‘âtin',
    }
  ),
  makeEntry(
    'بها',
    'بِ + هَا',
    'bihâ',
    '—',
    'harf',
    { tr: 'Onu (Bakara sûresini) okuyarak', fr: 'Avec elle (en récitant al-Baqara)' },
    {
      tr: 'Harf-i cer (بِ) + müennes zamir (هَا — Bakara sûresine râci)',
      fr: 'Préposition bi- + pronom féminin renvoyant à la sourate',
    },
    {
      tr: 'قَامَ fiiline müteallak câr-mecrûr',
      fr: 'Complément indirect de qâma',
    }
  ),
  makeEntry(
    'اثنتي',
    'اثْنَتَيْ',
    'isnetey',
    'ث ن ي',
    'isim',
    { tr: 'İki (on iki: 12 rekâtta)', fr: 'Deux (douze : en douze rak‘ât)' },
    {
      tr: 'Müennes tesniye sayı (اثْنَتَانِ — cer halinde ي ile; izâfet/terkibde nûnu düşer)',
      fr: 'Numéral duel féminin au cas oblique (-ay), premier terme de 12',
    },
    {
      tr: 'فِي ile yâ üzere mecrûr (12 rekât)',
      fr: 'Génitif duel après fî',
    }
  ),
  makeEntry(
    'راى',
    'رَأَىٰ — يَرَىٰ',
    'raâ',
    'ر أ ي',
    'fiil',
    { tr: 'Gördüler / kanaat getirdiler', fr: 'Les gens estimaient / considéraient' },
    {
      tr: 'Sülâsî 3. bâb mehmûz-nâkıs mâzî fiil (kalbî görüş)',
      fr: 'Verbe d’estimation accompli forme I',
    },
    {
      tr: 'إِذَا şartının cevabı; fâili النَّاسُ, iki mef‘ûl yerine geçen أَنَّهُ قَدْ خَفَّفَ',
      fr: 'Apodose de idhâ ; sujet an-nâsu',
    }
  ),
  makeEntry(
    'خفف',
    'خَفَّفَ — يُخَفِّفُ',
    'haffefe',
    'خ ف ف',
    'fiil',
    { tr: 'Hafifletti, kısalttı (namazı rahatlattı)', fr: 'Qu’il avait allégé (raccourci la prière)' },
    {
      tr: 'Tef‘îl (II.) bâbı muzaaf (şeddeli kök) mâzî fiil',
      fr: 'Verbe géminé accompli forme II (fa‘‘ala)',
    },
    {
      tr: 'أَنَّهُ’nun haberi (mahallen merfû)',
      fr: 'Prédicat verbal d’annahu',
    },
    [
      { arabic: 'تَخْفِيفٌ', translit: 'tahfîf', meaning: { tr: 'Hafifletme, kolaylaştırma', fr: 'Allègement, facilitation' } },
      { arabic: 'خَفِيفٌ', translit: 'hafîf', meaning: { tr: 'Hafif', fr: 'Léger' } },
    ],
    true
  ),

  // --- Hadis 7 Kelimeleri ---
  makeEntry(
    'فنستعجل',
    'فَ + نَسْتَعْجِلُ',
    'fe-nesta‘cilu',
    'ع ج ل',
    'fiil',
    { tr: 'Bunun üzerine acele ettirirdik', fr: 'Et nous pressions aussitôt' },
    {
      tr: 'Atıf fâsı + İstif‘âl (X.) bâbı (talep/acele isteme) muzâri fiil, 1. çoğul şahıs',
      fr: 'Fa- + verbe inaccompli forme X (istaf‘ala), 1re pers. pl.',
    },
    {
      tr: 'نَنْصَرِفُ üzerine ma‘tûf; mef‘ûlü الْخَدَمَ',
      fr: 'Coordonné à nansarifu ; objet al-khadama',
    },
    [
      { arabic: 'عَجَلَةٌ', translit: 'acele', meaning: { tr: 'Çabukluk, acele', fr: 'Hâte, empressement' } },
      { arabic: 'اسْتِعْجَالٌ', translit: 'isti‘câl', meaning: { tr: 'Acele isteme', fr: 'Empressement' } },
    ],
    true
  ),
  makeEntry(
    'الخدم',
    'الْخَدَمُ',
    'el-hademe',
    'خ د م',
    'isim',
    { tr: 'Hizmetçileri (ev halkına yardımcı olanları)', fr: 'Les serviteurs' },
    {
      tr: 'خَادِمٌ kelimesinin topluluk/kırık çoğulu (فَعَلٌ)',
      fr: 'Nom collectif / pluriel de khâdim (« serviteur »)',
    },
    {
      tr: 'نَسْتَعْجِلُ fiilinin mef‘ûlün bihi; fetha ile mansub',
      fr: 'Objet direct à l’accusatif',
    },
    [{ arabic: 'خِدْمَةٌ', translit: 'hizmet', meaning: { tr: 'Hizmet', fr: 'Service' } }]
  ),
  makeEntry(
    'بالطعام',
    'بِ + الطَّعَامِ',
    'bi’t-ta‘âmi',
    'ط ع م',
    'isim',
    { tr: 'Yemekle (sahur yemeği için)', fr: 'Pour le repas (le suhûr)' },
    {
      tr: 'Harf-i cer (بِ) + fe‘âl kalıbında isim; hâşiyeye göre «sahur yemeği»',
      fr: 'Préposition bi- + ta‘âm (selon la glose : le repas de suhûr)',
    },
    {
      tr: 'نَسْتَعْجِلُ fiiline müteallak câr-mecrûr',
      fr: 'Complément indirect du verbe presser',
    },
    [{ arabic: 'طَعْمٌ', translit: 'ta‘m', meaning: { tr: 'Tat, lezzet', fr: 'Goût' } }]
  ),
  makeEntry(
    'مخافة',
    'مَخَافَةٌ',
    'mehâfete',
    'خ و ف',
    'isim',
    { tr: 'Korkusuyla, endişesiyle (imsak girmesi korkusuyla)', fr: 'Par crainte de (voir poindre l’aube)' },
    {
      tr: 'Mîmli masdar (مَفْعَلَةٌ — مَخْوَفَةٌ → مَخَافَةٌ)',
      fr: 'Masdar à mîm préfixé (maf‘ala) de la racine « craindre »',
    },
    {
      tr: 'Mef‘ûlün li-eclih (sebep bildiren mansub) ve الْفَجْرِ’e muzâf',
      fr: 'Complément de cause (maf‘ûl li-ajlihi) à l’accusatif',
    },
    [
      { arabic: 'خَوْفٌ', translit: 'havf', meaning: { tr: 'Korku', fr: 'Crainte' } },
      { arabic: 'خَائِفٌ', translit: 'hâif', meaning: { tr: 'Korkan', fr: 'Craintif' } },
    ],
    true
  ),

  // --- Hadis 8 Kelimeleri ---
  makeEntry(
    'هشام',
    'هِشَامٌ',
    'Hişâm',
    'ه ش م',
    'isim',
    { tr: 'Hişâm b. Urve (meşhur Medineli muhaddis ve fakih, ö. 146/763)', fr: 'Hishâm b. ‘Urwa (célèbre traditionniste médinois)' },
    {
      tr: 'Fı‘âl kalıbında özel isim',
      fr: 'Nom propre masculin',
    },
    {
      tr: 'عَنْ ile kesra üzere mecrûr',
      fr: 'Au génitif après ‘an',
    }
  ),
  makeEntry(
    'ابيه',
    'أَبِي + هِ',
    'ebîhi',
    'أ ب و',
    'isim',
    { tr: 'Babasından (Urve b. ez-Zübeyr)', fr: 'De son père (‘Urwa b. az-Zubayr)' },
    {
      tr: 'Esmâ-i hamseden أَبٌ (yâ ile mecrûr) + zamir (هِ)',
      fr: 'Nom « père » au génitif en -î + pronom possessif',
    },
    {
      tr: 'عَنْ ile mecrûr ve zamire muzâf',
      fr: 'Au génitif après ‘an',
    }
  ),
  makeEntry(
    'ذكوان',
    'ذَكْوَانُ',
    'Zekvân',
    'ذ ك و',
    'isim',
    { tr: 'Zekvân Ebû Amr (Hz. Âişe’nin müdebber âzatlısı)', fr: 'Dhakwân Abû ‘Amr (affranchi mudabbar de ‘Â’isha)' },
    {
      tr: 'Ziyâde elif-nûn ve alemiyyetle gayr-i munsarif özel isim',
      fr: 'Nom propre diptote',
    },
    {
      tr: 'أَنَّ’nin ismi; fetha ile mansub (tenvinsiz)',
      fr: 'Sujet d’anna à l’accusatif (sans tanwîn)',
    }
  ),
  makeEntry(
    'ابا',
    'أَبَا',
    'Ebâ',
    'أ ب و',
    'isim',
    { tr: 'Ebû (künye: mansub hali)', fr: 'Abû (à l’accusatif)' },
    {
      tr: 'Esmâ-i hamseden أَبٌ; nasb alâmeti eliftir',
      fr: 'L’un des cinq noms à l’accusatif en -â',
    },
    {
      tr: 'ذَكْوَانَ isminden bedel; elif ile mansub ve عَمْرٍو’a muzâf',
      fr: 'Apposition (badal) à l’accusatif',
    }
  ),
  makeEntry(
    'عمرو',
    'عَمْرٌو',
    'Amr',
    'ع م ر',
    'isim',
    { tr: 'Amr (Ebû Amr künyesinin ikinci kısmı)', fr: '‘Amr (dans la kunya Abû ‘Amr)' },
    {
      tr: 'عُمَرُ ile karışmaması için ref‘ ve cer halinde okunmayan vâv ile yazılan özel isim',
      fr: 'Nom propre écrit avec un wâw muet distinctif',
    },
    {
      tr: 'أَبَا kelimesinin muzâfün ileyhi; kesra ile mecrûr',
      fr: 'Complément d’annexion au génitif',
    }
  ),
  makeEntry(
    'عبدا',
    'عَبْدٌ',
    '‘abden',
    'ع ب د',
    'isim',
    { tr: 'Köle (idi)', fr: 'Esclave / serviteur' },
    {
      tr: 'Sülâsî isim',
      fr: 'Nom masculin singulier',
    },
    {
      tr: 'كَانَ’nin haberi; fetha ile mansub',
      fr: 'Prédicat de kâna à l’accusatif',
    }
  ),
  makeEntry(
    'فاعتقته',
    'فَ + أَعْتَقَتْ + هُ',
    'fe-a‘tekathü',
    'ع ت ق',
    'fiil',
    { tr: 'Sonra onu âzat etti (hürriyetine kavuşturdu)', fr: 'Puis elle l’affranchit' },
    {
      tr: 'Atıf fâsı + İf‘âl (IV.) bâbı mâzî fiil (müfred müennes gāibe) + zamir (هُ)',
      fr: 'Fa- + verbe accompli forme IV (3e pers. fém. sg.) + pronom -hu',
    },
    {
      tr: 'Fâili müstetir هِيَ (Hz. Âişe); هُ mef‘ûlün bih',
      fr: 'Sujet implicite (‘Â’isha) ; objet -hu (Dhakwân)',
    },
    [
      { arabic: 'عِتْقٌ', translit: 'ıtk', meaning: { tr: 'Âzat etme, hürriyet', fr: 'Affranchissement' } },
      { arabic: 'مُدَبَّرٌ', translit: 'müdebber', meaning: { tr: 'Efendisinin vefatına bağlı âzat edilen', fr: 'Affranchi à la mort du maître (mudabbar)' } },
    ],
    true
  ),
  makeEntry(
    'دبر',
    'دُبُرٌ',
    'düburin',
    'د ب ر',
    'isim',
    { tr: 'Vefatının ardına bağlı olarak (tedbîr / müdebber âzat)', fr: 'À effet posthume (affranchissement par tadbîr)' },
    {
      tr: 'Sülâsî isim (فُعُلٌ — bir şeyin arkası/sonrası); Feyyûmî hâşiyesi: «vefatından sonra hür olmak üzere»',
      fr: 'Nom trilitère (« après / suite ») ; terme juridique du tadbîr (cf. glose d’al-Fayyûmî)',
    },
    {
      tr: 'عَنْ harf-i cerriyle kesra üzere mecrûr; fıkıhta «tedbîr» akdini ifade eder',
      fr: 'Au génitif après ‘an ; désigne l’affranchissement différé au décès',
    },
    [
      { arabic: 'تَدْبِيرٌ', translit: 'tedbîr', meaning: { tr: 'Köleyi vefatına bağlayarak âzat etme', fr: 'Contrat de tadbîr' } },
      { arabic: 'مُدَبَّرٌ', translit: 'müdebber', meaning: { tr: 'Tedbîr ile âzatlı', fr: 'Esclave mudabbar' } },
    ],
    true
  ),
  makeEntry(
    'منها',
    'مِنْ + هَا',
    'minhâ',
    '—',
    'harf',
    { tr: 'Kendisinden (kendi vefatından sonra)', fr: 'D’elle (après son propre décès)' },
    {
      tr: 'Harf-i cer (مِنْ) + müennes zamir (هَا — Hz. Âişe’ye râci)',
      fr: 'Préposition min + pronom féminin -hâ',
    },
    {
      tr: 'دُبُرٍ kelimesine müteallak câr-mecrûr',
      fr: 'Complément de duburin',
    }
  ),
  makeEntry(
    'يقوم',
    'قَامَ — يَقُومُ',
    'yekūmu',
    'ق و م',
    'fiil',
    { tr: 'Gece namazı kıldırırdı / kıyama dururdu', fr: 'Se tenait en prière nocturne' },
    {
      tr: 'Sülâsî 1. bâb ecvef-i vâvî muzâri fiil',
      fr: 'Verbe concave inaccompli forme I',
    },
    {
      tr: 'كَانَ’nin haberi; damme ile merfû',
      fr: 'Prédicat verbal de kâna',
    }
  ),
  makeEntry(
    'لها',
    'لِ + هَا',
    'lehâ',
    '—',
    'harf',
    { tr: 'Ona (Hz. Âişe’ye imam olarak)', fr: 'Pour elle (en dirigeant sa prière)' },
    {
      tr: 'Harf-i cer (لِ) + müennes zamir (هَا)',
      fr: 'Préposition li- + pronom féminin -hâ',
    },
    {
      tr: 'يَقْرَأُ fiiline müteallak câr-mecrûr (hâşiye: ona imamlık ederek namaz kıldırırdı)',
      fr: 'Complément indirect de yaqra’u (glose : « en officiant comme imam pour elle »)',
    }
  ),
];

export const HADITH_LEXICON_MAP: Record<string, LexiconEntry> = Object.fromEntries(
  RAW_LEXICON_ENTRIES.map((entry) => [entry.key, entry])
);

const LEADING_PUNCT_RE = /^([«»()؛،.:]+)(.*)$/;
const TRAILING_PUNCT_RE = /^(.*?)([«»()؛،.:]+)$/;

/**
 * Splits a vocalized Arabic hadith string into interactive word tokens,
 * preserving punctuation while mapping every Arabic word to its LexiconEntry.
 */
export function tokenizeHadithArabic(
  hadithNumber: number,
  arabicFull: string
): { tokens: HadithWordToken[]; missingKeys: string[] } {
  const rawParts = arabicFull.trim().split(/\s+/);
  const tokens: HadithWordToken[] = [];
  const missingKeys: string[] = [];

  let wordIdx = 0;
  for (const part of rawParts) {
    // Skip standalone punctuation marks like ، . ؛ « » ( )
    if (/^[«»()؛،.:\-—]+$/.test(part)) {
      if (tokens.length > 0) {
        const prev = tokens[tokens.length - 1];
        prev.trailingPunctuation = `${prev.trailingPunctuation ?? ''} ${part}`.trim();
      }
      continue;
    }

    let leadingPunctuation = '';
    let trailingPunctuation = '';
    let core = part;

    const leadMatch = core.match(LEADING_PUNCT_RE);
    if (leadMatch && leadMatch[2]) {
      leadingPunctuation = leadMatch[1];
      core = leadMatch[2];
    }
    const trailMatch = core.match(TRAILING_PUNCT_RE);
    if (trailMatch && trailMatch[1]) {
      core = trailMatch[1];
      trailingPunctuation = trailMatch[2];
    }

    const normalizedKey = normalizeArabicToken(core);
    let analysis = HADITH_LEXICON_MAP[normalizedKey];

    // Special contextual override for أُبَيَّ (Ubayy) vs أَبِي (Abî) since both normalize to ابي
    if (normalizedKey === 'ابي') {
      const hasDammaOnAlif = core.includes('\u064F') || core.includes('\u0651');
      if (hasDammaOnAlif) {
        analysis = makeEntry(
          'أُبَيّ',
          'أُبَيٌّ',
          'Übey',
          'أ ب ي',
          'isim',
          { tr: 'Übey b. Kâ‘b (r.a., Seyyidü’l-Kurrâ, ö. 30/650)', fr: 'Ubayy b. Ka‘b (maître des récitateurs parmi les Compagnons)' },
          { tr: 'Tasgîr kalıbında sahâbî özel ismi (أُبَيٌّ)', fr: 'Nom propre masculin (diminutif)' },
          { tr: 'Hadis 3’te عَلَىٰ ile mecrûr; Hadis 4’te أَمَرَ fiilinin mef‘ûlü (mansub)', fr: 'Génitif en H3 ; objet direct en H4' }
        );
      } else {
        analysis = makeEntry(
          'أَبِي',
          'أَبُو / أَبِي',
          'Ebî / ebî',
          'أ ب و',
          'isim',
          { tr: 'Ebû (künye) / babam (Hadis 7)', fr: 'Abû (kunya) / mon père (Hadith 7)' },
          { tr: 'Esmâ-i hamseden أَبٌ (cer hali) veya mütekellim yâsına muzâf', fr: 'L’un des cinq noms au génitif en -î ou « mon père »' },
          { tr: 'İsnadda عَنْ ile mecrûr; Hadis 7’de سَمِعْتُ fiilinin mef‘ûlü', fr: 'Au génitif dans l’isnâd ; objet de sami‘tu en H7' },
          [{ arabic: 'آبَاءٌ', translit: 'âbâ’', meaning: { tr: 'Babalar', fr: 'Pères' } }]
        );
      }
    }

    if (!analysis) {
      missingKeys.push(`${core} (${normalizedKey})`);
      analysis = makeEntry(
        core,
        core,
        core,
        '—',
        'isim',
        { tr: 'Klasik Arapça ibare', fr: 'Expression en arabe classique' },
        { tr: 'Metin içi kelime', fr: 'Terme du texte' },
        { tr: 'Cümle içi öğe', fr: 'Élément syntaxique' }
      );
    }

    tokens.push({
      id: `h${hadithNumber}-w${wordIdx}`,
      hadithNumber,
      index: wordIdx,
      surface: core,
      normalizedKey,
      leadingPunctuation: leadingPunctuation || undefined,
      trailingPunctuation: trailingPunctuation || undefined,
      analysis,
    });
    wordIdx += 1;
  }

  return { tokens, missingKeys };
}

export function getAllLexiconEntries(): LexiconEntry[] {
  return [...RAW_LEXICON_ENTRIES];
}
