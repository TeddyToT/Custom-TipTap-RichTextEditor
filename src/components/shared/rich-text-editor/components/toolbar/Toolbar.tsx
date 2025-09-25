import {
  LinkButton,
  ColorPicker,
  ToolbarButton,
  TextSelector,
  BulletSymbolPicker,
  OrderedList,
  FontSizePicker,
  FontFamilyPicker,
} from "./components";
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Image as ImageIcon,
  Video,
  Undo,
  Underline,
  Save,
  SquarePlus,
  PanelBottomClose,
  Zap,
  TextSelect,
} from "lucide-react";
import { Editor } from "@tiptap/react";
interface ToolbarProps {
  html: string;
  editor: Editor | null;
  setShowImageDialog: (value: boolean) => void;
  setShowVideoDialog: (value: boolean) => void;
  setShowLinkDialog: (value: boolean) => void;
  setShowButtonDialog: (value: boolean) => void;
  setShowDropdownDialog: (value: boolean) => void;
  setShowAnimationDialog: (value: boolean) => void;
  setShowTextareaDialog: (value: boolean) => void;
}

import useActive from "./lib/isActiveNode";
import { richTextEditorCSS } from "../../lib/richTextEditorCSS";
import { Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

const Toolbar: React.FC<ToolbarProps> = ({
  html,
  editor,
  setShowImageDialog,
  setShowVideoDialog,
  setShowButtonDialog,
  setShowDropdownDialog,
  setShowAnimationDialog,
  setShowTextareaDialog,
}) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const isBlockquoteActive = useActive(editor, "blockquote");
  const isBoldActive = useActive(editor, "bold", { type: "mark" });
  const isItalicActive = useActive(editor, "italic", { type: "mark" });
  const isUnderlineActive = useActive(editor, "underline", { type: "mark" });

  const isLeftAlignParagraph = useActive(editor, "paragraph", {
    type: "node",
    attrs: { textAlign: "left" },
  });

  const isLeftAlignHeading = useActive(editor, "heading", {
    type: "node",
    attrs: { textAlign: "left" },
  });
  const isLeftAlign = isLeftAlignParagraph || isLeftAlignHeading;

  const isCenterAlignParagraph = useActive(editor, "paragraph", {
    type: "node",
    attrs: { textAlign: "center" },
  });

  const isCenterAlignHeading = useActive(editor, "heading", {
    type: "node",
    attrs: { textAlign: "center" },
  });
  const isCenterAlign = isCenterAlignParagraph || isCenterAlignHeading;

  const isRightAlignParagraph = useActive(editor, "paragraph", {
    type: "node",
    attrs: { textAlign: "right" },
  });

  const isRightAlignHeading = useActive(editor, "heading", {
    type: "node",
    attrs: { textAlign: "right" },
  });
  const isRightAlign = isRightAlignParagraph || isRightAlignHeading;

  const isJustifyAlignParagraph = useActive(editor, "paragraph", {
    type: "node",
    attrs: { textAlign: "justify" },
  });

  const isJustifyAlignHeading = useActive(editor, "heading", {
    type: "node",
    attrs: { textAlign: "justify" },
  });
  const isJustifyAlign = isJustifyAlignParagraph || isJustifyAlignHeading;

  const hasAnimation = () => {
    if (!editor) return false;

    const { selection } = editor.state;
    let hasAnim = false;

    editor.state.doc.nodesBetween(selection.from, selection.to, (node) => {
      if (node.attrs?.animationType) {
        hasAnim = true;
      }
    });

    return hasAnim;
  };
  if (!editor) return null;

  return (
    <div className="sticky top-0 border-b p-2 flex flex-wrap gap-1 items-center bg-white z-10">
      <div className="border-r pr-2">
        <TextSelector editor={editor} />
      </div>
      <div className="border-r pr-2">
        <FontFamilyPicker editor={editor} />
      </div>
      <div className="border-r pr-2">
        <FontSizePicker editor={editor} />
      </div>
      <div className="flex gap-1 border-r pr-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={isBoldActive}
          icon={Bold}
          title="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={isItalicActive}
          icon={Italic}
          title="Italic"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={isUnderlineActive}
          icon={Underline}
          title="Underline"
        />
      </div>
      <div className="flex gap-1 border-r pr-2 ">
        <ColorPicker editor={editor} />
      </div>
      <div className="flex gap-1 border-r pr-2 relative">
        <ToolbarButton
          onClick={() => setShowEmoji(!showEmoji)}
          isActive={false}
          icon={Smile}
          title="Chèn emoji"
        />
        {showEmoji && (
          <div className="absolute top-full left-0 z-50">
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                editor.chain().focus().insertContent(emojiData.emoji).run();
                setShowEmoji(false);
              }}
            />
          </div>
        )}
      </div>

      <div className="flex gap-1 border-r pr-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={isLeftAlign}
          icon={AlignLeft}
          title="Căn trái"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={isCenterAlign}
          icon={AlignCenter}
          title="Căn giữa"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={isRightAlign}
          icon={AlignRight}
          title="Căn phải"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={isJustifyAlign}
          icon={AlignJustify}
          title="Căn đều"
        />
      </div>

      <div className="flex gap-1 border-r pr-2">
        <BulletSymbolPicker editor={editor} />
        <OrderedList editor={editor} />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={isBlockquoteActive}
          icon={Quote}
          title="Quote"
        />
        <LinkButton editor={editor} />
      </div>

      {/* Media & Table */}
      <div className="flex gap-1 border-r pr-2">
        <ToolbarButton
          onClick={() => setShowImageDialog(true)}
          isActive={false}
          icon={ImageIcon}
          title="Thêm ảnh"
        />
        <ToolbarButton
          onClick={() => setShowVideoDialog(true)}
          isActive={false}
          icon={Video}
          title="Thêm Video"
        />
      </div>
      <div className="flex gap-1 border-r pr-2">
        <ToolbarButton
          onClick={() => setShowButtonDialog(true)}
          isActive={false}
          icon={SquarePlus}
          title="Chèn Button"
        />

        <ToolbarButton
          onClick={() => setShowDropdownDialog(true)}
          isActive={false}
          icon={PanelBottomClose}
          title="Chèn Dropdown"
        />
        <ToolbarButton
          onClick={() => setShowAnimationDialog(true)}
          isActive={hasAnimation()}
          icon={Zap}
          title="Chèn Animation"
        />
      </div>
      <ToolbarButton
        icon={TextSelect}
        onClick={() => setShowTextareaDialog(true)}
        title="Chèn Textarea"
      />

      <div className="flex gap-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          icon={Undo}
          title="Undo"
        />
        <ToolbarButton
          onClick={() => {
            if (!editor) return;
            const contentHTML = html;

            const fullHTML = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Exported Content</title>
    <style>${richTextEditorCSS}</style>
  </head>
  <body class="prose">
    ${contentHTML}
  </body>
  </html>`;

            const blob = new Blob([fullHTML], { type: "text/html" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "export.html";
            link.click();
            URL.revokeObjectURL(link.href);
          }}
          icon={Save}
          title="Xuất HTML"
        />
      </div>
    </div>
  );
};

export default Toolbar;
