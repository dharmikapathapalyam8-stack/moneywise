export type NavigationPage = 
  | 'dashboard' 
  | 'budget' 
  | 'goals' 
  | 'books' 
  | 'games' 
  | 'ai';

export interface Badge {
  id: string;
  title: string;
  category: 'Coins' | 'Goals' | 'Mastery';
  description: string;
  iconEmoji: string;
  requirementText: string;
  colorTheme: 'amber' | 'blue' | 'indigo' | 'emerald' | 'purple' | 'teal';
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
  avatarSeed?: string;
  unlockedBadges?: string[]; // array of badge IDs unlocked
}

export type TransactionType = 'income' | 'expense';

export type TransactionCategory = 
  | 'Allowance' 
  | 'Salary / Gig' 
  | 'Food & Snacks' 
  | 'Education & Books' 
  | 'Transport' 
  | 'Entertainment' 
  | 'Shopping' 
  | 'Savings' 
  | 'Other';

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  category: TransactionCategory;
  date: string;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  saved: number;
  category: string;
  targetDate?: string;
  createdAt: string;
}

export interface SurvivalChoice {
  text: string;
  cost: number;
  stressDelta: number; // e.g. -15 (calmer) to +25 (panicked)
  dignityDelta: number; // e.g. -20 to +20
  feedback: string;
  lifeLesson: string;
}

export interface SurvivalScenario {
  id: number;
  day: number;
  title: string;
  situation: string;
  category: 'Housing' | 'Social & Friends' | 'Emergency' | 'Health' | 'Greed & FOMO' | 'Career & Skills';
  choices: SurvivalChoice[];
}

export interface LifeCostItem {
  id: number;
  name: string;
  price: number;
  icon: string;
  category: string;
  reflection: string;
  smartAlternative: string;
}

export interface CompoundScenario {
  id: number;
  title: string;
  monthlyCost: number;
  itemEmoji: string;
  description: string;
  instantPleasure: string;
  compounded30Years: number;
  takeaway: string;
}

export interface ScamScenario {
  id: number;
  title: string;
  scenarioText: string;
  attackerTactic: string;
  options: {
    text: string;
    isSafe: boolean;
    explanation: string;
  }[];
}

export interface BookItem {
  id: number;
  title: string;
  author: string;
  cost: number;
  category: string;
  coverColor: string;
  coverEmoji: string;
  synopsis: string;
  keyLessons: string[];
  studentTakeaway: string;
  favoriteQuote: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DilemmaScenario {
  id: number;
  title: string;
  cost: number;
  description: string;
  saveOutcome: string;
  spendOutcome: string;
  compoundValue5Years: number;
  tip: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
