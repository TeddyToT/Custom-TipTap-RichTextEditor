import { useEffect, useState } from "react";
import type { Level } from "@tiptap/extension-heading";
import {LabelSelector} from "..";
const options = [
  { value: "p", label: "Paragraph" },
  { value: "h1", label: "Heading 1" },
  { value: "h2", label: "Heading 2" },
  { value: "h3", label: "Heading 3" },
];
import { Editor } from "@tiptap/react";
interface TextSelectProps{
    editor: Editor
}
const TextSelect = ({ editor }: TextSelectProps) => {
  const [current, setCurrent] = useState("p");

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      if (editor.isActive("heading", { level: 1 })) return setCurrent("h1");
      if (editor.isActive("heading", { level: 2 })) return setCurrent("h2");
      if (editor.isActive("heading", { level: 3 })) return setCurrent("h3");

      return setCurrent("p");
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
      label="Kiểu chữ"
      currentValue={current}
      options={options}
      onChange={(val) => {
        setCurrent(val);
        if (val === "p") editor.chain().focus().setParagraph().run();
        else {
          const level = parseInt(val.replace("h", ""), 10) as Level;
          editor.chain().focus().setHeading({ level }).run();
        }
      }}
    />
  )
};

export default TextSelect;
