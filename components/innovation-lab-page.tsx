import { PublicPage } from "@/components/public-page";
import {
  InnovationSectionBrowser,
  type InnovationSection,
} from "@/components/innovation-section-browser";
import { StickyPageMenu } from "@/components/sticky-page-menu";
import { TechnologySectionBrowser } from "@/components/technology-section-browser";
import {
  fetchInnovationProducts,
  fetchInnovationServices,
  fetchInnovationSolutions,
  fetchTechnologyCategories,
} from "@/lib/strapi";
import type { InnovationItem } from "@/lib/innovation-data";
import { innovationItems } from "@/lib/innovation-data";
import type { TechnologyCategory } from "@/lib/technology-data";

export type ExploreSection =
  | InnovationSection
  | "technologies"
  | "programming-languages";

const sectionMenu = [
  { key: "product", label: "Product", href: "/innovation-lab" },
  { key: "services", label: "Services", href: "/innovation-lab/services" },
  { key: "solutions", label: "Solutions", href: "/innovation-lab/solutions" },
  {
    key: "technologies",
    label: "Technologies",
    href: "/innovation-lab/technologies",
  },
  {
    key: "programming-languages",
    label: "Programming languages",
    href: "/innovation-lab/programming-languages",
  },
];

/** Map a CMS innovation item to the local InnovationItem shape */
function mapCmsInnovationItem(
  item: Awaited<ReturnType<typeof fetchInnovationProducts>>[number],
): InnovationItem {
  return {
    id: item.productId,
    label: item.label,
    title: item.title,
    description: item.description,
    coreFeatures: (item.coreFeatures ?? []).map((f) => ({
      label: f.label,
      description: f.description,
      // icon is a client-side concern — not stored in CMS
    })),
    modules: item.modules,
    media: {
      kind: item.mediaKind,
      src: item.detailImage || item.mediaImage || "/images/second-image.jpeg",
      images:
        item.detailImages.length > 0
          ? item.detailImages
          : item.mediaImages.length > 0
            ? item.mediaImages
            : undefined,
      alt: item.mediaAlt,
    },
  };
}

function mapCmsServiceItem(
  item: Awaited<ReturnType<typeof fetchInnovationServices>>[number],
): InnovationItem {
  return {
    id: item.serviceId,
    label: item.label,
    title: item.label,
    description: item.description,
    coreFeatures:
      item.coreFeatures.length > 0
        ? item.coreFeatures.map((feature) => ({
            label: feature.label,
            description: feature.description,
          }))
        : [
            { label: "Main services", description: item.description },
            {
              label: "Delivery model",
              description:
                "Move from discovery and requirements through design, development, deployment, training, and support.",
            },
            {
              label: "Built for growth",
              description:
                "Create technology that fits real operational needs and can grow with the organization.",
            },
          ],
    media: {
      kind: item.mediaKind,
      src: item.mediaImage || "/images/second-image.jpeg",
      images: item.mediaImages.length > 0 ? item.mediaImages : undefined,
      alt: item.mediaAlt,
    },
  };
}

function mapCmsSolutionItem(
  item: Awaited<ReturnType<typeof fetchInnovationSolutions>>[number],
): InnovationItem {
  return {
    id: item.solutionId,
    label: item.label,
    title: item.label,
    description: item.description,
    subItems: item.subItems,
    coreFeatures: item.coreFeatures.map((feature) => ({
      label: feature.label,
      description: feature.description,
    })),
    media: {
      kind: item.mediaKind,
      src: item.mediaImage || "/images/summit.jpg",
      images: item.mediaImages.length > 0 ? item.mediaImages : undefined,
      alt: item.mediaAlt,
    },
  };
}

function mapCmsTechCategory(
  item: Awaited<ReturnType<typeof fetchTechnologyCategories>>[number],
): TechnologyCategory {
  return {
    id: item.categoryId,
    label: item.label,
    description: item.description,
    items: item.items,
    // icon is resolved client-side from the hardcoded lookup — not passed from the server
  };
}

export default async function InnovationLabPage({
  section,
}: {
  section: ExploreSection;
}) {
  // Fetch all innovation data in parallel
  const [cmsProducts, cmsServices, cmsSolutions, cmsTechCategories] =
    await Promise.all([
      fetchInnovationProducts(),
      fetchInnovationServices(),
      fetchInnovationSolutions(),
      fetchTechnologyCategories(),
    ]);

  // Map CMS → InnovationItem shape. Pass undefined when CMS is empty so
  // the client component handles its own fallback to hardcoded data (with icons).
  const cmsProductItems = cmsProducts.map(mapCmsInnovationItem);
  const localProducts = innovationItems.product;
  const localSanHrmIs = localProducts.find((item) => item.id === "san-hrmis");
  const products =
    cmsProducts.length > 0
      ? [
          ...cmsProductItems.map((item) =>
            item.id === "san-hrmis" && localSanHrmIs
              ? { ...item, modules: localSanHrmIs.modules }
              : item,
          ),
          ...localProducts.filter(
            (fallback) =>
              !cmsProductItems.some((item) => item.id === fallback.id),
          ),
        ]
      : undefined;
  const services =
    cmsServices.length > 0 ? cmsServices.map(mapCmsServiceItem) : undefined;
  const solutions =
    cmsSolutions.length > 0 ? cmsSolutions.map(mapCmsSolutionItem) : undefined;
  const techCategories =
    cmsTechCategories.length > 0
      ? cmsTechCategories.map(mapCmsTechCategory)
      : undefined;

  // Pick the right items for the current section
  const sectionItems: Record<
    InnovationSection,
    readonly InnovationItem[] | undefined
  > = {
    product: products,
    services: services,
    solutions: solutions,
  };

  return (
    <PublicPage>
      <StickyPageMenu
        items={sectionMenu}
        activeKey={section}
        ariaLabel="Explore Solutions sections"
        translationKey="innovation"
      />
      <section className="border-t border-slate-200 px-6 pb-10 pt-2 sm:px-10 lg:px-16 lg:pb-16 lg:pt-4">
        <div className="mx-auto max-w-7xl rounde-md bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          {section === "technologies" ? (
            <TechnologySectionBrowser cmsCategories={techCategories} />
          ) : section === "programming-languages" ? (
            <TechnologySectionBrowser
              mode="programming-languages"
              cmsCategories={techCategories}
            />
          ) : (
            <InnovationSectionBrowser
              section={section}
              cmsItems={sectionItems[section]}
            />
          )}
        </div>
      </section>
    </PublicPage>
  );
}
