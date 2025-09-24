import React, { useState, useRef, useMemo } from "react";
import { useClickOutside } from "../../lib/useClickOutside";
import { ChevronDown, ChevronUp } from "lucide-react";
interface Option {
  label: string;
  value: string;
}

interface LabelPickerProps {
  label: string;
  currentValue: string;
  options: Option[];
  onChange: (val: string) => void;
  onReset?: () => void;
  buttonStyle?: React.CSSProperties;
}

const LabelPicker = ({
  label,
  currentValue,
  options,
  onChange,
  onReset,
  buttonStyle,
}: LabelPickerProps) => {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);

  useClickOutside(pickerRef, () => setShow(false));

  const currentLabel =
    options.find((o) => o.value === currentValue)?.label || "Mặc định";

  // filter options theo query
  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query.toLowerCase()) ||
        opt.value.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, options]);

  return (
    <div className="relative text-[10px]" ref={pickerRef}>
      <button
      type="button"
        onClick={() => setShow(!show)}
        className="px-1 py-2 text-[10px] border rounded hover:bg-gray-100 transition-colors flex items-center gap-1 w-21"
        style={buttonStyle}
        title={label}
      >
        {/* <span className="text-gray-500 whitespace-nowrap">{label}:</span> */}
        <span className="truncate flex-1 text-left">{currentLabel}</span>
        {show?<ChevronUp size={10} strokeWidth={3} />: <ChevronDown size={10} strokeWidth={3} />}
      </button>

      {show && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg py-2 z-10 min-w-[160px]">
          <div className="px-3 py-1 text-gray-500 border-b">{label}</div>

          {/*search */}
          <div className="px-2 py-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm..."
              className="w-full px-2 py-1 border rounded focus:outline-none focus:ring"
            />
          </div>

          <div className="max-h-60 overflow-y-auto">
            {onReset && (
              <button
                onClick={() => {
                  onReset();
                  setShow(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Mặc định
              </button>
            )}

            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-gray-400">Không có kết quả</div>
            ) : (
              filteredOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setShow(false);
                    setQuery(""); // clear search
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer${
                    currentValue === opt.value ? "bg-blue-50 text-blue-600" : ""
                  }`}
                  style={{
                    fontFamily: opt.value,
                    fontSize: opt.value.endsWith("px") ? opt.value : undefined,
                  }}
                >
                  {opt.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LabelPicker;
