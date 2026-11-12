"use client";
import { useUiCopy } from "@/lib/use-ui-copy";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  GraduationCap,
  Handshake,
  Lightbulb,
  Search,
  Users,
  X,
} from "lucide-react";
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useCallback } from "react";
import { PhoneNumberField } from "@/components/phone-number-field";
import type { TraineeAward as CmsTraineeAward } from "@/lib/strapi";
import { useSubmitTrainingInquiry } from "@/lib/training-inquiry";

type JoinPath = "training" | "internship" | "community" | "innovation";

const peoplePaths: {
  id: JoinPath;
  label: string;
  description: string;
  icon: typeof GraduationCap;
}[] = [
  {
    id: "training",
    label: "Training",
    description:
      "Build practical technology skills through SAN HUB courses and cohorts.",
    icon: GraduationCap,
  },
  {
    id: "internship",
    label: "Internships",
    description:
      "Learn inside real delivery teams with guided work and mentorship.",
    icon: BriefcaseBusiness,
  },
  {
    id: "community",
    label: "Community",
    description:
      "Join events, conversations, mentorship, and opportunities across the ecosystem.",
    icon: Users,
  },
  {
    id: "innovation",
    label: "Innovation programs",
    description:
      "Turn a difficult question or early idea into something tested and useful.",
    icon: Lightbulb,
  },
];

const workActions = [
  {
    label: "Partner with us",
    href: "/connect?topic=partnership",
    icon: Handshake,
  },
  {
    label: "Book a demo",
    href: "/connect?topic=e-visitors-demo",
    icon: ArrowUpRight,
  },
  { label: "Talk with us", href: "/connect?topic=talk", icon: Users },
];

const traineeAwards = [
  {
    id: "best-performer-2026",
    year: "2026",
    title: "Best Performer",
    recipient: "SAN HUB trainee",
    image: "/images/222003819.jpg",
    imageAlt: "SAN HUB trainee recognized for outstanding performance",
    description:
      "Recognizing a trainee who stood out through commitment, practical work, and contribution during the SAN HUB learning journey.",
    details: [
      "Outstanding participation",
      "Practical project contribution",
      "Commitment to continued learning",
    ],
  },
] as const;

type TraineeAward = {
  id: string | number;
  year: string;
  title: string;
  recipient: string;
  image: string;
  imageAlt: string;
  description: string;
  details: readonly string[];
};

function TraineeAwardCard({
  award,
  reducedMotion,
  onOpen,
}: {
  award: TraineeAward;
  reducedMotion: boolean;
  onOpen: (award: TraineeAward) => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.25, ease: "easeOut" }}
      onClick={() => onOpen(award)}
      aria-label={`View ${award.title} ${award.year} details`}
      className="group flex w-[238px] shrink-0 items-center gap-3 rounded-xl border border-[#dbe5ef] bg-white p-2 text-left shadow-[0_8px_20px_rgba(10,31,68,0.06)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-cyan/70 hover:shadow-[0_12px_26px_rgba(10,31,68,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
    >
      <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-[#e7eef8]">
        <Image
          src={award.image}
          alt={award.imageAlt}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="64px"
        />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-brand-secondary">
          <Award className="size-3 text-brand-secondary" aria-hidden="true" />
          {award.year}
        </span>
        <span className="mt-1 block truncate text-sm font-bold text-[#07152d]">
          {award.title}
        </span>
        <span className="mt-0.5 block truncate text-[10px] text-slate-500">
          {award.recipient}
        </span>
      </span>
      <ArrowUpRight
        className="ml-auto size-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </motion.button>
  );
}

function TraineeAwardMarquee({
  awards,
  reducedMotion,
  onOpen,
}: {
  awards: readonly TraineeAward[];
  reducedMotion: boolean;
  onOpen: (award: TraineeAward) => void;
}) {
  const controls = useAnimationControls();
  const row = [...awards, ...awards];
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);

  useEffect(() => {
    const group = firstGroupRef.current;
    if (!group) return;

    const updateLoopWidth = () =>
      setLoopWidth(group.getBoundingClientRect().width);
    updateLoopWidth();
    const observer = new ResizeObserver(updateLoopWidth);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  const startMarquee = useCallback(() => {
    if (reducedMotion || loopWidth === 0) return;
    void controls.start({
      x: [0, -loopWidth],
      transition: {
        duration: Math.max(12, loopWidth / 35),
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [controls, loopWidth, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || loopWidth === 0) {
      controls.set({ x: 0 });
      return;
    }
    startMarquee();
    return () => controls.stop();
  }, [controls, loopWidth, reducedMotion, startMarquee]);

  return (
    <div
      className="relative min-w-0 overflow-hidden"
      aria-label="SAN HUB trainee awards"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={startMarquee}
      onFocus={() => controls.stop()}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          startMarquee();
      }}
    >
      <span
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white via-white/85 to-transparent"
        aria-hidden="true"
      />
      <motion.div
        className="flex w-max will-change-transform"
        initial={false}
        animate={controls}
      >
        {[0, 1].map((copy) => (
          <div
            ref={copy === 0 ? firstGroupRef : undefined}
            key={copy}
            className="flex gap-3 pr-3"
            aria-hidden={copy === 1}
          >
            {row.map((award, index) => (
              <TraineeAwardCard
                key={`${copy}-${index}-${award.id}`}
                award={award}
                reducedMotion={reducedMotion}
                onOpen={onOpen}
              />
            ))}
          </div>
        ))}
      </motion.div>
      <span
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white via-white/85 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

const pathCopy: Record<
  JoinPath,
  {
    eyebrow: string;
    title: string;
    description: string;
    prompt: string;
    placeholder: string;
  }
> = {
  training: {
    eyebrow: "Training application",
    title: "Tell us what you want to learn.",
    description:
      "We will use your interests and experience to guide you toward the right SAN HUB learning pathway.",
    prompt: "Which skills or topics do you want to develop?",
    placeholder:
      "For example: full-stack development, AI, cybersecurity, or digital skills...",
  },
  internship: {
    eyebrow: "Internship application",
    title: "Start with a real contribution.",
    description:
      "Share your background and the kind of work you want to experience inside a SAN TECH delivery team.",
    prompt: "What would you like to work on?",
    placeholder:
      "Tell us about your skills, project experience, and the kind of team you want to join...",
  },
  community: {
    eyebrow: "Community registration",
    title: "Find your place in the ecosystem.",
    description:
      "Join the SAN HUB network for events, mentorship, conversations, and opportunities to contribute.",
    prompt: "How would you like to participate?",
    placeholder: "Tell us what you want to learn, share, or contribute...",
  },
  innovation: {
    eyebrow: "Innovation program",
    title: "Move an idea toward impact.",
    description:
      "Tell us about the problem, prototype, or research question you want to explore with SAN HUB.",
    prompt: "What are you working on?",
    placeholder:
      "Describe the problem, idea, prototype, or research question...",
  },
};

const labelClass = "grid gap-1.5 text-xs font-bold text-[#07152d]";
const inputClass =
  "h-10 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary";
const selectClass =
  "h-10 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none focus:border-brand-secondary";
const textareaClass =
  "resize-y rounded-lg border border-slate-200 bg-white p-3 font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary";

const trainingCourses = [
  "Full-Stack Software Engineering",
  "Applied AI & Machine Learning",
  "Cybersecurity & Threat Intelligence",
  "Digital Transformation",
  "IoT & Embedded Systems",
  "Data and Digital Skills",
];

const countryCodes =
  "AF AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BV BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF TF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HM VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW".split(
    " ",
  );

function CountrySelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");
  const countries = useMemo(() => {
    const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
    return countryCodes
      .map((code) => ({ code, name: displayNames.of(code) ?? code }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function selectCountry(country: string) {
    setValue(country);
    setQuery("");
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <input
        tabIndex={-1}
        required
        name="nationality"
        value={value}
        readOnly
        className="sr-only"
        aria-hidden="true"
      />
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-10 w-full items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 text-left font-normal outline-none transition-colors hover:border-brand-secondary focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/15"
      >
        <span
          className={
            value ? "truncate text-sm text-[#07152d]" : "text-sm text-slate-400"
          }
        >
          {value || "Select your nationality"}
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white p-1.5 shadow-[0_16px_35px_rgba(7,21,45,0.16)]">
          <div className="relative p-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search countries..."
              aria-label="Search countries"
              className="h-9 w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-[#07152d] outline-none focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/15"
            />
          </div>
          <div
            className="max-h-64 overflow-y-auto"
            role="listbox"
            aria-label="Countries"
          >
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  role="option"
                  aria-selected={value === country.name}
                  onClick={() => selectCountry(country.name)}
                  className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm text-[#07152d] transition-colors hover:bg-slate-50"
                >
                  <span>{country.name}</span>
                  {value === country.name && (
                    <Check
                      className="size-4 text-brand-secondary"
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))
            ) : (
              <p className="px-2.5 py-3 text-sm text-slate-500">
                No country found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CourseMultiSelect({ initialCourse = "" }: { initialCourse?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    initialCourse ? [initialCourse] : [],
  );

  function toggleCourse(course: string) {
    setSelectedCourses((current) =>
      current.includes(course)
        ? current.filter((item) => item !== course)
        : [...current, course],
    );
  }

  function removeCourse(course: string) {
    setSelectedCourses((current) => current.filter((item) => item !== course));
  }

  return (
    <div className="relative">
      <input type="hidden" name="courses" value={selectedCourses.join(", ")} />
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={0}
        onClick={() => setIsOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ")
            setIsOpen((value) => !value);
        }}
        className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-left text-sm font-normal text-[#07152d] outline-none transition-colors hover:border-brand-secondary focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/15"
      >
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          {selectedCourses.length > 0 ? (
            selectedCourses.map((course) => (
              <span
                key={course}
                className="inline-flex max-w-full items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-[#07152d]"
              >
                <span className="truncate">{course}</span>
                <button
                  type="button"
                  aria-label={`Remove ${course}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeCourse(course);
                  }}
                  className="grid size-4 shrink-0 place-items-center rounded-sm text-slate-500 transition-colors hover:bg-slate-200 hover:text-[#07152d]"
                >
                  <X className="size-3" aria-hidden="true" />
                </button>
              </span>
            ))
          ) : (
            <span className="text-slate-400">Select courses</span>
          )}
        </div>
        <ChevronDown
          className={`size-4 shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </div>

      {isOpen && (
        <div
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white p-1.5 shadow-[0_16px_35px_rgba(7,21,45,0.16)]"
          role="listbox"
          aria-label="Choose courses"
          onClick={(event) => event.stopPropagation()}
        >
          <div>
            {trainingCourses.map((course) => {
              const selected = selectedCourses.includes(course);
              return (
                <label
                  key={course}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-sm text-[#07152d] transition-colors hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleCourse(course)}
                    className="peer sr-only"
                  />
                  <span
                    className={`grid size-4 shrink-0 place-items-center rounded border ${selected ? "border-brand-secondary bg-brand-secondary text-white" : "border-slate-300 bg-white"}`}
                    aria-hidden="true"
                  >
                    {selected && <Check className="size-3" />}
                  </span>
                  <span>{course}</span>
                </label>
              );
            })}
          </div>
          <div className="border-t border-slate-100 p-1.5">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-full items-center justify-center rounded-md bg-[#07152d] text-xs font-bold text-white transition-colors hover:bg-brand-secondary"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function InternshipFields() {
  return (
    <>
      <label className={labelClass}>
        Gender
        <select required name="gender" defaultValue="" className={selectClass}>
          <option value="" disabled>
            Select your gender
          </option>
          <option>Female</option>
          <option>Male</option>
          <option>Prefer not to say</option>
        </select>
      </label>

      <PhoneNumberField
        required
        numberName="phoneNumber"
        labelClassName={labelClass}
        inputClassName={inputClass}
        selectClassName={selectClass}
      />

      <label className={labelClass}>
        Other contact
        <input
          required
          name="otherContact"
          placeholder="WhatsApp, LinkedIn, or alternate contact"
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        School
        <input
          required
          minLength={2}
          name="school"
          placeholder="School, university, or institution"
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        Trade / faculty
        <input
          required
          minLength={2}
          name="tradeFaculty"
          placeholder="Faculty, department, or trade"
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        Timeline from
        <input
          required
          type="date"
          name="timelineFrom"
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        Timeline to
        <input required type="date" name="timelineTo" className={inputClass} />
      </label>

      <label className={labelClass}>
        Nationality
        <CountrySelect />
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Upload CV or supporting document{" "}
        <span className="font-normal text-slate-500">
          (optional — can be added later)
        </span>
        <input
          type="file"
          name="upload"
          accept=".pdf,.doc,.docx"
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-normal text-slate-600 file:mr-3 file:border-0 file:bg-transparent file:p-0 file:font-bold file:text-[#07152d]"
        />
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Gap you wish to cover
        <textarea
          required
          minLength={10}
          name="gapToCover"
          rows={3}
          className={textareaClass}
          placeholder="What knowledge, skills, or experience would you like to gain?"
        />
      </label>
    </>
  );
}

function TrainingFields({ initialCourse = "" }: { initialCourse?: string }) {
  return (
    <>
      <PhoneNumberField
        required
        labelClassName={labelClass}
        inputClassName={inputClass}
        selectClassName={selectClass}
      />

      <label className={labelClass}>
        Gender
        <select required name="gender" defaultValue="" className={selectClass}>
          <option value="" disabled>
            Select your gender
          </option>
          <option>Female</option>
          <option>Male</option>
          <option>Prefer not to say</option>
        </select>
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Courses
        <CourseMultiSelect initialCourse={initialCourse} />
        <span className="font-normal text-slate-500">
          Choose one or more courses from the dropdown.
        </span>
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Other
        <textarea
          name="other"
          rows={2}
          className={textareaClass}
          placeholder="Tell us anything else about your learning needs..."
        />
      </label>

      <label className={labelClass}>
        School / institution
        <input
          required
          name="schoolInstitution"
          placeholder="School or institution"
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        Location
        <input
          required
          name="location"
          placeholder="City or district"
          className={inputClass}
        />
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Nationality
        <CountrySelect />
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Which skills or topics do you want to develop?
        <textarea
          required
          minLength={10}
          name="skillsTopics"
          rows={4}
          className={textareaClass}
          placeholder="Tell us which skills or topics you want to develop..."
        />
      </label>
    </>
  );
}

export function TrainingApplicationDialog({
  isOpen,
  onClose,
  initialCourse = "",
}: {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: string;
}) {
  const t = useUiCopy();
  const [submitted, setSubmitted] = useState(false);
  const trainingMutation = useSubmitTrainingInquiry();
  const [setupRequired, setSetupRequired] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [initialCourse, isOpen, onClose]);

  if (!isOpen) return null;

  const emailLooksValid = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  function handleEmailBlur(event: FocusEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    setEmailError(
      !value.trim()
        ? "Email address is required."
        : emailLooksValid(value)
          ? null
          : "Enter a valid email address, like you@example.com.",
    );
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmailError((current) =>
      current !== null && emailLooksValid(event.currentTarget.value)
        ? null
        : current,
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const input = Object.fromEntries(
      [...form.entries()].map(([key, value]) => [
        key,
        typeof value === "string" ? value : "",
      ]),
    );
    try {
      const result = await trainingMutation.mutateAsync(input);
      setSetupRequired(result.setupRequired);
      setSubmitted(true);
    } catch {
      // Failure is rendered from trainingMutation.error below the form.
    }
  }
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07152d]/65 p-4 backdrop-blur-sm sm:p-6"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="training-application-title"
        className="max-h-[90svh] w-full max-w-3xl overflow-y-auto rounde-md border border-white/60 bg-[#f7faff] shadow-[0_30px_90px_rgba(7,21,45,0.28)]"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
      >
        <div className="flex items-start justify-between gap-5 border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
              Training application
            </p>
            <h2
              id="training-application-title"
              className="font-exo mt-1 text-xl font-bold leading-tight tracking-[-0.035em] text-[#07152d] sm:text-2xl"
            >
              Tell us what you want to learn.
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close training application"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="p-5 sm:p-7">
          {submitted ? (
            <div className="rounded-xl border border-emerald-200 bg-white p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
                Request prepared
              </p>
              <h3 className="font-exo mt-3 text-2xl font-bold text-[#07152d]">
                {t.thankYouConversation}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {setupRequired
                  ? "Your request was received. Check your email for a secure link to finish creating your learner account."
                  : "Your request was received. Sign in to your learner account to continue, and the SAN HUB team will follow up with the next steps."}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setEmailError(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#07152d] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand-secondary"
                >
                  Submit another request <ArrowUpRight className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-[#07152d] transition-colors hover:border-brand-secondary"
                >
                  {t.close}
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="mb-5 max-w-2xl text-sm leading-6 text-slate-600">
                We will use your interests and experience to guide you toward
                the right SAN HUB learning pathway.
              </p>
              <form
                onSubmit={handleSubmit}
                className="grid gap-3 sm:grid-cols-2"
              >
                <label className={labelClass}>
                  Full name
                  <input
                    required
                    minLength={2}
                    name="name"
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </label>
                <label className={labelClass}>
                  Email address
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    onBlur={handleEmailBlur}
                    onChange={handleEmailChange}
                    aria-invalid={emailError !== null}
                    className={`${inputClass}${emailError ? " border-rose-400 focus:border-rose-500" : ""}`}
                  />
                  {emailError ? (
                    <span
                      role="alert"
                      className="text-xs font-normal text-rose-600"
                    >
                      {emailError}
                    </span>
                  ) : null}
                </label>
                <TrainingFields initialCourse={initialCourse} />
                {trainingMutation.error ? (
                  <p
                    role="alert"
                    className="sm:col-span-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700"
                  >
                    {trainingMutation.error instanceof Error
                      ? trainingMutation.error.message
                      : "Unable to submit your request."}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={trainingMutation.isPending}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#07152d] px-5 text-sm font-bold text-white transition-[background-color,transform] hover:bg-brand-secondary disabled:cursor-wait disabled:opacity-60 sm:col-span-2"
                >
                  {trainingMutation.isPending
                    ? "Submitting…"
                    : "Continue with training"}{" "}
                  <ArrowUpRight className="size-4" />
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function InnovationFields() {
  return (
    <>
      <PhoneNumberField
        required
        labelClassName={labelClass}
        inputClassName={inputClass}
        selectClassName={selectClass}
      />

      <label className={labelClass}>
        Gender
        <select required name="gender" defaultValue="" className={selectClass}>
          <option value="" disabled>
            Select your gender
          </option>
          <option>Female</option>
          <option>Male</option>
          <option>Prefer not to say</option>
        </select>
      </label>

      <label className={labelClass}>
        ID (optional)
        <input
          name="identification"
          placeholder="National ID or passport number"
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        Join date
        <input required type="date" name="joinDate" className={inputClass} />
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Idea
        <textarea
          required
          minLength={20}
          name="idea"
          rows={4}
          className={textareaClass}
          placeholder="Describe the idea, problem, or opportunity you want to explore..."
        />
      </label>

      <label className={labelClass}>
        Services
        <select
          required
          name="services"
          defaultValue=""
          className={selectClass}
        >
          <option value="" disabled>
            Select a service
          </option>
          <option>Learning</option>
          <option>IP registration</option>
          <option>Product development</option>
          <option>Both learning and product development</option>
          <option>Other</option>
        </select>
      </label>

      <label className={labelClass}>
        Upload document (optional)
        <input
          type="file"
          name="document"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-normal text-slate-600 file:mr-3 file:border-0 file:bg-transparent file:p-0 file:font-bold file:text-[#07152d]"
        />
      </label>
    </>
  );
}

export function JoinCommunityPage({
  initialPath = "community",
  course = "",
  openInitially = false,
  awards = [],
}: {
  initialPath?: JoinPath;
  course?: string;
  openInitially?: boolean;
  awards?: readonly CmsTraineeAward[];
}) {
  const t = useUiCopy();
  const prefersReducedMotion = useReducedMotion();
  const [path, setPath] = useState<JoinPath>(initialPath);
  const [isDialogOpen, setIsDialogOpen] = useState(openInitially);
  const displayAwards: readonly TraineeAward[] =
    awards.length > 0
      ? awards.map((award) => ({
          id: award.id,
          year: award.year,
          title: award.title,
          recipient: award.name,
          image: award.image || "/images/222003819.jpg",
          imageAlt: `${award.title} recognition for ${award.name}`,
          description: award.description,
          details: [
            "Outstanding participation",
            "Practical project contribution",
            "Commitment to continued learning",
          ],
        }))
      : traineeAwards;
  const [selectedAward, setSelectedAward] = useState<TraineeAward | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const copy = pathCopy[path];

  useEffect(() => {
    if (!isDialogOpen && !selectedAward) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsDialogOpen(false);
      setSelectedAward(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isDialogOpen, selectedAward]);

  function openPath(nextPath: JoinPath) {
    setPath(nextPath);
    setSubmitted(false);
    setIsDialogOpen(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }
  return (
    <>
      <section className="relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:pt-15">
        <div className="mx-auto max-w-7xl">
          <div>
            <article className="flex flex-col rounde-md border-t-4 border-brand-cyan bg-white p-5 shadow-[0_16px_35px_rgba(7,11,36,0.08)] sm:p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">
                    {t.forPeople}
                  </p>
                  <h2 className="font-exo mt-2 text-xl font-bold tracking-[-0.04em] text-[#07152d] sm:text-2xl">
                    {t.joinEcosystem}
                  </h2>
                </div>
                <div className="xl:max-w-[48rem]">
                  <div className="grid w-full gap-2 sm:grid-cols-3">
                    {workActions.map(({ label, href, icon: Icon }, index) => (
                      <motion.a
                        key={label}
                        href={href}
                        initial={{ opacity: 0, y: 7 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                          y: -2,
                          boxShadow: "0 12px 26px rgba(8,198,231,0.22)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          opacity: {
                            duration: 0.25,
                            delay: 0.12 + index * 0.08,
                          },
                          y: { duration: 0.2, delay: 0.12 + index * 0.08 },
                          boxShadow: { duration: 0.2 },
                        }}
                        className="group relative flex min-h-11 items-center justify-between gap-2 overflow-hidden rounded-xl border border-brand-cyan bg-white px-3 py-2 text-left text-[#07152d] shadow-[0_8px_20px_rgba(8,198,231,0.14)] transition-shadow"
                      >
                        <motion.span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-brand-cyan/25 to-transparent"
                          initial={{ x: "-30%" }}
                          animate={
                            prefersReducedMotion
                              ? { x: "-30%" }
                              : { x: ["-30%", "420%"] }
                          }
                          transition={
                            prefersReducedMotion
                              ? { duration: 0.01 }
                              : {
                                  duration: 4,
                                  delay: index * 0.65,
                                  repeat: Infinity,
                                  repeatDelay: 1.2,
                                  ease: "easeInOut",
                                }
                          }
                        />
                        <span className="relative z-10 text-xs font-bold sm:text-sm">
                          {label}
                        </span>
                        <Icon
                          className="relative z-10 size-4 shrink-0 text-brand-secondary"
                          aria-hidden="true"
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                Learn, contribute, find mentorship, and build the experience
                needed to create useful technology.
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {peoplePaths.map(({ id, label, description, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => openPath(id)}
                    className="group rounded-xl border border-brand-cyan bg-white p-3.5 text-left shadow-[0_8px_20px_rgba(8,198,231,0.14)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(8,198,231,0.22)]"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-sm font-bold text-[#07152d]">
                        <Icon
                          className="size-4 text-brand-secondary"
                          aria-hidden="true"
                        />
                        {label}
                      </span>
                      <ArrowUpRight
                        className="size-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-1.5 block text-xs leading-5 text-slate-500">
                      {description}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-5 border-t border-slate-200 pt-4">
                <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-secondary">
                      SAN HUB / Learner recognition
                    </p>
                    <h3 className="font-exo mt-1 text-base font-bold tracking-[-0.03em] text-[#07152d]">
                      Best Performer Awarded
                    </h3>
                    <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
                      Celebrating trainees who turn learning into practical
                      contribution.
                    </p>
                  </div>
                  <TraineeAwardMarquee
                    awards={displayAwards}
                    reducedMotion={Boolean(prefersReducedMotion)}
                    onOpen={setSelectedAward}
                  />
                </div>
                <div
                  className="mt-4 flex flex-wrap items-center justify-end gap-2"
                  aria-label="SAN HUB pathways"
                >
                  {["Learn", "Build", "Connect"].map((pathLabel) => (
                    <span
                      key={pathLabel}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#edf7fb] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#0a1f44]"
                    >
                      <Check
                        className="size-3 text-brand-secondary"
                        aria-hidden="true"
                      />
                      {pathLabel}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            key="join-dialog"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07152d]/65 p-4 backdrop-blur-sm sm:p-6"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setIsDialogOpen(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="join-dialog-title"
              className="max-h-[90svh] w-full max-w-3xl overflow-y-auto rounde-md border border-white/60 bg-[#f7faff] shadow-[0_30px_90px_rgba(7,21,45,0.28)]"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <div className="flex items-start justify-between gap-5 border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
                    {copy.eyebrow}
                  </p>
                  <h2
                    id="join-dialog-title"
                    className="font-exo mt-1 text-xl font-bold leading-tight tracking-[-0.035em] text-[#07152d] sm:text-2xl"
                  >
                    {copy.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  aria-label="Close application form"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="p-5 sm:p-7">
                {submitted ? (
                  <div className="rounded-xl border border-emerald-200 bg-white p-6">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
                      Request prepared
                    </p>
                    <h3 className="font-exo mt-3 text-2xl font-bold text-[#07152d]">
                      {t.thankYouConversation}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Your {copy.eyebrow.toLowerCase()} details are ready for
                      the SAN HUB team. We will use the contact information you
                      provided to follow up with the next steps.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#07152d] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand-secondary"
                      >
                        Submit another request{" "}
                        <ArrowUpRight className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsDialogOpen(false)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-[#07152d] transition-colors hover:border-brand-secondary"
                      >
                        {t.close}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="mb-5 max-w-2xl text-sm leading-6 text-slate-600">
                      {copy.description}
                    </p>
                    <form
                      onSubmit={handleSubmit}
                      className="grid gap-3 sm:grid-cols-2"
                    >
                      <label className={labelClass}>
                        Full name
                        <input
                          required
                          minLength={2}
                          name="name"
                          placeholder="Your full name"
                          className={inputClass}
                        />
                      </label>
                      {path !== "innovation" && (
                        <label className={labelClass}>
                          Email address
                          <input
                            required
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className={inputClass}
                          />
                        </label>
                      )}

                      {path === "internship" ? (
                        <InternshipFields />
                      ) : path === "training" ? (
                        <TrainingFields initialCourse={course} />
                      ) : path === "innovation" ? (
                        <InnovationFields />
                      ) : (
                        <>
                          <PhoneNumberField
                            required
                            labelClassName={labelClass}
                            inputClassName={inputClass}
                            selectClassName={selectClass}
                          />
                          <label className={labelClass}>
                            Country
                            <input
                              required
                              defaultValue="Rwanda"
                              name="country"
                              placeholder="Rwanda"
                              className={inputClass}
                            />
                          </label>
                          <label className={`${labelClass} sm:col-span-2`}>
                            Experience or organization
                            <input
                              required
                              minLength={2}
                              defaultValue={course}
                              name="focus"
                              className={inputClass}
                              placeholder="What should we know?"
                            />
                          </label>
                          <label className={`${labelClass} sm:col-span-2`}>
                            {copy.prompt}
                            <textarea
                              required
                              minLength={20}
                              name="message"
                              rows={4}
                              className={textareaClass}
                              placeholder={copy.placeholder}
                            />
                          </label>
                        </>
                      )}

                      <button
                        type="submit"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#07152d] px-5 text-sm font-bold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary sm:col-span-2"
                      >
                        Continue with{" "}
                        {peoplePaths
                          .find((item) => item.id === path)
                          ?.label.toLowerCase()}{" "}
                        <ArrowUpRight className="size-4" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedAward && (
          <motion.div
            className="fixed inset-0 z-[110] grid place-items-center bg-[#07152d]/65 p-4 backdrop-blur-sm"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
            onMouseDown={() => setSelectedAward(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="trainee-award-dialog-title"
              className="w-full max-w-lg overflow-hidden rounde-md border border-white/80 bg-white shadow-[0_24px_70px_rgba(7,21,45,0.28)]"
              initial={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.94,
                y: prefersReducedMotion ? 0 : 12,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.97,
                y: prefersReducedMotion ? 0 : 8,
              }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-secondary">
                    SAN HUB / {selectedAward.year}
                  </p>
                  <h2
                    id="trainee-award-dialog-title"
                    className="font-exo mt-1 text-xl font-bold leading-tight tracking-[-0.035em] text-[#07152d]"
                  >
                    {selectedAward.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedAward.recipient}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAward(null)}
                  aria-label="Close trainee award details"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
              <div className="grid gap-5 p-5 sm:grid-cols-[150px_1fr] sm:p-6">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#e7eef8]">
                  <Image
                    src={selectedAward.image}
                    alt={selectedAward.imageAlt}
                    fill
                    className="object-contain"
                    sizes="150px"
                  />
                </div>
                <div>
                  <p className="text-sm leading-6 text-slate-600">
                    {selectedAward.description}
                  </p>
                  <ul className="mt-4 grid gap-2">
                    {selectedAward.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2 text-xs font-semibold text-[#07152d]"
                      >
                        <Check
                          className="size-3.5 text-brand-secondary"
                          aria-hidden="true"
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
