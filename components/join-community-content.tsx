"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { JoinCommunityPage } from "@/components/join-community-page";
import type { TraineeAward } from "@/lib/strapi";

interface JoinCommunityContentProps {
  awards: TraineeAward[];
}

function JoinCommunityContentInner({ awards }: JoinCommunityContentProps) {
  const searchParams = useSearchParams();
  const course = searchParams.get("course") ?? undefined;
  const path = searchParams.get("path") ?? undefined;
  const role = searchParams.get("role") ?? undefined;

  const initialPath = path === "training" || path === "internship" || path === "community" || path === "innovation"
    ? path
    : role?.toLowerCase().includes("intern")
      ? "internship"
      : course
        ? "training"
        : "community";

  return (
    <JoinCommunityPage
      initialPath={initialPath}
      course={course ?? ""}
      openInitially={Boolean(course || path || role)}
      awards={awards}
    />
  );
}

export function JoinCommunityContent({ awards }: JoinCommunityContentProps) {
  return (
    <Suspense fallback={
      <JoinCommunityPage
        initialPath="community"
        course=""
        openInitially={false}
        awards={awards}
      />
    }>
      <JoinCommunityContentInner awards={awards} />
    </Suspense>
  );
}
