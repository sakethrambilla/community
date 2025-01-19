import { prisma } from "@/lib/db";
import { deleteSchema } from "@/schema";
import {
  createCourseCategorySchema,
  updateCourseCategorySchema,
} from "@/schema/course-category";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { name, slug } = createCourseCategorySchema.parse(requestBody);
    await prisma.courseCategory.create({
      data: {
        name,
        slug,
      },
    });
    return NextResponse.json({ message: "Course category created" });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { id, name, slug } = updateCourseCategorySchema.parse(requestBody);

    if (!id) {
      return NextResponse.json(
        { message: "Course category id is required" },
        { status: 400 },
      );
    }

    const existingCategory = await prisma.courseCategory.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { message: "Course category not found" },
        { status: 404 },
      );
    }
    await prisma.courseCategory.update({
      where: { id },
      data: { name, slug },
    });

    return NextResponse.json({ message: "Course category updated" });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { id } = deleteSchema.parse(requestBody);
    await prisma.courseCategory.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Course category deleted" });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}
