"use client";

import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ServicesCarousel from "@/components/ServicesCarousel";
import AnimatedStat from "@/components/AnimatedStat";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import { EditableText } from "@/components/editor/EditableText";
import { useSiteContent } from "@/components/SiteContentProvider";

import { Lang } from "@/lib/dictionary";
import { BRAND_AR, BRAND_EN, HOME_SEO_CTA, HOME_SEO_PARAGRAPHS } from "@/lib/seo";

export default function Home({ lang = "ar" }: { lang?: Lang }) {
  const { settings, services, features, stats, testimonials } = useSiteContent();
  const localized = (key: string, fallbackAr: string, fallbackEn: string) =>
    (lang === "en" ? settings[`${key}_en`] : settings[key]) || (lang === "en" ? fallbackEn : fallbackAr);

  return (
    <div className="animate-fade-in" style={{ flex: 1 }}>
      {/* Hero Section */}
      <HeroSlider settings={settings} lang={lang} />

      {/* Stats Section */}
      <section style={{ padding: "var(--spacing-lg) 0", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-card)" }}>
        <div className="container grid grid-cols-1 md-grid-cols-4 gap-lg">
          {stats.slice(0, 4).map((stat: any, index: number) => {
            const numericValue = parseInt(stat.value.replace(/[^0-9]/g, '')) || 0;
            const suffix = stat.value.replace(/[0-9]/g, '');
            let engTitle = stat.title_en;
            if (!engTitle && stat.title) {
               if (stat.title.includes('الخبرة')) engTitle = "Years of Experience";
               if (stat.title.includes('عميل')) engTitle = "Happy Clients";
               if (stat.title.includes('مشروع')) engTitle = "Successful Projects";
               if (stat.title.includes('خبير')) engTitle = "Financial Experts";
            }
            return (
              <AnimatedStat key={stat.id || index} target={numericValue} suffix={suffix} labelLines={lang === "en" ? (engTitle || stat.title) : stat.title} />
            );
          })}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container py-xl">
        <div className="text-center mb-lg">
          <h2 className="text-gold">{localized("home_services_title", "الخدمات المحاسبية", "Our Services")}</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            {localized("home_services_subtitle", "نقدم مجموعة واسعة وشاملة من الخدمات المحاسبية لتلبية كافة احتياجات أعمالك.", "We offer a comprehensive set of accounting services tailored to your needs.")}
          </p>
        </div>
        <ServicesCarousel services={services} lang={lang} />
        <div className="text-center" style={{ marginTop: "var(--spacing-lg)" }}>
          <Link href={lang === "en" ? "/en/services" : "/services"} className="btn btn-secondary">
            {lang === "en" ? "View All Services" : "عرض كل الخدمات"}
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" style={{ padding: "var(--spacing-xl) 0", background: "var(--color-bg-card)" }}>
        <div className="container grid grid-cols-1 md-grid-cols-2 gap-lg items-center">
          <div>
            <h2 className="text-gold">{localized("home_why_title", "لماذا تختار AFC؟", "Why Choose AFC?")}</h2>
            <EditableText 
              id={lang === "en" ? "about_short_en" : "about_short"}
              value={(lang === "en" && settings.about_short_en ? settings.about_short_en : settings.about_short) || (lang === "en" ? "We don't just provide numbers, we provide deep financial insight. Through the latest methodologies and accounting technologies, we ensure financial security and infinite precision." : "نحن لا نقدم أرقاماً فحسب، بل نقدم رؤية مالية عميقة. من خلال أحدث المنهجيات والتقنيات المحاسبية، نضمن لك الأمان المالي والدقة المتناهية.")}
              isHtml={true}
              as="div"
              style={{ fontSize: "1.1rem" }}
            />
            <ul className="flex flex-col gap-sm" style={{ marginTop: "var(--spacing-md)" }}>
              {features.map((feature: any, index: number) => (
                <li key={feature.id || index} className="flex items-center gap-sm" style={{ fontSize: "1.1rem" }}>
                  <span className="text-gold" style={{ fontWeight: "bold" }}>✦</span> {(lang === "en" && feature.title_en ? feature.title_en : feature.title)}: {(lang === "en" && feature.description_en ? feature.description_en : feature.description)}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "var(--spacing-md)" }}>
              <Link href={lang === "en" ? "/en/about" : "/about"} className="btn btn-outline mt-md">{lang === "en" ? "Learn More About Us" : "تعرف علينا أكثر"}</Link>
            </div>
          </div>
          <div className="premium-card flex justify-center items-center" style={{ minHeight: "350px", padding: 0, overflow: "hidden", position: "relative", border: "2px solid var(--color-accent)" }}>
            <Image 
              src={settings.home_about_image || "/images/wlaa-office.jpg"}
              alt={lang === "en" ? "Wlaa Magdy - Founder of AFC – Al-Ashmawy Financial Consulting" : "الأستاذة ولاء مجدي العشماوي - مؤسسة AFC – العشماوي للاستشارات المالية"}
              fill 
              style={{ objectFit: "cover", objectPosition: "top center" }} 
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container py-xl">
        <div className="text-center mb-lg">
          <h2 className="text-gold">{localized("testimonials_title", "آراء شركاء النجاح", "What Our Clients Say")}</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            {localized("testimonials_subtitle", "نفخر بثقة عملائنا، ونسعى دائماً لتقديم أفضل الخدمات المالية التي تلبي تطلعاتهم وتساهم في نمو أعمالهم.", "We take pride in the trust our clients place in us. Here is what some of our partners have to say.")}
          </p>
        </div>
        
        <TestimonialsSlider testimonials={testimonials} lang={lang} />
      </section>

      {/* Search-friendly company overview */}
      <section className="container py-xl" aria-labelledby="home-seo-heading">
        <div className="premium-card" style={{ padding: "clamp(1.5rem, 4vw, 3rem)", textAlign: lang === "en" ? "left" : "right" }}>
          <h2 id="home-seo-heading" className="text-gold" style={{ marginBottom: "1.5rem" }}>
            {lang === "en" ? BRAND_EN : BRAND_AR}
          </h2>
          {lang === "ar" ? HOME_SEO_PARAGRAPHS.map((fallback, index) => (
            <p key={index} style={{ fontSize: "1.08rem", lineHeight: 2, marginBottom: "1rem" }}>
              {settings[`home_seo_paragraph_${index + 1}`] || fallback}
            </p>
          )) : (
            <p style={{ fontSize: "1.08rem", lineHeight: 2, marginBottom: "1rem" }}>
              {settings.home_seo_text_en || "AFC – Al-Ashmawy Financial Consulting provides integrated accounting, audit and tax solutions for companies, investors and entrepreneurs across Egypt."}
            </p>
          )}
          <p style={{ fontSize: "1.12rem", lineHeight: 2, fontWeight: 700, color: "var(--color-primary)", margin: "1.5rem 0" }}>
            {(lang === "en" ? settings.home_seo_cta_en : settings.home_seo_cta) || (lang === "en" ? "Book your consultation with AFC and let our team help you build a more efficient and stable financial and tax system." : HOME_SEO_CTA)}
          </p>
          <Link href={lang === "en" ? "/en/contact" : "/contact"} className="btn btn-primary">
            {lang === "en" ? "Book Your Consultation" : "احجز استشارتك الآن"}
          </Link>
        </div>
      </section>

      {/* Call to Action & Contact */}
      <section id="contact" className="container py-xl text-center" style={{ background: "var(--color-bg-card)", borderRadius: "16px", marginBottom: "var(--spacing-xl)", border: "1px solid var(--color-border)" }}>
        <div className="mb-lg">
          <h2 className="text-gold">{localized("home_cta_title", "ابدأ رحلة النجاح المالي معنا", "Start Your Financial Success Journey With Us")}</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto var(--spacing-md)" }}>
            {localized("home_cta_text", "احجز استشارتك المجانية اليوم، ودع خبراءنا يرشدونك نحو الاستقرار المالي والنمو المستدام.", "Book your free consultation today and let our experts help you reach financial stability.")}
          </p>
          <a href={settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${lang === "en" ? encodeURIComponent('Hello, I would like to inquire about AFC services.') : encodeURIComponent('مرحباً، أود الاستفسار عن خدمات مكتب العشماوي.')}` : "https://wa.me/201155729429"} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1.2rem" }}>{lang === "en" ? "Contact Us Now" : "تواصل معنا الآن"}</a>
        </div>
      </section>
    </div>
  );
}
