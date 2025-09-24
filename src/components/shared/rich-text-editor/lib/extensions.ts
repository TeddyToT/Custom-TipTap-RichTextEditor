import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Youtube from "@tiptap/extension-youtube";
import {
  Table,
  TableCell,
  TableRow,
  TableHeader,
} from "@tiptap/extension-table";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {CustomButton, CustomAnimation, CustomBulletList, CustomDropdown, FontSize, FontFamily,
  CustomHeading, CustomImage
} from "./custom-tiptap-extension";

export const extensions = [
  StarterKit.configure({
      heading: false,
        bulletList: false,
  orderedList: false,
  link: false,
  }),
  CustomHeading.configure({
    levels: [1, 2, 3],
  }),
  TextAlign.configure({ types: ["paragraph", "heading"] }),
  Color,
  TextStyle,
  FontSize,
  FontFamily,
  CustomImage,
  Youtube.configure({ controls: true, nocookie: true }),
  Table.configure({ resizable: true }),
  TableRow,
  TableHeader,
  TableCell,
  Link.configure({
    openOnClick: false,
    autolink: false,
    HTMLAttributes: {
      class: "text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors",
    target: "_blank",
    rel: "noopener noreferrer nofollow",
  },
  }),
  Placeholder.configure({ placeholder: "Viết nội dung bài viết..." }),
  CustomBulletList,
  CustomButton,
  CustomDropdown,
  CustomAnimation
];
