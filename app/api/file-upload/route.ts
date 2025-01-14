import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file");
  console.log(file);
  return NextResponse.json({ message: "File uploaded successfully" });
};
