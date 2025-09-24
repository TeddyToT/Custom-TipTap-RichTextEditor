import { useEffect, useState } from "react";
import {LabelSelector} from ".."
import { Editor } from "@tiptap/react";

const fontFamilies = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Helvetica", value: "Helvetica, sans-serif" },
  { label: "Times New Roman", value: "Times New Roman, serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Courier New", value: "Courier New, monospace" },
];

const DEFAULT_FONT = "Times New Roman, serif";

export default function FontFamilyPicker({ editor }: { editor: Editor }) {
    const [current, setCurrent] = useState(DEFAULT_FONT);
    useEffect(() => {
    if (!editor) return;

    const update = () => {
      const attrs = editor.getAttributes("textStyle") || {};
      const fontFamily = attrs.fontFamily || DEFAULT_FONT;
      setCurrent(fontFamily);
      // console.log("font style hien tai: ", current);
    };

      const initializeFont = () => {
      const attrs = editor.getAttributes("textStyle") || {};
      if (!attrs.fontFamily) {
        editor.chain().focus().setFontFamily(DEFAULT_FONT).run();
        setCurrent(DEFAULT_FONT);
      } else {
        setCurrent(attrs.fontFamily);
      }
    };

    initializeFont();
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

    const handleFontChange = (fontValue: string) => {
    editor.chain().focus().setFontFamily(fontValue).run();
    setCurrent(fontValue);
  };

  const handleReset = () => {
    editor.chain().focus().setFontFamily(DEFAULT_FONT).run();
    setCurrent(DEFAULT_FONT);
  };
  return (
    <LabelSelector
      label="Font chữ"
      currentValue={current}
      options={fontFamilies}
      onChange={handleFontChange}
      onReset={handleReset}
    />
  );
}
