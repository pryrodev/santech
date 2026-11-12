import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Sparkles,
  Users,
} from "lucide-react";

import type {
  SanHubCatalogItem,
  SanHubCategory,
} from "@/lib/san-hub-catalog-data";

const categoryIcons: Record<SanHubCategory, typeof BookOpen> = {
  Courses: BookOpen,
  Programs: Sparkles,
  "Upcoming training": CalendarDays,
  "Innovation programs": Sparkles,
  "Apprenticeships / Internships": Users,
  "Upskilling programs": BookOpen,
  Events: CalendarDays,
};

export function SanHubCatalogCard({
  item,
  compact = false,
}: {
  item: SanHubCatalogItem;
  compact?: boolean;
}) {
  const Icon = categoryIcons[item.category];
  const isProgram = item.category === "Programs";

  return (
    <article
      className={`group flex ${isProgram || compact ? "" : "min-h-[380px]"} flex-col overflow-hidden rounde-md border border-slate-200/90 ${isProgram ? "bg-[#f7fafc]" : "bg-white"} shadow-[0_10px_24px_rgba(10,31,68,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-secondary/40 hover:shadow-[0_20px_42px_rgba(10,31,68,0.12)]`}
    >
      <Link
        href={item.href}
        className={`relative block ${isProgram ? (compact ? "h-32" : "h-40") : compact ? "h-32" : "h-36"} overflow-hidden bg-[#dceaf8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-inset`}
      >
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44]/75 via-[#0a1f44]/10 to-transparent" />
        {isProgram ? (
          <>
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#0a1f44] shadow-sm">
              SAN HUB / PROGRAM
            </span>
            <span className="absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-[#07152d]/80 text-[10px] font-black text-white">
              {String(
                item.id === "devbreak"
                  ? 1
                  : item.id === "capacity-building"
                    ? 2
                    : item.id === "research-development"
                      ? 3
                      : 4,
              ).padStart(2, "0")}
            </span>
          </>
        ) : (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#0a1f44] shadow-sm">
            {item.category}
          </span>
        )}
        {!isProgram && item.badge && (
          <span className="absolute bottom-4 left-4 rounded-full bg-brand-secondary px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white">
            {item.badge}
          </span>
        )}
      </Link>

      <div className={`flex flex-1 flex-col ${compact ? "p-3" : "p-4"}`}>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
          <span className="grid size-7 place-items-center rounded-lg bg-[#e6eef8] text-brand-secondary">
            <Icon className="size-3.5" aria-hidden="true" />
          </span>
          <span>{item.provider}</span>
        </div>
        <Link
          href={item.href}
          className="mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
        >
          <h3
            className={`font-exo font-bold leading-tight tracking-[-0.02em] text-[#0a1f44] transition-colors group-hover:text-brand-secondary ${compact ? "text-[15px]" : "text-base"}`}
          >
            {item.title}
          </h3>
        </Link>
        <p
          title={isProgram ? item.description : undefined}
          className={`mt-2 ${isProgram || compact ? "line-clamp-2" : "line-clamp-3"} ${compact ? "text-xs leading-4.5" : "text-[13px] leading-5"} text-slate-600`}
        >
          {item.description}
        </p>
        {!isProgram && (
          <div className="mt-auto grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <span>
              <strong className="block font-black uppercase tracking-[0.1em] text-slate-400">
                Format
              </strong>
              <span className="mt-1 block font-semibold text-slate-700">
                {item.format}
              </span>
            </span>
            <span>
              <strong className="block font-black uppercase tracking-[0.1em] text-slate-400">
                Level
              </strong>
              <span className="mt-1 block font-semibold text-slate-700">
                {item.level}
              </span>
            </span>
          </div>
        )}
        {isProgram ? (
          <div className={`${compact ? "mt-3" : "mt-5"} flex w-full`}>
            <Link
              href={item.href}
              className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-[#0a1f44] px-3 py-2 text-[10px] font-black uppercase tracking-[0.08em] text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
            >
              Explore more{" "}
              <ArrowUpRight
                className="size-3 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-between gap-3 text-xs font-bold text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-3.5 text-brand-secondary" />
              {item.duration}
            </span>
            <div className="flex items-center gap-3">
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
              >
                Explore{" "}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              {item.category === "Courses" && (
                <Link
                  href={`/join-the-community?course=${encodeURIComponent(item.title)}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#0a1f44] px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
                >
                  Apply <ArrowUpRight className="size-3" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
