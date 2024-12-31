import PostForm from "@/components/page/dashboard/home/post-form";
import PostList from "@/components/page/dashboard/home/post-list";

export default function Page() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-start gap-12 p-2 md:p-4 lg:p-8">
      {/* Add Post */}
      <PostForm />
      {/* Post */}
      <PostList />
    </main>
  );
}
