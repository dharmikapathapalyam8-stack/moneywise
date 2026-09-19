import React, { useState } from 'react';
import { QuizQuestion, DilemmaScenario } from '../types';
import { QUIZ_BANK, DILEMMA_SCENARIOS } from '../data/mockData';
import { SurvivalMindGame } from './games/SurvivalMindGame';
import { LifeHoursMindGame } from './games/LifeHoursMindGame';
import { CompoundMindGame } from './games/CompoundMindGame';
import { ScamDefenseMindGame } from './games/ScamDefenseMindGame';
import {
  Gamepad2,
  HelpCircle,
  PiggyBank,
  Scale,
  Coins,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  TrendingUp,
  X,
  Clock,
  Shield,
  ShieldAlert,
  Brain,
  Zap,
  Flame,
} from 'lucide-react';

interface GamesViewProps {
  coins: number;
  onEarnCoins: (amount: number, reason: string) => void;
}

type ActiveGame =
  | 'none'
  | 'survival'
  | 'life_hours'
  | 'compound'
  | 'scam'
  | 'quiz'
  | 'budget'
  | 'save_spend';

type GameTab = 'all' | 'mind_games' | 'fast_challenges';

export const GamesView: React.FC<GamesViewProps> = ({
  coins,
  onEarnCoins,
}) => {
  const [activeGame, setActiveGame] = useState<ActiveGame>('none');
  const [activeTab, setActiveTab] = useState<GameTab>('all');

  // QUIZ STATE
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // BUDGET GAME STATE
  const totalSalary = 10000;
  const [needs, setNeeds] = useState(5000);
  const [wants, setWants] = useState(3000);
  const [savings, setSavings] = useState(2000);
  const [budgetResult, setBudgetResult] = useState<{ evaluated: boolean; message: string; coinsEarned: number } | null>(null);

  // SAVE OR SPEND STATE
  const [dilemmaIdx, setDilemmaIdx] = useState(0);
  const [dilemmaDecision, setDilemmaDecision] = useState<'save' | 'spend' | null>(null);
  const [dilemmaFinished, setDilemmaFinished] = useState(false);

  // START QUIZ
  const startQuiz = () => {
    const shuffled = [...QUIZ_BANK].sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuizQuestions(shuffled);
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizFinished(false);
    setActiveGame('quiz');
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);
    const isCorrect = optionIdx === quizQuestions[currentQuizIdx].correctIndex;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIdx < quizQuestions.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
      const earned = quizScore * 5;
      if (earned > 0) {
        onEarnCoins(earned, `Scored ${quizScore}/5 on Money Quiz`);
      }
    }
  };

  // START BUDGET CHALLENGE
  const startBudgetGame = () => {
    setNeeds(5000);
    setWants(3000);
    setSavings(2000);
    setBudgetResult(null);
    setActiveGame('budget');
  };

  const handleEvaluateBudget = () => {
    const allocated = needs + wants + savings;
    if (allocated !== totalSalary) {
      alert(`Your total allocation must equal ₹${totalSalary.toLocaleString('en-IN')}. Currently: ₹${allocated.toLocaleString('en-IN')}`);
      return;
    }

    const needsPct = (needs / totalSalary) * 100;
    const wantsPct = (wants / totalSalary) * 100;
    const savingsPct = (savings / totalSalary) * 100;

    const isIdealNeeds = needsPct >= 45 && needsPct <= 55;
    const isIdealWants = wantsPct >= 25 && wantsPct <= 35;
    const isIdealSavings = savingsPct >= 18 && savingsPct <= 25;

    let earned = 5;
    let msg = '';

    if (isIdealNeeds && isIdealWants && isIdealSavings) {
      earned = 20;
      msg = '🌟 Perfect 50/30/20 Balance! You balanced necessities, desires, and savings cleanly.';
    } else if (savingsPct < 15) {
      earned = 8;
      msg = '⚠️ High risk: Savings are under 15%. Even one unexpected emergency would wipe you out.';
    } else if (wantsPct > 40) {
      earned = 10;
      msg = '👀 Caution: Wants are taking over 40% of income. Beware lifestyle creep!';
    } else {
      earned = 15;
      msg = '👍 Solid attempt! Fine-tune towards 50% Needs, 30% Wants, and 20% Direct Savings.';
    }

    setBudgetResult({ evaluated: true, message: msg, coinsEarned: earned });
    onEarnCoins(earned, 'Completed the 50/30/20 Budget Challenge');
  };

  // START SAVE OR SPEND
  const startSaveSpend = () => {
    setDilemmaIdx(0);
    setDilemmaDecision(null);
    setDilemmaFinished(false);
    setActiveGame('save_spend');
  };

  const handleDilemmaChoice = (choice: 'save' | 'spend') => {
    setDilemmaDecision(choice);
    const earned = choice === 'save' ? 15 : 3;
    onEarnCoins(earned, `Made decision in Dilemma #${dilemmaIdx + 1}`);
  };

  const handleNextDilemma = () => {
    if (dilemmaIdx < DILEMMA_SCENARIOS.length - 1) {
      setDilemmaIdx((prev) => prev + 1);
      setDilemmaDecision(null);
    } else {
      setDilemmaFinished(true);
    }
  };

  return (
    <div id="games-hub" className="space-y-4">
      {/* HEADER CARD */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                Financial Mind Games & Simulations
              </h2>
              <p className="text-xs text-slate-400">
                Play real life simulations, test psychological money reflexes & earn coins!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-bold shadow-sm">
              <Coins className="w-3.5 h-3.5 fill-amber-400" />
              <span>{coins} Coins Available</span>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            All Challenges (7)
          </button>
          <button
            onClick={() => setActiveTab('mind_games')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mind_games'
                ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-purple-400" /> Real-Life Mind Games (4)
          </button>
          <button
            onClick={() => setActiveTab('fast_challenges')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'fast_challenges'
                ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Fast Reflex Challenges (3)
          </button>
        </div>
      </div>

      {/* SECTION 1: REAL LIFE MIND GAMES */}
      {(activeTab === 'all' || activeTab === 'mind_games') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-purple-400" /> Real-Life Mind Games: Why Money Matters
            </h3>
            <span className="text-[11px] text-slate-500">Psychological Simulations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Mind Game 1: 30-Day Life Survival Simulation */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    🛡️
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold">
                    +30 Coins
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  30-Day Life Survival Simulation
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Start with ₹25,000. Face rent ultimatums, medical crises, and peer pressure. Realize why money equals personal dignity and freedom.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <span>6 Critical Rounds</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveGame('survival')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/25 active:scale-95 cursor-pointer flex items-center gap-1"
                >
                  <span>Play Simulation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mind Game 2: The Life-Hours Reality Calculator */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    ⏳
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[10px] font-bold">
                    +25 Coins
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  Life-Hours Reality Mind Game
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Money isn’t paper—it’s your finite human life energy. Convert prices into physical work hours to stop impulse spending.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  Interactive Wage Slider
                </span>
                <button
                  type="button"
                  onClick={() => setActiveGame('life_hours')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/25 active:scale-95 cursor-pointer flex items-center gap-1"
                >
                  <span>Test My Hours</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mind Game 3: The Impatience Penalty (Time Machine) */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    🚀
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-bold">
                    +20 Coins
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  The Impatience Penalty: Time Machine
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Travel 30 years into the future. Discover how daily ₹100 micro-spending burns ₹1.05 Crores of compound wealth.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  5yr to 30yr Horizons
                </span>
                <button
                  type="button"
                  onClick={() => setActiveGame('compound')}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-amber-600/25 active:scale-95 cursor-pointer flex items-center gap-1"
                >
                  <span>Launch Time Machine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mind Game 4: Scam & Greed Defense */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/40 border border-slate-800 hover:border-rose-500/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    🛡️
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[10px] font-bold">
                    +20 Coins
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                  Scam & Greed Defense: Spot the Trap
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Telegram crypto pumps, fake YouTube task jobs, and predatory loan apps exploit fear and greed. Master self-defense!
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  4 Real Traps
                </span>
                <button
                  type="button"
                  onClick={() => setActiveGame('scam')}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-600/25 active:scale-95 cursor-pointer flex items-center gap-1"
                >
                  <span>Defend Money</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: FAST REFLEX CHALLENGES */}
      {(activeTab === 'all' || activeTab === 'fast_challenges') && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Fast Financial Reflex Challenges
            </h3>
            <span className="text-[11px] text-slate-500">Quick Decisions</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Game 1: Money Quiz */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between text-center hover:border-slate-700 transition-all">
              <div>
                <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-2xl text-blue-400 mb-3">
                  🧠
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Money Quiz</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Answer 5 questions → Earn up to 25 coins
                </p>
              </div>
              <button
                type="button"
                onClick={startQuiz}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
              >
                Play Quiz
              </button>
            </div>

            {/* Game 2: Budget Challenge */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between text-center hover:border-slate-700 transition-all">
              <div>
                <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-2xl text-emerald-400 mb-3">
                  ⚖️
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Budget Challenge</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Allocate ₹10k 50/30/20 → Earn 20 coins
                </p>
              </div>
              <button
                type="button"
                onClick={startBudgetGame}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
              >
                Play Budget
              </button>
            </div>

            {/* Game 3: Save or Spend? */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between text-center hover:border-slate-700 transition-all">
              <div>
                <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-2xl text-amber-400 mb-3">
                  🎯
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Save or Spend?</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Resist sneaker hype & EMIs → Earn 15 coins
                </p>
              </div>
              <button
                type="button"
                onClick={startSaveSpend}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
              >
                Play Dilemma
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: 30-DAY LIFE SURVIVAL ================= */}
      {activeGame === 'survival' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl my-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛡️</span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    30-Day Life Survival Simulation
                  </h3>
                  <p className="text-[11px] text-slate-400">Can you protect your dignity and stay solvent?</p>
                </div>
              </div>
              <button
                onClick={() => setActiveGame('none')}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <SurvivalMindGame
              onEarnCoins={onEarnCoins}
              onClose={() => setActiveGame('none')}
            />
          </div>
        </div>
      )}

      {/* ================= MODAL: LIFE-HOURS REALITY CALCULATOR ================= */}
      {activeGame === 'life_hours' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl my-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">⏳</span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Life-Hours Reality Mind Game
                  </h3>
                  <p className="text-[11px] text-slate-400">Discover the true cost of items in human hours</p>
                </div>
              </div>
              <button
                onClick={() => setActiveGame('none')}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <LifeHoursMindGame
              onEarnCoins={onEarnCoins}
              onClose={() => setActiveGame('none')}
            />
          </div>
        </div>
      )}

      {/* ================= MODAL: COMPOUND TIME MACHINE ================= */}
      {activeGame === 'compound' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl my-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚀</span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    The Impatience Penalty: Time Machine
                  </h3>
                  <p className="text-[11px] text-slate-400">Instant gratification vs 30-year compounding</p>
                </div>
              </div>
              <button
                onClick={() => setActiveGame('none')}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <CompoundMindGame
              onEarnCoins={onEarnCoins}
              onClose={() => setActiveGame('none')}
            />
          </div>
        </div>
      )}

      {/* ================= MODAL: SCAM & GREED DEFENSE ================= */}
      {activeGame === 'scam' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl my-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛡️</span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Scam & Greed Defense: Spot the Trap
                  </h3>
                  <p className="text-[11px] text-slate-400">Protect your sweat-earned money from fraudsters</p>
                </div>
              </div>
              <button
                onClick={() => setActiveGame('none')}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ScamDefenseMindGame
              onEarnCoins={onEarnCoins}
              onClose={() => setActiveGame('none')}
            />
          </div>
        </div>
      )}

      {/* ================= MODAL: MONEY QUIZ ================= */}
      {activeGame === 'quiz' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl my-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧠</span>
                <h3 className="text-sm font-bold text-white">Youth Money Quiz</h3>
              </div>
              <button
                onClick={() => setActiveGame('none')}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!quizFinished ? (
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Question {currentQuizIdx + 1} of {quizQuestions.length}</span>
                  <span className="font-mono text-emerald-400 font-bold">Score: {quizScore}</span>
                </div>

                <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 mb-4">
                  <h4 className="text-sm font-bold text-white leading-relaxed">
                    {quizQuestions[currentQuizIdx]?.question}
                  </h4>
                </div>

                <div className="space-y-2 mb-4">
                  {quizQuestions[currentQuizIdx]?.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === quizQuestions[currentQuizIdx]?.correctIndex;

                    let btnStyle = 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700';
                    if (selectedOption !== null) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-300 ring-1 ring-rose-500';
                      } else {
                        btnStyle = 'bg-slate-800/40 text-slate-500 border-slate-800';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={selectedOption !== null}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {selectedOption !== null && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                        )}
                        {selectedOption !== null && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-300 mb-4">
                    <span className="font-bold text-amber-400 block mb-0.5">💡 Takeaway:</span>
                    {quizQuestions[currentQuizIdx]?.explanation}
                  </div>
                )}

                {selectedOption !== null && (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>{currentQuizIdx < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-3xl mb-3">
                  🎉
                </div>
                <h4 className="text-lg font-bold text-white">Quiz Completed!</h4>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  You scored <span className="text-emerald-400 font-bold">{quizScore} / {quizQuestions.length}</span>!
                  {quizScore > 0 ? ` You earned +${quizScore * 5} coins!` : ' Better luck next time!'}
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={startQuiz}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Try Again
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveGame('none')}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL: BUDGET CHALLENGE ================= */}
      {activeGame === 'budget' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl my-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚖️</span>
                <h3 className="text-sm font-bold text-white">50/30/20 Budget Challenge</h3>
              </div>
              <button
                onClick={() => setActiveGame('none')}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Allocate your monthly salary of <span className="text-white font-bold font-mono">₹{totalSalary.toLocaleString('en-IN')}</span> according to the golden financial rule!
            </p>

            <div className="space-y-4 mb-5">
              {/* Needs Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Needs (Target: ~50%)</span>
                  <span className="font-mono text-blue-400 font-bold">
                    ₹{needs.toLocaleString('en-IN')} ({Math.round((needs / totalSalary) * 100)}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="8000"
                  step="500"
                  value={needs}
                  onChange={(e) => setNeeds(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Wants Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Wants (Target: ~30%)</span>
                  <span className="font-mono text-purple-400 font-bold">
                    ₹{wants.toLocaleString('en-IN')} ({Math.round((wants / totalSalary) * 100)}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="6000"
                  step="500"
                  value={wants}
                  onChange={(e) => setWants(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Savings Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Direct Savings (Target: ~20%)</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    ₹{savings.toLocaleString('en-IN')} ({Math.round((savings / totalSalary) * 100)}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="500"
                  value={savings}
                  onChange={(e) => setSavings(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex justify-between items-center text-xs">
                <span className="text-slate-400">Total Allocated:</span>
                <span
                  className={`font-mono font-bold ${
                    needs + wants + savings === totalSalary ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  ₹{(needs + wants + savings).toLocaleString('en-IN')} / ₹{totalSalary.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {budgetResult && (
              <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 text-xs text-slate-200 mb-4">
                <p className="leading-relaxed">{budgetResult.message}</p>
                <p className="text-amber-400 font-bold mt-1">
                  Earned +{budgetResult.coinsEarned} Coins!
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleEvaluateBudget}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Evaluate Allocation
              </button>
              <button
                type="button"
                onClick={() => setActiveGame('none')}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: SAVE OR SPEND DILEMMA ================= */}
      {activeGame === 'save_spend' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl my-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎯</span>
                <h3 className="text-sm font-bold text-white">Save or Spend Dilemma</h3>
              </div>
              <button
                onClick={() => setActiveGame('none')}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!dilemmaFinished ? (
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Scenario {dilemmaIdx + 1} of {DILEMMA_SCENARIOS.length}</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    ₹{DILEMMA_SCENARIOS[dilemmaIdx]?.cost.toLocaleString('en-IN')} Dilemma
                  </span>
                </div>

                <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 mb-4">
                  <h4 className="text-sm font-bold text-white mb-2">
                    {DILEMMA_SCENARIOS[dilemmaIdx]?.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {DILEMMA_SCENARIOS[dilemmaIdx]?.description}
                  </p>
                </div>

                {dilemmaDecision === null ? (
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <button
                      type="button"
                      onClick={() => handleDilemmaChoice('save')}
                      className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
                    >
                      <PiggyBank className="w-5 h-5" />
                      <span>SAVE MONEY</span>
                      <span className="text-[10px] text-emerald-200 opacity-90">+15 Coins</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDilemmaChoice('spend')}
                      className="py-3 px-4 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>💸</span>
                      <span>SPEND NOW</span>
                      <span className="text-[10px] text-slate-400">+3 Coins</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 mb-4">
                    <div
                      className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                        dilemmaDecision === 'save'
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                          : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                      }`}
                    >
                      <span className="font-bold block mb-1">
                        {dilemmaDecision === 'save' ? '🎉 Smart Choice!' : '👀 You Decided to Spend:'}
                      </span>
                      <p>
                        {dilemmaDecision === 'save'
                          ? DILEMMA_SCENARIOS[dilemmaIdx]?.saveOutcome
                          : DILEMMA_SCENARIOS[dilemmaIdx]?.spendOutcome}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-300">
                      <span className="font-bold text-amber-400 block mb-0.5">💡 Youth Tip:</span>
                      {DILEMMA_SCENARIOS[dilemmaIdx]?.tip}
                    </div>

                    <button
                      type="button"
                      onClick={handleNextDilemma}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>{dilemmaIdx < DILEMMA_SCENARIOS.length - 1 ? 'Next Dilemma' : 'Finish Game'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-3xl mb-3">
                  🌟
                </div>
                <h4 className="text-lg font-bold text-white">All Dilemmas Solved!</h4>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  You’ve developed critical financial instincts to resist impulse buys.
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={startSaveSpend}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Play Again
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveGame('none')}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
