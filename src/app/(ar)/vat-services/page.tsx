import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "خدمات ضريبة القيمة المضافة | مكتب العشماوي للمحاسبة | AFC | CPA ولاء مجدي",
  description: "إعداد وتقديم إقرارات ضريبة القيمة المضافة بدقة. AFC يضمن لشركتك التوافق التام مع قوانين الضرائب في مصر.",
  keywords: ["خدمات ضريبة القيمة المضافة", "مكتب العشماوي للمحاسبة", "ولاء مجدي", "AFC", "CPA", "محاسب قانوني مصر"],
};

export default function Page() {
  return <ServiceClientPage lang="ar" slug="vat-services" />;
}
