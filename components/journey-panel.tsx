"use client";

import { StoryTimeline, type StoryTimelineItem } from "./ui/story-timeline";

export type JourneyMilestone = StoryTimelineItem;

export const JOURNEY_MILESTONES: readonly JourneyMilestone[] = [
  { id: "2018-idea", year: "2018", title: "Idea", description: "Founders identify problems with manual visitor management.", image: "/images/2018.jpeg", imageAlt: "SAN TECH team at a technology and innovation event" },
  { id: "2019-inception-validation", year: "2019", title: "Inception & validation", description: "SAN TECH founded, the E-Visitors prototype and IP journey begins, and the product is recognized through NIRDA Innovate for Industry.", image: "/images/2019.jpeg", imageAlt: "SAN TECH team at a technology event" },
  { id: "2020-testing", year: "2020", title: "Testing", description: "Prototype moves toward real users and institutional applications.", image: "/images/2020.jpg", imageAlt: "SAN TECH E-Visitors testing environment" },
  { id: "2021-resilience", year: "2021", title: "Institutionalization", description: "Technology supports institutional resilience and digital processes.", image: "/images/2021.jpeg", imageAlt: "Technology being used in a community setting" },
  { id: "2022-ecosystem", year: "2022", title: "Ecosystem", description: "Recognition and emergence of SAN HUB.", image: "/images/2022.jpeg", imageAlt: "SAN HUB graduates celebrating together" },
  { id: "2023-market", year: "2023", title: "Market validation", description: "SAN HUB officially launched; E-Visitors adopted by National Bank of Rwanda (BNR).", image: "/images/2023.jpg", imageAlt: "SAN TECH team members in Kigali" },
  { id: "2024-partnerships", year: "2024", title: "Partnerships", description: "International partnerships and innovators from multiple countries.", image: "/images/2024.jpeg", imageAlt: "Technology partners gathered in Rwanda" },
  { id: "2025-scaling", year: "2025", title: "Scaling", description: "SAN HUB expands; international and continental ambitions grow.", image: "/images/2025.jpeg", imageAlt: "Learners and innovators at a SAN HUB program" },
  { id: "2026-vision", year: "2026", title: "Best Exhibitor & African Tech Vision", description: "SAN TECH recognized as Best Exhibitor in ICT & Innovation at Expo 2026", image: "/images/2026.jpeg", imageAlt: "SAN TECH leadership and partners holding the Best Exhibitor in ICT & Innovation award on stage at Expo 2026 and Tech Forward Live" },
];

export function JourneyPanel({ cmsStages }: { cmsStages?: import("@/lib/strapi").JourneyStage[] }) {
  const items: readonly JourneyMilestone[] =
    cmsStages && cmsStages.length > 0
      ? cmsStages.map((s) => {
          const fallback = JOURNEY_MILESTONES.find((m) => m.year === s.year);
          return {
            id: `${s.year}-${s.stage.toLowerCase().replace(/\s+/g, "-")}`,
            year: s.year,
            title: s.stage,
            description: s.description,
            image: s.image || fallback?.image || "/images/summit.jpeg",
            imageAlt: s.imageAlt || fallback?.imageAlt || `SAN TECH ${s.stage} milestone`,
          };
        })
      : JOURNEY_MILESTONES;

  return <StoryTimeline items={items} ariaLabel="SAN TECH journey timeline" />;
}
