import type { CaseStudy } from "./types";

/**
 * POWER ZONE, case study #2.
 *
 * A brand + marketing site the user designed in Figma and built in Framer, end
 * to end, for a Pakistani diesel-generator and battery-storage company. Copy is
 * drafted to the spec voice (plain, human, no em dashes) from the live site at
 * powerzone.com.pk and flagged `draft: true` pending the user's real data
 * (year, the real decisions and rejected alternatives, learnings, next steps).
 *
 * Core angle (locked with the user): application-first IA. Outcome is qualitative.
 */
export const powerZone: CaseStudy = {
  slug: "power-zone",

  hero: {
    title: "Power Zone",
    subtitle: "Selling uptime to five industries, not a generator catalog to everyone.",
    liveLabel: "powerzone.com.pk",
    liveHref: "https://powerzone.com.pk",
    description:
      "A brand and marketing site for Power Zone, a Pakistani diesel-generator and battery-storage company. Designed in Figma and built in Framer end to end: positioning, pages, and one lead path that turns five very different industrial buyers into Contact Sales conversations.",
    meta: [
      { label: "Year", value: "2024" },
      { label: "Role", value: "Design, Framer build, brand & content" },
      { label: "Scope", value: "Brand, web design, Framer development, content" },
    ],
    stats: [
      { label: "Industries served", value: "5", caption: "One site, five buyers" },
      { label: "Generator brands", value: "4", caption: "FPT, Yuchai, Cummins, Perkins" },
      { label: "Official partnerships", value: "2", caption: "Cummins GOEM, FPT distributor" },
      { label: "Design to ship", value: "Framer", caption: "Designed and built solo" },
    ],
    productShot: {
      src: "/case-studies/power-zone/hero.png",
      aspect: "1512 / 945",
      alt: "Power Zone homepage hero, a red diesel generator with reliable backup power messaging",
    },
  },

  context: {
    left: {
      heading: "What is Power Zone?",
      body: "Power Zone supplies diesel generators and battery energy storage to industry across Pakistan. An authorized Cummins GOEM and FPT distributor, with FPT, Yuchai, Cummins and Perkins on the floor. When the grid drops, their hardware keeps hospitals, data centers and factories running.",
    },
    right: {
      heading: "Why this project?",
      body: "Power Zone sells reliability, but the old presence sold spec sheets. Five very different buyers, from utilities to housing developers, all landed in the same generic catalog. The brief was one site that makes each industry feel understood and turns trust into a sales conversation.",
    },
  },

  problem: {
    headline:
      "A diesel generator is a commodity. The decision to buy one is not. One site had to speak to a data center, a utility, a government office and a housing developer without collapsing into a parts catalog.",
    cards: [
      {
        n: "01",
        title: "Five buyers, one page",
        body: "Utilities, data centers, government, commercial and residential developers each have different stakes. A single generic pitch speaks to none of them.",
      },
      {
        n: "02",
        title: "Trust over specs",
        body: "Anyone can list kVA ratings. The real question a buyer has is whether the company behind the box will show up when the grid goes down.",
      },
      {
        n: "03",
        title: "No catalog, no cart",
        body: "This is a lead-gen site, not a store. Success is a Contact Sales conversation, not an add to cart.",
      },
    ],
  },

  constraints: [
    {
      header: "Application-led, not product-led",
      body: "The list of brands and ratings could not be the spine. Buyers think in their own industry first.",
    },
    {
      header: "Lead-gen only",
      body: "No pricing, no checkout. Every path had to end at Contact Sales.",
    },
    {
      header: "Honor the OEM relationships",
      body: "Authorized Cummins GOEM and FPT distributor status is the credibility. The brand had to respect those marks.",
    },
    {
      header: "Design and build in Framer",
      body: "One person, one tool, from Figma to a live, CMS-backed site. Speed and maintainability over a custom stack.",
    },
    {
      header: "Five audiences, one budget",
      body: "No room for five microsites. The IA had to flex to five industries inside one coherent brand.",
      span: true,
    },
  ],

  decisions: {
    northStar:
      "Sell the outcome, uptime for your industry, not the box.",
    items: [
      {
        headline: "Lead with applications, not products.",
        diagram: "applications-ia",
        points: [
          {
            n: "01",
            header: "Industries are the entry point",
            body: "Use Cases sit up front: utilities, data centers, government, commercial, residential. Each buyer sees their own world before they see a generator.",
          },
          {
            n: "02",
            header: "Products answer a need",
            body: "FPT, Yuchai, Cummins and Perkins become the answer to an industry problem, not a wall of SKUs to decode. The alternative, a product-catalog homepage, would have made every buyer do the translation themselves.",
          },
          {
            n: "03",
            header: "One IA, five doors",
            body: "The same site reshapes itself per audience, so five buyers each feel like it was built for them.",
          },
        ],
      },
      {
        headline: "Make the company the product.",
        points: [
          {
            n: "01",
            header: "The line that anchors everything",
            body: "\"It's not the product, it's the company behind the product.\" Reliability is a promise about the vendor, so the brand leads with the company, not the kVA.",
          },
          {
            n: "02",
            header: "Proof, not adjectives",
            body: "Authorized Cummins GOEM and FPT distributor marks do the trust work that a spec sheet cannot.",
          },
          {
            n: "03",
            header: "Value props in plain terms",
            body: "Engineered for reliability. Stable, high-quality power. Rapid response startup. Real bill savings. Outcomes a plant manager actually cares about.",
          },
        ],
      },
      {
        headline: "One funnel: everything points to Contact Sales.",
        points: [
          {
            n: "01",
            header: "Remove the dead ends",
            body: "No pricing tables to stall on, no cart to abandon. Every section resolves to a single action.",
          },
          {
            n: "02",
            header: "Qualify in the conversation",
            body: "A B2B generator sale is a conversation, so the site's job is to earn the first reply, not close the deal on the page.",
          },
          {
            n: "03",
            header: "Repeat the CTA with intent",
            body: "Contact Sales rides the nav and closes every section, so the next step is never more than a scroll away.",
          },
        ],
      },
    ],
  },

  craft: {
    headline: "The Use Cases section turns one catalog into five front doors.",
    body: "Each industry gets its own card, its own image, and a solution framed in its language. A utility reads \"bridge supply gaps and enhance grid reliability.\" A data center reads \"uninterrupted power for zero-failure environments.\" Same hardware underneath, a different promise on top.",
    closing: "Application-first is not a layout. It is deciding the buyer's industry matters more than your product list.",
    image: "/case-studies/power-zone/applications.png",
    imageAspect: "1512 / 945",
  },

  shipped: [
    {
      src: "/case-studies/power-zone/hero.png",
      aspect: "1512 / 945",
      alt: "Power Zone hero section",
      caption: "The hero. Reliable backup power, stated plainly, with one action.",
    },
    {
      src: "/case-studies/power-zone/products.png",
      aspect: "1512 / 945",
      alt: "Power Zone generator brand lineup",
      caption: "The brand lineup. FPT, Yuchai, Cummins and Perkins, each with a one-line reason to trust it.",
    },
    {
      src: "/case-studies/power-zone/applications.png",
      aspect: "1512 / 945",
      alt: "Power Zone use cases by industry",
      caption: "Use Cases. Every industry sees its own world before it sees a generator.",
    },
    {
      src: "/case-studies/power-zone/valueprops.png",
      aspect: "1512 / 945",
      alt: "Power Zone value propositions",
      caption: "What sets Power Zone apart. Outcomes a plant manager cares about, not a spec sheet.",
    },
  ],

  outcome: {
    kind: "qualitative",
    headline: "Live and selling as Power Zone's primary presence.",
    cards: [
      {
        label: "Status",
        body: "Live at powerzone.com.pk, designed in Figma and built in Framer.",
      },
      {
        label: "Reach",
        body: "One coherent brand covering five industries and four generator lines.",
      },
      {
        label: "Inheritance",
        body: "A CMS-backed Framer system the client can extend without a developer.",
      },
    ],
    closing:
      "The site does the qualifying a catalog never could. It makes each buyer feel seen, then asks for the conversation.",
  },

  learnings: [
    {
      header: "Lead with the buyer, not the product.",
      body: "Organizing around five industries instead of a brand list changed who the site was for. People buy when they recognize their own problem first.",
    },
    {
      header: "Trust is a brand job, not a spec job.",
      body: "On a commodity, the deciding factor is the company. Saying so out loud, and backing it with OEM proof, did more than any data sheet.",
    },
    {
      header: "Framer let one person own the whole thing.",
      body: "Designing and shipping in one tool meant the brand decisions and the build never drifted apart, and the client can keep it alive.",
    },
  ],

  next: {
    steps: [
      {
        n: "01",
        header: "Per-industry landing pages",
        body: "Give each use case a deeper page with its own proof, sizing guidance and references.",
      },
      {
        n: "02",
        header: "Case studies and installs",
        body: "Real Pakistani deployments, named clients, uptime numbers. The strongest trust signal there is.",
      },
      {
        n: "03",
        header: "Sizing and quote helper",
        body: "A simple \"what do you need\" flow that pre-qualifies the Contact Sales conversation.",
      },
      {
        n: "04",
        header: "Bilingual and local SEO",
        body: "Urdu support and city-level pages to own diesel-generator search across Pakistan.",
      },
    ],
    nav: {
      next: {
        label: "Next case study",
        title: "ImagineArt Upscale",
        href: "/work/upscale",
      },
      all: { label: "All work", title: "Back to work", href: "/" },
    },
  },

  seo: {
    title: "Power Zone · Aman's Portfolio",
    description:
      "Designing and building Power Zone in Framer: an application-first B2B site for a Pakistani diesel-generator and battery-storage company.",
  },

  draft: true,
};
