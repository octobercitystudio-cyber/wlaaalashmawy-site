import Link from "next/link";

import { getDictionary, Lang } from "@/lib/dictionary";
import { normalizeSocialUrl, parseSettingList } from "@/lib/contact";

export default function Footer({ settings = {}, lang = "ar" }: { settings?: any, services?: any[], lang?: Lang }) {
  const emails = parseSettingList(settings.contact_emails, [
    settings.contact_email || "info@afc-cpa.com",
  ]);
  const phones = parseSettingList(settings.contact_phones, [
    settings.contact_phone || "01155729429",
    "0238345397",
  ]);

  const address = (lang === "en" && settings.contact_address_en ? settings.contact_address_en : settings.contact_address) || (lang === "en" ? "Office 204, 2nd Floor, Agyad View Mall - 6th of October - Giza - Egypt" : "مكتب 204 الدور الثاني مول اجياد فيو - ٦ اكتوبر - الجيزة - مصر");
  const dict = getDictionary(lang);
  const prefix = lang === "en" ? "/en" : "";
  const socialLinks = {
    facebook: normalizeSocialUrl(settings.social_facebook || "https://www.facebook.com/profile.php?id=100064870305325", "facebook"),
    instagram: normalizeSocialUrl(settings.social_instagram || "https://www.instagram.com/afc_cpa", "instagram"),
    youtube: normalizeSocialUrl(settings.social_youtube || "https://www.youtube.com/@AFC_CPA", "youtube"),
    linkedin: normalizeSocialUrl(settings.social_linkedin || "https://www.linkedin.com/company/135176511", "linkedin"),
    tiktok: normalizeSocialUrl(settings.social_tiktok || "https://www.tiktok.com/@afc_cpa", "tiktok"),
  };
  const hasSocialLinks = Object.values(socialLinks).some(Boolean);
  
  return (
    <footer style={{ marginTop: "auto", borderTop: "1px solid var(--color-accent-hover)", padding: "2rem 0 1rem 0", background: "var(--color-accent-hover)", color: "#FFFFFF" }}>
      <div className="container grid grid-cols-1 md-grid-cols-3 gap-lg">
        <div style={{ textAlign: "center" }}>
          <h3 style={{ marginBottom: "0.5rem", fontSize: "3rem", fontWeight: "900", letterSpacing: "3px", color: "#FFFFFF" }}>AFC</h3>
          <p style={{ color: "#FFFFFF", opacity: 0.9, maxWidth: "300px", margin: "0 auto", fontSize: "1.1rem" }}>
            {lang === "en" ? "Your trusted partner in providing comprehensive accounting and tax solutions to ensure the success and sustainability of your business." : "شريكك الموثوق في تقديم حلول محاسبية وضريبية متكاملة لضمان نجاح واستدامة أعمالك."}
          </p>
        </div>
        <div>
          <h3 style={{ marginBottom: "var(--spacing-md)", fontSize: "1.3rem", color: "#FFFFFF" }}>{dict.quickLinks}</h3>
          <ul className="footer-links flex flex-col gap-xs" style={{ opacity: 0.9 }}>
            <li><Link href={`${prefix}/`}>{dict.home}</Link></li>
            <li><Link href={`${prefix}/about`}>{dict.about}</Link></li>
            <li><Link href={`${prefix}/services`}>{dict.services}</Link></li>
            <li><Link href={`${prefix}/sectors`}>{dict.sectors}</Link></li>
            <li><Link href={`${prefix}/articles`}>{dict.articles}</Link></li>
            <li><Link href={`${prefix}/contact`}>{dict.contact}</Link></li>
          </ul>
        </div>
        <div>
          <h3 style={{ marginBottom: "var(--spacing-md)", fontSize: "1.3rem", color: "#FFFFFF" }}>{dict.contact}</h3>
          <ul className="footer-links flex flex-col gap-xs" style={{ opacity: 0.9 }}>
            {emails.map((email: string, i: number) => (
              <li key={`email-${i}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>📧</span> 
                <a href={`mailto:${email}`} dir="ltr">{email}</a>
              </li>
            ))}
            {phones.map((phone: string, i: number) => (
              <li key={`phone-${i}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>📞</span> 
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} dir="ltr">{phone}</a>
              </li>
            ))}
            <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
              <span>📍</span> 
              <span>{address}</span>
            </li>
          </ul>
          
          {hasSocialLinks && <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            {socialLinks.facebook && (
            <a href={socialLinks.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#1877F2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
              <i className="bi bi-facebook"></i>
            </a>
            )}
            {socialLinks.instagram && (
            <a href={socialLinks.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#E4405F", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
              <i className="bi bi-instagram"></i>
            </a>
            )}
            {socialLinks.youtube && (
            <a href={socialLinks.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#FF0000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
              <i className="bi bi-youtube"></i>
            </a>
            )}
            {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#0A66C2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
              <i className="bi bi-linkedin"></i>
            </a>
            )}
            {socialLinks.tiktok && (
            <a href={socialLinks.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#000000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
              <i className="bi bi-tiktok"></i>
            </a>
            )}
          </div>}
        </div>
      </div>
      <div className="container text-center" style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.2)" }}>
        <p style={{ margin: 0, fontSize: "1rem", color: "#FFFFFF" }}>
          <span dir="ltr">© {new Date().getFullYear()}</span> {lang === "en" ? "All rights reserved to www.afc-cpa.com" : "جميع الحقوق محفوظة لموقع www.afc-cpa.com"}
          <span style={{ margin: "0 10px", opacity: 0.5 }}>|</span>
          {lang === "en" ? "Powered by " : "تم التصميم بواسطة "}
          <a href="https://www.multitaskagency.com" target="_blank" rel="noopener noreferrer" style={{ color: "#FFFFFF", textDecoration: "none", fontWeight: "bold", transition: "opacity 0.3s ease" }} className="hover:opacity-80">
            MT AGENCY
          </a>
        </p>
      </div>
    </footer>
  );
}
