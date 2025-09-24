import { Tooltip, TooltipTrigger, TooltipContent } from "../../../../../../../ui/tooltip";

interface ImageModeButtonProps {
  mode: "inline-block" | "block";
  currentMode: "inline-block" | "block";
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  description: string;
  tooltip: React.ReactNode;
}

const ImageModeButton = ({
  mode,
  currentMode,
  onClick,
  icon,
  label,
  description,
  tooltip,
}:ImageModeButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
            currentMode === mode
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          {icon}
          <span className="text-sm font-medium">{label}</span>
          <span className="text-xs text-gray-500 text-center">{description}</span>
        </button>
      </TooltipTrigger>

      <TooltipContent side="top">{tooltip}</TooltipContent>
    </Tooltip>
  );
};

export default ImageModeButton
