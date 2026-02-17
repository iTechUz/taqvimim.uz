export interface Region {
  key: string;
  displayNameUz: string;
  cityNameEn: string;
  country: string;
  lat: number;
  lng: number;
  apiRegion: string; // Region name for islomapi.uz
}

export const regions: Region[] = [
  { key: 'toshkent', displayNameUz: 'Toshkent', cityNameEn: 'Tashkent', country: 'Uzbekistan', lat: 41.2995, lng: 69.2401, apiRegion: 'toshkent-shahri' },
  { key: 'nukus', displayNameUz: 'Nukus', cityNameEn: 'Nukus', country: 'Uzbekistan', lat: 42.4628, lng: 59.6003, apiRegion: 'nukus-shahri' },
  { key: 'urganch', displayNameUz: 'Urganch', cityNameEn: 'Urgench', country: 'Uzbekistan', lat: 41.5500, lng: 60.6333, apiRegion: 'urganch-shahri' },
  { key: 'termiz', displayNameUz: 'Termiz', cityNameEn: 'Termez', country: 'Uzbekistan', lat: 37.2242, lng: 67.2783, apiRegion: 'termiz-shahri' },
  { key: 'qarshi', displayNameUz: 'Qarshi', cityNameEn: 'Qarshi', country: 'Uzbekistan', lat: 38.8600, lng: 65.8000, apiRegion: 'qarshi-shahri' },
  { key: 'samarqand', displayNameUz: 'Samarqand', cityNameEn: 'Samarkand', country: 'Uzbekistan', lat: 39.6542, lng: 66.9597, apiRegion: 'samarqand-shahri' },
  { key: 'buxoro', displayNameUz: 'Buxoro', cityNameEn: 'Bukhara', country: 'Uzbekistan', lat: 39.7747, lng: 64.4286, apiRegion: 'buxoro-shahri' },
  { key: 'navoiy', displayNameUz: 'Navoiy', cityNameEn: 'Navoi', country: 'Uzbekistan', lat: 40.1003, lng: 65.3792, apiRegion: 'navoiy-shahri' },
  { key: 'jizzax', displayNameUz: 'Jizzax', cityNameEn: 'Jizzakh', country: 'Uzbekistan', lat: 40.1158, lng: 67.8422, apiRegion: 'jizzax-shahri' },
  { key: 'guliston', displayNameUz: 'Guliston', cityNameEn: 'Gulistan', country: 'Uzbekistan', lat: 40.4897, lng: 68.7842, apiRegion: 'guliston-shahri' },
  { key: 'andijon', displayNameUz: 'Andijon', cityNameEn: 'Andijan', country: 'Uzbekistan', lat: 40.7833, lng: 72.3442, apiRegion: 'andijon-shahri' },
  { key: 'namangan', displayNameUz: 'Namangan', cityNameEn: 'Namangan', country: 'Uzbekistan', lat: 41.0000, lng: 71.6667, apiRegion: 'namangan-shahri' },
  { key: 'fargona', displayNameUz: "Farg'ona", cityNameEn: 'Fergana', country: 'Uzbekistan', lat: 40.3842, lng: 71.7892, apiRegion: "fargona-shahri" },
  { key: 'qoqon', displayNameUz: "Qo'qon", cityNameEn: 'Kokand', country: 'Uzbekistan', lat: 40.5283, lng: 70.9425, apiRegion: "qoqon-shahri" },
];

export const DEFAULT_REGION_KEY = 'toshkent';
