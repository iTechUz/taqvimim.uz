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
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around h-[68px] max-w-lg mx-auto px-1">
        {tabs.map(tab => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`relative flex flex-col items-center justify-center gap-1 min-w-[60px] min-h-[50px] rounded-2xl transition-all duration-300 ${
                active ? 'text-primary' : 'text-muted-foreground active:scale-90'
              }`}
            >
              {active && (
                <span className="absolute -top-1 w-8 h-1 rounded-full bg-primary glow-sm" />
              )}
              <tab.icon size={22} strokeWidth={active ? 2.5 : 1.8} className="transition-all duration-200" />
              <span className={`text-[10px] transition-all duration-200 ${active ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}