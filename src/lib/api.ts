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
        return data.map((item: any) => {
          const fallback = servicesData[Number(item.id) - 1];
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
        return data.map((item: any) => {
          const fallback = sectorsData[Number(item.id) - 1];
          if (fallback) {
            item.title_en = item.title_en || fallback.title.en;
            item.description_en = item.description_en || fallback.shortDesc.en;
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
  } catch {}
  
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
  } catch {}
  
  return [
    { id: 1, title: "عام التأسيس", title_en: "Founded", value: "2024" },
    { id: 2, title: "خدمات متخصصة", title_en: "Specialized Services", value: "8" },
    { id: 3, title: "قطاعًا نخدمه", title_en: "Sectors Served", value: "11" },
    { id: 4, title: "لغات الموقع", title_en: "Website Languages", value: "2" }
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
      if (Array.isArray(data)) {
        return data.filter(
          (item: any) =>
            item.is_verified === true ||
            item.is_verified === 1 ||
            item.is_verified === "1",
        );
      }
    }
  } catch {}
  
  // Testimonials are trust claims, so do not invent placeholders when the CMS
  // is unavailable.
  return [];
}
