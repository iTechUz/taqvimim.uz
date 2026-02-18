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
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] flex flex-col p-0">
        <div className="p-6 pb-2">
          <SheetHeader>
            <SheetTitle className="text-left font-bold">Viloyatni tanlang</SheetTitle>
          </SheetHeader>
        </div>
        <div className="overflow-y-auto px-6 pb-8 space-y-1">
          {regions.map(r => (
            <button
              key={r.key}
              onClick={() => { onSelect(r.key); setOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-200 min-h-[56px] active:scale-95 ${r.key === selectedKey
                  ? 'bg-primary/15 text-primary border border-primary/20'
                  : 'hover:bg-secondary active:bg-secondary/80 border border-transparent'
                }`}
            >
              <span className="font-semibold text-sm">{r.displayNameUz}</span>
              {r.key === selectedKey && <Check size={18} className="text-primary" />}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
