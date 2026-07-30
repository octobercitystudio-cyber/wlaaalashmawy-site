import PrivacyPage from "@/components/pages/PrivacyPage";

export const metadata = {
  title: "Privacy Policy",
  description: "How the AFC website handles contact information and basic visit analytics.",
  alternates: { canonical: "/en/privacy/", languages: { ar: "/privacy/", en: "/en/privacy/" } },
};

export default function Page() {
  return <PrivacyPage lang="en" />;
}
