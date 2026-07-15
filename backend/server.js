const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = 5000;

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Student Management System is running");
});

app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});