import fileUpload from "@/lib/fileupload";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    console.log("FORM DATA", formData);
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { message: "File is required." },
        { status: 400 },
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await fileUpload(buffer, "image/jpeg");
    console.log("FILE NAME", fileName);

    return NextResponse.json({
      message: "File uploaded successfully.",
      //   fileName,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to upload file." },
      { status: 500 },
    );
  }
}
