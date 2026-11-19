import type { BabMeta, HadithRecord, HadithWordToken } from '../types/hadith';
import { tokenizeHadithArabic } from './hadithLexicon';

export const BOOK_SIX_META = {
  number: 6,
  arabicTitle: '٦ — كِتَابُ الصَّلَاةِ فِي رَمَضَانَ',
  title: {
    tr: 'Kitâbü’s-Salât fî Ramadân',
    fr: 'Kitâb as-Salât fî Ramadân (Le Livre de la Prière en Ramadan)',
  },
  editionNote: {
    tr: 'Yahyâ b. Yahyâ el-Leysî rivâyeti · Muvatta’ 6. Kitap (ss. 113–116) · 2 Bab, 8 Hadis',
    fr: 'Recension de Yahyâ b. Yahyâ al-Laythî · Livre 6 d’al-Muwatta’ (pp. 113–116) · 2 Chapitres, 8 Hadiths',
  },
};

export const BABS_DATA: BabMeta[] = [
  {
    number: 1,
    arabicTitle: '(١) بَابُ التَّرْغِيبِ فِي الصَّلَاةِ فِي رَمَضَانَ',
    title: {
      tr: '1. Bab: Ramazan’da Gece Namazına (Terâvih) Teşvik',
      fr: 'Chapitre 1 : De l’incitation à la prière nocturne en Ramadan',
    },
    summary: {
      tr: 'Hz. Peygamber’in (s.a.v.) Mescid-i Nebevî’de terâvih kılışı, ümmete farz kılınma endişesiyle cemaate çıkmaktan sakınması ve iman-ihtisab şartıyla geçmiş günahların bağışlanacağı müjdesi.',
      fr: 'Les nuits de prière du Prophète (ﷺ) à la mosquée, son retrait par crainte que la prière ne soit rendue obligatoire, et la promesse du pardon pour qui veille avec foi et sincérité.',
    },
    hadithRange: '1–2',
  },
  {
    number: 2,
    arabicTitle: '(٢) بَابُ مَا جَاءَ فِي قِيَامِ رَمَضَانَ',
    title: {
      tr: '2. Bab: Ramazan Kıyamı (Terâvih Uygulaması) Hakkında Gelen Rivâyetler',
      fr: 'Chapitre 2 : Ce qui a été rapporté au sujet du Qiyâm de Ramadan',
    },
    summary: {
      tr: 'Hz. Ömer’in dağınık grupları Übey b. Kâ‘b arkasında tek cemaatte toplaması, 11 ve 23 rekât uygulamaları, uzun kıraat (Miîn ve Bakara sûresi), vitir kunutu, sahur telaşı ve kölenin imameti.',
      fr: 'La réunion des fidèles par ‘Umar derrière Ubayy b. Ka‘b, les pratiques de 11 et 23 rak‘ât, la longue récitation (al-Mi’în, al-Baqara), le qunût, le suhûr et l’imamat de l’affranchi.',
    },
    hadithRange: '3–8',
  },
];

export const HADITHS_DATA: HadithRecord[] = [
  {
    number: 1,
    id: 'hadis-1',
    bab: 1,
    pageNumber: 113,
    type: 'musned',
    typeLabel: {
      tr: 'Müsned · Merfû',
      fr: 'Musnad · Marfû‘ (attribué au Prophète ﷺ)',
    },
    title: {
      tr: 'Farz Kılınma Endişesiyle Cemaate Çıkmaması',
      fr: 'Le retrait du Prophète (ﷺ) par crainte d’une obligation',
    },
    arabicFull:
      'حَدَّثَنِي يَحْيَىٰ عَنْ مَالِكٍ ، عَنِ ابْنِ شِهَابٍ ، عَنْ عُرْوَةَ بْنِ الزُّبَيْرِ ، عَنْ عَائِشَةَ زَوْجِ النَّبِيِّ ﷺ ؛ أَنَّ رَسُولَ اللَّهِ ﷺ صَلَّىٰ فِي الْمَسْجِدِ ذَاتَ لَيْلَةٍ ، فَصَلَّىٰ بِصَلَاتِهِ نَاسٌ . ثُمَّ صَلَّىٰ اللَّيْلَةَ الْقَابِلَةَ ، فَكَثُرَ النَّاسُ . ثُمَّ اجْتَمَعُوا مِنَ اللَّيْلَةِ الثَّالِثَةِ أَوِ الرَّابِعَةِ ، فَلَمْ يَخْرُجْ إِلَيْهِمْ رَسُولُ اللَّهِ ﷺ . فَلَمَّا أَصْبَحَ ، قَالَ : «قَدْ رَأَيْتُ الَّذِي صَنَعْتُمْ ، وَلَمْ يَمْنَعْنِي مِنَ الْخُرُوجِ إِلَيْكُمْ ، إِلَّا أَنِّي خَشِيتُ أَنْ تُفْرَضَ عَلَيْكُمْ» وَذَٰلِكَ فِي رَمَضَانَ .',
    tahric: {
      arabic:
        'أخرجه مسلم في : ٦ - كتاب صلاة المسافرين ، ٢٥ - باب الترغيب في قيام رمضان وهو التراويح ، حديث ١٧٨ .',
      tr: 'Müslim, Kitâbü Salâti’l-Müsâfirîn (6), Bâbü’t-Tergîb fî Kıyâmi Ramadân ve hüve’t-Terâvîh (25), hadis 178.',
      fr: 'Rapporté par Muslim, Livre 6 (Prière des voyageurs), Chapitre 25 (Incitation au qiyâm de Ramadan / Tarâwîh), hadith 178.',
    },
    translation: {
      tr: 'Yahyâ bana Mâlik’ten, o İbn Şihâb’dan, o Urve b. ez-Zübeyr’den, o da Hz. Peygamber’in (s.a.v.) eşi Hz. Âişe’den (r.anhâ) rivâyet etti: Resûlullah (s.a.v.) bir gece mescidde namaz kıldı; birtakım insanlar da ona uyarak namaz kıldılar. Ertesi gece yine namaz kıldı ve insanlar çoğaldı. Üçüncü veya dördüncü gece yine toplandılar; ancak Resûlullah (s.a.v.) onların yanına çıkmadı. Sabah olunca şöyle buyurdu: “Yaptığınızı gördüm. Yanınıza çıkmama, bunun (gece namazının) size farz kılınmasından endişe etmemden başka bir şey engel olmadı.” Bu hadise Ramazan ayında cereyan etmişti.',
      fr: 'Yahyâ m’a rapporté d’après Mâlik, d’après Ibn Shihâb, d’après ‘Urwa b. az-Zubayr, d’après ‘Â’isha, l’épouse du Prophète (ﷺ) : Le Messager d’Allah (ﷺ) pria une nuit dans la mosquée, et des gens prièrent derrière lui. Puis il pria la nuit suivante, et les fidèles furent plus nombreux. Ils se rassemblèrent de nouveau la troisième ou la quatrième nuit, mais le Messager d’Allah (ﷺ) ne sortit point vers eux. Au matin, il déclara : « J’ai certes vu ce que vous avez fait ; rien ne m’a empêché de sortir vers vous sinon la crainte qu’elle ne vous soit prescrite comme une obligation. » Et cela eut lieu durant le mois de Ramadan.',
    },
    fiqhSummary: {
      tr: 'Terâvih namazının cemaatle kılınmasının meşruiyeti bizzat Hz. Peygamber’in (s.a.v.) fiiliyle sabittir. Cemaate çıkmayı bırakması ise meşruiyet eksikliğinden değil, ümmete şefkat ederek farz kılınmasını önleme hikmetindendir; vahyin kesilmesiyle bu endişe kalkmıştır.',
      fr: 'La légitimité de la prière des Tarâwîh en commun est fondée sur l’acte prophétique lui-même. Son retrait procédait uniquement de sa miséricorde envers sa communauté pour éviter qu’elle ne devienne obligatoire — crainte disparue après la clôture de la Révélation.',
    },
    isnad: [
      {
        name: 'Yahyâ b. Yahyâ el-Leysî',
        arabicName: 'يَحْيَىٰ بْنُ يَحْيَىٰ اللَّيْثِيُّ',
        generation: { tr: 'Muvatta’ Râvisi', fr: 'Transmetteur d’al-Muwatta’' },
        role: 'ravi',
        deathDate: 'ö. 234/848',
        bioNote: {
          tr: 'Kurtubalı Endülüslü fakih; el-Muvatta’nın günümüzde en meşhur ve standart rivâyetinin râvisidir.',
          fr: 'Juriste andalou de Cordoue ; transmetteur de la recension standard et la plus répandue d’al-Muwatta’.',
        },
      },
      {
        name: 'İmam Mâlik b. Enes',
        arabicName: 'مَالِكُ بْنُ أَنَسٍ',
        generation: { tr: 'Musannif (Etbâu’t-Tâbiîn)', fr: 'Auteur (Atbâ‘ at-Tâbi‘în)' },
        role: 'musannif',
        deathDate: 'ö. 179/795',
        bioNote: {
          tr: 'Medine imamı (İmâmü Dâri’l-Hicre), Mâlikî mezhebinin kurucusu ve el-Muvatta’nın müellifi.',
          fr: 'Imam de Médine, fondateur de l’école mâlikite et compilateur d’al-Muwatta’.',
        },
      },
      {
        name: 'İbn Şihâb ez-Zührî',
        arabicName: 'ابْنُ شِهَابٍ الزُّهْرِيُّ',
        generation: { tr: 'Tâbiîn (Hadis Tedvîn İmamı)', fr: 'Tâbi‘î (Pionnier de la consignation)' },
        role: 'tabii',
        deathDate: 'ö. 124/742',
        bioNote: {
          tr: 'İmam Mâlik’in en büyük hocalarından; Ömer b. Abdülazîz’in emriyle hadisleri resmen tedvîn eden muhaddis.',
          fr: 'L’un des maîtres majeurs de Mâlik ; pionnier de la compilation officielle du hadith.',
        },
      },
      {
        name: 'Urve b. ez-Zübeyr',
        arabicName: 'عُرْوَةُ بْنُ الزُّبَيْرِ',
        generation: { tr: 'Fukahâ-i Seb‘a (Tâbiîn)', fr: 'Sept Juristes de Médine' },
        role: 'tabii',
        deathDate: 'ö. 94/713',
        bioNote: {
          tr: 'Medine’nin yedi büyük fakihinden biri; teyzesi Hz. Âişe’den (r.anhâ) en çok rivâyet eden râvidir.',
          fr: 'L’un des sept grands juristes de Médine ; neveu et principal rapporteur de ‘Â’isha.',
        },
      },
      {
        name: 'Hz. Âişe bint Ebî Bekir (r.anhâ)',
        arabicName: 'عَائِشَةُ زَوْجُ النَّبِيِّ ﷺ',
        generation: { tr: 'Ümmü’l-Mü’minîn (Sahâbî)', fr: 'Mère des Croyants (Compagnon)' },
        role: 'sahabi',
        deathDate: 'ö. 58/678',
        bioNote: {
          tr: 'Mü’minlerin annesi ve en çok hadis rivâyet eden (müksirûn) fakih sahâbîlerden.',
          fr: 'Épouse du Prophète (ﷺ), éminente juriste et grande rapportrice de hadiths.',
        },
      },
      {
        name: 'Hz. Muhammed (s.a.v.)',
        arabicName: 'رَسُولُ اللَّهِ ﷺ',
        generation: { tr: 'Kaynak (Merfû)', fr: 'Source prophétique (Marfû‘)' },
        role: 'peygamber',
        bioNote: {
          tr: 'Hadisin hem fiilî hem kavlî kaynağı (Mescid-i Nebevî, Ramazan geceleri).',
          fr: 'Source prophétique par l’acte et la parole (Mosquée du Prophète, nuits de Ramadan).',
        },
      },
    ],
    footnotes: [
      {
        id: 'fn-1-1',
        lemmaArabic: 'أَنْ تُفْرَضَ عَلَيْكُمْ',
        commentator: {
          tr: 'Klasik Muvatta’ Hâşiyesi (s. 113, dipnot 1)',
          fr: 'Glose classique d’al-Muwatta’ (p. 113, note 1)',
        },
        textArabic: '(أن تفرض عليكم) أي صلاة الليل ، فتعجزوا عنها .',
        translation: {
          tr: '“(Size farz kılınmasından)” ifadesiyle kastedilen: Gece namazının (terâvihin) size farz kılınıp da onu eda etmekten âciz kalmanızdır.',
          fr: '« Qu’elle ne vous soit prescrite » signifie : que la prière nocturne ne devienne obligatoire pour vous et que vous ne soyez incapables de l’assumer.',
        },
      },
    ],
  },
  {
    number: 2,
    id: 'hadis-2',
    bab: 1,
    pageNumber: 113,
    type: 'musned',
    typeLabel: {
      tr: 'Müsned · Merfû (İdrâclı)',
      fr: 'Musnad · Marfû‘ (avec notice historique d’az-Zuhrî)',
    },
    title: {
      tr: 'İman ve İhtisabla Ramazan Kıyamının Fazileti',
      fr: 'Mérite du Qiyâm accompli avec foi et espérance sincère',
    },
    arabicFull:
      'وَحَدَّثَنِي عَنْ مَالِكٍ ، عَنِ ابْنِ شِهَابٍ ، عَنْ أَبِي سَلَمَةَ بْنِ عَبْدِ الرَّحْمٰنِ بْنِ عَوْفٍ ، عَنْ أَبِي هُرَيْرَةَ ؛ أَنَّ رَسُولَ اللَّهِ ﷺ ، كَانَ يُرَغِّبُ فِي قِيَامِ رَمَضَانَ ، مِنْ غَيْرِ أَنْ يَأْمُرَ بِعَزِيمَةٍ . فَيَقُولُ : «مَنْ قَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا ، غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ» . قَالَ ابْنُ شِهَابٍ : فَتُوُفِّيَ رَسُولُ اللَّهِ ﷺ ، وَالْأَمْرُ عَلَىٰ ذَٰلِكَ . ثُمَّ كَانَ الْأَمْرُ عَلَىٰ ذَٰلِكَ فِي خِلَافَةِ أَبِي بَكْرٍ ، وَصَدْرًا مِنْ خِلَافَةِ عُمَرَ بْنِ الْخَطَّابِ .',
    tahric: {
      arabic:
        'أخرجه البخاري في : ٣١ - كتاب صلاة التراويح ، ١ - باب فضل من قام رمضان . ومسلم في : ٦ - كتاب صلاة المسافرين ، ٢٥ - باب الترغيب في قيام رمضان وهو التراويح ، حديث ١٧٤ .',
      tr: 'Buhârî, Kitâbü Salâti’t-Terâvîh (31), 1. Bab; Müslim, Salâtü’l-Müsâfirîn (6), 25. Bab, hadis 174 (Müttefekun Aleyh).',
      fr: 'Rapporté par al-Bukhârî (Livre 31, chap. 1) et Muslim (Livre 6, chap. 25, hadith 174 — Muttafaq ‘alayh).',
    },
    translation: {
      tr: 'Yine (Yahyâ) bana Mâlik’ten, o İbn Şihâb’dan, o Ebû Seleme b. Abdurrahman b. Avf’tan, o da Ebû Hüreyre’den (r.a.) rivâyet etti: Resûlullah (s.a.v.) kesin bir farz emri vermeksizin insanları Ramazan gecelerini ihya etmeye (terâvihe) teşvik eder ve şöyle buyururdu: “Kim inanarak ve sevabını yalnızca Allah’tan umarak Ramazan’ı (namazla) ihya ederse, geçmiş günahları bağışlanır.” İbn Şihâb (ez-Zührî) dedi ki: Resûlullah (s.a.v.) vefat ettiğinde durum böyleydi (terâvih tek cemaatle kılınmıyordu). Sonra Hz. Ebû Bekir’in hilâfetinde ve Hz. Ömer b. el-Hattâb’ın hilâfetinin ilk döneminde de uygulama bu şekilde devam etti.',
      fr: 'Il m’a encore rapporté d’après Mâlik, d’après Ibn Shihâb, d’après Abû Salama b. ‘Abd ar-Rahmân b. ‘Awf, d’après Abû Hurayra : Le Messager d’Allah (ﷺ) incitait à la prière nocturne de Ramadan sans l’ordonner de manière impérative, et il disait : « Quiconque accomplit les prières nocturnes de Ramadan avec foi sincère et en espérant la récompense d’Allah, ses péchés passés lui seront pardonnés. » Ibn Shihâb ajouta : Le Messager d’Allah (ﷺ) décéda alors que la pratique était telle quelle ; elle demeura ainsi sous le califat d’Abû Bakr et au début du califat de ‘Umar b. al-Khattâb.',
    },
    fiqhSummary: {
      tr: 'Hadis, terâvihin bağlayıcı farz (‘azîme) değil müekked sünnet (nedb ve tergîb) olduğunu ortaya koyar. Nevevî’ye göre «îmân» bu ibadetin hak ve faziletini tasdik, «ihtisâb» ise riyasız biçimde yalnız Allah rızasını gözetmektir.',
      fr: 'Ce hadith établit le statut de sunna recommandée (nadb) et non d’obligation impérative (‘azîma). Selon an-Nawawî, « îmân » est la conviction de son bien-fondé et « ihtisâb » la pureté d’intention exclusive pour Dieu.',
    },
    isnad: [
      {
        name: 'Yahyâ b. Yahyâ el-Leysî',
        arabicName: 'يَحْيَىٰ بْنُ يَحْيَىٰ اللَّيْثِيُّ',
        generation: { tr: 'Muvatta’ Râvisi', fr: 'Transmetteur d’al-Muwatta’' },
        role: 'ravi',
        deathDate: 'ö. 234/848',
        bioNote: {
          tr: 'Muvatta’ metnini doğrudan İmam Mâlik’ten aktaran Endülüslü râvi.',
          fr: 'Transmetteur andalou de la recension d’al-Muwatta’.',
        },
      },
      {
        name: 'İmam Mâlik b. Enes',
        arabicName: 'مَالِكُ بْنُ أَنَسٍ',
        generation: { tr: 'Musannif', fr: 'Auteur' },
        role: 'musannif',
        deathDate: 'ö. 179/795',
        bioNote: {
          tr: 'el-Muvatta’ müellifi, Medine fıkıh ve hadis imamı.',
          fr: 'Compilateur d’al-Muwatta’, imam de Médine.',
        },
      },
      {
        name: 'İbn Şihâb ez-Zührî',
        arabicName: 'ابْنُ شِهَابٍ الزُّهْرِيُّ',
        generation: { tr: 'Tâbiîn', fr: 'Tâbi‘î' },
        role: 'tabii',
        deathDate: 'ö. 124/742',
        bioNote: {
          tr: 'Hadisin sonundaki hilâfet dönemlerine dair tarihî açıklamayı (idrâc) ekleyen tâbiîn imamı.',
          fr: 'Imam des Tâbi‘în qui ajoute à la fin la précision historique sur les califats.',
        },
      },
      {
        name: 'Ebû Seleme b. Abdurrahman',
        arabicName: 'أَبُو سَلَمَةَ بْنُ عَبْدِ الرَّحْمٰنِ بْنِ عَوْفٍ',
        generation: { tr: 'Fukahâ-i Seb‘a (Tâbiîn)', fr: 'Juriste de Médine (Tâbi‘î)' },
        role: 'tabii',
        deathDate: 'ö. 94/713',
        bioNote: {
          tr: 'Aşere-i Mübeşşere’den Abdurrahman b. Avf’ın oğlu; Medine’nin önde gelen fakih tâbiîlerinden.',
          fr: 'Fils du Compagnon ‘Abd ar-Rahmân b. ‘Awf ; éminent juriste médinois.',
        },
      },
      {
        name: 'Ebû Hüreyre (r.a.)',
        arabicName: 'أَبُو هُرَيْرَةَ',
        generation: { tr: 'Sahâbî (Müksirûn)', fr: 'Compagnon (grand rapporteur)' },
        role: 'sahabi',
        deathDate: 'ö. 58/678',
        bioNote: {
          tr: 'En fazla hadis rivâyet eden sahâbî; Mescid-i Nebevî’de Ashâb-ı Suffe’nin önde gelen isimlerinden.',
          fr: 'Le plus prolifique rapporteur de hadiths parmi les Compagnons.',
        },
      },
      {
        name: 'Hz. Muhammed (s.a.v.)',
        arabicName: 'رَسُولُ اللَّهِ ﷺ',
        generation: { tr: 'Kaynak (Merfû)', fr: 'Source prophétique (Marfû‘)' },
        role: 'peygamber',
        bioNote: {
          tr: 'Ramazan kıyamının faziletini ve bağışlanma müjdesini beyan buyurdu.',
          fr: 'Auteur de la parole prophétique promettant le pardon des fautes passées.',
        },
      },
    ],
    footnotes: [
      {
        id: 'fn-2-1',
        lemmaArabic: 'مِنْ غَيْرِ أَنْ يَأْمُرَ بِعَزِيمَةٍ',
        commentator: {
          tr: 'İmam en-Nevevî (s. 113, dipnot 2)',
          fr: 'Imam an-Nawawî (p. 113, note 2)',
        },
        textArabic:
          '(من غير أن يأمر بعزيمة) قال النووي : معناه لا يأمرهم أمر إيجاب وتحتيم ، بل أمر ندب وترغيب .',
        translation: {
          tr: 'Nevevî dedi ki: Bunun anlamı, onlara kesin farz ve bağlayıcı zorunluluk (îcâb ve tahtîm) emriyle değil, mendup ve teşvik (nedb ve tergîb) emriyle yöneltmesidir.',
          fr: 'An-Nawawî dit : Cela signifie qu’il ne leur ordonnait pas sur un mode impératif et obligatoire (îjâb), mais sur le mode de la recommandation et de l’incitation (nadb wa targhîb).',
        },
      },
      {
        id: 'fn-2-2',
        lemmaArabic: 'إِيمَانًا وَاحْتِسَابًا',
        commentator: {
          tr: 'İmam en-Nevevî (s. 113–114, dipnot 3)',
          fr: 'Imam an-Nawawî (pp. 113–114, note 3)',
        },
        textArabic:
          '(إيمانا واحتسابا) قال النووي : معنى « إيمانا » تصديقا بأنه حق ، معتقدا أفضليته . ومعنى « احتسابا » أن يريد به الله وحده ، طلبا لثواب الآخرة ، لا رياء ونحوه .',
        translation: {
          tr: 'Nevevî dedi ki: «Îmânen» sözünün anlamı, bunun hak olduğunu tasdik etmek ve faziletine inanmaktır. «İhtisâben» sözünün anlamı ise, gösteriş (riya) ve benzeri amaçlar olmaksızın âhiret sevabını dileyerek yalnızca Allah’ın rızasını kastetmektir.',
          fr: 'An-Nawawî dit : « Îmânan » signifie attester que cette pratique est vraie et croire en son éminent mérite. « Ihtisâban » signifie n’y rechercher que Dieu Seul, en quête de la récompense de l’au-delà, sans ostentation ni calcul.',
        },
      },
      {
        id: 'fn-2-3',
        lemmaArabic: 'وَالْأَمْرُ عَلَىٰ ذَٰلِكَ',
        commentator: {
          tr: 'Klasik Muvatta’ Hâşiyesi (s. 114, dipnot 1)',
          fr: 'Glose classique d’al-Muwatta’ (p. 114, note 1)',
        },
        textArabic: '(والأمر على ذلك) أي ترك الجماعة في صلاة التراويح .',
        translation: {
          tr: '“(Durum böyleydi)” ifadesinden maksat, terâvih namazında tek cemaat hâlinde toplanmanın terk edilmiş olması (herkesin münferit veya küçük halkalar hâlinde kılması)dır.',
          fr: '« La pratique était telle quelle » désigne l’absence de rassemblement en une congrégation unique pour les Tarâwîh.',
        },
      },
    ],
  },
  {
    number: 3,
    id: 'hadis-3',
    bab: 2,
    pageNumber: 114,
    type: 'mevkuf',
    typeLabel: {
      tr: 'Mevkûf (Sahâbî Kavli ve Fiili)',
      fr: 'Mawqûf (Acte et parole de ‘Umar b. al-Khattâb)',
    },
    title: {
      tr: 'Hz. Ömer’in Terâvihi Übey b. Kâ‘b Arkasında Tek Cemaatte Toplaması',
      fr: '‘Umar rassemble les fidèles derrière Ubayy b. Ka‘b (« Quelle belle innovation ! »)',
    },
    arabicFull:
      'حَدَّثَنِي مَالِكٌ عَنِ ابْنِ شِهَابٍ ، عَنْ عُرْوَةَ بْنِ الزُّبَيْرِ ، عَنْ عَبْدِ الرَّحْمٰنِ بْنِ عَبْدٍ الْقَارِيِّ ؛ أَنَّهُ قَالَ : خَرَجْتُ مَعَ عُمَرَ بْنِ الْخَطَّابِ ، فِي رَمَضَانَ إِلَى الْمَسْجِدِ ، فَإِذَا النَّاسُ أَوْزَاعٌ مُتَفَرِّقُونَ . يُصَلِّي الرَّجُلُ لِنَفْسِهِ ، وَيُصَلِّي الرَّجُلُ فَيُصَلِّي بِصَلَاتِهِ الرَّهْطُ . فَقَالَ عُمَرُ : وَاللَّهِ إِنِّي لَأَرَانِي لَوْ جَمَعْتُ هٰؤُلَاءِ عَلَىٰ قَارِئٍ وَاحِدٍ لَكَانَ أَمْثَلَ . فَجَمَعَهُمْ عَلَىٰ أُبَيِّ بْنِ كَعْبٍ . قَالَ : ثُمَّ خَرَجْتُ مَعَهُ لَيْلَةً أُخْرَىٰ ، وَالنَّاسُ يُصَلُّونَ بِصَلَاةِ قَارِئِهِمْ . فَقَالَ عُمَرُ : نِعْمَتِ الْبِدْعَةُ هٰذِهِ ، وَالَّتِي تَنَامُونَ عَنْهَا أَفْضَلُ مِنَ الَّتِي تَقُومُونَ . يَعْنِي آخِرَ اللَّيْلِ . وَكَانَ النَّاسُ يَقُومُونَ أَوَّلَهُ .',
    tahric: {
      arabic:
        'أخرجه البخاري في : ٣١ - كتاب صلاة التراويح ، ١ - باب فضل من قام رمضان .',
      tr: 'Buhârî, Kitâbü Salâti’t-Terâvîh (31), 1. Bab (Bâbü Fadli men Kāme Ramadân).',
      fr: 'Rapporté par al-Bukhârî, Livre 31 (Prière des Tarâwîh), Chapitre 1.',
    },
    translation: {
      tr: 'Mâlik bana İbn Şihâb’dan, o Urve b. ez-Zübeyr’den, o da Abdurrahman b. Abd el-Kārî’den rivâyet etti; Abdurrahman şöyle dedi: Ramazan’da bir gece Ömer b. el-Hattâb (r.a.) ile birlikte mescide çıktım. Bir de baktık ki insanlar dağınık gruplar (evzâ‘) hâlinde: Kimi tek başına namaz kılıyor, kimi namaz kılıp küçük bir topluluk (raht) da ona uyuyor. Bunun üzerine Ömer: “Vallahi şu insanları tek bir kāri’nin (imamın) arkasında toplasam elbette daha güzel ve uygun olur!” dedi ve onları Übey b. Kâ‘b’ın arkasında topladı. Sonra başka bir gece yine onunla birlikte çıktım; insanlar imamlarına uyarak tek cemaat hâlinde namaz kılıyorlardı. Ömer bunu görünce: “Bu ne güzel bir yeniliktir (ni‘meti’l-bid‘atü hâzihî)! Fakat uyuyup geçirdiğiniz (gecenin sonundaki) namaz, şu kıldığınızdan daha faziletlidir.” dedi. Bununla gecenin son vaktini kastediyordu; insanlar ise namazı gecenin başında kılıyorlardı.',
      fr: 'Mâlik m’a rapporté d’après Ibn Shihâb, d’après ‘Urwa b. az-Zubayr, d’après ‘Abd ar-Rahmân b. ‘Abd al-Qârî qui a dit : Je sortis une nuit de Ramadan avec ‘Umar b. al-Khattâb vers la mosquée ; les fidèles y étaient éparpillés en groupes dispersés : tel homme priait seul, tel autre priait suivi d’un petit groupe (raht). ‘Umar dit alors : « Par Allah ! J’estime que si je rassemblais tous ces gens derrière un seul récitateur (imam), ce serait bien meilleur. » Il les réunit donc derrière Ubayy b. Ka‘b. Je ressortis avec lui une autre nuit tandis que les gens priaient derrière leur récitateur. ‘Umar s’exclama : « Quelle excellente innovation que celle-ci ! Toutefois, celle durant laquelle vous dormez est meilleure que celle que vous accomplissez maintenant » — entendant par là la fin de la nuit, alors que les gens priaient à son début.',
    },
    fiqhSummary: {
      tr: 'Bu rivâyet, Mescid-i Nebevî’de terâvihin düzenli tek cemaatle kılınışının tarihî dönüm noktasıdır. Hz. Ömer’in «bid‘at» ifadesi şer‘î anlamda dinde olmayan bir icat değil, sözlük anlamında yeni bir organizasyondur. İbn Hacer’in vurguladığı üzere gecenin sonundaki teheccüd gecenin başındaki kıyamdan daha faziletlidir.',
      fr: 'Ce récit marque l’institutionnalisation de la congrégation unique pour les Tarâwîh. Le mot « bid‘a » employé par ‘Umar est purement lexical (organisation nouvelle d’un culte déjà fondé par le Prophète). Ibn Hajar souligne que ‘Umar affirme explicitement la supériorité de la prière en fin de nuit.',
    },
    isnad: [
      {
        name: 'İmam Mâlik b. Enes',
        arabicName: 'مَالِكُ بْنُ أَنَسٍ',
        generation: { tr: 'Musannif', fr: 'Auteur' },
        role: 'musannif',
        deathDate: 'ö. 179/795',
        bioNote: {
          tr: 'Yahyâ b. Yahyâ’nın hocası; bu rivâyette metin doğrudan «Haddesenî Mâlik» kalıbıyla başlar.',
          fr: 'Maître de Yahyâ ; ce récit s’ouvre directement par la formule « Haddathanî Mâlik ».',
        },
      },
      {
        name: 'İbn Şihâb ez-Zührî',
        arabicName: 'ابْنُ شِهَابٍ الزُّهْرِيُّ',
        generation: { tr: 'Tâbiîn', fr: 'Tâbi‘î' },
        role: 'tabii',
        deathDate: 'ö. 124/742',
        bioNote: {
          tr: 'Hicaz ve Şam muhaddisi; Urve b. ez-Zübeyr’in en seçkin talebelerinden.',
          fr: 'Grand traditionniste du Hedjaz et de Syrie, disciple d’‘Urwa.',
        },
      },
      {
        name: 'Urve b. ez-Zübeyr',
        arabicName: 'عُرْوَةُ بْنُ الزُّبَيْرِ',
        generation: { tr: 'Fukahâ-i Seb‘a (Tâbiîn)', fr: 'Sept Juristes de Médine' },
        role: 'tabii',
        deathDate: 'ö. 94/713',
        bioNote: {
          tr: 'Medineli büyük fakih ve tâbiî.',
          fr: 'Éminent juriste médinois de la génération des Tâbi‘în.',
        },
      },
      {
        name: 'Abdurrahman b. Abd el-Kārî',
        arabicName: 'عَبْدُ الرَّحْمٰنِ بْنُ عَبْدٍ الْقَارِيُّ',
        generation: { tr: 'Sahâbî / Muhadram (Hz. Ömer’in Beytülmâl Memuru)', fr: 'Compagnon / contemporain proche de ‘Umar' },
        role: 'sahabi',
        deathDate: 'ö. 80/699',
        bioNote: {
          tr: 'Hz. Peygamber zamanında doğmuş, Hz. Ömer’in hilâfetinde Beytülmâl görevlisi olarak yanında bulunmuş şahit râvidir.',
          fr: 'Né du vivant du Prophète (ﷺ), intendant du trésor public sous ‘Umar et témoin direct de la scène.',
        },
      },
      {
        name: 'Hz. Ömer b. el-Hattâb (r.a.)',
        arabicName: 'عُمَرُ بْنُ الْخَطَّابِ',
        generation: { tr: 'Râşid Halife (Sahâbî)', fr: '2e Calife bien guidé' },
        role: 'sahabi',
        deathDate: 'ö. 23/644',
        bioNote: {
          tr: 'Terâvih cemaatini H. 14 yılı civarında Mescid-i Nebevî’de Übey b. Kâ‘b arkasında kurumsallaştıran halife.',
          fr: 'Calife qui unifia la prière des Tarâwîh derrière Ubayy b. Ka‘b vers l’an 14 H.',
        },
      },
    ],
    footnotes: [
      {
        id: 'fn-3-1',
        lemmaArabic: 'أَوْزَاعٌ مُتَفَرِّقُونَ',
        commentator: {
          tr: 'İbn Fâris, Cevherî ve Mecdüddin el-Fîrûzâbâdî (s. 114, dipnot 2–3)',
          fr: 'Ibn Fâris, al-Jawharî et al-Fîrûzâbâdî (p. 114, notes 2–3)',
        },
        textArabic:
          '(أوزاع) أي جماعات . (متفرقون) نعت لفظي للتأكيد ، مثل نفخة واحدة . لأن « الأوزاع » الجماعات المتفرقة ، لا واحد له من لفظه . وذكر ابن فارس والجوهري والمجد أن « الأوزاع » الجماعات ، ولم يقولوا « متفرقين » . فعليه ، يكون النعت للتخصيص . أراد أنهم كانوا يتنفلون في المسجد بعد صلاة العشاء متفرقين .',
        translation: {
          tr: '«Evzâ‘» cemaatler/topluluklar demektir. «Müteferrikūn» ise «tek bir üfürüş» (nefhatün vâhidetün) örneğindeki gibi lafzî bir tekit sıfatıdır; zira «evzâ‘» kendi lafzından tekili olmayan «dağınık cemaatler» anlamındadır. İbn Fâris, Cevherî ve Mecdüddin (el-Fîrûzâbâdî) ise «evzâ‘»ı yalnızca «cemaatler» diye tanımlayıp «dağınık» kaydını koymamışlardır; bu görüşe göre «müteferrikūn» tahsis (anlamı sınırlandırma) sıfatı olur. Kastedilen, yatsı namazından sonra mescidde ayrı ayrı nafile kıldıklarıdır.',
          fr: '« Awzâ‘ » signifie des groupes. « Mutafarriqûn » (dispersés) est soit une épithète de renforcement (tawkîd) — car awzâ‘ désigne déjà des groupes épars sans singulier propre —, soit une épithète de précision (takhsîs) selon Ibn Fâris, al-Jawharî et al-Fîrûzâbâdî qui traduisent awzâ‘ simplement par « groupes ». Ils priaient donc séparément après la prière de ‘ishâ’.',
        },
      },
      {
        id: 'fn-3-2',
        lemmaArabic: 'الرَّهْطُ',
        commentator: {
          tr: 'Klasik Lügat Hâşiyesi (s. 114, dipnot 4)',
          fr: 'Glose lexicale classique (p. 114, note 4)',
        },
        textArabic: '(الرهط) ما بين الثلاثة إلى العشرة .',
        translation: {
          tr: '«er-Raht»: Üç ile on kişi arasındaki küçük topluluk.',
          fr: '« Ar-Raht » : un petit groupe composé de trois à dix personnes.',
        },
      },
      {
        id: 'fn-3-3',
        lemmaArabic: 'جَمَعَهُمْ عَلَىٰ أُبَيِّ بْنِ كَعْبٍ / بِصَلَاةِ قَارِئِهِمْ',
        commentator: {
          tr: 'Klasik Muvatta’ Hâşiyesi (s. 114–115, dipnot 5 & 1)',
          fr: 'Glose classique d’al-Muwatta’ (pp. 114–115)',
        },
        textArabic:
          '(جمعهم على أبي بن كعب) أي جعله إماما لهم . (بصلاة قارئهم) أي إمامهم .',
        translation: {
          tr: '«Onları Übey b. Kâ‘b üzerinde topladı» yani onu kendilerine imam tayin etti. «Kāri’lerinin namazıyla» ifadesi de «imamlarının namazına uyarak» anlamındadır.',
          fr: '« Il les réunit derrière Ubayy b. Ka‘b » signifie qu’il le désigna comme leur imam. « La prière de leur récitateur (qâri’) » désigne celle de leur imam.',
        },
      },
      {
        id: 'fn-3-4',
        lemmaArabic: 'وَالَّتِي تَنَامُونَ عَنْهَا أَفْضَلُ',
        commentator: {
          tr: 'İbn Hacer el-Askalânî (s. 115, dipnot 2)',
          fr: 'Ibn Hajar al-‘Asqalânî (p. 115, note 2)',
        },
        textArabic:
          '(والتي تنامون عنها أفضل) قال ابن حجر : هذا تصريح منه بأن الصلاة في آخر الليل أفضل من أوله .',
        translation: {
          tr: 'İbn Hacer dedi ki: Bu söz, Hz. Ömer’in gecenin son vaktinde kılınan namazın gecenin başında kılınan namazdan daha faziletli olduğuna dair açık bir beyanıdır.',
          fr: 'Ibn Hajar dit : C’est là une déclaration explicite de ‘Umar affirmant que la prière accomplie dans la dernière partie de la nuit est supérieure à celle du début de la nuit.',
        },
      },
    ],
  },
  {
    number: 4,
    id: 'hadis-4',
    bab: 2,
    pageNumber: 115,
    type: 'mevkuf',
    typeLabel: {
      tr: 'Mevkûf (Sahâbî Rivâyeti)',
      fr: 'Mawqûf (Récit du Compagnon as-Sâ’ib b. Yazîd)',
    },
    title: {
      tr: '11 Rekât Uygulaması, Miîn Sûreleri ve Fecre Kadar Kıyam',
      fr: 'Les 11 rak‘ât, les sourates al-Mi’în et la veille jusqu’à l’aube',
    },
    arabicFull:
      'وَحَدَّثَنِي عَنْ مَالِكٍ ، عَنْ مُحَمَّدِ بْنِ يُوسُفَ ، عَنِ السَّائِبِ بْنِ يَزِيدَ ؛ أَنَّهُ قَالَ : أَمَرَ عُمَرُ ابْنُ الْخَطَّابِ أُبَيَّ بْنَ كَعْبٍ وَتَمِيمًا الدَّارِيَّ أَنْ يَقُومَا لِلنَّاسِ بِإِحْدَىٰ عَشْرَةَ رَكْعَةً . قَالَ : وَقَدْ كَانَ الْقَارِئُ يَقْرَأُ بِالْمِئِينَ ، حَتَّىٰ كُنَّا نَعْتَمِدُ عَلَى الْعِصِيِّ مِنْ طُولِ الْقِيَامِ . وَمَا كُنَّا نَنْصَرِفُ إِلَّا فِي فُرُوعِ الْفَجْرِ .',
    translation: {
      tr: 'Yine bana Mâlik’ten, o Muhammed b. Yûsuf’tan, o da es-Sâib b. Yezîd’den (r.a.) rivâyet etti; es-Sâib şöyle dedi: Ömer b. el-Hattâb, Übey b. Kâ‘b ile Temîm ed-Dârî’ye insanlara on bir (11) rekât (8 terâvih + 3 vitir) kıldırmalarını emretti. (es-Sâib) devamla dedi ki: Kāri’ (imam) yüzlerce âyetli sûreler (el-Miîn) okurdu; öyle ki kıyamın uzunluğundan dolayı bastonlara (asâlara) dayanırdık. Namazdan ancak fecrin ilk aydınlığı yükselirken (fürû‘u’l-fecr) ayrılırdık.',
      fr: 'Il m’a encore rapporté d’après Mâlik, d’après Muhammad b. Yûsuf, d’après as-Sâ’ib b. Yazîd qui a dit : ‘Umar b. al-Khattâb ordonna à Ubayy b. Ka‘b et Tamîm ad-Dârî de diriger la prière des gens en onze (11) rak‘ât. Il ajouta : Le récitateur lisait des sourates de centaines de versets (al-Mi’în), au point que nous nous appuyions sur nos bâtons tant la station debout était longue ; et nous ne nous retirions qu’aux premières lueurs montantes de l’aube (furû‘ al-fajr).',
    },
    fiqhSummary: {
      tr: 'İmam Mâlik’in en sahih isnadlarından biriyle aktardığı bu rivâyet, Hz. Ömer dönemindeki ilk terâvih düzeninin 11 rekât (8 + 3 vitir) ve olağanüstü uzun kıraat üzerine kurulu olduğunu belgeler. 5. hadisle birlikte değerlendirildiğinde, kıraat kısaltıldıkça rekât sayısının 23’e çıkarıldığı anlaşılır.',
      fr: 'Transmis par une chaîne médinoise des plus solides, ce récit documente l’ordonnancement initial de ‘Umar : 11 rak‘ât à récitation très prolongée. Lu conjointement avec le hadith 5, il montre comment le raccourcissement de la récitation s’est accompagné d’une augmentation du nombre de rak‘ât à 23.',
    },
    isnad: [
      {
        name: 'Yahyâ b. Yahyâ el-Leysî',
        arabicName: 'يَحْيَىٰ بْنُ يَحْيَىٰ اللَّيْثِيُّ',
        generation: { tr: 'Muvatta’ Râvisi', fr: 'Transmetteur d’al-Muwatta’' },
        role: 'ravi',
        deathDate: 'ö. 234/848',
        bioNote: {
          tr: 'el-Muvatta’nın Endülüslü standart râvisi.',
          fr: 'Transmetteur andalou d’al-Muwatta’.',
        },
      },
      {
        name: 'İmam Mâlik b. Enes',
        arabicName: 'مَالِكُ بْنُ أَنَسٍ',
        generation: { tr: 'Musannif', fr: 'Auteur' },
        role: 'musannif',
        deathDate: 'ö. 179/795',
        bioNote: {
          tr: 'Bu rivâyeti Medine’deki sika hocası Muhammed b. Yûsuf’tan almıştır.',
          fr: 'A recueilli ce récit auprès de son maître médinois fiable Muhammad b. Yûsuf.',
        },
      },
      {
        name: 'Muhammed b. Yûsuf el-Kindî',
        arabicName: 'مُحَمَّدُ بْنُ يُوسُفَ الْكِنْدِيُّ',
        generation: { tr: 'Tâbiîn (es-Sâib’in Yeğeni)', fr: 'Tâbi‘î (neveu d’as-Sâ’ib)' },
        role: 'tabii',
        deathDate: 'ö. ~135/752',
        bioNote: {
          tr: 'es-Sâib b. Yezîd’in kız kardeşinin oğlu; Kütüb-i Sitte râvilerinden sika Medineli tâbiî.',
          fr: 'Fils de la sœur d’as-Sâ’ib b. Yazîd ; rapporteur médinois reconnu fiable.',
        },
      },
      {
        name: 'es-Sâib b. Yezîd (r.a.)',
        arabicName: 'السَّائِبُ بْنُ يَزِيدَ',
        generation: { tr: 'Sahâbî', fr: 'Compagnon' },
        role: 'sahabi',
        deathDate: 'ö. 91/710',
        bioNote: {
          tr: 'Veda Haccı’nda yedi yaşında iken Hz. Peygamber’le (s.a.v.) birlikte hacceden ve Medine’de uzun ömür süren sahâbî.',
          fr: 'Compagnon qui accomplit le Pèlerinage d’adieu enfant et vécut longtemps à Médine comme témoin des pratiques califales.',
        },
      },
    ],
    footnotes: [
      {
        id: 'fn-4-1',
        lemmaArabic: 'إِلَّا فِي فُرُوعِ الْفَجْرِ',
        commentator: {
          tr: 'Kādî İyâz (s. 115, dipnot 3)',
          fr: 'Qâdî ‘Iyâd (p. 115, note 3)',
        },
        textArabic:
          '(إلا في فروع الفجر) قال عياض : أي أوائله ، وأول ما يبدو ويرتفع منه .',
        translation: {
          tr: 'Kādî İyâz dedi ki: «Fürû‘u’l-fecr» fecrin ilk başlangıcı, şafağın ilk belirdiği ve ufukta yükselmeye başladığı andır.',
          fr: 'Qâdî ‘Iyâd dit : « Furû‘ al-fajr » désigne ses tout premiers instants, lorsque les premières lueurs de l’aube apparaissent et s’élèvent à l’horizon.',
        },
      },
    ],
  },
  {
    number: 5,
    id: 'hadis-5',
    bab: 2,
    pageNumber: 115,
    type: 'maktu',
    typeLabel: {
      tr: 'Maktû / Mürsel (Tâbiîn İhbarı)',
      fr: 'Maqtû‘ / Mursal (Témoignage de Yazîd b. Rûmân)',
    },
    title: {
      tr: 'Hz. Ömer Döneminde 23 Rekât Uygulaması',
      fr: 'La pratique des 23 rak‘ât à l’époque de ‘Umar b. al-Khattâb',
    },
    arabicFull:
      'وَحَدَّثَنِي عَنْ مَالِكٍ ، عَنْ يَزِيدَ بْنِ رُومَانَ ؛ أَنَّهُ قَالَ : كَانَ النَّاسُ يَقُومُونَ فِي زَمَانِ عُمَرَ بْنِ الْخَطَّابِ ، فِي رَمَضَانَ ، بِثَلَاثٍ وَعِشْرِينَ رَكْعَةً .',
    translation: {
      tr: 'Yine bana Mâlik’ten, o da Yezîd b. Rûmân’dan rivâyet etti; Yezîd şöyle dedi: İnsanlar, Ömer b. el-Hattâb (r.a.) zamanında Ramazan’da yirmi üç (23) rekât (20 terâvih + 3 vitir) namaz kılarlardı.',
      fr: 'Il m’a encore rapporté d’après Mâlik, d’après Yazîd b. Rûmân qui a dit : À l’époque de ‘Umar b. al-Khattâb, les gens accomplissaient les prières nocturnes de Ramadan en vingt-trois (23) rak‘ât (20 Tarâwîh + 3 Witr).',
    },
    fiqhSummary: {
      tr: '4. hadisteki 11 rekât ile 5. hadisteki 23 rekât (20 terâvih + 3 vitir) rivâyetlerinin el-Muvatta’da peş peşe zikredilmesi, İmam Mâlik’in ve cumhurun (Hanefî, Şâfiî, Hanbelî ve Mâlikîlerin bir kısmının) terâvih rekât sayısındaki tarihî gelişimi ve esnekliği nasıl kavradığını gösterir. Yezîd b. Rûmân Hz. Ömer dönemine yetişmediğinden senet münkati‘/mürseldir; ancak Medine ameliyle desteklenir.',
      fr: 'La juxtaposition immédiate des hadiths 4 (11 rak‘ât) et 5 (23 rak‘ât : 20 Tarâwîh + 3 Witr) illustre la souplesse de la jurisprudence classique : lorsque la récitation fut allégée, le nombre d’unités fut porté à 23. Bien que Yazîd b. Rûmân n’ait pas vécu sous ‘Umar (chaîne munqati‘), ce témoignage reflète la pratique médinoise transmise.',
    },
    isnad: [
      {
        name: 'Yahyâ b. Yahyâ el-Leysî',
        arabicName: 'يَحْيَىٰ بْنُ يَحْيَىٰ اللَّيْثِيُّ',
        generation: { tr: 'Muvatta’ Râvisi', fr: 'Transmetteur d’al-Muwatta’' },
        role: 'ravi',
        deathDate: 'ö. 234/848',
        bioNote: {
          tr: 'el-Muvatta’nın Endülüslü râvisi.',
          fr: 'Transmetteur andalou d’al-Muwatta’.',
        },
      },
      {
        name: 'İmam Mâlik b. Enes',
        arabicName: 'مَالِكُ بْنُ أَنَسٍ',
        generation: { tr: 'Musannif', fr: 'Auteur' },
        role: 'musannif',
        deathDate: 'ö. 179/795',
        bioNote: {
          tr: 'el-Muvatta’ müellifi; 11 ve 23 rekât rivâyetlerini aynı babda art arda nakletmiştir.',
          fr: 'Auteur d’al-Muwatta’, qui juxtapose les deux témoignages (11 et 23 rak‘ât).',
        },
      },
      {
        name: 'Yezîd b. Rûmân el-Esedî',
        arabicName: 'يَزِيدُ بْنُ رُومَانَ',
        generation: { tr: 'Tâbiîn (Medine Kāri’i)', fr: 'Tâbi‘î (Récitateur de Médine)' },
        role: 'tabii',
        deathDate: 'ö. 130/747',
        bioNote: {
          tr: 'Zübeyr ailesinin mevlâsı, Medineli güvenilir muhaddis ve kıraat âlimi. Hz. Ömer’e yetişmediği için rivâyeti münkati‘ sayılır.',
          fr: 'Affranchi de la famille d’az-Zubayr, savant médinois fiable ; n’ayant pas connu ‘Umar, son récit est techniquement interrompu (munqati‘).',
        },
      },
    ],
    footnotes: [
      {
        id: 'fn-5-1',
        lemmaArabic: 'بِثَلَاثٍ وَعِشْرِينَ رَكْعَةً',
        commentator: {
          tr: 'Fıkhî Mukayese Notu (Hadis 4 & 5 İlişkisi)',
          fr: 'Note de comparaison juridique (Hadiths 4 & 5)',
        },
        textArabic:
          'أورد مالك حديث السائب بإحدى عشرة ركعة وأعقبه بحديث يزيد بن رومان بثلاث وعشرين ركعة (عشرين للتراويح وثلاث للوتر) .',
        translation: {
          tr: 'İmam Mâlik 4. hadiste 11 rekâtı (8 terâvih + 3 vitir), hemen ardından 5. hadiste 23 rekâtı (20 terâvih + 3 vitir) nakletmiştir. Âlimler bu iki rivâyeti, kıyam uzun tutulduğunda 11 rekât, kıraat hafifletildiğinde 23 rekât kılındığı şeklinde cem‘ (telif) etmişlerdir.',
          fr: 'Mâlik fait suivre le récit des 11 rak‘ât (8 + 3 witr) de celui des 23 rak‘ât (20 + 3 witr). Les juristes concilient les deux par la longueur de la récitation : plus courte, elle permettait davantage d’unités.',
        },
      },
    ],
  },
  {
    number: 6,
    id: 'hadis-6',
    bab: 2,
    pageNumber: 115,
    type: 'maktu',
    typeLabel: {
      tr: 'Maktû (Tâbiîn Müşâhedesi)',
      fr: 'Maqtû‘ (Observation du Tâbi‘î al-A‘raj)',
    },
    title: {
      tr: 'Vitir Kunutu ve Bakara Sûresinin 8 veya 12 Rekâtta Okunması',
      fr: 'Le Qunût du Witr et la récitation d’al-Baqara en 8 ou 12 rak‘ât',
    },
    arabicFull:
      'وَحَدَّثَنِي عَنْ مَالِكٍ ، عَنْ دَاوُدَ بْنِ الْحُصَيْنِ ؛ أَنَّهُ سَمِعَ الْأَعْرَجَ يَقُولُ : مَا أَدْرَكْتُ النَّاسَ إِلَّا وَهُمْ يَلْعَنُونَ الْكَفَرَةَ فِي رَمَضَانَ . قَالَ : وَكَانَ الْقَارِئُ يَقْرَأُ سُورَةَ الْبَقَرَةِ فِي ثَمَانِ رَكَعَاتٍ . فَإِذَا قَامَ بِهَا فِي اثْنَتَيْ عَشْرَةَ رَكْعَةً ، رَأَى النَّاسُ أَنَّهُ قَدْ خَفَّفَ .',
    translation: {
      tr: 'Yine bana Mâlik’ten, o da Dâvûd b. el-Husayn’dan rivâyet etti; Dâvûd, el-A‘rec’in (Abdurrahman b. Hürmüz) şöyle dediğini işitti: “Ben insanlara (Medine ehline) yetiştiğimde onları Ramazan’da (vitir kunutunda) hep kâfirlere lanet/beddua ederken buldum.” (el-A‘rec) dedi ki: “Kāri’ (imam), Bakara sûresini sekiz (8) rekâtta okurdu. Eğer Bakara sûresini on iki (12) rekâtta okuyacak olursa, insanlar onun namazı hafiflettiğini düşünürlerdi.”',
      fr: 'Il m’a encore rapporté d’après Mâlik, d’après Dâwûd b. al-Husayn qui entendit al-A‘raj dire : « Je n’ai jamais connu les gens (de Médine) sans qu’ils maudissent les mécréants (dans le qunût du witr) durant Ramadan. » Il ajouta : « Le récitateur lisait la sourate al-Baqara en huit (8) rak‘ât ; et s’il la répartissait sur douze (12) rak‘ât, les fidèles estimaient qu’il avait allégé la prière. »',
    },
    fiqhSummary: {
      tr: 'Bu rivâyet erken dönem Medine’de (Amel-i Ehl-i Medîne) iki önemli uygulamayı belgeler: (1) Ramazan’ın ikinci yarısında vitir kunutunda kâfirlere beddua okunması (Bi’r-i Maûne hâdisesindeki nebevî kunuta iktidaen); (2) Bakara sûresinin 8 rekâtta hatmedilmesinin normal, 12 rekâta bölünmesinin ise «hafifletme» sayıldığı muazzam kıraat derinliği.',
      fr: 'Ce témoignage documente deux aspects de la pratique médinoise (‘Amal Ahl al-Madîna) : la supplication du qunût durant le witr (en référence au qunût du Prophète après Bi’r Ma‘ûna) et l’intensité de la récitation, où lire toute la sourate al-Baqara (286 versets) en 12 rak‘ât paraissait léger.',
    },
    isnad: [
      {
        name: 'Yahyâ b. Yahyâ el-Leysî',
        arabicName: 'يَحْيَىٰ بْنُ يَحْيَىٰ اللَّيْثِيُّ',
        generation: { tr: 'Muvatta’ Râvisi', fr: 'Transmetteur d’al-Muwatta’' },
        role: 'ravi',
        deathDate: 'ö. 234/848',
        bioNote: {
          tr: 'el-Muvatta’nın Endülüslü râvisi.',
          fr: 'Transmetteur andalou d’al-Muwatta’.',
        },
      },
      {
        name: 'İmam Mâlik b. Enes',
        arabicName: 'مَالِكُ بْنُ أَنَسٍ',
        generation: { tr: 'Musannif', fr: 'Auteur' },
        role: 'musannif',
        deathDate: 'ö. 179/795',
        bioNote: {
          tr: 'el-Muvatta’ müellifi.',
          fr: 'Compilateur d’al-Muwatta’.',
        },
      },
      {
        name: 'Dâvûd b. el-Husayn el-Emevî',
        arabicName: 'دَاوُدُ بْنُ الْحُصَيْنِ',
        generation: { tr: 'Etbâu’t-Tâbiîn (Medineli)', fr: 'Atbâ‘ at-Tâbi‘în (Médinois)' },
        role: 'tabii',
        deathDate: 'ö. 135/753',
        bioNote: {
          tr: 'İmam Mâlik’in Medineli hocalarından; el-A‘rec ve İkrime’nin önde gelen râvilerinden.',
          fr: 'Maître médinois de Mâlik, rapporteur direct d’al-A‘raj.',
        },
      },
      {
        name: 'el-A‘rec (Abdurrahman b. Hürmüz)',
        arabicName: 'الْأَعْرَجُ (عَبْدُ الرَّحْمٰنِ بْنُ هُرْمُزَ)',
        generation: { tr: 'Büyük Tâbiî (Ebû Hüreyre’nin Talebesi)', fr: 'Grand Tâbi‘î (disciple d’Abû Hurayra)' },
        role: 'tabii',
        deathDate: 'ö. 117/735',
        bioNote: {
          tr: 'Medine’nin meşhur kurrâ ve muhaddis tâbiîlerinden; İskenderiye’de vefat etmiştir.',
          fr: 'Célèbre lecteur du Coran et traditionniste médinois de la génération des Tâbi‘în.',
        },
      },
    ],
    footnotes: [
      {
        id: 'fn-6-1',
        lemmaArabic: 'يَلْعَنُونَ الْكَفَرَةَ فِي رَمَضَانَ',
        commentator: {
          tr: 'Klasik Muvatta’ Hâşiyesi (s. 115, dipnot 4)',
          fr: 'Glose classique d’al-Muwatta’ (p. 115, note 4)',
        },
        textArabic:
          '(يلعنون الكفرة في رمضان) في قنوت الوتر ، اقتداء بدعائه ﷺ ، في القنوت ، على رعل وذكوان وبني لحيان ، الذين قتلوا أصحابه ببئر معونة .',
        translation: {
          tr: '“(Ramazan’da kâfirlere lanet ederlerdi)” ifadesi vitir namazının kunutunda yapılan duayı anlatır; bu uygulama, Hz. Peygamber’in (s.a.v.) Bi’r-i Maûne’de ashâbını şehit eden Ri‘l, Zekvân ve Benî Lihyân kabilelerine kunutta beddua etmesine uymak (iktida) maksadıyladır.',
          fr: '« Maudissaient les mécréants en Ramadan » renvoie au qunût de la prière du Witr, à l’imitation de l’invocation du Prophète (ﷺ) contre les tribus de Ri‘l, Dhakwân et Banû Lihyân qui avaient assassiné ses Compagnons à Bi’r Ma‘ûna.',
        },
      },
    ],
  },
  {
    number: 7,
    id: 'hadis-7',
    bab: 2,
    pageNumber: 116,
    type: 'maktu',
    typeLabel: {
      tr: 'Maktû (Medine Ehli Uygulaması)',
      fr: 'Maqtû‘ (Témoignage médinois sur le suhûr)',
    },
    title: {
      tr: 'Fecir Korkusuyla Sahur Yemeği İçin Acele Etmek',
      fr: 'Se hâter pour le repas du suhûr par crainte de l’aube',
    },
    arabicFull:
      'وَحَدَّثَنِي عَنْ مَالِكٍ ، عَنْ عَبْدِ اللَّهِ بْنِ أَبِي بَكْرٍ ؛ قَالَ : سَمِعْتُ أَبِي يَقُولُ : كُنَّا نَنْصَرِفُ فِي رَمَضَانَ ، فَنَسْتَعْجِلُ الْخَدَمَ بِالطَّعَامِ ، مَخَافَةَ الْفَجْرِ .',
    translation: {
      tr: 'Yine bana Mâlik’ten, o da Abdullah b. Ebî Bekir’den (b. Hazm) rivâyet etti; Abdullah şöyle dedi: Babamın (Ebû Bekir b. Muhammed b. Amr b. Hazm) şöyle dediğini işittim: “Ramazan’da (terâvih namazından) çıktığımızda, fecrin (imsak vaktinin) girmesinden korktuğumuz için hizmetçilere yemeği (sahuru) çabuk getirmelerini söylerdik.”',
      fr: 'Il m’a encore rapporté d’après Mâlik, d’après ‘Abd Allâh b. Abî Bakr qui a dit : J’ai entendu mon père dire : « Lorsque nous revenions de la prière nocturne en Ramadan, nous pressions les serviteurs d’apporter le repas (du suhûr), par crainte que l’aube ne survienne. »',
    },
    fiqhSummary: {
      tr: 'Medine kadısı ve valisi Ebû Bekir b. Hazm’ın bu şahitliği, 4. hadisteki «fürû‘u’l-fecr» ifadesini pekiştirir: Medine’de terâvih ibadeti neredeyse bütün geceye yayılır ve sahur vaktinin hemen öncesinde tamamlanırdı.',
      fr: 'Ce témoignage du juge et gouverneur de Médine Abû Bakr b. Hazm corrobore le hadith 4 : à Médine, la prière nocturne de Ramadan s’étendait jusqu’à la toute fin de la nuit, ne laissant qu’un bref instant pour le suhûr avant l’aube.',
    },
    isnad: [
      {
        name: 'Yahyâ b. Yahyâ el-Leysî',
        arabicName: 'يَحْيَىٰ بْنُ يَحْيَىٰ اللَّيْثِيُّ',
        generation: { tr: 'Muvatta’ Râvisi', fr: 'Transmetteur d’al-Muwatta’' },
        role: 'ravi',
        deathDate: 'ö. 234/848',
        bioNote: {
          tr: 'el-Muvatta’nın Endülüslü râvisi.',
          fr: 'Transmetteur andalou d’al-Muwatta’.',
        },
      },
      {
        name: 'İmam Mâlik b. Enes',
        arabicName: 'مَالِكُ بْنُ أَنَسٍ',
        generation: { tr: 'Musannif', fr: 'Auteur' },
        role: 'musannif',
        deathDate: 'ö. 179/795',
        bioNote: {
          tr: 'el-Muvatta’ müellifi.',
          fr: 'Compilateur d’al-Muwatta’.',
        },
      },
      {
        name: 'Abdullah b. Ebî Bekir b. Hazm',
        arabicName: 'عَبْدُ اللَّهِ بْنُ أَبِي بَكْرِ بْنِ حَزْمٍ',
        generation: { tr: 'Tâbiîn (Medineli Fakih)', fr: 'Tâbi‘î (Juriste médinois)' },
        role: 'tabii',
        deathDate: 'ö. 135/753',
        bioNote: {
          tr: 'İmam Mâlik’in en güvenilir Medineli hocalarından; tarih, siyer ve fıkıh otoritesi.',
          fr: 'L’un des maîtres médinois les plus sûrs de Mâlik, autorité en fiqh et en histoire.',
        },
      },
      {
        name: 'Ebû Bekir b. Muhammed b. Hazm',
        arabicName: 'أَبُو بَكْرِ بْنُ مُحَمَّدِ بْنِ عَمْرِو بْنِ حَزْمٍ',
        generation: { tr: 'Tâbiîn (Medine Kadısı ve Valisi)', fr: 'Tâbi‘î (Cadi et gouverneur de Médine)' },
        role: 'tabii',
        deathDate: 'ö. 120/738',
        bioNote: {
          tr: 'Halife Ömer b. Abdülazîz’in kendisine «Hz. Peygamber’in hadislerini yaz» diye ferman gönderdiği ünlü Medine kadısı.',
          fr: 'Célèbre juge de Médine à qui le calife ‘Umar b. ‘Abd al-‘Azîz ordonna la mise par écrit des hadiths.',
        },
      },
    ],
    footnotes: [
      {
        id: 'fn-7-1',
        lemmaArabic: 'فَنَسْتَعْجِلُ الْخَدَمَ بِالطَّعَامِ',
        commentator: {
          tr: 'Klasik Muvatta’ Hâşiyesi (s. 116, dipnot 1)',
          fr: 'Glose classique d’al-Muwatta’ (p. 116, note 1)',
        },
        textArabic: '(فنستعجل الخدم بالطعام) أي للسحور .',
        translation: {
          tr: '“(Hizmetçilere yemeği acele getirmelerini söylerdik)” yani sahur yemeği için.',
          fr: '« Nous pressions les serviteurs pour le repas » signifie : pour prendre le repas du suhûr (avant le jeûne).',
        },
      },
    ],
  },
  {
    number: 8,
    id: 'hadis-8',
    bab: 2,
    pageNumber: 116,
    type: 'mevkuf',
    typeLabel: {
      tr: 'Mevkûf (Hz. Âişe Uygulaması)',
      fr: 'Mawqûf (Pratique de ‘Â’isha)',
    },
    title: {
      tr: 'Mükâteb/Müdebber Kölenin (Zekvân) Hz. Âişe’ye İmamlığı',
      fr: 'L’imamat de l’esclave mudabbar Dhakwân pour ‘Â’isha en Ramadan',
    },
    arabicFull:
      'وَحَدَّثَنِي عَنْ مَالِكٍ ، عَنْ هِشَامِ بْنِ عُرْوَةَ ، عَنْ أَبِيهِ ؛ أَنَّ ذَكْوَانَ ، أَبَا عَمْرٍو (وَكَانَ عَبْدًا لِعَائِشَةَ ، زَوْجِ النَّبِيِّ ﷺ ، فَأَعْتَقَتْهُ ، عَنْ دُبُرٍ مِنْهَا) كَانَ يَقُومُ يَقْرَأُ لَهَا فِي رَمَضَانَ .',
    translation: {
      tr: 'Yine bana Mâlik’ten, o Hişâm b. Urve’den, o da babasından (Urve b. ez-Zübeyr) rivâyet etti: Ebû Amr künyeli Zekvân — ki kendisi Hz. Peygamber’in (s.a.v.) eşi Hz. Âişe’nin kölesiydi ve Hz. Âişe onu kendi vefatından sonra hür olmak üzere (tedbîr / ‘an dübürin) âzat etmişti — Ramazan’da (gece namazında) kalkıp ona imam olarak Kur’an okur (namaz kıldırır)dı.',
      fr: 'Il m’a encore rapporté d’après Mâlik, d’après Hishâm b. ‘Urwa, d’après son père (‘Urwa b. az-Zubayr) : Dhakwân, surnommé Abû ‘Amr — qui était un esclave de ‘Â’isha, l’épouse du Prophète (ﷺ), et qu’elle avait affranchi par contrat post-mortem (‘an duburin minhâ / tadbîr) — se levait en Ramadan pour réciter le Coran (en dirigeant la prière comme imam) pour elle.',
    },
    fiqhSummary: {
      tr: 'İmam Mâlik bu rivâyetle iki önemli fıkhî hükme işaret eder: (1) Köle veya müdebber (sahibinin ölümüne bağlı âzat edilmiş) bir kimsenin hür kimselere namazda imamlık yapması caizdir; (2) Diğer rivâyetlerde Zekvân’ın mushafa bakarak okuduğu da kaydedildiği için, İmam Mâlik’e göre nafile/terâvih namazında mushaftan okuyarak imamlık etmek caizdir.',
      fr: 'Par ce récit final, Mâlik établit deux règles juridiques : (1) un esclave ou mudabbar (affranchi au décès de son maître) peut valablement diriger la prière de personnes libres ; (2) d’après les versions parallèles précisant que Dhakwân lisait dans un mushaf, la récitation sur le Coran écrit est permise en prière surérogatoire selon l’école mâlikite.',
    },
    isnad: [
      {
        name: 'Yahyâ b. Yahyâ el-Leysî',
        arabicName: 'يَحْيَىٰ بْنُ يَحْيَىٰ اللَّيْثِيُّ',
        generation: { tr: 'Muvatta’ Râvisi', fr: 'Transmetteur d’al-Muwatta’' },
        role: 'ravi',
        deathDate: 'ö. 234/848',
        bioNote: {
          tr: 'el-Muvatta’nın Endülüslü râvisi.',
          fr: 'Transmetteur andalou d’al-Muwatta’.',
        },
      },
      {
        name: 'İmam Mâlik b. Enes',
        arabicName: 'مَالِكُ بْنُ أَنَسٍ',
        generation: { tr: 'Musannif', fr: 'Auteur' },
        role: 'musannif',
        deathDate: 'ö. 179/795',
        bioNote: {
          tr: 'Kitâbü’s-Salât fî Ramadân’ı bu fıkhî rivâyetle sonlandırır.',
          fr: 'Clôt le Livre de la Prière en Ramadan sur ce cas juridique.',
        },
      },
      {
        name: 'Hişâm b. Urve',
        arabicName: 'هِشَامُ بْنُ عُرْوَةَ',
        generation: { tr: 'Tâbiîn / Etbâu’t-Tâbiîn', fr: 'Tâbi‘î (fils d’‘Urwa)' },
        role: 'tabii',
        deathDate: 'ö. 146/763',
        bioNote: {
          tr: 'Urve b. ez-Zübeyr’in oğlu ve en sağlam râvisi; İmam Mâlik’in önde gelen hocalarındandır.',
          fr: 'Fils et principal transmetteur d’‘Urwa b. az-Zubayr, maître majeur de Mâlik.',
        },
      },
      {
        name: 'Urve b. ez-Zübeyr',
        arabicName: 'عُرْوَةُ بْنُ الزُّبَيْرِ',
        generation: { tr: 'Fukahâ-i Seb‘a (Tâbiîn)', fr: 'Sept Juristes de Médine' },
        role: 'tabii',
        deathDate: 'ö. 94/713',
        bioNote: {
          tr: 'Hz. Âişe’nin (r.anhâ) yeğeni ve onun hane içi uygulamalarının en yetkin şahidi.',
          fr: 'Neveu de ‘Â’isha et témoin privilégié de ses pratiques domestiques.',
        },
      },
      {
        name: 'Hz. Âişe bint Ebî Bekir (r.anhâ)',
        arabicName: 'عَائِشَةُ زَوْجُ النَّبِيِّ ﷺ',
        generation: { tr: 'Ümmü’l-Mü’minîn (Sahâbî)', fr: 'Mère des Croyants' },
        role: 'sahabi',
        deathDate: 'ö. 58/678',
        bioNote: {
          tr: 'Kölesi Zekvân’ı tedbîr yoluyla âzat edip Ramazan gecelerinde kendisine imamlık yaptırmıştır.',
          fr: 'Affranchit son esclave Dhakwân par tadbîr et le fit officier comme imam durant Ramadan.',
        },
      },
    ],
    footnotes: [
      {
        id: 'fn-8-1',
        lemmaArabic: 'عَنْ دُبُرٍ مِنْهَا',
        commentator: {
          tr: 'el-Feyyûmî (el-Misbâhu’l-Münîr · s. 116, dipnot 2)',
          fr: 'al-Fayyûmî (al-Misbâh al-Munîr · p. 116, note 2)',
        },
        textArabic:
          '(عن دبر) قال الفيومي : دبّر الرجل عبده تدبيرا ، إذا أعتقه بعد موته . وأعتق عبده عن دُبُر ، أي بعد دُبُر .',
        translation: {
          tr: 'el-Feyyûmî dedi ki: «Bir kimse kölesini tedbîr etti» denildiğinde, onu kendi ölümünden sonra hür olmak üzere âzat etmesi anlaşılır. «Kölesini ‘an dübürin âzat etti» ifadesi de «kendi hayatının ardından / vefatından sonra» anlamındadır.',
          fr: 'Al-Fayyûmî dit : On dit « dabbara l’homme son esclave » (tadbîr) lorsqu’il stipule son affranchissement après sa propre mort. « L’affranchir ‘an dubur » signifie donc : à la suite de son décès.',
        },
      },
      {
        id: 'fn-8-2',
        lemmaArabic: 'يَقْرَأُ لَهَا',
        commentator: {
          tr: 'Klasik Muvatta’ Hâşiyesi (s. 116, dipnot 3)',
          fr: 'Glose classique d’al-Muwatta’ (p. 116, note 3)',
        },
        textArabic: '(يقرأ لها القرآن) أي يصلي لها إماما .',
        translation: {
          tr: '“(Ona Kur’an okurdu)” ifadesinin anlamı, ona imam olarak namaz kıldırmasıdır.',
          fr: '« Récitait le Coran pour elle » signifie : dirigeait la prière pour elle en tant qu’imam.',
        },
      },
    ],
  },
];

export interface TokenizedHadithResult {
  hadith: HadithRecord;
  tokens: HadithWordToken[];
  missingKeys: string[];
}

export function getHadithByNumber(number: number): HadithRecord | undefined {
  return HADITHS_DATA.find((h) => h.number === number);
}

export function getHadithWithTokens(number: number): TokenizedHadithResult | undefined {
  const hadith = getHadithByNumber(number);
  if (!hadith) return undefined;
  const { tokens, missingKeys } = tokenizeHadithArabic(hadith.number, hadith.arabicFull);
  return { hadith, tokens, missingKeys };
}

export function filterHadiths(babFilter: 'all' | 1 | 2, query = ''): HadithRecord[] {
  const q = query.trim().toLowerCase();
  return HADITHS_DATA.filter((hadith) => {
    if (babFilter !== 'all' && hadith.bab !== babFilter) {
      return false;
    }
    if (!q) return true;
    return (
      hadith.title.tr.toLowerCase().includes(q) ||
      hadith.title.fr.toLowerCase().includes(q) ||
      hadith.translation.tr.toLowerCase().includes(q) ||
      hadith.translation.fr.toLowerCase().includes(q) ||
      hadith.arabicFull.includes(query.trim()) ||
      hadith.fiqhSummary.tr.toLowerCase().includes(q) ||
      hadith.footnotes.some(
        (fn) =>
          fn.commentator.tr.toLowerCase().includes(q) ||
          fn.translation.tr.toLowerCase().includes(q) ||
          fn.textArabic.includes(query.trim())
      )
    );
  });
}

export function resolveHadithNumberFromFocusId(focusedItemId?: string): number {
  if (!focusedItemId) return 1;
  const match = focusedItemId.match(/^hadis-([1-8])$/);
  if (match) {
    return Number(match[1]);
  }
  if (focusedItemId === 'bab-2') return 3;
  if (focusedItemId === 'bab-1') return 1;
  if (focusedItemId === 'theme-rekats') return 4;
  if (focusedItemId === 'theme-bidat') return 3;
  if (focusedItemId === 'theme-qiraat') return 6;
  if (focusedItemId === 'theme-imamat') return 8;
  return 1;
}
