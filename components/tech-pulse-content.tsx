"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { StickyPageMenu, type StickyPageMenuItem } from "@/components/sticky-page-menu";
import { TechPulseSliderBrowser } from "@/components/tech-pulse-slider-browser";
import { TechPulseOpportunities } from "@/components/tech-pulse-opportunities";
import type { CmsArticle, Opportunity } from "@/lib/strapi";

interface TechPulseContentProps {
  pulseMenu: readonly StickyPageMenuItem[];
  articles: CmsArticle[];
  cmsOpportunities: Opportunity[];
}

function TechPulseContentInner({ pulseMenu, articles, cmsOpportunities }: TechPulseContentProps) {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const isOpportunities = typeParam === "opportunities";
  const activeMenu = typeParam || "news";
  const initialCategory = typeParam === "research" ? "impact" : typeParam || "news";

  return (
    <>
      <StickyPageMenu items={pulseMenu} activeKey={activeMenu} ariaLabel="Tech Pulse sections" translationKey="pulse" />
      <section className="border-t border-slate-200 px-3 pb-8 pt-2 sm:px-8 lg:px-12 lg:pb-10 lg:pt-3">
        <div className="mx-auto max-w-[1600px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-7 shadow-xs">
          {isOpportunities ? (
            <TechPulseOpportunities cmsOpportunities={cmsOpportunities} />
          ) : (
            <TechPulseSliderBrowser
              key={initialCategory}
              initialCategory={initialCategory}
              articles={articles}
            />
          )}
        </div>
      </section>
    </>
  );
}

export function TechPulseContent(props: TechPulseContentProps) {
  return (
    <Suspense fallback={
      <>
        <StickyPageMenu items={props.pulseMenu} activeKey="news" ariaLabel="Tech Pulse sections" translationKey="pulse" />
        <section className="border-t border-slate-200 px-3 pb-8 pt-2 sm:px-8 lg:px-12 lg:pb-10 lg:pt-3">
          <div className="mx-auto max-w-[1600px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-7 shadow-xs min-h-[400px]" />
        </section>
      </>
    }>
      <TechPulseContentInner {...props} />
    </Suspense>
  );
}
