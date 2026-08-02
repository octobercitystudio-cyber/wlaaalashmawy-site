"use client";

import Link from "next/link";
import Image from "next/image";
import { Lang } from "@/lib/dictionary";
import { normalizeWhatsAppNumber, parseSettingList } from "@/lib/contact";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import { useSiteContent } from "@/components/SiteContentProvider";

function parseMarkdown(text: string) {
  if (!text) return "";
  if (/<\/?(?:p|br|strong|b|em|i|u|s|h[1-6]|ul|ol|li|blockquote|pre|code|a|span|div|table|thead|tbody|tr|th|td|hr)\b/i.test(text)) {
    return sanitizeHtml(text);
  }

  const escapedText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  const html = escapedText
    .replace(/^### (.*$)/gim, '<h3 style="margin-top:1.5rem;margin-bottom:0.5rem;color:var(--color-primary)">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="margin-top:1.5rem;margin-bottom:0.5rem;color:var(--color-primary)">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="margin-top:1.5rem;margin-bottom:0.5rem;color:var(--color-primary)">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^\- (.*$)/gim, '<li style="margin-bottom:0.5rem;margin-right:1.5rem;list-style-type:disc">$1</li>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
  return html;
}

export default function ServiceDetailsPage({ id, lang = "ar" }: { id: string, lang?: Lang }) {
  const { services, settings } = useSiteContent();
  const service = services.find((s: any) => s.id == id);
  
  if (!service) {
    return <main className="container py-xl" style={{ paddingTop: "10rem", minHeight: "60vh" }}><h1>{lang === "en" ? "Service not found" : "الخدمة غير موجودة"}</h1></main>;
  }

  const title = lang === "en" && service.title_en ? service.title_en : service.title;
  const content = lang === "en" && service.content_en ? service.content_en : service.content;
  const phones = parseSettingList(settings.contact_phones);
  const whatsappNumber = normalizeWhatsAppNumber(
    settings.contact_whatsapp || settings.whatsapp || phones[0],
  );

  return (
    <main>
      <section style={{ 
        paddingTop: "12rem", 
        paddingBottom: "8rem", 
        color: "#FFFFFF",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <Image src={service.image || "/images/services_hero.jpg"} alt={title} fill style={{ objectFit: "cover", zIndex: 0 }} priority />
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Link href={lang === "en" ? "/en/services" : "/services"} style={{ color: "var(--color-accent)", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
            {lang === "en" ? "← Back to Services" : "❯ العودة إلى الخدمات"}
          </Link>
          <h1 className="page-hero-title" style={{ marginBottom: "1rem", color: "#FFFFFF", fontWeight: "bold" }}>{title}</h1>
          <div style={{ width: "80px", height: "4px", backgroundColor: "var(--color-accent)", margin: "0 auto", boxShadow: "0 2px 5px rgba(0,0,0,0.3)" }}></div>
        </div>
      </section>

      <section className="py-xl" style={{ backgroundColor: "var(--color-bg-body)" }}>
        <div className="container">
          <div style={{ marginBottom: "var(--spacing-xl)" }}>
            <article
              className="service-content"
              style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--color-text-main)" }}
              dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} 
            />
          </div>

          <div className="text-center">
            <h3 style={{ marginBottom: "var(--spacing-md)", color: "var(--color-primary)" }}>{lang === "en" ? "Need help with this service?" : "هل تحتاج مساعدة في هذه الخدمة؟"}</h3>
            <p style={{ marginBottom: "var(--spacing-lg)", color: "var(--color-text-muted)" }}>{lang === "en" ? "Get a free consultation regarding this service" : "احصل على استشارة مجانية بخصوص هذه الخدمة"}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lang === "en" ? `Hello, I want to inquire about ${title}` : `مرحباً، أود الاستفسار عن ${title}`)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary text-white"
                style={{ fontSize: "1.2rem", padding: "1rem 3rem", backgroundColor: "var(--color-accent)" }}
              >
                {lang === "en" ? "Contact Us Now" : "تواصل معنا الآن"}
              </a>
              <Link 
                href={lang === "en" ? "/en/services" : "/services"}
                className="btn"
                style={{ fontSize: "1.2rem", padding: "1rem 3rem", backgroundColor: "transparent", border: "2px solid var(--color-accent)", color: "var(--color-accent)" }}
              >
                {lang === "en" ? "Back to Services" : "العودة لصفحة الخدمات"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
