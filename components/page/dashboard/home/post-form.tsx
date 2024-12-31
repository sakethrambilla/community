"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCreatePostMutation } from "@/redux/post/api";
import { createPostSchema } from "@/schema";
import { CreatePostSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGetPostCategoryQuery } from "@/redux/post-category/apit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import { TextEditorButtons } from "@/components/common/text-editor-buttons";

export default function AddPost() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { data: postCategory } = useGetPostCategoryQuery();
  const [createPost] = useCreatePostMutation();

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
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

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
  }, [session]);

  // console.log("Post Form Category", form.watch("categoryId"));
  // console.log("Post Form Content", form.watch("content"));
  console.log("Post Form Errors", form.formState.errors);

  if (!editor) return null;
  return (
    <div
      className={cn(
        "flex h-fit w-full justify-start gap-4 rounded-lg border px-4 py-2 md:max-w-[80vw] lg:rounded-2xl lg:px-8 lg:py-6",
        open ? "items-start" : "items-center",
      )}
    >
      {/* Profile Photo */}
      <Avatar
        className={cn(
          "size-8 rounded-full lg:block lg:size-12",
          open ? "hidden md:block" : "block",
        )}
      >
        <AvatarImage
          src={session?.user?.image || "https://github.com/shadcn.png"}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {/* Add Post Form */}
      <div className="flex w-full flex-col items-start gap-2">
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <Collapsible open={open} onOpenChange={setOpen} className="w-full">
              {!open && (
                <CollapsibleTrigger className="flex w-full flex-col items-start justify-start gap-2">
                  <div className="flex h-full w-full items-center justify-start lg:text-2xl">
                    {"Write Something"}
                  </div>
                </CollapsibleTrigger>
              )}
              <CollapsibleContent className="flex w-full flex-col gap-4">
                <div className="flex items-center justify-start">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Write Something"
                            className="w-full border-none bg-transparent text-lg focus-visible:ring-0 lg:text-2xl"
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
                        <FormLabel className="lg:text-lg">
                          {"Content"}
                        </FormLabel>
                        <FormControl>
                          <EditorContent editor={editor} className="prose-sm" />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
            {open && (
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
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
