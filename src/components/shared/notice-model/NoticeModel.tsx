import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MessageType {
  resolves?: string[];
  problems?: string[];
  bug?: string[];
}

interface VersionNotice {
  version: string;
  message: MessageType;
}

interface Props {
  notices: VersionNotice[];
  onClose: () => void;
}

const NoticeModel = ({ notices, onClose }: Props) => {
  const [openVersions, setOpenVersions] = useState<string[]>([]);

  useEffect(() => {
    if (notices.length > 0) setOpenVersions([notices[0].version]);
  }, [notices]);

  const toggleVersion = (version: string) => {
    setOpenVersions((prev) =>
      prev.includes(version)
        ? prev.filter((v) => v !== version)
        : [...prev, version]
    );
  };

  const messageTypes = [
    { key: "resolves", label: "Đã giải quyết/Thêm mới:", color: "green" },
    { key: "problems", label: "Vấn đề tồn tại", color: "yellow" },
    { key: "bug", label: "Bug", color: "red" },
  ] as const;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Thông báo cập nhật</h2>

        <div className="flex flex-col gap-3 mb-4">
          {notices.map((notice) => {
            const isOpen = openVersions.includes(notice.version);
            return (
              <div
                key={notice.version}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleVersion(notice.version)}
                  className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200"
                >
                  <span className="font-semibold">Phiên bản: {notice.version}</span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isOpen && (
                  <div className="px-4 py-3 flex flex-col gap-4">
                    {messageTypes.map(({ key, label, color }) => {
                      const items = notice.message[key as keyof MessageType];
                      if (!items?.length) return null;
                      return (
                        <div key={key}>
                          <p className={`font-semibold text-${color}-600 mb-1`}>
                            {label}
                          </p>
                          <ul className="list-disc pl-6">
                            {items.map((mes, i) => (
                              <li key={i} className={`text-${color}-600 text-sm`}>
                                {mes}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
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
