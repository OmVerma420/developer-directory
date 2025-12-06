import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/utils/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import developerRoutes from "./src/routes/developer.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/developers", developerRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running ");
});

// DB
connectDB()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((err) => {
    console.error("Database connection failed in index.js:", err);
  });

export default app;