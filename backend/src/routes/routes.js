import express from "express";
import { createDeveloper, getDevelopers,} from "../controllers/DeveloperController.js";

const router = express.Router();

router.post("/", createDeveloper);
router.get("/", getDevelopers);

export default router;
