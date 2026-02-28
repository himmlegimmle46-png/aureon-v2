import crypto from "crypto";

function getDeliverySecret() {
  const secret = process.env.DELIVERY_LINK_SECRET?.trim();
  if (!secret) {
    throw new Error("Missing DELIVERY_LINK_SECRET");
  }
  return secret;
}

export function createDeliveryToken(sessionId: string, customerEmail: string) {
  const hmac = crypto.createHmac("sha256", getDeliverySecret());
  hmac.update(`${sessionId}:${customerEmail.toLowerCase()}`);
  return hmac.digest("hex");
}

export function isValidDeliveryToken(
  token: string | null | undefined,
  sessionId: string,
  customerEmail: string
) {
  if (!token) return false;

  const expected = createDeliveryToken(sessionId, customerEmail);
  const actual = token.trim();

  if (expected.length !== actual.length) return false;

  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(actual));
  } catch {
    return false;
  }
}