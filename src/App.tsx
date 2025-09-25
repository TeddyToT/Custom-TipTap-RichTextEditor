import { useState } from "react";
import FeedbackModal from "./components/shared/feed-back-model/FeedBackModel";
import NoticeModel from "./components/shared/notice-model/NoticeModel";
import { PostCreationForm } from "./app/views/post/components";
import { Send, NotebookPen } from "lucide-react";
import notices from "./lib/noticeMessage";
function App() {
  const [openFeedback, setOpenFeedback] = useState(false);
  const [openNotice, setOpenNotice] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <button
          onClick={() => setOpenNotice(true)}
          className="flex gap-2 bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-400"
        >
          <NotebookPen />
          Note phiên bản hiện tại
        </button>
        <button
          onClick={() => setOpenFeedback(true)}
          className="flex gap-2 bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-400"
        >
          <Send />
          Gửi Feedback
        </button>
      </div>
      {openFeedback && <FeedbackModal onClose={() => setOpenFeedback(false)} />}
        {openNotice && <NoticeModel notices={notices} onClose={() => setOpenNotice(false)} />}
      <PostCreationForm />
    </div>
  );
}

export default App;
