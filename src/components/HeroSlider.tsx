"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { Lang } from "@/lib/dictionary";
import { EditableText } from "@/components/editor/EditableText";
import { normalizeWhatsAppNumber, parseSettingList } from "@/lib/contact";

export default function HeroSlider({ settings = {}, lang = "ar" }: { settings?: any, lang?: Lang }) {
  const slides = [
    {
      image: "/hero_egypt.jpg",
      title: lang === "en" ? "Professional Expertise Rooted in Egypt" : "خبرة مهنية راسخة في السوق المصري",
      subtitle: lang === "en" 
        ? "AFC provides practical accounting, audit and tax solutions tailored to the needs of businesses and investors operating in Egypt."
        : "تقدم AFC حلولًا عملية في المحاسبة والمراجعة والضرائب، مصممة لاحتياجات الشركات والمستثمرين العاملين في مصر."
    },
    {
      image: "/hero_ksa.jpg",
      title: lang === "en" ? "Financial Readiness for Regional Expansion" : "جاهزية مالية تدعم التوسع الإقليمي",
      subtitle: lang === "en"
        ? "We help businesses strengthen records, reporting and planning before regional expansion, while jurisdiction-specific work is handled with licensed local specialists where required."
        : "نساعد الشركات على تقوية السجلات والتقارير والتخطيط قبل التوسع إقليميًا، مع تنفيذ المتطلبات الخاصة بكل دولة بالتعاون مع المختصين المرخصين عند الحاجة."
    },
    {
      image: "/hero_uae.jpg",
      title: lang === "en" ? "Clearer Reporting for Better Decisions" : "تقارير أوضح لقرارات أفضل",
      subtitle: lang === "en"
        ? "Reliable financial information gives management and investors a stronger foundation for evaluating opportunities and managing growth."
        : "تمنح المعلومات المالية الموثوقة الإدارة والمستثمرين أساسًا أقوى لتقييم الفرص وإدارة النمو."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const phones = parseSettingList(settings.contact_phones);
  const whatsappNumber = normalizeWhatsAppNumber(
    settings.contact_whatsapp || settings.whatsapp || phones[0],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => setReduceMotion(mediaQuery.matches);
    handleMotionPreference();
    mediaQuery.addEventListener("change", handleMotionPreference);
    return () => mediaQuery.removeEventListener("change", handleMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || reduceMotion) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isPaused, reduceMotion, slides.length]);

  return (
    <section style={{ 
      position: "relative",
      minHeight: "85vh",
      width: "100%",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: "4rem"
    }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      aria-roledescription={lang === "en" ? "carousel" : "عارض شرائح"}
    >

      {/* Background Image Area */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
        <Image
          key={slides[currentIndex].image}
          src={slides[currentIndex].image}
          alt=""
          fill
          sizes="100vw"
          priority={currentIndex === 0}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            animation: reduceMotion ? "none" : "heroFade 0.8s ease-in-out",
          }}
        />
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
        <div style={{ maxWidth: "800px", width: "100%", textAlign: "center", marginTop: "3rem", marginBottom: "2rem" }}>
          
          <div className="hero-brand" style={{
            color: "#FFFFFF", 
            letterSpacing: "4px", 
            marginBottom: "0.5rem", 
            textShadow: "0 4px 20px rgba(0,0,0,0.6)" 
          }}>
            AFC
          </div>
          
          <h1 className="hero-title" style={{
            color: "#FFFFFF", 
            marginBottom: "0.5rem", 
            textShadow: "0 2px 8px rgba(0,0,0,0.5)"
          }}>
            <EditableText 
              id={lang === "en" ? "hero_title_en" : "hero_title"}
              value={(lang === "en" && settings.hero_title_en ? settings.hero_title_en : settings.hero_title) || (lang === "en" ? 'Al-Ashmawy Financial Consulting' : 'العشماوي للاستشارات المالية')}
            />
          </h1>
          
          <p className="hero-subtitle" style={{
            color: "rgba(255,255,255,0.95)", 
            marginBottom: "1.5rem", 
            textShadow: "0 2px 8px rgba(0,0,0,0.5)"
          }}>
            <EditableText 
              id={lang === "en" ? "hero_subtitle_en" : "hero_subtitle"}
              value={(lang === "en" && settings.hero_subtitle_en ? settings.hero_subtitle_en : settings.hero_subtitle) || (lang === "en" ? 'Accounting, Audit and Tax Services' : 'للمحاسبة والمراجعة والضرائب')}
            />
          </p>
          
          <div style={{ width: "250px", height: "5px", backgroundColor: "#FFFFFF", margin: "0 auto 1.5rem", opacity: 0.9, boxShadow: "0 2px 5px rgba(0,0,0,0.5)", borderRadius: "3px" }}></div>
          
          <p className="hero-regional-copy" style={{
            color: "#FFFFFF", 
            marginBottom: "1.5rem", 
            textShadow: "0 2px 8px rgba(0,0,0,0.6)" 
          }}>
            EGY / KSA / UAE
          </p>
          
          <div className="flex gap-md flex-wrap justify-center" style={{ marginTop: "0", marginBottom: "3rem" }}>
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lang === "en" ? "Hello, I would like to request a free consultation." : "مرحبًا، أود طلب استشارة مجانية.")}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
              {lang === "en" ? "Request Free Consultation" : "طلب استشارة مجانية"}
            </a>
            <Link href={lang === "en" ? "/en/services" : "/services"} className="btn" style={{ padding: "1rem 2rem", fontSize: "1.1rem", background: "#FFFFFF", border: "1px solid #FFFFFF", color: "var(--color-accent)", borderRadius: "var(--border-radius-sm)", fontWeight: "bold" }}>
              {lang === "en" ? "Discover Our Services" : "اكتشف خدماتنا"}
            </Link>
          </div>
          
        </div>
      </div>

      {/* Navigation Dots (Moved to Center) */}
      <div style={{ position: "absolute", bottom: "18px", left: "50%", transform: "translateX(-50%)", display: "flex", justifyContent: "center", gap: "10px", zIndex: 4 }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? "var(--color-accent)" : "rgba(255, 255, 255, 0.65)",
              border: "12px solid transparent",
              backgroundClip: "padding-box",
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
            aria-label={lang === "en" ? `Show slide ${index + 1}` : `عرض الشريحة ${index + 1}`}
            aria-current={index === currentIndex ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
