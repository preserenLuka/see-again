import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    description: { type: String}
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

export const Topic = mongoose.model("Topic", topicSchema);