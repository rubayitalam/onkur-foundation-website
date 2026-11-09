"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { Extension } from "@tiptap/core";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Indent as IndentIcon,
  Outdent as OutdentIcon,
  Link2,
  Unlink,
  RemoveFormatting,
  Palette,
} from "lucide-react";
import { toEditorHtml } from "@/lib/blogUtils";

// Custom FontSize Extension on top of TextStyle
export const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize?.replace(/['"]+/g, "") || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: any) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }: any) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    } as any;
  },
});

// Custom Indent Extension for paragraphs and headings
export const Indent = Extension.create({
  name: "indent",
  addOptions() {
    return {
      types: ["paragraph", "heading", "blockquote"],
      minLevel: 0,
      maxLevel: 6,
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const left = element.style.marginLeft || element.style.paddingLeft;
              return left ? Math.round(parseInt(left, 10) / 24) : 0;
            },
            renderHTML: (attributes) => {
              if (!attributes.indent) return {};
              return { style: `margin-left: ${attributes.indent * 24}px` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      indent:
        () =>
        ({ tr, state, dispatch }: any) => {
          const { selection } = state;
          const { from, to } = selection;
          let changed = false;
          state.doc.nodesBetween(from, to, (node: any, pos: number) => {
            if (this.options.types.includes(node.type.name)) {
              const current = node.attrs.indent || 0;
              if (current < this.options.maxLevel) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  indent: current + 1,
                });
                changed = true;
              }
            }
          });
          if (changed && dispatch) dispatch(tr);
          return changed;
        },
      outdent:
        () =>
        ({ tr, state, dispatch }: any) => {
          const { selection } = state;
          const { from, to } = selection;
          let changed = false;
          state.doc.nodesBetween(from, to, (node: any, pos: number) => {
            if (this.options.types.includes(node.type.name)) {
              const current = node.attrs.indent || 0;
              if (current > this.options.minLevel) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  indent: current - 1,
                });
                changed = true;
              }
            }
          });
          if (changed && dispatch) dispatch(tr);
          return changed;
        },
    } as any;
  },
});

const FONT_FAMILIES = [
  { label: "Default Font", value: "" },
  { label: "Hind Siliguri (বাংলা)", value: "'Hind Siliguri', sans-serif" },
  { label: "Noto Sans Bengali (বাংলা)", value: "'Noto Sans Bengali', sans-serif" },
  { label: "Noto Serif Bengali (বাংলা)", value: "'Noto Serif Bengali', serif" },
  { label: "Inter (English)", value: "'Inter', sans-serif" },
  { label: "Merriweather (Serif)", value: "'Merriweather', Georgia, serif" },
];

const FONT_SIZES = [
  { label: "Size", value: "" },
  { label: "14px", value: "14px" },
  { label: "16px", value: "16px" },
  { label: "18px", value: "18px" },
  { label: "20px", value: "20px" },
  { label: "24px", value: "24px" },
  { label: "28px", value: "28px" },
  { label: "32px", value: "32px" },
];

const COLOR_SWATCHES = [
  { name: "Dark Charcoal", hex: "#1F2937" },
  { name: "Primary Green", hex: "#008641" },
  { name: "Dark Teal", hex: "#003C40" },
  { name: "Gold Accent", hex: "#C9973B" },
  { name: "Crimson Red", hex: "#DC2626" },
  { name: "Royal Blue", hex: "#2563EB" },
  { name: "Muted Gray", hex: "#6B7280" },
];

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write content here...",
  minHeight = "260px",
}: RichTextEditorProps) {
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // Close color picker on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(e.target as Node)
      ) {
        setColorMenuOpen(false);
      }
    };
    if (colorMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [colorMenuOpen]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      TextStyle,
      Color,
      FontFamily,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "text-primary underline hover:opacity-80 transition-opacity",
        },
      }),
      FontSize,
      Indent,
    ],
    content: toEditorHtml(value || ""),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html === "<p></p>" ? "" : html);
    },
    editorProps: {
      attributes: {
        class:
          "rich-content focus:outline-none p-4 text-xs sm:text-sm text-secondary min-h-full",
      },
    },
  });

  // Keep editor synchronized when activeBlog / value changes externally
  useEffect(() => {
    if (!editor) return;
    const currentHtml = editor.getHTML();
    const formattedVal = toEditorHtml(value || "");
    if (formattedVal !== currentHtml && (value || "") !== currentHtml) {
      editor.commands.setContent(formattedVal, { emitUpdate: false });
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL (লিংক দিন):", previousUrl || "https://");

    if (url === null) {
      return;
    }

    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim() })
      .run();
  }, [editor]);

  if (!editor) {
    return (
      <div
        className="w-full bg-gray-50 border border-gray-200 rounded-xl animate-pulse flex items-center justify-center text-xs text-gray-400"
        style={{ minHeight }}
      >
        Loading Editor...
      </div>
    );
  }

  // Active states
  const currentFontFamily =
    editor.getAttributes("textStyle").fontFamily || "";
  const currentFontSize =
    editor.getAttributes("textStyle").fontSize || "";
  const currentColor =
    editor.getAttributes("textStyle").color || "#1F2937";

  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all flex flex-col">
      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-xs border-b border-gray-200 p-2 flex flex-wrap items-center gap-1.5 text-xs text-secondary">
        {/* Font Family Dropdown */}
        <div className="relative">
          <select
            value={currentFontFamily}
            onChange={(e) => {
              const font = e.target.value;
              if (font) {
                editor.chain().focus().setFontFamily(font).run();
              } else {
                (editor.chain().focus() as any).unsetFontFamily().run();
              }
            }}
            className="h-8 px-2.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-secondary hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer"
            title="Font Family"
          >
            {FONT_FAMILIES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size Dropdown */}
        <div className="relative">
          <select
            value={currentFontSize}
            onChange={(e) => {
              const size = e.target.value;
              if (size) {
                (editor.chain().focus() as any).setFontSize(size);
              } else {
                (editor.chain().focus() as any).unsetFontSize();
              }
            }}
            className="h-8 px-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-secondary hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer"
            title="Font Size"
          >
            {FONT_SIZES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="h-5 w-px bg-gray-200 mx-0.5" />

        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            editor.isActive("bold")
              ? "bg-primary text-white shadow-xs font-bold"
              : "text-gray-700 hover:bg-gray-200/70"
          }`}
          title="Bold (Ctrl+B)"
        >
          <BoldIcon className="w-3.5 h-3.5" />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            editor.isActive("italic")
              ? "bg-primary text-white shadow-xs"
              : "text-gray-700 hover:bg-gray-200/70"
          }`}
          title="Italic (Ctrl+I)"
        >
          <ItalicIcon className="w-3.5 h-3.5" />
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            editor.isActive("underline")
              ? "bg-primary text-white shadow-xs"
              : "text-gray-700 hover:bg-gray-200/70"
          }`}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon className="w-3.5 h-3.5" />
        </button>

        {/* Color Picker Menu */}
        <div className="relative" ref={colorPickerRef}>
          <button
            type="button"
            onClick={() => setColorMenuOpen((prev) => !prev)}
            className="h-8 px-2 rounded-lg flex items-center gap-1.5 text-gray-700 hover:bg-gray-200/70 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
            title="Text Color"
          >
            <Palette className="w-3.5 h-3.5 text-gray-600" />
            <span
              className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-2xs"
              style={{ backgroundColor: currentColor }}
            />
          </button>

          {colorMenuOpen && (
            <div className="absolute top-full left-0 mt-1 p-2.5 bg-white border border-gray-200 rounded-xl shadow-lg z-30 w-52 space-y-2">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                Theme Colors
              </p>
              <div className="grid grid-cols-7 gap-1.5">
                {COLOR_SWATCHES.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => {
                      editor.chain().focus().setColor(c.hex).run();
                      setColorMenuOpen(false);
                    }}
                    className="w-6 h-6 rounded-md border border-gray-200 hover:scale-110 transition-transform shadow-2xs cursor-pointer"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
              <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                <label className="text-[11px] text-gray-600 font-medium">Custom:</label>
                <input
                  type="color"
                  value={currentColor}
                  onChange={(e) => {
                    editor.chain().focus().setColor(e.target.value).run();
                  }}
                  className="w-7 h-7 p-0 border border-gray-200 rounded cursor-pointer bg-transparent"
                  title="Choose Custom Color"
                />
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().unsetColor().run();
                    setColorMenuOpen(false);
                  }}
                  className="ml-auto text-[10px] text-gray-500 hover:text-red-500 underline cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-5 w-px bg-gray-200 mx-0.5" />

        {/* Text Alignments */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            editor.isActive({ textAlign: "left" })
              ? "bg-primary text-white shadow-xs"
              : "text-gray-700 hover:bg-gray-200/70"
          }`}
          title="Align Left"
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            editor.isActive({ textAlign: "center" })
              ? "bg-primary text-white shadow-xs"
              : "text-gray-700 hover:bg-gray-200/70"
          }`}
          title="Align Center"
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            editor.isActive({ textAlign: "right" })
              ? "bg-primary text-white shadow-xs"
              : "text-gray-700 hover:bg-gray-200/70"
          }`}
          title="Align Right"
        >
          <AlignRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            editor.isActive({ textAlign: "justify" })
              ? "bg-primary text-white shadow-xs"
              : "text-gray-700 hover:bg-gray-200/70"
          }`}
          title="Justify"
        >
          <AlignJustify className="w-3.5 h-3.5" />
        </button>

        <div className="h-5 w-px bg-gray-200 mx-0.5" />

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            editor.isActive("bulletList")
              ? "bg-primary text-white shadow-xs"
              : "text-gray-700 hover:bg-gray-200/70"
          }`}
          title="Bullet List"
        >
          <List className="w-3.5 h-3.5" />
        </button>

        {/* Numbered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            editor.isActive("orderedList")
              ? "bg-primary text-white shadow-xs"
              : "text-gray-700 hover:bg-gray-200/70"
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        {/* Outdent */}
        <button
          type="button"
          onClick={() => (editor.chain().focus() as any).outdent().run()}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200/70 transition-colors cursor-pointer"
          title="Decrease Indent"
        >
          <OutdentIcon className="w-3.5 h-3.5" />
        </button>

        {/* Indent */}
        <button
          type="button"
          onClick={() => (editor.chain().focus() as any).indent().run()}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200/70 transition-colors cursor-pointer"
          title="Increase Indent"
        >
          <IndentIcon className="w-3.5 h-3.5" />
        </button>

        <div className="h-5 w-px bg-gray-200 mx-0.5" />

        {/* Link */}
        <button
          type="button"
          onClick={setLink}
          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            editor.isActive("link")
              ? "bg-primary text-white shadow-xs"
              : "text-gray-700 hover:bg-gray-200/70"
          }`}
          title="Insert / Edit Link"
        >
          <Link2 className="w-3.5 h-3.5" />
        </button>

        {editor.isActive("link") && (
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            title="Remove Link"
          >
            <Unlink className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Clear Formatting */}
        <button
          type="button"
          onClick={() => {
            (editor.chain().focus() as any)
              .clearNodes()
              .unsetAllMarks()
              .unsetFontFamily()
              .unsetFontSize()
              .unsetColor()
              .setTextAlign("left")
              .run();
          }}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-gray-200/70 transition-colors cursor-pointer ml-auto"
          title="Clear Formatting (ফরম্যাটিং মুছুন)"
        >
          <RemoveFormatting className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Editor Content Area */}
      <div
        className="w-full overflow-y-auto max-h-[520px] bg-white cursor-text"
        style={{ minHeight }}
        onClick={() => {
          if (!editor.isFocused) {
            editor.commands.focus();
          }
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
