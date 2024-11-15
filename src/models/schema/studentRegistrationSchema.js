import mongoose from "mongoose";

const StudentRegistrationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    roomNo: { type: String, required: true },
    courseName: { type: String, required: true },
    semester: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    hometown: { type: String, required: true },
    sharingOption: { type: String, required: true },
    roomFees: { type: Number, required: true },
    passportSizeImageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const StudentSchema = mongoose.model("StudentRegistration", StudentRegistrationSchema);

export default StudentSchema;
