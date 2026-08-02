"use client";

import { useState, useEffect } from "react";
import { Lang } from "@/lib/dictionary";

export default function TestimonialsSlider({ testimonials = [], lang = "ar" }: { testimonials: any[], lang?: Lang }) {
  const N = testimonials.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || N <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= N - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [N, isPaused]);

  if (!testimonials || N === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= N - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? N - 1 : prev - 1));
  };

  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <div
      style={{ position: "relative", padding: "10px 50px", maxWidth: "900px", margin: "0 auto" }}
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
        onClick={handlePrev}
        style={{
          position: "absolute",
          top: "50%",
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
          fontSize: "1.2rem",
          opacity: N > 1 ? 1 : 0,
          pointerEvents: N > 1 ? "auto" : "none",
        }}
        aria-label={lang === "en" ? "Previous" : "السابق"}
      >
        ❮
      </button>

      <button 
        onClick={handleNext}
        style={{
          position: "absolute",
          top: "50%",
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
          fontSize: "1.2rem",
          opacity: N > 1 ? 1 : 0,
          pointerEvents: N > 1 ? "auto" : "none",
        }}
        aria-label={lang === "en" ? "Next" : "التالي"}
      >
        ❯
      </button>

      <div style={{ overflow: "hidden", margin: "0", position: "relative" }}>
        <div 
          style={{ 
            display: "flex", 
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(${currentIndex * 100 * (lang === "en" ? -1 : 1)}%)`
          }}
        >
          {testimonials.map((testi, idx) => {
            const isVisible = idx === currentIndex;
            const initials = (lang === "en" && testi.name_en ? testi.name_en : testi.name).split(' ').map((n: string) => n[0]).join('').substring(0, 2);
            return (
              <div 
                key={`${testi.id || idx}`} 
                aria-hidden={!isVisible}
                style={{ 
                  flex: "0 0 100%", 
                  padding: "10px",
                  opacity: isVisible ? 1 : 0.5,
                  transition: "opacity 0.5s"
                }}
              >
                <div className="premium-card flex flex-col items-center text-center gap-md" style={{ position: "relative", padding: "3rem 2rem", height: "100%" }}>
                  <div style={{ position: "absolute", top: "10px", right: "20px", fontSize: "8rem", color: "rgba(197, 160, 89, 0.05)", lineHeight: 1, fontFamily: "serif", zIndex: 0 }}>&ldquo;</div>
                  <div className="flex flex-col items-center text-center" style={{ position: "relative", zIndex: 1 }}>
                      {testi.image ? (
                        <div style={{ width: "80px", height: "80px", borderRadius: "50%", overflow: "hidden", marginBottom: "0.5rem", border: "2px solid var(--color-accent)", background: "#fff" }}>
                          {/* CMS images can use arbitrary validated HTTPS hosts, so a plain image is intentional here. */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={testi.image} alt={lang === "en" && testi.name_en ? testi.name_en : testi.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        </div>
                      ) : (
                        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--color-bg-body)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-accent)", fontWeight: "bold", border: "2px solid var(--color-accent)", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                          {initials}
                        </div>
                      )}
                      <h4 style={{ margin: 0, color: "var(--color-text-main)", fontSize: "1.2rem" }}>{(lang === "en" && testi.name_en ? testi.name_en : testi.name)}</h4>
                      <p style={{ margin: "0.2rem 0", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>{(lang === "en" && testi.position_en ? testi.position_en : testi.position)}</p>
                      <div style={{ color: "#FFD700", letterSpacing: "3px", fontSize: "1.3rem", marginTop: "0.5rem" }}>
                        {'★'.repeat(testi.rating || 5)}{'☆'.repeat(5 - (testi.rating || 5))}
                      </div>
                  </div>
                  <p style={{ opacity: 0.9, position: "relative", zIndex: 1, margin: 0, lineHeight: 1.8, fontSize: "1.15rem", maxWidth: "800px" }}>
                    &ldquo;{(lang === "en" && testi.content_en ? testi.content_en : testi.content)}&rdquo;
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Dots navigation */}
      {N > 1 && (
        <div className="flex justify-center items-center gap-sm mt-lg" style={{ direction: "ltr" }}>
          {Array.from({ length: N }).map((_, idx) => (
            <button 
              key={idx}
              onClick={() => goToSlide(idx)}
              style={{
                width: currentIndex === idx ? "36px" : "20px",
                height: "20px",
                borderRadius: "10px",
                backgroundColor: currentIndex === idx ? "var(--color-accent)" : "var(--color-border)",
                transition: "all 0.3s ease",
                border: "none",
                cursor: "pointer",
                padding: 0
              }}
              aria-label={lang === "en" ? `Show slide ${idx + 1}` : `عرض الشريحة ${idx + 1}`}
              aria-current={currentIndex === idx ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
