import type { Lang } from "@/lib/dictionary";

type ServiceRoute = {
  id: number;
  slug: string;
  aliases: string[];
};

export const serviceRoutes: ServiceRoute[] = [
  {
    id: 1,
    slug: "accounting-services",
    aliases: ["bookkeeping", "payroll", "financial-consulting", "ifrs"],
  },
  { id: 2, slug: "audit-services", aliases: ["internal-audit"] },
  { id: 3, slug: "tax-services", aliases: ["vat-services"] },
  { id: 4, slug: "company-formation", aliases: [] },
  {
    id: 5,
    slug: "tax-procedures",
    aliases: ["e-invoice", "e-receipt"],
  },
  { id: 6, slug: "tax-examination", aliases: [] },
  { id: 7, slug: "investor-residency", aliases: [] },
  { id: 8, slug: "industrial-licensing", aliases: [] },
];

export const allServiceSlugs = serviceRoutes.flatMap((route) => [
  route.slug,
  ...route.aliases,
]);

export function serviceIdFromSlug(slug: string): number | null {
  const route = serviceRoutes.find(
    (item) => item.slug === slug || item.aliases.includes(slug),
  );
  return route?.id ?? null;
}

export function canonicalServiceSlug(id: string | number): string | null {
  return serviceRoutes.find((item) => item.id === Number(id))?.slug ?? null;
}

export function servicePath(id: string | number, lang: Lang): string {
  const slug = canonicalServiceSlug(id);
  const prefix = lang === "en" ? "/en" : "";
  return slug ? `${prefix}/${slug}` : `${prefix}/services/${id}`;
}
