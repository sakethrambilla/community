"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetPostsQuery } from "@/redux/post/api";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { htmlToText } from "@/lib/utils";
import { Post } from "@/types/user/post";
import { DialogTitle } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { MessageSquare, ThumbsUp } from "lucide-react";
import PostCard from "./post-card";

export default function PostList() {
  const { data: postData, isLoading } = useGetPostsQuery();
  const [activePost, setActivePost] = useState<Post | undefined>(undefined);
  const [open, setOpen] = useState(false);
  // console.log("POst List", postData);
  return (
    <div className="flex w-full flex-col gap-4">
      {isLoading && (
        <div className="flex flex-col gap-12">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-48 w-full rounded-2xl" />
          ))}
        </div>
      )}
      {postData?.map((post, index) => (
        <Drawer key={index} open={open} onOpenChange={setOpen}>
          <DrawerTrigger>
            <PostListCard
              post={post}
              key={post.id}
              setActivePost={setActivePost}
            />
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <DialogTitle></DialogTitle>
            <PostCard post={activePost} />
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
}

interface PostCardProps {
  post: Post;
  setActivePost: (post: Post) => void;
}

function PostListCard({ post, setActivePost }: PostCardProps) {
  function handlePostClick() {
    setActivePost(post);
  }
  return (
    <div
      className="flex w-full flex-col gap-2 rounded-2xl border px-8 py-4"
      onClick={handlePostClick}
    >
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
          <p className="text-sm text-muted-foreground">{post.category}</p>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-0">
        <div className="text-2xl">{post.title}</div>
        <p
          dangerouslySetInnerHTML={{
            __html: `${htmlToText(post.content).substring(0, 200)}...`,
          }}
        />
      </div>
      <div className="flex items-center justify-start gap-4">
        <div className="flex items-center justify-center gap-2">
          <ThumbsUp className="size-2 lg:size-3" />
          <p className="text-sm text-muted-foreground">{post.likes}</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <MessageSquare className="size-2 lg:size-3" />
          <p className="text-sm text-muted-foreground">{post.comments}</p>
        </div>

        <p className="text-sm text-muted-foreground">
          {format(post.createdAt, "MMM dd, yyyy")}
        </p>
      </div>
    </div>
  );
}
