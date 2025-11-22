import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    studyYear: { type: String, required: true},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

export const Class = mongoose.model("Class", classSchema);
