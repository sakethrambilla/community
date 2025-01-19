"use client";
import CommentForm from "@/components/page/shared/post/comment-form";
import CommentList from "@/components/page/shared/post/comment-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetLikeQuery,
} from "@/redux/features/shared/like/api";
import { selectPostView } from "@/redux/features/user/post-toggle/slice";
import { Post } from "@/types/user/post";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

interface PostCardProps {
  post: Post | undefined;
}

export default function PostCard({ post }: PostCardProps) {
  const { data: session } = useSession();
  const postView = useSelector(selectPostView);
  const { data: likeData, isLoading: isLikeLoading } = useGetLikeQuery({
    postId: post?.id || "",
    userId: session?.user.id || "",
  });
  const [createLike, { isLoading: isCreateLikeLoading }] =
    useCreateLikeMutation();
  const [deleteLike, { isLoading: isDeleteLikeLoading }] =
    useDeleteLikeMutation();

  const editor = useEditor({
    editable: false,
    editorProps: {
      attributes: {
        class:
          " prose-sm min-h-[150px]  w-full rounded-md  bg-transparent border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
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
        HTMLAttributes: {
          class: "prose-sm w-60 h-40 lg:w-[400px] lg:h-[300px]",
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-700 dark:text-blue-300 underline",
        },
      }),
      Underline,
    ],
    content: post?.body || "",
  });

  useEffect(() => {
    if (editor && post?.body) {
      editor.commands.setContent(post.body);
    }
  }, [post?.body, editor]);

  const handleLike = async () => {
    if (!post) return;

    if (!likeData?.liked) {
      createLike({
        userId: session?.user.id || "",
        postId: post.id,
      }).unwrap();
    } else {
      deleteLike(likeData?.id || "").unwrap();
    }
  };
  if (!post) return null;
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-start justify-between gap-8 overflow-y-auto lg:min-h-[500px] 2xl:min-h-[500px]",
        postView === "card" ? "max-h-[400px]" : "max-h-none",
      )}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          {/* User Info */}
          <div className="flex w-fit items-center justify-start gap-2">
            <Avatar>
              <AvatarImage
                src={post.user.image || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>{post.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-col">
              <p className=" ">{post.user.name}</p>
              <p className="text-sm text-gray-500">{post.user.profession}</p>
            </div>
          </div>
          {/* Post Likes */}
          <Button
            className={
              "flex w-fit cursor-pointer items-center justify-center gap-2"
            }
            disabled={isLikeLoading}
            variant={"ghost"}
            onClick={handleLike}
          >
            {isLikeLoading || isCreateLikeLoading || isDeleteLikeLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <div className="flex items-center justify-center gap-2">
                {likeData?.liked ? (
                  <FaHeart className="h-6 w-6 text-primary" />
                ) : (
                  <FaRegHeart className="h-6 w-6" />
                )}
                <p className="text-muted-foreground">
                  {likeData?.likeCount || 0}
                </p>
              </div>
            )}
          </Button>
        </div>

        {/* /* Post Content */}
        <div className="flex w-full flex-col gap-4">
          <div className="text-primary lg:text-lg xl:text-xl 2xl:text-2xl">
            {post.title}
          </div>
          <EditorContent editor={editor} className="prose-sm" />
        </div>
      </div>

      {/* Post Footer */}
      <div className="flex w-full flex-col items-center justify-start gap-4 pb-4">
        <Separator className="w-full" />
        {/* Comment List */}
        <Collapsible className="flex w-full flex-col gap-2">
          <CollapsibleTrigger className="w-full items-start justify-start">
            <p className="text-start text-muted-foreground lg:text-lg">
              {" "}
              View Comments
            </p>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CommentList postId={post.id} />
          </CollapsibleContent>
        </Collapsible>
        {/* Write Comment */}
        <CommentForm postId={post.id} />
      </div>
    </div>
  );
}
