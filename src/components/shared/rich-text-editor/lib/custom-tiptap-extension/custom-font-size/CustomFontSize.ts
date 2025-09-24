import { TextStyle } from "@tiptap/extension-text-style"

const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: element => element.style.fontSize?.replace("px", ""),
        renderHTML: attrs => {
          if (!attrs.fontSize) return {}
          return { style: `font-size: ${attrs.fontSize}px` }
        },
      },
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setFontSize:
        (size: string) =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize: size }).run(),

      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run(),
    }
  },
})

export default FontSize
