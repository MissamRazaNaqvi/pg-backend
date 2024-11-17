import Student from "../models/schema/studentSchema.js";

export const getStudentDetails = async (req, res) => {
    try {
      const { id } = req.params; // Extract the student ID from request parameters
        console.log(id,"student id")
      // Retrieve the student by ID
      const student = await Student.findById(id);
        console.log(student,"student detail")
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.status(200).json({
        message: "Student details retrieved successfully",
        data: student,
      });
    } catch (error) {
      console.error("Error fetching student details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };