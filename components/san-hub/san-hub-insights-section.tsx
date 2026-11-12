"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

type InsightArticle = {
  title: string;
  source: string;
  category: string;
  type: string;
  date?: string;
  description: string;
  href: string;
  image?: string;
  videoId?: string;
};

const insightArticles: readonly InsightArticle[] = [
  {
    title:
      "Rwanda’s tech students urged to turn ideas into job-creating innovations",
    source: "Top Africa News",
    category: "Success stories",
    type: "Article",
    date: "7 March 2026",
    description:
      "Coverage of Tech Forward Live and the call for students to turn academic projects into practical products, businesses, and jobs.",
    href: "https://www.topafricanews.com/2026/03/07/rwandas-tech-students-urged-to-turn-ideas-into-job-creating-innovations/",
    image: "https://www.topafricanews.com/wp-content/uploads/2026/03/mnc.jpg",
  },
  {
    title: "SAN TECH’s contribution to one million coders through SAN HUB",
    source: "Rwanda Broadcasting Agency / RTV News",
    category: "Program reports",
    type: "Video",
    description:
      "A televised story about SAN HUB’s role in technology skills development and youth empowerment.",
    href: "https://www.youtube.com/watch?v=11SCqLIK_5Y&t=74s",
    videoId: "11SCqLIK_5Y",
  },
  {
    title:
      "Young people encouraged to turn AI and robotics into development opportunities",
    source: "Imvahonshya",
    category: "AI insights",
    type: "Article",
    description:
      "A Rwandan technology story focused on AI, robotics, youth innovation, and the opportunities hidden in emerging technologies.",
    href: "https://m.imvahonshya.co.rw/dr-habumuremyi-yasabye-urubyirukokubyaza-umusaruro-ai-na-robo-byihishemo-iterambere/",
  },
  {
    title: "Award-winning projects include AI for hospital triage",
    source: "IGIHE",
    category: "AI insights",
    type: "Article",
    description:
      "Coverage of SAN TECH-linked innovation projects, including the use of AI to support faster hospital triage.",
    href: "https://mobile.igihe.com/ikoranabuhanga/article/harimo-uwo-gukoreshaai-mu-gusuzuma-indembe-imishinga-myiza-yahembwe-na-santech",
  },
  {
    title:
      "SAN TECH launches Tech Forward Live to reshape Rwanda’s technology story",
    source: "Inganzo Hub",
    category: "Events and announcements",
    type: "Article",
    description:
      "A report on Tech Forward Live and its focus on youth, innovation, and the future of technology in Rwanda.",
    href: "https://inganzohub.com/urubyiruko-rwu-rwanda-rurimo-guhinduraisura-yikoranabuhanga-santech-yatangije-tech-forward-live/",
  },
  {
    title: "Tech Forward Live 2026",
    source: "Rwanda Broadcasting Agency",
    category: "Events and announcements",
    type: "Video",
    description:
      "Watch the RBA coverage of SAN TECH’s Tech Forward Live innovation event.",
    href: "https://www.youtube.com/live/pncZPGun6Y",
    videoId: "pncZPGun6Y",
  },
  {
    title: "Claudine Niyonzima: a woman building a technology business",
    source: "BBC News Gahuza",
    category: "Entrepreneurship insights",
    type: "Profile",
    date: "25 August 2022",
    description:
      "A profile of SAN TECH co-founder Claudine Niyonzima and the E-Visitors technology story.",
    href: "https://www.bbc.com/gahuza/articles/c883638n0jeo",
    image:
      "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/2ee5/live/f2166110-24ef-11ed-870c-2590a7f5976a.jpg.webp",
  },
  {
    title: "How E-Visitors helped reduce risks during the COVID-19 period",
    source: "IGIHE",
    category: "Technology trends",
    type: "Article",
    description:
      "Coverage of how digital visitor management supported safer institutional processes during the pandemic.",
    href: "https://igihe.com/ubuzima/coronavirus/article/umusanzu-wa-e-visitor-ikoranabuhanga-ryafashije-mu-kugabanya-ibyago-byo",
  },
  {
    title:
      "NIRDA recognizes entrepreneurs developing solutions to real problems",
    source: "IGIHE",
    category: "Innovation reports",
    type: "Article",
    description:
      "A story about Rwanda’s innovation ecosystem and entrepreneurs developing solutions with practical impact.",
    href: "https://www.igihe.com/amakuru/u-rwanda/article/nirda-yashimiye-ba-rwiyemezamirimo-bafite-imishinga-yitezweho-ibisubizo-by",
  },
] as const;

export function SanHubInsightsSection() {
  const [activeCategory, setActiveCategory] = useState("All stories");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const availableCategories = useMemo(
    () => [...new Set(insightArticles.map((article) => article.category))],
    [],
  );
  const filteredArticles =
    activeCategory === "All stories"
      ? insightArticles
      : insightArticles.filter(
          (article) => article.category === activeCategory,
        );
  const cardsPerSlide = 3;
  const slideCount = Math.max(
    1,
    Math.ceil(filteredArticles.length / cardsPerSlide),
  );
  const visibleArticles = filteredArticles.slice(
    activeSlide * cardsPerSlide,
    activeSlide * cardsPerSlide + cardsPerSlide,
  );

  useEffect(() => {
    setActiveSlide(0);
  }, [activeCategory]);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || slideCount <= 1) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideCount);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [activeCategory, isPaused, prefersReducedMotion, slideCount]);

  const moveSlide = (direction: number) => {
    setActiveSlide(
      (current) => (current + direction + slideCount) % slideCount,
    );
  };

  return (
    <section className="san-hub-graphic-section border-b border-slate-200 py-1 sm:px-4 lg:px-8 lg:py-2">
      <div className="mx-auto max-w-7xl rounde-md bg-white px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <div className="border-b border-slate-200 pb-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
              SAN HUB / Insights
            </p>
            <h1 className="font-exo mt-2 max-w-xl text-2xl font-bold leading-[1.02] tracking-[-0.04em] text-[#0a1f44] sm:text-3xl">
              Stories beyond the trends.
            </h1>
          </div>
        </div>

        <div
          className="flex gap-2 overflow-x-auto border-b border-slate-200 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Insight categories"
        >
          <button
            type="button"
            onClick={() => setActiveCategory("All stories")}
            className={`shrink-0 rounded-full border px-3 py-2 text-xs font-bold transition-colors ${activeCategory === "All stories" ? "border-[#0a1f44] bg-[#0a1f44] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-brand-secondary hover:text-[#0a1f44]"}`}
          >
            All stories
          </button>
          {availableCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full border px-3 py-2 text-xs font-bold transition-colors ${activeCategory === category ? "border-[#0a1f44] bg-[#0a1f44] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-brand-secondary hover:text-[#0a1f44]"}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          className="pt-5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <motion.div
            key={`${activeCategory}-${activeSlide}`}
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.24,
              ease: "easeOut",
            }}
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleArticles.map((article, index) => (
                <motion.article
                  key={article.href}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.01 : 0.22,
                    delay: prefersReducedMotion ? 0 : index * 0.04,
                    ease: "easeOut",
                  }}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_4px_18px_rgba(10,31,68,0.04)] transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:border-brand-secondary hover:shadow-[0_14px_32px_rgba(10,31,68,0.1)]"
                >
                  {(article.image || article.videoId) && (
                    <div className="relative -mx-5 -mt-5 mb-5 aspect-[16/8] overflow-hidden border-b border-slate-200 bg-[#eaf1f6]">
                      <img
                        src={
                          article.image ??
                          `https://i.ytimg.com/vi/${article.videoId}/hqdefault.jpg`
                        }
                        alt=""
                        loading={
                          index === 0 && activeSlide === 0 ? "eager" : "lazy"
                        }
                        className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      {article.videoId && (
                        <span className="absolute bottom-3 left-3 bg-[#0a1f44] px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white">
                          Watch video
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-black uppercase tracking-[0.16em] text-brand-secondary">
                      {article.category}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {article.type}
                    </span>
                  </div>
                  <h2 className="font-exo mt-4 text-xl font-bold leading-tight text-[#0a1f44]">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {article.description}
                  </p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <div>
                      <p className="text-xs font-bold text-[#0a1f44]">
                        {article.source}
                      </p>
                      {article.date && (
                        <p className="mt-1 text-xs text-slate-500">
                          {article.date}
                        </p>
                      )}
                    </div>
                    <a
                      href={article.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group/source inline-flex shrink-0 items-center gap-2 rounded-md border border-transparent px-2 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#0a1f44] transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#0a1f44] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                      aria-label={`Read ${article.title}`}
                    >
                      Open source{" "}
                      <ArrowUpRight
                        className="size-4 transition-transform duration-200 group-hover/source:translate-x-0.5 group-hover/source:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4">
            <div className="flex items-center gap-3" aria-live="polite">
              <span className="text-xs font-bold text-slate-500">
                Showing{" "}
                {filteredArticles.length === 0
                  ? 0
                  : activeSlide * cardsPerSlide + 1}
                –
                {Math.min(
                  (activeSlide + 1) * cardsPerSlide,
                  filteredArticles.length,
                )}{" "}
                of {filteredArticles.length}
              </span>
              <div
                className="flex items-center gap-1.5"
                aria-label="Insight slides"
              >
                {Array.from({ length: slideCount }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to insight slide ${index + 1}`}
                    aria-current={activeSlide === index ? "true" : undefined}
                    className={`h-1.5 rounded-full transition-all ${activeSlide === index ? "w-6 bg-[#0a1f44]" : "w-1.5 bg-slate-300 hover:bg-brand-secondary"}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => moveSlide(-1)}
                disabled={slideCount <= 1}
                aria-label="Previous insight slide"
                className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 text-[#0a1f44] transition-colors hover:border-brand-secondary hover:bg-[#eef7fb] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => moveSlide(1)}
                disabled={slideCount <= 1}
                aria-label="Next insight slide"
                className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 text-[#0a1f44] transition-colors hover:border-brand-secondary hover:bg-[#eef7fb] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
