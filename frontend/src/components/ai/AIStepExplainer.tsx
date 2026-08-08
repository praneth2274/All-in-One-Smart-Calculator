import React, { useState } from 'react';
import { Sparkles, RefreshCw, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { explainCalculationWithAI } from '../../services/aiService';

interface AIStepExplainerProps {
  calculatorTitle: string;
  formula: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
}

export const AIStepExplainer: React.FC<AIStepExplainerProps> = ({
  calculatorTitle,
  formula,
  inputs,
  results,
}) => {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const fetchExplanation = async () => {
    setLoading(true);
    try {
      const res = await explainCalculationWithAI(calculatorTitle, formula, inputs, results);
      setExplanation(res);
    } catch (e) {
      setExplanation('Failed to fetch step-by-step breakdown. Check network connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-accent-500/30 bg-gradient-to-br from-accent-500/5 via-brand-500/5 to-indigo-500/5 dark:from-accent-950/30 dark:to-brand-950/30 p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-accent-500/10 text-accent-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              AI Step-by-Step Explanation
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Get an instant mathematical & logical breakdown from CalcHub AI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!explanation ? (
            <button
              onClick={fetchExplanation}
              disabled={loading}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-accent-600 to-brand-600 hover:from-accent-500 hover:to-brand-500 text-white text-xs font-bold shadow-md disabled:opacity-50 transition-all"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Generate AI Breakdown
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {explanation && isExpanded && (
        <div className="mt-4 pt-4 border-t border-accent-500/20 text-xs text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line space-y-2 animate-fade-in">
          <div className="p-3 rounded-xl bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800">
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
};
