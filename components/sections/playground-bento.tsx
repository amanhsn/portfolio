"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { AsteriskLogo } from "@/components/ui/asterisk-logo";
import { bentoItems, type BentoItem } from "@/content/playground";

/**
 * Playground bento grid - the vibecoded side projects.
 *
 * Card chrome borrowed from the 21st.dev MagnifiedBento: a padded outer shell
 * with a large radius wrapping a slightly-tighter-radius media well, soft
 * shadow, and a hover lift. Inside the well sits a snippet of the project
 * (preview image, or a branded panel until one lands). Rebuilt on the
 * portfolio's theme tokens (no shadcn defaults, no hugeicons) and driven by
 * content/playground.ts. Spans the full content width to the gutters.
 */

// Static class strings so Tailwind keeps them in the build.
const SPAN: Record<NonNullable<BentoItem["span"]>, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
};

export function PlaygroundBento() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {bentoItems.map((item) => (
        <BentoCard key={item.title} item={item} />
      ))}
    </div>
  );
}

function BentoCard({ item }: { item: BentoItem }) {
  const { tag, title, blurb, href, image, span = 2 } = item;
  return (
    <motion.div
      initial={false}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
      className={cn(
        "group relative flex flex-col rounded-[1.75rem] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-2 shadow-[var(--shadow-card)]",
        "transition-shadow duration-300",
        SPAN[span],
      )}
    >
      {/* Whole-card link overlay */}
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title}`}
          data-cursor-text="Open"
          className="absolute inset-0 z-20"
        />
      )}

      {/* Media well - snippet of the project */}
      <div className="relative h-[240px] shrink-0 overflow-hidden rounded-[1.4rem] bg-[var(--bg-muted)] lg:h-[300px]">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <AsteriskLogo
              size={30}
              className="text-fg-subtle transition-colors duration-200 group-hover:text-fg-muted"
            />
          </div>
        )}
      </div>

      {/* Title + description */}
      <div className="flex flex-col gap-1.5 px-4 pb-5 pt-5">
        {tag && (
          <span className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
            {tag}
          </span>
        )}
        <h3 className="font-[family-name:var(--font-sans)] text-[20px] font-medium tracking-tight text-fg">
          {title}
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-[14px] leading-relaxed text-fg-muted">
          {blurb}
        </p>
      </div>
    </motion.div>
  );
}
