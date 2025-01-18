import CommentForm from "@/components/page/shared/post/comment-form";
import CommentList from "@/components/page/shared/post/comment-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetLikeQuery,
} from "@/redux/features/shared/like/api";
import { Post } from "@/types/user/post";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface PostCardProps {
  post: Post | undefined;
}

export default function PostCard({ post }: PostCardProps) {
  const { data: session } = useSession();
  const { data: likeData, isLoading: isLikeLoading } = useGetLikeQuery({
    postId: post?.id || "",
    userId: session?.user.id || "",
  });
  console.log("POST Like", likeData);
  const [createLike, { isLoading: isCreateLikeLoading }] =
    useCreateLikeMutation();
  const [deleteLike, { isLoading: isDeleteLikeLoading }] =
    useDeleteLikeMutation();
  console.log("likeData", likeData);
  const handleLike = async () => {
    if (!post) return;

    if (!likeData?.liked) {
      createLike({
        userId: session?.user.id || "",
        postId: post.id,
      }).unwrap();
    } else {
      deleteLike(likeData?.id || "").unwrap();
    }
  };
  if (!post) return null;
  return (
    <div className="flex h-full min-h-[500px] w-full flex-col items-start justify-between gap-8 2xl:min-h-[700px]">
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
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
            </div>
          </div>
          {/* Post Likes */}
          <Button
            className={
              "flex w-fit cursor-pointer items-center justify-center gap-2"
            }
            disabled={isLikeLoading}
            variant={"ghost"}
            onClick={handleLike}
          >
            {isLikeLoading || isCreateLikeLoading || isDeleteLikeLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <div className="flex items-center justify-center gap-2">
                {likeData?.liked ? (
                  <FaHeart className="h-6 w-6 text-primary" />
                ) : (
                  <FaRegHeart className="h-6 w-6" />
                )}
                <p className="text-muted-foreground">
                  {likeData?.likeCount || 0}
                </p>
              </div>
            )}
          </Button>
        </div>

        {/* /* Post Content */}
        <div className="flex w-full flex-col gap-4">
          <div className="text-primary lg:text-lg xl:text-xl 2xl:text-2xl">
            {post.title}
          </div>

          <p dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>

      {/* Post Footer */}
      <div className="flex w-full flex-col items-center justify-start gap-4 pb-4">
        <Separator className="w-full" />
        {/* Comment List */}
        <CommentList postId={post.id} />
        {/* Write Comment */}
        <CommentForm postId={post.id} />
      </div>
    </div>
  );
}
