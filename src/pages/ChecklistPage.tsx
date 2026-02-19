import { useRamadan } from '@/context/RamadanContext';
import { useChecklist, type ChecklistState } from '@/hooks/useChecklist';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { useState, useMemo } from 'react';
import { calculateStreak } from '@/hooks/useChecklist';
import PageHeader from '@/components/PageHeader';
import Quran from '../../public/icons/alquran.png'
import mosque from '../../public/icons/mosque.png'
import moon from '../../public/icons/moon.png'
import duo from '../../public/icons/dua-hands.png'
import charity from '../../public/icons/charity.png'
import fasting from '../../public/icons/roza.png'


const items: { key: keyof ChecklistState; label: string; emoji: string; group: 'must' | 'habit' }[] = [
  { key: 'roza', label: "Ro'za", emoji: fasting, group: 'must' },
  { key: 'namoz', label: '5 vaqt namoz', emoji: mosque, group: 'must' },
  { key: 'quron', label: "Qur'on (10 daq)", emoji: Quran, group: 'habit' },
  { key: 'zikr', label: 'Zikr / Duo', emoji: duo, group: 'habit' },
  { key: 'sadaqa', label: 'Sadaqa', emoji: charity, group: 'habit' },
  { key: 'goodDeed', label: 'Yaxshi amal', emoji: moon, group: 'habit' },
];

export default function ChecklistPage() {
  const { timetable } = useRamadan();
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const todayIdx = useMemo(() => {
    const idx = timetable.findIndex(d => d.dateGregorian === todayStr);
    return idx >= 0 ? idx : 0;
  }, [timetable, todayStr]);

  const [selectedIdx, setSelectedIdx] = useState(todayIdx);
  const selectedDay = timetable[selectedIdx];
  const selectedDate = selectedDay?.dateGregorian || todayStr;
  const { state, toggle, progress } = useChecklist(selectedDate);
  const streak = useMemo(() => calculateStreak(timetable), [timetable]);

  const canPrev = selectedIdx > 0;
  const canNext = selectedIdx < timetable.length - 1;

  return (
    <div className="pb-24 px-4 pt-4 animate-fade-in">
      <PageHeader title="Kunlik amallar">
        {streak > 0 && (
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Flame size={14} className="text-primary" />
            <span className="text-xs font-bold text-primary">{streak}</span>
          </div>
        )}
      </PageHeader>

      {/* Day selector */}
      {timetable.length > 0 && (
        <div className="flex items-center justify-between glass-strong rounded-2xl border border-border/50 px-2 py-2 mb-4 card-elevated">
          <button
            onClick={() => canPrev && setSelectedIdx(i => i - 1)}
            disabled={!canPrev}
            className="p-2 rounded-xl hover:bg-secondary transition-all duration-200 disabled:opacity-20 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-90"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setSelectedIdx(todayIdx)}
            className="text-center flex-1 py-1 rounded-xl hover:bg-secondary/50 transition-colors"
          >
            <p className="text-sm font-bold">Ramazon {selectedDay?.day}-kun</p>
            <p className="text-xs text-muted-foreground">{selectedDate}{selectedDate === todayStr ? ' · Bugun' : ''}</p>
          </button>
          <button
            onClick={() => canNext && setSelectedIdx(i => i + 1)}
            disabled={!canNext}
            className="p-2 rounded-xl hover:bg-secondary transition-all duration-200 disabled:opacity-20 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-90"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Progress */}
      <div className="glass-strong rounded-2xl p-4 border border-border/50 mb-5 card-elevated">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-sm font-semibold">Bugungi natija</span>
          <span className={`text-sm font-extrabold ${progress === 100 ? 'text-green-500' : 'text-primary'}`}>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2.5" />
        {progress === 100 && (
          <p className="text-xs text-green-500 font-medium mt-2 text-center animate-fade-in">🎉 Barcha amallar bajarildi!</p>
        )}
      </div>

      {/* Must */}
      <div className="mb-5">
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Farz</h2>
        <div className="glass-strong rounded-2xl border border-border/50 divide-y divide-border/50 card-elevated overflow-hidden">
          {items.filter(i => i.group === 'must').map(item => (
            <label key={item.key} className="flex items-center gap-3.5 px-4 py-4 min-h-[56px] cursor-pointer active:bg-secondary/50 transition-all duration-200">
              <Checkbox checked={state[item.key]} onCheckedChange={() => toggle(item.key)} className="w-5 h-5" />
              <img src={item.emoji} className='w-6 h-6' alt="" />
              <span className={`text-sm font-medium transition-all duration-300 ${state[item.key] ? 'line-through text-muted-foreground' : ''}`}>{item.label}</span>
              {state[item.key] && <span className="ml-auto text-xs text-green-500/80">✓</span>}
            </label>
          ))}
        </div>
      </div>

      {/* Habits */}
      <div>
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Odatlar</h2>
        <div className="glass-strong rounded-2xl border border-border/50 divide-y divide-border/50 card-elevated overflow-hidden">
          {items.filter(i => i.group === 'habit').map(item => (
            <label key={item.key} className="flex items-center gap-3.5 px-4 py-4 min-h-[56px] cursor-pointer active:bg-secondary/50 transition-all duration-200">
              <Checkbox checked={state[item.key]} onCheckedChange={() => toggle(item.key)} className="w-5 h-5" />
              <img src={item.emoji} className='w-6 h-6 ' alt="" />
              <span className={`text-sm font-medium transition-all duration-300 ${state[item.key] ? 'line-through text-muted-foreground' : ''}`}>{item.label}</span>
              {state[item.key] && <span className="ml-auto text-xs text-green-500/80">✓</span>}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}