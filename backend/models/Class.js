import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    professor: { type: String, required: true},
    studyYear: { type: String, required: true},
    description: { type: String, required: true},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Class = mongoose.model("Class", classSchema);
