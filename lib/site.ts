/* -------------------------------------------------------------------------
 * EDIT ME — All portfolio content lives here.
 * Text, links, project data, and social URLs are grouped so you can update
 * everything in one place. Placeholders are marked with [Add ...] — replace
 * them with verified details before publishing.
 * ---------------------------------------------------------------------- */

export const site = {
  name: "Yahya Chanat",
  role: "Full-Stack Software Engineer",
  // Update to your real deployed domain for correct SEO / social previews.
  url: "https://yahya-chanat.vercel.app",
  location: "Elazığ, Türkiye",
  description:
    "Full-stack software engineer building SaaS products and web applications — from real-time platforms to AI-driven tools, with an eye for clean code and product craft.",
  availability: {
    open: true,
    label: "Available for select projects",
  },
  email: "yahyashannat@gmail.com",
  resume: "/resume/Yahya-Chanat-Resume.pdf",
}

export const socials = [
  { label: "GitHub", handle: "YASHDEV42", href: "https://github.com/YASHDEV42" },
  { label: "Instagram", handle: "@yahya.chanat", href: "https://www.instagram.com/yahya.chanat/" },
  { label: "Facebook", handle: "yahya.shannat", href: "https://www.facebook.com/yahya.shannat" },
  { label: "YouTube", handle: "Channel", href: "https://www.youtube.com/channel/UC2tvTb_DX35TLUCTj9m1byg" },
  { label: "WhatsApp", handle: "+90 536 885 3122", href: "https://wa.me/905368853122" },
  // { label: "LinkedIn", handle: "[Add LinkedIn handle]", href: "[Add LinkedIn URL]" },
]

export const hero = {
  // The big kinetic wordmark line, split for staggered animation.
  greeting: "Hi, I'm Yahya —",
  headline: ["I design and", "engineer", "products", "end to end."],
  intro:
    "A full-stack engineer focused on shipping SaaS products and web applications that feel considered. I move comfortably from React and Next.js on the front end to NestJS, MongoDB, and PostgreSQL on the back — including real-time systems and Arabic localization.",
  stats: [
    { value: "6+", label: "Products shipped" },
    { value: "Full-stack", label: "Front to back" },
    { value: "Real-time", label: "Systems & AI" },
  ],
}

export const about = {
  // Written in a human first-person voice — verified from your bio.
  paragraphs: [
    "I'm Yahya Chanat, a full-stack engineer currently in my third year of Software Engineering at Fırat University. I like the whole arc of building software: understanding a fuzzy problem, shaping it into an interface, and standing up the systems that make it real.",
    "I started with the fundamentals — HTML, CSS, and JavaScript — and grew into modern tooling like React, Next.js, and NestJS, backed by MongoDB and PostgreSQL. Along the way I've built blogging platforms, real-time chat, and an AI-driven social media scheduler.",
    "What I care about most: clean code, performance that holds up under real load, and thoughtful details — including proper Arabic localization and right-to-left support that most products treat as an afterthought.",
  ],
  enjoys: [
    "Turning vague ideas into shippable product",
    "Real-time and event-driven systems",
    "Interfaces that respect RTL and localization",
    "Performance profiling and refactors that stick",
  ],
  // Replace with a real portrait — see the note in the About section UI.
  portrait: null as string | null,
}

export const strengths = [
  {
    title: "Product thinking",
    body: "I start from the user and the problem, not the framework. Scope, trade-offs, and the smallest thing that actually ships.",
  },
  {
    title: "Full-stack range",
    body: "Comfortable across the stack — component architecture and state on the front, APIs, data modeling, and real-time on the back.",
  },
  {
    title: "Craft & polish",
    body: "Motion, accessibility, and the last 10% of detail that separates a demo from a product people trust.",
  },
]

export type SkillGroup = {
  category: string
  note: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    note: "Interfaces I'd actually want to use — accessible, fast, and responsive.",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "Backend",
    note: "APIs and services designed to be understood a year from now.",
    items: ["NestJS", "Node.js", "REST", "Real-time / WebSockets"],
  },
  {
    category: "Data",
    note: "Modeling data so the product can grow without a rewrite.",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    category: "Practice",
    note: "How the work gets built and kept healthy.",
    items: ["Clean code", "Performance", "Arabic / RTL localization", "Git"],
  },
]

export type Project = {
  slug: string
  name: string
  tagline: string
  year: string
  role: string
  category: string
  image: string
  live: string
  repo?: string
  stack: string[]
  // Case-study fields — replace [Add ...] placeholders with verified detail.
  problem: string
  contribution: string
  decisions: string[]
  outcome: string
}

export const projects: Project[] = [
  {
    slug: "yshai",
    name: "YSHAI",
    tagline: "AI-driven social media scheduler",
    year: "2025",
    role: "Full-stack engineer",
    category: "AI / SaaS",
    image: "/img/screenshot-2026-04-23_15-08-14.png",
    live: "https://projects-delta-five.vercel.app/",
    repo: "https://github.com/YASHDEV42",
    stack: ["Next.js", "NestJS", "PostgreSQL", "AI"],
    problem:
      "Creators and small teams juggle multiple social platforms and lose hours planning, drafting, and timing posts.",
    contribution:
      "Built the product end to end — the scheduling UI, the API and job scheduling on the back end, and the AI assistance for drafting content.",
    decisions: [
      "Queue-based scheduling so posts fire reliably without blocking requests.",
      "AI assistance layered as an optional step, never a blocker to shipping a post.",
      "[Add key architectural or product decision you want to highlight]",
    ],
    outcome: "[Add project outcome — e.g. users, posts scheduled, time saved, or lessons learned]",
  },
  {
    slug: "yashblog",
    name: "YASHBLOG",
    tagline: "A fast, writer-first blogging platform",
    year: "2024",
    role: "Full-stack engineer",
    category: "Content platform",
    image: "/img/project-1.png",
    live: "https://projects-delta-five.vercel.app/",
    repo: "https://github.com/YASHDEV42",
    stack: ["Next.js", "Node.js", "MongoDB"],
    problem:
      "Most blogging tools are either too heavy or too rigid for someone who just wants to write and publish cleanly.",
    contribution:
      "Designed and implemented the authoring experience, content model, and rendering pipeline for a snappy reading experience.",
    decisions: [
      "Content model built to support rich posts without locking into one editor.",
      "Server-rendered reads for fast first paint and SEO.",
      "[Add key decision]",
    ],
    outcome: "[Add project outcome]",
  },
  {
    slug: "yashchat",
    name: "YASHCHAT",
    tagline: "Real-time messaging, done right",
    year: "2024",
    role: "Full-stack engineer",
    category: "Real-time",
    image: "/img/project-2.png",
    live: "https://projects-delta-five.vercel.app/",
    repo: "https://github.com/YASHDEV42",
    stack: ["NestJS", "WebSockets", "MongoDB", "React"],
    problem:
      "Real-time chat looks simple but gets hard fast: presence, delivery, and keeping the UI in sync under flaky networks.",
    contribution:
      "Implemented the real-time layer and the client state model that keeps conversations consistent across reconnects.",
    decisions: [
      "WebSocket events with a clear client-side source of truth to avoid duplicate/out-of-order messages.",
      "Optimistic UI with reconciliation once the server confirms.",
      "[Add key decision]",
    ],
    outcome: "[Add project outcome]",
  },
  {
    slug: "yashstore",
    name: "YASHSTORE",
    tagline: "An e-commerce storefront",
    year: "2024",
    role: "Full-stack engineer",
    category: "E-commerce",
    image: "/img/project-3.png",
    live: "https://projects-delta-five.vercel.app/",
    repo: "https://github.com/YASHDEV42",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    problem: "[Add the core problem this store set out to solve or the context you built it in]",
    contribution:
      "Built the catalog, cart, and checkout flow with a focus on a clean, responsive shopping experience.",
    decisions: [
      "Server-side data fetching for product pages to keep them fast and indexable.",
      "[Add key decision]",
    ],
    outcome: "[Add project outcome]",
  },
  {
    slug: "yashtask",
    name: "YASHTASK",
    tagline: "Task management that stays out of the way",
    year: "2023",
    role: "Full-stack engineer",
    category: "Productivity",
    image: "/img/project-4.png",
    live: "https://projects-delta-five.vercel.app/",
    repo: "https://github.com/YASHDEV42",
    stack: ["React", "Node.js", "MongoDB"],
    problem: "[Add the core problem — e.g. keeping personal or team tasks organized without overhead]",
    contribution: "Designed the task model and the interactions for creating, organizing, and completing work quickly.",
    decisions: ["[Add key decision]", "[Add key decision]"],
    outcome: "[Add project outcome]",
  },
  {
    slug: "quizyourself",
    name: "QuizYourSelf",
    tagline: "Build, take, and learn from quizzes",
    year: "2023",
    role: "Full-stack engineer",
    category: "Education",
    image: "/img/project-5.png",
    live: "https://projects-delta-five.vercel.app/",
    repo: "https://github.com/YASHDEV42",
    stack: ["React", "Node.js", "MongoDB"],
    problem: "[Add the core problem — e.g. self-testing to reinforce learning]",
    contribution: "Built quiz creation, the quiz-taking flow, and scoring/feedback.",
    decisions: ["[Add key decision]", "[Add key decision]"],
    outcome: "[Add project outcome]",
  },
]

export const process = [
  {
    step: "01",
    title: "Understand",
    body: "Start with the problem and the people who have it. Clarify scope, constraints, and what success actually looks like before writing code.",
  },
  {
    step: "02",
    title: "Design",
    body: "Shape the experience — flows, interface, and data model. Prototype the risky parts early so the important decisions surface first.",
  },
  {
    step: "03",
    title: "Build",
    body: "Implement front to back with clean, typed code. Keep components and APIs small, readable, and honest about their boundaries.",
  },
  {
    step: "04",
    title: "Test",
    body: "Exercise the real paths — edge cases, error states, slow networks. Profile performance and fix what actually hurts.",
  },
  {
    step: "05",
    title: "Ship",
    body: "Deploy, watch how it behaves with real usage, and iterate. Shipping is the start of the feedback loop, not the end.",
  },
]

export type TimelineItem = {
  period: string
  title: string
  org: string
  kind: "work" | "education"
  body: string
}

export const timeline: TimelineItem[] = [
  {
    period: "2023 — Present",
    title: "B.Sc. Software Engineering",
    org: "Fırat University",
    kind: "education",
    body: "Third-year Software Engineering student, building a foundation in systems, algorithms, and software design while shipping real projects on the side.",
  },
  {
    period: "Ongoing",
    title: "Independent Full-Stack Projects",
    org: "Self-directed",
    kind: "work",
    body: "Designing and building SaaS products and web applications — YSHAI, YASHBLOG, YASHCHAT, and more — across the full stack.",
  },
  {
    period: "[Add year]",
    title: "[Add role or title]",
    org: "[Add company or organization]",
    kind: "work",
    body: "[Add a short description of your responsibilities and impact. Do not leave placeholder text in the published site.]",
  },
]
