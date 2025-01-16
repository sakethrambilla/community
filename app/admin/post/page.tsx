import AddPost from "@/components/page/admin/post/add-post";
import PostAnalytics from "@/components/page/admin/post/post-analytics";
import PostTable from "@/components/page/admin/post/post-table";

export default function AdminPostPage() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4 p-8">
      <h2 className="text-2xl font-bold">Community Post</h2>
      {/* Add community Post */}
      <AddPost />
      {/* Analytical Part */}
      <PostAnalytics />

      {/* Post Table */}
      <PostTable />
    </div>
  );
}
