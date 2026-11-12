import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound, redirect } from "next/navigation";

import { PublicPage } from "@/components/public-page";
import { SanHubCatalog } from "@/components/san-hub-catalog";
import { SanHubLearnExperience } from "@/components/san-hub/san-hub-learn-experience";
import { SanHubSectionMenu } from "@/components/san-hub/san-hub-section-menu";
import { SanHubSectionReveal } from "@/components/san-hub/san-hub-section-reveal";
import { getSanHubExploreRoute, sanHubExploreRoutes, type SanHubExploreRouteId } from "@/lib/san-hub-explore-data";
import { getSanHubCatalogHref, resolveSanHubCatalogSlug, sanHubCatalogItems, sanHubProgramItems, type SanHubCatalogItem } from "@/lib/san-hub-catalog-data";
import { fetchPlatformCatalog, mapPlatformCatalogItem } from "@/lib/platform-courses";

export function generateStaticParams() {
  return sanHubExploreRoutes.map(({ id: route }) => ({ route }));
}

function RouteFocus({ route }: { route: NonNullable<ReturnType<typeof getSanHubExploreRoute>> }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
      <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-8">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">SAN HUB / {route.label}</p>
          <h2 className="font-exo mt-1.5 max-w-xl text-xl font-bold leading-[1.05] tracking-[-0.04em] text-[#0a1f44] sm:text-2xl">What this pathway includes</h2>
        </div>
        <p className="max-w-2xl text-xs leading-5 text-[#303755] sm:text-sm">{route.pageDescription}</p>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {route.focus.map((item, index) => (
          <div key={item} className="border border-slate-200 bg-[#fbfcfe] p-3">
            <span className="text-[10px] font-black tracking-[0.16em] text-brand-secondary">{String(index + 1).padStart(2, "0")}</span>
            <p className="mt-3 text-xs font-bold leading-4 text-[#0a1f44]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RouteNextStep({ route }: { route: NonNullable<ReturnType<typeof getSanHubExploreRoute>> }) {
  return (
    <section className="border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 bg-[#07152d] px-5 py-5 text-white sm:flex-row sm:items-center sm:px-7">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">Continue with SAN HUB</p>
          <h2 className="font-exo mt-1.5 text-lg font-bold tracking-[-0.035em] sm:text-xl">Ready to take the next step?</h2>
        </div>
        <Link href="/join-the-community?source=san-hub" className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-black text-[#07152d] transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152d]">
          Join SAN HUB <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default async function SanHubExploreRoutePage({ params }: { params: Promise<{ route: string }> }) {
  const { route: routeId } = await params;
  if (routeId === "learn") redirect("/san-hub/courses");

  const route = getSanHubExploreRoute(routeId);
  if (!route) notFound();

  // Fetch all catalog items from Strapi; fall back to hardcoded if empty
  const platformItems = await fetchPlatformCatalog();
  const allItems: readonly SanHubCatalogItem[] =
    platformItems.length > 0 ? platformItems.map(mapPlatformCatalogItem) : sanHubCatalogItems;
  const allPrograms: readonly SanHubCatalogItem[] =
    platformItems.length > 0
      ? allItems.filter((i) => i.category === "Programs")
      : sanHubProgramItems;

  // Build route-specific item lists dynamically from CMS data
  const routeItems: Record<SanHubExploreRouteId, readonly SanHubCatalogItem[]> = {
    learn: allItems.filter((i) => i.category === "Courses"),
    build: allItems.filter((i) => i.category === "Innovation programs"),
    innovate: allPrograms.filter((i) => ["innovation-accelerator", "research-development", "challenges-hackathons"].includes(i.id)),
    launch: [...allItems.filter((i) => i.id === "startup-product-studio"), ...allPrograms.filter((i) => i.id === "startup-development")],
    connect: allItems.filter((i) => i.category === "Events"),
    work: allItems.filter((i) => i.category === "Apprenticeships / Internships"),
    research: [...allItems.filter((i) => i.id === "innovation-internship"), ...allPrograms.filter((i) => i.id === "research-development")],
    commercialize: [...allItems.filter((i) => i.id === "startup-product-studio"), ...allPrograms.filter((i) => i.id === "startup-development")],
  };

  const courseItems = allItems.filter((i) => i.category === "Courses");
  const newLearningItems = allItems.filter((i) => i.category === "Upcoming training").slice(0, 3);
  const aiLearningItems = allItems.filter((i) => ["applied-ai-machine-learning", "build-with-ai", "ai-literacy-for-work"].includes(i.id));
  const items = routeItems[route.id];

  return (
    <PublicPage>
      <SanHubSectionMenu activeSection="explore" />
      {route.id === "learn" ? (
        <SanHubSectionReveal><SanHubLearnExperience popularItems={courseItems} newItems={newLearningItems} aiItems={aiLearningItems} searchItems={allItems} /></SanHubSectionReveal>
      ) : (
        <SanHubSectionReveal>
          <section className="mx-auto w-[calc(100%-2rem)] max-w-7xl border-b border-slate-200 bg-white sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)]">
            <RouteFocus route={route} />
            {items.length > 0 && <SanHubCatalog compact embedded items={items} showFilters={false} showCategoryFilter={false} withTopPadding={false} categories={[items[0].category]} />}
          </section>
        </SanHubSectionReveal>
      )}
      <SanHubSectionReveal><RouteNextStep route={route} /></SanHubSectionReveal>
    </PublicPage>
  );
}

