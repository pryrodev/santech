import { PublicPage } from "@/components/public-page";
import { SanHubContent } from "@/components/san-hub-content";
import type { LibraryBook } from "@/components/san-hub/san-hub-digital-library";
import { fetchSanHubBooks, fetchTestimonials } from "@/lib/strapi";
import { fetchPlatformCatalog, mapPlatformCatalogItem } from "@/lib/platform-courses";
import { getSanHubCatalogHref, resolveSanHubCatalogSlug, sanHubProgramItems } from "@/lib/san-hub-catalog-data";
import type { SanHubCatalogItem } from "@/lib/san-hub-catalog-data";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "SAN HUB",
    description: "Learn, build, connect, and explore practical pathways through the SAN TECH ecosystem.",
    path: "/san-hub",
  });
}

export default async function SanHubPage() {
  // Fetch from Strapi; fall back to hardcoded program items if empty
  const [platformItems, cmsBooks, cmsTestimonials] = await Promise.all([
    fetchPlatformCatalog(),
    fetchSanHubBooks(),
    fetchTestimonials("san-hub"),
  ]);
  const catalogItems: readonly SanHubCatalogItem[] = platformItems.length > 0
    ? platformItems.map(mapPlatformCatalogItem).map((i) => ({
        id: resolveSanHubCatalogSlug(i),
        category: i.category as SanHubCatalogItem["category"],
        courseCategory: i.courseCategory,
        title: i.title,
        provider: i.provider ?? "",
        description: i.description,
        image: i.image,
        format: i.format ?? "",
        duration: i.duration ?? "",
        level: i.level ?? "",
        badge: i.badge ?? undefined,
        href: getSanHubCatalogHref({ id: resolveSanHubCatalogSlug(i), category: i.category as SanHubCatalogItem["category"] }),
      }))
    : sanHubProgramItems;

  const programItems = catalogItems.filter((i) => i.category === "Programs");
  const libraryBooks: readonly LibraryBook[] = cmsBooks.map((book, index) => ({
    id: book.bookId,
    title: book.title,
    coverTitle: book.coverTitle ?? book.title,
    coverSubtitle: book.coverSubtitle ?? "Useful technology\nstronger systems",
    coverImage: book.coverImage || undefined,
    description: book.description,
    category: book.category,
    pages: book.pageLabel ?? String(index + 1).padStart(2, "0"),
    accent: book.accent ?? "#0a1f44",
    coverInk: book.coverInk ?? "#e8fbff",
    readerUrl: book.readerUrl,
  }));

  return (
    <PublicPage>
      <SanHubContent
        catalogItems={catalogItems}
        programItems={programItems}
        libraryBooks={libraryBooks}
        cmsTestimonials={cmsTestimonials}
      />
    </PublicPage>
  );
}

