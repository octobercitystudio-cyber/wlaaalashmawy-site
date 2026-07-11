import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ marginTop: "auto", borderTop: "1px solid var(--color-accent-hover)", padding: "var(--spacing-xl) 0 var(--spacing-md) 0", background: "var(--color-accent-hover)", color: "#FFFFFF" }}>
      <div className="container grid grid-cols-1 md-grid-cols-3 gap-lg">
        <div style={{ textAlign: "center" }}>
          <h3 style={{ marginBottom: "var(--spacing-sm)", fontSize: "4rem", fontWeight: "900", letterSpacing: "4px", color: "#FFFFFF" }}>AFC</h3>
          <p style={{ color: "#FFFFFF", opacity: 0.9, maxWidth: "300px", margin: "0 auto", fontSize: "1.1rem" }}>
            شريكك الاستراتيجي للارتقاء بأعمالك وتأمين مستقبلك المالي وفق أعلى المعايير العالمية المعتمدة.
          </p>
        </div>
        <div>
          <h3 style={{ marginBottom: "var(--spacing-md)", fontSize: "1.3rem", color: "#FFFFFF" }}>روابط هامة</h3>
          <ul className="footer-links flex flex-col gap-sm" style={{ opacity: 0.9 }}>
            <li><Link href="/">الرئيسية</Link></li>
            <li><Link href="/about">من نحن</Link></li>
            <li><Link href="/services">الخدمات المحاسبية</Link></li>
            <li><Link href="/sectors">القطاعات</Link></li>
            <li><Link href="/articles">المقالات</Link></li>
            <li><Link href="/contact">تواصل معنا</Link></li>
          </ul>
        </div>
        <div>
          <h3 style={{ marginBottom: "var(--spacing-md)", fontSize: "1.3rem", color: "#FFFFFF" }}>تواصل معنا</h3>
          <ul className="flex flex-col gap-sm" style={{ opacity: 0.9 }}>
            <li>📧 info@alashmawy-cpa.com</li>
            <li dir="ltr" style={{ textAlign: "right" }}>📞 01155729429 - 0238345397</li>
            <li>📍 مكتب 204 الدور الثاني مول اجياد فيو - 6 أكتوبر - الجيزة - مصر</li>
          </ul>
          
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <a href="#" aria-label="Facebook" style={{ color: "#FFFFFF", opacity: 0.9, transition: "opacity 0.3s" }} onMouseOver={(e) => e.currentTarget.style.opacity = "1"} onMouseOut={(e) => e.currentTarget.style.opacity = "0.9"}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" aria-label="Twitter" style={{ color: "#FFFFFF", opacity: 0.9, transition: "opacity 0.3s" }} onMouseOver={(e) => e.currentTarget.style.opacity = "1"} onMouseOut={(e) => e.currentTarget.style.opacity = "0.9"}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            <a href="#" aria-label="Instagram" style={{ color: "#FFFFFF", opacity: 0.9, transition: "opacity 0.3s" }} onMouseOver={(e) => e.currentTarget.style.opacity = "1"} onMouseOut={(e) => e.currentTarget.style.opacity = "0.9"}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" aria-label="LinkedIn" style={{ color: "#FFFFFF", opacity: 0.9, transition: "opacity 0.3s" }} onMouseOver={(e) => e.currentTarget.style.opacity = "1"} onMouseOut={(e) => e.currentTarget.style.opacity = "0.9"}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="container text-center" style={{ marginTop: "var(--spacing-xl)", paddingTop: "var(--spacing-md)", borderTop: "1px solid rgba(255,255,255,0.2)" }}>
        <p style={{ margin: 0, fontSize: "1rem", color: "#FFFFFF" }}>
          <span dir="ltr">© {new Date().getFullYear()}</span> جميع الحقوق محفوظة لشركة AFC.
        </p>
      </div>
    </footer>
  );
}
