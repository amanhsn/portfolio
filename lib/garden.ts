import "server-only";
import { createHash, createHmac, randomUUID, timingSafeEqual } from "crypto";

/**
 * Identity helpers for the /playground "leave a mark" canvas submissions.
 * One submission per person is enforced two ways: a signed httpOnly cookie
 * (per browser) and a hashed IP (per network). Nothing here is reversible -
 * we only ever store one-way hashes, never raw IPs.
 */

const SECRET = process.env.MARK_SECRET ?? "";

export function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export function newId(): string {
  return randomUUID();
}

/** Sign a UUID as `uuid.hmac` for the cookie value. */
export function signId(uuid: string): string {
  const sig = createHmac("sha256", SECRET).update(uuid).digest("hex");
  return `${uuid}.${sig}`;
}

/** Verify a `uuid.hmac` cookie value, returning the UUID or null. */
export function verifyId(value: string | undefined): string | null {
  if (!value) return null;
  const dot = value.lastIndexOf(".");
  if (dot <= 0) return null;
  const uuid = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expected = createHmac("sha256", SECRET).update(uuid).digest("hex");
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length === b.length && timingSafeEqual(a, b)) return uuid;
  } catch {
    /* fall through */
  }
  return null;
}

export function idHashFromUuid(uuid: string): string {
  return sha256(`mark-id:${uuid}`);
}

export function ipHashFromIp(ip: string): string {
  return sha256(`mark-ip:${ip}:${SECRET}`);
}

/** Whether submissions are wired up (Blob token + signing secret present). */
export function gardenConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN && process.env.MARK_SECRET);
}
