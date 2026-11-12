"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SanHubCatalog } from "@/components/san-hub-catalog";
import { SanHubAboutSection } from "@/components/san-hub/san-hub-about-section";
import { SanHubDigitalLibrary, type LibraryBook } from "@/components/san-hub/san-hub-digital-library";
import { SanHubExploreSection } from "@/components/san-hub/san-hub-explore-section";
import { SanHubImpactSection } from "@/components/san-hub/san-hub-impact-section";
import { SanHubInsightsSection } from "@/components/san-hub/san-hub-insights-section";
import { SanHubSectionMenu, type SanHubSectionId } from "@/components/san-hub/san-hub-section-menu";
import { SanHubSectionReveal } from "@/components/san-hub/san-hub-section-reveal";
import { SanHubTractionSection } from "@/components/san-hub/san-hub-traction-section";
import { SanHubTestimonialSection } from "@/components/san-hub/san-hub-testimonial-section";
import type { SanHubCatalogItem } from "@/lib/san-hub-catalog-data";
import { sanHubProgramItems } from "@/lib/san-hub-catalog-data";
import type { Testimonial } from "@/lib/strapi";

interface SanHubContentProps {
  catalogItems: readonly SanHubCatalogItem[];
  programItems: readonly SanHubCatalogItem[];
  libraryBooks: readonly LibraryBook[];
  cmsTestimonials: Testimonial[];
}

function resolveSection(value: string | null | undefined): SanHubSectionId {
  return value === "explore" || value === "impact" || value === "programs" || value === "traction" || value === "insights" || value === "library" || value === "testimonials" ? value : "about";
}

function SanHubContentInner({
  catalogItems,
  programItems,
  libraryBooks,
  cmsTestimonials,
}: SanHubContentProps) {
  const searchParams = useSearchParams();
  const section = resolveSection(searchParams.get("section"));

  return (
    <>
      <SanHubSectionMenu activeSection={section} />

      {section === "about" && <SanHubSectionReveal><SanHubAboutSection items={catalogItems} /></SanHubSectionReveal>}

      {section === "explore" && <SanHubSectionReveal><SanHubExploreSection /></SanHubSectionReveal>}

      {section === "impact" && <SanHubSectionReveal><SanHubImpactSection /></SanHubSectionReveal>}

      {section === "programs" && <SanHubSectionReveal><SanHubCatalog compact items={programItems.length > 0 ? programItems : sanHubProgramItems} showFilters={false} showCategoryFilter={false} showResultSummary={false} withTopPadding categories={["Programs"]} /></SanHubSectionReveal>}

      {section === "traction" && <SanHubSectionReveal><SanHubTractionSection /></SanHubSectionReveal>}

      {section === "insights" && <SanHubSectionReveal><SanHubInsightsSection /></SanHubSectionReveal>}

      {section === "library" && <SanHubSectionReveal><SanHubDigitalLibrary books={libraryBooks.length > 0 ? libraryBooks : undefined} /></SanHubSectionReveal>}
      {section === "testimonials" && <SanHubSectionReveal><SanHubTestimonialSection items={cmsTestimonials} /></SanHubSectionReveal>}
    </>
  );
}

export function SanHubContent(props: SanHubContentProps) {
  return (
    <Suspense fallback={
      <>
        <SanHubSectionMenu activeSection="about" />
        <div className="min-h-[400px]" />
      </>
    }>
      <SanHubContentInner {...props} />
    </Suspense>
  );
}
