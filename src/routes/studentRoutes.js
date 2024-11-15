import express from "express";
import {
  fetchAllStudents,
  initial,
  addStudent,
  updateFeesForAllStudents,
  studentRegistration,
} from "../controllers/studentController.js";
import { updateAllFields } from "../controllers/updateKeys.js";

const router = express.Router();

router.get("/", initial);
router.get("/student", fetchAllStudents);
router.post("/addNewStudent", addStudent);
router.post("/studentRegistration", studentRegistration);
router.put("/updateFeesForAllStudents", updateFeesForAllStudents);
router.get("/updateAllFields", updateAllFields);

export default router;
