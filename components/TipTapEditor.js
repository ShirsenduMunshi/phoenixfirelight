"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import { Button } from "@/components/ui/button";

const TipTapEditor = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Link],
    content: content || "<p>Start writing...</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML()); // Save content as HTML
    },
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="border p-4 rounded-lg">
      <div className="mb-2">
        <Button onClick={() => editor.chain().focus().toggleBold().run()} className="mr-2">
          Bold
        </Button>
        <Button onClick={() => editor.chain().focus().toggleItalic().run()} className="mr-2">
          Italic
        </Button>
        <Button
          onClick={() => {
            const url = prompt("Enter the link URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          Add Link
        </Button>
      </div>
      <EditorContent editor={editor} className="border rounded-md p-2 min-h-[200px]" />
    </div>
  );
};

export default TipTapEditor;