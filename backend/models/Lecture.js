// models/Lecture.js
import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    topics: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;   // add id
        delete ret._id;     // remove _id
        delete ret.__v;     // optional: remove __v
      }
    }
   }
);

export const Lecture = mongoose.model("Lecture", lectureSchema);