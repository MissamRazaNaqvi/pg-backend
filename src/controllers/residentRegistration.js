import Resident from "../models/schema/residentSchema.js"; // Ensure the correct path and file extension

export const residentRegistrations = async (req, res) => {
  console.log(req.body, "resident");
  const { residentMobileNumber, ...otherDetails } = req.body;
  console.log(residentMobileNumber, "residentMobileNumber");
  //   try {
  //     // Check if the resident already exists
  //     const existingResident = await Resident.findOne({ residentMobileNumber });
  //     if (existingResident) {
  //       return res.status(400).json({ message: "Resident already exists." });
  //     }

  //     // Create a new resident record
  //     const newResident = new Resident({
  //       residentMobileNumber,
  //       ...otherDetails,
  //     });

  //     await newResident.save();
  //     res.status(201).json({ message: "Resident registered successfully." });
  //   } catch (error) {
  //     res.status(500).json({ message: "Error registering resident.", error });
  //   }
};
