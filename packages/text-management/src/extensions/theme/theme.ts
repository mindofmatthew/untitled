import { EditorView } from "@codemirror/view";
import { Extension } from "@codemirror/state";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors

const haze = "#00000050",
  chalky = "#e5c07b",
  coral = "#e06c75",
  cyan = "#56b6c2",
  invalid = "#ffffff",
  ivory = "#abb2bf",
  stone = "#7d8799", // Brightened compared to original to increase contrast
  malibu = "#61afef",
  sage = "#98c379",
  whiskey = "#d19a66",
  violet = "#c678dd",
  darkBackground = "#21252b",
  highlightBackground = "#2c313a",
  background = "#282c34",
  selection = "#3E4451",
  cursor = "white";

const size = 12;

export const base = EditorView.theme({
  "&": {
    fontFamily: "Fira Code, monospace",
    width: "100%",
    height: "100%",
  },

  ".cm-line": {
    width: "fit-content",
  },

  ".cm-toolbar": {
    textAlign: "right",
  },
});

export const layoutTheme = EditorView.theme({
  "&": {
    fontSize: `${1.6363 * size}px`,
    lineHeight: `${2.5 * size}px`,
  },

  ".cm-scroller": {
    margin: `${1.5 * size}px`,
  },

  ".cm-scroller:not(:last-child)": {
    marginBottom: "0",
  },

  ".cm-line": {
    padding: `0 ${0.5 * size}px`,
  },

  ".cm-emptyLine:not(.cm-activeLine)": {
    padding: "0",
  },

  ".cm-gutters": {
    marginRight: `${size}px`,
  },

  ".cm-lineNumbers .cm-gutterElement": {
    padding: `0 ${0.5 * size}px`,
  },

  ".cm-panels": {
    fontSize: `${1.2727 * size}px`,
    lineHeight: `${2 * size}px`,
  },

  ".cm-console": {
    margin: `${size}px ${1.5 * size}px 0 ${1.5 * size}px`,
    maxHeight: `${20 * size}px`,
  },

  ".cm-console-message": {
    padding: `calc(${0.5 * size}px - 2px) ${0.5 * size}px`,
    margin: "0",
  },

  ".cm-console-message-source": {
    marginLeft: `${size}px`,
  },

  ".cm-toolbar": {
    marginTop: `${1.5 * size}px`,
    padding: `${0.25 * size}px ${2 * size}px`,
  },

  "*::-webkit-scrollbar": {
    width: `${size}px`,
  },
});

/// The editor theme styles for One Dark.
export const oneDarkTheme = EditorView.theme(
  {
    "&": {
      color: "#fff",
      "& ::selection": { backgroundColor: selection },
      caretColor: cursor,
      fontFamily: "Fira Code, monospace",
    },

    ".cm-content": { padding: 0 },

    "&.cm-editor.cm-focused": { outline: "none" },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: cursor,
      borderLeftWidth: "2px",
      marginLeft: "-1px",
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
      backgroundColor: selection,
    },

    "& .cm-scroller": {
      fontFamily: "Fira Code, monospace",
      lineHeight: "inherit",
    },

    ".cm-line": {
      backgroundColor: haze,
    },

    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f",
    },

    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },

    ".cm-matchingBracket, .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847",
      outline: "1px solid #515a6b",
    },

    ".cm-gutters": {
      backgroundColor: haze,
      color: "white",
      border: "none",
    },

    ".cm-lineNumbers .cm-gutterElement": {
      color: "inherit",
    },

    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd",
    },

    ".cm-tooltip": {
      border: "1px solid #181a1f",
      backgroundColor: darkBackground,
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: highlightBackground,
        color: ivory,
      },
    },

    ".cm-panels": {
      backgroundColor: "transparent",
    },

    ".cm-console": {
      overflowY: "auto",
    },

    ".cm-console-message": {
      display: "flex",
      flexDirection: "row-reverse",
    },
    ".cm-console-message:not(:first-child)": {
      clipPath: "inset(1px 0 0 0)",
    },
    ".cm-console-message:not(:last-child)": {
      clipPath: "inset(0 0 1px 0)",
    },
    ".cm-console-message:not(:first-child):not(:last-child)": {
      clipPath: "inset(1px 0)",
    },

    ".cm-console-message-content": {
      flex: 1,
      overflowWrap: "anywhere",
    },

    ".cm-console-message-info": {
      backgroundColor: haze,
    },
    ".cm-console-message-info .cm-console-message-source": {
      color: "#FFFFFFAA",
    },

    ".cm-console-message-warn, .cm-console-message-error": {
      backgroundImage:
        "repeating-linear-gradient(135deg, #6c000050 0px 10px, #a6020250 10px 20px)",
    },
    ".cm-console-message-warn .cm-console-message-source, .cm-console-message-error .cm-console-message-source":
      {
        color: coral,
      },
    ".cm-toolbar": {
      background: haze,
    },

    "*::-webkit-scrollbar-track-piece": {
      backgroundColor: haze,
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: haze,
    },
    "*::-webkit-scrollbar-corner": {
      backgroundColor: "transparent",
    },
  },
  { dark: true }
);

/// The highlighting style for code in the One Dark theme.
export const oneDarkHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: violet },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: coral,
  },
  { tag: [t.function(t.variableName), t.labelName], color: malibu },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: whiskey },
  { tag: [t.definition(t.name), t.separator], color: ivory },
  {
    tag: [
      t.typeName,
      t.className,
      t.number,
      t.changed,
      t.annotation,
      t.modifier,
      t.self,
      t.namespace,
    ],
    color: chalky,
  },
  {
    tag: [
      t.operator,
      t.operatorKeyword,
      t.url,
      t.escape,
      t.regexp,
      t.link,
      t.special(t.string),
    ],
    color: cyan,
  },
  { tag: [t.meta, t.comment], color: stone },
  { tag: t.strong, fontWeight: "bold" },
  { tag: t.emphasis, fontStyle: "italic" },
  { tag: t.link, color: stone, textDecoration: "underline" },
  { tag: t.heading, fontWeight: "bold", color: coral },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: whiskey },
  { tag: [t.processingInstruction, t.string, t.inserted], color: sage },
  { tag: t.invalid, color: invalid },
]);

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const oneDark: Extension = [
  base,
  layoutTheme,
  oneDarkTheme,
  syntaxHighlighting(oneDarkHighlightStyle),
];
