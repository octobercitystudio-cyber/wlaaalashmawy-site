import ServicesPage from "@/components/pages/ServicesPage";
export const metadata = {
  title: "خدماتنا",
  description: "خدمات المحاسبة والمراجعة والضرائب وتأسيس الشركات والإجراءات والتراخيص للمستثمرين والشركات.",
  alternates: { canonical: "/services/", languages: { ar: "/services/", en: "/en/services/" } },
};
export default function Page() { return <ServicesPage lang="ar" />; }
