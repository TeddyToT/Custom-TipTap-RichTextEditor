import { useState, useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { extensions } from './lib/extensions';
import Toolbar from './components/toolbar/Toolbar';
import "./RichTextEditor.css"
import {LinkDialog, ImageDialog, VideoDialog, ButtonDialog, DropdownDialog, AnimationDialog} from "./components/dialogs"
// import TextBubbleMenu from './components/text-bubble-menu/page';
const RichTextEditor = (props:{value:string, onChange: (value:string)=>void}) => {

  const {value, onChange} = props

  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showButtonDialog, setShowButtonDialog] = useState(false);
  const [showDropdownDialog, setShowDropdownDialog] = useState(false)
  const [showAnimationDialog,setShowAnimationDialog] = useState(false)

    useEffect(() => {
      const handler = () => setShowAnimationDialog(true);
      window.addEventListener("open-animation-dialog", handler);
      return () => window.removeEventListener("open-animation-dialog", handler);
    }, []);
const editor = useEditor({
  extensions,
  content: value,
  editorProps: {
    attributes: {
      class:
        "prose prose-sm sm:prose lg:prose-lg xl:prose-xl list-demical focus:outline-none min-h-[400px] p-4",
    },
    handleClickOn(_view, _pos, _node, _nodePos, event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target && target.tagName === "A") {
        if (event.ctrlKey || event.metaKey) {
          const href = target.getAttribute("href");
          if (href) {
            window.open(href, "_blank");
          }
          return true; // Ngăn default behavior
        }
        return true; // Click thường
      }
      return false;
    },
  },
  onUpdate: () => {
    onChange(getHTMLWithAnimations());
  }
});

// Function to generate animation classes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAnimationClasses = (attrs: any) => {
    // const { animationType, animationDuration, animationDelay, animationRepeat, animationEase, animationHoverPause } = attrs;
    const { animationType, animationDuration, animationRepeat, animationHoverPause } = attrs;

    if (!animationType) return '';
    
    const classes: string[] = [];

    // Animation type classes
    switch (animationType) {
      case 'bounce': classes.push('animate-bounce'); break;
      case 'fade': classes.push('animate-fade'); break;
      case 'pulse': classes.push('animate-pulse'); break;
      case 'spin': classes.push('animate-spin'); break;
      // Add more as needed
    }

    // Duration classes
    if (animationDuration === '500ms') classes.push('animate-duration-500');
    else if (animationDuration === '1000ms') classes.push('animate-duration-1000');
    else if (animationDuration === '2000ms') classes.push('animate-duration-[2000ms]');

    // Repeat classes
    if (animationRepeat === 'infinite') classes.push('animate-infinite');
    else classes.push('animate-once');

    // Hover pause
    if (animationHoverPause) classes.push('hover:animate-none');

    return classes.join(' ');
  };

  // Function to get HTML with animation classes added
const getHTMLWithAnimations = () => {
  if (!editor) return '';

  let html = editor.getHTML();
  const doc = editor.state.doc;
  const animatedImages: Array<{src: string, classes: string}> = [];

  doc.descendants((node) => {
    if (node.type.name === 'customImage' && node.attrs && node.attrs.animationType) {
      const classes = getAnimationClasses(node.attrs);
      if (classes && node.attrs.src) {
        animatedImages.push({ src: node.attrs.src, classes });
      }
    }
  });

  animatedImages.forEach(({ src, classes }) => {
    const esc = src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const imgTagRegex = new RegExp(`<img\\b([^>]*?)\\bsrc=(["'])${esc}\\2([^>]*?)>`, 'g');

    html = html.replace(imgTagRegex, (match) => {
      // had class attr -> append
      if (/(\s|^)class\s*=/.test(match)) {
        return match.replace(/class=(["'])(.*?)\1/, (_m, q, existing) => {
          // tránh duplicate space
          const merged = `${existing} ${classes}`.trim();
          return `class=${q}${merged}${q}`;
        });
      } else {
        // no class -> <img
        return match.replace(/^<img/, `<img class="${classes}"`);
      }
    });
  });

  return html;
};



  const addImage = useCallback((url: string, mode: "inline-block" | "block") => {
    console.log("mode: ",mode);
    if (url && editor) {
      editor.chain().focus().insertContent({
        type: "customImage",
        attrs:{
        src: url,
        display: mode,
        width:"300px",
        height:"auto",
        margin: "0 5px",
        }}
      ).run();
      setShowImageDialog(false);
    }
  }, [editor]);

  const addVideo = useCallback((url: string) => {
    if (url && editor) {
      editor.commands.setYoutubeVideo({ src: url, width: 640, height: 480 });
      setShowVideoDialog(false);
    }
  }, [editor]);

  const setLink = useCallback((url: string) => {
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
    setShowLinkDialog(false);
  }, [editor]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addButton = useCallback((buttonConfig: any) => {
  if (editor) {
    editor.commands.insertButton(buttonConfig);
    setShowButtonDialog(false);
  }
}, [editor]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addDropdown = useCallback((dropdownConfig: any) => {
  if (editor) {
    editor.commands.insertDropdown(dropdownConfig);
    setShowDropdownDialog(false)
    console.log(showDropdownDialog);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [editor])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addAnimation = useCallback((animationConfig: any) => {
    if (editor) {
      if (editor.state.selection.empty) {
        alert("Vui lòng chọn object trước khi thêm animation!");
        return;
      }
      editor.commands.setAnimation(animationConfig);
      setShowAnimationDialog(false);
    }
  }, [editor]);

const removeAnimation = useCallback(() => {
  if (editor) {
    const { state } = editor;
    const { selection } = state;

    let found = false;

    state.doc.nodesBetween(selection.from, selection.to, (node) => {
      if (node.type.name !== "text") {
        editor.commands.updateAttributes(node.type.name, {
          animationType: null,
          animationDuration: null,
          animationDelay: null,
          animationRepeat: null,
          animationEase: null,
          animationHoverPause: null,
        });
        found = true;
      }
    });

    // Nếu chưa tìm thấy node nào (ví dụ cursor đứng trong image)
    if (!found) {
      const node = state.doc.nodeAt(selection.from);
      if (node && node.type.name !== "text") {
        editor.commands.updateAttributes(node.type.name, {
          animationType: null,
          animationDuration: null,
          animationDelay: null,
          animationRepeat: null,
          animationEase: null,
          animationHoverPause: null,
        });
      }
    }

    setShowAnimationDialog(false);
  }
}, [editor]);



const getCurrentAnimation = () => {
    if (!editor) return null;

    const { selection } = editor.state;
    const { from, to } = selection;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentNode: any = null;
    editor.state.doc.nodesBetween(from, to, (node) => {
      if (node.type.name !== "text" && !currentNode) {
        currentNode = node;
        return false;
      }
    });

    if (!currentNode || !currentNode.attrs.animationType) {
      return null;
    }

    const attrs = currentNode.attrs;
    return {
      type: attrs.animationType,
      duration: attrs.animationDuration || '1000ms',
      delay: attrs.animationDelay || '0ms',
      repeat: attrs.animationRepeat || 'once',
      ease: attrs.animationEase || 'ease-in',
      hoverPause: attrs.animationHoverPause || false
    };
  };




  if (!editor) return null;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="border rounded-lg shadow-lg bg-white">
        <Toolbar
          editor={editor}
          setShowImageDialog={setShowImageDialog}
          setShowVideoDialog={setShowVideoDialog}
          setShowLinkDialog={setShowLinkDialog}
          setShowButtonDialog={setShowButtonDialog}
          setShowDropdownDialog={setShowDropdownDialog}
          setShowAnimationDialog={setShowAnimationDialog}
        />
        <div className="min-h-[700px] overflow-y-visible">
          <EditorContent value={value} editor={editor} />
          {/* <TextBubbleMenu editor={editor} /> */}
        </div>
      </div>

      {/* Dialogs */}
      {showImageDialog && <ImageDialog onConfirm={addImage} onCancel={() => setShowImageDialog(false)} />}
      {showVideoDialog && <VideoDialog onConfirm={addVideo} onCancel={() => setShowVideoDialog(false)} />}
      {showLinkDialog && (
        <LinkDialog
          onConfirm={setLink}
          onCancel={() => setShowLinkDialog(false)}
          currentUrl={editor.getAttributes('link').href || ''}
        />
      )}
      {showButtonDialog && (
        <ButtonDialog
        onConfirm={(buttonConfig) => {
          addButton(buttonConfig);
        // console.log("Button config:", buttonConfig)
        }}
        onCancel={() => setShowButtonDialog(false)}
        />
        )}

      {showDropdownDialog && (
        <DropdownDialog
        onConfirm={addDropdown}
        onCancel={() => setShowDropdownDialog(false)}
        />
        )}

        {showAnimationDialog && <AnimationDialog
        onConfirm={addAnimation}
      onRemove={removeAnimation}
      onCancel={()=>setShowAnimationDialog(false)}
      currentAnimation={getCurrentAnimation()}

      />}
    </div>
  );
};

export default RichTextEditor;
