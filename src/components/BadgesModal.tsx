import React, { useState } from 'react';
import { Badge } from '../types';
import { Award, Lock, CheckCircle2, ChevronRight, Sparkles, X, Target, Coins } from 'lucide-react';

interface BadgesModalProps {
  badges: Badge[];
  isOpen: boolean;
  onClose: () => void;
  onNavigateToGoals?: () => void;
  onNavigateToGames?: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  badges,
  isOpen,
  onClose,
  onNavigateToGoals,
  onNavigateToGames,
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  if (!isOpen) return null;

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const filteredBadges = badges.filter((b) => {
    if (filter === 'unlocked') return b.unlocked;
    if (filter === 'locked') return !b.unlocked;
    return true;
  });

  const getThemeClasses = (color: Badge['colorTheme'], unlocked: boolean) => {
    if (!unlocked) {
      return {
        card: 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-70',
        badgeIcon: 'bg-slate-800 border-slate-700 text-slate-500 grayscale',
        pill: 'bg-slate-800 text-slate-400 border-slate-700',
        bar: 'bg-slate-700',
      };
    }
    switch (color) {
      case 'emerald':
        return {
          card: 'bg-emerald-950/20 border-emerald-500/30 text-emerald-100 hover:border-emerald-500/50',
          badgeIcon: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 ring-2 ring-emerald-500/20',
          pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          bar: 'bg-emerald-400',
        };
      case 'amber':
        return {
          card: 'bg-amber-950/20 border-amber-500/30 text-amber-100 hover:border-amber-500/50',
          badgeIcon: 'bg-amber-500/20 border-amber-500/40 text-amber-300 ring-2 ring-amber-500/20',
          pill: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          bar: 'bg-amber-400',
        };
      case 'purple':
        return {
          card: 'bg-purple-950/20 border-purple-500/30 text-purple-100 hover:border-purple-500/50',
          badgeIcon: 'bg-purple-500/20 border-purple-500/40 text-purple-300 ring-2 ring-purple-500/20',
          pill: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          bar: 'bg-purple-400',
        };
      case 'indigo':
        return {
          card: 'bg-indigo-950/20 border-indigo-500/30 text-indigo-100 hover:border-indigo-500/50',
          badgeIcon: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300 ring-2 ring-indigo-500/20',
          pill: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
          bar: 'bg-indigo-400',
        };
      case 'teal':
        return {
          card: 'bg-teal-950/20 border-teal-500/30 text-teal-100 hover:border-teal-500/50',
          badgeIcon: 'bg-teal-500/20 border-teal-500/40 text-teal-300 ring-2 ring-teal-500/20',
          pill: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
          bar: 'bg-teal-400',
        };
      case 'blue':
      default:
        return {
          card: 'bg-blue-950/20 border-blue-500/30 text-blue-100 hover:border-blue-500/50',
          badgeIcon: 'bg-blue-500/20 border-blue-500/40 text-blue-300 ring-2 ring-blue-500/20',
          pill: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          bar: 'bg-blue-400',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl text-amber-400">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Achievement Badges
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  {unlockedCount} / {badges.length}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Unlock badges by reaching savings goals and growing your coin stack!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-5 pt-3 pb-2 flex items-center gap-2 border-b border-slate-800/60 bg-slate-950/30">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Badges ({badges.length})
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === 'unlocked'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Unlocked ({unlockedCount})
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === 'locked'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            In Progress ({badges.length - unlockedCount})
          </button>
        </div>

        {/* Badges List */}
        <div className="p-5 space-y-3 overflow-y-auto flex-1">
          {filteredBadges.map((badge) => {
            const theme = getThemeClasses(badge.colorTheme, badge.unlocked);
            const percent = Math.min(100, Math.round((badge.progress / badge.maxProgress) * 100));

            return (
              <div
                key={badge.id}
                id={`badge-card-${badge.id}`}
                className={`p-4 rounded-2xl border transition-all ${theme.card}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl shrink-0 ${theme.badgeIcon}`}
                    >
                      {badge.unlocked ? badge.iconEmoji : '🔒'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white tracking-tight">
                          {badge.title}
                        </h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${theme.pill}`}>
                          {badge.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {badge.description}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                        <span className="font-semibold text-slate-300">Criteria:</span> {badge.requirementText}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    {badge.unlocked ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3 text-slate-500" /> {percent}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                {!badge.unlocked && (
                  <div className="mt-3 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>Progress</span>
                      <span className="font-mono font-bold text-slate-300">
                        {badge.progress} / {badge.maxProgress}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${theme.bar} rounded-full transition-all duration-300`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer shortcuts */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {onNavigateToGoals && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToGoals();
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold border border-emerald-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Target className="w-3.5 h-3.5" /> Add Goal
              </button>
            )}
            {onNavigateToGames && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToGames();
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold border border-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Coins className="w-3.5 h-3.5" /> Earn Coins
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
