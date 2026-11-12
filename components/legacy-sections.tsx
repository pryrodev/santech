"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  ChevronDown,
  Code2,
  Compass,
  Cpu,
  Eye,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  Network,
  Radio,
  Rocket,
  ShieldCheck,
  Target,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import BubbleMenu from "./BubbleMenu";
import { CompanyProfilePdf } from "@/components/company-profile-pdf";
import { CertificatePanel as CertificatePanelContent } from "@/components/certificate-panel";
import { getInlinePdfUrl } from "@/lib/pdf-utils";
import { useUiCopy } from "@/lib/use-ui-copy";
import type { LegacyContent } from "@/lib/strapi";

const identity = [
  ["Founded", "1 August 2019"],
  ["Founder & CEO", "Mr. Shema Pacifique"],
  ["Co-founder & COO/CFO", "Claudine Niyonzima"],
  ["Head office", "Kigali, Rwanda"],
  ["Core philosophy", "Turning Ideas into Impact"],
  ["Stamp motto", "Innovate · Empower · Deliver"],
] as const;

const values = [
  {
    label: "Innovation",
    description:
      "We transform ideas, challenges, and opportunities into practical technological solutions.",
  },
  {
    label: "Excellence",
    description:
      "We pursue high standards in technology, service delivery, engineering, and customer experience.",
  },
  {
    label: "Integrity & Ownership",
    description:
      "We act with honesty, take responsibility for our work, and follow through on commitments to our people, clients, and communities.",
  },
  {
    label: "Customer Centricity",
    description:
      "We understand our clients and end users and design solutions around their real needs.",
  },
  {
    label: "Impact",
    description:
      "We measure success by the positive economic, institutional, social, and technological results our work creates.",
  },
  {
    label: "Collaboration",
    description:
      "We work with clients, government, academia, innovators, communities, and technology partners to achieve shared objectives.",
  },
  {
    label: "Continuous Learning",
    description:
      "We continuously develop our people, adopt emerging technologies, conduct research, and improve our solutions.",
  },
  {
    label: "Security & Responsibility",
    description:
      "We build technology with cybersecurity, privacy, reliability, safety, and responsible technology use at its foundation.",
  },
  {
    label: "Empowerment",
    description:
      "Through SAN HUB and other initiatives, we equip young people, professionals, entrepreneurs, and organizations with knowledge and opportunities to create value.",
  },
] as const;

const focusAreas = [
  [
    "Software Engineering",
    "Builds customized digital systems, enterprise platforms, and secure web & mobile applications.",
  ],
  [
    "Artificial Intelligence",
    "Develops intelligent automation, machine learning models, and predictive data solutions.",
  ],
  [
    "Cybersecurity",
    "Protects institutional infrastructure, networks, systems, and compliance data.",
  ],
  [
    "IoT & Connected Devices",
    "Connects smart physical sensors, telemetry hardware, and central software.",
  ],
  [
    "Embedded Technology",
    "Engineers hardware/software integrated microcontroller solutions and firmware.",
  ],
  [
    "Digital Transformation",
    "Converts manual operations into streamlined, automated digital workflows.",
  ],
  [
    "Systems Integration",
    "Connects diverse technologies, APIs, and institutional organizational systems.",
  ],
  [
    "Innovation & Incubation",
    "Converts ideas and prototypes into tested, usable, market-ready products.",
  ],
  [
    "Training & Capacity",
    "Develops practical, job-ready technology and engineering skills through SAN HUB.",
  ],
  [
    "Research & Development",
    "Experiments with emerging technologies, prototype testing, and applied science.",
  ],
  [
    "Technology Consultancy",
    "Provides technical advisory, digital architecture, and transformation guidance.",
  ],
  [
    "Product Deployment",
    "Installs, integrates, trains users, and supports long-term operational systems.",
  ],
] as const;

const focusIcons: readonly LucideIcon[] = [
  Code2,
  BrainCircuit,
  ShieldCheck,
  Radio,
  Cpu,
  Workflow,
  Network,
  Lightbulb,
  GraduationCap,
  FlaskConical,
  Compass,
  Rocket,
];

const journeyStages = [
  ["2018", "Idea", "Founders identify problems with manual visitor management"],
  [
    "2019",
    "Inception",
    "SAN TECH founded; E-Visitors prototype and IP journey begins",
  ],
  [
    "2019",
    "Validation",
    "E-Visitors recognized through NIRDA Innovate for Industry",
  ],
  [
    "2020",
    "Testing",
    "Prototype moves toward real users and institutional applications",
  ],
  [
    "2021",
    "Institutionalization",
    "Technology supports institutional resilience and digital processes",
  ],
  ["2022", "Ecosystem", "Recognition and emergence of SAN HUB"],
  [
    "2023",
    "Market Validation",
    "SAN HUB officially launched; E-Visitors adopted by National Bank of Rwanda (BNR)",
  ],
  [
    "2024",
    "Partnerships",
    "International partnerships and innovators from multiple countries",
  ],
  [
    "2025",
    "Scaling",
    "SAN HUB expands; international and continental ambitions grow",
  ],
  [
    "2026",
    "African Tech Vision",
    "SAN TECH expands its technology, training, innovation, and systems-integration ecosystem",
  ],
] as const;

const modelStages = [
  ["Challenge", "Start with a real operational problem."],
  ["Discover", "Study workflows, users, and constraints."],
  ["Design", "Shape a practical solution around the context."],
  ["Develop", "Build the software and hardware required."],
  ["Test", "Validate the solution with real users."],
  ["Deploy", "Integrate the technology into daily operations."],
  ["Train", "Build the human capability to use it well."],
  ["Support", "Keep the system reliable after launch."],
  ["Improve", "Measure results and keep making it better."],
] as const;

type RecognitionItem = {
  year: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
};

const recognitionItems: readonly RecognitionItem[] = [
  {
    year: "2026",
    title: "Best Exhibitor in ICT & Innovation",
    description:
      "SAN TECH was recognized as Best Exhibitor in ICT and Innovation at the 29th Rwanda International Trade Fair (Expo 2026), emerging top among 494 participating companies for outstanding technological innovation and ecosystem delivery.",
    image: "/images/trophy.png",
    imageAlt:
      "SAN TECH leadership and dignitaries holding the Best Exhibitor in ICT & Innovation trophy on stage",
    badge: "Expo 2026 Winner",
  },
  {
    year: "2026",
    title: "Tech Forward Live 2026 Summit",
    description:
      "SAN TECH convened Tech Forward Live 2026 under the theme 'Turning Ideas into Impact', bringing together youth innovators, government leaders, university partners, and industry experts to champion technology adoption, prototype incubation, and youth tech employment across Africa.",
    image:
      "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(80).jpg",
    imageAlt:
      "Tech Forward Live 2026 summit hall packed with delegates, partners, and innovators",
    badge: "Flagship Summit",
  },
  {
    year: "2019",
    title: "Innovate for Industry Hackathon Winner",
    description:
      "SAN TECH's E-Visitors project emerged as one of the winners of the Innovate for Industry Hackathon organized by the National Industrial Research and Development Agency (NIRDA). NIRDA subsequently supported the product through incubation and product improvement.",
  },
  {
    year: "",
    title: "AMI Resilience Prize",
    description:
      "The E-Visitors project received recognition through the AMI Resilience Prize, associated with AMI Rwanda and the Youth Challenge Programme.",
  },
  {
    year: "2022",
    title: "Generation Unlimited / UNICEF Recognition",
    description:
      "SAN TECH reports recognition through Generation Unlimited and UNICEF, including the Best Performing Entrepreneurs Award in 2022.",
  },
  {
    year: "2024",
    title: "Bridge International / TBI Global Impact Recognition",
    description:
      "SAN TECH reports receiving recognition from The Bridge International (TBI) for its global and sustainable impact in 2024.",
  },
  {
    year: "",
    title: "E-Visitors Intellectual Property",
    description:
      "SAN TECH secured intellectual-property rights for its E-Visitors innovation, with the company’s innovation journey beginning around the development and registration of the E-Visitors prototype.",
  },
  {
    year: "",
    title: "Cybersecurity / Technical Verification",
    description:
      "SAN TECH’s company profile states that E-Visitors was verified and approved by the relevant cybersecurity institution, identified in the profile as the National Cyber Security Authority (NCSA).",
  },
  {
    year: "2025",
    title: "Digital Bridge Institute EdTech Recognition",
    description:
      "A 2025 sustainability and impact profile reports that SAN TECH received an EdTech Seal from the Digital Bridge Institute.",
  },
  {
    year: "2025",
    title:
      "Rwanda National Cyber Security Authority Data Protection/Data Controller Certification",
    description:
      "The same 2025 profile reports SAN TECH's Data Protection and Data Controller certification from the Rwanda National Cyber Security Authority.",
    image: "/images/SAN TECH Data Processor Certificate_page-0001.jpg",
    imageAlt:
      "SAN TECH Data Processor Certificate issued by Rwanda's National Cyber Security Authority",
    badge: "Data Processor Certificate",
  },
  {
    year: "2021",
    title: "National Recognition for COVID-19 Recovery Capacity",
    description:
      "SAN TECH’s published achievements timeline records national recognition in 2021 for supporting institutional COVID-19 recovery and resilience through technology.",
  },
  {
    year: "2023",
    title: "Central Bank of Rwanda (BNR) E-Visitors Institutional Adoption",
    description:
      "In 2023, SAN TECH recorded a major industry-validation milestone when its E-Visitors System was adopted by the National Bank of Rwanda (BNR).",
  },
  {
    year: "",
    title: "International Partnership & Innovation Recognition",
    description:
      "SAN TECH reports partnerships with institutions including DAESSA and PERPEDINE Universities, while its SAN HUB attracted innovators from multiple countries.",
  },
];

export function IdentityPanel({
  cmsContent,
}: {
  cmsContent?: LegacyContent | null;
}) {
  const t = useUiCopy();
  const activeIdentity = cmsContent?.identityFacts.length
    ? cmsContent.identityFacts
    : identity.map(([label, value]) => ({ label, value }));
  return (
    <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
          {t.whoWeAre}
        </p>
        <p className="mt-6 max-w-xl text-justify text-base leading-7 text-[#68718a]">
          {cmsContent?.whoWeAreBody ??
            "SAN TECH is a technological company focused on digital transformation and innovation. We develop smart digital products and integrated technology solutions while building the human talent and innovation ecosystem needed to create and deploy them."}
        </p>
        <p className="mt-5 max-w-xl text-justify text-base leading-7 text-[#68718a]">
          {cmsContent?.whoWeAreSecondaryBody ??
            "SAN TECH connects people, ideas and technology — helping organizations solve real problems while helping the next generation develop the skills and products needed to create new innovative solutions."}
        </p>
      </div>
      <aside className="border-l border-slate-300 pl-6 lg:pl-10">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
          {t.coreIdentity}
        </p>
        <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {activeIdentity.map(({ label, value }) => (
            <div key={label} className="border-t border-slate-200 pt-3">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#7c879d]">
                {label}
              </p>
              <p className="mt-2 text-sm font-bold leading-5 text-[#0a1f44]">
                {value}
              </p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

export function MissionPanel({
  cmsValues,
  cmsContent,
}: {
  cmsValues?: import("@/lib/strapi").CompanyValue[];
  cmsContent?: LegacyContent | null;
}) {
  const activeValues: readonly { label: string; description: string }[] =
    cmsValues && cmsValues.length > 0 ? cmsValues : values;
  const [selectedValue, setSelectedValue] = useState<string>(
    activeValues[0].label,
  );
  const prefersReducedMotion = useReducedMotion();
  const t = useUiCopy();
  const activeValue =
    activeValues.find((value) => value.label === selectedValue) ??
    activeValues[0];
  const missionTitle = cmsContent?.missionTitle ?? t.mission;
  const missionTagline = cmsContent?.missionTagline ?? t.buildUsefulCapability;
  const missionDescription =
    cmsContent?.missionDescription ??
    "To create and deliver innovative, secure, affordable, and sustainable technology solutions while developing the people and ecosystems that make innovation happen.";
  const visionTitle = cmsContent?.visionTitle ?? t.vision;
  const visionTagline = cmsContent?.visionTagline ?? t.widenWhatIsPossible;
  const visionDescription =
    cmsContent?.visionDescription ??
    "To be a leading African technology and innovation hub transforming ideas into smart solutions that improve lives and drive economic growth.";

  return (
    <div className="grid items-start gap-6 overflow-visible min-[1020px]:grid-cols-[0.9fr_1.1fr] min-[1020px]:gap-7">
      <div className="relative min-w-0 overflow-visible">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-full bg-[#e8f1fc] text-[10px] font-black text-brand-secondary">
            01
          </span>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
            {t.ourDirection}
          </p>
        </div>
        <div className="relative grid gap-2.5 pl-5">
          <span
            className="absolute bottom-8 left-9 top-8 w-px bg-gradient-to-b from-brand-cyan via-brand-secondary to-[#0a1f44]"
            aria-hidden="true"
          />
          <article className="relative rounde-md border border-[#bdeaf3] bg-[#f2fcfe] p-4 shadow-[0_8px_22px_rgba(8,198,231,0.08)]">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-white text-brand-secondary shadow-sm">
                <Target className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">
                  {missionTitle}
                </p>
                <p className="text-xs font-bold text-[#0a1f44]">
                  {missionTagline}
                </p>
              </div>
            </div>
            <p className="mt-3 text-[14px] leading-6.5 text-[#526989]">
              {missionDescription}
            </p>
          </article>
          <article className="relative rounde-md border border-[#d4def0] bg-[#f8faff] p-4 shadow-[0_8px_22px_rgba(10,31,68,0.06)]">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-white text-[#0a1f44] shadow-sm">
                <Eye className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">
                  {visionTitle}
                </p>
                <p className="text-xs font-bold text-[#0a1f44]">
                  {visionTagline}
                </p>
              </div>
            </div>
            <p className="mt-3 text-[14px] leading-6.5 text-[#526989]">
              {visionDescription}
            </p>
          </article>
        </div>
      </div>
      <div className="min-w-0 overflow-visible rounde-md border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(10,31,68,0.05)] sm:p-5">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
            {t.coreValues}
          </p>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeValue.label}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.2,
              ease: "easeOut",
            }}
            className="mt-4 rounded-xl border border-[#bdeaf3] bg-[#f2fcfe] p-4"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">
              {activeValue.label}
            </p>
            <p className="mt-2 line-clamp-3 text-sm leading-5.5 text-[#526989]">
              {activeValue.description}
            </p>
          </motion.div>
        </AnimatePresence>
        <div
          className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3"
          role="list"
          aria-label="SAN TECH core values"
        >
          {activeValues.map((value) => {
            const selected = selectedValue === value.label;
            return (
              <button
                key={value.label}
                type="button"
                onClick={() => setSelectedValue(value.label)}
                aria-pressed={selected}
                className={`group min-h-14 rounded-xl border px-3 py-2 text-left transition-[transform,background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 ${selected ? "border-[#0a1f44] bg-[#0a1f44] text-white shadow-[0_10px_20px_rgba(10,31,68,0.16)]" : "border-slate-200 bg-[#f8faff] text-[#0a1f44] hover:-translate-y-0.5 hover:border-brand-secondary/50 hover:bg-white"}`}
              >
                <span className="text-xs font-bold leading-4">
                  {value.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { JourneyPanel } from "@/components/journey-panel";

function LegacyJourneyGrid() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.32fr_0.68fr] lg:gap-12">
      <div className="grid gap-3 sm:grid-cols-2">
        {journeyStages.map(([year, stage, description], index) => (
          <article
            key={`${year}-${stage}`}
            className="border border-slate-200 bg-slate-50/60 px-4 py-3 transition-colors hover:border-[#b7cbe3] hover:bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-bold leading-5 text-[#0a1f44]">
                {year} — {stage}
              </h3>
              <span className="text-[10px] font-black tracking-[0.16em] text-brand-secondary/45">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-[#68718a]">
              {description}
            </p>
          </article>
        ))}
      </div>
      <div className="flex flex-col justify-center border-l border-slate-300 pl-6 lg:pl-8">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
          Our journey
        </p>
        <h1 className="font-exo mt-4 max-w-md text-xl font-normal leading-[1.18] tracking-[-0.035em] text-[#303755] sm:text-2xl lg:text-[2rem]">
          SAN TECH Journey at a Glance
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-[#68718a]">
          A decade of turning practical problems into technology, capability,
          partnerships, and a growing African innovation ecosystem.
        </p>
        <div className="mt-8 border-t border-slate-300 pt-4">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">
            2018 — 2026
          </p>
          <p className="mt-2 text-sm font-bold leading-6 text-[#0a1f44]">
            From first idea to African technology vision.
          </p>
        </div>
      </div>
    </div>
  );
}

function RecognitionCarousel({
  items,
  prefersReducedMotion,
  onSelect,
}: {
  items: readonly RecognitionItem[];
  prefersReducedMotion: boolean | null;
  onSelect: (item: RecognitionItem) => void;
}) {
  const t = useUiCopy();
  const cardsPerSlide = 3;
  const [activeSlide, setActiveSlide] = useState(0);
  const slideCount = Math.max(1, Math.ceil(items.length / cardsPerSlide));
  const visibleItems = items.slice(
    activeSlide * cardsPerSlide,
    activeSlide * cardsPerSlide + cardsPerSlide,
  );

  useEffect(() => {
    if (prefersReducedMotion || slideCount < 2) return;
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % slideCount),
      5200,
    );
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, slideCount]);

  return (
    <>
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
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleItems.map((item) => {
            const image =
              item.image ??
              "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(174).jpg";
            return (
              <motion.button
                key={item.title}
                type="button"
                onClick={() => onSelect(item)}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-[0_8px_22px_rgba(10,31,68,0.06)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-secondary/50 hover:shadow-[0_14px_30px_rgba(10,31,68,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
                aria-label={`View details for ${item.title}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={image}
                    alt={item.imageAlt ?? item.title}
                    fill
                    sizes="(min-width: 1280px) 240px, (min-width: 640px) 50vw, 100vw"
                    className="object-contain object-center"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#0a1f44]">
                    {item.year || "Recognition"}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold leading-4 text-[#0a1f44]">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-3 text-sm leading-5 text-[#68718a]">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span>{t.recognitionSanTech}</span>
                    <span className="inline-flex shrink-0 items-center gap-1.5 font-bold text-[#0a1f44] transition-colors group-hover:text-brand-secondary">
                      {t.viewDetailsLink}{" "}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-1.5"
          aria-label={`Recognition group ${activeSlide + 1} of ${slideCount}`}
        >
          {Array.from({ length: slideCount }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show recognition group ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
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
            aria-label="Previous recognition group"
            className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white text-[#0a1f44] transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
          >
            <ArrowUpRight
              className="size-4 rotate-[225deg]"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={() => setActiveSlide((activeSlide + 1) % slideCount)}
            aria-label="Next recognition group"
            className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white text-[#0a1f44] transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
          >
            <ArrowUpRight
              className="size-4 rotate-[-45deg]"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export function RecognitionPanel({
  items,
}: {
  items?: readonly RecognitionItem[];
}) {
  const recognitions = items && items.length > 0 ? items : recognitionItems;
  const [selectedRecognition, setSelectedRecognition] =
    useState<RecognitionItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const t = useUiCopy();
  const orderedRecognitions = [...recognitions].sort((a, b) => {
    const yearA = a.year ? Number(a.year) : -1;
    const yearB = b.year ? Number(b.year) : -1;
    return yearB - yearA;
  });
  const activeRecognition =
    orderedRecognitions[activeIndex] ?? orderedRecognitions[0];
  const recognitionImage =
    activeRecognition.image ??
    "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(174).jpg";

  useEffect(() => {
    if (prefersReducedMotion || orderedRecognitions.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % orderedRecognitions.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [orderedRecognitions.length, prefersReducedMotion]);

  useEffect(() => {
    if (!selectedRecognition) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedRecognition(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedRecognition]);

  return (
    <div
      className="relative"
      role="list"
      aria-label="SAN TECH recognitions and awards"
    >
      <RecognitionCarousel
        items={orderedRecognitions}
        prefersReducedMotion={prefersReducedMotion}
        onSelect={setSelectedRecognition}
      />
      <div className="hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.button
            key={activeRecognition.title}
            type="button"
            onClick={() => setSelectedRecognition(activeRecognition)}
            initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, x: -16 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.28,
              ease: "easeOut",
            }}
            className="group block w-full max-w-xs overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-[0_8px_22px_rgba(10,31,68,0.06)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-secondary/50 hover:shadow-[0_14px_30px_rgba(10,31,68,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
            aria-label={`View details for ${activeRecognition.title}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <Image
                src={recognitionImage}
                alt={activeRecognition.imageAlt ?? activeRecognition.title}
                fill
                sizes="(min-width: 1024px) 384px, 100vw"
                className="object-contain object-center"
              />
              <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#0a1f44]">
                {activeRecognition.year || "Recognition"}
              </span>
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="text-sm font-bold leading-4 text-[#0a1f44] sm:text-base">
                {activeRecognition.title}
              </h3>
              <p className="mt-1 line-clamp-3 text-sm leading-5 text-[#68718a]">
                {activeRecognition.description}
              </p>
              <div className="mt-3 flex items-center justify-between gap-4 text-xs text-slate-500">
                <span>{t.recognitionSanTech}</span>
                <span className="inline-flex shrink-0 items-center gap-1.5 font-bold text-[#0a1f44] transition-colors group-hover:text-brand-secondary">
                  {t.viewDetailsLink}{" "}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </motion.button>
        </AnimatePresence>
      </div>

      <div className="hidden">
        <div className="mt-4 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-1.5"
            aria-label={`Recognition ${activeIndex + 1} of ${orderedRecognitions.length}`}
          >
            {orderedRecognitions.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${item.title}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all ${activeIndex === index ? "w-8 bg-[#0a1f44]" : "w-1.5 bg-slate-300 hover:bg-slate-400"}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setActiveIndex(
                  (activeIndex - 1 + orderedRecognitions.length) %
                    orderedRecognitions.length,
                )
              }
              aria-label="Previous recognition"
              className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white text-[#0a1f44] transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
            >
              <ArrowUpRight
                className="size-4 rotate-[225deg]"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveIndex((activeIndex + 1) % orderedRecognitions.length)
              }
              aria-label="Next recognition"
              className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white text-[#0a1f44] transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
            >
              <ArrowUpRight
                className="size-4 rotate-[-45deg]"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      {selectedRecognition &&
        createPortal(
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07152d]/55 p-4 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby="recognition-dialog-title"
              onMouseDown={() => setSelectedRecognition(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-2xl overflow-hidden rounde-md bg-white p-6 shadow-[0_24px_70px_rgba(7,21,45,0.25)] sm:p-8"
                onMouseDown={(event) => event.stopPropagation()}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: 16, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, y: 10, scale: 0.98 }
                }
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.22,
                  ease: "easeOut",
                }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedRecognition(null)}
                  aria-label="Close recognition details"
                  className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-white/80 text-[#0a1f44] shadow-sm transition-colors hover:bg-[#e8f1fc] hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>

                {selectedRecognition.image && (
                  <div className="relative -mx-6 -mt-6 mb-5 h-72 max-h-[60vh] overflow-hidden bg-[#07152d] sm:-mx-8 sm:-mt-8 sm:h-80">
                    <Image
                      src={selectedRecognition.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 672px, 100vw"
                      aria-hidden="true"
                      className="scale-110 object-cover opacity-30 blur-2xl"
                    />
                    <div className="absolute inset-0 bg-[#07152d]/35" />
                    <Image
                      src={selectedRecognition.image}
                      alt={
                        selectedRecognition.imageAlt ??
                        selectedRecognition.title
                      }
                      fill
                      sizes="(min-width: 640px) 672px, 100vw"
                      className="z-[1] object-contain"
                    />
                    <div className="absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-black/55 to-transparent" />
                    {selectedRecognition.badge && (
                      <span className="absolute bottom-3 left-4 z-[3] rounded-full bg-brand-cyan px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#07152d]">
                        {selectedRecognition.badge}
                      </span>
                    )}
                  </div>
                )}

                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
                  {selectedRecognition.year || "Recognition detail"}
                </p>
                <h2
                  id="recognition-dialog-title"
                  className="font-exo mt-2 max-w-xl pr-8 text-2xl font-bold leading-tight tracking-[-0.04em] text-[#0a1f44] sm:text-3xl"
                >
                  {selectedRecognition.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-[#68718a]">
                  {selectedRecognition.description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

export function FocusPanel({
  cmsAreas,
}: {
  cmsAreas?: import("@/lib/strapi").FocusArea[];
}) {
  const activeFocusAreas: readonly (readonly [string, string])[] =
    cmsAreas && cmsAreas.length > 0
      ? cmsAreas.map((a) => [a.label, a.description] as const)
      : focusAreas;
  const activeFocusIcons: readonly LucideIcon[] =
    cmsAreas && cmsAreas.length > 0
      ? cmsAreas.map((_a) => Code2) // icon stays as code fallback
      : focusIcons;
  const t = useUiCopy();

  const [selectedArea, setSelectedArea] = useState<{
    area: string;
    description: string;
    Icon: LucideIcon;
  } | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const focusRotations = [-6, 4, -3, 5, -5, 3, -4, 6, -2, 4, -5, 2] as const;

  useEffect(() => {
    if (!selectedArea) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedArea(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedArea]);

  return (
    <div className="focus-bubble-section relative min-h-0 overflow-hidden p-0">
      <BubbleMenu
        logo={
          <span className="font-exo text-xs font-black uppercase tracking-[0.16em]">
            {t.ourFocus}
          </span>
        }
        items={activeFocusAreas.map(([area], index) => ({
          label: area,
          href: `#focus-${index + 1}`,
          ariaLabel: `View ${area} capability details`,
          rotation: focusRotations[index] ?? 0,
          hoverStyles: { bgColor: "#0a1f44", textColor: "#ffffff" },
        }))}
        menuAriaLabel="Toggle SAN TECH focus areas"
        menuBg="#ffffff"
        menuContentColor="#0a1f44"
        useFixedPosition={false}
        openOnView
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.08}
        className="focus-bubble-menu"
        onItemClick={(_, index) => {
          const [area, description] = activeFocusAreas[index];
          const Icon = activeFocusIcons[index] ?? Code2;
          setSelectedArea({ area, description, Icon });
        }}
      />

      {/* Focus Area Dialog */}
      {selectedArea &&
        typeof document !== "undefined" &&
        createPortal(
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07152d]/55 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="focus-dialog-title"
            onMouseDown={() => setSelectedArea(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg rounde-md bg-white p-6 shadow-[0_24px_70px_rgba(7,21,45,0.25)] sm:p-8"
              onMouseDown={(event) => event.stopPropagation()}
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 16, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 0, y: 10, scale: 0.98 }
              }
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.22,
                ease: "easeOut",
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedArea(null)}
                aria-label="Close capability details"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-[#0a1f44] transition-colors hover:bg-[#e8f1fc] hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
              >
                <X className="size-4" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-[#edf4fa] text-brand-secondary">
                  <selectedArea.Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">
                    Capability
                  </p>
                  <h2
                    id="focus-dialog-title"
                    className="font-exo text-2xl font-bold leading-tight tracking-[-0.03em] text-[#0a1f44]"
                  >
                    {selectedArea.area}
                  </h2>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-base leading-7 text-[#526989]">
                  {selectedArea.description}
                </p>
              </div>
            </motion.div>
          </motion.div>,
          document.body,
        )}
    </div>
  );
}

export function CompanyProfilePanel({
  pdfUrl = "/images/SAN TECH COMPANY PROFILE (1).pdf",
  cmsContent,
}: {
  pdfUrl?: string;
  cmsContent?: LegacyContent | null;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-8">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
          Company profile
        </p>
        <h1 className="font-exo mt-4 max-w-xl text-xl font-normal leading-[1.18] tracking-[-0.035em] text-[#303755] sm:text-2xl lg:text-[2rem]">
          {cmsContent?.profileTitle ?? "Turning Ideas into Impact."}
        </h1>
        <p className="mt-6 max-w-xl text-justify text-base leading-7 text-[#68718a]">
          {cmsContent?.profileDescription ??
            "SAN TECH stands for Smart Applications and Networking Technology. Founded in Rwanda in 2019, with a branch in Bamako, Mali, we develop practical digital solutions, technology products, and technical capacity for organizations, businesses, institutions, and communities."}
        </p>
      </div>
      <div className="border-l border-slate-300 pl-4 lg:pl-6">
        <div>
          <CompanyProfilePdf url={pdfUrl} />
        </div>
        <div className="hidden mt-5 grid gap-4 border-t border-slate-300 pt-4 sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#7c879d]">
              Established
            </p>
            <p className="mt-2 text-sm font-bold text-[#0a1f44]">
              2019 · Rwanda
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#7c879d]">
              Footprint
            </p>
            <p className="mt-2 text-sm font-bold text-[#0a1f44]">
              Kigali · Bamako
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#7c879d]">
              Impact
            </p>
            <p className="mt-2 text-sm font-bold text-[#0a1f44]">
              47+ institutions · 2,550+ beneficiaries
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#7c879d]">
              Compliance
            </p>
            <p className="mt-2 text-sm font-bold text-[#0a1f44]">
              Certified Data Controller &amp; Processor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type CertificateItem = {
  title: string;
  issuer: string;
  image: string;
  file?: string;
  orientation: "portrait" | "landscape" | "square";
};

const certificateItems: readonly CertificateItem[] = [
  {
    title: "Data Processor Certificate",
    issuer:
      "National Cyber Security Authority · Data Protection and Privacy Office",
    image: "/images/SAN TECH Data Processor Certificate_page-0001.jpg",
    file: "/images/SAN TECH Data Processor Certificate.pdf",
    orientation: "portrait",
  },
  {
    title: "EdTech Trust Seal",
    issuer: "Digital Bridge Institute",
    image: "/certificates/edtech-trust-seal.png",
    orientation: "square",
  },
];

function CertificateGallery() {
  const [selectedCertificate, setSelectedCertificate] =
    useState<CertificateItem | null>(null);

  useEffect(() => {
    if (!selectedCertificate) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCertificate(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCertificate]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {certificateItems.map((certificate) => (
          <button
            key={certificate.title}
            type="button"
            onClick={() => setSelectedCertificate(certificate)}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-[0_8px_22px_rgba(10,31,68,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-secondary/50 hover:shadow-[0_14px_30px_rgba(10,31,68,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
          >
            <div
              className={`relative overflow-hidden bg-[#eef4fa] ${certificate.orientation === "portrait" ? "aspect-[3/4]" : "aspect-square"}`}
            >
              <Image
                src={certificate.image}
                alt={certificate.title}
                fill
                sizes="(min-width: 640px) 260px, 100vw"
                className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-bold leading-5 text-[#0a1f44]">
                {certificate.title}
              </p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#68718a]">
                {certificate.issuer}
              </p>
              <span className="mt-3 inline-flex text-[10px] font-black uppercase tracking-[0.14em] text-brand-secondary">
                View certificate{" "}
                <ArrowUpRight className="ml-1 size-3.5" aria-hidden="true" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedCertificate &&
        createPortal(
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07152d]/65 p-3 backdrop-blur-sm sm:p-6"
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
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-secondary">
                      Certificate
                    </p>
                    <h2
                      id="certificate-dialog-title"
                      className="font-exo mt-1 text-lg font-bold leading-tight text-[#0a1f44] sm:text-xl"
                    >
                      {selectedCertificate.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {selectedCertificate.issuer}
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
                    className={`relative mx-auto w-full ${selectedCertificate.orientation === "landscape" ? "h-[52svh] max-w-5xl" : selectedCertificate.orientation === "portrait" ? "h-[70svh] max-w-xl" : "h-[65svh] max-w-2xl"}`}
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
                      href={getInlinePdfUrl(selectedCertificate.file)}
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
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

export function CertificatePanel({
  cmsItems,
}: {
  cmsItems?: import("@/lib/strapi").Certificate[];
}) {
  return <CertificatePanelContent cmsItems={cmsItems} />;
}

type StandardItem = {
  title: string;
  issuer: string;
  description: string;
  image: string;
  imageAlt: string;
  url?: string;
};

const standardItems: readonly StandardItem[] = [
  {
    title: "EdTech Trust Seal",
    issuer: "Digital Bridge Institute",
    description:
      "A trust mark recognizing SAN TECH's contribution to practical digital learning and education technology.",
    image: "/certificates/edtech-trust-seal.png",
    imageAlt: "DBI Certified EdTech Trust Seal",
  },
];

export function StandardsPanel({
  cmsItems,
}: {
  cmsItems?: import("@/lib/strapi").Standard[];
}) {
  const t = useUiCopy();
  const activeStandards: readonly StandardItem[] =
    cmsItems && cmsItems.length > 0
      ? cmsItems.map((s) => ({
          title: s.title,
          issuer: s.issuer,
          description: s.description ?? "",
          image: s.image || "/images/seal.png",
          imageAlt: s.imageAlt ?? s.title,
          url: s.url ?? undefined,
        }))
      : standardItems;

  const [activeSlide, setActiveSlide] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const cardsPerSlide = 3;
  const slideCount = Math.max(
    1,
    Math.ceil(activeStandards.length / cardsPerSlide),
  );
  const visibleStandards = activeStandards.slice(
    activeSlide * cardsPerSlide,
    activeSlide * cardsPerSlide + cardsPerSlide,
  );

  // Auto-slide when more than 3 seals
  useEffect(() => {
    if (prefersReducedMotion || slideCount < 2) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideCount);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, slideCount]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-2xl">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
          {t.standardsTrust}
        </p>
        <h2 className="font-exo mt-2 text-2xl font-bold tracking-[-0.04em] text-[#0a1f44] sm:text-3xl">
          {t.trustBuiltIntoWork}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#68718a]">
          Our standards and trust seals make the care behind our products,
          learning programs, and institutional work easier to see.
        </p>
      </div>

      {/* Seals row — centered, no background */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeSlide}
          initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, x: -24 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.35,
            ease: "easeOut",
          }}
          className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 lg:gap-20"
        >
          {visibleStandards.map((standard) => {
            const sealImg = (
              <div className="group relative h-[180px] w-[180px] transition-transform duration-300 hover:-translate-y-1.5 sm:h-[220px] sm:w-[220px]">
                <Image
                  src={standard.image}
                  alt={standard.imageAlt}
                  fill
                  sizes="(min-width: 640px) 220px, 180px"
                  className="object-contain drop-shadow-[0_12px_20px_rgba(10,31,68,0.15)] transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            );

            return standard.url ? (
              <a
                key={standard.title}
                href={standard.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${standard.title} — ${standard.issuer}`}
                className="rounde-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-4"
              >
                {sealImg}
              </a>
            ) : (
              <div
                key={standard.title}
                aria-label={`${standard.title} — ${standard.issuer}`}
              >
                {sealImg}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Slide dot indicators — only shown when more than 3 seals */}
      {slideCount > 1 && (
        <div
          className="flex items-center justify-center gap-2"
          role="tablist"
          aria-label={`Standards page ${activeSlide + 1} of ${slideCount}`}
        >
          {Array.from({ length: slideCount }, (_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={activeSlide === index}
              aria-label={`Show standards page ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                activeSlide === index
                  ? "w-8 bg-[#0a1f44]"
                  : "w-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
