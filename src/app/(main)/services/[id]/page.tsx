import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fetchServices, fetchSettings } from '@/lib/api';

export async function generateStaticParams() {
  const services = await fetchServices();
  return services.map((service: any) => ({
    id: service.id.toString(),
  }));
}

const renderContent = (text: string) => {
  if (!text) return null;
  // Split by double newline to separate paragraphs/sections
  const blocks = text.split('\n\n');
  
  return blocks.map((block, i) => {
    // Main Heading (H3)
    if (block.startsWith('### ')) {
      return (
        <div key={i} style={{ marginTop: "3.5rem", marginBottom: "1.5rem" }}>
          <h3 style={{ color: "var(--color-primary)", fontSize: "1.8rem", display: "flex", alignItems: "center", gap: "0.8rem", fontWeight: "bold" }}>
            <span style={{ width: "6px", height: "28px", backgroundColor: "var(--color-accent)", display: "inline-block", borderRadius: "3px" }}></span>
            {block.replace('### ', '')}
          </h3>
        </div>
      );
    }
    
    // Sub Heading (H4) - Detects blocks that are just bolded text
    if (block.startsWith('**') && block.endsWith('**') && !block.includes('\n')) {
      return (
        <h4 key={i} style={{ color: "var(--color-primary)", marginTop: "2rem", marginBottom: "0.8rem", fontSize: "1.35rem", fontWeight: "bold" }}>
          {block.replace(/\*\*/g, '')}
        </h4>
      );
    }
    
    // Mixed Block (Paragraphs + List)
    if (block.includes('- ')) {
      const lines = block.split('\n');
      const textLines = lines.filter(line => !line.startsWith('- '));
      const listItems = lines.filter(line => line.startsWith('- ')).map(line => line.replace('- ', ''));
      
      return (
        <div key={i} style={{ marginBottom: "2rem" }}>
          {textLines.map((line, j) => {
            if (line.startsWith('**') && line.endsWith('**')) {
               return (
                <h4 key={`text-${j}`} style={{ color: "var(--color-primary)", marginTop: "1rem", marginBottom: "0.8rem", fontSize: "1.35rem", fontWeight: "bold" }}>
                  {line.replace(/\*\*/g, '')}
                </h4>
               );
            }
            const html = line.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--color-primary);">$1</strong>');
            return (
              <p key={`text-${j}`} style={{ marginBottom: "1rem", lineHeight: "2", fontSize: "1.15rem", color: "var(--color-text-muted)", textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: html }} />
            );
          })}
          
          <ul style={{ listStyleType: "none", padding: 0, marginTop: "1rem", marginBottom: "0" }}>
            {listItems.map((item, j) => (
              <li 
                key={`list-${j}`} 
                style={{ 
                  marginBottom: "1rem", 
                  fontSize: "1.1rem", 
                  lineHeight: "1.8", 
                  display: "flex", 
                  alignItems: "flex-start", 
                  gap: "0.8rem",
                  color: "var(--color-text-main)"
                }} 
              >
                <span style={{ color: "var(--color-accent)", marginTop: "6px", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--color-primary);">$1</strong>') }} />
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    // Normal Paragraph
    const html = block.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--color-primary);">$1</strong>').replace(/\n/g, '<br/>');
    return (
      <p 
        key={i} 
        style={{ 
          marginBottom: "1.5rem", 
          lineHeight: "2", 
          fontSize: "1.15rem", 
          color: "var(--color-text-muted)",
          textAlign: "justify"
        }} 
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  });
};

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const services = await fetchServices();
  const settings = await fetchSettings();
  const service = services.find((s: any) => s.id.toString() === id);

  if (!service) {
    notFound();
  }

  const title = service.title;
  const content = service.content;
  const shortDesc = service.description;
  const whatsappNum = settings.contact_whatsapp || '201155729429';

  return (
    <main style={{ backgroundColor: "var(--color-bg-body)" }}>
      {/* Service Hero */}
      <section style={{ 
        paddingTop: "12rem", 
        paddingBottom: "8rem", 
        color: "#FFFFFF",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {service.image && (
          <>
            <Image src={service.image} alt={title} fill style={{ objectFit: "cover", zIndex: 0 }} priority />
            {/* Dark Overlay */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.55)",
              zIndex: 1
            }}></div>
          </>
        )}

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem", color: "#FFFFFF", fontWeight: "bold", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{title}</h1>
          <p style={{ fontSize: "1.3rem", maxWidth: "800px", margin: "0 auto 2.5rem", color: "rgba(255,255,255,0.95)", lineHeight: "1.8", textShadow: "0 2px 5px rgba(0,0,0,0.5)" }}>
            {shortDesc}
          </p>
          <div style={{ width: "80px", height: "4px", backgroundColor: "var(--color-accent)", margin: "0 auto", boxShadow: "0 2px 5px rgba(0,0,0,0.3)" }}></div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-xl" style={{ backgroundColor: "var(--color-bg-body)", position: "relative", zIndex: 10 }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          <div style={{ padding: "0", marginTop: "1rem" }}>
            {renderContent(content)}
          </div>
          
          {/* Action Area */}
          <div style={{ marginTop: "4rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary)", fontWeight: "bold" }}>هل تبحث عن استشارة مخصصة لأعمالك؟</h3>
            <div className="flex gap-md justify-center">
              <a href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن خدمات مكتب العشماوي.")}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1.1rem" }}>
                تواصل معنا الآن
              </a>
              <Link href="/services" className="btn btn-secondary" style={{ padding: "1rem 2.5rem", fontSize: "1.1rem" }}>
                العودة للخدمات
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
