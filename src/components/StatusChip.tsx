interface Props {
  status: 'saharlik' | 'fasting' | 'iftor';
}

const config: Record<string, { text: string; className: string }> = {
  saharlik: { text: 'Saharlik vaqti', className: 'bg-primary/15 text-primary' },
  fasting: { text: "Ro'za vaqti", className: 'bg-secondary text-secondary-foreground' },
  iftor: { text: 'Iftor vaqti', className: 'bg-primary/20 text-primary animate-pulse-gold' },
};

export default function StatusChip({ status }: Props) {
  const c = config[status] || config.fasting;
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${c.className}`}>
      {c.text}
    </span>
  );
}
