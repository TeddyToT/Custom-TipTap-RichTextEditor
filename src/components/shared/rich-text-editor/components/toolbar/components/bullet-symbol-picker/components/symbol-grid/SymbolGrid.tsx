import React from "react";

import type SymbolGridProps from "./lib/types";

const SymbolGrid: React.FC<SymbolGridProps> = ({ displaySymbols, current, handleSelect }) => {
  if (displaySymbols.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        <p className="text-sm">Không tìm thấy ký hiệu nào</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-10 gap-1 max-h-60 overflow-y-auto">
      {displaySymbols.map((sym) => (
        <button
          key={sym.value}
          className={`w-8 h-8 flex items-center justify-center rounded border cursor-pointer hover:bg-gray-100 transition-all ${
            current === sym.value 
              ? "border-blue-500 bg-blue-50 scale-110" 
              : "border-gray-300"
          }`}
          onClick={() => handleSelect(sym.value)}
          title={`${sym.name} (${sym.unicode})`}
        >
          <span className="text-sm font-medium">{sym.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SymbolGrid;
