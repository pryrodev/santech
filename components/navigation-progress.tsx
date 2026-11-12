"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function NavigationProgress() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function startProgress() {
    clearTimers();
    setVisible(true);
    setWidth(0);
    // Quickly jump to 25%, then crawl to 75%, then stall at 90%
    timers.current.push(setTimeout(() => setWidth(25), 50));
    timers.current.push(setTimeout(() => setWidth(55), 400));
    timers.current.push(setTimeout(() => setWidth(75), 1200));
    timers.current.push(setTimeout(() => setWidth(90), 2500));
  }

  function finishProgress() {
    clearTimers();
    setWidth(100);
    timers.current.push(
      setTimeout(() => {
        setVisible(false);
        setWidth(0);
      }, 300)
    );
  }

  // Finish when pathname changes (navigation complete)
  useEffect(() => {
    finishProgress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Start on any internal link click
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      const anchor = (e.target as Element)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      // Only internal same-origin navigations
      if (
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) return;
      startProgress();
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      clearTimers();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[9999]">
      <div
        className="h-[3px] transition-[width] ease-out"
        style={{
          width: `${width}%`,
          transitionDuration: width === 100 ? "200ms" : width <= 25 ? "150ms" : "600ms",
          background: "linear-gradient(90deg, #00A3E0 0%, #333292 60%, #0a1f44 100%)",
          boxShadow: "0 0 8px rgba(0,163,224,0.6)",
        }}
      />
    </div>
  );
}
