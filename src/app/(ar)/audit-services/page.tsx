import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "خدمات المراجعة وتدقيق الحسابات | مكتب العشماوي للمحاسبة | AFC | CPA ولاء مجدي",
  description: "مكتب العشماوي (AFC) يقدم خدمات المراجعة وتدقيق الحسابات للشركات في مصر بشفافية واحترافية عالية، لتأمين مستقبلك المالي.",
  keywords: ["خدمات المراجعة وتدقيق الحسابات", "مكتب العشماوي للمحاسبة", "ولاء مجدي", "AFC", "CPA", "محاسب قانوني مصر"],
};

export default function Page() {
  return <ServiceClientPage lang="ar" slug="audit-services" />;
}
