import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CustomImageRender from "./components/custom-image-render/CustomImageRender";
import { getAnimationClasses } from "../../animation-utils";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customImage: {
      setImageAlign: (align: "left" | "center" | "right") => ReturnType;
      setImageFloat: (float: "none" | "left" | "right") => ReturnType;
      setImageSize: (options: { width?: string; height?: string }) => ReturnType;
      setImageDisplay: (display: "block" | "inline-block") => ReturnType;
      insertImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        display?: "block" | "inline-block";
        width?: string;
        height?: string;
      }) => ReturnType;
    };
  }
}

const CustomImage = Node.create({
  name: "customImage",
  group: "block",
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      align: { default: "center" },
      float: { default: "none" },
      width: {
        default: "auto",
        parseHTML: element => (element as HTMLElement).style.width || "auto",
      },
      height: {
        default: "auto",
        parseHTML: element => (element as HTMLElement).style.height || "auto",
      },
      margin: { default: "0 5px" },
      display: {
        default: "inline-block",
        parseHTML: element => {
          const dataDisplay = (element as HTMLElement).getAttribute("data-display");
          if (dataDisplay) return dataDisplay;

          const parent = (element as HTMLElement).parentElement;
          if (parent && parent.style.textAlign && parent.style.textAlign !== "left") {
            return "block";
          }
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
        getAttrs: element => {
          const img = element as HTMLImageElement;
          return {
            src: img.getAttribute("src"),
            alt: img.getAttribute("alt"),
            title: img.getAttribute("title"),
            display: img.getAttribute("data-display") || "inline-block",
            align: img.getAttribute("data-align") || "center",
            float: img.getAttribute("data-float") || "none",
            width: img.style.width || "auto",
            height: img.style.height || "auto",
            margin: img.style.margin || "0 5px",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { align, float, width, height, margin, display } = HTMLAttributes;

    if (display === "block") {
      // Wrapper div căn giữa/trái/phải
      let wrapperStyle = "display: block; width: 100%;";
      if (align === "center") wrapperStyle += " text-align: center;";
      else if (align === "left") wrapperStyle += " text-align: left;";
      else if (align === "right") wrapperStyle += " text-align: right;";

      // Style riêng cho ảnh bên trong
      let imgStyle = "display: inline-block;";
      if (width && width !== "auto") imgStyle += ` width: ${width};`;
      if (height && height !== "auto") imgStyle += ` height: ${height};`;

      return [
        "div",
        { style: wrapperStyle },
        [
          "img",
          mergeAttributes(HTMLAttributes, {
            style: imgStyle,
            "data-display": display,
            "data-align": align,
            "data-float": float,
          class: `${HTMLAttributes.class || ""} ${getAnimationClasses(HTMLAttributes) || ""}`.trim(),

          }),
        ],
      ];
    } else {
      // Inline-block mode
      let style = `display: ${display || "inline-block"};`;

      if (float && float !== "none") {
        style += ` float: ${float};`;
      }

      if (align && float === "none") {
        if (align === "center") style += " vertical-align: middle;";
        else if (align === "top") style += " vertical-align: top;";
        else if (align === "bottom") style += " vertical-align: bottom;";
      }

      if (width && width !== "auto") style += ` width: ${width};`;
      if (height && height !== "auto") style += ` height: ${height};`;
      if (margin) style += ` margin: ${margin};`;

      return [
        "img",
        mergeAttributes(HTMLAttributes, {
          style,
          "data-display": display,
          "data-align": align,
          "data-float": float,
              class: `${HTMLAttributes.class || ""} ${getAnimationClasses(HTMLAttributes) || ""}`.trim(),

        }),
      ];
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomImageRender);
  },

  addCommands() {
    return {
      setImageAlign:
        align =>
        ({ commands }) =>
          commands.updateAttributes("customImage", { align }),

      setImageFloat:
        float =>
        ({ commands }) =>
          commands.updateAttributes("customImage", { float }),

      setImageSize:
        options =>
        ({ commands }) =>
          commands.updateAttributes("customImage", options),

      setImageDisplay:
        display =>
        ({ commands }) =>
          commands.updateAttributes("customImage", { display }),

      insertImage:
        options =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              ...options,
              display: options.display || "inline-block",
              float: options.display === "inline-block" ? "left" : "none",
              width: "200px",
              height: options.height || "auto",
              margin: "0 5px",
            },
          });
        },
    };
  },
});

export default CustomImage;
