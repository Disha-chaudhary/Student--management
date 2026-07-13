const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    rollNumber: {
      type: Number,
      required: true,
      unique: true
    },
    department: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true,
  }
);
const Student = mongoose.model("Student",studentSchema)
module.exports = Student;