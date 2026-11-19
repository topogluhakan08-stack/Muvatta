import type { BilingualString } from '../types/atlas';

export interface TimelineEvent {
  id: string;
  hijriYear: string;
  gregorianYear: string;
  era: 'youth' | 'teaching' | 'mihna' | 'legacy';
  title: BilingualString;
  summary: BilingualString;
  sourceRef: string;
}

export interface ScholarPerson {
  id: string;
  name: string;
  role: 'teacher' | 'student' | 'peer';
  region: string;
  categoryLabel: BilingualString;
  note: BilingualString;
}

export interface UsulSource {
  id: string;
  rank: number;
  tier: 'primary' | 'medina-companion' | 'ijtihad';
  arabic: string;
  name: BilingualString;
  shortRole: BilingualString;
  explanation: BilingualString;
  malikDistinction: BilingualString;
  accent: 'emerald' | 'gold' | 'burgundy';
}

export interface WisdomQuote {
  id: string;
  arabic: string;
  tr: string;
  fr: string;
  context: BilingualString;
  source: string;
}

export interface ScholarlyFacet {
  id: string;
  title: BilingualString;
  body: BilingualString;
  keyFact: BilingualString;
}

export interface HistoricalMapLocation {
  id: string;
  regionGroup: 'hijaz-yemen' | 'mashriq' | 'maghrib-andalus';
  name: BilingualString;
  arabicName: string;
  coordinatesLabel: string;
  /** SVG viewBox 0..900 x 0..460 */
  x: number;
  y: number;
  role: BilingualString;
  significance: BilingualString;
  keyFigures: string[];
  worksAndLegacy: BilingualString;
  isCenter?: boolean;
}

export const IMAM_MALIK_TIMELINE: TimelineEvent[] = [
  {
    id: 'birth',
    hijriYear: '93 H.',
    gregorianYear: '712 M.',
    era: 'youth',
    title: {
      tr: 'Doğumu ve Yemenî-Asbahî Kökeni',
      fr: 'Naissance et lignée yéménite (Asbahî)',
    },
    summary: {
      tr: 'Medine’de (bir rivayete göre Vâdilkurâ’nın Zülmerve köyünde) dünyaya geldi. Kahtânî Araplarından Asbahî/Himyerî koluna mensuptur. Dedesi Mâlik, Hz. Osman döneminde mushaf istinsahında görev almış ve sahâbeden hadis nakletmiş büyük bir tâbiî idi.',
      fr: 'Né à Médine (ou à Dhûl-Marwa dans le Wâdî al-Qurâ selon une tradition). Issu des Arabes Qahtânî du Yémen (al-Asbahî), son grand-père Mâlik fut un grand Tâbi‘î qui participa à la copie du Mushaf sous le calife ‘Uthmân.',
    },
    sourceRef: 'Kādî İyâz, Tertîbü’l-medârik, I, 111–115',
  },
  {
    id: 'early-study',
    hijriYear: '100–112 H.',
    gregorianYear: '719–730 M.',
    era: 'youth',
    title: {
      tr: 'İlim Yolculuğuna Başlayış ve İbn Hürmüz’e İntisap',
      fr: 'Début de la quête du savoir auprès d’Ibn Hurmuz',
    },
    summary: {
      tr: 'Babasının sorduğu bir soruya kardeşi Nadr’ın doğru cevap verip kendisine “Güvercinler seni oyaladı” demesi üzerine ilme yöneldi. Kur’an’ı ezberledi; 7–8 yıl boyunca yalnızca Abdullah b. Yezîd b. Hürmüz’ün derslerine devam etti. Ardından el-A‘rec, Rebîatürre’y, İbn Şihâb ez-Zührî ve Nâfi‘ gibi 900 civarı âlimden ilim aldı.',
      fr: 'Stimulé par une remarque de son père comparant ses réponses à celles de son frère Nadr, il mémorisa le Coran et consacra sept à huit ans exclusivement à Ibn Hurmuz, avant d’étudier auprès d’environ 900 maîtres dont Rabî‘at ar-Ra’y, az-Zuhrî et Nâfi‘.',
    },
    sourceRef: 'Kādî İyâz, I, 123, 134, 200',
  },
  {
    id: 'teaching-circle',
    hijriYear: '~113 H.',
    gregorianYear: '~731 M.',
    era: 'teaching',
    title: {
      tr: 'Yirmi Yaşında Mescid-i Nebevî’de Ders ve Fetva',
      fr: 'Enseignement et fatwa à la Mosquée du Prophète dès vingt ans',
    },
    summary: {
      tr: 'Hocalarının takdirini kazanarak henüz yirmi yaşlarında Mescid-i Nebevî’de ders halkası kurdu ve fetva vermeye başladı. Özellikle hac mevsimlerinde İslâm dünyasının dört bir yanından gelen talebeler ve âlimler (Ebû Hanîfe, Leys b. Sa‘d, Evzâî, Şeybânî) onunla ilim müzakerelerinde bulundu.',
      fr: 'Reconnu très tôt par ses maîtres, il ouvrit son cercle d’enseignement et de fatwa vers l’âge de vingt ans à la Mosquée du Prophète. Pendant le pèlerinage, savants et étudiants de tout le monde islamique affluaient à son cercle.',
    },
    sourceRef: 'İbn Abdülber, el-İntikā’, s. 45–46',
  },
  {
    id: 'political-neutrality',
    hijriYear: '130–145 H.',
    gregorianYear: '748–762 M.',
    era: 'mihna',
    title: {
      tr: 'Siyasî Tarafsızlık ve Fitnelerden Uzak Duruş',
      fr: 'Neutralité politique face aux insurrections',
    },
    summary: {
      tr: 'Ömrünün yarısını Emevîler, yarısını Abbâsîler devrinde geçirdi. Ebû Hamza eş-Şârî (130/748) ve Muhammed en-Nefsüzzekiyye (145/762) isyanlarında kan dökülmesinden çekinerek silahlı çıkışlara destek vermedi; devlet adamlarına doğrudan hakkı tavsiye etme yolunu benimsedi.',
      fr: 'Ayant vécu sous les Omeyyades puis les Abbassides, il se tint à l’écart des révoltes sanglantes (130/748 et 145/762), préférant conseiller les gouvernants avec dignité plutôt que d’encourager l’effusion de sang.',
    },
    sourceRef: 'TDV DİA, c. 27, s. 507',
  },
  {
    id: 'mihna-146',
    hijriYear: '146 H.',
    gregorianYear: '763 M.',
    era: 'mihna',
    title: {
      tr: '146/763 Mihnesi ve Halife Mansûr’un Özrü',
      fr: 'L’épreuve de 146/763 et les excuses du calife al-Mansûr',
    },
    summary: {
      tr: 'Baskı altında boşamanın geçersiz olduğuna dair hadisi rivayet etmesi siyasî biate ima sayıldığı için Medine valisinin emriyle tutuklanıp kırbaçlandı ve omzu sakatlandı. Halkın büyük tepkisi üzerine Halife Ebû Ca‘fer el-Mansûr hac için geldiğinde özür dileyerek gönlünü aldı.',
      fr: 'Arrêté et flagellé sur ordre du gouverneur de Médine — qui lui causa une luxation de l’épaule — pour avoir transmis un hadith sur la nullité du serment sous contrainte, il reçut ensuite les excuses officielles du calife al-Mansûr lors du Hajj.',
    },
    sourceRef: 'İbn Sa‘d, et-Tabakāt, s. 440; el-İntikā’, s. 80–81',
  },
  {
    id: 'muvatta-refusal',
    hijriYear: '159 H.',
    gregorianYear: '776 M.',
    era: 'teaching',
    title: {
      tr: 'el-Muvatta’ın Telifi ve Devlet Kanunu Teklifini Reddi',
      fr: 'Achèvement d’al-Muwatta’ et refus de l’imposer par l’État',
    },
    summary: {
      tr: 'Ebû Ca‘fer el-Mansûr, ardından Mehdî ve Hârûnürreşîd’in el-Muvatta’ı bütün şehirlerde resmî hukuk kodu yapma teklifini geri çevirdi. Her bölgenin kendi sahâbe mirasına sahip olduğunu belirterek ilmî çoğulculuğu savundu ve Bağdat’a davetleri kabul etmeyip Medine’de kaldı.',
      fr: 'Il déclina la proposition des califes al-Mansûr, al-Mahdî et Hârûn ar-Rashîd d’ériger al-Muwatta’ en code unique de l’Empire, défendant la pluralité des traditions issues des Compagnons dispersés dans les provinces.',
    },
    sourceRef: 'İbn Abdülber, el-İntikā’, s. 80; Süyûtî, s. 71',
  },
  {
    id: 'death',
    hijriYear: '14 Rebîülevvel 179',
    gregorianYear: '7 Haziran 795',
    era: 'legacy',
    title: {
      tr: 'Medine’de Vefatı ve Cennetü’l-Bakī‘ye Defni',
      fr: 'Décès à Médine et inhumation au cimetière d’al-Baqî‘',
    },
    summary: {
      tr: 'Hac ve umre dışında hiç ayrılmadığı, toprağında Resûlullah’ın (s.a.v.) naaşını taşıdığı için bineğe binmeden yürüdüğü Medine’de vefat etti. Cenaze namazını Medine valisi kıldırdı ve Bakī‘ Mezarlığı’na defnedildi. Arkasında 1.000’i aşkın râvi ve kıtaları aşan bir fıkıh mektebi bıraktı.',
      fr: 'Il s’éteignit à Médine — cité qu’il ne quitta que pour le pèlerinage et où il marchait par révérence pour le Prophète (ﷺ) — et fut inhumé à al-Baqî‘, laissant plus d’un millier de transmetteurs et une école juridique majeure.',
    },
    sourceRef: 'Kādî İyâz, I, 109; İbn Halfûn, s. 37',
  },
];

export const SCHOLARS_NETWORK: ScholarPerson[] = [
  {
    id: 't-ibn-hurmuz',
    name: 'Abdullah b. Yezîd b. Hürmüz',
    role: 'teacher',
    region: 'Medine',
    categoryLabel: { tr: 'İlk Hocası (7–8 Yıl)', fr: 'Premier maître (7–8 ans)' },
    note: {
      tr: 'Hadis, fıkıh, ihtilâflı meseleler ve hevâ ehline verilecek delilleri öğrendiği temel hocası.',
      fr: 'Maître fondateur auprès duquel il apprit hadith, fiqh et réfutation des courants dissidents.',
    },
  },
  {
    id: 't-rebia',
    name: 'Rebîatürre’y (Rebîa b. Ebû Abdurrahman)',
    role: 'teacher',
    region: 'Medine',
    categoryLabel: { tr: 'Fıkıh & Re’y Hocası', fr: 'Maître en Fiqh et Ra’y' },
    note: {
      tr: 'Fıkhî melekesinin gelişmesinde büyük etki bıraktı; ancak selef eserine bağlılığı sebebiyle son yıllarda derslerinden ayrıldı.',
      fr: 'Développa son sens juridique ; Mâlik s’écarta toutefois de son cercle par attachement aux récits des anciens.',
    },
  },
  {
    id: 't-zuhri',
    name: 'İbn Şihâb ez-Zührî',
    role: 'teacher',
    region: 'Medine / Şam',
    categoryLabel: { tr: 'En Çok Faydalandığı Hadis Hocası', fr: 'Principal maître en Hadith' },
    note: {
      tr: 'Mâlik’in “Zührî buraya gelince kapısına üşüştük” dediği, Kitâbü’s-Salât fî Ramadân’ın ilk 3 hadisinin de kilit râvisi.',
      fr: 'Maître central dont Mâlik disait : « Dès qu’az-Zuhrî arrivait, nous nous pressions à sa porte » ; pivot des 3 premiers hadiths.',
    },
  },
  {
    id: 't-nafi',
    name: 'Nâfi‘ (İbn Ömer’in Âzatlısı)',
    role: 'teacher',
    region: 'Medine',
    categoryLabel: { tr: 'Silsiletü’z-Zeheb Râvisi', fr: 'Maillon de la Chaîne d’or' },
    note: {
      tr: 'Abdullah b. Ömer’in hadis ve fetvalarını aktaran, Buhârî’nin “en sahih isnad” dediği zincirin ortasındaki âlim.',
      fr: 'Affranchi d’Ibn ‘Umar et maillon central de la « Chaîne d’or » (Mâlik — Nâfi‘ — Ibn ‘Umar).',
    },
  },
  {
    id: 's-ibn-vehb',
    name: 'Abdullah b. Vehb',
    role: 'student',
    region: 'Mısır',
    categoryLabel: { tr: 'Mısır’da İlk Yayıcı', fr: 'Pionnier en Égypte' },
    note: {
      tr: 'Uzun süre Mâlik’in yanında kalıp görüşlerini Mısır’da yaydı; el-Muvatta’ü’l-kebîr ve kader risalesi onunla anılır.',
      fr: 'Longtemps compagnon de Mâlik, il diffusa sa doctrine en Égypte et transmit le grand Muwatta’.',
    },
  },
  {
    id: 's-ibnul-kasim',
    name: 'Abdurrahman b. el-Kāsım',
    role: 'student',
    region: 'Mısır',
    categoryLabel: { tr: 'Baş Talebesi & Tedvin Öncüsü', fr: 'Disciple principal' },
    note: {
      tr: 'Mezhep fıkhının tedvininde başrolü oynadı; Esed b. Furât ve Sahnûn onun rivayetleriyle Mâlikî fıkhını sistemleştirdi.',
      fr: 'Disciple majeur dont les transmissions permirent la codification du fiqh mâlikite (al-Asadiyya, al-Mudawwana).',
    },
  },
  {
    id: 's-esed',
    name: 'Esed b. Furât',
    role: 'student',
    region: 'Kayrevan / Kuzey Afrika',
    categoryLabel: { tr: 'el-Esediyye Müellifi', fr: 'Auteur d’al-Asadiyya' },
    note: {
      tr: 'İbnü’l-Kāsım’dan derlediği el-Esediyye eseriyle Mâlikî mezhebinin Kuzey Afrika’da yerleşmesine öncülük etti.',
      fr: 'Pilier de l’implantation mâlikite au Maghreb grâce à son recueil fondateur al-Asadiyya.',
    },
  },
  {
    id: 's-yahya-leysi',
    name: 'Yahyâ b. Yahyâ el-Leysî',
    role: 'student',
    region: 'Endülüs (Kurtuba)',
    categoryLabel: { tr: 'En Yaygın Muvatta Râvisi', fr: 'Principal transmetteur d’al-Muwatta’' },
    note: {
      tr: 'Endülüs’te Mâlikîliği yerleştirdi; el-Muvatta’ın bugün en çok okunan ve şerh edilen rivayeti ona aittir.',
      fr: 'Introducteur majeur du mâlikisme en al-Andalus ; sa recension d’al-Muwatta’ est la plus répandue.',
    },
  },
  {
    id: 'p-seybani',
    name: 'Muhammed b. Hasan eş-Şeybânî',
    role: 'peer',
    region: 'Bağdat / Irak',
    categoryLabel: { tr: '3 Yıl Öğrencilik · Hanefî İmamı', fr: '3 ans d’étude · Maître hanafite' },
    note: {
      tr: 'Mâlik’in meclisine üç yıl devam etti ve Muvatta’ü’l-İmâm Muhammed rivayetini aktardı; Mâlik de ondan Irak fıkhını tanıdı.',
      fr: 'Suivit le cercle de Mâlik pendant trois ans et transmit sa propre recension comparée d’al-Muwatta’.',
    },
  },
  {
    id: 'p-safii',
    name: 'İmam eş-Şâfiî & Leys b. Sa‘d',
    role: 'peer',
    region: 'Hicaz / Mısır',
    categoryLabel: { tr: 'Müctehid İmamlar & Yazışmalar', fr: 'Grands Imams & correspondances' },
    note: {
      tr: 'Şâfiî, el-Muvatta’ı genç yaşta ezberleyip Mâlik’e okudu. Mısırlı fakih Leys b. Sa‘d ile Amel-i Ehl-i Medîne üzerine tarihî mektuplaşmalar yapıldı.',
      fr: 'Ash-Shâfi‘î récita al-Muwatta’ de mémoire devant Mâlik ; al-Layth b. Sa‘d échangea avec lui des lettres célèbres sur la pratique de Médine.',
    },
  },
];

export const USUL_SOURCES: UsulSource[] = [
  {
    id: 'kuran',
    rank: 1,
    tier: 'primary',
    arabic: 'القُرْآنُ الكَرِيمُ',
    name: { tr: 'Kur’ân-ı Kerîm', fr: 'Le Noble Coran' },
    shortRole: { tr: 'İlk ve en üstün teşriî kaynak', fr: 'Première et suprême source législative' },
    explanation: {
      tr: 'İmam Mâlik’e göre Kur’an lafız ve mânasıyla Arapçadır; tercümesi yerine geçmez ve Arap diline vâkıf olmayanın tefsir yapması câiz değildir. Delâlet bakımından nassı zâhirden kuvvetli sayar; te’vili gerektiren delil yoksa zâhire göre amel eder.',
      fr: 'Source primordiale indissociable de la langue arabe. Mâlik privilégie le texte explicite (nass) sur le sens apparent (zâhir), tout en appliquant le zâhir en l’absence de preuve imposant une interprétation.',
    },
    malikDistinction: {
      tr: 'Âm lafzın delâleti zannîdir; bu sebeple kitap, sünnet ve icmâ yanında haber-i vâhid ve kıyasla da tahsis edilebilir.',
      fr: 'La portée générale (‘âmm) étant présomptive, elle peut être spécifiée même par un hadith singulier ou une analogie.',
    },
    accent: 'emerald',
  },
  {
    id: 'sunnet',
    rank: 2,
    tier: 'primary',
    arabic: 'السُّنَّةُ النَّبَوِيَّةُ',
    name: { tr: 'Sünnet', fr: 'La Sunna prophétique' },
    shortRole: { tr: 'Kur’an’ı açıklayan ve hüküm koyan ikinci kaynak', fr: 'Seconde source explicative et normative' },
    explanation: {
      tr: 'Bir hadisle amel için yalnızca râvilerin sika olması yetmez; metnin Kur’an ve Sünnet’in genel ilkelerine, Medine halkının uygulamasına, maslahata ve sedd-i zerâi‘ prensibine aykırı olmaması da gerekir.',
      fr: 'L’authenticité de la chaîne ne suffit pas : Mâlik confronte le texte (matn) aux principes coraniques, à la pratique de Médine, à l’intérêt général et à la prévention des moyens.',
    },
    malikDistinction: {
      tr: 'Güvendiği âlimlerin mürsel rivayetlerini delil kabul eder; Yahyâ el-Kattân ve Ebû Dâvûd onun mürsellerini diğerlerine üstün tutmuştur.',
      fr: 'Il accepte les récits mursal émanant de transmetteurs sûrs ; les critiques classiques louent la fiabilité exceptionnelle de ses mursal.',
    },
    accent: 'emerald',
  },
  {
    id: 'icma',
    rank: 3,
    tier: 'primary',
    arabic: 'إِجْمَاعُ الأُمَّةِ',
    name: { tr: 'İcmâ-ı Ümmet', fr: 'Consensus de la Communauté (Ijmâ‘)' },
    shortRole: { tr: 'Ümmet ulemasının ittifakı', fr: 'Accord unanime des savants' },
    explanation: {
      tr: 'Nas bulunmayan veya tefsire ihtiyaç duyulan durumlarda icmâa başvurur. Ona göre icmâın dayanağı yalnızca Kur’an ve Sünnet değil, güçlü bir kıyas da olabilir.',
      fr: 'Mobilisé en l’absence de texte explicite ou pour trancher une interprétation ; son fondement peut être scripturaire ou analogique.',
    },
    malikDistinction: {
      tr: 'el-Muvatta’da sıkça “el-emrü’l-müctema‘ aleyhi indenâ” (bize göre üzerinde birleşilen husus) tabirini kullanır.',
      fr: 'Dans al-Muwatta’, il emploie fréquemment la formule « al-amr al-mujtama‘ ‘alayhi ‘indanâ » (le consensus établi chez nous).',
    },
    accent: 'emerald',
  },
  {
    id: 'amel-i-ehl-i-medine',
    rank: 4,
    tier: 'medina-companion',
    arabic: 'عَمَلُ أَهْلِ المَدِينَةِ',
    name: { tr: 'Amel-i Ehl-i Medîne', fr: 'Pratique des gens de Médine (‘Amal Ahl al-Madîna)' },
    shortRole: { tr: 'Yaşayan sünnetin nesilden nesile aktarımı', fr: 'Transmission vivante et collective de la Sunna' },
    explanation: {
      tr: 'Vahyin indiği ve sahâbenin çoğunluğunun yaşadığı Medine halkının kesintisiz uygulaması, Mâlik’in usulünde diğer şehirlerden farklı bir otorite taşır. Nakle dayalı Medine ameli mütevâtir sünnet değerindedir.',
      fr: 'Cité de la Révélation et des Compagnons, Médine conserve une pratique continue. Sa dimension transmise (naqlî) a la force d’une Sunna notoire (mutawâtir).',
    },
    malikDistinction: {
      tr: 'Naklî Medine ameli ile âhâd haber ve kıyas terk edilir; Medine ameliyle desteklenen haber-i vâhid ise Kur’an’ın zâhirine takdim olunur.',
      fr: 'La pratique transmise de Médine l’emporte sur le récit isolé (âhâd) et l’analogie ; combinée à un âhâd, elle prime sur le sens apparent.',
    },
    accent: 'gold',
  },
  {
    id: 'sahabe',
    rank: 5,
    tier: 'medina-companion',
    arabic: 'قَوْلُ الصَّحَابِيِّ',
    name: { tr: 'Sahâbe Görüşleri ve Tâbiîn Fetvaları', fr: 'Avis des Compagnons et des Tâbi‘în' },
    shortRole: { tr: 'Geniş anlamıyla sünnet halkasının parçası', fr: 'Prolongement direct de la Sunna vivante' },
    explanation: {
      tr: 'Hz. Ömer, Abdullah b. Ömer, Zeyd b. Sâbit ve Hz. Âişe’nin fetvalarına derin vukufiyeti vardı. el-Muvatta’da hadislerle birlikte Medineli yedi fakih (Fukahâ-yi Seb‘a), Ömer b. Abdülazîz ve Saîd b. Müseyyeb’in görüşlerine de geniş yer verir.',
      fr: 'Spécialiste des avis de ‘Umar, Ibn ‘Umar, Zayd b. Thâbit et ‘Â’isha, il accorde aussi un grand poids aux sept juristes de Médine et à ‘Umar b. ‘Abd al-‘Azîz.',
    },
    malikDistinction: {
      tr: 'Bir hadisle sahâbe görüşü çeliştiğinde sahâbe görüşünü de temelde sünnete dayalı bir rivayet gibi tartıp güçlü bulduğunu tercih ederdi.',
      fr: 'Préférer l’avis d’un Compagnon à un hadith isolé ne consiste pas à privilégier l’opinion sur la Sunna, mais une Sunna mieux attestée.',
    },
    accent: 'gold',
  },
  {
    id: 'kiyas',
    rank: 6,
    tier: 'ijtihad',
    arabic: 'القِيَاسُ',
    name: { tr: 'Kıyas', fr: 'Raisonnement analogique (Qiyâs)' },
    shortRole: { tr: 'Nas, Medine icmâı ve sahâbe fetvası yoksa başvuru', fr: 'Recours en l’absence de texte ou de pratique établie' },
    explanation: {
      tr: 'Fer‘î meselelerde hem doğrudan naslara hem de kıyasla sabit hükme tahrîc yoluyla kıyas yapar. Kıyasın illetini tanımada maslahat (münâsebet) ilkesini merkeze alır.',
      fr: 'Il pratique l’analogie directe comme l’analogie dérivée (takhrîj), en identifiant la ratio legis (‘illa) à travers la convenance et la finalité (maslaha).',
    },
    malikDistinction: {
      tr: 'Dayanağı kat‘î olan kıyası (kıyâsü’l-usûl) sübûtu zannî âhâd haberlere tercih eder; fakat kıyas ile maslahat çelişirse maslahatı esas alır.',
      fr: 'Une analogie fondée sur des principes certains peut primer sur un âhâd, mais l’analogie cède devant l’intérêt général en cas de conflit.',
    },
    accent: 'burgundy',
  },
  {
    id: 'mesalih-i-mursele',
    rank: 7,
    tier: 'ijtihad',
    arabic: 'المَصَالِحُ المُرْسَلَةُ',
    name: { tr: 'Mesâlih-i Mürsele (İstislâh)', fr: 'Intérêt général non statué (Masâlih Mursala)' },
    shortRole: { tr: 'Mâlikî mezhebini ayırt eden temel istinbat ilkesi', fr: 'Méthode emblématique du rite mâlikite' },
    explanation: {
      tr: 'Dinin itibara aldığı veya ilga ettiğine dair özel delil bulunmayan kamu yararına dayanarak hüküm verme (istislâh) metodunun ilk uygulayıcısı kabul edilir. Aşırı akılcılık ile katı lafızcılık arasında mutedil bir yol tutar.',
      fr: 'Légiférer selon un bien public sur lequel aucun texte particulier ne statue. Mâlik trace ainsi une voie médiane entre rationalisme excessif et littéralisme rigide.',
    },
    malikDistinction: {
      tr: '4 şart arar: Dinin genel kurallarına ve kesin delillere aykırı olmaması, umumi olması, mâkul olması ve bir güçlüğü kaldırması.',
      fr: 'Quatre conditions strictes : conformité aux principes généraux, portée collective, rationalité et levée d’une gêne.',
    },
    accent: 'burgundy',
  },
  {
    id: 'sedd-i-zerai',
    rank: 8,
    tier: 'ijtihad',
    arabic: 'سَدُّ الذَّرَائِعِ',
    name: { tr: 'Sedd-i Zerâi‘', fr: 'Obstruction des moyens illicites (Sadd adh-Dharâ’i‘)' },
    shortRole: { tr: 'Zarara ve harama götüren yolları önceden önleme', fr: 'Prévention des voies menant au préjudice' },
    explanation: {
      tr: 'Helâle ve harama götüren vasıtalar sonuçlarının hükmünü alır. Kendi başına mubah görünen bir fiil, harama veya kamu zararına vesile oluyorsa engellenir.',
      fr: 'Les moyens prennent le statut juridique de leur finalité : un acte licite en soi est interdit s’il conduit vraisemblablement à un préjudice ou à l’illicite.',
    },
    malikDistinction: {
      tr: 'Muâmelât ictihadlarında dış görünüş (objektif unsur) kadar tarafların niyet, kasıt ve sâikini (sübjektif metot) de dikkate alır.',
      fr: 'Dans les transactions, il prend en compte autant l’intention et le mobile subjectifs que la forme extérieure du contrat.',
    },
    accent: 'burgundy',
  },
  {
    id: 'istihsan',
    rank: 9,
    tier: 'ijtihad',
    arabic: 'الِاسْتِحْسَانُ',
    name: { tr: 'İstihsan', fr: 'Préférence juridique (Istihsân)' },
    shortRole: { tr: 'Kıyas güçlük doğurursa cüz’î maslahata dönüş', fr: 'Dérogation équitable à une analogie trop rigide' },
    explanation: {
      tr: 'Kıyasın uygulanması güçlük doğurup umumun menfaatine zarar veriyorsa Şâriin maksadı gözetilerek kıyastan vazgeçilir ve özel maslahat tercih edilir.',
      fr: 'Lorsque l’application stricte du qiyâs entraîne gêne ou préjudice collectif, on lui substitue une solution équitable conforme aux finalités de la Loi.',
    },
    malikDistinction: {
      tr: 'Şâtıbî’nin naklettiği meşhur sözünde İmam Mâlik, “İlmin onda dokuzu istihsandır” buyurmuştur.',
      fr: 'Selon le mot célèbre rapporté par ash-Shâtibî, Mâlik affirmait : « L’istihsân représente les neuf dixièmes de la science. »',
    },
    accent: 'burgundy',
  },
  {
    id: 'istishab',
    rank: 10,
    tier: 'ijtihad',
    arabic: 'الِاسْتِصْحَابُ',
    name: { tr: 'İstishâb', fr: 'Présomption de continuité (Istishâb)' },
    shortRole: { tr: 'Aksi ispatlanmadıkça mevcut hükmün devamı', fr: 'Maintien de l’état antérieur jusqu’à preuve contraire' },
    explanation: {
      tr: 'Karâfî’nin Mâlikî usul listesinde yer alan bu esas, geçmişte sabit olan bir durumun veya hukukî statünün, değiştiğine dair delil bulunmadıkça devam ettiğini varsayar.',
      fr: 'Répertorié par al-Qarâfî parmi les fondements mâlikites, ce principe maintient une situation juridique acquise tant qu’aucune preuve n’établit sa modification.',
    },
    malikDistinction: {
      tr: 'Beraet-i zimmet ve eşyada ibâha ilkeleriyle hukukî istikrarı güvence altına alır.',
      fr: 'Garantit la stabilité juridique en matière de présomption d’innocence et de licéité originelle.',
    },
    accent: 'gold',
  },
  {
    id: 'orf',
    rank: 11,
    tier: 'medina-companion',
    arabic: 'العُرْفُ وَالعَادَةُ',
    name: { tr: 'Örf ve Âdet', fr: 'Coutume et usage établi (‘Urf)' },
    shortRole: { tr: 'Naslara aykırı olmayan yerleşik toplumsal teamül', fr: 'Usage social conforme aux principes scripturaires' },
    explanation: {
      tr: 'Karâfî’nin tasnifinde Mâlikî metodolojisinin on birinci dayanağıdır. Özellikle ticaret, yemin ve sosyal ilişkilerde naslara aykırı düşmeyen örf, hüküm çıkarmada gözetilir.',
      fr: 'Onzième pilier de la synthèse d’al-Qarâfî, l’usage reconnu éclaire les contrats, serments et usages sociaux lorsqu’il ne contredit pas les textes.',
    },
    malikDistinction: {
      tr: 'Halifelerin tek hukuk kodu talebini reddederken her beldenin örf ve sünnet birikimine saygı göstermiştir.',
      fr: 'Explique son refus d’uniformiser par décret les pratiques locales des différentes provinces islamiques.',
    },
    accent: 'gold',
  },
];

export const WISDOM_QUOTES: WisdomQuote[] = [
  {
    id: 'q-din',
    arabic: 'إِنَّ هَذَا الْعِلْمَ دِينٌ ، فَانْظُرُوا عَمَّنْ تَأْخُذُونَ دِينَكُمْ .',
    tr: 'Bu ilim dindir; onu kimden aldığınıza dikkat edin. Şu direklerin dibinde (Mescid-i Nebevî’de) “Resûlullah buyurdu” diyen yetmiş kişiye yetiştim, fakat bu işin ehli olmadıkları için onlardan bir şey almadım.',
    fr: 'Cette science est une religion : veillez attentivement à ceux dont vous la recevez. J’ai connu soixante-dix hommes pieux près de ces piliers disant « le Prophète a dit », mais je n’ai rien pris d’eux car ils n’étaient pas spécialistes de cette discipline.',
    context: {
      tr: 'Râvi tenkidi ve hoca seçimindeki titizliği (Cerh ve Ta‘dîl’in öncülüğü)',
      fr: 'Exigence critique dans le choix des maîtres et la naissance de la critique des transmetteurs',
    },
    source: 'İbn Abdülber, el-İntikā’, s. 46; Kādî İyâz, I, 123',
  },
  {
    id: 'q-istihsan',
    arabic: 'تِسْعَةُ أَعْشَارِ الْعِلْمِ الِاسْتِحْسَانُ .',
    tr: 'İlmin onda dokuzu istihsandır.',
    fr: 'L’istihsân (la recherche de la solution la plus juste) constitue les neuf dixièmes de la science juridique.',
    context: {
      tr: 'Kıyasın katılığı karşısında maslahat ve Şâriin maksadını gözetmesi',
      fr: 'Primauté des finalités de la Loi et de l’équité face à une analogie rigide',
    },
    source: 'Şâtıbî, el-Muvâfakāt, II, 307; IV, 209',
  },
  {
    id: 'q-beser',
    arabic: 'إِنَّمَا أَنَا بَشَرٌ أُخْطِئُ وَأُصِيبُ ، فَانْظُرُوا فِي رَأْيِي ، فَكُلُّ مَا وَافَقَ الْكِتَابَ وَالسُّنَّةَ فَخُذُوهُ .',
    tr: 'Ben ancak bir beşerim; hata da ederim isabet de ederim. Görüşümü inceleyin: Kur’an ve Sünnet’e uygun olanı alın, uymayanı terk edin.',
    fr: 'Je ne suis qu’un être humain, sujet à l’erreur comme à la justesse : examinez mes avis, retenez ce qui concorde avec le Livre et la Sunna, et délaissez le reste.',
    context: {
      tr: 'İctihad tevazuu ve kör taklide karşı ilmî duruşu',
      fr: 'Humilité intellectuelle et refus de l’imitation aveugle',
    },
    source: 'Kādî İyâz, Tertîbü’l-medârik, I, 147',
  },
  {
    id: 'q-ilme-gidilir',
    arabic: 'الْعِلْمُ يُؤْتَى وَلَا يَأْتِي .',
    tr: 'İlim kimsenin ayağına gitmez; ilme gidilir.',
    fr: 'On se rend auprès de la science ; la science ne se déplace à la porte de personne.',
    context: {
      tr: 'Kendisini saraya çağıran halifelere karşı ilmin izzetini koruması',
      fr: 'Sauvegarde de la dignité du savoir face aux convocations des califes',
    },
    source: 'TDV DİA, c. 27, s. 507 (İlmî Şahsiyeti)',
  },
  {
    id: 'q-la-edri',
    arabic: 'جُنَّةُ الْعَالِمِ لَا أَدْرِي ، فَإِذَا أَغْفَلَهَا أُصِيبَتْ مَقَاتِلُهُ .',
    tr: 'Âlimin kalkanı “Bilmiyorum” demektir. (Bir defasında kendisine sorulan 48 meseleden 32’sine, başka bir defasında 40 sorudan 35’ine “Bilmiyorum” diye cevap vermiştir.)',
    fr: 'Le bouclier du savant consiste à dire « Je ne sais pas » — à quarante-huit questions posées, il répondit trente-deux fois « je ne sais pas ».',
    context: {
      tr: 'Fetva hassasiyeti ve farazî meselelerde acele etmeme disiplini',
      fr: 'Scrupule extrême dans la fatwa et refus des spéculations hâtives',
    },
    source: 'Kādî İyâz, Tertîbü’l-medârik, I, 144–146',
  },
  {
    id: 'q-munazara',
    arabic: 'الْمِرَاءُ وَالْجِدَالُ يُقَسِّي الْقَلْبَ وَيُورِثُ الضَّغْنَ .',
    tr: 'Dinî meselelerde çekişme ve münakaşa kalbe kasvet verir ve kin doğurur.',
    fr: 'La polémique stérile durcit le cœur et engendre la rancœur.',
    context: {
      tr: 'Meclis vakarı: ders halkasında yüksek ses ve kısır tartışmaya izin vermezdi',
      fr: 'Sérénité de son assemblée où nulle querelle bruyante n’était tolérée',
    },
    source: 'Kādî İyâz, Tertîbü’l-medârik, I, 170',
  },
  {
    id: 'q-istiva',
    arabic: 'الِاسْتِوَاءُ مَعْلُومٌ ، وَالْكَيْفُ مَجْهُولٌ ، وَالْإِيمَانُ بِهِ وَاجِبٌ ، وَالسُّؤَالُ عَنْهُ بِدْعَةٌ .',
    tr: 'İstivâ (anlam itibarıyla) mâlumdur, keyfiyeti meçhuldür; ona inanmak farz, mahiyetini sormak ise bid‘attir.',
    fr: 'L’établissement (istiwâ’) est connu dans son sens, son comment est inconnu, y croire est obligatoire et s’interroger sur sa modalité est une innovation.',
    context: {
      tr: 'İtikadî yaklaşımı: Kur’an ve Sünnet’in zâhirine ve selef çizgisine bağlılık',
      fr: 'Position théologique fidèle à la lettre des textes et à la voie des anciens',
    },
    source: 'Kādî İyâz, I, 173–177; Süyûtî, s. 18',
  },
];

export const SCHOLARLY_FACETS: ScholarlyFacet[] = [
  {
    id: 'f-hadith',
    title: { tr: 'Hadis Otoritesi ve Cerh-Ta‘dîl', fr: 'Autorité en Hadith et critique des transmetteurs' },
    body: {
      tr: '100.000 civarında hadis ezberlediği hâlde titizliği sebebiyle çok azını rivayet etmiştir. “Emîrü’l-mü’minîn fi’l-hadîs” unvanıyla anılır. Dört kişiden ilim alınmayacağını belirlemiştir: sefahat ehli, bid‘at ehli, günlük sözünde yalan söyleyen ve salâh sahibi olsa da yaşlılıktan sözü karıştıran kimse.',
      fr: 'Bien qu’ayant mémorisé près de 100 000 hadiths, sa rigueur l’amena à n’en transmettre qu’une fraction. Il écarta quatre profils de transmetteurs : le dissolu, l’innovateur, le menteur dans le discours ordinaire et le vieillard pieux mais confus.',
    },
    keyFact: {
      tr: 'En sahih senedler: Mâlik — Nâfi‘ — İbn Ömer · Mâlik — Ebü’z-Zinâd — A‘rec — Ebû Hüreyre',
      fr: 'Chaînes les plus sûres : Mâlik — Nâfi‘ — Ibn ‘Umar · Mâlik — Abû z-Zinâd — al-A‘raj — Abû Hurayra',
    },
  },
  {
    id: 'f-ehl-i-hadis',
    title: { tr: 'Hicaz Ehl-i Hadîsi ve Re’y Dengesi', fr: 'École du Hadith du Hedjaz et équilibre du Ra’y' },
    body: {
      tr: 'Şehristânî ve İbn Haldûn, Irak ehl-i re’yinin imamı olarak Ebû Hanîfe’yi, Hicaz ehl-i hadîsinin imamı olarak İmam Mâlik’i anar. Bununla birlikte Mâlik, el-Muvatta’da re’y ve kıyasa da dengeli şekilde başvurmuş; İbn Rüşd onu kıyasta da “emîrü’l-mü’minîn” nitelemiştir.',
      fr: 'Ibn Khaldûn le désigne comme l’imam des gens du hadith du Hedjaz face à Abû Hanîfa en Irak. Pourtant, Mâlik recourut aussi avec maîtrise au ra’y et à l’analogie lorsqu’aucun texte n’existait.',
    },
    keyFact: {
      tr: 'Bir mesele hakkında “on küsur yıldır düşünüyorum, hâlâ kesin hükme varmadım” sözü (İbnü’l-Kāsım).',
      fr: '« Je réfléchis à cette question depuis plus de dix ans sans avoir encore tranché » (rapporté par Ibn al-Qâsim).',
    },
  },
  {
    id: 'f-itikad',
    title: { tr: 'İtikadî Duruş', fr: 'Posture théologique (‘Aqîda)' },
    body: {
      tr: 'Kelâm tartışmalarından uzak durmuş; gerçek imanın kalbî tasdik, dil ile ikrar ve amelden oluştuğunu, amelle imanın artacağını belirtmiştir (el-Bakara 2/143). Kur’an’ın mahlûk olduğu görüşüne karşı çıkmış ve müminlerin âhirette Allah’ı göreceğini (rü’yetullah) savunmuştur.',
      fr: 'Éloigné des joutes du kalâm, il définit la foi comme croyance du cœur, parole et actes, susceptible d’augmenter. Il rejeta la thèse du Coran créé et affirma la vision de Dieu dans l’au-delà.',
    },
    keyFact: {
      tr: 'Kaderiyye mensuplarına selâm vermemeyi ve onlardan hadis almamayı tavsiye etmiştir.',
      fr: 'Il déconseillait de fréquenter les partisans du qadarisme ou de rapporter des hadiths d’eux.',
    },
  },
  {
    id: 'f-eserler',
    title: { tr: 'el-Muvatta’ Dışındaki Eserleri', fr: 'Autres écrits attribués' },
    body: {
      tr: 'Başeseri el-Muvatta’ yanında tabakat kaynaklarında İbn Vehb’e yazdığı Kaderiyye reddiyesi, kadılara ve fetvaya dair risaleler, Garîbü’l-Kur’ân, Kitâbü’l-Menâsik ve İbnü’l-Arabî’nin el-Kabes sonuna eklediği tefsir rivayetleri zikredilir. Hârûnürreşîd’e nispet edilen mevâiz risalesini ise Zehebî ve Kādî İyâz sahih kabul etmez.',
      fr: 'Outre al-Muwatta’, les sources mentionnent son épître à Ibn Wahb sur la prédestination, des écrits sur le Gharîb al-Qur’ân et les rites, ainsi que ses récits d’exégèse. L’épître d’exhortation attribuée à Hârûn ar-Rashîd est jugée apocryphe par adh-Dhahabî.',
    },
    keyFact: {
      tr: 'Modern derleme: Merviyyâtü’l-İmâm Mâlik b. Enes fi’t-tefsîr (Beyrut 1995).',
      fr: 'Compilation contemporaine : Marwiyyât al-Imâm Mâlik fî t-tafsîr (Beyrouth, 1995).',
    },
  },
];

export const HISTORICAL_MAP_LOCATIONS: HistoricalMapLocation[] = [
  {
    id: 'medine',
    regionGroup: 'hijaz-yemen',
    name: { tr: 'Medine (Dârü’l-Hicre)', fr: 'Médine (Dâr al-Hijra)' },
    arabicName: 'المَدِينَةُ المُنَوَّرَةُ',
    coordinatesLabel: '24.47° N, 39.61° E',
    x: 626,
    y: 312,
    isCenter: true,
    role: {
      tr: 'İmam Mâlik’in Hayat Merkezi · Mescid-i Nebevî · Bakī‘',
      fr: 'Centre de vie de l’Imam Mâlik · Mosquée du Prophète · al-Baqî‘',
    },
    significance: {
      tr: 'İmam Mâlik’in 93/712’de doğup 179/795’te vefatına dek (hac ve umre hariç) hiç ayrılmadığı, el-Muvatta’ı kırk yılda olgunlaştırdığı ve Amel-i Ehl-i Medîne’nin kaynağı olan ilim başkenti. Önce Mescid-i Nebevî’de, ileriki yıllarda evinde binlerce öğrenci yetiştirmiştir.',
      fr: 'Capitale spirituelle et juridique que Mâlik ne quitta que pour le pèlerinage. Berceau du ‘Amal Ahl al-Madîna et lieu de rédaction d’al-Muwatta’ durant quarante ans, où il forma des milliers d’élèves jusqu’à son inhumation à al-Baqî‘.',
    },
    keyFigures: ['İbn Hürmüz', 'Rebîatürre’y', 'İbn Şihâb ez-Zührî', 'Nâfi‘', 'İbnü’l-Mâcişûn', 'Ma‘n b. Îsâ', 'Abdullah b. Nâfi‘ es-Sâiğ'],
    worksAndLegacy: {
      tr: 'el-Muvatta’ telifi, Mescid-i Nebevî ders halkası ve Medineli Yedi Fakih mirasının muhafazası.',
      fr: 'Rédaction d’al-Muwatta’, cercle de la Mosquée du Prophète et conservation de l’héritage des Sept Juristes.',
    },
  },
  {
    id: 'yemen',
    regionGroup: 'hijaz-yemen',
    name: { tr: 'Yemen (Asbahî Kökeni)', fr: 'Yémen (Origine ancestrale)' },
    arabicName: 'اليَمَنُ',
    coordinatesLabel: '15.35° N, 44.21° E',
    x: 685,
    y: 416,
    role: {
      tr: 'Kahtânî / Himyerî / Asbahî Soyunun Menşei',
      fr: 'Berceau ancestral de la tribu Asbahî / Himyarî',
    },
    significance: {
      tr: 'İmam Mâlik’in soy bakımından mensup olduğu Kahtânî Araplarının Asbahî, Ya‘murî ve Himyerî kollarının anayurdu. Dedesi Mâlik veya büyük dedesi Ebû Âmir Yemen’den Medine’ye göç ederek Benî Teym b. Mürre kabilesinin halîfi olmuştur.',
      fr: 'Terre d’origine de la lignée qahtânite (Asbahî, Himyarî) d’Imam Mâlik. Son grand-père Mâlik ou son arrière-grand-père Abû ‘Âmir émigra du Yémen vers Médine où la famille devint alliée des Banû Taym.',
    },
    keyFigures: ['Ebû Âmir el-Asbahî (büyük dede)', 'Mâlik b. Ebî Âmir (dede)', 'Enes b. Mâlik (babası)'],
    worksAndLegacy: {
      tr: 'İmam Mâlik’in tam künyesindeki “el-Asbahî el-Yemenî” nisbesinin tarihî kökeni.',
      fr: 'Origine historique des nisbas « al-Asbahî al-Yamanî » dans l’onomastique de l’Imam.',
    },
  },
  {
    id: 'mekke',
    regionGroup: 'hijaz-yemen',
    name: { tr: 'Mekke (Haremeyn)', fr: 'La Mecque (al-Haramayn)' },
    arabicName: 'مَكَّةُ المُكَرَّمَةُ',
    coordinatesLabel: '21.42° N, 39.83° E',
    x: 632,
    y: 350,
    role: {
      tr: 'Hac & Umre · Ulemâ Müzakereleri ve Halifelerle Buluşma',
      fr: 'Hajj & ‘Umra · Dialogues savants et rencontres califales',
    },
    significance: {
      tr: 'İmam Mâlik’in Medine dışına yalnızca hac ve umre vesilesiyle gittiği mukaddes şehir. Haremeyn’de hac mevsimlerinde İslâm dünyasından gelen büyük fakihlerle sohbet ve müzakereler yapmış; Halife Mansûr ve Hârûnürreşîd kendisiyle burada görüşerek öğüt istemiştir.',
      fr: 'Unique destination hors de Médine pour le Hajj et la ‘Umra. Carrefour où il échangeait avec les juristes venus de tout le monde islamique et où les califes abbassides sollicitaient ses conseils.',
    },
    keyFigures: ['Süfyân b. Uyeyne', 'Ebû Hanîfe (Haremeyn buluşmaları)', 'Halife Ebû Ca‘fer el-Mansûr', 'Hârûnürreşîd'],
    worksAndLegacy: {
      tr: 'Hac mevsimlerindeki yoğun ders halkaları ve ümmet ölçeğinde ilmî etkileşim.',
      fr: 'Rayonnement pan-islamique des séances savantes durant la saison du pèlerinage.',
    },
  },
  {
    id: 'sam',
    regionGroup: 'mashriq',
    name: { tr: 'Şam (Dımaşk)', fr: 'Damas (ash-Shâm)' },
    arabicName: 'الشَّامُ — دِمَشْقُ',
    coordinatesLabel: '33.51° N, 36.28° E',
    x: 590,
    y: 204,
    role: {
      tr: 'Şam Muhaddisleri ve İmam Evzâî ile İlmî Diyalog',
      fr: 'Traditionnistes syriens et dialogue avec al-Awzâ‘î',
    },
    significance: {
      tr: 'Şam ilim muhitinden Ebû Müshir ve Velîd b. Müslim gibi seçkin râvîler İmam Mâlik’ten hadis ve fıkıh nakletmiş; Suriye’nin büyük müctehidi İmam Evzâî ile hac ve ilim meclislerinde karşılıklı bilgi alışverişi gerçekleşmiştir.',
      fr: 'Des traditionnistes majeurs de Syrie tels qu’Abû Mushir et al-Walîd b. Muslim transmirent de Mâlik, tandis que le grand juriste syrien al-Awzâ‘î entretenait avec lui des échanges savants.',
    },
    keyFigures: ['İmam Evzâî', 'Ebû Müshir ed-Dımaşkī', 'Velîd b. Müslim'],
    worksAndLegacy: {
      tr: 'Hicaz ve Şam hadis halkaları arasında güvenilir rivayet köprüsü.',
      fr: 'Passerelle de transmission fiable entre les cercles du Hedjaz et du Levant.',
    },
  },
  {
    id: 'bagdat',
    regionGroup: 'mashriq',
    name: { tr: 'Bağdat / Irak', fr: 'Bagdad / Irak' },
    arabicName: 'بَغْدَادُ — العِرَاقُ',
    coordinatesLabel: '33.31° N, 44.37° E',
    x: 706,
    y: 208,
    role: {
      tr: 'Abbâsî Hilâfet Merkezi · eş-Şeybânî & Ka‘nebî Rivayetleri',
      fr: 'Capitale abbasside · Recensions d’ash-Shaybânî & al-Qa‘nabî',
    },
    significance: {
      tr: 'Abbâsî halifeleri Mansûr, Mehdî, Hâdî, Hârûnürreşîd ve Emîn Mâlik’ten rivayette bulundu; Mehdî’nin Bağdat davetini ise Mâlik affını isteyerek reddetti. Irak fıkhının büyük imamı Muhammed b. Hasan eş-Şeybânî üç yıl Mâlik’ten ders alıp kendi Muvatta’ rivayetini Irak’a taşıdı.',
      fr: 'Siège des califes abbassides qui respectaient Mâlik et transmirent de lui — bien qu’il déclinât l’invitation d’al-Mahdî à s’y installer. Ash-Shaybânî étudia trois ans auprès de lui et diffusa sa célèbre recension d’al-Muwatta’ en Irak.',
    },
    keyFigures: ['Muhammed b. Hasan eş-Şeybânî', 'Abdullah b. Mesleme el-Ka‘nebî', 'Abdurrahman b. Mehdî', 'Ebû Yûsuf', 'Vâkıdî'],
    worksAndLegacy: {
      tr: 'Muvatta’ü’l-İmâm Muhammed ve en çok hadis içeren Ka‘nebî nüshası.',
      fr: 'Muwatta’ al-Imâm Muhammad et recension d’al-Qa‘nabî (la plus riche en hadiths).',
    },
  },
  {
    id: 'misir',
    regionGroup: 'mashriq',
    name: { tr: 'Mısır (Fustat)', fr: 'Égypte (Fustat)' },
    arabicName: 'مِصْرُ',
    coordinatesLabel: '30.04° N, 31.24° E',
    x: 520,
    y: 256,
    role: {
      tr: 'Mâlikî Fıkhının İlk Tedvin Üssü · İbn Vehb & İbnü’l-Kāsım',
      fr: 'Premier foyer de codification · Ibn Wahb & Ibn al-Qâsim',
    },
    significance: {
      tr: 'İmam Mâlik’in görüşlerinin Medine dışındaki en güçlü erken yayılma merkezi. Abdullah b. Vehb, baş talebesi İbnü’l-Kāsım, Eşheb el-Kaysî ve İbn Abdülhakem Mısır’da Mâlikî fıkhını kökleştirdi. Mısırlı müctehid Leys b. Sa‘d ile meşhur fıkıh mektuplaşmaları da buraya yöneliktir.',
      fr: 'Principal pôle précoce du mâlikisme hors de Médine grâce à Ibn Wahb, Ibn al-Qâsim (disciple principal), Ashhab et Ibn ‘Abd al-Hakam. C’est également avec le juriste égyptien al-Layth b. Sa‘d que Mâlik échangea ses célèbres épîtres.',
    },
    keyFigures: ['Abdullah b. Vehb', 'Abdurrahman b. el-Kāsım', 'Eşheb el-Kaysî', 'İbn Abdülhakem', 'Leys b. Sa‘d', 'Yahyâ b. Bükeyr'],
    worksAndLegacy: {
      tr: 'el-Muvatta’ü’l-kebîr, İbnü’l-Kāsım rivayeti ve Mâlikî mezhebinin tedvin temeli.',
      fr: 'al-Muwatta’ al-kabîr, recension d’Ibn al-Qâsim et socle doctrinal de l’école.',
    },
  },
  {
    id: 'kayrevan',
    regionGroup: 'maghrib-andalus',
    name: { tr: 'Kuzey Afrika / Kayrevan', fr: 'Afrique du Nord / Kairouan' },
    arabicName: 'القَيْرَوَانُ — المَغْرِبُ',
    coordinatesLabel: '35.68° N, 10.10° E',
    x: 292,
    y: 192,
    role: {
      tr: 'Mağrib’in Mâlikî Kalesi · el-Esediyye & İbn Ziyâd',
      fr: 'Bastion mâlikite du Maghreb · al-Asadiyya & Ibn Ziyâd',
    },
    significance: {
      tr: 'İbn Ziyâd el-Absî (muhtemelen el-Muvatta’ın en erken rivayeti), İbn Gānim el-Kādî, Behlûl b. Râşid ve İbn Ferrûh’un ardından Esed b. Furât, el-Esediyye eseriyle mezhebi Kuzey Afrika’da hâkim kıldı. Mağrib âlimleri Kütüb-i Sitte’de İbn Mâce yerine el-Muvatta’ı altıncı kitap saymıştır.',
      fr: 'D’Ibn Ziyâd al-‘Absî (vraisemblablement la plus ancienne recension d’al-Muwatta’) à Asad b. al-Furât (auteur d’al-Asadiyya), Kairouan fit du mâlikisme l’école dominante du Maghreb, où al-Muwatta’ remplaça Ibn Mâja dans les Six Livres.',
    },
    keyFigures: ['Esed b. Furât', 'İbn Ziyâd el-Absî', 'İbn Gānim el-Kādî', 'Behlûl b. Râşid', 'İbn Ferrûh'],
    worksAndLegacy: {
      tr: 'el-Esediyye, İbn Ziyâd rivayeti ve Mağrib medreselerinde ilk ezberlenen hadis kitabı geleneği.',
      fr: 'al-Asadiyya, recension d’Ibn Ziyâd et tradition de mémorisation première d’al-Muwatta’.',
    },
  },
  {
    id: 'endulus',
    regionGroup: 'maghrib-andalus',
    name: { tr: 'Endülüs (Kurtuba)', fr: 'al-Andalus (Cordoue)' },
    arabicName: 'الأَنْدَلُسُ — قُرْطُبَةُ',
    coordinatesLabel: '37.88° N, 4.78° W',
    x: 112,
    y: 162,
    role: {
      tr: 'Yahyâ b. Yahyâ el-Leysî · Standart el-Muvatta’ Nüshası',
      fr: 'Yahyâ b. Yahyâ al-Laythî · Recension canonique d’al-Muwatta’',
    },
    significance: {
      tr: 'Şebtûn lakaplı Ziyâd b. Abdurrahman el-Kurtubî ve Yahyâ b. Yahyâ el-Leysî vasıtasıyla Mâlikî mezhebi Endülüs’ün resmî fıkıh geleneği oldu. İbn Abdülber (et-Temhîd, el-İstizkâr), Bâcî (el-Müntekā) ve İbnü’l-Arabî (el-Kabes) gibi dev şârihler bu coğrafyada yetişti.',
      fr: 'Grâce à Ziyâd Shabtûn et Yahyâ b. Yahyâ al-Laythî, le rite mâlikite devint la référence d’al-Andalus. C’est là que virent le jour les plus grands commentaires d’al-Muwatta’ (Ibn ‘Abd al-Barr, al-Bâjî, Ibn al-‘Arabî).',
    },
    keyFigures: ['Yahyâ b. Yahyâ el-Leysî', 'Ziyâd b. Abdurrahman (Şebtûn)', 'İbn Abdülber en-Nemerî', 'Ebü’l-Velîd el-Bâcî', 'Ebû Bekir İbnü’l-Arabî'],
    worksAndLegacy: {
      tr: 'Yahyâ el-Leysî rivayeti (elinizdeki Kitâbü’s-Salât fî Ramadân metninin nüshası) ve Endülüs şerh geleneği.',
      fr: 'Recension de Yahyâ al-Laythî (celle du texte étudié dans cet atlas) et grands commentaires andalous.',
    },
  },
];

export function getUsulByTier(tier: 'all' | UsulSource['tier']): UsulSource[] {
  if (tier === 'all') return USUL_SOURCES;
  return USUL_SOURCES.filter((item) => item.tier === tier);
}

export function getMapLocationById(id: string): HistoricalMapLocation | undefined {
  return HISTORICAL_MAP_LOCATIONS.find((loc) => loc.id === id);
}
