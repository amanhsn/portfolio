/**
 * Server-side Spotify wrapper.
 *
 * Uses the Authorization Code refresh-token flow:
 *  - SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
 *    are required in env (see README for one-time setup).
 *
 * If env keys are missing, returns the mock data from `content/spotify-mock.ts`
 * so local dev / unauthenticated builds still render. This keeps the `/fun`
 * page usable before secrets land in Vercel.
 */

import "server-only";
import { mockMixtapes } from "@/content/spotify-mock";

export type MixtapeSummary = {
  id: string;
  name: string;
  description: string;
  trackCount: number;
  coverUrl: string | null;
  externalUrl: string;
  owner: string;
};

export type Track = {
  id: string;
  name: string;
  artists: string[];
  album: string;
  durationMs: number;
  previewUrl: string | null;
  externalUrl: string;
  coverUrl: string | null;
};

export type Mixtape = MixtapeSummary & {
  tracks: Track[];
};

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_BASE = "https://api.spotify.com/v1";

let cachedToken: { value: string; expiresAt: number } | null = null;

function hasEnv(): boolean {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
      process.env.SPOTIFY_CLIENT_SECRET &&
      process.env.SPOTIFY_REFRESH_TOKEN,
  );
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.value;
  }

  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Spotify token refresh failed: ${res.status}`);
  }

  const json = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: json.access_token,
    expiresAt: Date.now() + json.expires_in * 1000,
  };
  return json.access_token;
}

async function spotifyFetch<T>(path: string): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Spotify API ${path} failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

interface SpotifyImage {
  url: string;
  width: number | null;
  height: number | null;
}

interface PlaylistSummaryRaw {
  id: string;
  name: string;
  description: string | null;
  images: SpotifyImage[];
  tracks: { total: number };
  external_urls: { spotify: string };
  owner: { display_name: string };
}

interface PlaylistsResponse {
  items: PlaylistSummaryRaw[];
  next: string | null;
}

interface PlaylistDetailRaw extends PlaylistSummaryRaw {
  tracks: {
    total: number;
    items: Array<{
      track: {
        id: string;
        name: string;
        duration_ms: number;
        preview_url: string | null;
        external_urls: { spotify: string };
        album: {
          name: string;
          images: SpotifyImage[];
        };
        artists: Array<{ name: string }>;
      } | null;
    }>;
  };
}

function pickCover(images: SpotifyImage[] | undefined): string | null {
  if (!images?.length) return null;
  // Largest first usually; return widest under 800 for crisp thumb
  const sorted = [...images].sort(
    (a, b) => (b.width ?? 0) - (a.width ?? 0),
  );
  return sorted.find((i) => (i.width ?? 0) <= 800)?.url ?? sorted[0]!.url;
}

function summarise(raw: PlaylistSummaryRaw): MixtapeSummary {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description ?? "",
    trackCount: raw.tracks.total,
    coverUrl: pickCover(raw.images),
    externalUrl: raw.external_urls.spotify,
    owner: raw.owner.display_name,
  };
}

/**
 * Returns the user's public playlists (mixtapes). Falls back to mock data
 * when Spotify env vars are missing, so local dev still works.
 */
export async function getMixtapes(): Promise<MixtapeSummary[]> {
  if (!hasEnv()) {
    return mockMixtapes.map(({ tracks: _t, ...rest }) => rest);
  }
  try {
    const data = await spotifyFetch<PlaylistsResponse>(
      "/me/playlists?limit=50",
    );
    return data.items.map(summarise);
  } catch (err) {
    console.error("[spotify] getMixtapes failed, using mock", err);
    return mockMixtapes.map(({ tracks: _t, ...rest }) => rest);
  }
}

/**
 * Returns full playlist detail with tracks.
 */
export async function getMixtape(id: string): Promise<Mixtape | null> {
  if (!hasEnv()) {
    return mockMixtapes.find((m) => m.id === id) ?? null;
  }
  try {
    const data = await spotifyFetch<PlaylistDetailRaw>(`/playlists/${id}`);
    const summary = summarise(data);
    const tracks: Track[] = data.tracks.items
      .filter((i) => i.track !== null)
      .map(({ track }) => ({
        id: track!.id,
        name: track!.name,
        artists: track!.artists.map((a) => a.name),
        album: track!.album.name,
        durationMs: track!.duration_ms,
        previewUrl: track!.preview_url,
        externalUrl: track!.external_urls.spotify,
        coverUrl: pickCover(track!.album.images),
      }));
    return { ...summary, tracks };
  } catch (err) {
    console.error("[spotify] getMixtape failed, using mock", err);
    return mockMixtapes.find((m) => m.id === id) ?? null;
  }
}
