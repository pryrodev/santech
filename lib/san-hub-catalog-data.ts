export const sanHubCategories = [
  "Courses",
  "Programs",
  "Upcoming training",
  "Innovation programs",
  "Apprenticeships / Internships",
  "Upskilling programs",
  "Events",
] as const;

export type SanHubCategory = (typeof sanHubCategories)[number];

export const sanHubCourseCategories = [
  "Web development",
  "Artificial intelligence",
  "Cybersecurity",
  "IoT & connected devices",
  "Embedded technology",
  "Digital transformation",
] as const;

export type SanHubCourseCategory = string;
export type SanHubCourseFocus = SanHubCourseCategory;

/** Build the internal destination for a CMS catalog item without storing a manual URL. */
export function getSanHubCatalogHref(item: Pick<SanHubCatalogItem, "id" | "category">): string {
  // Guard against broken CMS entries (missing slug) so a link never becomes "/san-hub/course/null".
  if (!item.id || item.id === "null" || item.id === "undefined") {
    return item.category === "Courses" ? "/san-hub/courses" : "/san-hub";
  }

  if (item.category === "Courses") return `/san-hub/course/${item.id}`;

  if (item.category === "Programs") {
    return `/san-hub/program/${encodeURIComponent(item.id)}`;
  }

  const categoryRoutes: Partial<Record<SanHubCategory, string>> = {
    "Upcoming training": "/connect?topic=upcoming-training",
    "Innovation programs": "/innovation-lab",
    "Apprenticeships / Internships": "/join-the-community?role=Intern",
    "Upskilling programs": "/connect?topic=upskilling",
    Events: "/tech-pulse",
  };
  return categoryRoutes[item.category] ?? "/san-hub";
}

export type SanHubCatalogItem = {
  id: string;
  category: SanHubCategory;
  title: string;
  provider: string;
  description: string;
  image: string;
  format: string;
  duration: string;
  level: string;
  courseCategory?: SanHubCourseCategory;
  badge?: string;
  href: string;
  relatedCourses?: Array<{ sortOrder: number; id: string; slug: string; title: string; summary: string | null; level: string | null; durationWeeks: number | null; status: string; catalogItem: { title: string; slug: string; imageAsset: { url: string; alternativeText: string | null } | null } | null }>;
};

/** Convert a title into a URL-safe slug, matching how slugs are used elsewhere. */
export function slugifySanHubTitle(title: string): string {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-+|-+$)/g, "") || "course";
}

/** CMS course slugs can be null for unfinished entries — fall back to a title-derived slug. */
export function resolveSanHubCatalogSlug(item: { slug?: string | null; title: string }): string {
  return item.slug && item.slug.trim().length > 0 ? item.slug : slugifySanHubTitle(item.title);
}

export const sanHubCatalogItems: readonly SanHubCatalogItem[] = [
  { id: "full-stack-software-engineering", category: "Courses", courseCategory: "Web development", title: "Full-Stack Software Engineering", provider: "SAN TECH / SAN HUB", description: "Build reliable web and platform experiences from user needs to deployment.", image: "/images/second-image.jpeg", format: "Cohort", duration: "16 weeks", level: "Intermediate", badge: "Featured pathway", href: "/san-hub/course/full-stack-software-engineering" },
  { id: "applied-ai-machine-learning", category: "Courses", courseCategory: "Artificial intelligence", title: "Applied AI & Machine Learning", provider: "SAN TECH / SAN HUB", description: "Use computer vision, analytics, and responsible AI to solve practical problems.", image: "/images/summit.jpg", format: "Weekend labs", duration: "12 weeks", level: "All levels", href: "/san-hub/course/applied-ai-machine-learning" },
  { id: "cybersecurity-defense", category: "Courses", courseCategory: "Cybersecurity", title: "Cybersecurity & Threat Intelligence", provider: "SAN TECH / SAN HUB", description: "Learn the habits, tools, and thinking needed to protect systems and information.", image: "/images/fieldwork.jpg", format: "Intensive labs", duration: "10 weeks", level: "Intermediate", href: "/san-hub/course/cybersecurity-defense" },
  { id: "build-with-ai", category: "Upcoming training", title: "Build with AI: practical problem solving", provider: "SAN HUB learning calendar", description: "A guided cohort for turning everyday challenges into useful, testable AI workflows.", image: "/images/graduates.jpg", format: "Evening cohort", duration: "Starts 14 Oct 2026", level: "Beginner friendly", badge: "Next cohort", href: "/connect?topic=upcoming-training" },
  { id: "digital-product-workshop", category: "Upcoming training", title: "Designing a useful digital product", provider: "SAN HUB learning calendar", description: "A focused workshop on research, prototyping, and making a product easier to use.", image: "/images/second-image.jpeg", format: "One-day workshop", duration: "03 Nov 2026", level: "Open to all", href: "/connect?topic=upcoming-training" },
  { id: "innovation-challenge-lab", category: "Innovation programs", title: "Innovation Challenge Lab", provider: "SAN TECH innovation team", description: "Move a promising question from research and prototyping toward a tested possibility.", image: "/images/summit.jpg", format: "Challenge lab", duration: "8-week cycle", level: "Teams and innovators", badge: "Build with us", href: "/innovation-lab" },
  { id: "startup-product-studio", category: "Innovation programs", title: "Startup & Product Studio", provider: "SAN HUB innovation programs", description: "Shape an early idea through validation, product thinking, mentorship, and partner feedback.", image: "/images/fieldwork.jpg", format: "Studio program", duration: "Rolling intake", level: "Early-stage teams", href: "/innovation-lab" },
  { id: "software-apprenticeship", category: "Apprenticeships / Internships", title: "Software Engineering Apprenticeship", provider: "SAN TECH delivery teams", description: "Learn through guided contribution to real systems, reviews, and team delivery habits.", image: "/images/second-image.jpeg", format: "Placement", duration: "3–6 months", level: "Emerging practitioners", href: "/join-the-community?role=Intern" },
  { id: "innovation-internship", category: "Apprenticeships / Internships", title: "Innovation & Research Internship", provider: "SAN TECH research team", description: "Work with researchers and builders to explore context, evidence, prototypes, and impact.", image: "/images/graduates.jpg", format: "Mentored placement", duration: "By placement", level: "Students and graduates", href: "/join-the-community?role=Intern" },
  { id: "team-digital-transformation", category: "Upskilling programs", title: "Digital Transformation for Teams", provider: "SAN HUB professional learning", description: "Help teams move from disconnected work to clearer digital processes and systems.", image: "/images/fieldwork.jpg", format: "Team programme", duration: "Custom schedule", level: "Organizations", badge: "For teams", href: "/connect?topic=upskilling" },
  { id: "ai-literacy-for-work", category: "Upskilling programs", title: "AI Literacy for Everyday Work", provider: "SAN HUB professional learning", description: "Build practical confidence with AI tools, responsible use, and better everyday decisions.", image: "/images/summit.jpg", format: "Short programme", duration: "2–4 weeks", level: "Professionals", href: "/connect?topic=upskilling" },
  { id: "innovation-open-day", category: "Events", title: "SAN TECH Innovation Open Day", provider: "SAN TECH community", description: "Meet builders, see working demos, and find practical ways to participate in the ecosystem.", image: "/images/summit.jpg", format: "Showcase and demos", duration: "21 Nov 2026", level: "Open to all", badge: "Community event", href: "/tech-pulse" },
  { id: "tech-community-talks", category: "Events", title: "SAN HUB Tech Community Talks", provider: "SAN HUB events", description: "Join conversations with practitioners, mentors, and innovators working on useful technology.", image: "/images/fieldwork.jpg", format: "Talks and panels", duration: "Monthly", level: "Open to all", href: "/tech-pulse" },
];

const sanHubProgramItemsLegacy: readonly SanHubCatalogItem[] = [
  { id: "apprenticeship", category: "Programs", title: "Apprenticeship", provider: "SAN HUB programs", description: "Learn through guided practice, mentorship, and contribution to real technology projects.", image: "/images/second-image.jpeg", format: "Mentored placement", duration: "3–6 months", level: "Emerging practitioners", badge: "Apply now", href: "/join-the-community?program=Apprenticeship" },
  { id: "devbreak", category: "Programs", title: "DevBreak", provider: "SAN HUB programs", description: "A focused builder programme for turning a technical idea into a working prototype.", image: "/images/summit.jpg", format: "Build sprint", duration: "8 weeks", level: "Builders and innovators", badge: "Build with us", href: "/join-the-community?program=DevBreak" },
  { id: "professional-capacity-building", category: "Programs", title: "Professional Capacity Building", provider: "SAN HUB programs", description: "Strengthen the practical digital, technical, and collaboration skills that help teams deliver.", image: "/images/graduates.jpg", format: "Skills programme", duration: "Custom schedule", level: "Professionals and teams", href: "/join-the-community?program=Professional%20Capacity%20Building" },
  { id: "professional-career-guidance", category: "Programs", title: "Professional Career Guidance", provider: "SAN HUB programs", description: "Get clear direction, practical feedback, and a stronger next step for your technology career.", image: "/images/fieldwork.jpg", format: "Guidance sessions", duration: "By appointment", level: "Students and professionals", href: "/join-the-community?program=Professional%20Career%20Guidance" },
  { id: "research-innovation-projects", category: "Programs", title: "Research, Innovation and Projects Development", provider: "SAN HUB programs", description: "Move a meaningful question from research into a tested idea, project, or solution.", image: "/images/ch10-datacenter.jpg", format: "Project support", duration: "Rolling intake", level: "Researchers and innovators", badge: "Partner with us", href: "/join-the-community?program=Research%2C%20Innovation%20and%20Projects%20Development" },
];

export const sanHubProgramItems: readonly SanHubCatalogItem[] = [
  { id: "devbreak", category: "Programs", title: "DevBreak", provider: "SAN HUB programs", description: "Intensive practical technology learning for people ready to build, test, and apply useful ideas.", image: "/images/summit.jpg", format: "SAN HUB program", duration: "Scheduled or rolling intake", level: "Learners and builders", href: "/san-hub/explore/build" },
  { id: "capacity-building", category: "Programs", title: "Professional Capacity Building", provider: "SAN HUB programs", description: "Strengthen the technical, digital, and collaboration skills that help people and teams deliver.", image: "/images/graduates.jpg", format: "SAN HUB program", duration: "Scheduled or rolling intake", level: "Professionals and teams", href: "/san-hub/courses" },
  { id: "research-development", category: "Programs", title: "Research & Development", provider: "SAN HUB programs", description: "Explore meaningful questions through applied research, experimentation, prototypes, and product development.", image: "/images/ch10-datacenter.jpg", format: "SAN HUB program", duration: "Scheduled or rolling intake", level: "Researchers and innovators", href: "/san-hub/explore/research" },
  { id: "apprenticeship", category: "Programs", title: "Apprenticeship", provider: "SAN HUB programs", description: "Learn through guided practice, mentorship, and contribution to real technology projects.", image: "/images/second-image.jpeg", format: "SAN HUB program", duration: "Scheduled or rolling intake", level: "Emerging practitioners", href: "/san-hub/explore/work" },
];
