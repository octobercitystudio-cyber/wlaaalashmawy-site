import ServiceDetailsPage from "@/components/pages/ServiceDetailsPage";
import { fetchServices } from "@/lib/api";
import type { Metadata } from "next";
import { canonicalServiceSlug } from "@/lib/serviceRoutes";
import { SEO_KEYWORDS, SERVICE_SEO } from "@/lib/seo";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const services = await fetchServices();
  return services.map((service: any) => ({
    id: service.id.toString(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const services = await fetchServices();
  const service = services.find((item: any) => String(item.id) === id);
  const slug = canonicalServiceSlug(id);
  if (!service || !slug) return { robots: { index: false, follow: false } };
  const seo = SERVICE_SEO[Number(id)] || { title: service.title, description: service.description };

  return {
    title: { absolute: seo.title },
    description: seo.description,
    keywords: SEO_KEYWORDS,
    alternates: {
      canonical: `https://www.afc-cpa.com/${slug}/`,
      languages: {
        ar: `https://www.afc-cpa.com/${slug}/`,
        en: `https://www.afc-cpa.com/en/${slug}/`,
      },
    },
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  return <ServiceDetailsPage id={resolvedParams.id} lang="ar" />; 
}
