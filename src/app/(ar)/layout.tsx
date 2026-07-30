import type { Metadata } from "next";
import { Amiri, Cairo } from "next/font/google";
import "../globals.css";
import ClientTracker from "@/components/ClientTracker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { fetchSettings, fetchServices } from "@/lib/api";
import { normalizeWhatsAppNumber, parseSettingList } from "@/lib/contact";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings();
  const title = settings.seo_title || "AFC للاستشارات المالية والمحاسبية";
  const description = settings.seo_desc || "مكتب AFC بإدارة أ. ولاء مجدي. نقدم خدمات المحاسبة القانونية والاستشارات الضريبية والمراجعة وتأسيس الشركات في مصر.";
  return {
    metadataBase: new URL("https://www.afc-cpa.com"),
    title: {
      default: title,
      template: "%s | AFC"
    },
    description,
    keywords: ["ولاء مجدي", "مكتب العشماوي للمحاسبة", "AFC", "CPA", "شركة محاسبة في مصر", "مكتب محاسبة قانوني", "استشارات ضريبية", "تأسيس شركات"],
    alternates: {
      canonical: "/",
      languages: { ar: "/", en: "/en/" },
    },
    openGraph: {
      type: "website",
      locale: "ar_EG",
      alternateLocale: ["en_US"],
      url: "/",
      siteName: "AFC",
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
  const settings = await fetchSettings();
  const services = await fetchServices();
  const phones = parseSettingList(settings.contact_phones);
  const telephone = normalizeWhatsAppNumber(
    settings.contact_whatsapp || settings.whatsapp || phones[0],
  );
  const address = settings.contact_address || "مكتب 204، الدور الثاني، مول أجياد فيو، 6 أكتوبر، الجيزة، مصر";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AccountingService"],
    name: "AFC للاستشارات المالية والمحاسبية",
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
    founder: { "@type": "Person", name: "ولاء مجدي العشماوي" },
    description: "خدمات محاسبة ومراجعة وضرائب واستشارات مالية للشركات والمستثمرين.",
  };

  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <a className="skip-link" href="#main-content">انتقل إلى المحتوى الرئيسي</a>
        <VisualEditorProvider>
          <ClientTracker />
          <Navbar settings={settings} services={services} lang="ar" />
          <div id="main-content" className="flex flex-col min-h-full">
            {children}
          </div>
          <Footer settings={settings} services={services} lang="ar" />
          <WhatsAppButton settings={settings} />
        </VisualEditorProvider>
      </body>
    </html>
  );
}

