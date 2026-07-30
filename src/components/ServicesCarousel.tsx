"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/services";

import { Lang } from "@/lib/dictionary";
import { servicePath } from "@/lib/serviceRoutes";

export default function ServicesCarousel({ services = [], lang = "ar" }: { services?: any[], lang?: Lang }) {
  const data = services.length > 0 ? services : servicesData;
  const N = data.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Responsive items count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => setReduceMotion(mediaQuery.matches);
    handleResize();
    handleMotionPreference();
    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener("change", handleMotionPreference);
    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (isPaused || reduceMotion || N <= itemsToShow) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, N - itemsToShow);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [N, isPaused, itemsToShow, reduceMotion]);

  const handleNext = () => {
    const maxIndex = Math.max(0, N - itemsToShow);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    const maxIndex = Math.max(0, N - itemsToShow);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => setCurrentIndex(index);
  const pageCount = Math.max(1, N - itemsToShow + 1);
  const visibleIndex = Math.min(currentIndex, pageCount - 1);

  return (
    <div
      style={{ position: "relative", padding: "10px 50px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      aria-roledescription={lang === "en" ? "carousel" : "عارض شرائح"}
    >
      {/* Navigation Arrows */}
      <button 
        onClick={handleNext}
        style={{
          position: "absolute",
          top: "40%",
          left: "0",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "var(--color-accent)",
          color: "white",
          border: "none",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          fontSize: "1.2rem"
        }}
        aria-label={lang === "en" ? "Next services" : "الخدمات التالية"}
      >
        ❯
      </button>
      <button 
        onClick={handlePrev}
        style={{
          position: "absolute",
          top: "40%",
          right: "0",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "var(--color-accent)",
          color: "white",
          border: "none",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          fontSize: "1.2rem"
        }}
        aria-label={lang === "en" ? "Previous services" : "الخدمات السابقة"}
      >
        ❮
      </button>

      <div style={{ overflow: "hidden", margin: "0 -10px", position: "relative" }}>
        <div 
          style={{ 
            display: "flex", 
            transition: reduceMotion ? "none" : "transform 0.5s ease-in-out",
            // In RTL, positive translateX moves the container to the right.
            // In LTR, positive translateX moves the container to the right (offscreen), so we use negative.
            transform: `translateX(${visibleIndex * (100 / itemsToShow) * (lang === "en" ? -1 : 1)}%)`
          }}
        >
          {data.map((service, idx) => {
            const isVisible = idx >= visibleIndex && idx < visibleIndex + itemsToShow;
            return (
            <div 
              key={`${service.id}-${idx}`} 
              aria-hidden={!isVisible}
              style={{ 
                flex: `0 0 ${100 / itemsToShow}%`, 
                padding: "0 10px" 
              }}
            >
              <div 
                className="premium-card text-center" 
                style={{ 
                  border: "2px solid var(--color-accent)", 
                  height: "100%", 
                  padding: 0, 
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "220px" }}>
                  <Image 
                    src={service.image} 
                    alt={(lang === "en" && service.title_en ? service.title_en : (service.title?.ar || service.title)) || "Service"} 
                    fill 
                    style={{ objectFit: "cover" }} 
                  />
                </div>
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3 style={{ fontSize: "1.4rem", marginBottom: "var(--spacing-sm)", color: "var(--color-primary)" }}>
                    {lang === "en" && service.title_en ? service.title_en : (service.title?.ar || service.title)}
                  </h3>
                  <p style={{ fontSize: "0.95rem", marginBottom: "1.5rem", flexGrow: 1 }}>
                    {lang === "en" && service.description_en ? service.description_en : (service.description || service.shortDesc?.ar)}
                  </p>
                  <div style={{ marginTop: "auto" }}>
                    <Link 
                      href={servicePath(service.id, lang)}
                      tabIndex={isVisible ? 0 : -1}
                      className="btn btn-secondary" 
                      style={{ padding: "0.5rem 1.5rem", fontSize: "0.95rem", width: "100%" }}
                    >
                      {lang === "en" ? "Details" : "التفاصيل"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
      
      {/* Dots navigation */}
      <div className="flex justify-center items-center gap-sm mt-lg" style={{ direction: "ltr" }}>
        {Array.from({ length: pageCount }).map((_, idx) => (
          <button 
            key={idx}
            onClick={() => goToSlide(idx)}
            style={{
              width: visibleIndex === idx ? "36px" : "20px",
              height: "20px",
              borderRadius: "10px",
              backgroundColor: visibleIndex === idx ? "var(--color-accent)" : "var(--color-border)",
              transition: "all 0.3s ease",
              border: "none",
              cursor: "pointer",
              padding: 0
            }}
            aria-label={lang === "en" ? `Show services group ${idx + 1}` : `عرض مجموعة الخدمات ${idx + 1}`}
            aria-current={visibleIndex === idx ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
