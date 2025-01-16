import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const categories = await prisma.postCategory.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
