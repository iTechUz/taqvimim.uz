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
      <div className="text-center py-6">
        <div className="text-primary text-2xl font-bold animate-pulse-gold">{label}</div>
        <p className="text-muted-foreground mt-1 text-sm">Muborak bo'lsin! 🌙</p>
      </div>
    );
  }

  return (
    <div className="text-center py-4">
      <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-semibold">{label}</p>
      <div className="flex items-center justify-center gap-2.5">
        {[
          { value: pad(hours), unit: 'soat' },
          { value: pad(minutes), unit: 'daq' },
          { value: pad(seconds), unit: 'son' },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="bg-secondary rounded-2xl w-[72px] h-[72px] flex items-center justify-center border border-border">
              <span className="text-3xl font-bold text-foreground font-mono tracking-tight">{item.value}</span>
            </div>
            <span className="text-[10px] text-muted-foreground mt-1.5 font-medium">{item.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
