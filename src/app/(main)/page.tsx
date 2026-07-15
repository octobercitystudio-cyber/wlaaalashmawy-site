import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ServicesCarousel from "@/components/ServicesCarousel";
import AnimatedStat from "@/components/AnimatedStat";

import { fetchSettings, fetchServices } from '@/lib/api';

export default async function Home() {
  const settings = await fetchSettings();
  const services = await fetchServices();

  return (
    <div className="animate-fade-in" style={{ flex: 1 }}>
      {/* Hero Section */}
      <HeroSlider settings={settings} />

      {/* Stats Section */}
      <section style={{ padding: "var(--spacing-lg) 0", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-card)" }}>
        <div className="container grid grid-cols-1 md-grid-cols-4 gap-lg">
          <AnimatedStat target={15} suffix="+" labelLines="سنوات التميز" />
          <AnimatedStat target={500} suffix="+" labelLines="عميل موثوق" />
          <AnimatedStat target={1000} suffix="+" displayAsK={true} labelLines="استشارة ناجحة" />
          <AnimatedStat target={100} suffix="%" labelLines="دقة وشفافية" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container py-xl">
        <div className="text-center mb-lg">
          <h2 className="text-gold">خدماتنا الاحترافية</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>رؤية مالية واضحة وحلول استراتيجية مصممة خصيصاً لتلبي تطلعات أعمالك.</p>
        </div>
        <ServicesCarousel services={services} />
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
          <div className="premium-card flex justify-center items-center" style={{ minHeight: "350px", padding: 0, overflow: "hidden", position: "relative", border: "2px solid var(--color-accent)" }}>
            <Image 
              src="/images/afc_office.jpg" 
              alt="مقر شركة AFC" 
              fill 
              style={{ objectFit: "cover" }} 
            />
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
          <a href="https://wa.me/201155729429?text=مرحباً،%20أود%20الاستفسار%20عن%20خدمات%20مكتب%20العشماوي." target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1.2rem" }}>تواصل معنا الآن</a>
        </div>
      </section>
    </div>
  );
}
