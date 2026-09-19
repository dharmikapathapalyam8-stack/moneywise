import React, { useState } from 'react';
import { SurvivalScenario, SurvivalChoice } from '../../types';
import { SURVIVAL_SCENARIOS } from '../../data/mockData';
import {
  Heart,
  Shield,
  Coins,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Smile,
  Frown,
  Activity,
  Award,
  CheckCircle2
} from 'lucide-react';

interface SurvivalMindGameProps {
  onEarnCoins: (amount: number, reason: string) => void;
  onClose: () => void;
}

export const SurvivalMindGame: React.FC<SurvivalMindGameProps> = ({
  onEarnCoins,
  onClose,
}) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [cash, setCash] = useState(25000);
  const [stress, setStress] = useState(30); // 0 to 100
  const [dignity, setDignity] = useState(80); // 0 to 100
  const [history, setHistory] = useState<{ scenario: SurvivalScenario; choice: SurvivalChoice }[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<SurvivalChoice | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const scenario = SURVIVAL_SCENARIOS[currentRound];

  const handleSelectChoice = (choice: SurvivalChoice) => {
    if (selectedChoice) return;
    setSelectedChoice(choice);

    const newCash = cash - choice.cost;
    const newStress = Math.min(100, Math.max(0, stress + choice.stressDelta));
    const newDignity = Math.min(100, Math.max(0, dignity + choice.dignityDelta));

    setCash(newCash);
    setStress(newStress);
    setDignity(newDignity);
    setHistory((prev) => [...prev, { scenario, choice }]);
  };

  const handleNextRound = () => {
    if (currentRound < SURVIVAL_SCENARIOS.length - 1) {
      setCurrentRound((prev) => prev + 1);
      setSelectedChoice(null);
    } else {
      setIsCompleted(true);
      // Award coins based on survival
      const reward = cash > 0 && stress < 70 ? 30 : 15;
      onEarnCoins(reward, 'Completed 30-Day Life Survival Simulation');
    }
  };

  const handleRestart = () => {
    setCurrentRound(0);
    setCash(25000);
    setStress(30);
    setDignity(80);
    setHistory([]);
    setSelectedChoice(null);
    setIsCompleted(false);
  };

  // Compute final archetype
  const getArchetype = () => {
    if (cash > 8000 && stress <= 40 && dignity >= 75) {
      return {
        title: '🛡️ The Sovereign Wealth Protector',
        description: 'You proved that money is not for showing off—it is your shield against crisis. You protected your dignity and health.',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      };
    }
    if (cash > 0 && stress < 70) {
      return {
        title: '⚖️ The Balanced Realist',
        description: 'You navigated tough crises and survived the 30 days without falling into predatory debt.',
        badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      };
    }
    return {
      title: '⚠️ The Stressed Survivor',
      description: 'You experienced first-hand how lacking money or making emotional impulsive decisions creates intense suffering.',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    };
  };

  return (
    <div className="space-y-4">
      {/* HUD: 3 VITAL GAUGES */}
      <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800">
        {/* Cash Meter */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-semibold flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-amber-400" /> Cash
            </span>
            <span className={`font-mono font-bold ${cash < 3000 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
              ₹{cash.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                cash > 10000 ? 'bg-emerald-500' : cash > 4000 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(5, (cash / 25000) * 100))}%` }}
            />
          </div>
        </div>

        {/* Stress Meter */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-semibold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-rose-400" /> Stress
            </span>
            <span className={`font-mono font-bold ${stress > 65 ? 'text-rose-400' : 'text-slate-300'}`}>
              {stress}%
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                stress < 40 ? 'bg-emerald-500' : stress < 70 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${stress}%` }}
            />
          </div>
        </div>

        {/* Dignity / Peace */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-semibold flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-indigo-400" /> Dignity
            </span>
            <span className="font-mono font-bold text-indigo-300">{dignity}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${dignity}%` }}
            />
          </div>
        </div>
      </div>

      {!isCompleted && scenario ? (
        <div className="space-y-4">
          {/* SCENARIO HEADER */}
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold">
                Day {scenario.day} of 30
              </span>
              <span className="font-semibold text-slate-400">{scenario.category}</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug">
              {scenario.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {scenario.situation}
            </p>
          </div>

          {/* CHOICES */}
          <div className="space-y-2.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {selectedChoice ? 'Your Decision & Reality Check:' : 'What will you do? (Choose wisely)'}
            </p>

            {scenario.choices.map((choice, idx) => {
              const isChosen = selectedChoice === choice;
              const disabled = selectedChoice !== null && !isChosen;

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={selectedChoice !== null}
                  onClick={() => handleSelectChoice(choice)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isChosen
                      ? 'bg-blue-950/60 border-blue-500 shadow-md shadow-blue-500/20 ring-1 ring-blue-500'
                      : disabled
                      ? 'bg-slate-900/40 border-slate-800/60 opacity-50 cursor-not-allowed'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-600 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs text-white font-medium leading-relaxed">
                      {choice.text}
                    </span>
                    <span className="shrink-0 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                      {choice.cost === 0 ? '₹0' : `-₹${choice.cost.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* CONSEQUENCE / LIFE LESSON CARD */}
          {selectedChoice && (
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-blue-500/40 space-y-3 animate-in fade-in duration-300">
              <div className="text-xs leading-relaxed text-slate-200">
                <span className="font-bold text-blue-400 block mb-1">Reality Outcome:</span>
                <p>{selectedChoice.feedback}</p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-emerald-400 block mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Deep Truth: Why Money Matters
                </span>
                <p className="leading-relaxed italic">{selectedChoice.lifeLesson}</p>
              </div>

              <button
                type="button"
                onClick={handleNextRound}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{currentRound < SURVIVAL_SCENARIOS.length - 1 ? 'Next Life Challenge' : 'Complete 30 Days'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* GAME COMPLETE SCREEN */
        <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-700 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-3xl">
            🏆
          </div>

          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-2 ${getArchetype().badgeColor}`}>
              {getArchetype().title}
            </span>
            <h3 className="text-base font-bold text-white">
              Month Completed! You Survived the 30-Day Reality Test
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
              {getArchetype().description}
            </p>
          </div>

          {/* FINAL STATS BOX */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-left">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Ending Cash</p>
              <p className="text-sm font-bold font-mono text-emerald-400">₹{cash.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Ending Stress</p>
              <p className="text-sm font-bold font-mono text-rose-400">{stress}%</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Dignity Retained</p>
              <p className="text-sm font-bold font-mono text-indigo-400">{dignity}%</p>
            </div>
          </div>

          <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-300 text-left">
            <span className="font-bold block mb-1">💡 The Real Lesson:</span>
            Money isn’t about yachts or champagne. Money is the oxygen that prevents panic, shields your loved ones in emergencies, and gives you the freedom to stand tall without bowing down to bad situations.
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Play Again
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/25 cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
