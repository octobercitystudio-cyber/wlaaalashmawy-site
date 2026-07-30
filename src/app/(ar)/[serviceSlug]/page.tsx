import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailsPage from "@/components/pages/ServiceDetailsPage";
import { fetchServices } from "@/lib/api";
import {
  allServiceSlugs,
  canonicalServiceSlug,
  serviceIdFromSlug,
} from "@/lib/serviceRoutes";

export const dynamicParams = false;

export function generateStaticParams() {
  return allServiceSlugs.map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;
  const id = serviceIdFromSlug(serviceSlug);
  const services = await fetchServices();
  const service = services.find((item: any) => Number(item.id) === id);

  if (!id || !service) {
    return { robots: { index: false, follow: false } };
  }

  const canonicalSlug = canonicalServiceSlug(id)!;
  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `https://www.afc-cpa.com/${canonicalSlug}/`,
      languages: {
        ar: `https://www.afc-cpa.com/${canonicalSlug}/`,
        en: `https://www.afc-cpa.com/en/${canonicalSlug}/`,
      },
    },
    robots:
      serviceSlug === canonicalSlug
        ? { index: true, follow: true }
        : { index: false, follow: true },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;
  const id = serviceIdFromSlug(serviceSlug);
  if (!id) notFound();

  return <ServiceDetailsPage id={String(id)} lang="ar" />;
}
