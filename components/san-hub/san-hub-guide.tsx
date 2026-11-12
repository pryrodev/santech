"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import type { SanHubCatalogItem } from "@/lib/san-hub-catalog-data";
import { sanHubGuideRoutes } from "@/lib/san-hub-data";

function recommendPathway(query: string, items: readonly SanHubCatalogItem[]) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return null;

  const route = sanHubGuideRoutes
    .map((candidate) => ({
      candidate,
      score: candidate.keywords.reduce(
        (score, keyword) => score + (normalizedQuery.includes(keyword) ? 1 : 0),
        0,
      ),
    }))
    .sort((left, right) => right.score - left.score)[0];

  if (!route || route.score === 0) return null;
  return items.find((item) => item.id === route.candidate.itemId) ?? null;
}

export function SanHubGuide({
  title = "Tell us what you want to make possible.",
  description = "Describe your next move in your own words. We'll point you to a starting pathway.",
  placeholder = "Try: I want to build an AI tool",
  catalogItems = [],
}: {
  title?: string;
  description?: string;
  placeholder?: string;
  catalogItems?: readonly SanHubCatalogItem[];
}) {
  const [query, setQuery] = useState("");
  const prefersReducedMotion = useReducedMotion();
  const recommendation = useMemo(
    () => recommendPathway(query, catalogItems),
    [query, catalogItems],
  );

  return (
    <section
      id="san-hub-guide"
      className="san-hub-graphic-section scroll-mt-40 border-y border-slate-200 px-6 py-8 sm:px-10 lg:px-16 lg:py-10"
    >
      <div className="mx-auto max-w-[1500px] rounde-md bg-white px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        <div className="overflow-hidden rounde-md border border-slate-200 bg-white/85">
          <div className="grid gap-7 px-6 py-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-10 lg:py-7">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-brand-secondary">
                <Sparkles className="size-4" aria-hidden="true" />
                SAN HUB guide
              </p>
              <h2 className="font-exo mt-3 max-w-xl text-2xl font-bold leading-[1.06] tracking-[-0.045em] text-[#0a1f44] sm:text-3xl">
                {title}
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">
                {description}
              </p>
            </div>

            <div>
              <label className="sr-only" htmlFor="san-hub-guide-input">
                What do you want to learn or build?
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brand-secondary"
                  aria-hidden="true"
                />
                <input
                  id="san-hub-guide-input"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={placeholder}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-[#0a1f44] outline-none transition-shadow placeholder:text-slate-400 focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20"
                />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {recommendation ? (
                  <motion.div
                    key={recommendation.id}
                    initial={{
                      opacity: prefersReducedMotion ? 1 : 0,
                      y: prefersReducedMotion ? 0 : 8,
                    }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: prefersReducedMotion ? 1 : 0,
                      y: prefersReducedMotion ? 0 : -8,
                    }}
                    transition={{
                      duration: prefersReducedMotion ? 0.01 : 0.2,
                      ease: "easeOut",
                    }}
                    className="mt-5 rounde-md border border-white bg-white p-5 shadow-sm"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">
                      A useful starting point
                    </p>
                    <h3 className="font-exo mt-2 text-xl font-bold leading-tight tracking-[-0.03em] text-[#0a1f44]">
                      {recommendation.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {recommendation.description}
                    </p>
                    <Link
                      href={recommendation.href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-secondary hover:text-[#0a1f44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
                    >
                      Explore this pathway{" "}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                  </motion.div>
                ) : query.trim() ? (
                  <p className="mt-5 text-sm font-semibold text-slate-600">
                    Try adding a goal such as learn, build, AI, internship, or
                    team.
                  </p>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
