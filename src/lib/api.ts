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
    { id: 1, title: "سنوات من الخبرة", title_en: "Years of Experience", value: "+15" },
    { id: 2, title: "عملاء نخدمهم", title_en: "Clients Served", value: "+500" },
    { id: 3, title: "خبير استشاري", title_en: "Expert Consultants", value: "+50" },
    { id: 4, title: "نسبة رضا العملاء", title_en: "Client Satisfaction", value: "100%" }
  ];
}

export async function fetchTestimonials() {
  const staticTestimonials = [
    {
      id: "t1",
      name: "أ/ جابر إبراهيم عبد الفتاح",
      name_en: "Mr. Jaber Ibrahim Abdel Fattah",
      position: "رئيس مجلس الإدارة - شركة الربوة للاستثمار الزراعي والتصنيع الغذائي",
      position_en: "Chairman - Al-Rabwa for Agricultural Investment & Food Processing",
      content: "مكتب AFC هو الشريك الاستراتيجي الحقيقي لنجاحنا. بفضل المتابعة والاحترافية من الأستاذة ولاء العشماوي وفريقها، أنهينا كافة إجراءات وتراخيص المصنع في وقت قياسي وبسلاسة تامة. ننصح بالتعامل معهم بشدة!",
      content_en: "AFC Firm is the true strategic partner behind our success. Thanks to the continuous follow-up and professionalism of Ms. Walaa and her team, we completed all factory procedures and licensing in record time and with total ease. We highly recommend working with them.",
      rating: 5,
      image: "/images/clients/al-rabwa.png"
    },
    {
      id: "t2",
      name: "أ/ محمود جمال",
      name_en: "Mr. Mahmoud Gamal",
      position: "رئيس مجلس الإدارة - شركة أبكس إم جي للمقاولات العامة",
      position_en: "Chairman - Apex MG for General Contracting",
      content: "في مجال المقاولات، الوقت والدقة هما أساس كل شيء. مكتب AFC بقيادة الأستاذة ولاء العشماوي وفريقها، قدّم لنا نموذجاً استثنائياً في السرعة والانضباط؛ أنهوا لنا كافة الإجراءات والتأسيس بدقة متناهية وبدون أي تعقيدات. سند حقيقي وأمان قانوني لكل مستثمر.",
      content_en: "In the contracting sector, time and accuracy are everything. AFC Firm, led by Ms. Walaa El-Ashmawy, provided us with an exceptional example of speed and discipline. They finalized all our incorporation procedures with utmost precision and zero complications. A true pillar of support and legal peace of mind for any investor.",
      rating: 5
    },
    {
      id: "t3",
      name: "أ/ محمد شمس الدين",
      name_en: "Mr. Mohamed Shams El-Din",
      position: "رئيس مجلس الإدارة - شركة بيوندرا للتجارة",
      position_en: "Chairman - Beyondra Trading",
      content: "كمستثمر أجنبي في مجال تجارة الجملة والتجزئة، كانت إجراءات الإقامة والتراخيص تشكل تحدياً كبيراً بالنسبة لي. بفضل الله ثم الدعم الاحترافي من الأستاذة ولاء العشماوي وفريق مكتب AFC، تم حل كافة العقبات وإنهاء إجراءات الإقامة والورقيات بسلاسة وأمان تام. خيار استثماري يضمن لك راحة البال في مصر.",
      content_en: "As a foreign investor in the wholesale and retail sector, handling residency procedures and licensing was a major challenge for me. Thanks to God, and then the professional support of Ms. Walaa El-Ashmawy and the AFC team, all obstacles were overcome, and my residency and legal paperwork were finalized smoothly and with complete peace of mind. Truly an investment partner that guarantees total peace of mind in Egypt.",
      rating: 5
    },
    {
      id: "t4",
      name: "م/ محمد إسماعيل",
      name_en: "Eng. Mohamed Ismail",
      position: "شركة راجنور للمقاولات العامة",
      position_en: "Ragnor General Contracting",
      content: "واجهتنا صعوبات كثيرة أثناء مرحلة التأسيس، ولكن مع مكتب AFC، كانت الحلول دائماً حاضرة. الأستاذة ولاء العشماوي وفريقها أثبتوا خبرة عالية في التعامل مع كافة المعاملات المعقدة حتى اكتمل تأسيس شركتنا بنجاح. كل الشكر والتقدير لجهودكم الملموسة.",
      content_en: "We faced numerous challenges during the incorporation stage, but with AFC Firm, solutions were always at hand. Ms. Walaa El-Ashmawy and her team demonstrated deep expertise in handling complex procedures until our company was successfully established. Sincere thanks and appreciation for your tangible efforts.",
      rating: 5
    },
    {
      id: "t5",
      name: "م/ إسلام عماد",
      name_en: "Eng. Islam Emad",
      position: "شركة الثلاثية لتشغيل المعادن",
      position_en: "Al-Tholathia for Metal Machining",
      content: "القطاع الصناعي وتشغيل المعادن يتطلب دقة واحترافية متكاملة في المعاملات المالية والقانونية. بفضل الله ثم الدعم الكبير من الأستاذة ولاء العشماوي وفريق مكتب AFC، تم حل كافة العقبات وإنهاء إجراءات التأسيس والتراخيص بكل سلاسة وبأعلى درجات الكفاءة. شريك نجاح حقيقي نعتز به.",
      content_en: "The industrial and metal machining sector requires total precision and professionalism in financial and legal matters. Thanks to God, and then the incredible support of Ms. Walaa El-Ashmawy and the AFC team, all obstacles were resolved, and our incorporation and licensing procedures were completed smoothly and with the highest level of efficiency. Truly a valued success partner!",
      rating: 5
    }
  ];

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
        const apiTestimonials = data.filter(
          (item: any) =>
            item.is_verified === true ||
            item.is_verified === 1 ||
            item.is_verified === "1",
        );
        return [...staticTestimonials, ...apiTestimonials];
      }
    }
  } catch {}
  
  return staticTestimonials;
}
