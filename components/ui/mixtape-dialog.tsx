"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, X } from "lucide-react";
import type { Mixtape } from "@/lib/spotify";

interface MixtapeDialogProps {
  mixtapeId: string;
  onOpenChange: (open: boolean) => void;
}

/**
 * Fullscreen-ish dialog showing a mixtape's cover, description and track list.
 * Fetches the full playlist client-side via /api/mixtape/[id] (server route)
 * so the grid stays light.
 */
export function MixtapeDialog({ mixtapeId, onOpenChange }: MixtapeDialogProps) {
  const [mixtape, setMixtape] = useState<Mixtape | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/mixtape/${mixtapeId}`)
      .then((r) => r.json())
      .then((data: Mixtape | null) => {
        if (!cancelled) {
          setMixtape(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [mixtapeId]);

  return (
    <Dialog.Root open onOpenChange={onOpenChange}>
      <AnimatePresence>
        <Dialog.Portal forceMount>
          <Dialog.Overlay asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[150] bg-[var(--bg)]/85 backdrop-blur-md"
              data-cursor-text="Close"
            />
          </Dialog.Overlay>
          <Dialog.Content asChild>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              className="fixed left-1/2 top-1/2 z-[151] w-[92vw] max-w-[760px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[16px] border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[var(--shadow-card)] focus:outline-none"
            >
              <Dialog.Title className="sr-only">
                {mixtape?.name ?? "Mixtape"}
              </Dialog.Title>

              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close mixtape"
                  data-cursor-text="Close"
                  className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)]/95 text-fg backdrop-blur transition-all duration-200 hover:scale-105"
                >
                  <X size={16} strokeWidth={1.75} />
                </button>
              </Dialog.Close>

              <div className="max-h-[85vh] overflow-y-auto">
                {/* Header: cover + meta */}
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:gap-6 sm:p-6">
                  <div className="relative aspect-square w-full overflow-hidden rounded-[10px] bg-[var(--bg-muted)] sm:w-[200px] sm:shrink-0">
                    {mixtape?.coverUrl && (
                      <Image
                        src={mixtape.coverUrl}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 90vw, 200px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col items-start gap-2 pt-1">
                    <span className="t-mono-xs text-fg-subtle">Mixtape</span>
                    <h2 className="t-h2 text-fg">
                      {mixtape?.name ?? "Loading…"}
                    </h2>
                    {mixtape?.description && (
                      <p className="t-body text-[14px] leading-[20px] text-fg-muted">
                        {mixtape.description}
                      </p>
                    )}
                    <Dialog.Description className="t-mono-xs text-fg-subtle">
                      {mixtape ? `${mixtape.trackCount} tracks · by ${mixtape.owner}` : ""}
                    </Dialog.Description>

                    {mixtape?.externalUrl && (
                      <a
                        href={mixtape.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-text="Open in Spotify"
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--border-default)] px-3 py-1.5 text-fg transition-colors hover:bg-[var(--pill-bg-active)]"
                        style={{ fontSize: 13, fontWeight: 500 }}
                      >
                        Open in Spotify
                        <ExternalLink size={12} strokeWidth={1.75} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Track list */}
                <div className="border-t border-[var(--border-subtle)] px-2 pb-4 sm:px-4">
                  {loading && (
                    <div className="px-3 py-6 text-center t-meta text-fg-subtle">
                      Loading tracks…
                    </div>
                  )}
                  {!loading && mixtape && (
                    <ol className="flex flex-col">
                      {mixtape.tracks.map((track, i) => (
                        <li
                          key={track.id}
                          className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-[var(--pill-bg-active)]"
                        >
                          <span className="t-mono-xs w-6 shrink-0 text-fg-subtle">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded bg-[var(--bg-muted)]">
                            {track.coverUrl && (
                              <Image
                                src={track.coverUrl}
                                alt=""
                                fill
                                sizes="36px"
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <span className="t-meta line-clamp-1 text-fg">
                              {track.name}
                            </span>
                            <span className="t-mono-xs line-clamp-1 text-fg-subtle">
                              {track.artists.join(", ")}
                            </span>
                          </div>
                          <span className="t-mono-xs hidden text-fg-subtle sm:block">
                            {formatDuration(track.durationMs)}
                          </span>
                        </li>
                      ))}
                      {mixtape.tracks.length === 0 && (
                        <li className="px-3 py-6 text-center t-meta text-fg-subtle">
                          Track list will appear once Spotify keys are wired up.
                        </li>
                      )}
                    </ol>
                  )}
                </div>
              </div>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </AnimatePresence>
    </Dialog.Root>
  );
}

function formatDuration(ms: number): string {
  const total = Math.round(ms / 1000);
  const m = Math.floor(total / 60);
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}
