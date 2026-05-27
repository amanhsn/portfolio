"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * ThemeToggle - sun↔moon morph icon (ruixenui animated-theme-toggler, 21st.dev)
 * driven by next-themes, wrapped in the existing circular view-transition reveal.
 *
 * Icon: sun rays retract + rotate away, the centre circle swells into a moon
 * body, and a mask carves the crescent - all on spring physics. A soft
 * switch-click sounds on toggle (on by default; pass `sound={false}` to mute).
 *
 * The next-themes wiring (data-theme attribute, persistence, SSR-safe mount)
 * and the page-wide clip-path reveal are kept intact, and the button keeps the
 * original pill styling so the navbar / system page don't shift.
 */

/* ── Audio: tiny synthesized switch-click ── */

let _ctx: AudioContext | null = null;
let _buf: AudioBuffer | null = null;

function audioCtx() {
  if (!_ctx) {
    _ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  }
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

function ensureBuf(ac: AudioContext): AudioBuffer {
  if (_buf && _buf.sampleRate === ac.sampleRate) return _buf;
  const rate = ac.sampleRate;
  const len = Math.floor(rate * 0.006);
  const buf = ac.createBuffer(1, len, rate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / len;
    const sine = Math.sin(2 * Math.PI * 3400 * t);
    const noise = Math.random() * 2 - 1;
    ch[i] = (sine * 0.6 + noise * 0.4) * (1 - t) ** 3;
  }
  _buf = buf;
  return buf;
}

function tick(last: { current: number }) {
  const now = performance.now();
  if (now - last.current < 80) return;
  last.current = now;
  try {
    const ac = audioCtx();
    const buf = ensureBuf(ac);
    const src = ac.createBufferSource();
    const gain = ac.createGain();
    src.buffer = buf;
    gain.gain.value = 0.08;
    src.connect(gain);
    gain.connect(ac.destination);
    src.start();
  } catch {
    /* silent */
  }
}

/* ── Component ── */

export function ThemeToggle({
  className,
  sound = true,
}: {
  className?: string;
  sound?: boolean;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastSnd = useRef(0);
  const isFirst = useRef(true);
  const [mounted, setMounted] = useState(false);
  const rawId = useId();
  const maskId = `att${rawId.replace(/:/g, "")}`;

  useEffect(() => {
    setMounted(true);
    requestAnimationFrame(() => {
      isFirst.current = false;
    });
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggle = useCallback(async () => {
    const button = buttonRef.current;
    const next = isDark ? "light" : "dark";

    if (sound) tick(lastSnd);

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
  }, [isDark, setTheme, sound]);

  const spring = isFirst.current
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 30 };

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
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{ rotate: isDark ? 270 : 0 }}
          transition={spring}
          style={{ overflow: "visible" }}
        >
          {/* Mask carves the crescent from the centre circle. The carve circle is
              smaller than the body and offset up-right, so the moon reads as a
              full, rounded crescent instead of a thin sliver. */}
          <mask id={maskId}>
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <motion.circle
              initial={false}
              animate={{ cx: isDark ? 15.5 : 33, cy: isDark ? 7 : 0 }}
              transition={spring}
              r="7.5"
              fill="black"
            />
          </mask>

          {/* Centre body - small sun circle or large crescent moon */}
          <motion.circle
            cx="12"
            cy="12"
            fill="currentColor"
            stroke="none"
            mask={`url(#${maskId})`}
            initial={false}
            animate={{ r: isDark ? 9 : 5 }}
            transition={spring}
          />

          {/* Rays - shrink and rotate away when dark */}
          <motion.g
            initial={false}
            animate={{
              opacity: isDark ? 0 : 1,
              scale: isDark ? 0 : 1,
              rotate: isDark ? -30 : 0,
            }}
            transition={spring}
            style={{ transformOrigin: "12px 12px" }}
          >
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="5.64" y1="5.64" x2="4.22" y2="4.22" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            <line x1="5.64" y1="18.36" x2="4.22" y2="19.78" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          </motion.g>
        </motion.svg>
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
