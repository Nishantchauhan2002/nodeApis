const mongoose = require("mongoose");

const connectDb = () => {
  const mongoURI = "mongodb://localhost:27017/hosteldb";
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = connectDb;
