const Student = require("../models/schema/studentSchema");

const initial = async (req, res) => {
  console.log("server running");
  res.send("server running");
};

const fetchAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.send(students);
    // console.log("All students:", students, "Total students:", students.length);
  } catch (error) {
    console.log("Error fetching students:", error);
  }
};
// Function to add a new student
const addStudent = async (req, res) => {
  try {
    console.log(req.body);
    // const newStudent = new Student(req.body);
    // await newStudent.save();
    // res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: "Error adding student", error });
  }
};

module.exports = {
  fetchAllStudents,
  addStudent,
  initial,
};
