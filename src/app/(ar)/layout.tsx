import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "../globals.css";
import ClientTracker from "@/components/ClientTracker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { fetchArticles, fetchFeatures, fetchSectors, fetchSettings, fetchServices, fetchStats, fetchTestimonials } from "@/lib/api";
import { SiteContentProvider } from "@/components/SiteContentProvider";
import LiveSeo from "@/components/LiveSeo";
import { normalizeWhatsAppNumber, parseSettingList } from "@/lib/contact";
import { BRAND_AR, GOOGLE_BUSINESS_DESCRIPTION, HOME_SEO, SEO_KEYWORDS } from "@/lib/seo";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const title = HOME_SEO.title;
  const description = HOME_SEO.description;
  return {
    metadataBase: new URL("https://www.afc-cpa.com"),
    title: {
      default: title,
      template: `%s | ${BRAND_AR}`
    },
    description,
    keywords: SEO_KEYWORDS,
    alternates: {
      canonical: "/",
      languages: { ar: "/", en: "/en/" },
    },
    openGraph: {
      type: "website",
      locale: "ar_EG",
      alternateLocale: ["en_US"],
      url: "/",
      siteName: BRAND_AR,
      title,
      description,
      images: [{ url: "/hero_egypt.jpg", width: 1376, height: 768, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/hero_egypt.jpg"],
    },
  };
}

import { VisualEditorProvider } from "@/components/editor/VisualEditorProvider";

export default async function ArLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, services, sectors, features, stats, testimonials, articles] = await Promise.all([
    fetchSettings(), fetchServices(), fetchSectors(), fetchFeatures(), fetchStats(), fetchTestimonials(), fetchArticles(),
  ]);
  const phones = parseSettingList(settings.contact_phones);
  const telephone = normalizeWhatsAppNumber(
    settings.contact_whatsapp || settings.whatsapp || phones[0],
  );
  const address = settings.contact_address || "مكتب 204، الدور الثاني، مول أجياد فيو، 6 أكتوبر، الجيزة، مصر";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AccountingService"],
    name: BRAND_AR,
    image: "https://www.afc-cpa.com/Logo.png",
    logo: "https://www.afc-cpa.com/Logo.png",
    "@id": "https://www.afc-cpa.com/#business",
    url: "https://www.afc-cpa.com/",
    telephone: `+${telephone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "6 أكتوبر",
      addressRegion: "الجيزة",
      addressCountry: "EG",
    },
    founder: { "@type": "Person", name: "ولاء مجدي العشماوي", jobTitle: "محاسب قانوني CPA" },
    areaServed: ["6 أكتوبر", "الشيخ زايد", "الجيزة", "مصر"],
    description: settings.google_business_description || GOOGLE_BUSINESS_DESCRIPTION,
  };

  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <a className="skip-link" href="#main-content">انتقل إلى المحتوى الرئيسي</a>
        <SiteContentProvider initialContent={{ settings, services, sectors, features, stats, testimonials, articles }}>
          <VisualEditorProvider>
            <ClientTracker />
            <LiveSeo />
            <Navbar settings={settings} services={services} lang="ar" />
            <div id="main-content" className="flex flex-col min-h-full">
              {children}
            </div>
            <Footer settings={settings} services={services} lang="ar" />
            <WhatsAppButton settings={settings} />
          </VisualEditorProvider>
        </SiteContentProvider>
      </body>
    </html>
  );
}

