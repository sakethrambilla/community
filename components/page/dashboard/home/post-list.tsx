"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetPostsQuery } from "@/redux/post/api";
import PostCard from "./post-card";

export default function PostList() {
  const { data: postData, isLoading } = useGetPostsQuery();
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
      {postData?.map((post) => <PostCard post={post} key={post.id} />)}
    </div>
  );
}
