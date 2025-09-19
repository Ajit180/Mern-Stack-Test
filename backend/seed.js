import dotenv from "dotenv";
import connectdb from "./config/db.js";
import Statement from "./model/statement.js";

dotenv.config();

const seedStatements = [
  { text: "She dont like icecream." },
  { text: "They is playing football." },
  { text: "He go to market yesterday." },
  { text: "I has a pen." },
  { text: "We was happy yesterday." },
  { text: "Its raining cats and dog." },
  { text: "He run very fastly." },
  { text: "This are my books." },
  { text: "The boy play in park." },
  { text: "She have two brother." }
];

const seedDB = async () => {
  try {
    await connectdb(); // ✅ using your same db connection
    await Statement.deleteMany(); // clear old data
    await Statement.insertMany(seedStatements); // insert new data
    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding DB:", err);
    process.exit(1);
  }
};

seedDB();
