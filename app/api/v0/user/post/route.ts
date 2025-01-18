import { prisma } from "@/lib/db";
import { createPostSchema, deleteSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const PAGE_SIZE = 10;

export async function GET(req: NextRequest) {
  try {
    const pageNumber = Number(req.nextUrl.searchParams.get("page")) || 1;
    const categoryId = req.nextUrl.searchParams.get("categoryId");
    // console.log("-------------GET /user/post -------------");

    const where =
      categoryId && categoryId !== "undefined" ? { categoryId } : undefined;

    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      where,
      skip: (pageNumber - 1) * PAGE_SIZE,
      take: PAGE_SIZE,

      orderBy: {
        createdAt: "desc",
      },
    });

    const middleTime = performance.now();

    const transformedPosts = posts.map(({ _count, ...post }) => ({
      ...post,
      likes: _count.likes,
      comments: _count.comments,
      category: post.category.name,
      categoryId: post.category.id,
      user: {
        id: post.user.id,
        name: post.user.name,
        email: post.user.email,
        image: post.user.image,
      },
    }));

    const endTime = performance.now();
    console.log(
      `Time taken to transform posts: ${endTime - middleTime} milliseconds`,
    );

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
