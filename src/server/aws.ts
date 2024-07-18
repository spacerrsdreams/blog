"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

console.log(process.env.S3_BUCKET_REGION);

const s3Client = new S3Client([
  {
    region: process.env.S3_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  },
]);

type UploadimageToS3 = {
  fileName: string;
  type: string;
  width: string;
  height: string;
  buffer: Buffer;
};

export const uploadImageToS3 = async ({
  fileName,
  type,
  width,
  height,
  buffer,
}: UploadimageToS3) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${fileName}-${Date.now()}`,
    buffer,
    ContentType: type,
    Metadata: {
      width: width,
      height: height,
    },
  };

  const command = new PutObjectCommand(params);
  return s3Client.send(command);
};
