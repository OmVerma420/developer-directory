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
      type: [String],
      default: [],
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    photoURL: {
      type: String,
      trim: true,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Developer = mongoose.model("Developer", developerSchema);
