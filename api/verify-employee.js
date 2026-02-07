import { connectToDatabase } from "./_lib/db.js";
import { Employee } from "./_lib/models.js";
import { ensureSeeded, findEmployeeFallback } from "./_lib/seed.js";

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

  const { empId, email } = req.body || {};

  if (!empId) {
    return res.status(400).json({ status: "invalid", message: "Employee ID is required." });
  }

  try {
    await connectToDatabase();
    await ensureSeeded();

    const employee = await Employee.findOne({ empId }).lean();

    if (employee) {
      return res.status(200).json({ status: "valid", employee });
    }

    if (!email) {
      return res.status(404).json({ status: "need_email" });
    }

    const matchByEmail = await Employee.findOne({ email }).lean();
    if (!matchByEmail) {
      return res.status(404).json({ status: "invalid" });
    }

    return res.status(200).json({ status: "valid", employee: matchByEmail });
  } catch (error) {
    console.error("Employee verification fallback:", error);

    const fallback = findEmployeeFallback(empId, email);
    if (fallback.status === "valid") {
      return res.status(200).json({ status: "valid", employee: fallback.employee });
    }
    if (fallback.status === "need_email") {
      return res.status(404).json({ status: "need_email" });
    }
    return res.status(404).json({ status: "invalid" });
  }
}
