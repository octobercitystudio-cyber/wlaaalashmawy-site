import ServicesPage from "@/components/pages/ServicesPage";
import type { Metadata } from "next";
import { PAGE_SEO, SEO_KEYWORDS } from "@/lib/seo";
export const metadata: Metadata = {
  title: { absolute: PAGE_SEO.services.title },
  description: PAGE_SEO.services.description,
  keywords: SEO_KEYWORDS,
  alternates: { canonical: "/services/", languages: { ar: "/services/", en: "/en/services/" } },
  openGraph: { title: PAGE_SEO.services.title, description: PAGE_SEO.services.description, url: "/services/", type: "website" },
};
export default function Page() { return <ServicesPage lang="ar" />; }
