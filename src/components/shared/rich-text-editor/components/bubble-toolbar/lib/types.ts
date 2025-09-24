import { Editor } from "@tiptap/react";

type BubbleButton = {
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  title: string;
  className?: string;
};

export interface BubbleToolbarProps {
  editor: Editor;
  buttons: BubbleButton[];
  visible?: boolean;
  className?: string;
}