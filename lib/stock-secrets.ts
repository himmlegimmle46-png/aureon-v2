import crypto from "crypto";

const ENCRYPTED_PREFIX = "enc_v1:";

function getEncryptionKey() {
  const raw = process.env.STOCK_ENCRYPTION_KEY?.trim();
  if (!raw) return null;

  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) {
    throw new Error("STOCK_ENCRYPTION_KEY must be base64 for 32 bytes");
  }

  return key;
}

export function protectStockSecret(secret: string) {
  const key = getEncryptionKey();
  if (!key) return secret;

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(secret, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return `${ENCRYPTED_PREFIX}${iv.toString("base64")}:${authTag.toString("base64")}:${encrypted.toString(
    "base64"
  )}`;
}

export function revealStockSecret(secret: string) {
  if (!secret.startsWith(ENCRYPTED_PREFIX)) return secret;

  const key = getEncryptionKey();
  if (!key) {
    throw new Error("Missing STOCK_ENCRYPTION_KEY for encrypted stock item");
  }

  const payload = secret.slice(ENCRYPTED_PREFIX.length);
  const [ivPart, authTagPart, encryptedPart] = payload.split(":");

  if (!ivPart || !authTagPart || !encryptedPart) {
    throw new Error("Corrupt encrypted stock item");
  }

  const iv = Buffer.from(ivPart, "base64");
  const authTag = Buffer.from(authTagPart, "base64");
  const encrypted = Buffer.from(encryptedPart, "base64");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
}