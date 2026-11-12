import { PublicPage } from "@/components/public-page";
import type { SharedContentItem } from "@/components/shared-content-browser";
import { OurLegacyContent } from "@/components/our-legacy-content";
import { fetchRecognitions, fetchTeamMembers, fetchJourneyStages, fetchCompanyValues, fetchFocusAreas, fetchStandards, fetchCertificates, fetchLegacyContent } from "@/lib/strapi";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Our Legacy",
    description: "Discover SAN TECH's journey, mission, people, standards, and the work behind useful technology.",
    path: "/our-legacy",
  });
}

const legacyMenu = [
  { key: "who-we-are", label: "Who we are", href: "/our-legacy" },
  { key: "journey", label: "Our journey", href: "/our-legacy?section=journey" },
  { key: "focus", label: "Our focus", href: "/our-legacy?section=focus" },
  { key: "mission", label: "Mission & vision", href: "/our-legacy?section=mission" },
  { key: "recognition", label: "Recognition", href: "/our-legacy?section=recognition" },
  { key: "certificate", label: "Certificate", href: "/our-legacy?section=certificate" },
  { key: "leadership", label: "Leadership", href: "/our-legacy?section=leadership&view=executive" },
  { key: "profile", label: "Company profile", href: "/our-legacy?section=profile" },
  { key: "standards", label: "Standards", href: "/our-legacy?section=standards" },
] as const;

const legacyItems: SharedContentItem[] = [
  {
    id: "who-we-are",
    label: "Who we are",
    title: "Technology with a human reason.",
    description: "SAN TECH is a technological company focused on digital transformation and innovation.",
    content: "identity",
  },
  {
    id: "journey",
    label: "Our journey",
    title: "SAN TECH Journey at a Glance",
    description: "A decade of turning practical problems into technology, capability, partnerships, and a growing African innovation ecosystem.",
    content: "journey",
  },
  {
    id: "focus",
    label: "Our focus",
    title: "Turning capability into useful progress.",
    description: "From software and AI to training and deployment, SAN TECH brings the capabilities needed to move from a challenge or idea to a working solution.",
    content: "focus",
  },
  {
    id: "mission",
    label: "Mission & vision",
    title: "Useful systems. Wider possibility.",
    description: "Our mission is to build technology and pathways that help people and institutions move forward with confidence.",
    content: "mission",
  },
  {
    id: "recognition",
    label: "Recognition",
    title: "Recognition belongs to the ecosystem.",
    description: "Our work is shaped by the people and partners who make every product, program, and outcome possible.",
    content: "recognition",
  },
  {
    id: "certificate",
    label: "Certificate",
    title: "SAN TECH Certificate",
    description: "SAN TECH Certificate",
    content: "certificate",
  },
  {
    id: "leadership",
    label: "Leadership",
    title: "The people behind useful progress.",
    description: "SAN TECH is led by a focused direction team and supported by employees who bring technology, learning, and delivery together.",
    details: [
      "Executive direction keeps SAN TECH focused on useful products, responsible innovation, and opportunities that create measurable impact.",
      "Our team brings together software engineering, product and design, innovation and research, and community programs.",
    ],
    facts: [
      { label: "Executive direction", value: "Founder & CEO · Co-founder & COO/CFO" },
      { label: "Our team", value: "Builders · researchers · educators" },
      { label: "Working style", value: "Accountable and close to the work" },
    ],
    content: "leadership",
  },
  {
    id: "profile",
    label: "Company profile",
    title: "Turning Ideas into Impact.",
    description: "SAN TECH is a Kigali-based technology and innovation company that connects people, ideas, and technology to create digital products, strengthen organizations, and grow the next generation of builders.",
    content: "profile",
  },
  {
    id: "standards",
    label: "Standards",
    title: "Standards that make trust visible.",
    description: "A growing collection of certifications and trust seals that reflect the standards behind SAN TECH's products and delivery.",
    content: "standards",
  },
];

export default async function OurLegacyPage() {
  const [cmsRecognitions, cmsTeamMembers, cmsJourneyStages, cmsCompanyValues, cmsFocusAreas, cmsStandards, cmsCertificates, cmsLegacyContent] = await Promise.all([
    fetchRecognitions(),
    fetchTeamMembers(),
    fetchJourneyStages(),
    fetchCompanyValues(),
    fetchFocusAreas(),
    fetchStandards(),
    fetchCertificates(),
    fetchLegacyContent(),
  ]);

  return (
    <PublicPage>
      <OurLegacyContent
        legacyMenu={legacyMenu}
        legacyItems={legacyItems}
        cmsRecognitions={cmsRecognitions}
        cmsTeamMembers={cmsTeamMembers}
        cmsJourneyStages={cmsJourneyStages}
        cmsCompanyValues={cmsCompanyValues}
        cmsFocusAreas={cmsFocusAreas}
        cmsStandards={cmsStandards}
        cmsCertificates={cmsCertificates}
        cmsLegacyContent={cmsLegacyContent}
      />
    </PublicPage>
  );
}
