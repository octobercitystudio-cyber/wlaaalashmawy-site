import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ marginTop: "auto", borderTop: "1px solid var(--color-border)", padding: "var(--spacing-xl) 0 var(--spacing-md) 0", background: "var(--color-bg-body)" }}>
      <div className="container grid grid-cols-1 md-grid-cols-3 gap-lg">
        <div>
          <h3 className="text-gold" style={{ marginBottom: "var(--spacing-md)", fontSize: "1.8rem" }}>العشماوي للمحاسبة</h3>
          <p style={{ opacity: 0.8, maxWidth: "300px" }}>
            شريكك الاستراتيجي للارتقاء بأعمالك وتأمين مستقبلك المالي وفق أعلى المعايير العالمية المعتمدة.
          </p>
        </div>
        <div>
          <h3 style={{ marginBottom: "var(--spacing-md)", fontSize: "1.3rem" }}>روابط هامة</h3>
          <ul className="flex flex-col gap-sm" style={{ opacity: 0.8 }}>
            <li><Link href="/">الرئيسية</Link></li>
            <li><Link href="/about">من نحن</Link></li>
            <li><Link href="/services">الخدمات المحاسبية</Link></li>
            <li><Link href="/sectors">القطاعات</Link></li>
            <li><Link href="/articles">المقالات</Link></li>
            <li><Link href="/contact">تواصل معنا</Link></li>
          </ul>
        </div>
        <div>
          <h3 style={{ marginBottom: "var(--spacing-md)", fontSize: "1.3rem" }}>تواصل معنا</h3>
          <ul className="flex flex-col gap-sm" style={{ opacity: 0.8 }}>
            <li>📧 info@alashmawy-cpa.com</li>
            <li>📞 +966 50 000 0000</li>
            <li>📍 الرياض، المملكة العربية السعودية</li>
          </ul>
        </div>
      </div>
      <div className="container text-center" style={{ marginTop: "var(--spacing-xl)", paddingTop: "var(--spacing-md)", borderTop: "1px solid var(--color-border)", opacity: 0.6 }}>
        <p style={{ margin: 0, fontSize: "0.9rem" }}>© {new Date().getFullYear()} مكتب العشماوي للمحاسبة. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}
