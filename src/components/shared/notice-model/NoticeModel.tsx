interface Props {
  message: string[];
  version: string;
  onClose: () => void;
}

const NoticeModel = ({ message, version, onClose }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Phiên bản hiện tại: {version}
        </h2>
        <div className="flex flex-col gap-3 mb-3">
          {message.map((mes) => (
            <p className="text-gray-700">{mes}</p>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default NoticeModel;
