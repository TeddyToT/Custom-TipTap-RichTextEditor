import React, { useState } from 'react';
import { SquarePlus } from 'lucide-react';
import ColorPickerField from './components/color-picker-field/ColorPickerField';

interface ButtonDialogProps {
  onConfirm: (buttonConfig: {
    text: string;
    url?: string;
    action?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'outline';
    backgroundColor?: string;
    textColor?: string;
    hoverBackgroundColor?: string;
    hoverTextColor?: string;
    borderRadius?: string;
    padding?: string;
  }) => void;
  onCancel: () => void;
}

const ButtonDialog: React.FC<ButtonDialogProps> = ({ onConfirm, onCancel }) => {
  const [config, setConfig] = useState({
    text: 'Nút bấm',
    url: '',
    action: 'link',
    size: 'medium' as 'small' | 'medium' | 'large',
    variant: 'primary' as 'primary' | 'outline',
    backgroundColor: 'black',
    textColor: '#00d593',
    hoverBackgroundColor: '#2563eb',
    hoverTextColor: 'red',
    borderRadius: '6px',
    padding: ''
  });

  const handleSubmit = () => {
    console.log('submit clicked');
    console.log("Submitting config:", config);
    if (!config.text.trim()) return;
    onConfirm(config);
  };

  const updateConfig = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const getPreviewStyles = () => {
    const variants = {
      primary: { backgroundColor: config.backgroundColor, color: config.textColor, border: 'none' },
      outline: { backgroundColor: 'transparent', color: config.textColor, border: `2px solid ${config.backgroundColor}` },
    };
    const sizeStyles = { small: 'px-3 py-1.5 text-sm', medium: 'px-4 py-2 text-base', large: 'px-6 py-3 text-lg' };
    return { ...variants[config.variant], borderRadius: config.borderRadius, padding: config.padding || undefined, className: config.padding ? '' : sizeStyles[config.size] };
  };

  const previewStyles = getPreviewStyles();

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto overflow-x-visible">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <SquarePlus className="w-5 h-5 mr-2" /> Tạo Button
        </h3>

        <div className="space-y-4">
          {/* Button Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên nút bấm *</label>
            <input type="text" value={config.text} onChange={(e) => updateConfig('text', e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Tên nút bấm" required />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL (tuỳ chọn)</label>
            <input type="url" value={config.url} onChange={(e) => updateConfig('url', e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="https://example.com" />
          </div>

          {/* Size & Variant */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kích thước</label>
              <select value={config.size} onChange={(e) => updateConfig('size', e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="small">Nhỏ</option>
                <option value="medium">Trung bình</option>
                <option value="large">Lớn</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kiểu</label>
              <select value={config.variant} onChange={(e) => updateConfig('variant', e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="primary">Primary</option>
                <option value="outline">Outline</option>
              </select>
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <ColorPickerField
                label="Màu nền"
                value={config.backgroundColor}
                onChange={(c) => updateConfig("backgroundColor", c)}
            />
            <ColorPickerField
                label="Màu chữ"
                value={config.textColor}
                onChange={(c) => updateConfig("textColor", c)}
            />
          </div>

          {/* Hover Colors */}
          <div className="grid grid-cols-2 gap-4">
            <ColorPickerField
                label="Màu nền hover"
                value={config.hoverBackgroundColor}
                onChange={(c) => updateConfig("hoverBackgroundColor", c)}
            />
            <ColorPickerField
                label="Màu chữ hover"
                value={config.hoverTextColor}
                onChange={(c) => updateConfig("hoverTextColor", c)}
            />
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bo góc</label>
            <input type="text" value={config.borderRadius} onChange={(e) => updateConfig('borderRadius', e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="6px" />
          </div>

          {/* Custom Padding */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Padding tùy chỉnh (tuỳ chọn)</label>
            <input type="text" value={config.padding} onChange={(e) => updateConfig('padding', e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="8px 16px (để trống để dùng preset)" />
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <button type="button" className={`${previewStyles.className} font-medium transition-all duration-200 cursor-default`}
                style={{
                  backgroundColor: previewStyles.backgroundColor,
                  color: previewStyles.color,
                  border: previewStyles.border,
                  borderRadius: previewStyles.borderRadius,
                  padding: previewStyles.padding
                }}>
                {config.text}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors" onClick={onCancel}>
              Hủy
            </button>
            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleSubmit}>
              Tạo Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonDialog;
