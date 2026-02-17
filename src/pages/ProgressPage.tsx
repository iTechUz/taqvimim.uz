import { useRamadan } from '@/context/RamadanContext';
import { getChecklistForDate, calculateStreak } from '@/hooks/useChecklist';
import ShareCard from '@/components/ShareCard';
import { useMemo } from 'react';
import { Flame, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';

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

  const statCards = [
    { label: 'Tugatilgan kunlar', value: `${stats.completedDays}/${stats.totalDays}`, icon: CheckCircle2, color: 'text-green-500' },
    { label: 'Streak', value: `${stats.streak} 🔥`, icon: Flame, color: 'text-primary' },
    { label: "O'rtacha bajarilish", value: `${stats.avgCompletion}%`, icon: TrendingUp, color: 'text-blue-400' },
    { label: 'Ramazon kuni', value: `${Math.max((todayIndex ?? -1) + 1, 0)}/${stats.totalDays}`, icon: Calendar, color: 'text-muted-foreground' },
  ];

  return (
    <div className="pb-24 px-4 pt-4 animate-fade-in">
      <h1 className="text-xl font-bold mb-4">Natijalar</h1>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="glass-strong rounded-2xl p-4 border border-border/50 text-center card-elevated animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both' }}
          >
            <stat.icon size={18} className={`mx-auto mb-2 ${stat.color}`} />
            <p className="text-2xl font-extrabold">{stat.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">{stat.label}</p>
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