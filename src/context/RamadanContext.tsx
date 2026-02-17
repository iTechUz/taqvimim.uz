import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { regions, DEFAULT_REGION_KEY, type Region } from '@/config/regions';
import { fetchRamadanTimetable, type DayTimetable } from '@/services/prayerTimes';

interface RamadanContextType {
  regionKey: string;
  setRegionKey: (key: string) => void;
  region: Region;
  timetable: DayTimetable[];
  loading: boolean;
  error: string | null;
  todayEntry: DayTimetable | undefined;
  todayIndex: number;
}

const RamadanContext = createContext<RamadanContextType | null>(null);

function getTodayStr() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
}

export function RamadanProvider({ children }: { children: ReactNode }) {
  const [regionKey, setRegionKeyState] = useState(() =>
    localStorage.getItem('selected_region') || DEFAULT_REGION_KEY
  );
  const [timetable, setTimetable] = useState<DayTimetable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todayExtraEntry, setTodayExtraEntry] = useState<DayTimetable | undefined>(undefined);

  const region = regions.find(r => r.key === regionKey) || regions[0];

  const setRegionKey = (key: string) => {
    localStorage.setItem('selected_region', key);
    setRegionKeyState(key);
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    // Fetch Ramadan Timetable
    fetchRamadanTimetable(region)
      .then(data => {
        if (!cancelled) {
          setTimetable(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Prayer times fetch error:", err);
        setError("Vaqtlarni yuklab bo'lmadi. Internetni tekshiring.");
        setLoading(false);
      });

    // Fetch Today's Extra Data (for pre-Ramadan or general use)
    const regionSlug = region.apiRegion || 'toshkent-shahri';
    fetch(`/api-namoz/?format=json&region=${regionSlug}&period=today`)
      .then(res => res.json())
      .then(data => {
        if (cancelled) return;
        if (data && data.today && data.today.times) {
          const entry = data.today;
          const rawDate = data.meta?.date || getTodayStr();
          let dateGregorian = rawDate;

          if (rawDate.includes('.') && rawDate.split('.').length === 3) {
            const [d, m, y] = rawDate.split('.');
            dateGregorian = `${y}-${m}-${d}`;
          }

          setTodayExtraEntry({
            day: 0,
            dateGregorian,
            dateHijri: '',
            saharlik: entry.times.bomdod,
            iftor: entry.times.shom,
            tong_saharlik: entry.times.bomdod,
            quyosh: entry.times.quyosh,
            peshin: entry.times.peshin,
            asr: entry.times.asr,
            shom_iftor: entry.times.shom,
            hufton: entry.times.xufton,
          });
        }
      })
      .catch(console.error);

    return () => { cancelled = true; };
  }, [regionKey, region]);

  const todayStr = getTodayStr();
  const todayIndexInTimetable = timetable.findIndex(d => d.dateGregorian === todayStr);
  const todayEntry = todayIndexInTimetable >= 0 ? timetable[todayIndexInTimetable] : todayExtraEntry;
  const todayIndex = todayIndexInTimetable >= 0 ? todayIndexInTimetable : -1;

  return (
    <RamadanContext.Provider value={{ regionKey, setRegionKey, region, timetable, loading, error, todayEntry, todayIndex }}>
      {children}
    </RamadanContext.Provider>
  );
}

export function useRamadan() {
  const ctx = useContext(RamadanContext);
  if (!ctx) throw new Error('useRamadan must be used within RamadanProvider');
  return ctx;
}
