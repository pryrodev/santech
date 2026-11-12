import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SanHubCatalogCard } from "@/components/san-hub/san-hub-course-card";
import { sanHubCatalogItems } from "@/lib/san-hub-catalog-data";

type FeaturedRailProps = {
  items?: typeof sanHubCatalogItems;
  eyebrow?: string;
  title?: string;
  description?: string;
  compact?: boolean;
};

export function SanHubFeaturedRail({
  items = sanHubCatalogItems.filter((item) => item.category === "Courses"),
  eyebrow = "Start with a pathway",
  title = "Featured learning for useful work.",
  description = "Choose a focused route, build something real, and keep your next step close.",
  compact = false,
}: FeaturedRailProps) {
  return (
    <section
      id="san-hub-programs"
      className={`san-hub-graphic-section scroll-mt-40 px-4 sm:px-6 lg:px-8 ${compact ? "py-7 lg:py-9" : "py-16 lg:py-20"}`}
    >
      <div
        className={`mx-auto max-w-7xl rounde-md bg-white ${compact ? "px-4 py-6 sm:px-6 sm:py-7 lg:px-8" : "px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"}`}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
              {eyebrow}
            </p>
            <h2
              className={`font-exo mt-2 font-bold leading-tight tracking-[-0.045em] text-[#0a1f44] ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}
            >
              {title}
            </h2>
            <p
              className={`mt-2 max-w-2xl text-slate-600 ${compact ? "text-sm leading-6" : "text-base leading-7"}`}
            >
              {description}
            </p>
          </div>
          <Link
            href="#san-hub-catalog"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-secondary underline-offset-4 hover:text-[#0a1f44] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
          >
            View all SAN HUB programs{" "}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div
          className={`${compact ? "mt-5 gap-3" : "mt-9 gap-5"} grid lg:grid-cols-3`}
        >
          {items.slice(0, 3).map((item) => (
            <SanHubCatalogCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
