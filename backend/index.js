import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import lectureRoutes from "./routes/lectureRoute.js";
import cookieParser from "cookie-parser";
import seed from "./seed.js"

dotenv.config(); // load .env into process.env

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173",               // your local frontend
      "https://see-again.madebyluka.com",    // your custom domain
      "https://see-again-production.up.railway.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/lectures", lectureRoutes);

// Example health route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Use PORT from env, fallback to 5000
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  seed();
});
