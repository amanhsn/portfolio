import type { Mixtape } from "@/lib/spotify";

/**
 * Mock mixtapes used as a fallback when Spotify env vars are not configured.
 * Once the user sets SPOTIFY_REFRESH_TOKEN etc, real data replaces these.
 *
 * Covers are public Spotify album/playlist artwork hosted on i.scdn.co. They
 * work as placeholders; substitute with your own playlist art when the live
 * fetch is wired up.
 */
export const mockMixtapes: Mixtape[] = [
  {
    id: "mock-late-nights",
    name: "late nights, deep house",
    description:
      "warm slow-burning house for 1am drives and last-train-home walks.",
    trackCount: 24,
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
    externalUrl: "https://open.spotify.com/user/pibcpyd0xmdn1wo1xq5kzow9y",
    owner: "amanhsn",
    tracks: [
      {
        id: "t1",
        name: "Solas",
        artists: ["Jamie xx"],
        album: "In Waves",
        durationMs: 252_000,
        previewUrl: null,
        externalUrl: "https://open.spotify.com",
        coverUrl: null,
      },
      {
        id: "t2",
        name: "Sour Times",
        artists: ["Portishead"],
        album: "Dummy",
        durationMs: 251_000,
        previewUrl: null,
        externalUrl: "https://open.spotify.com",
        coverUrl: null,
      },
      {
        id: "t3",
        name: "Nights",
        artists: ["Frank Ocean"],
        album: "Blonde",
        durationMs: 307_000,
        previewUrl: null,
        externalUrl: "https://open.spotify.com",
        coverUrl: null,
      },
    ],
  },
  {
    id: "mock-quiet-mornings",
    name: "quiet mornings",
    description: "songs that don't ask anything of you. coffee not optional.",
    trackCount: 18,
    coverUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
    externalUrl: "https://open.spotify.com/user/pibcpyd0xmdn1wo1xq5kzow9y",
    owner: "amanhsn",
    tracks: [
      {
        id: "t1",
        name: "First Light",
        artists: ["Djrum"],
        album: "Portrait With Firewood",
        durationMs: 410_000,
        previewUrl: null,
        externalUrl: "https://open.spotify.com",
        coverUrl: null,
      },
    ],
  },
  {
    id: "mock-shipping",
    name: "shipping playlist",
    description:
      "the focus loop. mostly instrumental, sometimes mathematical.",
    trackCount: 47,
    coverUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    externalUrl: "https://open.spotify.com/user/pibcpyd0xmdn1wo1xq5kzow9y",
    owner: "amanhsn",
    tracks: [
      {
        id: "t1",
        name: "Strobe",
        artists: ["deadmau5"],
        album: "For Lack of a Better Name",
        durationMs: 634_000,
        previewUrl: null,
        externalUrl: "https://open.spotify.com",
        coverUrl: null,
      },
    ],
  },
  {
    id: "mock-driving",
    name: "the long drive",
    description: "windows down. coast roads. nothing to prove.",
    trackCount: 31,
    coverUrl:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80",
    externalUrl: "https://open.spotify.com/user/pibcpyd0xmdn1wo1xq5kzow9y",
    owner: "amanhsn",
    tracks: [],
  },
  {
    id: "mock-99",
    name: "99 problems",
    description:
      "hip-hop for the bad days. everything's gonna be alright, eventually.",
    trackCount: 36,
    coverUrl:
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=600&q=80",
    externalUrl: "https://open.spotify.com/user/pibcpyd0xmdn1wo1xq5kzow9y",
    owner: "amanhsn",
    tracks: [],
  },
  {
    id: "mock-monsoon",
    name: "monsoon room",
    description: "for when the rain hits the window just right.",
    trackCount: 21,
    coverUrl:
      "https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?auto=format&fit=crop&w=600&q=80",
    externalUrl: "https://open.spotify.com/user/pibcpyd0xmdn1wo1xq5kzow9y",
    owner: "amanhsn",
    tracks: [],
  },
];
