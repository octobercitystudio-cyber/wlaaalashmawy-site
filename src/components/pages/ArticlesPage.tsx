import ArticlesClient from "@/components/ArticlesClient";

// This function runs at build time to fetch the articles for SEO
import { Lang } from "@/lib/dictionary";
import { staticArticles } from "@/data/staticArticles";

export default async function ArticlesPage({ lang = "ar", initialArticleId }: { lang?: Lang, initialArticleId?: number }) {
  let initialArticles: any[] = [...staticArticles];
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
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const fetched = await res.json();
                if (Array.isArray(fetched)) {
                    fetched.forEach(apiArticle => {
                      const exists = staticArticles.some(staticArticle => 
                        (staticArticle.title && apiArticle.title && staticArticle.title.trim() === apiArticle.title.trim())
                      );
                      if (!exists) {
                        initialArticles.push(apiArticle);
                      }
                    });
                }
            }
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
