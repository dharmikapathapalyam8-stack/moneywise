import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Bot, Send, Sparkles, RefreshCw, User, ShieldAlert, Coins } from 'lucide-react';

interface AiAssistantViewProps {
  balance: number;
  coins: number;
  goalsCount: number;
}

const STARTER_PROMPTS = [
  'What is the 50/30/20 rule?',
  'How to start investing with ₹500/month?',
  'Top side hustles for students?',
  'Explain compound interest simply',
  'How do credit card traps work?',
];

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({
  balance,
  coins,
  goalsCount,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'bot',
      text: 'Hi! I’m your Money Assistant. Ask me anything about saving, investing, earning, or budgeting.',
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          chatHistory: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text,
          })),
          userContext: {
            balance,
            coins,
            goalsCount,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || 'I am here to guide your money journey! Ask me about saving, investing, or budgeting.';

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.warn('AI request failed, applying local fallback:', err);
      // Local graceful fallback
      let fallback = "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings. Start with even ₹500/month!";
      const lower = text.toLowerCase();
      if (lower.includes('invest') || lower.includes('sip') || lower.includes('stock')) {
        fallback = "For beginners, start a monthly SIP in index funds (like Nifty 50). Even ₹500/month compounds tremendously over 10-20 years!";
      } else if (lower.includes('earn') || lower.includes('make money')) {
        fallback = "As a student you can try freelancing (video editing, Canva design, writing), tutoring, or campus events. High-income skills create long-term wealth!";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          text: fallback,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'init',
        sender: 'bot',
        text: 'Hi! I’m your Money Assistant. Ask me anything about saving, investing, earning, or budgeting.',
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div id="ai" className="space-y-4">
      {/* HEADER CARD */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
              <span>AI Money Assistant</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                Online
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Instant advice on saving, investing, budgeting & earning.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearChat}
          title="Reset conversation"
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* QUICK SUGGESTIONS CHIPS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        <span className="text-slate-500 text-[11px] shrink-0 font-medium mr-1">
          Suggestions:
        </span>
        {STARTER_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl text-xs shrink-0 border border-slate-700/80 transition-all cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* CHAT CONTAINER with id="chatBox" */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div
          id="chatBox"
          ref={chatBoxRef}
          className="h-[360px] sm:h-[400px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-700"
        >
          {messages.map((m) => {
            const isBot = m.sender === 'bot';
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-7 h-7 rounded-xl bg-blue-600/30 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 text-xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`msg ${
                    isBot
                      ? 'bot bg-slate-800 border border-slate-700/70 text-slate-200 rounded-2xl rounded-bl-sm'
                      : 'user bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-br-sm shadow-md'
                  } max-w-[85%] p-3 text-xs sm:text-sm leading-relaxed`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      isBot ? 'text-slate-500' : 'text-blue-200/70'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>

                {!isBot && (
                  <div className="w-7 h-7 rounded-xl bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 flex items-center justify-center shrink-0 text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5 items-center text-xs text-slate-400">
              <div className="w-7 h-7 rounded-xl bg-blue-600/30 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-sm border border-slate-700 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse delay-150" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse delay-300" />
                <span className="text-[11px] text-slate-400 ml-1">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* INPUT FORM with id="chatInput" and Send button */}
        <div className="pt-3 mt-3 border-t border-slate-800 flex items-center gap-2">
          <input
            id="chatInput"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about saving, investing, budgeting, or student jobs..."
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden xs:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
