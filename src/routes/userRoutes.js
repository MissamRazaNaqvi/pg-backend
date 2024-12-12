import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/userController.js"; // Import user controller methods

const router = express.Router(); // Initialize router

// Define routes and link them to controller methods
router.post("/register", register); // Register user
router.post("/login", login); // Login user
router.get("/profile", getProfile); // Get user profile
router.put("/profile", updateProfile); // Update user profile
router.put("/change-password", changePassword); // Change user password

export default router; // Export router to be used in the index.js
