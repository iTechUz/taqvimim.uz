import { useRamadan } from '@/context/RamadanContext';
import { regions } from '@/config/regions';
import { useTheme } from 'next-themes';
import { Check, Moon, Sun, Bell, Info, ChevronLeft } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

export default function SettingsPage() {
  const { regionKey, setRegionKey } = useRamadan();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="pb-10 px-4 pt-4 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-secondary min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors">
            <ChevronLeft size={22} />
          </button>
          <h1 className="text-xl font-bold">Sozlamalar</h1>
        </div>
        <ThemeToggle />
      </div>

      {/* Region */}
      <div className="mb-6">
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Viloyat</h2>
        <div className="bg-card rounded-2xl border border-border divide-y divide-border max-h-[400px] overflow-y-auto card-elevated">
          {regions.map(r => (
            <button
              key={r.key}
              onClick={() => setRegionKey(r.key)}
              className={`w-full flex items-center justify-between px-4 py-4 min-h-[56px] transition-all duration-200 ${r.key === regionKey ? 'bg-primary/10 text-primary' : 'hover:bg-secondary active:bg-secondary/50'
                }`}
            >
              <span className="text-sm font-semibold">{r.displayNameUz}</span>
              {r.key === regionKey && <Check size={18} className="text-primary" />}
            </button>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div className="mb-6">
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Ko'rinish</h2>
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between min-h-[44px]">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon size={18} className="text-primary" /> : <Sun size={18} className="text-primary" />}
              <span className="text-sm font-medium">Tungi rejim</span>
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={c => setTheme(c ? 'dark' : 'light')} />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="mb-6">
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Bildirishnomalar</h2>
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between min-h-[44px]">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-muted-foreground" />
              <div>
                <span className="text-sm font-medium">Eslatmalar</span>
                <p className="text-[11px] text-muted-foreground">Tez kunda qo'shiladi</p>
              </div>
            </div>
            <Switch disabled />
          </div>
        </div>
      </div>

      {/* About */}
      <div>
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Ma'lumot</h2>
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-start gap-3">
            <Info size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm leading-relaxed mb-3">Vaqtlar astronomik hisob-kitob asosida olingan. Aniqlik uchun mahalliy masjid vaqtlarini tekshiring.</p>

              <a
                href="https://t.me/shohjahon_asqarov"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-xs">✉️</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Dasturchi bilan bog'lanish</p>
                  <p className="text-[10px] text-muted-foreground">Telegram: @shohjahon_asqarov</p>
                </div>
              </a>

              <p className="text-[10px] text-muted-foreground/50 mt-4">iTech Academy © 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
