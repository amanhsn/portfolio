"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import { PlaygroundBento } from "./playground-bento";
import { PlaygroundCanvas } from "./playground-canvas";

/**
 * Playground tabs - "Projects" (the bento grid) and "Leave a mark" (the
 * Fabric.js drawing pad). Segmented control built on the portfolio's pill
 * tokens with a shared motion indicator; panels crossfade.
 */

const TABS = [
  { id: "projects", label: "Projects" },
  { id: "mark", label: "Doodle" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function PlaygroundTabs() {
  const [active, setActive] = useState<TabId>("projects");

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex gap-1 rounded-[var(--radius-pill)] border border-[var(--border-subtle)] bg-[var(--bg-muted)] p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={cn(
              "relative rounded-[var(--radius-pill)] px-4 py-1.5 font-[family-name:var(--font-inter)] text-[14px] transition-colors",
              active === t.id ? "text-fg" : "text-fg-subtle hover:text-fg",
            )}
          >
            {active === t.id && (
              <motion.span
                layoutId="playground-tab-indicator"
                className="absolute inset-0 -z-10 rounded-[var(--radius-pill)] bg-[var(--pill-bg-active)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {t.label}
          </button>
        ))}
      </div>

      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {active === "projects" ? <PlaygroundBento /> : <PlaygroundCanvas />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
