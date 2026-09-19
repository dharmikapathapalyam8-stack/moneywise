export interface DailyQuote {
  id: number;
  quote: string;
  author: string;
  tagline: string;
  theme: 'Life & Freedom' | 'Mindset' | 'Habits & Compounding' | 'Patience' | 'True Wealth' | 'Financial Wisdom';
}

export const DAILY_QUOTES: DailyQuote[] = [
  {
    id: 1,
    quote: "The highest form of wealth is the ability to wake up every morning and say, 'I can do whatever I want today.'",
    author: "Morgan Housel",
    tagline: "Author of The Psychology of Money",
    theme: "Life & Freedom"
  },
  {
    id: 2,
    quote: "A budget doesn't limit your freedom; it gives you the freedom to spend without guilt on what truly matters to you.",
    author: "Dave Ramsey",
    tagline: "Financial Author & Educator",
    theme: "Habits & Compounding"
  },
  {
    id: 3,
    quote: "Do not save what is left after spending, but spend what is left after saving.",
    author: "Warren Buffett",
    tagline: "Legendary Investor",
    theme: "Financial Wisdom"
  },
  {
    id: 4,
    quote: "Spending money to show people how much money you have is the fastest way to have less money.",
    author: "Morgan Housel",
    tagline: "Financial Philosopher",
    theme: "Mindset"
  },
  {
    id: 5,
    quote: "Money is a terrible master but an excellent servant. When you control it, life opens doors; when it controls you, life shuts them.",
    author: "P.T. Barnum",
    tagline: "Timeless Life Principle",
    theme: "Life & Freedom"
  },
  {
    id: 6,
    quote: "It’s not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for.",
    author: "Robert Kiyosaki",
    tagline: "Rich Dad Poor Dad",
    theme: "Financial Wisdom"
  },
  {
    id: 7,
    quote: "Small daily disciplines compounding over decades create financial miracles that luck never can.",
    author: "John C. Bogle",
    tagline: "Founder of Vanguard",
    theme: "Habits & Compounding"
  },
  {
    id: 8,
    quote: "Never buy things you don't need, with money you don't have, to impress people you don't even like.",
    author: "Will Rogers",
    tagline: "Social Humorist & Thinker",
    theme: "Mindset"
  },
  {
    id: 9,
    quote: "An investment in knowledge pays the best interest. What you learn today stays in your head forever.",
    author: "Benjamin Franklin",
    tagline: "Founding Father & Polymath",
    theme: "Financial Wisdom"
  },
  {
    id: 10,
    quote: "Wealth is not about having a lot of money; it's about having a lot of options.",
    author: "Chris Rock",
    tagline: "Life Perspective",
    theme: "Life & Freedom"
  },
  {
    id: 11,
    quote: "Patience and emotional discipline are far greater superpowers in finance than raw mathematical genius.",
    author: "Charlie Munger",
    tagline: "Vice Chairman of Berkshire Hathaway",
    theme: "Patience"
  },
  {
    id: 12,
    quote: "Real wealth is what you don’t see: the peaceful sleep, the emergency fund untouched, the quiet freedom of zero debt.",
    author: "Naval Ravikant",
    tagline: "Entrepreneur & Angel Philosopher",
    theme: "True Wealth"
  },
  {
    id: 13,
    quote: "If you want to be rich, think of saving as well as getting. A small leak will sink a great ship.",
    author: "Poor Richard’s Almanac",
    tagline: "Classic Wisdom",
    theme: "Habits & Compounding"
  },
  {
    id: 14,
    quote: "Financial peace isn’t the acquisition of stuff. It’s learning to live on less than you make so you can give back and invest.",
    author: "Rachel Cruze",
    tagline: "Youth Financial Coach",
    theme: "Life & Freedom"
  },
  {
    id: 15,
    quote: "The stock market is a device for transferring money from the impatient to the patient.",
    author: "Warren Buffett",
    tagline: "Value Investor",
    theme: "Patience"
  },
  {
    id: 16,
    quote: "Too many people spend their youth working for money. Wise youth spend their youth learning how money works for them.",
    author: "Financial Literacy Motto",
    tagline: "Youth Mindset",
    theme: "Mindset"
  },
  {
    id: 17,
    quote: "True freedom begins the day you realize that your self-worth has nothing to do with your net worth or brand labels.",
    author: "Seneca",
    tagline: "Stoic Philosopher",
    theme: "True Wealth"
  },
  {
    id: 18,
    quote: "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it.",
    author: "Albert Einstein",
    tagline: "Physicist & Thinker",
    theme: "Habits & Compounding"
  },
  {
    id: 19,
    quote: "Rich people stay rich by living like they're broke. Broke people stay broke by living like they're rich.",
    author: "Youth Money Truth",
    tagline: "Street Financial Logic",
    theme: "Mindset"
  },
  {
    id: 20,
    quote: "Every rupee you save today is an hour of freedom bought for your future self.",
    author: "MoneyWise Wisdom",
    tagline: "Core Youth Principle",
    theme: "Life & Freedom"
  }
];

/**
 * Returns a stable, deterministic quote for today's calendar date.
 */
export function getDailyQuote(offsetDays: number = 0): DailyQuote {
  const now = new Date();
  if (offsetDays !== 0) {
    now.setDate(now.getDate() + offsetDays);
  }
  // Day of year calculation for stable 365-day rotation
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = Math.abs((dayOfYear + now.getFullYear()) % DAILY_QUOTES.length);
  return DAILY_QUOTES[index];
}
