import type { Metadata, ResolvingMetadata } from "next";
import ArticlesPage from "@/components/pages/ArticlesPage";

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const resolvedParams = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com'; 
  let article = null;
  
  try {
    const res = await fetch(`${apiUrl}/api/articles.php`, { cache: 'no-store' });
    if(res.ok) {
        const articles = await res.json();
        article = articles.find((a: any) => a.id.toString() === resolvedParams.id);
    }
  } catch(e) {
      console.error(e);
  }
  
  if (!article) {
    return {
      title: "مقال غير موجود | مكتب العشماوي للمحاسبة",
    };
  }

  // Generate excerpt from content
  const plainTextContent = (article.content || "").replace(/<[^>]+>/g, '');
  const excerpt = plainTextContent.substring(0, 150) + "...";

  return {
    title: `${article.title} | AFC | CPA ولاء مجدي`,
    description: excerpt,
    keywords: [article.title, article.category, "محاسبة", "ضرائب", "CPA", "AFC", "مكتب العشماوي", "ولاء مجدي"],
    openGraph: {
      title: article.title,
      description: excerpt,
      images: [article.image || '/images/hero_egypt_blue.jpg'],
    },
  };
}

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com'; 
  try {
    const res = await fetch(`${apiUrl}/api/articles.php`);
    if(res.ok) {
        const articles = await res.json();
        if (articles.length === 0) return [{ id: "1" }];
        return articles.map((article: any) => ({
          id: article.id.toString(),
        }));
    }
  } catch(e) {}
  return [{ id: "1" }];
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  return <ArticlesPage lang="ar" initialArticleId={parseInt(resolvedParams.id)} />;
}
