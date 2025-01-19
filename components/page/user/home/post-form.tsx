"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { TextEditorButtons } from "@/components/common/text-editor-buttons";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
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

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export default function PostForm() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { data: postCategory } = useGetPostCategoryQuery();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      body: "",
      userId: session?.user?.id || "",
    },
  });

  async function onSubmit(data: CreatePostSchema) {
    console.log("On Submit", data);
    await createPost(data)
      .unwrap()
      .then(() => {
        toast({
          title: "Success",
          description: "The post has been created successfully",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.data.message,
          variant: "destructive",
        });
      });
    form.reset();
    editor?.commands.setContent("");
    setOpen(false);
  }

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          " prose-sm min-h-[150px] max-h-[450px] w-full rounded-md  bg-transparent px-4  py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
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
      form.setValue("body", editor.getHTML());
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
    <div
      className={cn(
        "flex h-fit w-full justify-start gap-4 rounded-lg border px-4 py-2 lg:rounded-xl lg:px-6 lg:py-4",
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
                  <div className="flex h-full w-full items-center justify-start lg:text-xl">
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
                        <FormControl>
                          <Input
                            placeholder="Title"
                            className="w-full rounded-none border border-x-0 border-b-[1px] border-t-0 bg-transparent text-lg shadow-none focus-visible:ring-0 lg:text-lg xl:text-xl"
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
                    name="body"
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
                      <FormItem className="flex w-fit flex-wrap items-center gap-4">
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-fit gap-4 px-4">
                            <SelectValue
                              className="text-sm lg:text-base"
                              placeholder="Select Category"
                            />
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
                  {isLoading ? (
                    <Button type="button" disabled>
                      <Loader2 className="size-4 animate-spin" />
                    </Button>
                  ) : (
                    <Button type="submit">{"Add Post"}</Button>
                  )}
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
