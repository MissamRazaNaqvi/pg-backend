import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      trim: true,
      lowercase: true, // Normalize email to lowercase
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "pg_owner", "manager", "resident"], // Example roles
      default: "resident",
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true, // Ensure contact number is unique
      trim: true,
    },
    profilePicture: {
      type: String, // Store the URL or file path of the profile picture
    },
  },
  { timestamps: true } // Automatically create createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);

export { User };
