"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { StickyPageMenu, type StickyPageMenuItem } from "@/components/sticky-page-menu";
import { DrivingChangeSliderBrowser } from "@/components/driving-change-slider-browser";
import type { DrivingChangeStory, DrivingChangeSection } from "@/lib/driving-change-data";

interface DrivingChangeContentProps {
  changeMenu: readonly StickyPageMenuItem[];
  stories: DrivingChangeStory[];
  sections?: DrivingChangeSection[];
}

function DrivingChangeContentInner({ changeMenu, stories, sections }: DrivingChangeContentProps) {
  const searchParams = useSearchParams();
  const rawKey = searchParams.get("type") || searchParams.get("view") || "impact";
  const activeSection: "impact" | "career" = rawKey === "career" ? "career" : "impact";

  return (
    <>
      <StickyPageMenu
        items={changeMenu}
        activeKey={activeSection}
        ariaLabel="Driving Change sections"
        translationKey="change"
      />
      <section className="border-t border-slate-200 px-3 pb-8 pt-2 sm:px-8 lg:px-12 lg:pb-10 lg:pt-3">
        <div className="mx-auto max-w-[1600px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-7 shadow-xs">
          <DrivingChangeSliderBrowser key={activeSection} sectionKey={activeSection} stories={stories} sections={sections} />
        </div>
      </section>
    </>
  );
}

export function DrivingChangeContent(props: DrivingChangeContentProps) {
  return (
    <Suspense fallback={
      <>
        <StickyPageMenu
          items={props.changeMenu}
          activeKey="impact"
          ariaLabel="Driving Change sections"
          translationKey="change"
        />
        <section className="border-t border-slate-200 px-3 pb-8 pt-2 sm:px-8 lg:px-12 lg:pb-10 lg:pt-3">
          <div className="mx-auto max-w-[1600px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-7 shadow-xs min-h-[400px]" />
        </section>
      </>
    }>
      <DrivingChangeContentInner {...props} />
    </Suspense>
  );
}
