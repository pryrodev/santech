import { PublicPage } from "@/components/public-page";
import { DrivingChangeContent } from "@/components/driving-change-content";
import { fetchDrivingChangeStories, fetchDrivingChangeTopics, mapDrivingChangeTopicsToSections } from "@/lib/strapi";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Driving Change",
    description: "Explore SAN TECH stories of impact, practical learning, and career outreach across the ecosystem.",
    path: "/driving-change",
  });
}

const changeMenu = [
  { key: "impact", label: "Impact in action", href: "/driving-change?type=impact" },
  { key: "career", label: "Career outreach", href: "/driving-change?type=career" },
] as const;

export default async function DrivingChangePage() {
  const [stories, topics] = await Promise.all([
    fetchDrivingChangeStories(),
    fetchDrivingChangeTopics(),
  ]);
  const sections = topics.length > 0 ? mapDrivingChangeTopicsToSections(topics) : undefined;

  return (
    <PublicPage>
      <DrivingChangeContent changeMenu={changeMenu} stories={stories} sections={sections} />
    </PublicPage>
  );
}
