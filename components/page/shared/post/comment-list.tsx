"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { errorMessage } from "@/lib/utils";
import {
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from "@/redux/features/shared/comment/api";
import { CommentType } from "@/types/comment";
import { EllipsisVertical, Loader2, Trash } from "lucide-react";
import { useSession } from "next-auth/react";

interface CommentListProps {
  postId: string;
}
export default function CommentList({ postId }: CommentListProps) {
  const { data: session } = useSession();
  const { data, isLoading } = useGetCommentsQuery({
    postId,
    userId: session?.user.id || "",
  });
  return (
    <div className="flex max-h-40 w-full flex-col gap-4 overflow-y-auto">
      {isLoading ? (
        <Skeleton className="h-24 w-full" />
      ) : !data || data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No comments yet</p>
      ) : (
        data?.map((comment: CommentType) => (
          <CommentCard comment={comment} key={comment.id} />
        ))
      )}
    </div>
  );
}

function CommentCard({ comment }: { comment: CommentType }) {
  const { data: session } = useSession();
  const { toast } = useToast();

  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();
  function handleDeleteComment() {
    deleteComment({
      id: comment.id,
      userId: session?.user.id || "",
    })
      .then(() => {
        toast({
          title: "Comment deleted",
          description: "Comment has been deleted",
        });
      })
      .catch((error) => {
        toast({
          title: `Error: ${errorMessage(error)}`,
          description:
            "Please try again, if the issue persists contact support",
        });
      });
  }

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex items-start gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.image || "https://github.com/shadcn.png"} />
          <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p>{comment.content}</p>
          <p className="text-xs text-muted-foreground">{comment.user}</p>
        </div>
      </div>
      {session?.user.id === comment.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="h-fit w-fit">
            <Button
              variant="destructive"
              className="w-fit p-4"
              onClick={handleDeleteComment}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash className="h-4 w-4" />
              )}
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
