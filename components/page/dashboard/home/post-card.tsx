import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { htmlToText } from "@/lib/utils";
import { Post } from "@/types/post";
import { format } from "date-fns";
import { MessageSquare, ThumbsUp } from "lucide-react";
export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border px-8 py-4">
      {/* User Info */}
      <div className="flex w-fit items-center justify-start gap-2">
        <Avatar>
          <AvatarImage
            src={post.user.image || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>{post.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col">
          <p className=" ">{post.user.name}</p>
          <p className="text-sm text-gray-500">{post.user.profession}</p>
          <p className="text-sm text-muted-foreground">{post.category}</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-0">
        <div className="text-2xl">{post.title}</div>
        <p
          dangerouslySetInnerHTML={{
            __html: `${htmlToText(post.content).substring(0, 200)}...`,
          }}
        />
      </div>
      <div className="flex items-center justify-start gap-4">
        <div className="flex items-center justify-center gap-2">
          <ThumbsUp className="size-2 lg:size-3" />
          <p className="text-sm text-muted-foreground">{post.likes}</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <MessageSquare className="size-2 lg:size-3" />
          <p className="text-sm text-muted-foreground">{post.comments}</p>
        </div>

        <p className="text-sm text-muted-foreground">
          {format(post.createdAt, "MMM dd, yyyy")}
        </p>
      </div>
    </div>
  );
}
