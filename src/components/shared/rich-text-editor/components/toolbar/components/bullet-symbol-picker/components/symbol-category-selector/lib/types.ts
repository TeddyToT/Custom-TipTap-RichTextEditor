interface SymbolItem {
  value: string;
  label?: string;
  name?: string;
  unicode?: string;
  category?: string;
}
export interface SymbolCategorySelectorProps {
  categories: string[];
  currentCategory: string;
  setCurrentCategory: (cat: string) => void;
  displaySymbols: SymbolItem[]; // ✅ properly typed
  showPopular: boolean;
  searchQuery: string;
}
