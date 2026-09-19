import React, { useState } from 'react';
import { FinancialTip, FINANCIAL_TIPS } from '../data/financialTips';
import { Lightbulb, Sparkles, X, Shuffle, Check, Share2, ArrowRight } from 'lucide-react';

interface FinancialTipModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTip: FinancialTip;
}

export const FinancialTipModal: React.FC<FinancialTipModalProps> = ({
  isOpen,
  onClose,
  initialTip,
}) => {
  const [currentTip, setCurrentTip] = useState<FinancialTip>(initialTip);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleNextRandomTip = () => {
    const currentIndex = FINANCIAL_TIPS.findIndex((t) => t.id === currentTip.id);
    let nextIndex = Math.floor(Math.random() * FINANCIAL_TIPS.length);
    if (nextIndex === currentIndex && FINANCIAL_TIPS.length > 1) {
      nextIndex = (currentIndex + 1) % FINANCIAL_TIPS.length;
    }
    setCurrentTip(FINANCIAL_TIPS[nextIndex]);
    setCopied(false);
  };

  const handleCopy = () => {
    const textToCopy = `💡 MoneyWise Financial ${currentTip.type === 'tip' ? 'Tip' : 'Fact'}: ${currentTip.title}\n\n${currentTip.content}${currentTip.actionableStep ? `\n\nAction: ${currentTip.actionableStep}` : ''}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isTip = currentTip.type === 'tip';

  return (
    <div
      id="financial-tip-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col transform transition-all animate-in zoom-in-95 duration-200">
        {/* Header decoration banner */}
        <div
          className={`p-5 pb-4 border-b border-slate-800 flex items-start justify-between ${
            isTip
              ? 'bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-transparent'
              : 'bg-gradient-to-r from-indigo-500/15 via-indigo-600/10 to-transparent'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-2xl shadow-inner ${
                isTip
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
              }`}
            >
              {currentTip.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full border ${
                    isTip
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                  }`}
                >
                  {isTip ? 'Actionable Financial Tip' : 'Did You Know?'}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {currentTip.category}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1 leading-snug">
                {currentTip.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-financial-tip-dialog"
            aria-label="Close dialog"
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-slate-200 leading-relaxed">
            {currentTip.content}
          </p>

          {currentTip.actionableStep && (
            <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-3.5 flex items-start gap-2.5">
              <span className="text-base shrink-0 mt-0.5">⚡</span>
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide block">
                  Actionable Step
                </span>
                <span className="text-xs text-slate-300 mt-0.5 block leading-normal">
                  {currentTip.actionableStep}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              id="copy-tip-btn"
              title="Copy tip to clipboard"
              className="px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/80 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              onClick={handleNextRandomTip}
              id="next-random-tip-btn"
              title="Show another tip or fun fact"
              className="px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/80 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Another Tip</span>
            </button>
          </div>

          <button
            onClick={onClose}
            id="dismiss-tip-btn"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};
