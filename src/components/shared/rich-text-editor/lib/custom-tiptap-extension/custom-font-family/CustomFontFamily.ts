import { TextStyle } from "@tiptap/extension-text-style"

const FontFamily = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontFamily: {
        default: null,
        parseHTML: element => element.style.fontFamily,
        renderHTML: attrs => {
          if (!attrs.fontFamily) return {}
          return { style: `font-family: ${attrs.fontFamily}` }
        },
      },
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setFontFamily:
        (family: string) =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontFamily: family }).run(),

      unsetFontFamily:
        () =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontFamily: null }).removeEmptyTextStyle().run(),
    }
  },
})

export default FontFamily
