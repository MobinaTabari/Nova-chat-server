const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect to dataBase");
  } catch (err) {
    console.error("Failed to connect dataBase :", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;