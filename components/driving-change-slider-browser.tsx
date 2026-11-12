"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Pause,
  Play,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import {
  drivingChangeSections,
  type DrivingChangeMenuKey,
  type DrivingChangeSection,
} from "@/lib/driving-change-data";
import type { DrivingChangeStory as CmsDrivingChangeStory } from "@/lib/strapi";
import { useUiCopy } from "@/lib/use-ui-copy";

const CARDS_PER_VIEW = 3;

export function DrivingChangeSliderBrowser({
  sectionKey = "impact",
  stories = [],
  sections,
}: {
  sectionKey?: DrivingChangeMenuKey;
  stories?: CmsDrivingChangeStory[];
  sections?: readonly DrivingChangeSection[];
}) {
  const t = useUiCopy();
  const availableSections = sections?.length ? sections : drivingChangeSections;
  const currentSection = useMemo(() => {
    return (
      availableSections.find((s) => s.key === sectionKey) ||
      availableSections[0]
    );
  }, [availableSections, sectionKey]);

  // Default active category to the first one in the section
  const [selectedCategory, setSelectedCategory] = useState<string>(
    currentSection.categories[0].id
  );
  const [cardOffset, setCardOffset] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeStoryModal, setActiveStoryModal] = useState<CmsDrivingChangeStory | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync category if sectionKey changes
  useEffect(() => {
    setSelectedCategory(currentSection.categories[0].id);
    setCardOffset(0);
  }, [currentSection]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!activeStoryModal) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveStoryModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeStoryModal]);

  // Filter stories for current section and active category
  const filteredStories = useMemo(() => {
    return stories.filter(
      (item) => item.sectionKey === sectionKey && item.category === selectedCategory
    );
  }, [sectionKey, selectedCategory, stories]);

  const totalCards = filteredStories.length;

  useEffect(() => {
    setCardOffset(0);
  }, [selectedCategory]);

  const nextSlide = useCallback(() => {
    if (totalCards <= CARDS_PER_VIEW) return;
    setCardOffset((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const prevSlide = useCallback(() => {
    if (totalCards <= CARDS_PER_VIEW) return;
    setCardOffset((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  useEffect(() => {
    if (!isAutoPlaying || totalCards <= CARDS_PER_VIEW || activeStoryModal !== null) return;
    const interval = setInterval(nextSlide, 5200);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalCards, activeStoryModal, nextSlide]);

  const visibleCards = useMemo(() => {
    if (totalCards === 0) return [];
    if (totalCards <= CARDS_PER_VIEW) return filteredStories;

    const cards: CmsDrivingChangeStory[] = [];
    for (let i = 0; i < CARDS_PER_VIEW; i++) {
      cards.push(filteredStories[(cardOffset + i) % totalCards]);
    }
    return cards;
  }, [filteredStories, cardOffset, totalCards]);

  const activeCategoryObj = useMemo(() => {
    return currentSection.categories.find((c) => c.id === selectedCategory);
  }, [currentSection, selectedCategory]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="grid gap-6 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr] items-start">
        {/* =========================================================================
            LEFT COLUMN: Clean Numbered Listing
            ========================================================================= */}
        <aside aria-label="Topic list" className="w-full pt-1">
          <nav className="flex flex-col gap-6 pl-4 border-l border-slate-200">
            {currentSection.categories.map((cat) => {
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className="group relative -ml-[17px] flex items-center gap-3 text-left transition-colors focus-visible:outline-none"
                >
                  {/* Active indicator bar on border */}
                  <span
                    className={`h-5 w-0.5 shrink-0 transition-colors ${
                      isActive ? "bg-[#0a1f44]" : "bg-transparent group-hover:bg-slate-300"
                    }`}
                    aria-hidden="true"
                  />

                  {/* Number */}
                  <span
                    className={`text-xs font-mono font-black transition-colors ${
                      isActive ? "text-[#0a1f44]" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {cat.num}
                  </span>

                  {/* Title */}
                  <h3
                    className={`font-exo text-sm sm:text-[15px] leading-tight transition-colors ${
                      isActive
                        ? "font-extrabold text-[#0a1f44]"
                        : "font-semibold text-slate-500 group-hover:text-[#0a1f44]"
                    }`}
                  >
                    {cat.label}
                  </h3>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* =========================================================================
            RIGHT COLUMN: 3-Card Auto-Sliding Carousel
            ========================================================================= */}
        <main className="min-w-0 w-full">
          {/* Header Bar with Category Title & Controllers */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">
                  {currentSection.label}
                </span>
                <span className="text-slate-300">/</span>
                <span className="text-xs font-bold text-[#0a1f44]">
                  {activeCategoryObj?.label || "Stories"}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">
                Showing {totalCards} {totalCards === 1 ? "story" : "stories"} · Auto-sliding
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0">
              {totalCards > CARDS_PER_VIEW && (
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying((v) => !v)}
                  title={isAutoPlaying ? "Pause auto-slide" : "Play auto-slide"}
                  className="grid size-8 place-items-center border border-slate-200 bg-white text-slate-600 transition-colors hover:border-[#0a1f44] hover:text-[#0a1f44]"
                >
                  {isAutoPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                </button>
              )}

              <button
                type="button"
                onClick={prevSlide}
                disabled={totalCards <= CARDS_PER_VIEW}
                aria-label={t.previous}
                className="grid size-8 place-items-center border border-slate-200 bg-white text-[#0a1f44] shadow-2xs transition-colors hover:border-[#0a1f44] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowLeft className="size-4" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                disabled={totalCards <= CARDS_PER_VIEW}
                aria-label={t.next}
                className="grid size-8 place-items-center border border-slate-200 bg-white text-[#0a1f44] shadow-2xs transition-colors hover:border-[#0a1f44] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid / Carousel Viewport */}
          <div className="mt-4 overflow-hidden">
            {totalCards === 0 ? (
              <div className="border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center text-xs font-semibold text-slate-500">
                No stories available for this section yet.
              </div>
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${sectionKey}-${selectedCategory}-${cardOffset}`}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className={`grid gap-4 ${
                    visibleCards.length === 1
                      ? "grid-cols-1 max-w-sm"
                      : visibleCards.length === 2
                      ? "grid-cols-1 sm:grid-cols-2 max-w-3xl"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {visibleCards.map((story, idx) => (
                    <article
                      key={`${story.slug}-${idx}`}
                      onClick={() => setActiveStoryModal(story)}
                      className="group flex cursor-pointer flex-col justify-between overflow-hidden border border-slate-200 bg-white p-3 shadow-xs transition-all hover:border-brand-secondary hover:shadow-md"
                    >
                      {/* Image & Badges */}
                      <div>
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                          <Image
                            src={story.image}
                            alt={story.imageAlt}
                            fill
                            sizes="(min-width: 1024px) 280px, (min-width: 640px) 340px, 100vw"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute left-2.5 top-2.5 bg-[#0a1f44] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-white">
                            {story.categoryLabel}
                          </span>
                          {story.stats && (
                            <span className="absolute bottom-2.5 right-2.5 bg-brand-secondary/95 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-xs backdrop-blur-xs">
                              {story.stats.value}
                            </span>
                          )}
                        </div>

                        {/* Metadata */}
                        <div className="mt-2.5 flex items-center justify-between text-[10px] font-semibold text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3 text-brand-secondary" />
                            {story.location}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock3 className="size-3 text-brand-secondary" />
                            {story.readingTime}
                          </span>
                        </div>

                        {/* Title & Excerpt */}
                        <h3 className="font-exo mt-2 line-clamp-2 text-sm font-bold leading-snug text-[#0a1f44] group-hover:text-brand-secondary transition-colors">
                          {story.title}
                        </h3>

                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
                          {story.excerpt}
                        </p>
                      </div>

                      {/* Footer Link */}
                      <div className="mt-4 border-t border-slate-100 pt-2.5 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveStoryModal(story);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#0a1f44] group-hover:text-brand-secondary transition-colors"
                        >
                          <span>Explore story</span>
                          <ArrowUpRight className="size-3.5" />
                        </button>
                        <span className="text-[10px] font-semibold text-slate-400">{story.date}</span>
                      </div>
                    </article>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Bottom Indicators */}
          {totalCards > CARDS_PER_VIEW && (
            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
              <div className="flex items-center gap-1">
                {filteredStories.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCardOffset(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1 transition-all ${
                      cardOffset === i ? "w-6 bg-[#0a1f44]" : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              <div className="text-[11px] font-bold text-slate-500">
                Card {cardOffset + 1}“{Math.min(cardOffset + CARDS_PER_VIEW, totalCards)} of {totalCards}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          IN-PAGE RICH STORY MODAL
          ========================================================================= */}
      {activeStoryModal && mounted && createPortal(
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07152d]/85 p-3 sm:p-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-modal-title"
            onClick={() => setActiveStoryModal(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden border border-slate-200 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex shrink-0 items-start justify-between border-b border-slate-200 bg-slate-50/90 px-6 py-4">
                <div className="pr-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#0a1f44] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-white">
                      {activeStoryModal.categoryLabel}
                    </span>
                    {activeStoryModal.institution && (
                      <span className="text-[11px] font-bold text-slate-500">
                        {activeStoryModal.institution}
                      </span>
                    )}
                  </div>
                  <h2
                    id="story-modal-title"
                    className="font-exo mt-1.5 text-lg font-bold leading-snug text-[#0a1f44] sm:text-xl"
                  >
                    {activeStoryModal.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStoryModal(null)}
                  aria-label={t.close}
                  className="grid size-8 shrink-0 place-items-center border border-slate-200 text-slate-600 transition-colors hover:border-[#0a1f44] hover:bg-slate-100 hover:text-[#0a1f44]"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Scrollable Story Content */}
              <div className="min-h-0 flex-1 overflow-y-auto p-6 space-y-5 [scrollbar-width:thin]">
                {/* Full Uncropped Image Display */}
                <div className="relative h-[280px] sm:h-[380px] md:h-[420px] w-full overflow-hidden border border-slate-200 bg-[#07152d]/5">
                  <Image
                    src={activeStoryModal.image}
                    alt={activeStoryModal.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 768px"
                    className="object-contain"
                  />
                  {activeStoryModal.stats && (
                    <div className="absolute bottom-3 right-3 bg-[#0a1f44]/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-xs">
                      <span className="text-cyan-300 font-black mr-1.5">{activeStoryModal.stats.value}</span>
                      {activeStoryModal.stats.label}
                    </div>
                  )}
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-y border-slate-100 py-2.5 text-xs text-slate-500 font-semibold">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-brand-secondary" />
                      {activeStoryModal.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-brand-secondary" />
                      {activeStoryModal.location}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="size-3.5 text-brand-secondary" />
                    {activeStoryModal.readingTime}
                  </span>
                </div>

                {/* Excerpt */}
                <p className="text-sm font-semibold leading-relaxed text-[#0a1f44] border-l-2 border-brand-secondary pl-3.5">
                  {activeStoryModal.excerpt}
                </p>

                {/* Body Paragraphs */}
                <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {activeStoryModal.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Footer Callout */}
                <div className="border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-[#0a1f44]">Partner with SAN TECH for your institution</p>
                    <p className="text-[11px] text-slate-500">Engage our engineers for system deployment, field testing, or workshops.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStoryModal(null)}
                    className="shrink-0 bg-[#0a1f44] px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-secondary"
                  >
                    Close story
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}


