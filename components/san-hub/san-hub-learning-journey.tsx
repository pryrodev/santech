"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Hammer,
  Network,
} from "lucide-react";
import { useState } from "react";

import {
  sanHubLearningJourney,
  type SanHubJourneyStage,
} from "@/lib/san-hub-data";

const journeyIcons = {
  learn: BookOpen,
  build: Hammer,
  prove: BadgeCheck,
  connect: Network,
} satisfies Record<SanHubJourneyStage["id"], typeof BookOpen>;

export function SanHubLearningJourney() {
  const [activeStageId, setActiveStageId] =
    useState<SanHubJourneyStage["id"]>("learn");
  const prefersReducedMotion = useReducedMotion();
  const activeStage =
    sanHubLearningJourney.find((stage) => stage.id === activeStageId) ??
    sanHubLearningJourney[0];

  return (
    <section
      id="san-hub-impact"
      className="relative scroll-mt-40 overflow-hidden border-y border-slate-200 bg-[#f7f8fa] px-6 py-14 text-[#0a1f44] sm:px-10 lg:px-16 lg:py-20"
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "url('/images/rw-graphic01-30p.png')",
          backgroundPosition: "center",
          backgroundSize: "427px 427px",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">
              The SAN HUB method
            </p>
            <h2 className="font-exo mt-4 max-w-xl text-3xl font-bold leading-[1.02] tracking-[-0.055em] sm:text-4xl">
              Learning should lead somewhere.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Every pathway is designed to move from knowledge to useful work,
              with a next step that people can see.
            </p>
          </div>

          <div
            className="grid gap-2 sm:grid-cols-4"
            role="tablist"
            aria-label="SAN HUB learning journey"
          >
            {sanHubLearningJourney.map((stage, index) => {
              const Icon = journeyIcons[stage.id];
              const isActive = stage.id === activeStageId;

              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="san-hub-journey-panel"
                  onClick={() => setActiveStageId(stage.id)}
                  className={`group relative flex min-h-[84px] items-center gap-3 rounde-md border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 ${isActive ? "border-[#0a1f44] bg-[#0a1f44] text-white" : "border-slate-200 bg-white/80 text-[#0a1f44] hover:border-brand-secondary hover:bg-white"}`}
                >
                  <span
                    className={`absolute right-4 top-4 text-xs font-black ${isActive ? "text-white/45" : "text-slate-400"}`}
                  >
                    0{index + 1}
                  </span>
                  <Icon
                    className={`size-5 ${isActive ? "text-cyan-300" : "text-brand-secondary"}`}
                    aria-hidden="true"
                  />
                  <span className="block text-sm font-bold">{stage.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeStage.id}
            id="san-hub-journey-panel"
            role="tabpanel"
            aria-label={`${activeStage.label} stage`}
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
            className="mt-8 flex flex-col justify-between gap-6 border-t border-slate-200 pt-7 sm:flex-row sm:items-end"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-secondary">
                Stage{" "}
                {String(
                  sanHubLearningJourney.indexOf(activeStage) + 1,
                ).padStart(2, "0")}
              </p>
              <h3 className="font-exo mt-3 text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
                {activeStage.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {activeStage.description}
              </p>
            </div>
            <div className="inline-flex shrink-0 items-center gap-3 text-sm font-bold text-[#0a1f44]">
              <span className="grid size-10 place-items-center rounded-full border border-brand-secondary/40 text-brand-secondary">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
              {activeStage.outcome}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
