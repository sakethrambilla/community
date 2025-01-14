"use client";

import { useGetPostsQuery } from "@/redux/post/api";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PostCard from "./post-card";

export default function PostCardViewer() {
  const [activePostIndex, setActivePostIndex] = useState<number>(0);
  const { data: postData, isLoading } = useGetPostsQuery();

  function handleNextPost() {
    if (postData && activePostIndex < postData.length - 1) {
      setActivePostIndex((prev) => prev + 1);
    }
  }

  function handlePreviousPost() {
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
    [postData, activePostIndex],
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
        className="size-4 lg:size-6"
        onClick={handlePreviousPost}
      />
      <PostCard post={postData?.[activePostIndex]} />
      <CircleArrowRight className="size-4 lg:size-6" onClick={handleNextPost} />
    </div>
  );
}
