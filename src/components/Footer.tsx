import Link from "next/link";

export default function Footer({ settings = {}, services = [] }: { settings?: any, services?: any[] }) {
  let emails = [];
  try { emails = JSON.parse(settings.contact_emails); } catch(e) {}
  if (!emails || emails.length === 0) emails = [settings.contact_email || 'info@alashmawy-cpa.com'];

  let phones = [];
  try { phones = JSON.parse(settings.contact_phones); } catch(e) {}
  if (!phones || phones.length === 0) phones = [settings.contact_phone || '01155729429 - 0238345397'];

  const address = settings.contact_address || 'القاهرة';
  
  return (
    <footer style={{ marginTop: "auto", borderTop: "1px solid var(--color-accent-hover)", padding: "var(--spacing-xl) 0 var(--spacing-md) 0", background: "var(--color-accent-hover)", color: "#FFFFFF" }}>
      <div className="container grid grid-cols-1 md-grid-cols-3 gap-lg">
        <div style={{ textAlign: "center" }}>
          <h3 style={{ marginBottom: "var(--spacing-sm)", fontSize: "4rem", fontWeight: "900", letterSpacing: "4px", color: "#FFFFFF" }}>AFC</h3>
          <p style={{ color: "#FFFFFF", opacity: 0.9, maxWidth: "300px", margin: "0 auto", fontSize: "1.1rem" }}>
            شريكك الموثوق في تقديم حلول محاسبية وضريبية متكاملة لضمان نجاح واستدامة أعمالك.
          </p>
        </div>
        <div>
          <h3 style={{ marginBottom: "var(--spacing-md)", fontSize: "1.3rem", color: "#FFFFFF" }}>روابط هامة</h3>
          <ul className="footer-links flex flex-col gap-sm" style={{ opacity: 0.9 }}>
            <li><Link href="/">الرئيسية</Link></li>
            <li><Link href="/about">من نحن</Link></li>
            <li><Link href="/services">جميع الخدمات</Link></li>
            <li><Link href="/sectors">القطاعات</Link></li>
            <li><Link href="/articles">المقالات</Link></li>
            <li><Link href="/contact">تواصل معنا</Link></li>
          </ul>
        </div>
        <div>
          <h3 style={{ marginBottom: "var(--spacing-md)", fontSize: "1.3rem", color: "#FFFFFF" }}>تواصل معنا</h3>
          <ul className="flex flex-col gap-sm" style={{ opacity: 0.9 }}>
            {emails.map((email: string, i: number) => (
              <li key={`email-${i}`}>📧 {email}</li>
            ))}
            {phones.map((phone: string, i: number) => (
              <li key={`phone-${i}`} dir="ltr" style={{ textAlign: "right" }}>📞 {phone}</li>
            ))}
            <li>📍 {address}</li>
          </ul>
          
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            {settings.social_facebook && (
            <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#1877F2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
              <i className="bi bi-facebook"></i>
            </a>
            )}
            {settings.social_instagram && (
            <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#E4405F", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
              <i className="bi bi-instagram"></i>
            </a>
            )}
            {settings.social_youtube && (
            <a href={settings.social_youtube} target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#FF0000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
              <i className="bi bi-youtube"></i>
            </a>
            )}
            {settings.social_linkedin && (
            <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#0A66C2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
              <i className="bi bi-linkedin"></i>
            </a>
            )}
            {settings.social_tiktok && (
            <a href={settings.social_tiktok} target="_blank" rel="noopener noreferrer" className="hover:opacity-100" style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#000000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", opacity: 0.9 }}>
              <i className="bi bi-tiktok"></i>
            </a>
            )}
          </div>
        </div>
      </div>
      <div className="container text-center" style={{ marginTop: "var(--spacing-xl)", paddingTop: "var(--spacing-md)", borderTop: "1px solid rgba(255,255,255,0.2)" }}>
        <p style={{ margin: 0, fontSize: "1rem", color: "#FFFFFF" }}>
          <span dir="ltr">© {new Date().getFullYear()}</span> جميع الحقوق محفوظة لمكتب AFC.
        </p>
      </div>
    </footer>
  );
}
