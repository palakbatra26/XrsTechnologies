import { connectToDatabase } from "../_lib/db.js";
import { Certificate, CertificateScan } from "../_lib/models.js";
import { ensureSeeded } from "../_lib/seed.js";
import { hashToken, timingSafeEqual } from "../_lib/security.js";
import { isRateLimited } from "../_lib/rateLimit.js";

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function getRequestMetadata(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : (forwardedFor || "").split(",")[0].trim() || req.socket?.remoteAddress || "unknown";

  return {
    ip,
    userAgent: req.headers["user-agent"] || "",
    referrer: req.headers.referer || req.headers.referrer || "",
  };
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ status: "invalid", message: "Method not allowed" });
  }

  const certId = req.query?.certId;
  const token = req.query?.token || "";

  if (!certId) {
    return res.status(400).json({ status: "invalid", message: "Certificate ID is required." });
  }

  const { ip, userAgent, referrer } = getRequestMetadata(req);
  const rateKey = `${ip}:${certId}`;

  if (isRateLimited(rateKey)) {
    return res.status(429).json({ status: "rate_limited" });
  }

  try {
    await connectToDatabase();
    await ensureSeeded();

    const certificate = await Certificate.findOne({ certId }).lean();

    if (!certificate || !token) {
      return res.status(404).json({ status: "invalid" });
    }

    await CertificateScan.create({
      certId,
      scannedAt: new Date(),
      ip,
      userAgent,
      meta: { referrer },
    });

    const tokenHash = hashToken(token);
    const tokenValid = timingSafeEqual(tokenHash, certificate.tokenHash);
    const isActive = certificate.status === "active";

    if (!tokenValid || !isActive) {
      return res.status(403).json({ status: "invalid" });
    }

    return res.status(200).json({ status: "valid", certificate });
  } catch (error) {
    console.error("Certificate verify API error:", error);
    return res.status(500).json({ status: "invalid", message: "Server error" });
  }
}
