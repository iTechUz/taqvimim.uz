import { useRamadan } from '@/context/RamadanContext';
import { useCountdown } from '@/hooks/useCountdown';
import CountdownTimer from '@/components/CountdownTimer';
import RegionSelector from '@/components/RegionSelector';
import StatusChip from '@/components/StatusChip';
import { Settings, BookOpen, CheckSquare, Calendar, Loader2, WifiOff, Sparkles, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 5) return 'Xayrli tun 🌙';
  if (h < 12) return 'Xayrli tong ☀️';
  if (h < 17) return 'Xayrli kun 🌤';
  if (h < 21) return 'Xayrli kech 🌅';
  return 'Xayrli tun 🌙';
}

export default function Home() {
  const { regionKey, setRegionKey, timetable, loading, error, todayEntry } = useRamadan();
  const countdown = useCountdown(todayEntry?.saharlik, todayEntry?.iftor);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pb-20">
        <div className="text-center animate-fade-in">
          <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center mx-auto glow-primary animate-glow-pulse">
            <Moon className="w-7 h-7 text-primary-foreground" />
          </div>
          <p className="text-muted-foreground mt-4 text-sm font-medium">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error && timetable.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen pb-20 px-6">
        <div className="text-center animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto">
            <WifiOff className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-foreground font-semibold mt-4">{error}</p>
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
          className="p-2.5 rounded-xl hover:bg-secondary transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
        >
          <Settings size={20} className="text-muted-foreground" />
        </button>
      </div>

      {/* Greeting */}
      <p className="text-sm text-muted-foreground mt-1 mb-3 px-0.5">{getGreeting()}</p>

      {/* Hero Card */}
      {todayEntry ? (
        <div className="gradient-hero rounded-3xl p-5 border border-primary/10 shimmer card-elevated relative overflow-hidden">
          <div className="absolute top-3 right-3 opacity-10">
            <Sparkles className="w-20 h-20 text-primary" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-lg font-bold text-foreground">Ramazon — {todayEntry.day}-kun</h1>
              {countdown && <StatusChip status={countdown.status} />}
            </div>
            <p className="text-sm text-muted-foreground">{todayEntry.dateGregorian} · {todayEntry.dateHijri}</p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="glass rounded-2xl p-3.5 text-center border border-border/50">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Saharlik</p>
                <p className="text-2xl font-extrabold tracking-tight">{todayEntry.saharlik}</p>
              </div>
              <div className="glass rounded-2xl p-3.5 text-center border border-primary/20 glow-sm">
                <p className="text-[10px] text-primary uppercase tracking-wider font-semibold mb-1">Iftor</p>
                <p className="text-2xl font-extrabold text-primary tracking-tight">{todayEntry.iftor}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="gradient-hero rounded-3xl p-6 border border-primary/10 text-center shimmer card-elevated">
          <div className="text-4xl mb-3">🌙</div>
          <p className="text-lg font-bold mb-1">Ramazon taqvimi</p>
          <p className="text-sm text-muted-foreground">
            {timetable.length > 0
              ? `Ramazon ${timetable[0].dateGregorian} dan boshlanadi`
              : "Ma'lumot topilmadi"}
          </p>
        </div>
      )}

      {/* Countdown */}
      {countdown && (
        <div className="glass-strong rounded-2xl p-4 border border-border/50 mt-3 card-elevated animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <CountdownTimer {...countdown} />
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { icon: BookOpen, label: 'Duolar', path: '/duas', emoji: '📖' },
          { icon: CheckSquare, label: 'Amallar', path: '/checklist', emoji: '✅' },
          { icon: Calendar, label: 'Taqvim', path: '/calendar', emoji: '📅' },
        ].map((action, i) => (
          <button
            key={action.path}
            onClick={() => navigate(action.path)}
            className="glass-strong rounded-2xl p-4 border border-border/50 flex flex-col items-center gap-2 min-h-[88px] hover:border-primary/30 active:scale-95 transition-all duration-200 card-elevated animate-fade-in-up"
            style={{ animationDelay: `${0.15 + i * 0.05}s`, animationFillMode: 'both' }}
          >
            <span className="text-2xl">{action.emoji}</span>
            <span className="text-xs font-semibold">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Motivational quote */}
      <div className="mt-6 glass rounded-2xl p-4 border border-border/30 animate-fade-in-up" style={{ animationDelay: '0.35s', animationFillMode: 'both' }}>
        <p className="text-sm text-center text-muted-foreground italic leading-relaxed">
          "Ro'za tutgan kishi iftorlik qilganida uning duosi rad etilmaydi."
        </p>
        <p className="text-[10px] text-center text-muted-foreground/60 mt-1.5">— Hadis</p>
      </div>

      <p className="text-center text-[11px] text-muted-foreground mt-6 opacity-40">
        🌙 iTech Academy — Ramazon Taqvimi 2026
      </p>
    </div>
  );
}