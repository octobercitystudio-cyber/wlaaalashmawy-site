import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "خدمات إمساك الدفاتر | مكتب العشماوي للمحاسبة | AFC | CPA ولاء مجدي",
  description: "خدمات إمساك الدفاتر المحاسبية بدقة واحترافية. اعتمد على AFC لتنظيم حسابات شركتك اليومية في مصر بقيادة أ. ولاء مجدي.",
  keywords: ["خدمات إمساك الدفاتر", "مكتب العشماوي للمحاسبة", "ولاء مجدي", "AFC", "CPA", "محاسب قانوني مصر"],
};

export default function Page() {
  return <ServiceClientPage lang="ar" slug="bookkeeping" />;
}
