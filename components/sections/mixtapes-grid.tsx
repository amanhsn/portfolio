"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import type { MixtapeSummary } from "@/lib/spotify";
import { MixtapeDialog } from "@/components/ui/mixtape-dialog";

interface MixtapesGridProps {
  mixtapes: MixtapeSummary[];
}

/**
 * MixtapesGrid - playlists rendered as cassette/cover cards.
 * Click any card → loads the full playlist (server action) and opens the
 * detail dialog with the track list.
 */
export function MixtapesGrid({ mixtapes }: MixtapesGridProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {mixtapes.map((m, i) => (
          <MixtapeCard
            key={m.id}
            mixtape={m}
            index={i}
            onClick={() => setOpenId(m.id)}
          />
        ))}
      </div>

      {openId && (
        <MixtapeDialog
          mixtapeId={openId}
          onOpenChange={(open) => !open && setOpenId(null)}
        />
      )}
    </>
  );
}

function MixtapeCard({
  mixtape,
  index,
  onClick,
}: {
  mixtape: MixtapeSummary;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        ease: [0.32, 0.72, 0, 1],
        delay: 0.04 * index,
      }}
      data-cursor-text="Open mixtape"
      aria-label={`Open mixtape ${mixtape.name}`}
      className="group relative flex w-full flex-col items-start gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)]"
    >
      {/* Cover */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[10px] bg-[var(--bg-muted)]">
        {mixtape.coverUrl ? (
          <Image
            src={mixtape.coverUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 240px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-fg-subtle">
            <Play size={32} strokeWidth={1.5} />
          </div>
        )}
        {/* Play overlay on hover */}
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg)]/85 text-fg backdrop-blur">
            <Play size={18} strokeWidth={1.75} className="ml-0.5" />
          </span>
        </span>
      </div>

      {/* Meta */}
      <div className="flex w-full flex-col items-start gap-0.5 px-0.5">
        <span className="t-meta line-clamp-1 text-fg">{mixtape.name}</span>
        <span className="t-mono-xs text-fg-subtle">
          {mixtape.trackCount} tracks
        </span>
      </div>
    </motion.button>
  );
}
