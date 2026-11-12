"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, X } from "lucide-react";

const calendlyUrl =
  "https://calendly.com/d/dz7h-n6m-tsp/e-visitors-demo?hide_gdpr_banner=1&background_color=ffffff&text_color=0a1f44&primary_color=08c6e7";

export function CalendlyDialog({
  className,
  label = "Book with Us",
  bookingUrl,
}: {
  className?: string;
  label?: string;
  bookingUrl?: string | null;
} = {}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const triggerClassName =
    className ||
    "inline-flex h-10 items-center justify-center gap-2 border border-[#0a1f44] bg-white px-5 text-xs font-bold text-[#0a1f44] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#0a1f44] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary";

  if (bookingUrl) {
    return (
      <a
        href={bookingUrl}
        target="_blank"
        rel="noreferrer"
        className={triggerClassName}
      >
        <CalendarDays className="size-3.5" aria-hidden="true" />
        {label}
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName}
      >
        <CalendarDays className="size-3.5" aria-hidden="true" />
        {label}
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] grid overflow-y-auto bg-[#0a1f44]/55 p-3 backdrop-blur-sm sm:p-6"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="calendly-dialog-title"
              className="relative m-auto w-full max-w-4xl overflow-hidden rounde-md bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">
                    SAN TECH / Book a time
                  </p>
                  <h2
                    id="calendly-dialog-title"
                    className="font-exo mt-1 text-lg font-bold tracking-[-0.035em] text-[#0a1f44]"
                  >
                    {label}
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label="Close booking dialog"
                  onClick={() => setOpen(false)}
                  className="grid size-9 place-items-center rounded-full border border-slate-200 text-[#0a1f44] transition-colors hover:bg-[#0a1f44] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
              <iframe
                title="Book a time with SAN TECH"
                src={calendlyUrl}
                className="h-[min(720px,calc(100vh-7rem))] w-full border-0"
                loading="lazy"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
