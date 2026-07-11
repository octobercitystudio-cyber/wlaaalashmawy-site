"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/services";

export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

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
      setCurrentIndex((prev) => {
        // If we reach the last possible slide, loop back to start
        if (prev >= servicesData.length - itemsToShow) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [itemsToShow]);

  // Handle dots click
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const totalSlides = Math.max(1, servicesData.length - itemsToShow + 1);

  return (
    <div style={{ position: "relative", padding: "10px 0" }}>
      <div style={{ overflow: "hidden", margin: "0 -10px", position: "relative" }}>
        
        {/* Navigation Arrows */}
        <button 
          onClick={handleNext}
          style={{
            position: "absolute",
            top: "50%",
            left: "15px",
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
            opacity: 0.9
          }}
          aria-label="التالي"
        >
          ❮
        </button>
        <button 
          onClick={handlePrev}
          style={{
            position: "absolute",
            top: "50%",
            right: "15px",
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
            opacity: 0.9
          }}
          aria-label="السابق"
        >
          ❯
        </button>

        <div 
          style={{ 
            display: "flex", 
            transition: "transform 0.5s ease-in-out", 
            // In RTL, positive translateX moves the container to the right,
            // revealing items that are rendered to the left.
            transform: `translateX(${currentIndex * (100 / itemsToShow)}%)` 
          }}
        >
          {servicesData.map((service) => (
            <div 
              key={service.id} 
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
                    alt={service.title.ar} 
                    fill 
                    style={{ objectFit: "cover" }} 
                  />
                </div>
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3 style={{ fontSize: "1.4rem", marginBottom: "var(--spacing-sm)", color: "var(--color-primary)" }}>
                    {service.title.ar}
                  </h3>
                  <p style={{ fontSize: "0.95rem", marginBottom: "1.5rem", flexGrow: 1 }}>
                    {service.shortDesc.ar}
                  </p>
                  <div style={{ marginTop: "auto" }}>
                    <Link 
                      href={`/services/${service.id}`} 
                      className="btn btn-secondary" 
                      style={{ padding: "0.5rem 1.5rem", fontSize: "0.95rem", width: "100%" }}
                    >
                      التفاصيل
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
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button 
            key={idx}
            onClick={() => goToSlide(idx)}
            style={{
              width: currentIndex === idx ? "30px" : "12px",
              height: "12px",
              borderRadius: "6px",
              backgroundColor: currentIndex === idx ? "var(--color-accent)" : "var(--color-border)",
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
