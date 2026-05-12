"use client";

import { motion } from "motion/react";
import { AsteriskLogo } from "@/components/ui/asterisk-logo";
import { cn } from "@/lib/cn";

/**
 * Inline asterisk spinner — for any loading state that's not the full-page
 * Loader. Slow rotation, current text color.
 */
export function Spinner({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 4, ease: "linear", repeat: Infinity }}
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
      style={{ transformOrigin: "50% 50%" }}
      aria-label="Loading"
      role="status"
    >
      <AsteriskLogo size={size} />
    </motion.span>
  );
}
