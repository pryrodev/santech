"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  Quote,
  Shuffle,
  TrendingUp,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import type { SanHubCatalogItem } from "@/lib/san-hub-catalog-data";

type LearnExperienceProps = {
  popularItems: readonly SanHubCatalogItem[];
  newItems: readonly SanHubCatalogItem[];
  aiItems: readonly SanHubCatalogItem[];
  searchItems: readonly SanHubCatalogItem[];
};

type FeaturedSlide = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  theme: "night" | "mist" | "blue";
};

const featuredSlides: readonly FeaturedSlide[] = [
  {
    eyebrow: "SAN HUB / COURSES",
    title: "Learn technology that becomes useful capability.",
    description:
      "Courses, guided practice, and real projects for people ready to build.",
    cta: "Explore courses",
    href: "#new-and-popular",
    image: "/images/second-image.jpeg",
    theme: "night",
  },
  {
    eyebrow: "PRACTICAL LEARNING",
    title: "Build skills for useful work.",
    description:
      "Move from curiosity to confidence with focused pathways and project-based learning.",
    cta: "See learning pathways",
    href: "#new-and-popular",
    image: "/images/graduates.jpg",
    theme: "mist",
  },
  {
    eyebrow: "FROM LEARNING TO IMPACT",
    title: "Find your next step in the ecosystem.",
    description:
      "Learn, build, and connect with people turning technology into practical solutions.",
    cta: "Join SAN HUB",
    href: "/join-the-community?source=san-hub-learn",
    image: "/images/fieldwork.jpg",
    theme: "blue",
  },
] as const;

const learningGoals = [
  { label: "Change my career", href: "/san-hub/courses", Icon: Shuffle },
  {
    label: "Grow in my current role",
    href: "/san-hub/explore/build",
    Icon: TrendingUp,
  },
  {
    label: "Explore technology beyond my work",
    href: "/san-hub/explore/research",
    Icon: Compass,
  },
] as const;

const trendingSearches = [
  {
    title: "Python",
    items: [
      "full-stack-software-engineering",
      "applied-ai-machine-learning",
      "build-with-ai",
    ],
  },
  {
    title: "Data and AI",
    items: [
      "applied-ai-machine-learning",
      "ai-literacy-for-work",
      "innovation-internship",
    ],
  },
  {
    title: "Product and project building",
    items: [
      "digital-product-workshop",
      "innovation-challenge-lab",
      "startup-product-studio",
    ],
  },
] as const;

const learnerStories = [
  {
    name: "Aline M.",
    role: "SAN HUB learner",
    quote:
      "SAN HUB helped me move from learning concepts to building something people could actually use.",
    image: "/images/second-image.jpeg",
  },
  {
    name: "Eric N.",
    role: "Innovation participant",
    quote:
      "The practical projects and mentorship gave our team the confidence to take an idea further.",
    image: "/images/graduates.jpg",
  },
  {
    name: "Diane U.",
    role: "Community partner",
    quote:
      "SAN HUB creates a useful bridge between technology skills, opportunity, and the needs of our community.",
    image: "/images/fieldwork.jpg",
  },
  {
    name: "Mugisha T.",
    role: "SAN HUB builder",
    quote:
      "The practical sessions helped me turn a difficult problem into a clear plan I could start building.",
    image: "/images/summit.jpg",
  },
] as const;

function FeaturedCard({
  slide,
  secondary = false,
}: {
  slide: FeaturedSlide;
  secondary?: boolean;
}) {
  const theme = {
    night: "bg-[#07152d] text-white",
    mist: "bg-[#f2e6d1] text-[#07152d]",
    blue: "bg-[#dcecff] text-[#07152d]",
  }[slide.theme];

  return (
    <article
      className={`relative isolate min-h-[260px] overflow-hidden rounded-[1.45rem] ${theme} ${secondary ? "hidden md:block" : ""}`}
    >
      <div className="absolute inset-y-0 right-0 w-[53%] overflow-hidden">
        <Image
          src={slide.image}
          alt=""
          fill
          loading={slide.image === "/images/graduates.jpg" ? "eager" : "lazy"}
          className="object-cover"
          sizes="(min-width: 1024px) 34vw, 55vw"
        />
        <div
          className={`absolute inset-0 ${slide.theme === "night" ? "bg-gradient-to-r from-[#07152d] via-[#07152dcc] to-transparent" : "bg-gradient-to-r from-[#f2e6d1] via-[#f2e6d180] to-transparent"}`}
        />
      </div>
      <div className="relative z-10 flex min-h-[260px] max-w-[58%] flex-col justify-center px-6 py-7 sm:px-8">
        <p
          className={`text-[10px] font-black uppercase tracking-[0.2em] ${slide.theme === "night" ? "text-cyan-300" : "text-[#36506f]"}`}
        >
          {slide.eyebrow}
        </p>
        <h2 className="font-exo mt-3 text-[1.1rem] font-bold leading-[1.08] tracking-[-0.04em] sm:text-[1.45rem]">
          {slide.title}
        </h2>
        <p
          className={`mt-3 max-w-sm text-sm leading-5 ${slide.theme === "night" ? "text-slate-200" : "text-[#303755]"}`}
        >
          {slide.description}
        </p>
        <Link
          href={slide.href}
          className={`mt-5 inline-flex w-fit items-center gap-2 rounded-lg px-3.5 py-2.5 text-xs font-black transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 ${slide.theme === "night" ? "bg-white text-[#07152d]" : "bg-[#0875d1] text-white"}`}
        >
          {slide.cta} <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function CourseRow({ item }: { item: SanHubCatalogItem }) {
  return (
    <Link
      href={item.href}
      className="group flex min-h-[82px] w-full min-w-0 gap-3 rounded-xl bg-white p-2.5 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(7,21,45,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1]"
    >
      <div className="relative size-[62px] shrink-0 overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={item.image}
          alt=""
          fill
          className="object-cover"
          sizes="62px"
        />
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className="truncate text-[11px] text-[#526989]">{item.provider}</p>
        <p className="mt-0.5 line-clamp-2 text-[13px] font-bold leading-4 text-[#07152d] group-hover:text-[#0875d1]">
          {item.title}
        </p>
        <p className="mt-1 flex items-center gap-1.5 truncate text-[10px] text-[#526989]">
          <Clock3 className="size-3" aria-hidden="true" /> {item.format}{" "}
          <span aria-hidden="true">·</span> {item.duration}
        </p>
      </div>
    </Link>
  );
}

function CourseColumn({
  title,
  items,
}: {
  title: string;
  items: readonly SanHubCatalogItem[];
}) {
  return (
    <section className="min-w-0 rounde-md bg-[#e8f1fc] p-3.5 sm:p-4">
      <div className="flex items-center justify-between gap-3 px-1 pb-3">
        <h3 className="font-exo text-base font-bold tracking-[-0.025em] text-[#07152d]">
          {title}
        </h3>
        <ArrowUpRight className="size-4 text-[#526989]" aria-hidden="true" />
      </div>
      <div className="grid gap-2.5">
        {items.length > 0 ? (
          items.map((item) => <CourseRow key={item.id} item={item} />)
        ) : (
          <div className="grid min-h-[92px] place-items-center rounded-xl border border-dashed border-[#b8c9df] bg-white/65 px-4 py-4 text-center">
            <span className="grid size-8 place-items-center rounded-full bg-[#e8f1fc] text-[#526989]">
              <BookOpen className="size-4" aria-hidden="true" />
            </span>
            <p className="mt-2 text-xs font-bold text-[#07152d]">
              Nothing here yet
            </p>
            <p className="mt-0.5 text-[10px] text-[#526989]">
              New learning options will appear soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function LearningGoalPicker() {
  return (
    <div className="flex flex-col gap-4 rounded-[1.45rem] bg-[#edf4fd] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-7">
      <h2 className="shrink-0 font-exo text-lg font-bold tracking-[-0.035em] text-[#07152d] sm:text-xl">
        What brings you to SAN HUB today?
      </h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:flex lg:flex-1 lg:justify-end">
        {learningGoals.map(({ label, href, Icon }) => (
          <Link
            key={label}
            href={href}
            className="group inline-flex min-h-12 items-center gap-3 rounded-xl border border-[#b8c9df] bg-white px-2.5 py-2 text-xs font-bold text-[#07152d] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#0875d1] hover:shadow-[0_8px_18px_rgba(7,21,45,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] focus-visible:ring-offset-2"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#0875d1] text-white transition-colors group-hover:bg-[#075ca5]">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <span className="leading-4">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TrendingSearches({ items }: { items: readonly SanHubCatalogItem[] }) {
  return (
    <section className="mt-7">
      <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0875d1]">
            SAN HUB / DISCOVER
          </p>
          <h2 className="font-exo mt-1.5 text-2xl font-bold tracking-[-0.045em] text-[#07152d] sm:text-3xl">
            Trending searches
          </h2>
        </div>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {trendingSearches.map((search) => (
          <section
            key={search.title}
            className="rounde-md bg-[#e8f1fc] p-3.5 sm:p-4"
          >
            <h3 className="flex items-center gap-2 px-1 pb-3 font-exo text-base font-bold tracking-[-0.025em] text-[#07152d]">
              {search.title}{" "}
              <ArrowRight className="size-4" aria-hidden="true" />
            </h3>
            <div className="grid gap-2.5">
              {search.items.map((id) => {
                const item = items.find((candidate) => candidate.id === id);
                return item ? <CourseRow key={item.id} item={item} /> : null;
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function LearnerStories() {
  return (
    <section className="mt-9 border-t border-slate-200 pt-7">
      <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0875d1]">
            SAN HUB / COMMUNITY
          </p>
          <h2 className="font-exo mt-1.5 text-2xl font-bold tracking-[-0.045em] text-[#07152d] sm:text-3xl">
            Why people choose SAN HUB
          </h2>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {learnerStories.map((story) => (
          <blockquote
            key={story.name}
            className="rounded-xl border border-[#b8c9df] bg-white p-4 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(7,21,45,0.08)]"
          >
            <div className="flex items-center gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[#e8f1fc]">
                <Image
                  src={story.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0">
                <cite className="not-italic text-sm font-bold text-[#07152d]">
                  {story.name}
                </cite>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#8295b1]">
                  {story.role}
                </p>
              </div>
            </div>
            <Quote className="mt-5 size-5 text-[#0875d1]" aria-hidden="true" />
            <p className="mt-2 text-sm leading-6 text-[#526989]">
              &ldquo;{story.quote}&rdquo;
            </p>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

export function SanHubLearnExperience({
  popularItems,
  newItems,
  aiItems,
  searchItems,
}: LearnExperienceProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const nextSlide = useMemo(
    () => (activeSlide + 1) % featuredSlides.length,
    [activeSlide],
  );

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % featuredSlides.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  return (
    <section className="border-b border-slate-200 bg-white px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="grid gap-3 md:grid-cols-[1.03fr_0.97fr]">
            <motion.div
              key={featuredSlides[activeSlide].title}
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.32,
                ease: "easeOut",
              }}
            >
              <FeaturedCard slide={featuredSlides[activeSlide]} />
            </motion.div>
            <motion.div
              key={`${featuredSlides[nextSlide].title}-secondary`}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.28 }}
            >
              <FeaturedCard slide={featuredSlides[nextSlide]} secondary />
            </motion.div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div
              className="flex items-center gap-1.5"
              aria-label="Featured learning slides"
            >
              {featuredSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  aria-label={`Show slide ${index + 1}`}
                  aria-current={index === activeSlide}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] focus-visible:ring-offset-2 ${index === activeSlide ? "w-7 bg-[#526989]" : "w-2 bg-[#9aabc2] hover:bg-[#526989]"}`}
                />
              ))}
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                aria-label="Previous featured slide"
                onClick={() =>
                  setActiveSlide(
                    (activeSlide - 1 + featuredSlides.length) %
                      featuredSlides.length,
                  )
                }
                className="rounded-full border border-slate-200 p-1.5 text-[#07152d] transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1]"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next featured slide"
                onClick={() =>
                  setActiveSlide((activeSlide + 1) % featuredSlides.length)
                }
                className="rounded-full border border-slate-200 p-1.5 text-[#07152d] transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1]"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div id="new-and-popular" className="scroll-mt-32 pt-8 sm:pt-10">
          <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0875d1]">
                SAN HUB / LEARNING
              </p>
              <h2 className="font-exo mt-1.5 text-2xl font-bold tracking-[-0.045em] text-[#07152d] sm:text-3xl">
                New and popular
              </h2>
            </div>
            <Link
              href="/san-hub?section=programs"
              className="hidden items-center gap-1 text-xs font-black text-[#526989] transition-colors hover:text-[#0875d1] sm:inline-flex"
            >
              View all SAN HUB programs <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <CourseColumn title="Most popular" items={popularItems} />
            <CourseColumn title="Hot new releases" items={newItems} />
            <CourseColumn title="Trending AI learning" items={aiItems} />
          </div>
        </div>

        <div className="mt-7">
          <LearningGoalPicker />
        </div>
        <TrendingSearches items={searchItems} />
        <LearnerStories />

        <div className="mt-5 flex items-center gap-2 text-xs text-[#526989] sm:hidden">
          <BookOpen className="size-4" aria-hidden="true" />
          <Link
            href="/san-hub?section=programs"
            className="font-bold hover:text-[#0875d1]"
          >
            View all SAN HUB programs
          </Link>
        </div>
      </div>
    </section>
  );
}
