import type { Metadata } from "next";
import { Cairo, Amiri } from "next/font/google";
import "../globals.css";
import ClientTracker from "@/components/ClientTracker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { fetchSettings, fetchServices } from "@/lib/api";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings();
  return {
    title: {
      default: "مكتب العشماوي للمحاسبة (AFC) | أ. ولاء مجدي | محاسب قانوني CPA",
      template: "%s | مكتب العشماوي للمحاسبة (AFC)"
    },
    description: settings.seo_desc || "مكتب العشماوي للمحاسبة (AFC) بإدارة أ. ولاء مجدي (CPA). نقدم خدمات محاسبة قانونية، استشارات ضريبية، المراجعة، تأسيس الشركات، وخدمات الرواتب في مصر.",
    keywords: ["ولاء مجدي", "مكتب العشماوي للمحاسبة", "AFC", "CPA", "شركة محاسبة في مصر", "مكتب محاسبة قانوني", "استشارات ضريبية", "تأسيس شركات"],
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

  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "AccountingService"],
          "name": "مكتب العشماوي للمحاسبة (AFC)",
          "image": "https://www.afc-cpa.com/images/logo.png",
          "@id": "https://www.afc-cpa.com",
          "url": "https://www.afc-cpa.com",
          "telephone": "+201155729429",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "القاهرة",
            "addressRegion": "القاهرة",
            "addressCountry": "EG"
          },
          "founder": {
            "@type": "Person",
            "name": "ولاء مجدي"
          },
          "description": "مكتب العشماوي للمحاسبة (AFC) بإدارة أ. ولاء مجدي (CPA). نقدم خدمات محاسبة قانونية، استشارات ضريبية، المراجعة، تأسيس الشركات، وخدمات الرواتب في مصر."
        })}} />
        <VisualEditorProvider>
          <ClientTracker />
          <Navbar settings={settings} services={services} lang="ar" />
          <main className="flex flex-col min-h-full">
            {children}
          </main>
          <Footer settings={settings} services={services} lang="ar" />
          <WhatsAppButton settings={settings} />
        </VisualEditorProvider>
      </body>
    </html>
  );
}

