import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// Fallback smart responses for offline / development without API key
function getFallbackAdvice(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes('save') || lower.includes('saving') || lower.includes('50/30/20')) {
    return `🎯 **Smart Saving for Students & Youth:**\n\n1. **The 50/30/20 Rule**: Allocate 50% for Needs (food, transit, study essentials), 30% for Wants (hangouts, entertainment), and 20% directly into Savings.\n2. **Start Small, Start Today**: Even saving ₹20 to ₹100 a day builds financial discipline. That's ₹600 to ₹3,000 monthly!\n3. **Automate It**: Put your savings into a separate bank account or recurring deposit as soon as you get allowance or income so you're not tempted to spend it.`;
  }
  if (lower.includes('invest') || lower.includes('sip') || lower.includes('mutual fund') || lower.includes('stock')) {
    return `📈 **Investing 101 for Beginners:**\n\n1. **Power of Compound Interest**: If you start investing ₹1,000/month at age 18 with a 12% average annual return, you could amass over ₹35+ Lakhs by age 40!\n2. **SIP (Systematic Investment Plan)**: Allows you to invest a small fixed amount monthly in diversified Index Funds (e.g., Nifty 50) without trying to time the market.\n3. **Golden Rule**: Never invest money you'll need in the next 1-2 years in volatile equities. Build an emergency fund first!`;
  }
  if (lower.includes('earn') || lower.includes('make money') || lower.includes('student') || lower.includes('freelance') || lower.includes('hustle')) {
    return `💼 **High-Value Ways for Youth to Earn:**\n\n1. **Freelance Digital Skills**: Graphic design (Canva/Figma), short-form video editing, content writing, or social media management.\n2. **Peer Tutoring**: Teach younger school students math, coding, or English.\n3. **Campus Ambassador / Event Coordination**: Coordinate college fests or brand activations.\n4. **Key Tip**: Your primary investment at this age is building high-income skills (communication, coding, sales).`;
  }
  if (lower.includes('credit') || lower.includes('debt') || lower.includes('loan') || lower.includes('card')) {
    return `💳 **Credit Cards & Debt Traps to Avoid:**\n\n1. **Credit is NOT Free Money**: Always treat a credit card like a debit card—never spend money you don't already have in your bank account.\n2. **Pay in Full**: Paying only the "Minimum Amount Due" triggers interest rates up to 40% annually!\n3. **Build Credit Score Early**: When eligible (18+), using a secured credit card and paying 100% on time creates a strong CIBIL/Credit score for lower loan rates in the future.`;
  }
  if (lower.includes('budget') || lower.includes('expense') || lower.includes('track')) {
    return `📊 **Zero-Stress Budgeting Tips:**\n\n1. **Track for 14 Days**: Write down every snack, coffee, and subscription for two weeks. Small leaks sink great ships!\n2. **Categorize Before Spending**: Divide your monthly allowance into 3 virtual envelopes: Daily Needs, Social/Fun, and Untouchable Savings.\n3. **Use MoneyWise**: Log every income and expense in the Budget tab of this app to watch your balance update in real-time!`;
  }
  return `💡 **MoneyWise Youth Financial Coach:**\n\nFinancial freedom isn't about how much money you make; it's about how much money you keep and how hard it works for you!\n\nFeel free to ask me about:\n- How to invest with just ₹500/month (SIPs)\n- The 50/30/20 budgeting rule explained\n- Top side hustles for students in 2026\n- How to build an Emergency Fund`;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, chatHistory = [], userContext = {} } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Graceful fallback when GEMINI_API_KEY is not set
      const reply = getFallbackAdvice(message);
      res.json({ reply, source: 'offline-coach' });
      return;
    }

    const systemInstruction = `You are "MoneyWise Coach", an empathetic, energetic, and practical financial literacy mentor for teenagers, college students, and youth.
Tone: Encouraging, friendly, clear, actionable, free of convoluted Wall Street jargon.
Audience: Indian and global youth aged 14–25 learning budgeting, saving, investing (SIPs, index funds), earning, avoiding scams, and building smart habits.
Currency: Use ₹ (Indian Rupee) or general examples.
Formatting: Use clear bullet points, bold highlights, and friendly emojis. Keep answers concise (under 200 words) so they are fast and engaging to read on mobile.
Current student context: Balance: ₹${userContext.balance || 0}, Coins: ${userContext.coins || 0}, Active Goals: ${userContext.goalsCount || 0}.`;

    const contents = [
      ...chatHistory.slice(-6).map((item: { role: string; content: string }) => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: item.content }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || getFallbackAdvice(message);
    res.json({ reply, source: 'gemini' });
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    // Return fallback advice so the user never gets an error screen
    const fallback = getFallbackAdvice(req.body?.message || '');
    res.json({ reply: fallback, source: 'offline-coach' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MoneyWise server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
