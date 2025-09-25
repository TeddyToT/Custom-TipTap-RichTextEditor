import React, { useState, useEffect } from "react";
import { TextSelect } from "lucide-react";
import ColorPickerField from "../button-dialog/components/color-picker-field/ColorPickerField";

interface TextareaConfig {
  width: string;
  height: string;
  backgroundColor: string;
  textColor: string;
  border: string;
  borderRadius: string;
  padding: string;
  float: string;
  margin: string;
}

interface TextareaDialogProps {
  onConfirm: (textareaConfig: TextareaConfig) => void;
  onCancel: () => void;
  currentConfig?: Partial<TextareaConfig>;
  isEditMode?: boolean;
}

const TextareaDialog: React.FC<TextareaDialogProps> = ({
  onConfirm,
  onCancel,
  currentConfig = {},
  isEditMode = false,
}) => {
  const [config, setConfig] = useState<TextareaConfig>({
    width: "300px",
    height: "200px",
    backgroundColor: "#f3f4f6",
    textColor: "#000000",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    padding: "12px",
    float: "none",
    margin: "2px 2px 2px 2px",
    ...currentConfig,
  });

  // Size presets
  const sizePresets = {
    small: { width: "200px", height: "120px" },
    medium: { width: "300px", height: "200px" },
    large: { width: "400px", height: "400px" },
    custom: { width: config.width, height: config.height },
  };

  const [selectedSize, setSelectedSize] =
    useState<keyof typeof sizePresets>("custom");

  // Detect current size preset
  useEffect(() => {
    const currentSize = Object.entries(sizePresets).find(
      ([key, size]) =>
        key !== "custom" &&
        size.width === config.width &&
        size.height === config.height
    );
    setSelectedSize(
      currentSize ? (currentSize[0] as keyof typeof sizePresets) : "custom"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.width, config.height]);

  const handleSubmit = () => {
    onConfirm(config);
  };

  const updateConfig = (key: keyof TextareaConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSizePresetChange = (preset: keyof typeof sizePresets) => {
    setSelectedSize(preset);
    if (preset !== "custom") {
      const size = sizePresets[preset];
      updateConfig("width", size.width);
      updateConfig("height", size.height);
    }
  };

  const getPreviewStyles = () => {
    return {
      width: config.width,
      height: config.height,
      color: config.textColor,
      border: config.border,
      borderRadius: config.borderRadius,
      padding: config.padding,
      float: config.float as React.CSSProperties["float"],
      margin: config.margin,
      resize: "none" as const,
      outline: "none",
      fontFamily: "inherit",
    };
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px] max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TextSelect className="w-5 h-5 mr-2" />
          {isEditMode ? "Chỉnh sửa Textarea" : "Tạo Textarea"}
        </h3>

        <div className="space-y-4">
          {/* Size Presets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kích thước
            </label>
            <div className="grid grid-cols-4 gap-2">
              {Object.keys(sizePresets).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() =>
                    handleSizePresetChange(preset as keyof typeof sizePresets)
                  }
                  className={`p-2 text-sm border rounded-lg transition-colors ${
                    selectedSize === preset
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {preset === "small" && "Nhỏ"}
                  {preset === "medium" && "Vừa"}
                  {preset === "large" && "Lớn"}
                  {preset === "custom" && "Tùy chỉnh"}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Dimensions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chiều rộng
              </label>
              <input
                type="text"
                value={config.width}
                onChange={(e) => updateConfig("width", e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="300px"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chiều cao
              </label>
              <input
                type="text"
                value={config.height}
                onChange={(e) => updateConfig("height", e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="200px"
              />
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <ColorPickerField
              label="Màu nền"
              value={config.backgroundColor}
              onChange={(color) => updateConfig("backgroundColor", color)}
            />
            <ColorPickerField
              label="Màu chữ"
              value={config.textColor}
              onChange={(color) => updateConfig("textColor", color)}
            />
          </div>

          {/* Border */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Border
            </label>
            <input
              type="text"
              value={config.border}
              onChange={(e) => updateConfig("border", e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1px solid #d1d5db"
            />
          </div>

          {/* Border Radius & Padding */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bo góc
              </label>
              <input
                type="text"
                value={config.borderRadius}
                onChange={(e) => updateConfig("borderRadius", e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="8px"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Padding
              </label>
              <input
                type="text"
                value={config.padding}
                onChange={(e) => updateConfig("padding", e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="12px"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Căn lề
            </label>
            <select
              value={config.float || "none"}
              onChange={(e) => updateConfig("float", e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">Không</option>
              <option value="left">Trái</option>
              <option value="right">Phải</option>
            </select>
          </div>

                    <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Khoảng cách (margin)</label>
            <input
              type="text"
              value={config.margin}
              onChange={(e) => updateConfig('margin', e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Trên phải dưới trái (theo px, ví dụ: 2px 2px 2px 2px)"
            />
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview
            </label>
            <div className="p-4 bg-gray-50 rounded-lg">
              <textarea
                readOnly
                value="Đây là preview của textarea..."
                style={getPreviewStyles()}
                className="resize-none w-full"
                onMouseLeave={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.backgroundColor = config.backgroundColor;
                  target.style.color = config.textColor;
                }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={onCancel}
            >
              Hủy
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleSubmit}
            >
              {isEditMode ? "Cập nhật" : "Tạo Textarea"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextareaDialog;
