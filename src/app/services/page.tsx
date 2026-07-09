import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/services";

export default function ServicesPage() {
  return (
    <main>
      <section style={{ 
        paddingTop: "12rem", 
        paddingBottom: "5rem", 
        backgroundColor: "var(--color-primary)", 
        color: "#FFFFFF",
        textAlign: "center"
      }}>
        <div className="container">
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#FFFFFF" }}>خدماتنا الاحترافية</h1>
          <div style={{ width: "60px", height: "4px", backgroundColor: "var(--color-accent)", margin: "0 auto 2rem" }}></div>
          <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", opacity: 0.9 }}>
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
