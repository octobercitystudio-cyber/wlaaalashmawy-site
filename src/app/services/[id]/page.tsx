import { servicesData } from "@/data/services";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    id: service.id,
  }));
}

const renderContent = (text: string) => {
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
    
    // Bulleted List with Checkmarks
    if (block.includes('- ')) {
      const listItems = block.split('\n').filter(line => line.startsWith('- ')).map(line => line.replace('- ', ''));
      return (
        <ul key={i} style={{ listStyleType: "none", padding: 0, marginBottom: "2rem" }}>
          {listItems.map((item, j) => (
            <li 
              key={j} 
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
  const service = servicesData.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  // Assuming Arabic by default for now. Later this will be dynamic.
  const currentLang = "ar"; 
  const title = service.title[currentLang];
  const content = service.content[currentLang];
  const shortDesc = service.shortDesc[currentLang];

  return (
    <main style={{ backgroundColor: "var(--color-bg-body)" }}>
      {/* Service Hero */}
      <section style={{ 
        paddingTop: "12rem", 
        paddingBottom: "6rem", 
        backgroundColor: "var(--color-primary)", 
        color: "#FFFFFF",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Abstract Background Element */}
        <div style={{
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(0,91,171,0.4) 0%, rgba(26,26,26,0) 70%)",
          borderRadius: "50%",
          zIndex: 0
        }}></div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem", color: "#FFFFFF", fontWeight: "bold" }}>{title}</h1>
          <p style={{ fontSize: "1.3rem", maxWidth: "800px", margin: "0 auto 2.5rem", color: "rgba(255,255,255,0.85)", lineHeight: "1.8" }}>
            {shortDesc}
          </p>
          <div style={{ width: "80px", height: "4px", backgroundColor: "var(--color-accent)", margin: "0 auto" }}></div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-xl" style={{ marginTop: "-2rem", position: "relative", zIndex: 10 }}>
        <div className="container">
          <div className="premium-card" style={{ padding: "4rem 2rem", backgroundColor: "#FFFFFF", boxShadow: "0 20px 40px rgba(0,0,0,0.05)", borderRadius: "16px" }}>
            {renderContent(content)}
          </div>
          
          {/* Action Area */}
          <div style={{ marginTop: "4rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary)", fontWeight: "bold" }}>هل تبحث عن استشارة مخصصة لأعمالك؟</h3>
            <div className="flex gap-md justify-center">
              <Link href="/contact" className="btn btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1.1rem" }}>
                تواصل معنا الآن
              </Link>
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
