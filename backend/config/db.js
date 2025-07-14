import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://thimmarajut2005:H7Auv22Hn3sg5oqj@cluster0.fvivedd.mongodb.net/food-del"
    );
    console.log("✅DB connected");
  } catch (error) {
    console.error("❌ DB connection error:", error.message);
    process.exit(1); // stop server if DB connection fails
  }
};
