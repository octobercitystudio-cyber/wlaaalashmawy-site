import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ flex: 1 }}>
      {/* Hero Section */}
      <HeroSlider />

      {/* Stats Section */}
      <section style={{ padding: "var(--spacing-lg) 0", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-card)" }}>
        <div className="container grid grid-cols-1 md-grid-cols-4 gap-lg">
          <div className="flex items-center justify-center gap-sm" style={{ background: "var(--color-bg-body)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
            <h2 className="text-gold" style={{ fontSize: "2.8rem", margin: 0, lineHeight: 1 }}>+15</h2>
            <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-text-main)" }}>سنوات<br/>التميز</p>
          </div>
          <div className="flex items-center justify-center gap-sm" style={{ background: "var(--color-bg-body)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
            <h2 className="text-gold" style={{ fontSize: "2.8rem", margin: 0, lineHeight: 1 }}>+500</h2>
            <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-text-main)" }}>عميل<br/>موثوق</p>
          </div>
          <div className="flex items-center justify-center gap-sm" style={{ background: "var(--color-bg-body)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
            <h2 className="text-gold" style={{ fontSize: "2.8rem", margin: 0, lineHeight: 1 }}>+1k</h2>
            <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-text-main)" }}>استشارة<br/>ناجحة</p>
          </div>
          <div className="flex items-center justify-center gap-sm" style={{ background: "var(--color-bg-body)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
            <h2 className="text-gold" style={{ fontSize: "2.8rem", margin: 0, lineHeight: 1 }}>100%</h2>
            <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-text-main)" }}>دقة<br/>وشفافية</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container py-xl">
        <div className="text-center mb-lg">
          <h2 className="text-gold">خدماتنا الاحترافية</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>رؤية مالية واضحة وحلول استراتيجية مصممة خصيصاً لتلبي تطلعات أعمالك.</p>
        </div>
        <div className="grid grid-cols-1 md-grid-cols-3 gap-lg">
          <div className="premium-card text-center">
            <div style={{ width: "60px", height: "60px", background: "var(--gold-gradient-subtle)", borderRadius: "50%", margin: "0 auto var(--spacing-md)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", fontSize: "1.5rem" }}>
              📊
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-sm)" }}>المراجعة والتدقيق</h3>
            <p>عمليات تدقيق مالي دقيقة تضمن الشفافية والموثوقية لقوائمك المالية أمام الجهات المختصة بشفافية تامة.</p>
          </div>
          <div className="premium-card text-center">
            <div style={{ width: "60px", height: "60px", background: "var(--gold-gradient-subtle)", borderRadius: "50%", margin: "0 auto var(--spacing-md)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", fontSize: "1.5rem" }}>
              💼
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-sm)" }}>الاستشارات الضريبية</h3>
            <p>تخطيط ضريبي استراتيجي يضمن لك الامتثال الكامل للأنظمة الضريبية وتحقيق أقصى كفاءة مالية.</p>
          </div>
          <div className="premium-card text-center">
            <div style={{ width: "60px", height: "60px", background: "var(--gold-gradient-subtle)", borderRadius: "50%", margin: "0 auto var(--spacing-md)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", fontSize: "1.5rem" }}>
              📝
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-sm)" }}>مسك الدفاتر الاحترافي</h3>
            <p>توثيق دقيق ومستمر للعمليات المالية لتوفير تقارير دورية تمنحك الثقة في اتخاذ قراراتك الإدارية.</p>
          </div>
        </div>
        <div className="text-center" style={{ marginTop: "var(--spacing-lg)" }}>
          <Link href="/services" className="btn btn-secondary">عرض كل الخدمات</Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" style={{ padding: "var(--spacing-xl) 0", background: "var(--color-bg-card)" }}>
        <div className="container grid grid-cols-1 md-grid-cols-2 gap-lg items-center">
          <div>
            <h2 className="text-gold">لماذا تختارنا؟</h2>
            <p style={{ fontSize: "1.1rem" }}>
              نحن لا نقدم أرقاماً فحسب، بل نقدم رؤية مالية عميقة. من خلال أحدث المنهجيات والتقنيات المحاسبية، نضمن لك الأمان المالي والدقة المتناهية.
            </p>
            <ul className="flex flex-col gap-sm" style={{ marginTop: "var(--spacing-md)" }}>
              <li className="flex items-center gap-sm" style={{ fontSize: "1.1rem" }}>
                <span className="text-gold" style={{ fontWeight: "bold" }}>✦</span> فريق من الخبراء والاستشاريين المعتمدين عالمياً.
              </li>
              <li className="flex items-center gap-sm" style={{ fontSize: "1.1rem" }}>
                <span className="text-gold" style={{ fontWeight: "bold" }}>✦</span> سرية تامة والتزام بأعلى معايير حماية البيانات.
              </li>
              <li className="flex items-center gap-sm" style={{ fontSize: "1.1rem" }}>
                <span className="text-gold" style={{ fontWeight: "bold" }}>✦</span> حلول مخصصة تعكس فهمنا العميق لمختلف القطاعات.
              </li>
            </ul>
            <div style={{ marginTop: "var(--spacing-md)" }}>
              <Link href="/about" className="btn btn-secondary">تعرف علينا أكثر</Link>
            </div>
          </div>
          <div className="premium-card flex justify-center items-center" style={{ minHeight: "350px", border: "1px solid var(--color-accent)", background: "rgba(5, 25, 55, 0.05)" }}>
            <div className="text-center">
              <span style={{ fontSize: "5rem", display: "block", marginBottom: "1rem" }}>🏛️</span>
              <p style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0, color: "var(--color-text-main)" }}>التميز والاحترافية</p>
              <p style={{ color: "var(--color-accent)", letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.9rem" }}>أساس عملنا</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container py-xl">
        <div className="text-center mb-lg">
          <h2 className="text-gold">آراء شركاء النجاح</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            نفخر بثقة عملائنا، ونسعى دائماً لتقديم أفضل الخدمات المالية التي تلبي تطلعاتهم وتساهم في نمو أعمالهم.
          </p>
        </div>
        
        {/* Horizontal Scrolling Carousel (One per view) */}
        <div className="flex gap-lg hide-scrollbar" style={{ overflowX: "auto", paddingBottom: "2rem", scrollSnapType: "x mandatory" }}>
          
          <div className="premium-card flex flex-col items-center text-center gap-md" style={{ flex: "0 0 100%", scrollSnapAlign: "center", position: "relative", padding: "3rem 2rem" }}>
            <div style={{ position: "absolute", top: "10px", right: "20px", fontSize: "8rem", color: "rgba(197, 160, 89, 0.05)", lineHeight: 1, fontFamily: "serif", zIndex: 0 }}>"</div>
            <div className="flex flex-col items-center text-center" style={{ position: "relative", zIndex: 1 }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--color-bg-body)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-accent)", fontWeight: "bold", border: "2px solid var(--color-accent)", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                  م.أ
                </div>
                <h4 style={{ margin: 0, color: "var(--color-text-main)", fontSize: "1.2rem" }}>محمد الأحمد</h4>
                <p style={{ margin: "0.2rem 0", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>المدير التنفيذي، شركة أفق</p>
                <div style={{ color: "#FFD700", letterSpacing: "3px", fontSize: "1.3rem", marginTop: "0.5rem" }}>★★★★★</div>
            </div>
            <p style={{ opacity: 0.9, position: "relative", zIndex: 1, margin: 0, lineHeight: 1.8, fontSize: "1.15rem", maxWidth: "800px" }}>
              "الاحترافية والدقة هما عنوان مكتب العشماوي. ساعدونا بشكل كبير في تنظيم هيكلنا المالي والامتثال التام للضرائب دون أي تأخير. خدمة تفوق التوقعات بكل تأكيد!"
            </p>
          </div>

          <div className="premium-card flex flex-col items-center text-center gap-md" style={{ flex: "0 0 100%", scrollSnapAlign: "center", position: "relative", padding: "3rem 2rem" }}>
            <div style={{ position: "absolute", top: "10px", right: "20px", fontSize: "8rem", color: "rgba(197, 160, 89, 0.05)", lineHeight: 1, fontFamily: "serif", zIndex: 0 }}>"</div>
            <div className="flex flex-col items-center text-center" style={{ position: "relative", zIndex: 1 }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--color-bg-body)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-accent)", fontWeight: "bold", border: "2px solid var(--color-accent)", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                  س.خ
                </div>
                <h4 style={{ margin: 0, color: "var(--color-text-main)", fontSize: "1.2rem" }}>سارة الخالد</h4>
                <p style={{ margin: "0.2rem 0", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>مؤسسة متجر إلكتروني</p>
                <div style={{ color: "#FFD700", letterSpacing: "3px", fontSize: "1.3rem", marginTop: "0.5rem" }}>★★★★★</div>
            </div>
            <p style={{ opacity: 0.9, position: "relative", zIndex: 1, margin: 0, lineHeight: 1.8, fontSize: "1.15rem", maxWidth: "800px" }}>
              "خدمة مسك الدفاتر لديهم غيرت طريقة إدارتي لمشروعي. الآن أستطيع اتخاذ قراراتي بناءً على تقارير مالية واضحة ودقيقة. أنصح بهم وبشدة لأي رائد أعمال."
            </p>
          </div>

          <div className="premium-card flex flex-col items-center text-center gap-md" style={{ flex: "0 0 100%", scrollSnapAlign: "center", position: "relative", padding: "3rem 2rem" }}>
            <div style={{ position: "absolute", top: "10px", right: "20px", fontSize: "8rem", color: "rgba(197, 160, 89, 0.05)", lineHeight: 1, fontFamily: "serif", zIndex: 0 }}>"</div>
            <div className="flex flex-col items-center text-center" style={{ position: "relative", zIndex: 1 }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--color-bg-body)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-accent)", fontWeight: "bold", border: "2px solid var(--color-accent)", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                  ع.ع
                </div>
                <h4 style={{ margin: 0, color: "var(--color-text-main)", fontSize: "1.2rem" }}>عبدالله العتيبي</h4>
                <p style={{ margin: "0.2rem 0", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>صاحب سلسلة مطاعم</p>
                <div style={{ color: "#FFD700", letterSpacing: "3px", fontSize: "1.3rem", marginTop: "0.5rem" }}>★★★★★</div>
            </div>
            <p style={{ opacity: 0.9, position: "relative", zIndex: 1, margin: 0, lineHeight: 1.8, fontSize: "1.15rem", maxWidth: "800px" }}>
              "استشاراتهم الضريبية وفرت علينا الكثير من الجهد والمال. فريق عمل متعاون جداً ويرد على استفساراتنا في أسرع وقت. هم حقاً شركاء نجاح يعتمد عليهم."
            </p>
          </div>

        </div>
      </section>

      {/* Call to Action & Contact */}
      <section id="contact" className="container py-xl text-center" style={{ background: "var(--color-bg-card)", borderRadius: "16px", marginBottom: "var(--spacing-xl)", border: "1px solid var(--color-border)" }}>
        <div className="mb-lg">
          <h2 className="text-gold">ابدأ رحلة النجاح المالي معنا</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto var(--spacing-md)" }}>
            احجز استشارتك المجانية اليوم، ودع خبراءنا يرشدونك نحو الاستقرار المالي والنمو المستدام.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1.2rem" }}>تواصل معنا الآن</Link>
        </div>
      </section>
    </div>
  );
}
