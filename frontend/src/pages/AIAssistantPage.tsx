import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Bot, Sparkles, Send, User, RefreshCw, HelpCircle, ShieldCheck } from 'lucide-react';
import { chatWithAI } from '../services/aiService';
import { AIChatMessage } from '../types';

export const AIAssistantPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Welcome to CalcHub AI Master Assistant! I can solve equations, break down complex EMI/SIP formulas, suggest the right calculator for your task, or give academic advice. Ask me anything!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: AIChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const promptText = input;
    setInput('');
    setLoading(true);

    try {
      const reply = await chatWithAI(promptText);
      const aiMsg: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      //
    } finally {
      setLoading(false);
    }
  };

  const presetQuestions = [
    "Explain how EMI is calculated with an example",
    "What is the formula for Basal Metabolic Rate (BMR)?",
    "Calculate 15% compound interest on $10,000 for 3 years",
    "Which calculator should I use for safe attendance bunks?",
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="CalcHub AI Assistant"
        description="Interactive step-by-step problem solver and calculator recommender."
        badge="Gemini AI Engine"
      />

      {/* Preset Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {presetQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInput(q);
            }}
            className="px-3 py-1.5 rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400 border border-accent-500/20 text-xs font-semibold whitespace-nowrap hover:bg-accent-500/20 transition-colors"
          >
            💡 {q}
          </button>
        ))}
      </div>

      {/* Main Chat Box */}
      <div className="glass-card h-[600px] flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-accent-600 text-white shadow-md'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div
                className={`max-w-[85%] p-4 rounded-3xl ${
                  msg.sender === 'user'
                    ? 'bg-brand-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-sm rounded-tl-none'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-line text-sm">{msg.text}</p>
                <span
                  className={`text-[10px] block mt-2 ${
                    msg.sender === 'user' ? 'text-brand-200' : 'text-gray-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-accent-500 font-semibold p-4">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>CalcHub AI is processing step-by-step mathematical solution...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question or formula (e.g. solve 3x + 5 = 20)..."
            className="flex-1 bg-gray-100 dark:bg-gray-800 text-sm px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-accent-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-accent-600 to-brand-600 hover:from-accent-500 hover:to-brand-500 text-white font-bold text-sm disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg"
          >
            <span>Ask AI</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
