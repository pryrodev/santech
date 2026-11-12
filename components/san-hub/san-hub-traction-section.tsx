import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Globe2,
  Handshake,
  Lightbulb,
  Users,
} from "lucide-react";
import { SanHubTractionMap } from "@/components/san-hub/san-hub-traction-map";

const tractionSignals = [
  ["Beneficiaries by year", Users],
  ["Countries reached", Globe2],
  ["Programs delivered", BarChart3],
  ["Training hours", BarChart3],
  ["Scholarships", Handshake],
  ["Internships", BriefcaseBusiness],
  ["Startups / projects developed", Lightbulb],
  ["Jobs created", BriefcaseBusiness],
] as const;

const growthTimeline = [
  ["2022", "Participation and learning"],
  ["2023", "Programs and community"],
  ["2024", "Projects and partnerships"],
  ["2025", "Employment and outcomes"],
  ["2026", "Scaling the ecosystem"],
] as const;

export function SanHubTractionSection() {
  return (
    <section className="san-hub-graphic-section border-b border-slate-200 py-2 sm:px-4 lg:px-10 lg:py-4">
      <div className="mx-auto max-w-[1500px] rounde-md bg-white px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-8">
        <div className="grid gap-8 border-b border-slate-200 pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">
              SAN HUB / Traction
            </p>
            <h1 className="font-exo mt-0 max-w-xl text-2xl font-bold leading-tight tracking-[-0.04em] text-[#0a1f44] sm:text-3xl">
              From participation to measurable outcomes.
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#303755]">
            SAN HUB&apos;s growth can be read through the people reached,
            countries connected, programs delivered, projects developed, and
            opportunities created.
          </p>
        </div>

        <SanHubTractionMap />

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tractionSignals.map(([label, Icon]) => (
            <div
              key={label}
              className="flex items-center gap-3 border border-slate-200 bg-[#fbfcfe] px-4 py-4 text-sm font-semibold text-[#0a1f44]"
            >
              <Icon
                className="size-4 shrink-0 text-brand-secondary"
                aria-hidden="true"
              />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 border-y border-slate-200 py-7">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-secondary">
              Growth timeline
            </p>
            <ArrowRight
              className="size-5 text-brand-secondary"
              aria-hidden="true"
            />
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-5">
            {growthTimeline.map(([year, label], index) => (
              <div
                key={year}
                className="relative border-l-2 border-[#cfe5f1] pl-4 sm:border-l-0 sm:border-t-2 sm:pl-0 sm:pt-4"
              >
                <span className="font-exo text-2xl font-bold tracking-[-0.04em] text-[#0a1f44]">
                  {year}
                </span>
                <p className="mt-1 text-sm leading-5 text-slate-600">{label}</p>
                {index < growthTimeline.length - 1 && (
                  <span
                    className="absolute -bottom-2 left-[-5px] hidden size-2 rounded-full bg-brand-secondary sm:bottom-auto sm:left-auto sm:right-[-4px] sm:top-[-5px] sm:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
