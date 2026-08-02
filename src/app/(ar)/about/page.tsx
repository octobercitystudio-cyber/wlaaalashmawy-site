import AboutPage from "@/components/pages/AboutPage";
import type { Metadata } from "next";
import { PAGE_SEO, SEO_KEYWORDS } from "@/lib/seo";
export const metadata: Metadata = {
  title: { absolute: PAGE_SEO.about.title },
  description: PAGE_SEO.about.description,
  keywords: SEO_KEYWORDS,
  alternates: { canonical: "/about/", languages: { ar: "/about/", en: "/en/about/" } },
  openGraph: { title: PAGE_SEO.about.title, description: PAGE_SEO.about.description, url: "/about/", type: "website" },
};
export default function Page() { return <AboutPage lang="ar" />; }
