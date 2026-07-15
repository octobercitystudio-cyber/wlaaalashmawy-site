import { servicesData } from "@/data/services";
import { sectorsData } from "@/data/sectors";

export async function fetchSettings() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
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
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${apiUrl}/api/services.php`, { 
        cache: 'force-cache',
        signal: controller.signal
    });
    clearTimeout(timeoutId);
    if(res.ok) {
      const data = await res.json();
      if (data && data.length > 0) return data;
    }
  } catch (error) {
    console.error("Failed to fetch services, using fallback:", error);
  }
  // Fallback to static data
  return servicesData.map(s => ({
    id: s.id,
    title: s.title.ar,
    description: s.shortDesc.ar,
    content: s.content.ar,
    image: s.image,
    category: "خدمات"
  }));
}

export async function fetchSectors() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${apiUrl}/api/sectors.php`, { 
        cache: 'force-cache',
        signal: controller.signal
    });
    clearTimeout(timeoutId);
    if(res.ok) {
      const data = await res.json();
      if (data && data.length > 0) return data;
    }
  } catch (error) {
    console.error("Failed to fetch sectors, using fallback:", error);
  }
  // Fallback to static data
  return sectorsData.map(s => ({
    id: s.id,
    title: s.title.ar,
    description: s.shortDesc.ar,
    image: s.image
  }));
}

export async function fetchFeatures() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${apiUrl}/api/features.php`, { 
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
    { id: 1, title: "الخبرة الواسعة", description: "فريق من الخبراء المتخصصين في مختلف المجالات المالية والضريبية", icon: "BadgeCheck" },
    { id: 2, title: "الدقة والموثوقية", description: "نلتزم بأعلى معايير الجودة والدقة في جميع خدماتنا", icon: "Target" },
    { id: 3, title: "حلول متكاملة", description: "نقدم باقة شاملة من الخدمات التي تلبي كافة احتياجات عملائنا", icon: "Layers" },
    { id: 4, title: "الالتزام بالوقت", description: "نقدر وقت عملائنا ونلتزم بتقديم خدماتنا في الوقت المحدد", icon: "Clock" }
  ];
}

export async function fetchStats() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.afc-cpa.com';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
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
    const timeoutId = setTimeout(() => controller.abort(), 3000);
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
