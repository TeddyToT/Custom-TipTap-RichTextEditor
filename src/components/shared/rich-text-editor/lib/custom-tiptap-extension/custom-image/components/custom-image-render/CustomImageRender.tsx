import React, { useEffect, useState } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash2,
  Square,
  RectangleHorizontal,
} from "lucide-react";
import BubbleToolbar from "../../../../../components/bubble-toolbar/BubbleToolbar";
import type { CustomImageRenderProps } from "../../lib/types";
import { FloatLeftIcon, FloatRightIcon } from "../../lib/ImgFloatIcon";
import { getAnimationClasses } from "../../../../animation-utils";
const CustomImageRender = (props: NodeViewProps) => {
  const { node, updateAttributes, editor, getPos } = props;
  const { src, alt, width, height, align, float, margin, display } = node.attrs as CustomImageRenderProps;

  const [resizing, setResizing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
    if (!editor) return;

    const updateSelection = () => {
      const { selection } = editor.state;
      const pos = getPos();

      // Check if this node is specifically selected
      if (selection.node && selection.from === pos) {
        setIsSelected(true);
      } else {
        setIsSelected(false);
      }
    };

    updateSelection();
    editor.on('selectionUpdate', updateSelection);

    return () => {
      editor.off('selectionUpdate', updateSelection);
    };
  }, [editor, getPos]);

  // resize logic
  const startResize = (e: React.MouseEvent, mode: "width" | "height" | "both") => {
    e.preventDefault();
 
    const imgEl = e.currentTarget.parentElement?.querySelector("img") as HTMLImageElement;
    if (!imgEl) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = imgEl.offsetWidth;
    const startHeight = imgEl.offsetHeight;

    const onMouseMove = (ev: MouseEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;

      if (mode === "width" || mode === "both") {
        newWidth = startWidth + (ev.clientX - startX);
      }
      if (mode === "height" || mode === "both") {
        newHeight = startHeight + (ev.clientY - startY);
      }

      updateAttributes({
        width: `${newWidth}px`,
        height: `${newHeight}px`,
      });
    };

    const onMouseUp = () => {
      setResizing(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    setResizing(true);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const setSelection = () => {
    editor?.commands.setNodeSelection(getPos());
  };

  const getContainerStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: "relative",
    };

    if (display === "block") {
      baseStyle.display = "block";
      baseStyle.width = "100%";

      if (align === "center") {
        baseStyle.textAlign = "center";
      } else if (align === "right") {
        baseStyle.textAlign = "right";  
      } else if (align === "left") {
        baseStyle.textAlign = "left";
      }
    } else {
      // inline-block mode
      baseStyle.display = "inline-block";
      baseStyle.margin = margin || "0 5px";

      if (float && float !== "none") {
        baseStyle.float = float as any;
      }
    }

    return baseStyle;
  };


const getWrapperStyle = () => {
  if (display === "block") {
    return {
      display: "inline-block",
      width: width !== "auto" ? width : "auto"
    };
  }
  return {
    width: width !== "auto" ? width : "fit-content"
  };
};

  const getImageStyle = () => {
    const imgStyle: React.CSSProperties = {
      width: width !== "auto" ? width : "auto",
      height: height !== "auto" ? height : "auto",
      maxWidth: "100%",
      border: isSelected ? "2px solid blue" : undefined,
      opacity: resizing ? 0.6 : 1,
      transition: "opacity 0.1s",
    };

    if (display === "block") {
      imgStyle.display = "inline-block";
    } else {
      imgStyle.display = "block";
    }

    return imgStyle;
  };
  return (
    <NodeViewWrapper
      className="relative group node-wrapper"
      style={getContainerStyle()}
    >
      <div
      className={`relative ${display === "block" ? "block" : "inline-block"}`} style={getWrapperStyle()} onClick={setSelection}>
        <img
          src={src}
          alt={alt || ""}
          style={getImageStyle()}
          className={`custom-image ${getAnimationClasses(node.attrs)}`}
          contentEditable={false}
          draggable={false}
        />

        {/* Resize handles */}
        {isSelected && (
          <>
        <span
          contentEditable={false}
          className="absolute bottom-0 right-0 w-1/6 h-1/6 border-r-4 border-b-4 border-black  cursor-se-resize hidden group-hover:block"
          onMouseDown={(e) => startResize(e, "both")}
        />
        <span
          contentEditable={false}
          className="absolute bottom-1/3 right-0 w-2 h-1/3 border-r-4 border-black  cursor-e-resize hidden group-hover:block"
          onMouseDown={(e) => startResize(e, "width")}
        />
        <span
          contentEditable={false}
          className="absolute bottom-0 left-1/3 w-1/3 h-2 border-b-4 border-black cursor-s-resize hidden group-hover:block"
          onMouseDown={(e) => startResize(e, "height")}
        />
          </>

        )}

      </div>

      {/* Inline Toolbar */}
      {isSelected && (
        <BubbleToolbar
        className="absolute -top-5 flex gap-1 bg-white border rounded shadow p-1 z-50"
          editor={editor}
          buttons={[
                       {
              icon: <Square className="w-4 h-4" />,
              onClick: () => updateAttributes({ display: "block", align: "center" }),
              active: display === "block",
              title: "Block (xuống hàng)"
            },
            {
              icon: <RectangleHorizontal className="w-4 h-4" />,
              onClick: () => updateAttributes({ display: "inline-block", float: "left" }),
              active: display === "inline-block",
              title: "Inline Block (cùng hàng)"
            },

            { icon: "|", onClick: () => {}, className: "pointer-events-none text-gray-300", title:"" },

            ...(display === "block" ? [
            {
              icon: <AlignLeft className="w-4 h-4" />,
              onClick: () => updateAttributes({ align: "left", float: "none" }),
              active: align === "left" && float === "none",
              title: "Căn ảnh trái"
            },
            {
              icon: <AlignCenter className="w-4 h-4" />,
              onClick: () => updateAttributes({ align: "center", float: "none" }),
              active: align === "center" && float === "none",
              title: "Căn ảnh giữa"
            },
            {
              icon: <AlignRight className="w-4 h-4" />,
              onClick: () => updateAttributes({ align: "right", float: "none" }),
              active: align === "right" && float === "none",
              title: "Căn ảnh phải"
            },]: []),
            ...(display === "inline-block"
  ? [
      {
        icon: <FloatLeftIcon />,
        onClick: () => updateAttributes({ float: "left", align: "none" }),
        active: float === "left",
        title: "Float trái (text bao quanh)",
      },
      {
        icon: <FloatRightIcon />,
        onClick: () => updateAttributes({ float: "right", align: "none" }),
        active: float === "right",
        title: "Float phải (text bao quanh)",
      },
    ]
  : []),
            {
              icon: <Trash2 className="w-4 h-4" />,
              onClick: () => editor.chain().focus().deleteSelection().run(),
              className: "text-red-600 hover:bg-red-100",
              title: "Xóa ảnh"
            },
          ]}
        />
      )}
    </NodeViewWrapper>
  );
};

export default CustomImageRender;
