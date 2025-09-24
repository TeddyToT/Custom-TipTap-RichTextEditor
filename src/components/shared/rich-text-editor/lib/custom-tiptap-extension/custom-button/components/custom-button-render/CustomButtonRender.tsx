import React, { useState } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { Settings, Trash2, ExternalLink } from "lucide-react";
import BubbleToolbar from "../../../../../components/bubble-toolbar/BubbleToolbar";
import ColorPickerField from "../../../../../components/dialogs/button-dialog/components/color-picker-field/ColorPickerField";
interface CustomButtonRenderProps {
  node: any;
  updateAttributes: (attrs: any) => void;
  editor: any;
  getPos: () => number | undefined;
}

const CustomButtonRender: React.FC<CustomButtonRenderProps> = ({
  node,
  updateAttributes,
  editor,
  getPos
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const {
    text,
    url,
    action,
    size,
    variant,
    backgroundColor,
    textColor,
    hoverBackgroundColor,
    hoverTextColor,
    borderRadius,
    padding
  } = node.attrs;

  // Size presets
  const sizeStyles = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base", 
    large: "px-6 py-3 text-lg"
  };

  // Variant presets
  const getVariantStyles = () => {
    const variants = {
      primary: {
        backgroundColor: backgroundColor || "#3b82f6",
        color: textColor || "#ffffff",
        border: "none"
      },
      outline: {
        backgroundColor: isHovered ? (hoverBackgroundColor || backgroundColor || "#3b82f6") : "transparent",
        color: isHovered ? (hoverTextColor || "#ffffff") : (textColor || "#3b82f6"),
        border: `2px solid ${backgroundColor || "#3b82f6"}`
      },
    };

    return variants[variant as keyof typeof variants] || variants.primary;
  };

  const currentStyles = getVariantStyles();
  const sizeClasses = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.medium;

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (action === "link" && url) {
      if (e.ctrlKey || e.metaKey) {
        window.open(url, '_blank');
      } else {
        window.location.href = url;
      }
    }
    // Add more custom actions here
  };

  const setSelection = () => {
    editor?.commands.setNodeSelection(getPos());
  };

  const isSelected = editor?.isActive("customButton");

  return (
    <NodeViewWrapper className="inline-block relative group">
      <button
        className={`
          ${padding ? '' : sizeClasses}
          cursor-pointer font-medium transition-all duration-200 ease-in-out
          hover:transform hover:-translate-y-0.5 hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${isSelected ? 'ring-2 ring-blue-500' : ''}
        `}
        style={{
          backgroundColor: isHovered ? (hoverBackgroundColor || "#2563eb") : currentStyles.backgroundColor,
          color: isHovered ? (hoverTextColor || "#ffffff") : currentStyles.color,
          border: currentStyles.border,
          borderRadius: borderRadius || "6px",
          padding: padding || undefined,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleButtonClick}
        onFocus={setSelection}
        contentEditable={false}
      >
        {text}
        {action === "link" && url && (
          <ExternalLink className="w-3 h-3 ml-1 inline" />
        )}
      </button>

      {isSelected && (
        <BubbleToolbar
        className="absolute -bottom-9 flex gap-1 bg-white border rounded shadow p-1 z-50"
          editor={editor}
          buttons={[
            {
              icon: <Settings className="w-4 h-4" />,
              onClick: () => setShowSettings(!showSettings),
              active: showSettings,
              className: "relative",
              title:"Tùy chỉnh phím"
            },
            {
              icon: <Trash2 className="w-4 h-4" />,
              onClick: () => editor.chain().focus().deleteSelection().run(),
              className: "text-red-600 hover:bg-red-100",
              title:"Xóa"
            },
          ]}
        />
      )}

      {showSettings && (
        <div
        onMouseDown={(e) => {if (e.target === e.currentTarget) {e.preventDefault()}}}
        className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-50 w-80">
          <h3 className="text-sm font-semibold mb-3">Tùy chỉnh phím</h3>

          {/* Text */}
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">Tên nút bấm</label>
            <input
              type="text"
              value={text}
              onChange={(e) => updateAttributes({ text: e.target.value })}
              className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Tên nút bấm"
            />
          </div>

          {/* URL */}
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">URL (tuỳ chọn)</label>
            <input
              type="url"
              value={url}
              onChange={(e) => updateAttributes({ url: e.target.value })}
              className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>

          {/* Size & Variant */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Kích thước</label>
              <select
                value={size}
                onChange={(e) => updateAttributes({ size: e.target.value })}
                className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="small">Nhỏ</option>
                <option value="medium">Trung bình</option>
                <option value="large">Lớn</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Kiểu</label>
              <select
                value={variant}
                onChange={(e) => updateAttributes({ variant: e.target.value })}
                className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="primary">Primary</option>
                <option value="outline">Outline</option>
              </select>
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <ColorPickerField
            label="Màu nền"
            value={backgroundColor}
            onChange={(c)=>(updateAttributes({backgroundColor: c}))}
            />
          <ColorPickerField
            label="Màu chữ"
            value={textColor}
            onChange={(c)=>(updateAttributes({textColor: c}))}
            />
          </div>

          {/* Hover Colors */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <ColorPickerField
            label="Màu nền hover"
            value={hoverBackgroundColor}
            onChange={(c)=>(updateAttributes({hoverBackgroundColor: c}))}
            />
            <ColorPickerField
            label="Màu chữ hover"
            value={hoverTextColor}
            onChange={(c)=>(updateAttributes({hoverTextColor: c}))}
            />
          </div>

          {/* Border Radius */}
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">Bo góc</label>
            <input
              type="text"
              value={borderRadius}
              onChange={(e) => updateAttributes({ borderRadius: e.target.value })}
              className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="6px"
            />
          </div>

          {/* Custom Padding */}
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">Padding tùy chỉnh (tuỳ chọn)</label>
            <input
              type="text"
              value={padding}
              onChange={(e) => updateAttributes({ padding: e.target.value })}
              className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="8px 16px (để trống để dùng preset)"
            />
          </div>

          <button
            onClick={() => setShowSettings(false)}
            className="w-full px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Xác nhận
          </button>
        </div>
      )}
    </NodeViewWrapper>
  );
};

export default CustomButtonRender;