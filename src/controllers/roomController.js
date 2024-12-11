import roomSchema from "../models/schema/roomSchema.js";

const sampleRooms = [
    {
      roomNumber: "1001",
      type: "Single",
      rent: 10000,
      managerId: "65abc1234567890abcdef001",  // Replace with actual ObjectId
      occupants: ["65abc1234567890abcdef201"], // Replace with actual Student ObjectIds
      status: "Occupied"
    },
    {
      roomNumber: "1002",
      type: "Double",
      rent: 15000,
      managerId: "65abc1234567890abcdef001",
      occupants: ["65abc1234567890abcdef202", "65abc1234567890abcdef203"],
      status: "Occupied"
    },
    {
      roomNumber: "1003",
      type: "Single",
      rent: 9000,
      managerId: "65abc1234567890abcdef001",
      occupants: [],
      status: "Available"
    }
  ];

export const addRoom = async (req, res) => {
    console.log(req.body,"data from frontend")
//   try {
    // const response = await roomSchema
    //   .insertMany(sampleRooms)
    //   .then((docs) => {
    //     console.log( docs,"Rooms Inserted:");
    //  // Close connection after insertion
    //   })
    //   .catch((err) => {
    //     console.error("Insertion Error:", err);
    //   });
    // console.log("All students:", students, "Total students:", students.length);
//   } catch (error) {
//     console.log("Error fetching students:", error);
//   }
};
