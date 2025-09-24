// custom-animation.tsx
import { Extension } from "@tiptap/core";
import { getAnimationClasses } from "../../animation-utils";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customAnimation: {
      setAnimation: (options: {
        type: string;
        duration?: string;
        delay?: string;
        repeat?: "once" | "infinite";
        ease?: string;
        hoverPause?: boolean;
      }) => ReturnType;
      removeAnimation: () => ReturnType;
      unsetAnimation: () => ReturnType; // alias
      openAnimationDialog: () => ReturnType;
    };
  }
}

const CustomAnimation = Extension.create({
  name: "customAnimation",

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading", "customButton", "bulletList", "orderedList", "customImage", "customDropdown"],
        attributes: {
          animationType: {
            default: null,
            parseHTML: element => (element as HTMLElement).getAttribute("data-animation-type"),
            renderHTML: attributes => {
              if (!attributes.animationType) return {};
              return { "data-animation-type": attributes.animationType,  class: getAnimationClasses(attributes) };
            },
          },
          animationDuration: {
            default: "1000ms",
            parseHTML: element => (element as HTMLElement).getAttribute("data-animation-duration"),
            renderHTML: attributes => {
              if (!attributes.animationType) return {};
              return { "data-animation-duration": attributes.animationDuration,  class: getAnimationClasses(attributes) };
            },
          },
          animationDelay: {
            default: "0ms",
            parseHTML: element => (element as HTMLElement).getAttribute("data-animation-delay"),
            renderHTML: attributes => {
              if (!attributes.animationType) return {};
              return { "data-animation-delay": attributes.animationDelay,  class: getAnimationClasses(attributes) };
            },
          },
          animationRepeat: {
            default: "once",
            parseHTML: element => (element as HTMLElement).getAttribute("data-animation-repeat"),
            renderHTML: attributes => {
              if (!attributes.animationType) return {};
              return { "data-animation-repeat": attributes.animationRepeat,  class: getAnimationClasses(attributes) };
            },
          },
          animationEase: {
            default: "ease-in",
            parseHTML: element => (element as HTMLElement).getAttribute("data-animation-ease"),
            renderHTML: attributes => {
              if (!attributes.animationType) return {};
              return { "data-animation-ease": attributes.animationEase,  class: getAnimationClasses(attributes) };
            },
          },
          animationHoverPause: {
            default: false,
            parseHTML: element => (element as HTMLElement).getAttribute("data-animation-hover-pause") === "true",
            renderHTML: attributes => {
              if (!attributes.animationType) return {};
              return { "data-animation-hover-pause": attributes.animationHoverPause.toString(),  class: getAnimationClasses(attributes) };
            },
          },
        },
      },
    ];
  },

  

  onBeforeCreate() {
    const { editor } = this;
    const overrideFor = ["paragraph", "heading", "bulletList", "orderedList"];

    overrideFor.forEach((typeName) => {
      const nodeType = editor.schema.nodes[typeName];
      if (!nodeType) return;

      const originalSpec = nodeType.spec;
      const originalToDOM = originalSpec.toDOM;

      if (originalToDOM) {
        // nodeType.spec = {
        //   ...originalSpec,
        //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //   toDOM(node: any) {
        //     const result = (typeof originalToDOM === "function") ? originalToDOM(node) : originalToDOM;
        //     const animationClasses = getAnimationClasses(node.attrs);

        //     if (animationClasses && Array.isArray(result) && result.length > 1 && typeof result[1] === "object") {
        //       result[1] = {
        //         ...result[1],
        //         class: `${result[1].class || ""} ${animationClasses}`.trim(),
        //       };
        //     }

        //     return result;
        //   },
        // };
      }
    });
  },

  addCommands() {
    return {
      setAnimation:
        (options) =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          const { from, to } = selection;

          if (dispatch) {
            tr.setSelection(selection);

            state.doc.nodesBetween(from, to, (node, pos) => {
              if (node.type.name === "text") return;

              const attrs = {
                ...node.attrs,
                animationType: options.type,
                animationDuration: options.duration || "1000ms",
                animationDelay: options.delay || "0ms",
                animationRepeat: options.repeat || "once",
                animationEase: options.ease || "ease-in",
                animationHoverPause: !!options.hoverPause,
              };

              tr.setNodeMarkup(pos, undefined, attrs);
            });

            dispatch(tr);
          }

          return true;
        },

        removeAnimation:
  () =>
  ({ tr, state, dispatch }) => {
    const { selection } = state;
    const { from, to } = selection;

    if (dispatch) {
      tr.setSelection(selection);

      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === "text") return;

        const attrs = {
          ...node.attrs,
          animationType: null,
          animationDuration: "1000ms", // default
          animationDelay: "0ms",       // default
          animationRepeat: "once",     // default
          animationEase: "ease-in",    // default
          animationHoverPause: false,  // default
        };

        tr.setNodeMarkup(pos, undefined, attrs);
      });

      dispatch(tr);
    }

    return true;
  },

unsetAnimation:
  () =>
  ({ tr, state, dispatch }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this as any).removeAnimation()({ tr, state, dispatch });
  },

      openAnimationDialog: () => () => {
        const event = new CustomEvent("open-animation-dialog");
        window.dispatchEvent(event);
        return true;
      },
    };
  },
});

export default CustomAnimation;
