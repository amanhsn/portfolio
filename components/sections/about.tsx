"use client";

import { motion } from "motion/react";
import { AsteriskLogo } from "@/components/ui/asterisk-logo";
import { AboutGallery } from "./about-gallery";

/**
 * About — Figma 48:2996.
 * Headline + bio + asterisk bullet list + CTA line, then the scattered gallery.
 * Anchored at #about for navbar linking.
 */

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const BULLETS: Array<{ label: string; image: string }> = [
  {
    label: "coffee maxxing",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=320&q=80",
  },
  {
    label: "touching grass",
    image:
      "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=320&q=80",
  },
  {
    label: "curating mixtapes",
    image:
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=320&q=80",
  },
  // typo "listeing" retained verbatim per Figma — intentional playful touch
  {
    label: "listening, listeing & listening — to music.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=320&q=80",
  },
];

export function About() {
  return (
    <motion.section
      id="about"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
      className="flex w-full flex-col items-center gap-[64px] px-5 sm:px-8 lg:px-[80px]"
    >
      {/* Text content block */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex w-full max-w-[1280px] flex-col items-start gap-[16px] sm:p-[12px]"
      >
        {/* Headline — DESIGNER, BUILDER & AVID MUSIC LISTENER */}
        <div className="flex w-full flex-col items-start justify-center overflow-clip">
          <h2 className="t-hero-name text-[17px] tracking-[2.2px] sm:text-[20px] sm:tracking-[2.8px]">
            <span>Designer, builder &amp; </span>
            <span style={{ color: "var(--text-accent-red)" }}>avid</span>
            <span> music listener</span>
          </h2>
        </div>

        {/* Bio paragraphs */}
        <div className="flex w-full flex-col items-start gap-[8px]">
          <p className="t-hero-body text-[15px] leading-[24px] sm:text-[20px] sm:leading-normal">
            I think deeply about people, products, and where technology is
            headed. Right now that mostly means playing at the edges of genAI
            at ImagineArt, it&rsquo;s where the interesting questions live.
          </p>
          <p className="t-hero-body text-[15px] leading-[24px] sm:text-[20px] sm:leading-normal">
            CS student by day, designer-engineer by nature. When I&rsquo;m not
            in front of a screen, I&rsquo;m,
          </p>
        </div>

        {/* Bullet list — asterisk + label; each row carries an image-cursor preview */}
        <ul className="flex w-full flex-col items-start gap-[4px] pt-[4px]">
          {BULLETS.map((row) => (
            <li
              key={row.label}
              className="group flex cursor-none items-center gap-[10px] text-fg"
              data-cursor-image={row.image}
            >
              <AsteriskLogo
                size={18}
                className="text-fg-muted transition-colors duration-200 group-hover:text-fg-subtle"
              />
              <span className="t-hero-body text-[15px] leading-[24px] text-fg transition-colors duration-200 group-hover:text-fg-muted sm:text-[18px] sm:leading-[28.8px]">
                {row.label}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA line */}
        <p className="t-hero-body pt-[8px] text-[15px] leading-[24px] sm:text-[18px] sm:leading-[28.8px]">
          Working on something cool? Say hi. —{" "}
          <a
            href="https://linkedin.com/in/amanhsn"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="LinkedIn"
            className="underline decoration-[var(--text-tertiary)] underline-offset-4 transition-colors duration-200 hover:text-fg-muted"
          >
            LinkedIn
          </a>{" "}
          ·{" "}
          <a
            href="https://twitter.com/amanhsn"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="X"
            className="underline decoration-[var(--text-tertiary)] underline-offset-4 transition-colors duration-200 hover:text-fg-muted"
          >
            X
          </a>{" "}
          ·{" "}
          <a
            href="mailto:syedamanhsn@gmail.com"
            data-cursor-text="Email"
            className="underline decoration-[var(--text-tertiary)] underline-offset-4 transition-colors duration-200 hover:text-fg-muted"
          >
            email
          </a>
        </p>
      </motion.div>

      {/* Scattered gallery */}
      <AboutGallery />
    </motion.section>
  );
}
