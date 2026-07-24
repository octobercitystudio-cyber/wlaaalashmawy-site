"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EditableText } from "@/components/editor/EditableText";

const slugToIdMap: Record<string, number> = {
  'accounting-services': 1,
  'audit-services': 2,
  'tax-services': 3,
  'bookkeeping': 4,
  'payroll': 5,
  'company-formation': 6,
  'financial-consulting': 7,
  'ifrs': 8,
  'vat-services': 9,
  'e-invoice': 10,
  'e-receipt': 11,
  'internal-audit': 12
};

export default function ServiceClientPage({ lang = "ar", slug }: { lang?: "ar" | "en", slug: string }) {
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = slugToIdMap[slug];
    if (!id) {
      setLoading(false);
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    fetch(`${apiUrl}/api/services.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch service details", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="loader" style={{ width: "50px", height: "50px", border: "5px solid #f3f3f3", borderTop: "5px solid var(--color-accent)", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
        <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
      </main>
    );
  }

  if (!service) {
    return (
      <main style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <h1>{lang === 'en' ? 'Service not found' : 'الخدمة غير موجودة'}</h1>
        <Link href={lang === 'en' ? '/en/services' : '/services'} className="btn btn-primary mt-md">
          {lang === 'en' ? 'Back to Services' : 'العودة للخدمات'}
        </Link>
      </main>
    );
  }

  const title = lang === "en" && service.title_en ? service.title_en : service.title;
  const description = lang === "en" && service.description_en ? service.description_en : service.description;

  return (
    <main>
      <section style={{ 
        paddingTop: "12rem", 
        paddingBottom: "5rem", 
        backgroundColor: "var(--color-primary)", 
        color: "#FFFFFF",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", color: "#FFFFFF", fontWeight: "bold" }}>
            <EditableText 
              id={lang === "en" ? `service_title_en_${service.id}` : `service_title_${service.id}`}
              value={title}
              table="services"
              entityId={service.id}
              field={lang === "en" ? "title_en" : "title"}
            />
          </h1>
          <div style={{ width: "80px", height: "4px", backgroundColor: "var(--color-accent)", margin: "0 auto 2rem" }}></div>
        </div>
      </section>

      <section className="py-xl" style={{ backgroundColor: "var(--color-bg-body)" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          
          <div style={{ position: "relative", width: "100%", height: "400px", borderRadius: "16px", overflow: "hidden", marginBottom: "3rem", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
            <Image 
              src={service.image || '/images/services/accounting.jpg'} 
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="premium-card" style={{ padding: "3rem" }}>
            <h2 style={{ fontSize: "2rem", color: "var(--color-primary)", marginBottom: "1.5rem", fontWeight: "bold" }}>
              {lang === "en" ? "Service Overview" : "نظرة عامة على الخدمة"}
            </h2>
            <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "var(--color-text-main)", marginBottom: "2.5rem", opacity: 0.9 }}>
              <EditableText 
                id={lang === "en" ? `service_desc_en_${service.id}` : `service_desc_${service.id}`}
                value={description}
                table="services"
                entityId={service.id}
                field={lang === "en" ? "description_en" : "description"}
                as="span"
              />
            </p>

            <h2 style={{ fontSize: "2rem", color: "var(--color-primary)", marginBottom: "1.5rem", fontWeight: "bold" }}>
              {lang === "en" ? "Service Details" : "تفاصيل الخدمة"}
            </h2>
            <div style={{ fontSize: "1.1rem", lineHeight: "2", color: "var(--color-text-muted)" }}>
              <EditableText 
                id={lang === "en" ? `service_content_en_${service.id}` : `service_content_${service.id}`}
                value={(lang === "en" ? service.content_en : service.content) || (lang === "en" ? "Detailed content coming soon." : "التفاصيل الدقيقة للخدمة قريباً.")}
                table="services"
                entityId={service.id}
                field={lang === "en" ? "content_en" : "content"}
                isHtml={true}
                as="div"
              />
            </div>
            
            <div style={{ marginTop: "3rem", textAlign: "center" }}>
              <Link href={lang === "en" ? "/en/contact" : "/contact"} className="btn btn-primary" style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}>
                {lang === "en" ? "Request This Service" : "اطلب هذه الخدمة"}
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
