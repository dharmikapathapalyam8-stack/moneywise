import { Badge, Goal } from '../types';

export const BADGE_DEFINITIONS: Omit<Badge, 'unlocked' | 'unlockedAt' | 'progress' | 'maxProgress'>[] = [
  // Coin-based achievements
  {
    id: 'first-coins',
    title: 'First Fortune',
    category: 'Coins',
    description: 'Accumulate your first 30 learning coins',
    iconEmoji: '🪙',
    requirementText: 'Have 30+ Coins in total',
    colorTheme: 'amber',
  },
  {
    id: 'budget-pro',
    title: 'Budget Pro',
    category: 'Coins',
    description: 'Grow your wealth to 60+ coins by playing games and managing funds',
    iconEmoji: '💼',
    requirementText: 'Reach 60+ Coins',
    colorTheme: 'blue',
  },
  {
    id: 'wealth-builder',
    title: 'Wealth Builder',
    category: 'Coins',
    description: 'Demonstrate disciplined financial literacy with 100+ coins',
    iconEmoji: '💎',
    requirementText: 'Reach 100+ Coins',
    colorTheme: 'indigo',
  },
  {
    id: 'fortune-tycoon',
    title: 'Fortune Tycoon',
    category: 'Coins',
    description: 'Reach the pinnacle of youth financial mastery with 150+ coins',
    iconEmoji: '👑',
    requirementText: 'Reach 150+ Coins',
    colorTheme: 'emerald',
  },

  // Goals reached achievements
  {
    id: 'first-target',
    title: 'Goal Setter',
    category: 'Goals',
    description: 'Create your first concrete savings target',
    iconEmoji: '🎯',
    requirementText: 'Create at least 1 savings goal',
    colorTheme: 'blue',
  },
  {
    id: 'first-victory',
    title: 'Goal Crusher',
    category: 'Goals',
    description: 'Reach 100% of your target on at least one savings goal',
    iconEmoji: '🏁',
    requirementText: 'Complete 1 savings goal target',
    colorTheme: 'emerald',
  },
  {
    id: 'master-saver',
    title: 'Master Saver',
    category: 'Goals',
    description: 'Reach 100% completion on 2 or more savings goals',
    iconEmoji: '🏆',
    requirementText: 'Complete 2+ savings goals successfully',
    colorTheme: 'purple',
  },
  {
    id: 'piggy-titan',
    title: 'Piggy Titan',
    category: 'Goals',
    description: 'Stash away at least ₹5,000 across all your savings goals combined',
    iconEmoji: '🏦',
    requirementText: 'Save ₹5,000+ total in active and achieved goals',
    colorTheme: 'teal',
  },
];

/**
 * Calculates real-time badge unlock status based on current coins and goals
 */
export function calculateBadges(
  coins: number,
  goals: Goal[],
  existingUnlockedBadges: string[] = []
): Badge[] {
  const completedGoalsCount = goals.filter((g) => g.saved >= g.target && g.target > 0).length;
  const totalSavedAcrossGoals = goals.reduce((acc, g) => acc + g.saved, 0);
  const totalGoalsCreated = goals.length;

  return BADGE_DEFINITIONS.map((def) => {
    let unlocked = false;
    let progress = 0;
    let maxProgress = 1;

    switch (def.id) {
      case 'first-coins':
        maxProgress = 30;
        progress = Math.min(coins, 30);
        unlocked = coins >= 30;
        break;
      case 'budget-pro':
        maxProgress = 60;
        progress = Math.min(coins, 60);
        unlocked = coins >= 60;
        break;
      case 'wealth-builder':
        maxProgress = 100;
        progress = Math.min(coins, 100);
        unlocked = coins >= 100;
        break;
      case 'fortune-tycoon':
        maxProgress = 150;
        progress = Math.min(coins, 150);
        unlocked = coins >= 150;
        break;
      case 'first-target':
        maxProgress = 1;
        progress = Math.min(totalGoalsCreated, 1);
        unlocked = totalGoalsCreated >= 1;
        break;
      case 'first-victory':
        maxProgress = 1;
        progress = Math.min(completedGoalsCount, 1);
        unlocked = completedGoalsCount >= 1;
        break;
      case 'master-saver':
        maxProgress = 2;
        progress = Math.min(completedGoalsCount, 2);
        unlocked = completedGoalsCount >= 2;
        break;
      case 'piggy-titan':
        maxProgress = 5000;
        progress = Math.min(totalSavedAcrossGoals, 5000);
        unlocked = totalSavedAcrossGoals >= 5000;
        break;
      default:
        unlocked = false;
    }

    // Preserve previously stored unlock if already recorded
    if (existingUnlockedBadges.includes(def.id)) {
      unlocked = true;
      progress = maxProgress;
    }

    return {
      ...def,
      unlocked,
      progress,
      maxProgress,
    };
  });
}
