require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const transporter = require("../Config/mailer");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const trimmedEmail = email.toString().toLowerCase().trim();

    const trimmedPassword = password.toString().trim();

    const existingUser = await User.findOne({ email: trimmedEmail });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      name,
      email: trimmedEmail,
      password: trimmedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // for dupicate handles
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error("Error in register:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    // handle missing fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const trimmedEmail = email.toString().toLowerCase().trim();
    const trimmedPassword = password.toString().trim();

    // Find user
    const user = await User.findOne({ email: trimmedEmail }).select(
      "+password"
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(
      trimmedPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      token,
      user: { email: user.email, password: user.password, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//  /api/auth/forgot-password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Link",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Failed to send email" });
      }
      return res.json({ message: "Reset link sent to email!" });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//  /api/auth/reset-password/:token
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("+password");

    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    // trigger the pre-save hook
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error in reset-password:", err);
    const message =
      err instanceof jwt.JsonWebTokenError
        ? "Invalid or expired token"
        : "Internal server error";
    res.status(400).json({ message });
  }
});

module.exports = router;