import { RectangleHorizontal, Square } from 'lucide-react';
import React, { useState } from 'react';
import ImageModeButton from './components/image-mode-button/ImageModeButton';
interface ImageDialogProps {
  onConfirm: (url: string, mode: 'inline-block' | 'block') => void;
  onCancel: () => void;
}

const ImageDialog: React.FC<ImageDialogProps> = ({ onConfirm, onCancel }) => {
  const [url, setUrl] = useState('');
  const [mode, setMode] = useState<'inline-block' | 'block'>('inline-block');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-6">Thêm hình ảnh</h3>
        <input
          type="text"
          placeholder="Nhập URL ảnh"
          className="w-full p-2 border rounded mb-6"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
              Chế độ hiển thị
          </label>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <ImageModeButton
              mode="inline-block"
              currentMode={mode}
              onClick={() => setMode("inline-block")}
              icon={<RectangleHorizontal className="w-5 h-5" />}
              label="Inline"
              description="Nhiều ảnh cùng hàng"
              tooltip={
              <>
              <p>
                <strong>Inline mode:</strong> Ảnh sẽ nằm cùng hàng với text và ảnh khác.
              </p>
              </>
            }
            />
            <ImageModeButton
            mode="block"
            currentMode={mode}
            onClick={() => setMode("block")}
            icon={<Square className="w-5 h-5" />}
            label="Block"
            description="Ảnh đơn lẻ"
            tooltip={
            <p>
              <strong>Block mode:</strong> Ảnh sẽ xuống hàng riêng, có thể căn trái / giữa / phải.
            </p>
          }/>

          </div>
          </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onCancel}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onConfirm(url, mode)}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageDialog;
