import { useRamadan } from '@/context/RamadanContext';
import { useCountdown } from '@/hooks/useCountdown';
import CountdownTimer from '@/components/CountdownTimer';
import RegionSelector from '@/components/RegionSelector';
import StatusChip from '@/components/StatusChip';
import { Settings, BookOpen, CheckSquare, Calendar, Loader2, WifiOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { regionKey, setRegionKey, timetable, loading, error, todayEntry } = useRamadan();
  const countdown = useCountdown(todayEntry?.saharlik, todayEntry?.iftor);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pb-20">
        <div className="text-center animate-fade-in">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground mt-3 text-sm">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error && timetable.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen pb-20 px-6">
        <div className="text-center animate-fade-in">
          <WifiOff className="w-10 h-10 text-muted-foreground mx-auto" />
          <p className="text-foreground font-medium mt-3">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 px-4 pt-2 animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between py-2">
        <RegionSelector selectedKey={regionKey} onSelect={setRegionKey} />
        <button
          onClick={() => navigate('/settings')}
          className="p-2.5 rounded-xl hover:bg-secondary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <Settings size={20} className="text-muted-foreground" />
        </button>
      </div>

      {/* Ramadan Day Card */}
      {todayEntry ? (
        <div className="bg-card rounded-2xl p-5 border border-border mt-2">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-lg font-bold">Ramazon — {todayEntry.day}-kun</h1>
            {countdown && <StatusChip status={countdown.status} />}
          </div>
          <p className="text-sm text-muted-foreground">{todayEntry.dateGregorian} · {todayEntry.dateHijri}</p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-secondary rounded-xl p-3.5 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Saharlik</p>
              <p className="text-2xl font-bold tracking-tight">{todayEntry.saharlik}</p>
            </div>
            <div className="bg-secondary rounded-xl p-3.5 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Iftor</p>
              <p className="text-2xl font-bold text-primary tracking-tight">{todayEntry.iftor}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-2xl p-5 border border-border mt-2 text-center">
          <p className="text-lg font-bold mb-1">🌙 Ramazon taqvimi</p>
          <p className="text-sm text-muted-foreground">
            {timetable.length > 0
              ? `Ramazon ${timetable[0].dateGregorian} dan boshlanadi`
              : "Ma'lumot topilmadi"}
          </p>
        </div>
      )}

      {/* Countdown */}
      {countdown && (
        <div className="bg-card rounded-2xl p-4 border border-border mt-3">
          <CountdownTimer {...countdown} />
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { icon: BookOpen, label: 'Duolar', path: '/duas' },
          { icon: CheckSquare, label: 'Amallar', path: '/checklist' },
          { icon: Calendar, label: 'Taqvim', path: '/calendar' },
        ].map(action => (
          <button
            key={action.path}
            onClick={() => navigate(action.path)}
            className="bg-card rounded-2xl p-4 border border-border flex flex-col items-center gap-2 min-h-[80px] hover:bg-secondary active:scale-95 transition-all"
          >
            <action.icon size={22} className="text-primary" />
            <span className="text-xs font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      <p className="text-center text-[11px] text-muted-foreground mt-8 opacity-60">
        🌙 iTech Academy — Ramazon Taqvimi 2026
      </p>
    </div>
  );
}
