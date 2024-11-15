const { GetObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("./s3Config");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require("dotenv");
dotenv.config();

async function getObjctURL(key) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key, // Specify the key of the file you want to retrieve
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // URL expires in 5 minutes
    // console.log("getObject Presigned URL:", url);
    return url;
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw error;
  }
}

async function getImage() {
  try {
    const url = await getObjctURL("vercel.png");
    // console.log("getObject Presigned URL:", url);
    return url;
  } catch (error) {
    console.error("Error getting image:", error);
  }
}
module.exports = { getObjctURL, getImage };
