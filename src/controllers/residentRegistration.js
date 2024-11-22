import { generatePresignedURL } from "../aws/s3/putObjects3.js";
import Resident from "../models/schema/residentSchema.js"; // Ensure the correct path and file extension

// Helper function to check if a file object is valid
const isValidFile = (file) => file && file.name && file.type;

// Function to generate pre-signed URL if the file is valid
const processFile = async (file, filePath) => {
  if (isValidFile(file)) {
    return await generatePresignedURL(filePath, file.name, file.type);
  }
  return null;
};

export const residentRegistrations = async (req, res) => {
  try {
    const {
      residentMobileNumber,
      aadharCard,
      passportSizeImage,
      policeVerificationCertificate,
      lastCollegeFeesReceipt,
      ...otherDetails
    } = req.body;

    // Validate mandatory files
    if (!isValidFile(aadharCard)) {
      return res
        .status(400)
        .json({ message: "Aadhar Card is required and invalid." });
    }
    if (!isValidFile(passportSizeImage)) {
      return res
        .status(400)
        .json({ message: "Passport Size Image is required and invalid." });
    }

    // Generate pre-signed URLs for file uploads
    const preSignedURLs = {};
    preSignedURLs.aadharCard = await processFile(aadharCard, "AadharCard");
    preSignedURLs.passportSizeImage = await processFile(
      passportSizeImage,
      "PassportSizeImage"
    );

    if (
      policeVerificationCertificate &&
      isValidFile(policeVerificationCertificate)
    ) {
      preSignedURLs.policeVerificationCertificate = await processFile(
        policeVerificationCertificate,
        "PoliceVerificationCertificate"
      );
    }

    if (lastCollegeFeesReceipt && isValidFile(lastCollegeFeesReceipt)) {
      preSignedURLs.lastCollegeFeesReceipt = await processFile(
        lastCollegeFeesReceipt,
        "LastCollegeFeesReceipt"
      );
    }

    // Check if the resident already exists
    const existingResident = await Resident.findOne({ residentMobileNumber });
    if (existingResident) {
      return res.status(400).json({ message: "Resident already exists." });
    }

    // Send pre-signed URLs to the client for file uploads
    res.status(200).json({
      message: "Pre-signed URLs generated successfully.",
      preSignedURLs,
    });

    // Store only file names in the database after the files are uploaded
    const uploadedFileNames = {
      aadharCard: aadharCard.name,
      passportSizeImage: passportSizeImage.name,
    };

    if (
      policeVerificationCertificate &&
      isValidFile(policeVerificationCertificate)
    ) {
      uploadedFileNames.policeVerificationCertificate =
        policeVerificationCertificate.name;
    }

    if (lastCollegeFeesReceipt && isValidFile(lastCollegeFeesReceipt)) {
      uploadedFileNames.lastCollegeFeesReceipt = lastCollegeFeesReceipt.name;
    }
    console.log(uploadedFileNames, "uploadedFileNames");

    // Create resident record with file names
    const newResident = new Resident({
      aadharCardFileName: aadharCard?.name,
      passportSizeFileImage: passportSizeImage?.name,
      lastCollegeFeesReceiptFileName: lastCollegeFeesReceipt?.name,
      policeVerificationCertificateFileName:
        policeVerificationCertificate?.name,
      residentMobileNumber,
      ...otherDetails, // Store only file names in the database
    });

    await newResident.save();
  } catch (error) {
    console.error("Error during resident registration:", error);
    res
      .status(500)
      .json({ message: "Error registering resident.", error: error.message });
  }
};
