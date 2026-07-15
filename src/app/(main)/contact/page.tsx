import { fetchSettings } from "@/lib/api";

export default async function ContactPage() {
  const settings = await fetchSettings();
  
  let emails = [];
  try { emails = JSON.parse(settings.contact_emails); } catch(e) {}
  if (!emails || emails.length === 0) emails = [settings.contact_email || 'info@alashmawy-cpa.com'];

  let phones = [];
  try { phones = JSON.parse(settings.contact_phones); } catch(e) {}
  if (!phones || phones.length === 0) phones = [settings.contact_phone || '01155729429 - 0238345397'];

  const address = settings.contact_address || 'شارع 204 دجلة المعادي بجوار مدرسة فيكتوريا - القاهرة - مصر';
  
  // Default map
  let map_url = settings.contact_map || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.634354228498!2d31.2721869!3d29.9611843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458380e2270929b%3A0x6d90d81b8cc925e0!2z2YXYr9ix2LPYqSDZgdmK2YPYqtmI2LHZitinINin2YTYrdiv2YrYr9ip!5e0!3m2!1sar!2seg!4v1718228308119!5m2!1sar!2seg";
  // Extract URL if user pasted the entire iframe tag
  if (map_url.includes('<iframe') && map_url.includes('src="')) {
    const match = map_url.match(/src="([^"]+)"/);
    if (match && match[1]) map_url = match[1];
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--color-bg-subtle)" }}>
      {/* Header Area */}
      <section style={{ 
        padding: "var(--spacing-xl) 0",
        background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
        color: "#FFFFFF",
        textAlign: "center"
      }}>
        <div className="container">
          <h1 className="animate-fade-in-up" style={{ fontSize: "3rem", marginBottom: "var(--spacing-md)" }}>
            تواصل معنا
          </h1>
          <p className="animate-fade-in-up" style={{ animationDelay: "0.2s", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", opacity: 0.9 }}>
            نحن هنا للإجابة على كافة استفساراتكم وتقديم الدعم الذي تحتاجونه. لا تترددوا في التواصل معنا.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "var(--spacing-xl) 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg-grid-cols-2 gap-xl">
            {/* Right: Contact Form */}
            <div className="card animate-fade-in-up" style={{ padding: "var(--spacing-xl)", animationDelay: "0.3s" }}>
              <h2 style={{ fontSize: "2rem", color: "var(--color-primary)", marginBottom: "var(--spacing-md)" }}>
                أرسل لنا رسالة
              </h2>
              <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div className="grid grid-cols-1 md-grid-cols-2 gap-md">
                  <div>
                    <label style={{ display: "block", marginBottom: "0.8rem", color: "var(--color-text-main)", fontWeight: "600" }}>الاسم بالكامل *</label>
                    <input type="text" style={{ width: "100%", padding: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "#FFFFFF", color: "#000", outline: "none", transition: "all 0.3s ease" }} placeholder="أدخل اسمك الكريم" required />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.8rem", color: "var(--color-text-main)", fontWeight: "600" }}>البريد الإلكتروني *</label>
                    <input type="email" style={{ width: "100%", padding: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "#FFFFFF", color: "#000", outline: "none", transition: "all 0.3s ease" }} placeholder="example@email.com" required dir="ltr" />
                  </div>
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "0.8rem", color: "var(--color-text-main)", fontWeight: "600" }}>رقم الهاتف *</label>
                  <input type="tel" style={{ width: "100%", padding: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "#FFFFFF", color: "#000", outline: "none", transition: "all 0.3s ease" }} placeholder="رقم الهاتف للتواصل" required dir="ltr" />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.8rem", color: "var(--color-text-main)", fontWeight: "600" }}>نوع الاستفسار</label>
                  <select style={{ width: "100%", padding: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "#FFFFFF", color: "#000", outline: "none", appearance: "none" }}>
                    <option value="استشارات محاسبية">استشارات محاسبية</option>
                    <option value="استشارات ضريبية">استشارات ضريبية</option>
                    <option value="تأسيس شركات">تأسيس شركات</option>
                    <option value="المراجعة والتدقيق">المراجعة والتدقيق</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "0.8rem", color: "var(--color-text-main)", fontWeight: "600" }}>كيف يمكننا مساعدتك؟ *</label>
                  <textarea rows={5} style={{ width: "100%", padding: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "#FFFFFF", color: "#000", outline: "none", resize: "vertical", transition: "all 0.3s ease" }} placeholder="اكتب تفاصيل أو استفسارك هنا..." required />
                </div>
                
                <button type="button" className="btn btn-primary" style={{ marginTop: "1rem", width: "100%", padding: "1.2rem", fontSize: "1.2rem", fontWeight: "bold", borderRadius: "8px" }}>
                  إرسال الرسالة الآن
                </button>
              </form>
            </div>

            {/* Left: Map and Contact Info */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.5s", display: "flex", flexDirection: "column", gap: "2rem" }}>
              
              {/* Map */}
              <div style={{ padding: "0.5rem", background: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "12px", height: "300px" }}>
                <iframe 
                  src={map_url}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: "8px" }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>

              {/* Contact Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: "0 1rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(0, 91, 171, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "5px" }}>
                    <i className="bi bi-telephone-fill" style={{ color: "var(--color-primary)", fontSize: "1.2rem" }}></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.2rem", fontWeight: "bold" }}>أرقام التواصل</h4>
                    {phones.map((phone: string, i: number) => (
                      <p key={`phone-${i}`} dir="ltr" style={{ color: "var(--color-text-main)", fontSize: "1.1rem", fontWeight: "bold", marginBottom: "0.2rem" }}>{phone}</p>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(0, 91, 171, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "5px" }}>
                    <i className="bi bi-envelope-fill" style={{ color: "var(--color-primary)", fontSize: "1.2rem" }}></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.2rem", fontWeight: "bold" }}>البريد الإلكتروني</h4>
                    {emails.map((email: string, i: number) => (
                      <p key={`email-${i}`} style={{ color: "var(--color-text-main)", fontSize: "1.1rem", fontWeight: "bold", marginBottom: "0.2rem" }}>{email}</p>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(0, 91, 171, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "5px" }}>
                    <i className="bi bi-geo-alt-fill" style={{ color: "var(--color-primary)", fontSize: "1.2rem" }}></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.2rem", fontWeight: "bold" }}>العنوان</h4>
                    <p style={{ color: "var(--color-text-main)", fontSize: "1.1rem", fontWeight: "bold", lineHeight: "1.6" }}>
                      {address}
                    </p>
                  </div>
                </div>

                {/* Social Media Links */}
                <div style={{ marginTop: "1rem", paddingTop: "1.5rem", borderTop: "1px solid var(--color-border)" }}>
                  <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "1rem", fontWeight: "bold" }}>منصات السوشيال ميديا</h4>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {settings.social_facebook && (
                    <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#1877F2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
                      <i className="bi bi-facebook fs-5"></i>
                    </a>
                    )}
                    {settings.social_instagram && (
                    <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#E4405F", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
                      <i className="bi bi-instagram fs-5"></i>
                    </a>
                    )}
                    {settings.social_youtube && (
                    <a href={settings.social_youtube} target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#FF0000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
                      <i className="bi bi-youtube fs-5"></i>
                    </a>
                    )}
                    {settings.social_linkedin && (
                    <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#0A66C2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
                      <i className="bi bi-linkedin fs-5"></i>
                    </a>
                    )}
                    {settings.social_tiktok && (
                    <a href={settings.social_tiktok} target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#000000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
                      <i className="bi bi-tiktok fs-5"></i>
                    </a>
                    )}
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
