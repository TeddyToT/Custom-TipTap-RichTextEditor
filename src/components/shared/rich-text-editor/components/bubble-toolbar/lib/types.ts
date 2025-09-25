import { Editor } from "@tiptap/react";

type BubbleButton<T extends HTMLElement = HTMLButtonElement> = {
  icon: React.ReactNode;
  onClick: (e?: React.MouseEvent<T>) => void;
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