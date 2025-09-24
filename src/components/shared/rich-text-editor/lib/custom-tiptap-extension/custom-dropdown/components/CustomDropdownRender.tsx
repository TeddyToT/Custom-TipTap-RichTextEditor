import { useState } from "react"
import { NodeViewWrapper } from "@tiptap/react"
import type { NodeViewProps } from "@tiptap/react";

import BubbleToolbar from "../../../../components/bubble-toolbar/BubbleToolbar"
import { Settings, Trash2 } from "lucide-react"
import { ChevronDown, ChevronUp } from "lucide-react"

type DropdownOption = { label: string; url?: string };

const CustomDropdownRender = ({ node, editor, getPos }:NodeViewProps) => {
  const { options = [], placeholder = "Tùy chọn" } = node.attrs
  const [open, setOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const setSelection = () => {
    const pos = getPos();
    if (typeof pos === "number") {
      editor?.commands.setNodeSelection(pos);
    }
  };


  const isSelected = editor?.isActive("customDropdown")

  const handleClickOption = (opt: DropdownOption) => {
    if (opt.url) {
      window.open(opt.url, "_blank")
    } else {
      console.log("Clicked:", opt.label)
    }
    setOpen(false)
  }

  return (
    <NodeViewWrapper
      className="inline-block relative group"
      onClick={setSelection}
    >
      <button
        type="button"
        className={`py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border bg-white text-gray-800 shadow hover:bg-gray-50 focus:outline-none ${
          isSelected ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={() => setOpen(!open)}
        contentEditable={false}
      >
        {placeholder}
        {open?<ChevronUp/>:<ChevronDown/>}
      </button>

      {/* Menu options */}
      {open && (
        <div className="absolute left-0 mt-2 w-56 bg-white shadow-md rounded-lg p-2 z-50 border">
          {options.map((opt: DropdownOption, i: number) => (
            <div
              key={i}
              onClick={() => handleClickOption(opt)}
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}

      {/* Bubble toolbar */}
      {isSelected && (
        <BubbleToolbar
          className="absolute -bottom-9 flex gap-1 bg-white border rounded shadow p-1 z-50"
          editor={editor}
          buttons={[
            {
              icon: <Settings className="w-4 h-4" />,
              onClick: () => setShowSettings(!showSettings),
              active: showSettings,
              title: "Chỉnh sửa dropdown",
            },
            {
              icon: <Trash2 className="w-4 h-4" />,
              onClick: () =>
                editor.chain().focus().deleteSelection().run(),
              className: "text-red-600 hover:bg-red-100",
              title: "Xóa dropdown",
            },
          ]}
        />
      )}

      {/* Settings panel */}
      {showSettings && (
        <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-50 w-80">
          <p className="text-sm text-gray-600">
            Form chỉnh sửa
          </p>
          <button
            onClick={() => setShowSettings(false)}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            Xác nhận
          </button>
        </div>
      )}
    </NodeViewWrapper>
  )
}

export default CustomDropdownRender
