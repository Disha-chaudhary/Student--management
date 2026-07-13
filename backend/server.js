const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test Route
app.get("/", (req, res) => {
    res.send("Student Management System is running");
});

// User Routes
app.use("/api/users", userRoutes);
app.use("api/students",studentRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});