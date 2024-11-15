const express = require("express");
const router = express.Router();
const {
  fetchAllStudents,
  initial,
  addStudent,
} = require("../controllers/studentController");

router.get("/", initial);
router.get("/student", fetchAllStudents);
router.post("/addNewStudent", addStudent);

module.exports = router;
