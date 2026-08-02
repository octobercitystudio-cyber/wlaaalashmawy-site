import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import ClientTracker from "@/components/ClientTracker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { fetchArticles, fetchFeatures, fetchSectors, fetchSettings, fetchServices, fetchStats, fetchTestimonials } from "@/lib/api";
import { SiteContentProvider } from "@/components/SiteContentProvider";
import LiveSeo from "@/components/LiveSeo";
import { normalizeWhatsAppNumber, parseSettingList } from "@/lib/contact";
import { BRAND_EN } from "@/lib/seo";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings();
  const title = `${BRAND_EN} | Accounting, Audit & Tax Services in Egypt`;
  const description = settings.seo_desc_en || "AFC provides professional accounting, audit, tax, company formation and financial advisory services in Egypt.";
  return {
    metadataBase: new URL("https://www.afc-cpa.com"),
    title: {
      default: title,
      template: `%s | ${BRAND_EN}`
    },
    description,
    keywords: ["Accounting Firm Egypt", "Audit Firm Egypt", "Tax Consultants Egypt", "Bookkeeping Services Egypt", "CPA Egypt", "Wlaa Magdy", "AFC"],
    alternates: {
      canonical: "/en/",
      languages: { ar: "/", en: "/en/" },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["ar_EG"],
      url: "/en/",
      siteName: BRAND_EN,
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

export default async function EnLayout({
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
  const address = settings.contact_address_en || "Office 204, 2nd Floor, Agyad View Mall, 6th of October, Giza, Egypt";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AccountingService"],
    name: BRAND_EN,
    image: "https://www.afc-cpa.com/Logo.png",
    logo: "https://www.afc-cpa.com/Logo.png",
    "@id": "https://www.afc-cpa.com/#business",
    url: "https://www.afc-cpa.com/en/",
    telephone: `+${telephone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "6th of October",
      addressRegion: "Giza",
      addressCountry: "EG",
    },
    founder: { "@type": "Person", name: "Wlaa Magdy Al-Ashmawy" },
    description: "Accounting, audit, tax and financial advisory services for companies and investors.",
  };

  return (
    <html lang="en" dir="ltr" className={`${montserrat.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteContentProvider initialContent={{ settings, services, sectors, features, stats, testimonials, articles }}>
          <VisualEditorProvider>
            <ClientTracker />
            <LiveSeo />
            <Navbar settings={settings} services={services} lang="en" />
            <div id="main-content" className="flex flex-col min-h-full">
              {children}
            </div>
            <Footer settings={settings} services={services} lang="en" />
            <WhatsAppButton settings={settings} />
          </VisualEditorProvider>
        </SiteContentProvider>
      </body>
    </html>
  );
}

