import API from './api';
import { Calculator, Category } from '../types';

export const fetchCalculators = async (params?: { category?: string; search?: string; popular?: boolean }): Promise<Calculator[]> => {
  try {
    const res = await API.get('/calculators', { params });
    return res.data;
  } catch (error) {
    return [];
  }
};

export const fetchCalculatorBySlug = async (slug: string): Promise<Calculator | null> => {
  try {
    const res = await API.get(`/calculators/${slug}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const res = await API.get('/calculators/categories');
    return res.data;
  } catch (error) {
    return [];
  }
};
