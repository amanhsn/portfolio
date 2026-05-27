import type { CaseStudy } from "./types";

/**
 * CLINIO, case study #5.
 *
 * A European telemedicine MVP for a Belgian client. Sourced from the Behance
 * case study (behance.net/gallery/217896347). A web app for two user roles
 * (patients + practitioners), blockchain/GDPR backend, React + shadcn build.
 * Delivered v1 + a reusable Figma file and handed off for implementation; NOT
 * publicly launched, so the Outcome is qualitative (no usage data). Hero
 * "stats" are project facts. Screenshots are cropped from the Behance panels.
 * Prose is drafted and flagged `draft: true` pending the user's refinement.
 */
export const clinio: CaseStudy = {
  slug: "clinio",

  hero: {
    title: "Clinio",
    subtitle: "A telehealth MVP serving patient and doctor as two products in one.",
    liveLabel: "Case study on Behance",
    liveHref: "https://www.behance.net/gallery/217896347/Clinio-Case-Study",
    description:
      "A telemedicine MVP for a Belgian client out to disrupt European telehealth. The platform connects patients and practitioners on one web app, secured by blockchain and built accessibility first, with the patient and the doctor each getting an experience shaped for them.",
    meta: [
      { label: "Year", value: "2025" },
      { label: "Role", value: "Lead Product Designer" },
      { label: "Scope", value: "Brand, Research, UX/UI, Prototype" },
    ],
    stats: [
      { label: "Timeline", value: "8 weeks", caption: "research to handoff" },
      { label: "Team", value: "5", caption: "design lead, 3 devs, PM" },
      { label: "User roles", value: "2", caption: "patient and practitioner" },
      { label: "Delivered", value: "v1 + Figma", caption: "handed to a React build" },
    ],
    productShot: {
      src: "/case-studies/clinio/cover.jpg",
      aspect: "1900 / 1259",
      alt: "Clinio telemedicine dashboards for the patient and the practitioner",
    },
  },

  context: {
    left: {
      heading: "What is Clinio?",
      body: "Clinio is a telemedicine platform for a Belgian client, connecting patients to medical practitioners across Europe. Book a doctor, hold a video or in-person consultation, and manage records, prescriptions and schedules. One web app, two roles, with a blockchain backend for sensitive medical data.",
    },
    right: {
      heading: "Why this project?",
      body: "An MVP for a client out to disrupt European telehealth. Post-COVID, demand had surged, but 41% of patients still struggled to access telehealth and a third of providers were unhappy with existing tools. The opening was a platform built for usability and trust, not just features.",
    },
  },

  problem: {
    headline:
      "How do you build one platform for two opposite users, a low-confidence patient and a busy doctor, without shortchanging either, when the data involved is the most sensitive there is?",
    cards: [
      {
        n: "01",
        title: "Two users, one app",
        body: "A retired patient and a practicing doctor want almost opposite things. Build one experience for both and you serve neither well.",
      },
      {
        n: "02",
        title: "The least confident user",
        body: "Sofie, 52, low tech literacy, lives alone, can't 'ask for help.' If the platform loses her, it loses the people who need telehealth most.",
      },
      {
        n: "03",
        title: "Trust is the product",
        body: "Medical history is the most sensitive data there is. Without visible security, no usability win matters, because nobody signs up.",
      },
    ],
  },

  constraints: [
    {
      header: "Eight weeks, with scope creep",
      body: "An MVP timeline that kept growing. The work had to absorb new scope without forcing a redesign.",
    },
    {
      header: "Two roles, one codebase",
      body: "Patients and practitioners needed distinct experiences that still shared components, so the team could build both at once.",
    },
    {
      header: "Blockchain backend, under GDPR",
      body: "A blockchain smart-contract backend and European privacy law shaped what the interface had to promise and prove.",
    },
    {
      header: "Designed to be developed",
      body: "A React and shadcn build meant designing in real, reusable components from day one, not mockups a developer would have to reverse-engineer.",
      span: true,
    },
  ],

  decisions: {
    northStar:
      "One platform, but never one-size-fits-all. The patient and the doctor each get a product built for them.",
    items: [
      {
        headline: "Design for the least confident user first.",
        points: [
          {
            n: "01",
            header: "Accessibility as the baseline",
            body: "Legible type, generous targets and plain labels, set by the patient who can't ask for help rather than the doctor who can.",
          },
          {
            n: "02",
            header: "A calmer dashboard",
            body: "Testing showed the first dashboard overwhelmed people, so the layout was contained into clear cards with one obvious next action.",
          },
          {
            n: "03",
            header: "A collapsible sidebar",
            body: "The navigation everyone actually used was made collapsible, giving the screen breathing room, and the freed top bar became search.",
          },
        ],
        validation:
          "Usability testing, n=7: 6 of 7 navigated by the sidebar (the top bar went unused) and 5 of 7 found the first dashboard overwhelming. Both findings became the redesign brief.",
      },
      {
        headline: "Split the platform by role, not by feature.",
        points: [
          {
            n: "01",
            header: "Two information architectures",
            body: "Patients lead with finding care and booking. Practitioners lead with managing a schedule and patients. Same bones, opposite priorities.",
          },
          {
            n: "02",
            header: "Color tells you where you are",
            body: "Patients live in blue, practitioners in green. A glance confirms which side of the platform you're on, with no label to read.",
          },
          {
            n: "03",
            header: "One system underneath",
            body: "Both roles share the calendar, the cards and the chrome, so the team built two experiences from a single component set.",
          },
        ],
        validation:
          "The two personas pulled in opposite directions: Sofie wanted a simple way to book from home; Eric, a young GP, wanted control over his availability and patient records. One generic dashboard would have failed both.",
      },
      {
        headline: "Design it to be built, not just to be seen.",
        points: [
          {
            n: "01",
            header: "Real components, not mockups",
            body: "Designed in React and shadcn building blocks from the start, so what I handed over mapped to what the team would code.",
          },
          {
            n: "02",
            header: "Modular against scope creep",
            body: "Building from reusable components meant new scope slotted in as new arrangements, not new redesigns. That is how v1 still shipped.",
          },
          {
            n: "03",
            header: "A handoff that lasts",
            body: "The deliverable was a functional, reusable Figma file, a system the team could keep building on after I left.",
          },
        ],
      },
    ],
  },

  craft: {
    headline: "Consent you can see, at the moment it matters.",
    body: "Before a booking confirms, the patient hits a Data Sharing step: a single toggle for whether to share their medical history with the practitioner, paired with a plain-language note that Clinio stores data on a blockchain under GDPR. Privacy isn't buried in a settings menu or a policy nobody reads. It sits in the flow, right where trust is decided.",
    closing:
      "In healthcare, the security model is part of the interface. If users can't see the trust, it isn't doing its job.",
    image: "/case-studies/clinio/shot-privacy.jpg",
    imageAspect: "1800 / 949",
  },

  shipped: [
    {
      src: "/case-studies/clinio/shot-patient.jpg",
      aspect: "1800 / 855",
      alt: "Clinio patient dashboard in blue",
      caption: "The patient home, in blue. Find a practitioner, see the next appointment and the calendar, on one calm screen.",
    },
    {
      src: "/case-studies/clinio/shot-practitioner.jpg",
      aspect: "1800 / 860",
      alt: "Clinio practitioner dashboard in green",
      caption: "The same skeleton for doctors, in green. Manage requests, patients and a schedule instead of finding care.",
    },
    {
      src: "/case-studies/clinio/shot-find.jpg",
      aspect: "1800 / 841",
      alt: "Find a medical practitioner search and results",
      caption: "Find a practitioner. Search by city and specialty, compare video and in-person rates, then book in a few clicks.",
    },
    {
      src: "/case-studies/clinio/shot-booking.jpg",
      aspect: "1800 / 860",
      alt: "Appointment booking with available timeslots",
      caption: "Booking. Pick a real open slot from the practitioner's own availability, online or in clinic.",
    },
    {
      src: "/case-studies/clinio/shot-history.jpg",
      aspect: "1800 / 893",
      alt: "Appointment history, past and upcoming",
      caption: "Appointment history. Past and upcoming together, with notes and profiles a click away for both roles.",
    },
  ],

  outcome: {
    kind: "qualitative",
    headline: "Version 1, delivered end to end in eight weeks, despite a moving target.",
    cards: [
      {
        label: "Status",
        body: "Brand, research, a two-role product and an interactive prototype, delivered and handed to the team for a React build.",
      },
      {
        label: "Scope",
        body: "A growing MVP brief, absorbed through modular components rather than redesigns, so v1 still shipped on time.",
      },
      {
        label: "Handoff",
        body: "A functional, reusable Figma file. The system, not just the screens, was the deliverable. No public launch numbers to claim.",
      },
    ],
    closing:
      "The honest outcome is a shipped v1 and a system the team kept building on, not a usage metric. What held up under scope creep was the decision to design in real components from day one.",
  },

  learnings: [
    {
      header: "Design for the edge, the middle comes free",
      body: "Building for Sofie, the least confident user, produced an interface that was easier for everyone, including the doctor who could have handled more complexity.",
    },
    {
      header: "Two roles is two products",
      body: "Trying to please a patient and a practitioner with one screen pleases neither. Splitting the IA, held together by one system, was the unlock.",
    },
    {
      header: "Components are how MVPs survive scope creep",
      body: "The brief grew the whole way through. Designing in reusable, dev-ready pieces is the only reason version 1 still shipped in eight weeks.",
    },
  ],

  next: {
    steps: [
      {
        n: "01",
        header: "Validate the live build",
        body: "The prototype tested well. The real proof is patients booking and doctors managing schedules in the shipped React app.",
      },
      {
        n: "02",
        header: "Push accessibility further",
        body: "Screen-reader support and high-contrast modes were a stated need from low-vision patients. Make them first-class, not a setting.",
      },
      {
        n: "03",
        header: "Earn the trust claim",
        body: "The blockchain promise needs to be legible to non-technical patients. Test whether the data-safety note actually builds confidence.",
      },
      {
        n: "04",
        header: "Connect the health ecosystem",
        body: "Patients asked to sync wearables and health apps. A connected record is the next reason to stay on Clinio between visits.",
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
    title: "Clinio · Aman's Portfolio",
    description:
      "Designing Clinio, a European telemedicine MVP for two user roles, built accessibility-first with a blockchain backend. One platform, a patient product and a doctor product.",
  },

  draft: true,
};
