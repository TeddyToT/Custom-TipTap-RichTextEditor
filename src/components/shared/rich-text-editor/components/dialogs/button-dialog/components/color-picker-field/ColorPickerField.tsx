import { useState, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { useClickOutside } from "../../../../toolbar/lib/useClickOutside";

interface ColorPickerFieldProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPickerField({
  label,
  value,
  onChange,
}: ColorPickerFieldProps) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickOutside(popoverRef, () => setOpen(false));

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.trim();
    if (!v.startsWith("#")) v = "#" + v;
    if (/^#([0-9A-F]{3}){1,2}$/i.test(v)) {
      onChange(v);
    }
  };

  return (
    <div className="relative flex flex-col items-start gap-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full border shadow-sm"
        style={{ backgroundColor: value }}
      />

      {open && (
        <div
          ref={popoverRef}
          className="absolute top-16 z-50 bg-white p-3 rounded-lg shadow-md space-y-2 flex flex-col items-center"
        >
  <HexColorPicker color={value} onChange={onChange} style={{ width: "150px", height: "150px" }}/>
          <input
            type="text"
            value={value}
            onChange={handleHexChange}
            className="mt-2 w-28 px-2 py-1 border rounded text-sm text-center"
          />

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full mt-2 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm cursor-pointer"
          >
            Xác nhận
          </button>
        </div>
      )}
    </div>
  );
}
