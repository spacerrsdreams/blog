import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { uuid } from "uuidv4";

const REGION = process.env.AWS_S3_BUCKET_REGION;
const BUCKET = process.env.AWS_S3_BUCKET_NAME;
const ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY;

if (!REGION || !BUCKET || !ACCESS_KEY || !SECRET_ACCESS_KEY) {
  throw new Error("Environment variables for AWS Bucket is not set.");
}

const client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

export async function POST(request: Request) {
  const { contentType } = await request.json();

  try {
    const { url, fields } = await createPresignedPost(client, {
      Bucket: BUCKET!,
      Key: uuid(),
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10 MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        "Content-Type": contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    });

    return Response.json({ url, fields }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}
