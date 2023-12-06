import { NextResponse } from "next/server";
import { S3Client } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  },
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export async function GET(req, context) {
  const id = context.params.id;

  if (!id) {
    return NextResponse.json({ error: "File id is required" }, { status: 400 });
  }

  const getCommand = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: id,
  });

  try {
    const response = await s3Client.send(getCommand);
    const fileData = await new Promise((resolve, reject) => {
      let data = "";

      response.Body.on("data", (chunk) => (data += chunk));
      response.Body.on("end", () => resolve(data));
      response.Body.on("error", reject);
    });

    let jsonData;

    try {
      jsonData = JSON.parse(fileData);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "File data is not valid JSON" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: "success",
      fileId: id,
      data: jsonData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Getting S3 file failed" },
      { status: 500 }
    );
  }
}
