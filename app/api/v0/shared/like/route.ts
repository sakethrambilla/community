import { prisma } from "@/lib/db";
import { createLikeSchema, deleteSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Function to handle GET requests for likes
export async function GET(req: NextRequest) {
  try {
    // Extract postId and userId from the request URL
    const postId = req.nextUrl.searchParams.get("postId");
    const userId = req.nextUrl.searchParams.get("userId");

    // Find if the user has liked the post
    const like = await prisma.like.findFirst({
      where: {
        postId,
        userId: userId || undefined,
      },
    });

    // Count the total number of likes for the post
    const likeCount = await prisma.like.count({
      where: {
        postId,
      },
    });

    // Return the like status and count
    return NextResponse.json({
      likeCount,
      liked: like ? true : false,
      id: like?.id,
    });
  } catch (error) {
    console.error(error);
    // Return a 500 error response in case of an exception
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// Function to handle POST requests to create a like
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { userId, postId, commentId } = createLikeSchema.parse(body);
    console.log("-------------POST /shared/like -------------");
    // console.log("body", body);

    // Validate that either postId or commentId is provided
    if (!postId && !commentId) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    // Create a like for a post if postId is provided
    if (postId) {
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
    }

    // Create a like for a comment if commentId is provided
    if (commentId) {
      await prisma.like.create({
        data: {
          userId,
          commentId,
        },
      });
    }

    // Return a success response
    return NextResponse.json({ message: "Like created" }, { status: 200 });
  } catch (error) {
    console.error(error);
    // Return a 500 error response in case of an exception
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// Function to handle DELETE requests to remove a like
export async function DELETE(req: NextRequest) {
  // console.log("-------------DELETE /shared/like -------------");
  try {
    // Parse the request body
    const body = await req.json();
    const { id } = deleteSchema.parse(body);

    // Check if the like exists
    const existingLike = await prisma.like.findUnique({
      where: { id },
    });

    // Return a 404 error if the like is not found
    if (!existingLike) {
      return NextResponse.json({ message: "Like not found" }, { status: 404 });
    }

    // Delete the like
    await prisma.like.delete({
      where: { id },
    });

    // Return a success response
    return NextResponse.json({ message: "Like deleted" }, { status: 200 });
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    console.error(error);
    // Return a 500 error response in case of an exception
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
