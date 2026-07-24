import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "الفاتورة الإلكترونية | مكتب العشماوي للمحاسبة | AFC | CPA ولاء مجدي",
  description: "تسجيل وتفعيل منظومة الفاتورة الإلكترونية في مصر بسهولة. مكتب العشماوي للمحاسبة (AFC) يقدم الدعم الفني والقانوني المتكامل.",
  keywords: ["الفاتورة الإلكترونية", "مكتب العشماوي للمحاسبة", "ولاء مجدي", "AFC", "CPA", "محاسب قانوني مصر"],
};

export default function Page() {
  return <ServiceClientPage lang="ar" slug="e-invoice" />;
}
