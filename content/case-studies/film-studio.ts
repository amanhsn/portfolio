import type { CaseStudy } from "./types";

/**
 * FILM STUDIO, the first case study.
 *
 * Sections 01 to 04 plus Decision 1 are copy lifted verbatim from the Figma
 * template (kSO3qoWUMaLE2GTx9la7LC, node 55:21349). Decisions 2 to 3 and
 * sections 06 to 10 are drafted to the spec's voice from the deployed product
 * and the established facts, and are flagged `draft: true` pending the user's
 * real data (metrics, the real rejected alternatives, learnings, next steps).
 */
export const filmStudio: CaseStudy = {
  slug: "film-studio",

  hero: {
    title: "Film Studio",
    subtitle: "Turning a prompt-and-pray clip generator into a director's chair.",
    liveLabel: "imagine.art/film-studio",
    liveHref: "https://imagine.art/film-studio",
    description:
      "The launch of Film Studio inside ImagineArt: a project-based AI film environment built on six production controls and five output types. A model-agnostic shell that routes every shot to the best cinematic image and video model available, all on one credit pool.",
    meta: [
      { label: "Timeline", value: "2 months · 2026" },
      { label: "Role", value: "Lead Product Designer" },
      { label: "Scope", value: "Product strategy, UI/UX, prototyping, branding, GenAI" },
    ],
    stats: [
      { label: "Launch reach", value: "2.7M", caption: "views on X, May 2026" },
      { label: "Refined across", value: "100s", caption: "of original productions" },
      { label: "Output types", value: "5", caption: "one project, one canvas" },
      { label: "Production controls", value: "6", caption: "the director's chair" },
    ],
    productShot: {
      src: "/case-studies/film-studio/hero.jpg",
      aspect: "1678 / 1194",
      alt: "Film Studio workspace inside ImagineArt, the project-based AI film environment",
    },
  },

  context: {
    left: {
      heading: "Where this lives?",
      body: "ImagineArt is the consumer GenAI suite from Vyro, a bootstrapped company that quietly outranks much of Silicon Valley on photorealistic image generation. Image, video, voice, lipsync, workflows, on top of dozens of model versions from eight families: Veo, Kling, Runway, Sora, Wan, Pixverse, Hailuo, Seedance.",
    },
    right: {
      heading: "Why this feature?",
      body: "We had every leading video model. Customers were stitching coverage of a single scene by hand. Generate, download, re-prompt, hope the character matches, paste into Premiere. The bench was world-class. The workflow on top of it was not. Film Studio was the answer.",
    },
  },

  problem: {
    headline:
      "Most AI video tools are clip generators dressed up as filmmakers. You write a sentence. You get five seconds. If you want a second shot of the same character, you start over.",
    cards: [
      {
        n: "01",
        title: "Continuity",
        body: 'Characters, locations, props drift between generations. There was no first-class concept of "a thing that recurs."',
      },
      {
        n: "02",
        title: "Vocabulary",
        body: '"A cool action scene with cinematic lighting" produces slop. Working DPs say ARRI ALEXA, Zeiss, push-in, T1.4. The model never hears any of it.',
      },
      {
        n: "03",
        title: "Output diversity",
        body: "A real production needs more than clips. It needs stills, B-roll, scene jumps, time jumps, a storyboard.",
      },
    ],
  },

  constraints: [
    {
      header: "One credit pool",
      body: "Customers pay for ImagineArt credits, not Film Studio credits. Same balance. Same model picker.",
    },
    {
      header: "No node graphs",
      body: "Comfy-style DAGs are for engineers. Our user wants Hollywood vocabulary, not a data-flow editor.",
    },
    {
      header: "Mobile DNA, web body",
      body: "ImagineArt grew up on mobile. The studio is web-first because the workspace doesn't fit a phone, but the directness comes straight from mobile.",
    },
    {
      header: "Model-agnostic shell",
      body: "Seedance 2.0 today, Veo 4 tomorrow. The shell had to outlive any single model.",
    },
    {
      header: "Ship fast in a market that ships weekly",
      body: "Higgsfield was on Cinema Studio 3.5 by the time I started. Runway, Sora, Veo all kept moving. Perfection was a losing strategy.",
      span: true,
    },
  ],

  decisions: {
    northStar:
      "All three decisions ladder to one conviction: the interface should speak film, not prompts. The shell carries the directing language so the user doesn't have to.",
    items: [
      {
        headline: "Replace the prompt box with an intuitive side panel.",
        diagram: "prompt-vs-panel",
        points: [
          {
            n: "01",
            header: "Recognition beats recall",
            body: "A prompt box asks you to remember what a 35mm anamorphic looks like. The side panel shows you every option, every time. You don't need to know film school vocabulary to make a choice.",
          },
          {
            n: "02",
            header: "Failures become diagnosable",
            body: "Bad output from a prompt box is hard to diagnose. From a side panel it isn't. I chose ARRI Alexa, Handheld, Noir, 35mm. Turn off one, change another, regenerate. The decision tree is legible. Iteration becomes science, not seance.",
          },
          {
            n: "03",
            header: "State persists across shots",
            body: "In a multi-shot project, your Camera, Movement and Genre selections become the default for the next shot. You get visual consistency without retyping.",
          },
        ],
      },
      {
        headline: "Add the tools filmmakers actually need.",
        diagram: "output-types",
        points: [
          {
            n: "01",
            header: "Five output types, one canvas",
            body: "Clip, still, B-roll, scene jump and storyboard share one project surface. A production needs more than five-second clips, so the studio stopped pretending it was only a clip generator.",
          },
          {
            n: "02",
            header: "Continuity as a first-class object",
            body: "Characters, locations and props become reusable references attached to the project, so the same face survives across shots instead of being re-rolled every time.",
          },
          {
            n: "03",
            header: "Tools mapped to set roles",
            body: "Each control maps to a job on a real set: DP, gaffer, editor. The panel reads as a crew, not a settings page.",
          },
        ],
      },
      {
        headline: "Make the shell outlive the model.",
        diagram: "model-agnostic",
        points: [
          {
            n: "01",
            header: "Controls, not model names",
            body: "The user picks Camera, Movement and Genre, not 'Seedance 2.0'. The shell translates intent into whichever model is best today, so a model swap is a backend change, not a redesign.",
          },
          {
            n: "02",
            header: "One credit pool, one mental model",
            body: "Every output bills against the same ImagineArt balance, so users never have to reason about per-model pricing mid-edit.",
          },
          {
            n: "03",
            header: "New models land as rows, not screens",
            body: "Adding Veo 4 is a new option in an existing control. The cost of a new model is one row of copy, not a new surface.",
          },
        ],
      },
    ],
  },

  craft: {
    headline: "The side panel teaches the language of film while you use it.",
    body: "Each control (Camera, Lens, Movement, Lighting, Genre) pairs a plain-language label with the film term underneath. A first-time creator and a working DP read the same panel differently and both feel at home. The vocabulary is the onboarding, so there is no tour.",
    closing: "Vocabulary is product. The words on a surface decide what users believe the system can do.",
    image: "/case-studies/film-studio/craft.png",
    imageAspect: "3420 / 1958",
    visual: "control-anatomy",
  },

  shipped: [
    {
      src: "/case-studies/film-studio/shipped-1.png",
      aspect: "1614 / 1148",
      alt: "Film Studio home, browsing films to create",
      caption: "The Film Studio home. You start from a film to make, not a prompt to write.",
    },
    {
      src: "/case-studies/film-studio/shipped-2.png",
      aspect: "3420 / 1976",
      alt: "Film Studio editing workspace with the scene timeline",
      caption: "The workspace doing its thing. Shot canvas up top, scene timeline below.",
    },
    {
      src: "/case-studies/film-studio/shipped-3.png",
      aspect: "3420 / 1954",
      alt: "Film Studio control panel with the genre picker open",
      caption: "The control panel. Recognition over recall, with every option in view.",
    },
    {
      src: "/case-studies/film-studio/shipped-4.png",
      aspect: "3420 / 1978",
      alt: "Film Studio scene coverage menu over the storyboard grid",
      caption: "One project, many outputs. Coverage, B-roll, stills and jumps from the same shots.",
    },
  ],

  outcome: {
    kind: "qualitative",
    headline: "Live across ImagineArt as the default AI film surface.",
    cards: [
      {
        label: "Status",
        body: "Live at imagine.art/film-studio across all breakpoints.",
      },
      {
        label: "Reach",
        body: "Available to ImagineArt's 30M+ users on one credit pool.",
      },
      {
        label: "Inheritance",
        body: "Model-agnostic by design. The shell routes to the best cinematic model and absorbs new ones as rows, not redesigns.",
      },
    ],
    closing:
      "The win isn't a number yet. It's that the shell held. New models land as rows, not redesigns, and the directing language is the thing users keep coming back to.",
  },

  learnings: [
    {
      header: "Vocabulary is product.",
      body: "The words on a control change what users believe the system can do. Naming a setting 'push-in' instead of 'zoom' invited a different, more cinematic kind of intent.",
    },
    {
      header: "Constraints are the design.",
      body: "One credit pool and no node graphs weren't limits to route around. They were the brief, and they forced the shell to be a director's chair instead of an engineer's console.",
    },
    {
      header: "Design the shell, not the model.",
      body: "In a market that ships weekly, the durable surface is the one the user holds. That's the controls, not the model behind them.",
    },
  ],

  next: {
    steps: [
      {
        n: "01",
        header: "Intent-based shot suggestions",
        body: "'Make this feel tense' proposes Lens, Movement and Lighting combinations instead of asking the user to assemble them.",
      },
      {
        n: "02",
        header: "Continuity across projects",
        body: "Let a character or location carry from one film into the next, not just across shots within one.",
      },
      {
        n: "03",
        header: "Storyboard-first authoring",
        body: "Start from a board of stills and let the studio fill the motion between frames.",
      },
      {
        n: "04",
        header: "Close the export gap",
        body: "A self-critique. Name the drop-off between a finished shot and a shared film, and design for it.",
      },
    ],
    nav: {
      next: {
        label: "Next case study",
        title: "Power Zone",
        href: "/work/power-zone",
      },
      all: { label: "All work", title: "Back to work", href: "/" },
    },
  },

  seo: {
    title: "Film Studio · Aman's Portfolio",
    description:
      "Turning a prompt-and-pray clip generator into a director's chair: the design of Film Studio inside ImagineArt.",
  },

  draft: true,
};
