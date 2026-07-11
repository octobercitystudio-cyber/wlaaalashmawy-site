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
          <ul className="flex flex-col gap-sm" style={{ opacity: 0.9 }}>
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
            <li>📞 +966 50 000 0000</li>
            <li>📍 الرياض، المملكة العربية السعودية</li>
          </ul>
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
