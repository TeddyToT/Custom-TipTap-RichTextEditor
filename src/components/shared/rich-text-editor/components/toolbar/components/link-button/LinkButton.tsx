import { useState } from "react";
import { Link2 } from "lucide-react";
import { Editor } from "@tiptap/react";
import {ToolbarButton} from "..";
import {LinkDialog} from "../../../dialogs"
import useActive from "../../lib/isActiveNode";
interface LinkButtonProps {
  editor: Editor;
}
const LinkButton: React.FC<LinkButtonProps> = ({ editor }) => {
  const [showDialog, setShowDialog] = useState(false);
const isLinkActive = useActive(editor, "link", { type: "mark" });

const handleConfirm = (url: string, text: string | undefined, newTab: boolean) => {
  if (!editor || !url) return;
  const { from, to } = editor.state.selection;
  const target = newTab ? "_blank" : undefined;
  const insertText = text && text.trim() ? text : url;

  // CASE có selection (from !== to)
  if (from !== to) {
    if (text && text.trim()) {
      editor
        .chain()
        .focus()
        .insertContentAt({ from, to }, insertText) // thay selection
        .setTextSelection({ from, to: from + insertText.length })
        .setLink({ href: url, target })
        .run();
    } else {
      editor.chain().focus().setLink({ href: url, target }).run();
    }
  } else {

    const start = from;
    editor
      .chain()
      .focus()
      .insertContent(insertText)
      .setTextSelection({ from: start, to: start + insertText.length })
      .setLink({ href: url, target })
      .run();
  }

  setShowDialog(false);
};


  return (
    <div className="">
      <ToolbarButton
        onClick={() => setShowDialog(true)}
        isActive={isLinkActive}
        icon={Link2}
        title="Thêm link"
      />

      {showDialog && (
        <LinkDialog
          currentUrl={editor.getAttributes("link").href || ""}
          currentText={editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            " "
          )}
          openInNewTab={editor.getAttributes("link").target === "_blank"}

          onConfirm={(url, text, newTab) => {handleConfirm(url, text, newTab)}}

          onCancel={() => setShowDialog(false)}
          onRemove={() => {
            editor.chain().focus().unsetLink().run();
            setShowDialog(false);
          }}
        />
      )}
    </div>
  );
};

export default LinkButton;
