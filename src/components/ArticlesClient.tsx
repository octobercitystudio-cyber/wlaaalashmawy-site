"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Lang } from '@/lib/dictionary';
export default function ArticlesClient({ initialArticles, lang = 'ar', initialArticleId }: { initialArticles: any[], lang?: Lang, initialArticleId?: number }) {
  const [articles, setArticles] = useState<any[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    fetch(`${apiUrl}/api/articles.php`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data);
          // If no article is selected, or if selected article doesn't exist anymore, select the first one (or initialArticleId)
          if (data.length > 0 && !data.find(a => a.id === selectedArticleId)) {
             setSelectedArticleId(initialArticleId || data[0].id);
          }
        }
      })
      .catch(err => console.error("Failed to fetch fresh articles", err));
  }, []);

  const categories = ['الكل', 'الاستشارات المحاسبية', 'الاستشارات الضريبية', 'المراجعة والتدقيق', 'تأسيس الشركات', 'الاستشارات المالية'];

  const [selectedTab, setSelectedTab] = useState('الكل');
  const [selectedArticleId, setSelectedArticleId] = useState(initialArticleId || (initialArticles && initialArticles.length > 0 ? initialArticles[0].id : 0));
  const [searchQuery, setSearchQuery] = useState('');

  const safeArticles = Array.isArray(articles) ? articles : [];

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
              <Link 
                href={lang === "en" ? `/en/articles/${article.id}` : `/articles/${article.id}`}
                key={article.id}
                style={{ 
                  display: "block",
                  textAlign: "right",
                  padding: "1.2rem",
                  background: selectedArticleId === article.id ? "rgba(0, 91, 171, 0.05)" : "var(--color-bg-card)",
                  border: "1px solid",
                  borderColor: selectedArticleId === article.id ? "var(--color-accent)" : "var(--color-border)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderRight: selectedArticleId === article.id ? "4px solid var(--color-accent)" : "1px solid var(--color-border)",
                  textDecoration: "none"
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
              </Link>
            )) : (
              <p style={{ color: "var(--color-text-muted)" }}>{lang === "en" ? "No matching articles found." : "لا توجد مقالات مطابقة للبحث."}</p>
            )}
          </div>

          {/* Left Column: Article Content */}
          <div style={{ minHeight: "500px", padding: "0 1rem" }}>
            {/* Tabs */}
            <div className="flex gap-sm mb-lg" style={{ flexWrap: "wrap", borderBottom: "1px solid var(--color-border)", paddingBottom: "1.5rem" }}>
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => handleTabChange(cat)}
                  style={{
                    padding: "0.5rem 1.5rem",
                    borderRadius: "30px",
                    background: selectedTab === cat ? "var(--color-accent)" : "transparent",
                    color: selectedTab === cat ? "#fff" : "var(--color-text-main)",
                    fontWeight: selectedTab === cat ? "bold" : "normal",
                    transition: "all 0.3s ease",
                    border: selectedTab === cat ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {selectedArticle ? (
              <div className="animate-fade-in" key={selectedArticle.id}>
                <div className="flex gap-md items-center mb-md" style={{ marginBottom: "1.5rem" }}>
                  <span style={{ background: "rgba(0, 91, 171, 0.1)", color: "var(--color-accent)", padding: "0.4rem 1.2rem", borderRadius: "20px", fontSize: "0.95rem", fontWeight: "bold" }}>
                    {selectedArticle.category}
                  </span>
                  <span style={{ fontSize: "1rem", color: "var(--color-text-muted)" }}>{selectedArticle.date}</span>
                </div>
                
                <h2 style={{ fontSize: "2.4rem", color: "var(--color-primary)", marginBottom: "1.5rem", lineHeight: "1.4" }}>
                  {selectedArticle.title}
                </h2>
                
                <div style={{ width: "80px", height: "4px", background: "var(--color-accent)", marginBottom: "2.5rem", borderRadius: "2px" }}></div>
                
                {selectedArticle.image && (
                  <div style={{ position: "relative", width: "100%", height: "400px", marginBottom: "2.5rem", borderRadius: "12px", overflow: "hidden" }}>
                    <Image src={selectedArticle.image} alt={selectedArticle.title} fill style={{ objectFit: "cover" }} />
                  </div>
                )}
                
                <div 
                  style={{ fontSize: "1.2rem", lineHeight: "2.2", color: "var(--color-text-main)", opacity: 0.9, textAlign: "justify" }}
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
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
