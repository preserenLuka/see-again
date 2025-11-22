// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";

import { Class } from "./models/Class.js";
import { Lecture } from "./models/Lecture.js";
import { User } from "./models/User.js"; // adjust path if needed

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 1) Find any existing user
    const user = await User.findOne();

    if (!user) {
      console.error(
        "❌ No users found in database. Create at least one user first, then run `npm run seed` again."
      );
      process.exit(1);
    }

    console.log(`👤 Using user ${user.email} (${user._id}) for seeding.`);

    // 2) Clear ALL classes & lectures
    await Promise.all([
      Class.deleteMany({}),
      Lecture.deleteMany({})
    ]);

    console.log("🧹 Cleared all Class & Lecture data");

    // 3) Create high school classes for this user
    const classes = await Class.insertMany([
      {
        name: "Matematika",
        studyYear: "2. letnik",
        user: user._id,
      },
      {
        name: "Slovenščina",
        studyYear: "2. letnik",
        user: user._id,
      },
      {
        name: "Fizika",
        studyYear: "2. letnik",
        user: user._id,
      }
    ]);

    console.log(`🌱 Inserted ${classes.length} classes`);

    // 4) Create lectures linked to those classes
    await Lecture.insertMany([
      {
        class: classes[0]._id,
        description: "Kvadratne funkcije",
        date: new Date("2024-09-15"),
        content: "Uvod v kvadratne funkcije, ničle, temena in graf.",
        topics: ["kvadratna funkcija", "graf", "ničle"]
      },
      {
        class: classes[0]._id,
        description: "Zaporedja in limite",
        date: new Date("2024-09-22"),
        content: "Osnovni primeri zaporedij in intuitiven pogled na limite.",
        topics: ["zaporedja", "limite"]
      },
      {
        class: classes[1]._id,
        description: "Lirska pesem v modernizmu",
        date: new Date("2024-10-01"),
        content: "Analiza izbranih pesmi in značilnosti modernistične lirike.",
        topics: ["lirika", "modernizem", "analiza besedila"]
      },
      {
        class: classes[2]._id,
        description: "Newtonovi zakoni",
        date: new Date("2024-10-05"),
        content: "Ponovitev treh Newtonovih zakonov in preprosti poskusi.",
        topics: ["mehanika", "Newtonovi zakoni"]
      }
    ]);

    console.log("🌱 Inserted lectures");
    console.log("✅ Seeding complete!");
    process.exit(0);

  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seed();
