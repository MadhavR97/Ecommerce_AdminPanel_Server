const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const local = true;

    if (local) {
      await mongoose.connect(process.env.LOCAL_MONGODB_URL);
      console.log("MongoDB Local connected successfully");
    }
    else {
      await mongoose.connect(process.env.ATLAS_MONGODB_URI);
      console.log("MongoDB Atlas connected successfully");
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
