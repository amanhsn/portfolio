# Spotify integration

The `/fun` page renders your Spotify playlists (mixtapes) and opens each in a
detail dialog with the full track list. It refreshes server-side once an hour
via Next.js ISR.

Until the env vars below are set, the page falls back to mock data so local
development still renders.

## One-time setup

1. **Create a Spotify Developer app**
   - Go to <https://developer.spotify.com/dashboard>
   - Click **Create app**
   - Name it whatever — _"amanhsn portfolio"_ works
   - Add redirect URI: `http://127.0.0.1:8888/callback`
   - Save

2. **Copy credentials into `.env.local`**
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and paste your `SPOTIFY_CLIENT_ID` + `SPOTIFY_CLIENT_SECRET`
   from the Spotify dashboard.

3. **Grab a refresh token**
   ```bash
   npm run spotify:token
   ```
   - Browser opens → log into _your own_ Spotify account → click **Agree**
   - Terminal prints `SPOTIFY_REFRESH_TOKEN=...`
   - Paste that line into `.env.local`

4. **Add the three secrets to Vercel**
   - In your Vercel project → Settings → Environment Variables, add:
     - `SPOTIFY_CLIENT_ID`
     - `SPOTIFY_CLIENT_SECRET`
     - `SPOTIFY_REFRESH_TOKEN`
   - Apply to Production + Preview + Development as needed
   - Redeploy

That's it. The page now reads your real playlists.

## What gets fetched

| Endpoint | Used for |
|---|---|
| `GET /me/playlists` | Mixtapes grid (covers, names, track counts) |
| `GET /playlists/{id}` | Detail dialog (description, track list with art) |

## Refresh behavior

- **`/fun`** is a server component with `export const revalidate = 3600` — Next.js
  fetches the playlist list at most once per hour per region.
- **`/api/mixtape/[id]`** likewise caches per playlist for 1 hour.
- Access tokens are cached in-process and refreshed automatically before they
  expire (`expires_in` minus 30s).

## Scopes granted

`scripts/spotify-token.mjs` requests:

- `user-read-private`
- `user-read-email`
- `playlist-read-private`
- `playlist-read-collaborative`
- `user-top-read` _(in case we add "top tracks" later)_
- `user-read-recently-played` _(in case we add "currently playing" later)_

Refresh tokens are long-lived — they don't expire unless you revoke the app
in your Spotify account settings (<https://www.spotify.com/account/apps/>).

## Revoking / rotating

If a token ever leaks:
1. Visit <https://www.spotify.com/account/apps/> and remove the app
2. Re-run `npm run spotify:token` to mint a fresh one
3. Update env in Vercel + redeploy
