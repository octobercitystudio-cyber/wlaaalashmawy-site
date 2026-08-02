import { fetchSettings } from "@/lib/api";
import { EditableText } from "@/components/editor/EditableText";
import ContactForm from "@/components/ContactForm";
import {
  normalizeSocialUrl,
  normalizeWhatsAppNumber,
  parseSettingList,
} from "@/lib/contact";

import { Lang } from "@/lib/dictionary";

export default async function ContactPage({ lang = "ar" }: { lang?: Lang }) {
  const settings = await fetchSettings();
  
  const emails = parseSettingList(settings.contact_emails, [
    settings.contact_email || "info@afc-cpa.com",
  ]);
  const phones = parseSettingList(settings.contact_phones, [
    settings.contact_phone || "01155729429",
    "0238345397",
  ]);
  const whatsappNumber = normalizeWhatsAppNumber(
    settings.contact_whatsapp || settings.whatsapp || phones[0],
  );
  const socialLinks = {
    facebook: normalizeSocialUrl(settings.social_facebook || "https://www.facebook.com/profile.php?id=100064870305325", "facebook"),
    instagram: normalizeSocialUrl(settings.social_instagram || "https://www.instagram.com/afc_cpa", "instagram"),
    youtube: normalizeSocialUrl(settings.social_youtube || "https://www.youtube.com/@AFC_CPA", "youtube"),
    linkedin: normalizeSocialUrl(settings.social_linkedin || "https://www.linkedin.com/company/135176511", "linkedin"),
    tiktok: normalizeSocialUrl(settings.social_tiktok || "https://www.tiktok.com/@afc_cpa", "tiktok"),
  };
  const hasSocialLinks = Object.values(socialLinks).some(Boolean);

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
        background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/contact_hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#FFFFFF",
        textAlign: "center"
      }}>
        <div className="container" style={{ paddingTop: "2rem" }}>
          <h1 className="animate-fade-in-up" style={{ fontSize: "3rem", marginBottom: "var(--spacing-md)", fontWeight: "bold", color: "#FFFFFF" }}>
            {lang === "en" ? "Contact Us" : "تواصل معنا"}
          </h1>
          <p className="animate-fade-in-up" style={{ animationDelay: "0.2s", fontSize: "1.3rem", maxWidth: "600px", margin: "0 auto", opacity: 1, color: "#FFFFFF", fontWeight: "bold", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
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
                <ContactForm lang={lang} whatsappNumber={whatsappNumber} />
              </div>
            </div>

            {/* Left: Map and Contact Info */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.5s", display: "flex", flexDirection: "column", gap: "2rem" }}>
              
              {/* Map (Now on top) */}
              <div style={{ padding: "0.5rem", background: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "16px", height: "350px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                <iframe 
                  src={map_url}
                  title={lang === "en" ? "AFC office location" : "موقع مكتب AFC"}
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
                      <a key={`phone-${i}`} href={`tel:${phone.replace(/[^\d+]/g, "")}`} dir="ltr" className="contact-link">{phone}</a>
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
                      <a key={`email-${i}`} href={`mailto:${email}`} className="contact-link">{email}</a>
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
                      <EditableText 
                        id={lang === "en" ? "contact_address_en" : "contact_address"}
                        value={address}
                      />
                    </p>
                  </div>
                </div>

                {/* Social Media Links */}
                {hasSocialLinks && <div style={{ display: "flex", flexDirection: "column", gap: "1rem", background: "var(--color-bg-card)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--color-border)", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                  <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", margin: 0, fontWeight: "bold" }}>{lang === "en" ? "Social Media" : "منصات السوشيال ميديا"}</h4>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {socialLinks.facebook && <a href={socialLinks.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#1877F2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
                      <i className="bi bi-facebook fs-5"></i>
                    </a>}
                    
                    {socialLinks.instagram && <a href={socialLinks.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#E4405F", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
                      <i className="bi bi-instagram fs-5"></i>
                    </a>}
                    
                    {socialLinks.youtube && <a href={socialLinks.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#FF0000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
                      <i className="bi bi-youtube fs-5"></i>
                    </a>}
                    
                    {socialLinks.linkedin && <a href={socialLinks.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#0A66C2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
                      <i className="bi bi-linkedin fs-5"></i>
                    </a>}
                    
                    {socialLinks.tiktok && <a href={socialLinks.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#000000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
                      <i className="bi bi-tiktok fs-5"></i>
                    </a>}
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
