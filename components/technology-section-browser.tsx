"use client";

import { ArrowUpRight, Code2 } from "lucide-react";
import {
  FaAws,
  FaCss3Alt,
  FaJava,
  FaMicrosoft,
  FaWindows,
} from "react-icons/fa6";
import {
  SiAda,
  SiAndroid,
  SiAngular,
  SiArduino,
  SiApache,
  SiC,
  SiClojure,
  SiCommonlisp,
  SiCplusplus,
  SiCrystal,
  SiD,
  SiDart,
  SiDjango,
  SiDocker,
  SiDotnet,
  SiElixir,
  SiElm,
  SiErlang,
  SiEspressif,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiFortran,
  SiFsharp,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGnubash,
  SiGo,
  SiGooglecloud,
  SiGraphql,
  SiHaskell,
  SiHaxe,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiJulia,
  SiJira,
  SiKotlin,
  SiLaravel,
  SiLinux,
  SiLua,
  SiMongodb,
  SiMqtt,
  SiMysql,
  SiNfc,
  SiNextdotjs,
  SiNim,
  SiNginx,
  SiNodedotjs,
  SiOcaml,
  SiOpencv,
  SiPerl,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPwa,
  SiPytorch,
  SiPython,
  SiR,
  SiRaspberrypi,
  SiReact,
  SiRedis,
  SiRuby,
  SiRust,
  SiScala,
  SiScikitlearn,
  SiSass,
  SiSolidity,
  SiSqlite,
  SiSpringboot,
  SiStmicroelectronics,
  SiSwift,
  SiTensorflow,
  SiTrello,
  SiTypescript,
  SiVuedotjs,
  SiWebassembly,
  SiZig,
  SiKubernetes,
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";
import {
  TbBrandCSharp,
  TbBrandPowershell,
  TbBrandWindows,
  TbSql,
} from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import type { IconType } from "react-icons";
import { useState } from "react";
import {
  technologyCategories,
  type TechnologyCategory,
} from "@/lib/technology-data";

const HARDCODED_PROG_LANG = technologyCategories[0];

function resolveCategories(cmsCategories?: readonly TechnologyCategory[]) {
  if (!cmsCategories || cmsCategories.length === 0) return technologyCategories;
  // Re-attach icons from the hardcoded lookup — icons can't travel from the server
  return cmsCategories.map((cat) => ({
    ...cat,
    icon: cat.icon ?? technologyCategories.find((h) => h.id === cat.id)?.icon,
  }));
}

const technologyIcons: Record<string, { Icon: IconType; color: string }> = {
  Python: { Icon: SiPython, color: "#3776ab" },
  Go: { Icon: SiGo, color: "#00add8" },
  Rust: { Icon: SiRust, color: "#000000" },
  Swift: { Icon: SiSwift, color: "#f05138" },
  Ruby: { Icon: SiRuby, color: "#cc342d" },
  R: { Icon: SiR, color: "#276dc3" },
  Scala: { Icon: SiScala, color: "#dc322f" },
  Java: { Icon: FaJava, color: "#ed8b00" },
  JavaScript: { Icon: SiJavascript, color: "#d6a900" },
  TypeScript: { Icon: SiTypescript, color: "#3178c6" },
  PHP: { Icon: SiPhp, color: "#777bb4" },
  C: { Icon: SiC, color: "#5c6bc0" },
  "C++": { Icon: SiCplusplus, color: "#00599c" },
  "C#": { Icon: TbBrandCSharp, color: "#239120" },
  Kotlin: { Icon: SiKotlin, color: "#7f52ff" },
  Dart: { Icon: SiDart, color: "#0175c2" },
  Sass: { Icon: SiSass, color: "#cc6699" },
  Ada: { Icon: SiAda, color: "#02f88c" },
  Fortran: { Icon: SiFortran, color: "#734f96" },
  "F#": { Icon: SiFsharp, color: "#378bba" },
  Haskell: { Icon: SiHaskell, color: "#5e5086" },
  Clojure: { Icon: SiClojure, color: "#5881d8" },
  "Common Lisp": { Icon: SiCommonlisp, color: "#3fb68b" },
  Elixir: { Icon: SiElixir, color: "#4b275f" },
  Erlang: { Icon: SiErlang, color: "#a90533" },
  Elm: { Icon: SiElm, color: "#60b5cc" },
  Julia: { Icon: SiJulia, color: "#9558b2" },
  Lua: { Icon: SiLua, color: "#000080" },
  Perl: { Icon: SiPerl, color: "#39457e" },
  OCaml: { Icon: SiOcaml, color: "#ec6813" },
  Crystal: { Icon: SiCrystal, color: "#000000" },
  D: { Icon: SiD, color: "#ba595e" },
  Nim: { Icon: SiNim, color: "#ffe953" },
  Zig: { Icon: SiZig, color: "#f7a41d" },
  Solidity: { Icon: SiSolidity, color: "#363636" },
  Haxe: { Icon: SiHaxe, color: "#ea8220" },
  WebAssembly: { Icon: SiWebassembly, color: "#654ff0" },
  SQL: { Icon: TbSql, color: "#336791" },
  HTML5: { Icon: SiHtml5, color: "#e34f26" },
  CSS3: { Icon: FaCss3Alt, color: "#1572b6" },
  "Bash / Shell": { Icon: SiGnubash, color: "#4eaa25" },
  PowerShell: { Icon: TbBrandPowershell, color: "#2671be" },
  "React.js": { Icon: SiReact, color: "#61dafb" },
  "Next.js": { Icon: SiNextdotjs, color: "#111827" },
  Angular: { Icon: SiAngular, color: "#dd0031" },
  "Vue.js": { Icon: SiVuedotjs, color: "#41b883" },
  "Node.js": { Icon: SiNodedotjs, color: "#5fa04e" },
  "Express.js": { Icon: SiExpress, color: "#111827" },
  Laravel: { Icon: SiLaravel, color: "#ff2d20" },
  Django: { Icon: SiDjango, color: "#092e20" },
  FastAPI: { Icon: SiFastapi, color: "#009688" },
  "Spring Boot": { Icon: SiSpringboot, color: "#6db33f" },
  ".NET / ASP.NET": { Icon: SiDotnet, color: "#512bd4" },
  "REST APIs": { Icon: TbSql, color: "#336791" },
  GraphQL: { Icon: SiGraphql, color: "#e10098" },
  "Progressive Web Apps (PWA)": { Icon: SiPwa, color: "#5a0fc8" },
  Flutter: { Icon: SiFlutter, color: "#02569b" },
  "Android / Kotlin": { Icon: SiAndroid, color: "#3ddc84" },
  "React Native": { Icon: SiReact, color: "#61dafb" },
  Firebase: { Icon: SiFirebase, color: "#ffca28" },
  "Python AI/ML ecosystem": { Icon: SiPython, color: "#3776ab" },
  TensorFlow: { Icon: SiTensorflow, color: "#ff6f00" },
  PyTorch: { Icon: SiPytorch, color: "#ee4c2c" },
  "Scikit-learn": { Icon: SiScikitlearn, color: "#f7931e" },
  OpenCV: { Icon: SiOpencv, color: "#5c3ee8" },
  MySQL: { Icon: SiMysql, color: "#4479a1" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169e1" },
  "Microsoft SQL Server": { Icon: FaMicrosoft, color: "#737373" },
  SQLite: { Icon: SiSqlite, color: "#003b57" },
  MongoDB: { Icon: SiMongodb, color: "#47a248" },
  Redis: { Icon: SiRedis, color: "#dc382d" },
  Arduino: { Icon: SiArduino, color: "#00979d" },
  ESP32: { Icon: SiEspressif, color: "#e7352c" },
  ESP8266: { Icon: SiEspressif, color: "#e7352c" },
  "Raspberry Pi": { Icon: SiRaspberrypi, color: "#c51a4a" },
  STM32: { Icon: SiStmicroelectronics, color: "#03234b" },
  NFC: { Icon: SiNfc, color: "#111827" },
  MQTT: { Icon: SiMqtt, color: "#660066" },
  AWS: { Icon: FaAws, color: "#ff9900" },
  "Microsoft Azure": { Icon: FaMicrosoft, color: "#0078d4" },
  "Google Cloud": { Icon: SiGooglecloud, color: "#4285f4" },
  Docker: { Icon: SiDocker, color: "#2496ed" },
  Kubernetes: { Icon: SiKubernetes, color: "#326ce5" },
  Git: { Icon: SiGit, color: "#f05032" },
  GitHub: { Icon: SiGithub, color: "#111827" },
  GitLab: { Icon: SiGitlab, color: "#fc6d26" },
  Linux: { Icon: SiLinux, color: "#111827" },
  Nginx: { Icon: SiNginx, color: "#009639" },
  Apache: { Icon: SiApache, color: "#d22128" },
  "Visual Studio Code": { Icon: VscVscode, color: "#007acc" },
  "IntelliJ IDEA": { Icon: SiIntellijidea, color: "#fe315d" },
  Postman: { Icon: SiPostman, color: "#ff6c37" },
  Jira: { Icon: SiJira, color: "#0052cc" },
  Trello: { Icon: SiTrello, color: "#0052cc" },
  Figma: { Icon: SiFigma, color: "#f24e1e" },
  "Microsoft 365": { Icon: FaMicrosoft, color: "#737373" },
  "Windows Server": { Icon: FaWindows, color: "#0078d4" },
};

function TechnologyChip({
  item,
  card = false,
}: {
  item: string;
  card?: boolean;
}) {
  const technology = technologyIcons[item];
  const Icon = technology?.Icon;

  return (
    <span
      className={
        card
          ? "group flex min-h-12 items-center gap-2.5 rounded-xl border border-[#e1e8f0] bg-white px-2.5 py-2 text-[11px] font-semibold text-[#0a1f44] shadow-[0_3px_10px_rgba(10,31,68,0.025)] transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-[#a9c9df] hover:shadow-[0_6px_14px_rgba(10,31,68,0.06)]"
          : "inline-flex items-center gap-1.5 rounded-full border border-[#e1e8f0] bg-[#f8fafc] px-2.5 py-1 text-[11px] font-semibold text-[#0a1f44]"
      }
    >
      {Icon ? (
        <span
          className={
            card
              ? "grid size-7 shrink-0 place-items-center rounded-lg bg-[#f1f6fb]"
              : "inline-flex shrink-0"
          }
        >
          <Icon
            className="size-3.5"
            style={{ color: technology.color }}
            aria-hidden="true"
          />
        </span>
      ) : (
        <span className="inline-flex shrink-0 text-brand-secondary">
          <Code2 className="size-3.5" aria-hidden="true" />
        </span>
      )}
      {item}
    </span>
  );
}

export function TechnologySectionBrowser({
  mode = "technologies",
  cmsCategories,
}: {
  mode?: "technologies" | "programming-languages";
  cmsCategories?: readonly TechnologyCategory[];
}) {
  const allCategories = resolveCategories(cmsCategories);
  const programmingLanguages = allCategories[0] ?? HARDCODED_PROG_LANG;
  return mode === "programming-languages" ? (
    <ProgrammingLanguagesPanel programmingLanguages={programmingLanguages} />
  ) : (
    <TechnologyAccordion
      allCategories={allCategories}
      programmingLanguages={programmingLanguages}
    />
  );
}

function TechnologyAccordion({
  allCategories,
  programmingLanguages,
}: {
  allCategories: readonly TechnologyCategory[];
  programmingLanguages: TechnologyCategory;
}) {
  const categories = allCategories.filter(
    (category) => category.id !== programmingLanguages.id,
  );
  const [activeId, setActiveId] = useState<string>(categories[0].id);
  const activeCategory =
    categories.find((category) => category.id === activeId) ?? categories[0];
  const ActiveIcon = activeCategory.icon ?? Code2;
  const activeIndex = categories.findIndex(
    (category) => category.id === activeCategory.id,
  );

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.3fr)] lg:gap-8">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">
          Technologies
        </p>
        <h1 className="font-exo mt-2 max-w-md text-2xl font-bold leading-[1.05] tracking-[-0.045em] text-[#0a1f44] sm:text-3xl">
          A stack built for useful systems.
        </h1>
        <div
          className="mt-6 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1"
          role="tablist"
          aria-label="SAN TECH technology domains"
        >
          {categories.map((category) => {
            const active = activeCategory.id === category.id;
            const Icon = category.icon ?? Code2;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveId(category.id)}
                className={`group flex min-w-0 items-center gap-2 rounded-xl border px-2 py-1.5 text-left transition-[background-color,color,transform,border-color] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 ${active ? "border-[#b8d7e6] bg-[#eef6fb] text-[#0a1f44]" : "border-transparent bg-[#f8fafc] text-[#0a1f44] hover:border-[#d8e5ef] hover:bg-[#f3f7fb]"}`}
              >
                <span
                  className={`grid size-6 shrink-0 place-items-center rounded-lg ${active ? "bg-white text-brand-secondary" : "bg-white text-slate-500"}`}
                >
                  <Icon
                    className="size-3"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px] font-bold leading-4">
                  {category.label}
                </span>
                <ArrowUpRight
                  className={`size-3 shrink-0 transition-transform ${active ? "text-brand-secondary" : "text-slate-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"}`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>

      <section
        key={activeCategory.id}
        role="tabpanel"
        aria-label={`${activeCategory.label} technologies`}
        className="h-fit self-start rounde-md border border-[#e0e8f0] bg-[#f8fafc] p-3.5 sm:p-5"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#e0e8f0] pb-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#eaf3f9] text-brand-secondary">
              <ActiveIcon
                className="size-4"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-brand-secondary">
                Domain {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(categories.length).padStart(2, "0")}
              </p>
              <h2 className="font-exo mt-0.5 text-lg font-bold leading-tight tracking-[-0.035em] text-[#0a1f44] sm:text-xl">
                {activeCategory.label}
              </h2>
            </div>
          </div>
          <span className="hidden shrink-0 rounded-full bg-white px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-slate-500 sm:inline-flex">
            {activeCategory.items.length} tools
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-xs leading-5 text-[#68718a]">
          {activeCategory.description}
        </p>
        <div className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
          {activeCategory.items.map((item) => (
            <TechnologyChip key={item} item={item} card />
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#d7e3f0] pt-3 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
          <span>Built for delivery</span>
          <span className="text-brand-secondary">
            {activeCategory.items.length} capabilities
          </span>
        </div>
      </section>
    </div>
  );
}

function ProgrammingLanguagesPanel({
  programmingLanguages,
}: {
  programmingLanguages: TechnologyCategory;
}) {
  const ProgrammingLanguagesIcon = programmingLanguages.icon ?? Code2;

  return (
    <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">
          Programming languages
        </p>
        <p className="mt-6 max-w-md text-base leading-7 text-[#68718a] text-justify">
          The languages SAN TECH uses to build software, automate work, work
          with data, and connect technology to real environments.
        </p>
        <p className="mt-6 max-w-md text-base leading-7 text-[#68718a] text-justify">
          SAN TECH in software engineering, AI, IoT, cybersecurity, web/mobile
          development and embedded systems programs, the most important
          languages to prioritize are Python, JavaScript/TypeScript, Java, C,
          C++, C#, Kotlin, Swift, Dart, PHP, SQL, Go, Rust and Solidity.
        </p>
      </div>
      <div className="border-y border-slate-300">
        <div className="flex items-center gap-4 border-b border-slate-200 py-4">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#d9eafa] text-brand-secondary">
            <ProgrammingLanguagesIcon
              className="size-4"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </span>
          <span className="text-sm font-bold text-[#0a1f44]">
            {programmingLanguages.label}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 py-5">
          {programmingLanguages.items.map((item) => (
            <TechnologyChip key={item} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
