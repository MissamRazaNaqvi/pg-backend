import { generatePresignedURL } from "../aws/s3/putObjects3.js";
import Student from "../models/schema/studentSchema.js";
import StudentSchema from "../models/schema/studentSchema.js";

// Function to log initial message
export const initial = async (req, res) => {
  console.log("server running");
  res.send("server running");
};

// Function to fetch all students
export const fetchAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.send(students);
    // console.log("All students:", students, "Total students:", students.length);
  } catch (error) {
    console.log("Error fetching students:", error);
  }
};

// Function to add a new student
export const addStudent = async (req, res) => {
  try {
    console.log(req.body);
    // const newStudent = new Student(req.body);
    // await newStudent.save();
    // res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: "Error adding student", error });
  }
};
export const studentRegistration= async(req,res)=>{
  console.log(req.body.passportSizeImage, "Passport Image Data");

  try {
    // Destructure fields from request body
    const {
      firstName,
      lastName,
      roomNo,
      courseName,
      semester,
      mobileNumber,
      hometown,
      sharingOption,
    } = req.body;


    // Validate file
    const file = req.body.passportSizeImage;
    console.log("file",file)
    // if (!file || !file.name) {
    //   return res.status(400).json({ error: "Passport image is required" });
    // }

    // Generate a pre-signed URL for the file
    const fileUrl = await generatePresignedURL(file.name);
    console.log("fileUrl",fileUrl)

    if (!fileUrl) {
      return res.status(500).json({ error: "Failed to generate S3 URL" });
    }
    console.log(fileUrl, "Generated File URL");

    // Create student data
    const newStudent = new StudentSchema({
      firstName,
      lastName,
      roomNo,
      courseName,
      semester,
      mobileNumber,
      hometown,
      sharingOption,
      passportImageUrl: fileUrl, // Store the generated file URL
    });

    // Save student data to MongoDB
    await newStudent.save();
    console.log("Student data saved successfully:", newStudent);

    // Send success response
    res.status(200).json({
      message: "Student registration successful",
      data: newStudent,
    });
  } catch (error) {
    console.error("Error in student registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// Function to add a sample student
export const addSampleStudent = async () => {
  const newStudent = new Student({
    firstName: "Meraj",
    lastName: "Naqvi",
    emailAddress: "missamnaqvimcab61@gmail.com",
    roomNo: "3",
    courseName: "IMCA",
    semester: 3,
    studentMobileNumber: 9327142122,
    fatherMobileNumber: 9574562110,
    cityYourHometown: "Mahuva",
    district: "Bhavnagar",
    state: "Gujarat",
    dateOfBirth: "13/08/2000",
    age: 23,
    fatherName: "Ajadarhussain",
    motherName: "Nargis Khatun",
    address: "B-2 Sadat Colony, Near Jafari School Road, Mahuva",
    zipcode: 364290,
    passportSizeImage:
      "https://drive.google.com/open?id=1eRqP1fsbl8uava0rDC-7wCHPvI0E25DQ",
  });

  try {
    await newStudent.save();
    console.log("Sample student added successfully");
  } catch (error) {
    console.log("Error adding sample student:", error);
  }
};

export const updateFeesForAllStudents = async (req, res) => {
  console.log("Update Fees for all students function called");
  res.send("function called");
  try {
    const result = await Student.updateMany(
      {}, // Empty filter means match all documents
      { $set: { fees: 500 } } // Update fees field with 5000
    );
    console.log("result", result);
    if (result.modifiedCount > 0) {
      console.log(`${result.modifiedCount} students updated successfully.`);
      res.send(`${result.modifiedCount} students updated successfully.`);
    } else {
      console.log("No students were updated.");
      res.send("No students were updated.");
    }
  } catch (error) {
    console.error("Error updating fees:", error);
    res.send("Error updating fees:", error);
  }
};
