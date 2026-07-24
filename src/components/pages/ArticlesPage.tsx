import ArticlesClient from "@/components/ArticlesClient";

// This function runs at build time to fetch the articles for SEO
import { Lang } from "@/lib/dictionary";

export default async function ArticlesPage({ lang = "ar", initialArticleId }: { lang?: Lang, initialArticleId?: number }) {
  let initialArticles = [];
  try {
    // We use NEXT_PUBLIC_API_URL provided during build by GitHub Actions
    // During local dev, this might be empty, so we fallback to relative or handle it gracefully
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com'; 
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const res = await fetch(`${apiUrl}/api/articles.php`, { 
            cache: 'force-cache',
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if(res.ok) {
            initialArticles = await res.json();
            if (!Array.isArray(initialArticles)) initialArticles = [];
        }
    } catch(e) {
        console.error("Fetch failed during build, using empty array for now", e);
    }
  } catch (error) {
    console.error("Failed to fetch articles statically:", error);
  }

  return (
    <main>
      <ArticlesClient initialArticles={initialArticles} lang={lang} initialArticleId={initialArticleId} />
    </main>
  );
}
