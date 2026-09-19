import React, { useState } from 'react';
import { Transaction, Goal, NavigationPage, Badge, UserProfile } from '../types';
import { DailyQuote } from '../data/dailyQuotes';
import { DailyQuoteCard } from './DailyQuoteCard';
import { BadgesModal } from './BadgesModal';
import { FinancialTipModal } from './FinancialTipModal';
import { getDailyFinancialTip } from '../data/financialTips';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  PlusCircle,
  Target,
  Gamepad2,
  Bot,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Coins,
  Award,
  CheckCircle2,
  Lock,
  BookOpen,
  Lightbulb,
} from 'lucide-react';

interface DashboardViewProps {
  balance: number;
  coins: number;
  transactions: Transaction[];
  goals: Goal[];
  user: UserProfile;
  badges: Badge[];
  dailyQuote: DailyQuote;
  onRefreshQuote?: () => void;
  onNavigate: (page: NavigationPage) => void;
  onOpenAddTransaction: () => void;
  onDeleteTransaction: (id: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  balance,
  coins,
  transactions,
  goals,
  user,
  badges,
  dailyQuote,
  onRefreshQuote,
  onNavigate,
  onOpenAddTransaction,
  onDeleteTransaction,
}) => {
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const todayTip = getDailyFinancialTip();

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const recentTransactions = transactions.slice(0, 5);

  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;
  const completedGoalsCount = goals.filter((g) => g.saved >= g.target && g.target > 0).length;

  return (
    <div id="dashboard" className="space-y-4">
      {/* 1. DAILY QUOTE OF THE DAY (LIFE & MONEY) */}
      <DailyQuoteCard
        quote={dailyQuote}
        onRefreshQuote={onRefreshQuote}
        onOpenTip={() => setShowTipModal(true)}
      />

      {/* 2. AVAILABLE BALANCE HERO CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-6 text-white shadow-xl shadow-emerald-950/30">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-100/90 uppercase">
              Available Balance
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md text-white border border-white/20">
              <TrendingUp className="w-3.5 h-3.5" /> Live Cashflow
            </span>
          </div>

          <div
            id="totalBalance"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2 mb-4 drop-shadow-sm font-mono"
          >
            ₹{balance.toLocaleString('en-IN')}
          </div>

          {/* Mini income vs expense stats */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-500/40 text-xs">
            <div className="flex items-center gap-2 bg-emerald-900/30 backdrop-blur-sm px-3 py-2 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-300">
                <ArrowDownLeft className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[10px] text-emerald-200/80">Total Inflow</p>
                <p className="font-bold text-white">₹{totalIncome.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-900/30 backdrop-blur-sm px-3 py-2 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-rose-400/20 flex items-center justify-center text-rose-300">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[10px] text-emerald-200/80">Total Outflow</p>
                <p className="font-bold text-white">₹{totalExpense.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background glow circle */}
        <div className="absolute -right-8 -bottom-10 w-44 h-44 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
      </div>

      {/* 3. USER PROFILE BADGES & ACHIEVEMENTS SHOWCASE */}
      <div
        id="achievements-section"
        className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide flex items-center gap-1.5">
                Unlocked Achievements
                <span className="text-[11px] px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 font-mono">
                  {unlockedBadgesCount}/{badges.length}
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={() => setShowBadgesModal(true)}
            id="view-all-badges-btn"
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
          >
            All Badges <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Badges Horizontal Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {badges.slice(0, 4).map((badge) => {
            const isUnlocked = badge.unlocked;
            return (
              <div
                key={badge.id}
                onClick={() => setShowBadgesModal(true)}
                className={`p-3 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-slate-800/80 border-slate-700/80 hover:border-amber-500/40 hover:bg-slate-800'
                    : 'bg-slate-900/40 border-slate-800/60 opacity-60 hover:opacity-80'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-xl">
                    {isUnlocked ? badge.iconEmoji : '🔒'}
                  </span>
                  {isUnlocked ? (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                      Earned
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-mono">
                      {badge.progress}/{badge.maxProgress}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white truncate">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                    {badge.requirementText}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick progress stats */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <strong className="text-slate-200">{coins}</strong> Coins
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <strong className="text-slate-200">{completedGoalsCount}</strong> Goals Reached
            </span>
          </div>

          <button
            onClick={() => setShowBadgesModal(true)}
            className="text-[11px] text-slate-400 hover:text-slate-200 underline cursor-pointer"
          >
            How to earn more badges
          </button>
        </div>
      </div>

      {/* 4. QUICK ACTIONS */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg">
        <h2 className="text-xs sm:text-sm font-bold text-slate-300 tracking-wide uppercase mb-3 flex items-center gap-2">
          <span>⚡</span> Quick Actions
        </h2>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onNavigate('budget')}
            id="btn-quick-add-transaction"
            className="flex flex-col items-start justify-center p-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white transition-all shadow-md shadow-blue-600/20 cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              <PlusCircle className="w-4 h-4" />
              <span className="font-bold text-xs sm:text-sm">+ Transaction</span>
            </div>
            <span className="text-[11px] text-blue-100 font-normal">
              Log income or expense
            </span>
          </button>

          <button
            onClick={() => onNavigate('goals')}
            id="btn-quick-set-goal"
            className="flex flex-col items-start justify-center p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 active:scale-[0.98] text-white border border-slate-700 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-xs sm:text-sm">Savings Goal</span>
            </div>
            <span className="text-[11px] text-slate-400 font-normal">
              Save for tech or college
            </span>
          </button>
        </div>

        {/* Secondary row of quick interactive shortcuts (Financial Tip of the Day, Games, Books, AI) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-2.5">
          <button
            onClick={() => setShowTipModal(true)}
            id="btn-financial-tip-of-day"
            title="Open Financial Tip of the Day"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/10 hover:from-amber-500/30 hover:to-amber-600/20 text-amber-300 text-xs font-semibold border border-amber-500/30 hover:border-amber-400/50 shadow-sm shadow-amber-950/20 transition-all cursor-pointer"
          >
            <Lightbulb className="w-4 h-4 fill-amber-400 text-amber-300 shrink-0" />
            <span className="truncate">Financial Tip</span>
          </button>

          <button
            onClick={() => onNavigate('games')}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 text-xs font-semibold border border-indigo-800/40 transition-all cursor-pointer"
          >
            <span className="text-base">🛡️</span>
            <span className="truncate">Survival Game</span>
          </button>

          <button
            onClick={() => onNavigate('books')}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-950/40 hover:bg-teal-900/50 text-teal-300 text-xs font-semibold border border-teal-800/40 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-teal-400 shrink-0" />
            <span className="truncate">Money Books</span>
          </button>

          <button
            onClick={() => onNavigate('ai')}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 text-xs font-semibold border border-purple-800/40 transition-all cursor-pointer"
          >
            <Bot className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="truncate">AI Coach</span>
          </button>
        </div>
      </div>

      {/* 5. MIND GAMES & BADGE CHALLENGE HIGHLIGHT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Mind Game Spotlight */}
        <div
          onClick={() => onNavigate('games')}
          className="bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-500/30 hover:border-indigo-400/60 p-4 rounded-2xl shadow-lg cursor-pointer transition-all group flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                  30-Day Life Survival Simulation
                </span>
                <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 font-bold rounded-full">
                  MIND GAME
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                Experience why money equals freedom, health & dignity.
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* Master Saver & Badges Spotlight */}
        <div
          onClick={() => setShowBadgesModal(true)}
          className="bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/30 hover:border-amber-400/60 p-4 rounded-2xl shadow-lg cursor-pointer transition-all group flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                  Master Saver & Budget Pro Badges
                </span>
                <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 font-bold rounded-full">
                  REWARDS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                {unlockedBadgesCount} unlocked • Reach goals & coins to claim all 8!
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* 6. SAVINGS GOALS PREVIEW (IF ANY) */}
      {goals.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wide flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" /> Active Goals ({goals.length})
            </h2>
            <button
              onClick={() => onNavigate('goals')}
              className="text-xs text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {goals.slice(0, 2).map((goal) => {
              const percent = Math.min(100, Math.round((goal.saved / goal.target) * 100));
              const isCompleted = goal.saved >= goal.target && goal.target > 0;
              return (
                <div
                  key={goal.id}
                  className="p-3 bg-slate-800/70 border border-slate-700/60 rounded-xl"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-white truncate mr-2 flex items-center gap-1.5">
                      {goal.category} {goal.name}
                      {isCompleted && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-bold">
                          Achieved!
                        </span>
                      )}
                    </span>
                    <span className="text-slate-300 font-mono font-bold shrink-0">
                      ₹{goal.saved.toLocaleString('en-IN')} / ₹{goal.target.toLocaleString('en-IN')} ({percent}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-700/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. RECENT TRANSACTIONS */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wide flex items-center gap-2">
            <span>🕒</span> Recent Transactions
          </h2>
          {transactions.length > 0 && (
            <button
              onClick={() => onNavigate('budget')}
              className="text-xs text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
            >
              Full Ledger <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div id="recentList" className="divide-y divide-slate-800/80">
          {recentTransactions.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              <Wallet className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-60" />
              <p className="font-medium">No transactions yet</p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Log an allowance or snack expense to start tracking!
              </p>
              <button
                onClick={() => onNavigate('budget')}
                className="mt-3 px-3 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-semibold hover:bg-blue-600/30 transition-all cursor-pointer"
              >
                + Add First Transaction
              </button>
            </div>
          ) : (
            recentTransactions.map((t) => {
              const isIncome = t.type === 'income';
              return (
                <div
                  key={t.id}
                  className="flex items-center justify-between py-3 group hover:bg-slate-800/30 px-1 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isIncome
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {isIncome ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
                        {t.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <span className="text-slate-400">{t.category}</span>
                        <span>•</span>
                        <span>{t.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p
                      className={`text-xs sm:text-sm font-bold font-mono ${
                        isIncome ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isIncome ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Badges Modal */}
      <BadgesModal
        badges={badges}
        isOpen={showBadgesModal}
        onClose={() => setShowBadgesModal(false)}
        onNavigateToGoals={() => onNavigate('goals')}
        onNavigateToGames={() => onNavigate('games')}
      />

      {/* Financial Tip of the Day Dialog */}
      <FinancialTipModal
        isOpen={showTipModal}
        onClose={() => setShowTipModal(false)}
        initialTip={todayTip}
      />
    </div>
  );
};
