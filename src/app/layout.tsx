import type { Metadata } from "next";
import { Cairo, Amiri } from "next/font/google";
import "./globals.css";
import ClientTracker from "../components/ClientTracker";

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

import { fetchSettings } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings();
  return {
    title: settings.seo_title || "مكتب العشماوي للمحاسبة | Al-Ashmawy Accounting",
    description: settings.seo_desc || "خدمات محاسبية واستشارية متكاملة بمعايير عالمية - مكتب العشماوي",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable}`}>
      <body>
        <ClientTracker />
        <main className="flex flex-col min-h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
