export interface Dua {
  id: string;
  category: 'saharlik' | 'iftor';
  titleUz: string;
  arabic: string;
  transliteration: string;
  translationUz: string;
}

export const duas: Dua[] = [
  {
    id: 'saharlik-niyat',
    category: 'saharlik',
    titleUz: "Ro'za niyati",
    arabic: 'نَوَيْتُ أَنْ أَصُومَ غَدًا مِنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ فَرْضًا لَكَ يَا اللهُ فَتَقَبَّلْ مِنِّي إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
    transliteration: "Navaytu an asuma g'adan min shahri Ramadonil muborak, fardon laka ya Allohu, fataqabbal minni innaka antas sami'ul 'aliym.",
    translationUz: "Ey Alloh, ertangi Ramazon oyining farz ro'zasini tutishni niyat qildim. Mendan qabul et. Albatta Sen eshituvchi, biluvchisan.",
  },
  {
    id: 'saharlik-dua',
    category: 'saharlik',
    titleUz: 'Saharlik duosi',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ فَإِنَّهُ لَا يَمْلِكُهَا إِلَّا أَنْتَ',
    transliteration: "Allohumma inni as-aluka min fadlika va rohmatika fa innahu la yamlikuha illa ant.",
    translationUz: "Ey Alloh, Sendan fazling va rahmatni so'rayman, chunki buni Sendan boshqa hech kim bera olmaydi.",
  },
  {
    id: 'saharlik-baraka',
    category: 'saharlik',
    titleUz: "Ramazon barakasi uchun duo",
    arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِي رَمَضَانَ وَأَعِنَّا عَلَى صِيَامِهِ وَقِيَامِهِ',
    transliteration: "Allohumma barik lana fi Ramadon va a'inna 'ala siyamihi va qiyamihi.",
    translationUz: "Ey Alloh, Ramazon oyini biz uchun muborak qil va ro'za hamda tarovihni bajo keltirish uchun yordam ber.",
  },
  {
    id: 'iftor-dua-1',
    category: 'iftor',
    titleUz: 'Iftorlik duosi',
    arabic: 'اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ',
    transliteration: "Allohumma inni laka sumtu va bika aamantu va 'alayka tavakkaltu va 'ala rizqika aftartu.",
    translationUz: "Ey Alloh, Sen uchun ro'za tutdim, Senga imon keltirdim, Senga tavakkal qildim va rizqing bilan og'iz ochdim.",
  },
  {
    id: 'iftor-dua-2',
    category: 'iftor',
    titleUz: "Tashnalik ketishi duosi",
    arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللهُ',
    transliteration: "Zahabaz zama-u vabtallatil 'uruuqu va sabatal ajru insha Allah.",
    translationUz: "Chanqoqlik ketdi, tomorlar namlandi va agar Alloh xohlasa, ajr sobit bo'ldi.",
  },
  {
    id: 'iftor-dua-3',
    category: 'iftor',
    titleUz: "Iftorda o'qiladigan dua",
    arabic: 'اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ فَتَقَبَّلْ مِنِّي إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
    transliteration: "Allohumma laka sumtu va 'ala rizqika aftartu fataqabbal minni innaka antas sami'ul 'aliym.",
    translationUz: "Ey Alloh, Sen uchun ro'za tutdim va rizqing bilan og'iz ochdim, mendan qabul et, albatta Sen eshituvchi, biluvchisan.",
  },
];
