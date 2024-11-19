import mongoose from "mongoose";

const feesSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  month: { type: String, required: true },
  status: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
  amountPaid: { type: Number, default: 0 },
  paidDate: { type: Date },
  remarks: { type: String },
});

const Fees = mongoose.model("Fees", feesSchema);

export default Fees;
