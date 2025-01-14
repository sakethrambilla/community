import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      id: true,
      status: true,
      pinned: true,
      categoryId: true,
      category: true,
      likes: true,
      user: {
        include: {
          name: true,
          email: true,
          image: true,
        },
      },
      comments: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(posts);
}
