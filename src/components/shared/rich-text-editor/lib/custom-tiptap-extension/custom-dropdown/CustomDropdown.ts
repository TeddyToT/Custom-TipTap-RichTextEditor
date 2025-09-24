import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import CustomDropdownRender from "./components/CustomDropdownRender"

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customDropdown: {
      insertDropdown: (options: {
        placeholder: string
        options: { label: string; url?: string }[]
      }) => ReturnType
      updateDropdown: (options: {
        placeholder?: string
        options?: { label: string; url?: string }[]
      }) => ReturnType
    }
  }
}

const CustomDropdown = Node.create({
  name: "customDropdown",
  group: "inline",
  inline: true,
  draggable: true,

  addAttributes() {
    return {
      placeholder: {
        default: "Tùy chọn",
        parseHTML: el => el.getAttribute("data-placeholder") || "Tùy chọn",
        renderHTML: attrs => ({ "data-placeholder": attrs.placeholder }),
      },
      options: {
        default: [],
        parseHTML: el => {
          try {
            return JSON.parse(el.getAttribute("data-options") || "[]")
          } catch {
            return []
          }
        },
        renderHTML: attrs => ({
          "data-options": JSON.stringify(attrs.options || []),
        }),
      },
    }
  },

  parseHTML() {
    return [{ tag: "div[data-custom-dropdown]" }]
  },

  renderHTML({ HTMLAttributes }) {
    const { options = [] } = HTMLAttributes

    let parsedOptions = []
    try {
      const optionsStr = HTMLAttributes["data-options"]
      if (optionsStr) {
        parsedOptions = JSON.parse(optionsStr)
      } else if (Array.isArray(options)) {
        parsedOptions = options
      } else if (typeof options === 'string') {
        parsedOptions = JSON.parse(options)
      }
    } catch {
      parsedOptions = []
    }

    const dropdownId = `dropdown-${Math.random().toString(36).substr(2, 9)}`

    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-custom-dropdown": "true",
        "data-dropdown-id": dropdownId,
        class: "inline-block relative"
      }),
      [
        "button",
        {
          type: "button",
          class: "py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border bg-white text-gray-800 shadow hover:bg-gray-50 focus:outline-none",
          "data-dropdown-btn": dropdownId,
          onmousedown: `event.preventDefault(); document.querySelector('[data-dropdown-menu="${dropdownId}"]').classList.toggle('hidden');`
        },
        [
          "span", {}, HTMLAttributes["data-placeholder"] || "Tùy chọn"
        ],
        [
          "svg",
          {
            class: "w-4 h-4",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24"
          },
          [
            "path",
            {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M19 9l-7 7-7-7"
            }
          ]
        ]
      ],
      [
        "div",
        {
          class: "absolute left-0 mt-2 w-56 bg-white shadow-md rounded-lg p-2 z-50 border hidden",
          "data-dropdown-menu": dropdownId
        },
        ...parsedOptions.map((opt: { label: string; url?: string }, i: number) => [
          "div",
          {
            class: "flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 cursor-pointer",
            "data-option-url": opt.url || "",
            onmousedown: `event.preventDefault(); ${opt.url ? `window.open('${opt.url}', '_blank');` : ''} document.querySelector('[data-dropdown-menu="${dropdownId}"]').classList.add('hidden');`,
            key: i
          },
          opt.label || `Option ${i + 1}`
        ])
      ],
      [
        "script",
        {},
        `
        (function() {
          const dropdown = document.querySelector('[data-dropdown-id="${dropdownId}"]');
          const menu = document.querySelector('[data-dropdown-menu="${dropdownId}"]');

          if (dropdown && menu) {
            document.addEventListener('mousedown', function(e) {
              if (!dropdown.contains(e.target)) {
                menu.classList.add('hidden');
              }
            });
          }
        })();
        `
      ]
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomDropdownRender)
  },

  addCommands() {
    return {
      insertDropdown:
        options =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
      updateDropdown:
        options =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, options)
        },
    }
  },
})

export default CustomDropdown
