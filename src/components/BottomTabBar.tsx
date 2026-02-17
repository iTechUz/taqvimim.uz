import { Home, Calendar, BookOpen, CheckSquare, BarChart3 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { path: '/', icon: Home, label: 'Bosh sahifa' },
  { path: '/calendar', icon: Calendar, label: 'Taqvim' },
  { path: '/duas', icon: BookOpen, label: 'Duolar' },
  { path: '/checklist', icon: CheckSquare, label: 'Amallar' },
  { path: '/progress', icon: BarChart3, label: 'Natija' },
];

export default function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/settings') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-1">
        {tabs.map(tab => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[48px] rounded-xl transition-all duration-200 ${
                active ? 'text-primary scale-105' : 'text-muted-foreground active:scale-95'
              }`}
            >
              <tab.icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span className={`text-[10px] ${active ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
