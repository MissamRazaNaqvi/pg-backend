const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("./s3Config");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require("dotenv");
dotenv.config();

const generatePresignedURL = async () => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "pictures/vercel.png", // Path in the S3 bucket where you want to store the image
    ContentType: "image/*", // Content type; can be set based on frontend input
  });

  try {
    const url = await getSignedUrl(s3Client, command); // URL expires in 5 minutes
    // console.log("PutObject Presigned URL:", url);
    return url;
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw error;
  }
};

module.exports = { generatePresignedURL };
