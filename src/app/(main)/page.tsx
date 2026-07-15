import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ServicesCarousel from "@/components/ServicesCarousel";
import AnimatedStat from "@/components/AnimatedStat";

import { fetchSettings, fetchServices, fetchFeatures, fetchStats, fetchTestimonials } from '@/lib/api';

export default async function Home() {
  const settings = await fetchSettings();
  const services = await fetchServices();
  const features = await fetchFeatures();
  const stats = await fetchStats();
  const testimonials = await fetchTestimonials();

  return (
    <div className="animate-fade-in" style={{ flex: 1 }}>
      {/* Hero Section */}
      <HeroSlider settings={settings} />

      {/* Stats Section */}
      <section style={{ padding: "var(--spacing-lg) 0", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-card)" }}>
        <div className="container grid grid-cols-1 md-grid-cols-4 gap-lg">
          {stats.slice(0, 4).map((stat: any, index: number) => {
            const numericValue = parseInt(stat.value.replace(/[^0-9]/g, '')) || 0;
            const suffix = stat.value.replace(/[0-9]/g, '');
            return (
              <AnimatedStat key={stat.id || index} target={numericValue} suffix={suffix} labelLines={stat.title} />
            );
          })}
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
              {settings.about_short || "نحن لا نقدم أرقاماً فحسب، بل نقدم رؤية مالية عميقة. من خلال أحدث المنهجيات والتقنيات المحاسبية، نضمن لك الأمان المالي والدقة المتناهية."}
            </p>
            <ul className="flex flex-col gap-sm" style={{ marginTop: "var(--spacing-md)" }}>
              {features.map((feature: any, index: number) => (
                <li key={feature.id || index} className="flex items-center gap-sm" style={{ fontSize: "1.1rem" }}>
                  <span className="text-gold" style={{ fontWeight: "bold" }}>✦</span> {feature.title}: {feature.description}
                </li>
              ))}
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
          
          {testimonials.map((testi: any, index: number) => {
            const initials = testi.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2);
            return (
              <div key={testi.id || index} className="premium-card flex flex-col items-center text-center gap-md" style={{ flex: "0 0 100%", scrollSnapAlign: "center", position: "relative", padding: "3rem 2rem" }}>
                <div style={{ position: "absolute", top: "10px", right: "20px", fontSize: "8rem", color: "rgba(197, 160, 89, 0.05)", lineHeight: 1, fontFamily: "serif", zIndex: 0 }}>"</div>
                <div className="flex flex-col items-center text-center" style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--color-bg-body)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-accent)", fontWeight: "bold", border: "2px solid var(--color-accent)", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                      {initials}
                    </div>
                    <h4 style={{ margin: 0, color: "var(--color-text-main)", fontSize: "1.2rem" }}>{testi.name}</h4>
                    <p style={{ margin: "0.2rem 0", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>{testi.position}</p>
                    <div style={{ color: "#FFD700", letterSpacing: "3px", fontSize: "1.3rem", marginTop: "0.5rem" }}>
                      {'★'.repeat(testi.rating || 5)}{'☆'.repeat(5 - (testi.rating || 5))}
                    </div>
                </div>
                <p style={{ opacity: 0.9, position: "relative", zIndex: 1, margin: 0, lineHeight: 1.8, fontSize: "1.15rem", maxWidth: "800px" }}>
                  "{testi.content}"
                </p>
              </div>
            );
          })}

        </div>
      </section>

      {/* Call to Action & Contact */}
      <section id="contact" className="container py-xl text-center" style={{ background: "var(--color-bg-card)", borderRadius: "16px", marginBottom: "var(--spacing-xl)", border: "1px solid var(--color-border)" }}>
        <div className="mb-lg">
          <h2 className="text-gold">ابدأ رحلة النجاح المالي معنا</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto var(--spacing-md)" }}>
            احجز استشارتك المجانية اليوم، ودع خبراءنا يرشدونك نحو الاستقرار المالي والنمو المستدام.
          </p>
          <a href={settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=مرحباً،%20أود%20الاستفسار%20عن%20خدمات%20مكتب%20العشماوي.` : "https://wa.me/201155729429?text=مرحباً،%20أود%20الاستفسار%20عن%20خدمات%20مكتب%20العشماوي."} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1.2rem" }}>تواصل معنا الآن</a>
        </div>
      </section>
    </div>
  );
}
