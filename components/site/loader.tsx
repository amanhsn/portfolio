"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AsteriskLogoLarge } from "@/components/ui/asterisk-logo";

const MIN_DURATION_MS = 1200; // ensures the moment registers even on fast loads
const SESSION_KEY = "amanhsn:loader-shown";

/**
 * First-load Loader - covers the page with a rotating asterisk + eyebrow.
 * Session-scoped so it only shows once per browser session, not on every
 * client-side navigation (the portfolio is single-page anyway).
 *
 * On `prefers-reduced-motion: reduce` the asterisk holds still and only
 * a soft opacity pulse runs.
 */
export function Loader() {
  // Hidden until we know if we should show - avoids a flash for repeat visitors
  const [visible, setVisible] = useState<boolean | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(reduced);

    const alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    if (alreadyShown) {
      setVisible(false);
      return;
    }

    setVisible(true);
    const start = performance.now();
    const finish = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_DURATION_MS - elapsed);
      setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, "1");
        setVisible(false);
      }, remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      // Safety fallback in case load never fires
      const safety = setTimeout(finish, 4000);
      return () => {
        window.removeEventListener("load", finish);
        clearTimeout(safety);
      };
    }
  }, []);

  // Lock scroll while visible
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--bg)]"
          aria-live="polite"
          aria-busy="true"
        >
          {/* Rotating asterisk - large logo, continuous slow spin */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-fg"
          >
            <motion.div
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 3.2, ease: "linear", repeat: Infinity }
              }
              style={{ transformOrigin: "50% 50%" }}
            >
              <AsteriskLogoLarge size={120} className="text-fg" />
            </motion.div>
          </motion.div>

          {/* Eyebrow text - softer pulse */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="mt-5"
          >
            <motion.span
              animate={
                reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 2.4, ease: "easeInOut", repeat: Infinity }
              }
              className="block text-center"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                fontSize: 14,
                letterSpacing: "3.2px",
                textTransform: "uppercase",
                color: "var(--text-primary)",
              }}
            >
              Preparing your experience
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
