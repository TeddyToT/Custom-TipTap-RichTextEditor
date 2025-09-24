import BulletList from '@tiptap/extension-bullet-list'

 const CustomBulletList = BulletList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      bulletSymbol: {
        default: 'disc',
        parseHTML: element => element.getAttribute('data-bullet-symbol') || 'disc',
        renderHTML: attrs => ({
          'data-bullet-symbol': attrs.bulletSymbol,
          style: `list-style-type: ${attrs.bulletSymbol}`, // bắt buộc render inline style
        }),
      },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['ul', HTMLAttributes, 0]
  }
})

export default CustomBulletList
