import { useState, useMemo, useCallback } from 'react';
import { 
  getSymbolsByCategory, 
  getCategories, 
  searchSymbols,
  getPopularSymbols,
  type Symbol
} from './unicodeSymbol';

interface UseBulletSymbolsResult {
  symbols: Symbol[];
  loading: boolean;
  error: string | null;
  categories: string[];
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  popularSymbols: Symbol[];
  refresh: () => void;
}

export const useBulletSymbols = (initialCategory: string = 'all'): UseBulletSymbolsResult => {
  const [currentCategory, setCurrentCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [error] = useState<string | null>(null);

  // Get symbols based on category and search
  const symbols = useMemo(() => {
    if (searchQuery.trim()) {
      return searchSymbols(searchQuery);
    }
    return getSymbolsByCategory(currentCategory);
  }, [currentCategory, searchQuery]);

  const categories = useMemo(() => getCategories(), []);
  const popularSymbols = useMemo(() => getPopularSymbols(), []);

  const handleCategoryChange = useCallback((category: string) => {
    setCurrentCategory(category);
    setSearchQuery(''); // Clear search when changing category
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const refresh = useCallback(() => {
  }, []);

  return {
    symbols,
    loading: false,
    error,
    categories,
    currentCategory,
    setCurrentCategory: handleCategoryChange,
    searchQuery,
    setSearchQuery: handleSearchChange,
    popularSymbols,
    refresh,
  };
};