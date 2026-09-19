import React, { useState } from 'react';
import { CompoundScenario } from '../../types';
import { COMPOUND_SCENARIOS } from '../../data/mockData';
import {
  TrendingUp,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Zap,
  Flame,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface CompoundMindGameProps {
  onEarnCoins: (amount: number, reason: string) => void;
  onClose: () => void;
}

export const CompoundMindGame: React.FC<CompoundMindGameProps> = ({
  onEarnCoins,
  onClose,
}) => {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selectedYears, setSelectedYears] = useState(30); // 5, 10, 20, 30
  const [unlocked, setUnlocked] = useState(false);

  const scenario = COMPOUND_SCENARIOS[scenarioIdx];

  // Compound interest formula: FV = P * [ ((1 + r/n)^(nt) - 1) / (r/n) ]
  // r = 12% p.a. (0.12), n = 12 months
  const calculateCompound = (monthly: number, years: number) => {
    const r = 0.12 / 12;
    const n = years * 12;
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r);
    return Math.round(fv);
  };

  const calculateTotalSpent = (monthly: number, years: number) => {
    return monthly * 12 * years;
  };

  const compoundedValue = calculateCompound(scenario.monthlyCost, selectedYears);
  const totalSpent = calculateTotalSpent(scenario.monthlyCost, selectedYears);

  const handleNextScenario = () => {
    if (scenarioIdx < COMPOUND_SCENARIOS.length - 1) {
      setScenarioIdx((prev) => prev + 1);
    } else {
      setUnlocked(true);
      onEarnCoins(20, 'Unlocked The Impatience Penalty Mind Game');
    }
  };

  const handleRestart = () => {
    setScenarioIdx(0);
    setSelectedYears(30);
    setUnlocked(false);
  };

  return (
    <div className="space-y-4">
      {/* SCENARIO SELECTOR */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {COMPOUND_SCENARIOS.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => setScenarioIdx(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              scenarioIdx === idx
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>{sc.itemEmoji}</span>
            <span>Scenario {idx + 1}</span>
          </button>
        ))}
      </div>

      {/* SCENARIO CARD */}
      <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{scenario.itemEmoji}</span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {scenario.title}
              </h3>
              <p className="text-xs text-amber-400 font-mono font-bold">
                Cost: ₹{scenario.monthlyCost.toLocaleString('en-IN')}/month
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-slate-900 text-slate-400 text-[10px] font-mono rounded-lg border border-slate-700">
            ₹{Math.round(scenario.monthlyCost / 30)}/day
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {scenario.description}
        </p>
      </div>

      {/* TIME MACHINE SLIDER */}
      <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" /> Time Machine Horizon:
          </span>
          <span className="font-mono font-bold text-blue-400 text-sm">
            {selectedYears} Years ({20 + selectedYears} Years Old)
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[5, 10, 20, 30].map((yrs) => (
            <button
              key={yrs}
              type="button"
              onClick={() => setSelectedYears(yrs)}
              className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedYears === yrs
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {yrs} Years
            </button>
          ))}
        </div>
      </div>

      {/* TWO ALTERNATIVE REALITIES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Reality A: Spent */}
        <div className="p-4 bg-rose-950/30 border border-rose-500/40 rounded-2xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wide">
            <Flame className="w-4 h-4" /> Reality A: The Instant Habit
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Total Money Vanished:</p>
            <p className="text-lg font-mono font-extrabold text-rose-300">
              ₹{totalSpent.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="text-xs text-slate-300 pt-1 border-t border-rose-900/50">
            <span className="text-[11px] text-slate-400 block">What you have to show for it:</span>
            <span>Empty cans, obsolete gadgets in landfills, and zero passive income.</span>
          </div>
        </div>

        {/* Reality B: Invested in Nifty 50 Index @ 12% */}
        <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-2xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wide">
            <TrendingUp className="w-4 h-4" /> Reality B: Invested in SIP @ 12%
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Compounded Net Worth:</p>
            <p className="text-lg font-mono font-extrabold text-emerald-300">
              ₹{compoundedValue.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="text-xs text-slate-300 pt-1 border-t border-emerald-900/50">
            <span className="text-[11px] text-slate-400 block">What you have to show for it:</span>
            <span>Financial independence, freedom to quit a toxic boss, and generational wealth.</span>
          </div>
        </div>
      </div>

      {/* THE MIND TRUTH */}
      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
        <span className="font-bold text-amber-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Mind Revelation:
        </span>
        <p className="leading-relaxed">{scenario.takeaway}</p>
      </div>

      <div className="flex gap-2 pt-1">
        {scenarioIdx < COMPOUND_SCENARIOS.length - 1 ? (
          <button
            type="button"
            onClick={handleNextScenario}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/20"
          >
            <span>Next Impatience Scenario</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
          >
            <span>Got It! Claim +20 Coins</span>
          </button>
        )}
      </div>
    </div>
  );
};
