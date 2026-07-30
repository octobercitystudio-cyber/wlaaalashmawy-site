import PrivacyPage from "@/components/pages/PrivacyPage";

export const metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة خصوصية موقع AFC وطريقة التعامل مع بيانات التواصل وإحصاءات الزيارة.",
  alternates: { canonical: "/privacy/", languages: { ar: "/privacy/", en: "/en/privacy/" } },
};

export default function Page() {
  return <PrivacyPage lang="ar" />;
}
