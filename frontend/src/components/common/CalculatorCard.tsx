import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator as CalcIcon, Heart, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { Calculator } from '../../types';
import { useCalculatorContext } from '../../context/CalculatorContext';
import * as Icons from 'lucide-react';

interface CalculatorCardProps {
  calc: Calculator;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ calc }) => {
  const { isFavorite, toggleFavoriteSlug } = useCalculatorContext();
  const fav = isFavorite(calc.slug);

  // Dynamically pick icon
  const IconComponent = (Icons as any)[calc.icon] || CalcIcon;

  return (
    <div className="group relative glass-card p-6 flex flex-col justify-between hover:shadow-2xl hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all duration-300 transform hover:-translate-y-1.5">
      
      {/* Top Bar */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500/10 via-accent-500/10 to-indigo-500/10 dark:from-brand-500/20 dark:to-accent-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-sm">
          <IconComponent className="w-6 h-6" />
        </div>

        <div className="flex items-center gap-1.5">
          {calc.isPopular && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              <TrendingUp className="w-3 h-3" /> Popular
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavoriteSlug(calc.slug, calc.title, calc.category);
            }}
            className={`p-2 rounded-xl border transition-all ${
              fav
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-500 border-rose-200 dark:border-rose-800'
                : 'bg-gray-50 dark:bg-gray-800/50 text-gray-400 border-gray-200 dark:border-gray-700 hover:text-rose-500'
            }`}
            title={fav ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 mb-6">
        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          {calc.category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {calc.title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {calc.description}
        </p>
      </div>

      {/* Footer link */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
        <span className="text-[11px] font-medium text-gray-400">
          {calc.usageCount ? `${calc.usageCount.toLocaleString()} uses` : 'Active'}
        </span>
        <Link
          to={`/calculator/${calc.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform"
        >
          Open Tool <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
