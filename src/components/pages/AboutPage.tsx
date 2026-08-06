"use client";

import Image from "next/image";
import { EditableText } from "@/components/editor/EditableText";
import { useSiteContent } from "@/components/SiteContentProvider";

import { Lang } from "@/lib/dictionary";

export default function AboutPage({ lang = "ar" }: { lang?: Lang }) {
  const { settings } = useSiteContent();
  
  return (
    <main style={{ backgroundColor: "#FAFAFA" }}>
      {/* 1. Hero Title Section */}
      <section style={{ 
        paddingTop: "12rem", 
        paddingBottom: "5rem", 
        backgroundColor: "#06192D",
        backgroundImage: `linear-gradient(rgba(6, 25, 45, 0.75), rgba(6, 25, 45, 0.85)), url('${settings.about_hero_image || "/images/about_us_hero.jpg"}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#FFFFFF",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: "inset 0 -1px 0 rgba(94, 180, 235, 0.22)"
      }}>
        {/* Abstract Background Element */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(118deg, rgba(255, 255, 255, 0.055) 0, rgba(255, 255, 255, 0.055) 1px, transparent 1px, transparent 68px)",
          opacity: 0.34,
          pointerEvents: "none",
          zIndex: 0
        }}></div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", color: "#FFFFFF", fontWeight: "bold" }}>{(lang === "en" ? settings.about_page_title_en : settings.about_page_title) || (lang === "en" ? "About Us" : "من نحن")}</h1>
          <div style={{ width: "80px", height: "4px", backgroundColor: "var(--color-accent)", margin: "0 auto" }}></div>
        </div>
      </section>

      {/* 2. Company & Chairman */}
      <section className="py-xl" style={{ backgroundColor: "var(--color-bg-body)" }}>
        <div className="container" style={{ maxWidth: "1200px" }}>
          <div
            className="about-leadership"
            data-lang={lang}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: "clamp(2.5rem, 6vw, 5rem)",
              alignItems: "start",
              marginBottom: "5rem",
              direction: lang === "en" ? "rtl" : "ltr",
            }}
          >
            {/* Chairman Portrait */}
            <div
              className="about-leadership__portrait"
              dir={lang === "en" ? "ltr" : "rtl"}
              style={{
                width: "100%",
                maxWidth: "360px",
                marginInline: "auto",
                textAlign: "center",
              }}
            >
              <div
                className="about-leadership__image"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3 / 4",
                  overflow: "hidden",
                  border: "6px solid #FFFFFF",
                  borderRadius: "20px",
                  backgroundColor: "#E0E0E0",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                }}
              >
                <Image
                  src={settings.about_profile_image || "/images/wlaa-profile.jpg"}
                  alt="السيدة ولاء مجدي العشماوي - رئيس مجلس الإدارة"
                  fill
                  sizes="(max-width: 899px) 82vw, 360px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="about-leadership__identity" style={{ marginTop: "1.5rem" }}>
                <h3 style={{ fontSize: "2rem", color: "var(--color-primary)", fontWeight: "bold", marginBottom: "0.5rem" }}>
                  {(lang === "en" ? settings.founder_name_en : settings.founder_name) || (lang === "en" ? "Wlaa Magdy Al-Ashmawy" : "أ. ولاء مجدي العشماوي")}
                </h3>
                <p style={{ fontSize: "1.2rem", color: "var(--color-accent)", fontWeight: "bold", margin: 0 }}>
                  {(lang === "en" ? settings.founder_role_en : settings.founder_role) || (lang === "en" ? "Founder & Chairman" : "المؤسس ورئيس مجلس الإدارة")}
                </p>
              </div>
            </div>

            {/* About Text */}
            <div
              className="about-leadership__copy"
              dir={lang === "en" ? "ltr" : "rtl"}
              style={{
                minWidth: 0,
                textAlign: lang === "en" ? "left" : "right",
              }}
            >
              <EditableText
                id={lang === "en" ? "about_full_en" : "about_full"}
                value={(lang === "en" && settings.about_full_en ? settings.about_full_en : settings.about_full) || (lang === "en" ? `AFC – Al-Ashmawy Financial Consulting is one of the leading firms in Egypt in the fields of accounting, auditing, taxation, and financial advisory services. Founded in 2024 by Ms. Wlaa Magdy Al-Ashmawy, the firm was built on a clear vision aimed at providing outstanding professional services based on integrity, expertise, and building sustainable relationships with clients.<br/><br/>At AFC, we ensure our clients that every engagement is handled by a team of dedicated professionals committed to the highest standards of quality and excellence. We adopt an integrated approach rooted in a deep understanding of the unique challenges facing small and medium-sized enterprises (SMEs), allowing us to provide practical and strategic solutions that enhance value.<br/><br/>Our comprehensive services are designed to support clients at every stage of their business journey, empowering them to make informed decisions, achieve sustainable growth, and focus on maximizing the long-term value of their business.` : `يُعد AFC – العشماوي للاستشارات المالية واحداً من المكاتب الرائدة في مصر في مجالات المحاسبة، والمراجعة، والضرائب، والخدمات الاستشارية المالية. تأسس المكتب عام 2024 على يد السيدة ولاء مجدي العشماوي، انطلاقاً من رؤية واضحة تهدف إلى تقديم خدمات مهنية متميزة ترتكز على النزاهة والخبرة وبناء علاقات مستدامة مع العملاء.<br/><br/>في AFC، نضمن لعملائنا أن يتولى تنفيذ كل مهمة فريق من المهنيين المتفانين الملتزمين بأعلى معايير الجودة والتميز. ونحن نتبنى نهجاً متكاملاً يرتكز على فهم عميق للتحديات الفريدة التي تواجه الشركات الصغيرة والمتوسطة، مما يتيح لنا تقديم حلول عملية واستراتيجية تعزز القيمة.<br/><br/>صُممت خدماتنا الشاملة لدعم العملاء في كل مرحلة من مراحل رحلة أعمالهم، مما يُمكّنهم من اتخاذ قرارات مدروسة، وتحقيق نمو مستدام، والتركيز على تعظيم القيمة طويلة الأمد لأعمالهم.`)}
                isHtml={true}
                as="div"
                style={{ fontSize: "1.2rem", fontWeight: 400, lineHeight: "2", color: "var(--color-text-main)", opacity: 0.9 }}
              />
            </div>
          </div>

          {/* Licenses & Memberships */}
          <div className="text-center" style={{ marginBottom: "5rem" }}>
            <h2 style={{ fontSize: "2rem", color: "var(--color-primary)", fontWeight: "bold", marginBottom: "2rem" }}>
              {(lang === "en" ? settings.about_licenses_title_en : settings.about_licenses_title) || (lang === "en" ? "Licenses & Memberships" : "التراخيص والعضويات")}
            </h2>
            <div className="grid grid-cols-1 md-grid-cols-2 gap-lg" style={{ maxWidth: "800px", marginInline: "auto" }}>
              <div className="premium-card flex flex-col items-center justify-center text-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "2rem", borderRadius: "16px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "rgba(212, 175, 55, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--color-text-main)", fontWeight: "bold", margin: 0 }}>
                  {(lang === "en" ? settings.about_license_1_en : settings.about_license_1) || (lang === "en" ? "Ministry of Finance - Register of Accountants and Auditors" : "وزارة المالية - سجل المحاسبين والمراجعين")}
                </h3>
              </div>
              <div className="premium-card flex flex-col items-center justify-center text-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "2rem", borderRadius: "16px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "rgba(0, 91, 171, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--color-text-main)", fontWeight: "bold", margin: 0 }}>
                  {(lang === "en" ? settings.about_license_2_en : settings.about_license_2) || (lang === "en" ? "Egyptian Tax Association" : "جمعية الضرائب المصرية")}
                </h3>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div
            className="grid grid-cols-1 md-grid-cols-2 gap-lg"
            style={{ maxWidth: "900px", marginInline: "auto" }}
          >
            {/* Vision */}
            <div className="premium-card flex flex-col justify-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "3rem 2rem", borderRadius: "16px", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", height: "100%" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "rgba(212, 175, 55, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h2 style={{ fontSize: "2rem", color: "var(--color-primary)", fontWeight: "bold", marginBottom: "1.5rem" }}>{(lang === "en" ? settings.vision_title_en : settings.vision_title) || (lang === "en" ? "Vision" : "الرؤية")}</h2>
              <EditableText 
                id={lang === "en" ? "vision_en" : "vision"}
                value={(lang === "en" && settings.vision_en ? settings.vision_en : settings.vision) || (lang === "en" ? "To be the trusted partner and first choice for companies seeking exceptional accounting, tax, auditing, and financial advisory services, through expertise, integrity, and innovation." : "أن نكون الشريك الموثوق والاختيار الأول للشركات التي تبحث عن خدمات محاسبية وضريبية ومراجعة واستشارات مالية استثنائية، من خلال الخبرة والنزاهة والابتكار.")}
                isHtml={true}
                as="div"
                style={{ fontSize: "1.15rem", fontWeight: 400, lineHeight: "1.8", color: "var(--color-text-main)", opacity: 0.9, margin: 0 }}
              />
            </div>

            {/* Mission */}
            <div className="premium-card flex flex-col justify-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "3rem 2rem", borderRadius: "16px", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", height: "100%" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "rgba(0, 91, 171, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h2 style={{ fontSize: "2rem", color: "var(--color-primary)", fontWeight: "bold", marginBottom: "1.5rem" }}>{(lang === "en" ? settings.mission_title_en : settings.mission_title) || (lang === "en" ? "Mission" : "الرسالة")}</h2>
              <EditableText 
                id={lang === "en" ? "mission_en" : "mission"}
                value={(lang === "en" && settings.mission_en ? settings.mission_en : settings.mission) || (lang === "en" ? "To be the reliable force behind our clients' success by delivering insightful solutions, uncompromising quality, and strategic guidance that fosters growth, builds trust, and creates sustainable value." : "أن نكون القوة الموثوقة وراء نجاح عملائنا، من خلال تقديم حلول ثاقبة، وجودة لا تقبل التنازل، وتوجيه استراتيجي يعزز النمو، ويرسخ الثقة، ويخلق قيمة مستدامة.")}
                isHtml={true}
                as="div"
                style={{ fontSize: "1.15rem", fontWeight: 400, lineHeight: "1.8", color: "var(--color-text-main)", opacity: 0.9, margin: 0 }}
              />
            </div>
          </div>


        </div>
      </section>
    </main>
  );
}
