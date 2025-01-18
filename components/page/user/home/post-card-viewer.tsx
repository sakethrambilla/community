"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PostCard from "./post-card";

interface PostCardViewerProps {
  postData: Post[];
  isLoading: boolean;
}

export default function PostCardViewer({
  postData,
  isLoading,
}: PostCardViewerProps) {
  const { toast } = useToast();
  console.log(postData);
  const [activePostIndex, setActivePostIndex] = useState<number>(0);

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
    <div className="flex h-full w-full flex-col items-center gap-4 md:flex-row">
      {isLoading && <Skeleton className="h-48 w-full rounded-2xl" />}

      <CircleArrowLeft
        className="hidden size-4 cursor-pointer text-muted-foreground md:flex md:size-8 lg:size-12"
        onClick={handlePreviousPost}
      />
      <div className="flex w-full flex-col gap-4 rounded-2xl border-2 px-4 py-6 lg:p-8">
        {isLoading ? (
          <Skeleton className="h-48 w-full rounded-2xl" />
        ) : (
          <PostCard post={postData?.[activePostIndex]} />
        )}
      </div>
      <CircleArrowRight
        className="hidden size-4 cursor-pointer text-muted-foreground md:flex md:size-8 lg:size-12"
        onClick={handleNextPost}
      />

      <div className="flex items-center gap-4 md:hidden">
        <CircleArrowLeft
          className="size-8 cursor-pointer text-muted-foreground lg:size-12"
          onClick={handlePreviousPost}
        />
        <CircleArrowRight
          className="size-8 cursor-pointer text-muted-foreground lg:size-12"
          onClick={handleNextPost}
        />
      </div>
    </div>
  );
}
