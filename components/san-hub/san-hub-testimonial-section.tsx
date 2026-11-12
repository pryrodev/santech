"use client";

import Image from "next/image";
import { ArrowUpRight, Star, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/strapi";

const fallbackTestimonials = [
  {
    quote:
      "SAN HUB helped me move from learning concepts to building something people could actually use.",
    name: "Aline M.",
    role: "SAN HUB learner",
    rating: "4.9",
    date: "12 Jun, 2024",
    source: "Learner story",
    image:
      "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(1).jpg",
    tone: "bg-white",
  },
  {
    quote:
      "The practical projects and mentorship gave our team the confidence to take an idea further.",
    name: "Eric N.",
    role: "Innovation program participant",
    rating: "4.8",
    date: "29 Aug, 2024",
    source: "Innovation program",
    image:
      "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(108).jpg",
    tone: "bg-[#f3f6ff]",
  },
  {
    quote:
      "SAN HUB creates a useful bridge between technology skills, opportunity, and the needs of our community.",
    name: "Diane U.",
    role: "Community partner",
    rating: "4.9",
    date: "14 Nov, 2024",
    source: "Partner story",
    image:
      "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(174).jpg",
    tone: "bg-[#f8f4ff]",
  },
] as const;

type DisplayTestimonial = {
  quote: string;
  name: string;
  role: string;
  rating: string;
  date: string;
  source: string;
  image: string;
  tone: string;
};

function TestimonialCard({
  item,
  index,
  reducedMotion,
  onOpen,
}: {
  item: DisplayTestimonial;
  index: number;
  reducedMotion: boolean;
  onOpen: (item: DisplayTestimonial) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.3,
        delay: reducedMotion ? 0 : Math.min(index, 2) * 0.06,
        ease: "easeOut",
      }}
      className={`group flex h-[205px] w-[270px] shrink-0 flex-col rounde-md border border-[#dbe5ef] p-4 shadow-[0_8px_22px_rgba(10,31,68,0.06)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-cyan/60 hover:shadow-[0_14px_30px_rgba(10,31,68,0.12)] sm:w-[300px] sm:p-5 ${item.tone}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex min-w-0 items-center gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#7186a4]">
          <span
            className="grid size-6 shrink-0 place-items-center rounded-full bg-[#e5eef8] text-xs text-brand-secondary"
            aria-hidden="true"
          >
            ✦
          </span>
          <span className="truncate">{item.source}</span>
        </span>
        <button
          type="button"
          onClick={() => onOpen(item)}
          aria-label={`Read ${item.name}'s testimonial`}
          className="grid size-7 shrink-0 place-items-center rounded-full text-[#8da1ba] transition-[background-color,color,transform] duration-200 hover:bg-[#dcecf7] hover:text-brand-secondary hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
        >
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-4 line-clamp-3 flex-1 text-[13px] leading-5 text-[#303f5c]">
        &ldquo;{item.quote}&rdquo;
      </p>

      <div className="mt-3 flex items-center gap-2.5 border-t border-[#dbe5ef] pt-3">
        <span className="relative size-9 shrink-0 overflow-hidden rounded-full border border-white bg-[#dfe8f2] shadow-sm">
          <Image
            src={item.image}
            alt=""
            fill
            className="object-cover"
            sizes="36px"
          />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-xs font-bold text-[#0a1f44]">
            {item.name}
          </span>
          <span className="mt-0.5 block truncate text-[10px] text-[#7186a4]">
            {item.role}
          </span>
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1 text-[10px] text-[#7186a4]">
          <Star
            className="size-2.5 fill-brand-secondary text-brand-secondary"
            aria-hidden="true"
          />
          {item.rating}
        </span>
      </div>
      <p className="mt-1 pl-11 text-[9px] font-bold uppercase tracking-[0.1em] text-[#9aabc0]">
        {item.date}
      </p>
    </motion.article>
  );
}

function TestimonialMarquee({
  items,
  reverse = false,
  reducedMotion,
  onOpen,
}: {
  items: readonly DisplayTestimonial[];
  reverse?: boolean;
  reducedMotion: boolean;
  onOpen: (item: DisplayTestimonial) => void;
}) {
  const baseRow = reverse ? [...items].reverse() : [...items];
  // Repeat the content inside each moving sequence so the centered rail stays filled
  // while the next copy enters before the current copy leaves.
  const row = [...baseRow, ...baseRow];
  const controls = useAnimationControls();

  const startMarquee = () => {
    if (reducedMotion) return;
    void controls.start({
      x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
      transition: {
        duration: reverse ? 38 : 34,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  useEffect(() => {
    if (reducedMotion) {
      controls.set({ x: 0 });
      return;
    }
    startMarquee();
    return () => controls.stop();
  }, [controls, reducedMotion, reverse]);

  return (
    <div
      className="testimonial-marquee relative mx-auto w-full max-w-[1100px] overflow-hidden"
      aria-label={
        reverse ? "More SAN HUB testimonials" : "SAN HUB testimonials"
      }
      onMouseEnter={() => controls.stop()}
      onMouseLeave={startMarquee}
      onFocus={() => controls.stop()}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          startMarquee();
      }}
    >
      <span
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#eef5fb] via-[#eef5fb]/85 to-transparent blur-[1px] sm:w-12"
        aria-hidden="true"
      />
      <motion.div
        className="testimonial-track flex w-max will-change-transform"
        initial={false}
        animate={controls}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="testimonial-group flex gap-3 pr-3 sm:gap-4 sm:pr-4"
            aria-hidden={copy === 1}
          >
            {row.map((item, index) => (
              <TestimonialCard
                key={`${copy}-${index}-${item.name}`}
                item={item}
                index={index}
                reducedMotion={reducedMotion}
                onOpen={onOpen}
              />
            ))}
          </div>
        ))}
      </motion.div>
      <span
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#eef5fb] via-[#eef5fb]/85 to-transparent blur-[1px] sm:w-12"
        aria-hidden="true"
      />
    </div>
  );
}

export function SanHubTestimonialSection({
  items = [],
}: {
  items?: readonly Testimonial[];
}) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<DisplayTestimonial | null>(null);
  const testimonials: readonly DisplayTestimonial[] =
    items.length > 0
      ? items.map((item, index) => ({
          quote: item.quote,
          name: item.name,
          role: item.role,
          rating: String(item.rating || "5.0"),
          date: item.dateLabel ?? "SAN HUB story",
          source: item.sourceLabel ?? "Learner story",
          image:
            item.avatar ||
            fallbackTestimonials[index % fallbackTestimonials.length].image,
          tone: fallbackTestimonials[index % fallbackTestimonials.length].tone,
        }))
      : fallbackTestimonials;

  useEffect(() => {
    if (!selectedTestimonial) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedTestimonial(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTestimonial]);

  const reducedMotion = Boolean(prefersReducedMotion);

  return (
    <section
      id="san-hub-testimonials"
      className="san-hub-graphic-section scroll-mt-40 border-b border-slate-200 px-4 py-5 sm:px-6 lg:px-8 lg:py-7"
    >
      <div className="mx-auto max-w-7xl rounded-3xl bg-[#eef5fb] px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-9">
        <div className="grid gap-3 border-b border-[#d5e1ec] pb-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-12">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
              SAN HUB / Stories
            </p>
            <h1 className="font-exo mt-2 max-w-xl text-2xl font-bold leading-[1.04] tracking-[-0.045em] text-[#0a1f44] sm:text-3xl">
              What people are building from here.
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-[#526989]">
            Learners, builders, and partners share what changed when learning
            became practical work.
          </p>
        </div>

        <div className="mt-5 space-y-3 sm:space-y-4">
          <TestimonialMarquee
            items={testimonials}
            reducedMotion={reducedMotion}
            onOpen={setSelectedTestimonial}
          />
          <TestimonialMarquee
            items={testimonials}
            reverse
            reducedMotion={reducedMotion}
            onOpen={setSelectedTestimonial}
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-[#07152d]/45 p-4 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0.01 : 0.2,
              ease: "easeOut",
            }}
            onMouseDown={() => setSelectedTestimonial(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="testimonial-dialog-title"
              className={`w-full max-w-lg rounde-md border border-white/80 p-5 shadow-[0_24px_70px_rgba(7,21,45,0.28)] sm:p-7 ${selectedTestimonial.tone}`}
              initial={{
                opacity: 0,
                scale: reducedMotion ? 1 : 0.9,
                y: reducedMotion ? 0 : 12,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: reducedMotion ? 1 : 0.94,
                y: reducedMotion ? 0 : 8,
              }}
              transition={{
                duration: reducedMotion ? 0.01 : 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">
                    {selectedTestimonial.source}
                  </p>
                  <h2
                    id="testimonial-dialog-title"
                    className="font-exo mt-2 text-xl font-bold leading-tight tracking-[-0.035em] text-[#0a1f44]"
                  >
                    A SAN HUB story
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTestimonial(null)}
                  aria-label="Close testimonial"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-[#dbe5ef] text-[#7186a4] transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
              <blockquote className="mt-6 text-base leading-7 text-[#303f5c] sm:text-lg">
                &ldquo;{selectedTestimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-[#dbe5ef] pt-4">
                <span className="relative size-11 shrink-0 overflow-hidden rounded-full border border-white bg-[#dfe8f2] shadow-sm">
                  <Image
                    src={selectedTestimonial.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-[#0a1f44]">
                    {selectedTestimonial.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-[#7186a4]">
                    {selectedTestimonial.role}
                  </span>
                </span>
                <span className="ml-auto flex shrink-0 items-center gap-1 text-xs text-[#7186a4]">
                  <Star
                    className="size-3 fill-brand-secondary text-brand-secondary"
                    aria-hidden="true"
                  />
                  {selectedTestimonial.rating}
                </span>
              </div>
              <p className="mt-2 pl-14 text-[10px] font-bold uppercase tracking-[0.1em] text-[#9aabc0]">
                {selectedTestimonial.date}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
