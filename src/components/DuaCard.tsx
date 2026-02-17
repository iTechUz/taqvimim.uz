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
    <div className="bg-card rounded-2xl p-4 space-y-3 border border-border animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">{dua.titleUz}</h3>
        <button
          onClick={onToggleFavorite}
          className="p-2 rounded-full hover:bg-secondary min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
        >
          <Heart size={18} className={isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'} />
        </button>
      </div>

      <div className="bg-secondary/60 rounded-xl p-4" dir="rtl">
        <p className="text-xl leading-[2.2] text-foreground" style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}>
          {dua.arabic}
        </p>
      </div>

      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">O'qilishi</p>
        <p className="text-sm italic text-foreground/80 leading-relaxed">{dua.transliteration}</p>
      </div>

      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Tarjima</p>
        <p className="text-sm text-foreground/80 leading-relaxed">{dua.translationUz}</p>
      </div>

      <div className="flex items-center gap-2 pt-1 flex-wrap">
        <button onClick={() => copy(dua.arabic, 'Arabcha')} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary text-xs font-medium min-h-[40px] hover:bg-secondary/80 transition-colors">
          <Copy size={13} /> Arabcha
        </button>
        <button onClick={() => copy(dua.transliteration, "O'qilishi")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary text-xs font-medium min-h-[40px] hover:bg-secondary/80 transition-colors">
          <Copy size={13} /> O'qilishi
        </button>
        <button onClick={() => copy(dua.translationUz, 'Tarjima')} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary text-xs font-medium min-h-[40px] hover:bg-secondary/80 transition-colors">
          <Copy size={13} /> Tarjima
        </button>
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-medium min-h-[44px] hover:bg-primary/15 transition-colors">
        <Volume2 size={16} /> Tinglash
      </button>
    </div>
  );
}
