import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "خدمات المحاسبة | مكتب العشماوي للمحاسبة | AFC | CPA ولاء مجدي",
  description: "نقدم خدمات محاسبة مالية وإدارية متكاملة للشركات في مصر. استعن بأفضل مكتب محاسبة قانوني (CPA) بقيادة أ. ولاء مجدي (AFC).",
  keywords: ["خدمات المحاسبة", "مكتب العشماوي للمحاسبة", "ولاء مجدي", "AFC", "CPA", "محاسب قانوني مصر"],
};

export default function Page() {
  return <ServiceClientPage lang="ar" slug="accounting-services" />;
}
