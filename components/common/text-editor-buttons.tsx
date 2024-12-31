import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Paperclip,
  Strikethrough,
  UnderlineIcon,
  YoutubeIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Editor } from "@tiptap/react";
import FileUpload from "./file-upload";
export const TextEditorButtons = ({ editor }: { editor: Editor }) => {
  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubePopoverOpen, setYoutubePopoverOpen] = useState(false);

  const handleYoutubeSubmit = () => {
    if (youtubeUrl !== "") {
      editor.commands.setYoutubeVideo({ src: youtubeUrl });
      setYoutubePopoverOpen(false);
      return;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 bg-transparent p-1">
      <Toggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-8 w-8" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-8 w-[1px]" />
      <Toggle
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-8 w-[1px]" />

      {/* File Upload */}
      <Dialog open={fileUploadOpen} onOpenChange={setFileUploadOpen}>
        <DialogTrigger asChild>
          <Toggle>
            <Paperclip className="h-4 w-4" />
          </Toggle>
        </DialogTrigger>
        <DialogContent className="flex w-[80vw] flex-col gap-4 rounded-lg lg:w-full">
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
            <DialogDescription>
              Add a Youtube video link to your post.
            </DialogDescription>
          </DialogHeader>
          <FileUpload onClose={() => setFileUploadOpen(false)} />
        </DialogContent>
      </Dialog>
      <Dialog open={youtubePopoverOpen} onOpenChange={setYoutubePopoverOpen}>
        <DialogTrigger asChild>
          <Toggle>
            <YoutubeIcon className="h-4 w-4" />
          </Toggle>
        </DialogTrigger>
        <DialogContent className="flex w-[80vw] flex-col gap-4 rounded-lg lg:w-full">
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
            <DialogDescription>
              Add a Youtube video link to your post.
            </DialogDescription>
          </DialogHeader>
          <Input
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className=""
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setYoutubePopoverOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleYoutubeSubmit}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
