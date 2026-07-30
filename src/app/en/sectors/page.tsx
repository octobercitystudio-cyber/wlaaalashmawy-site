import SectorsPage from "@/components/pages/SectorsPage";
export const metadata = {
  title: "Sectors",
  description: "Specialized accounting, tax and financial solutions for industrial, commercial and service sectors.",
  alternates: { canonical: "/en/sectors/", languages: { ar: "/sectors/", en: "/en/sectors/" } },
};
export default function Page() { return <SectorsPage lang="en" />; }
