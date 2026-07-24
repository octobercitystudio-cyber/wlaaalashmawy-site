import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "الاستشارات والخدمات الضريبية | مكتب العشماوي للمحاسبة | AFC | CPA ولاء مجدي",
  description: "تجنب المخاطر الضريبية مع خدمات مكتب العشماوي للمحاسبة (AFC). نقدم تخطيطاً ضريبياً وحلولاً احترافية لضريبة الشركات في مصر.",
  keywords: ["الاستشارات والخدمات الضريبية", "مكتب العشماوي للمحاسبة", "ولاء مجدي", "AFC", "CPA", "محاسب قانوني مصر"],
};

export default function Page() {
  return <ServiceClientPage lang="ar" slug="tax-services" />;
}
