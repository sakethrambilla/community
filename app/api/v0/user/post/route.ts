import { prisma } from "@/lib/db";
import { createPostSchema, deleteSchema } from "@/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    // console.log("-------------GET /user/post -------------");

    const posts = await prisma.post.findMany({
      include: {
        user: true,
        category: true,
        _count: {
          select: {
            likes: true,
          },
        },
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // console.log("posts", posts);

    const transformedPosts = posts.map(({ comments, _count, ...post }) => ({
      ...post,
      likes: _count.likes,
      comments: comments.length || 0,
      category: post.category.name,
      categoryId: post.category.id,
      user: {
        id: post.user.id,
        name: post.user.name,
        email: post.user.email,
        image: post.user.image,
      },
    }));

    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.log("Error fetching posts", error);
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Post Post body", body);
    const { title, content, userId, categoryId } = createPostSchema.parse(body);

    if (!userId) {
      return NextResponse.json(
        { messsage: " Userd Id is required" },
        { status: 404 },
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        user: {
          connect: { id: userId },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("Error", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Error creating post" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = deleteSchema.parse(body);
    const post = await prisma.post.delete({ where: { id } });
    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Error deleting post" },
      { status: 500 },
    );
  }
}
