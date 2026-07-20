import ArticlesClient from "@/components/ArticlesClient";

// This function runs at build time to fetch the articles for SEO
import { Lang } from "@/lib/dictionary";

export default async function ArticlesPage({ lang = "ar" }: { lang?: Lang }) {
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
    } catch(err) {
        console.error("Failed to fetch articles:", err);
        initialArticles = [];
    }
  } catch (error) {
    console.error("Failed to fetch articles at build time:", error);
  }

  return <ArticlesClient initialArticles={initialArticles} lang={lang} />;
}
