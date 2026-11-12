"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { SanHubCourse } from "@/components/san-hub-course-detail";

const sectionItems = [
  { id: "about", label: "About" },
  { id: "outcomes", label: "Outcomes" },
  { id: "courses", label: "Courses" },
  { id: "testimonials", label: "Testimonials" },
  { id: "reviews", label: "Reviews" },
] as const;

export function CourseSectionNav({ course }: { course: SanHubCourse }) {
  const visibleSectionItems = sectionItems.filter(({ id }) => id === "about" || (id === "outcomes" && course.details.length > 0) || (id === "courses" && course.courseSeries.length > 0) || (id === "testimonials" && course.testimonials.length > 0) || (id === "reviews" && Boolean(course.rating || course.reviewCount || course.testimonials.length)));
  const [activeSection, setActiveSection] = useState<(typeof sectionItems)[number]["id"]>("about");
  const [isStuck, setIsStuck] = useState(false);
  const stickySentinelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sentinel = stickySentinelRef.current;
    if (!sentinel) return;
    const stickyTop = 104;
    const updateStickyState = () => {
      setIsStuck(sentinel.getBoundingClientRect().top <= stickyTop);
    };

    const observer = new IntersectionObserver(updateStickyState, { rootMargin: `-${stickyTop}px 0px 0px 0px`, threshold: 0 });

    updateStickyState();
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = visibleSectionItems.map(({ id }) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActiveSection(visible.target.id as (typeof sectionItems)[number]["id"]);
    }, { rootMargin: "-150px 0px -55% 0px", threshold: [0, 0.2, 0.5] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <span ref={stickySentinelRef} aria-hidden="true" className="block h-px -mb-px" />
      <div className="sticky top-[104px] z-40 border-y border-slate-200 bg-white/95 shadow-[0_8px_22px_rgba(10,31,68,0.08)] backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          {isStuck && (
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-3">
              <p className="min-w-0 truncate text-sm font-bold text-[#0a1f44]">{course.title}</p>
              <Link href={`/join-the-community?course=${encodeURIComponent(course.title)}`} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-secondary px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#1519ad]">Enroll now <ArrowUpRight className="size-3.5" /></Link>
            </div>
          )}
          <nav aria-label="Course sections" className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {visibleSectionItems.map((section) => <a key={section.id} href={`#${section.id}`} aria-current={activeSection === section.id ? "page" : undefined} className={`relative shrink-0 px-3 py-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-inset ${activeSection === section.id ? "text-brand-secondary" : "text-slate-700 hover:text-brand-secondary"}`}>{section.label}{activeSection === section.id && <span className="absolute inset-x-2 bottom-0 h-0.5 bg-brand-secondary" />}</a>)}
          </nav>
        </div>
      </div>
    </>
  );
}
