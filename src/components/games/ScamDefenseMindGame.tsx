import React, { useState } from 'react';
import { ScamScenario } from '../../types';
import { SCAM_SCENARIOS } from '../../data/mockData';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface ScamDefenseMindGameProps {
  onEarnCoins: (amount: number, reason: string) => void;
  onClose: () => void;
}

export const ScamDefenseMindGame: React.FC<ScamDefenseMindGameProps> = ({
  onEarnCoins,
  onClose,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const scenario = SCAM_SCENARIOS[currentIdx];

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (scenario.options[idx].isSafe) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < SCAM_SCENARIOS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      const earned = (score + (scenario.options[selectedOption ?? 0].isSafe ? 0 : 0)) * 5;
      onEarnCoins(Math.max(10, score * 5), `Completed Scam Defense (${score}/${SCAM_SCENARIOS.length} safe)`);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="space-y-4">
      {!isFinished && scenario ? (
        <div className="space-y-4">
          {/* SCENARIO CARD */}
          <div className="p-4 sm:p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Threat {currentIdx + 1} of {SCAM_SCENARIOS.length}
              </span>
              <span className="font-mono text-slate-400">Defense IQ: {score} Safe</span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-white">
              {scenario.title}
            </h4>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              {scenario.scenarioText}
            </p>

            <div className="text-[11px] text-amber-400 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
              <span className="font-bold">🎯 The Psychological Trap: </span>
              {scenario.attackerTactic}
            </div>
          </div>

          {/* OPTIONS */}
          <div className="space-y-2.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              How do you respond?
            </p>

            {scenario.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const revealed = selectedOption !== null;

              let btnStyle = 'bg-slate-900 border-slate-800 hover:border-slate-600';
              if (revealed) {
                if (opt.isSafe) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                } else {
                  btnStyle = 'bg-slate-900/40 border-slate-800/50 opacity-40';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={revealed}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-start gap-2.5">
                    {revealed && (
                      <span className="mt-0.5 shrink-0">
                        {opt.isSafe ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400" />
                        )}
                      </span>
                    )}
                    <div className="text-xs leading-relaxed font-medium">
                      <p className="text-white">{opt.text}</p>
                      {revealed && (
                        <p className={`mt-1 text-[11px] ${opt.isSafe ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {opt.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/20"
            >
              <span>{currentIdx < SCAM_SCENARIOS.length - 1 ? 'Next Trap' : 'See Defense Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        /* FINISHED SCREEN */
        <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-700 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-3xl">
            🛡️
          </div>

          <div>
            <h3 className="text-base font-bold text-white">
              Scam & Greed Defense Complete!
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              You correctly identified {score} of {SCAM_SCENARIOS.length} psychological money traps.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-left text-xs text-slate-300 space-y-1.5">
            <span className="font-bold text-amber-400 block flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Golden Rule of Financial Self-Defense:
            </span>
            <p className="leading-relaxed">
              Whenever an offer combines <strong>Urgency</strong> ("Do it in 10 minutes"), <strong>Guaranteed High Returns</strong> ("Zero risk"), or <strong>Secrecy</strong> ("Don’t tell your family")—it is 100% an attack on your money. Always pause and verify independently.
            </p>
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Try Again
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
