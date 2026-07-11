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
            <a href="#" aria-label="Facebook" className="hover:opacity-100" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#1877F2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.3s", opacity: 0.9 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" aria-label="X" className="hover:opacity-100" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#000000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.3s", opacity: 0.9 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:opacity-100" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.3s", opacity: 0.9 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:opacity-100" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#0A66C2", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.3s", opacity: 0.9 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
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
