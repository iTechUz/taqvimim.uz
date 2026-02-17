import { useRamadan } from '@/context/RamadanContext';
import { useChecklist, type ChecklistState } from '@/hooks/useChecklist';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';

const items: { key: keyof ChecklistState; label: string; group: 'must' | 'habit' }[] = [
  { key: 'roza', label: "Ro'za", group: 'must' },
  { key: 'namoz', label: '5 vaqt namoz', group: 'must' },
  { key: 'quron', label: "Qur'on (10 daq)", group: 'habit' },
  { key: 'zikr', label: 'Zikr / Duo', group: 'habit' },
  { key: 'sadaqa', label: 'Sadaqa', group: 'habit' },
  { key: 'goodDeed', label: 'Yaxshi amal', group: 'habit' },
];

export default function ChecklistPage() {
  const { todayEntry } = useRamadan();
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const { state, toggle, progress } = useChecklist(todayStr);

  return (
    <div className="pb-24 px-4 pt-4 animate-fade-in">
      <h1 className="text-xl font-bold mb-0.5">Kunlik amallar</h1>
      {todayEntry && (
        <p className="text-sm text-muted-foreground mb-4">Ramazon {todayEntry.day}-kun · {todayStr}</p>
      )}

      {/* Progress */}
      <div className="bg-card rounded-2xl p-4 border border-border mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-sm font-medium">Bugungi natija</span>
          <span className="text-sm font-bold text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2.5" />
      </div>

      {/* Must */}
      <div className="mb-5">
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Farz</h2>
        <div className="bg-card rounded-2xl border border-border divide-y divide-border">
          {items.filter(i => i.group === 'must').map(item => (
            <label key={item.key} className="flex items-center gap-3.5 px-4 py-4 min-h-[52px] cursor-pointer active:bg-secondary transition-colors">
              <Checkbox checked={state[item.key]} onCheckedChange={() => toggle(item.key)} className="w-5 h-5" />
              <span className={`text-sm font-medium ${state[item.key] ? 'line-through text-muted-foreground' : ''}`}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Habits */}
      <div>
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Odatlar</h2>
        <div className="bg-card rounded-2xl border border-border divide-y divide-border">
          {items.filter(i => i.group === 'habit').map(item => (
            <label key={item.key} className="flex items-center gap-3.5 px-4 py-4 min-h-[52px] cursor-pointer active:bg-secondary transition-colors">
              <Checkbox checked={state[item.key]} onCheckedChange={() => toggle(item.key)} className="w-5 h-5" />
              <span className={`text-sm font-medium ${state[item.key] ? 'line-through text-muted-foreground' : ''}`}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
