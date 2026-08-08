import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Calculator as CalcIcon, ArrowRight, Sparkles } from 'lucide-react';
import { fetchCalculators } from '../../services/calculatorService';
import { Calculator } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Calculator[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
          setQuery('');
        }
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const searchTools = async () => {
      const data = await fetchCalculators({ search: query });
      setResults(data.slice(0, 8));
    };
    searchTools();
  }, [query, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
        
        {/* Input Bar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search EMI, Scientific, BMI, GPA, Currency, Unit Converters..."
            className="w-full bg-transparent outline-none text-base text-gray-900 dark:text-white placeholder-gray-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          {results.length > 0 ? (
            results.map((calc) => (
              <div
                key={calc.slug}
                onClick={() => {
                  navigate(`/calculator/${calc.slug}`);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-50 dark:hover:bg-gray-800/80 cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-100 dark:bg-gray-800 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <CalcIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                      {calc.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      {calc.category} — {calc.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-400">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-brand-500 opacity-60" />
              <p className="text-sm">No calculators match your search.</p>
              <p className="text-xs text-gray-500 mt-1">Try keywords like "EMI", "BMI", "GPA", "Age", or "Percentage".</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800/40 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
          <span>Navigate 40+ Calculators with instant preview</span>
          <span className="font-mono">ESC to close</span>
        </div>

      </div>
    </div>
  );
};
