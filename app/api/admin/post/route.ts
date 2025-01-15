import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      id: true,
      pinned: true,
      categoryId: true,
      likes: true,
      user: {
        select: {
          name: true,
          email: true,
          image: true,
          id: true,
        },
      },
    },
  });

  return NextResponse.json(posts);
}
