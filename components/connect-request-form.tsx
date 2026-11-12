"use client";

import { ArrowUpRight, Handshake, MessageCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { PhoneNumberField } from "@/components/phone-number-field";

type ConnectTopic = "talk" | "partnership";

const topicCopy: Record<
  ConnectTopic,
  { label: string; title: string; description: string; button: string }
> = {
  talk: {
    label: "Connect with us",
    title: "Tell us what you are trying to move forward.",
    description:
      "Share the context and we will route your message to the right SAN TECH team.",
    button: "Send message",
  },
  partnership: {
    label: "Partner with us",
    title: "Build a useful partnership.",
    description:
      "Tell us what you want to create, support, sponsor, or scale with SAN TECH.",
    button: "Start request",
  },
};

const inputClass =
  "h-9 rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-normal text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary focus:bg-white";
const labelClass = "grid gap-1 text-[11px] font-bold text-[#0a1f44]";

export function ConnectRequestForm({
  initialTopic = "talk",
}: {
  initialTopic?: ConnectTopic;
}) {
  const [topic, setTopic] = useState<ConnectTopic>(initialTopic);
  const [submitted, setSubmitted] = useState(false);
  const copy = topicCopy[topic];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      className="rounde-md border border-slate-200 bg-white p-4 sm:p-6"
      aria-labelledby="contact-form-title"
    >
      <div
        className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3"
        aria-label="Conversation type"
      >
        <span className="rounded-lg bg-[#0a1f44] px-3 py-2 text-[11px] font-bold leading-4 text-white">
          Connect with us
        </span>
        {topic === "talk" && (
          <button
            type="button"
            onClick={() => {
              setTopic("partnership");
              setSubmitted(false);
            }}
            className="rounded-lg bg-slate-50 px-3 py-2 text-[11px] font-bold leading-4 text-slate-600 transition-colors hover:bg-[#edf1f7] hover:text-[#0a1f44]"
          >
            Partner with us
          </button>
        )}
      </div>

      {submitted ? (
        <div className="py-7">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">
            Request prepared
          </p>
          <h2
            id="contact-form-title"
            className="font-exo mt-2 text-xl font-bold leading-tight tracking-[-0.04em] text-[#0a1f44]"
          >
            We have your starting point.
          </h2>
          <p className="mt-2 max-w-xl text-xs leading-5 text-slate-600">
            Thank you for contacting SAN TECH about {copy.label.toLowerCase()}.
            Our team can now follow up with the next step.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0a1f44] px-3.5 py-2 text-[11px] font-bold text-white transition-colors hover:bg-brand-secondary"
          >
            Send another request <ArrowUpRight className="size-3.5" />
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid gap-3 pt-4 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">
              {copy.label}
            </p>
            <h2
              id="contact-form-title"
              className="font-exo mt-1.5 text-lg font-bold leading-tight tracking-[-0.035em] text-[#0a1f44]"
            >
              {copy.title}
            </h2>
            <p className="mt-1.5 text-xs leading-5 text-slate-600">
              {copy.description}
            </p>
          </div>

          <label className={labelClass}>
            Name
            <input
              required
              minLength={2}
              name="name"
              className={inputClass}
              placeholder="Your full name"
            />
          </label>
          <label className={labelClass}>
            Email
            <input
              required
              type="email"
              name="email"
              className={inputClass}
              placeholder="you@example.com"
            />
          </label>
          <label className={labelClass}>
            Organization
            <input
              required={topic !== "talk"}
              minLength={2}
              name="organization"
              className={inputClass}
              placeholder="Company or institution"
            />
          </label>
          <PhoneNumberField
            label="Phone"
            required
            numberName="phone"
            labelClassName={labelClass}
            inputClassName={inputClass}
            selectClassName={inputClass}
          />

          {topic === "partnership" && (
            <label className={`${labelClass} sm:col-span-2`}>
              Partnership type
              <select
                required
                defaultValue=""
                name="partnershipType"
                className={inputClass}
              >
                <option value="" disabled>
                  Select partnership type
                </option>
                <option>Program partnership</option>
                <option>Sponsorship</option>
                <option>Technology partnership</option>
                <option>Research collaboration</option>
              </select>
            </label>
          )}

          <label className={`${labelClass} sm:col-span-2`}>
            Message
            <textarea
              required
              minLength={20}
              name="message"
              rows={3}
              className="resize-y rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs font-normal text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary focus:bg-white"
              placeholder="Tell us what you are trying to move forward..."
            />
          </label>
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0a1f44] px-4 text-xs font-bold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 sm:col-span-2"
          >
            {copy.button} <Send className="size-3.5" aria-hidden="true" />
          </button>
        </form>
      )}
    </section>
  );
}

export const connectTopicIcons = {
  talk: MessageCircle,
  partnership: Handshake,
} as const;
