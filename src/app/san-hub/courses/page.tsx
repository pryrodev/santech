import { PublicPage } from "@/components/public-page";
import { SanHubCourseCatalog } from "@/components/san-hub/san-hub-course-catalog";
import { SanHubSectionMenu } from "@/components/san-hub/san-hub-section-menu";
import { fetchPlatformCatalog, mapPlatformCatalogItem } from "@/lib/platform-courses";
import { sanHubCatalogItems, sanHubCourseCategories, type SanHubCatalogItem } from "@/lib/san-hub-catalog-data";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() { return createPageMetadata({ title: "SAN HUB Courses", description: "Build practical technology skills through SAN HUB courses and project-based learning.", path: "/san-hub/courses" }); }

export default async function SanHubCoursesPage() {
  const platformItems = await fetchPlatformCatalog("Courses");
  const courseItems: readonly SanHubCatalogItem[] = platformItems.length > 0 ? platformItems.map(mapPlatformCatalogItem) : sanHubCatalogItems.filter((item) => item.category === "Courses");
  const categories = platformItems.length > 0 ? [...new Set(platformItems.map((item) => item.courseCategory?.name).filter((name): name is string => Boolean(name)))] : sanHubCourseCategories;
  return <PublicPage><SanHubSectionMenu activeSection="courses" /><SanHubCourseCatalog items={courseItems} categories={categories} /></PublicPage>;
}



