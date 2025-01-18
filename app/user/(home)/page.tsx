"use client";

import PostCardViewer from "@/components/page/user/home/post-card-viewer";
import PostForm from "@/components/page/user/home/post-form";
import PostList from "@/components/page/user/home/post-list";
import PostSwitch from "@/components/page/user/home/post-switch";
import { useState } from "react";

export default function Page() {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <main className="flex h-full w-full flex-col items-start justify-start gap-4 p-2 md:p-4 lg:py-8 xl:gap-6 2xl:gap-8">
      <h1 className="font-nippo text-4xl xl:text-5xl 2xl:text-6xl">
        Community Posts
      </h1>
      {/* Add Post */}
      <PostForm />

      {/* Post Toggle */}
      <PostSwitch setToggle={setToggle} toggle={toggle} />
      {/* Post */}
      {toggle ? <PostCardViewer /> : <PostList />}
    </main>
  );
}
