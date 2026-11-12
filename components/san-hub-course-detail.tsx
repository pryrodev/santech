import Image from "next/image";
import Link from "next/link";
import {
  Award,
  CalendarDays,
  Check,
  ChevronRight,
  House,
  Languages,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiFigma,
  SiGithub,
  SiGit,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { TbApi, TbCloudComputing, TbCode, TbTestPipe } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import { PublicPage } from "@/components/public-page";
import { CourseSectionNav } from "@/components/san-hub-course-section-nav";
import { SanHubCourseEnrollButton } from "@/components/san-hub-course-enroll-button";
import { SanHubCourseJourney } from "@/components/san-hub/san-hub-course-journey";
import {
  getSanHubCatalogHref,
  resolveSanHubCatalogSlug,
  sanHubCatalogItems,
  type SanHubCatalogItem,
} from "@/lib/san-hub-catalog-data";
import type { SanHubCatalogItem as CmsSanHubCatalogItem } from "@/lib/strapi";

type CourseStat = { label: string; value: string; detail: string };
type CourseCatalogItem = SanHubCatalogItem & { category: "Courses" };

export type CourseDetail = {
  subtitle: string;
  instructor: string;
  stats: readonly CourseStat[];
  learningOutcomes: readonly string[];
  skills: readonly string[];
  tools: readonly string[];
  details: readonly {
    title: string;
    detail: string;
    icon: "certificate" | "language" | "schedule" | "access";
  }[];
  courseSeries: readonly {
    title: string;
    description: string;
    duration: string;
  }[];
  testimonials: readonly { initials: string; name: string; quote: string }[];
  rating: string;
  reviewCount: string;
};

export type SanHubCourse = CourseCatalogItem & CourseDetail;

const courseCatalogItems = sanHubCatalogItems.filter(
  (item): item is CourseCatalogItem => item.category === "Courses",
);

const courseDetails: Record<string, CourseDetail> = {
  "full-stack-software-engineering": {
    subtitle:
      "Build dependable digital products from a real problem to a working release.",
    instructor: "SAN TECH Software Engineering Team",
    stats: [
      {
        label: "Course pathway",
        value: "4 project stages",
        detail: "Learn by building",
      },
      {
        label: "Practical rating",
        value:
          "4.9 ★",
        detail: "From SAN HUB learners",
      },
      {
        label: "Level",
        value: "Intermediate",
        detail: "Recommended experience",
      },
      {
        label: "Schedule",
        value: "Flexible cohort",
        detail: "16 weeks to complete",
      },
    ],
    learningOutcomes: [
      "Turn user needs into clear product requirements.",
      "Build responsive interfaces with modern TypeScript and React.",
      "Design APIs, data models, and integrations that can grow.",
      "Ship, test, document, and support a dependable release.",
    ],
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "API design",
      "PostgreSQL",
      "Testing",
      "Git workflows",
      "Cloud deployment",
    ],
    tools: ["VS Code", "GitHub", "PostgreSQL", "Figma", "Vercel"],
    details: [
      {
        title: "Shareable certificate",
        detail: "Receive a SAN HUB completion certificate.",
        icon: "certificate",
      },
      {
        title: "Taught in English",
        detail: "Practical instruction with clear examples.",
        icon: "language",
      },
      {
        title: "Recently updated",
        detail: "Updated for current product delivery practices.",
        icon: "schedule",
      },
      {
        title: "Project portfolio",
        detail: "Leave with work you can explain and improve.",
        icon: "access",
      },
    ],
    courseSeries: [
      {
        title: "Foundations and product thinking",
        description:
          "Understand users, requirements, interfaces, and the delivery habits that keep a project focused.",
        duration: "4 weeks",
      },
      {
        title: "Frontend systems",
        description:
          "Build accessible, responsive interfaces with reusable components and clear state management.",
        duration: "4 weeks",
      },
      {
        title: "Backend and data",
        description:
          "Create APIs, data models, authentication, validation, and integrations around real use cases.",
        duration: "4 weeks",
      },
      {
        title: "Quality and deployment",
        description:
          "Test, document, deploy, observe, and improve a complete product release.",
        duration: "4 weeks",
      },
    ],
    testimonials: [
      {
        initials: "AN",
        name: "Aline N.",
        quote:
          "The project stages made a complex path feel possible. I could see what I was learning in the system I was building.",
      },
      {
        initials: "JM",
        name: "Jean M.",
        quote:
          "The most useful part was learning how to explain decisions to a team, not only how to write code.",
      },
    ],
    rating: "4.9",
    reviewCount: "38 learner reviews",
  },
  "applied-ai-machine-learning": {
    subtitle:
      "Use data, machine learning, and responsible AI to solve practical problems.",
    instructor: "SAN TECH AI & Data Team",
    stats: [
      {
        label: "Course pathway",
        value: "4 applied labs",
        detail: "Learn through experiments",
      },
      {
        label: "Practical rating",
        value:
          "4.8 ★",
        detail: "From SAN HUB learners",
      },
      {
        label: "Level",
        value: "All levels",
        detail: "Curiosity is enough to start",
      },
      {
        label: "Schedule",
        value: "Weekend labs",
        detail: "12 weeks to complete",
      },
    ],
    learningOutcomes: [
      "Frame an operational problem as a data question.",
      "Prepare, explore, and communicate useful datasets.",
      "Prototype machine-learning and AI-assisted workflows.",
      "Evaluate risks, limitations, and responsible next steps.",
    ],
    skills: [
      "Data analysis",
      "Python",
      "Machine learning",
      "Computer vision",
      "Prompt design",
      "Model evaluation",
      "Responsible AI",
      "Storytelling",
    ],
    tools: ["Python", "Jupyter", "OpenAI APIs", "Power BI", "GitHub"],
    details: [
      {
        title: "Shareable certificate",
        detail: "Receive a SAN HUB completion certificate.",
        icon: "certificate",
      },
      {
        title: "Taught in English",
        detail: "Follow practical explanations and guided labs.",
        icon: "language",
      },
      {
        title: "Lab-based learning",
        detail: "Practice each concept with a real example.",
        icon: "schedule",
      },
      {
        title: "Responsible practice",
        detail: "Make decisions with context, care, and evidence.",
        icon: "access",
      },
    ],
    courseSeries: [
      {
        title: "AI foundations",
        description:
          "Build shared language around data, models, automation, and the limits of AI systems.",
        duration: "3 weeks",
      },
      {
        title: "Data and insight",
        description:
          "Prepare data, find patterns, and communicate evidence to people who make decisions.",
        duration: "3 weeks",
      },
      {
        title: "Applied model lab",
        description:
          "Prototype practical machine-learning and AI workflows around a real challenge.",
        duration: "3 weeks",
      },
      {
        title: "Responsible deployment",
        description:
          "Evaluate performance, risk, privacy, and the support a useful system needs.",
        duration: "3 weeks",
      },
    ],
    testimonials: [
      {
        initials: "EK",
        name: "Eric K.",
        quote:
          "The labs helped me move from AI concepts to a small workflow I could actually use at work.",
      },
      {
        initials: "MU",
        name: "Maya U.",
        quote:
          "I appreciated the emphasis on asking the right question before reaching for a model.",
      },
    ],
    rating: "4.8",
    reviewCount: "31 learner reviews",
  },
  "cybersecurity-defense": {
    subtitle:
      "Build the habits and systems needed to protect people, information, and operations.",
    instructor: "SAN TECH Cybersecurity Team",
    stats: [
      {
        label: "Course pathway",
        value: "3 intensive labs",
        detail: "Practice by scenario",
      },
      {
        label: "Practical rating",
        value:
          "4.9 ★",
        detail: "From SAN HUB learners",
      },
      {
        label: "Level",
        value: "Intermediate",
        detail: "Systems experience helps",
      },
      {
        label: "Schedule",
        value: "Intensive labs",
        detail: "10 weeks to complete",
      },
    ],
    learningOutcomes: [
      "Identify common weaknesses across systems and workflows.",
      "Build practical controls around identity, access, and information.",
      "Investigate incidents using evidence and clear communication.",
      "Create a security improvement plan teams can act on.",
    ],
    skills: [
      "Threat modeling",
      "Network security",
      "Vulnerability assessment",
      "Identity and access",
      "Incident response",
      "Risk analysis",
      "Audit trails",
      "Security culture",
    ],
    tools: ["Linux", "Wireshark", "OWASP tools", "SIEM concepts", "GitHub"],
    details: [
      {
        title: "Shareable certificate",
        detail: "Receive a SAN HUB completion certificate.",
        icon: "certificate",
      },
      {
        title: "Taught in English",
        detail: "Follow clear explanations and scenario-based labs.",
        icon: "language",
      },
      {
        title: "Scenario practice",
        detail: "Learn through realistic security decisions.",
        icon: "schedule",
      },
      {
        title: "Defensive mindset",
        detail: "Protect systems while keeping people in view.",
        icon: "access",
      },
    ],
    courseSeries: [
      {
        title: "Security foundations",
        description:
          "Understand assets, threats, vulnerabilities, controls, and the people behind every system.",
        duration: "3 weeks",
      },
      {
        title: "Defensive systems",
        description:
          "Strengthen identity, access, networks, applications, and information handling.",
        duration: "3 weeks",
      },
      {
        title: "Threat response",
        description:
          "Investigate evidence, communicate an incident, and prioritize the next action.",
        duration: "2 weeks",
      },
      {
        title: "Audit and resilience",
        description:
          "Turn findings into an improvement plan with clear ownership and follow-through.",
        duration: "2 weeks",
      },
    ],
    testimonials: [
      {
        initials: "PK",
        name: "Patrick K.",
        quote:
          "The scenarios made security feel like a daily operating practice, not only a technical checklist.",
      },
      {
        initials: "IS",
        name: "Irene S.",
        quote:
          "I left with a clearer way to explain risk and prioritize fixes with my team.",
      },
    ],
    rating: "4.9",
    reviewCount: "27 learner reviews",
  },
};

export function getSanHubCourse(courseId: string): SanHubCourse | undefined {
  const item = courseCatalogItems.find(
    (catalogItem) => catalogItem.id === courseId,
  );
  const detail = courseDetails[courseId];
  return item && detail ? { ...item, ...detail } : undefined;
}

export function getSanHubCourseFromCms(
  item: CmsSanHubCatalogItem,
): SanHubCourse {
  const courseSlug = resolveSanHubCatalogSlug(item);
  const fallback = getSanHubCourse(courseSlug);
  const cms = item.courseDetails;
  const fallbackDetail: CourseDetail = fallback ?? {
    subtitle: item.description,
    instructor: item.provider ?? "SAN TECH / SAN HUB",
    stats: [],
    learningOutcomes: [],
    skills: [],
    tools: [],
    details: [],
    courseSeries: [],
    testimonials: [],
    rating: "",
    reviewCount: "",
  };

  const courseItem: CourseCatalogItem = {
    id: courseSlug,
    category: "Courses",
    courseCategory: item.courseCategory
      ?.name as CourseCatalogItem["courseCategory"],
    title: item.title,
    provider: item.provider ?? "",
    description: item.description,
    image: item.image,
    format: item.format ?? "",
    duration: item.duration ?? "",
    level: item.level ?? "",
    badge: item.badge ?? undefined,
    href: getSanHubCatalogHref({ id: courseSlug, category: "Courses" }),
  };

  return {
    ...courseItem,
    subtitle: cms?.subtitle ?? fallbackDetail.subtitle,
    instructor: cms?.instructor ?? fallbackDetail.instructor,
    stats: cms?.stats ?? fallbackDetail.stats,
    learningOutcomes: cms?.learningOutcomes ?? fallbackDetail.learningOutcomes,
    skills: cms?.skills ?? fallbackDetail.skills,
    tools: cms?.tools ?? fallbackDetail.tools,
    details: cms?.details ?? fallbackDetail.details,
    courseSeries: cms?.courseSeries ?? fallbackDetail.courseSeries,
    testimonials: cms?.courseTestimonials ?? fallbackDetail.testimonials,
    rating:
      cms?.rating !== null && cms?.rating !== undefined
        ? String(cms.rating)
        : fallbackDetail.rating,
    reviewCount: cms?.reviewCount ?? fallbackDetail.reviewCount,
  };
}

function DetailIcon({
  icon,
}: {
  icon: CourseDetail["details"][number]["icon"];
}) {
  const Icon =
    icon === "certificate"
      ? Award
      : icon === "language"
        ? Languages
        : icon === "schedule"
          ? CalendarDays
          : ShieldCheck;
  return <Icon className="size-5 text-brand-secondary" aria-hidden="true" />;
}

const courseTechnologyIcons: Record<string, { Icon: IconType; color: string }> =
  {
    TypeScript: { Icon: SiTypescript, color: "#3178c6" },
    React: { Icon: SiReact, color: "#149eca" },
    "Next.js": { Icon: SiNextdotjs, color: "#0a1f44" },
    "API design": { Icon: TbApi, color: "#0a1f44" },
    PostgreSQL: { Icon: SiPostgresql, color: "#4169e1" },
    Testing: { Icon: TbTestPipe, color: "#0a1f44" },
    "Git workflows": { Icon: SiGit, color: "#f05032" },
    "Cloud deployment": { Icon: TbCloudComputing, color: "#149eca" },
    "VS Code": { Icon: VscVscode, color: "#007acc" },
    GitHub: { Icon: SiGithub, color: "#0a1f44" },
    Figma: { Icon: SiFigma, color: "#f24e1e" },
    Vercel: { Icon: SiVercel, color: "#0a1f44" },
  };

function CourseTechnologyChip({ item }: { item: string }) {
  const technology = courseTechnologyIcons[item] ?? {
    Icon: TbCode,
    color: "#0a1f44",
  };
  const Icon = technology.Icon;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e3ebf7] px-2.5 py-1.5 text-xs text-[#0a1f44]">
      <Icon
        className="size-3.5 shrink-0"
        style={{ color: technology.color }}
        aria-hidden="true"
      />
      {item}
    </span>
  );
}

export function SanHubCourseDetail({ course }: { course: SanHubCourse }) {
  return (
    <PublicPage>
      <div className="w-full">
        <section className="px-4 pb-10 pt-3 sm:px-8 sm:pb-12 sm:pt-4 lg:px-12 lg:pb-14 lg:pt-5">
          <div className="mx-auto w-full max-w-[1440px] bg-white p-5 sm:p-8 lg:p-10">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs font-semibold text-slate-500"
            >
              <Link
                href="/san-hub"
                className="transition-colors hover:text-brand-secondary"
              >
                <House className="size-4" aria-label="SAN HUB home" />
              </Link>
              <ChevronRight className="size-3.5" />
              <Link href="/san-hub" className="hover:text-brand-secondary">
                SAN HUB
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="truncate text-[#0a1f44]">{course.title}</span>
            </nav>

            <div className="mt-7 grid items-start gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:gap-9">
              <div className="self-start">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-secondary">
                  SAN HUB / {course.category}
                </p>
                <h1 className="font-exo mt-5 max-w-3xl text-3xl font-bold leading-[1] tracking-[-0.045em] text-[#0a1f44] sm:text-4xl lg:text-5xl">
                  {course.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
                  {course.subtitle}
                </p>
                <div className="mt-5 flex items-center gap-3 text-sm text-slate-700">
                  <span className="grid size-8 place-items-center rounded-full bg-white text-brand-secondary shadow-sm">
                    <Users className="size-3.5" />
                  </span>
                  <span>
                    Instructor:{" "}
                    <span className="font-bold text-[#0a1f44]">
                      {course.instructor}
                    </span>
                  </span>
                </div>
                <SanHubCourseEnrollButton courseTitle={course.title} />
              </div>
              <div className="relative aspect-[1.2/1] overflow-hidden rounde-md bg-[#dceaf8] shadow-[0_20px_45px_rgba(10,31,68,0.1)] sm:aspect-[1.35/1] lg:aspect-[1.15/1]">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44]/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#0a1f44]">
                  SAN HUB learning pathway
                </span>
              </div>
            </div>

            {course.stats.length > 0 && (
              <div className="relative z-10 mt-8 grid gap-0 overflow-hidden rounde-md bg-white shadow-[0_14px_35px_rgba(10,31,68,0.1)] sm:grid-cols-2 lg:grid-cols-4">
                {course.stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`p-4 sm:p-5 ${index > 0 ? "border-t border-slate-200 sm:border-l sm:border-t-0" : ""}`}
                  >
                    <p className="text-sm font-bold text-[#0a1f44]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.12em] text-brand-secondary">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {stat.detail}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <CourseSectionNav course={course} />

        <main className="mx-auto w-full max-w-[1440px] bg-white px-5 pb-16 pt-8 sm:px-10 lg:px-16">
          {(course.learningOutcomes.length > 0 ||
            course.skills.length > 0 ||
            course.tools.length > 0) && (
            <section
              id="about"
              className="scroll-mt-48 border-b border-slate-200 pb-10"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-secondary">
                About this pathway
              </p>
              <div className="mt-3 grid gap-7 lg:grid-cols-[0.75fr_1.25fr]">
                <h2 className="font-exo text-3xl font-bold leading-tight tracking-[-0.04em] text-[#0a1f44]">
                  What you&apos;ll learn
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {course.learningOutcomes.map((outcome) => (
                    <div
                      key={outcome}
                      className="flex gap-3 text-sm leading-6 text-slate-700"
                    >
                      <Check className="mt-1 size-4 shrink-0 text-brand-secondary" />
                      {outcome}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 grid gap-7 lg:grid-cols-2">
                <div>
                  <h3 className="font-exo text-lg font-bold text-[#0a1f44]">
                    Skills you&apos;ll gain
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {course.skills.map((skill) => (
                      <CourseTechnologyChip key={skill} item={skill} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-exo text-lg font-bold text-[#0a1f44]">
                    Tools you&apos;ll learn
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {course.tools.map((tool) => (
                      <CourseTechnologyChip key={tool} item={tool} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {course.details.length > 0 && (
            <section
              id="outcomes"
              className="scroll-mt-48 border-b border-slate-200 py-10"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-secondary">
                Your next step
              </p>
              <div className="mt-3 grid gap-7 lg:grid-cols-[0.75fr_1.25fr]">
                <h2 className="font-exo text-2xl font-bold leading-tight tracking-[-0.04em] text-[#0a1f44]">
                  Turn learning into visible capability.
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {course.details.map((detail) => (
                    <div
                      key={detail.title}
                      className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4"
                    >
                      <DetailIcon icon={detail.icon} />
                      <h3 className="mt-3 text-sm font-bold text-[#0a1f44]">
                        {detail.title}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        {detail.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <SanHubCourseJourney modules={course.courseSeries} />

          {course.testimonials.length > 0 && (
            <section
              id="testimonials"
              className="scroll-mt-48 border-b border-slate-200 py-10"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-secondary">
                Learner voices
              </p>
              <h2 className="font-exo mt-3 max-w-2xl text-2xl font-bold leading-tight tracking-[-0.04em] text-[#0a1f44]">
                Built for people who want to use what they learn.
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {course.testimonials.map((testimonial) => (
                  <blockquote
                    key={testimonial.name}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(10,31,68,0.04)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-full bg-[#0a1f44] text-xs font-bold text-white">
                        {testimonial.initials}
                      </span>
                      <cite className="not-italic text-sm font-bold text-[#0a1f44]">
                        {testimonial.name}
                      </cite>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </blockquote>
                ))}
              </div>
            </section>
          )}

          {(course.rating ||
            course.reviewCount ||
            course.testimonials.length > 0) && (
            <section id="reviews" className="scroll-mt-48 py-10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-secondary">
                Reviews
              </p>
              <div className="mt-3 grid gap-7 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
                <div>
                  <h2 className="font-exo text-2xl font-bold leading-tight tracking-[-0.04em] text-[#0a1f44]">
                    Learner reviews
                  </h2>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="font-exo text-4xl font-bold text-[#0a1f44]">
                      {course.rating}
                    </span>
                    <span>
                      <span className="flex gap-1 text-brand-secondary">
                        {Array.from({ length: 5 }, (_, index) => (
                          <Star key={index} className="size-3.5 fill-current" />
                        ))}
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">
                        {course.reviewCount}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="grid gap-3">
                  {course.testimonials.map((testimonial) => (
                    <div
                      key={`review-${testimonial.name}`}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-bold text-[#0a1f44]">
                          {testimonial.name}
                        </p>
                        <span className="flex gap-0.5 text-brand-secondary">
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star
                              key={index}
                              className="size-3"
                              fill="currentColor"
                            />
                          ))}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        {testimonial.quote}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </PublicPage>
  );
}
