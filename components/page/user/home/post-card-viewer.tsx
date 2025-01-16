"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useGetUserPostsQuery } from "@/redux/features/shared/post/api";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PostCard from "./post-card";

export default function PostCardViewer() {
  const { toast } = useToast();
  const [activePostIndex, setActivePostIndex] = useState<number>(0);
  const { data: postData, isLoading } = useGetUserPostsQuery();

  function handleNextPost() {
    if (postData && activePostIndex === postData.length - 1) {
      toast({
        title: "This is the last post",
        description: "You have reached the end of the posts",
      });
    }
    if (postData && activePostIndex < postData.length - 1) {
      setActivePostIndex((prev) => prev + 1);
    }
  }

  function handlePreviousPost() {
    if (postData && activePostIndex === 0) {
      toast({
        title: "This is the most recent post",
        description: "You have reached the start of the posts",
      });
    }
    if (postData && activePostIndex > 0) {
      setActivePostIndex((prev) => prev - 1);
    }
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNextPost();
      } else if (event.key === "ArrowLeft") {
        handlePreviousPost();
      }
    },
    [postData, activePostIndex, handleNextPost, handlePreviousPost],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex h-full w-full flex-row items-center gap-4">
      <CircleArrowLeft
        className="size-4 cursor-pointer text-muted-foreground lg:size-12"
        onClick={handlePreviousPost}
      />
      {isLoading && <Skeleton className="h-48 w-full rounded-2xl" />}
      <div className="flex w-full flex-col gap-4 rounded-2xl border-2 p-8">
        <PostCard post={postData?.[activePostIndex]} />
      </div>
      <CircleArrowRight
        className="size-4 cursor-pointer text-muted-foreground lg:size-12"
        onClick={handleNextPost}
      />
    </div>
  );
}
