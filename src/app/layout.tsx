import type { Metadata } from "next";
import { Exo } from "next/font/google";
import Script from "next/script";
import { fetchSiteSettings } from "@/lib/strapi";
import { NavigationProgress } from "@/components/navigation-progress";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

const exo = Exo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings();
  const title = settings?.seo?.title || settings?.siteTitle || "SAN TECH | Technology. Innovation. Impact.";
  const description = settings?.seo?.description || settings?.siteDescription || "SAN TECH builds technology, skills, and innovation systems for a more connected Africa.";
  const icon = settings?.favicon || settings?.logo || "/santech.png";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://santechconnect.com"),
    title,
    description,
    keywords: settings?.seo?.keywords || undefined,
    alternates: settings?.seo?.canonicalUrl ? { canonical: settings.seo.canonicalUrl } : undefined,
    robots: settings?.seo?.noIndex ? { index: false, follow: false } : undefined,
    icons: {
      icon,
      shortcut: icon,
      apple: icon,
    },
    openGraph: settings?.seo?.shareImage
      ? {
          title,
          description,
          images: [settings.seo.shareImage],
        }
      : undefined,
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={exo.variable} data-scroll-behavior="smooth">
      <body className={exo.className}>
        <Script id="santech-language-scale-init" strategy="beforeInteractive">
          {`try {
            var savedLanguage = window.localStorage && window.localStorage.getItem("santech_lang");
            if (savedLanguage && savedLanguage !== "en") {
              document.documentElement.dataset.santechLanguage = savedLanguage;
            }
          } catch (_) {}`}
        </Script>
        <QueryProvider>
          <NavigationProgress />
          {children}
        </QueryProvider>
        <Script id="google-translate-init" strategy="afterInteractive">
          {`window.googleTranslateElementInit = function () {
            var hideGoogleChrome = function () {
              var googleControls = document.querySelectorAll(
                ".skiptranslate, .goog-te-banner-frame, .goog-te-ftab, .goog-te-balloon-frame, .goog-te-menu-frame, #goog-gt-tt, #goog-gt-vt"
              );
              googleControls.forEach(function (element) {
                if (element.closest("#google_translate_element")) return;
                element.style.setProperty("display", "none", "important");
                element.style.setProperty("visibility", "hidden", "important");
              });
            };

            hideGoogleChrome();
            if (!window.santechGoogleObserver) {
              window.santechGoogleObserver = new MutationObserver(hideGoogleChrome);
              window.santechGoogleObserver.observe(document.body, { childList: true, subtree: true });
            }

            var target = document.getElementById("google_translate_element");

            if (target && !target.childElementCount && window.google && window.google.translate) {
              new window.google.translate.TranslateElement(
                { pageLanguage: "en", autoDisplay: false },
                "google_translate_element"
              );
            }

            window.santechApplyGoogleLanguage = function (language, attempt) {
              var googleLanguage = language === "ch" ? "zh-CN" : language;
              var targetValue = googleLanguage;
              var selects = document.querySelectorAll("select.goog-te-combo");
              var applied = false;

              selects.forEach(function (select) {
                var hasTarget = Array.prototype.some.call(select.options, function (option) {
                  return option.value === targetValue;
                });

                if (!hasTarget) return;
                select.value = targetValue;
                select.dispatchEvent(new Event("change"));
                applied = true;
              });

              // Google adds the options asynchronously. Retry until the exact
              // language exists so rw cannot fall back to a previous language.
              var nextAttempt = (attempt || 0) + 1;
              if (!applied && nextAttempt < 40) {
                window.setTimeout(function () {
                  window.santechApplyGoogleLanguage(language, nextAttempt);
                }, 150);
              }
            };

            window.santechResetGoogleLanguage = function () {
              var expires = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
              document.cookie = "googtrans=; " + expires + "; path=/";
              document.cookie = "googtrans=; " + expires + "; path=/; domain=" + window.location.hostname;
              window.location.reload();
            };

            var savedLanguage = window.localStorage && window.localStorage.getItem("santech_lang");
            if (savedLanguage && savedLanguage !== "en") {
              window.santechApplyGoogleLanguage(savedLanguage);
            }
          };`}
        </Script>
      </body>
    </html>
  );
}



