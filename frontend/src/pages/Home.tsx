import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator as CalcIcon,
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  Search,
  Star,
  TrendingUp,
  Award,
  CheckCircle2
} from 'lucide-react';
import { CalculatorCard } from '../components/common/CalculatorCard';
import { fetchCalculators, fetchCategories } from '../services/calculatorService';
import { Calculator, Category } from '../types';

export const Home: React.FC = () => {
  const [popularCalculators, setPopularCalculators] = useState<Calculator[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadHomeData = async () => {
      const popular = await fetchCalculators({ popular: true });
      const cats = await fetchCategories();
      setPopularCalculators(popular.slice(0, 6));
      setCategories(cats);
    };
    loadHomeData();
  }, []);

  return (
    <div className="space-y-16 py-6">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-indigo-950 to-gray-950 text-white p-8 sm:p-14 shadow-2xl border border-brand-500/20">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-xs font-bold text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Free - No Login Required • 50+ Calculators Suite</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            CalcHub AI <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-accent-300 to-indigo-300">
              All-in-One Smart Suite
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Access over <strong>50+ interactive calculators</strong> across Finance, Basic Math, Student Grade Tracking, Health, Unit Conversions, Daily Life, and Utilities — completely free with instant AI step-by-step guidance!
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/calculators"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 hover:from-brand-400 hover:to-accent-400 font-extrabold text-white text-sm shadow-xl shadow-brand-500/30 flex items-center gap-2 group transition-all"
            >
              Explore All 50+ Calculators
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/ai-assistant"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-sm backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Ask AI Assistant
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-xs">
            <div>
              <span className="text-gray-400 block">Total Tools</span>
              <span className="text-xl font-extrabold text-white">40+ Active</span>
            </div>
            <div>
              <span className="text-gray-400 block">Categories</span>
              <span className="text-xl font-extrabold text-white">7 Modules</span>
            </div>
            <div>
              <span className="text-gray-400 block">AI Accuracy</span>
              <span className="text-xl font-extrabold text-accent-300">99.9% Step Engine</span>
            </div>
            <div>
              <span className="text-gray-400 block">Export Formats</span>
              <span className="text-xl font-extrabold text-white">PDF & Excel</span>
            </div>
          </div>

        </div>
      </section>

      {/* Popular Calculators Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-brand-500" /> Popular Calculators
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Most frequently used tools by students and professionals</p>
          </div>
          <Link to="/calculators" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
            View All 40+ →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCalculators.map((calc) => (
            <CalculatorCard key={calc.slug} calc={calc} />
          ))}
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Calculator Categories</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Organized into 7 specialized functional modules</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/categories?cat=${cat.slug}`}
              className="glass-card p-5 hover:shadow-xl hover:border-brand-500/50 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-xl group-hover:bg-brand-500 group-hover:text-white transition-colors">
                <CalcIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs text-gray-400">{cat.calculatorCount} Tools</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};
