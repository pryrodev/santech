"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type CertificateOrientation = "portrait" | "landscape" | "square";
type CertificateOwnerType = "company" | "personal";

type CertificateItem = {
  title: string;
  issuer: string;
  owner?: string;
  ownerType?: CertificateOwnerType;
  description: string;
  image: string;
  file?: string;
  orientation: CertificateOrientation;
};

// These records are ready to be replaced by CMS data later. The orientation is
// kept with each record so a portrait certificate never gets forced into a
// landscape modal (or cropped to fit one).
const certificateItems: readonly CertificateItem[] = [
  {
    title: "Data Processor Certificate",
    issuer:
      "National Cyber Security Authority · Data Protection and Privacy Office",
    owner: "SAN TECH",
    ownerType: "company",
    image: "/images/SAN TECH Data Processor Certificate_page-0001.jpg",
    description:
      "A formal data protection certification recognizing SAN TECH's responsibility in handling and processing information securely.",
    file: "/images/SAN TECH Data Processor Certificate.pdf",
    orientation: "portrait",
  },
  {
    title: "EdTech Trust Seal",
    issuer: "Digital Bridge Institute",
    owner: "SAN TECH",
    ownerType: "company",
    image: "/certificates/edtech-trust-seal.png",
    description:
      "A trust mark reflecting SAN TECH's contribution to practical digital learning and education technology.",
    orientation: "square",
  },
];

const cardAspect: Record<CertificateOrientation, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

const modalImageSize: Record<CertificateOrientation, string> = {
  portrait: "h-[70svh] max-w-xl",
  landscape: "h-[52svh] max-w-5xl",
  square: "h-[65svh] max-w-2xl",
};

export function CertificatePanel({
  cmsItems,
}: {
  cmsItems?: import("@/lib/strapi").Certificate[];
}) {
  const items: readonly CertificateItem[] =
    cmsItems && cmsItems.length > 0
      ? cmsItems.map((c) => ({
          title: c.title,
          issuer: c.issuer,
          owner: c.owner || undefined,
          ownerType: c.ownerType,
          description: c.description,
          image: c.image,
          file: c.file || undefined,
          orientation: c.orientation,
        }))
      : certificateItems;

  const [selectedCertificate, setSelectedCertificate] =
    useState<CertificateItem | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const cardsPerSlide = 3;
  const slideCount = Math.max(1, Math.ceil(items.length / cardsPerSlide));
  const visibleCertificates = items.slice(
    activeSlide * cardsPerSlide,
    activeSlide * cardsPerSlide + cardsPerSlide,
  );

  useEffect(() => {
    if (prefersReducedMotion || selectedCertificate || slideCount < 2) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideCount);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, selectedCertificate, slideCount]);

  useEffect(() => {
    if (!selectedCertificate) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCertificate(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCertificate]);

  return (
    <div className="space-y-6">
      <div className="max-w-2xl">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
          Certificates &amp; trust
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeSlide}
          initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, x: -16 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.28,
            ease: "easeOut",
          }}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {visibleCertificates.map((certificate) => (
            <button
              key={certificate.title}
              type="button"
              onClick={() => setSelectedCertificate(certificate)}
              className="group overflow-hidden border-0 bg-transparent text-left shadow-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
              aria-label={`View ${certificate.title}`}
            >
              <div
                className={`relative overflow-hidden bg-transparent ${cardAspect[certificate.orientation]}`}
              >
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  fill
                  sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 100vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </button>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-1.5"
          role="tablist"
          aria-label={`Certificate slide ${activeSlide + 1} of ${slideCount}`}
        >
          {Array.from({ length: slideCount }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveSlide(index)}
              role="tab"
              aria-selected={activeSlide === index}
              aria-label={`Show certificate slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${activeSlide === index ? "w-8 bg-[#0a1f44]" : "w-1.5 bg-slate-300 hover:bg-slate-400"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setActiveSlide((activeSlide - 1 + slideCount) % slideCount)
            }
            aria-label="Previous certificates"
            className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white text-[#0a1f44] transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setActiveSlide((activeSlide + 1) % slideCount)}
            aria-label="Next certificates"
            className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white text-[#0a1f44] transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedCertificate && (
              <motion.div
                className="fixed inset-0 z-[120] flex items-center justify-center bg-[#07152d]/70 p-3 backdrop-blur-sm sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="certificate-dialog-title"
                onMouseDown={() => setSelectedCertificate(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="relative flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden rounde-md bg-white shadow-[0_24px_70px_rgba(7,21,45,0.3)]"
                  onMouseDown={(event) => event.stopPropagation()}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 14, scale: 0.98 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 0, y: 8, scale: 0.98 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0.01 : 0.22,
                    ease: "easeOut",
                  }}
                >
                  <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-secondary">
                          SAN TECH / CERTIFICATE
                        </p>
                        {selectedCertificate.owner && (
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-[#0a1f44]">
                            {selectedCertificate.ownerType === "personal"
                              ? "Personal / Founder"
                              : "Company"}
                          </span>
                        )}
                      </div>
                      <h2
                        id="certificate-dialog-title"
                        className="font-exo mt-1 text-lg font-bold leading-tight text-[#0a1f44] sm:text-xl"
                      >
                        {selectedCertificate.title}
                      </h2>
                      <p className="mt-1 text-xs text-slate-500">
                        {selectedCertificate.issuer}
                      </p>
                      {selectedCertificate.owner && (
                        <p className="mt-1 text-xs font-semibold text-[#0a1f44]">
                          Holder:{" "}
                          <span className="font-normal text-slate-600">
                            {selectedCertificate.owner}
                          </span>
                        </p>
                      )}
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#68718a]">
                        {selectedCertificate.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedCertificate(null)}
                      aria-label="Close certificate viewer"
                      className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 text-[#0a1f44] transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="min-h-0 flex-1 overflow-auto bg-[#eef4fa] p-3 sm:p-6">
                    <div
                      className={`relative mx-auto w-full ${modalImageSize[selectedCertificate.orientation]}`}
                    >
                      <Image
                        src={selectedCertificate.image}
                        alt={selectedCertificate.title}
                        fill
                        sizes="(min-width: 1024px) 960px, 100vw"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {selectedCertificate.file && (
                    <div className="flex shrink-0 justify-end border-t border-slate-200 px-5 py-3 sm:px-6">
                      <a
                        href={selectedCertificate.file}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#0a1f44] px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
                      >
                        Open PDF{" "}
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
