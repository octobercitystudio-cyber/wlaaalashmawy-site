import ArticlesPage from "@/components/pages/ArticlesPage";
export const metadata = {
  title: "Articles & Insights",
  description: "Professional insights about accounting, tax, audit, company formation and business compliance.",
  alternates: { canonical: "/en/articles/", languages: { ar: "/articles/", en: "/en/articles/" } },
};
export default function Page() { return <ArticlesPage lang="en" />; }
