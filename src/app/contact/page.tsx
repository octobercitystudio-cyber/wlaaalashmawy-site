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
          
          {/* Intro Text before Contact Info */}
          <div className="text-center mb-xl animate-fade-in">
            <h2 className="text-gold" style={{ marginBottom: "1rem" }}>نحن هنا لخدمتك</h2>
            <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.2rem", lineHeight: "1.8", color: "var(--color-text-main)" }}>
              سواء كنت تبحث عن استشارة مالية، أو ترغب في الاستفسار عن خدماتنا، فإن فريقنا من الخبراء جاهز للرد على جميع تساؤلاتك. يمكنك التواصل معنا مباشرة عبر الأرقام والبيانات الموضحة أدناه.
            </p>
          </div>

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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.77443152503!2d31.332306349999998!3d30.0443878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sen!2s!4v1718000000000!5m2!1sen!2s" 
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
