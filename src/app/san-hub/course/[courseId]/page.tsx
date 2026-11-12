import { notFound } from "next/navigation";
import { getSanHubCourse, SanHubCourse, SanHubCourseDetail } from "@/components/san-hub-course-detail";
import { fetchPlatformCatalog, fetchPlatformCatalogItem, fetchPlatformCourse } from "@/lib/platform-courses";
import { sanHubCatalogItems } from "@/lib/san-hub-catalog-data";
import { createPageMetadata } from "@/lib/seo";

function mapCourse(slug: string, raw: Awaited<ReturnType<typeof fetchPlatformCourse>>, catalog: Awaited<ReturnType<typeof fetchPlatformCatalogItem>>): SanHubCourse | undefined {
  const fallback = getSanHubCourse(slug);
  if (!raw && !catalog && !fallback) return undefined;
  const presentation = catalog?.presentation;
  const base = fallback ?? {
    id: slug,
    category: "Courses" as const,
    courseCategory: catalog?.courseCategory?.name,
    title: catalog?.title ?? raw?.title ?? slug,
    provider: catalog?.provider ?? "SAN TECH / SAN HUB",
    description: catalog?.description ?? raw?.description ?? "Build practical technology skills through SAN HUB learning.",
    image: catalog?.imageAsset?.url ?? "/images/second-image.jpeg",
    format: catalog?.format ?? "Course pathway",
    duration: catalog?.durationLabel ?? (raw?.durationWeeks ? `${raw.durationWeeks} weeks` : "Self-paced"),
    level: catalog?.level ?? raw?.level ?? "All levels",
    href: `/san-hub/course/${slug}`,
    subtitle: catalog?.subtitle ?? raw?.summary ?? "Build practical technology skills through a canonical SAN HUB learning pathway.",
    instructor: catalog?.instructorLabel ?? "SAN TECH / SAN HUB",
    stats: [], learningOutcomes: [], skills: [], tools: [], details: [], courseSeries: [], testimonials: [], rating: "", reviewCount: "",
  };
  return {
    ...base,
    title: catalog?.title ?? raw?.title ?? base.title,
    description: catalog?.description ?? raw?.description ?? base.description,
    subtitle: catalog?.subtitle ?? base.subtitle,
    image: catalog?.imageAsset?.url ?? base.image,
    duration: catalog?.durationLabel ?? base.duration,
    level: catalog?.level ?? raw?.level ?? base.level,
    courseCategory: catalog?.courseCategory?.name ?? base.courseCategory,
    stats: presentation?.stats ?? base.stats,
    learningOutcomes: presentation?.learningOutcomes?.map((item) => item.value) ?? base.learningOutcomes,
    details: presentation?.details ?? base.details,
    courseSeries: presentation?.courseSeries ?? base.courseSeries,
    testimonials: presentation?.courseTestimonials ?? base.testimonials,
  };
}

export async function generateStaticParams() {
  const platform = await fetchPlatformCatalog("Courses");
  return [...new Set([...sanHubCatalogItems.filter((item) => item.category === "Courses").map((item) => item.id), ...platform.map((item) => item.slug)])].map((courseId) => ({ courseId }));
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const [raw, catalog] = await Promise.all([fetchPlatformCourse(courseId), fetchPlatformCatalogItem(courseId)]);
  const course = mapCourse(courseId, raw, catalog);
  return createPageMetadata({ title: course?.title || "SAN HUB course", description: course?.description || "Build practical technology skills through SAN HUB learning pathways.", path: `/san-hub/course/${courseId}`, image: course?.image });
}

export default async function SanHubCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const [raw, catalog] = await Promise.all([fetchPlatformCourse(courseId), fetchPlatformCatalogItem(courseId)]);
  const course = mapCourse(courseId, raw, catalog);
  if (!course) notFound();
  return <SanHubCourseDetail course={course} />;
}
