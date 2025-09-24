import { useState, useEffect } from "react";
import type { Editor } from "@tiptap/react";
type Options<T extends Record<string, unknown> = Record<string, unknown>> = {
  type: "node" | "mark";
  attrs?: T;
};


const useActive = (
  editor: Editor | null,
  name: string,
  options: Options = { type: "node" }
) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      if (!editor) return;
      //mark
      if (options.type === "mark") {
        setActive(editor.isActive(name, options.attrs));
      } else {
        // node
        const { $from, empty } = editor.state.selection;
        let isActiveNode = false;

        for (let i = $from.depth; i > 0; i--) {
          const node = $from.node(i);
          if (node.type.name === name) {
            if (options.attrs) {
              let match = true;
              for (const key in options.attrs) {
                if (node.attrs[key] !== options.attrs[key]) match = false;
              }
              if (match) isActiveNode = true;
            } else {
              isActiveNode = true;
            }
            if (isActiveNode) break;
          }
        }

        if (empty && $from.node().type.name === name) {
          if (options.attrs) {
            let match = true;
            for (const key in options.attrs) {
              if ($from.node().attrs[key] !== options.attrs[key]) match = false;
            }
            if (match) isActiveNode = true;
          } else {
            isActiveNode = true;
          }
        }

        setActive(isActiveNode);
      }
    };

    update();
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor, name, options.attrs, options.type]);

  return active;
};
export default useActive
