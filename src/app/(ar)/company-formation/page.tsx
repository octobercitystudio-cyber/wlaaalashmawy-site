import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "تأسيس الشركات | مكتب العشماوي للمحاسبة | AFC | CPA ولاء مجدي",
  description: "ابدأ نشاطك التجاري الآن! مكتب العشماوي للمحاسبة (AFC) يقدم خدمات تأسيس الشركات في مصر واستخراج كافة التراخيص اللازمة.",
  keywords: ["تأسيس الشركات", "مكتب العشماوي للمحاسبة", "ولاء مجدي", "AFC", "CPA", "محاسب قانوني مصر"],
};

export default function Page() {
  return <ServiceClientPage lang="ar" slug="company-formation" />;
}
