import type { BubbleToolbarProps } from "./lib/types";

const BubbleToolbar = ({
  editor,
  buttons,
  visible = true,
  className = "",
}: BubbleToolbarProps) => {
  if (!editor || !visible) return null;

  return (
    <div className={`flex gap-2 ${className}`}>
      {buttons.map((btn, i) => (
        <button
          type="button"
          key={i}
          title={btn.title}
          onMouseDown={(e) => e.preventDefault()}
          onClick={btn.onClick}
          className={`p-1 rounded cursor-pointer hover:bg-gray-100 ${
            btn.active ? "bg-gray-200" : ""
          } ${btn.className || ""}`}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

export default BubbleToolbar;
