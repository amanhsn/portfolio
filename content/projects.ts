export type TableRow = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  name: string;
  paragraphs: string[];
  rows: TableRow[];
  href?: string;
  /** When set, the tile links to the internal case study at /work/[slug]. */
  caseStudySlug?: string;
  side: "left" | "right";
  media: {
    /** Omit to render a branded cover (name + coverStat) instead of a photo. */
    src?: string;
    alt: string;
  };
  /** Headline stat shown on the branded cover when there's no media.src. */
  coverStat?: string;
};

export const projects: Project[] = [
  {
    slug: "imagineart-film-studio",
    name: "ImagineArt Film Studio",
    paragraphs: [
      "Film Studio turns ImagineArt's prompt-and-pray clip tool into a project-based film environment, built on production controls and five output types instead of a single text box.",
      "A model-agnostic shell that routes every shot to the best cinematic image and video model available, all on one ImagineArt credit pool.",
    ],
    rows: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Lead Product Designer" },
      {
        label: "Scope",
        value: "Product Strategy, UI/UX Design, Branding, Prototyping",
      },
      { label: "Device", value: "Web Design" },
      {
        label: "Tools",
        value: "Figma, Mixpanel, ImagineArt, Claude AI, Figma MCP",
      },
      { label: "Link", value: "imagine.art/film-studio" },
    ],
    href: "https://imagine.art/film-studio",
    caseStudySlug: "film-studio",
    side: "left",
    media: {
      src: "/case-studies/film-studio/hero.jpg",
      alt: "ImagineArt Film Studio workspace",
    },
  },
  {
    slug: "imagineart-edit-mode",
    name: "ImagineArt Edit Mode",
    paragraphs: [
      "Edit Mode brings inline, brush-driven generative editing right into the canvas. No leaving the project, no popovers, no detours.",
      "Shipped as the default editing surface for ImagineArt creators; reduced average edit-to-export time by 38% in the first month of public release.",
    ],
    rows: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Lead Product Designer" },
      {
        label: "Scope",
        value: "Product Strategy, UX Design, Interaction, Prototyping",
      },
      { label: "Device", value: "Web Design" },
      {
        label: "Tools",
        value: "Figma, Mixpanel, ImagineArt, Claude AI, Figma MCP",
      },
      { label: "Link", value: "imagine.art/edit" },
    ],
    href: "https://imagine.art/edit",
    side: "right",
    media: {
      src: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=80",
      alt: "ImagineArt Edit Mode preview",
    },
  },
  {
    slug: "imagineart-upscale",
    name: "ImagineArt Upscale",
    paragraphs: [
      "ImagineArt's AI image upscaler: drop an image, pick a model, and get a sharper, higher-resolution result in one step.",
      "A utility front door that launched to six figures of upscales a month. Roughly 849K upscales run, peaking at 107K in a single month.",
    ],
    rows: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Lead Product Designer" },
      {
        label: "Scope",
        value: "Product Strategy, UX/UI Design, Prototyping",
      },
      { label: "Device", value: "Web Design" },
      {
        label: "Tools",
        value: "Figma, Mixpanel, ImagineArt",
      },
      { label: "Link", value: "imagine.art/upscale" },
    ],
    href: "https://imagine.art/upscale?modelListId=75",
    caseStudySlug: "upscale",
    side: "left",
    media: {
      src: "/case-studies/upscale/cover.jpg",
      alt: "ImagineArt Upscale workspace with a before and after compare",
    },
    coverStat: "850K+ upscales · 107K in the peak month",
  },
  {
    slug: "power-zone",
    name: "Power Zone",
    paragraphs: [
      "Power Zone supplies diesel generators and battery energy storage to industry across Pakistan. The site had to sell uptime to five very different buyers without becoming a parts catalog.",
      "Designed in Figma and built in Framer end to end. An application-first site organized by industry, with every path resolving to one Contact Sales conversation.",
    ],
    rows: [
      { label: "Year", value: "2024" },
      { label: "Role", value: "Design, Framer build, brand & content" },
      {
        label: "Scope",
        value: "Brand, Web Design, Framer Development, Content",
      },
      { label: "Device", value: "Web Design" },
      {
        label: "Tools",
        value: "Figma, Framer",
      },
      { label: "Link", value: "powerzone.com.pk" },
    ],
    href: "https://powerzone.com.pk",
    caseStudySlug: "power-zone",
    side: "left",
    media: {
      src: "/case-studies/power-zone/hero.png",
      alt: "Power Zone diesel generator hero",
    },
  },
  {
    slug: "imagineart-references",
    name: "ImagineArt References",
    paragraphs: [
      "References lets creators attach inspiration, like characters, styles and palettes, directly to a prompt, so the model stays loyal to the look they want.",
      "Designed the reference manager, drag-and-drop pipeline, and weighting controls. Shipped to all paid creators; reference attach rate hit 71% in week one.",
    ],
    rows: [
      { label: "Year", value: "2025" },
      { label: "Role", value: "Product Designer" },
      {
        label: "Scope",
        value: "Product Strategy, UX Design, Interaction, Prototyping",
      },
      { label: "Device", value: "Web Design" },
      {
        label: "Tools",
        value: "Figma, Mixpanel, ImagineArt, Claude AI",
      },
      { label: "Link", value: "imagine.art/references" },
    ],
    href: "https://imagine.art/references",
    side: "right",
    media: {
      src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1600&q=80",
      alt: "ImagineArt References creative inspiration board",
    },
  },
];
