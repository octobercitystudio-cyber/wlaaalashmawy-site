"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/services";

import { Lang } from "@/lib/dictionary";

export default function ServicesCarousel({ services = [], lang = "ar" }: { services?: any[], lang?: Lang }) {
  const data = services.length > 0 ? services : servicesData;
  const N = data.length;
  // Create 5 copies of the data to ensure we never run out of slides during rapid clicks
  const extendedItems = [...data, ...data, ...data, ...data, ...data];
  const START_INDEX = N * 2; // Start in the middle of the 5 copies
  
  const [currentIndex, setCurrentIndex] = useState(START_INDEX);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);

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
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Infinite jump logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex >= N * 3) {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex - N);
      } else if (currentIndex <= N) {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex + N);
      }
    }, 500); // Wait for CSS transition to finish

    return () => clearTimeout(timeout);
  }, [currentIndex, N]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (realIndex: number) => {
    setIsTransitioning(true);
    setCurrentIndex(START_INDEX + realIndex);
  };

  const activeDot = currentIndex % N;

  return (
    <div style={{ position: "relative", padding: "10px 50px" }}>
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
        aria-label="التالي"
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
        aria-label="السابق"
      >
        ❮
      </button>

      <div style={{ overflow: "hidden", margin: "0 -10px", position: "relative" }}>
        <div 
          style={{ 
            display: "flex", 
            transition: isTransitioning ? "transform 0.5s ease-in-out" : "none", 
            // In RTL, positive translateX moves the container to the right.
            // In LTR, positive translateX moves the container to the right (offscreen), so we use negative.
            transform: `translateX(${currentIndex * (100 / itemsToShow) * (lang === "en" ? -1 : 1)}%)` 
          }}
        >
          {extendedItems.map((service, idx) => (
            <div 
              key={`${service.id}-${idx}`} 
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
                      href={lang === "en" ? `/en/services/${service.id}` : `/services/${service.id}`} 
                      className="btn btn-secondary" 
                      style={{ padding: "0.5rem 1.5rem", fontSize: "0.95rem", width: "100%" }}
                    >
                      {lang === "en" ? "Details" : "التفاصيل"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dots navigation */}
      <div className="flex justify-center items-center gap-sm mt-lg" style={{ direction: "ltr" }}>
        {Array.from({ length: N }).map((_, idx) => (
          <button 
            key={idx}
            onClick={() => goToSlide(idx)}
            style={{
              width: activeDot === idx ? "30px" : "12px",
              height: "12px",
              borderRadius: "6px",
              backgroundColor: activeDot === idx ? "var(--color-accent)" : "var(--color-border)",
              transition: "all 0.3s ease",
              border: "none",
              cursor: "pointer",
              padding: 0
            }}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
