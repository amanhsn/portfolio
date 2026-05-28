import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { put, list } from "@vercel/blob";
import {
  newId,
  signId,
  verifyId,
  idHashFromUuid,
  ipHashFromIp,
  gardenConfigured,
} from "@/lib/garden";

/**
 * POST /api/garden - accept one drawing submission per person.
 * Lock = signed httpOnly cookie (per browser) + hashed IP (per network).
 * Drawings + metadata land in Vercel Blob; the blob's existence IS the lock.
 */

export const dynamic = "force-dynamic";

const MAX_BYTES = 1.6 * 1024 * 1024; // ~1.6MB PNG cap
const YEAR = 60 * 60 * 24 * 365;
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

async function blobExists(pathname: string): Promise<boolean> {
  const { blobs } = await list({ prefix: pathname, limit: 1, token: TOKEN });
  return blobs.some((b) => b.pathname === pathname);
}

async function setIdentityCookies(uuid: string) {
  const jar = await cookies();
  const secure = process.env.NODE_ENV === "production";
  jar.set("mark_id", signId(uuid), {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: YEAR,
  });
  // Non-httpOnly companion so the client can show the locked state on load.
  jar.set("mark_done", "1", {
    httpOnly: false,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: YEAR,
  });
}

export async function POST(req: NextRequest) {
  if (!gardenConfigured()) {
    return NextResponse.json(
      { error: "Submissions aren't wired up yet." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const name =
    typeof (body as { name?: unknown })?.name === "string"
      ? (body as { name: string }).name.trim()
      : "";
  const dataUrl =
    typeof (body as { dataUrl?: unknown })?.dataUrl === "string"
      ? (body as { dataUrl: string }).dataUrl
      : "";

  if (name.length < 1 || name.length > 40) {
    return NextResponse.json(
      { error: "Name must be 1 to 40 characters." },
      { status: 400 },
    );
  }

  const match = /^data:image\/png;base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
  if (!match) {
    return NextResponse.json({ error: "Invalid drawing." }, { status: 400 });
  }
  const buf = Buffer.from(match[1], "base64");
  if (buf.length === 0) {
    return NextResponse.json({ error: "Drawing is empty." }, { status: 400 });
  }
  if (buf.length > MAX_BYTES) {
    return NextResponse.json({ error: "Drawing is too large." }, { status: 413 });
  }

  // Identity
  const jar = await cookies();
  const hdrs = await headers();
  const ip =
    (hdrs.get("x-forwarded-for") ?? "").split(",")[0].trim() || "0.0.0.0";
  const uuid = verifyId(jar.get("mark_id")?.value) ?? newId();
  const idHash = idHashFromUuid(uuid);
  const ipHash = ipHashFromIp(ip);

  const drawingPath = `garden/drawings/${idHash}.png`;
  const metaPath = `garden/drawings/${idHash}.json`;
  const ipLockPath = `garden/locks/ip/${ipHash}`;

  // Lock check (cookie OR ip already used)
  const [byCookie, byIp] = await Promise.all([
    blobExists(drawingPath),
    blobExists(ipLockPath),
  ]);
  if (byCookie || byIp) {
    await setIdentityCookies(uuid);
    return NextResponse.json(
      { error: "You've already doodled." },
      { status: 409 },
    );
  }

  try {
    const opts = {
      access: "private" as const,
      addRandomSuffix: false,
      allowOverwrite: false,
      token: TOKEN,
    };
    await put(drawingPath, buf, { ...opts, contentType: "image/png" });
    await put(
      metaPath,
      JSON.stringify({ name, ts: Date.now(), ipHash }),
      { ...opts, contentType: "application/json" },
    );
    await put(ipLockPath, "1", { ...opts, contentType: "text/plain" });
  } catch (e) {
    console.error("garden submit failed:", e);
    return NextResponse.json(
      { error: "Couldn't save your doodle. Try again." },
      { status: 500 },
    );
  }

  await setIdentityCookies(uuid);
  return NextResponse.json({ ok: true });
}
