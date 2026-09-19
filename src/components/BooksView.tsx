import React, { useState } from 'react';
import { BookItem } from '../types';
import { BookOpen, Coins, Check, Lock, Sparkles, X, Quote, CheckCircle2 } from 'lucide-react';

interface BooksViewProps {
  books: BookItem[];
  coins: number;
  unlockedBookIds: number[];
  onBuyBook: (id: number, cost: number) => void;
}

export const BooksView: React.FC<BooksViewProps> = ({
  books,
  coins,
  unlockedBookIds,
  onBuyBook,
}) => {
  const [selectedBookForReading, setSelectedBookForReading] = useState<BookItem | null>(null);

  const handleBuy = (book: BookItem) => {
    if (unlockedBookIds.includes(book.id)) {
      setSelectedBookForReading(book);
      return;
    }
    if (coins < book.cost) {
      alert(`Not enough coins! You need ${book.cost} coins. Play games or watch video lessons to earn more.`);
      return;
    }
    onBuyBook(book.id, book.cost);
  };

  return (
    <div id="books" className="space-y-4">
      {/* HEADER CARD */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" /> Money Books (Buy with Coins)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Earn coins by playing games → Unlock bestsellers
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-bold">
            <Coins className="w-3.5 h-3.5 fill-amber-400" /> {coins} Coins Available
          </div>
        </div>
      </div>

      {/* BOOKS LIST */}
      <div className="space-y-3">
        {books.map((book) => {
          const isOwned = unlockedBookIds.includes(book.id);

          return (
            <div
              key={book.id}
              id={`book${book.id}`}
              className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 shadow-lg flex items-center gap-3.5 hover:border-slate-700/80 transition-all"
            >
              {/* Book Cover */}
              <div
                className={`w-14 h-20 sm:w-16 sm:h-22 rounded-xl bg-gradient-to-br ${book.coverColor} flex flex-col items-center justify-center text-white shadow-md shrink-0 ring-1 ring-white/10 relative overflow-hidden`}
              >
                <span className="text-2xl">{book.coverEmoji}</span>
                <span className="text-[9px] font-black tracking-tight text-center px-1 mt-1 opacity-90 leading-tight">
                  {book.title.split(' ')[0]}
                </span>
                {isOwned && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                )}
              </div>

              {/* Book Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white truncate">
                    {book.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700/60 shrink-0 hidden xs:inline-block">
                    {book.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">
                  {book.author}
                </p>
                <p className="text-[11px] text-slate-400/80 line-clamp-1 mt-1">
                  {book.synopsis}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-bold text-amber-400 font-mono flex items-center gap-1">
                    <Coins className="w-3 h-3 fill-amber-400" /> {book.cost} Coins
                  </span>
                  {isOwned && (
                    <span className="text-[11px] font-bold text-emerald-400">
                      • Unlocked
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 flex flex-col items-end gap-1.5">
                {isOwned ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled
                      style={{ background: '#10b981' }}
                      className="px-3.5 py-2 text-slate-950 rounded-xl text-xs font-extrabold flex items-center gap-1 opacity-90 cursor-default"
                    >
                      <Check className="w-3.5 h-3.5" /> Owned
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedBookForReading(book)}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer"
                    >
                      Read
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleBuy(book)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Coins className="w-3.5 h-3.5 fill-slate-950" /> Buy
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* BOOK READER MODAL */}
      {selectedBookForReading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl my-auto">
            {/* Modal Header with Cover Banner */}
            <div
              className={`p-5 bg-gradient-to-r ${selectedBookForReading.coverColor} text-white relative`}
            >
              <button
                onClick={() => setSelectedBookForReading(null)}
                className="absolute top-4 right-4 p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="text-3xl p-2 bg-black/30 rounded-2xl">
                  {selectedBookForReading.coverEmoji}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black leading-snug">
                    {selectedBookForReading.title}
                  </h3>
                  <p className="text-xs text-white/80 font-medium">
                    By {selectedBookForReading.author}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4 max-h-[420px] overflow-y-auto">
              {/* Quote */}
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 italic text-xs text-slate-300 flex items-start gap-2.5">
                <Quote className="w-5 h-5 text-amber-400 shrink-0 opacity-80" />
                <span>{selectedBookForReading.favoriteQuote}</span>
              </div>

              {/* Core Lessons */}
              <div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Core Principles from the Book
                </h4>
                <div className="space-y-2">
                  {selectedBookForReading.keyLessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-800/60 rounded-xl border border-slate-800 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {lesson}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Youth Actionable Takeaway */}
              <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl">
                <h5 className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> What You Should Do Starting Today
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedBookForReading.studentTakeaway}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/90 text-right">
              <button
                onClick={() => setSelectedBookForReading(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
