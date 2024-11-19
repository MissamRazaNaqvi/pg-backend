import Fees from "../models/schema/feesSchema.js";
import Student from "../models/schema/studentSchema.js";

// 1. Generate Monthly Fees for all students
export const generateMonthlyFees = async (req, res) => {
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  try {
    // Fetch all students
    const students = await Student.find();

    // Check if fees for the current month already exist for each student
    const existingFees = await Fees.find({ month: currentMonth }).select(
      "studentId"
    );

    // Get a list of student IDs that already have fees generated for the current month
    const existingStudentIds = existingFees.map((fee) =>
      fee.studentId.toString()
    );

    // Filter out students who already have fees generated for the current month
    const studentsToGenerateFeesFor = students.filter(
      (student) => !existingStudentIds.includes(student._id.toString())
    );

    if (studentsToGenerateFeesFor.length === 0) {
      return res.status(200).json({
        message: "Fees for the current month have already been generated.",
      });
    }

    // Map each student who doesn't have fees for the current month to a fee record
    const feeRecords = studentsToGenerateFeesFor.map((student) => ({
      studentId: student._id,
      month: currentMonth,
      status: "Pending",
      amountPaid: 0,
    }));

    // Insert fee records into the Fees collection
    await Fees.insertMany(feeRecords);
    console.log(
      `Monthly fee records for ${currentMonth} created successfully.`
    );

    // Respond with success message
    res
      .status(200)
      .json({ message: "Fees generated successfully for the new students." });
  } catch (error) {
    console.error("Error generating monthly fees:", error);
    res.status(500).json({ message: "Error generating fees." });
  }
};

// 2. Get fee status for all students by month
export const getFeeStatusByMonth = async (req, res) => {
  const { month } = req.query; // Extract month from query parameters
  //   console.log("month", month);
  try {
    // Build filter criteria based on the month
    const filter = {};
    if (month) filter.month = month;

    // Fetch fees records with student details populated
    const feesList = await Fees.find(filter).populate(
      "studentId", // Reference field in Fees schema
      "firstName lastName roomNo courseName roomFees" // Select specific fields from the Student schema
    );
    // console.log(feesList, "feesList");
    // If no fees records are found
    if (!feesList || feesList.length === 0) {
      return res.status(404).json({
        message: `No fees records found for the month: ${
          month || "specified"
        }.`,
      });
    }
    // Respond with the fees list
    res.status(200).json({ data: feesList });
  } catch (error) {
    console.error("Error fetching fees list:", error);
    res.status(500).json({ message: "Error fetching fees list." });
  }
};

// 3. Update fee status when paid
export const updateFeeStatus = async (req, res) => {
  const { feeId } = req.params;
  console.log(req.body, "front dataa");
  // const { amountPaid } = req.body;

  try {
    const feeRecord = await Fees.findById(feeId);
    if (!feeRecord) {
      return res.status(404).json({ message: "Fee record not found." });
    }

    // Update the fee status
    // feeRecord.amountPaid = amountPaid;
    feeRecord.status = "Paid";
    feeRecord.paidDate = new Date();
    // feeRecord.remarks = remarks;

    await feeRecord.save();
    res.status(200).json({ message: "Fee status updated successfully." });
  } catch (error) {
    console.error("Error updating fee status:", error);
    res.status(500).json({ message: "Error updating fee status." });
  }
};
