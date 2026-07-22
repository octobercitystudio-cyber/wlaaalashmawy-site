import { fetchSettings } from "@/lib/api";

import { Lang } from "@/lib/dictionary";

export default async function ContactPage({ lang = "ar" }: { lang?: Lang }) {
  const settings = await fetchSettings();
  
  let emails = [];
  try { emails = JSON.parse(settings.contact_emails); } catch(e) {}
  if (!emails || emails.length === 0) emails = [settings.contact_email || 'info@afc-cpa.com'];

  let phones: string[] = [];
  try { phones = JSON.parse(settings.contact_phones); } catch(e) {}
  if (!phones || phones.length === 0) phones = [settings.contact_phone || '01155729429', '0238345397'];

  const address = (lang === "en" && settings.contact_address_en ? settings.contact_address_en : settings.contact_address) || (lang === "en" ? "Office 204, 2nd Floor, Agyad View Mall - 6th of October - Giza - Egypt" : "مكتب 204 الدور الثاني مول اجياد فيو - ٦ اكتوبر - الجيزة - مصر");
  
  // Default map
  let map_url = settings.contact_map || `https://maps.google.com/maps?q=29.9607581,30.9246025&hl=${lang === "en" ? "en" : "ar"}&z=16&output=embed`;
  // Extract URL if user pasted the entire iframe tag
  if (map_url.includes('<iframe') && map_url.includes('src="')) {
    const match = map_url.match(/src="([^"]+)"/);
    if (match && match[1]) map_url = match[1];
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--color-bg-subtle)" }}>
      {/* Header Area */}
      <section style={{ 
        padding: "8rem 0 6rem 0",
        background: "linear-gradient(rgba(0, 48, 92, 0.85), rgba(0, 48, 92, 0.85)), url('/images/contact_hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#FFFFFF",
        textAlign: "center"
      }}>
        <div className="container" style={{ paddingTop: "2rem" }}>
          <h1 className="animate-fade-in-up" style={{ fontSize: "3rem", marginBottom: "var(--spacing-md)", fontWeight: "bold" }}>
            {lang === "en" ? "Contact Us" : "تواصل معنا"}
          </h1>
          <p className="animate-fade-in-up" style={{ animationDelay: "0.2s", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", opacity: 0.9 }}>
            {lang === "en" ? "We are here to answer all your inquiries and provide the support you need. Don't hesitate to reach out to us." : "نحن هنا للإجابة على كافة استفساراتكم وتقديم الدعم الذي تحتاجونه. لا تترددوا في التواصل معنا."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "var(--spacing-xl) 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg-grid-cols-2 gap-xl" style={{ alignItems: "start" }}>
            {/* Right: Contact Form */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div style={{ background: "var(--color-bg-card)", padding: "2.5rem", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid var(--color-border)" }}>
                <h2 style={{ fontSize: "2.2rem", color: "var(--color-primary)", marginBottom: "var(--spacing-md)", fontWeight: "bold" }}>
                  {lang === "en" ? "Send a Message" : "أرسل لنا رسالة"}
                </h2>
                <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div className="grid grid-cols-1 md-grid-cols-2 gap-md">
                    <div>
                      <label style={{ display: "block", marginBottom: "0.8rem", color: "var(--color-text-main)", fontWeight: "600" }}>{lang === "en" ? "Full Name *" : "الاسم بالكامل *"}</label>
                      <input type="text" style={{ width: "100%", padding: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-body)", color: "var(--color-text-main)", outline: "none", transition: "all 0.3s ease" }} placeholder={lang === "en" ? "Enter your full name" : "أدخل اسمك الكريم"} required />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.8rem", color: "var(--color-text-main)", fontWeight: "600" }}>{lang === "en" ? "Email Address *" : "البريد الإلكتروني *"}</label>
                      <input type="email" style={{ width: "100%", padding: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-body)", color: "var(--color-text-main)", outline: "none", transition: "all 0.3s ease" }} placeholder="example@email.com" required dir="ltr" />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ display: "block", marginBottom: "0.8rem", color: "var(--color-text-main)", fontWeight: "600" }}>{lang === "en" ? "Phone Number *" : "رقم الهاتف *"}</label>
                    <input type="tel" style={{ width: "100%", padding: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-body)", color: "var(--color-text-main)", outline: "none", transition: "all 0.3s ease" }} placeholder={lang === "en" ? "Your phone number" : "رقم الهاتف للتواصل"} required dir="ltr" />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.8rem", color: "var(--color-text-main)", fontWeight: "600" }}>{lang === "en" ? "Inquiry Type" : "نوع الاستفسار"}</label>
                    <select style={{ width: "100%", padding: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-body)", color: "var(--color-text-main)", outline: "none", appearance: "none" }}>
                      <option value="استشارات محاسبية">{lang === "en" ? "Accounting Consulting" : "استشارات محاسبية"}</option>
                      <option value="استشارات ضريبية">{lang === "en" ? "Tax Consulting" : "استشارات ضريبية"}</option>
                      <option value="تأسيس شركات">{lang === "en" ? "Company Formation" : "تأسيس شركات"}</option>
                      <option value="المراجعة والتدقيق">{lang === "en" ? "Audit & Assurance" : "المراجعة والتدقيق"}</option>
                      <option value="أخرى">{lang === "en" ? "Other" : "أخرى"}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ display: "block", marginBottom: "0.8rem", color: "var(--color-text-main)", fontWeight: "600" }}>{lang === "en" ? "How can we help you? *" : "كيف يمكننا مساعدتك؟ *"}</label>
                    <textarea rows={5} style={{ width: "100%", padding: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-body)", color: "var(--color-text-main)", outline: "none", resize: "vertical", transition: "all 0.3s ease" }} placeholder={lang === "en" ? "Write the details of your inquiry here..." : "اكتب تفاصيل أو استفسارك هنا..."} required />
                  </div>
                  
                  <button type="button" className="btn btn-primary" style={{ marginTop: "1rem", width: "100%", padding: "1.2rem", fontSize: "1.2rem", fontWeight: "bold", borderRadius: "8px" }}>
                    {lang === "en" ? "Send Message Now" : "إرسال الرسالة الآن"}
                  </button>
                </form>
              </div>
            </div>

            {/* Left: Map and Contact Info */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.5s", display: "flex", flexDirection: "column", gap: "2rem" }}>
              
              {/* Map (Now on top) */}
              <div style={{ padding: "0.5rem", background: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "16px", height: "350px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                <iframe 
                  src={map_url}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: "12px" }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>

              {/* Contact Info (Now below map) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", background: "var(--color-bg-card)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--color-border)", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                  <div style={{ fontSize: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }}>
                    📞
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.3rem", fontWeight: "bold" }}>{lang === "en" ? "Phone Numbers" : "أرقام التواصل"}</h4>
                    {phones.map((phone: string, i: number) => (
                      <p key={`phone-${i}`} dir="ltr" style={{ color: "var(--color-text-main)", fontSize: "1.1rem", fontWeight: "bold", marginBottom: "0" }}>{phone}</p>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", background: "var(--color-bg-card)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--color-border)", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                  <div style={{ fontSize: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }}>
                    📧
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.3rem", fontWeight: "bold" }}>{lang === "en" ? "Email Address" : "البريد الإلكتروني"}</h4>
                    {emails.map((email: string, i: number) => (
                      <p key={`email-${i}`} style={{ color: "var(--color-text-main)", fontSize: "1.1rem", fontWeight: "bold", marginBottom: "0" }}>{email}</p>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", background: "var(--color-bg-card)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--color-border)", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                  <div style={{ fontSize: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }}>
                    📍
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.3rem", fontWeight: "bold" }}>{lang === "en" ? "Address" : "العنوان"}</h4>
                    <p style={{ color: "var(--color-text-main)", fontSize: "1.1rem", fontWeight: "bold", lineHeight: "1.6", margin: "0" }}>
                      {address}
                    </p>
                  </div>
                </div>

                {/* Social Media Links */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", background: "var(--color-bg-card)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--color-border)", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                  <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", margin: 0, fontWeight: "bold" }}>{lang === "en" ? "Social Media" : "منصات السوشيال ميديا"}</h4>
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
