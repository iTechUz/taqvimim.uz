import { useRamadan } from '@/context/RamadanContext';
import { regions } from '@/config/regions';
import { useTheme } from 'next-themes';
import { Check, Moon, Sun, Bell, Info, ChevronLeft } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const { regionKey, setRegionKey } = useRamadan();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="pb-10 px-4 pt-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-secondary min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors">
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-xl font-bold">Sozlamalar</h1>
      </div>

      {/* Region */}
      <div className="mb-6">
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Viloyat</h2>
        <div className="bg-card rounded-2xl border border-border divide-y divide-border max-h-[280px] overflow-y-auto">
          {regions.map(r => (
            <button
              key={r.key}
              onClick={() => setRegionKey(r.key)}
              className={`w-full flex items-center justify-between px-4 py-3 min-h-[48px] transition-colors ${
                r.key === regionKey ? 'bg-primary/10' : 'hover:bg-secondary active:bg-secondary'
              }`}
            >
              <span className="text-sm font-medium">{r.displayNameUz}</span>
              {r.key === regionKey && <Check size={16} className="text-primary" />}
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
            <div>
              <p className="text-sm leading-relaxed">Vaqtlar astronomik hisob-kitob asosida Aladhan API orqali olingan. Aniqlik uchun mahalliy masjid vaqtlarini tekshiring.</p>
              <p className="text-xs text-muted-foreground mt-3">iTech Academy © 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
