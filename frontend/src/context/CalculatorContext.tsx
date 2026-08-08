import React, { createContext, useContext, useEffect, useState } from 'react';
import { FavoriteItem, HistoryItem } from '../types';
import { useAuth } from './AuthContext';
import {
  fetchHistory,
  saveHistoryRecord,
  deleteHistoryRecord,
  clearAllHistoryRecords,
} from '../services/historyService';
import {
  fetchFavoritesAPI,
  toggleFavoriteAPI,
} from '../services/favoriteService';

interface CalculatorContextType {
  favorites: string[]; // List of calculator slugs
  history: HistoryItem[];
  toggleFavoriteSlug: (slug: string, title?: string, category?: string) => void;
  isFavorite: (slug: string) => boolean;
  addHistoryItem: (item: Omit<HistoryItem, '_id' | 'createdAt'>) => void;
  removeHistoryItem: (id: string) => void;
  clearAllHistory: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('calchub_favorites');
    return saved ? JSON.parse(saved) : ['emi-calculator', 'bmi-calculator', 'sip-calculator', 'age-calculator'];
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('calchub_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state to LocalStorage as fallback
  useEffect(() => {
    localStorage.setItem('calchub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('calchub_history', JSON.stringify(history));
  }, [history]);

  // Load from API when user logs in or mounts
  useEffect(() => {
    const loadBackendData = async () => {
      if (!user) return;

      try {
        const [backendHistory, backendFavs] = await Promise.all([
          fetchHistory(),
          fetchFavoritesAPI(),
        ]);

        if (backendHistory && backendHistory.length > 0) {
          setHistory(backendHistory);
        }

        if (backendFavs && backendFavs.length > 0) {
          const favSlugs = backendFavs.map((f) => f.calculatorSlug);
          setFavorites(favSlugs);
        }
      } catch (err) {
        console.warn('Could not load backend calculation history / favorites:', err);
      }
    };

    loadBackendData();
  }, [user]);

  const toggleFavoriteSlug = async (slug: string, title?: string, category?: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );

    if (user) {
      try {
        await toggleFavoriteAPI(slug, title, category);
      } catch (err) {
        console.warn('Server favorite sync failed, retained in local state:', err);
      }
    }
  };

  const isFavorite = (slug: string) => favorites.includes(slug);

  const addHistoryItem = async (item: Omit<HistoryItem, '_id' | 'createdAt'>) => {
    const tempId = 'hist_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const createdAt = new Date().toISOString();
    const newItem: HistoryItem = {
      ...item,
      _id: tempId,
      createdAt,
    };

    setHistory((prev) => [newItem, ...prev].slice(0, 100)); // keep last 100

    if (user) {
      try {
        const savedRecord = await saveHistoryRecord(item);
        if (savedRecord && savedRecord._id) {
          setHistory((prev) =>
            prev.map((h) => (h._id === tempId ? savedRecord : h))
          );
        }
      } catch (err) {
        console.warn('Failed to sync history item with backend server:', err);
      }
    }
  };

  const removeHistoryItem = async (id: string) => {
    setHistory((prev) => prev.filter((h) => h._id !== id));

    if (user) {
      try {
        await deleteHistoryRecord(id);
      } catch (err) {
        console.warn('Failed to delete history record on server:', err);
      }
    }
  };

  const clearAllHistory = async () => {
    setHistory([]);

    if (user) {
      try {
        await clearAllHistoryRecords();
      } catch (err) {
        console.warn('Failed to clear history on server:', err);
      }
    }
  };

  return (
    <CalculatorContext.Provider
      value={{
        favorites,
        history,
        toggleFavoriteSlug,
        isFavorite,
        addHistoryItem,
        removeHistoryItem,
        clearAllHistory,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext);
  if (!context) throw new Error('useCalculatorContext must be used within CalculatorProvider');
  return context;
};

