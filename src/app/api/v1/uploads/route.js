// route.ts
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ListObjectsCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  },
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  console.log(file);
  if (!file) {
    return NextResponse.json({ error: "No file found", status: 400 });
  }

  const fileArrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(fileArrayBuffer);

  const putCommand = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: file.name,
    Body: fileBuffer,
  });

  try {
    await s3Client.send(putCommand);

    const presignedUrl = await getSignedUrl(s3Client, putCommand);

    return NextResponse.json({
      status: "success",
      fileName: file.name,
      size: file.size,
      lastModified: new Date(file.lastModified),
      url: presignedUrl,
    });
  } catch (error) {
    return NextResponse.json({ error: "Upload to S3 failed", status: 500 });
  }
}

export async function GET(req) {
  const listCommand = new ListObjectsCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
  });
  try {
    const data = await s3Client.send(listCommand);
    console.log("data", data);
    const fileNames = data.Contents?.map((item) => item.Key) || [];
    return NextResponse.json({
      status: "success",
      fileNames: fileNames,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Listing S3 files failed", status: 500 });
  }
}
