import React, { useState, useEffect, useMemo } from 'react';
import {
  NavigationPage,
  UserProfile,
  Transaction,
  TransactionType,
  TransactionCategory,
  Goal,
} from './types';
import { INITIAL_BOOKS } from './data/mockData';
import { calculateBadges } from './data/badgeSystem';
import { getDailyQuote, DAILY_QUOTES } from './data/dailyQuotes';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LoginModal } from './components/LoginModal';
import { DashboardView } from './components/DashboardView';
import { BudgetView } from './components/BudgetView';
import { GoalsView } from './components/GoalsView';
import { BooksView } from './components/BooksView';
import { GamesView } from './components/GamesView';
import { AiAssistantView } from './components/AiAssistantView';
import { CoinToast } from './components/CoinToast';
import { BadgesModal } from './components/BadgesModal';

const STORAGE_KEYS = {
  USER: 'mw_user',
  BALANCE: 'mw_balance',
  COINS: 'mw_coins',
  TRANSACTIONS: 'mw_transactions',
  GOALS: 'mw_goals',
  UNLOCKED_BOOKS: 'mw_unlocked_books',
  UNLOCKED_BADGES: 'mw_unlocked_badges',
};

export default function App() {
  // Load state from localStorage with prompt defaults (with friendly sample defaults)
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
      // Default initial user so user lands directly in dashboard
      const defaultUser: UserProfile = {
        name: 'Aarav Sharma',
        email: 'aarav.student@moneywise.org',
        isLoggedIn: true,
        unlockedBadges: ['first-coins', 'budget-pro', 'first-target'],
      };
      return defaultUser;
    } catch {
      return null;
    }
  });

  const [balance, setBalance] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BALANCE);
      return saved !== null ? JSON.parse(saved) : 6250;
    } catch {
      return 6250;
    }
  });

  const [coins, setCoins] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COINS);
      return saved !== null ? JSON.parse(saved) : 65;
    } catch {
      return 65;
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'tx-1',
          type: 'income',
          description: 'Freelance Design Project',
          amount: 5000,
          category: 'Freelance',
          date: '18 Sep 2026',
        },
        {
          id: 'tx-2',
          type: 'income',
          description: 'Monthly Pocket Allowance',
          amount: 3000,
          category: 'Allowance',
          date: '15 Sep 2026',
        },
        {
          id: 'tx-3',
          type: 'expense',
          description: 'Coding BootCamp Book',
          amount: 750,
          category: 'Education',
          date: '16 Sep 2026',
        },
        {
          id: 'tx-4',
          type: 'expense',
          description: 'Saved for Tech Laptop Goal',
          amount: 1000,
          category: 'Savings',
          date: '17 Sep 2026',
        },
      ];
    } catch {
      return [];
    }
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GOALS);
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'goal-1',
          name: 'Tech Upgrade & Study Laptop',
          target: 20000,
          saved: 8500,
          category: 'Tech',
          createdAt: '01 Sep 2026',
        },
        {
          id: 'goal-2',
          name: 'Emergency Buffer Fund',
          target: 5000,
          saved: 5000,
          category: 'Emergency',
          createdAt: '10 Aug 2026',
        },
      ];
    } catch {
      return [];
    }
  });

  const [unlockedBooks, setUnlockedBooks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UNLOCKED_BOOKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UNLOCKED_BADGES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [quoteOffset, setQuoteOffset] = useState<number>(0);
  const [showBadgesModal, setShowBadgesModal] = useState<boolean>(false);
  const [coinNotification, setCoinNotification] = useState<{
    amount: number;
    reason: string;
  } | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BALANCE, JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COINS, JSON.stringify(coins));
  }, [coins]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UNLOCKED_BOOKS, JSON.stringify(unlockedBooks));
  }, [unlockedBooks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UNLOCKED_BADGES, JSON.stringify(unlockedBadgeIds));
  }, [unlockedBadgeIds]);

  // Compute calculated badge status reactively based on goals & coins
  const badges = useMemo(() => {
    return calculateBadges(coins, goals, unlockedBadgeIds);
  }, [coins, goals, unlockedBadgeIds]);

  // Check for newly unlocked badges and update UserProfile and toast
  useEffect(() => {
    const newlyUnlocked = badges.filter((b) => b.unlocked && !unlockedBadgeIds.includes(b.id));
    if (newlyUnlocked.length > 0) {
      const newIds = newlyUnlocked.map((b) => b.id);
      setUnlockedBadgeIds((prev) => [...prev, ...newIds]);

      // Update user profile badges list
      if (user) {
        setUser((prev) => {
          if (!prev) return prev;
          const currentBadges = prev.unlockedBadges || [];
          return {
            ...prev,
            unlockedBadges: Array.from(new Set([...currentBadges, ...newIds])),
          };
        });
      }

      // Notify user with audio-visual celebration
      const first = newlyUnlocked[0];
      setCoinNotification({
        amount: 25,
        reason: `Unlocked Badge: ${first.title}! (+25 Bonus Coins)`,
      });
      setCoins((prev) => prev + 25);
    }
  }, [badges, unlockedBadgeIds, user]);

  // Daily Quote of the day
  const dailyQuote = useMemo(() => {
    return getDailyQuote(quoteOffset);
  }, [quoteOffset]);

  const handleRefreshQuote = () => {
    setQuoteOffset((prev) => (prev + 1) % DAILY_QUOTES.length);
  };

  // Handler: Login
  const handleLogin = (profile: UserProfile) => {
    setUser({
      ...profile,
      unlockedBadges: unlockedBadgeIds,
    });
  };

  // Handler: Logout
  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
  };

  // Handler: Add Transaction
  const handleAddTransaction = (
    type: TransactionType,
    description: string,
    amount: number,
    category: TransactionCategory
  ) => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type,
      description,
      amount,
      category,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    setTransactions((prev) => [newTx, ...prev]);
    setBalance((prev) => (type === 'income' ? prev + amount : prev - amount));
  };

  // Handler: Delete Transaction
  const handleDeleteTransaction = (id: string) => {
    const tx = transactions.find((t) => t.id === id);
    if (!tx) return;

    setTransactions((prev) => prev.filter((t) => t.id !== id));
    // Revert the balance impact
    setBalance((prev) => (tx.type === 'income' ? prev - tx.amount : prev + tx.amount));
  };

  // Handler: Add Goal
  const handleAddGoal = (name: string, target: number, category: string) => {
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      name,
      target,
      saved: 0,
      category,
      createdAt: new Date().toLocaleDateString(),
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  // Handler: Deposit to Goal
  const handleDepositToGoal = (goalId: string, amount: number) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return;

    if (amount > balance) {
      alert(`Insufficient available balance! You have ₹${balance.toLocaleString('en-IN')}.`);
      return;
    }

    const updatedSaved = goal.saved + amount;
    const isNowCompleted = updatedSaved >= goal.target && goal.saved < goal.target;

    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, saved: updatedSaved } : g))
    );

    // Deduct from available balance
    setBalance((prev) => prev - amount);

    // Also log as an expense/savings transaction
    handleAddTransaction(
      'expense',
      `Saved toward Goal: ${goal.name}`,
      amount,
      'Savings'
    );

    if (isNowCompleted) {
      // Award bonus coins for completing goal
      handleEarnCoins(50, `Completed Goal: ${goal.name}!`);
    }
  };

  // Handler: Delete Goal
  const handleDeleteGoal = (goalId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return;

    if (goal.saved > 0) {
      if (confirm(`Do you want to refund ₹${goal.saved.toLocaleString('en-IN')} back to your available balance?`)) {
        setBalance((prev) => prev + goal.saved);
        handleAddTransaction('income', `Refunded from Goal: ${goal.name}`, goal.saved, 'Savings');
      }
    }

    setGoals((prev) => prev.filter((g) => g.id !== goalId));
  };

  // Handler: Buy Book with Coins
  const handleBuyBook = (id: number, cost: number) => {
    if (unlockedBooks.includes(id)) {
      alert('You already own this book!');
      return;
    }
    if (coins < cost) {
      alert('Not enough coins! Play mind games to earn more coins.');
      return;
    }

    setCoins((prev) => prev - cost);
    setUnlockedBooks((prev) => [...prev, id]);
    setCoinNotification({ amount: -cost, reason: 'Unlocked Money Book' });
  };

  // Handler: Earn Coins
  const handleEarnCoins = (amount: number, reason: string) => {
    setCoins((prev) => prev + amount);
    setCoinNotification({ amount, reason });
  };

  // Render Login page if user not logged in
  if (!user || !user.isLoggedIn) {
    return <LoginModal onLogin={handleLogin} />;
  }

  return (
    <div id="app" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white pb-20">
      {/* Toast Notification */}
      <CoinToast
        notification={coinNotification}
        onClose={() => setCoinNotification(null)}
      />

      {/* Sticky Header */}
      <Header
        coins={coins}
        user={user}
        onLogout={handleLogout}
        onOpenCoinInfo={() => setCurrentPage('games')}
        onOpenBadges={() => setShowBadgesModal(true)}
      />

      {/* Main Container */}
      <main className="container max-w-lg md:max-w-xl mx-auto px-4 py-5 flex-1 transition-all">
        {currentPage === 'dashboard' && (
          <DashboardView
            balance={balance}
            coins={coins}
            transactions={transactions}
            goals={goals}
            user={user}
            badges={badges}
            dailyQuote={dailyQuote}
            onRefreshQuote={handleRefreshQuote}
            onNavigate={(page) => setCurrentPage(page)}
            onOpenAddTransaction={() => setCurrentPage('budget')}
            onDeleteTransaction={handleDeleteTransaction}
          />
        )}

        {currentPage === 'budget' && (
          <BudgetView
            transactions={transactions}
            onAddTransaction={handleAddTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        )}

        {currentPage === 'goals' && (
          <GoalsView
            goals={goals}
            balance={balance}
            onAddGoal={handleAddGoal}
            onDepositToGoal={handleDepositToGoal}
            onDeleteGoal={handleDeleteGoal}
          />
        )}

        {currentPage === 'books' && (
          <BooksView
            books={INITIAL_BOOKS}
            coins={coins}
            unlockedBookIds={unlockedBooks}
            onBuyBook={handleBuyBook}
          />
        )}

        {currentPage === 'games' && (
          <GamesView
            coins={coins}
            onEarnCoins={handleEarnCoins}
          />
        )}

        {currentPage === 'ai' && (
          <AiAssistantView
            balance={balance}
            coins={coins}
            goalsCount={goals.length}
          />
        )}
      </main>

      {/* Global Badges Modal accessible from header rank or profile */}
      <BadgesModal
        badges={badges}
        isOpen={showBadgesModal}
        onClose={() => setShowBadgesModal(false)}
        onNavigateToGoals={() => setCurrentPage('goals')}
        onNavigateToGames={() => setCurrentPage('games')}
      />

      {/* Fixed Bottom Navigation */}
      <BottomNav
        currentPage={currentPage}
        onSelectPage={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
