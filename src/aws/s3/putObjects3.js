import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3Config.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const generatePresignedURL = async () => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "pictures/vercel.png", // Path in the S3 bucket where you want to store the image
    ContentType: "image/*", // Content type; can be set based on frontend input
  });

  try {
    const url = await getSignedUrl(s3Client, command); // URL expires in 5 minutes
    return url;
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw error;
  }
};

export { generatePresignedURL };