import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

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
