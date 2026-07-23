"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { EditableImage } from "@/components/editor/EditableImage";

import { getDictionary, Lang } from "@/lib/dictionary";

export default function Navbar({ settings = {}, services = [], lang = "ar" }: { settings?: any, services?: any[], lang?: Lang }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const whatsappNum = settings.contact_whatsapp || '201155729429';
  const dict = getDictionary(lang);
  const prefix = lang === 'en' ? '/en' : '';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const NavLinks = ({ isMobile = false }) => (
    <ul className={`flex ${isMobile ? 'flex-col gap-md' : 'gap-lg items-center'}`}>
      <li>
        <Link href={`${prefix}/`} className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => isMobile && setIsMobileMenuOpen(false)}>
          {dict.home}
        </Link>
      </li>
      <li>
        <Link href={`${prefix}/about`} className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={() => isMobile && setIsMobileMenuOpen(false)}>
          {dict.about}
        </Link>
      </li>
      <li className={isMobile ? '' : 'nav-dropdown'}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Link href={`${prefix}/services`} className={`nav-link ${isActive('/services') ? 'active' : ''}`} onClick={() => isMobile && setIsMobileMenuOpen(false)}>
            {dict.ourServices}
            {!isMobile && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginInlineStart: '4px' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            )}
          </Link>
          {isMobile ? (
             <div style={{ paddingInlineStart: '1rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {services.map(service => (
                  <Link key={service.id} href={`${prefix}/services/${service.id}`} onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                    - {lang === "en" && service.title_en ? service.title_en : service.title}
                  </Link>
                ))}
             </div>
          ) : (
            <div className="nav-dropdown-content">
              {services.map(service => (
                <Link key={service.id} href={`${prefix}/services/${service.id}`} className="nav-dropdown-item">
                  {lang === "en" && service.title_en ? service.title_en : service.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </li>
      <li>
        <Link href={`${prefix}/sectors`} className={`nav-link ${isActive('/sectors') ? 'active' : ''}`} onClick={() => isMobile && setIsMobileMenuOpen(false)}>
          {dict.sectors}
        </Link>
      </li>
      <li>
        <Link href={`${prefix}/articles`} className={`nav-link ${isActive('/articles') ? 'active' : ''}`} onClick={() => isMobile && setIsMobileMenuOpen(false)}>
          {dict.articles}
        </Link>
      </li>
      <li>
        <Link href={`${prefix}/contact`} className={`nav-link ${isActive('/contact') ? 'active' : ''}`} onClick={() => isMobile && setIsMobileMenuOpen(false)}>
          {dict.contact}
        </Link>
      </li>
    </ul>
  );

  return (
    <nav style={{ 
      padding: scrolled ? "0.1rem 0" : "0.2rem 0", 
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(15px)",
      WebkitBackdropFilter: "blur(15px)",
      boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "none",
      borderBottom: "1px solid var(--color-border)",
      zIndex: 100,
      transition: "all 0.3s ease"
    }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "70px" }}>
        
        {/* Logo */}
        <div>
          <Link href={`${prefix}/`} onClick={() => setIsMobileMenuOpen(false)}>
            <div style={{ position: "relative", width: "120px", height: "40px" }}>
              <EditableImage 
                id="site_logo" 
                src={settings?.site_logo || "/logo.png"} 
                alt="العشماوي للاستشارات المالية" 
                style={{ 
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  transition: "all 0.3s ease"
                }} 
              />
            </div>
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="mobile-hidden">
          <NavLinks />
        </div>

        {/* CTA & Actions (Desktop) */}
        <div className="flex gap-sm items-center mobile-hidden">
          <a href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(lang === "en" ? "Hello, I would like to inquire about your services." : "مرحباً، أود الاستفسار عن خدمات مكتبكم.")}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "0.5rem 1.2rem", fontSize: "1rem" }}>{dict.contactUs}</a>
          <a href={lang === "ar" ? `/en${pathname === '/' ? '/' : pathname + (pathname.endsWith('/') ? '' : '/')}` : (pathname === '/en' || pathname === '/en/' ? '/' : pathname.replace(/^\/en/, "") + (pathname.endsWith('/') ? '' : '/'))} style={{ color: "var(--color-primary)", fontWeight: "bold", border: "1px solid var(--color-border)", padding: "0.4rem 0.6rem", borderRadius: "4px", background: "transparent", textDecoration: "none" }}>{dict.langSwitch}</a>
        </div>

        {/* Mobile Toggle Button */}
        <div className="desktop-hidden flex items-center gap-sm">
          <a href={lang === "ar" ? `/en${pathname === '/' ? '/' : pathname + (pathname.endsWith('/') ? '' : '/')}` : (pathname === '/en' || pathname === '/en/' ? '/' : pathname.replace(/^\/en/, "") + (pathname.endsWith('/') ? '' : '/'))} style={{ color: "var(--color-primary)", fontWeight: "bold", border: "1px solid var(--color-border)", padding: "0.2rem 0.5rem", borderRadius: "4px", background: "transparent", textDecoration: "none", fontSize: "0.9rem" }}>{dict.langSwitch}</a>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '2rem', 
              color: 'var(--color-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px'
            }}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="desktop-hidden" style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          bottom: 0,
          height: 'calc(100vh - 70px)',
          background: '#ffffff',
          zIndex: 99,
          overflowY: 'auto',
          padding: '2rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          animation: 'fadeInDown 0.3s ease'
        }}>
          <NavLinks isMobile={true} />
          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(lang === "en" ? "Hello, I would like to inquire about your services." : "مرحباً، أود الاستفسار عن خدمات مكتبكم.")}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', padding: "1rem" }} onClick={() => setIsMobileMenuOpen(false)}>
              {dict.contactUs}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
