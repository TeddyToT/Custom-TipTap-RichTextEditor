import React from "react";
import { Search, Star, X } from "lucide-react";
interface SymbolSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showPopular: boolean;
  setShowPopular: (value: boolean) => void;
}

const SymbolSearch: React.FC<SymbolSearchProps> = ({
  searchQuery,
  setSearchQuery,
  showPopular,
  setShowPopular,
}) => {
  const clearSearch = () => setSearchQuery("");

  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex-1 relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm ký hiệu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-7 pr-8 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
      <button
        onClick={() => setShowPopular(!showPopular)}
        className={`p-1 rounded ${showPopular ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'} hover:bg-opacity-80`}
        title="Ký hiệu phổ biến"
      >
        <Star className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SymbolSearch;
