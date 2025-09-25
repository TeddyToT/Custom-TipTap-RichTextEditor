import { useState, useRef, useEffect } from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { Settings, Trash2 } from "lucide-react";
import { TextareaDialog } from "../../../../../components/dialogs";
import { useClickOutside } from "../../../../../components/toolbar/lib/useClickOutside";
import BubbleToolbar from "../../../../../components/bubble-toolbar/BubbleToolbar";
import { NodeSelection } from "prosemirror-state"
const CustomTextareaRender = ({
  node,
  updateAttributes,
  editor,
  getPos,
}: NodeViewProps) => {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isNodeSelected, setIsNodeSelected] = useState(false);
  const textareaRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    width,
    height,
    backgroundColor,
    textColor,
    borderRadius,
    padding,
    border,
    float,
    margin,
    display
  } = node.attrs;

  // Handle click outside to deselect
  useClickOutside(wrapperRef, () => {
    if (isNodeSelected && !showSettingsDialog) {
      setIsNodeSelected(false);
    }
  });

  // Check if this specific textarea node is selected
  const checkIfThisNodeSelected = () => {
    if (!editor) return false;

    const pos = getPos();
    if (typeof pos !== "number") return false;

    const { selection } = editor.state;
    const { from, to } = selection;

    // Check node selection
    if (selection instanceof NodeSelection) {
      // Direct node selection
      return selection.from === pos && selection.node === node;
    }

    // Check if cursor is within this node's range
    const nodeStart = pos;
    const nodeEnd = pos + node.nodeSize;

    return from >= nodeStart && to <= nodeEnd;
  };

  useEffect(() => {
    if (!editor) return;

    const updateSelection = () => {
      const isThisNodeSelected = checkIfThisNodeSelected();
      setIsNodeSelected((prev) => {
        if (prev !== isThisNodeSelected) {
          return isThisNodeSelected;
        }
        return prev;
      });
    };

    // Initial check
    updateSelection();

    editor.on("selectionUpdate", updateSelection);

    return () => {
      editor.off("selectionUpdate", updateSelection);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, node, getPos]);

  const handleFocus = () => {
    setIsEditing(true);
    if (textareaRef.current) {
      textareaRef.current.style.backgroundColor = backgroundColor;
      textareaRef.current.style.color = textColor;
      textareaRef.current.style.transform = "translateY(0px)";
      textareaRef.current.style.boxShadow = "0 0 0 2px #3b82f6";
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (textareaRef.current && !isNodeSelected) {
      textareaRef.current.style.boxShadow = "none";
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // If currently editing => focus
    if (isEditing) {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
      return;
    }

    // If not selected, select this specific node
    if (!isNodeSelected) {
      const pos = getPos();
      if (typeof pos === "number") {
        // Select the entire node
        editor?.commands.setNodeSelection(pos);
      }
    } else {
      // If already selected, start editing
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const selectNode = (e: React.MouseEvent) => {
    e.stopPropagation();
    const pos = getPos();
    if (typeof pos === "number") {
      editor?.commands.setNodeSelection(pos);
    }
  };

  console.log("margin render: ", margin);
  console.log("float render: ", float);


  return (
    <NodeViewWrapper
      ref={wrapperRef}
      className="inline-block relative group"
      style={{
      display: display|| "block",
      float: float || "none",
      verticalAlign: "top",
    }}
    >
      {isNodeSelected && (
        <div>
          <BubbleToolbar
            className="absolute -bottom-8"
            editor={editor}
            buttons={[
              {
                icon: <Settings className="w-4 h-4" />,
                onClick: (e) => {
                  e?.stopPropagation();
                  setShowSettingsDialog(true);
                },
                title: "Tùy chỉnh",
              },
              {
                icon: <Trash2 className="w-4 h-4" />,
                onClick: (e) => {
                  e?.stopPropagation();
                  const pos = getPos();
                  if (typeof pos === "number") {
                    editor
                      ?.chain()
                      .focus()
                      .deleteRange({ from: pos, to: pos + node.nodeSize })
                      .run();
                  }
                },
                title: "Tùy chỉnh",
                className: "hover:bg-red-500",
              },
            ]}
          />
        </div>
      )}

      <div
        ref={textareaRef}
        className={`textarea-container transition-all duration-200 ${
          isNodeSelected && !isEditing ? "ring-2 ring-blue-400 shadow-lg" : ""
        }`}
        style={{
          width,
          height,
          backgroundColor,
          color: textColor,
          borderRadius,
          padding: padding || "8px",
          border: border || `2px solid ${backgroundColor}`,
          overflow: "auto",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          outline: "none",
          cursor: "text",
          margin: margin || "10px",
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        onDoubleClick={selectNode}
      >
        <NodeViewContent className="textarea-content" />
      </div>

      {/* Settings dialog */}
      {showSettingsDialog && (
        <TextareaDialog
          onConfirm={(config) => {
            updateAttributes(config);
            setShowSettingsDialog(false);
          }}
          onCancel={() => {
            setShowSettingsDialog(false);
          }}
          currentConfig={{
            width,
            height,
            backgroundColor,
            textColor,

            border,
            borderRadius,
            padding,
          }}
          isEditMode={true}
        />
      )}
    </NodeViewWrapper>
  );
};

export default CustomTextareaRender;
