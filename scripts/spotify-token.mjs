#!/usr/bin/env node
/**
 * One-time helper: grabs a Spotify refresh token for your own account.
 *
 * Usage:
 *   1. Create a Spotify app at https://developer.spotify.com/dashboard
 *   2. Add http://127.0.0.1:8888/callback as a redirect URI in the app settings
 *   3. Save credentials in .env.local:
 *        SPOTIFY_CLIENT_ID=...
 *        SPOTIFY_CLIENT_SECRET=...
 *   4. Run:  node scripts/spotify-token.mjs
 *   5. Browser opens → log in → consent → script prints SPOTIFY_REFRESH_TOKEN
 *   6. Add that token to .env.local AND to your Vercel project env
 *
 * The refresh token is long-lived (doesn't expire unless you revoke the app
 * in your Spotify account settings).
 */

import http from "node:http";
import { URL } from "node:url";
import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";

// Load .env.local manually (no dotenv dep)
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf-8")
    .split("\n")
    .forEach((line) => {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    });
}

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://127.0.0.1:8888/callback";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-top-read",
  "user-read-recently-played",
].join(" ");

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\n[spotify-token] Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env.local",
  );
  process.exit(1);
}

const state = Math.random().toString(36).slice(2);
const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
    state,
  });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://127.0.0.1:8888`);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end("Not found");
    return;
  }
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  if (!code || returnedState !== state) {
    res.writeHead(400).end("Bad state or missing code");
    server.close();
    process.exit(1);
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const json = await tokenRes.json();
  if (!tokenRes.ok) {
    res.writeHead(500).end(`Token exchange failed: ${JSON.stringify(json)}`);
    server.close();
    process.exit(1);
  }

  res.writeHead(200, { "Content-Type": "text/html" }).end(`
    <html><body style="font-family: ui-monospace, monospace; padding: 32px;">
      <h2>✅ All set</h2>
      <p>You can close this tab. Refresh token has been printed to your terminal.</p>
    </body></html>
  `);

  console.log("\n──────────────────────────────────────────────");
  console.log(" Add this to .env.local AND to Vercel env:");
  console.log("──────────────────────────────────────────────");
  console.log(`SPOTIFY_REFRESH_TOKEN=${json.refresh_token}`);
  console.log("──────────────────────────────────────────────\n");
  console.log(
    " Scopes granted:",
    json.scope?.split(" ").join(", ") ?? "(none)",
  );
  console.log(" Done. You can `npm run dev` and visit /fun.\n");
  server.close();
});

server.listen(8888, "127.0.0.1", () => {
  console.log("\n[spotify-token] Opening browser for authorization…");
  console.log("If it doesn't open, visit:\n", authUrl, "\n");
  const opener =
    process.platform === "darwin"
      ? "open"
      : process.platform === "win32"
        ? "start"
        : "xdg-open";
  exec(`${opener} "${authUrl}"`);
});
