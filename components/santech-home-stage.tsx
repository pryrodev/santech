"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ChevronRight,
  Cpu,
  GraduationCap,
  MonitorCheck,
  PanelsTopLeft,
  Pause,
  Play,
  Rocket,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useMotionValue, useTransform } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useUiCopy } from "@/lib/use-ui-copy";

type StorySlide = {
  id: string;
  index: string;
  eyebrow: string;
  title?: string;
  body: string;
  detail: string;
  additional?: string;
  note?: string;
  variant?: "services";
  facts: { label: string; value: string }[];
  flow?: string[];
  groups?: { label: string; items: string }[];
  items?: string[];
};

export type PartnerBrand = {
  label: string;
  src: string;
  href?: string;
  showLabel?: boolean;
  displayLabel?: string;
  government?: boolean;
};

const storyCopyClass =
  "max-w-none text-[15px] leading-[1.45] tracking-[0.005em] text-justify text-slate-600 sm:text-[16px] min-[1440px]:text-[17px] 2xl:text-[18px]";

function ecosystemIcon(item: string) {
  if (item.startsWith("SAN TECH")) return Cpu;
  if (item.startsWith("SAN HUB")) return GraduationCap;
  if (item.startsWith("E-VISITORS")) return MonitorCheck;
  if (item.startsWith("Tech Forward")) return Rocket;
  if (item.startsWith("SAN CITY")) return Building2;
  return PanelsTopLeft;
}

function splitEcosystemItem(item: string) {
  const [label, ...descriptionParts] = item.split(/\s+[—“-]\s+/u);
  return { label, description: descriptionParts.join(" — ") };
}

function EcosystemSlideCards({
  items,
  onSelect,
}: {
  items: string[];
  onSelect: (item: string) => void;
}) {
  return (
    <div
      className="mt-5 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3"
      aria-label="SAN TECH ecosystem products"
    >
      {items.map((item) => {
        const { label } = splitEcosystemItem(item);
        const Icon = ecosystemIcon(item);

        return (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            aria-haspopup="dialog"
            className="group flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-3 text-left transition-[border-color,background-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-brand-cyan hover:bg-white hover:shadow-[0_8px_18px_rgba(10,31,68,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-inset sm:px-3.5"
          >
            <span
              className="grid size-8 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-[#0a1f44] shadow-sm"
              aria-hidden="true"
            >
              <Icon className="size-4" strokeWidth={1.8} />
            </span>
            <span className="min-w-0 flex-1 text-[13px] font-bold leading-5 text-[#0a1f44] sm:text-[14px] min-[1440px]:text-[15px] 2xl:text-[15px]">
              {label}
            </span>
            <ChevronRight
              className="size-3.5 shrink-0 text-brand-secondary transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}

const legacyStorySlides: StorySlide[] = [
  {
    id: "about",
    index: "01",
    eyebrow: "SAN TECH / ABOUT SAN TECH",
    title: "Making your ideas happen with us!",
    body: "SAN TECH is technological and digital transformation company that develops smart systems, AI, IoT, cybersecurity, embedded and digital solutions while building technology skills and innovation capacity through SAN HUB.",
    detail:
      "SAN TECH helps insitutions, organizations and innovators  to move from an idea or problem → design → development → deployment → impact.",
    facts: [
      { label: "Established", value: "2019" },
      { label: "Focus", value: "Digital Transformation" },
      { label: "Promise", value: "Practical impact" },
    ],
  },
  {
    id: "mission",
    index: "02",
    eyebrow: "SAN TECH / TECHNOLOGIES",
    title: "Technology built around real-world challenges.",
    body: "SAN TECH works at the intersection of software engineering, artificial intelligence, cybersecurity, IoT, embedded systems, robotics, data, and digital transformation.",
    detail:
      "We develop technology from the ground up—from identifying a problem and researching the context to prototyping, testing, deploying, and supporting systems in real environments.",
    facts: [
      { label: "Explore", value: "AI & data systems" },
      { label: "Connect with us", value: "IoT & devices" },
      { label: "Protect", value: "People & information" },
    ],
  },
  {
    id: "services",
    index: "03",
    eyebrow: "SAN TECH / SERVICES",
    title: "From a complex need to a dependable system.",
    body: "We design and develop software, web and mobile platforms, AI solutions, cybersecurity programs, IoT systems, and digital transformation services.",
    detail:
      "Our work also covers systems integration, technology infrastructure, research and innovation, product development, training, and consultancy—delivered around the people who use it.",
    facts: [
      { label: "Start", value: "Assess the challenge" },
      { label: "Build", value: "Design & integrate" },
      { label: "Grow", value: "Train & support" },
    ],
  },
  {
    id: "san-hub",
    index: "04",
    eyebrow: "SAN TECH / SAN HUB",
    title: "Learn. Build. Innovate. Impact.",
    body: "SAN HUB is SAN TECH’s learning, innovation, talent, and entrepreneurship ecosystem for learners, innovators, researchers, mentors, trainers, institutions, and businesses.",
    detail:
      "The Hub connects technology training, innovation development, career development, entrepreneurship, internships, mentorship, scholarships, and community opportunities.",
    facts: [
      { label: "Learn", value: "Practical technology" },
      { label: "Build", value: "Ideas into products" },
      { label: "Join", value: "A growing ecosystem" },
    ],
  },
  {
    id: "e-visitors",
    index: "05",
    eyebrow: "SAN TECH / E-VISITORS",
    title: "Smart visitor, access, and attendance management.",
    body: "E-Visitors is SAN TECH’s flagship platform for managing visitors, access, attendance, movements, and institutional security.",
    detail:
      "Registration, appointments, ID and passport scanning, OCR, access cards, gate management, watchlists, vehicle tracking, dashboards, role-based access, and audit logs work together in one system.",
    facts: [
      { label: "Register", value: "Visitors & appointments" },
      { label: "Verify", value: "Identity with OCR" },
      { label: "Report", value: "Access & attendance" },
    ],
  },
  {
    id: "tech-pulse",
    index: "06",
    eyebrow: "SAN TECH / TECH PULSE",
    title: "Stay close to the ideas shaping a connected Africa.",
    body: "Tech Pulse is SAN TECH’s media and knowledge platform for company news, opportunities, tenders, events, research, technology trends, and impact stories.",
    detail:
      "It gives partners, learners, innovators, and technology users one place to discover useful signals, share knowledge, and find the next opportunity to participate.",
    facts: [
      { label: "Follow", value: "News & trends" },
      { label: "Find", value: "Jobs & tenders" },
      { label: "Join", value: "Events & research" },
    ],
  },
];

const storySlides: StorySlide[] = [
  {
    id: "about",
    index: "01",
    eyebrow: "SAN TECH / ABOUT SAN TECH",
    title: "Making your ideas happen with us!",
    body: "SAN TECH is technological and digital transformation company that develops smart systems, AI, IoT, cybersecurity, embedded and digital solutions while building technology skills and innovation development building through SAN HUB.",
    detail:
      "SAN TECH helps insitutions, organizations and innovators to move from an idea or problem \u2192 design \u2192 development \u2192 deployment \u2192 impact.",
    additional:
      "SAN TECH work closer with organizations, businesses, institutions, innovators, researchers, and communities to design, develop, deploy, integrate, and support technology solutions from scratch.",
    facts: [
      { label: "Established", value: "2019" },
      { label: "Focus", value: "Digital transformation" },
      { label: "Promise", value: "Practical impact" },
    ],
  },
  {
    id: "services",
    index: "02",
    eyebrow: "SAN TECH / SERVICES",
    variant: "services",
    body: "SAN TECH (Smart Applications and Networking Technology) provides end-to-end technology services focused on digital transformation, software engineering, artificial intelligence, cybersecurity, IoT, infrastructure, innovation, and capacity building. SAN TECH focused on digital transformation, software engineering, artificial intelligence, cybersecurity, IoT, infrastructure, research, innovation, and technology capacity building.",
    detail: "SAN TECH Service Model",
    additional: "SAN TECH \u2014 Turning Ideas into Impact.",
    note: "We bring strategy, engineering, and capacity building together so solutions can keep working after launch.",
    flow: [
      "Ideate",
      "Design",
      "Develop",
      "Integrate",
      "Deploy",
      "Train",
      "Support",
      "Scale",
    ],
    facts: [],
  },
  {
    id: "approach",
    index: "03",
    eyebrow: "SAN TECH / APPROACH",
    title: "Our Approach",
    body: "We believe technology should move beyond ideas and become usable, scalable, sustainable solutions.",
    detail: "Our approach follows:",
    flow: [
      "Ideate",
      "Design",
      "Develop",
      "Test",
      "Deploy",
      "Integrate",
      "Train",
      "Scale",
      "Impact",
    ],
    additional:
      "We work closely with clients and partners to understand their challenges, design appropriate solutions, develop and test the technology, deploy it within their operational environment, train users, and provide continuous technical support.",
    note: "Each stage gives the next one a stronger foundation: evidence improves design, testing improves trust, and training improves adoption.",
    facts: [],
  },
  {
    id: "ecosystem",
    index: "04",
    eyebrow: "SAN TECH / ECOSYSTEM",
    body: "SAN TECH develops an ecosystem that connects ideas, technology, talent, research, investment, institutions, businesses, and end users.",
    detail: "Our ecosystem includes:",
    note: "The ecosystem works as a connected network: learning develops talent, research informs solutions, partners open opportunities, and deployed products create evidence for the next idea.",
    items: [
      "SAN TECH",
      "SAN HUB",
      "E-VISITORS",
      "Tech Forward Live",
      "SAN CITY",
      "Custom Enterprise Platforms",
    ],
    facts: [],
  },
  {
    id: "value-proposition",
    index: "05",
    eyebrow: "SAN TECH / VALUE PROPOSITION",
    body: "SAN TECH transforms ideas, operational challenges and research concepts into practical technology products and scalable digital solutions.",
    detail:
      "SAN TECH combines engineering + innovation + training + implementation + ecosystem development so that technology can move from an idea to a deployed and measurable solution.",
    note: "This combination helps us respond to immediate operational needs while also supporting longer-term transformation goals.",
    groups: [
      { label: "Engineering", items: "Software, platforms, integrations" },
      { label: "Innovation", items: "Research, prototypes, new possibilities" },
      { label: "Capability", items: "Training, implementation, adoption" },
    ],
    facts: [
      { label: "Core positioning", value: "Turning Ideas into Impact" },
      { label: "Motto", value: "Innovate • Empower • Deliver" },
    ],
  },
  {
    id: "long-term-direction",
    index: "06",
    eyebrow: "SAN TECH / LONG-TERM DIRECTION",
    title: "Build the African technology ecosystem.",
    body: "Our broader ambition is to connect inventors, researchers, developers, industry, government, investors, decision makers, and end users.",
    detail:
      "The objective is more Local Innovation, stronger digital capabilities, and more Work & Enterprise opportunities with less dependence on imported solutions.",
    note: "We are building toward an ecosystem where African talent and institutions can create, own, and scale technology that responds to local realities.",
    flow: [
      "Inventors",
      "Researchers",
      "Developers",
      "Industry",
      "Government",
      "Investors",
      "Decision makers",
      "End users",
    ],
    facts: [
      { label: "Direction", value: "Local Innovation" },
      { label: "Opportunity", value: "Work & Enterprise" },
      { label: "Result", value: "Digital Capability" },
    ],
  },
  {
    id: "development-mode",
    index: "07",
    eyebrow: "SAN TECH / DEVELOPMENT MODEL",
    title: "Work across the complete technology lifecycle.",
    body: "Our implementation cycle carries each solution from an early idea through research, delivery, adoption, and measurable impact.",
    detail:
      "This allows SAN TECH to work across the complete technology lifecycle rather than only supplying software or hardware.",
    note: "Staying involved across the lifecycle keeps teams close to the work after launch, using feedback and evidence to improve what already exists.",
    flow: [
      "Ideate",
      "Research",
      "Design",
      "Develop",
      "Test",
      "Pilot",
      "Implement",
      "Train",
      "Scale",
      "Measure impact",
    ],
    facts: [
      { label: "Method", value: "Lifecycle delivery" },
      { label: "Measure", value: "Adoption and results" },
      { label: "Scale", value: "Secure and sustainable" },
    ],
  },
  {
    id: "stakeholders",
    index: "08",
    eyebrow: "SAN TECH / STAKEHOLDERS",
    title: "Technology grows through shared ownership.",
    body: "We work with the institutions, organizations, and people who shape the environments where technology must create value.",
    detail:
      "Our stakeholders bring context, expertise, resources, questions, and lived experience that make solutions more useful and ready for adoption.",
    note: "We listen to each stakeholder group early so the final solution reflects real constraints, responsibilities, and opportunities.",
    items: [
      "Government institutions",
      "Banks and financial institutions",
      "Corporates and SMEs",
      "Hospitals",
      "Schools and universities",
      "NGOs and development organizations",
      "Industrial companies",
      "Property and estate managers",
      "Entrepreneurs and startups",
      "Researchers and innovators",
      "Youth and technology learners",
      "Communities and end users",
    ],
    facts: [],
  },
];

const impactStats = [
  [40, "+", "organizations & clients served"],
  [2500, "+", "SAN HUB beneficiaries"],
  [17, "+", "countries reached"],
  [15, "+", "technology professionals"],
  [54, "+", "startup / innovation projects"],
  [700, "+", "jobs & opportunities influenced"],
  [10, "+", "years combined leadership experience"],
] as const;

function ImpactCount({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0);
  const displayValue = useTransform(
    count,
    (current) => `${Math.round(current).toLocaleString("en-US")}${suffix}`,
  );
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { amount: 0.6 });

  useEffect(() => {
    if (!isInView) {
      count.set(0);
      return;
    }

    const controls = animate(count, value, {
      duration: value < 50 ? 1.6 : 0.75,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [count, isInView, value]);

  return <motion.span ref={counterRef}>{displayValue}</motion.span>;
}

function ImpactMarquee({
  stats,
}: {
  stats: readonly (readonly [number, string, string])[];
}) {
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [loopWidth, setLoopWidth] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const group = firstGroupRef.current;
    if (!group) return;

    const updateWidth = () => setLoopWidth(group.getBoundingClientRect().width);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!loopWidth || hovered) return;
    const next = x.get() - delta * 0.012;
    x.set(next <= -loopWidth ? next + loopWidth : next);
  });

  return (
    <div
      className="min-w-0 flex-1 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="SAN TECH impact statistics"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.div
        style={{ x }}
        className="flex w-max select-none whitespace-nowrap"
      >
        {[0, 1].map((group) => (
          <div
            ref={group === 0 ? firstGroupRef : undefined}
            key={group}
            className="flex shrink-0 items-center gap-5 pr-5 sm:gap-7 sm:pr-7 2xl:gap-10 2xl:pr-10"
          >
            {stats.map(([value, suffix, label]) => (
              <div
                key={`${group}-${label}`}
                className="min-w-[96px] shrink-0 sm:min-w-[116px] 2xl:min-w-[130px]"
              >
                <p className="font-exo text-[clamp(1.15rem,2vw,2rem)] font-black leading-none tracking-[-0.06em] text-[#0a1f44] min-[1440px]:text-[2.15rem]">
                  <ImpactCount value={value} suffix={suffix} />
                </p>
                <p className="mt-1 max-w-[140px] whitespace-normal text-[8px] font-bold uppercase leading-tight tracking-[0.02em] text-slate-500 sm:text-[9px] min-[1440px]:text-[10px]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function StoryPlaybackIcon({ playing }: { playing: boolean }) {
  return (
    <motion.svg
      viewBox="4 4 28 28"
      className="size-7"
      fill="none"
      aria-hidden="true"
      animate={{ rotate: playing ? 360 : 0 }}
      transition={{
        duration: 8,
        repeat: playing ? Infinity : 0,
        ease: "linear",
      }}
      style={{ transformOrigin: "50% 50%" }}
    >
      <circle
        cx="18"
        cy="18"
        r="12.5"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
        strokeDasharray="2 3"
      />
      <path
        d="M6.5 18a11.5 11.5 0 0 1 8-10.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="m12 6.3 3.2.5-1.5 2.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.5 18a11.5 11.5 0 0 1-8 10.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="18" cy="18" r="3" fill="currentColor" />
      {playing ? (
        <>
          <path
            d="M11 13.5c1.7 2.8 1.7 6.2 0 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M25 13.5c-1.7 2.8-1.7 6.2 0 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>
      ) : (
        <path d="m12.5 14 8 4-8 4v-8Z" fill="currentColor" />
      )}
    </motion.svg>
  );
}

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/santechinnovate",
    icon: FaFacebookF,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@santechinnovate",
    icon: FaYoutube,
  },
  {
    label: "X / Twitter",
    href: "https://twitter.com/santechinnovate",
    icon: FaXTwitter,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/santechinnovate",
    icon: FaLinkedinIn,
  },
  { label: "WhatsApp", href: "https://wa.me/250780309833", icon: FaWhatsapp },
  {
    label: "Instagram",
    href: "https://www.instagram.com/santechinnovate",
    icon: FaInstagram,
  },
];

export const partnerBrands: PartnerBrand[] = [
  {
    label: "Pallotti Presse Ltd",
    src: "/palloti.png",
    href: "https://pallottipresse.com/",
    showLabel: true,
  },
  {
    label: "RICH Ubuzima",
    src: "/richubuzima.png",
    href: "https://richubuzima.rw/",
  },
  { label: "H&M Group", src: "/H&M-Logo.png", href: "https://handmgroup.rw/" },
  {
    label: "Eva Wellness Spa",
    src: "/eva_spa.jpg",
    href: "https://www.evawellnessspa.com/",
  },
  {
    label: "BNR",
    src: "/bnr-logo.webp",
    href: "https://www.bnr.rw/",
    showLabel: true,
  },
];

function PartnerMark({ partner }: { partner: PartnerBrand }) {
  const content = (
    <>
      <span
        className={`relative block h-10 shrink-0 sm:h-11 ${partner.government ? "w-10" : partner.showLabel ? "w-12" : "w-20 sm:w-24 2xl:w-28"}`}
      >
        <Image
          src={partner.src}
          alt={partner.label}
          fill
          sizes={
            partner.government || partner.showLabel
              ? "48px"
              : "(min-width: 1536px) 128px, (min-width: 640px) 112px, 96px"
          }
          className="object-contain mix-blend-multiply"
        />
      </span>
      {(partner.government || partner.showLabel) && (
        <span className="font-exo text-sm font-bold tracking-[-0.02em] text-slate-600">
          {partner.displayLabel ?? partner.label}
        </span>
      )}
    </>
  );

  if (partner.href) {
    return (
      <a
        href={partner.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Visit ${partner.label}`}
        title={`Visit ${partner.label}`}
        className="inline-flex h-8 shrink-0 items-center gap-2 transition-opacity hover:opacity-70"
      >
        {content}
      </a>
    );
  }

  return (
    <span
      className="inline-flex h-8 shrink-0 items-center gap-2"
      title={partner.label}
    >
      {content}
    </span>
  );
}

export function PartnerMarquee({
  partners = partnerBrands,
  direction: initialDirection = -1,
}: {
  partners?: readonly PartnerBrand[];
  direction?: 1 | -1;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const direction = useRef(initialDirection);
  const [loopWidth, setLoopWidth] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const group = firstGroupRef.current;
    if (!group) return;

    const updateWidth = () => {
      const width = group.getBoundingClientRect().width;
      setLoopWidth(width);
      if (initialDirection === 1 && x.get() === 0) x.set(-width);
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!loopWidth || hovered || dragging) return;
    const next = x.get() + direction.current * delta * 0.035;
    if (next <= -loopWidth) x.set(next + loopWidth);
    else if (next >= 0) x.set(next - loopWidth);
    else x.set(next);
  });

  return (
    <div
      className="min-w-0 flex-1 cursor-grab overflow-hidden active:cursor-grabbing"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Drag partner and client logos left or right"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        drag="x"
        dragMomentum={false}
        dragElastic={0.08}
        onDragStart={() => setDragging(true)}
        onDragEnd={(_, info) => {
          if (Math.abs(info.velocity.x) > 10)
            direction.current = info.velocity.x > 0 ? 1 : -1;
          setDragging(false);
        }}
        className="flex w-max select-none whitespace-nowrap"
      >
        {[0, 1].map((group) => (
          <div
            ref={group === 0 ? firstGroupRef : undefined}
            key={group}
            className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4 2xl:gap-5 2xl:pr-5"
          >
            {partners.map((partner) => (
              <PartnerMark
                key={`${group}-${partner.label}`}
                partner={partner}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function SantechHomeStage({
  stats = impactStats as readonly (readonly [number, string, string])[],
  partners = partnerBrands,
  slides = storySlides,
  videoSrc,
  videoPoster,
}: {
  stats?: readonly (readonly [number, string, string])[];
  partners?: readonly PartnerBrand[];
  slides?: readonly StorySlide[];
  videoSrc?: string | null;
  videoPoster?: string | null;
}) {
  const t = useUiCopy();
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [storyPlaying, setStoryPlaying] = useState(true);
  const [storyHovered, setStoryHovered] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slideArrowRef = useRef<HTMLSpanElement>(null);
  const [ecosystemDialogItem, setEcosystemDialogItem] = useState<string | null>(
    null,
  );
  const [storyScale, setStoryScale] = useState(1);
  const activeStory = slides[activeStoryIndex];
  const isApproachStory = activeStory.id === "approach";
  const isEcosystemStory = activeStory.id === "ecosystem";
  const shouldHighlightStoryDetail =
    activeStory.id === "services" || isApproachStory || isEcosystemStory;
  const isStakeholderStory = activeStory.id === "stakeholders";
  const isEcosystemDialogOpen =
    isEcosystemStory && ecosystemDialogItem !== null;
  const prefersReducedMotion = useReducedMotion();
  const storyPanelRef = useRef<HTMLElement>(null);
  const storyBodyRef = useRef<HTMLDivElement>(null);
  const storyContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = storyPanelRef.current;
    if (!panel) return;

    const checkStoryFit = () => {
      const body = storyBodyRef.current;
      const content = storyContentRef.current;
      if (!body || !content || body.clientHeight <= 0) return;

      const availableHeight = body.clientHeight - 8;
      const contentHeight = content.scrollHeight;
      const nextScale =
        contentHeight > availableHeight
          ? Math.max(0.72, Math.min(1, availableHeight / contentHeight))
          : 1;

      setStoryScale((current) =>
        Math.abs(current - nextScale) < 0.01 ? current : nextScale,
      );
    };

    const observer = new ResizeObserver(checkStoryFit);
    observer.observe(panel);
    if (storyBodyRef.current) observer.observe(storyBodyRef.current);
    const timer = window.setTimeout(checkStoryFit, 520);
    checkStoryFit();

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [activeStoryIndex]);

  useEffect(() => {
    if (!isEcosystemDialogOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEcosystemDialogItem(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isEcosystemDialogOpen]);

  useGSAP(
    () => {
      const arrow = slideArrowRef.current;
      if (
        !arrow ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const tween = gsap.to(arrow, {
        x: 5,
        opacity: 0.45,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      return () => tween.kill();
    },
    { dependencies: [] },
  );

  useEffect(() => {
    if (!storyPlaying || storyHovered) return;
    const timer = window.setTimeout(() => {
      setEcosystemDialogItem(null);
      setStoryScale(1);
      setActiveStoryIndex((current) => (current + 1) % slides.length);
    }, 6800);

    return () => window.clearTimeout(timer);
  }, [activeStoryIndex, storyPlaying, storyHovered]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;
    video.muted = true;
    void video
      .play()
      .then(() => setVideoPlaying(true))
      .catch(() => setVideoPlaying(false));
  }, [videoSrc]);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function toggleVideoPlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video
        .play()
        .then(() => setVideoPlaying(true))
        .catch(() => setVideoPlaying(false));
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  }

  return (
    <div className="home-stage lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:overflow-hidden">
      <section className="home-stage__content bg-transparent px-3 py-3 text-[#0c1230] sm:px-5 sm:py-5 lg:min-h-0 lg:flex-1 lg:overflow-hidden lg:px-7 lg:py-3">
        <div className="home-stage__inner relative z-10 mx-auto flex min-h-0 w-full max-w-[1440px] flex-col lg:h-full">
          <div className="home-stage__grid grid min-h-0 gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.68fr)] lg:gap-4">
            <div className="home-stage__video relative flex aspect-[16/10] min-h-0 flex-col overflow-hidden bg-[#111735] sm:aspect-video lg:h-full lg:aspect-auto">
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <Image
                  src={videoPoster || "/images/image-when-video-loadings.png"}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className={`object-cover transition-opacity duration-500 ${videoReady && !videoFailed && videoSrc ? "opacity-0" : "opacity-100"}`}
                  aria-hidden="true"
                />
                {videoSrc ? (
                  <video
                    ref={videoRef}
                    key={videoSrc}
                    src={videoSrc}
                    className={`relative size-full object-cover transition-opacity duration-500 ${videoReady && !videoFailed ? "opacity-100" : "opacity-0"}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onCanPlay={() => {
                      setVideoFailed(false);
                      setVideoReady(true);
                    }}
                    onPlay={() => {
                      setVideoFailed(false);
                      setVideoReady(true);
                      setVideoPlaying(true);
                    }}
                    onPause={() => setVideoPlaying(false)}
                    onError={() => {
                      setVideoFailed(true);
                      setVideoReady(false);
                      setVideoPlaying(false);
                    }}
                    aria-label="E-Visitors visitor management platform"
                  />
                ) : null}
              </div>
              <div className="flex shrink-0 items-center justify-between gap-4 bg-[#111735] px-4 py-3 text-white sm:px-6">
                <div className="min-w-0">
                  <p className="truncate text-[9px] font-black uppercase tracking-[0.2em] text-white">
                    FLAGSHIP PRODUCT: E-VISITOR SYSTEM
                  </p>
                  <p className="mt-1 truncate text-xs font-semibold leading-snug sm:text-sm">
                    {t.bringEVisitors}
                  </p>
                </div>
                {videoSrc ? (
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleSound}
                      className="grid size-8 place-items-center border border-white/30 text-white transition-colors hover:bg-white hover:text-[#111735]"
                      aria-label={
                        muted ? "Turn video sound on" : "Mute video sound"
                      }
                    >
                      {muted ? (
                        <VolumeX className="size-3.5" />
                      ) : (
                        <Volume2 className="size-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={toggleVideoPlayback}
                      className="grid size-8 place-items-center border border-white/30 text-white transition-colors hover:bg-white hover:text-[#111735]"
                      aria-label={
                        videoPlaying
                          ? "Pause E-Visitors video"
                          : "Play E-Visitors video"
                      }
                      aria-pressed={!videoPlaying}
                    >
                      {videoPlaying ? (
                        <Pause className="size-3.5" />
                      ) : (
                        <Play className="size-3.5" />
                      )}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <article
              data-home-story
              data-story-scale={storyScale.toFixed(2)}
              ref={storyPanelRef}
              className="relative flex min-h-[360px] flex-col overflow-hidden border border-slate-300/80 bg-white p-4 sm:min-h-[420px] sm:p-5 lg:h-full lg:min-h-0 2xl:p-6"
              onMouseEnter={() => setStoryHovered(true)}
              onMouseLeave={() => setStoryHovered(false)}
            >
              <div className="flex min-w-0 items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <p className="min-w-0 truncate text-[10px] font-black uppercase tracking-[0.2em] text-[#0a1f44] min-[1440px]:text-[11px]">
                  {activeStory.eyebrow}
                </p>
                <div
                  className="flex shrink-0 items-center gap-1.5"
                  aria-label="SAN TECH story slides"
                >
                  <span
                    ref={slideArrowRef}
                    className="inline-flex shrink-0"
                    aria-hidden="true"
                  >
                    <Image
                      src="/undraw_arrow.svg"
                      alt=""
                      width={62}
                      height={17}
                      className="h-auto w-8 sm:w-12 2xl:w-[62px]"
                    />
                  </span>
                  <div className="flex items-center gap-1">
                    {slides.map((slide, index) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => {
                          setStoryScale(1);
                          setActiveStoryIndex(index);
                          setEcosystemDialogItem(null);
                        }}
                        aria-label={`Show slide ${slide.index}: ${slide.eyebrow}`}
                        aria-current={
                          index === activeStoryIndex ? "true" : undefined
                        }
                        className={`px-1 text-[11px] font-black tracking-[0.12em] transition-colors duration-200 min-[1440px]:text-[12px] ${index === activeStoryIndex ? "text-[#0a1f44]" : "text-slate-400 hover:text-[#0a1f44]"}`}
                      >
                        {slide.index}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div ref={storyBodyRef} className="flex min-h-0 flex-1 flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStory.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-full flex-1 flex-col pb-10 pt-1"
                  >
                    <div
                      ref={storyContentRef}
                      className="flex min-h-full flex-1 flex-col"
                      style={{
                        transform: `scale(${storyScale})`,
                        transformOrigin: "top left",
                        width: `${100 / storyScale}%`,
                      }}
                    >
                      {activeStory.title && (
                        <h1 className="font-exo mt-2 max-w-3xl text-[clamp(1.2rem,1.55vw,2.1rem)] font-bold leading-[1.08] tracking-[-0.025em] text-[#0c1230] min-[1440px]:text-[1.5rem]">
                          {activeStory.title}
                        </h1>
                      )}
                      {activeStory.variant === "services" ? (
                        <div className="mt-2 w-full max-w-none self-start">
                          <p
                            className={`w-full ${storyCopyClass} text-slate-700`}
                          >
                            <strong>
                              SAN TECH (Smart Applications and Networking
                              Technology)
                            </strong>{" "}
                            provides end-to-end technology services focused on{" "}
                            <strong>
                              digital transformation, software engineering,
                              artificial intelligence, cybersecurity, IoT,
                              infrastructure, innovation, and capacity building.
                            </strong>{" "}
                            SAN TECH focused on{" "}
                            <strong>
                              digital transformation, software engineering,
                              artificial intelligence, cybersecurity, IoT,
                              infrastructure, research, innovation, and
                              technology capacity building.
                            </strong>
                          </p>
                          <p
                            className={`mt-2 w-full ${storyCopyClass} text-brand-secondary`}
                          >
                            {activeStory.detail}
                          </p>
                          {activeStory.flow && (
                            <div className="mt-4 flex w-full max-w-none flex-wrap items-center justify-start gap-x-2 gap-y-1 text-left">
                              {activeStory.flow.map((step, index) => (
                                <Fragment key={step}>
                                  <span className="text-left text-[12px] font-bold uppercase tracking-[0.02em] text-[#0a1f44] sm:text-[14px] 2xl:text-[16px]">
                                    {step}
                                  </span>
                                  {index < activeStory.flow!.length - 1 && (
                                    <span
                                      className="text-[12px] font-bold text-[#0a1f44] sm:text-[14px] 2xl:text-[16px]"
                                      aria-hidden="true"
                                    >
                                      {"\u2192"}
                                    </span>
                                  )}
                                </Fragment>
                              ))}
                            </div>
                          )}
                          {activeStory.additional && (
                            <p
                              className={`mt-2 w-full ${storyCopyClass} font-bold text-[#0a1f44]`}
                            >
                              {activeStory.additional}
                            </p>
                          )}
                          {activeStory.note && (
                            <p
                              className={`mt-2 w-full ${storyCopyClass} text-slate-600`}
                            >
                              {activeStory.note}
                            </p>
                          )}
                        </div>
                      ) : (
                        <>
                          <p className={`mt-2 ${storyCopyClass}`}>
                            {activeStory.body}
                          </p>
                          <p
                            className={`mt-3 ${storyCopyClass} ${shouldHighlightStoryDetail ? "text-brand-secondary" : ""}`}
                          >
                            {activeStory.detail}
                          </p>
                          {isApproachStory && activeStory.flow && (
                            <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                              {activeStory.flow.map((step, index) => (
                                <span
                                  key={step}
                                  className="inline-flex items-center gap-1"
                                >
                                  <span className="px-0.5 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-[#0a1f44] sm:text-[12px]">
                                    {step}
                                  </span>
                                  {index < activeStory.flow!.length - 1 && (
                                    <span
                                      className="text-[12px] text-[#0a1f44]"
                                      aria-hidden="true"
                                    >
                                      {"\u2192"}
                                    </span>
                                  )}
                                </span>
                              ))}
                            </div>
                          )}
                          {activeStory.additional && (
                            <p className={`mt-3 ${storyCopyClass}`}>
                              {activeStory.additional}
                            </p>
                          )}
                          {activeStory.note && (
                            <p className={`mt-3 ${storyCopyClass}`}>
                              {activeStory.note}
                            </p>
                          )}
                          {!isApproachStory && activeStory.flow && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {activeStory.flow.map((step, index) => (
                                <span
                                  key={step}
                                  className="inline-flex items-center gap-1"
                                >
                                  <span className="px-0.5 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-[#0a1f44] sm:text-[12px]">
                                    {step}
                                  </span>
                                  {index < activeStory.flow!.length - 1 && (
                                    <span
                                      className="text-[12px] text-[#0a1f44]"
                                      aria-hidden="true"
                                    >
                                      {"\u2192"}
                                    </span>
                                  )}
                                </span>
                              ))}
                            </div>
                          )}
                        </>
                      )}

                      {activeStory.groups && (
                        <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2">
                          {activeStory.groups.map((group) => (
                            <div key={group.label} className="min-w-0">
                              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-brand-secondary sm:text-[12px] min-[1440px]:text-[13px]">
                                {group.label}
                              </p>
                              <p className="mt-0.5 text-[13px] leading-[1.35] text-slate-500 sm:text-[14px] min-[1440px]:text-[15px]">
                                {group.items}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeStory.items && isEcosystemStory && (
                        <EcosystemSlideCards
                          items={activeStory.items}
                          onSelect={(item) => {
                            setStoryPlaying(false);
                            setEcosystemDialogItem(item);
                          }}
                        />
                      )}

                      {activeStory.items && !isEcosystemStory && (
                        <div
                          className={`${isStakeholderStory ? "mt-4 gap-x-6 gap-y-2.5 border-y border-slate-200 py-3" : "mt-3 gap-x-3 gap-y-1.5 border-y border-slate-200 py-2"} grid grid-cols-1 sm:grid-cols-2`}
                        >
                          {activeStory.items.map((item) => (
                            <p
                              key={item}
                              className={`${isStakeholderStory ? "text-[13px] leading-[1.35] sm:text-[14px] min-[1440px]:text-[15px] 2xl:text-[15px]" : "text-[10px] leading-[1.25]"} min-w-0 text-left text-slate-600`}
                            >
                              <span
                                className="mr-1 text-brand-cyan"
                                aria-hidden="true"
                              >
                                +
                              </span>
                              {item}
                            </p>
                          ))}
                        </div>
                      )}

                      {activeStory.facts.length > 0 && (
                        <div
                          className={`mt-auto grid ${activeStory.facts.length === 2 ? "grid-cols-2" : "grid-cols-3"} gap-2 border-y border-slate-200 py-2`}
                        >
                          {activeStory.facts.map((fact) => (
                            <div key={fact.label} className="min-w-0 px-1">
                              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-600 sm:text-[10px]">
                                {fact.label}
                              </p>
                              <p className="mt-0.5 text-[12px] font-bold leading-tight text-[#0a1f44] sm:text-[13px]">
                                {fact.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={() => setStoryPlaying((playing) => !playing)}
                aria-label={
                  storyPlaying
                    ? "Pause homepage slides"
                    : "Play homepage slides"
                }
                aria-pressed={!storyPlaying}
                className="absolute bottom-2 right-2 grid size-12 place-items-center rounded-full bg-transparent text-[#0a1f44] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1f44] focus-visible:ring-offset-2"
              >
                <StoryPlaybackIcon playing={storyPlaying} />
              </button>
            </article>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isEcosystemDialogOpen &&
          ecosystemDialogItem &&
          (() => {
            const { label, description } =
              splitEcosystemItem(ecosystemDialogItem);
            return (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07152d]/60 p-4 backdrop-blur-sm sm:p-6"
                role="presentation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onMouseDown={(event) => {
                  if (event.currentTarget === event.target)
                    setEcosystemDialogItem(null);
                }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="ecosystem-dialog-title"
                  className="w-full max-w-lg rounde-md border border-white/70 bg-white p-5 shadow-[0_28px_80px_rgba(7,21,45,0.28)] sm:p-7"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.01 : 0.22,
                    ease: "easeOut",
                  }}
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">
                        SAN TECH / Ecosystem
                      </p>
                      <h2
                        id="ecosystem-dialog-title"
                        className="font-exo mt-2 text-xl font-bold leading-tight tracking-[-0.035em] text-[#0a1f44] sm:text-2xl"
                      >
                        {label}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEcosystemDialogItem(null)}
                      aria-label="Close ecosystem detail"
                      className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-slate-600 sm:text-base">
                    {description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })()}
      </AnimatePresence>

      <div
        data-home-metrics
        className="grid w-full min-h-[150px] shrink-0 grid-cols-1 border-t border-slate-300/80 bg-white text-[11px] font-semibold text-slate-500 sm:min-h-[120px] lg:h-[84px] lg:min-h-0 lg:grid-cols-[minmax(350px,1.15fr)_minmax(0,1.35fr)] min-[1440px]:text-[12px]"
      >
        <div className="flex min-h-[74px] min-w-0 items-center gap-2 border-b border-slate-300/80 px-2.5 py-2 sm:gap-3 sm:px-5 lg:min-h-0 lg:border-b-0 lg:border-r lg:px-7">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <p className="w-[68px] shrink-0 whitespace-normal text-[9px] font-black uppercase leading-tight tracking-[0.14em] text-[#0a1f44] sm:w-20 sm:text-[11px] sm:tracking-[0.2em] min-[1440px]:text-[12px]">
              <span className="block">SAN TECH</span>
              <span className="block">Impacts</span>
            </p>
            <ImpactMarquee stats={stats} />
          </div>
        </div>
        <div className="flex min-h-[74px] min-w-0 items-center gap-2 overflow-hidden px-2.5 py-2 sm:gap-3 sm:px-5 lg:min-h-0 lg:px-7">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <span className="z-10 w-[68px] shrink-0 whitespace-normal text-[9px] font-black uppercase leading-tight tracking-[0.14em] text-[#0a1f44] sm:w-20 sm:text-[11px] sm:tracking-[0.2em] min-[1440px]:text-[12px]">
              <span className="block">Partners</span>
              <span className="block">/ Clients</span>
            </span>
            <PartnerMarquee partners={partners} />
          </div>
        </div>
      </div>

      <footer className="relative flex min-h-[68px] shrink-0 flex-col items-center justify-center gap-1 overflow-hidden bg-[#0c1230] px-4 py-2 pb-3 text-center text-[11px] text-white sm:h-12.5 sm:min-h-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-7 sm:pb-1 sm:text-left sm:text-xs lg:h-[42px]">
        <span>© 2026 SAN TECH. All rights reserved.</span>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden transition-colors hover:text-white sm:inline">
            {t.turningIdeasIntoImpact}
          </span>
          <span
            className="hidden h-4 w-px bg-white/20 sm:block"
            aria-hidden="true"
          />
          <div
            className="flex items-center gap-2"
            aria-label="SAN TECH social media"
          >
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="text-white transition-colors hover:text-white/75"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2 bg-white"
          style={{
            backgroundImage: "url('/imingogo-trimmed.png')",
            backgroundPosition: "center bottom",
            backgroundRepeat: "repeat-x",
            backgroundSize: "44px 22px",
          }}
        />
      </footer>
    </div>
  );
}
