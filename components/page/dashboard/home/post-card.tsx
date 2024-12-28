import { Post } from "@/types/post";
import React from "react";

export default function PostCard({ post }: { post: Post }) {
  return <div>{post.title}</div>;
}
