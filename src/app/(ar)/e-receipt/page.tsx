import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "الإيصال الإلكتروني | مكتب العشماوي للمحاسبة | AFC | CPA ولاء مجدي",
  description: "الانضمام لمنظومة الإيصال الإلكتروني بخطوات بسيطة. AFC معك لضمان التزام شركتك بقوانين مصلحة الضرائب المصرية.",
  keywords: ["الإيصال الإلكتروني", "مكتب العشماوي للمحاسبة", "ولاء مجدي", "AFC", "CPA", "محاسب قانوني مصر"],
};

export default function Page() {
  return <ServiceClientPage lang="ar" slug="e-receipt" />;
}
