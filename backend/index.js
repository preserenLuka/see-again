import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
dotenv.config(); // load .env into process.env

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/users", userRoutes);

// Example health route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Use PORT from env, fallback to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));