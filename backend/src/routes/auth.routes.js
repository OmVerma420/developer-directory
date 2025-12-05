import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected logout
router.post("/logout", verifyJWT, logout);

export default router;
