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

  const region = regions.find(r => r.key === regionKey) || regions[0];

  const setRegionKey = (key: string) => {
    localStorage.setItem('selected_region', key);
    setRegionKeyState(key);
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchRamadanTimetable(region)
      .then(data => {
        if (!cancelled) { setTimetable(data); setLoading(false); }
      })
      .catch(() => {
        if (cancelled) return;
        const cached = localStorage.getItem(`ramadan_2026_${regionKey}`);
        if (cached) {
          try {
            setTimetable(JSON.parse(cached));
            setLoading(false);
            return;
          } catch { /* ignore */ }
        }
        setError("Vaqtlarni yuklab bo'lmadi. Internetni tekshiring.");
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [regionKey, region]);

  const todayStr = getTodayStr();
  const todayIndex = timetable.findIndex(d => d.dateGregorian === todayStr);
  const todayEntry = todayIndex >= 0 ? timetable[todayIndex] : undefined;

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
