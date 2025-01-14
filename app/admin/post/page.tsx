import PostAnalytics from "@/components/page/admin/post/post-analytics";
import PostTable from "@/components/page/admin/post/post-table";

export default function AdminPostPage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Community Post</h2>
      {/* Analytical Part */}
      <PostAnalytics />

      {/* Post Table */}
      <PostTable />
    </div>
  );
}
