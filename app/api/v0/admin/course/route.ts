import { prisma } from "@/lib/db";
import { createCourseSchema, deleteSchema, updateCourseSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * Retrieves a course by its ID
 * @route GET /api/v0/admin/course
 * @param req - The request object containing the course ID
 * @returns {Promise<NextResponse>} The course or error response
 * @throws {ZodError} When request validation fails
 */
export async function GET(req: NextRequest) {
  try {
    const courseId = req.nextUrl.searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json(
        { message: "Course Id is required" },
        { status: 400 },
      );
    }
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(course);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * Creates a new course in the system
 * @route POST /api/v0/admin/course
 * @param req - The request object containing course details
 * @param res - The response object
 * @returns {Promise<NextResponse>} The created course or error response
 * @throws {ZodError} When request validation fails
 */
export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const {
      title,
      description,
      categoryId,
      accessType,
      published,
      coverImage,
    } = createCourseSchema.parse(requestBody);

    if (!categoryId) {
      return NextResponse.json(
        { message: "Category Id is required" },
        { status: 400 },
      );
    }

    const existingCourseCategory = await prisma.courseCategory.findUnique({
      where: { id: categoryId },
    });

    if (!existingCourseCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        coverImage,
        category: { connect: { id: categoryId } },
        accessType,
        published,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * Updates an existing course
 * @route PATCH /api/v0/admin/course
 * @param req - The request object containing updated course details
 * @returns {Promise<NextResponse>} The updated course or error response
 * @throws {ZodError} When request validation fails
 */
export async function PATCH(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const {
      id,
      title,
      description,
      categoryId,
      accessType,
      published,
      coverImage,
    } = updateCourseSchema.parse(requestBody);

    if (!id) {
      return NextResponse.json({ message: "Id is required" }, { status: 400 });
    }
    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 },
      );
    }

    if (categoryId) {
      const existingCourseCategory = await prisma.courseCategory.findUnique({
        where: { id: categoryId },
      });

      if (!existingCourseCategory) {
        return NextResponse.json(
          { message: "Category not found" },
          { status: 404 },
        );
      }
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
        coverImage,
        category: { connect: { id: categoryId } },
        accessType,
        published,
      },
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * Deletes a course from the system
 * @route DELETE /api/v0/admin/course
 * @param req - The request object containing course ID
 * @returns {Promise<NextResponse>} Success message or error response
 * @throws {ZodError} When request validation fails
 */
export async function DELETE(req: NextRequest) {
  try {
    const { id } = deleteSchema.parse(await req.json());

    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 },
      );
    }

    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Course deleted" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
