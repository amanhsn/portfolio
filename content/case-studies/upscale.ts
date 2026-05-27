import type { CaseStudy } from "./types";

/**
 * UPSCALE, case study #3.
 *
 * ImagineArt's AI image upscaler. The Outcome section uses REAL Mixpanel data
 * (Creative Upscaler event, Imagine Web - Prod project 3287199), through 2026.
 * The product UX sections (problem, decisions, craft,
 * shipped) are drafted and flagged `draft: true` pending the user's real
 * decisions and product screenshots (the tool is behind login, so the user
 * supplies the shots).
 */
export const upscale: CaseStudy = {
  slug: "upscale",

  hero: {
    title: "Upscale",
    subtitle: "Turning a one-click utility into a habit that scaled to six figures a month.",
    liveLabel: "imagine.art/upscale",
    liveHref: "https://imagine.art/upscale?modelListId=75",
    description:
      "The AI image upscaler inside ImagineArt: drop an image, pick a model, get a sharper, higher-resolution result. A utility that became one of the platform's biggest single-tool draws, with a launch that reached six figures of upscales a month within weeks.",
    meta: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Lead Product Designer" },
      { label: "Scope", value: "Product strategy, UX/UI, prototyping" },
    ],
    stats: [
      { label: "Upscales run", value: "850K+", caption: "and counting" },
      { label: "Peak month", value: "107K", caption: "best single month" },
      { label: "Monthly upscalers", value: "23K+", caption: "at peak" },
      { label: "Launch to 100K/mo", value: "<6 wks", caption: "from a standing start" },
    ],
    productShot: {
      src: "/case-studies/upscale/cover.jpg",
      aspect: "1678 / 1194",
      alt: "ImagineArt Upscale workspace with a before and after compare",
    },
  },

  context: {
    left: {
      heading: "What is Upscale?",
      body: "Upscale is ImagineArt's AI image upscaler. Drop in an image, pick a model, and get a sharper, higher-resolution version in one step. It lives in the same suite as generation, edit and video, and bills against one shared credit pool.",
    },
    right: {
      heading: "Why this project?",
      body: "Most people meet ImagineArt through a single job to be done, and \"make my image bigger and sharper\" is one of the most searched. Upscale had to be the front door that turns a one-off utility visit into a creator who stays.",
    },
  },

  problem: {
    headline:
      "Upscaling is a utility. People want it invisible and instant. So how do you make a one-click \"make it bigger\" feel premium and worth a credit, inside a suite of flashier generative tools, without burying it in options?",
    cards: [
      {
        n: "01",
        title: "Utility vs depth",
        body: "A pro wants model choice and control. A first-timer wants one button. The same surface had to serve both without overwhelming either.",
      },
      {
        n: "02",
        title: "Proof in one glance",
        body: "Upscaling is only believable when you can see the before and after. The result has to sell itself, immediately.",
      },
      {
        n: "03",
        title: "Utility to habit",
        body: "A single upscale is easy. The harder problem is earning the second one, and the path into the rest of the suite.",
      },
    ],
  },

  constraints: [
    {
      header: "One credit pool",
      body: "Upscale spends the same ImagineArt credits as everything else. No separate wallet, no separate mental model.",
    },
    {
      header: "Model-agnostic",
      body: "Several upscale models sit behind the tool. The surface had to outlive any single one, and let the best model lead.",
    },
    {
      header: "An SEO front door",
      body: "Upscale is a top organic entry point, so it had to convert cold, first-time visitors, not just existing users.",
    },
    {
      header: "Web body, mobile reflexes",
      body: "Built for the web workspace, but the interaction had to stay as direct as a mobile utility app.",
      span: true,
    },
  ],

  decisions: {
    northStar:
      "Make the result do the selling.",
    items: [
      {
        headline: "One drop zone, not a form.",
        points: [
          {
            n: "01",
            header: "Upload is the whole UI",
            body: "The first screen is a single drop zone with a sensible model preselected. No setup before you see value.",
          },
          {
            n: "02",
            header: "Depth on demand",
            body: "Model and scale controls are there for the pro, but tucked one layer back so the first-timer is never asked to decide.",
          },
          {
            n: "03",
            header: "One credit, one action",
            body: "Pricing reads as one clear cost per upscale, so there is nothing to calculate before committing.",
          },
        ],
      },
      {
        headline: "Show the before and after, always.",
        points: [
          {
            n: "01",
            header: "Proof beats copy",
            body: "A compare view is the hero of the result screen. The jump in detail is the pitch, not a paragraph about it.",
          },
          {
            n: "02",
            header: "Trust the zoom",
            body: "Let people inspect at full resolution. An upscaler that hides the pixels has something to hide.",
          },
          {
            n: "03",
            header: "Download without friction",
            body: "The result is yours in a click, so the utility promise is kept before any upsell.",
          },
        ],
      },
      {
        headline: "Make the next step obvious.",
        points: [
          {
            n: "01",
            header: "Land them in the suite",
            body: "After an upscale, the natural next move (edit, generate, video) is one tap away, turning a utility visit into a session.",
          },
          {
            n: "02",
            header: "Same shell, new tool",
            body: "Upscale shares the suite's chrome, so the second tool feels like the same product, not a new app to learn.",
          },
          {
            n: "03",
            header: "Credits carry over",
            body: "One balance across tools means trying the next thing costs nothing to understand.",
          },
        ],
      },
    ],
  },

  craft: {
    headline: "The result screen is the entire pitch.",
    body: "Upscale earns trust the moment the before and after sit side by side at full resolution. The craft is restraint: no celebratory confetti, no walls of settings, just a believable jump in detail you can zoom into and download. The utility keeps its promise first, then invites you deeper.",
    closing: "A utility earns the next click by keeping the first one honest.",
  },

  shipped: [
    {
      src: "/case-studies/upscale/shot-setup.png",
      aspect: "3420 / 1964",
      alt: "Upscale tool with an image loaded, ready to run",
      caption: "The setup. Drop an image, pick a model and scale, and the canvas tells you exactly what to do next.",
    },
    {
      src: "/case-studies/upscale/shot-progress.png",
      aspect: "3420 / 1964",
      alt: "Upscale running at 4x",
      caption: "Mid-run. One clear state while the model works, so you never wonder whether it took.",
    },
    {
      src: "/case-studies/upscale/shot-result.png",
      aspect: "3420 / 1962",
      alt: "Upscale before and after result with a download action",
      caption: "The result. Before and after to compare, then download in a click.",
    },
  ],

  outcome: {
    kind: "data",
    headline: "A launch that hit six figures of upscales a month, then settled into a long tail.",
    dateStamp: "Mixpanel · ImagineArt (Imagine Web - Prod) · Creative Upscaler · 2026",
    metrics: [
      { label: "Launch", value: "0 → 55.7K", caption: "upscales in the first month" },
      { label: "Peak", value: "107,690", caption: "in the peak month · 23,425 monthly users" },
      { label: "Lifetime", value: "~849K", caption: "upscales to date" },
    ],
    closing:
      "The launch proved the demand outright. The taper since is the honest part, and it set the next priority: re-engaging the one-time upscaler instead of chasing new ones.",
  },

  learnings: [
    {
      header: "A utility is a front door, not a feature.",
      body: "Upscale's real job was never the pixels. It was earning a first credit and a reason to open the rest of the suite.",
    },
    {
      header: "The result is the pitch.",
      body: "A believable before and after did more for conversion than any amount of marketing copy on the page.",
    },
    {
      header: "Read the whole launch curve.",
      body: "A six-figure first month is easy to celebrate. The taper that followed taught me more, and pointed straight at the next bet.",
    },
  ],

  next: {
    steps: [
      {
        n: "01",
        header: "Re-engage the one-time upscaler",
        body: "The taper is the opportunity. A reason to come back, tied to the work they already uploaded.",
      },
      {
        n: "02",
        header: "Upscale inside the editor",
        body: "Make it a step in a creative flow, not a separate detour, so it rides the suite's habit instead of fighting for its own.",
      },
      {
        n: "03",
        header: "Intent-aware model defaults",
        body: "Detect photo vs art vs face and preselect the model that wins for that input, removing the one real decision left.",
      },
      {
        n: "04",
        header: "Tie upscale to export quality",
        body: "Offer upscale at the moment of export across the suite, where higher resolution is most obviously worth a credit.",
      },
    ],
    nav: {
      next: {
        label: "Next case study",
        title: "ImagineArt Film Studio",
        href: "/work/film-studio",
      },
      all: { label: "All work", title: "Back to work", href: "/" },
    },
  },

  seo: {
    title: "Upscale · Aman's Portfolio",
    description:
      "Designing ImagineArt's AI image upscaler: a one-click utility that launched to six figures of upscales a month. Real Mixpanel data.",
  },

  draft: true,
};
