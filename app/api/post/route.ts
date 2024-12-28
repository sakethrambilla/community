import { prisma } from "@/lib/db";
import { createPostSchema, deleteSchema } from "@/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedBody = createPostSchema.parse(body);
    const post = await prisma.post.create({ data: validatedBody });
    return NextResponse.json(post);
  } catch (error) {
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
