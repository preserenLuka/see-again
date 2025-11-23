// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";

import { Class } from "./models/Class.js";
import { Lecture } from "./models/Lecture.js";
import { User } from "./models/User.js"; // adjust path if needed
import bcrypt from "bcrypt";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 1) Find any existing user
    await Promise.all([
      User.deleteMany({}),
      Class.deleteMany({}),
      Lecture.deleteMany({})
    ]);

    const beforeHashedPasword = "pupil12345"
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(beforeHashedPasword, saltRounds);

    const user = await User.create({
      email: "nikkatleban@gmail.com",
      firstName: "Nik",
      lastName: "Leban",
      password: hashedPassword,
    })

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
      },
      {
        name: "Geografija",
        studyYear: "2. letnik",
        user: user._id,
      },
      {
        name: "Računalništvo",
        studyYear: "2. letnik",
        user: user._id,
      },
      {
        name: "Zgodovina",
        studyYear: "2. letnik",
        user: user._id,
      }
    ]);

    console.log(`🌱 Inserted ${classes.length} classes`);

    // 4) Create lectures linked to those classes
    await Lecture.insertMany([
    // MATEMATIKA
    {
      title: "Kvadratne funkcije – uvod",
      class: classes[0]._id,
      description: "Osnovne značilnosti kvadratnih funkcij in njihovih grafov.",
      date: new Date("2024-07-15"),
      content: "Pregled splošne oblike kvadratne funkcije, določanje ničel, temena ter lastnosti grafa.",
      topics: ["kvadratna funkcija", "graf", "ničle"]
    },
    {
      title: "Zaporedja in uvod v limite",
      class: classes[0]._id,
      description: "Intuitiven uvod v zaporedja in obnašanje njihovih vrednosti.",
      date: new Date("2024-08-22"),
      content: "Razlaga monotoničnosti, omejenosti in približevanja limiti skozi primere.",
      topics: ["zaporedja", "limite"]
    },
    {
      title: "Linearne funkcije – analiza grafa",
      class: classes[0]._id,
      description: "Ponovitev linearnih funkcij in pomen smernega koeficienta.",
      date: new Date("2024-10-01"),
      content: "Analiza vpliva koeficientov, uporaba v realnih problemih in risanje grafa.",
      topics: ["linearne funkcije", "graf", "algebra"]
    },
    {
      title: "Sistemi enačb – reševanje",
      class: classes[0]._id,
      description: "Metode reševanja sistemov dveh enačb z dvema neznankama.",
      date: new Date("2024-10-15"),
      content: "Grafični, substitucijski in eliminacijski postopek s praktičnimi nalogami.",
      topics: ["sistemi enačb", "algebra"]
    },

    // SLOVENŠČINA
    {
      title: "Lirska pesem v modernizmu",
      class: classes[1]._id,
      description: "Značilnosti in razvoj lirske pesmi v modernizmu.",
      date: new Date("2024-10-01"),
      content: "Analiza modernističnih pesmi, slogovne prvine in literarna interpretacija.",
      topics: ["lirika", "modernizem"]
    },
    {
      title: "Epika – pripovedni elementi",
      class: classes[1]._id,
      description: "Pregled ključnih prvin epskega besedila.",
      date: new Date("2024-11-10"),
      content: "Analiza pripovedovalca, fabule, lika in prostora s primeri iz znane literature.",
      topics: ["epika", "pripovedništvo"]
    },
    {
      title: "Slovenski jezik – sklanjatev samostalnikov",
      class: classes[1]._id,
      description: "Pregled sklanjatvenih vzorcev v slovenščini.",
      date: new Date("2024-12-18"),
      content: "Trening sklanjanja moškega, ženskega in srednjega spola; pogoste napake.",
      topics: ["slovenščina", "slovnica"]
    },

    // FIZIKA
    {
      title: "Newtonovi zakoni – ponovitev in uporaba",
      class: classes[2]._id,
      description: "Pregled osnov mehanike in treh Newtonovih zakonov.",
      date: new Date("2024-10-05"),
      content: "Razlaga zakonov, praktični primeri in fizikalni modelni primeri.",
      topics: ["mehanika", "Newtonovi zakoni"]
    },
    {
      title: "Delo in energija",
      class: classes[2]._id,
      description: "Osnovni pojmi energije in dela.",
      date: new Date("2024-10-15"),
      content: "Povezava med silo, razdaljo in energijo; pretvarjanje in ohranitveni zakoni.",
      topics: ["energija", "mehanika"]
    },
    {
      title: "Valovanje – osnovni pojmi",
      class: classes[2]._id,
      description: "Uvod v mehansko in elektromagnetno valovanje.",
      date: new Date("2024-11-25"),
      content: "Lastnosti valov, hitrost, frekvenca, interferenca, resonanca.",
      topics: ["valovanje", "fizika"]
    },

    // GEOGRAFIJA
    {
      title: "Nastanek reliefa",
      class: classes[3]._id,
      description: "Pregled notranjih in zunanjih procesov oblikovanja površja.",
      date: new Date("2024-09-20"),
      content: "Tektonske plošče, vulkanizem, erozija in sedimentacija.",
      topics: ["relief", "tektonika"]
    },
    {
      title: "Podnebni tipi sveta",
      class: classes[3]._id,
      description: "Razlaga glavnih klimatskih območij.",
      date: new Date("2024-10-30"),
      content: "Primerjava tropskega, suhega, zmernega in polarnega podnebja.",
      topics: ["podnebje", "geografija"]
    },
    {
      title: "Geografske karte – branje in raba",
      class: classes[3]._id,
      description: "Kako beremo karto in uporabljamo zemljevidne projekcije.",
      date: new Date("2024-11-12"),
      content: "Merila, simboli, projekcije, orientacija in topografske karte.",
      topics: ["karte", "navigacija"]
    },

    // RAČUNALNIŠTVO
    {
      title: "Osnove programiranja – spremenljivke",
      class: classes[4]._id,
      description: "Uvod v temeljne strukture programiranja.",
      date: new Date("2024-09-18"),
      content: "Kaj so spremenljivke, tipi podatkov in kako jih uporabljamo v programih.",
      topics: ["programiranje", "osnove"]
    },
    {
      title: "Algoritmi – miselni postopki",
      class: classes[4]._id,
      description: "Razumevanje koncepta algoritma in logičnega razmišljanja.",
      date: new Date("2024-09-25"),
      content: "Pisanje algoritmov v psevdokodi, diagrami poteka in optimizacija.",
      topics: ["algoritmi", "logika"]
    },
    {
      title: "Spletne tehnologije – HTML & CSS",
      class: classes[4]._id,
      description: "Osnovni gradniki spletnih strani.",
      date: new Date("2024-10-05"),
      content: "Struktura HTML dokumenta, osnovni CSS selektorji in oblikovanje elementov.",
      topics: ["html", "css", "splet"]
    },

    // ZGODOVINA
    {
      title: "Stari Egipt – družba in kultura",
      class: classes[5]._id,
      description: "Civilizacija ob Nilu skozi ključne zgodovinske faze.",
      date: new Date("2024-09-10"),
      content: "Faraoni, religija, pisava, piramide in razvoj trgovine.",
      topics: ["egipt", "civilizacije"]
    },
    {
      title: "Grčija – rojstno mesto demokracije",
      class: classes[5]._id,
      description: "Pregled političnega razvoja stare Grčije.",
      date: new Date("2024-09-20"),
      content: "Atenska demokracija, Šparta, kultura in filozofija.",
      topics: ["Grčija", "demokracija"]
    },
    {
      title: "Srednji vek – fevdalizem",
      class: classes[5]._id,
      description: "Družbena ureditev in politični sistem v srednjem veku.",
      date: new Date("2024-10-01"),
      content: "Fevdalni odnos, vloga cerkve, kmetje, gradovi in zaščita.",
      topics: ["srednji vek", "fevdalizem"]
    },
    {
      title: "Industrijska revolucija",
      class: classes[5]._id,
      description: "Tehnološki napredek 18. in 19. stoletja.",
      date: new Date("2024-10-15"),
      content: "Parni stroji, tovarne, urbanizacija in družbene spremembe.",
      topics: ["industrija", "revolucija"]
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
