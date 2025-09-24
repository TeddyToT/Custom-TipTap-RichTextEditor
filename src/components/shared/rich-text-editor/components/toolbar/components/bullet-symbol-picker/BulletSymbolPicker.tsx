import React, { useState, useRef } from "react";
import {ToolbarButton} from "..";
import { List } from "lucide-react";
import useActive from "../../lib/isActiveNode";
import { useBulletSymbols } from "./lib/useBulltSymbol";
import { useClickOutside } from "../../lib/useClickOutside";
import {SymbolGrid, SymbolCategorySelector, SymbolSearch} from "./components";
import { Editor } from "@tiptap/react";
interface BulletSymbolPickerProps {
  editor: Editor;
}

const BulletSymbolPicker: React.FC<BulletSymbolPickerProps> = ({ editor }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showPopular, setShowPopular] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useClickOutside(pickerRef, () => setShowPicker(false));

  const isBulletActive = useActive(editor, "bulletList");
  const currentSymbol = editor?.getAttributes("bulletList")?.bulletSymbol || "disc";

  const {
    symbols,
    categories,
    currentCategory,
    setCurrentCategory,
    searchQuery,
    setSearchQuery,
    popularSymbols,
  } = useBulletSymbols();

  const handleSelect = (symbol: string) => {
    const isActive = editor.isActive("bulletList") && currentSymbol === symbol;

    if (isActive) {
      editor.chain().focus().liftListItem("listItem").run();
    } else {
      if (!editor.isActive("bulletList")) editor.chain().focus().toggleBulletList().run();
      editor.chain().focus().updateAttributes("bulletList", { bulletSymbol: symbol }).run();
    }

    setShowPicker(false);
  };

  return (
    <div className="relative" ref={pickerRef}>
      <ToolbarButton
        onClick={() => setShowPicker(!showPicker)}
        isActive={isBulletActive}
        icon={List}
        title="Đánh dấu danh sách"
      />
      {showPicker && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-3 z-10 w-96">
          <SymbolSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showPopular={showPopular}
            setShowPopular={setShowPopular}
          />
          <SymbolCategorySelector
            categories={categories}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            displaySymbols={showPopular ? popularSymbols : symbols}
            showPopular={showPopular}
            searchQuery={searchQuery}
          />
          <SymbolGrid
            displaySymbols={showPopular ? popularSymbols : symbols}
            current={currentSymbol}
            handleSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
};


export default BulletSymbolPicker;
