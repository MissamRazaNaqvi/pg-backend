const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectMongoAtlas = require("./src/config/databaseConnection.js");
const route = require("./src/routes/studentRoutes.js");
const Student = require("./src/models/schema/studentSchema.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectMongoAtlas();

app.use("/", route);

// Sample POST route for file upload
app.post("/upload", (req, res) => {
  const formData = req.body;
  console.log("Request from frontend:", formData);
  res.send("Upload form received");
});

// Adding a new student (For testing purposes, this should be handled in a route/controller)
const addSampleStudent = async () => {
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

// Fetch all students (For testing purposes, this should be in a controller)
const fetchAllStudents = async () => {
  try {
    const students = await Student.find({});
    console.log("All students:", students, "Total students:", students.length);
  } catch (error) {
    console.log("Error fetching students:", error);
  }
};

// Uncomment these lines if you want to test adding or fetching students
// addSampleStudent();
// fetchAllStudents();

// Server start
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
