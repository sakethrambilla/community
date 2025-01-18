"use client";

import PostCardViewer from "@/components/page/user/home/post-card-viewer";
import PostForm from "@/components/page/user/home/post-form";
import PostList from "@/components/page/user/home/post-list";
import PostSwitch from "@/components/page/user/home/post-switch";
import { useGetUserPostsQuery } from "@/redux/features/shared/post/api";
import { Post } from "@/types";
import { useEffect, useState } from "react";

export default function Page() {
  const [toggle, setToggle] = useState<boolean>(false);
  const { data: postData, isLoading: postLoading } = useGetUserPostsQuery({
    page: 1,
  });
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(postData || []);
  }, [postData]);

  return (
    <main className="flex h-full w-full flex-col items-start justify-start gap-4 p-2 md:p-4 lg:py-8 xl:gap-6 2xl:gap-8">
      <h1 className="font-nippo text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
        Community Posts
      </h1>
      {/* Add Post */}
      <PostForm />

      {/* Post Toggle */}
      <PostSwitch setToggle={setToggle} toggle={toggle} />
      {/* Post */}
      {posts.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 pt-4 2xl:pt-12">
          <p className="px-4 text-center text-sm lg:px-0 lg:text-xl 2xl:text-3xl">
            Sorry, there are no community posts yet.
          </p>
          <p className="font-nippo text-7xl text-muted-foreground lg:text-[12rem] 2xl:text-[15rem]">
            404
          </p>
        </div>
      ) : toggle ? (
        <PostCardViewer postData={posts} isLoading={postLoading} />
      ) : (
        <PostList postData={posts} isLoading={postLoading} />
      )}
    </main>
  );
}
