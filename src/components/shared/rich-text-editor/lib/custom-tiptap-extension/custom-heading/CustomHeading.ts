import { Heading } from "@tiptap/extension-heading";

const CustomHeading = Heading.extend({
    addAttributes() {
    return {
      ...this.parent?.(),
      textAlign: {
        default: 'left',
        parseHTML: element => element.style.textAlign || 'left',
        renderHTML: attributes => {
          return {
            style: `text-align: ${attributes.textAlign}`,
          };
        },
      },
    };
  },


  renderHTML({ node, HTMLAttributes }) {
    const level = this.options.levels.includes(node.attrs.level)
      ? node.attrs.level
      : this.options.levels[0];

    const styleMap: Record<number, string> = {
      1: "font-size: 2rem;",
      2: "font-size: 1.5rem;",
      3: "font-size: 1.25rem;",
    };

    const combinedStyle = `${styleMap[level] || ""} text-align: ${node.attrs.textAlign || "left"};`;

    return [
      `h${level}`,
      {
        ...HTMLAttributes,
        style: combinedStyle || "",
      },
      0,
    ];
  },
});

export default CustomHeading;
