import AboutPage from "@/components/pages/AboutPage";
export const metadata = {
  title: "من نحن",
  description: "تعرف على AFC ورؤيتها ورسالتها وخبرتها في المحاسبة والمراجعة والضرائب والاستشارات المالية.",
  alternates: { canonical: "/about/", languages: { ar: "/about/", en: "/en/about/" } },
};
export default function Page() { return <AboutPage lang="ar" />; }
