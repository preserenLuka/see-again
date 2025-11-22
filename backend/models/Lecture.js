// models/Lecture.js
import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    transcript: {
      type: String,
      required: true,
    },
    topics: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Lecture = mongoose.model("Lecture", lectureSchema);