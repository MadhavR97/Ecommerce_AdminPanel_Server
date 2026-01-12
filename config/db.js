const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const local = true;

    if (local) {
      await mongoose.connect(process.env.LOCAL_MONGODB_URL);
    }
    else {
      await mongoose.connect(process.env.ATLAS_MONGODB_URL);
    }
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
