import { NodeViewProps } from "@tiptap/react";
interface CustomImageNodeAttrs {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  align?: "left" | "center" | "right";
  float?: "none" | "left" | "right";
  margin?: string;
}
export type CustomImageRenderProps = NodeViewProps & {
  node: NodeViewProps["node"] & {
    attrs: CustomImageNodeAttrs;
  };
};