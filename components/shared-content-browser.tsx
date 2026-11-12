"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LeadershipBrowser } from "@/components/leadership-browser";
import { SplitFeaturePanel, type CoreFeature, type SplitFeatureFact, type SplitFeatureMedia, type SplitFeatureTimelineItem } from "@/components/split-feature-panel";
import { CertificatePanel, CompanyProfilePanel, FocusPanel, IdentityPanel, MissionPanel, RecognitionPanel, StandardsPanel } from "@/components/legacy-sections";

export type SharedContentItem = {
  id: string;
  label: string;
  title: string;
  description?: string;
  details?: string[];
  facts?: SplitFeatureFact[];
  timeline?: SplitFeatureTimelineItem[];
  coreFeatures?: CoreFeature[];
  media?: SplitFeatureMedia;
  content?: "leadership" | "identity" | "mission" | "focus" | "profile" | "journey" | "recognition" | "certificate" | "standards";
};

import type { Recognition as CmsRecognition, TeamMember as CmsTeamMember, JourneyStage as CmsJourneyStage, CompanyValue as CmsCompanyValue, FocusArea as CmsAreaType, Standard as CmsStandard, LegacyContent as CmsLegacyContent, Certificate as CmsCertificate } from "@/lib/strapi";
import { JourneyPanel } from "@/components/journey-panel";

export function SharedContentBrowser({
  items,
  initialItemId,
  initialLeadershipView = "executive",
  syncUrl = false,
  showSidebar = true,
  combinedPanel = false,
  cmsRecognitions,
  cmsTeamMembers,
  cmsJourneyStages,
  cmsCompanyValues,
  cmsFocusAreas,
  cmsStandards,
  cmsLegacyContent,
  cmsCertificates,
}: {
  items: readonly SharedContentItem[];
  initialItemId?: string;
  initialLeadershipView?: "executive" | "team" | "organization";
  syncUrl?: boolean;
  showSidebar?: boolean;
  combinedPanel?: boolean;
  cmsRecognitions?: CmsRecognition[];
  cmsTeamMembers?: CmsTeamMember[];
  cmsJourneyStages?: CmsJourneyStage[];
  cmsCompanyValues?: CmsCompanyValue[];
  cmsFocusAreas?: CmsAreaType[];
  cmsStandards?: CmsStandard[];
  cmsLegacyContent?: CmsLegacyContent | null;
  cmsCertificates?: CmsCertificate[];
}) {
  const [firstItem] = items;
  const [selectedId, setSelectedId] = useState(initialItemId ?? firstItem.id);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = items.find((item) => item.id === selectedId) ?? firstItem;
  const prefersReducedMotion = useReducedMotion();
  const timeline = selected.timeline ?? (selected.id === "journey" ? selected.details?.flatMap((detail) => {
    const match = detail.match(/^(\d{4}(?:\D+?\d{4})?)\s+\D+?\s+(.+)$/);
    return match ? [{ year: match[1], description: match[2] }] : [];
  }) : undefined);

  useEffect(() => {
    setSelectedId(initialItemId ?? firstItem.id);
  }, [firstItem.id, initialItemId]);

  function selectItem(id: string) {
    setSelectedId(id);
    if (!syncUrl) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("section", id);
    if (id !== "leadership") params.delete("view");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className={showSidebar ? "grid gap-8 min-[1020px]:grid-cols-[185px_minmax(0,1fr)] min-[1020px]:items-start min-[1020px]:gap-7" : "block"}>
      {showSidebar && <aside className="min-[1020px]:self-start">
        <div className="border-l border-slate-300 pl-4">
          {items.map((item, index) => {
            const active = item.id === selected.id;
            return (
              <button key={item.id} type="button" onClick={() => selectItem(item.id)} aria-pressed={active} className={`group flex w-full items-center gap-3 py-2.5 text-left transition-colors ${active ? "text-[#0a1f44]" : "text-slate-500 hover:text-brand-secondary"}`}>
                <span className={`w-5 shrink-0 text-[10px] font-black tracking-[0.12em] ${active ? "text-brand-secondary" : "text-slate-400 group-hover:text-brand-secondary"}`}>{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1 text-base font-bold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>}

      <AnimatePresence mode="wait">
        <motion.div key={selected.id} initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: "easeOut" }}>
          {selected.content === "leadership" ? <LeadershipBrowser key={initialLeadershipView} initialView={initialLeadershipView} members={cmsTeamMembers && cmsTeamMembers.length > 0 ? cmsTeamMembers.map((m) => ({ name: m.name, position: m.position, department: m.department ?? "", expertise: m.expertise ?? "", bio: m.bio ?? "", image: m.photo, profile: m.linkedIn ?? "https://www.linkedin.com/company/santechinnovate" })) : undefined} /> : selected.content === "identity" ? <IdentityPanel cmsContent={cmsLegacyContent} /> : selected.content === "mission" ? <MissionPanel cmsValues={cmsCompanyValues} cmsContent={cmsLegacyContent} /> : selected.content === "focus" ? <FocusPanel cmsAreas={cmsFocusAreas} /> : selected.content === "profile" ? <CompanyProfilePanel cmsContent={cmsLegacyContent} /> : selected.content === "journey" ? <JourneyPanel cmsStages={cmsJourneyStages} /> : selected.content === "recognition" ? <RecognitionPanel items={cmsRecognitions && cmsRecognitions.length > 0 ? cmsRecognitions.map((r) => ({ year: r.year, title: r.title, description: r.description, image: r.image || undefined, imageAlt: r.imageAlt || undefined, badge: r.badge || undefined })) : undefined} /> : selected.content === "certificate" ? <CertificatePanel cmsItems={cmsCertificates} /> : selected.content === "standards" ? <StandardsPanel cmsItems={cmsStandards} /> : <SplitFeaturePanel title={selected.title} description={selected.description} details={timeline ? [] : selected.details} facts={selected.facts} timeline={timeline} coreFeatures={selected.coreFeatures} media={selected.media} combined={combinedPanel} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
