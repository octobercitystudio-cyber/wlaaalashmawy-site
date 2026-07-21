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
  
  let map_url = settings.contact_map || `https://maps.google.com/maps?q=29.9607581,30.9246025&hl=${lang === "en" ? "en" : "ar"}&z=16&output=embed`;
  if (map_url.includes('<iframe') && map_url.includes('src="')) {
    const match = map_url.match(/src="([^"]+)"/);
    if (match && match[1]) map_url = match[1];
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--color-bg-subtle)" }}>
      {/* Dynamic Hero Section with Background Image */}
      <section style={{ 
        position: "relative",
        padding: "12rem 0 8rem",
        backgroundImage: "url('/images/contact_hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "#FFFFFF",
        textAlign: "center",
        overflow: "hidden"
      }}>
        {/* Dark / Gradient Overlay */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(0,91,171,0.7) 100%)",
          zIndex: 1
        }}></div>
        
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h1 className="animate-fade-in-up" style={{ fontSize: "3.5rem", fontWeight: "bold", marginBottom: "1rem", textShadow: "0 4px 15px rgba(0,0,0,0.3)" }}>
            {lang === "en" ? "Let's Talk" : "تواصل معنا"}
          </h1>
          <div style={{ width: "60px", height: "4px", backgroundColor: "var(--color-accent)", margin: "0 auto 1.5rem", borderRadius: "2px" }}></div>
          <p className="animate-fade-in-up" style={{ animationDelay: "0.2s", fontSize: "1.3rem", maxWidth: "650px", margin: "0 auto", opacity: 0.9, lineHeight: "1.6" }}>
            {lang === "en" ? "We are here to provide the support and consultation you need to elevate your business. Don't hesitate to reach out." : "نحن هنا لتقديم الدعم والاستشارات التي تحتاجها للارتقاء بأعمالك. لا تتردد في ترك رسالتك."}
          </p>
        </div>
      </section>

      {/* Main Content Area with Negative Margin */}
      <section style={{ paddingBottom: "6rem", position: "relative", zIndex: 10, marginTop: "-4rem" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg-grid-cols-2 gap-xl">
            
            {/* Form Side - Right in RTL */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="premium-card" style={{ 
                background: "var(--color-bg-card)", 
                padding: "3rem", 
                borderRadius: "24px", 
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                border: "1px solid rgba(255,255,255,0.4)",
                backdropFilter: "blur(10px)"
              }}>
                <h2 style={{ fontSize: "2rem", color: "var(--color-primary)", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  {lang === "en" ? "Send us a Message" : "أرسل رسالتك"}
                </h2>
                <p style={{ color: "var(--color-text-main)", opacity: 0.8, marginBottom: "2rem" }}>
                  {lang === "en" ? "Fill out the form below and our team will get back to you shortly." : "املأ النموذج أدناه وسيقوم فريقنا بالرد عليك في أقرب وقت ممكن."}
                </p>

                <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div className="grid grid-cols-1 md-grid-cols-2 gap-md">
                    <div>
                      <label style={{ display: "block", marginBottom: "0.6rem", color: "var(--color-text-main)", fontWeight: "600", fontSize: "0.95rem" }}>{lang === "en" ? "Full Name *" : "الاسم بالكامل *"}</label>
                      <input type="text" className="contact-input" placeholder={lang === "en" ? "John Doe" : "أحمد محمد"} required 
                        style={{ width: "100%", padding: "1rem 1.2rem", borderRadius: "12px", border: "2px solid #E2E8F0", background: "#F8FAFC", color: "#1E293B", outline: "none", transition: "all 0.3s ease", fontSize: "1rem" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.6rem", color: "var(--color-text-main)", fontWeight: "600", fontSize: "0.95rem" }}>{lang === "en" ? "Email Address *" : "البريد الإلكتروني *"}</label>
                      <input type="email" className="contact-input" placeholder="example@email.com" required dir="ltr" 
                        style={{ width: "100%", padding: "1rem 1.2rem", borderRadius: "12px", border: "2px solid #E2E8F0", background: "#F8FAFC", color: "#1E293B", outline: "none", transition: "all 0.3s ease", fontSize: "1rem" }} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md-grid-cols-2 gap-md">
                    <div>
                      <label style={{ display: "block", marginBottom: "0.6rem", color: "var(--color-text-main)", fontWeight: "600", fontSize: "0.95rem" }}>{lang === "en" ? "Phone Number *" : "رقم الهاتف *"}</label>
                      <input type="tel" className="contact-input" placeholder="+20 100 000 0000" required dir="ltr" 
                        style={{ width: "100%", padding: "1rem 1.2rem", borderRadius: "12px", border: "2px solid #E2E8F0", background: "#F8FAFC", color: "#1E293B", outline: "none", transition: "all 0.3s ease", fontSize: "1rem" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.6rem", color: "var(--color-text-main)", fontWeight: "600", fontSize: "0.95rem" }}>{lang === "en" ? "Inquiry Type" : "نوع الاستفسار"}</label>
                      <select className="contact-input" style={{ width: "100%", padding: "1rem 1.2rem", borderRadius: "12px", border: "2px solid #E2E8F0", background: "#F8FAFC", color: "#1E293B", outline: "none", appearance: "none", cursor: "pointer", transition: "all 0.3s ease", fontSize: "1rem" }}>
                        <option value="استشارات محاسبية">{lang === "en" ? "Accounting Consulting" : "استشارات محاسبية"}</option>
                        <option value="استشارات ضريبية">{lang === "en" ? "Tax Consulting" : "استشارات ضريبية"}</option>
                        <option value="تأسيس شركات">{lang === "en" ? "Company Formation" : "تأسيس شركات"}</option>
                        <option value="المراجعة والتدقيق">{lang === "en" ? "Audit & Assurance" : "المراجعة والتدقيق"}</option>
                        <option value="أخرى">{lang === "en" ? "Other" : "أخرى"}</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ display: "block", marginBottom: "0.6rem", color: "var(--color-text-main)", fontWeight: "600", fontSize: "0.95rem" }}>{lang === "en" ? "Your Message *" : "رسالتك والتفاصيل *"}</label>
                    <textarea rows={5} className="contact-input" placeholder={lang === "en" ? "How can we help you?" : "اكتب تفاصيل استفسارك هنا..."} required 
                      style={{ width: "100%", padding: "1rem 1.2rem", borderRadius: "12px", border: "2px solid #E2E8F0", background: "#F8FAFC", color: "#1E293B", outline: "none", resize: "vertical", transition: "all 0.3s ease", fontSize: "1rem" }} />
                  </div>
                  
                  <button type="button" className="btn btn-primary" style={{ marginTop: "1rem", width: "100%", padding: "1.2rem", fontSize: "1.1rem", fontWeight: "bold", borderRadius: "12px", background: "linear-gradient(to right, var(--color-primary), var(--color-secondary))", border: "none", boxShadow: "0 10px 20px rgba(15,23,42,0.2)" }}>
                    {lang === "en" ? "Send Message" : "إرسال الرسالة"} <i className={`bi bi-send${lang === 'ar' ? '-fill' : ''} ms-2`}></i>
                  </button>
                </form>
              </div>
            </div>

            {/* Information Side - Left in RTL */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.5s", display: "flex", flexDirection: "column", gap: "2rem" }}>
              
              {/* Modern Map Container */}
              <div style={{ 
                padding: "0.5rem", 
                background: "var(--color-bg-card)", 
                borderRadius: "24px", 
                boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
                height: "320px",
                overflow: "hidden"
              }}>
                <iframe 
                  src={map_url}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: "18px", filter: "contrast(1.1) saturation(1.1)" }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md-grid-cols-2 gap-md">
                
                {/* Phone Card */}
                <div style={{ background: "var(--color-bg-card)", padding: "1.5rem", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: "rgba(212, 175, 55, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="bi bi-telephone-fill" style={{ color: "var(--color-accent)", fontSize: "1.5rem" }}></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.5rem", fontWeight: "bold" }}>{lang === "en" ? "Call Us" : "اتصل بنا"}</h4>
                    {phones.map((phone: string, i: number) => (
                      <p key={`phone-${i}`} dir="ltr" style={{ color: "var(--color-text-main)", fontSize: "1rem", fontWeight: "600", marginBottom: "0.2rem", textAlign: lang === 'en' ? 'left' : 'right' }}>{phone}</p>
                    ))}
                  </div>
                </div>

                {/* Email Card */}
                <div style={{ background: "var(--color-bg-card)", padding: "1.5rem", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: "rgba(0, 91, 171, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="bi bi-envelope-fill" style={{ color: "var(--color-primary)", fontSize: "1.5rem" }}></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.5rem", fontWeight: "bold" }}>{lang === "en" ? "Email Us" : "راسلنا"}</h4>
                    {emails.map((email: string, i: number) => (
                      <p key={`email-${i}`} style={{ color: "var(--color-text-main)", fontSize: "0.95rem", fontWeight: "600", marginBottom: "0.2rem", wordBreak: "break-all" }}>{email}</p>
                    ))}
                  </div>
                </div>

              </div>

              {/* Address Card */}
              <div style={{ background: "var(--color-bg-card)", padding: "1.5rem", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.04)", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: "rgba(15, 23, 42, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className="bi bi-geo-alt-fill" style={{ color: "var(--color-secondary)", fontSize: "1.5rem" }}></i>
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.5rem", fontWeight: "bold" }}>{lang === "en" ? "Visit Us" : "مقر الشركة"}</h4>
                  <p style={{ color: "var(--color-text-main)", fontSize: "1rem", fontWeight: "600", lineHeight: "1.6" }}>{address}</p>
                </div>
              </div>

              {/* Social Media Links */}
              <div style={{ background: "var(--color-bg-card)", padding: "1.5rem", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", margin: 0, fontWeight: "bold" }}>{lang === "en" ? "Follow Us" : "تابعنا على"}</h4>
                <div style={{ display: "flex", gap: "0.8rem" }}>
                  {settings.social_facebook && (
                  <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                    <i className="bi bi-facebook fs-5"></i>
                  </a>
                  )}
                  {settings.social_instagram && (
                  <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                    <i className="bi bi-instagram fs-5"></i>
                  </a>
                  )}
                  {settings.social_youtube && (
                  <a href={settings.social_youtube} target="_blank" rel="noopener noreferrer" className="social-icon youtube">
                    <i className="bi bi-youtube fs-5"></i>
                  </a>
                  )}
                  {settings.social_linkedin && (
                  <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                    <i className="bi bi-linkedin fs-5"></i>
                  </a>
                  )}
                  {settings.social_tiktok && (
                  <a href={settings.social_tiktok} target="_blank" rel="noopener noreferrer" className="social-icon tiktok">
                    <i className="bi bi-tiktok fs-5"></i>
                  </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Embedded CSS for Hover Effects */}
      <style dangerouslySetInnerHTML={{__html: `
        .contact-input:focus {
          border-color: var(--color-accent) !important;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.15) !important;
        }
        .social-icon {
          width: 45px; height: 45px; border-radius: 50%; display: flex; alignItems: center; justify-content: center; 
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); color: #FFF; opacity: 0.9;
        }
        .social-icon:hover { transform: translateY(-5px) scale(1.1); opacity: 1; box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
        .social-icon.facebook { background: #1877F2; }
        .social-icon.instagram { background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); }
        .social-icon.youtube { background: #FF0000; }
        .social-icon.linkedin { background: #0A66C2; }
        .social-icon.tiktok { background: #000000; }
      `}} />
    </main>
  );
}
