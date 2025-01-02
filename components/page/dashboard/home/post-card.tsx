import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/types/post";
export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl rounded-md border p-4">
      {/* User Info */}
      <div className="flex w-fit items-center justify-start gap-2">
        <Avatar>
          <AvatarImage
            src={post.user.image || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>{post.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className=" ">{post.user.name}</p>
          <p className="text-sm text-gray-500">{post.user.profession}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-2xl font-bold">{post.title}</div>
        <p dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <p>Category : {post.category}</p>
    </div>
  );
}
