"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  badge?: number | "external";
  external?: boolean;
}

/**
 * NavLink — colour-driven hover, no opacity dim.
 * Default:           text-fg-muted
 * group-hover (other items): text-fg-subtle (one step muted, subtle)
 * hover:             text-fg + bordered pill background
 * active route:      text-fg + bordered pill background
 *
 * The pill border slot is always reserved (transparent by default) so the
 * layout never shifts width between idle and hover/active.
 *
 * Cursor: data-cursor="pointer" so global CursorFollow inflates+dims the dot.
 */
export function NavLink({
  href,
  children,
  active,
  badge,
  external,
}: NavLinkProps) {
  const inner = (
    <>
      <span className="t-nav-link">{children}</span>
      {badge === "external" && (
        <ArrowUpRight
          size={14}
          strokeWidth={1.75}
          aria-hidden
          className="text-current"
        />
      )}
      {typeof badge === "number" && (
        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--border-default)] bg-[var(--tag-bg)] px-1 text-fg-muted">
          <span className="t-mono-xs tracking-normal">{badge}</span>
        </span>
      )}
    </>
  );

  const className = cn(
    // Layout: fixed height + symmetric padding, reserved border slot
    "inline-flex h-7 items-center gap-[6px] rounded-[var(--radius-pill)] border border-transparent px-[10px]",
    // Transition: subtle, fast, theme-aware easing
    "transition-[color,background-color,border-color] duration-[180ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
    // Default colour: muted; on group hover (any nav item hovered), drop a step
    "text-fg-muted group-hover/nav:text-fg-subtle",
    // The item that's hovered itself
    "hover:!text-fg hover:!border-[var(--border-default)] hover:!bg-[var(--pill-bg-active)]",
    // Active route — same treatment as hovered
    active &&
      "!text-fg !border-[var(--border-default)] !bg-[var(--pill-bg-active)]",
  );

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-cursor="pointer"
    >
      {inner}
    </a>
  ) : (
    <Link href={href} className={className} data-cursor="pointer">
      {inner}
    </Link>
  );
}
