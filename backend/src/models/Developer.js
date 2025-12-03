import mongoose from "mongoose";

const developerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Frontend", "Backend", "Full-Stack"],
      required: true,
    },
    techStack: {
      type: [String], // array of techs
      default: [],
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export const Developer = mongoose.model("Developer", developerSchema);
