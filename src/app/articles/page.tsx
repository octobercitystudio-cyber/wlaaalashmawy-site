export default function ArticlesPage() {
  const articles = [
    { title: "تأثير ضريبة القيمة المضافة على المشاريع الصغيرة", date: "١٥ مايو ٢٠٢٦", category: "الضرائب", excerpt: "كيف يمكن للشركات الصغيرة والمتوسطة التكيف مع أنظمة ضريبة القيمة المضافة لضمان الامتثال المستمر دون التأثير سلباً على السيولة النقدية؟" },
    { title: "أهمية مسك الدفاتر للشركات الناشئة", date: "٣ أبريل ٢٠٢٦", category: "نصائح مالية", excerpt: "العديد من رواد الأعمال يتجاهلون أهمية مسك الدفاتر في بداياتهم، مما يؤدي إلى تراكمات مالية صعبة. تعرف على الفوائد الجوهرية للبدء مبكراً." },
    { title: "معايير المحاسبة الدولية IFRS وتطبيقها", date: "٢٠ فبراير ٢٠٢٦", category: "المراجعة", excerpt: "نظرة شاملة على كيفية تحول الشركات المحلية لتبني معايير التقارير المالية الدولية (IFRS) والفوائد المرجوة من هذا التحول." },
    { title: "كيف تستعد لنهاية السنة المالية؟", date: "١٠ ديسمبر ٢٠٢٥", category: "إدارة مالية", excerpt: "خطوات عملية وفعالة يجب على المدراء الماليين والمحاسبين اتخاذها لضمان إغلاق السنة المالية بنجاح وبدون أي مفاجآت." }
  ];

  return (
    <div className="animate-fade-in" style={{ flex: 1, padding: "var(--spacing-xl) 0" }}>
      <div className="container">
        <div className="text-center mb-xl">
          <h1 className="text-gold" style={{ fontSize: "3rem", marginBottom: "var(--spacing-md)" }}>المقالات والمدونة</h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", color: "var(--color-text-main)", opacity: 0.9 }}>
            ابقَ على اطلاع دائم بأحدث التطورات في عالم المحاسبة، الضرائب، والأعمال. نقدم لك تحليلات احترافية ونصائح قيمة لدعم مسيرة نجاحك.
          </p>
        </div>

        <div className="grid grid-cols-1 md-grid-cols-2 gap-lg">
          {articles.map((article, index) => (
            <div key={index} className="premium-card flex flex-col gap-sm" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", transition: "transform 0.3s" }}>
              <div className="flex justify-between items-center" style={{ marginBottom: "0.5rem" }}>
                <span style={{ background: "rgba(197, 160, 89, 0.1)", color: "var(--color-accent)", padding: "0.2rem 0.8rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "bold" }}>{article.category}</span>
                <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>{article.date}</span>
              </div>
              <h3 style={{ fontSize: "1.4rem", color: "var(--color-primary)", margin: "0.5rem 0" }}>{article.title}</h3>
              <p style={{ opacity: 0.8, lineHeight: 1.7, flex: 1 }}>{article.excerpt}</p>
              <button className="btn btn-secondary" style={{ alignSelf: "flex-start", marginTop: "1rem", padding: "0.5rem 1.5rem", background: "transparent", border: "1px solid var(--color-accent)", color: "var(--color-accent)" }}>اقرأ المزيد</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
