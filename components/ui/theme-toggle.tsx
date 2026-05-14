"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * ThemeToggle — circular view-transition reveal (ruixenui pattern, 21st.dev).
 * Wraps next-themes setTheme inside document.startViewTransition + flushSync,
 * then animates a clip-path circle from the button's centre across the page.
 * Falls back to a plain theme swap on browsers without View Transitions.
 *
 * Container styles match the original button so callers (navbar, /system) don't
 * shift; only the icon swap + page reveal animation changed.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggle = useCallback(async () => {
    const button = buttonRef.current;
    const next = isDark ? "light" : "dark";

    // Browsers without View Transitions: just swap.
    if (!button || typeof document.startViewTransition !== "function") {
      setTheme(next);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    try {
      await transition.ready;
    } catch {
      return;
    }

    const { left, top, width, height } = button.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${cx}px ${cy}px)`,
          `circle(${maxRadius}px at ${cx}px ${cy}px)`,
        ],
      },
      {
        duration: 650,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [isDark, setTheme]);

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="Toggle theme"
      data-cursor-text={isDark ? "Light mode" : "Dark mode"}
      onClick={toggle}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--border)] text-fg-muted transition-colors hover:bg-[var(--pill-bg-active)] hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        className,
      )}
    >
      {mounted ? (
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ opacity: 0, scale: 0.55, rotate: 25 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.55, rotate: -25 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="inline-flex"
            >
              <Sun size={14} strokeWidth={1.75} />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ opacity: 0, scale: 0.55, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.55, rotate: 25 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="inline-flex"
            >
              <Moon size={14} strokeWidth={1.75} />
            </motion.span>
          )}
        </AnimatePresence>
      ) : (
        <span className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
