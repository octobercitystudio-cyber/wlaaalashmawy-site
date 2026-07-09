"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{ 
      padding: scrolled ? "0.1rem 0" : "0.2rem 0", 
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(15px)",
      WebkitBackdropFilter: "blur(15px)",
      boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "none",
      borderBottom: "1px solid var(--color-border)",
      zIndex: 100,
      transition: "all 0.3s ease"
    }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
        
        {/* Logo (Right side in RTL) */}
        <div style={{ justifySelf: "start" }}>
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="العشماوي" 
              width={195} 
              height={65} 
              style={{ 
                objectFit: "contain"
              }} 
              priority
            />
          </Link>
        </div>
        
        {/* Desktop Menu (Center) */}
        <div style={{ justifySelf: "center" }}>
          <ul className="flex gap-lg items-center">
            <li><Link href="/" style={{ fontWeight: 600, color: "var(--color-primary)" }}>الرئيسية</Link></li>
            <li><Link href="/about" style={{ fontWeight: 600, color: "var(--color-primary)" }}>من نحن</Link></li>
            <li><Link href="/services" style={{ fontWeight: 600, color: "var(--color-primary)" }}>خدماتنا</Link></li>
            <li><Link href="/sectors" style={{ fontWeight: 600, color: "var(--color-primary)" }}>القطاعات</Link></li>
            <li><Link href="/articles" style={{ fontWeight: 600, color: "var(--color-primary)" }}>المقالات</Link></li>
            <li><Link href="/contact" style={{ fontWeight: 600, color: "var(--color-primary)" }}>تواصل معنا</Link></li>
          </ul>
        </div>

        {/* CTA & Actions (Left side in RTL) */}
        <div style={{ justifySelf: "end" }} className="flex gap-md items-center">
          <Link href="/contact" className="btn btn-primary" style={{ padding: "0.5rem 1.5rem", fontSize: "1rem" }}>استشارة</Link>
          <button style={{ color: "var(--color-primary)", fontWeight: "bold", border: "1px solid var(--color-border)", padding: "0.3rem 0.6rem", borderRadius: "4px", background: "transparent" }}>EN</button>
        </div>

      </div>
    </nav>
  );
}
