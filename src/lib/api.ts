import { servicesData } from "@/data/services";
import { sectorsData } from "@/data/sectors";

export async function fetchSettings() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`${apiUrl}/api/settings.php`, { 
        cache: 'force-cache',
        signal: controller.signal
    });
    clearTimeout(timeoutId);
    if(res.ok) return await res.json();
    return {};
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return {};
  }
  return {};
}

export async function fetchServices() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`${apiUrl}/api/services.php`, { 
        cache: 'force-cache',
        signal: controller.signal
    });
    clearTimeout(timeoutId);
    if(res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        return data.map((item: any, index: number) => {
          const fallback = servicesData[index];
          if (fallback) {
            item.title_en = item.title_en || fallback.title.en;
            item.description_en = item.description_en || fallback.shortDesc.en;
            item.content_en = item.content_en || (fallback.content ? fallback.content.en : '');
          }
          return item;
        });
      }
    }
  } catch (error) {
    console.error("Failed to fetch services, using fallback:", error);
  }
  // Fallback to static data
  return servicesData.map((s, index) => ({
    id: (index + 1).toString(),
    title: s.title.ar,
    title_en: s.title.en,
    description: s.shortDesc.ar,
    description_en: s.shortDesc.en,
    content: s.content.ar,
    content_en: s.content.en,
    image: s.image,
    category: "خدمات"
  }));
}

export async function fetchSectors() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`${apiUrl}/api/sectors.php`, { 
        cache: 'force-cache',
        signal: controller.signal
    });
    clearTimeout(timeoutId);
    if(res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        return data.map((item: any, index: number) => {
          const fallback = sectorsData[index];
          if (fallback) {
            item.title_en = item.title_en || fallback.title.en;
            item.description_en = item.description_en || fallback.shortDesc.en;
            item.content_en = item.content_en || (fallback.content ? fallback.content.en : '');
          }
          return item;
        });
      }
    }
  } catch (error) {
    console.error("Failed to fetch sectors, using fallback:", error);
  }
  // Fallback to static data
  return sectorsData.map(s => ({
    id: s.id,
    title: s.title.ar,
    title_en: s.title.en,
    description: s.shortDesc.ar,
    description_en: s.shortDesc.en,
    image: s.image
  }));
}

export async function fetchFeatures() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com';
  const englishFallback: any = {
    1: { title_en: "Extensive Experience", description_en: "A team of specialized experts in various financial and tax fields." },
    2: { title_en: "Accuracy & Reliability", description_en: "We adhere to the highest standards of quality and precision in all our services." },
    3: { title_en: "Comprehensive Solutions", description_en: "We provide a comprehensive suite of services that meet all our clients' needs." },
    4: { title_en: "Punctuality", description_en: "We value our clients' time and are committed to delivering our services on schedule." }
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`${apiUrl}/api/features.php`, { 
        cache: 'force-cache',
        signal: controller.signal
    });
    clearTimeout(timeoutId);
    if(res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item: any) => {
          const fb = englishFallback[item.id];
          if (fb) {
            item.title_en = item.title_en || fb.title_en;
            item.description_en = item.description_en || fb.description_en;
          }
          return item;
        });
      }
    }
  } catch (error) {}
  
  return [
    { id: 1, title: "الخبرة الواسعة", title_en: "Extensive Experience", description: "فريق من الخبراء المتخصصين في مختلف المجالات المالية والضريبية", description_en: "A team of specialized experts in various financial and tax fields.", icon: "BadgeCheck" },
    { id: 2, title: "الدقة والموثوقية", title_en: "Accuracy & Reliability", description: "نلتزم بأعلى معايير الجودة والدقة في جميع خدماتنا", description_en: "We adhere to the highest standards of quality and precision in all our services.", icon: "Target" },
    { id: 3, title: "حلول متكاملة", title_en: "Comprehensive Solutions", description: "نقدم باقة شاملة من الخدمات التي تلبي كافة احتياجات عملائنا", description_en: "We provide a comprehensive suite of services that meet all our clients' needs.", icon: "Layers" },
    { id: 4, title: "الالتزام بالوقت", title_en: "Punctuality", description: "نقدر وقت عملائنا ونلتزم بتقديم خدماتنا في الوقت المحدد", description_en: "We value our clients' time and are committed to delivering our services on schedule.", icon: "Clock" }
  ];
}

export async function fetchStats() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`${apiUrl}/api/stats.php`, { 
        cache: 'force-cache',
        signal: controller.signal
    });
    clearTimeout(timeoutId);
    if(res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (error) {}
  
  return [
    { id: 1, title: "سنوات الخبرة", value: "+15" },
    { id: 2, title: "عميل سعيد", value: "+500" },
    { id: 3, title: "مشروع ناجح", value: "+1000" },
    { id: 4, title: "خبير مالي", value: "+50" }
  ];
}

export async function fetchTestimonials() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(`${apiUrl}/api/testimonials.php`, { 
        cache: 'force-cache',
        signal: controller.signal
    });
    clearTimeout(timeoutId);
    if(res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (error) {}
  
  return [
    { id: 1, name: "أحمد محمود", position: "المدير التنفيذي لشركة الأفق", content: "خدمات احترافية وفريق عمل متميز، ساعدونا كثيراً في تحسين الكفاءة المالية لشركتنا.", rating: 5 },
    { id: 2, name: "محمد علي", position: "رئيس مجلس إدارة مجموعة النور", content: "استشاراتهم الضريبية وفرت علينا الكثير من الوقت والجهد، شكراً لكم.", rating: 5 },
    { id: 3, name: "سارة حسن", position: "مديرة الحسابات في شركة القمة", content: "دقة في المواعيد واحترافية في التعامل، نعتمد عليهم في كافة أعمالنا المالية.", rating: 5 }
  ];
}
