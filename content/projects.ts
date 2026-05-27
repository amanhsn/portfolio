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
    src: string;
    alt: string;
  };
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
      src: "/case-studies/film-studio/hero.png",
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
    slug: "power-zone",
    name: "Power Zone",
    paragraphs: [
      "Power Zone is Pakistan's largest renewable-energy installer. The site needed to translate decades of field expertise into a clean, conversion-ready surface.",
      "Built a marketing system spanning hero, service, project and lead-flow pages. Self-served qualification doubled inbound demo requests within 90 days.",
    ],
    rows: [
      { label: "Year", value: "2024" },
      { label: "Role", value: "Product Designer" },
      {
        label: "Scope",
        value: "Product Strategy, Web Design, Branding, Content Design",
      },
      { label: "Device", value: "Web Design" },
      {
        label: "Tools",
        value: "Figma, Webflow, Mixpanel",
      },
      { label: "Link", value: "powerzone.com.pk" },
    ],
    href: "https://powerzone.com.pk",
    side: "left",
    media: {
      src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=80",
      alt: "Power Zone solar and wind energy farm",
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
