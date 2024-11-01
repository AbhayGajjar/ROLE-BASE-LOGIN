const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../services/sendMail");
const { registerEmail } = require("../services/RegisterTemplate");
require("dotenv").config();

// Create a new user
const createUser = async (req, res) => {
  const { name, email, password, age, role } = req.body;

  // Check if the user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user with a role
  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
    age,
    role: role || "user", // Default role is 'user'
  });

  sendMail(email, "", registerEmail(name));

  // Generate a JWT token with user role information
  const token = jwt.sign(
    { userId: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("token", token);
  res.json({ message: "User created successfully", user: newUser });

  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const allusers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//delete users

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, role } = req.body;

    // Find the user by ID
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only allowed fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;

    // Only allow admin to change the user's role
    if (role && req.user.role === "admin") {
      user.role = role;
    } else if (role) {
      return res
        .status(403)
        .json({ message: "You are not authorized to change roles" });
    }

    // Save the updated user
    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//login user
// controllers/authController.js

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send the token in the response (without setting a cookie)
    res.json({ message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/authController.js

const logoutUser = (req, res) => {
  res.clearCookie("token"); // Clear the JWT cookie
  res.json({ message: "Logout successful" });
};

module.exports = {
  deleteUser,
  createUser,
  allusers,
  updateUser,
  loginUser,
  logoutUser,
};
