"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

export interface MediaFrameProps {
  children: React.ReactNode;
  className?: string;
  cursorText?: string;
  href?: string;
}

export function MediaFrame({
  children,
  className,
  cursorText,
  href,
}: MediaFrameProps) {
  const inner = (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--card-border)] bg-[var(--bg-muted)]",
        className,
      )}
      data-cursor-text={cursorText}
    >
      {children}
    </motion.div>
  );

  if (!href) return inner;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      data-cursor-text={cursorText}
    >
      {inner}
    </a>
  );
}
