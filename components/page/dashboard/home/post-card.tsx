import { htmlToText } from "@/lib/utils";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post | undefined;
}

export default function PostCard({ post }: PostCardProps) {
  if (!post) return null;
  return (
    <div className="flex h-full min-h-[600px] w-full flex-col gap-8 rounded-2xl p-8">
      {/* User Info
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
        </div>
      </div> */}
      {/* Post Content */}
      <div className="flex w-full flex-col gap-0">
        <div className="lg:text-lg xl:text-xl 2xl:text-2xl">{post.title}</div>
        <p
          dangerouslySetInnerHTML={{
            __html: `${htmlToText(post.content)}`,
          }}
        />
      </div>
    </div>
  );
}
