require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require("../Routes/authRoutes");
const socketIo = require("socket.io");
const quizData = require("../Data/quizData");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// for auth routes
app.use("/api/auth", authRoutes);

mongoose.set("strictQuery", true);
// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb+srv://chandrakant:RtvJ88kNNLV3bFCR@cluster0.pqrx0gn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware to serve static frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "..", "..", "Frontend")));

// serve pages
app.get("/data/coursevideo.json", (req, res) => {
  res.sendFile(path.join(__dirname, "../Data/coursevideo.json"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../Frontend/Html/index.html"));
});

app.get("/reset-password", (req, res) => {
  res.sendFile(path.join(__dirname, "../../Frontend/Html/reset-password.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../Frontend/Html/login.html"));
});

let scores = {};

// server.js
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", ({ username, category }) => {
    console.log(`${username} joined quiz in category: ${category}`);

    // Initialize user score
    scores[socket.id] = { username, score: 0 };

    // Get questions for category
    const questions = quizData[category] || [];
    const duration = 1800; // 30 minutes

    // Send questions to client
    socket.emit("quizData", { questions, duration });

    // Broadcast updated scores
    io.emit("scoreUpdate", scores);
  });

  socket.on("submitAnswer", ({ index, selected, correct }) => {
    if (scores[socket.id] && selected === correct) {
      scores[socket.id].score += 1;
    }
    io.emit("scoreUpdate", scores);
  });

  socket.on("disconnect", () => {
    delete scores[socket.id];
    io.emit("scoreUpdate", scores);
  });
});

// Server Listen
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});