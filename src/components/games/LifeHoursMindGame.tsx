import React, { useState } from 'react';
import { LifeCostItem } from '../../types';
import { LIFE_HOURS_ITEMS } from '../../data/mockData';
import {
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Hourglass,
  Coins,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface LifeHoursMindGameProps {
  onEarnCoins: (amount: number, reason: string) => void;
  onClose: () => void;
}

export const LifeHoursMindGame: React.FC<LifeHoursMindGameProps> = ({
  onEarnCoins,
  onClose,
}) => {
  const [hourlyWage, setHourlyWage] = useState(250); // ₹250/hour
  const [currentIdx, setCurrentIdx] = useState(0);
  const [decisions, setDecisions] = useState<{ item: LifeCostItem; choice: 'buy' | 'save' }[]>([]);
  const [currentChoice, setCurrentChoice] = useState<'buy' | 'save' | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const item = LIFE_HOURS_ITEMS[currentIdx];
  const hoursRequired = Math.round((item.price / Math.max(1, hourlyWage)) * 10) / 10;
  const workDaysRequired = Math.round((hoursRequired / 8) * 10) / 10;

  const handleDecision = (choice: 'buy' | 'save') => {
    setCurrentChoice(choice);
    setDecisions((prev) => [...prev, { item, choice }]);
  };

  const handleNext = () => {
    if (currentIdx < LIFE_HOURS_ITEMS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setCurrentChoice(null);
    } else {
      setIsFinished(true);
      onEarnCoins(25, 'Completed Life-Hours Reality Mind Game');
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setDecisions([]);
    setCurrentChoice(null);
    setIsFinished(false);
  };

  const hoursSaved = decisions
    .filter((d) => d.choice === 'save')
    .reduce((acc, d) => acc + d.item.price / Math.max(1, hourlyWage), 0);

  const moneySaved = decisions
    .filter((d) => d.choice === 'save')
    .reduce((acc, d) => acc + d.item.price, 0);

  return (
    <div className="space-y-4">
      {/* WAGE CALIBRATOR BAR */}
      <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-300 font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" /> Your Current Hourly Value
          </span>
          <span className="font-mono font-bold text-amber-400 text-sm">
            ₹{hourlyWage}/hour
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="1000"
          step="25"
          value={hourlyWage}
          disabled={currentChoice !== null || decisions.length > 0}
          onChange={(e) => setHourlyWage(Number(e.target.value))}
          className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>₹100 (Campus Gig)</span>
          <span>₹250 (Student Freelancer)</span>
          <span>₹600 (Junior Pro)</span>
          <span>₹1,000+ (High Skill)</span>
        </div>
      </div>

      {!isFinished && item ? (
        <div className="space-y-4">
          {/* ITEM CARD & LIFE HOUR TRANSLATION */}
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-3xl shadow-inner">
              {item.icon}
            </div>

            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-300 text-[10px] font-semibold uppercase">
                {item.category}
              </span>
              <h3 className="text-base font-bold text-white mt-1">{item.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Sticker Price: <span className="text-white font-bold font-mono">₹{item.price.toLocaleString('en-IN')}</span>
              </p>
            </div>

            {/* THE BRUTAL REALITY TRANSLATION */}
            <div className="p-3.5 bg-rose-950/40 border border-rose-500/40 rounded-xl">
              <p className="text-[11px] text-rose-300 font-semibold uppercase tracking-wider">
                ⏳ The True Life-Energy Price:
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-0.5">
                {hoursRequired} HOURS OF YOUR LIFE
              </p>
              <p className="text-xs text-rose-200/90 mt-1">
                = {workDaysRequired} full 8-hour days of your precious youth working for someone else!
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed text-left pt-1">
              {item.reflection}
            </p>
          </div>

          {/* INTERACTIVE QUESTION */}
          {currentChoice === null ? (
            <div className="space-y-2">
              <p className="text-center text-xs font-bold text-slate-300">
                Is this item worth {hoursRequired} hours of your sweat & freedom?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleDecision('save')}
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5 text-white" />
                  <span>PROTECT MY TIME</span>
                  <span className="text-[10px] text-emerald-200">Reclaim {hoursRequired} hrs</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDecision('buy')}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
                >
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>TRADE MY LIFE HOURS</span>
                  <span className="text-[10px] text-slate-400">Sacrifice {hoursRequired} hrs</span>
                </button>
              </div>
            </div>
          ) : (
            /* FEEDBACK CARD */
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-blue-500/40 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                {currentChoice === 'save' ? (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                    ✓ Wise Choice: Life Hours Preserved!
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-bold">
                    ⚠️ You Traded {hoursRequired} Hours of Human Labor
                  </span>
                )}
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-amber-400 block mb-1">
                  💡 High-Value Alternative:
                </span>
                <p className="leading-relaxed">{item.smartAlternative}</p>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{currentIdx < LIFE_HOURS_ITEMS.length - 1 ? 'Next Reality Check' : 'See Life Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* SUMMARY SCREEN */
        <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-700 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-3xl">
            ⏳
          </div>

          <div>
            <h3 className="text-base font-bold text-white">
              Life-Energy Evaluation Complete!
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
              Whenever you buy something, you don’t pay with money. You pay with the time of your life that you spent earning that money.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-left">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Life Hours Saved</p>
              <p className="text-lg font-bold font-mono text-emerald-400">
                {Math.round(hoursSaved * 10) / 10} Hours
              </p>
              <p className="text-[10px] text-slate-400">
                ≈ {Math.round((hoursSaved / 8) * 10) / 10} full working days
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Money Kept</p>
              <p className="text-lg font-bold font-mono text-amber-400">
                ₹{moneySaved.toLocaleString('en-IN')}
              </p>
              <p className="text-[10px] text-slate-400">Available to invest in assets</p>
            </div>
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Recalculate
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
