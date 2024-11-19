import express from "express";
import {
  fetchAllStudents,
  initial,
  addStudent,
  updateFeesForAllStudents,
  studentRegistration,
} from "../controllers/studentController.js";
import { updateAllFields } from "../controllers/updateKeys.js";
import { getStudentDetails } from "../controllers/StudentDetails.js";
import {
  generateMonthlyFees,
  getFeeStatusByMonth,
  updateFeeStatus,
} from "../controllers/feesController.js";

const router = express.Router();

router.get("/", initial);
router.get("/student", fetchAllStudents);
router.get("/students/:id", getStudentDetails);
router.post("/addNewStudent", addStudent);
router.post("/studentRegistration", studentRegistration);
router.put("/updateFeesForAllStudents", updateFeesForAllStudents);
router.get("/updateAllFields", updateAllFields);
router.get("/generateMonthlyFees", generateMonthlyFees);

// Get fee status for students by month
router.get("/fees", getFeeStatusByMonth);

// Update fee status when paid
router.put("/fees/:feeId", updateFeeStatus);

export default router;
