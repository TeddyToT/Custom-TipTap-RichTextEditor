import React, { useState, useRef } from 'react';
import {ToolbarButton} from '..';
import { Palette } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import { useClickOutside } from '../../lib/useClickOutside';
import { Editor } from '@tiptap/react';
interface ColorPickerProps {
  editor: Editor;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ editor }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState('#000000');

const pickerRef = useRef<HTMLDivElement>(null);
 useClickOutside(pickerRef, () => setShowPicker(false));
  const basicColors = [
    '#000000', '#FF0000', '#FFFF00', '#00FF00', '#0000FF', '#8A2BE2', '#FFFFFF'
  ];

  const handleSelectColor = (selectedColor: string) => {
    setColor(selectedColor);
    editor.chain().focus().setColor(selectedColor).run();
    setShowPicker(false);
  };

  return (
    <div className="relative inline-block">
      <ToolbarButton
        onClick={() => setShowPicker(!showPicker)}
        isActive={false}
        icon={Palette}
        title="Text Color"
      />
      {showPicker && (
        <div ref={pickerRef} className="absolute mt-1 bg-white border rounded-lg shadow-lg p-3 z-10">
          {/* 7 màu cơ bản */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {basicColors.map((c) => (
              <button
                key={c}
                className="w-6 h-6 rounded border cursor-pointer border-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: c }}
                onClick={() => handleSelectColor(c)}
              />
            ))}
          </div>

          {/* Color picker */}
          <HexColorPicker color={color} onChange={setColor} className="w-full" />
          <button
            className="mt-2 w-full py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => handleSelectColor(color)}
          >
            Chọn màu
          </button>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
