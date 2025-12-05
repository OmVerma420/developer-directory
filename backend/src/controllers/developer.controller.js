// controllers/developer.controller.js
import { Developer } from "../models/developer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// CREATE DEVELOPER
export const createDeveloper = asyncHandler(async (req, res) => {
  const data = req.validatedData; // 🔥 Clean validated data from Zod
  let photoURL = "";

  // Handle image upload
  if (req.file) {
    const uploaded = await uploadOnCloudinary(req.file.buffer);
    if (!uploaded?.secure_url) {
      throw new ApiError(400, "Image upload failed");
    }
    photoURL = uploaded.secure_url;
  }

  const dev = await Developer.create({
    ...data,
    photoURL,
    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, dev, "Developer created successfully"));
});

// GET DEVELOPERS (Search + Filter + Sort + Pagination)
export const getDevelopers = asyncHandler(async (req, res) => {
  const {
    search = "",
    role,
    sortBy = "experience",
    sortOrder = "desc",
    page = 1,
    limit = 10,
  } = req.query;

  const query = {};

  if (search) {
    query.$or = [
      { name: new RegExp(search, "i") },
      { techStack: new RegExp(search, "i") },
    ];
  }

  if (role) query.role = role;

  const skip = (Number(page) - 1) * Number(limit);

  const developers = await Developer.find(query)
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Developer.countDocuments(query);

  return res.status(200).json(
    new ApiResponse(200, {
      developers,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    })
  );
});

// GET SINGLE DEVELOPER
export const getDeveloperById = asyncHandler(async (req, res) => {
  const dev = await Developer.findById(req.params.id);

  if (!dev) throw new ApiError(404, "Developer not found");

  return res.status(200).json(new ApiResponse(200, dev));
});

// UPDATE DEVELOPER
export const updateDeveloper = asyncHandler(async (req, res) => {
  const dev = await Developer.findById(req.params.id);

  if (!dev) throw new ApiError(404, "Developer not found");

  // Only creator can edit
  if (dev.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized: You cannot edit this developer");
  }

  const data = req.validatedData; // 🔥 Validated + sanitized update data
  let photoURL = dev.photoURL;

  // If updating image
  if (req.file) {
    const uploaded = await uploadOnCloudinary(req.file.buffer);
    if (uploaded?.secure_url) photoURL = uploaded.secure_url;
  }

  const updatedDev = await Developer.findByIdAndUpdate(
    req.params.id,
    {
      ...data,
      photoURL,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedDev, "Developer updated successfully"));
});

// DELETE DEVELOPER
export const deleteDeveloper = asyncHandler(async (req, res) => {
  const dev = await Developer.findById(req.params.id);

  if (!dev) throw new ApiError(404, "Developer not found");

  if (dev.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized: You cannot delete this developer");
  }

  await dev.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Developer deleted successfully"));
});
