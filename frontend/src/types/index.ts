export interface Calculator {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  icon: string;
  isPopular?: boolean;
  usageCount?: number;
  keywords?: string[];
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
  calculatorCount: number;
}

export interface HistoryItem {
  _id: string;
  userId?: string;
  calculatorSlug: string;
  calculatorTitle: string;
  category: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
  formattedSummary?: string;
  createdAt: string;
}

export interface FavoriteItem {
  _id: string;
  userId?: string;
  calculatorSlug: string;
  calculatorTitle: string;
  category: string;
  createdAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  token?: string;
}

export interface AIExplanationResponse {
  explanation: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
