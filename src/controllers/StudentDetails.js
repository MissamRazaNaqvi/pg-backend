import { getImage, getObjctURL } from "../aws/s3/getObjectS3.js";
import Student from "../models/schema/studentSchema.js";

export const getStudentDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract student ID from request parameters

    // Retrieve the student by ID
    const student = await Student.findById(id);
    // console.log(student,"student")
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Fetch the image URL from S3
    const imageURL = await getImage(`profilePictures/${student.imageName}`);
    // const imageURL = await getImage("vercel.png");

    
    // console.log(imageURL, "imageURL");
    // Construct the response data (use the fields you want to send back)
    const studentDetails = {
      firstName: student.firstName,
      lastName: student.lastName,
      roomNo: student.roomNo,
      courseName: student.courseName,
      semester: student.semester,
      studentMobileNumber: student.studentMobileNumber,
      cityYourHometown: student.cityYourHometown,
      sharingOption: student.sharingOption,
      roomFees: student.roomFees,
      imageName: student.imageName,
      imageURL, // Attach the image URL from S3
    };

    // Send the success response
    res.status(200).json({
      success: true,
      message: "Student details retrieved successfully",
      data: studentDetails,
    });
  } catch (error) {
    console.error("Error fetching student details:", error);

    // Send a more specific error response
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message, // Include the error details for debugging
    });
  }
};
