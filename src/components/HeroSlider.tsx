"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { Lang } from "@/lib/dictionary";
import { EditableText } from "@/components/editor/EditableText";

export default function HeroSlider({ settings = {}, lang = "ar" }: { settings?: any, lang?: Lang }) {
  const slides = [
    {
      image: "/hero_egypt.jpg",
      title: lang === "en" ? "Regional Extension with Deep Local Expertise" : "امتداد إقليمي بخبرات محلية عريقة",
      subtitle: lang === "en" 
        ? "Al-Ashmawy office offers customized financial and tax solutions that keep pace with the growth of your investments in the Egyptian market, backed by years of experience." 
        : "مكتب العشماوي يقدم حلولاً مالية وضريبية مخصصة تواكب نمو استثماراتكم في السوق المصري، مدعومة بخبرات تمتد لسنوات."
    },
    {
      image: "/hero_ksa.jpg",
      title: lang === "en" ? "Your Trusted Financial Partner in the Kingdom" : "شريكك المالي الموثوق في المملكة",
      subtitle: lang === "en"
        ? "We offer accounting and tax solutions that align with Saudi Vision 2030 and support the growth and prosperity of your business in the Kingdom with the highest standards."
        : "نقدم حلولاً محاسبية وضريبية تواكب رؤية السعودية 2030 وتدعم نمو وازدهار أعمالك في المملكة بأعلى المعايير."
    },
    {
      image: "/hero_uae.jpg",
      title: lang === "en" ? "Strategic Vision for Business Markets" : "رؤية استراتيجية لأسواق المال والأعمال",
      subtitle: lang === "en"
        ? "Global expertise in establishing, managing, and auditing accounts for companies and investors in the UAE, ensuring your financial stability."
        : "خبرات عالمية في تأسيس، إدارة، وتدقيق الحسابات للشركات والمستثمرين في الإمارات العربية المتحدة، لضمان استقرارك المالي."
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
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: index === currentIndex ? 1 : 0,
              transition: "opacity 1.5s ease-in-out"
            }}
          />
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
          
          <div style={{ 
            color: "#FFFFFF", 
            fontSize: "6rem", 
            fontWeight: "900", 
            letterSpacing: "4px", 
            marginBottom: "0.5rem", 
            textShadow: "0 4px 20px rgba(0,0,0,0.6)" 
          }}>
            AFC
          </div>
          
          <h1 style={{ 
            color: "#FFFFFF", 
            fontSize: "3.5rem", 
            fontWeight: "900", 
            marginBottom: "0.5rem", 
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            fontFamily: "var(--font-amiri), serif" 
          }}>
            <EditableText 
              id={lang === "en" ? "hero_title_en" : "hero_title"}
              value={(lang === "en" && settings.hero_title_en ? settings.hero_title_en : settings.hero_title) || (lang === "en" ? 'Al-Ashmawy Financial Consulting' : 'العشماوي للاستشارات المالية')}
            />
          </h1>
          
          <p style={{ 
            color: "rgba(255,255,255,0.95)", 
            fontSize: "1.5rem", 
            fontWeight: "900", 
            marginBottom: "1.5rem", 
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            letterSpacing: "1px"
          }}>
            <EditableText 
              id={lang === "en" ? "hero_subtitle_en" : "hero_subtitle"}
              value={(lang === "en" && settings.hero_subtitle_en ? settings.hero_subtitle_en : settings.hero_subtitle) || (lang === "en" ? 'Accounting, Audit and Tax Services' : 'للمحاسبة والمراجعة والضرائب')}
            />
          </p>
          
          <div style={{ width: "250px", height: "5px", backgroundColor: "#FFFFFF", margin: "0 auto 1.5rem", opacity: 0.9, boxShadow: "0 2px 5px rgba(0,0,0,0.5)", borderRadius: "3px" }}></div>
          
          <p style={{ 
            color: "#FFFFFF", 
            fontSize: "2.8rem", 
            fontWeight: "900", 
            letterSpacing: "8px", 
            marginBottom: "1.5rem", 
            textShadow: "0 2px 8px rgba(0,0,0,0.6)" 
          }}>
            EGY / KSA / UAE
          </p>
          
          <div className="flex gap-md flex-wrap justify-center" style={{ marginTop: "0" }}>
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
