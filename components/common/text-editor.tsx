"use client";

import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Youtube from "@tiptap/extension-youtube";
import { TextEditorButtons } from "./text-editor-buttons";

export default function TextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          " prose-sm min-h-[150px] max-h-[450px] w-full rounded-md  bg-transparent  py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      Youtube.configure({
        allowFullscreen: false,
      }),
      Underline,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <EditorContent editor={editor} className="prose-sm" />
      {editor ? <TextEditorButtons editor={editor} /> : null}
    </div>
  );
}
