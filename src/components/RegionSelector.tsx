import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { regions } from '@/config/regions';
import { MapPin, Check } from 'lucide-react';
import { useState } from 'react';

interface Props {
  selectedKey: string;
  onSelect: (key: string) => void;
}

export default function RegionSelector({ selectedKey, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const selected = regions.find(r => r.key === selectedKey);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-1.5 text-sm font-semibold text-foreground min-h-[44px] px-3 rounded-xl hover:bg-secondary transition-colors">
          <MapPin size={16} className="text-primary" />
          <span>{selected?.displayNameUz || 'Viloyat'}</span>
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[70vh]">
        <SheetHeader>
          <SheetTitle className="text-left">Viloyatni tanlang</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto mt-4 space-y-0.5 pb-6">
          {regions.map(r => (
            <button
              key={r.key}
              onClick={() => { onSelect(r.key); setOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors min-h-[48px] ${
                r.key === selectedKey ? 'bg-primary/10' : 'hover:bg-secondary'
              }`}
            >
              <span className="font-medium text-sm">{r.displayNameUz}</span>
              {r.key === selectedKey && <Check size={18} className="text-primary" />}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
