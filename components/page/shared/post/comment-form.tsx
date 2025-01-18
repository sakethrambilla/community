"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { errorMessage } from "@/lib/utils";
import { useCreateCommentMutation } from "@/redux/features/shared/comment/api";
import { createCommentSchema, CreateCommentSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const form = useForm<CreateCommentSchema>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: { content: "", postId, userId: session?.user.id || "" },
  });

  const onSubmit = (data: CreateCommentSchema) => {
    createComment(data)
      .unwrap()
      .then(() => {
        toast({
          title: "Comment added",
          description: "Your comment has been added",
        });
        form.reset();
      })
      .catch((error) => {
        toast({
          title: `Error: ${errorMessage(error)}`,
          description:
            "Please try again, or contact support if the problem persists",
        });
      });
  };

  useEffect(() => {
    if (session) {
      form.setValue("userId", session.user.id);
    }

    if (postId) {
      form.setValue("postId", postId);
    }
  }, [session, postId]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full">
        <div className="flex w-full items-center justify-start">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session?.user?.image || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Input
                    placeholder="Add Comment"
                    className="w-full rounded-none border-none bg-transparent text-lg shadow-none focus-visible:ring-0 lg:text-lg"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("content") && (
            <div className="flex w-fit items-center justify-end gap-2">
              {isLoading ? (
                <Button type="submit">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button type="submit">{"Add Comment"}</Button>
              )}
              <Button
                variant={"outline"}
                disabled={isLoading}
                type="button"
                onClick={() => form.reset()}
              >
                {"Cancel"}
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
