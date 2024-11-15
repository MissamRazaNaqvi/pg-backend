import Student from "../models/schema/studentSchema.js";

// Define key mapping from keysArray
const keysArray = [
  {
    firstName: "firstName",
    lastName: "lastName",
    fees: "fees",
    Timestamp: "timestamp",
    "Email address": "emailAddress",
    "Room no": "roomNo",
    courseName: "courseName",
    Semester: "semester",
    studentMobileNumber: "studentMobileNumber",
    "Father Mobile Number": "fatherMobileNumber",
    "City Your Hometown": "cityYourHometown",
    District: "district",
    State: "state",
    "Date of Birth": "dateOfBirth",
    age: "age",
    "Father Name": "fatherName",
    "Mother Name": "motherName",
    address: "address",
    Zipcode: "zipcode",
    "Last Fees Paid Date": "lastFeesPaidDate",
    "Medical History (Your Answer)": "medicalHistory",
    "Police Verification Certificate (Mandatory)":
      "policeVerificationCertificate",
    "Extra Curricular Activities (sport": "extraCurricularActivities",
    "Vehicle Number (if you have)": "vehicleNumber",
    "Joining Date": "joiningDate",
    "Last College": "lastCollege",
    "Aadhar Card": "aadharCard",
    "passport size image": "passportSizeImage",
  },
];

// Convert keysArray to a key-value mapping object for easy lookup
const keyMapping = keysArray[0]; // Since it's an array with a single object, just use the first item

// Function to update keys in all documents
export const updateAllFields = async () => {
  console.log("function call", keyMapping);
  try {
    // Fetch all documents from the Student collection
    const students = await Student.find();
    // Loop through each student document
    for (const student of students) {
      // Create an object to store the updated document
      const updatedStudent = {};

      // Iterate through the student document and map old keys to new keys
      Object.keys(student.toObject()).forEach((key) => {
        // Map the old key to the new key using keyMapping
        console.log(keyMapping[key], "hey");
        const newKey = keyMapping[key] || key; // If no mapping found, retain original key
        updatedStudent[newKey] = student[key];
        // console.log(updatedStudent, "updatedStudent");
      });

      // Update the document in the database with the new keys
      await Student.updateMany({ _id: student._id }, { $set: updatedStudent });
    }

    console.log("All documents updated successfully!");
  } catch (error) {
    console.error("Error updating documents:", error);
  }
};
