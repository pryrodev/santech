"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  Compass,
  Rocket,
  Shuffle,
  TrendingUp,
} from "lucide-react";
import type { SanHubCatalogItem } from "@/lib/san-hub-catalog-data";
import { useUiCopy } from "@/lib/use-ui-copy";

const learningGoals = [
  { label: "Change my career", href: "/san-hub/courses", Icon: Shuffle },
  {
    label: "Grow in my current role",
    href: "/san-hub/explore/build",
    Icon: TrendingUp,
  },
  {
    label: "Explore technology beyond my work",
    href: "/san-hub/explore/research",
    Icon: Compass,
  },
] as const;

function LearningCard({ item }: { item: SanHubCatalogItem }) {
  return (
    <Link
      href={item.href}
      className="group flex min-h-[78px] w-full min-w-0 gap-3 rounded-xl bg-white p-2.5 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(7,21,45,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1]"
    >
      <div className="relative size-[62px] shrink-0 overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="62px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className="truncate text-[11px] text-[#526989]">{item.provider}</p>
        <p className="mt-0.5 line-clamp-2 text-[13px] font-bold leading-4 text-[#07152d] group-hover:text-[#0875d1]">
          {item.title}
        </p>
        <p className="mt-1 flex items-center gap-1.5 truncate text-[10px] text-[#526989]">
          <Clock3 className="size-3" aria-hidden="true" /> {item.format}{" "}
          <span aria-hidden="true">·</span> {item.duration}
        </p>
      </div>
    </Link>
  );
}

function LearningColumn({
  title,
  items,
}: {
  title: string;
  items: readonly SanHubCatalogItem[];
}) {
  return (
    <section className="min-w-0 rounde-md bg-[#e8f1fc] p-3.5 sm:p-4">
      <div className="flex items-center justify-between gap-3 px-1 pb-3">
        <h3 className="font-exo text-base font-bold tracking-[-0.025em] text-[#07152d]">
          {title}
        </h3>
        <ArrowUpRight className="size-4 text-[#526989]" aria-hidden="true" />
      </div>
      <div className="grid gap-2.5">
        {items.length > 0 ? (
          items.map((item) => <LearningCard key={item.id} item={item} />)
        ) : (
          <div className="grid min-h-[92px] place-items-center rounded-xl border border-dashed border-[#b8c9df] bg-white/65 px-4 py-4 text-center">
            <span className="grid size-8 place-items-center rounded-full bg-[#e8f1fc] text-[#526989]">
              <BookOpen className="size-4" aria-hidden="true" />
            </span>
            <p className="mt-2 text-xs font-bold text-[#07152d]">
              Nothing here yet
            </p>
            <p className="mt-0.5 text-[10px] text-[#526989]">
              New learning options will appear soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export function SanHubAboutLearning({
  items = [],
}: {
  items?: readonly SanHubCatalogItem[];
}) {
  const t = useUiCopy();
  const popularItems = items
    .filter((item) => item.category === "Courses")
    .slice(0, 3);
  const newItems = items
    .filter((item) => item.category === "Upcoming training")
    .slice(0, 2);
  const aiItems = items.filter((item) =>
    [
      "applied-ai-machine-learning",
      "build-with-ai",
      "ai-literacy-for-work",
    ].includes(item.id),
  );
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
            SAN HUB / Learning
          </p>
          <h2 className="font-exo mt-1.5 text-2xl font-bold tracking-[-0.045em] text-[#07152d] sm:text-3xl">
            New and popular
          </h2>
        </div>
        <Link
          href="/san-hub?section=programs"
          className="hidden items-center gap-1 text-sm font-bold text-[#526989] transition-colors hover:text-[#0875d1] sm:inline-flex"
        >
          View all SAN HUB programs{" "}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <LearningColumn title="Most popular" items={popularItems} />
        <LearningColumn title="Hot new releases" items={newItems} />
        <LearningColumn title="Trending AI learning" items={aiItems} />
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-[1.45rem] bg-[#edf4fd] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-7">
        <h2 className="shrink-0 font-exo text-lg font-bold tracking-[-0.035em] text-[#07152d] sm:text-xl">
          What brings you to SAN HUB today?
        </h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:flex lg:flex-1 lg:justify-end">
          {learningGoals.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              className="group inline-flex min-h-12 items-center gap-3 rounded-xl border border-[#b8c9df] bg-white px-2.5 py-2 text-xs font-bold text-[#07152d] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#0875d1] hover:shadow-[0_8px_18px_rgba(7,21,45,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1]"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#0875d1] text-white transition-colors group-hover:bg-[#075ca5]">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="leading-4">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
