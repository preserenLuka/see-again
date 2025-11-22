import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    professor: { type: String, required: true},
    studyYear: { type: String, required: true},
    description: { type: String, required: true}
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

export const Class = mongoose.model("Class", classSchema);
