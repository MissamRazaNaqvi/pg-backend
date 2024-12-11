import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser); // User Registration
router.post("/login", loginUser); // User Login

// Protected Routes (Requires Authentication)
router.get("/profile", authMiddleware, getUserProfile); // Get User Profile
router.put("/profile", authMiddleware, updateUserProfile); // Update User Profile

export default router;
