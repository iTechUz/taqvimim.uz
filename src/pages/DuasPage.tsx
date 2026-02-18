import { useState } from 'react';
import { duas } from '@/data/duas';
import DuaCard from '@/components/DuaCard';
import PageHeader from '@/components/PageHeader';

const tabs = [
  { key: 'saharlik', label: 'Saharlik' },
  { key: 'iftor', label: 'Iftorlik' },
  { key: 'favorites', label: '♡ Sevimlilar' },
];

export default function DuasPage() {
  const [tab, setTab] = useState('saharlik');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('favorite_duas') || '[]'); } catch { return []; }
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('favorite_duas', JSON.stringify(next));
      return next;
    });
  };

  const filtered = tab === 'favorites'
    ? duas.filter(d => favorites.includes(d.id))
    : duas.filter(d => d.category === tab);

  return (
    <div className="pb-24 px-4 pt-4 animate-fade-in">
      <PageHeader title="Duolar" />

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[40px] whitespace-nowrap ${tab === t.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map(dua => (
            <DuaCard
              key={dua.id}
              dua={dua}
              isFavorite={favorites.includes(dua.id)}
              onToggleFavorite={() => toggleFavorite(dua.id)}
            />
          ))
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-3xl mb-2">♡</p>
            <p className="font-medium">Sevimli duolar yo'q</p>
            <p className="text-sm mt-1">♡ belgisini bosib qo'shing</p>
          </div>
        )}
      </div>
    </div>
  );
}
