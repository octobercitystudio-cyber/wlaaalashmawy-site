import ContactPage from "@/components/pages/ContactPage";
import type { Metadata } from "next";
import { PAGE_SEO, SEO_KEYWORDS } from "@/lib/seo";
export const metadata: Metadata = {
  title: { absolute: PAGE_SEO.contact.title },
  description: PAGE_SEO.contact.description,
  keywords: SEO_KEYWORDS,
  alternates: { canonical: "/contact/", languages: { ar: "/contact/", en: "/en/contact/" } },
  openGraph: { title: PAGE_SEO.contact.title, description: PAGE_SEO.contact.description, url: "/contact/", type: "website" },
};
export default function Page() { return <ContactPage lang="ar" />; }
