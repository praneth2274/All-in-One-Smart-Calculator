import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, RefreshCw, MessageSquare } from 'lucide-react';
import { chatWithAI } from '../../services/aiService';
import { AIChatMessage } from '../../types';

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am CalcHub AI Assistant. I can help solve math expressions, recommend calculators, explain formulas, or offer financial & health guidance. How can I assist you?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

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
      // Handled in service
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-accent-600 via-brand-600 to-indigo-600 text-white font-bold text-sm shadow-2xl hover:scale-105 transition-all duration-300 group border border-white/20"
        >
          <div className="relative">
            <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-accent-600"></span>
          </div>
          <span>CalcHub AI</span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[540px] max-h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden animate-slide-up">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-accent-600 via-brand-600 to-indigo-600 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                  CalcHub AI Assistant <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <span className="text-[11px] text-white/80">Online & Ready to Solve</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-gray-950/40 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white'
                      : 'bg-accent-600 text-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-sm rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`text-[9px] block mt-1 ${
                      msg.sender === 'user' ? 'text-brand-200' : 'text-gray-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-accent-500 font-semibold p-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>CalcHub AI is computing step-by-step response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask formula, step breakdown, financial advice..."
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-accent-500 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-accent-600 to-brand-600 hover:from-accent-500 hover:to-brand-500 text-white disabled:opacity-50 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
