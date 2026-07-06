import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="animate-fade-in" style={{ flex: 1, padding: "var(--spacing-xl) 0" }}>
      <div className="container">
        <div className="text-center mb-xl">
          <h1 className="text-gold" style={{ fontSize: "3rem", marginBottom: "var(--spacing-md)" }}>خدماتنا الاحترافية</h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", color: "var(--color-text-main)", opacity: 0.9 }}>
            نقدم مجموعة متكاملة من الخدمات المالية والمحاسبية لتلبية كافة احتياجات أعمالك، سواء كنت شركة ناشئة أو مؤسسة كبرى.
          </p>
        </div>

        <div className="grid grid-cols-1 md-grid-cols-3 gap-lg">
          <div className="premium-card text-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <div style={{ width: "80px", height: "80px", background: "var(--gold-gradient-subtle)", borderRadius: "50%", margin: "0 auto var(--spacing-md)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", fontSize: "2rem" }}>
              📊
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-sm)", color: "var(--color-primary)" }}>المراجعة والتدقيق</h3>
            <p style={{ marginBottom: "var(--spacing-md)" }}>عمليات تدقيق مالي دقيقة تضمن الشفافية والموثوقية لقوائمك المالية أمام الجهات المختصة بشفافية تامة. نساعدك في الامتثال للمعايير الدولية.</p>
          </div>
          
          <div className="premium-card text-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <div style={{ width: "80px", height: "80px", background: "var(--gold-gradient-subtle)", borderRadius: "50%", margin: "0 auto var(--spacing-md)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", fontSize: "2rem" }}>
              💼
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-sm)", color: "var(--color-primary)" }}>الاستشارات الضريبية</h3>
            <p style={{ marginBottom: "var(--spacing-md)" }}>تخطيط ضريبي استراتيجي يضمن لك الامتثال الكامل للأنظمة الضريبية في المملكة، وتحقيق أقصى كفاءة مالية وتجنب الغرامات.</p>
          </div>

          <div className="premium-card text-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <div style={{ width: "80px", height: "80px", background: "var(--gold-gradient-subtle)", borderRadius: "50%", margin: "0 auto var(--spacing-md)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", fontSize: "2rem" }}>
              📝
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-sm)", color: "var(--color-primary)" }}>مسك الدفاتر الاحترافي</h3>
            <p style={{ marginBottom: "var(--spacing-md)" }}>توثيق دقيق ومستمر للعمليات المالية اليومية لتوفير تقارير دورية تمنحك الثقة والوضوح في اتخاذ قراراتك الإدارية والتوسعية.</p>
          </div>

          <div className="premium-card text-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <div style={{ width: "80px", height: "80px", background: "var(--gold-gradient-subtle)", borderRadius: "50%", margin: "0 auto var(--spacing-md)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", fontSize: "2rem" }}>
              💡
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-sm)", color: "var(--color-primary)" }}>الاستشارات الإدارية والمالية</h3>
            <p style={{ marginBottom: "var(--spacing-md)" }}>نقدم دراسات جدوى شاملة، وتحليلات مالية دقيقة، لمساعدتك في التخطيط المالي السليم لضمان نجاح المشاريع الاستثمارية.</p>
          </div>

          <div className="premium-card text-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <div style={{ width: "80px", height: "80px", background: "var(--gold-gradient-subtle)", borderRadius: "50%", margin: "0 auto var(--spacing-md)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", fontSize: "2rem" }}>
              🏛️
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-sm)", color: "var(--color-primary)" }}>خدمات الزكاة</h3>
            <p style={{ marginBottom: "var(--spacing-md)" }}>إعداد وتقديم إقرارات الزكاة ومتابعتها مع هيئة الزكاة والضريبة والجمارك، لضمان الامتثال التام وفقاً للأنظمة المعمول بها.</p>
          </div>

          <div className="premium-card text-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <div style={{ width: "80px", height: "80px", background: "var(--gold-gradient-subtle)", borderRadius: "50%", margin: "0 auto var(--spacing-md)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", fontSize: "2rem" }}>
              📈
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-sm)", color: "var(--color-primary)" }}>تقييم المنشآت</h3>
            <p style={{ marginBottom: "var(--spacing-md)" }}>خدمات تقييم الأعمال لتحديد القيمة العادلة للشركات لأغراض الاستحواذ، الاندماج، أو الشراكات الاستراتيجية.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
