import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "خدمات الرواتب وشؤون العاملين | مكتب العشماوي للمحاسبة | AFC | CPA ولاء مجدي",
  description: "إدارة الرواتب وشؤون الموظفين بفعالية تامة. مكتب العشماوي للمحاسبة (AFC) يقدم لك حلولاً متكاملة توفر وقتك ومجهودك.",
  keywords: ["خدمات الرواتب وشؤون العاملين", "مكتب العشماوي للمحاسبة", "ولاء مجدي", "AFC", "CPA", "محاسب قانوني مصر"],
};

export default function Page() {
  return <ServiceClientPage lang="ar" slug="payroll" />;
}
