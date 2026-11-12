"use client";

import Image from "next/image";
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  partnerBrands,
  type PartnerBrand,
} from "@/components/santech-home-stage";
import { BorderBeam } from "@/components/ui/border-beam";
import { useEffect, useRef, useState } from "react";

export type EVisitorsImpactStat = {
  value: string;
  label: string;
  detail: string;
  count?: number;
  suffix?: string;
};

export const defaultEVisitorsImpactStats: readonly EVisitorsImpactStat[] = [
  {
    value: "47+",
    count: 47,
    suffix: "+",
    label: "institutions",
    detail: "Across public and private environments",
  },
  {
    value: "5",
    count: 5,
    label: "operational steps",
    detail: "From registration to accountable reporting",
  },
  {
    value: "1",
    count: 1,
    label: "traceable journey",
    detail: "One view for reception, security, and operations",
  },
];

type EVisitorsImpactSectionProps = {
  stats?: readonly EVisitorsImpactStat[];
  partners?: readonly PartnerBrand[];
};

function EVisitorsPartnerMark({ partner }: { partner: PartnerBrand }) {
  const content = (
    <>
      <span
        className={`relative block h-10 shrink-0 ${partner.government ? "w-10" : partner.showLabel ? "w-12" : "w-20 sm:w-24"}`}
      >
        <Image
          src={partner.src}
          alt={partner.label}
          fill
          sizes={partner.government || partner.showLabel ? "48px" : "96px"}
          className="object-contain mix-blend-multiply"
        />
      </span>
      {(partner.government || partner.showLabel) && (
        <span className="font-exo text-sm font-bold tracking-[-0.02em] text-slate-600">
          {partner.displayLabel ?? partner.label}
        </span>
      )}
    </>
  );

  if (partner.href) {
    return (
      <a
        href={partner.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Visit ${partner.label}`}
        className="inline-flex h-10 shrink-0 items-center gap-2 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
      >
        {content}
      </a>
    );
  }

  return (
    <span className="inline-flex h-10 shrink-0 items-center gap-2">
      {content}
    </span>
  );
}

function EVisitorsPartnerMarquee({
  partners,
  direction,
}: {
  partners: readonly PartnerBrand[];
  direction: 1 | -1;
}) {
  const prefersReducedMotion = useReducedMotion();
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const measuredWidthRef = useRef(0);
  const x = useMotionValue(0);
  const [loopWidth, setLoopWidth] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const group = firstGroupRef.current;
    if (!group) return;

    const updateWidth = () => {
      const width = group.getBoundingClientRect().width;
      if (measuredWidthRef.current === 0) x.set(direction === 1 ? -width : 0);
      measuredWidthRef.current = width;
      setLoopWidth(width);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(group);
    return () => observer.disconnect();
  }, [direction, x]);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || paused || !loopWidth) return;

    const next = x.get() + direction * delta * 0.035;
    if (direction === -1 && next <= -loopWidth) x.set(next + loopWidth);
    else if (direction === 1 && next >= 0) x.set(next - loopWidth);
    else x.set(next);
  });

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
      }}
    >
      <motion.div
        style={{ x }}
        className="flex w-max select-none whitespace-nowrap"
      >
        {[0, 1, 2, 3].map((group) => (
          <div
            ref={group === 0 ? firstGroupRef : undefined}
            key={group}
            className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
          >
            {partners.map((partner) => (
              <EVisitorsPartnerMark
                key={`${group}-${partner.label}`}
                partner={partner}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ImpactCounter({
  value,
  count,
  suffix = "",
  reducedMotion,
}: {
  value: string;
  count?: number;
  suffix?: string;
  reducedMotion: boolean;
}) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(
    reducedMotion || count === undefined ? (count ?? 0) : 0,
  );
  const displayValue = useTransform(
    motionValue,
    (current) => `${Math.round(current)}${suffix}`,
  );

  useEffect(() => {
    if (count === undefined || !isInView) return;
    if (reducedMotion) {
      motionValue.set(count);
      return;
    }

    const controls = animate(motionValue, count, {
      duration: 0.9,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [count, isInView, motionValue, reducedMotion]);

  return (
    <motion.span ref={counterRef}>
      {count === undefined ? value : displayValue}
    </motion.span>
  );
}

function EVisitorsImpactCard({
  stats,
  reducedMotion,
}: {
  stats: readonly EVisitorsImpactStat[];
  reducedMotion: boolean;
}) {
  const reveal = reducedMotion ? false : { opacity: 0, y: 14 };

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -120px 0px" }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounde-md border border-white/80 bg-white px-5 py-8 shadow-[0_24px_70px_rgba(10,31,68,0.18)] sm:px-8 sm:py-9 lg:px-10 lg:py-10"
    >
      <motion.div
        initial={reveal}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: reducedMotion ? 0.01 : 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-brand-secondary">
          Impact in the field
        </p>
        <h2 className="font-exo mt-3 text-2xl font-bold leading-tight tracking-[-0.045em] text-[#0a1f44] sm:text-3xl">
          Built with institutions. Proven in operations.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#68718a]">
          E-Visitors helps teams make arrivals safer, movements clearer, and
          institutional records easier to trust.
        </p>
      </motion.div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={`${stat.label}-${index}`}
            initial={reveal}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: reducedMotion ? 0.01 : 0.4,
              delay: reducedMotion ? 0 : index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-xl border border-[#dbe8f1] bg-gradient-to-br from-[#f7fbfd] to-[#eaf5fa] p-4"
          >
            <div className="flex items-end gap-2">
              <strong className="font-exo text-3xl font-bold tracking-[-0.05em] text-[#0a1f44]">
                <ImpactCounter
                  value={stat.value}
                  count={stat.count}
                  suffix={stat.suffix}
                  reducedMotion={reducedMotion}
                />
              </strong>
              <span className="pb-1 text-xs font-black uppercase tracking-[0.14em] text-brand-secondary">
                {stat.label}
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-[#68718a]">
              {stat.detail}
            </p>
            <BorderBeam
              size={52}
              duration={7}
              delay={index * 1.2}
              initialOffset={index * 18}
              borderWidth={1}
              colorFrom="#09bce7"
              colorTo="#0a1f44"
              className="from-transparent via-brand-cyan to-transparent opacity-60"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function EVisitorsImpactSection({
  stats = defaultEVisitorsImpactStats,
  partners,
}: EVisitorsImpactSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const marqueePartners = partners ?? partnerBrands;
  const partnerRows = [marqueePartners, marqueePartners, marqueePartners];

  return (
    <section
      id="impact"
      className="relative z-20 -mt-8 border-b border-slate-200 bg-transparent px-6 pb-8 pt-0 sm:-mt-10 sm:px-10 sm:pb-10 lg:-mt-12 lg:px-16 lg:pb-12"
    >
      <div className="mx-auto max-w-7xl">
        <EVisitorsImpactCard
          stats={stats}
          reducedMotion={Boolean(prefersReducedMotion)}
        />

        <div className="mt-10">
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">
              Partners and clients
            </p>
            <h3 className="font-exo mt-1 text-xl font-bold tracking-[-0.04em] text-[#0a1f44]">
              A growing institutional footprint.
            </h3>
          </div>

          <div className="mt-4 space-y-1.5 overflow-hidden py-1">
            {partnerRows.map((row, rowIndex) => (
              <EVisitorsPartnerMarquee
                key={`partner-row-${rowIndex}`}
                partners={row}
                direction={rowIndex % 2 === 0 ? -1 : 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
