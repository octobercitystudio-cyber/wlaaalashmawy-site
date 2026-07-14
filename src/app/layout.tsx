import type { Metadata } from "next";
import { Cairo, Amiri } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "مكتب العشماوي للمحاسبة | Al-Ashmawy Accounting",
  description: "خدمات محاسبية واستشارية متكاملة بطراز عالمي - مكتب العشماوي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable}`}>
      <body>
        <main className="flex flex-col min-h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
