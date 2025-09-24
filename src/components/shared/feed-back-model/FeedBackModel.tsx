import React, { useState } from "react";

interface Props {
  onClose: () => void;
}

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export default function FeedbackModal({ onClose }: Props) {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("api: ", GOOGLE_SCRIPT_URL);
    setLoading(true);

    try {
      const time = new Date().toLocaleString("vi-VN");
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          "Người gửi": name,
          "Góp ý": feedback,
          "Thời gian": time,
        }),
        headers: { "Content-Type": "application/json" },
      });

      alert("Gửi feedback thành công!");
      setName("");
      setFeedback("");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi gửi feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
      <div className="bg-white rounded-lg p-6 w-[900px] h-[68vh] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Gửi Feedback lỗi Editor</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-2">
            <p>Link sheet:</p>
            <a
            className="text-blue-500 hover:text-blue-800 hover:underline"
              target="_blank"
              href="https://docs.google.com/spreadsheets/d/1HX6ov6O0eT5zyXhIcVY3e_dYeTOTKhULbd5GXNaFx2A/edit?gid=0#gid=0"
            >
              Sheet Feedbacks
            </a>
          </div>
          <input
            type="text"
            placeholder="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            className="border p-2 rounded h-[30vh] resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 hover:bg-blue-950 cursor-pointer rounded-2xl"
          >
            {loading ? "Đang gửi..." : "Gửi"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 mt-2 py-2 cursor-pointer hover:bg-red-500 bg-red-300 rounded-2xl"
          >
            Đóng
          </button>
        </form>
      </div>
    </div>
  );
}
