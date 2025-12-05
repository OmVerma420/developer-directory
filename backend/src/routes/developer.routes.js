import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  developerCreateSchema,
  developerUpdateSchema,
} from "../validators/developer.schema.js";

import {
  createDeveloper,
  getDevelopers,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper,
} from "../controllers/developer.controller.js";

const router = express.Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getDevelopers)
  .post(upload.single("photo"), validate(developerCreateSchema), createDeveloper);

router
  .route("/:id")
  .get(getDeveloperById)
  .put(upload.single("photo"), validate(developerUpdateSchema), updateDeveloper)
  .delete(deleteDeveloper);

export default router;
