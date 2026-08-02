import ArticlesClient from "@/components/ArticlesClient";
import type { Lang } from "@/lib/dictionary";

export default function ArticlesPage({ lang = "ar", initialArticleId }: { lang?: Lang, initialArticleId?: number }) {
  return <main><ArticlesClient initialArticles={[]} lang={lang} initialArticleId={initialArticleId} /></main>;
}
