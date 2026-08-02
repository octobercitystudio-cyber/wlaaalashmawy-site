import type { Metadata } from "next";
import ArticlesPage from "@/components/pages/ArticlesPage";

type Props = {
  params: Promise<{ id: string }>
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com'; 
  let article = null;
  
  try {
    const res = await fetch(`${apiUrl}/api/articles.php`, { cache: 'force-cache' });
    if(res.ok) {
        const fetched = await res.json();
        const { staticArticles } = await import("@/data/staticArticles");
        const articles = Array.isArray(fetched) ? [...staticArticles, ...fetched] : [...staticArticles];
        article = articles.find((a: any) => a.id.toString() === resolvedParams.id);
    }
  } catch(e) {
      console.error(e);
  }
  
  if (!article) {
    return {
      title: "المقال غير موجود",
      robots: { index: false, follow: false },
    };
  }

  // Generate excerpt from content
  const plainTextContent = (article.content || "").replace(/<[^>]+>/g, '');
  const excerpt = plainTextContent.substring(0, 150) + "...";

  return {
    title: article.title,
    description: excerpt,
    keywords: [article.title, article.category, "محاسبة", "ضرائب", "CPA", "AFC", "مكتب العشماوي", "ولاء مجدي"],
    openGraph: {
      title: article.title,
      description: excerpt,
      type: "article",
      url: `/articles/${resolvedParams.id}/`,
      images: [article.image || '/hero_egypt.jpg'],
    },
    alternates: {
      canonical: `/articles/${resolvedParams.id}/`,
      languages: {
        ar: `/articles/${resolvedParams.id}/`,
        en: `/en/articles/${resolvedParams.id}/`,
      },
    },
  };
}

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com'; 
  try {
    const res = await fetch(`${apiUrl}/api/articles.php`, { cache: 'force-cache' });
    if(res.ok) {
        const fetched = await res.json();
        const { staticArticles } = await import("@/data/staticArticles");
        const articles = Array.isArray(fetched) ? [...staticArticles, ...fetched] : [...staticArticles];
        if (articles.length === 0) return [{ id: "0" }];
        return articles.map((article: any) => ({
          id: article.id.toString(),
        }));
    }
  } catch {}
  return [{ id: "0" }];
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  return <ArticlesPage lang="ar" initialArticleId={parseInt(resolvedParams.id)} />;
}
