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
    title: "AFC",
    description: settings.seo_desc_en || "Your trusted partner in providing comprehensive accounting and tax solutions.",
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

