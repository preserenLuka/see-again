// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
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

export const User = mongoose.model("User", userSchema);