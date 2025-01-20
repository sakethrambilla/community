import { s3Client } from "@/lib/storage";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export default async function fileUpload(file: Buffer, ContentType: string) {
  const fileBuffer = file;
  const fileName = uuidv4();
  console.log(fileName);
  const BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
  console.log("BUCKET NAME", BUCKET_NAME);

  const params = {
    Bucket: BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: ContentType,
  };

  const command = new PutObjectCommand(params);
  await s3Client
    .send(command)
    .then((res) => {
      console.log("RES", res);
    })
    .catch((err) => {
      console.log("ERR", err);
    });
  return fileName;
}
