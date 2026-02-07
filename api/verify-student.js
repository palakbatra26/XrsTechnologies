import { connectToDatabase } from "./_lib/db.js";
import { Student } from "./_lib/models.js";
import { ensureSeeded, findStudentFallback } from "./_lib/seed.js";

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
    return res.status(405).json({ status: "invalid", message: "Method not allowed" });
  }

  const { roll_no, training } = req.body || {};

  if (!roll_no) {
    return res.status(400).json({ status: "invalid", message: "Roll number is required." });
  }

  try {
    await connectToDatabase();
    await ensureSeeded();

    const student = await Student.findOne({ roll_no }).lean();

    if (student) {
      return res.status(200).json({ status: "valid", student });
    }

    if (!training) {
      return res.status(404).json({ status: "need_training" });
    }

    const matchByTraining = await Student.findOne({ training }).lean();
    if (!matchByTraining) {
      return res.status(404).json({ status: "invalid" });
    }

    return res.status(200).json({ status: "valid", student: matchByTraining });
  } catch (error) {
    console.error("Student verification fallback:", error);

    const fallback = findStudentFallback(roll_no, training);
    if (fallback.status === "valid") {
      return res.status(200).json({ status: "valid", student: fallback.student });
    }
    if (fallback.status === "need_training") {
      return res.status(404).json({ status: "need_training" });
    }
    return res.status(404).json({ status: "invalid" });
  }
}
