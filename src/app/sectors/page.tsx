export default function SectorsPage() {
  const sectors = [
    { title: "التجارة والتجزئة", icon: "🛒", desc: "حلول محاسبية متخصصة تلبي الطبيعة المتغيرة والسريعة لقطاع التجزئة والجملة، وإدارة المخزون بدقة." },
    { title: "المقاولات والإنشاءات", icon: "🏗️", desc: "نظام محاسبة متقدم لإدارة تكاليف المشاريع ومستخلصات المقاولين بدقة تامة وشفافية." },
    { title: "الرعاية الصحية", icon: "🏥", desc: "خبرة واسعة في إدارة الحسابات للعيادات والمستشفيات، بما يتوافق مع الأنظمة واللوائح الصحية الخاصة." },
    { title: "التصنيع والإنتاج", icon: "🏭", desc: "تحليل دقيق لتكاليف الإنتاج والمواد الخام لضمان تسعير عادل وتحقيق هوامش ربح مستدامة للقطاع الصناعي." },
    { title: "التقنية والاتصالات", icon: "💻", desc: "استشارات ضريبية ومحاسبية للشركات التقنية الناشئة والمؤسسات، مع التركيز على استدامة النمو والابتكار." },
    { title: "الخدمات المهنية والتعليمية", icon: "🎓", desc: "إدارة الرواتب، التدفقات النقدية، والتخطيط المالي للمدارس، المعاهد، ومكاتب الخدمات المهنية." }
  ];

  return (
    <div className="animate-fade-in" style={{ flex: 1, padding: "var(--spacing-xl) 0" }}>
      <div className="container">
        <div className="text-center mb-xl">
          <h1 className="text-gold" style={{ fontSize: "3rem", marginBottom: "var(--spacing-md)" }}>القطاعات التي نخدمها</h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", color: "var(--color-text-main)", opacity: 0.9 }}>
            ندرك في مكتب العشماوي أن كل قطاع أعمال له طبيعته وتحدياته الخاصة. لذا، صممنا حلولنا المحاسبية لتكون مرنة ومخصصة لتلائم احتياجات مختلف القطاعات بشكل احترافي ودقيق.
          </p>
        </div>

        <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-lg">
          {sectors.map((sector, index) => (
            <div key={index} className="premium-card flex flex-col gap-sm" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{sector.icon}</div>
              <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary)" }}>{sector.title}</h3>
              <p style={{ opacity: 0.9, lineHeight: 1.6 }}>{sector.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
