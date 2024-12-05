const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = "mongodb://localhost:27017/mydb"; // Replace 'mydb' with your database name
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema and model
const DataSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    enrollmentNumber: { type: Number, unique: true, required: true },
    rollNumber: { type: Number, unique: true, required: true },
    idProof: { type: String, required: true }, // e.g., Aadhaar, Passport, etc.
    proofIdNumber: { type: String, required: true },
    degreeYear: { type: Number, required: true },
    registrationDate: { type: Date, default: Date.now },
    startingYear: { type: Number, required: true },
    endYear: { type: Number, required: true },
    hostelCheckInTime: { type: String }, // Use "HH:mm:ss" or "HH:mm" format as String
    hostelCheckoutTime: { type: String },
    roomNumber: { type: Number },
    hostelName: { type: String },
    universityName: { type: String, required: true },
    department: { type: String, required: true },
    batch: { type: String }, // Example: "2024-2028"
    universityCheckInTime: { type: String },
    universityCheckOutTime: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    fatherOccupation: { type: String },
    motherOccupation: { type: String },
    fatherAge: { type: Number },
    motherAge: { type: Number },
    fatherMobileNumber: [{ type: String }], // Array of strings
    motherMobileNumber: [{ type: String }], // Array of strings
    siblingName: { type: String },
    siblingOccupation: { type: String },
    siblingAge: { type: Number },
    siblingMobileNumber: { type: String },
    currentAddress: { type: String },
    permanentAddress: { type: String },
    state: { type: String },
    city: { type: String },
    pinCode: { type: Number },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Data = mongoose.model("Data", DataSchema);

// API routes
app.post("/api/data", async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/data", async (req, res) => {
  try {
    const allData = await Data.find();
    const response = {
      status: "success",
      data: [],
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Start server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
