const mongoose = require("mongoose");

// Define a schema and model
const DataSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    rollNumber: { type: Number, unique: true, required: true },
    roomNumber: { type: Number },
    hostelName: { type: String },
    department: { type: String, required: true },
    batch: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    fatherMobileNumber: [{ type: String }],
    motherMobileNumber: [{ type: String }],
    currentAddress: { type: String },
    permanentAddress: { type: String },
    state: { type: String },
    city: { type: String },
    pinCode: { type: Number },
    userPhoto: { type: String },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", DataSchema, "studentdb");
module.exports = Student;
