import Link from "next/link";
import Image from "next/image";
import { fetchSectors } from '@/lib/api';

import { Lang } from "@/lib/dictionary";

export default async function SectorsPage({ lang = "ar" }: { lang?: Lang }) {
  const sectors = await fetchSectors();
  
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
        <Image src="/images/services_hero.jpg" alt="" fill style={{ objectFit: "cover", zIndex: 0 }} priority />
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
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", color: "#FFFFFF", fontWeight: "bold", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            {lang === "en" ? "Business Sectors" : "قطاعات الأعمال"}
          </h1>
          <div style={{ width: "80px", height: "4px", backgroundColor: "var(--color-accent)", margin: "0 auto 2rem", boxShadow: "0 2px 5px rgba(0,0,0,0.3)" }}></div>
          <p style={{ fontSize: "1.3rem", maxWidth: "800px", margin: "0 auto", color: "rgba(255,255,255,0.95)", lineHeight: "1.8", textShadow: "0 2px 5px rgba(0,0,0,0.5)", fontWeight: "700" }}>
            {lang === "en" 
              ? "We provide deep expertise and specialized financial solutions tailored to meet the unique requirements of various business sectors." 
              : "نقدم خبراتنا المتخصصة وحلولاً مالية مصممة خصيصاً لتلبية التحديات والمتطلبات الفريدة لمختلف قطاعات الأعمال."}
          </p>
        </div>
      </section>

      <section className="py-xl" style={{ backgroundColor: "var(--color-bg-body)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md-grid-cols-3 gap-lg">
            {sectors.map((sector: any) => {
              return (
                <div key={sector.id} className="premium-card text-center" style={{ background: "var(--color-bg-card)", border: "2px solid var(--color-accent)", display: "flex", flexDirection: "column", padding: 0, overflow: "hidden" }}>
                  <div style={{ position: "relative", width: "100%", height: "220px" }}>
                    <Image src={sector.image || '/images/sectors/real_estate.jpg'} alt={lang === "en" && sector.title_en ? sector.title_en : sector.title} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "1.8rem 1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "var(--spacing-sm)", color: "var(--color-primary)", fontWeight: "bold" }}>{lang === "en" && sector.title_en ? sector.title_en : sector.title}</h3>
                    <p style={{ margin: 0, flexGrow: 1, color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.8" }}>{lang === "en" && sector.description_en ? sector.description_en : sector.description}</p>
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
