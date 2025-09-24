interface SymbolItem {
  value: string;
  label: string;
  name: string;
  unicode: string;
  category?: string;
}

export default interface SymbolGridProps {
  displaySymbols: SymbolItem[];
  current: string;
  handleSelect: (symbol: string) => void;
}