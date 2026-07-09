"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroSlider() {
  const slides = [
    {
      image: "/hero_egypt.jpg",
      title: "امتداد إقليمي بخبرات محلية عريقة",
      subtitle: "مكتب العشماوي يقدم حلولاً مالية وضريبية مخصصة تواكب نمو استثماراتكم في السوق المصري، مدعومة بخبرات تمتد لسنوات."
    },
    {
      image: "/hero_ksa.jpg",
      title: "شريكك المالي الموثوق في المملكة",
      subtitle: "نقدم حلولاً محاسبية وضريبية تواكب رؤية السعودية 2030 وتدعم نمو وازدهار أعمالك في المملكة بأعلى المعايير."
    },
    {
      image: "/hero_uae.jpg",
      title: "رؤية استراتيجية لأسواق المال والأعمال",
      subtitle: "خبرات عالمية في تأسيس، إدارة، وتدقيق الحسابات للشركات والمستثمرين في الإمارات العربية المتحدة، لضمان استقرارك المالي."
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

      {/* Dark Overlay for Text Readability */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)", // Lighter Translucent Black Overlay
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
        <div style={{ maxWidth: "800px", width: "100%", textAlign: "center", marginBottom: "4rem" }}>
          
          <h1 style={{ 
            color: "#FFFFFF", 
            fontSize: "6rem", 
            fontWeight: "900", 
            letterSpacing: "4px", 
            marginBottom: "0.5rem", 
            textShadow: "0 4px 20px rgba(0,0,0,0.6)" 
          }}>
            AFC
          </h1>
          
          <h2 style={{ 
            color: "#FFFFFF", 
            fontSize: "2.8rem", 
            fontWeight: "700", 
            marginBottom: "1rem", 
            textShadow: "0 2px 10px rgba(0,0,0,0.5)" 
          }}>
            العشماوي للاستشارات المالية
          </h2>
          
          <p style={{ 
            color: "rgba(255,255,255,0.95)", 
            fontSize: "1.5rem", 
            fontWeight: "900", 
            marginBottom: "1.5rem", 
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            letterSpacing: "1px"
          }}>
            للمحاسبة والمراجعة والضرائب
          </p>
          
          <div style={{ width: "250px", height: "5px", backgroundColor: "#FFFFFF", margin: "0 auto 1.5rem", opacity: 0.9, boxShadow: "0 2px 5px rgba(0,0,0,0.5)", borderRadius: "3px" }}></div>
          
          <p style={{ 
            color: "#FFFFFF", 
            fontSize: "2rem", 
            fontWeight: "900", 
            letterSpacing: "6px", 
            marginBottom: "3rem", 
            textShadow: "0 2px 8px rgba(0,0,0,0.6)" 
          }}>
            EGY / KSA / UAE
          </p>
          
          <div className="flex gap-md flex-wrap justify-center" style={{ marginTop: "1rem" }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
              طلب استشارة مجانية
            </Link>
            <Link href="/services" className="btn" style={{ padding: "1rem 2rem", fontSize: "1.1rem", background: "transparent", border: "1px solid #FFFFFF", color: "#FFFFFF", borderRadius: "var(--border-radius-sm)" }}>
              اكتشف خدماتنا
            </Link>
          </div>
          
        </div>
      </div>

      {/* Navigation Dots (Moved to Center) */}
      <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", justifyContent: "center", gap: "10px", zIndex: 4 }}>
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
