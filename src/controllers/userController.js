import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/schema/userSchema.js";

// User Registration
export const register = async (req, res) => {
  console.log("Registering user:", req.body);

  try {
    const { name, email, password, role, contactNumber } = req.body;

    // Validate required fields
    if (!name || !email || !password || !contactNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check for duplicate email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(409)
        .json({ message: "This email is already registered. Please use a different email." });
    }

    // Check for duplicate contact number
    // const existingContact = await User.findOne({ contactNumber });
    // if (existingContact) {
    //   return res
    //     .status(409)
    //     .json({ message: "This contact number is already registered. Please use a different contact number." });
    // }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "resident", // Default role is "resident"
      contactNumber,
    });

    // Save the user
    await newUser.save();

    // Generate JWT token
    // const token = jwt.sign(
    //   { userId: newUser._id, email: newUser.email, role: newUser.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1d" }
    // );

    // Send response with user details and token
    res.status(201).json({
      message: "User registered successfully",
      // token,
      // user: {
      //   id: newUser._id,
      //   name: newUser.name,
      //   email: newUser.email,
      //   role: newUser.role,
      //   contactNumber: newUser.contactNumber,
      //   profilePicture: newUser.profilePicture,
      //   createdAt: newUser.createdAt,
      // },
    });
  } catch (error) {
    // Handle duplicate key errors
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      const duplicateValue = error.keyValue[duplicateField];
      return res.status(409).json({
        message: `The ${duplicateField} "${duplicateValue}" is already registered. Please use a different ${duplicateField}.`,
      });
    }

    // Log server error and send generic response
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

// User Login
export const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Both email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set token as an HTTP-only cookie
    res
      .cookie("authToken", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production", // Ensures secure in production
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update User Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, contactNumber, profilePicture } = req.body;

    if (!name || !contactNumber) {
      return res
        .status(400)
        .json({ message: "Name and contact number are required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        name,
        contactNumber,
        profilePicture,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both current and new passwords are required" });
    }

    // Validate new password (e.g., minimum length)
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters" });
    }

    // Find user
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
