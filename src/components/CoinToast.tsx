import React, { useEffect } from 'react';
import { Coins, Sparkles } from 'lucide-react';

interface CoinToastProps {
  notification: {
    amount: number;
    reason: string;
  } | null;
  onClose: () => void;
}

export const CoinToast: React.FC<CoinToastProps> = ({ notification, onClose }) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        onClose();
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification) return null;

  const isPositive = notification.amount > 0;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce">
      <div className={`px-4 py-2 rounded-full border shadow-2xl backdrop-blur-md flex items-center gap-2 ${
        isPositive
          ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-amber-500/30'
          : 'bg-rose-500 text-white border-rose-400 shadow-rose-500/30'
      }`}>
        <Coins className="w-4 h-4 fill-current" />
        <span className="font-extrabold text-xs sm:text-sm font-mono">
          {isPositive ? `+${notification.amount}` : notification.amount} Coins!
        </span>
        <span className="text-xs font-semibold opacity-90 hidden sm:inline">
          • {notification.reason}
        </span>
      </div>
    </div>
  );
};
