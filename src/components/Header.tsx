import React from 'react';
import { Sparkles, Coins, LogOut, TrendingUp, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  coins: number;
  user: UserProfile;
  onLogout: () => void;
  onOpenCoinInfo?: () => void;
  onOpenBadges?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  coins,
  user,
  onLogout,
  onOpenCoinInfo,
  onOpenBadges,
}) => {
  // Determine youth rank based on coin score
  const getRank = (c: number) => {
    if (c >= 120) return { title: 'Wealth Master', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
    if (c >= 70) return { title: 'Smart Investor', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' };
    if (c >= 40) return { title: 'Budget Pro', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' };
    return { title: 'Money Novice', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
  };

  const rank = getRank(coins);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md transition-all">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
            ₹
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold text-white tracking-tight leading-tight">
                MoneyWise
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sparkles className="w-2.5 h-2.5" /> Youth Edition
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden xs:block">
              Learn. Earn. Grow your money.
            </p>
          </div>
        </div>

        {/* Right side: Rank, Coins, and User info */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Level / Rank badge */}
          <button
            onClick={onOpenBadges}
            title="Click to view all unlocked badges & achievements"
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${rank.color} hover:scale-105 active:scale-95 transition-all cursor-pointer`}
          >
            <TrendingUp className="w-3 h-3" />
            <span>{rank.title}</span>
          </button>

          {/* Coin Badge */}
          <button
            onClick={onOpenCoinInfo}
            id="coin-badge-header"
            title="Your current coins. Earn more by playing mind games!"
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 text-slate-950 font-bold px-3 py-1.5 rounded-full text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Coins className="w-4 h-4 fill-amber-900 text-amber-950 animate-bounce" />
            <span id="coinDisplay" className="font-extrabold">{coins} Coins</span>
          </button>

          {/* User profile & Logout */}
          <div className="flex items-center gap-1.5 pl-1 sm:pl-2 border-l border-slate-800">
            <button
              onClick={onOpenBadges}
              title={`Profile: ${user.name} (View Badges)`}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-200 transition-colors cursor-pointer"
            >
              {user.name.charAt(0).toUpperCase()}
            </button>
            <button
              onClick={onLogout}
              id="logout-button"
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
