import React, { useState } from 'react';
import { DailyQuote } from '../data/dailyQuotes';
import { Quote, Sparkles, RefreshCw, Share2, Check, Heart, Lightbulb } from 'lucide-react';

interface DailyQuoteCardProps {
  quote: DailyQuote;
  onRefreshQuote?: () => void;
  onOpenTip?: () => void;
}

export const DailyQuoteCard: React.FC<DailyQuoteCardProps> = ({
  quote,
  onRefreshQuote,
  onOpenTip,
}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(`"${quote.quote}" — ${quote.author} (${quote.tagline})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="daily-quote-banner"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/25 p-4 sm:p-5 shadow-lg shadow-indigo-950/30"
    >
      {/* Decorative background watermark */}
      <div className="absolute -top-3 -right-3 text-indigo-500/10 pointer-events-none select-none">
        <Quote className="w-24 h-24 rotate-12" />
      </div>

      <div className="relative z-10 space-y-2.5">
        {/* Header tag */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              Daily Money & Life Wisdom
            </span>
            <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-medium">
              {quote.theme}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {onOpenTip && (
              <button
                onClick={onOpenTip}
                id="quote-card-tip-btn"
                title="Financial Tip of the Day"
                className="px-2 py-1 rounded-lg border border-amber-500/40 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 fill-amber-400 text-amber-300" />
                <span className="hidden sm:inline">Daily Tip</span>
              </button>
            )}
            <button
              onClick={() => setLiked((prev) => !prev)}
              id="like-quote-btn"
              title="Save to favorites"
              className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                liked
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-400' : ''}`} />
            </button>
            <button
              onClick={handleCopy}
              id="copy-quote-btn"
              title="Copy quote"
              className="p-1.5 rounded-lg border border-slate-700/60 bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
            </button>
            {onRefreshQuote && (
              <button
                onClick={onRefreshQuote}
                id="refresh-quote-btn"
                title="Read another quote"
                className="p-1.5 rounded-lg border border-slate-700/60 bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 hover:rotate-180 transition-transform duration-500" />
              </button>
            )}
          </div>
        </div>

        {/* Quote body */}
        <blockquote className="text-slate-100 font-medium text-xs sm:text-sm leading-relaxed italic pr-4">
          “{quote.quote}”
        </blockquote>

        {/* Author attribution */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-indigo-300">
              — {quote.author}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-none">
              {quote.tagline}
            </span>
          </div>
          <span className="sm:hidden text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            {quote.theme}
          </span>
        </div>
      </div>
    </div>
  );
};
