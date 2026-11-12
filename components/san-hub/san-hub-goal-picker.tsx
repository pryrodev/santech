"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Lightbulb,
  UsersRound,
  Wrench,
} from "lucide-react";
import { useState } from "react";

import { sanHubGoals, type SanHubGoalId } from "@/lib/san-hub-data";

const goalIcons = {
  learn: Wrench,
  build: Lightbulb,
  opportunity: BriefcaseBusiness,
  team: UsersRound,
} satisfies Record<SanHubGoalId, typeof Wrench>;

export function SanHubGoalPicker() {
  const [activeGoalId, setActiveGoalId] = useState<SanHubGoalId>("learn");
  const prefersReducedMotion = useReducedMotion();
  const activeGoal =
    sanHubGoals.find((goal) => goal.id === activeGoalId) ?? sanHubGoals[0];

  return (
    <section
      id="san-hub-goals"
      className="san-hub-graphic-section relative overflow-hidden border-b border-slate-200 px-6 py-14 sm:px-10 lg:px-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">
              Find your SAN HUB route
            </p>
            <h2 className="font-exo mt-4 max-w-xl text-3xl font-bold leading-[1.02] tracking-[-0.055em] text-[#0a1f44] sm:text-4xl">
              Choose your next SAN HUB route.
            </h2>
          </div>

          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
            role="tablist"
            aria-label="Choose your SAN HUB goal"
          >
            {sanHubGoals.map((goal) => {
              const Icon = goalIcons[goal.id];
              const isActive = goal.id === activeGoalId;

              return (
                <button
                  key={goal.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="san-hub-goal-panel"
                  onClick={() => setActiveGoalId(goal.id)}
                  className={`group flex min-h-[84px] items-center gap-3 rounde-md border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 ${isActive ? "border-[#0a1f44] bg-[#0a1f44] text-white shadow-[0_16px_30px_rgba(10,31,68,0.16)]" : "border-white/80 bg-white/65 text-[#0a1f44] hover:border-brand-secondary hover:bg-white"}`}
                >
                  <Icon
                    className={`size-5 ${isActive ? "text-cyan-300" : "text-brand-secondary"}`}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-bold leading-tight">
                    {goal.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeGoal.id}
            id="san-hub-goal-panel"
            role="tabpanel"
            aria-label={`${activeGoal.label} recommendations`}
            initial={{
              opacity: prefersReducedMotion ? 1 : 0,
              y: prefersReducedMotion ? 0 : 10,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: prefersReducedMotion ? 1 : 0,
              y: prefersReducedMotion ? 0 : -8,
            }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.24,
              ease: "easeOut",
            }}
            className="mt-10 border-t border-[#0a1f44]/15 pt-7"
          >
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <h3 className="font-exo max-w-2xl text-2xl font-bold leading-tight tracking-[-0.04em] text-[#0a1f44] sm:text-3xl">
                {activeGoal.title}
              </h3>
              <Link
                href={activeGoal.actionHref}
                className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-brand-secondary underline-offset-4 transition-colors hover:text-[#0a1f44] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
              >
                {activeGoal.actionLabel}{" "}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-7 grid gap-3 lg:grid-cols-3">
              {activeGoal.pathways.map((pathway) => (
                <Link
                  key={pathway.title}
                  href={pathway.href}
                  className="group rounde-md border border-white/80 bg-white/85 p-5 shadow-[0_12px_30px_rgba(10,31,68,0.05)] transition-all hover:-translate-y-1 hover:border-brand-secondary/50 hover:bg-white hover:shadow-[0_18px_35px_rgba(10,31,68,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                    {pathway.meta}
                  </span>
                  <h4 className="font-exo mt-5 text-lg font-bold leading-tight tracking-[-0.025em] text-[#0a1f44] transition-colors group-hover:text-brand-secondary">
                    {pathway.title}
                  </h4>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary">
                    View pathway{" "}
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
