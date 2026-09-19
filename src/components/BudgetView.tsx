import React, { useState } from 'react';
import { Transaction, TransactionType, TransactionCategory } from '../types';
import {
  PlusCircle,
  ArrowDownLeft,
  ArrowUpRight,
  Trash2,
  Filter,
  Search,
  Receipt,
  PieChart,
} from 'lucide-react';

interface BudgetViewProps {
  transactions: Transaction[];
  onAddTransaction: (
    type: TransactionType,
    description: string,
    amount: number,
    category: TransactionCategory
  ) => void;
  onDeleteTransaction: (id: string) => void;
}

const CATEGORIES: TransactionCategory[] = [
  'Allowance',
  'Salary / Gig',
  'Food & Snacks',
  'Education & Books',
  'Transport',
  'Entertainment',
  'Shopping',
  'Savings',
  'Other',
];

export const BudgetView: React.FC<BudgetViewProps> = ({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
}) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('Food & Snacks');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!description.trim()) {
      alert('Please enter a description for the transaction');
      return;
    }
    if (isNaN(parsed) || parsed <= 0) {
      alert('Please enter a valid positive amount in ₹');
      return;
    }

    onAddTransaction(type, description.trim(), parsed, category);
    setDescription('');
    setAmount('');
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesSearch =
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div id="budget" className="space-y-4">
      {/* ADD TRANSACTION CARD */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-blue-400" /> Add Transaction
          </h2>
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => {
                setType('expense');
                if (category === 'Allowance' || category === 'Salary / Gig') {
                  setCategory('Food & Snacks');
                }
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                type === 'expense'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Expense (-)
            </button>
            <button
              type="button"
              onClick={() => {
                setType('income');
                setCategory('Allowance');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                type === 'income'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Income (+)
            </button>
          </div>
        </div>

        <form onSubmit={handleAdd} className="space-y-3">
          {/* Native HTML Select with id="type" for exact prompt compatibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Transaction Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as TransactionType)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="income">Income (+)</option>
                <option value="expense">Expense (-)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Category
              </label>
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Description
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. College textbook, Bus fare, Pocket money..."
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Amount (₹)
            </label>
            <input
              id="amount"
              type="number"
              step="any"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in ₹ (e.g. 250)"
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            id="btn-add-transaction"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-blue-600/20 active:scale-[0.99] cursor-pointer"
          >
            + Add Transaction
          </button>
        </form>
      </div>

      {/* LEDGER STATS CARDS */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Total Inflow
          </span>
          <p className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono mt-0.5">
            +₹{totalIncome.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Total Outflow
          </span>
          <p className="text-sm sm:text-base font-extrabold text-rose-400 font-mono mt-0.5">
            -₹{totalExpense.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Net Saved
          </span>
          <p
            className={`text-sm sm:text-base font-extrabold font-mono mt-0.5 ${
              netBalance >= 0 ? 'text-blue-400' : 'text-amber-400'
            }`}
          >
            ₹{netBalance.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* ALL TRANSACTIONS CARD */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
            <Receipt className="w-4 h-4 text-blue-400" /> All Transactions ({transactions.length})
          </h2>

          {/* Search and Filters */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-44">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 pr-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[11px]">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-2 py-1 rounded ${
                  filterType === 'all'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilterType('income')}
                className={`px-2 py-1 rounded ${
                  filterType === 'income'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setFilterType('expense')}
                className={`px-2 py-1 rounded ${
                  filterType === 'expense'
                    ? 'bg-rose-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                -
              </button>
            </div>
          </div>
        </div>

        {/* The target id="allTransactions" container from user prompt */}
        <div id="allTransactions" className="divide-y divide-slate-800/80 max-h-[380px] overflow-y-auto pr-1">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              <Receipt className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-60" />
              <p className="font-medium">No transactions found</p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Add an entry using the form above.
              </p>
            </div>
          ) : (
            filteredTransactions.map((t) => {
              const isIncome = t.type === 'income';
              return (
                <div
                  key={t.id}
                  className="flex items-center justify-between py-3 hover:bg-slate-800/30 px-1 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isIncome
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {isIncome ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
                        {t.description}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                          {t.category}
                        </span>
                        <span>{t.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs sm:text-sm font-bold font-mono ${
                        isIncome ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isIncome ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => onDeleteTransaction(t.id)}
                      title="Delete transaction"
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors opacity-60 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
