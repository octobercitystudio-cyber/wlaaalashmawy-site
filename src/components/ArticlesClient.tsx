"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { Lang } from '@/lib/dictionary';
import { sanitizeHtml } from '@/lib/sanitizeHtml';
import { normalizeWhatsAppNumber, parseSettingList } from '@/lib/contact';
import { useSiteContent } from '@/components/SiteContentProvider';

const ALL_ARTICLES_TAB = '__all__';

export default function ArticlesClient({ initialArticles, lang = 'ar', initialArticleId }: { initialArticles: any[], lang?: Lang, initialArticleId?: number }) {
  const liveContent = useSiteContent();
  const [articles, setArticles] = useState<any[]>(initialArticles);
  const [loading, setLoading] = useState(initialArticles.length === 0);
  const [error, setError] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState("201155729429");
  const [selectedTab, setSelectedTab] = useState(ALL_ARTICLES_TAB);
  const [selectedArticleId, setSelectedArticleId] = useState<number | string>(
    initialArticleId || (initialArticles.length > 0 ? initialArticles[0].id : 0),
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const currentArticles = liveContent.articles.length ? liveContent.articles : initialArticles;
    setArticles(currentArticles);
    const queryId = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("id") : null;
    setSelectedArticleId((current) => {
      const preferred = queryId || initialArticleId || current;
      return currentArticles.find((article) => Number(article.id) === Number(preferred))
        ? preferred
        : currentArticles[0]?.id || 0;
    });
    const phones = parseSettingList(liveContent.settings.contact_phones);
    setWhatsappNumber(normalizeWhatsAppNumber(liveContent.settings.contact_whatsapp || liveContent.settings.whatsapp || phones[0]));
    setError("");
    setLoading(false);
  }, [initialArticleId, initialArticles, liveContent.articles, liveContent.settings]);

  const safeArticles = React.useMemo(
    () => (Array.isArray(articles) ? articles : []),
    [articles],
  );

  const getLocalizedCategory = React.useCallback(
    (article: any) => String(lang === 'en' ? (article.category_en || article.category || '') : (article.category || '')).trim(),
    [lang],
  );

  const allCategoryNames = React.useMemo(
    () => Array.from(new Set(safeArticles.map(getLocalizedCategory).filter(Boolean))),
    [getLocalizedCategory, safeArticles],
  );

  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    let videoId = '';
    if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0];
    else if (url.includes('watch?v=')) videoId = url.split('watch?v=')[1].split('&')[0];
    else if (url.includes('embed/')) videoId = url.split('embed/')[1].split('?')[0].split('&')[0];
    else if (url.includes('shorts/')) videoId = url.split('shorts/')[1].split('?')[0].split('&')[0];
    return /^[A-Za-z0-9_-]{6,20}$/.test(videoId)
      ? `https://www.youtube.com/embed/${videoId}`
      : null;
  };

  const filteredArticles = safeArticles.filter(a => {
    const matchesTab = selectedTab === ALL_ARTICLES_TAB || getLocalizedCategory(a) === selectedTab;
    const localizedTitle = lang === "en" ? (a.title_en || a.title || "") : (a.title || "");
    const matchesSearch = localizedTitle.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase());
    return matchesTab && matchesSearch;
  });

  const selectedArticle = safeArticles.find(a => Number(a.id) === Number(selectedArticleId));

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    const newFiltered = safeArticles.filter(a => {
      const matchesTab = tab === ALL_ARTICLES_TAB || getLocalizedCategory(a) === tab;
      const localizedTitle = lang === "en" ? (a.title_en || a.title || "") : (a.title || "");
      const matchesSearch = localizedTitle.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase());
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
      const matchesTab = selectedTab === ALL_ARTICLES_TAB || getLocalizedCategory(a) === selectedTab;
      const localizedTitle = lang === "en" ? (a.title_en || a.title || "") : (a.title || "");
      const matchesSearch = localizedTitle.toLocaleLowerCase().includes(query.toLocaleLowerCase());
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

  const renderArticleContent = (article: any, view: 'mobile' | 'desktop') => (
    <article className="animate-fade-in" key={`${view}-${article.id}`}>
      <div className="flex gap-md items-center mb-md" style={{ marginBottom: "0.8rem" }}>
        <span style={{ background: "rgba(0, 91, 171, 0.1)", color: "var(--color-accent)", padding: "0.4rem 1.2rem", borderRadius: "20px", fontSize: "0.95rem", fontWeight: "bold" }}>
          {getLocalizedCategory(article)}
        </span>
        <time style={{ fontSize: "1rem", color: "var(--color-text-muted)" }}>{article.date}</time>
      </div>

      <h2 className="article-detail-title" style={{ fontSize: "2.2rem", color: "var(--color-primary)", marginBottom: "0.4rem", lineHeight: "1.3" }}>
        {lang === 'en' && article.title_en ? article.title_en : article.title}
      </h2>

      <div style={{ width: "60px", height: "3px", background: "var(--color-accent)", marginBottom: "1rem", borderRadius: "2px" }}></div>

      {article.video_url && getYouTubeEmbedUrl(article.video_url) ? (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", maxWidth: "100%", marginBottom: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
          <iframe
            src={getYouTubeEmbedUrl(article.video_url)!}
            title={lang === "en" ? `Video: ${article.title_en || article.title}` : `فيديو: ${article.title}`}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : article.image && (
        <div className="article-detail-image" style={{ position: "relative", width: "100%", height: "380px", marginBottom: "1.2rem", borderRadius: "12px", overflow: "hidden" }}>
          <Image src={article.image} alt={lang === "en" ? (article.title_en || article.title) : article.title} fill style={{ objectFit: "cover" }} />
        </div>
      )}

      <div
        className="article-body-content"
        style={{ fontSize: "1.15rem", fontWeight: 400, lineHeight: "2.1", color: "var(--color-text-main)", opacity: 0.9, textAlign: "justify", marginTop: "1rem" }}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(lang === 'en' && article.content_en ? article.content_en : article.content).replace(/<h[1-6]>/g, '<h4 style="margin-top: 0;">') }}
      />

      <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)" }}>
        <h4 style={{ marginBottom: "1rem", color: "var(--color-primary)" }}>{lang === "en" ? "Have a question about this topic?" : "هل لديك استفسار بخصوص هذا الموضوع؟"}</h4>
        <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent((lang === "en" ? "Hello, I would like to inquire about the article: " : "مرحبًا، أود الاستفسار بخصوص المقال: ") + (lang === "en" && article.title_en ? article.title_en : article.title))}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "0.8rem 2rem" }}>{lang === "en" ? "Contact us via WhatsApp" : "تواصل معنا عبر واتساب"}</a>
      </div>
    </article>
  );

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
        .mobile-article-content {
          display: block;
          padding: 1rem 0.25rem 1.75rem;
        }
        .desktop-article-content {
          display: none;
        }
        @media (max-width: 767px) {
          .mobile-article-content .article-detail-title {
            font-size: 1.6rem !important;
          }
          .mobile-article-content .article-detail-image {
            height: 230px !important;
          }
        }
        @media (min-width: 768px) {
          .articles-layout {
            display: grid;
            grid-template-columns: 1fr 2.5fr; /* Right column 1 fraction, Left column 2.5 fractions */
            align-items: start;
          }
          .mobile-article-content {
            display: none;
          }
          .desktop-article-content {
            display: block;
          }
        }
      `}} />
      <div className="container">
        <div className="text-center mb-xl">
          <h1 className="text-gold" style={{ fontSize: "3rem", marginBottom: "var(--spacing-md)" }}>
            {(lang === "en" ? liveContent.settings.articles_page_title_en : liveContent.settings.articles_page_title) || (lang === "en" ? "Blog & Articles" : "المقالات والمدونة")}
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", color: "var(--color-text-main)", opacity: 0.9, fontWeight: "700" }}>
            {(lang === "en" ? liveContent.settings.articles_page_subtitle_en : liveContent.settings.articles_page_subtitle) || (lang === "en"
              ? "Stay up to date with the latest developments in accounting, tax, and business. We offer professional insights and valuable tips to support your success." 
              : "ابقَ على اطلاع دائم بأحدث التطورات في عالم المحاسبة، الضرائب، والأعمال. نقدم لك تحليلات احترافية ونصائح قيمة لدعم مسيرة نجاحك.")}
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
              <div key={article.id}>
                <button
                  onClick={() => {
                    setSelectedArticleId(article.id);
                    const newUrl = lang === "en" ? `/en/articles/?id=${article.id}` : `/articles/?id=${article.id}`;
                    window.history.pushState(null, '', newUrl);
                  }}
                  aria-expanded={Number(selectedArticleId) === Number(article.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: lang === "en" ? "left" : "right",
                    padding: "1.2rem",
                    background: Number(selectedArticleId) === Number(article.id) ? "rgba(0, 91, 171, 0.05)" : "var(--color-bg-card)",
                    border: "1px solid",
                    borderColor: Number(selectedArticleId) === Number(article.id) ? "var(--color-accent)" : "var(--color-border)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    borderInlineStart: Number(selectedArticleId) === Number(article.id) ? "4px solid var(--color-accent)" : "1px solid var(--color-border)"
                  }}
                >
                  <h4 style={{
                    fontSize: "1.1rem",
                    color: Number(selectedArticleId) === Number(article.id) ? "var(--color-accent)" : "var(--color-primary)",
                    marginBottom: "0.5rem",
                    lineHeight: "1.4"
                  }}>
                    {lang === "en" && article.title_en ? article.title_en : article.title}
                  </h4>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <time style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{article.date}</time>
                  </div>
                </button>
                {Number(selectedArticleId) === Number(article.id) && (
                  <div className="mobile-article-content">
                    {renderArticleContent(article, 'mobile')}
                  </div>
                )}
              </div>
            )) : (
              <p style={{ color: "var(--color-text-muted)" }}>{lang === "en" ? "No matching articles found." : "لا توجد مقالات مطابقة للبحث."}</p>
            )}
          </div>

          {/* Left Column: Article Content */}
          <div style={{ minHeight: "500px", padding: "0 1rem" }}>
            {/* Tabs */}
            <div className="flex gap-sm mb-lg" style={{ flexWrap: "wrap", borderBottom: "1px solid var(--color-border)", paddingBottom: "1.5rem" }}>
              <button 
                onClick={() => handleTabChange(ALL_ARTICLES_TAB)}
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "30px",
                  background: selectedTab === ALL_ARTICLES_TAB ? "var(--color-accent)" : "transparent",
                  color: selectedTab === ALL_ARTICLES_TAB ? "#fff" : "var(--color-text-main)",
                  fontWeight: selectedTab === ALL_ARTICLES_TAB ? "bold" : "normal",
                  transition: "all 0.3s ease",
                  border: selectedTab === ALL_ARTICLES_TAB ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
                }}
              >
                {lang === 'en' ? 'All' : 'الكل'}
              </button>
              {allCategoryNames.map(category => (
                <button 
                  key={category}
                  onClick={() => handleTabChange(category)}
                  style={{
                    padding: "0.5rem 1.5rem",
                    borderRadius: "30px",
                    background: selectedTab === category ? "var(--color-accent)" : "transparent",
                    color: selectedTab === category ? "#fff" : "var(--color-text-main)",
                    fontWeight: selectedTab === category ? "bold" : "normal",
                    transition: "all 0.3s ease",
                    border: selectedTab === category ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="desktop-article-content">
              {selectedArticle ? renderArticleContent(selectedArticle, 'desktop') : (
                <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-text-muted)" }}>
                  {lang === "en" ? "No articles in this section yet." : "لا توجد مقالات في هذا القسم حالياً. أضف مقالات جديدة لظهورها هنا."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
