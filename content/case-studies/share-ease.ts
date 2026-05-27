import type { CaseStudy } from "./types";

/**
 * SHARE EASE, case study #4.
 *
 * A bill-splitting app concept, designed end to end (brand, UX, UI, prototype,
 * marketing site) in one month. Sourced from the Behance case study
 * (behance.net/gallery/202794443). The app was handed to a React Native build
 * and is NOT publicly launched, so the Outcome is qualitative (no usage data).
 * Hero "stats" are project facts, not performance metrics. Screenshots are
 * cropped from the Behance presentation panels. Prose is drafted and flagged
 * `draft: true` pending the user's refinement.
 */
export const shareEase: CaseStudy = {
  slug: "share-ease",

  hero: {
    title: "Share Ease",
    subtitle: "Ending the awkward money text, not just doing the math.",
    liveLabel: "Case study on Behance",
    liveHref: "https://www.behance.net/gallery/202794443/Product-Case-Study-Share-Ease",
    description:
      "A bill-splitting app concept, taken from brand to marketing site in a single month. The bet: the category already does the math, so win by closing the loop on payment and wearing a friendlier face than the incumbent.",
    meta: [
      { label: "Year", value: "2024" },
      { label: "Role", value: "Product Designer, solo" },
      { label: "Scope", value: "Brand, UX/UI, Prototype, Web" },
    ],
    stats: [
      { label: "Timeline", value: "1 month", caption: "concept to handoff" },
      { label: "Surfaces", value: "4", caption: "brand · app · prototype · site" },
      { label: "Role", value: "Solo", caption: "end to end" },
      { label: "Build", value: "React Native", caption: "iOS and Android, in progress" },
    ],
    productShot: {
      src: "/case-studies/share-ease/cover.jpg",
      aspect: "1900 / 1281",
      alt: "Share Ease app screens, from onboarding to home, virtual card and rewards",
    },
  },

  context: {
    left: {
      heading: "What is Share Ease?",
      body: "Share Ease is a bill-splitting app. Create a group, log what everyone spent, split it, and settle up, all the way to the money actually moving. It pairs the usual expense tracking with a group virtual card and in-app payment requests to linked bank accounts.",
    },
    right: {
      heading: "Why this project?",
      body: "A one-month client concept, designed end to end. Splitwise owns this category but feels dated and stops at the math, leaving the actual payment to a group chat. The opening was a modern, friendly app that closes that last gap.",
    },
  },

  problem: {
    headline:
      "Splitting a bill was never a math problem. It's a social one. The awkward part isn't the arithmetic, it's asking a friend for the money.",
    cards: [
      {
        n: "01",
        title: "The math is solved",
        body: "Every competitor already tallies who owes what. Parity on tracking earns nothing. The unsolved part is everything after the total.",
      },
      {
        n: "02",
        title: "Money moves off-app",
        body: "Splitwise and Settle Up stop at a balance, then send you back to a bank app or a group chat. The awkward ask survives.",
      },
      {
        n: "03",
        title: "Finance feels cold",
        body: "Bank-grade UIs read as serious and dated. A money app that wants to feel friendly has to look nothing like the incumbent, without looking unsafe.",
      },
    ],
  },

  constraints: [
    {
      header: "One month, end to end",
      body: "Brand, UX, UI, an interactive prototype and a marketing site, solo, in four weeks. Scope discipline was the project.",
    },
    {
      header: "A crowded category",
      body: "Splitwise, Settle Up and Cino already own bill-splitting. Parity was table stakes, so the work had to earn a reason to switch.",
    },
    {
      header: "Real money, real trust",
      body: "Linking bank accounts and a group virtual card means the interface has to read as safe and legible first, clever second.",
    },
    {
      header: "Familiar flow, unfamiliar face",
      body: "The journey had to stay as recognizable as Splitwise so switching costs nothing, while the surface had to feel nothing like it.",
      span: true,
    },
  ],

  decisions: {
    northStar:
      "The job isn't done when the math is right. It's done when the money has moved.",
    items: [
      {
        headline: "Close the loop. Settle inside the app.",
        points: [
          {
            n: "01",
            header: "Pay, don't just tally",
            body: "A settle-up flow sends a payment request straight to a member's linked bank account, so the balance clears without leaving Share Ease.",
          },
          {
            n: "02",
            header: "A group virtual card",
            body: "Link the group's accounts once and a shared card splits and deducts every expense for you, removing the chase-down entirely.",
          },
          {
            n: "03",
            header: "The chat never happens",
            body: "When money moves on its own, nobody has to send the 'you owe me $16' text. That was the whole point.",
          },
        ],
      },
      {
        headline: "Bet the difference on craft, not features.",
        points: [
          {
            n: "01",
            header: "Read the gap",
            body: "The competitive audit was blunt: the market leader fails the modern user because it lacks a modern, minimal look. That was the wedge.",
          },
          {
            n: "02",
            header: "A friendly money brand",
            body: "A bright orange and yellow system, rounded forms and an interlocking-S mark, built to feel approachable rather than corporate.",
          },
          {
            n: "03",
            header: "Plain language",
            body: "The whole brand speaks to one fear, no awkward conversations about money, instead of listing fintech features.",
          },
        ],
      },
      {
        headline: "Reward the everyday, not just the spend.",
        points: [
          {
            n: "01",
            header: "Points for normal use",
            body: "Creating a group, adding an expense, settling up, all earn loyalty points, so routine actions build toward something.",
          },
          {
            n: "02",
            header: "Redeem in the real world",
            body: "Scan a QR at a partner restaurant to cash points in for a discount, tying the app back to the meals people split in the first place.",
          },
          {
            n: "03",
            header: "A reason to return",
            body: "A bill-splitter you only open when someone owes you is a calculator. Rewards give a reason to open it the rest of the time.",
          },
        ],
      },
    ],
  },

  craft: {
    headline: "One split screen, three ideas of what's fair.",
    body: "Fairness isn't one formula. Someone wants to split evenly, someone wants exact amounts, someone thinks in percentages. So the split screen is a single component that renders three ways: a balance for an even split, a pie for percentages, an itemized list for amounts. Same screen, same muscle memory, with a running total that always reconciles to the bill.",
    closing:
      "Fairness is something people feel, not a setting they configure. The interface should bend to the intuition, not the other way around.",
    image: "/case-studies/share-ease/shot-split.jpg",
    imageAspect: "1800 / 931",
  },

  shipped: [
    {
      src: "/case-studies/share-ease/shot-home.jpg",
      aspect: "1800 / 806",
      alt: "Onboarding and the home balance screen",
      caption: "Onboarding into the home balance. The first thing you see is what you owe and what you're owed, not an empty dashboard.",
    },
    {
      src: "/case-studies/share-ease/shot-expense.jpg",
      aspect: "1800 / 903",
      alt: "Adding an expense and splitting it",
      caption: "Adding an expense. Pick people or a whole group, set who paid and how it splits, in one pass.",
    },
    {
      src: "/case-studies/share-ease/shot-card.jpg",
      aspect: "1800 / 1028",
      alt: "The group virtual card setup",
      caption: "The group virtual card. Link accounts once and every shared cost splits and settles on its own.",
    },
    {
      src: "/case-studies/share-ease/shot-settle.jpg",
      aspect: "1800 / 917",
      alt: "Settling up by sending a request to a linked bank account",
      caption: "Settling up. Choose a balance, then send a request straight to a linked bank account. No leaving the app.",
    },
    {
      src: "/case-studies/share-ease/shot-loyalty.jpg",
      aspect: "1800 / 945",
      alt: "Redeeming loyalty points at a partner outlet",
      caption: "Redeeming rewards. Points earned across the app cash in for a real discount at a partner outlet.",
    },
    {
      src: "/case-studies/share-ease/shot-web.jpg",
      aspect: "1800 / 1018",
      alt: "The Share Ease marketing site hero",
      caption: "The marketing site. One promise above the fold and two store buttons, the route from visitor to download.",
    },
  ],

  outcome: {
    kind: "qualitative",
    headline: "A complete product concept, shipped to development in a month.",
    cards: [
      {
        label: "Status",
        body: "Brand, app, interactive prototype and marketing site, delivered end to end and handed to a React Native build.",
      },
      {
        label: "Scope",
        body: "Four surfaces from one designer in four weeks, held together by a single system and one promise.",
      },
      {
        label: "Build",
        body: "In development for iOS and Android. No public launch yet, so there are no usage numbers to claim.",
      },
    ],
    closing:
      "The honest outcome is a finished concept, not a shipped metric. What held up was the spine: closing the loop on payment is the one idea every screen serves.",
  },

  learnings: [
    {
      header: "Parity is the floor, not the pitch",
      body: "In a solved category, matching features changes nothing. The audit pointed straight at the gap, a dated incumbent, and that gap became the whole strategy.",
    },
    {
      header: "The product ends where the money lands",
      body: "Tracking a balance is the easy 80 percent. The reason this concept exists is the last 20, getting the payment to move so the awkward ask disappears.",
    },
    {
      header: "A friendly face is a feature in fintech",
      body: "Trust and warmth aren't opposites. A bright, plainspoken brand did more to make a money app feel usable than any extra setting would have.",
    },
  ],

  next: {
    steps: [
      {
        n: "01",
        header: "Ship the React Native build",
        body: "The design is done. The real test is the live app on both stores and the first real settle-up.",
      },
      {
        n: "02",
        header: "Pressure-test the virtual card",
        body: "Auto-splitting real money needs the edge cases, refunds, partial pays and disputes, designed before launch, not after.",
      },
      {
        n: "03",
        header: "Earn the second open",
        body: "Rewards are the hypothesis for retention. Instrument them and prove people come back when no one owes them money.",
      },
      {
        n: "04",
        header: "Localize beyond HK$",
        body: "The concept assumes one currency and region. Multi-currency groups are the obvious next market.",
      },
    ],
    nav: {
      next: {
        label: "Next case study",
        title: "Clinio",
        href: "/work/clinio",
      },
      all: { label: "All work", title: "Back to work", href: "/" },
    },
  },

  seo: {
    title: "Share Ease · Aman's Portfolio",
    description:
      "Designing Share Ease, a bill-splitting app concept taken from brand to marketing site in a month. Closing the loop on payment so the awkward money conversation never has to happen.",
  },

  draft: true,
};
