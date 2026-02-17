import { useRef } from 'react';
import { Download, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';

interface Props {
  completedDays: number;
  totalDays: number;
  streak: number;
  avgCompletion: number;
}

export default function ShareCard({ completedDays, totalDays, streak, avgCompletion }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const capture = async () => {
    if (!cardRef.current) return null;
    return html2canvas(cardRef.current, { backgroundColor: null, scale: 2 });
  };

  const handleDownload = async () => {
    const canvas = await capture();
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'ramadan-natija.png';
    a.click();
  };

  const handleShare = async () => {
    const canvas = await capture();
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (!blob) { handleDownload(); return; }
      const file = new File([blob], 'ramadan-natija.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Ramazon natijalarim' });
      } else {
        handleDownload();
      }
    });
  };

  return (
    <div>
      <h2 className="text-sm font-semibold mb-3">Ulashish kartasi</h2>

      <div
        ref={cardRef}
        className="rounded-2xl p-6 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(222 47% 10%), hsl(222 47% 20%))',
          color: 'hsl(40 20% 93%)',
        }}
      >
        <p className="text-xs opacity-50 mb-0.5">🌙 iTech Academy</p>
        <h3 className="text-lg font-bold mb-5">Ramazon Natijalarim 2026</h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-2xl font-bold" style={{ color: 'hsl(40 65% 55%)' }}>{completedDays}</p>
            <p className="text-[10px] opacity-50 mt-0.5">kun bajarildi</p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: 'hsl(40 65% 55%)' }}>{streak}🔥</p>
            <p className="text-[10px] opacity-50 mt-0.5">streak</p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: 'hsl(40 65% 55%)' }}>{avgCompletion}%</p>
            <p className="text-[10px] opacity-50 mt-0.5">bajarilish</p>
          </div>
        </div>
        <p className="text-[9px] opacity-30 mt-5">iTech Academy — Ramazon Taqvimi</p>
      </div>

      <div className="flex gap-3 mt-4">
        <button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-sm font-medium min-h-[48px] hover:bg-secondary/80 transition-colors">
          <Download size={16} /> Yuklab olish
        </button>
        <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium min-h-[48px] hover:bg-primary/90 transition-colors">
          <Share2 size={16} /> Ulashish
        </button>
      </div>
    </div>
  );
}
