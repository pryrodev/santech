import { PublicPage } from "@/components/public-page";
import { JoinCommunityContent } from "@/components/join-community-content";
import { fetchTraineeAwards } from "@/lib/strapi";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Join the SAN HUB Community",
    description: "Learn, contribute, find mentorship, and build the experience needed to create useful technology.",
    path: "/join-the-community",
  });
}

export default async function JoinTheCommunityRoute() {
  const awards = await fetchTraineeAwards();

  return (
    <PublicPage>
      <JoinCommunityContent awards={awards} />
    </PublicPage>
  );
}
