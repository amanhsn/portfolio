import type { CaseStudy } from "./types";

/**
 * ASSIST, case study #2 (ImagineArt).
 *
 * The conversational, intent-first mode inside ImagineArt's Image Studio
 * (imagine.art/image, the "assist" tab; chat engine is Chatly). Explored live
 * via Playwright: a chat panel that classifies intent, expands the prompt,
 * generates inline, then suggests the next step (variation / upscale / animate)
 * and keeps auto-titled sessions. The Outcome uses REAL Mixpanel data from the
 * "Imagine Assist" board ("One Chat - Agent" event, Imagine Web - Prod 3287199),
 * approved for publication. Product UX prose is drafted and flagged
 * `draft: true` pending the user's refinement. Screenshots are live captures.
 */
export const assist: CaseStudy = {
  slug: "assist",

  hero: {
    title: "Assist",
    subtitle: "Turning a grid of tools into a single conversation.",
    liveLabel: "imagine.art/image",
    liveHref: "https://www.imagine.art/image",
    description:
      "Assist is ImagineArt's conversational front door. Instead of choosing a tool, you say what you want in plain language. Assist reads the intent, picks the model, generates inline, and hands you the next step. The bet: a conversation beats a menu for most people, most of the time.",
    meta: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Product Designer + Manager" },
      { label: "Scope", value: "Product strategy, UX/UI, prototyping" },
    ],
    stats: [
      { label: "Launched", value: "Jan 2026", caption: "0 to six figures fast" },
      { label: "Monthly users", value: "100K", caption: "at the Feb 2026 peak" },
      { label: "Interactions", value: "~700K", caption: "Jan to May 2026" },
      { label: "Messages / user", value: "2.2", caption: "per active day" },
    ],
    productShot: {
      video: "/case-studies/assist/hero.mp4",
      src: "/case-studies/assist/cover.jpg",
      aspect: "716 / 418",
      alt: "ImagineArt Assist in motion: describing an intent, watching it generate, and being offered the next step",
    },
  },

  context: {
    left: {
      heading: "What is Assist?",
      body: "Assist is a mode inside ImagineArt's Image Studio. A chat panel sits on the left, your work fills the gallery on the right. You describe what you want, and Assist decides whether to generate an image, generate a video, or just answer, then does it inline. It runs on the same models and the same credit pool as the rest of the suite.",
    },
    right: {
      heading: "Why this project?",
      body: "ImagineArt had grown into a grid of powerful tools: Image, Video, Edit, Upscale, Film Studio. Power for people who already knew what each one did, a wall for everyone else. Assist had to be the front door that meets people where they actually start: with an intention, not a tool name.",
    },
  },

  problem: {
    headline:
      "A creative suite gets more capable and harder to use at the same time. Every new model is another button. So how do you put the whole suite behind one prompt, without dumbing it down or pretending the chatbot is magic?",
    cards: [
      {
        n: "01",
        title: "Intent over tools",
        body: "People arrive wanting a result, not a tool. \"Make me a thumbnail\" should not require knowing whether that lives under Image, Edit, or Apps.",
      },
      {
        n: "02",
        title: "A chat that does, not just talks",
        body: "A reply is cheap. The hard part is turning a sentence into the right model call, with the right settings, and showing the work as it happens.",
      },
      {
        n: "03",
        title: "One conversation, every modality",
        body: "Image, video and plain answers had to share one thread without it feeling like three bolted-together products.",
      },
    ],
  },

  constraints: [
    {
      header: "One credit pool",
      body: "Assist spends the same ImagineArt credits as every other tool. No separate wallet, no second mental model to learn.",
    },
    {
      header: "Model-agnostic by design",
      body: "The image and video models change constantly. Assist had to pick the best one for the job and keep working when the lineup shifts.",
    },
    {
      header: "Built on a chat engine",
      body: "The conversation runs on Chatly. The design job was the bridge: turning loose language into structured, billable generation jobs.",
    },
    {
      header: "Lives beside the classic studio",
      body: "Assist is a tab next to the standard tool, not a replacement. It had to win people over without taking away the control the power users came for.",
      span: true,
    },
  ],

  decisions: {
    northStar:
      "Read the intent, then do the work. Talk only as much as it takes.",
    items: [
      {
        headline: "Classify the intent before doing anything.",
        points: [
          {
            n: "01",
            header: "Name the move out loud",
            body: "Assist shows what it decided (\"Considering Image Generation\", \"Determining Aspect Ratio\") so the routing is legible, not a black box.",
          },
          {
            n: "02",
            header: "Generate, or just answer",
            body: "Some prompts want an image, some want a video, some want advice. The same box has to pick correctly, every time.",
          },
          {
            n: "03",
            header: "Expand the prompt for them",
            body: "A one-line ask becomes a full, model-ready prompt under the hood, so a casual sentence still produces a considered result.",
          },
        ],
        diagram: "assist-intent",
      },
      {
        headline: "Keep the result in the conversation.",
        points: [
          {
            n: "01",
            header: "Inline, not a detour",
            body: "Generation happens in the thread and lands in the gallery beside it. You never leave the conversation to see your work.",
          },
          {
            n: "02",
            header: "Always suggest the next step",
            body: "After a result, Assist offers the obvious follow-on: a variation, an upscale, an animation. The suite reveals itself through use.",
          },
          {
            n: "03",
            header: "Sessions remember",
            body: "Threads auto-title and persist (\"Cat in Yellow Raincoat\"), so a creative direction is something you can return to, not retype.",
          },
        ],
      },
      {
        headline: "Make the conversation a front door, not a dead end.",
        points: [
          {
            n: "01",
            header: "Route into the real tools",
            body: "A next step like \"Upscale\" or \"Animate\" hands off to the actual tool, so Assist teaches the suite instead of replacing it.",
          },
          {
            n: "02",
            header: "Even advice loops back to making",
            body: "Ask a question and Assist answers, then offers to act on the answer. The exit from every reply is a creation.",
          },
          {
            n: "03",
            header: "One shell, three intents",
            body: "Standard, Assist and Apps are tabs on one surface, so switching modes never feels like switching apps.",
          },
        ],
      },
    ],
  },

  craft: {
    headline: "The craft is in what Assist hides.",
    body: "Behind one sentence sits a chain of decisions: classify the intent, choose the modality, pick the model, expand the prompt, run the job, then read the result well enough to suggest the right next move. The work was making all of that legible without making it loud. A short status line where a spinner would do. A plain reason for each choice. Suggestions that feel like a collaborator reading the room, not a menu reopening itself.",
    closing: "The best front door does the routing so the person never has to learn the building.",
  },

  shipped: [
    {
      src: "/case-studies/assist/shot-home.jpg",
      aspect: "1710 / 934",
      alt: "Assist home with three intent starters and the History gallery",
      caption: "The start. Three plain intents (Create anything, Create image or video, Ask anything) over your own work, not an empty box.",
    },
    {
      src: "/case-studies/assist/shot-generate.jpg",
      aspect: "1710 / 934",
      alt: "Assist mid-generation, showing the Considering Image Generation status",
      caption: "Mid-flow. Assist names what it is doing (\"Considering Image Generation\") and generates inline, so the routing is never a black box.",
    },
    {
      src: "/case-studies/assist/shot-result.jpg",
      aspect: "1710 / 934",
      alt: "Assist completed generation with suggested next steps",
      caption: "The result, in-thread, with the next step offered: variation, upscale, or animate. The suite reveals itself through use.",
    },
    {
      src: "/case-studies/assist/shot-chat.jpg",
      aspect: "1710 / 934",
      alt: "Assist answering an aspect-ratio question, then offering to generate",
      caption: "The advice path. Ask a question, get a real answer, then an offer to act on it. Every reply ends in a creation.",
    },
    {
      src: "/case-studies/assist/shot-sessions.jpg",
      aspect: "1710 / 934",
      alt: "Assist sessions list with auto-titled conversations",
      caption: "Sessions. Threads auto-title and persist, so a direction you started yesterday is one click away today.",
    },
  ],

  outcome: {
    kind: "data",
    headline: "A launch that hit six figures of users in its first weeks, then held a plateau.",
    dateStamp: "Mixpanel · ImagineArt (Imagine Web - Prod) · One Chat - Agent · 2026",
    metrics: [
      { label: "Launch", value: "0 → 86K", caption: "interactions in the first month (Jan 2026)" },
      { label: "Peak", value: "191,796", caption: "in Feb 2026 · ~100K monthly users" },
      { label: "Engagement", value: "2.2", caption: "Assist messages per active user, per day" },
    ],
    closing:
      "Roughly 700K Assist interactions ran across the first five months, and the curve held a six-figure plateau rather than spiking and dying. The honest read: people will talk to the suite, and they come back. The open question is conversion, turning those conversations into the same depth of habit as the standalone tools.",
  },

  learnings: [
    {
      header: "Intent is the real interface.",
      body: "The tool grid was never the product. People come with a goal, and the design that mattered most was the one that read the goal and chose the tool for them.",
    },
    {
      header: "Show the reasoning, briefly.",
      body: "A one-line \"here is what I am doing\" did more for trust than any amount of polish. People forgive a machine that tells them how it is thinking.",
    },
    {
      header: "A front door has to lead somewhere.",
      body: "Assist earns its place by handing people off into the real tools, not by trapping them in chat. Suggesting the next step was the feature, not a nicety.",
    },
  ],

  next: {
    steps: [
      {
        n: "01",
        header: "Close the conversion gap",
        body: "Plenty of people talk to Assist. The next job is turning those sessions into the deep, repeat habit the standalone tools already earn.",
      },
      {
        n: "02",
        header: "Make routing transparent and editable",
        body: "Let people see and correct the model and settings Assist chose, so power users gain control without leaving the conversation.",
      },
      {
        n: "03",
        header: "Carry context across modalities",
        body: "An image, its upscale and its animation should share one thread of intent, so a project evolves in place instead of restarting each time.",
      },
      {
        n: "04",
        header: "Teach the suite through suggestions",
        body: "Tune the next-step prompts to surface tools people have not tried, turning Assist into the discovery layer for everything ImagineArt can do.",
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
    title: "Assist · Aman's Portfolio",
    description:
      "Designing ImagineArt Assist: a conversational, intent-first front door over a whole creative suite. Launched to six figures of monthly users, with real Mixpanel data.",
  },

  draft: true,
};
