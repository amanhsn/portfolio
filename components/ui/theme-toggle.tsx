"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      data-cursor-text={isDark ? "Light mode" : "Dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--border)] text-fg-muted transition-colors hover:bg-[var(--pill-bg-active)] hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        className,
      )}
    >
      {mounted ? (
        isDark ? (
          <Sun size={14} strokeWidth={1.75} />
        ) : (
          <Moon size={14} strokeWidth={1.75} />
        )
      ) : (
        <span className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
