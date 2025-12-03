import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/utils/db.js";
import developerRoutes from "./src/routes/routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/developers", developerRoutes);


