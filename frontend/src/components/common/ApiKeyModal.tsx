import React, { useState, useEffect } from 'react';
import { X, Key, Check, AlertCircle, ExternalLink, Trash2, Sparkles } from 'lucide-react';
import { chatWithAI } from '../../services/aiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const storedKey = localStorage.getItem('calchub_gemini_key') || '';
      setApiKey(storedKey);
      setIsSaved(!!storedKey);
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('calchub_gemini_key', apiKey.trim());
      setIsSaved(true);
      setTestResult({ success: true, message: 'Gemini API Key saved to browser local storage!' });
    } else {
      handleClear();
    }
  };

  const handleClear = () => {
    localStorage.removeItem('calchub_gemini_key');
    setApiKey('');
    setIsSaved(false);
    setTestResult({ success: false, message: 'API Key removed. CalcHub will use default backend key / smart fallback engine.' });
  };

  const handleTestKey = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: 'Please enter an API Key first.' });
      return;
    }
    setIsTesting(true);
    setTestResult(null);
    try {
      // Temporarily store to test
      localStorage.setItem('calchub_gemini_key', apiKey.trim());
      const response = await chatWithAI('Hello Gemini! Confirm you are working by replying: CalcHub AI connected successfully.');
      if (response && !response.includes('unable to reach')) {
        setTestResult({ success: true, message: '🎉 Connection Successful! Gemini AI responded clearly.' });
        setIsSaved(true);
      } else {
        setTestResult({ success: false, message: '⚠️ Could not connect with this key. Please verify your API Key.' });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: `Error testing key: ${err.message || 'Unknown error'}` });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-brand-500/10 via-indigo-500/10 to-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Connect Gemini API Key
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Power step-by-step math explanations with Google Gemini
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Google Gemini API Key
            </label>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsSaved(false);
                  setTestResult(null);
                }}
                placeholder="AIzaSy..."
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-mono"
              />
              {isSaved && (
                <span className="absolute right-3 top-3 px-2 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md flex items-center gap-1">
                  <Check className="w-3 h-3" /> Saved
                </span>
              )}
            </div>
          </div>

          {testResult && (
            <div
              className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                testResult.success
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
              }`}
            >
              {testResult.success ? (
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}

          {/* Help link */}
          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200/60 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-400 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900 dark:text-gray-200">Need a free Gemini API Key?</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                Get Key from Google AI Studio <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
              Note: You can also place your API key inside <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">backend/.env</code> under <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">GEMINI_API_KEY</code>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Key
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTestKey}
              disabled={isTesting}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-200/80 dark:bg-gray-800 hover:bg-gray-300/80 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {isTesting ? 'Testing Key...' : 'Test Connection'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-md shadow-brand-500/20 transition-all"
            >
              Save Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
