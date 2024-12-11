import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: ['Single', 'Double', 'Triple'], required: true },
    rent: { type: Number, required: true },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // References to Students
    status: { type: String, enum: ['Available', 'Occupied'], default: 'Available' }
  });

export default mongoose.model("RoomCollection", roomSchema);