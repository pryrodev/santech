import { getSanHubCatalogHref, sanHubCategories, type SanHubCatalogItem } from "./san-hub-catalog-data";

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL?.replace(/\/$/, "");

export type PlatformCatalogItem = {
  id: string; title: string; slug: string; category: string; relatedCourses?: Array<{ sortOrder: number; id: string; slug: string; title: string; summary: string | null; level: string | null; durationWeeks: number | null; status: string; catalogItem: { title: string; slug: string; imageAsset: { url: string; alternativeText: string | null } | null } | null }>; description: string | null; provider: string | null; format: string | null; level: string | null; badge: string | null; durationLabel: string | null; imageAsset: { url: string; alternativeText: string | null } | null; courseCategory: { name: string; slug: string } | null; course: { id: string; slug: string } | null;
  subtitle: string | null;
  instructorLabel: string | null;
  presentation?: {
    stats: Array<{ label: string; value: string; detail: string }>;
    learningOutcomes: Array<{ value: string }>;
    details: Array<{ title: string; detail: string; icon: "certificate" | "language" | "schedule" | "access" }>;
    courseSeries: Array<{ title: string; description: string; duration: string }>;
    courseTestimonials: Array<{ initials: string; name: string; quote: string }>;
  };
};

export type PlatformCourse = {
  id: string; slug: string; title: string; summary: string | null; description: string | null; level: string | null; durationWeeks: number | null;
  catalogItem: { title: string; slug: string; description: string | null; subtitle: string | null; durationLabel: string | null; level: string | null; imageAsset: { url: string; alternativeText: string | null } | null; courseCategory: { name: string; slug: string } | null } | null;
  lessons: Array<{ id: string; slug: string; title: string; description: string | null; sortOrder: number; materials: Array<{ id: string; title: string; type: string; url: string; durationSec: number | null }> }>;
  materials: Array<{ id: string; title: string; type: string; url: string; durationSec: number | null }>;
  reviews: Array<{ id: string; rating: number; title: string | null; body: string; createdAt: string; learner: { firstName: string; lastName: string } }>;
  comments: Array<{ id: string; body: string; createdAt: string; learner: { firstName: string; lastName: string } }>;
};

export type PlatformCatalogOptions = {
  page?: number;
  pageSize?: number;
};

export async function fetchPlatformCatalog(category?: string, options: PlatformCatalogOptions = {}): Promise<PlatformCatalogItem[]> {
  if (!PLATFORM_URL) return [];
  try {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (options.page !== undefined) params.set("page", String(options.page));
    if (options.pageSize !== undefined) params.set("pageSize", String(options.pageSize));
    const query = params.toString();
    const response = await fetch(`${PLATFORM_URL}/api/public/catalog${query ? `?${query}` : ""}`, { next: { revalidate: 60 } });
    if (!response.ok) return [];
    const body = await response.json() as { data?: PlatformCatalogItem[] };
    return body.data ?? [];
  } catch {
    return [];
  }
}
export async function fetchPlatformCatalogItem(slug: string): Promise<PlatformCatalogItem | null> {
  if (!PLATFORM_URL) return null;
  try { const response = await fetch(`${PLATFORM_URL}/api/public/catalog/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } }); if (!response.ok) return null; const body = await response.json() as { data?: PlatformCatalogItem }; return body.data ?? null; } catch { return null; }
}

export async function fetchPlatformCourse(slug: string): Promise<PlatformCourse | null> {
  if (!PLATFORM_URL) return null;
  try { const response = await fetch(`${PLATFORM_URL}/api/public/courses/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } }); if (!response.ok) return null; return await response.json() as PlatformCourse; } catch { return null; }
}

export function mapPlatformCatalogItem(item: PlatformCatalogItem): SanHubCatalogItem {
  return { id: item.slug, relatedCourses: item.relatedCourses, category: (sanHubCategories.includes(item.category as typeof sanHubCategories[number]) ? item.category : "Courses") as SanHubCatalogItem["category"], courseCategory: item.courseCategory?.name as SanHubCatalogItem["courseCategory"], title: item.title, provider: item.provider ?? "SAN TECH / SAN HUB", description: item.description ?? item.title, image: item.imageAsset?.url ?? "/images/second-image.jpeg", format: item.format ?? "Course pathway", duration: item.durationLabel ?? "Self-paced", level: item.level ?? "All levels", badge: item.badge ?? undefined, href: getSanHubCatalogHref({ id: item.slug, category: (sanHubCategories.includes(item.category as typeof sanHubCategories[number]) ? item.category : "Courses") as SanHubCatalogItem["category"] }) };
}


