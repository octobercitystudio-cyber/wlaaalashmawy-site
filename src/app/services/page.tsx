import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/services";

export default function ServicesPage() {
  return (
    <main>
      <section style={{ 
        paddingTop: "12rem", 
        paddingBottom: "8rem", 
        color: "#FFFFFF",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <Image src="/images/services_hero.jpg" alt="خدماتنا الاحترافية" fill style={{ objectFit: "cover", zIndex: 0 }} priority />
        {/* Dark Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", color: "#FFFFFF", fontWeight: "bold", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>خدماتنا الاحترافية</h1>
          <div style={{ width: "80px", height: "4px", backgroundColor: "var(--color-accent)", margin: "0 auto 2rem", boxShadow: "0 2px 5px rgba(0,0,0,0.3)" }}></div>
          <p style={{ fontSize: "1.3rem", maxWidth: "800px", margin: "0 auto", color: "rgba(255,255,255,0.95)", lineHeight: "1.8", textShadow: "0 2px 5px rgba(0,0,0,0.5)" }}>
            نقدم مجموعة متكاملة من الخدمات المالية والمحاسبية والضريبية والمؤسسية لتلبية كافة احتياجات أعمالك وضمان نموها المستدام.
          </p>
        </div>
      </section>

      <section className="py-xl" style={{ backgroundColor: "var(--color-bg-body)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md-grid-cols-3 gap-lg">
            {servicesData.map((service) => {
              return (
                <div key={service.id} className="premium-card text-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", padding: 0, overflow: "hidden" }}>
                  <div style={{ position: "relative", width: "100%", height: "200px" }}>
                    <Image src={service.image} alt={service.title.ar} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <h3 style={{ fontSize: "1.3rem", marginBottom: "var(--spacing-sm)", color: "var(--color-primary)", fontWeight: "bold" }}>{service.title.ar}</h3>
                    <p style={{ marginBottom: "var(--spacing-md)", flexGrow: 1, color: "var(--color-text-muted)", fontSize: "0.95rem" }}>{service.shortDesc.ar}</p>
                    <Link href={`/services/${service.id}`} className="btn btn-secondary" style={{ width: "100%", padding: "0.8rem", marginTop: "auto" }}>
                      عرض التفاصيل
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
