import React from "react";
import {ToolbarButton} from "..";
import { ListOrdered } from "lucide-react";
import useActive from "../../lib/isActiveNode";
import { Editor } from "@tiptap/core";
interface OrderedListProps {
  editor: Editor;
}

const OrderedList: React.FC<OrderedListProps> = ({ editor }) => {
const isOrderedActive = useActive(editor, "orderedList");

  const handleClick = () => {
    if (!editor) return;

    if (editor.isActive("orderedList")) {
      editor.chain().focus().liftListItem("listItem").run();
    } else {
      editor.chain().focus().toggleOrderedList().run();
    }
  };

  return (
    <ToolbarButton
      onClick={handleClick}
      isActive={isOrderedActive}
      icon={ListOrdered}
      title="Danh sách kiểu số"
    />
  );
};

export default OrderedList;
