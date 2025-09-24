import React from "react";
import type { LucideIcon } from "lucide-react";

interface ToolbarButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
  disabled?: boolean;
  icon: LucideIcon;
  title?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive = false,
  disabled = false,
  icon: Icon,
  title,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2 rounded hover:bg-gray-100 transition-colors ${
      isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"
    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
  >
    <Icon className="w-4 h-4" />
  </button>
);

export default ToolbarButton;
