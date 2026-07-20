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
    title: settings.seo_title || "???? ???????? ????????",
    description: settings.seo_desc || "???? ????????",
  };
}

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
        <ClientTracker />
        <Navbar settings={settings} services={services} lang="ar" />
        <main className="flex flex-col min-h-full">
          {children}
        </main>
        <Footer settings={settings} services={services} lang="ar" />
        <WhatsAppButton settings={settings} />
      </body>
    </html>
  );
}

