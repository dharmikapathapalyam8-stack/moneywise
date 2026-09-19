export interface FinancialTip {
  id: number;
  type: 'tip' | 'fact';
  title: string;
  category: 'Budgeting' | 'Smart Saving' | 'Investing & Wealth' | 'Mindset' | 'Fun Money Fact' | 'Digital Security';
  content: string;
  actionableStep?: string;
  emoji: string;
}

export const FINANCIAL_TIPS: FinancialTip[] = [
  {
    id: 1,
    type: 'tip',
    title: 'The 72-Hour Rule for Impulse Wants',
    category: 'Smart Saving',
    content: 'Whenever you feel the irresistible urge to buy something non-essential, write it down and wait exactly 72 hours before hitting "Buy Now". Over 80% of spontaneous desires evaporate once dopamine cools down.',
    actionableStep: 'Create a "Waitlist" note on your phone for impulse items instead of checking out immediately.',
    emoji: '⏳',
  },
  {
    id: 2,
    type: 'fact',
    title: 'Warren Buffett Bought His First Stock at Age 11',
    category: 'Fun Money Fact',
    content: 'Warren Buffett bought his first stock (Cities Service Preferred) at age 11 for $38 a share. He later joked that he "started too late!" Today, over 99% of his total wealth was accumulated after his 50th birthday thanks to 60+ years of compounding.',
    actionableStep: 'Starting to invest even ₹500/month in your youth is worth more than thousands started in your 40s.',
    emoji: '📈',
  },
  {
    id: 3,
    type: 'tip',
    title: 'Pay Yourself First (Reverse Budgeting)',
    category: 'Budgeting',
    content: 'Most people spend their income and save whatever pennies are left over at the end of the month—which is usually zero. In reverse budgeting, you automatically transfer your savings (e.g., 20%) into your goal the moment money arrives.',
    actionableStep: 'Transfer ₹100 or 10% to your savings goal immediately when pocket money or salary arrives.',
    emoji: '💰',
  },
  {
    id: 4,
    type: 'fact',
    title: 'Paper Currency Was Invented Over 1,000 Years Ago',
    category: 'Fun Money Fact',
    content: 'China invented the first paper money (called Jiaozi) during the Song Dynasty around the 11th century because carrying thousands of heavy bronze and copper coins on merchant trade routes had become too exhausting and dangerous.',
    actionableStep: 'Track your digital UPI payments closely; frictionless digital cash makes spending feel less painful than counting paper currency.',
    emoji: '📜',
  },
  {
    id: 5,
    type: 'tip',
    title: 'Calculate Purchases in "Life-Hours"',
    category: 'Mindset',
    content: 'Before buying an expensive gadget or sneakers, convert the price into hours of your hard work. If you earn ₹200/hour tutoring or freelancing, a ₹4,000 pair of shoes costs 20 hours of your life energy. Ask yourself: Is it worth two full workdays?',
    actionableStep: 'Divide the price by your hourly rate to evaluate true cost before swiping.',
    emoji: '⏱️',
  },
  {
    id: 6,
    type: 'tip',
    title: 'The "Ghost Subscription" Audit',
    category: 'Smart Saving',
    content: 'The average youth wastes ₹600–₹1,500 every single month on forgotten app trials, unused OTT streaming plans, or duplicate cloud storages. A single 10-minute check can free up enough money to fund an entire savings goal.',
    actionableStep: 'Open your Google Play/Apple Subscriptions and bank statements right now to cancel any service unused this week.',
    emoji: '👻',
  },
  {
    id: 7,
    type: 'fact',
    title: 'Compound Interest Can Double Your Money in 7 Years',
    category: 'Investing & Wealth',
    content: 'The mathematical "Rule of 72" states that dividing 72 by your annual rate of return gives you the exact years needed to double your investment. At a 10% index fund return (72 / 10), your money doubles roughly every 7.2 years without adding another rupee!',
    actionableStep: 'Let compounding do the heavy lifting—time in the market beats timing the market.',
    emoji: '🚀',
  },
  {
    id: 8,
    type: 'tip',
    title: 'Never Share an OTP or UPI PIN to "Receive" Money',
    category: 'Digital Security',
    content: 'A golden rule of digital transactions: UPI PINs and SMS OTPs are strictly used for DEBITING (paying) money, never for receiving money. Scammers on OLX or marketplace apps send "collect requests" claiming it is an advance payment.',
    actionableStep: 'If anyone asks you to enter your PIN to accept funds or cash prizes, decline and block immediately.',
    emoji: '🛡️',
  },
  {
    id: 9,
    type: 'fact',
    title: 'Monopoly Money Outnumbers Real US Currency',
    category: 'Fun Money Fact',
    content: 'Hasbro prints approximately $30 billion in Monopoly play currency every single year—far more physical bills than the US Treasury Bureau of Engraving prints in real cash annually!',
    actionableStep: 'Treat your real financial ledger with the strategy of a board game, but with real-world discipline.',
    emoji: '🎲',
  },
  {
    id: 10,
    type: 'tip',
    title: 'Create an "Oops Fund" Before You Invest',
    category: 'Smart Saving',
    content: 'Before putting money into stocks, crypto, or long-term locked instruments, stash a small buffer (₹3,000–₹5,000) for surprise expenses like a cracked phone screen, urgent transport, or medical needs. This prevents you from borrowing at high interest.',
    actionableStep: 'Set up an "Emergency Buffer" goal right here on your MoneyWise dashboard.',
    emoji: '🛟',
  },
  {
    id: 11,
    type: 'fact',
    title: 'The Word "Salary" Comes From Salt',
    category: 'Fun Money Fact',
    content: 'In ancient Rome, soldiers were sometimes given an allowance called "salarium" to purchase salt—a vital and precious mineral used for food preservation and health. This is also where the phrase "worth his salt" comes from!',
    actionableStep: 'Every rupee you earn represents real labor; make sure a portion of it stays with you permanently.',
    emoji: '🧂',
  },
  {
    id: 12,
    type: 'tip',
    title: 'The 10% Lifestyle Creep Cap',
    category: 'Mindset',
    content: 'When you get a raise, allowance increase, or finish a lucrative freelance gig, human nature wants to instantly upgrade everything. Cap your lifestyle upgrade to 10–20% of the raise, and automatically funnel the remaining 80% into assets or savings.',
    actionableStep: 'Celebrate small wins with a modest treat, but lock in the wealth upgrade permanently.',
    emoji: '🎯',
  }
];

export function getDailyFinancialTip(indexOffset = 0): FinancialTip {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = Math.abs((dayOfYear + indexOffset) % FINANCIAL_TIPS.length);
  return FINANCIAL_TIPS[index];
}
