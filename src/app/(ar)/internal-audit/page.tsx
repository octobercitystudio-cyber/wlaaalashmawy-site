import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "المراجعة الداخلية | مكتب العشماوي للمحاسبة | AFC | CPA ولاء مجدي",
  description: "تقييم المخاطر وتعزيز الرقابة عبر خدمات المراجعة الداخلية من مكتب العشماوي (AFC). نضمن حماية أصول شركتك.",
  keywords: ["المراجعة الداخلية", "مكتب العشماوي للمحاسبة", "ولاء مجدي", "AFC", "CPA", "محاسب قانوني مصر"],
};

export default function Page() {
  return <ServiceClientPage lang="ar" slug="internal-audit" />;
}
