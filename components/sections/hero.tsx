"use client";

import { motion } from "motion/react";
import { Linkedin } from "lucide-react";
import { BehanceIcon, CvIcon, SpotifyIcon } from "@/components/ui/brand-icons";
import { experience } from "@/content/experience";
import { socials } from "@/content/socials";

/**
 * Hero - Figma 84:7270.
 * Desktop spec is preserved; mobile collapses the fixed widths to fluid.
 */

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const ICONS = {
  linkedin: Linkedin,
  behance: BehanceIcon,
  cv: CvIcon,
  spotify: SpotifyIcon,
} as const;

export function Hero() {
  return (
    <motion.section
      id="work"
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
      className="flex w-full flex-col items-center gap-[16px] px-5 sm:px-8 lg:px-[80px]"
    >
      {/* Heading block */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex w-full max-w-[1280px] flex-col items-start gap-[16px] sm:p-[12px]"
      >
        <div className="flex w-full flex-col items-start gap-[8px] overflow-clip">
          {/* Name */}
          <div className="flex h-[28px] w-full flex-col items-start justify-center overflow-clip sm:h-[32px]">
            <h1 className="t-hero-name whitespace-nowrap text-[17px] tracking-[2.2px] sm:text-[20px] sm:tracking-[2.8px]">
              syed aman hussain
            </h1>
          </div>

          {/* Role line - stacks on mobile, inline at sm+ */}
          <div className="flex w-full items-center overflow-clip">
            <div className="flex flex-col items-start gap-y-0.5 sm:flex-row sm:items-center sm:gap-x-[8px]">
              <span className="t-hero-role whitespace-nowrap text-[15px] leading-[24px] sm:text-[18px] sm:leading-[28.8px]">
                Product Designer @ ImagineArt
              </span>
              <span
                aria-hidden
                className="hidden h-[21px] w-px sm:block"
                style={{ background: "var(--border-subtle)" }}
              />
              <span className="t-hero-role whitespace-nowrap text-[15px] leading-[24px] sm:text-[18px] sm:leading-[28.8px]">
                Islamabad, Pakistan
              </span>
            </div>
          </div>
        </div>

        {/* Bio paragraph */}
        <p className="t-hero-body w-full text-[15px] leading-[24px] sm:text-[20px] sm:leading-normal">
          Product designer bridging the gap between engineering, AI, and pure
          design. I thrive on product research and collaborating with founders
          and cross-functional teams to transmute raw ideas into polished,
          impactful products &amp; features. Currently, I&rsquo;m pushing the
          boundaries of generative AI to craft intelligent experiences at
          ImagineArt (Vyro.ai).
        </p>
      </motion.div>

      {/* Experience timeline */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex w-full max-w-[1280px] flex-col items-start justify-end sm:px-[12px]"
      >
        <div className="flex w-full flex-col items-start gap-[6px] sm:gap-[2px]">
          {experience.map((row) => (
            <div
              key={`${row.year}-${row.company}`}
              className="grid w-full grid-cols-[64px_minmax(0,1fr)] items-baseline gap-x-3 gap-y-0 sm:grid-cols-[104px_224px_minmax(0,1fr)] sm:gap-x-[8px]"
            >
              {/* Year */}
              <span className="t-exp-year row-start-1 text-[13px] sm:text-[15px]">
                {row.year}
              </span>
              {/* Company */}
              <span className="t-exp-company row-start-1 truncate text-[14px] sm:text-[15px]">
                {row.company}
              </span>
              {/* Role - pushed to next row on mobile */}
              <span className="t-exp-role col-start-2 row-start-2 truncate text-[13px] sm:col-start-3 sm:row-start-1 sm:text-[15px]">
                {row.role}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom horizontal border + socials row */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative h-[64px] w-full max-w-[1280px]"
      >
        <div
          className="absolute inset-x-0 top-0"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        />
        <div className="absolute left-0 top-[16px] flex h-[32px] items-start gap-[16px] sm:left-[12px]">
          {socials.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                data-cursor-text={s.label}
                className="flex h-[32px] w-[32px] items-center justify-center rounded-[var(--radius-sm)] text-fg-muted transition-colors hover:text-fg"
              >
                <Icon size={18} strokeWidth={1.5} className="" />
              </a>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}
