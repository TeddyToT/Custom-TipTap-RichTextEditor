import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CustomButtonRender from "./components/custom-button-render/CustomButtonRender";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customButton: {
      insertButton: (options: {
        text: string;
        url?: string;
        action?: string;
        size?: 'small' | 'medium' | 'large';
        variant?: 'primary' | 'outline';
        backgroundColor?: string;
        textColor?: string;
        hoverBackgroundColor?: string;
        hoverTextColor?: string;
        borderRadius?: string;
        padding?: string;
      }) => ReturnType;
      updateButton: (options: {
        text?: string;
        url?: string;
        action?: string;
        size?: 'small' | 'medium' | 'large';
        variant?: 'primary' | 'outline';
        backgroundColor?: string;
        textColor?: string;
        hoverBackgroundColor?: string;
        hoverTextColor?: string;
        borderRadius?: string;
        padding?: string;
      }) => ReturnType;
    };
  }
}

const CustomButton = Node.create({
  name: "customButton",
  group: "inline",
  inline: true,
  draggable: true,

  addAttributes() {
    return {
      text: {
        default: "Button",
        parseHTML: element => element.textContent,
      },
      url: {
        default: "",
        parseHTML: element => element.getAttribute("data-url"),
      },
      action: {
        default: "link", // link, scroll, custom
        parseHTML: element => element.getAttribute("data-action"),
      },
      size: {
        default: "medium",
        parseHTML: element => element.getAttribute("data-size"),
      },
      variant: {
        default: "primary",
        parseHTML: element => element.getAttribute("data-variant"),
      },
      backgroundColor: {
        default: "#3b82f6",
        parseHTML: element => element.style.backgroundColor,
      },
      textColor: {
        default: "#ffffff",
        parseHTML: element => element.style.color,
      },
      hoverBackgroundColor: {
        default: "#2563eb",
        parseHTML: element => element.getAttribute("data-hover-bg"),
      },
      hoverTextColor: {
        default: "#ffffff",
        parseHTML: element => element.getAttribute("data-hover-text"),
      },
      borderRadius: {
        default: "6px",
        parseHTML: element => element.style.borderRadius,
      },
      padding: {
        default: "",
        parseHTML: element => element.style.padding,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "button[data-custom-button]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const {
      text,
      url,
      action,
      size,
      variant,
      backgroundColor,
      textColor,
      hoverBackgroundColor,
      hoverTextColor,
      borderRadius,
      padding,
    } = HTMLAttributes;

    // Size presets
    const sizeStyles = {
      small: "px-3 py-1.5 text-sm",
      medium: "px-4 py-2 text-base",
      large: "px-6 py-3 text-lg"
    };

    // Variant presets
    const variantStyles = {
      primary: {
        backgroundColor: backgroundColor || "#3b82f6",
        textColor: textColor || "#ffffff",
        border: "none"
      },
      outline: {
        backgroundColor: "transparent",
        textColor: textColor || "#3b82f6",
        border: `2px solid ${backgroundColor || "#3b82f6"}`
      },
    };

    const currentVariant = variantStyles[variant as keyof typeof variantStyles] || variantStyles.primary;
    const currentSize = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.medium;

    const customPadding = padding || "";
    const finalPadding = customPadding || currentSize.split(' ').filter(cls => cls.startsWith('px-') || cls.startsWith('py-')).join(' ');

    const buttonStyle = {
      backgroundColor: currentVariant.backgroundColor,
      color: currentVariant.textColor,
      border: currentVariant.border,
      borderRadius: borderRadius || "6px",
      padding: finalPadding || undefined,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "500",
      transition: "all 0.2s ease-in-out",
      textDecoration: "none",
      outline: "none",
    };

    return [
      "button",
      mergeAttributes(
        {
          "data-custom-button": "true",
          "data-url": url,
          "data-action": action,
          "data-size": size,
          "data-variant": variant,
          "data-hover-bg": hoverBackgroundColor,
          "data-hover-text": hoverTextColor,
          class: customPadding ? "" : currentSize,
          style: Object.entries(buttonStyle)
            .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
            .join('; '),
          onmouseover: `
            this.style.backgroundColor = '${hoverBackgroundColor || "#2563eb"}';
            this.style.color = '${hoverTextColor || "#ffffff"}';
            this.style.transform = 'translateY(-1px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
          `,
          onmouseout: `
            this.style.backgroundColor = '${currentVariant.backgroundColor}';
            this.style.color = '${currentVariant.textColor}';
            this.style.transform = 'translateY(0px)';
            this.style.boxShadow = 'none';
          `,
          onclick: action === "link" && url ? `
              window.open('${url}', '_blank');
          ` : `
            console.log('Custom button clicked:', '${url}');
          `,
        },
      ),
      text || "Button",
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomButtonRender);
  },

  addCommands() {
    return {
      insertButton:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },

      updateButton:
        (options) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, options);
        },
    };
  },
});

export default CustomButton;