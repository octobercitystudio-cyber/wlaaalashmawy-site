"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { Lang } from '@/lib/dictionary';
import { servicesData } from '@/data/services';

export default function ArticlesClient({ initialArticles, lang = 'ar', initialArticleId }: { initialArticles: any[], lang?: Lang, initialArticleId?: number }) {
  const [articles, setArticles] = useState<any[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customCategories, setCustomCategories] = useState<{ar: string, en: string}[]>([]);
  const [servicesList, setServicesList] = useState<any[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    fetch(`${apiUrl}/api/articles.php`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data);
          if (data.length > 0 && !data.find(a => a.id === selectedArticleId)) {
             setSelectedArticleId(initialArticleId || data[0].id);
          }
        }
      })
      .catch(err => console.error("Failed to fetch fresh articles", err));

    fetch(`${apiUrl}/api/settings.php`)
      .then(res => res.json())
      .then(s => {
        if (s.article_categories) {
          try {
            const parsed = JSON.parse(s.article_categories);
            if (Array.isArray(parsed)) setCustomCategories(parsed);
          } catch (e) {}
        }
      })
      .catch(() => {});

    fetch(`${apiUrl}/api/services.php`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setServicesList(data);
      })
      .catch(() => {});
  }, []);

  const safeArticles = Array.isArray(articles) ? articles : [];

  const allCategoryNames = React.useMemo(() => {
    const catsMap = new Map<string, { ar: string, en: string }>();
    const defaults = [
      { ar: 'الاستشارات المحاسبية', en: 'Accounting Advisory' },
      { ar: 'الاستشارات الضريبية', en: 'Tax Advisory' },
      { ar: 'المراجعة والتدقيق', en: 'Audit & Assurance' },
      { ar: 'تأسيس الشركات', en: 'Company Formation' },
      { ar: 'الاستشارات المالية', en: 'Financial Advisory' }
    ];
    defaults.forEach(c => catsMap.set(c.ar.trim(), c));
    servicesData.forEach(s => {
      if (s && s.title && s.title.ar) {
        if (!catsMap.has(s.title.ar.trim())) {
          catsMap.set(s.title.ar.trim(), { ar: s.title.ar.trim(), en: (s.title.en || s.title.ar).trim() });
        }
      }
    });
    servicesList.forEach(s => {
      if (s && s.title && typeof s.title === 'string') {
        if (!catsMap.has(s.title.trim())) {
          catsMap.set(s.title.trim(), { ar: s.title.trim(), en: (s.title_en || s.title).trim() });
        }
      }
    });
    customCategories.forEach(c => {
      if (c && c.ar) catsMap.set(c.ar.trim(), { ar: c.ar.trim(), en: (c.en || c.ar).trim() });
    });
    safeArticles.forEach(a => {
      if (a.category && a.category.trim() && !catsMap.has(a.category.trim())) {
        catsMap.set(a.category.trim(), { ar: a.category.trim(), en: (a.category_en || a.category).trim() });
      }
    });
    return Array.from(catsMap.values());
  }, [customCategories, safeArticles, servicesList]);

  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    let videoId = '';
    if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0];
    else if (url.includes('watch?v=')) videoId = url.split('watch?v=')[1].split('&')[0];
    else if (url.includes('embed/')) videoId = url.split('embed/')[1].split('?')[0].split('&')[0];
    else if (url.includes('shorts/')) videoId = url.split('shorts/')[1].split('?')[0].split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const [selectedTab, setSelectedTab] = useState('الكل');
  const [selectedArticleId, setSelectedArticleId] = useState(initialArticleId || (initialArticles && initialArticles.length > 0 ? initialArticles[0].id : 0));
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = safeArticles.filter(a => {
    const matchesTab = selectedTab === 'الكل' || a.category === selectedTab;
    const matchesSearch = a?.title?.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  const selectedArticle = safeArticles.find(a => a.id === selectedArticleId);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    const newFiltered = safeArticles.filter(a => {
      const matchesTab = tab === 'الكل' || a.category === tab;
      const matchesSearch = a?.title?.includes(searchQuery);
      return matchesTab && matchesSearch;
    });
    if (newFiltered.length > 0) {
      if (!newFiltered.find(a => a.id === selectedArticleId)) {
        setSelectedArticleId(newFiltered[0].id);
      }
    } else {
      setSelectedArticleId(0);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const newFiltered = safeArticles.filter(a => {
      const matchesTab = selectedTab === 'الكل' || a.category === selectedTab;
      const matchesSearch = a?.title?.includes(query);
      return matchesTab && matchesSearch;
    });
    if (newFiltered.length > 0) {
      if (!newFiltered.find(a => a.id === selectedArticleId)) {
        setSelectedArticleId(newFiltered[0].id);
      }
    } else {
      setSelectedArticleId(0);
    }
  };

  return (
    <div className="animate-fade-in" style={{ flex: 1, padding: "var(--spacing-xl) 0" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .articles-layout {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          margin-top: 3rem; /* Added margin to lower the layout from the top section */
        }
        .article-body-content > *:first-child,
        .article-body-content p:first-child,
        .article-body-content h1:first-child,
        .article-body-content h2:first-child,
        .article-body-content h3:first-child,
        .article-body-content h4:first-child {
          margin-top: 0 !important;
        }
        @media (min-width: 768px) {
          .articles-layout {
            display: grid;
            grid-template-columns: 1fr 2.5fr; /* Right column 1 fraction, Left column 2.5 fractions */
            align-items: start;
          }
        }
      `}} />
      <div className="container">
        <div className="text-center mb-xl">
          <h1 className="text-gold" style={{ fontSize: "3rem", marginBottom: "var(--spacing-md)" }}>
            {lang === "en" ? "Blog & Articles" : "المقالات والمدونة"}
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", color: "var(--color-text-main)", opacity: 0.9, fontWeight: "700" }}>
            {lang === "en" 
              ? "Stay up to date with the latest developments in accounting, tax, and business. We offer professional insights and valuable tips to support your success." 
              : "ابقَ على اطلاع دائم بأحدث التطورات في عالم المحاسبة، الضرائب، والأعمال. نقدم لك تحليلات احترافية ونصائح قيمة لدعم مسيرة نجاحك."}
          </p>
        </div>

        <div className="articles-layout">
          {/* Right Column: Titles List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary)" }}>{lang === "en" ? "Latest Articles" : "أحدث المقالات"}</h3>
            
            {/* Search Input */}
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <input 
                type="text" 
                placeholder={lang === "en" ? "Search articles..." : "ابحث باسم المقال..."} 
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem",
                  paddingRight: "2.5rem",
                  borderRadius: "8px",
                  border: "1px solid var(--color-border)",
                  outline: "none",
                  fontSize: "1rem"
                }}
              />
              <svg 
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ position: "absolute", right: "0.8rem", top: "50%", transform: "translateY(-50%)" }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            {loading ? (
              <p style={{ color: "var(--color-text-muted)" }}>{lang === "en" ? "Loading articles..." : "جاري تحميل المقالات..."}</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : filteredArticles.length > 0 ? filteredArticles.map((article) => (
              <button 
                key={article.id}
                onClick={() => setSelectedArticleId(article.id)}
                style={{ 
                  display: "block",
                  width: "100%",
                  textAlign: "right",
                  padding: "1.2rem",
                  background: selectedArticleId === article.id ? "rgba(0, 91, 171, 0.05)" : "var(--color-bg-card)",
                  border: "1px solid",
                  borderColor: selectedArticleId === article.id ? "var(--color-accent)" : "var(--color-border)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderRight: selectedArticleId === article.id ? "4px solid var(--color-accent)" : "1px solid var(--color-border)"
                }}
              >
                <h4 style={{ 
                  fontSize: "1.1rem", 
                  color: selectedArticleId === article.id ? "var(--color-accent)" : "var(--color-primary)", 
                  marginBottom: "0.5rem",
                  lineHeight: "1.4"
                }}>
                  {lang === "en" && article.title_en ? article.title_en : article.title}
                </h4>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{article.date}</span>
                </div>
                <a 
                  href={lang === "en" ? `/en/articles/${article.id}` : `/articles/${article.id}`}
                  style={{ display: "none" }}
                  aria-hidden="true"
                >
                  {article.title}
                </a>
              </button>
            )) : (
              <p style={{ color: "var(--color-text-muted)" }}>{lang === "en" ? "No matching articles found." : "لا توجد مقالات مطابقة للبحث."}</p>
            )}
          </div>

          {/* Left Column: Article Content */}
          <div style={{ minHeight: "500px", padding: "0 1rem" }}>
            {/* Tabs */}
            <div className="flex gap-sm mb-lg" style={{ flexWrap: "wrap", borderBottom: "1px solid var(--color-border)", paddingBottom: "1.5rem" }}>
              <button 
                onClick={() => handleTabChange('الكل')}
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "30px",
                  background: selectedTab === 'الكل' ? "var(--color-accent)" : "transparent",
                  color: selectedTab === 'الكل' ? "#fff" : "var(--color-text-main)",
                  fontWeight: selectedTab === 'الكل' ? "bold" : "normal",
                  transition: "all 0.3s ease",
                  border: selectedTab === 'الكل' ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
                }}
              >
                {lang === 'en' ? 'All' : 'الكل'}
              </button>
              {allCategoryNames.map(cat => (
                <button 
                  key={cat.ar} 
                  onClick={() => handleTabChange(cat.ar)}
                  style={{
                    padding: "0.5rem 1.5rem",
                    borderRadius: "30px",
                    background: selectedTab === cat.ar ? "var(--color-accent)" : "transparent",
                    color: selectedTab === cat.ar ? "#fff" : "var(--color-text-main)",
                    fontWeight: selectedTab === cat.ar ? "bold" : "normal",
                    transition: "all 0.3s ease",
                    border: selectedTab === cat.ar ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
                  }}
                >
                  {lang === 'en' ? (cat.en || cat.ar) : cat.ar}
                </button>
              ))}
            </div>

            {selectedArticle ? (
              <div className="animate-fade-in" key={selectedArticle.id}>
                <div className="flex gap-md items-center mb-md" style={{ marginBottom: "0.8rem" }}>
                  <span style={{ background: "rgba(0, 91, 171, 0.1)", color: "var(--color-accent)", padding: "0.4rem 1.2rem", borderRadius: "20px", fontSize: "0.95rem", fontWeight: "bold" }}>
                    {lang === 'en' ? (selectedArticle.category_en || allCategoryNames.find(c => c.ar === selectedArticle.category)?.en || selectedArticle.category) : selectedArticle.category}
                  </span>
                  <span style={{ fontSize: "1rem", color: "var(--color-text-muted)" }}>{selectedArticle.date}</span>
                </div>
                
                <h2 style={{ fontSize: "2.2rem", color: "var(--color-primary)", marginBottom: "0.4rem", lineHeight: "1.3" }}>
                  {lang === 'en' && selectedArticle.title_en ? selectedArticle.title_en : selectedArticle.title}
                </h2>
                
                <div style={{ width: "60px", height: "3px", background: "var(--color-accent)", marginBottom: "1rem", borderRadius: "2px" }}></div>
                
                {selectedArticle.video_url && getYouTubeEmbedUrl(selectedArticle.video_url) ? (
                  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", maxWidth: "100%", marginBottom: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
                    <iframe 
                      src={getYouTubeEmbedUrl(selectedArticle.video_url)!} 
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }} 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen 
                    />
                  </div>
                ) : selectedArticle.image && (
                  <div style={{ position: "relative", width: "100%", height: "380px", marginBottom: "1.2rem", borderRadius: "12px", overflow: "hidden" }}>
                    <Image src={selectedArticle.image} alt={selectedArticle.title} fill style={{ objectFit: "cover" }} />
                  </div>
                )}
                
                <div 
                  className="article-body-content"
                  style={{ fontSize: "1.15rem", lineHeight: "2.1", color: "var(--color-text-main)", opacity: 0.9, textAlign: "justify" }}
                  dangerouslySetInnerHTML={{ __html: lang === 'en' && selectedArticle.content_en ? selectedArticle.content_en : selectedArticle.content }}
                />

                <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)" }}>
                  <h4 style={{ marginBottom: "1rem", color: "var(--color-primary)" }}>{lang === "en" ? "Have a question about this topic?" : "هل لديك استفسار بخصوص هذا الموضوع؟"}</h4>
                  <a href={`https://wa.me/201155729429?text=${encodeURIComponent((lang === "en" ? "Hello, I would like to inquire about the article: " : "مرحباً، أود الاستفسار بخصوص المقال: ") + (lang === "en" && selectedArticle.title_en ? selectedArticle.title_en : selectedArticle.title))}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "0.8rem 2rem" }}>{lang === "en" ? "Contact us via WhatsApp" : "تواصل معنا عبر واتساب"}</a>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-text-muted)" }}>
                {lang === "en" ? "No articles in this section yet." : "لا توجد مقالات في هذا القسم حالياً. أضف مقالات جديدة لظهورها هنا."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
