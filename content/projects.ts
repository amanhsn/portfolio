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
    side: "right",
    media: {
      src: "/case-studies/upscale/cover.jpg",
      alt: "ImagineArt Upscale workspace with a before and after compare",
    },
    coverStat: "850K+ upscales · 107K in the peak month",
  },
  {
    slug: "imagineart-assist",
    name: "ImagineArt Assist",
    paragraphs: [
      "Assist is ImagineArt's conversational front door. Instead of picking a tool, you describe what you want and Assist reads the intent, picks the model, generates inline, then suggests the next step.",
      "Launched January 2026 to six figures of monthly users. Roughly 700K Assist interactions in the first five months, peaking near 192K in February.",
    ],
    rows: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Product Designer + Manager" },
      {
        label: "Scope",
        value: "Product Strategy, UX/UI Design, Prototyping",
      },
      { label: "Device", value: "Web Design" },
      {
        label: "Tools",
        value: "Figma, Mixpanel, ImagineArt, Chatly",
      },
      { label: "Link", value: "imagine.art/image" },
    ],
    href: "https://www.imagine.art/image",
    caseStudySlug: "assist",
    side: "left",
    media: {
      src: "/case-studies/assist/cover.jpg",
      alt: "ImagineArt Assist conversation generating a Snoopy and Woodstock illustration with suggested next steps",
    },
  },
  {
    slug: "power-zone",
    name: "Power Zone",
    paragraphs: [
      "Power Zone supplies diesel generators and battery energy storage to industry across Pakistan. The site had to sell uptime to five very different buyers without becoming a parts catalog.",
      "Designed in Figma and built in Framer end to end. An application-first site organized by industry, with every path resolving to one Contact Sales conversation.",
    ],
    rows: [
      { label: "Year", value: "2025" },
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
    side: "right",
    media: {
      src: "/case-studies/power-zone/hero.png",
      alt: "Power Zone diesel generator hero",
    },
  },
  {
    slug: "clinio",
    name: "Clinio",
    paragraphs: [
      "Clinio is a European telemedicine MVP that connects patients to medical practitioners on one web app. Book a doctor, hold a video or in-person consult, and manage records, all built accessibility first.",
      "Designed end to end in 8 weeks for a Belgian client: brand, UX research, a two-role product and a prototype, on a blockchain backend. Handed off as a reusable Figma system for a React build.",
    ],
    rows: [
      { label: "Year", value: "2025" },
      { label: "Role", value: "Lead Product Designer" },
      {
        label: "Scope",
        value: "Brand, UX Research, UI/UX Design, Prototyping",
      },
      { label: "Device", value: "Web App (patient & practitioner)" },
      {
        label: "Tools",
        value: "Figma, Canva",
      },
      { label: "Link", value: "behance.com/amanhsn" },
    ],
    href: "https://www.behance.net/gallery/217896347/Clinio-Case-Study",
    caseStudySlug: "clinio",
    side: "left",
    media: {
      src: "/case-studies/clinio/cover.jpg",
      alt: "Clinio telemedicine dashboards for patient and practitioner",
    },
  },
  {
    slug: "share-ease",
    name: "Share Ease",
    paragraphs: [
      "Share Ease is a bill-splitting app concept that ends the awkward money text, not just the math. Create a group, log what everyone spent, split it, and settle up in app.",
      "Designed end to end in a month: brand, UX, UI, prototype and a marketing site. It closes the loop with a group virtual card and in-app payment requests, then was handed to a React Native build.",
    ],
    rows: [
      { label: "Year", value: "2024" },
      { label: "Role", value: "Product Designer, solo" },
      {
        label: "Scope",
        value: "Branding, UX/UI Design, Prototyping, Web",
      },
      { label: "Device", value: "Mobile App (iOS & Android)" },
      {
        label: "Tools",
        value: "Figma, Whimsical, Canva",
      },
      { label: "Link", value: "behance.com/amanhsn" },
    ],
    href: "https://www.behance.net/gallery/202794443/Product-Case-Study-Share-Ease",
    caseStudySlug: "share-ease",
    side: "right",
    media: {
      src: "/case-studies/share-ease/cover.jpg",
      alt: "Share Ease bill-splitting app screens",
    },
  },
];
