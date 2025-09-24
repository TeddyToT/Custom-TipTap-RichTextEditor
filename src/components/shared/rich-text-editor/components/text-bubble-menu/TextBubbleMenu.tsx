// import {
//   Bold,
//   Italic,
//   Underline,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   AlignJustify,
//   Quote,
// } from "lucide-react";
// import type { Editor } from "@tiptap/react";
// import BubbleToolbar from "@/components/shared/rich-text-editor/components/bubble-toolbar/BubbleToolbar";
// import TextSelect from "../toolbar/components/text-selector/TextSelector";
// import FontSizePicker from "../toolbar/components/font-size-picker/FontSizePicker";
// import FontFamilyPicker from "../toolbar/components/font-family-picker/FontFamilyPicker";
// import ColorPicker from "../toolbar/components/color-picker/ColorPicker";
// import LinkButton from "../toolbar/components/link-button/LinkButton";
// import useActive from "../toolbar/lib/isActiveNode";
// interface TextBubbleMenuProps {
//   editor: any;
// }

// const TextBubbleMenu= ({ editor }:TextBubbleMenuProps) => {
//     const boldActive = useActive(editor, "bold", { type: "mark" });
//     const italicActive = useActive(editor, "italic", { type: "mark" });
//     const underlineActive = useActive(editor, "underline", { type: "mark" });
//     const alignLeftActive = useActive(editor, "paragraph", { type: "node", attrs: { textAlign: "left" } });
//     const alignCenterActive = useActive(editor, "paragraph", { type: "node", attrs: { textAlign: "center" } });
//     const alignRightActive = useActive(editor, "paragraph", { type: "node", attrs: { textAlign: "right" } });
//     const alignJustifyActive = useActive(editor, "paragraph", { type: "node", attrs: { textAlign: "justify" } });
//     const quoteActive = useActive(editor, "blockquote", { type: "node" });
//   if (!editor) return null;

  

//   return (
//     <BubbleMenu
//       editor={editor}
//       shouldShow={(editor:Editor) => {
//     // không hiện nếu không có selection
//     if (editor.state.selection.empty) return false;

//     // hiện nếu đang ở trong paragraph, text, hoặc blockquote
//     return (
//       editor.isActive("paragraph") ||
//       editor.isActive("textStyle") ||
//       editor.isActive("blockquote")
//     );
//   }}
//       tippyOptions={{ duration: 100 }}
//     >
//       <div className="flex flex-col items-center gap-1 bg-white border rounded shadow p-1">
//         {/* Dropdowns */}
//         <div className="flex gap-2">
//         <TextSelect editor={editor} />
//         <FontFamilyPicker editor={editor} />
//         <FontSizePicker editor={editor} />
//         </div>

//         {/* Bold, Italic, Underline, Align, Quote, Link */}
//         <div className="flex">
//             <BubbleToolbar
//             editor={editor}
//             buttons={[
//             {
//               icon: <Bold className="w-4 h-4" />,
//               onClick: () => editor.chain().focus().toggleBold().run(),
//               active: boldActive,
//               title:"In đậm"
//             },
//             {
//               icon: <Italic className="w-4 h-4" />,
//               onClick: () => editor.chain().focus().toggleItalic().run(),
//               active: italicActive,
//               title:"In nghiêng"
//             },
//             {
//               icon: <Underline className="w-4 h-4" />,
//               onClick: () => editor.chain().focus().toggleUnderline().run(),
//               active: underlineActive,
//               title:"Gạch dưới"
//             },
//             {
//               icon: <AlignLeft className="w-4 h-4" />,
//               onClick: () => editor.chain().focus().setTextAlign("left").run(),
//               active: alignLeftActive,
//               title:"Căn trái"
//             },
//             {
//               icon: <AlignCenter className="w-4 h-4" />,
//               onClick: () => editor.chain().focus().setTextAlign("center").run(),
//               active: alignCenterActive,
//               title:"Căn giữa"
//             },
//             {
//               icon: <AlignRight className="w-4 h-4" />,
//               onClick: () => editor.chain().focus().setTextAlign("right").run(),
//               active: alignRightActive,
//               title:"Căn phải"
//             },
//             {
//               icon: <AlignJustify className="w-4 h-4" />,
//               onClick: () => editor.chain().focus().setTextAlign("justify").run(),
//               active: alignJustifyActive,
//               title:"Căn đều"
//             },
//             {
//               icon: <Quote className="w-4 h-4" />,
//               onClick: () => editor.chain().focus().toggleBlockquote().run(),
//               active: quoteActive,
//               title:"Quote"
//             },
//           ]}
//         />
//         <ColorPicker editor={editor} />
//         <LinkButton editor={editor} />
//         </div>


//       </div>
//     </BubbleMenu>
//   );
// };

// export default TextBubbleMenu;
