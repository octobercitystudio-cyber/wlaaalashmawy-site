import Image from "next/image";

export default function ContactPage() {
  return (
    <main>
      {/* Hero Section */}
      <section style={{ 
        paddingTop: "12rem", 
        paddingBottom: "4rem", 
        color: "#FFFFFF",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <Image src="/images/contact_hero.jpg" alt="تواصل معنا" fill style={{ objectFit: "cover", zIndex: 0 }} priority />
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", color: "#FFFFFF", fontWeight: "bold", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            تواصل معنا
          </h1>
          <div style={{ width: "80px", height: "4px", backgroundColor: "var(--color-accent)", margin: "0 auto 2rem", boxShadow: "0 2px 5px rgba(0,0,0,0.3)" }}></div>
          <p style={{ fontSize: "1.3rem", maxWidth: "800px", margin: "0 auto", color: "rgba(255,255,255,0.95)", lineHeight: "1.8", textShadow: "0 2px 5px rgba(0,0,0,0.5)" }}>
            نسعد دائماً بالإجابة على استفساراتكم وتقديم الدعم اللازم. لا تتردد في التواصل معنا لحجز استشارة مجانية أو لطلب خدماتنا المالية والمحاسبية.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ paddingTop: "2rem", paddingBottom: "6rem", backgroundColor: "var(--color-bg-body)" }}>
        <div className="container">
          

          {/* Form and Map Side by Side */}
          <div className="grid grid-cols-1 md-grid-cols-2 gap-lg items-stretch">
            
            {/* Right: Contact Form */}
            <div className="animate-fade-in-up" style={{ 
              animationDelay: "0.4s",
              background: "var(--color-bg-card)", 
              border: "1px solid var(--color-border)",
              padding: "3rem 2rem",
              borderRadius: "12px"
            }}>
              <h2 style={{ fontSize: "2rem", color: "var(--color-primary)", marginBottom: "0.5rem", fontWeight: "bold" }}>أرسل لنا رسالة</h2>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "2.5rem", fontSize: "1.1rem" }}>املأ النموذج أدناه وسيقوم فريقنا بالرد عليك في أقرب وقت ممكن.</p>
              
              <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div className="grid grid-cols-1 md-grid-cols-2 gap-md">
                  <div>
                    <label style={{ display: "block", marginBottom: "0.8rem", color: "var(--color-text-main)", fontWeight: "600" }}>الاسم الكامل *</label>
                    <input type="text" style={{ width: "100%", padding: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "#FFFFFF", color: "#000", outline: "none", transition: "all 0.3s ease" }} placeholder="أدخل اسمك الكريم" required />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.8rem", color: "var(--color-text-main)", fontWeight: "600" }}>البريد الإلكتروني *</label>
                    <input type="email" style={{ width: "100%", padding: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "#FFFFFF", color: "#000", outline: "none", transition: "all 0.3s ease" }} placeholder="example@domain.com" required />
                  </div>
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "0.8rem", color: "var(--color-text-main)", fontWeight: "600" }}>نوع الاستشارة</label>
                  <select defaultValue="placeholder" required style={{ width: "100%", padding: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "#FFFFFF", color: "#000", outline: "none", transition: "all 0.3s ease", appearance: "none", cursor: "pointer", fontWeight: "bold" }}>
                    <option value="placeholder" disabled hidden>اختر الخدمة المطلوبة...</option>
                    <option value="الاستشارات المحاسبية وإعداد التقارير المالية" style={{ color: "#000" }}>الاستشارات المحاسبية وإعداد التقارير المالية</option>
                    <option value="المراجعة وإبداء الرأي المهني" style={{ color: "#000" }}>المراجعة وإبداء الرأي المهني</option>
                    <option value="الاستشارات والامتثال الضريبي" style={{ color: "#000" }}>الاستشارات والامتثال الضريبي</option>
                    <option value="تأسيس الشركات والمنشآت" style={{ color: "#000" }}>تأسيس الشركات والمنشآت</option>
                    <option value="الإجراءات الضريبية" style={{ color: "#000" }}>الإجراءات الضريبية</option>
                    <option value="الفحص الضريبي" style={{ color: "#000" }}>الفحص الضريبي</option>
                    <option value="إقامات المستثمرين" style={{ color: "#000" }}>إقامات المستثمرين</option>
                    <option value="التراخيص الصناعية" style={{ color: "#000" }}>التراخيص الصناعية</option>
                    <option value="أخرى" style={{ color: "#000" }}>أخرى</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "0.8rem", color: "var(--color-text-main)", fontWeight: "600" }}>كيف يمكننا مساعدتك؟ *</label>
                  <textarea rows={5} style={{ width: "100%", padding: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "#FFFFFF", color: "#000", outline: "none", resize: "vertical", transition: "all 0.3s ease" }} placeholder="اكتب رسالتك أو استفسارك هنا بالتفصيل..." required />
                </div>
                
                <button type="button" className="btn btn-primary" style={{ marginTop: "1rem", width: "100%", padding: "1.2rem", fontSize: "1.2rem", fontWeight: "bold", borderRadius: "8px" }}>
                  إرسال الطلب الآن
                </button>
              </form>
            </div>
            {/* Left: Map and Contact Info */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.5s", display: "flex", flexDirection: "column", gap: "2rem" }}>
              
              {/* Map */}
              <div style={{ padding: "0.5rem", background: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "12px", height: "300px" }}>
                <iframe 
                  src="https://maps.google.com/maps?q=29.9607581,30.9246025&hl=ar&z=16&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: "8px" }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>

              {/* Contact Info without boxes */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: "0 1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(0, 91, 171, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.2rem", fontWeight: "bold" }}>اتصل بنا</h4>
                    <p dir="ltr" style={{ color: "var(--color-text-main)", fontSize: "1.1rem", fontWeight: "bold" }}>01155729429 - 0238345397</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(0, 91, 171, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.2rem", fontWeight: "bold" }}>البريد الإلكتروني</h4>
                    <p style={{ color: "var(--color-text-main)", fontSize: "1.1rem", fontWeight: "bold" }}>info@alashmawy.com <br/> support@alashmawy.com</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(0, 91, 171, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.2rem", fontWeight: "bold" }}>المقر الرئيسي</h4>
                    <p style={{ color: "var(--color-text-main)", fontSize: "1.1rem", fontWeight: "bold", lineHeight: "1.6" }}>
                      مكتب 204 الدور الثاني مول اجياد فيو، 6 أكتوبر - الجيزة - مصر
                    </p>
                  </div>
                </div>

                {/* Social Media Links */}
                <div style={{ marginTop: "1rem", paddingTop: "1.5rem", borderTop: "1px solid var(--color-border)" }}>
                  <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "1rem", fontWeight: "bold" }}>تابعنا على</h4>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <a href="#" aria-label="Facebook" className="hover:opacity-100" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#1877F2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="#" aria-label="X" className="hover:opacity-100" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#000000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href="#" aria-label="Instagram" className="hover:opacity-100" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="#" aria-label="LinkedIn" className="hover:opacity-100" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#0A66C2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
