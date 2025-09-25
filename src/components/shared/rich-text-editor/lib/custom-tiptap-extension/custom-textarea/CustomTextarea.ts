import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CustomTextareaRender from "./components/custom-textarea-render/CustomTextareaRender";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customTextarea: {
      insertTextarea: (options: {
        width?: string;
        height?: string;
        backgroundColor?: string;
        textColor?: string;
        hoverBackgroundColor?: string;
        hoverTextColor?: string;
        border?: string;
        borderRadius?: string;
        padding?: string;
        float?: string;
        margin?: string;
      }) => ReturnType;
      updateTextarea: (options: {
        width?: string;
        height?: string;
        backgroundColor?: string;
        textColor?: string;
        hoverBackgroundColor?: string;
        hoverTextColor?: string;
        border?: string;
        borderRadius?: string;
        padding?: string;
        float?: string;
        margin?: string;
      }) => ReturnType;
    };
  }
}

const CustomTextarea = Node.create({
  name: "customTextarea",
  group: "block",
  content: "block+",
  draggable: true,
  selectable: true,
  isolating: true,

  addAttributes() {
    return {
      width: {
        default: "300px",
        parseHTML: (element) => element.style.width,
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return { style: `width: ${attributes.width}` };
        },
      },
      height: {
        default: "200px",
        parseHTML: (element) => element.style.height,
        renderHTML: (attributes) => {
          if (!attributes.height) return {};
          return { style: `height: ${attributes.height}` };
        },
      },
      backgroundColor: {
        default: "#f3f4f6",
        parseHTML: (element) => element.style.backgroundColor,
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) return {};
          return { style: `background-color: ${attributes.backgroundColor}` };
        },
      },
      textColor: {
        default: "#000000",
        parseHTML: (element) => element.style.color,
        renderHTML: (attributes) => {
          if (!attributes.textColor) return {};
          return { style: `color: ${attributes.textColor}` };
        },
      },
      hoverBackgroundColor: {
        default: "#6B7280",
        parseHTML: (element) => element.getAttribute("data-hover-bg"),
        renderHTML: (attributes) => {
          if (!attributes.hoverBackgroundColor) return {};
          return { "data-hover-bg": attributes.hoverBackgroundColor };
        },
      },
      hoverTextColor: {
        default: "#ffffff",
        parseHTML: (element) => element.getAttribute("data-hover-text"),
        renderHTML: (attributes) => {
          if (!attributes.hoverTextColor) return {};
          return { "data-hover-text": attributes.hoverTextColor };
        },
      },
      border: {
        default: "1px solid #6B7280",
        parseHTML: (element) => element.style.border,
        renderHTML: (attributes) => {
          if (!attributes.border) return {};
          return { style: `border: ${attributes.border}` };
        },
      },
      borderRadius: {
        default: "6px",
        parseHTML: (element) => element.style.borderRadius,
        renderHTML: (attributes) => {
          if (!attributes.borderRadius) return {};
          return { style: `border-radius: ${attributes.borderRadius}` };
        },
      },
      padding: {
        default: "12px",
        parseHTML: (element) => element.style.padding,
        renderHTML: (attributes) => {
          if (!attributes.padding) return {};
          return { style: `padding: ${attributes.padding}` };
        },
      },
      float: {
        default: "left",
        parseHTML: (element) => element.style.float,
        renderHTML: (attributes) => {
          if (!attributes.float) return {};
          return { style: `float: ${attributes.float}` };
        },
      },
      margin: {
        default: "0px",
        parseHTML: (element) => element.style.margin,
        renderHTML: (attributes) => {
          if (!attributes.margin) return {};
          return { style: `margin: ${attributes.margin}` };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-custom-textarea]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const {
      width,
      height,
      backgroundColor,
      textColor,
      hoverBackgroundColor,
      hoverTextColor,
      border,
      borderRadius,
      padding,
      float,
      margin,
    } = HTMLAttributes;
    const styleString = [
      width && `width: ${width}`,
      height && `height: ${height}`,
      backgroundColor && `background-color: ${backgroundColor}`,
      textColor && `color: ${textColor}`,
      border && `border: ${border}`,
      borderRadius && `border-radius: ${borderRadius}`,
      padding && `padding: ${padding}`,
      float && `float: ${float}`,
      margin && `margin: ${margin}`,
      `overflow: auto`,
      `white-space: pre-wrap`,
      `word-break: break-word`,
      `display: inline-block`,
      `outline: none`,
    ]
      .filter(Boolean)
      .join("; ");

    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-custom-textarea": "true",
        "data-hover-bg": hoverBackgroundColor,
        "data-hover-text": hoverTextColor,
        style: styleString,
      }),
      0, // allows content inside
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomTextareaRender);
  },

  addCommands() {
    return {
      insertTextarea:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Type your text here...",
                  },
                ],
              },
            ],
          });
        },

      updateTextarea:
        (options) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, options);
        },
    };
  },
});

export default CustomTextarea;
