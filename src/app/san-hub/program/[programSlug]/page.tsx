import Link from "next/link";
import { ArrowRight, BookOpen, ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { PublicPage } from "@/components/public-page";
import { SanHubSectionMenu } from "@/components/san-hub/san-hub-section-menu";
import { fetchPlatformCatalogItem } from "@/lib/platform-courses";

export default async function SanHubProgramPage({
  params,
}: {
  params: Promise<{ programSlug: string }>;
}) {
  const { programSlug } = await params;
  const program = await fetchPlatformCatalogItem(programSlug);
  if (!program || program.category !== "Programs") notFound();
  const courses = [...(program.relatedCourses ?? [])].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return (
    <PublicPage>
      <SanHubSectionMenu activeSection="programs" />
      <main className="mx-auto w-[calc(100%-2rem)] max-w-6xl px-1 py-10 sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)]">
        <Link
          href="/san-hub?section=programs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#334d78] hover:text-[#172b52]"
        >
          <ChevronLeft className="size-4" /> All programs
        </Link>
        <div className="mt-8 max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-secondary">
            SAN HUB program
          </p>
          <h1 className="font-exo mt-2 text-3xl font-bold tracking-[-0.04em] text-[#0a1f44] sm:text-5xl">
            {program.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-[#52698f]">
            {program.description ?? "A SAN HUB learning pathway."}
          </p>
        </div>
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-exo text-2xl font-bold text-[#0a1f44]">
                Courses in this program
              </h2>
              <p className="mt-1 text-sm text-[#52698f]">
                Follow the courses assigned to this program.
              </p>
            </div>
            <span className="rounded-full bg-[#eef1ff] px-3 py-1 text-sm font-semibold text-[#4e46ff]">
              {courses.length} {courses.length === 1 ? "course" : "courses"}
            </span>
          </div>
          {courses.length === 0 ? (
            <div className="mt-6 rounde-md border border-slate-200 bg-white p-8 text-center">
              <BookOpen className="mx-auto size-8 text-[#7b79ff]" />
              <h3 className="mt-3 text-lg font-semibold text-[#0a1f44]">
                Courses are being prepared
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#52698f]">
                This program does not have published courses assigned yet.
                Please check back soon.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/san-hub/course/${course.slug}`}
                  className="group rounde-md border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#7b79ff] hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-exo text-lg font-bold text-[#0a1f44]">
                        {course.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#52698f]">
                        {course.summary ??
                          "Build practical skills through a SAN HUB course."}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 size-5 shrink-0 text-[#4e46ff] transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </PublicPage>
  );
}
