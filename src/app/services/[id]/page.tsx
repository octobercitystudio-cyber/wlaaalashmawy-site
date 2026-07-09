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
    // Heading
    if (block.startsWith('### ')) {
      return (
        <h3 key={i} style={{ color: "var(--color-accent)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.6rem" }}>
          {block.replace('### ', '')}
        </h3>
      );
    }
    
    // Bulleted List
    if (block.includes('- ')) {
      const listItems = block.split('\n').filter(line => line.startsWith('- ')).map(line => line.replace('- ', ''));
      return (
        <ul key={i} style={{ listStyleType: "disc", paddingRight: "1.5rem", marginBottom: "1.5rem" }}>
          {listItems.map((item, j) => (
            <li 
              key={j} 
              style={{ marginBottom: "0.5rem", fontSize: "1.1rem", lineHeight: "1.8" }} 
              dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} 
            />
          ))}
        </ul>
      );
    }
    
    // Normal Paragraph
    const html = block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
    return (
      <p 
        key={i} 
        style={{ marginBottom: "1.5rem", lineHeight: "1.9", fontSize: "1.1rem", color: "var(--color-text-muted)" }} 
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  });
};

export default function ServicePage({ params }: { params: { id: string } }) {
  const service = servicesData.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  // Assuming Arabic by default for now. Later this will be dynamic.
  const currentLang = "ar"; 
  const title = service.title[currentLang];
  const content = service.content[currentLang];

  return (
    <main>
      {/* Service Hero */}
      <section style={{ 
        paddingTop: "12rem", 
        paddingBottom: "5rem", 
        backgroundColor: "var(--color-primary)", 
        color: "#FFFFFF",
        textAlign: "center"
      }}>
        <div className="container">
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#FFFFFF" }}>{title}</h1>
          <div style={{ width: "60px", height: "4px", backgroundColor: "var(--color-accent)", margin: "0 auto 2rem" }}></div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-xl">
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="premium-card" style={{ padding: "3rem" }}>
            {renderContent(content)}
          </div>
          
          {/* Back Button */}
          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Link href="/services" className="btn btn-secondary">
              العودة للخدمات
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
