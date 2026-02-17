import { useRamadan } from '@/context/RamadanContext';
import { getChecklistForDate, calculateStreak } from '@/hooks/useChecklist';
import ShareCard from '@/components/ShareCard';
import { useMemo } from 'react';

export default function ProgressPage() {
  const { timetable, todayIndex } = useRamadan();

  const stats = useMemo(() => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    let completedDays = 0;
    let totalChecked = 0;
    let totalItems = 0;

    timetable.forEach(d => {
      if (d.dateGregorian > todayStr) return;
      const cl = getChecklistForDate(d.dateGregorian);
      if (cl.roza && cl.namoz) completedDays++;
      totalItems += 6;
      totalChecked += Object.values(cl).filter(Boolean).length;
    });

    return {
      completedDays,
      streak: calculateStreak(timetable),
      avgCompletion: totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0,
      totalDays: timetable.length,
    };
  }, [timetable]);

  return (
    <div className="pb-24 px-4 pt-4 animate-fade-in">
      <h1 className="text-xl font-bold mb-4">Natijalar</h1>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: 'Tugatilgan kunlar', value: `${stats.completedDays}/${stats.totalDays}` },
          { label: 'Streak', value: `${stats.streak} 🔥` },
          { label: "O'rtacha bajarilish", value: `${stats.avgCompletion}%` },
          { label: 'Ramazon kuni', value: `${Math.max((todayIndex ?? -1) + 1, 0)}/${stats.totalDays}` },
        ].map((stat, i) => (
          <div key={i} className="bg-card rounded-2xl p-4 border border-border text-center">
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <ShareCard
        completedDays={stats.completedDays}
        totalDays={stats.totalDays}
        streak={stats.streak}
        avgCompletion={stats.avgCompletion}
      />
    </div>
  );
}
