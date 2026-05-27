"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { AsteriskLogo } from "@/components/ui/asterisk-logo";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/cn";

const NAV_ITEMS: Array<{
  label: string;
  href: string;
  matchPath: string;
  badge?: "external";
  external?: boolean;
}> = [
  { label: "Work", href: "/", matchPath: "/" },
  { label: "About", href: "/about", matchPath: "/about" },
  { label: "Playground", href: "/playground", matchPath: "/playground" },
  {
    label: "Resume",
    href: "https://aman-resume.vercel.app",
    matchPath: "__never__",
    badge: "external",
    external: true,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on viewport resize past md so we don't get stuck open
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const close = () => mql.matches && setOpen(false);
    mql.addEventListener("change", close);
    return () => mql.removeEventListener("change", close);
  }, []);

  // Lock scroll when drawer open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled || open
          ? "border-b border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] backdrop-blur"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="relative mx-auto flex h-16 w-full max-w-[1441px] items-center justify-between px-5 sm:px-8 md:h-20 lg:px-[52px]">
        {/* Left: wordmark */}
        <a
          href="/"
          className="flex items-center gap-2"
          data-cursor="pointer"
          onClick={() => setOpen(false)}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center text-fg">
            <AsteriskLogo size={28} />
          </span>
          <span className="t-nav-wordmark">amanhsn</span>
          <span aria-hidden className="t-nav-wordmark hidden text-fg-subtle sm:inline">
            ·
          </span>
          <span className="t-meta hidden text-fg-subtle sm:inline">
            product designer
          </span>
        </a>

        {/* Center: desktop nav */}
        <nav className="group/nav hidden items-center gap-3 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              active={pathname === item.matchPath}
              badge={item.badge}
              external={item.external}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: desktop CTA + theme */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://calendly.com/amanhsn"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="Book a call"
          >
            <Button trailingArrow>Get in Touch</Button>
          </a>
          <ThemeToggle />
        </div>

        {/* Right (mobile): theme + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-cursor="pointer"
            onClick={() => setOpen((v) => !v)}
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-pill)] text-fg transition-colors hover:bg-[var(--pill-bg-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <motion.path
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                d="M4 8 L20 8"
                initial={false}
                animate={{
                  d: open ? "M5 5 L19 19" : "M4 8 L20 8",
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
              <motion.path
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                d="M4 16 L20 16"
                initial={false}
                animate={{
                  d: open ? "M5 19 L19 5" : "M4 16 L20 16",
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-[60] border-b border-[var(--border-subtle)] bg-[var(--bg)] md:hidden"
          >
            <nav className="flex flex-col gap-2 px-5 py-5 sm:px-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 + i * 0.04 }}
                  data-cursor="pointer"
                  className={cn(
                    "t-nav-link flex items-center justify-between rounded-md px-3 py-3 transition-colors hover:bg-[var(--pill-bg-active)]",
                    pathname === item.matchPath ? "text-fg" : "text-fg-muted",
                  )}
                >
                  <span>{item.label}</span>
                  {item.external && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      aria-hidden
                    >
                      <path d="M7 17L17 7M10 7h7v7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </motion.a>
              ))}
              <motion.a
                href="https://calendly.com/amanhsn"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.05 + NAV_ITEMS.length * 0.04 }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border-default)] bg-[var(--bg)] px-4 py-3 text-fg t-meta"
                data-cursor-text="Book a call"
              >
                Get in Touch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                  <path d="M7 17L17 7M10 7h7v7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
