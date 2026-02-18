import { useRamadan } from '@/context/RamadanContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useState } from 'react';
import { Loader2, Check } from 'lucide-react';
import type { DayTimetable } from '@/services/prayerTimes';
import { getChecklistForDate } from '@/hooks/useChecklist';
import PageHeader from '@/components/PageHeader';

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
      <PageHeader title="Ramazon Taqvimi" subtitle={`${region.displayNameUz} · ${timetable.length} kun`} />

      <div className="space-y-2">
        {timetable.map((day, i) => {
          const isToday = day.dateGregorian === todayStr;
          const isPast = day.dateGregorian < todayStr;
          const cl = isPast ? getChecklistForDate(day.dateGregorian) : null;
          const dayDone = cl ? cl.roza && cl.namoz : false;

          return (
            <button
              key={day.day}
              onClick={() => setSelected(day)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all duration-200 min-h-[60px] active:scale-[0.98] card-elevated animate-fade-in-up ${isToday
                  ? 'glass border-primary/30 glow-sm'
                  : isPast
                    ? 'glass-strong border-border/30 opacity-70'
                    : 'glass-strong border-border/50 hover:border-primary/20'
                }`}
              style={{ animationDelay: `${i * 0.02}s`, animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-3">
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${isToday ? 'gradient-gold text-primary-foreground glow-sm' : dayDone ? 'bg-green-500/15 text-green-500' : 'bg-secondary text-foreground'
                  }`}>
                  {dayDone ? <Check size={16} /> : day.day}
                </span>
                <span className="text-sm font-medium">{day.dateGregorian}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground font-mono text-xs">{day.saharlik}</span>
                <span className="font-bold text-primary font-mono">{day.iftor}</span>
              </div>
            </button>
          );
        })}
      </div>

      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl glass-strong border-t border-border/50">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="text-left">Ramazon {selected.day}-kun</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4 pb-6">
                <p className="text-sm text-muted-foreground">{selected.dateGregorian} · {selected.dateHijri}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass rounded-2xl p-5 text-center border border-border/50">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Saharlik</p>
                    <p className="text-3xl font-extrabold">{selected.saharlik}</p>
                  </div>
                  <div className="glass rounded-2xl p-5 text-center border border-primary/20 glow-sm">
                    <p className="text-[10px] text-primary uppercase tracking-widest font-bold mb-1">Iftor</p>
                    <p className="text-3xl font-extrabold text-primary">{selected.iftor}</p>
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