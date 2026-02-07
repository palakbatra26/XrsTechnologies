import crypto from "crypto";

const TOKEN_SECRET = process.env.CERT_TOKEN_SECRET || "xrs-default-secret";

export function hashToken(token) {
  return crypto.createHmac("sha256", TOKEN_SECRET).update(token).digest("hex");
}

export function timingSafeEqual(a, b) {
  const aBuffer = Buffer.from(String(a || ""));
  const bBuffer = Buffer.from(String(b || ""));

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}
