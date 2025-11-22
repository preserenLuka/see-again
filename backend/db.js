import mongoose from "mongoose";

export async function connectDB() {
  try {
    // process.env.MONGO_URI must be set in your .env file
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1); // stop the app if DB connection fails
  }
}