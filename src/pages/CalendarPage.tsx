import { useRamadan } from '@/context/RamadanContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { DayTimetable } from '@/services/prayerTimes';

export default function CalendarPage() {
  const { timetable, loading, region } = useRamadan();
  const [selected, setSelected] = useState<DayTimetable | null>(null);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pb-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pb-24 px-4 pt-4 animate-fade-in">
      <h1 className="text-xl font-bold mb-0.5">Ramazon Taqvimi</h1>
      <p className="text-sm text-muted-foreground mb-4">{region.displayNameUz} · {timetable.length} kun</p>

      <div className="space-y-1.5">
        {timetable.map(day => {
          const isToday = day.dateGregorian === todayStr;
          const isPast = day.dateGregorian < todayStr;
          return (
            <button
              key={day.day}
              onClick={() => setSelected(day)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all min-h-[56px] active:scale-[0.98] ${
                isToday
                  ? 'bg-primary/10 border-primary/30'
                  : isPast
                  ? 'bg-card/50 border-border opacity-60'
                  : 'bg-card border-border hover:bg-secondary'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  isToday ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
                }`}>
                  {day.day}
                </span>
                <span className="text-sm">{day.dateGregorian}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground font-mono">{day.saharlik}</span>
                <span className="font-bold text-primary font-mono">{day.iftor}</span>
              </div>
            </button>
          );
        })}
      </div>

      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="text-left">Ramazon {selected.day}-kun</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4 pb-6">
                <p className="text-sm text-muted-foreground">{selected.dateGregorian} · {selected.dateHijri}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary rounded-2xl p-5 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Saharlik</p>
                    <p className="text-3xl font-bold">{selected.saharlik}</p>
                  </div>
                  <div className="bg-secondary rounded-2xl p-5 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Iftor</p>
                    <p className="text-3xl font-bold text-primary">{selected.iftor}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
