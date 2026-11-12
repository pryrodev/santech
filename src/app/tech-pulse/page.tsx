import { PublicPage } from "@/components/public-page";
import { TechPulseContent } from "@/components/tech-pulse-content";
import { fetchTechPulseArticles, fetchOpportunities } from "@/lib/strapi";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Tech Pulse",
    description: "News, announcements, opportunities, research, and stories from the SAN TECH ecosystem.",
    path: "/tech-pulse",
  });
}

const pulseMenu = [
  { key: "news", label: "News", href: "/tech-pulse" },
  { key: "trends", label: "Trends", href: "/tech-pulse?type=trends" },
  { key: "announcements", label: "Announcements", href: "/tech-pulse?type=announcements" },
  { key: "opportunities", label: "Opportunities", href: "/tech-pulse?type=opportunities" },
  { key: "research", label: "Research & impact", href: "/tech-pulse?type=research" },
] as const;

export default async function TechPulsePage() {
  const [articles, cmsOpportunities] = await Promise.all([
    fetchTechPulseArticles(),
    fetchOpportunities(),
  ]);

  return (
    <PublicPage>
      <TechPulseContent pulseMenu={pulseMenu} articles={articles} cmsOpportunities={cmsOpportunities} />
    </PublicPage>
  );
}
