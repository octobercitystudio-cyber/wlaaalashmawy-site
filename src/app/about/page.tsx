import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="animate-fade-in" style={{ flex: 1, padding: "var(--spacing-xl) 0" }}>
      <div className="container">
        <div className="text-center mb-xl">
          <h1 className="text-gold" style={{ fontSize: "3rem", marginBottom: "var(--spacing-md)" }}>من نحن</h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", color: "var(--color-text-main)", opacity: 0.9 }}>
            مكتب العشماوي للمحاسبة هو شريكك المالي الموثوق في المملكة العربية السعودية. نسعى لتقديم خدمات محاسبية واستشارية متكاملة بمعايير عالمية رائدة تدعم نمو وتطور أعمالك.
          </p>
        </div>

        <div className="grid grid-cols-1 md-grid-cols-2 gap-lg mb-xl items-center">
          <div>
            <h2 className="text-gold" style={{ marginBottom: "var(--spacing-sm)" }}>رؤيتنا</h2>
            <p style={{ fontSize: "1.1rem", marginBottom: "var(--spacing-md)" }}>
              أن نكون الخيار الأول والرواد في مجال المحاسبة والاستشارات المالية والضريبية في المنطقة، من خلال تقديم قيمة مضافة حقيقية لعملائنا وشركائنا.
            </p>
            <h2 className="text-gold" style={{ marginBottom: "var(--spacing-sm)" }}>رسالتنا</h2>
            <p style={{ fontSize: "1.1rem" }}>
              تمكين الشركات والمؤسسات من تحقيق أهدافها المالية باستقرار، عبر توفير حلول محاسبية مبتكرة، دقيقة، وشفافة، تعتمد على أحدث التقنيات وأفضل الكفاءات المهنية.
            </p>
          </div>
          <div className="premium-card flex justify-center items-center" style={{ minHeight: "350px", border: "1px solid var(--color-accent)", background: "var(--color-bg-card)" }}>
            <div className="text-center">
              <span style={{ fontSize: "5rem", display: "block", marginBottom: "1rem" }}>🎯</span>
              <p style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0, color: "var(--color-text-main)" }}>الريادة والتميز</p>
            </div>
          </div>
        </div>

        <div style={{ background: "var(--color-bg-card)", padding: "var(--spacing-lg)", borderRadius: "var(--border-radius-md)", border: "1px solid var(--color-border)" }}>
          <h2 className="text-gold text-center mb-lg">قيمنا الأساسية</h2>
          <div className="grid grid-cols-1 md-grid-cols-3 gap-md text-center">
            <div>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤝</div>
              <h3 style={{ color: "var(--color-primary)" }}>الشفافية والثقة</h3>
              <p>نبني علاقات طويلة الأمد مع عملائنا أساسها الصدق والوضوح التام في كل تعاملاتنا.</p>
            </div>
            <div>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚙️</div>
              <h3 style={{ color: "var(--color-primary)" }}>الاحترافية</h3>
              <p>نلتزم بأعلى معايير الجودة والمهنية في تقديم خدماتنا من خلال فريق من الخبراء المعتمدين.</p>
            </div>
            <div>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
              <h3 style={{ color: "var(--color-primary)" }}>السرية والأمان</h3>
              <p>نحافظ على سرية بيانات عملائنا المالية بصرامة تامة ونتبع أحدث بروتوكولات حماية المعلومات.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
