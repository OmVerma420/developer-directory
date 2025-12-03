import { Developer } from "../models/Developer.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createDeveloper = asyncHandler(async (req, res) => {
  const { name, role, techStack, experience } = req.body;

  if (!name || !role || experience === undefined) {
    throw new ApiError(400, "Name, role & experience are required");
  }

  const techArray = techStack
    ?.split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const dev = await Developer.create({
    name,
    role,
    techStack: techArray,
    experience: Number(experience),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, dev, "Developer created successfully"));
});

// GET Developers
export const getDevelopers = asyncHandler(async (req, res) => {
  const developers = await Developer.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, developers, "Developer list fetched"));
});
