import Link from "next/link";
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
            {servicesData.map((service, idx) => {
              // Assigning a unique icon for each service based on index
              const icons = ["📊", "💼", "📝", "🔍", "🏢", "🏭", "🛂"];
              return (
                <div key={service.id} className="premium-card text-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column" }}>
                  <div style={{ width: "80px", height: "80px", background: "var(--gold-gradient-subtle)", borderRadius: "50%", margin: "0 auto var(--spacing-md)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", fontSize: "2rem" }}>
                    {icons[idx % icons.length]}
                  </div>
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--spacing-sm)", color: "var(--color-primary)" }}>{service.title.ar}</h3>
                  <p style={{ marginBottom: "var(--spacing-md)", flexGrow: 1, color: "var(--color-text-muted)" }}>{service.shortDesc.ar}</p>
                  <Link href={`/services/${service.id}`} className="btn btn-secondary" style={{ width: "100%", padding: "0.8rem", marginTop: "auto" }}>
                    عرض التفاصيل
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
