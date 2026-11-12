"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  SharedContentBrowser,
  type SharedContentItem,
} from "@/components/shared-content-browser";
import {
  StickyPageMenu,
  type StickyPageMenuItem,
} from "@/components/sticky-page-menu";
import { BorderBeam } from "@/components/ui/border-beam";
import type {
  Recognition as CmsRecognition,
  TeamMember as CmsTeamMember,
  JourneyStage as CmsJourneyStage,
  CompanyValue as CmsCompanyValue,
  FocusArea as CmsAreaType,
  Standard as CmsStandard,
  LegacyContent as CmsLegacyContent,
  Certificate as CmsCertificate,
} from "@/lib/strapi";

interface OurLegacyContentProps {
  legacyMenu: readonly StickyPageMenuItem[];
  legacyItems: readonly SharedContentItem[];
  cmsRecognitions: CmsRecognition[];
  cmsTeamMembers: CmsTeamMember[];
  cmsJourneyStages: CmsJourneyStage[];
  cmsCompanyValues: CmsCompanyValue[];
  cmsFocusAreas: CmsAreaType[];
  cmsStandards: CmsStandard[];
  cmsCertificates: CmsCertificate[];
  cmsLegacyContent: CmsLegacyContent | null;
}

function OurLegacyContentInner({
  legacyMenu,
  legacyItems,
  cmsRecognitions,
  cmsTeamMembers,
  cmsJourneyStages,
  cmsCompanyValues,
  cmsFocusAreas,
  cmsStandards,
  cmsCertificates,
  cmsLegacyContent,
}: OurLegacyContentProps) {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section") ?? undefined;
  const viewParam = searchParams.get("view") ?? undefined;

  const selectedSection =
    legacyMenu.find((item) => item.key === sectionParam)?.key ?? "who-we-are";
  const leadershipView =
    viewParam === "organization"
      ? "organization"
      : viewParam === "team"
        ? "team"
        : "executive";
  const isLeadership = selectedSection === "leadership";

  return (
    <>
      <StickyPageMenu
        items={legacyMenu}
        activeKey={selectedSection}
        ariaLabel="Our Legacy sections"
        translationKey="legacy"
      />
      <section
        className={`border-t border-slate-200 px-6 pb-5 pt-2 sm:px-10 ${isLeadership ? "lg:px-16 lg:pb-5 lg:pt-4" : "min-[1020px]:px-12 min-[1020px]:pb-3 min-[1020px]:pt-2"}`}
      >
        <div
          className={`relative mx-auto max-w-7xl overflow-hidden rounde-md bg-white px-5 py-8 sm:px-8 sm:py-10 ${isLeadership ? "lg:px-10 lg:py-12" : "min-[1020px]:px-8 min-[1020px]:py-6"}`}
        >
          <div className="relative z-10">
            <SharedContentBrowser
              items={legacyItems}
              initialItemId={selectedSection}
              initialLeadershipView={leadershipView}
              syncUrl
              cmsRecognitions={cmsRecognitions}
              cmsTeamMembers={cmsTeamMembers}
              cmsJourneyStages={cmsJourneyStages}
              cmsCompanyValues={cmsCompanyValues}
              cmsFocusAreas={cmsFocusAreas}
              cmsStandards={cmsStandards}
              cmsCertificates={cmsCertificates}
              cmsLegacyContent={cmsLegacyContent}
            />
          </div>
          <BorderBeam
            size={120}
            duration={8}
            initialOffset={12}
            borderWidth={1.5}
            colorFrom="#09bce7"
            colorTo="#0a1f44"
            className="from-transparent via-brand-cyan to-transparent opacity-75"
          />
          <BorderBeam
            size={120}
            duration={8}
            delay={4}
            initialOffset={62}
            borderWidth={1}
            colorFrom="#0a1f44"
            colorTo="#4d8dff"
            className="from-transparent via-[#4d8dff] to-transparent opacity-60"
          />
        </div>
      </section>
    </>
  );
}

export function OurLegacyContent(props: OurLegacyContentProps) {
  return (
    <Suspense
      fallback={
        <>
          <StickyPageMenu
            items={props.legacyMenu}
            activeKey="who-we-are"
            ariaLabel="Our Legacy sections"
            translationKey="legacy"
          />
          <section className="border-t border-slate-200 px-6 pb-5 pt-2 sm:px-10 min-[1020px]:px-12 min-[1020px]:pb-3 min-[1020px]:pt-2">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounde-md bg-white px-5 py-8 sm:px-8 sm:py-10 min-[1020px]:px-8 min-[1020px]:py-6 min-h-[400px]" />
          </section>
        </>
      }
    >
      <OurLegacyContentInner {...props} />
    </Suspense>
  );
}
