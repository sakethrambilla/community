"use client";

import PostCardViewer from "@/components/page/user/home/post-card-viewer";
import PostForm from "@/components/page/user/home/post-form";
import PostList from "@/components/page/user/home/post-list";
import PostSwitch from "@/components/page/user/home/post-switch";
import { useState } from "react";

export default function Page() {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <main className="flex h-full w-full flex-col items-start justify-start gap-8 p-2 md:p-4 lg:p-8">
      {/* Add Post */}
      <PostForm />

      {/* Post Toggle */}
      <PostSwitch setToggle={setToggle} toggle={toggle} />
      {/* Post */}
      {toggle ? <PostCardViewer /> : <PostList />}
    </main>
  );
}
