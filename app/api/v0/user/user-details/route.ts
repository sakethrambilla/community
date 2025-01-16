import { prisma } from "@/lib/db";
import {
  createUserDetailSchema,
  deleteSchema,
  updateUserDetailSchema,
} from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    console.log("UserID", userId);
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }
    const userDetails = await prisma.userDetail.findMany({
      where: { userId },
    });
    return NextResponse.json(userDetails);
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, ...validatedBody } = createUserDetailSchema.parse(body);
    const userDetail = await prisma.userDetail.create({
      data: {
        user: {
          connect: { id: userId },
        },
        ...validatedBody,
      },
    });
    return NextResponse.json(userDetail);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...validatedBody } = updateUserDetailSchema.parse(body);
    const userDetail = await prisma.userDetail.update({
      where: { id },
      data: validatedBody,
    });
    return NextResponse.json(userDetail);
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = deleteSchema.parse(body);

    await prisma.userDetail.delete({ where: { id } });
    return NextResponse.json({ message: "User detail deleted" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
