const express = require("express");
const connectdb = require("./connection");
const multer = require("multer");
const Student = require("./models/student");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// MongoDB connections
connectdb();
// File upload setup

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

const upload = multer({ storage });

// POST routes
app.post(
  "/hostel-api/add-new-student",
  upload.single("userPhoto"),
  async (req, res) => {
    try {
      // const {
      //   studentName,
      //   age,
      //   gender,
      //   rollNumber,
      //   roomNumber,
      //   hostelName,
      //   department,
      //   batch,
      //   fatherName,
      //   motherName,
      //   fatherMobileNumber,
      //   motherMobileNumber,
      //   currentAddress,
      //   permanentAddress,
      //   state,
      //   city,
      //   pinCode,
      // } = req.body;

      // const userPhoto = req.file ? req.file.filename : null;

      // const student = new Student({
      //   studentName,
      //   age,
      //   gender,
      //   rollNumber,
      //   roomNumber,
      //   hostelName,
      //   department,
      //   batch,
      //   fatherName,
      //   motherName,
      //   fatherMobileNumber,
      //   motherMobileNumber,
      //   currentAddress,
      //   permanentAddress,
      //   state,
      //   city,
      //   pinCode,
      //   userPhoto,
      // });

      const { body, file } = req;
      const userPhoto = file?.filename || null;

      // Create a new student object dynamically
      const student = new Student({ ...body, userPhoto });

      await student.save();
      console.log(student);

      res.status(201).json({
        stauts: "success",
        message: "Your data have been saved successfully",
        data: student,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "An error occurred while saving student data.",
        error: error.message,
      });
    }
  }
);

// GET Route
app.get("/hostel-api/get-data", async (req, res) => {
  try {
    const allData = await Student.find();
    const response = {
      status: "success",
      data: allData,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET Route For particular student

app.get(
  "/hostel-api/get-student-data/rollNumber=:rollNumber",
  async (req, res) => {
    try {
      // const student = await Student.findOne(req.params.rollNumber).populate(
      //   "rollNumber"
      // );
      const { rollNumber } = req.params;
      const student = await Student.findOne({ rollNumber });

      console.log(student);
      if (!student) {
        return res.status(404).json({
          status: "error",
          message: `No student found with roll number: ${rollNumber}`,
        });
      }

      res.status(200).json({
        status: "success",
        message: "Data retrieved successfully",
        data: student,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "An error occurred while fetching student data.",
        error: error.message,
      });
    }
  }
);

// Start server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
