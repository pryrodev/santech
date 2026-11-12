"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  Check,
  Mail,
  MapPin,
  Phone,
  Radio,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { navigation } from "@/lib/site-data";
import {
  languageOptions,
  manualHeaderCopy,
  type SupportedLanguage,
} from "@/lib/manual-translations";
import santechLogo from "@/src/assets/santech.png";

type Language = SupportedLanguage;

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    santechApplyGoogleLanguage?: (language: Language) => void;
    santechResetGoogleLanguage?: () => void;
    santechGoogleObserver?: MutationObserver;
  }
}

function CommunityCta({
  mobile = false,
  onClick,
  label,
}: {
  mobile?: boolean;
  onClick?: () => void;
  label: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link
      href="/join-the-community"
      prefetch={true}
      onClick={onClick}
      className={`group relative isolate inline-flex items-center justify-center overflow-hidden rounded-xl bg-[#0a1f44] font-extrabold uppercase text-white shadow-md transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#132f61] hover:shadow-[0_10px_26px_rgba(0,163,224,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2 active:translate-y-0 ${
        mobile
          ? "w-full gap-2 px-5 py-3.5 text-sm tracking-wider"
          : "gap-1 px-3 py-2 text-[11px] tracking-[0.06em] 2xl:gap-1.5 2xl:px-4 2xl:text-xs 2xl:tracking-wider"
      }`}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 z-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[#50e4f6]/45 to-transparent"
        animate={prefersReducedMotion ? { x: "-20%" } : { x: ["-20%", "280%"] }}
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : {
                duration: 3.4,
                delay: 0.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1.8,
              }
        }
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-xl bg-[#00A3E0]/10"
        animate={
          prefersReducedMotion
            ? { opacity: 0.1 }
            : { opacity: [0.08, 0.22, 0.08] }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 2.8, ease: "easeInOut", repeat: Infinity }
        }
      />
      <span className="relative z-10">{label}</span>
    </Link>
  );
}

export function SiteHeader({ landing = false }: { landing?: boolean }) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [googleTranslateRequested, setGoogleTranslateRequested] =
    useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const selectedLanguage =
    languageOptions.find((option) => option.code === language) ??
    languageOptions[0];
  const copy = manualHeaderCopy[language];

  useEffect(() => {
    document.documentElement.lang = language === "ch" ? "zh-CN" : language;
    document.documentElement.dataset.santechLanguage = language;
  }, [language]);

  useEffect(() => {
    const savedLang = localStorage.getItem("santech_lang") as Language | null;
    if (
      savedLang &&
      languageOptions.some((option) => option.code === savedLang)
    ) {
      const stateTimer = window.setTimeout(() => {
        setLanguage(savedLang);
        if (savedLang !== "en") setGoogleTranslateRequested(true);
      }, 0);
      return () => window.clearTimeout(stateTimer);
    }
  }, []);

  function handleLanguageChange(newLang: Language) {
    setLanguage(newLang);
    setLangDropdownOpen(false);
    localStorage.setItem("santech_lang", newLang);
    if (newLang === "en") {
      setGoogleTranslateRequested(false);
      window.santechResetGoogleLanguage?.();
    } else {
      setGoogleTranslateRequested(true);
      window.santechApplyGoogleLanguage?.(newLang);
    }
    window.dispatchEvent(
      new CustomEvent("santech-language-change", { detail: { lang: newLang } }),
    );
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(target)
      ) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (langDropdownOpen) {
      window.googleTranslateElementInit?.();
    }
  }, [langDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function isActiveRoute(href: string) {
    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      data-landing={landing || undefined}
      className="notranslate fixed inset-x-0 top-0 z-[100] transition-all"
      translate="no"
    >
      {googleTranslateRequested && (
        <Script
          id="google-translate-script"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      )}
      <div
        id="google_translate_element"
        className="google-translate-hidden"
        translate="yes"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden bg-[#0a1f44] text-white">
        <div className="mx-auto flex min-h-9 min-w-0 max-w-[1600px] items-center justify-between gap-2 px-4 py-1 text-[10px] font-semibold sm:px-6 sm:text-xs 2xl:px-8">
          <a
            href="tel:+250780309833"
            className="inline-flex min-w-0 flex-1 items-center gap-1.5 transition-colors hover:text-[#00A3E0] xl:flex-none xl:gap-2"
          >
            <Phone className="size-3 shrink-0 sm:size-3.5" />
            <span className="truncate">+250780309833 / +22371005873</span>
          </a>
          <span className="inline-flex min-w-0 flex-1 items-center justify-end gap-1.5 text-right xl:flex-none xl:gap-2">
            <MapPin className="size-3 shrink-0 sm:size-3.5" />
            <span className="truncate">
              Plot 48, KN 1 Road, Sofaru Building, 3rd Floor,
              Muhima-Kigali-Rwanda
            </span>
          </span>
          <a
            href="mailto:info@santechconnect.com"
            className="hidden items-center gap-2 transition-colors hover:text-[#00A3E0] xl:inline-flex"
          >
            <Mail className="size-4" />
            <span className="truncate">info@santechconnect.com</span>
          </a>
          <Link
            href="https://zeno.fm/radio/san-tech/"
            target="_blank"
            className="hidden items-center gap-2 2xl:inline-flex"
          >
            <Radio className="size-4" />
            <span>santech</span>
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`relative z-30 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5"
            : "bg-white border-b border-slate-200/60 py-3.5"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-3 sm:px-6 2xl:px-8">
          {/* Logo on Left */}
          <Link
            href="/"
            className="group flex items-center gap-3 shrink-0"
            onClick={() => setOpen(false)}
          >
            <Image
              src={santechLogo}
              alt="SAN TECH - Technology · Innovation · Skills · Impact"
              className="h-8 w-auto max-w-[135px] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-9 sm:max-w-[150px] 2xl:h-10 2xl:max-w-[175px]"
              priority
            />
          </Link>

          {/* Navigation Links from PDF Spec */}
          <div className="hidden items-center gap-1 xl:flex 2xl:gap-4">
            <nav
              className="flex items-center gap-0 2xl:gap-1.5"
              aria-label="Main navigation"
            >
              {navigation.map((item) => {
                const active = isActiveRoute(item.href);
                const linkClassName = `relative rounded-lg px-2 py-1.5 text-[11px] font-bold tracking-[0.03em] transition-all duration-200 2xl:px-2.5 2xl:text-xs 2xl:tracking-[0.04em] ${
                  active
                    ? "text-[#0a1f44]"
                    : "text-slate-700 hover:text-[#0a1f44]"
                }`;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    aria-current={active ? "page" : undefined}
                    className={linkClassName}
                  >
                    {copy.navigation[item.label] ?? item.label}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full bg-[#0a1f44]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="relative z-[110] flex items-center gap-1.5 border-l border-slate-200 pl-1.5 2xl:gap-2.5 2xl:pl-2">
              {/* Language Selector Dropdown */}
              <div className="relative" ref={dropdownRef} data-no-translate>
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-semibold text-slate-700 shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50 2xl:gap-1.5 2xl:px-2.5 2xl:text-xs"
                  aria-expanded={langDropdownOpen}
                  aria-label={copy.selectLanguage}
                >
                  <img
                    src={`https://flagcdn.com/w20/${selectedLanguage.flag}.png`}
                    alt=""
                    aria-hidden="true"
                    className="h-3.5 w-5 object-cover"
                  />
                  <span>{copy.languageName}</span>
                  <ChevronDown
                    className={`size-3 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  <motion.div
                    initial={false}
                    animate={
                      langDropdownOpen
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 6, scale: 0.96 }
                    }
                    transition={{ duration: 0.15 }}
                    aria-hidden={!langDropdownOpen}
                    className={`absolute right-0 z-[120] mt-1.5 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ${langDropdownOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"}`}
                  >
                    {languageOptions.map(({ code, label, flag }) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => handleLanguageChange(code)}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                          language === code
                            ? "bg-[#333292]/10 text-[#333292] font-bold"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span className="inline-flex items-center gap-2">
                          <img
                            src={`https://flagcdn.com/w20/${flag}.png`}
                            alt=""
                            aria-hidden="true"
                            className="h-3.5 w-5 object-cover"
                          />
                          {label}
                        </span>
                        {language === code && (
                          <Check className="size-3.5 text-[#333292]" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Visually Prominent CTA Button: JOIN THE COMMUNITY */}
              <CommunityCta label={copy.joinCommunity} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <div ref={mobileDropdownRef} className="relative" data-no-translate>
              <button
                type="button"
                onClick={() => setLangDropdownOpen((open) => !open)}
                aria-expanded={langDropdownOpen}
                aria-label={copy.selectLanguage}
                className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-[#333292]"
              >
                <img
                  src={`https://flagcdn.com/w20/${selectedLanguage.flag}.png`}
                  alt=""
                  aria-hidden="true"
                  className="h-3.5 w-5 object-cover"
                />
                <span>{language.toUpperCase()}</span>
                <ChevronDown
                  className={`size-3 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                <motion.div
                  initial={false}
                  animate={
                    langDropdownOpen
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 5, scale: 0.96 }
                  }
                  transition={{ duration: 0.15 }}
                  aria-hidden={!langDropdownOpen}
                  className={`absolute right-0 top-full z-[130] mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ${langDropdownOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"}`}
                >
                  {languageOptions.map(({ code, label, flag }) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleLanguageChange(code)}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors ${
                        language === code
                          ? "bg-[#333292]/10 font-bold text-[#333292]"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <img
                          src={`https://flagcdn.com/w20/${flag}.png`}
                          alt=""
                          aria-hidden="true"
                          className="h-3.5 w-5 object-cover"
                        />
                        {label}
                      </span>
                      {language === code && (
                        <Check className="size-3.5 text-[#333292]" />
                      )}
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              type="button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs hover:bg-slate-100"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="relative h-2 overflow-hidden bg-white" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/imingogo-trimmed.png')",
            backgroundPosition: "center bottom",
            backgroundRepeat: "repeat-x",
            backgroundSize: "44px 22px",
          }}
        />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="mx-3 mt-2 overflow-hidden rounde-md border border-slate-200/90 bg-white/98 shadow-2xl backdrop-blur-2xl xl:hidden"
          >
            <div className="flex flex-col gap-1 p-5">
              {navigation.map((item) => {
                const active = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                      active
                        ? "bg-[#333292]/10 text-[#333292]"
                        : "text-slate-700 hover:bg-slate-50 hover:text-[#333292]"
                    }`}
                  >
                    <span>{copy.navigation[item.label] ?? item.label}</span>
                    {active && (
                      <span className="size-1.5 rounded-full bg-[#333292]" />
                    )}
                  </Link>
                );
              })}

              <div className="mt-2 w-full">
                <CommunityCta
                  mobile
                  onClick={() => setOpen(false)}
                  label={copy.joinCommunity}
                />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
