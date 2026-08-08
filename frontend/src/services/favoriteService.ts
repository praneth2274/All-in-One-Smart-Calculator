import API from './api';

export interface FavoriteItem {
  _id?: string;
  calculatorSlug: string;
  calculatorTitle?: string;
  category?: string;
}

export const fetchFavoritesAPI = async (): Promise<FavoriteItem[]> => {
  try {
    const res = await API.get('/favorites');
    return res.data;
  } catch (error) {
    console.warn('Failed to fetch favorites from server:', error);
    return [];
  }
};

export const toggleFavoriteAPI = async (
  calculatorSlug: string,
  calculatorTitle?: string,
  category?: string
): Promise<{ isFavorite: boolean; favorite?: FavoriteItem }> => {
  try {
    const res = await API.post('/favorites/toggle', {
      calculatorSlug,
      calculatorTitle: calculatorTitle || calculatorSlug,
      category: category || 'General',
    });
    return res.data;
  } catch (error) {
    console.warn('Failed to toggle favorite on server:', error);
    throw error;
  }
};
