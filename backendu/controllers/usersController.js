import User from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;



export const addUser = async (req, res) => {
  // Function to get a random avatar from the DiceBear Croodles API
  const getRandomAvatar = (name) => {
    // Use the name as the seed to ensure the avatar is consistent for the same user
    return `https://api.dicebear.com/6.x/croodles/svg?seed=${name}`; // Specify Croodles as the style
  };

  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Validate password criteria
    if (password.length < 8) {
      return res.status(400).json({ message: "Password is too short" });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: "Name is too short" });
    }
    if (!password.match(/[0-9]/)) {
      return res
        .status(400)
        .json({ message: "Password must include a number" });
    }
    if (!password.match(/[a-zA-Z]/)) {
      return res
        .status(400)
        .json({ message: "Password must include a letter" });
    }
    if (!password.match(/[!@#$%^&*]/)) {
      return res
        .status(400)
        .json({ message: "Password must include a special character" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random avatar URL using the Croodles style
    const avatarUrl = getRandomAvatar(name); // Use the name as the seed for consistency

    // Create the new user (MongoDB automatically generates _id)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatarUrl: avatarUrl, // Use the generated avatar URL
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: "User added successfully", avatarUrl });
  } catch (error) {
    console.error("Error adding user:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if JWT_SECRET is defined
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not defined" });
    }

    // Create a JWT token with necessary information
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    const seller = await User.findOne({ email: user.email });
    console.log("users email is: ", seller.email);
    // Return the token to the client
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Login Error:", error.message); // Debugging statement
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // Assuming req.user contains the user ID or the user object
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Assuming you have a User model to fetch user details from the database
    const userProfile = await User.findById(user.userId).select(
      "name email userId avatarUrl createdAt "
    ); // Fetching only specific fields

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("getUserProfile from backend", userProfile);
    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error); // Added for better debugging
    res.status(500).json({ error: error.message });
  }
};

