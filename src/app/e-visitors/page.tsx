import { EVisitorsProductPage } from "@/components/e-visitors-product-page";
import { fetchTestimonials, fetchEVisitorsFeatures, fetchProductMilestones, fetchFaqItems, fetchSiteSettings } from "@/lib/strapi";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "E-Visitors",
    description: "A connected visitor and access-management platform for safer, more visible institutions.",
    path: "/e-visitors",
  });
}

export default async function EVisitorsPage() {
  const [cmsTestimonials, cmsFeatures, cmsMilestones, cmsFaqs, siteSettings] = await Promise.all([
    fetchTestimonials(),
    fetchEVisitorsFeatures(),
    fetchProductMilestones("e-visitors"),
    fetchFaqItems("e-visitors"),
    fetchSiteSettings(),
  ]);
  return (
    <EVisitorsProductPage
      cmsTestimonials={cmsTestimonials}
      cmsFeatures={cmsFeatures}
      cmsMilestones={cmsMilestones}
      cmsFaqs={cmsFaqs}
      videoSrc={siteSettings?.eVisitorsVideo ?? undefined}
      videoPoster={siteSettings?.eVisitorsVideoPoster ?? siteSettings?.homepageVideoPoster ?? undefined}
      bookingUrl={siteSettings?.calendlyUrl ?? undefined}
    />
  );
}
