const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const local = true;

    if (local) {
      await mongoose.connect(process.env.LOCAL_MONGODB_URL);
      console.log("MongoDB Local connected successfully");
    }
    else {
      await mongoose.connect('mongodb+srv://madhavrathod019_db_user:Madhav8200@mycluster.rapwi51.mongodb.net/?appName=MyCluster');
      console.log("MongoDB Atlas connected successfully");
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
