import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ClientTracker from "@/components/ClientTracker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { fetchSettings, fetchServices } from "@/lib/api";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings();
  return {
    title: {
      default: "AFC | Accounting, Audit & Tax Services in Egypt | CPA Wlaa Magdy",
      template: "%s | AFC - Accounting Firm in Egypt"
    },
    description: settings.seo_desc_en || "Professional Accounting, Audit, Tax, Bookkeeping, Payroll and Financial Consulting Services in Egypt by CPA Wlaa Magdy. AFC helps businesses stay compliant and grow with confidence.",
    keywords: ["Accounting Firm Egypt", "Audit Firm Egypt", "Tax Consultants Egypt", "Bookkeeping Services Egypt", "CPA Egypt", "Wlaa Magdy", "AFC"],
  };
}

import { VisualEditorProvider } from "@/components/editor/VisualEditorProvider";

export default async function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchSettings();
  const services = await fetchServices();

  return (
    <html lang="en" dir="ltr" className={`${inter.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "AccountingService"],
          "name": "AFC - Accounting Firm Egypt",
          "image": "https://www.afc-cpa.com/images/logo.png",
          "@id": "https://www.afc-cpa.com",
          "url": "https://www.afc-cpa.com/en",
          "telephone": "+201155729429",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cairo",
            "addressRegion": "Cairo",
            "addressCountry": "EG"
          },
          "founder": {
            "@type": "Person",
            "name": "Wlaa Magdy"
          },
          "description": "Professional Accounting, Audit, Tax, Bookkeeping, Payroll and Financial Consulting Services in Egypt by CPA Wlaa Magdy. AFC helps businesses stay compliant and grow with confidence."
        })}} />
        <VisualEditorProvider>
          <ClientTracker />
          <Navbar settings={settings} services={services} lang="en" />
          <main className="flex flex-col min-h-full">
            {children}
          </main>
          <Footer settings={settings} services={services} lang="en" />
          <WhatsAppButton settings={settings} />
        </VisualEditorProvider>
      </body>
    </html>
  );
}

