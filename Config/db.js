const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("اتصال به دیتابیس برقرار شد");
  } catch (err) {
    console.error(" خطا در اتصال به دیتابیس:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;