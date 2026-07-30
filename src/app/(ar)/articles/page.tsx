import ArticlesPage from "@/components/pages/ArticlesPage";
export const metadata = {
  title: "المقالات والمدونة",
  description: "مقالات وتحليلات مهنية في المحاسبة والضرائب والمراجعة وتأسيس الشركات.",
  alternates: { canonical: "/articles/", languages: { ar: "/articles/", en: "/en/articles/" } },
};
export default function Page() { return <ArticlesPage lang="ar" />; }
