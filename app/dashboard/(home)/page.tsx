import AddPost from "@/components/page/dashboard/home/add-post";
import PostList from "@/components/page/dashboard/home/post-list";

export default function Page() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-start gap-12 p-2 md:p-4 lg:p-8">
      {/* Add Post */}
      <AddPost />
      {/* Post */}
      <PostList />
    </main>
  );
}
