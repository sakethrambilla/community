"use client";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  useDeleteAdminPostMutation,
  useGetAdminPostsQuery,
} from "@/redux/features/admin/post/api";
import { AdminPost } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2Icon, MoreHorizontal, Trash2Icon } from "lucide-react";
export default function PostTable() {
  const { toast } = useToast();
  const { data: posts, isLoading: isLoadingPosts } = useGetAdminPostsQuery();
  const [deletePost, { isLoading: isDeleting, isError: isDeletingError }] =
    useDeleteAdminPostMutation();

  if (!posts) return null;

  function handleDeletePost(id: string) {
    deletePost(id);
    if (isDeletingError) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the post",
      });
    } else {
      toast({
        title: "Success",
        description: "The post has been deleted successfully",
      });
    }
  }

  const columns: ColumnDef<AdminPost>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },

    {
      accessorKey: "user.name",
      header: "Author",
    },
    {
      accessorKey: "user.email",
      header: "Author Email",
    },
    {
      accessorKey: "categoryName",
      header: "Category",
    },
    {
      accessorKey: "comments",
      header: "Comments",
      enableSorting: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-fit">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => handleDeletePost(payment.id)}
              >
                {isDeleting ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Delete <Trash2Icon className="h-4 w-4" />
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      {isLoadingPosts ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <DataTable columns={columns} data={posts} />
      )}
    </div>
  );
}
