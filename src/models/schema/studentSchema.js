import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    roomNo: { type: String, required: true },
    courseName: { type: String, required: true },
    semester: { type: Number, required: true },
    roomFees: { type: Number, default: 5000 },
    timestamp: { type: String, default: "" },
    emailAddress: { type: String, default:"" },
    studentMobileNumber: { type: Number, required: true },
    fatherMobileNumber: { type: Number, default:"" },
    cityYourHometown: { type: String, required: true },
    district: { type: String, default:"" },
    state: { type: String, default:"" },
    dateOfBirth: { type: String, default:"" },
    age: { type: Number, default:"" },
    fatherName: { type: String, default:"" },
    motherName: { type: String, default:"" },
    address: { type: String, default:"" },
    zipcode: { type: Number, default:"" },
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
    passportImageUrl: { type: String, required: true },
  },
  { collection: "students" }
);

export default mongoose.model("Student", studentSchema);
