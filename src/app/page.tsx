import { SantechHomeStage } from "@/components/santech-home-stage";
import { SiteHeader } from "@/components/site-header";
import { CircuitBackground } from "@/components/ui/circuit-background";
import { fetchSiteStats, fetchPartnerBrands, fetchHomeStorySlides, fetchSiteSettings } from "@/lib/strapi";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Technology. Innovation. Impact.",
    description: "SAN TECH builds technology, skills, and innovation systems for a more connected Africa.",
    path: "/",
  });
}

// Hardcoded fallbacks — used when Strapi is empty or unreachable
const FALLBACK_STATS: [number, string, string][] = [
  [40, "+", "organizations & clients served"],
  [2500, "+", "SAN HUB beneficiaries"],
  [17, "+", "countries reached"],
  [15, "+", "technology professionals"],
  [54, "+", "startup / innovation projects"],
  [700, "+", "jobs & opportunities influenced"],
  [10, "+", "years combined leadership experience"],
];

export default async function HomePage() {
  const [cmsStats, cmsPartners, cmsSlides, siteSettings] = await Promise.all([
    fetchSiteStats(),
    fetchPartnerBrands(),
    fetchHomeStorySlides(),
      fetchSiteSettings(),
  ]);

  // Map CMS stats to the [value, suffix, label] tuple the component expects
  const stats: [number, string, string][] =
    cmsStats.length > 0
      ? cmsStats.map((s) => [s.value, s.suffix, s.label])
      : FALLBACK_STATS;

  // Map CMS partners to the PartnerBrand shape the component expects
  const partners =
    cmsPartners.length > 0
      ? cmsPartners.map((p) => ({
          label: p.label,
          src: p.logo,
          href: p.href ?? undefined,
          showLabel: p.showLabel,
          displayLabel: p.displayLabel ?? undefined,
          government: p.isGovernment,
        }))
      : undefined;

  // Map CMS slides to StorySlide shape — falls back to hardcoded if Strapi empty
  const slides =
    cmsSlides.length > 0
      ? cmsSlides.map((s) => ({
          id: s.slideId,
          index: s.index,
          eyebrow: s.eyebrow,
          title: s.title ?? undefined,
          body: s.body,
          detail: s.detail ?? "",
          additional: s.additional ?? undefined,
          note: s.note ?? undefined,
          variant: s.variant === "services" ? ("services" as const) : undefined,
          facts: s.facts ?? [],
          flow: s.flow ?? undefined,
          groups: s.groups ?? undefined,
          items: s.items ?? undefined,
        }))
      : undefined; // undefined = component uses its own hardcoded storySlides default

  return (
    <CircuitBackground as="main" className="home-viewport min-h-svh overflow-x-hidden pt-[112px] text-slate-900">
      <SiteHeader landing />
      <SantechHomeStage stats={stats} partners={partners} slides={slides} videoSrc={siteSettings?.homepageVideo} videoPoster={siteSettings?.homepageVideoPoster} />
    </CircuitBackground>
  );
}




