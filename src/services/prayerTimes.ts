import type { Region } from '@/config/regions';

export interface DayTimetable {
  day: number;
  dateGregorian: string; // YYYY-MM-DD
  dateHijri: string;
  saharlik: string; // HH:MM
  iftor: string; // HH:MM
  tong_saharlik: string;
  quyosh: string;
  peshin: string;
  asr: string;
  shom_iftor: string;
  hufton: string;
}

const RAMADAN_2026_START_DATE = '2026-02-19';

function getCacheKey(regionKey: string): string {
  return `ramadan_2026_namozvaqti_v1_${regionKey}`;
}

function convertDate(dateStr: string): string {
  if (!dateStr || !dateStr.includes('.')) return '2026-02-19'; // Fallback
  // DD.MM.YYYY to YYYY-MM-DD
  const [d, m, y] = dateStr.split('.');
  return `${y}-${m}-${d}`;
}

export async function fetchRamadanTimetable(region: Region): Promise<DayTimetable[]> {
  const cacheKey = getCacheKey(region.key);
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch { /* ignore */ }
  }

  const regionSlug = region.apiRegion || 'toshkent-shahri';
  
  // Fetch Feb, March, and April 2026 to cover Ramadan
  const periods = ['2026-02', '2026-03', '2026-04'];
  const allDays: any[] = [];

  for (const period of periods) {
    try {
      const resp = await fetch(`/api-namoz/?format=json&region=${regionSlug}&period=${period}`);
      if (resp.ok) {
        const data = await resp.json();
        if (data && data.period_table) {
          allDays.push(...data.period_table);
        }
      }
    } catch (e) {
      console.error(`Failed to fetch period ${period}:`, e);
    }
  }

  if (allDays.length === 0) {
    throw new Error('Ma\'lumot topilmadi');
  }

  // Filter for Ramadan days (starting Feb 19, 2026, for 30 days)
  // Since the API doesn't provide Hijri month name in period_table, we use the known start date.
  const startDate = new Date(RAMADAN_2026_START_DATE);
  
  const ramadanTimetable: DayTimetable[] = allDays
    .map((d: any) => ({
      ...d,
      gregorian: convertDate(d.date)
    }))
    .filter((d: any) => {
      const currentDate = new Date(d.gregorian);
      return currentDate >= startDate;
    })
    .slice(0, 30)
    .map((entry: any, index: number) => {
      return {
        day: index + 1,
        dateGregorian: entry.gregorian,
        dateHijri: `Ramazon ${index + 1}`,
        saharlik: entry.times.bomdod,
        iftor: entry.times.shom,
        tong_saharlik: entry.times.bomdod,
        quyosh: entry.times.quyosh,
        peshin: entry.times.peshin,
        asr: entry.times.asr,
        shom_iftor: entry.times.shom,
        hufton: entry.times.xufton,
      };
    });

  if (ramadanTimetable.length === 0) {
    throw new Error('Ramazon ma\'lumotlari topilmadi');
  }

  localStorage.setItem(cacheKey, JSON.stringify(ramadanTimetable));
  return ramadanTimetable;
}

