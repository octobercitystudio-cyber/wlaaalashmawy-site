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
