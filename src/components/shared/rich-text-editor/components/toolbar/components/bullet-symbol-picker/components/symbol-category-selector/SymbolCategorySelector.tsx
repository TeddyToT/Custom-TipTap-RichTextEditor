import React from "react";

import type { SymbolCategorySelectorProps } from "./lib/types";

const SymbolCategorySelector: React.FC<SymbolCategorySelectorProps> = ({
  categories,
  currentCategory,
  setCurrentCategory,
  displaySymbols,
  showPopular,
  searchQuery,
}) => {
  const getCategoryDisplayName = (category: string) => {
    const translations = {
      'all': 'Tất cả',
      'basic': 'Cơ bản',
      'arrows': 'Mũi tên',
      'shapes': 'Hình học',
      'decorative': 'Trang trí',
      'geometric': 'Hình học nâng cao',
      'check': 'Dấu tick',
      'math': 'Toán học'
    };
    return translations[category as keyof typeof translations] || category;
  };

  if (searchQuery || showPopular) return null;

  return (
    <div className="flex items-center justify-between mb-3">
      <select
        value={currentCategory}
        onChange={(e) => setCurrentCategory(e.target.value)}
        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {getCategoryDisplayName(cat)}
          </option>
        ))}
      </select>
      <div className="text-xs text-gray-500">
        {displaySymbols.length} ký hiệu
      </div>
    </div>
  );
};

export default SymbolCategorySelector;
