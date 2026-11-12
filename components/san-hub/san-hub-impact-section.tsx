"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  BriefcaseBusiness,
  Globe2,
  GraduationCap,
  Rocket,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const impactStats = [
  {
    value: "2,500+",
    label: "Beneficiaries",
    description:
      "People reached through SAN HUB learning, innovation, and ecosystem activities.",
    icon: Users,
  },
  {
    value: "17+",
    label: "Countries",
    description:
      "Participants and innovators connected across countries and communities.",
    icon: Globe2,
  },
  {
    value: "300+",
    label: "Scholarship / training opportunities",
    description:
      "Opportunities that expand access to technology learning and participation.",
    icon: GraduationCap,
  },
  {
    value: "54+",
    label: "Startups / projects",
    description:
      "Projects and ventures developed through practical innovation pathways.",
    icon: Rocket,
  },
  {
    value: "743+",
    label: "Jobs created",
    description:
      "Employment and opportunity connected to SAN HUB activity and partnerships.",
    icon: BriefcaseBusiness,
  },
] as const;

const impactCardStyles = [
  {
    card: "bg-[#07152d] text-white shadow-[0_18px_38px_rgba(7,21,45,0.2)]",
    icon: "bg-white/10 text-cyan-300",
    muted: "text-white/65",
    label: "text-white",
  },
  {
    card: "bg-[#e8f1fc] text-[#0a1f44] shadow-[0_14px_30px_rgba(10,31,68,0.08)]",
    icon: "bg-white text-brand-secondary",
    muted: "text-[#526989]",
    label: "text-[#0a1f44]",
  },
  {
    card: "bg-white text-[#0a1f44] shadow-[0_14px_30px_rgba(10,31,68,0.08)]",
    icon: "bg-[#edf4fd] text-brand-secondary",
    muted: "text-[#526989]",
    label: "text-[#0a1f44]",
  },
  {
    card: "bg-[#dff7fb] text-[#0a1f44] shadow-[0_14px_30px_rgba(10,31,68,0.08)]",
    icon: "bg-white/80 text-brand-secondary",
    muted: "text-[#526989]",
    label: "text-[#0a1f44]",
  },
  {
    card: "bg-[#eef1ff] text-[#0a1f44] shadow-[0_14px_30px_rgba(10,31,68,0.08)]",
    icon: "bg-white text-brand-secondary",
    muted: "text-[#526989]",
    label: "text-[#0a1f44]",
  },
] as const;

function ImpactCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const prefersReducedMotion = useReducedMotion();
  const numericValue = Number(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9,]/g, "");
  const count = useMotionValue(prefersReducedMotion ? numericValue : 0);
  const formattedCount = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString(),
  );
  const [displayValue, setDisplayValue] = useState(() =>
    prefersReducedMotion ? numericValue.toLocaleString() : "0",
  );

  useEffect(
    () => formattedCount.on("change", setDisplayValue),
    [formattedCount],
  );

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      count.set(numericValue);
      return;
    }

    const controls = animate(count, numericValue, {
      duration: 1.1,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [count, isInView, numericValue, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export function SanHubImpactSection() {
  return (
    <section
      id="san-hub-impact"
      className="san-hub-graphic-section border-b border-slate-200 py-2 sm:px-4 lg:px-10 lg:py-4"
    >
      <div className="mx-auto max-w-[1500px] rounde-md bg-white px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">
          SAN HUB / Impact in action
        </p>
        <div className="mt-3 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-12">
          <h1 className="font-exo max-w-xl text-3xl font-bold leading-[1.02] tracking-[-0.055em] text-[#0a1f44] sm:text-4xl">
            Impact is what remains after the program ends.
          </h1>
          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-[#303755]">
              SAN HUB brings people, practical learning, innovation, and
              opportunity closer together.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              These milestones reflect a wider ecosystem of learners,
              institutions, partners, and teams building useful technology
              together.
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:items-start">
          {impactStats.map(
            ({ value, label, description, icon: Icon }, index) => {
              const styles = impactCardStyles[index];
              return (
                <article
                  key={label}
                  className={`group min-h-[245px] rounde-md border border-white/70 p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(10,31,68,0.14)] ${styles.card} ${index === 1 || index === 3 ? "lg:mt-5" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`grid size-11 place-items-center rounded-xl shadow-sm ${styles.icon}`}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] opacity-45">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="font-exo mt-6 text-3xl font-bold tracking-[-0.04em]">
                    <ImpactCounter value={value} />
                  </p>
                  <h2
                    className={`mt-1 text-sm font-bold leading-5 ${styles.label}`}
                  >
                    {label}
                  </h2>
                  <p className={`mt-2 text-[13px] leading-5 ${styles.muted}`}>
                    {description}
                  </p>
                </article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
