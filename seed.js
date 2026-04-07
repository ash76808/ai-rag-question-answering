require("dotenv").config();
const mongoose = require("mongoose");
const Doc = require("./models/Doc");

mongoose.connect(process.env.MONGO_URI);

const docs = [
  { title: "Refund Policy", content: "Refunds take 5-7 days", tags: ["refund"] },
  { title: "Shipping", content: "Delivery in 3-5 days", tags: ["shipping"] },
  { title: "Cancellation", content: "Cancel within 24 hours", tags: ["cancel"] },
  { title: "Support", content: "24/7 support available", tags: ["support"] },
  { title: "Warranty", content: "1 year warranty", tags: ["warranty"] }
];

async function seed() {
  await Doc.deleteMany();
  await Doc.insertMany(docs);
  console.log("Seed Done");
  process.exit();
}

seed();
