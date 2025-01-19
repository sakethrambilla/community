import { prisma } from "@/lib/db";
import { createPostSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const requestBody = await req.json();

    const { title, body, userId, categoryId } =
      createPostSchema.parse(requestBody);

    if (!userId || !categoryId) {
      return NextResponse.json(
        { messsage: " Userd Id and Category Id is required" },
        { status: 404 },
      );
    }

    const postCategory = await prisma.postCategory.findUnique({
      where: { id: categoryId },
    });

    if (!postCategory) {
      return NextResponse.json(
        { message: "Category not found. Please try again later." },
        { status: 404 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found or not authorized. Please try again later.",
        },
        { status: 404 },
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        body,
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

    if (!post) {
      return NextResponse.json(
        { message: "Post not created" },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: "Post created" });
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

export async function DELETE(req: NextRequest) {
  try {
    console.log("-------- DELETE v0/shared/post/ ---------s");
    const id = req.nextUrl.searchParams.get("id");
    console.log("ID", id);
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({ where: { id: id } });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    await prisma.post.delete({ where: { id } });

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
      { message: "Error deleting post" },
      { status: 500 },
    );
  }
}
