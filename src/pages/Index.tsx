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

  if (loading && !todayEntry) {
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

  const isRamadan = todayEntry && timetable.some(d => d.dateGregorian === todayEntry.dateGregorian);

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
      {isRamadan ? (
        <div className="gradient-hero rounded-3xl p-5 border border-primary/10 shimmer card-elevated relative overflow-hidden">
          <div className="absolute top-3 right-3 opacity-10">
            <Sparkles className="w-20 h-20 text-primary" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-lg font-bold text-white">Ramazon — {todayEntry.day}-kun</h1>
              {countdown && <StatusChip status={countdown.status} />}
            </div>
            <p className="text-sm text-white/80">{todayEntry.dateGregorian} · {todayEntry.dateHijri}</p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="glass rounded-2xl p-3.5 text-center border border-white/10 bg-white/10 backdrop-blur-md">
                <p className="text-[10px] text-white/70 uppercase tracking-wider font-semibold mb-1">Saharlik</p>
                <p className="text-2xl font-extrabold tracking-tight text-white">{todayEntry.saharlik}</p>
              </div>
              <div className="glass rounded-2xl p-3.5 text-center border border-white/20 bg-white/10 backdrop-blur-md glow-sm">
                <p className="text-[10px] text-white uppercase tracking-wider font-semibold mb-1">Iftor</p>
                <p className="text-2xl font-extrabold text-white tracking-tight">{todayEntry.iftor}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="gradient-hero rounded-3xl p-6 border border-white/10 text-center shimmer card-elevated">
          <div className="text-4xl mb-3">🌙</div>
          <p className="text-lg font-bold mb-1 text-white">Ramazon yaqinlashmoqda</p>
          <p className="text-sm text-white/80">
            {timetable.length > 0
              ? `Ramazon 2026-yil ${timetable[0].day === 1 ? '19-fevraldan' : timetable[0].dateGregorian + ' dan'} boshlanadi`
              : "Taqvim yuklanmoqda..."}
          </p>
        </div>
      )}

      {/* Countdown (Only if Ramadan) */}
      {isRamadan && countdown && (
        <div className="glass-strong rounded-2xl p-4 border border-border/50 mt-3 card-elevated animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <CountdownTimer {...countdown} />
        </div>
      )}

      {/* Today's All Timings (Always show if available) */}
      {todayEntry && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              Bugungi namoz vaqtlari
            </h2>
            <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full font-bold">
              {todayEntry.dateGregorian}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Bomdod', time: todayEntry.tong_saharlik, icon: '🌅' },
              { label: 'Quyosh', time: todayEntry.quyosh, icon: '⛅' },
              { label: 'Peshin', time: todayEntry.peshin, icon: '📖' },
              { label: 'Asr', time: todayEntry.asr, icon: '🕋' },
              { label: 'Shom', time: todayEntry.shom_iftor, icon: '🌙' },
              { label: 'Xufton', time: todayEntry.hufton, icon: '✨' },
            ].map((t, i) => (
              <div
                key={t.label}
                className="glass-strong rounded-2xl p-3 border border-border/40 flex items-center justify-between hover:border-primary/20 transition-all animate-fade-in-up"
                style={{ animationDelay: `${0.2 + i * 0.05}s`, animationFillMode: 'both' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{t.icon}</span>
                  <span className="text-xs font-semibold text-muted-foreground">{t.label}</span>
                </div>
                <span className="text-sm font-bold font-mono text-primary">{t.time}</span>
              </div>
            ))}
          </div>
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
            style={{ animationDelay: `${0.5 + i * 0.05}s`, animationFillMode: 'both' }}
          >
            <span className="text-2xl">{action.emoji}</span>
            <span className="text-xs font-semibold">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Motivational quote */}
      <div className="mt-6 glass rounded-2xl p-4 border border-border/30 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
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