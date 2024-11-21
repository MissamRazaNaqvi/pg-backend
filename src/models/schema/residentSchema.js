import mongoose from "mongoose";

const residentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    residentMobileNumber: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    courseName: { type: String, required: true },
    semester: { type: String, required: true },
    fatherMobileNumber: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    medicalHistory: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    policeVerificationCertificate: String, // URL for the file
    lastCollegeFeesReceipt: String, // URL for the file
    passportSizeImage: String, // URL for the file
    aadharCard: String, // URL for the file
    extraCurricularActivities: String, //optional
    vehicleNumber: String, //optional
    lastCollege: String, //optional
  },
  { collection: "resident" }
);

// Ensure the correct schema is used in the model
const Resident = mongoose.model("Resident", residentSchema);

export default Resident;