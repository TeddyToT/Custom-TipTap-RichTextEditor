import {LabelSelector} from ".."
import { Editor } from "@tiptap/react";
import { useState, useEffect } from "react";
const fontSizes = [
  { label: "12", value: "12" },
  { label: "14", value: "14" },
  { label: "16", value: "16" },
  { label: "20", value: "20" },
  { label: "24", value: "24" },
  { label: "32", value: "32" },
];

export default function FontSizePicker({ editor }: { editor: Editor }) {
  const [current, setCurrent] = useState("");
    useEffect(() => {
    if (!editor) return;

    const update = () => {
      const attrs = editor.getAttributes("textStyle") || {};
      let size = attrs.fontSize || "16";
      if (size) size = String(size).replace(/px$/, "");
      setCurrent(size);
    };

    update();
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  return (
    <LabelSelector
      label="Cỡ chữ"
      currentValue={current}
      options={fontSizes}
      onChange={(val) => editor.chain().focus().setFontSize(val).run()}
      onReset={() => editor.chain().focus().unsetFontSize().run()}
    />
  );
}
