/* Stable names, links, media, and technology facts live here. Localized
 * editorial copy lives in messages/{en,tr,ar}.json and is merged below. */

export const site = {
  name: "Yahya Chanat",
  url: "https://yahya-chanat.vercel.app",
  availabilityOpen: true,
  email: "yahyashannat@gmail.com",
  resume: "/resume/Yahya-Chanat-Resume.pdf",
};

export const socials = [
  {
    label: "GitHub",
    handle: "YASHDEV42",
    href: "https://github.com/YASHDEV42",
  },
  {
    label: "LinkedIn",
    handle: "yahya-chanat",
    href: "https://www.linkedin.com/in/yahya-chanat-827909223/",
  },
  {
    label: "Instagram",
    handle: "@yahya.chanat",
    href: "https://www.instagram.com/yahya.chanat/",
  },
  {
    label: "Facebook",
    handle: "yahya.shannat",
    href: "https://www.facebook.com/yahya.shannat",
  },
  {
    label: "YouTube",
    handle: "Channel",
    href: "https://www.youtube.com/channel/UC2tvTb_DX35TLUCTj9m1byg",
  },
  {
    label: "WhatsApp",
    handle: "+90 536 885 3122",
    href: "https://wa.me/905368853122",
  },
];

export const about = {
  // Replace with a real portrait — see the note in the About section UI.
  portrait: "/img/me.png",
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  role: string;
  category: string;
  image: string;
  live: string;
  repo?: string;
  repoPrivate?: boolean;
  videos?: ProjectVideo[];
  stack: string[];
  problem: string;
  contribution: string;
  decisions: string[];
  outcome: string;
};

export type ProjectVideo = {
  label: string;
  youtubeId: string;
  url: string;
};

type ProjectSource = Omit<
  Project,
  | "tagline"
  | "role"
  | "category"
  | "problem"
  | "contribution"
  | "decisions"
  | "outcome"
  | "videos"
> & {
  videos?: Omit<ProjectVideo, "label">[];
};

const projects: ProjectSource[] = [
  {
    slug: "yshai",
    name: "YSHAI",
    year: "2025",
    image: "/img/project-1.png",
    live: "https://www.yshai.cloud/",
    repoPrivate: true,
    videos: [
      { youtubeId: "MADwak6SvSI", url: "https://youtu.be/MADwak6SvSI" },
      { youtubeId: "LKWbRl00IUA", url: "https://youtu.be/LKWbRl00IUA" },
    ],
    stack: ["Next.js 16", "NestJS", "PostgreSQL", "BullMQ", "Redis", "AI SDK"],
  },
  {
    slug: "yashblog",
    name: "YASHBLOG",
    year: "2024",
    image: "/img/project-3.png",
    live: "https://yashblog-hazel.vercel.app/",
    repo: "https://github.com/YASHDEV42/YASHBLOG",
    videos: [{ youtubeId: "DeN11dVsTZU", url: "https://youtu.be/DeN11dVsTZU" }],
    stack: ["Next.js 15", "React 19", "Express.js", "MongoDB", "Tiptap"],
  },
  {
    slug: "yashchat",
    name: "YASHCHAT",
    year: "2024",
    image: "/img/project-2.png",
    live: "https://yashchat-two.vercel.app/",
    repo: "https://github.com/YASHDEV42/YASHCHAT",
    stack: ["Next.js", "Express.js", "Socket.io", "MongoDB", "JWT"],
  },
  {
    slug: "yashstore",
    name: "YASHSTORE",
    year: "2024",
    image: "/img/project-4.png",
    live: "https://yashstore-eosin.vercel.app/",
    repo: "https://github.com/YASHDEV42/YASHSTORE",
    videos: [{ youtubeId: "DhGAmZbGHws", url: "https://youtu.be/DhGAmZbGHws" }],
    stack: [
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "NextAuth",
    ],
  },
  {
    slug: "yashtask",
    name: "YASHTASK",
    year: "2023",
    image: "/img/project-5.png",
    live: "https://task-mangement-cyan.vercel.app/",
    repo: "https://github.com/YASHDEV42/YASHTASK",
    videos: [{ youtubeId: "ICznpDFLNyA", url: "https://youtu.be/ICznpDFLNyA" }],
    stack: [
      "Next.js 14",
      "TypeScript",
      "MongoDB",
      "NextAuth",
      "AI SDK",
      "Gemini",
    ],
  },
  {
    slug: "quizyourself",
    name: "QuizYourself",
    year: "2023",
    image: "/img/project-6.png",
    live: "https://quiz-yourself.vercel.app/",
    repo: "https://github.com/YASHDEV42/QuizYourself",
    videos: [{ youtubeId: "xB3FiK5dfVQ", url: "https://youtu.be/xB3FiK5dfVQ" }],
    stack: ["Next.js 14", "React 18", "MongoDB", "Kinde Auth"],
  },
];

type Translate = (
  key: string,
  values?: Record<string, string | number | Date>,
) => string;

/** Structural project facts live once; localized editorial copy is supplied by next-intl. */
export function getProjects(t: Translate): Project[] {
  return projects.map((project) => {
    const key = `Projects.${project.slug}`;
    return {
      ...project,
      tagline: t(`${key}.tagline`),
      role: t(`${key}.role`),
      category: t(`${key}.category`),
      problem: t(`${key}.problem`),
      contribution: t(`${key}.contribution`),
      decisions: [
        t(`${key}.decision1`),
        t(`${key}.decision2`),
        t(`${key}.decision3`),
      ],
      outcome: t(`${key}.outcome`),
      videos: project.videos?.map((video, index) => ({
        ...video,
        label: t(`${key}.video${index + 1}`),
      })),
    };
  });
}

export const projectSlugs = projects.map(({ slug }) => slug);
