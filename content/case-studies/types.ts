/**
 * Case study content model - one typed object per study, matching the
 * 10-section format (case_study_format_v1.md) and the Figma template
 * (kSO3qoWUMaLE2GTx9la7LC, node 55:21349).
 *
 * Figma section numbering (the approved design): the hero is unnumbered, then
 * 01 Context · 02 The Problem · 03 Constraints · 04 Key Decisions · then the
 * spec's lower sections (Craft, Shipped, Outcome, Learnings, What's Next).
 */

export type Stat = {
  /** Top label, e.g. "ImagineArt Users" */
  label: string;
  /** Big value, e.g. "30M+" or "#6" */
  value: string;
  /** Caption under the value, e.g. "100M+ downloads" */
  caption: string;
};

export type MetaItem = { label: string; value: string };

/** `src` omitted → a branded placeholder frame renders until the asset lands. */
export type HeroImage = { src?: string; alt: string; aspect?: string };

export type Hero = {
  /** ALL-CAPS title (rendered uppercase). */
  title: string;
  /** Serif-italic POV line, ≤12 words. */
  subtitle: string;
  /** Live product link label + href. */
  liveLabel: string;
  liveHref: string;
  /** One ~35–50 word paragraph: what was built + the bet. */
  description: string;
  /** Three-column meta strip (Timeline/Role/Scope). */
  meta: MetaItem[];
  /** Exactly four stats - different kinds. */
  stats: Stat[];
  /** Hero product shot below the hero block. */
  productShot: HeroImage;
};

export type ContextColumn = { heading: string; body: string };
export type Context = { left: ContextColumn; right: ContextColumn };

export type ProblemCard = { n: string; title: string; body: string };
/** Section 02 - "THE PROBLEM"/design tension: bold headline + 3 framing cards. */
export type Problem = { headline: string; cards: ProblemCard[] };

/** A constraint card. `span` makes it take the full-width bottom row. */
export type Constraint = { header: string; body: string; span?: boolean };

export type DecisionPoint = { n: string; header: string; body: string };
export type Decision = {
  /** Bold decision headline. */
  headline: string;
  /** 3 supporting angles, shown as a column row. */
  points: DecisionPoint[];
  /** Key into the diagram registry (components/case-study/diagrams). */
  diagram?: string;
  /** Optional left-border validation quote (date your data). */
  validation?: string;
};
export type Decisions = {
  /** Serif-italic north-star conviction linking the decisions. */
  northStar: string;
  items: Decision[];
};

/** Section - Craft Moment (full-bleed dark band). */
export type Craft = {
  headline: string;
  body: string;
  /** Closing serif-italic principle line. */
  closing: string;
  /** Key into the diagram registry for the rendered craft visual. */
  visual?: string;
  /** Real screenshot for the craft visual; takes precedence over `visual`. */
  image?: string;
  /** CSS aspect-ratio of the craft image, e.g. "3420 / 1958". */
  imageAspect?: string;
};

export type ShippedScreen = {
  src?: string;
  alt: string;
  caption: string;
  /** CSS aspect-ratio of the real screenshot, e.g. "3420 / 1976". Defaults to 16/10. */
  aspect?: string;
};

export type OutcomeCard = { label: string; body: string };
export type Outcome =
  | {
      kind: "data";
      headline: string;
      /** Always date your data, e.g. "Mixpanel · Film Studio · Oct 2025". */
      dateStamp: string;
      metrics: Stat[];
      /** Optional diagram key rendered below the metric cards (e.g. a growth chart). */
      chart?: string;
      closing: string;
    }
  | {
      kind: "qualitative";
      headline: string;
      /** Status · Reach · Inheritance. */
      cards: OutcomeCard[];
      closing: string;
    };

export type Learning = { header: string; body: string };

export type NextStep = { n: string; header: string; body: string };
export type NavCard = { label: string; title: string; href: string };
export type Next = {
  steps: NextStep[];
  nav: { next: NavCard; all: NavCard };
};

export type CaseStudy = {
  slug: string;
  hero: Hero;
  context: Context;
  problem: Problem;
  constraints: Constraint[];
  decisions: Decisions;
  craft: Craft;
  shipped: ShippedScreen[];
  outcome: Outcome;
  learnings: Learning[];
  next: Next;
  seo: { title: string; description: string };
  /** True for fields still awaiting real data from the user. */
  draft?: boolean;
};
