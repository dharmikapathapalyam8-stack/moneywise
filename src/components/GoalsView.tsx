import React, { useState } from 'react';
import { Goal } from '../types';
import {
  Target,
  PlusCircle,
  Coins,
  CheckCircle2,
  Trash2,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

interface GoalsViewProps {
  goals: Goal[];
  balance: number;
  onAddGoal: (name: string, target: number, category: string) => void;
  onDepositToGoal: (goalId: string, amount: number) => void;
  onDeleteGoal: (goalId: string) => void;
  onCompleteGoal?: (goalId: string) => void;
}

const GOAL_PRESETS = [
  { name: 'Emergency Fund', amount: 5000, category: '🛡️' },
  { name: 'New Laptop', amount: 45000, category: '💻' },
  { name: 'Coding / Skill Course', amount: 3000, category: '🎓' },
  { name: 'Concert & Trip', amount: 6000, category: '🎸' },
];

export const GoalsView: React.FC<GoalsViewProps> = ({
  goals,
  balance,
  onAddGoal,
  onDepositToGoal,
  onDeleteGoal,
}) => {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎯');
  const [depositGoalId, setDepositGoalId] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(goalAmount);
    if (!goalName.trim()) {
      alert('Please enter a goal name');
      return;
    }
    if (isNaN(parsed) || parsed <= 0) {
      alert('Please enter a valid target amount in ₹');
      return;
    }

    onAddGoal(goalName.trim(), parsed, selectedEmoji);
    setGoalName('');
    setGoalAmount('');
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositGoalId) return;
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid deposit amount');
      return;
    }

    onDepositToGoal(depositGoalId, amount);
    setDepositGoalId(null);
    setDepositAmount('');
  };

  return (
    <div id="goals" className="space-y-4">
      {/* CREATE SAVINGS GOAL CARD */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg">
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-emerald-400" /> Create Savings Goal
        </h2>

        {/* Quick presets for students */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 text-xs scrollbar-none">
          <span className="text-slate-500 text-[11px] shrink-0 font-medium">
            Ideas:
          </span>
          {GOAL_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                setGoalName(preset.name);
                setGoalAmount(preset.amount.toString());
                setSelectedEmoji(preset.category);
              }}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700/80 text-slate-300 rounded-lg shrink-0 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{preset.category}</span>
              <span>{preset.name}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleCreate} className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-3">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Goal Name
              </label>
              <input
                id="goalName"
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="e.g. College Laptop, Summer Trip..."
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Icon
              </label>
              <select
                value={selectedEmoji}
                onChange={(e) => setSelectedEmoji(e.target.value)}
                className="w-full px-2 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              >
                <option value="🎯">🎯</option>
                <option value="💻">💻</option>
                <option value="📱">📱</option>
                <option value="🛡️">🛡️</option>
                <option value="🎓">🎓</option>
                <option value="🎸">🎸</option>
                <option value="✈️">✈️</option>
                <option value="🛵">🛵</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Target Amount (₹)
            </label>
            <input
              id="goalAmount"
              type="number"
              min="1"
              step="any"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            id="btn-create-goal"
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/20 active:scale-[0.99] cursor-pointer"
          >
            Create Goal
          </button>
        </form>
      </div>

      {/* YOUR GOALS CARD with id="goalsList" */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg">
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide flex items-center justify-between mb-3">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> Your Goals ({goals.length})
          </span>
          <span className="text-xs font-normal text-slate-400">
            Available: ₹{balance.toLocaleString('en-IN')}
          </span>
        </h2>

        <div id="goalsList" className="space-y-3">
          {goals.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              <Target className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-60" />
              <p className="font-medium">No goals yet</p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Set a target to start saving systematically!
              </p>
            </div>
          ) : (
            goals.map((g) => {
              const percent = Math.min(100, Math.round((g.saved / g.target) * 100));
              const isCompleted = percent >= 100;

              return (
                <div
                  key={g.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-emerald-950/25 border-emerald-500/40 shadow-sm'
                      : 'bg-slate-800/80 border-slate-700/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-2xl p-1.5 bg-slate-900/60 rounded-xl border border-slate-700/50">
                        {g.category || '🎯'}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-white truncate">
                            {g.name}
                          </h3>
                          {isCompleted && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 flex items-center gap-0.5">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Reached!
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          ₹{g.saved.toLocaleString('en-IN')} / ₹{g.target.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-xs font-black font-mono text-emerald-400">
                        {percent}%
                      </span>
                      <button
                        onClick={() => onDeleteGoal(g.id)}
                        title="Delete Goal"
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-700/50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Visual Progress bar */}
                  <div className="progress-bar w-full h-2.5 bg-slate-700/70 rounded-full overflow-hidden my-2">
                    <div
                      className="progress-fill h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  {/* Actions: Deposit to goal */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-400 text-[11px]">
                      {isCompleted
                        ? '🎉 Goal accomplished!'
                        : `₹${(g.target - g.saved).toLocaleString('en-IN')} remaining`}
                    </span>

                    {!isCompleted && (
                      <button
                        onClick={() => {
                          setDepositGoalId(g.id);
                          setDepositAmount('500');
                        }}
                        className="px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold rounded-lg border border-emerald-500/30 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <PlusCircle className="w-3 h-3" /> + Add Money
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* DEPOSIT MODAL */}
      {depositGoalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-emerald-400" /> Deposit to Goal
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Allocate money from your available balance (₹{balance.toLocaleString('en-IN')}).
            </p>

            <form onSubmit={handleDepositSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deposit Amount (₹)
                </label>
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. 500"
                  autoFocus
                />
              </div>

              <div className="flex gap-2">
                {[100, 250, 500, 1000].map((quick) => (
                  <button
                    key={quick}
                    type="button"
                    onClick={() => setDepositAmount(quick.toString())}
                    className="flex-1 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 rounded-lg border border-slate-700 cursor-pointer"
                  >
                    ₹{quick}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDepositGoalId(null)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  Confirm Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
