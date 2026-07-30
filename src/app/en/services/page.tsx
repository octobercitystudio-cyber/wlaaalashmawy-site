import ServicesPage from "@/components/pages/ServicesPage";
export const metadata = {
  title: "Our Services",
  description: "Accounting, audit, tax, company formation, investor residency and industrial licensing services.",
  alternates: { canonical: "/en/services/", languages: { ar: "/services/", en: "/en/services/" } },
};
export default function Page() { return <ServicesPage lang="en" />; }
