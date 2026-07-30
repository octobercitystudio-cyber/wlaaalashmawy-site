import AboutPage from "@/components/pages/AboutPage";
export const metadata = {
  title: "About Us",
  description: "Learn about AFC, our mission, vision and experience in accounting, audit, tax and financial advisory.",
  alternates: { canonical: "/en/about/", languages: { ar: "/about/", en: "/en/about/" } },
};
export default function Page() { return <AboutPage lang="en" />; }
