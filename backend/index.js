import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import lectureRoutes from "./routes/lectureRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// MUST be first
app.use(express.json());
app.use(cookieParser());

// CORRECT CORS CONFIG
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://see-again.madebyluka.com"
    ],
    credentials: true,
  })
);

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/lectures", lectureRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`)
}
);
