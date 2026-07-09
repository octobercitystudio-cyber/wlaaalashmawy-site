import Image from "next/image";

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "#FAFAFA" }}>
      {/* 1. Founder & Story Section (Asymmetrical Split Layout) */}
      <section style={{ 
        paddingTop: "10rem", 
        paddingBottom: "6rem", 
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Background decorative elements */}
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%",
          height: "100%",
          backgroundColor: "rgba(212, 175, 55, 0.03)",
          zIndex: 0,
          borderBottomLeftRadius: "100px"
        }}></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="grid grid-cols-1 md-grid-cols-12 gap-xl items-center">
            
            {/* Text Content */}
            <div className="md-col-span-7" style={{ paddingLeft: "2rem" }}>
              <div style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "rgba(0, 91, 171, 0.05)", color: "var(--color-primary)", fontWeight: "bold", borderRadius: "30px", marginBottom: "1.5rem" }}>
                من نحن
              </div>
              <h1 style={{ fontSize: "3.5rem", color: "var(--color-primary)", fontWeight: "bold", marginBottom: "2rem", lineHeight: "1.2" }}>
                رؤية طموحة <br/> <span style={{ color: "var(--color-accent)" }}>وخبرة راسخة</span>
              </h1>
              
              <div style={{ fontSize: "1.15rem", lineHeight: "2", color: "var(--color-text-main)", opacity: 0.85, position: "relative" }}>
                {/* Decorative Quote Mark */}
                <span style={{ position: "absolute", top: "-40px", right: "-30px", fontSize: "6rem", color: "var(--color-accent)", opacity: 0.1, fontFamily: "serif" }}>"</span>
                
                <p style={{ marginBottom: "1.5rem" }}>
                  تُعد شركة <strong>"ولاء مجدي العشماوي للمحاسبة القانونية" (AFC)</strong> واحدة من الشركات الرائدة في مصر في مجالات المحاسبة، والمراجعة، والضرائب، والخدمات الاستشارية المالية. 
                </p>
                <p style={{ marginBottom: "1.5rem" }}>
                  تأسست الشركة عام 2024 على يد السيدة ولاء مجدي العشماوي، انطلاقاً من رؤية واضحة تهدف إلى تقديم خدمات مهنية متميزة ترتكز على النزاهة والخبرة وبناء علاقات مستدامة مع العملاء. في AFC، نضمن لعملائنا أن يتولى تنفيذ كل مهمة فريق من المهنيين المتفانين الملتزمين بأعلى معايير الجودة والتميز.
                </p>
                <p>
                  ونحن نتبنى نهجاً متكاملاً يرتكز على فهم عميق للتحديات الفريدة التي تواجه الشركات الصغيرة والمتوسطة، مما يتيح لنا تقديم حلول عملية واستراتيجية تعزز القيمة في كل مرحلة من مراحل رحلة أعمالهم.
                </p>
              </div>
            </div>

            {/* Founder Image Block */}
            <div className="md-col-span-5" style={{ position: "relative" }}>
              {/* Image Frame with unique shape */}
              <div style={{ 
                position: "relative", 
                width: "100%", 
                aspectRatio: "3/4", 
                borderRadius: "20px 20px 20px 100px", 
                overflow: "hidden", 
                boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
                backgroundColor: "var(--color-primary)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "3rem",
                color: "#FFF",
                textAlign: "center",
                border: "10px solid #FFF"
              }}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1.5rem" }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  مساحة مخصصة لصورة<br/>رئيس مجلس الإدارة<br/>(chairman.jpg)
                </p>
              </div>
              
              {/* Floating Name Card */}
              <div style={{ 
                position: "absolute", 
                bottom: "-30px", 
                left: "-30px", 
                backgroundColor: "#FFF", 
                padding: "1.5rem 2.5rem", 
                borderRadius: "15px", 
                boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                borderRight: "5px solid var(--color-accent)"
              }}>
                <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary)", fontWeight: "bold", marginBottom: "0.3rem", whiteSpace: "nowrap" }}>
                  أ. ولاء مجدي العشماوي
                </h3>
                <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", margin: 0 }}>
                  المؤسس ورئيس مجلس الإدارة
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Vision & Mission Section (Dark Theme Layout) */}
      <section style={{ 
        backgroundColor: "var(--color-primary)", 
        color: "#FFF", 
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
        marginTop: "4rem"
      }}>
        {/* Background Graphic */}
        <div style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "50%",
          height: "150%",
          background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 60%)",
          zIndex: 0
        }}></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="grid grid-cols-1 md-grid-cols-2 gap-xl">
            
            {/* Vision Block */}
            <div style={{ 
              padding: "3rem", 
              backgroundColor: "rgba(255,255,255,0.03)", 
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
                <div style={{ width: "60px", height: "60px", backgroundColor: "var(--color-accent)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "1.5rem" }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: 0 }}>الرؤية</h2>
              </div>
              <p style={{ fontSize: "1.2rem", lineHeight: "2", color: "rgba(255,255,255,0.85)", margin: 0 }}>
                أن نكون الشريك الموثوق والاختيار الأول للشركات التي تبحث عن خدمات محاسبية وضريبية ومراجعة واستشارات مالية استثنائية، من خلال الخبرة والنزاهة والابتكار.
              </p>
            </div>

            {/* Mission Block */}
            <div style={{ 
              padding: "3rem", 
              backgroundColor: "rgba(255,255,255,0.03)", 
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
                <div style={{ width: "60px", height: "60px", backgroundColor: "var(--color-accent)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "1.5rem" }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: 0 }}>الرسالة</h2>
              </div>
              <p style={{ fontSize: "1.2rem", lineHeight: "2", color: "rgba(255,255,255,0.85)", margin: 0 }}>
                أن نكون القوة الموثوقة وراء نجاح عملائنا، من خلال تقديم حلول ثاقبة، وجودة لا تقبل التنازل، وتوجيه استراتيجي يعزز النمو، ويرسخ الثقة، ويخلق قيمة مستدامة.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
