import {
  BookItem,
  QuizQuestion,
  DilemmaScenario,
  SurvivalScenario,
  LifeCostItem,
  CompoundScenario,
  ScamScenario,
} from '../types';

export const INITIAL_BOOKS: BookItem[] = [
  {
    id: 1,
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    cost: 50,
    category: 'Mindset & Assets',
    coverColor: 'from-amber-600 to-yellow-800',
    coverEmoji: '🏛️',
    synopsis: 'What the rich teach their kids about money that the poor and middle class do not. The foundation of financial literacy.',
    keyLessons: [
      'Assets put money into your pocket; liabilities take money out of your pocket.',
      'The rich buy assets first (stocks, businesses, real estate); others buy liabilities they think are assets.',
      'Work to learn, not just to earn. Acquire skills in sales, marketing, accounting, and leadership.',
      'Overcoming fear of failure is the critical difference between the financially free and the trapped.'
    ],
    studentTakeaway: 'Start building small income-generating digital or financial assets in your student years instead of upgrading gadgets on credit.',
    favoriteQuote: '"It\'s not how much money you make. It\'s how much money you keep, and how many generations you keep it for."'
  },
  {
    id: 2,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    cost: 40,
    category: 'Behavior & Habits',
    coverColor: 'from-emerald-700 to-teal-900',
    coverEmoji: '🧠',
    synopsis: 'Timeless lessons on wealth, greed, and happiness. Doing well with money has a little to do with how smart you are and a lot to do with how you behave.',
    keyLessons: [
      'Spending money to show people how much money you have is the fastest way to have less money.',
      'True wealth is what you don\'t see: the unbought cars, the unworn luxury watches, the bank balance.',
      'Room for error: Always keep a cash buffer so bad luck doesn\'t knock you out of the game.',
      'Compounding only works if you don\'t interrupt it unnecessarily.'
    ],
    studentTakeaway: 'Focus on staying humble and patient. Good financial habits beat high IQ every single time.',
    favoriteQuote: '"Wealth is the nice cars not purchased. The diamonds not bought. The watches not worn."'
  },
  {
    id: 3,
    title: 'I Will Teach You To Be Rich',
    author: 'Ramit Sethi',
    cost: 45,
    category: 'Practical Systems',
    coverColor: 'from-blue-700 to-indigo-950',
    coverEmoji: '⚡',
    synopsis: 'A no-guilt, 6-week personal finance program that works. Focus on automating finances and spending extravagantly on things you love while cutting costs on what you don\'t.',
    keyLessons: [
      'Automate everything: Have bank accounts automatically route income to bills, savings, and investments.',
      'Conscious spending: Spend guilt-free on the things you truly care about by aggressively cutting back on things you don\'t.',
      'Focus on Big Wins: Negotiating salary or cutting major fees matters 100x more than cutting a ₹50 coffee.',
      'Start investing now, even with small pocket money.'
    ],
    studentTakeaway: 'Set up automated bank transfers so saving happens without you having to rely on daily willpower.',
    favoriteQuote: '"There is a limit to how much you can cut, but no limit to how much you can earn."'
  },
  {
    id: 4,
    title: 'Atomic Habits (Money Edition)',
    author: 'James Clear',
    cost: 35,
    category: 'Habit Formation',
    coverColor: 'from-orange-600 to-rose-800',
    coverEmoji: '🔥',
    synopsis: 'Tiny changes, remarkable results. How small daily money micro-habits compound into colossal financial independence.',
    keyLessons: [
      'Improving your savings or skills by just 1% every day makes you 37 times better in a single year.',
      'Make good financial habits obvious, attractive, easy, and satisfying.',
      'Make impulse spending invisible, difficult, and unsatisfying (e.g., delete saved card details on shopping apps).',
      'You do not rise to the level of your goals; you fall to the level of your systems.'
    ],
    studentTakeaway: 'Save ₹50 daily consistently rather than waiting for a big lump sum that may never come.',
    favoriteQuote: '"You do not rise to the level of your goals. You fall to the level of your systems."'
  },
  {
    id: 5,
    title: 'The Richest Man in Babylon',
    author: 'George S. Clason',
    cost: 30,
    category: 'Ancient Wisdom',
    coverColor: 'from-purple-800 to-slate-900',
    coverEmoji: '📜',
    synopsis: 'The timeless parables of ancient Babylon that reveal the enduring laws of acquiring, growing, and protecting gold.',
    keyLessons: [
      'A part of all you earn is yours to keep: Save at least one-tenth (10%) of all you earn.',
      'Make your gold multiply: Put your savings to work where they earn interest and dividends.',
      'Guard your treasures from loss: Consult experts and avoid speculative gambles with tempting promises.',
      'Insure a future income: Prepare for age and adversity.'
    ],
    studentTakeaway: 'Pay yourself a 10% tax on everything you earn before paying any company or shopkeeper.',
    favoriteQuote: '"A part of all you earn is yours to keep. It should be not less than a tenth."'
  }
];

export const QUIZ_BANK: QuizQuestion[] = [
  {
    id: 1,
    question: 'According to the popular 50/30/20 budgeting rule, what percentage of your income should go toward savings?',
    options: ['50%', '30%', '20%', '10%'],
    correctIndex: 2,
    explanation: 'The 50/30/20 rule recommends 50% for Needs, 30% for Wants, and 20% for Savings and Investments.'
  },
  {
    id: 2,
    question: 'How many months of basic living expenses should an ideal Emergency Fund cover?',
    options: ['1 month', '3 to 6 months', '12 to 24 months', 'None if you have a credit card'],
    correctIndex: 1,
    explanation: 'Financial advisors recommend keeping 3 to 6 months of essential living expenses in an easily accessible emergency fund.'
  },
  {
    id: 3,
    question: 'What does the acronym "SIP" stand for in personal finance?',
    options: [
      'Standard Income Portfolio',
      'Systematic Investment Plan',
      'Secure Interest Provider',
      'Savings Investment Policy'
    ],
    correctIndex: 1,
    explanation: 'SIP stands for Systematic Investment Plan, an automated method to invest a fixed amount regularly into mutual funds.'
  },
  {
    id: 4,
    question: 'If you invest ₹10,000 at 10% annual compound interest, how much will you have after 2 years?',
    options: ['₹11,000', '₹12,000', '₹12,100', '₹15,000'],
    correctIndex: 2,
    explanation: 'Year 1: ₹10,000 + 10% = ₹11,000. Year 2: ₹11,000 + 10% = ₹12,100. That extra ₹100 is interest on interest!'
  },
  {
    id: 5,
    question: 'Which of the following is an "Asset" according to Robert Kiyosaki?',
    options: [
      'An expensive sports car you drive for fun',
      'A designer jacket bought on discount',
      'An index mutual fund that pays dividends into your account',
      'The latest flagship smartphone on EMI'
    ],
    correctIndex: 2,
    explanation: 'An asset puts money into your pocket. The car, phone EMI, and clothes take money out of your pocket.'
  },
  {
    id: 6,
    question: 'What happens if you only pay the "Minimum Amount Due" on a credit card statement?',
    options: [
      'You pay zero extra fees',
      'The bank waives your remaining balance',
      'You are charged massive interest rates (36%–42% p.a.) on the remaining unpaid balance',
      'Your credit score automatically maxes out'
    ],
    correctIndex: 2,
    explanation: 'Paying only the minimum due incurs exorbitant compound interest on the balance and can lead to a debt spiral.'
  },
  {
    id: 7,
    question: 'What does "Inflation" do to your money sitting idle under a mattress?',
    options: [
      'It increases its purchasing power',
      'It decreases its purchasing power over time',
      'It doubles the paper value',
      'It has no effect on physical cash'
    ],
    correctIndex: 1,
    explanation: 'Inflation means prices of goods rise over time, so ₹1,000 today buys fewer items in the future if not invested.'
  },
  {
    id: 8,
    question: 'When receiving money via UPI on a phone, do you ever need to enter your UPI PIN?',
    options: [
      'Yes, always to confirm acceptance',
      'Only if the amount is above ₹500',
      'NO, NEVER. UPI PIN is only needed to SEND/PAY money',
      'Yes, if the sender requests it'
    ],
    correctIndex: 2,
    explanation: 'Entering your UPI PIN always deducts money from your account! Scammers trick victims into entering PINs to "receive" money.'
  }
];

export const DILEMMA_SCENARIOS: DilemmaScenario[] = [
  {
    id: 1,
    title: 'Brand New Sneakers vs Index Fund',
    cost: 4000,
    description: 'A limited-edition sneaker dropped for ₹4,000. Your current shoes are still in good condition, but your friends are raving about them.',
    saveOutcome: 'You resist the impulse! You deposit ₹4,000 into your savings goal. In 5 years at 12% compound returns, this grows into ₹7,049!',
    spendOutcome: 'You bought the sneakers. They look cool for a month, but lose 60% of their resale value the moment you step outside.',
    compoundValue5Years: 7049,
    tip: 'Apply the 72-hour rule before buying hype items.'
  },
  {
    id: 2,
    title: 'Daily Cafe Lattes & Snacks vs Home Brew',
    cost: 2500,
    description: 'You are spending ₹150 every day on iced lattes and pastry snacks at campus cafes (₹2,500/month). Making cold coffee at home costs ₹30.',
    saveOutcome: 'You make drinks at home and save ₹2,000 monthly! In 3 years, that saved amount compounds to ₹88,000+!',
    spendOutcome: 'Convenient and delicious, but you spend ₹30,000 per year just on liquid sugar and plastic cups.',
    compoundValue5Years: 182400,
    tip: 'Small daily micro-leaks are the #1 reason students wonder where all their money vanished.'
  },
  {
    id: 3,
    title: 'Course Skill Certification vs Weekend Party Binge',
    cost: 1500,
    description: 'You have ₹1,500 left this week. A friend suggests clubbing and drinks, but a high-rated UI Design / Python certification course is on flash sale for ₹1,499.',
    saveOutcome: 'You invest in the course! 3 months later, that skill lands you a freelance project paying ₹15,000!',
    spendOutcome: 'Fun Saturday night, but by Monday your wallet is empty and you have a hangover.',
    compoundValue5Years: 15000,
    tip: 'Investing in your own earning skills has an infinite ROI in your early 20s.'
  },
  {
    id: 4,
    title: 'Flash Gadget Sale on EMI vs Waiting',
    cost: 12000,
    description: 'A new smart tablet is on "No-Cost EMI" for ₹2,000/month for 6 months. You already have a laptop that works for all assignments.',
    saveOutcome: 'You pass on the EMI. You keep your cashflow free and avoid committing future income you haven\'t earned yet.',
    spendOutcome: 'You locked in a monthly obligation. If an unexpected emergency occurs, paying that EMI will cause intense stress.',
    compoundValue5Years: 21150,
    tip: 'If you cannot afford to buy it twice in cash today, you cannot afford it on EMI.'
  }
];

// ==========================================
// MIND GAME 1: 30-DAY LIFE SURVIVAL SIMULATION
// ==========================================
export const SURVIVAL_SCENARIOS: SurvivalScenario[] = [
  {
    id: 1,
    day: 3,
    title: 'The Landlord Ultimatum & Utility Deposit',
    category: 'Housing',
    situation: 'Your landlord demands ₹7,000 for your monthly room share plus an unexpected ₹1,500 building maintenance fee. You only have ₹25,000 starting cash for all 30 days.',
    choices: [
      {
        text: 'Pay ₹8,500 immediately with a respectful note.',
        cost: 8500,
        stressDelta: -10,
        dignityDelta: 15,
        feedback: 'Your landlord trusts you and promises fixed rent for the year. Having money bought you a secure roof over your head.',
        lifeLesson: 'Housing and shelter are non-negotiable fundamentals. Money protects you from homelessness and constant landlord harassment.'
      },
      {
        text: 'Argue and delay payment by 2 weeks to hoard cash.',
        cost: 0,
        stressDelta: 30,
        dignityDelta: -25,
        feedback: 'The landlord cuts off Wi-Fi and threatens eviction within 48 hours with a late penalty fee of ₹1,000.',
        lifeLesson: 'Avoiding obligations creates compounding stress. Money buys peace of mind when paid on time.'
      },
      {
        text: 'Borrow ₹8,500 from an aggressive peer-to-peer quick cash app.',
        cost: 1500,
        stressDelta: 40,
        dignityDelta: -30,
        feedback: 'The loan app charges 40% annualized interest and spams your contact list with payment reminders.',
        lifeLesson: 'Without savings, you become desperate prey to predatory lenders. Never borrow for routine living costs.'
      }
    ]
  },
  {
    id: 2,
    day: 8,
    title: 'Peer Pressure VIP Weekend Night Out',
    category: 'Social & Friends',
    situation: 'Your college group is celebrating at an upscale lounge. Everyone expects to split the ₹3,500/head bill. You want to fit in, but your budget is tight.',
    choices: [
      {
        text: 'Join and recklessly order drinks/food (₹3,500).',
        cost: 3500,
        stressDelta: 20,
        dignityDelta: -10,
        feedback: 'You had 3 hours of fun, but waking up to see ₹3,500 gone creates instant stomach-knotting panic for the remaining 22 days.',
        lifeLesson: 'Buying approval with money you don’t have is a psychological trap. Real friends don’t gauge loyalty by bill sizes.'
      },
      {
        text: 'Attend, drink mineral water/juice, and contribute ₹600.',
        cost: 600,
        stressDelta: -5,
        dignityDelta: 20,
        feedback: 'You enjoyed the social connection, owned your financial boundaries with confidence, and saved ₹2,900!',
        lifeLesson: 'Confident financial boundaries earn respect. The ability to comfortably say "That’s outside my budget" is true maturity.'
      },
      {
        text: 'Host a movie night or potluck at home for friends (₹400).',
        cost: 400,
        stressDelta: -10,
        dignityDelta: 15,
        feedback: 'Your friends loved the relaxed vibe and actually thanked you for saving them money too!',
        lifeLesson: 'Leadership is creating low-cost shared memories without bankrupting yourself or others.'
      }
    ]
  },
  {
    id: 3,
    day: 14,
    title: 'Broken Laptop Screen 4 Days Before Final Submission',
    category: 'Emergency',
    situation: 'Your laptop slips off the desk. The display is blacked out. You have your final capstone and client project due this Friday!',
    choices: [
      {
        text: 'Official authorized express repair (₹5,500) with 1-year warranty.',
        cost: 5500,
        stressDelta: -20,
        dignityDelta: 15,
        feedback: 'Fixed within 24 hours. You ace your presentation and retain your freelancing contract.',
        lifeLesson: 'Money is an insurance shield. It converts catastrophic, life-derailing disasters into mere minor inconveniences.'
      },
      {
        text: 'Buy an HDMI cable (₹400) and hook it to your friend’s old TV monitor.',
        cost: 400,
        stressDelta: 10,
        dignityDelta: 10,
        feedback: 'Resourceful! A bit clumsy to move, but you complete your submissions while preserving ₹5,100.',
        lifeLesson: 'Creativity and frugality can bridge emergencies when cash is tight.'
      },
      {
        text: 'Take a new laptop on a 24-month high-interest EMI (₹3,000/mo).',
        cost: 3000,
        stressDelta: 35,
        dignityDelta: -20,
        feedback: 'You now locked yourself into a 2-year debt sentence before even graduating.',
        lifeLesson: 'Never turn a short-term equipment glitch into a multi-year debt anchor.'
      }
    ]
  },
  {
    id: 4,
    day: 19,
    title: 'Sudden Food Poisoning & Hospitalization',
    category: 'Health',
    situation: 'Violent stomach infection hits at 2 AM. You require IV fluids, blood diagnostics, and antibiotics at an emergency clinic costing ₹4,200.',
    choices: [
      {
        text: 'Pay ₹4,200 from your emergency cash buffer without hesitation.',
        cost: 4200,
        stressDelta: -25,
        dignityDelta: 20,
        feedback: 'You received proper medical care immediately, recovered fully in 48 hours, and didn’t have to beg relatives.',
        lifeLesson: 'Money is literally health and survival. When medical crises strike, lack of money is terrifying.'
      },
      {
        text: 'Delay hospital visit, take over-the-counter painkillers (₹150).',
        cost: 150,
        stressDelta: 50,
        dignityDelta: -15,
        feedback: 'Condition worsens significantly by morning; you require ambulance transport costing double later.',
        lifeLesson: 'Skimping on urgent health because of poverty creates immense physical suffering.'
      }
    ]
  },
  {
    id: 5,
    day: 24,
    title: 'College Friend’s "Guaranteed 3x Crypto Meme Coin" Pitch',
    category: 'Greed & FOMO',
    situation: 'A classmate shows you a wallet showing ₹1,50,000 made in 3 days: "Bro, put ₹4,000 into this token tonight, it’s listing tomorrow, 300% guaranteed!"',
    choices: [
      {
        text: 'Politely pass: "I only invest in businesses and assets I understand."',
        cost: 0,
        stressDelta: -10,
        dignityDelta: 25,
        feedback: '3 days later, the anonymous founder dumped all tokens ("rug pull"). Your friend lost his entire savings. You protected your sweat-earned cash!',
        lifeLesson: 'Rule #1 of money: Never lose principal. Greed and impatience are the fastest route to financial ruin.'
      },
      {
        text: 'FOMO hits: Invest ₹4,000 hoping for quick riches.',
        cost: 4000,
        stressDelta: 45,
        dignityDelta: -30,
        feedback: 'The token plummeted 98% in 4 hours. Your ₹4,000 is now worth ₹80. You cannot pay next week’s groceries.',
        lifeLesson: 'If high returns were guaranteed without risk, billionaires wouldn’t bother with index funds.'
      }
    ]
  },
  {
    id: 6,
    day: 28,
    title: 'High-Income Skill Masterclass vs End-of-Month Takeout Binge',
    category: 'Career & Skills',
    situation: 'You have your remaining buffer. An industry expert is hosting an intensive 2-day live workshop on Full-Stack AI & Freelance Client Acquisition for ₹1,800.',
    choices: [
      {
        text: 'Invest ₹1,800 into the workshop and actively implement it.',
        cost: 1800,
        stressDelta: -15,
        dignityDelta: 30,
        feedback: 'You acquire modern high-leverage workflows and connect with a mentor who refers a ₹12,000 freelance gig 2 weeks later!',
        lifeLesson: 'The best investment in your 20s is in your own earning ability. Knowledge compounds indefinitely.'
      },
      {
        text: 'Blow ₹1,800 on luxury food delivery and gaming micro-transactions.',
        cost: 1800,
        stressDelta: 15,
        dignityDelta: -15,
        feedback: 'Instant dopamine hits for 3 hours, leaving you with zero new skills and empty pockets.',
        lifeLesson: 'Trading long-term empowerment for temporary pleasure keeps people financially powerless.'
      }
    ]
  }
];

// ==========================================
// MIND GAME 2: LIFE-HOURS REALITY CALCULATOR
// ==========================================
export const LIFE_HOURS_ITEMS: LifeCostItem[] = [
  {
    id: 1,
    name: 'Flagship Smartphone on EMI',
    price: 75000,
    icon: '📱',
    category: 'Status Tech',
    reflection: 'At ₹250/hour student wage, this phone requires 300 HOURS of pure labor (nearly 38 eight-hour shifts!). Are you willing to trade 38 days of your short human life just to browse social media on a slightly brighter screen?',
    smartAlternative: 'Buy a reliable ₹18,000 device that does 95% of tasks, and invest the remaining ₹57,000 to grow your net worth.'
  },
  {
    id: 2,
    name: 'Designer Sneakers Hype Drop',
    price: 9000,
    icon: '👟',
    category: 'Status Fashion',
    reflection: 'That equals 36 hours of blood, sweat, and customer service fatigue. Walking in shoes that represent an entire work-week of physical exhaustion just to impress strangers who don’t even care about you.',
    smartAlternative: 'Quality classic sneakers for ₹2,500 that last 2 years. Real confidence comes from your achievements, not your shoelaces.'
  },
  {
    id: 3,
    name: 'Daily Cafe Caramel Frappe & Pastry (1 Month)',
    price: 6000,
    icon: '☕',
    category: 'Micro Leak',
    reflection: '₹200 every single day feels harmless, but it equals 24 hours of labor every month! You are working 3 whole days every month solely to buy sugar-flavored milk in paper cups.',
    smartAlternative: 'Brew high-grade artisanal coffee at home for ₹25/cup, saving ₹5,250 every month into your first mutual fund.'
  },
  {
    id: 4,
    name: 'VIP Club Table & Bottle Split',
    price: 4500,
    icon: '🍸',
    category: 'Entertainment',
    reflection: '18 hours of labor vanished in 4 hours of loud noise and a headache the next morning. If your boss asked you to work 18 hours unpaid on Sunday, you would revolt—yet you give that labor away voluntarily.',
    smartAlternative: 'Host a backyard BBQ or terrace game night with real meaningful conversation for ₹400.'
  },
  {
    id: 5,
    name: 'High-Impact Technical Certification',
    price: 3500,
    icon: '💡',
    category: 'Income Asset',
    reflection: 'Cost: 14 hours of current work. Potential return: Increases your hourly rate from ₹250/hr to ₹600/hr, recovering your entire investment in just 10 days of future work!',
    smartAlternative: 'This is an ASSET, not an expense. Always say YES to investments that permanently elevate your market value.'
  }
];

// ==========================================
// MIND GAME 3: THE IMPATIENCE PENALTY
// ==========================================
export const COMPOUND_SCENARIOS: CompoundScenario[] = [
  {
    id: 1,
    title: 'Daily Cigarette / Energy Drink / Junk Habit',
    monthlyCost: 3000,
    itemEmoji: '🥤',
    description: 'Spending ₹100 per day on quick dopamine fixes (sodas, vape pods, fast food snacks).',
    instantPleasure: '15 minutes of artificial stimulation followed by energy crash and dental/health wear.',
    compounded30Years: 10590000, // ₹1.05 Crores at 12% compound return over 30 years
    takeaway: 'Over 30 years at 12% annual compounding, that daily ₹100 isn’t ₹3,000/month—it is over ₹1.05 CRORE in lost wealth! You are literally burning away an entire luxury apartment.'
  },
  {
    id: 2,
    title: 'Upgrading to the Newest Phone Every 18 Months',
    monthlyCost: 4000,
    itemEmoji: '📲',
    description: 'Trading in functioning phones constantly to have the latest titanium edges and camera specs.',
    instantPleasure: 'A 2-week feeling of novelty until everyone else has the same phone.',
    compounded30Years: 14100000, // ₹1.41 Crores at 12% over 30 years
    takeaway: 'Tech companies spend billions on marketing to convince you that last year’s marvel is suddenly obsolete. Holding your tech for 4 years preserves ₹1.4 Crores of lifetime compounding.'
  },
  {
    id: 3,
    title: 'Mindless Weekend Retail Therapy & Impulse Drops',
    monthlyCost: 5000,
    itemEmoji: '🛍️',
    description: 'Shopping online when bored, stressed, or lonely to get Amazon boxes delivered.',
    instantPleasure: 'Brief unboxing excitement, then item sits in the back of your closet with tags on.',
    compounded30Years: 17600000, // ₹1.76 Crores at 12% over 30 years
    takeaway: 'Retail therapy is treating an emotional void with a financial wound. Finding healthy emotional outlets (gym, walks, reading) protects ₹1.76 Crores.'
  }
];

// ==========================================
// MIND GAME 4: SCAM & GREED PSYCHOLOGICAL TRAPS
// ==========================================
export const SCAM_SCENARIOS: ScamScenario[] = [
  {
    id: 1,
    title: 'The "Telegram VIP Stock & Crypto Insider" Group',
    scenarioText: 'A random account adds you to a group showing screenshots of ₹2,50,000 profits in 30 minutes: "Send ₹2,000 to our AI bot trader, get ₹8,000 back guaranteed in 2 hours!" Hundreds of members are posting fake praises.',
    attackerTactic: 'Exploiting GREED & Artificial Social Proof to make you think everyone is getting rich except you.',
    options: [
      {
        text: 'Report and block immediately. Real financial markets never guarantee 400% 2-hour returns.',
        isSafe: true,
        explanation: '100% correct! Those screenshots and comments are generated by bot accounts. The moment you transfer money, you are blocked.'
      },
      {
        text: 'Test with a small ₹500 transfer to see if it really works.',
        isSafe: false,
        explanation: 'Classic trap! Scammers sometimes send back ₹800 to build trust, then urge you to invest ₹25,000 which they steal completely.'
      }
    ]
  },
  {
    id: 2,
    title: 'The "Like YouTube Videos for ₹3,500/Day" Work Scam',
    scenarioText: 'You receive a WhatsApp message from "HR at Global Media": "Simple part-time job for students. Just like 10 YouTube videos and screenshot them for ₹150 each. No experience needed."',
    attackerTactic: 'Exploiting FINANCIAL DESPERATION with small easy tasks before demanding prepaid deposit tasks.',
    options: [
      {
        text: 'Refuse and delete the chat. Legitimate companies never recruit random phone numbers for liking videos.',
        isSafe: true,
        explanation: 'Spot on! This is the infamous "Task Scam". After paying ₹300, they force you to deposit ₹5,000 for "crypto processing" and steal it.'
      },
      {
        text: 'Do the first 5 likes and try to extract free cash.',
        isSafe: false,
        explanation: 'Dangerous! By engaging, your number is tagged as "vulnerable" on dark web broker lists, exposing you to targeted credential theft.'
      }
    ]
  },
  {
    id: 3,
    title: 'The "Friend in Crisis" Emergency UPI Guilt Trip',
    scenarioText: 'A friend you haven’t spoken to in 8 months calls in frantic tears: "Bro, my sibling is stuck at a hospital billing counter, I need ₹4,000 right this second on UPI, I’ll pay you back tomorrow at 10 AM, please don’t tell anyone!"',
    attackerTactic: 'Exploiting EMOTIONAL URGENCY and GUILT to bypass your logical verification circuits.',
    options: [
      {
        text: 'Pause, ask for the hospital billing name or call their sibling/parents directly to verify before sending money.',
        isSafe: true,
        explanation: 'Crucial! Often accounts or SIMs are hijacked by fraudsters, or individuals with gambling addictions fabricate emergencies.'
      },
      {
        text: 'Immediately send ₹4,000 without asking questions because friendship comes first.',
        isSafe: false,
        explanation: 'Rushing into unverified urgent transfers is how thousands lose their tuition and food money.'
      }
    ]
  },
  {
    id: 4,
    title: 'The Instant 5-Minute Cash Loan App',
    scenarioText: 'An ad on social media: "Instant ₹10,000 student loan in 2 minutes! No documents, no credit check! Just install app and accept permissions (Contacts, Media, Camera)."',
    attackerTactic: 'PREDATORY EXTORTION: Using permissions to scrape your private photos and blackmail your contacts.',
    options: [
      {
        text: 'Never install unverified loan APKs. Never give contacts/gallery permissions to lending tools.',
        isSafe: true,
        explanation: 'Exact protection! Rogue loan apps deduct 40% processing fees and then harass parents and contacts with edited photos.'
      },
      {
        text: 'Download the app, borrow ₹2,000 just for the weekend.',
        isSafe: false,
        explanation: 'A nightmare scenario: They demand ₹5,000 within 5 days and threaten to contact your college dean.'
      }
    ]
  }
];

