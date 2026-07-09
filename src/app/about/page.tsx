import Image from "next/image";

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section style={{ 
        paddingTop: "12rem", 
        paddingBottom: "8rem", 
        color: "#FFFFFF",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "var(--color-primary)",
          zIndex: 0
        }}></div>
        {/* Abstract Background Element */}
        <div style={{
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(0,91,171,0.4) 0%, rgba(26,26,26,0) 70%)",
          borderRadius: "50%",
          zIndex: 0
        }}></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", color: "#FFFFFF", fontWeight: "bold", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>من نحن</h1>
          <div style={{ width: "80px", height: "4px", backgroundColor: "var(--color-accent)", margin: "0 auto 2rem", boxShadow: "0 2px 5px rgba(0,0,0,0.3)" }}></div>
          <p style={{ fontSize: "1.3rem", maxWidth: "800px", margin: "0 auto", color: "rgba(255,255,255,0.95)", lineHeight: "1.8", textShadow: "0 2px 5px rgba(0,0,0,0.5)" }}>
            تعرف على شركة ولاء مجدي العشماوي للمحاسبة القانونية (AFC)، ورؤيتنا، ورسالتنا في دعم نجاح الأعمال في مصر.
          </p>
        </div>
      </section>

      {/* About Content & Chairman */}
      <section className="py-xl" style={{ backgroundColor: "var(--color-bg-body)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md-grid-cols-12 gap-xl items-center mb-xl">
            {/* Chairman Photo & Title */}
            <div className="md-col-span-4 text-center">
              <div style={{ 
                position: "relative", 
                width: "100%", 
                maxWidth: "350px", 
                aspectRatio: "3/4", 
                margin: "0 auto", 
                borderRadius: "16px", 
                overflow: "hidden", 
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                border: "4px solid white",
                backgroundColor: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "2rem"
              }}>
                {/* Fallback SVG for Chairman */}
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1rem" }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <p style={{ color: "#777", fontSize: "0.9rem", margin: 0 }}>مساحة مخصصة لصورة رئيس مجلس الإدارة (يرجى رفع الصورة الحقيقية باسم chairman.jpg)</p>
                {/* Real image to be uncommented later */}
                {/* <Image src="/images/chairman.jpg" alt="السيدة ولاء مجدي العشماوي - رئيس مجلس الإدارة" fill style={{ objectFit: "cover" }} /> */}
              </div>
              <h3 style={{ fontSize: "1.8rem", color: "var(--color-primary)", fontWeight: "bold", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
                أ. ولاء مجدي العشماوي
              </h3>
              <p style={{ fontSize: "1.1rem", color: "var(--color-accent)", fontWeight: "bold", margin: 0 }}>
                المؤسس ورئيس مجلس الإدارة
              </p>
            </div>

            {/* About Text */}
            <div className="md-col-span-8">
              <h2 style={{ fontSize: "2.5rem", color: "var(--color-primary)", fontWeight: "bold", marginBottom: "1.5rem" }}>عن الشركة</h2>
              <div style={{ fontSize: "1.15rem", lineHeight: "1.9", color: "var(--color-text-main)", opacity: 0.9 }}>
                <p style={{ marginBottom: "1.5rem" }}>
                  تُعد شركة <strong>"ولاء مجدي العشماوي للمحاسبة القانونية" (AFC)</strong> واحدة من الشركات الرائدة في مصر في مجالات المحاسبة، والمراجعة، والضرائب، والخدمات الاستشارية المالية. تأسست الشركة عام 2024 على يد السيدة ولاء مجدي العشماوي، انطلاقاً من رؤية واضحة تهدف إلى تقديم خدمات مهنية متميزة ترتكز على النزاهة والخبرة وبناء علاقات مستدامة مع العملاء.
                </p>
                <p style={{ marginBottom: "1.5rem" }}>
                  في AFC، نضمن لعملائنا أن يتولى تنفيذ كل مهمة فريق من المهنيين المتفانين الملتزمين بأعلى معايير الجودة والتميز. ونحن نتبنى نهجاً متكاملاً يرتكز على فهم عميق للتحديات الفريدة التي تواجه الشركات الصغيرة والمتوسطة، مما يتيح لنا تقديم حلول عملية واستراتيجية تعزز القيمة.
                </p>
                <p>
                  صُممت خدماتنا الشاملة لدعم العملاء في كل مرحلة من مراحل رحلة أعمالهم، مما يُمكّنهم من اتخاذ قرارات مدروسة، وتحقيق نمو مستدام، والتركيز على تعظيم القيمة طويلة الأمد لأعمالهم.
                </p>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md-grid-cols-2 gap-lg mt-xl">
            {/* Vision */}
            <div className="premium-card flex flex-col justify-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "3rem 2rem", borderRadius: "16px", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", height: "100%" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "rgba(212, 175, 55, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h2 style={{ fontSize: "2rem", color: "var(--color-primary)", fontWeight: "bold", marginBottom: "1.5rem" }}>الرؤية</h2>
              <p style={{ fontSize: "1.15rem", lineHeight: "1.8", color: "var(--color-text-main)", opacity: 0.9, margin: 0 }}>
                أن نكون الشريك الموثوق والاختيار الأول للشركات التي تبحث عن خدمات محاسبية وضريبية ومراجعة واستشارات مالية استثنائية، من خلال الخبرة والنزاهة والابتكار.
              </p>
            </div>

            {/* Mission */}
            <div className="premium-card flex flex-col justify-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "3rem 2rem", borderRadius: "16px", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", height: "100%" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "rgba(0, 91, 171, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h2 style={{ fontSize: "2rem", color: "var(--color-primary)", fontWeight: "bold", marginBottom: "1.5rem" }}>الرسالة</h2>
              <p style={{ fontSize: "1.15rem", lineHeight: "1.8", color: "var(--color-text-main)", opacity: 0.9, margin: 0 }}>
                أن نكون القوة الموثوقة وراء نجاح عملائنا، من خلال تقديم حلول ثاقبة، وجودة لا تقبل التنازل، وتوجيه استراتيجي يعزز النمو، ويرسخ الثقة، ويخلق قيمة مستدامة.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
