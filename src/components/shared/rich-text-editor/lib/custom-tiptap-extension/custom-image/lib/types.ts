import type { NodeViewProps } from "@tiptap/react";
export interface CustomImageNodeAttrs {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  align?: "left" | "center" | "right";
  float?: "none" | "left" | "right";
  margin?: string;
  display?: string;
}
export type CustomImageRenderProps = NodeViewProps & {
  node: NodeViewProps["node"] & {
    attrs: CustomImageNodeAttrs;
  };
};