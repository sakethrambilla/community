import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      id: true,
      pinned: true,
      categoryId: true,
      category: {
        select: {
          name: true,
        },
      },
      likes: true,
      user: {
        select: {
          name: true,
          email: true,
          image: true,
          id: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // console.log("-------------GET /admin/post -------------");
  // console.dir(posts, { depth: null });

  const transformedPosts = posts.map((post) => ({
    ...post,
    comments: post._count.comments || 0,
    categoryName: post.category.name,
  }));

  return NextResponse.json(transformedPosts);
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    console.log("-------------DELETE /admin/post -------------");
    console.log("Attempting to delete post:", id);

    if (!id) {
      return NextResponse.json(
        { message: "Post id is required" },
        { status: 400 },
      );
    }

    const post = await prisma.post.delete({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Post deleted successfully",
      post: post,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return NextResponse.json(
      { message: "Error deleting post", error: error.message },
      { status: 500 },
    );
  }
}
