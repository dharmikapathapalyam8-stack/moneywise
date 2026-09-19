import React from 'react';
import { Home, Gamepad2, BookOpen, Bot, Wallet, Target } from 'lucide-react';
import { NavigationPage } from '../types';

interface BottomNavProps {
  currentPage: NavigationPage;
  onSelectPage: (page: NavigationPage) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  onSelectPage,
}) => {
  const navItems: { id: NavigationPage; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'budget', label: 'Budget', icon: <Wallet className="w-5 h-5" /> },
    { id: 'goals', label: 'Goals', icon: <Target className="w-5 h-5" /> },
    { id: 'games', label: 'Games', icon: <Gamepad2 className="w-5 h-5" /> },
    { id: 'books', label: 'Books', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'ai', label: 'AI', icon: <Bot className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 shadow-2xl">
      <div className="max-w-md md:max-w-xl mx-auto flex items-center justify-around px-2 py-1.5 sm:py-2">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => onSelectPage(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-blue-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-500/15 text-blue-400' : 'text-slate-400'
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[11px] sm:text-xs mt-0.5 tracking-tight truncate">
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-blue-400 mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
