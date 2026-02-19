import { Heart, Copy } from 'lucide-react';
import { toast } from 'sonner';
import type { Dua } from '@/data/duas';
import { useRef, useState } from 'react';

interface Props {
  dua: Dua;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function DuaCard({ dua, isFavorite, onToggleFavorite }: Props) {
  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => toast.success(`${label} nusxalandi`));
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (!dua.audio) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(dua.audio); 
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
    }
  };
  return (
    <div className="glass-strong rounded-2xl p-5 space-y-4 border border-border/50 card-elevated animate-fade-in transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm tracking-tight">{dua.titleUz}</h3>
        <button
          onClick={onToggleFavorite}
          className="p-2 rounded-full hover:bg-secondary/50 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-200 active:scale-90"
        >
          <Heart
            size={20}
            className={`transition-all duration-300 ${isFavorite ? 'fill-primary text-primary scale-110' : 'text-muted-foreground'}`}
          />
        </button>
      </div>

      <div
        className={`gradient-hero rounded-xl p-5 border border-border/30 relative overflow-hidden group cursor-pointer ${isPlaying ? 'ring-2 ring-primary' : ''}`}
        dir="rtl"
        onClick={playAudio} 
      >
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <p className="text-xl leading-[2.4] text-white relative z-10" style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}>
          {dua.arabic}
        </p>
      </div>

      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1.5">O'qilishi</p>
        <p className="text-sm italic text-foreground/80 leading-relaxed font-medium">{dua.transliteration}</p>
      </div>

      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1.5">Tarjima</p>
        <p className="text-sm text-foreground/80 leading-relaxed font-medium">{dua.translationUz}</p>
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
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass border border-border/50 text-xs font-semibold min-h-[40px] hover:border-primary/30 hover:bg-white/5 active:scale-95 transition-all duration-200"
          >
            <Copy size={13} className="text-primary" /> {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}