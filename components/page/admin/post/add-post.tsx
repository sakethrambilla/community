"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { TextEditorButtons } from "@/components/common/text-editor-buttons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetPostCategoryQuery } from "@/redux/features/shared/post-category/api";
import { useCreatePostMutation } from "@/redux/features/shared/post/api";
import { createPostSchema, CreatePostSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useForm } from "react-hook-form";

export default function AddPost() {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const { data: postCategory } = useGetPostCategoryQuery();
  const [createPost, { isSuccess }] = useCreatePostMutation();
  console.log("Open", open);

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      userId: session?.user?.id || "",
    },
  });

  async function onSubmit(data: CreatePostSchema) {
    try {
      console.log("On Submit", data);
      const res = await createPost(data).unwrap();
      if (isSuccess) {
        console.log("Post Created Successfully");
        setOpen(false);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          " prose-sm px-4 min-h-[150px] max-h-[450px] w-full rounded-md  bg-transparent  py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    extensions: [
      Placeholder.configure({
        placeholder: "Content",
        emptyEditorClass:
          "cursor-text  before:content-[attr(data-placeholder)] before:text-mds before:absolute before:top-2 before:left-4 before:text-mauve-11 before:opacity-50 before-pointer-events-none",
      }),
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
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-700 dark:text-blue-300 underline",
        },
      }),
      Underline,
    ],
    content: "",

    onUpdate: ({ editor }) => {
      form.setValue("content", editor.getHTML());
    },
  });

  useEffect(() => {
    if (session?.user?.id) {
      form.setValue("userId", session?.user?.id);
    }
  }, [session, form]);

  // console.log("Post Form Category", form.watch("categoryId"));
  // console.log("Post Form User ID", form.watch("userId"));
  // console.log("Post Form Errors", form.formState.errors);

  if (!editor) return null;
  return (
    <Dialog>
      <DialogTrigger className="h-24 w-56 rounded-xl bg-secondary px-4 py-2 text-secondary-foreground xl:text-xl">
        Add Post
      </DialogTrigger>
      <DialogContent className="w-full max-w-[50vw]">
        <DialogHeader>
          <DialogTitle>Add new Post</DialogTitle>
          <DialogDescription>
            Create new post with title and content
          </DialogDescription>
        </DialogHeader>

        {/* Add Post Form */}
        <div className="flex w-full flex-col items-start gap-2">
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="flex items-center justify-start">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Title"
                          className="w-full rounded-none border-none bg-transparent text-lg shadow-none focus-visible:ring-0 lg:text-lg xl:text-xl"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="content"
                  render={() => (
                    <FormItem className="w-full">
                      <FormControl>
                        <EditorContent
                          editor={editor}
                          className="prose-sm"
                          placeholder="Write Something"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <TextEditorButtons editor={editor} />
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem className="flex w-fit items-center gap-4">
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-fit gap-4 px-4">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent className="">
                            {postCategory?.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button type="submit">{"Add Post"}</Button>
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    {"Cancel"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
