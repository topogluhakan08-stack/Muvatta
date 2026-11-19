import type { BilingualString } from '../types/atlas';

export interface CompilationMilestone {
  id: string;
  era: string;
  title: BilingualString;
  summary: BilingualString;
  sourceRef: string;
}

export interface AuthenticityEvaluation {
  id: string;
  scholar: string;
  dates: string;
  stance: BilingualString;
  quoteOrSummary: BilingualString;
  arabicQuote?: string;
  citation: string;
}

export interface GoldenChain {
  id: string;
  label: BilingualString;
  authority: BilingualString;
  chain: string[];
  arabicChain: string;
  note: BilingualString;
}

export interface NarrationCategory {
  id: 'musned' | 'mursel' | 'mevkuf' | 'maktu';
  name: BilingualString;
  arabicTerm: string;
  count: number;
  colorLight: string;
  colorDark: string;
  definition: BilingualString;
  scholarlyNote: BilingualString;
}

export interface DistillationStage {
  id: string;
  label: BilingualString;
  count: number;
  detail: BilingualString;
}

export type RiwayahRegion = 'maghrib-andalus' | 'egypt' | 'iraq' | 'medina';

export interface RiwayahRecord {
  number: number;
  id: string;
  narrator: string;
  arabicName: string;
  deathDate: string;
  region: RiwayahRegion;
  regionLabel: BilingualString;
  alias?: string;
  distinction: BilingualString;
  description: BilingualString;
  modernEditions: string;
  isPrimaryForAtlas?: boolean;
}

export type CommentaryBaseRecension = 'leysi' | 'seybani';
export type CommentaryFocus = 'hadis-isnad' | 'fikih' | 'muhtasar-lugat' | 'osmanli-hint';

export interface CommentaryRecord {
  id: string;
  title: string;
  arabicTitle: string;
  author: string;
  century: string;
  baseRecension: CommentaryBaseRecension;
  focus: CommentaryFocus;
  volumesOrFormat: string;
  summary: BilingualString;
}

export interface RelatedStudyItem {
  id: string;
  category: BilingualString;
  author: string;
  work: string;
  note: BilingualString;
}

export const MUVATTA_KEY_METRICS: {
  id: string;
  value: string;
  label: BilingualString;
}[] = [
  {
    id: 'books',
    value: '61',
    label: { tr: 'Kitap (Bölüm)', fr: 'Livres (Kitâb)' },
  },
  {
    id: 'narrations',
    value: '1.720',
    label: { tr: 'Toplam Rivayet (Ebherî)', fr: 'Récits au total (al-Abharî)' },
  },
  {
    id: 'years',
    value: '40 Yıl',
    label: { tr: 'Telif ve İhtisar Süreci', fr: '40 ans de révision continue' },
  },
  {
    id: 'riwayahs',
    value: '9',
    label: { tr: 'Günümüze Ulaşan Rivayet', fr: 'Recensions conservées' },
  },
];

export const MUVATTA_ETYMOLOGY = {
  arabic: 'المُوَطَّأُ',
  tr: 'Gözden geçirilip ayıklanan, kolayca anlaşılan, üzerinde fikir birliği edilen (üzerinde mutabık kalınan) kitap.',
  fr: 'Ouvrage révisé et épuré, rendu aisément accessible et faisant l’objet d’un consensus savant.',
  context: {
    tr: 'İmam Mâlik, Medineli bazı âlimlerin hadis kitabından çok fıkıh kitabına benzeyen “el-Muvatta’” adlı çalışmalarını gördükten sonra Hz. Peygamber’in hadisleriyle birlikte Medine halkının uygulamasını (amel-i ehl-i Medîne) yansıtan sahâbe görüşlerini ve tâbiîn fetvalarını bir araya getirmek üzere bu eseri kaleme aldı.',
    fr: 'Après avoir observé d’autres ouvrages médinois nommés al-Muwatta’ plus proches du fiqh que du hadith, l’Imam Mâlik composa ce recueil pour réunir les hadiths prophétiques, les avis des Compagnons reflétant la pratique médinoise (‘Amal Ahl al-Madîna) et les fatwas des Successeurs.',
  },
};

export const COMPILATION_TIMELINE: CompilationMilestone[] = [
  {
    id: 'origin',
    era: 'H. II. Yüzyıl Ortaları',
    title: {
      tr: 'Telif Gayesi ve İlk Taslak (10.000 / 4.000 Rivayet)',
      fr: 'Genèse et premier fonds (10 000 ou 4 000 récits)',
    },
    summary: {
      tr: 'Kitap ve bab tertibinde tasnif edilip günümüze ulaşan ilk hadis-fıkıh mecmuası olarak tasarlanan el-Muvatta’ın başlangıçta 10.000 (bir rivayete göre 4.000) rivayet içerdiği nakledilir.',
      fr: 'Premier recueil de hadith et de fiqh classé par livres et chapitres parvenu jusqu’à nous, al-Muwatta’ aurait initialement rassemblé 10 000 (ou 4 000) récits.',
    },
    sourceRef: 'Kādî İyâz, Tertîbü’l-medârik, I, 193',
  },
  {
    id: 'mansur-159',
    era: '159 / 776',
    title: {
      tr: 'Ebû Ca‘fer el-Mansûr’un Teklifi ve Ana Telifin Tamamlanması',
      fr: 'Commande d’Abû Ja‘far al-Mansûr et achèvement principal',
    },
    summary: {
      tr: 'Abbâsî Halifesi Ebû Ca‘fer el-Mansûr’un teklifiyle hız kazanan telif çalışması 159 (776) yılında ana yapısına kavuştu. Mâlik eseri her yıl yeniden okuyup ayıklamayı sürdürdü.',
      fr: 'Engagé à l’instigation du calife abbasside al-Mansûr, l’ouvrage atteignit sa structure principale en 159/776, tout en restant soumis à des révisions annuelles.',
    },
    sourceRef: 'TDV DİA, c. 31, s. 414',
  },
  {
    id: 'state-code-refusal',
    era: 'Mansûr · Mehdî · Hârûnürreşîd',
    title: {
      tr: 'Devlet Kanunu Yapma Teklifinin Reddi',
      fr: 'Refus de la codification étatique impériale',
    },
    summary: {
      tr: 'Ebû Ca‘fer el-Mansûr’un — ve ardından Mehdî-Billâh ile Hârûnürreşîd’in — el-Muvatta’ı çoğaltıp bütün beldelerde resmî hukuk kodu yapma teklifini İmam Mâlik reddetti: İslâm beldelerine dağılan sahâbîlerin Resûlullah’tan öğrendikleri farklı sahih uygulamaların zorla tek tipleştirilmesini doğru bulmadı.',
      fr: 'L’Imam Mâlik refusa la proposition d’al-Mansûr, puis d’al-Mahdî et de Hârûn ar-Rashîd, d’imposer al-Muwatta’ comme code unique de l’empire, rappelant que les Compagnons dispersés dans les provinces avaient transmis des pratiques prophétiques légitimes et diverses.',
    },
    sourceRef: 'TDV DİA, c. 31, s. 414',
  },
  {
    id: 'forty-years-pruning',
    era: '40 Yıllık Süreç (~139–179 H.)',
    title: {
      tr: 'Kırk Yıllık Sürekli Müdahale ve Nüsha Farklarının Gerçek Sebebi',
      fr: 'Quarante ans d’affinage et origine des variantes entre recensions',
    },
    summary: {
      tr: 'el-Muvatta’ nüshaları arasındaki tertip ve rivayet sayısı farkları, müsteşrik H. Lammens’in (İA, VII, 254) iddia ettiği gibi râvilerin metne serbest müdahalesinden değil; bizzat İmam Mâlik’in kırk yıl boyunca eserini her yıl gözden geçirip ihtisar etmesinden kaynaklanmıştır.',
      fr: 'Les différences d’ordre et de nombre de récits entre recensions ne proviennent pas d’une négligence des copistes (contrairement à l’hypothèse de H. Lammens), mais des révisions annuelles personnelles de l’Imam Mâlik durant quarante ans.',
    },
    sourceRef: 'TDV DİA, c. 31, s. 414',
  },
  {
    id: 'maghrib-andalus',
    era: 'III.–V. / IX.–XI. Yüzyıllar',
    title: {
      tr: 'Kütüb-i Sitte Etkisi ve Mağrib–Endülüs Medreseleri',
      fr: 'Influence sur les Six Livres et primauté au Maghreb & al-Andalus',
    },
    summary: {
      tr: 'Kütüb-i Sitte’nin tasnif metoduna öncülük eden el-Muvatta’, Kuzey Afrikalı âlimlerce İbn Mâce’nin es-Sünen’i yerine altıncı temel kitap kabul edildi. Ebû Bekir İbnü’l-Arabî’ye göre Mağrib ve Endülüs medreselerinde ilk ezberletilen kitap el-Muvatta’ idi.',
      fr: 'Modèle méthodologique pour les Six Livres canoniques, al-Muwatta’ fut retenu par les savants maghrébins comme sixième livre à la place des Sunan d’Ibn Mâja et constituait le premier ouvrage mémorisé dans les madrasas d’al-Andalus.',
    },
    sourceRef: 'TDV DİA, c. 31, s. 414; XXII, 485',
  },
];

export const AUTHENTICITY_EVALUATIONS: AuthenticityEvaluation[] = [
  {
    id: 'shafii',
    scholar: 'İmam Şâfiî',
    dates: 'ö. 204/820',
    stance: {
      tr: 'Sahîhayn Öncesi En Sahih Kitap',
      fr: 'Ouvrage le plus authentique avant les deux Sahîh',
    },
    arabicQuote: 'مَا ظَهَرَ عَلَى الْأَرْضِ كِتَابٌ بَعْدَ كِتَابِ اللَّهِ أَصَحُّ مِنْ كِتَابِ مَالِكٍ',
    quoteOrSummary: {
      tr: 'Henüz Buhârî ve Müslim’in Sahîhayn’ı tasnif edilmeden önce İmam Şâfiî, yeryüzünde Allah’ın kitabından sonra en sahih kitabın el-Muvatta’ olduğunu ifade etmiştir.',
      fr: 'Avant la compilation des deux Sahîh d’al-Bukhârî et de Muslim, l’Imam ash-Shâfi‘î déclara qu’aucun livre sur terre, après le Livre de Dieu, n’était plus authentique qu’al-Muwatta’.',
    },
    citation: 'TDV DİA, c. 31, s. 414',
  },
  {
    id: 'zehebi',
    scholar: 'Şemseddin ez-Zehebî',
    dates: 'ö. 748/1348',
    stance: {
      tr: 'İbn Hazm’a İtiraz ve Sahîhayn’dan Hemen Sonra Konum',
      fr: 'Réfutation d’Ibn Hazm : rang immédiatement après les Sahîhayn',
    },
    quoteOrSummary: {
      tr: 'Hadis kitaplarını beş tabakaya ayırıp el-Muvatta’ı beşinci sıraya yerleştiren İbn Hazm’ı isabetli bulmayan Zehebî, eserin Sahîhayn’dan hemen sonra Ebû Dâvûd ve Nesâî’nin es-Sünen’leriyle birlikte anılması gerektiğini belirtmiştir.',
      fr: 'Réfutant Ibn Hazm qui avait relégué al-Muwatta’ au cinquième rang, adh-Dhahabî affirme qu’il se situe immédiatement après les deux Sahîh, aux côtés des Sunan d’Abû Dâwûd et d’an-Nasâ’î.',
    },
    citation: 'A‘lâmü’n-nübelâ’, XVIII, 203',
  },
  {
    id: 'ibn-abdulber-salah',
    scholar: 'İbn Abdülber & İbnü’s-Salâh',
    dates: 'ö. 463/1071 · ö. 643/1245',
    stance: {
      tr: '61 Belâğ Hadisinin Tamamının Muttasıl Senedlerle Tespiti',
      fr: 'Connexion intégrale des 61 récits balâgh par des chaînes continues',
    },
    quoteOrSummary: {
      tr: 'İbn Abdülber et-Temhîd’de el-Muvatta’daki mürsel, münkatı‘ ve mu‘dal rivayetlerin muttasıl senedlerini gösterdi; “beleganî / ‘ani’s-sika” lafzıyla gelen 61 hadisten yalnız 4’ünün senedini bulamadı. İbnü’s-Salâh ise Risâle fî vasli’l-belâgāti’l-erba‘a adlı eserinde bu son 4 hadisin de muttasıl olduğunu ispat etti.',
      fr: 'Dans at-Tamhîd, Ibn ‘Abd al-Barr établit des chaînes continues pour les récits mursal et munqati‘, ne laissant que 4 des 61 balâghât sans isnâd continu — lacune qu’Ibn as-Salâh combla intégralement dans son traité dédié.',
    },
    citation: 'et-Temhîd; Risâle fî vasli’l-belâgāti’l-erba‘a',
  },
  {
    id: 'goldziher-refutation',
    scholar: 'Hadis Kitabı mı, Fıkıh Kitabı mı?',
    dates: 'Modern Literatür Değerlendirmesi',
    stance: {
      tr: 'Goldziher & Brockelmann Tezinin Eleştirisi',
      fr: 'Critique de la thèse de Goldziher et Brockelmann',
    },
    quoteOrSummary: {
      tr: 'Daha çok ahkâm hadislerini topladığı ve İmam Mâlik’in fetva ile ictihadlarını barındırdığı gerekçesiyle Ignaz Goldziher ve Carl Brockelmann’ın el-Muvatta’ı yalnızca bir fıkıh kitabı sayması isabetli görülmemektedir; eser hem hadis tasnifinin kurucu metni hem de yaşayan Medine fıkhının kaynağıdır.',
      fr: 'Contrairement à Ignaz Goldziher et Carl Brockelmann qui réduisaient al-Muwatta’ à un simple manuel de fiqh en raison des fatwas qu’il renferme, il demeure un ouvrage fondateur de la compilation du hadith autant qu’un témoin du droit médinois.',
    },
    citation: 'TDV DİA, c. 31, s. 414',
  },
];

export const GOLDEN_CHAINS: GoldenChain[] = [
  {
    id: 'silsiletuz-zeheb',
    label: {
      tr: 'Silsiletü’z-Zeheb (Altın Silsile)',
      fr: 'Silsilat adh-Dhahab (Chaîne d’or)',
    },
    authority: {
      tr: 'İmam Buhârî’nin En Güvenilir Sened Tanımı',
      fr: 'Chaîne jugée la plus fiable par al-Bukhârî',
    },
    chain: ['İmam Mâlik', 'Nâfi‘ (İbn Ömer’in âzatlısı)', 'Abdullah b. Ömer', 'Hz. Peygamber (s.a.v.)'],
    arabicChain: 'مَالِكٌ ⟵ نَافِعٌ ⟵ ابْنُ عُمَرَ',
    note: {
      tr: 'Buhârî, bu tarikiyle gelen rivayetlerin tüm senedler içinde en sahih ve güvenilir sened olduğunu belirterek buna “Silsiletü’z-Zeheb” adını vermiştir.',
      fr: 'Al-Bukhârî qualifia cette lignée de « Chaîne d’or », la jugeant la plus authentique parmi toutes les chaînes de transmission.',
    },
  },
  {
    id: 'zuhri-salim',
    label: {
      tr: 'Zührî — Sâlim — İbn Ömer Tariki',
      fr: 'Voie az-Zuhrî — Sâlim — Ibn ‘Umar',
    },
    authority: {
      tr: 'Ahmed b. Hanbel & İshak b. Râhûye Tercihi',
      fr: 'Privilégiée par Ahmad b. Hanbal & Ishâq b. Râhûya',
    },
    chain: ['İmam Mâlik', 'İbn Şihâb ez-Zührî', 'Sâlim b. Abdullah', 'Abdullah b. Ömer'],
    arabicChain: 'مَالِكٌ ⟵ الزُّهْرِيُّ ⟵ سَالِمٌ ⟵ ابْنُ عُمَرَ',
    note: {
      tr: 'Ahmed b. Hanbel ve İshak b. Râhûye, el-Muvatta’daki en sahih isnadın bu Medine silsilesi olduğunu ifade etmiştir.',
      fr: 'Ahmad b. Hanbal et Ishâq b. Râhûya considéraient cette chaîne médinoise comme l’isnâd le plus rigoureux d’al-Muwatta’.',
    },
  },
  {
    id: 'ebuzzinad-arec',
    label: {
      tr: 'Ebü’z-Zinâd — A‘rec — Ebû Hüreyre Tariki',
      fr: 'Voie Abû z-Zinâd — al-A‘raj — Abû Hurayra',
    },
    authority: {
      tr: 'Buhârî & Ebû Dâvûd’un En Sahih Senedleri Arasında',
      fr: 'Comptée parmi les chaînes suprêmes par al-Bukhârî et Abû Dâwûd',
    },
    chain: ['İmam Mâlik', 'Ebü’z-Zinâd', 'Abdurrahman el-A‘rec', 'Ebû Hüreyre'],
    arabicChain: 'مَالِكٌ ⟵ أَبُو الزِّنَادِ ⟵ الْأَعْرَجُ ⟵ أَبُو هُرَيْرَةَ',
    note: {
      tr: 'Buhârî’nin Sahîh’inde özellikle itibar ettiği yüksek dereceli Medine isnadlarından biridir.',
      fr: 'L’une des chaînes médinoises de très haute fiabilité privilégiées dans le Sahîh d’al-Bukhârî.',
    },
  },
];

export const NARRATION_CATEGORIES: NarrationCategory[] = [
  {
    id: 'mevkuf',
    name: { tr: 'Mevkuf', fr: 'Mawqûf (Compagnons)' },
    arabicTerm: 'المَوْقُوفُ',
    count: 613,
    colorLight: '#8B6520',
    colorDark: '#DFC07D',
    definition: {
      tr: 'Sahâbeye nispet edilen söz, fiil ve fetva rivayetleri.',
      fr: 'Paroles, actes et fatwas attribués aux Compagnons (Sahâba).',
    },
    scholarlyNote: {
      tr: '613 rivayet (%35,6) ile eserdeki en geniş grubu oluşturur. İmam Mâlik’in Hz. Ömer, İbn Ömer, Hz. Âişe ve Zeyd b. Sâbit fetvalarını yaşayan Medine sünnetinin taşıyıcısı gördüğünü kanıtlar (Kitâbü’s-Salât fî Ramadân’daki Hadis 3, 4, 5, 6, 7 ve 8 bu Medine mirasını yansıtır).',
      fr: 'Avec 613 récits (35,6 %), c’est la catégorie la plus importante : elle reflète le poids accordé par Mâlik aux fatwas de ‘Umar, Ibn ‘Umar, ‘Â’isha et Zayd b. Thâbit dans la pratique médinoise.',
    },
  },
  {
    id: 'musned',
    name: { tr: 'Müsned', fr: 'Musnad (Prophétique continu)' },
    arabicTerm: 'المُسْنَدُ',
    count: 600,
    colorLight: '#165B43',
    colorDark: '#4FB28C',
    definition: {
      tr: 'Senedi kesintisiz (muttasıl) biçimde Hz. Peygamber’e (s.a.v.) ulaşan merfû hadisler.',
      fr: 'Hadiths prophétiques (marfû‘) dotés d’une chaîne de transmission ininterrompue.',
    },
    scholarlyNote: {
      tr: '600 müsned hadis (%34,9) el-Muvatta’ın çekirdek ahkâm sütunudur. Kitâbü’s-Salât fî Ramadân’ın ilk babındaki Hadis 1 (Hz. Âişe) ve Hadis 2 (Ebû Hüreyre) bu sınıfın en seçkin örneklerindendir.',
      fr: 'Les 600 hadiths musnad (34,9 %) constituent le cœur normatif du recueil, illustré par les Hadiths 1 et 2 du Kitâb as-Salât fî Ramadân.',
    },
  },
  {
    id: 'maktu',
    name: { tr: 'Maktû', fr: 'Maqtû‘ (Successeurs)' },
    arabicTerm: 'المَقْطُوعُ',
    count: 285,
    colorLight: '#722630',
    colorDark: '#D47A85',
    definition: {
      tr: 'Tâbiîn nesline (özellikle Medineli yedi fakih, Saîd b. Müseyyeb, Zührî, Nâfi‘, Ömer b. Abdülazîz) ait görüş ve uygulamalar.',
      fr: 'Avis juridiques et pratiques des Successeurs (Tâbi‘ûn), notamment des sept juristes de Médine.',
    },
    scholarlyNote: {
      tr: '285 maktû rivayet (%16,6), Medine hukuk geleneğinin sahâbeden İmam Mâlik’in dönemine nasıl kesintisiz aktarıldığını belgeler.',
      fr: 'Ces 285 récits (16,6 %) documentent la continuité jurisprudentielle de Médine entre les Compagnons et la génération de l’Imam Mâlik.',
    },
  },
  {
    id: 'mursel',
    name: { tr: 'Mürsel', fr: 'Mursal (Tâbiî → Prophète)' },
    arabicTerm: 'المُرْسَلُ',
    count: 222,
    colorLight: '#5C5346',
    colorDark: '#9A9287',
    definition: {
      tr: 'Tâbiînin sahâbî râviyi zikretmeden doğrudan Hz. Peygamber’den aktardığı rivayetler.',
      fr: 'Récits dans lesquels un Successeur cite directement le Prophète sans mentionner le Compagnon intermédiaire.',
    },
    scholarlyNote: {
      tr: '222 mürsel rivayet (%12,9) içerir. İbn Abdülber ve İbnü’s-Salâh’ın tespitiyle bu rivayetler ile 61 belâğ kaydının tamamı başka tariklerle muttasıl senede sahiptir; Yahyâ el-Kattân ve Ebû Dâvûd, Mâlik’in mürsellerini diğerlerinden üstün tutmuştur.',
      fr: 'Ces 222 récits (12,9 %), ainsi que les 61 balâghât, ont tous été reliés par des chaînes continues grâce aux travaux d’Ibn ‘Abd al-Barr et d’Ibn as-Salâh.',
    },
  },
];

export const DISTILLATION_STAGES: DistillationStage[] = [
  {
    id: 'initial-10k',
    label: { tr: 'İlk Derleme (Rivayet 1)', fr: 'Première collecte (récit 1)' },
    count: 10000,
    detail: {
      tr: 'Kādî İyâz’ın aktardığına göre ilk aşamada yaklaşık 10.000 hadis bir araya getirilmişti.',
      fr: 'Selon Qâdî ‘Iyâd, la première recension rassemblait près de 10 000 récits.',
    },
  },
  {
    id: 'mid-4k',
    label: { tr: 'Ara İhtisar (Rivayet 2)', fr: 'Révision intermédiaire (récit 2)' },
    count: 4000,
    detail: {
      tr: 'Bir diğer rivayete göre başlangıç/ara metin 4.000 rivayetten oluşuyordu.',
      fr: 'Selon un autre récit, un état intermédiaire comptait 4 000 récits.',
    },
  },
  {
    id: 'final-1720',
    label: { tr: '40 Yıl Sonra Nihai Metin', fr: 'Texte final après 40 ans' },
    count: 1720,
    detail: {
      tr: 'Yıllık eleme ve titiz ayıklama sonucu 61 kitapta 1.720 seçkin rivayete indirildi (Ebherî sayımı).',
      fr: 'Épuré au fil des années pour aboutir à 1 720 récits choisis répartis en 61 livres.',
    },
  },
];

export const RIWAYAH_RECORDS: RiwayahRecord[] = [
  {
    number: 1,
    id: 'ibn-ziyad',
    narrator: 'İbn Ziyâd el-Absî',
    arabicName: 'ابْنُ زِيَادٍ الْعَبْسِيُّ',
    deathDate: 'ö. 183/799',
    region: 'maghrib-andalus',
    regionLabel: { tr: 'Kuzey Afrika / Tunus', fr: 'Afrique du Nord / Tunis' },
    distinction: {
      tr: 'Muhtemelen En Erken Rivayet',
      fr: 'Probablement la plus ancienne recension',
    },
    description: {
      tr: 'İmam Mâlik’in fıkhî görüşlerine daha geniş yer veren bu nüsha muhtemelen el-Muvatta’ın ilk rivayetidir; günümüze ulaşan parçası yayımlanmıştır.',
      fr: 'Accordant une place notable aux avis juridiques de Mâlik, elle est probablement la plus ancienne recension ; un fragment conservé a été édité.',
    },
    modernEditions: 'M. eş-Şâzelî en-Neyfer (Tunus 1978; Beyrut 1980–1984)',
  },
  {
    number: 2,
    id: 'seybani',
    narrator: 'Muhammed b. Hasan eş-Şeybânî',
    arabicName: 'مُحَمَّدُ بْنُ الْحَسَنِ الشَّيْبَانِيُّ',
    deathDate: 'ö. 189/805',
    region: 'iraq',
    regionLabel: { tr: 'Irak (Kûfe / Bağdat)', fr: 'Irak (Kûfa / Bagdad)' },
    alias: 'Muvatta’ü’l-İmâm Muhammed',
    distinction: {
      tr: 'Leysî’den Sonra En İtibarlı Nüsha',
      fr: '2e recension la plus réputée après al-Laythî',
    },
    description: {
      tr: 'Hanefî mezhebinin büyük imamı Şeybânî’nin üç yıl Mâlik’ten okuyup kendi fıkhî değerlendirmelerini eklediği nüsha. Beş büyük şerhe (Ali el-Kārî, Pîrîzâde, Kemâhî, Leknevî, İbn Âşûr) esas teşkil etmiştir.',
      fr: 'Recension du grand juriste hanafite ash-Shaybânî enrichie de ses propres remarques ; base de cinq commentaires majeurs (al-Qârî, al-Laknawî, Ibn ‘Âshûr…).',
    },
    modernEditions: 'Abdülvehhâb Abdüllatîf (Kahire 1962); Takıyyüddin en-Nedvî (Dımaşk 1991)',
  },
  {
    number: 3,
    id: 'ibnul-kasim',
    narrator: 'Abdurrahman b. el-Kāsım',
    arabicName: 'عَبْدُ الرَّحْمٰنِ بْنُ الْقَاسِمِ',
    deathDate: 'ö. 191/806',
    region: 'egypt',
    regionLabel: { tr: 'Mısır', fr: 'Égypte' },
    alias: 'el-Mülahhas (Kābisî ihtisarıyla)',
    distinction: {
      tr: 'Baş Talebe Nüshası · Kābisî İhtisarı',
      fr: 'Recension du disciple principal (abrégée par al-Qâbisî)',
    },
    description: {
      tr: 'İmam Mâlik’in baş talebesi İbnü’l-Kāsım’ın nüshası, Ebü’l-Hasan el-Kābisî’nin el-Mülahhas limâ fi’l-Muvatta’ mine’l-hadîsi’l-müsned adlı ihtisarıyla birlikte günümüze ulaşmıştır.',
      fr: 'La recension d’Ibn al-Qâsim nous est parvenue à travers l’abrégé des hadiths musnad réalisé par Abû l-Hasan al-Qâbisî (al-Mulakhkhas).',
    },
    modernEditions: 'Muhammed b. Alevî el-Mâlikî (Cidde 1985, 1988)',
  },
  {
    number: 4,
    id: 'ibn-vehb',
    narrator: 'Abdullah b. Vehb',
    arabicName: 'عَبْدُ اللَّهِ بْنُ وَهْبٍ',
    deathDate: 'ö. 197/813',
    region: 'egypt',
    regionLabel: { tr: 'Mısır', fr: 'Égypte' },
    alias: 'el-Muvatta’ü’l-kebîr',
    distinction: {
      tr: 'Yahyâ el-Leysî Nüshasına Çok Yakın',
      fr: 'Très proche de la recension d’al-Laythî',
    },
    description: {
      tr: 'el-Muvatta’ü’l-kebîr adıyla İbn Vehb’e nispet edilen bu nüsha, tertip ve muhteva bakımından Yahyâ b. Yahyâ el-Leysî rivayetine büyük yakınlık gösterir.',
      fr: 'Connu sous le titre d’al-Muwatta’ al-kabîr, cet ouvrage attribué à Ibn Wahb présente une grande proximité textuelle avec la recension de Yahyâ al-Laythî.',
    },
    modernEditions: 'Mısır ve Mağrib yazma geleneğinde tespit edilmiştir (DİA, XXXI, 414)',
  },
  {
    number: 5,
    id: 'kanebi',
    narrator: 'Abdullah b. Mesleme el-Ka‘nebî',
    arabicName: 'عَبْدُ اللَّهِ بْنُ مَسْلَمَةَ الْقَعْنَبِيُّ',
    deathDate: 'ö. 221/835',
    region: 'iraq',
    regionLabel: { tr: 'Irak / Basra', fr: 'Irak / Bassora' },
    distinction: {
      tr: 'En Çok Hadis İçeren Rivayet',
      fr: 'Recension contenant le plus grand nombre de hadiths',
    },
    description: {
      tr: 'el-Muvatta’ rivayetleri arasında en fazla hadis ihtiva eden nüsha olarak tanınır; muhaddisler nezdinde yüksek sened güvenilirliğiyle öne çıkar.',
      fr: 'Reconnue comme la recension comportant le plus grand volume de hadiths, très estimée des grands maîtres du hadith.',
    },
    modernEditions: 'Abdülhafîz Mansûr (Kuveyt 1972); Abdülmecîd Türkî (Beyrut 1994, 1999)',
  },
  {
    number: 6,
    id: 'ibn-bukeyr',
    narrator: 'Yahyâ b. Abdullah b. Bükeyr',
    arabicName: 'يَحْيَى بْنُ عَبْدِ اللَّهِ بْنِ بُكَيْرٍ',
    deathDate: 'ö. 231/845',
    region: 'egypt',
    regionLabel: { tr: 'Mısır', fr: 'Égypte' },
    alias: 'el-Muvatta’ü’l-İmâm el-Mehdî',
    distinction: {
      tr: 'İbn Tûmert İhtisarının Kaynağı',
      fr: 'Base de l’abrégé d’Ibn Tûmart',
    },
    description: {
      tr: 'Muvahhidler’in kurucusu İbn Tûmert el-Muvatta’ı bu rivayete dayanarak ihtisar ettiği için el-Muvatta’ü’l-İmâm el-Mehdî adıyla da şöhret bulmuştur.',
      fr: 'Également connue sous le nom d’al-Muwatta’ al-Imâm al-Mahdî car Ibn Tûmart fonda son abrégé (Muhâdhdhî al-Muwatta’) sur cette recension.',
    },
    modernEditions: 'Ignaz Goldziher (Cezayir 1905); Aligarh 1907',
  },
  {
    number: 7,
    id: 'yahya-el-leysi',
    narrator: 'Yahyâ b. Yahyâ el-Leysî',
    arabicName: 'يَحْيَى بْنُ يَحْيَى اللَّيْثِيُّ',
    deathDate: 'ö. 234/848',
    region: 'maghrib-andalus',
    regionLabel: { tr: 'Endülüs (Kurtuba) & İslâm Dünyası', fr: 'al-Andalus (Cordoue) & Monde islamique' },
    distinction: {
      tr: 'En Yaygın Nüsha · Bu Atlasın Esas Metni',
      fr: 'Recension canonique la plus répandue · Base de cet Atlas',
    },
    description: {
      tr: 'Mağrib’de, Endülüs’te ve bütün İslâm dünyasında en çok yayılan ve üzerine en fazla şerh yazılan standart nüshadır. Bu atlastaki Kitâbü’s-Salât fî Ramadân (s. 113–116) metni de Yahyâ el-Leysî rivayetine dayanır.',
      fr: 'La recension la plus diffusée au Maghreb, en al-Andalus et dans tout le monde islamique, et la plus commentée. Elle constitue le texte de référence du Kitâb as-Salât fî Ramadân étudié dans cet atlas.',
    },
    modernEditions: 'M. Fuâd Abdülbâkī (Kahire 1951); Ahmed Râtib Armûş (Beyrut 1971); Beşşâr Avvâd Ma‘rûf (Beyrut 1997)',
    isPrimaryForAtlas: true,
  },
  {
    number: 8,
    id: 'suveyd-el-hadesani',
    narrator: 'Süveyd b. Saîd el-Hadesânî',
    arabicName: 'سُوَيْدُ بْنُ سَعِيدٍ الْحَدَثَانِيُّ',
    deathDate: 'ö. 240/854',
    region: 'iraq',
    regionLabel: { tr: 'Irak (Enbâr)', fr: 'Irak (al-Anbâr)' },
    distinction: {
      tr: 'Irak Rivayet Geleneği Nüshası',
      fr: 'Témoin de la transmission irakienne tardive',
    },
    description: {
      tr: 'el-Muvatta’ın günümüze ulaşan dokuz rivayetinden biri olup çağdaş dönemde Abdülmecîd Türkî tarafından ilmî tahkikle yayımlanmıştır.',
      fr: 'L’une des neuf recensions parvenues jusqu’à nous, publiée en édition critique par Abdel-Magid Turki.',
    },
    modernEditions: 'Abdülmecîd Türkî (Beyrut 1994)',
  },
  {
    number: 9,
    id: 'ebu-musab',
    narrator: 'Ebû Mus‘ab ez-Zührî',
    arabicName: 'أَبُو مُصْعَبٍ الزُّهْرِيُّ',
    deathDate: 'ö. 242/857',
    region: 'medina',
    regionLabel: { tr: 'Medine', fr: 'Médine' },
    distinction: {
      tr: 'En Son Râvilerden · ~100 Ek Rivayet',
      fr: 'Dernier témoin médinois · env. 100 récits additionnels',
    },
    description: {
      tr: 'Medine kadısı olan Ebû Mus‘ab, el-Muvatta’ın en son râvilerinden biri olduğundan nüshasında diğer rivayetlerin çoğunda bulunmayan 100 kadar hadis yer alır.',
      fr: 'Cadi de Médine et l’un des derniers transmetteurs directs d’al-Muwatta’, sa recension renferme près d’une centaine de hadiths absents de la plupart des autres versions.',
    },
    modernEditions: 'Beşşâr Avvâd Ma‘rûf & Mahmûd Muhammed Halîl (I–II, Beyrut 1992)',
  },
];

export const COMMENTARY_RECORDS: CommentaryRecord[] = [
  {
    id: 'en-nami',
    title: 'en-Nâmî fî şerhi’l-Muvatta’',
    arabicTitle: 'النَّامِي فِي شَرْحِ الْمُوَطَّأِ',
    author: 'Ahmed b. Nasr ed-Dâvûdî',
    century: 'V. / XI. yy. başı (ö. 402/1011)',
    baseRecension: 'leysi',
    focus: 'muhtasar-lugat',
    volumesOrFormat: 'Fas Karaviyyîn Ktp., nr. 175',
    summary: {
      tr: 'el-Muvatta’ı muhtasar bir üslupla şerh eden erken dönem Mağrib şerhlerindendir.',
      fr: 'L’un des premiers commentaires concis rédigés au Maghreb sur al-Muwatta’.',
    },
  },
  {
    id: 'et-temhid',
    title: 'et-Temhîd limâ fi’l-Muvatta’ mine’l-me‘ânî ve’l-esânîd',
    arabicTitle: 'التَّمْهِيدُ لِمَا فِي الْمُوَطَّأِ مِنَ الْمَعَانِي وَالْأَسَانِيدِ',
    author: 'İbn Abdülber en-Nemerî',
    century: 'V. / XI. yy. (ö. 463/1071)',
    baseRecension: 'leysi',
    focus: 'hadis-isnad',
    volumesOrFormat: '26 Cilt (Tıtvân–Muhammediye 1967–1992)',
    summary: {
      tr: 'İbn Abdülber’in otuz yıldan fazla sürede kaleme aldığı âbidevî şerh. İmam Mâlik’in hocalarına göre alfabetik tertip edilmiş; merfû hadislerin isnad, tarikler ve fıkhî hükümlerini derinlemesine incelemiştir.',
      fr: 'Commentaire monumental rédigé sur plus de trente ans : organisé selon les maîtres de Mâlik, il examine les chaînes et sens des hadiths prophétiques.',
    },
  },
  {
    id: 'et-tekassi',
    title: 'et-Tekassî li-hadîsi’l-Muvatta’ (Tecrîdü’t-Temhîd)',
    arabicTitle: 'التَّقَصِّي لِحَدِيثِ الْمُوَطَّأِ',
    author: 'İbn Abdülber en-Nemerî',
    century: 'V. / XI. yy. (ö. 463/1071)',
    baseRecension: 'leysi',
    focus: 'hadis-isnad',
    volumesOrFormat: '1 Cilt (Kahire 1931; Beyrut)',
    summary: {
      tr: 'et-Temhîd’e kısa bir giriş ve özet mahiyetinde olup sonuna Yahyâ el-Leysî nüshasında yer almayan 64 rivayeti toplayan ez-Ziyâdât risâlesi eklenmiştir.',
      fr: 'Introduction synthétique à at-Tamhîd, complétée par le traité az-Ziyâdât recensant 64 récits absents de la recension d’al-Laythî.',
    },
  },
  {
    id: 'el-istizkar',
    title: 'el-İstizkârü’l-câmi‘ li-mezâhibi fukahâi’l-emsâr',
    arabicTitle: 'الِاسْتِذْكَارُ الْجَامِعُ لِمَذَاهِبِ فُقَهَاءِ الْأَمْصَارِ',
    author: 'İbn Abdülber en-Nemerî',
    century: 'V. / XI. yy. (ö. 463/1071)',
    baseRecension: 'leysi',
    focus: 'fikih',
    volumesOrFormat: '30 Cilt (Kahire 1993)',
    summary: {
      tr: 'et-Temhîd’in devamı niteliğinde olup el-Muvatta’ın fıkıh babı sırasını izler; özellikle mevkuf ve maktû rivayetler eşliğinde İslâm beldelerindeki fakihlerin mukayeseli görüşlerini sunar.',
      fr: 'Suite d’at-Tamhîd suivant l’ordre des chapitres juridiques ; analyse les récits mawqûf et maqtû‘ en droit comparé.',
    },
  },
  {
    id: 'el-munteka',
    title: 'el-Müntekā şerhu Muvatta’i Mâlik',
    arabicTitle: 'الْمُنْتَقَى شَرْحُ مُوَطَّأِ مَالِكٍ',
    author: 'Ebü’l-Velîd el-Bâcî',
    century: 'V. / XI. yy. (ö. 474/1081)',
    baseRecension: 'leysi',
    focus: 'fikih',
    volumesOrFormat: '7 Cilt (Kahire 1331–1332; Beyrut 1403)',
    summary: {
      tr: 'Endülüslü büyük Mâlikî fakihi Bâcî’nin el-İstîfâ’ adlı geniş şerhini özetleyerek oluşturduğu, fıkıh ve usûl tahlilleriyle meşhur temel şerh.',
      fr: 'Abrégé par al-Bâjî de son propre grand commentaire al-Istîfâ’ ; référence majeure pour l’analyse juridique mâlikite.',
    },
  },
  {
    id: 'el-kabes',
    title: 'Kitâbü’l-Kabes fî şerhi Muvatta’i Mâlik b. Enes',
    arabicTitle: 'الْقَبَسُ فِي شَرْحِ مُوَطَّأِ مَالِكِ بْنِ أَنَسٍ',
    author: 'Ebû Bekir İbnü’l-Arabî',
    century: 'VI. / XII. yy. (ö. 543/1148)',
    baseRecension: 'leysi',
    focus: 'hadis-isnad',
    volumesOrFormat: '3 Cilt (Beyrut 1992)',
    summary: {
      tr: 'Bâcî’nin el-Müntekā’sının hadis ilimleri açısından eksik gördüğü yönlerini tamamlamak üzere yazılmıştır; sonunda Mâlik’in tefsir rivayetlerini içeren “Kitâbü’t-Tefsîr” bölümü yer alır.',
      fr: 'Rédigé pour compléter les aspects de science du hadith jugés insuffisants dans al-Muntaqâ d’al-Bâjî.',
    },
  },
  {
    id: 'tenvirul-havalik',
    title: 'Tenvîrü’l-havâlik şerhu Muvatta’i Mâlik',
    arabicTitle: 'تَنْوِيرُ الْحَوَالِكِ شَرْحُ مُوَطَّأِ مَالِكٍ',
    author: 'Celâleddin es-Süyûtî',
    century: 'IX. / XV. yy. (ö. 911/1505)',
    baseRecension: 'leysi',
    focus: 'muhtasar-lugat',
    volumesOrFormat: '3 Cilt (Kahire; Beyrut 1408)',
    summary: {
      tr: 'Özlülüğü ve garîb kelimelerle râvi tahlillerini bir arada sunması sebebiyle el-Muvatta’ baskılarıyla birlikte en sık yayımlanan şerhtir.',
      fr: 'Commentaire concis alliant explication lexicale et identification des transmetteurs, fréquemment imprimé avec le texte d’al-Muwatta’.',
    },
  },
  {
    id: 'ali-el-kari',
    title: 'Şerhu’l-Muvatta’ (Fethu muğatti’l-Muvatta’)',
    arabicTitle: 'شَرْحُ الْمُوَطَّأِ',
    author: 'Ali el-Kārî',
    century: 'XI. / XVII. yy. (ö. 1014/1605)',
    baseRecension: 'seybani',
    focus: 'fikih',
    volumesOrFormat: 'Leknev 1297 (et-Ta‘lîku’l-mümecced hâmişinde)',
    summary: {
      tr: 'Muhammed b. Hasan eş-Şeybânî rivayetini esas alan ve Hanefî-Mâlikî fıkıh mukayesesini öne çıkaran klasik şerh.',
      fr: 'Commentaire fondé sur la recension d’ash-Shaybânî, mettant en dialogue les écoles hanafite et mâlikite.',
    },
  },
  {
    id: 'pirizade',
    title: 'Şerhu’l-Muvatta’ (el-Fethu’r-rahmânî)',
    arabicTitle: 'الْفَتْحُ الرَّحْمٰنِيُّ',
    author: 'Pîrîzâde İbrâhim',
    century: 'XI. / XVII. yy. (ö. 1099/1688)',
    baseRecension: 'seybani',
    focus: 'osmanli-hint',
    volumesOrFormat: 'Konya Yûsuf Ağa Ktp., nr. 173 Hadis',
    summary: {
      tr: 'Osmanlı ilim geleneğinde eş-Şeybânî nüshası üzerine kaleme alınmış mühim şerhlerdendir.',
      fr: 'Commentaire ottoman notable composé sur la recension d’ash-Shaybânî.',
    },
  },
  {
    id: 'zurkani',
    title: 'Şerhu’z-Zürkānî ‘alâ Muvatta’i’l-İmâm Mâlik',
    arabicTitle: 'شَرْحُ الزُّرْقَانِيِّ عَلَى مُوَطَّأِ الْإِمَامِ مَالِكٍ',
    author: 'Muhammed b. Abdülbâkī ez-Zürkānî',
    century: 'XII. / XVIII. yy. (ö. 1122/1710)',
    baseRecension: 'leysi',
    focus: 'hadis-isnad',
    volumesOrFormat: '4–5 Cilt (Kahire 1961–1962; Beyrut 1990)',
    summary: {
      tr: 'İbn Abdülber, Bâcî ve Süyûtî’nin birikimini derleyip sadeleştiren, günümüzde el-Muvatta’ araştırmalarında en çok başvurulan klasik şerh (Ebherî’nin 1.720 rivayet sayımını aktaran kaynak).',
      fr: 'Synthèse limpide d’Ibn ‘Abd al-Barr, al-Bâjî et as-Suyûtî ; source du célèbre décompte des 1 720 récits attribué à al-Abharî.',
    },
  },
  {
    id: 'kemahi',
    title: 'el-Müheyye’ fî keşfi esrâri’l-Muvatta’',
    arabicTitle: 'الْمُهَيَّأُ فِي كَشْفِ أَسْرَارِ الْمُوَطَّأِ',
    author: 'Osman b. Ya‘kūb el-İslâmbolî el-Kemâhî',
    century: 'XII. / XVIII. yy. (ö. 1171/1758)',
    baseRecension: 'seybani',
    focus: 'osmanli-hint',
    volumesOrFormat: 'Süleymaniye Ktp., Kılıç Ali Paşa 260; Râgıb Paşa 327',
    summary: {
      tr: 'İstanbul’da eş-Şeybânî rivayeti üzerine hazırlanmış kapsamlı Osmanlı şerhi.',
      fr: 'Vaste commentaire ottoman rédigé à Istanbul à partir de la recension d’ash-Shaybânî.',
    },
  },
  {
    id: 'dihlevi',
    title: 'el-Müsevvâ (Arapça) & el-Musaffâ (Farsça)',
    arabicTitle: 'الْمُسَوَّى وَالْمُصَفَّى فِي شَرْحِ الْمُوَطَّأِ',
    author: 'Şah Veliyyullah ed-Dihlevî',
    century: 'XII. / XVIII. yy. (ö. 1176/1762)',
    baseRecension: 'leysi',
    focus: 'osmanli-hint',
    volumesOrFormat: '2 Cilt (Delhi 1876; Beyrut 1983)',
    summary: {
      tr: 'Hint altkıtasında el-Muvatta’ı hadis eğitiminin merkezine yerleştiren Dihlevî’nin Arapça (el-Müsevvâ) ve Farsça (el-Musaffâ) kaleme aldığı ikiz şerhler.',
      fr: 'Double commentaire en arabe (al-Musawwâ) et en persan (al-Musaffâ) qui replaça al-Muwatta’ au cœur des études du hadith en Inde.',
    },
  },
  {
    id: 'leknevi',
    title: 'et-Ta‘lîku’l-mümecced ‘alâ Muvatta’i Muhammed',
    arabicTitle: 'التَّعْلِيقُ الْمُمَجَّدُ عَلَى مُوَطَّأِ مُحَمَّدٍ',
    author: 'Abdülhay el-Leknevî',
    century: 'XIII. / XIX. yy. (ö. 1304/1886)',
    baseRecension: 'seybani',
    focus: 'osmanli-hint',
    volumesOrFormat: '3 Cilt (Hind 1292; Dımaşk 1991)',
    summary: {
      tr: 'Muhammed b. Hasan eş-Şeybânî rivayeti üzerine yazılmış en kapsamlı ve ilmî derinliği yüksek şerh; zengin mukaddimesiyle tanınır.',
      fr: 'Le commentaire le plus approfondi de la recension d’ash-Shaybânî, célèbre pour son introduction méthodologique.',
    },
  },
  {
    id: 'ibn-asur',
    title: 'Keşfü’l-mugattâ fi’l-me‘ânî ve’l-elfâzi’l-vâkı‘a fi’l-Muvatta’',
    arabicTitle: 'كَشْفُ الْمُغَطَّى فِي الْمَعَانِي وَالْأَلْفَاظِ الْوَاقِعَةِ فِي الْمُوَطَّأِ',
    author: 'Muhammed Tâhir İbn Âşûr',
    century: 'XIV. / XX. yy. (ö. 1393/1973)',
    baseRecension: 'seybani',
    focus: 'muhtasar-lugat',
    volumesOrFormat: '1 Cilt (Cezayir 1972; Tunus 1976)',
    summary: {
      tr: 'Tunuslu büyük müfessir ve usûlcü İbn Âşûr’un el-Muvatta’daki lafız ve mânaları eş-Şeybânî rivayetini de gözeterek tahlil ettiği çağdaş şerh.',
      fr: 'Analyse sémantique et philologique contemporaine des termes d’al-Muwatta’ par le grand savant tunisien Ibn ‘Âshûr.',
    },
  },
  {
    id: 'evcezul-mesalik',
    title: 'Evcezü’l-mesâlik ilâ Muvatta’i Mâlik',
    arabicTitle: 'أَوْجَزُ الْمَسَالِكِ إِلَى مُوَطَّأِ مَالِكٍ',
    author: 'Muhammed Zekeriyyâ Kandehlevî',
    century: 'XIV. / XX. yy. (ö. 1402/1982)',
    baseRecension: 'leysi',
    focus: 'fikih',
    volumesOrFormat: '15 Cilt (Kahire–Beyrut 1973–1989)',
    summary: {
      tr: 'Dört mezhep fıkhını, hadis tahriclerini ve önceki şerhlerin birikimini bir araya getiren 15 ciltlik modern ansiklopedik şerh.',
      fr: 'Commentaire encyclopédique moderne en 15 volumes réunissant les quatre écoles juridiques et la critique des chaînes.',
    },
  },
];

export const RELATED_STUDIES: RelatedStudyItem[] = [
  {
    id: 'darekutni-ihtilaf',
    category: { tr: 'Nüsha Farkları', fr: 'Variantes des recensions' },
    author: 'Dârekutnî',
    work: 'Ehâdîsü’l-Muvatta’ ve’ttifâku’r-ruvât ‘an Mâlik ve’htilâfühüm',
    note: {
      tr: 'Râvilerin el-Muvatta’ rivayetlerindeki ittifak, ziyade ve eksiklerini inceleyen klasik eser.',
      fr: 'Étude classique des convergences, ajouts et omissions entre les différents transmetteurs.',
    },
  },
  {
    id: 'kadi-iyaz-garib',
    category: { tr: 'Garîb & Tashih', fr: 'Lexicographie & critique textuelle' },
    author: 'Kādî İyâz',
    work: 'Meşâriku’l-envâr ‘alâ sıhâhi’l-âsâr',
    note: {
      tr: 'Sahîhayn ile el-Muvatta’daki garîb kelimeleri, i‘rab ve tashif hatalarını düzeltir.',
      fr: 'Explique les termes rares et corrige les erreurs de vocalisation et de copie dans les Sahîhayn et al-Muwatta’.',
    },
  },
  {
    id: 'suyuti-rical',
    category: { tr: 'Ricâl (Râvi Biyografileri)', fr: 'Rijâl (Biographies des transmetteurs)' },
    author: 'Celâleddin es-Süyûtî',
    work: 'İs‘âfü’l-mübetta’ bi-ricâli’l-Muvatta’',
    note: {
      tr: 'el-Muvatta’ senedlerinde geçen râvilerin biyografilerini bir araya getirir.',
      fr: 'Dictionnaire biographique des transmetteurs figurant dans les isnâds d’al-Muwatta’.',
    },
  },
  {
    id: 'ibn-hacer-sunaiyyat',
    category: { tr: 'Âlî İsnad (Sünâiyyât)', fr: 'Chaînes courtes (Thunâ’iyyât)' },
    author: 'İbn Hacer el-Askalânî',
    work: 'Sünâiyyâtü’l-Muvatta’',
    note: {
      tr: 'İmam Mâlik’in yalnızca iki râvi ile Hz. Peygamber’e veya sahâbeye ulaştığı 122 rivayeti toplar.',
      fr: 'Rassemble les 122 récits où Mâlik n’est séparé du Prophète ou d’un Compagnon que par deux intermédiaires.',
    },
  },
  {
    id: 'turkish-translation',
    category: { tr: 'Türkçe Tercüme', fr: 'Traduction turque' },
    author: 'A. M. Büyükçınar, Y. Erol, A. Arpa, D. Pusmaz, A. Yücel',
    work: 'İmam Mâlik — el-Muvatta’ (Türkçe Tercüme)',
    note: {
      tr: 'İstanbul 1982 (I–II) ve İstanbul 1984 (I–IV) baskılarıyla tam Türkçe tercüme.',
      fr: 'Traduction turque intégrale publiée à Istanbul en 1982 (2 vol.) puis en 1984 (4 vol.).',
    },
  },
];

export interface NarrationShare extends NarrationCategory {
  percentage: number;
  startAngle: number;
  endAngle: number;
}

export function getTotalNarrationCount(
  categories: readonly NarrationCategory[] = NARRATION_CATEGORIES
): number {
  return categories.reduce((sum, item) => sum + item.count, 0);
}

export function computeNarrationShares(
  categories: readonly NarrationCategory[] = NARRATION_CATEGORIES
): NarrationShare[] {
  const total = getTotalNarrationCount(categories);
  let cursor = 0;
  return categories.map((item) => {
    const ratio = total > 0 ? item.count / total : 0;
    const percentage = Math.round(ratio * 1000) / 10;
    const startAngle = cursor * 360;
    cursor += ratio;
    const endAngle = cursor * 360;
    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
    };
  });
}

export function filterRiwayahs(
  region: 'all' | RiwayahRegion,
  records: readonly RiwayahRecord[] = RIWAYAH_RECORDS
): RiwayahRecord[] {
  if (region === 'all') return [...records];
  return records.filter((item) => item.region === region);
}

export function filterCommentaries(
  options: {
    baseRecension: 'all' | CommentaryBaseRecension;
    focus: 'all' | CommentaryFocus;
    query: string;
  },
  records: readonly CommentaryRecord[] = COMMENTARY_RECORDS
): CommentaryRecord[] {
  const q = options.query.trim().toLocaleLowerCase('tr-TR');
  return records.filter((item) => {
    if (options.baseRecension !== 'all' && item.baseRecension !== options.baseRecension) {
      return false;
    }
    if (options.focus !== 'all' && item.focus !== options.focus) {
      return false;
    }
    if (!q) return true;
    const haystack = [
      item.title,
      item.author,
      item.century,
      item.summary.tr,
      item.summary.fr,
      item.volumesOrFormat,
    ]
      .join(' ')
      .toLocaleLowerCase('tr-TR');
    return haystack.includes(q);
  });
}
