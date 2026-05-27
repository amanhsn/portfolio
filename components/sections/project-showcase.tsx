"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ProjectMeta } from "./project-meta";
import { AsteriskLogo } from "@/components/ui/asterisk-logo";
import type { Project } from "@/content/projects";

/**
 * ProjectShowcase - Figma 84:7373.
 * Desktop: side-by-side w gap-[44px]; meta 397, media 839×597.
 * Mobile: stacks vertically; meta full-width, media full-width aspect-[16/10].
 */
export function ProjectShowcase({ project }: { project: Project }) {
  const isLeft = project.side === "left";

  const media = (
    <div className="flex w-full shrink-0 items-start md:w-[839px]">
      <div
        className="relative aspect-[839/597] w-full overflow-hidden rounded-[16px] border border-solid border-[var(--border-default)] md:h-[597px]"
        style={{ boxShadow: "var(--shadow-card)" }}
        data-cursor-text={project.name}
      >
        {project.media.src ? (
          <Image
            src={project.media.src}
            alt={project.media.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 839px"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0c0d10] px-8 text-center text-white">
            <AsteriskLogo size={40} className="opacity-70" />
            <span className="font-[family-name:var(--font-sans)] text-[30px] font-bold tracking-[-0.4px]">
              {project.name}
            </span>
            {project.coverStat && (
              <span className="font-[family-name:var(--font-dm-mono)] text-[13px] uppercase tracking-[0.2em] text-white/55">
                {project.coverStat}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex w-full flex-col items-center px-5 sm:px-8 lg:px-0"
    >
      <div
        className={`flex w-full flex-col items-center justify-center gap-8 md:flex-row md:items-center md:gap-[44px] ${
          isLeft ? "" : "md:flex-row-reverse"
        }`}
      >
        <ProjectMeta project={project} />
        {project.caseStudySlug ? (
          <Link
            href={`/work/${project.caseStudySlug}`}
            data-cursor-text="View case study"
            className="block w-full md:w-auto"
          >
            {media}
          </Link>
        ) : project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="Open project"
            className="block w-full md:w-auto"
          >
            {media}
          </a>
        ) : (
          media
        )}
      </div>
    </motion.section>
  );
}
