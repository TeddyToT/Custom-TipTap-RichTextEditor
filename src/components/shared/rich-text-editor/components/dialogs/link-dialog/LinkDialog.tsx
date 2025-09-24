import { useState } from 'react';
import { createPortal } from "react-dom";
interface LinkDialogProps {
  onConfirm: (url: string, text: string,
    //  newTab: boolean
    ) => void;
  onCancel: () => void;
  onRemove?: () => void;
  currentUrl?: string;
  currentText?: string;
  // openInNewTab?: boolean;
}

const LinkDialog = ({
  onConfirm,
  onCancel,
  onRemove,
  currentUrl = "",
  currentText = "",
  // openInNewTab = false,
}:LinkDialogProps) => {
  const [url, setUrl] = useState(currentUrl);
  const [text, setText] = useState(currentText);
  // const [newTab] = useState(openInNewTab);

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="block text-sm font-semibold mb-4">Văn bản hiển thị</h3>
        <input
          type="text"
          placeholder="Nhập văn bản hiện"
          className="w-full p-2 border rounded mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <h3 className="block text-sm font-semibold mb-4">Link</h3>
        <input
          type="text"
          placeholder="Nhập URL"
          className="w-full p-2 border rounded mb-4"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        {/* <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Mở trong tab mới</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={newTab}
              onChange={(e) => setNewTab(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
              after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
              after:transition-all peer-checked:bg-black"
            ></div>
          </label>
        </div> */}

        <div className="flex justify-between items-center">
          {currentUrl && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => (onRemove ? onRemove() : onConfirm( "",""))}
            >
              Xóa
            </button>
          )}
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onCancel}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onConfirm(url, text)}
          >
            {currentUrl ? 'Cập nhật' : 'Thêm'}
          </button>
        </div>
      </div>
    </div>, document.body
  );
};

export default LinkDialog;
