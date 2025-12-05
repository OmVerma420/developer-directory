// controllers/auth.controller.js
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessToken = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    return accessToken;
  } catch (error) {
    console.error("Token generation error:", error.message);
    throw new ApiError(
      500,
      "Something went wrong while generating the access token"
    );
  }
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (
    !name ||
    !email ||
    !password ||
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !password.trim()
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: password.trim(),
  });

  const createdUser = await User.findById(user._id).select("-password -accessToken");
  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while registering the user"
    );
  }

  // (Optional) Auto-login after register
  const accessToken = await generateAccessToken(createdUser._id);

  // Cookie options
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user: createdUser,
          accessToken,
        },
        "User registered successfully"
      )
    );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password.trim()
  ) {
    throw new ApiError(400, "Email and password are required");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (!existingUser) {
    throw new ApiError(400, "Invalid email or password");
  }

  const match = await existingUser.isPasswordCorrect(password);
  if (!match) {
    throw new ApiError(400, "Invalid email or password");
  }

  const user = await User.findById(existingUser._id).select("-password -accessToken");

  const accessToken = await generateAccessToken(user._id);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user,
          accessToken,
        },
        "User logged in successfully"
      )
    );
});

export const logout = asyncHandler(async (req, res) => {
  // Clear token cookie
  return res
    .status(200)
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    })
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

