export interface Dua {
  id: string;
  category: 'saharlik' | 'iftor';
  titleUz: string;
  arabic: string;
  transliteration: string;
  translationUz: string;
  audio: string;
}

export const duas: Dua[] = [
  {
    id: 'saharlik-niyat',
    category: 'saharlik',
    titleUz: "Saharlik Duosi",
    arabic: 'نَوَيْتُ صَوْمَ رَمَضَانَ مِنَ الصُّبْحِ إِلَى غُرُوبِ الشَّمْسِ خَالِصًا لِلَّهِ. اللَّهُ أَكْبَرُ',
    transliteration: "Navaytu an asuma sovma shahri Ramadoona minal fajri ilal mag'rib xoolison lillahi ta'ala . Allohu Akbar",
    translationUz: "Ramazon oyining ro'zasini subhdan to kun botguncha xolis Alloh uchun tutmoqni niyat qildim. Alloh buyukdir.",
    audio: '/audio/Ramadan-Yopish duosi.mp3'
  },
  {
    id: 'saharlik-dua',
    category: 'saharlik',
    titleUz: 'Iftorlik duosi',
    arabic: 'اللهم صمت لهذا الصوم وافتريت برزقك، اغفر لي يا غفار ما قدمت وما أخرت',
    transliteration: "Allohumma laka sumtu va bika aamantu va 'alayka tavakkaltu va 'alaa rizqika aftortu fag'firli yaa g'offaar(u) maa qoddamtu va maa axxortu.",
    translationUz: "Allohim , ushbu ro'zamni Sen uchun tutdim va Sen bergan rizqing bilan iftor qildim. Ey gunohlarni avf qiluvchi Zot, mening avvalgi va keyingi gunohlarimni mag'firat qilgin,",
    audio: '/audio/Ramadan-Ogiz ochish.mp3'
  },
  {
    id: 'saharlik-baraka',
    category: 'saharlik',
    titleUz: "Ramazon barakasi uchun duo",
    arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِي رَمَضَانَ وَأَعِنَّا عَلَى صِيَامِهِ وَقِيَامِهِ',
    transliteration: "Allohumma barik lana fi Ramadon va a'inna 'ala siyamihi va qiyamihi.",
    translationUz: "Ey Alloh, Ramazon oyini biz uchun muborak qil va ro'za hamda tarovihni bajo keltirish uchun yordam ber.",
    audio: ''

  },
  {
    id: 'iftor-dua-1',
    category: 'iftor',
    titleUz: 'Iftorlik duosi',
    arabic: 'اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ',
    transliteration: "Allohumma inni laka sumtu va bika aamantu va 'alayka tavakkaltu va 'ala rizqika aftartu.",
    translationUz: "Ey Alloh, Sen uchun ro'za tutdim, Senga imon keltirdim, Senga tavakkal qildim va rizqing bilan og'iz ochdim.",
    audio: '/audio/Ramadan-Ogiz ochish.mp3'

  },
  {
    id: 'iftor-dua-2',
    category: 'iftor',
    titleUz: "Tashnalik ketishi duosi",
    arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللهُ',
    transliteration: "Zahabaz zama-u vabtallatil 'uruuqu va sabatal ajru insha Allah.",
    translationUz: "Chanqoqlik ketdi, tomorlar namlandi va agar Alloh xohlasa, ajr sobit bo'ldi.",
    audio: ''

  },
  {
    id: 'iftor-dua-3',
    category: 'iftor',
    titleUz: "Iftorda o'qiladigan duo",
    arabic: 'اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ فَتَقَبَّلْ مِنِّي إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
    transliteration: "Allohumma laka sumtu va 'ala rizqika aftartu fataqabbal minni innaka antas sami'ul 'aliym.",
    translationUz: "Ey Alloh, Sen uchun ro'za tutdim va rizqing bilan og'iz ochdim, mendan qabul et, albatta Sen eshituvchi, biluvchisan.",
    audio: ''
  },
];
