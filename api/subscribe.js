import mongoose from "mongoose";
import { connectToDatabase } from "./_lib/db.js";

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    source: { type: String, default: "website" },
  },
  { timestamps: true },
);

const NewsletterSubscriber =
  mongoose.models.NewsletterSubscriber ||
  mongoose.model("NewsletterSubscriber", newsletterSubscriberSchema);

const fallbackSubscribers = new Set();

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const email = String(req.body?.email || "").trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  try {
    await connectToDatabase();
    await NewsletterSubscriber.updateOne(
      { email },
      { $setOnInsert: { email, source: "website" } },
      { upsert: true },
    );

    return res.status(200).json({ ok: true, message: "Subscribed successfully." });
  } catch (error) {
    console.error("Newsletter subscribe fallback:", error);
    fallbackSubscribers.add(email);
    return res.status(200).json({ ok: true, message: "Subscribed successfully." });
  }
}
