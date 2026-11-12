"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const showcaseMoments = [
  {
    title: "Practical Cohorts & Youth STEM",
    category: "Learning",
    image:
      "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(1).jpg",
    alt: "Young students and STEM tech cohort in a learning session",
  },
  {
    title: "Innovation & Pitch Days",
    category: "Prototyping",
    image:
      "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(108).jpg",
    alt: "Innovator presenting digital solutions and AI systems on stage",
  },
  {
    title: "Certifications & Recognition",
    category: "Graduation",
    image:
      "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(174).jpg",
    alt: "SAN TECH leadership presenting official graduation and recognition certificates",
  },
  {
    title: "Tech Forward Live Summit",
    category: "Community",
    image:
      "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(80).jpg",
    alt: "Technology and innovation community gathered at Tech Forward Live",
  },
  {
    title: "Best Exhibitor Recognition",
    category: "Recognition",
    image:
      "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(172).jpg",
    alt: "SAN TECH team receiving Best Exhibitor recognition",
  },
  {
    title: "Ideas in Action",
    category: "Impact",
    image:
      "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(5).jpg",
    alt: "SAN TECH innovators and partners sharing ideas in action",
  },
] as const;

const pageSize = 3;

export function SanHubAboutMoments() {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(showcaseMoments.length / pageSize);
  const visibleMoments = showcaseMoments.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-3">
        {visibleMoments.map((moment) => (
          <figure
            key={moment.title}
            className="group overflow-hidden rounde-md border border-slate-200 bg-white shadow-[0_8px_24px_rgba(10,31,68,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-secondary/40 hover:shadow-[0_16px_36px_rgba(10,31,68,0.12)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <Image
                src={moment.image}
                alt={moment.alt}
                fill
                loading={page === 0 ? "eager" : "lazy"}
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-[#07152d]/80 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                {moment.category}
              </span>
            </div>
            <figcaption className="p-4">
              <h3 className="font-exo text-sm font-bold text-[#0a1f44]">
                {moment.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500">{moment.alt}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold text-slate-500">
            Page {page + 1} of {pageCount}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              disabled={page === 0}
              aria-label="Previous authentic moments"
              className="grid size-8 place-items-center rounded-full border border-slate-200 text-[#0a1f44] transition-colors hover:border-brand-secondary hover:text-brand-secondary disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index)}
                aria-label={`Show authentic moments page ${index + 1}`}
                aria-current={page === index ? "page" : undefined}
                className={`size-2 rounded-full transition-colors ${page === index ? "bg-brand-secondary" : "bg-slate-300 hover:bg-slate-400"}`}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setPage((current) => Math.min(pageCount - 1, current + 1))
              }
              disabled={page === pageCount - 1}
              aria-label="Next authentic moments"
              className="grid size-8 place-items-center rounded-full border border-slate-200 text-[#0a1f44] transition-colors hover:border-brand-secondary hover:text-brand-secondary disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
