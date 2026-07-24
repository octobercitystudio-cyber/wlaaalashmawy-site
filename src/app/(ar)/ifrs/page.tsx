import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "استشارات معايير IFRS | مكتب العشماوي للمحاسبة | AFC | CPA ولاء مجدي",
  description: "تطبيق معايير التقارير المالية الدولية (IFRS) باحترافية. مكتب العشماوي (AFC) يساعد شركتك على التوافق مع أحدث المعايير.",
  keywords: ["استشارات معايير IFRS", "مكتب العشماوي للمحاسبة", "ولاء مجدي", "AFC", "CPA", "محاسب قانوني مصر"],
};

export default function Page() {
  return <ServiceClientPage lang="ar" slug="ifrs" />;
}
