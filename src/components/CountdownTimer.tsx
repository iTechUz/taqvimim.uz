interface Props {
  hours: number;
  minutes: number;
  seconds: number;
  label: string;
  status: string;
}

export default function CountdownTimer({ hours, minutes, seconds, label, status }: Props) {
  const pad = (n: number) => n.toString().padStart(2, '0');

  if (status === 'iftor') {
    return (
      <div className="text-center py-5">
        <div className="text-3xl mb-2">🌙</div>
        <div className="text-primary text-xl font-bold animate-pulse-gold">{label}</div>
        <p className="text-muted-foreground mt-1.5 text-sm">Muborak bo'lsin!</p>
      </div>
    );
  }

  return (
    <div className="text-center py-3">
      <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest font-semibold">{label}</p>
      <div className="flex items-center justify-center gap-3">
        {[
          { value: pad(hours), unit: 'soat' },
          { value: pad(minutes), unit: 'daq' },
          { value: pad(seconds), unit: 'son' },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="glass-strong rounded-2xl w-[76px] h-[76px] flex items-center justify-center border border-border/50 glow-sm">
              <span className="text-3xl font-extrabold text-foreground font-mono tracking-tight">{item.value}</span>
            </div>
            <span className="text-[10px] text-muted-foreground mt-2 font-semibold uppercase tracking-wider">{item.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}