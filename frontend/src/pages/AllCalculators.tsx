import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { CalculatorCard } from '../components/common/CalculatorCard';
import { fetchCalculators } from '../services/calculatorService';
import { Calculator } from '../types';
import { Search, Filter } from 'lucide-react';

export const AllCalculators: React.FC = () => {
  const [calculators, setCalculators] = useState<Calculator[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const loadAll = async () => {
      const data = await fetchCalculators();
      setCalculators(data);
    };
    loadAll();
  }, []);

  const categoriesList = ['all', 'Basic', 'Finance', 'Student', 'Health', 'Unit Conversion', 'Daily Life', 'Utility'];

  const filtered = calculators.filter((calc) => {
    const matchesCategory = selectedCategory === 'all' || calc.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = calc.title.toLowerCase().includes(searchTerm.toLowerCase()) || calc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="All 40+ Calculators"
        description="Comprehensive catalog of mathematical, financial, health, scientific, and student calculators."
        badge={`${filtered.length} Calculators Available`}
      />

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search calculator name or keyword..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((calc) => (
          <CalculatorCard key={calc.slug} calc={calc} />
        ))}
      </div>
    </div>
  );
};
