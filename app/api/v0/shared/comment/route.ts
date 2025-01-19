import { prisma } from "@/lib/db";
import { createCommentSchema, updateCommentSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const postId = request.nextUrl.searchParams.get("postId");
  const userId = request.nextUrl.searchParams.get("userId");
  if (!postId) {
    return NextResponse.json(
      { message: "Post ID is required" },
      { status: 400 },
    );
  }
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  const userComments = comments.filter((comment) => comment.userId === userId);
  const otherComments = comments.filter((comment) => comment.userId !== userId);
  const orderedComments = [...userComments, ...otherComments];

  if (!comments) {
    return NextResponse.json({ message: "No comments found" }, { status: 404 });
  }

  const transformedComments = orderedComments.map(
    ({ user, _count, ...comment }) => ({
      ...comment,
      user: user.name,
      image: user.image,
      likes: _count.likes,
    }),
  );
  // console.dir(transformedComments, { depth: null });
  return NextResponse.json(transformedComments);
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    const { body, postId, userId } = createCommentSchema.parse(requestBody);

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        post: {
          connect: { id: postId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log("Error", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.errors, { status: 400 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const requestBody = await request.json();
    console.log("------- PATCH /v0/shared/comment -------");
    // console.dir(responseBody, { depth: null });
    const { id, body } = updateCommentSchema.parse(requestBody);

    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 },
      );
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { body },
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.log("Error", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.errors, { status: 400 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const userId = request.nextUrl.searchParams.get("userId");

    if (!id) {
      return NextResponse.json(
        { message: "Comment ID is required" },
        { status: 400 },
      );
    }
    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 },
      );
    }

    if (comment.userId !== userId) {
      return NextResponse.json(
        { message: "You are not authorized to delete this comment" },
        { status: 403 },
      );
    }

    await prisma.comment.delete({ where: { id } });
    return NextResponse.json({ message: "Comment deleted" });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
