"use client";

import { useGetPostsQuery } from "@/redux/post/api";
import PostCard from "./post-card";

export default function PostList() {
  const { data: postData } = useGetPostsQuery();
  return (
    <div className="flex flex-col gap-4">
      {postData?.map((post) => <PostCard post={post} key={post.id} />)}
    </div>
  );
}
