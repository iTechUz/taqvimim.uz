import { Heart, Copy, Volume2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Dua } from '@/data/duas';

interface Props {
  dua: Dua;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function DuaCard({ dua, isFavorite, onToggleFavorite }: Props) {
  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => toast.success(`${label} nusxalandi`));
  };

  return (
    <div className="glass-strong rounded-2xl p-5 space-y-4 border border-border/50 card-elevated animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm">{dua.titleUz}</h3>
        <button
          onClick={onToggleFavorite}
          className="p-2 rounded-full hover:bg-secondary min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-200 active:scale-90"
        >
          <Heart
            size={20}
            className={`transition-all duration-300 ${isFavorite ? 'fill-primary text-primary scale-110' : 'text-muted-foreground'}`}
          />
        </button>
      </div>

      <div className="gradient-hero rounded-xl p-5 border border-border/30" dir="rtl">
        <p className="text-xl leading-[2.4] text-foreground" style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}>
          {dua.arabic}
        </p>
      </div>

      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1.5">O'qilishi</p>
        <p className="text-sm italic text-foreground/80 leading-relaxed">{dua.transliteration}</p>
      </div>

      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1.5">Tarjima</p>
        <p className="text-sm text-foreground/80 leading-relaxed">{dua.translationUz}</p>
      </div>

      <div className="flex items-center gap-2 pt-1 flex-wrap">
        {[
          { fn: () => copy(dua.arabic, 'Arabcha'), label: 'Arabcha' },
          { fn: () => copy(dua.transliteration, "O'qilishi"), label: "O'qilishi" },
          { fn: () => copy(dua.translationUz, 'Tarjima'), label: 'Tarjima' },
        ].map(btn => (
          <button
            key={btn.label}
            onClick={btn.fn}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass border border-border/50 text-xs font-semibold min-h-[40px] hover:border-primary/30 active:scale-95 transition-all duration-200"
          >
            <Copy size={13} className="text-primary" /> {btn.label}
          </button>
        ))}
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/10 text-primary text-sm font-semibold min-h-[48px] hover:bg-primary/15 active:scale-[0.98] transition-all duration-200 border border-primary/10">
        <Volume2 size={16} /> Tinglash
      </button>
    </div>
  );
}