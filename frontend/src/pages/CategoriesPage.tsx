import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { CalculatorCard } from '../components/common/CalculatorCard';
import { fetchCalculators, fetchCategories } from '../services/calculatorService';
import { Calculator, Category } from '../types';
import { Calculator as CalcIcon, Landmark, GraduationCap, Activity, Ruler, Sun, Wrench } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const catSlug = searchParams.get('cat') || 'basic';
  const [calculators, setCalculators] = useState<Calculator[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const load = async () => {
      const allCalcs = await fetchCalculators();
      const cats = await fetchCategories();
      setCalculators(allCalcs);
      setCategories(cats);
    };
    load();
  }, []);

  const activeCategory = categories.find(c => c.slug === catSlug) || categories[0] || { name: 'Basic', description: 'Essential arithmetic and math tools' };
  const filtered = calculators.filter(c => c.category.toLowerCase() === activeCategory?.name.toLowerCase() || c.category.toLowerCase().replace(/\s+/g, '-') === catSlug);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Calculator Categories"
        description="Browse calculators organized by technical domain"
        badge="7 Modules"
      />

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setSearchParams({ cat: c.slug })}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all ${
              catSlug === c.slug
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
            }`}
          >
            {c.name} ({c.calculatorCount})
          </button>
        ))}
      </div>

      {/* Active Category Description */}
      <div className="glass-card p-6 bg-gradient-to-r from-brand-500/10 to-accent-500/10">
        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-1">{activeCategory.name} Suite</h2>
        <p className="text-xs text-gray-600 dark:text-gray-400">{activeCategory.description}</p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((calc) => (
          <CalculatorCard key={calc.slug} calc={calc} />
        ))}
      </div>
    </div>
  );
};
