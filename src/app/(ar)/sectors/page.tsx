import SectorsPage from "@/components/pages/SectorsPage";
export const metadata = {
  title: "القطاعات",
  description: "حلول مالية وضريبية ومحاسبية متخصصة لمختلف القطاعات الاقتصادية والصناعية والخدمية.",
  alternates: { canonical: "/sectors/", languages: { ar: "/sectors/", en: "/en/sectors/" } },
};
export default function Page() { return <SectorsPage lang="ar" />; }
