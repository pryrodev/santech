import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BadgeDollarSign,
  BookOpen,
  BriefcaseBusiness,
  Hammer,
  Lightbulb,
  Microscope,
  Network,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import {
  sanHubExploreRoutes,
  type SanHubExploreRouteId,
} from "@/lib/san-hub-explore-data";
import { BorderBeam } from "@/components/ui/border-beam";

const routeIcons: Record<SanHubExploreRouteId, LucideIcon> = {
  learn: BookOpen,
  build: Hammer,
  innovate: Lightbulb,
  launch: Rocket,
  connect: Network,
  work: BriefcaseBusiness,
  research: Microscope,
  commercialize: BadgeDollarSign,
};

export function SanHubExploreSection() {
  return (
    <section
      id="san-hub-explore"
      className="san-hub-graphic-section border-b border-slate-200 px-6 py-14 sm:px-10 lg:px-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1500px] rounde-md bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="grid gap-8 border-b border-slate-200 pb-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">
              SAN HUB / Explore
            </p>
            <h1 className="font-exo mt-4 max-w-xl text-3xl font-bold leading-[1.02] tracking-[-0.055em] text-[#0a1f44] sm:text-4xl lg:text-4xl">
              One ecosystem. Many ways forward.
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#303755]">
            Explore the SAN HUB ecosystem through learning, practical building,
            innovation, opportunity, research, and pathways to sustainable
            impact.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sanHubExploreRoutes
            .filter(({ id }) => id !== "learn")
            .map(({ id, label, description }, index) => {
              const Icon = routeIcons[id];

              return (
                <Link
                  key={id}
                  href={`/san-hub/explore/${id}`}
                  className="group relative isolate self-start overflow-hidden border border-slate-200 bg-[#fbfcfe] p-3.5 shadow-[0_10px_24px_rgba(10,31,68,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan hover:bg-white hover:shadow-[0_16px_30px_rgba(10,31,68,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-8 place-items-center rounded-xl bg-[#e7f4fb] text-brand-secondary">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="text-[10px] font-black tracking-[0.16em] text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="font-exo mt-4 text-lg font-bold tracking-[-0.03em] text-[#0a1f44]">
                    {label}
                  </h2>
                  <div className="mt-1 flex items-end justify-between gap-3">
                    <p className="text-sm leading-5 text-slate-600">
                      {description}
                    </p>
                    <ArrowUpRight
                      className="mb-0.5 size-4 shrink-0 text-brand-secondary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </div>
                  <BorderBeam
                    size={72}
                    duration={6}
                    initialOffset={(index % 2) * 48}
                    borderWidth={1.25}
                    colorFrom="#09bce7"
                    colorTo="#0a1f44"
                    className="from-transparent via-brand-cyan to-transparent opacity-80"
                  />
                  <BorderBeam
                    size={72}
                    duration={6}
                    delay={3}
                    initialOffset={index % 2 === 0 ? 55 : 7}
                    borderWidth={1}
                    colorFrom="#0a1f44"
                    colorTo="#4d8dff"
                    className="from-transparent via-[#4d8dff] to-transparent opacity-60"
                  />
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
