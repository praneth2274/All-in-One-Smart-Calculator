import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { useCalculatorContext } from '../context/CalculatorContext';
import { fetchCalculators } from '../services/calculatorService';
import { CalculatorCard } from '../components/common/CalculatorCard';
import { Calculator } from '../types';
import { Heart } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useCalculatorContext();
  const [favoriteTools, setFavoriteTools] = useState<Calculator[]>([]);

  useEffect(() => {
    const loadFavs = async () => {
      const all = await fetchCalculators();
      setFavoriteTools(all.filter(c => favorites.includes(c.slug)));
    };
    loadFavs();
  }, [favorites]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Favorite Calculators"
        description="Quick access to your bookmarked tools for fast execution."
        badge={`${favoriteTools.length} Favorites`}
      />

      {favoriteTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTools.map((calc) => (
            <CalculatorCard key={calc.slug} calc={calc} />
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center space-y-3">
          <Heart className="w-12 h-12 text-rose-400 mx-auto animate-pulse" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Favorite Calculators Saved</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Click the heart icon on any calculator card to save it here for instant access.
          </p>
        </div>
      )}
    </div>
  );
};
