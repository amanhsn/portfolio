import type { CaseStudy } from "./types";
import { filmStudio } from "./film-studio";
import { powerZone } from "./power-zone";
import { upscale } from "./upscale";

/** All case studies, in display order. */
export const caseStudies: CaseStudy[] = [filmStudio, powerZone, upscale];

/** Lookup by slug for the /work/[slug] route. */
export const caseStudyBySlug: Record<string, CaseStudy> = Object.fromEntries(
  caseStudies.map((cs) => [cs.slug, cs]),
);

export const caseStudySlugs = caseStudies.map((cs) => cs.slug);

export type { CaseStudy } from "./types";
