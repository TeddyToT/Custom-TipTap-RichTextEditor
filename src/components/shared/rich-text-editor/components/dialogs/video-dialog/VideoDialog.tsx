import React, { useState } from 'react';

interface VideoDialogProps {
  onConfirm: (url: string) => void;
  onCancel: () => void;
}

const VideoDialog: React.FC<VideoDialogProps> = ({ onConfirm, onCancel }) => {
  const [url, setUrl] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Insert YouTube Video</h3>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          className="w-full p-2 border rounded mb-4"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onConfirm(url)}
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDialog;
