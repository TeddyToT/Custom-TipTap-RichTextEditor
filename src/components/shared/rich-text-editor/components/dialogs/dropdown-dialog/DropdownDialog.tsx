import { useState } from "react"

const DropdownDialog = ({ onConfirm, onCancel }) => {
  const [options, setOptions] = useState([{ label: "Lựa chọn 1", value: "opt1", url: "" }])
  const [placeholder, setPlaceholder] = useState("Tùy chọn")

  const handleAdd = () => {
    setOptions([...options, { label: "", value: `opt${options.length + 1}`, url: "" }])
  }

  const handleChange = (i:number, key:string, val) => {
    const newOpts = [...options]
    newOpts[i][key] = val
    setOptions(newOpts)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 h-2/3 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Tạo Dropdown</h3>

        <div className="pb-4 mb-3  border-b-2">
          <p className="block mb-1">Tiêu đề</p>
          <input
            type="text"
            value={placeholder}
            onChange={e => setPlaceholder(e.target.value)}
            placeholder="Tiêu đề lựa chọn"
            className="w-full p-2 border rounded"
          />
        </div>

        {options.map((opt, i) => (
          <div key={i} className="py-3 space-y-1 text-sm border-b-1">
            <p className="mb-1">Lựa chọn {i+1}</p>
            <input
              type="text"
              value={opt.label}
              onChange={e => handleChange(i, "label", e.target.value)}
              placeholder="Tên lựa chọn"
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="text"
              value={opt.url}
              onChange={e => handleChange(i, "url", e.target.value)}
              placeholder="URL (tuỳ chọn)"
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleAdd}
          className="my-3 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
        >
          + Thêm lựa chọn
        </button>

        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded cursor-pointer">
            Hủy
          </button>
          <button
            onClick={() => onConfirm({ placeholder, options })}
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  )
}

export default DropdownDialog
