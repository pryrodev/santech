"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Search,
  Users,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { BorderBeam } from "@/components/ui/border-beam";
import { PhoneNumberField } from "@/components/phone-number-field";
import {
  sanHubCourseCategories,
  type SanHubCatalogItem,
  type SanHubCourseCategory,
} from "@/lib/san-hub-catalog-data";

type CourseCatalogProps = {
  items: readonly SanHubCatalogItem[];
  categories?: readonly string[];
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function EnrollmentDialog({
  item,
  onClose,
}: {
  item: SanHubCatalogItem;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const platformUrl =
      process.env.NEXT_PUBLIC_PLATFORM_URL?.replace(/\/$/, "") ??
      "http://localhost:3002";
    window.location.href = `${platformUrl}/register?course=${encodeURIComponent(item.id)}`;
  }

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#07152d]/65 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative max-h-[min(720px,calc(100svh-2rem))] w-full max-w-xl overflow-y-auto rounde-md bg-white p-5 shadow-[0_24px_70px_rgba(7,21,45,0.28)] sm:p-7"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enrollment-title"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enrollment form"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-slate-200 text-[#526989] transition-colors hover:bg-slate-50 hover:text-[#07152d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1]"
        >
          <X className="size-4" />
        </button>
        {!submitted ? (
          <>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0875d1]">
              SAN HUB / ENROLLMENT
            </p>
            <h2
              id="enrollment-title"
              className="font-exo mt-3 max-w-lg text-2xl font-bold leading-tight tracking-[-0.04em] text-[#07152d] sm:text-3xl"
            >
              Start learning with {item.title}.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-[#526989]">
              Create your SAN TECH learner account to request enrollment and
              access your course workspace, lessons, and materials.
            </p>
            <div className="mt-5 rounded-xl bg-[#edf4fd] p-3.5">
              <p className="text-sm font-bold text-[#07152d]">{item.title}</p>
              <p className="mt-1 text-xs text-[#526989]">
                {item.format} · {item.duration} · {item.level}
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-5 grid gap-4 sm:grid-cols-2"
            >
              <label className="grid gap-1.5 text-xs font-bold text-[#07152d]">
                Full name
                <input
                  required
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  className="h-11 rounded-lg border border-slate-200 bg-[#f8fafc] px-3 text-sm font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-[#0875d1] focus:ring-2 focus:ring-[#0875d1]/15"
                />
              </label>
              <label className="grid gap-1.5 text-xs font-bold text-[#07152d]">
                Email address
                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-11 rounded-lg border border-slate-200 bg-[#f8fafc] px-3 text-sm font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-[#0875d1] focus:ring-2 focus:ring-[#0875d1]/15"
                />
              </label>
              <PhoneNumberField
                label="Phone number"
                numberName="phone"
                labelClassName="grid gap-1.5 text-xs font-bold text-[#07152d]"
                inputClassName="h-11 rounded-lg border border-slate-200 bg-[#f8fafc] px-3 text-sm font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-[#0875d1] focus:ring-2 focus:ring-[#0875d1]/15"
                selectClassName="h-11 rounded-lg border border-slate-200 bg-[#f8fafc] px-3 text-sm font-normal outline-none focus:border-[#0875d1] focus:ring-2 focus:ring-[#0875d1]/15"
              />
              <label className="grid gap-1.5 text-xs font-bold text-[#07152d]">
                Current experience
                <select
                  name="experience"
                  className="h-11 rounded-lg border border-slate-200 bg-[#f8fafc] px-3 text-sm font-normal outline-none focus:border-[#0875d1] focus:ring-2 focus:ring-[#0875d1]/15"
                >
                  <option>Getting started</option>
                  <option>Some experience</option>
                  <option>Professional</option>
                  <option>Organization or team</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-xs font-bold text-[#07152d] sm:col-span-2">
                What do you hope to achieve?
                <textarea
                  name="goals"
                  rows={3}
                  placeholder="Tell us briefly about your learning goal..."
                  className="resize-y rounded-lg border border-slate-200 bg-[#f8fafc] px-3 py-2.5 text-sm font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-[#0875d1] focus:ring-2 focus:ring-[#0875d1]/15"
                />
              </label>
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#07152d] px-5 text-sm font-bold text-white transition-colors hover:bg-[#0875d1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] sm:col-span-2"
              >
                Continue to account creation <ArrowRight className="size-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center sm:py-12">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#e7f7ef] text-[#087d55]">
              <Check className="size-7" />
            </span>
            <h2
              id="enrollment-title"
              className="font-exo mt-5 text-2xl font-bold tracking-[-0.04em] text-[#07152d]"
            >
              Your enrollment request is ready.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#526989]">
              Thank you for your interest in {item.title}. The SAN HUB team will
              follow up with the intake details.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-lg bg-[#07152d] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0875d1]"
            >
              Done
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function CourseCard({
  item,
  index,
  onEnroll,
}: {
  item: SanHubCatalogItem;
  index: number;
  onEnroll: (item: SanHubCatalogItem) => void;
}) {
  return (
    <article className="group relative flex min-w-0 flex-col justify-between overflow-hidden border border-slate-200 bg-white p-3 shadow-sm transition-all hover:border-brand-secondary hover:shadow-md">
      <div>
        <Link
          href={item.href}
          className="relative block aspect-[16/10] w-full overflow-hidden bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-inset"
        >
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 340px, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-2.5 top-2.5 bg-[#0a1f44] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-white">
            {item.courseCategory ?? item.category}
          </span>
        </Link>

        <div className="mt-2.5 flex items-center justify-between gap-2 text-[10px] font-semibold text-slate-500">
          <span className="inline-flex min-w-0 items-center gap-1 truncate">
            <Users className="size-3 shrink-0 text-brand-secondary" />
            {item.level}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1">
            <Clock3 className="size-3 text-brand-secondary" />
            {item.duration}
          </span>
        </div>

        <Link
          href={item.href}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
        >
          <h3 className="font-exo mt-2 line-clamp-2 text-sm font-bold leading-snug text-[#0a1f44] transition-colors group-hover:text-brand-secondary">
            {item.title}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
          {item.description}
        </p>
      </div>

      <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2">
        <Link
          href={item.href}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#0a1f44] transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
        >
          View course <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={() => onEnroll(item)}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#0a1f44] transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
        >
          Enroll <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </button>
        <span className="hidden text-[10px] font-bold text-slate-400 sm:inline">
          #{String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <BorderBeam
        size={104}
        duration={7}
        initialOffset={12}
        borderWidth={1.5}
        colorFrom="#09bce7"
        colorTo="#0a1f44"
        className="from-transparent via-[#09bce7] to-transparent opacity-85"
      />
      <BorderBeam
        size={104}
        duration={7}
        delay={3.5}
        initialOffset={58}
        borderWidth={1.25}
        colorFrom="#0a1f44"
        colorTo="#4d8dff"
        className="from-transparent via-[#4d8dff] to-transparent opacity-70"
        reverse
      />
    </article>
  );
}

export function SanHubCourseCatalog({
  items,
  categories = sanHubCourseCategories,
}: CourseCatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | SanHubCourseCategory>("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [selectedItem, setSelectedItem] = useState<SanHubCatalogItem | null>(
    null,
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const categoryOptions = useMemo(() => {
    return [
      { id: "all" as const, label: "All courses", count: items.length },
      ...categories.map((id) => ({
        id,
        label: id,
        count: items.filter((item) => item.courseCategory === id).length,
      })),
    ];
  }, [categories, items]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalize(query);
    return items.filter((item) => {
      const matchesCategory =
        category === "all" || item.courseCategory === category;
      const searchable = normalize(
        `${item.title} ${item.category} ${item.courseCategory ?? ""} ${item.provider} ${item.description} ${item.format} ${item.level}`,
      );
      return (
        matchesCategory &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      );
    });
  }, [category, items, query]);

  const pageSize = 3;
  const pageCount = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const visibleItems = filteredItems.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize,
  );
  const activeCategory =
    categoryOptions.find((option) => option.id === category) ??
    categoryOptions[0];

  useEffect(() => {
    if (prefersReducedMotion || !isAutoPlaying || pageCount < 2) return;
    const timer = window.setInterval(() => {
      setSlideDirection(1);
      setCurrentPage((page) => (page + 1) % pageCount);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, pageCount, prefersReducedMotion]);

  function selectCategory(nextCategory: "all" | SanHubCourseCategory) {
    setCategory(nextCategory);
    setCurrentPage(0);
  }

  function goToPage(page: number, direction: 1 | -1) {
    setSlideDirection(direction);
    setCurrentPage(Math.min(Math.max(page, 0), pageCount - 1));
  }

  function clearSearch() {
    setQuery("");
    setCurrentPage(0);
  }

  return (
    <>
      <section className="border-t border-slate-200 px-3 pb-8 pt-2 sm:px-8 lg:px-12 lg:pb-10 lg:pt-3">
        <div className="mx-auto max-w-[1600px] border border-slate-200 bg-white p-4 shadow-xs sm:p-6 lg:p-7">
          <div className="mb-5 flex flex-col gap-4 border-b border-slate-200 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
                SAN HUB / COURSES
              </p>
              <h1 className="font-exo mt-2 text-xl font-bold leading-tight tracking-[-0.04em] text-[#07152d] sm:text-2xl">
                Learn, build, and move forward.
              </h1>
            </div>
            <label className="relative block w-full sm:max-w-sm">
              <span className="sr-only">Search courses</span>
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCurrentPage(0);
                }}
                placeholder="Search courses and pathways"
                className="h-11 w-full border border-slate-200 bg-white px-4 pr-11 text-sm text-[#526989] outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary/10"
              />
              <Search
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-brand-secondary"
                aria-hidden="true"
              />
            </label>
          </div>

          <div
            className="grid gap-6 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-8"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <aside
              className="border-l border-slate-300 pl-4 lg:self-start"
              aria-label="Course categories"
            >
              <div
                className="flex flex-row flex-wrap gap-x-4 gap-y-1 lg:flex-col lg:gap-y-1"
                role="tablist"
                aria-label="Course categories"
              >
                {categoryOptions.map((option, index) => {
                  const active = option.id === category;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => selectCategory(option.id)}
                      className={`group flex items-center justify-between gap-3 py-1.5 text-left transition-colors ${active ? "text-[#0a1f44]" : "text-slate-500 hover:text-brand-secondary"}`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`w-5 shrink-0 text-[10px] font-black tracking-[0.12em] ${active ? "text-brand-secondary" : "text-slate-400 group-hover:text-brand-secondary"}`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-bold">
                          {option.label}
                        </span>
                      </span>
                      <span
                        className={`hidden rounded px-1.5 py-0.5 text-[10px] font-bold lg:inline-block ${active ? "bg-[#0a1f44] text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600"}`}
                      >
                        {option.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="flex min-w-0 flex-col overflow-hidden">
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-200 pb-2.5">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-[11px] font-black uppercase tracking-[0.15em] text-brand-secondary">
                    {activeCategory?.label ?? "Courses"}
                  </span>
                  <span className="text-slate-300" aria-hidden="true">
                    ·
                  </span>
                  <span className="shrink-0 text-xs font-bold text-slate-500">
                    {filteredItems.length}{" "}
                    {filteredItems.length === 1 ? "course" : "courses"}{" "}
                    available
                  </span>
                </div>
                <div className="hidden shrink-0 items-center gap-1.5">
                  {pageCount > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsAutoPlaying((value) => !value)}
                        aria-label={
                          isAutoPlaying
                            ? "Pause course carousel"
                            : "Play course carousel"
                        }
                        className="hidden size-7 place-items-center rounded border border-slate-200 text-slate-600 transition-colors hover:border-[#0a1f44] hover:text-[#0a1f44] sm:grid"
                      >
                        {isAutoPlaying ? "Ⅱ" : "▶"}
                      </button>
                      <button
                        type="button"
                        onClick={() => goToPage(currentPage - 1, -1)}
                        disabled={currentPage === 0}
                        aria-label="Previous courses"
                        className="grid size-7 place-items-center rounded border border-slate-200 bg-white text-[#0a1f44] shadow-2xs transition-colors hover:border-[#0a1f44] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        <ArrowLeft className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => goToPage(currentPage + 1, 1)}
                        disabled={currentPage === pageCount - 1}
                        aria-label="Next courses"
                        className="grid size-7 place-items-center rounded border border-slate-200 bg-white text-[#0a1f44] shadow-2xs transition-colors hover:border-[#0a1f44] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        <ArrowRight className="size-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {filteredItems.length > 0 ? (
                <>
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={`${category}-${currentPage}-${query}`}
                      initial={{
                        opacity: 0,
                        x: prefersReducedMotion ? 0 : slideDirection * 14,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        x: prefersReducedMotion ? 0 : slideDirection * -14,
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0.01 : 0.22,
                        ease: "easeOut",
                      }}
                      className={`grid gap-4 ${visibleItems.length === 1 ? "grid-cols-1 max-w-md" : visibleItems.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-3xl" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"}`}
                    >
                      {visibleItems.map((item, index) => (
                        <CourseCard
                          key={item.id}
                          item={item}
                          index={index}
                          onEnroll={setSelectedItem}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`Page ${currentPage + 1} of ${pageCount}`}
                    >
                      {Array.from({ length: pageCount }, (_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            goToPage(index, index >= currentPage ? 1 : -1)
                          }
                          aria-label={`Show course page ${index + 1}`}
                          aria-current={
                            currentPage === index ? "page" : undefined
                          }
                          className={`h-1.5 rounded-full transition-all ${currentPage === index ? "w-8 bg-[#0a1f44]" : "w-1.5 bg-slate-300 hover:bg-slate-400"}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      {query && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="text-xs font-bold text-brand-secondary hover:underline"
                        >
                          Clear search
                        </button>
                      )}
                      {pageCount > 1 && (
                        <div
                          className="flex items-center gap-1.5"
                          aria-label="Course pagination controls"
                        >
                          <button
                            type="button"
                            onClick={() => goToPage(currentPage - 1, -1)}
                            disabled={currentPage === 0}
                            aria-label="Previous courses"
                            className="grid size-7 place-items-center rounded border border-slate-200 bg-white text-[#0a1f44] shadow-2xs transition-colors hover:border-[#0a1f44] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-35"
                          >
                            <ArrowLeft className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsAutoPlaying((value) => !value)}
                            aria-label={
                              isAutoPlaying
                                ? "Pause course carousel"
                                : "Play course carousel"
                            }
                            className="grid size-7 place-items-center rounded border border-[#0a1f44] bg-[#0a1f44] text-xs font-bold text-white transition-colors hover:bg-brand-secondary"
                          >
                            {isAutoPlaying ? "Ⅱ" : "▶"}
                          </button>
                          <button
                            type="button"
                            onClick={() => goToPage(currentPage + 1, 1)}
                            disabled={currentPage === pageCount - 1}
                            aria-label="Next courses"
                            className="grid size-7 place-items-center rounded border border-slate-200 bg-white text-[#0a1f44] shadow-2xs transition-colors hover:border-[#0a1f44] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-35"
                          >
                            <ArrowRight className="size-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="border border-dashed border-[#b8c9df] px-6 py-14 text-center">
                  <Search
                    className="mx-auto size-7 text-brand-secondary"
                    aria-hidden="true"
                  />
                  <h3 className="font-exo mt-4 text-xl font-bold text-[#07152d]">
                    No courses found.
                  </h3>
                  <p className="mt-2 text-sm text-[#526989]">
                    Try another search or browse all course categories.
                  </p>
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="mt-5 rounded-lg bg-[#07152d] px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-secondary"
                  >
                    Show all courses
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {selectedItem && (
        <EnrollmentDialog
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}
