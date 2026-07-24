import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "الاستشارات المالية | مكتب العشماوي للمحاسبة | AFC | CPA ولاء مجدي",
  description: "استشارات مالية استراتيجية لدعم نمو أعمالك في مصر. AFC شريكك المالي الموثوق بقيادة المحاسب القانوني ولاء مجدي.",
  keywords: ["الاستشارات المالية", "مكتب العشماوي للمحاسبة", "ولاء مجدي", "AFC", "CPA", "محاسب قانوني مصر"],
};

export default function Page() {
  return <ServiceClientPage lang="ar" slug="financial-consulting" />;
}
