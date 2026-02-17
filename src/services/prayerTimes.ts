import type { Region } from '@/config/regions';

export interface DayTimetable {
  day: number;
  dateGregorian: string; // YYYY-MM-DD
  dateHijri: string;
  saharlik: string; // HH:MM
  iftor: string; // HH:MM
}

function parseTime(timeStr: string): string {
  return timeStr.replace(/\s*\(.*\)/, '').trim();
}

function getCacheKey(regionKey: string): string {
  return `ramadan_2026_${regionKey}`;
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

  const baseUrl = 'https://api.aladhan.com/v1/calendar';
  const params = `latitude=${region.lat}&longitude=${region.lng}&method=3`;

  // Fetch Feb, March, and April 2026 to cover full Ramadan
  const responses = await Promise.all([
    fetch(`${baseUrl}/2026/2?${params}`),
    fetch(`${baseUrl}/2026/3?${params}`),
    fetch(`${baseUrl}/2026/4?${params}`),
  ]);

  for (const r of responses) {
    if (!r.ok) throw new Error('API request failed');
  }

  const jsons = await Promise.all(responses.map(r => r.json()));
  const allDays = [...(jsons[0].data || []), ...(jsons[1].data || []), ...(jsons[2].data || [])];

  // Filter only Ramadan days (Hijri month 9)
  const ramadanDays = allDays.filter((d: any) =>
    d.date?.hijri?.month?.number === 9
  );

  if (ramadanDays.length === 0) {
    throw new Error('No Ramadan data found');
  }

  const timetable: DayTimetable[] = ramadanDays.map((entry: any, index: number) => {
    const greg = entry.date.gregorian;
    const dateStr = `${greg.year}-${String(greg.month.number).padStart(2, '0')}-${String(greg.day).padStart(2, '0')}`;

    return {
      day: index + 1,
      dateGregorian: dateStr,
      dateHijri: entry.date.hijri.date,
      saharlik: parseTime(entry.timings.Fajr),
      iftor: parseTime(entry.timings.Maghrib),
    };
  });

  localStorage.setItem(cacheKey, JSON.stringify(timetable));
  return timetable;
}
