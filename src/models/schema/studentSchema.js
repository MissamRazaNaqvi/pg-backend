import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fees: { type: Number, default: "4500" },
    timestamp: { type: String, default: "" },
    emailAddress: { type: String, required: true },
    roomNo: { type: String, required: true },
    courseName: { type: String, required: true },
    semester: { type: Number, required: true },
    studentMobileNumber: { type: Number, required: true },
    fatherMobileNumber: { type: Number, required: true },
    cityYourHometown: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    age: { type: Number, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    address: { type: String, required: true },
    zipcode: { type: Number, required: true },
    lastFeesPaidDate: { type: String, default: "" },
    medicalHistory: { type: String, default: "" },
    policeVerificationCertificate: { type: String, default: "" },
    extraCurricularActivities: {
      sports: { type: String, default: "" },
      internshipEtc: { type: String, default: "" },
    },
    vehicleNumber: { type: String, default: "" },
    joiningDate: { type: String, default: "" },
    lastCollege: { type: String, default: "" },
    aadharCard: { type: String, default: "" },
    passportSizeImage: { type: String, required: true },
  },
  { collection: "students" }
);

export default mongoose.model("Student", studentSchema);
