import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Retrieves all course categories from the system
 * @route GET /api/v0/shared/course-category
 * @returns {Promise<NextResponse>} List of course categories or error response
 */
export async function GET() {
  try {
    const categories = await prisma.courseCategory.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
