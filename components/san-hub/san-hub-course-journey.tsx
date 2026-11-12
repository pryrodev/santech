import { BadgeCheck, BookOpen, Hammer, Network, Clock3 } from "lucide-react";

type CourseModule = {
  title: string;
  description: string;
  duration: string;
};

const stageIcons = [BookOpen, Hammer, BadgeCheck, Network] as const;
const stageLabels = ["Understand", "Apply", "Prove", "Keep going"] as const;

export function SanHubCourseJourney({ modules }: { modules: readonly CourseModule[] }) {
  if (modules.length === 0) return null;
  return (
    <section id="courses" className="scroll-mt-48 border-b border-slate-200 py-10">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-secondary">Course series</p>
      <h2 className="font-exo mt-3 max-w-2xl text-2xl font-bold leading-tight tracking-[-0.04em] text-[#0a1f44]">A practical sequence with a clear destination.</h2>
      <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
        {modules.map((module, index) => {
          const Icon = stageIcons[index % stageIcons.length];
          const stageLabel = stageLabels[index % stageLabels.length];

          return (
            <article key={module.title} className="grid gap-3 py-4 sm:grid-cols-[64px_1fr_auto] sm:items-start">
              <div className="flex items-center gap-3 sm:block">
                <span className="grid size-9 place-items-center rounded-xl bg-[#e3ebf7] text-brand-secondary sm:size-10"><Icon className="size-4" aria-hidden="true" /></span>
                <span className="font-exo text-xl font-bold text-brand-secondary sm:mt-2 sm:block">0{index + 1}</span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">{stageLabel}</p>
                <h3 className="mt-1.5 text-base font-bold text-[#0a1f44]">{module.title}</h3>
                <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-600">{module.description}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500"><Clock3 className="size-3.5 text-brand-secondary" />{module.duration}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
