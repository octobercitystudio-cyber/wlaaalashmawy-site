"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { Lang } from "@/lib/dictionary";
import { EditableText } from "@/components/editor/EditableText";
import { EditableImage } from "@/components/editor/EditableImage";

export default function HeroSlider({ settings = {}, lang = "ar" }: { settings?: any, lang?: Lang }) {
  const slides = [
    {
      id: 1,
      image: settings.hero_image_1 || "/hero_egypt.jpg",
      title: lang === "en" ? (settings.hero_title_1_en || "Regional Extension with Deep Local Expertise") : (settings.hero_title_1 || "امتداد إقليمي بخبرات محلية عريقة"),
      subtitle: lang === "en" 
        ? (settings.hero_subtitle_1_en || "Al-Ashmawy office offers customized financial and tax solutions that keep pace with the growth of your investments in the Egyptian market, backed by years of experience.")
        : (settings.hero_subtitle_1 || "مكتب العشماوي يقدم حلولاً مالية وضريبية مخصصة تواكب نمو استثماراتكم في السوق المصري، مدعومة بخبرات تمتد لسنوات.")
    },
    {
      id: 2,
      image: settings.hero_image_2 || "/hero_ksa.jpg",
      title: lang === "en" ? (settings.hero_title_2_en || "Your Trusted Financial Partner in the Kingdom") : (settings.hero_title_2 || "شريكك المالي الموثوق في المملكة"),
      subtitle: lang === "en"
        ? (settings.hero_subtitle_2_en || "We offer accounting and tax solutions that align with Saudi Vision 2030 and support the growth and prosperity of your business in the Kingdom with the highest standards.")
        : (settings.hero_subtitle_2 || "نقدم حلولاً محاسبية وضريبية تواكب رؤية السعودية 2030 وتدعم نمو وازدهار أعمالك في المملكة بأعلى المعايير.")
    },
    {
      id: 3,
      image: settings.hero_image_3 || "/hero_uae.jpg",
      title: lang === "en" ? (settings.hero_title_3_en || "Strategic Vision for Business Markets") : (settings.hero_title_3 || "رؤية استراتيجية لأسواق المال والأعمال"),
      subtitle: lang === "en"
        ? (settings.hero_subtitle_3_en || "Global expertise in establishing, managing, and auditing accounts for companies and investors in the UAE, ensuring your financial stability.")
        : (settings.hero_subtitle_3 || "خبرات عالمية في تأسيس، إدارة، وتدقيق الحسابات للشركات والمستثمرين في الإمارات العربية المتحدة، لضمان استقرارك المالي.")
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000); // Change slide every 10 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section style={{ 
      position: "relative",
      height: "85vh",
      width: "100%",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>

      {/* Background Image Area */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
        {slides.map((slide, index) => (
          <div 
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: index === currentIndex ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              zIndex: index === currentIndex ? 2 : 1
            }}
          >
            <EditableImage 
              id={`hero_image_${slide.id}`} 
              src={slide.image} 
              alt="Hero" 
              style={{ objectFit: "cover", width: "100%", height: "100%", position: "absolute", inset: 0 }} 
            />
          </div>
        ))}
      </div>

      {/* Dark Blue Overlay to cool down the image colors */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 40, 90, 0.5)", // Stronger blue overlay to shift colors away from yellow/red
        zIndex: 2
      }} />
      
      {/* Centered Text Area */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        zIndex: 3,
        position: "relative",
        width: "100%"
      }}>
        <div style={{ maxWidth: "800px", width: "100%", textAlign: "center", marginTop: "6rem" }}>
          
          <h1 style={{ 
            color: "#FFFFFF", 
            fontSize: "6rem", 
            fontWeight: "900", 
            letterSpacing: "4px", 
            marginBottom: "0.5rem", 
            lineHeight: "1.1",
            textTransform: "uppercase",
            fontFamily: "'Playfair Display', serif",
            textShadow: "0 4px 20px rgba(0,0,0,0.5)"
          }}>
            <EditableText 
              id={lang === "en" ? "hero_main_title_en" : "hero_main_title"} 
              value={(lang === "en" && settings.hero_main_title_en ? settings.hero_main_title_en : settings.hero_main_title) || "AFC"} 
            />
          </h1>

          {/* Render titles and subtitles dynamically for the current slide */}
          <div style={{ position: "relative", minHeight: "180px", marginTop: "1rem" }}>
            {slides.map((slide, index) => (
              <div 
                key={`text-${index}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: index === currentIndex ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                  pointerEvents: index === currentIndex ? "auto" : "none"
                }}
              >
                <h2 style={{ 
                  color: "var(--color-accent)", 
                  fontSize: "2.8rem", 
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                }}>
                  <EditableText id={lang === "en" ? `hero_title_${slide.id}_en` : `hero_title_${slide.id}`} value={slide.title} />
                </h2>
                
                <p className="animate-fade-in-up delay-200" style={{ 
                  color: "#FFFFFF", 
                  fontSize: "1.3rem", 
                  maxWidth: "750px", 
                  margin: "0 auto", 
                  lineHeight: "1.8",
                  opacity: "0.95",
                  fontWeight: "700",
                  textShadow: "0 2px 10px rgba(0,0,0,0.6)"
                }}>
                  <EditableText id={lang === "en" ? `hero_subtitle_${slide.id}_en` : `hero_subtitle_${slide.id}`} value={slide.subtitle} />
                </p>
              </div>
            ))}
          </div>
          
          <div className="flex gap-md flex-wrap justify-center" style={{ marginTop: "2rem" }}>
            <a href="https://wa.me/201155729429?text=مرحباً،%20أود%20الاستفسار%20عن%20خدمات%20مكتب%20العشماوي." target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
              {lang === "en" ? "Request Free Consultation" : "طلب استشارة مجانية"}
            </a>
            <Link href={lang === "en" ? "/en/services" : "/services"} className="btn" style={{ padding: "1rem 2rem", fontSize: "1.1rem", background: "#FFFFFF", border: "1px solid #FFFFFF", color: "var(--color-accent)", borderRadius: "var(--border-radius-sm)", fontWeight: "bold" }}>
              {lang === "en" ? "Discover Our Services" : "اكتشف خدماتنا"}
            </Link>
          </div>
          
        </div>
      </div>

      {/* Navigation Dots (Moved to Center) */}
      <div style={{ position: "absolute", bottom: "15px", left: "50%", transform: "translateX(-50%)", display: "flex", justifyContent: "center", gap: "10px", zIndex: 4 }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? "var(--color-accent)" : "rgba(255, 255, 255, 0.5)",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
