import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3Config.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

async function getObjctURL(key) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key, // Specify the key of the file you want to retrieve
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // URL expires in 5 minutes
    return url;
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw error;
  }
}

async function getImage() {
  try {
    const url = await getObjctURL("vercel.png");
    return url;
  } catch (error) {
    console.error("Error getting image:", error);
  }
}

export { getObjctURL, getImage };
