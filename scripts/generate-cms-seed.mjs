import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function extractArray(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Missing seed marker: ${marker}`);
  const start = source.indexOf("[", markerIndex);
  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (escaped) { escaped = false; continue; }
    if (char === "\\") { escaped = true; continue; }
    if (quote) {
      if (char === quote) quote = "";
      continue;
    }
    if (char === '"' || char === "'" || char === "`") { quote = char; continue; }
    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error(`Unclosed seed array: ${marker}`);
}

const articlesSource = await readFile(join(root, "src/data/staticArticles.ts"), "utf8");
const apiSource = await readFile(join(root, "src/lib/api.ts"), "utf8");
const articles = Function(`"use strict"; return (${extractArray(articlesSource, "export const staticArticles")});`)();
const testimonials = Function(`"use strict"; return (${extractArray(apiSource, "const staticTestimonials")});`)();
const settings = {
  site_logo: "/afc-wordmark.png",
  home_about_image: "/images/wlaa-office.jpg",
  about_hero_image: "/images/about_us_hero.jpg",
  about_profile_image: "/images/wlaa-profile.jpg",
  contact_hero_image: "/images/contact_hero.jpg",
  services_hero_image: "/images/services_hero.jpg",
  sectors_hero_image: "/images/services_hero.jpg",
  hero_slide_1_image: "/hero_egypt.jpg",
  hero_slide_2_image: "/hero_ksa.jpg",
  hero_slide_3_image: "/hero_uae.jpg",
  hero_slide_1_title: "خبرة مهنية راسخة في السوق المصري",
  hero_slide_1_title_en: "Professional Expertise Rooted in Egypt",
  hero_slide_1_subtitle: "تقدم AFC حلولًا عملية في المحاسبة والمراجعة والضرائب، مصممة لاحتياجات الشركات والمستثمرين العاملين في مصر.",
  hero_slide_1_subtitle_en: "AFC provides practical accounting, audit and tax solutions tailored to the needs of businesses and investors operating in Egypt.",
  hero_slide_2_title: "جاهزية مالية تدعم التوسع الإقليمي",
  hero_slide_2_title_en: "Financial Readiness for Regional Expansion",
  hero_slide_2_subtitle: "نساعد الشركات على تقوية السجلات والتقارير والتخطيط قبل التوسع إقليميًا، مع تنفيذ المتطلبات الخاصة بكل دولة بالتعاون مع المختصين المرخصين عند الحاجة.",
  hero_slide_2_subtitle_en: "We help businesses strengthen records, reporting and planning before regional expansion, while jurisdiction-specific work is handled with licensed local specialists where required.",
  hero_slide_3_title: "تقارير أوضح لقرارات أفضل",
  hero_slide_3_title_en: "Clearer Reporting for Better Decisions",
  hero_slide_3_subtitle: "تمنح المعلومات المالية الموثوقة الإدارة والمستثمرين أساسًا أقوى لتقييم الفرص وإدارة النمو.",
  hero_slide_3_subtitle_en: "Reliable financial information gives management and investors a stronger foundation for evaluating opportunities and managing growth.",
  home_services_title: "الخدمات المحاسبية",
  home_services_title_en: "Our Services",
  home_services_subtitle: "نقدم مجموعة واسعة وشاملة من الخدمات المحاسبية لتلبية كافة احتياجات أعمالك.",
  home_services_subtitle_en: "We offer a comprehensive set of accounting services tailored to your needs.",
  home_why_title: "لماذا تختار AFC؟",
  home_why_title_en: "Why Choose AFC?",
  testimonials_title: "آراء شركاء النجاح",
  testimonials_title_en: "What Our Clients Say",
  testimonials_subtitle: "نفخر بثقة عملائنا، ونسعى دائماً لتقديم أفضل الخدمات المالية التي تلبي تطلعاتهم وتساهم في نمو أعمالهم.",
  testimonials_subtitle_en: "We take pride in the trust our clients place in us. Here is what some of our partners have to say.",
  home_cta_title: "ابدأ رحلة النجاح المالي معنا",
  home_cta_title_en: "Start Your Financial Success Journey With Us",
  home_cta_text: "احجز استشارتك المجانية اليوم، ودع خبراءنا يرشدونك نحو الاستقرار المالي والنمو المستدام.",
  home_cta_text_en: "Book your free consultation today and let our experts help you reach financial stability.",
  services_page_title: "خدماتنا الاحترافية",
  services_page_title_en: "Our Professional Services",
  services_page_subtitle: "نقدم مجموعة متكاملة من الخدمات المالية والمحاسبية والضريبية والمؤسسية لتلبية كافة احتياجات أعمالك وضمان نموها المستدام.",
  services_page_subtitle_en: "We provide a comprehensive range of financial, accounting, tax, and institutional services to meet all your business needs and ensure sustainable growth.",
  sectors_page_title: "قطاعات الأعمال",
  sectors_page_title_en: "Business Sectors",
  sectors_page_subtitle: "نقدم خبراتنا المتخصصة وحلولاً مالية مصممة خصيصاً لتلبية التحديات والمتطلبات الفريدة لمختلف قطاعات الأعمال.",
  sectors_page_subtitle_en: "We provide deep expertise and specialized financial solutions tailored to meet the unique requirements of various business sectors.",
  articles_page_title: "المقالات والمدونة",
  articles_page_title_en: "Blog & Articles",
  articles_page_subtitle: "ابقَ على اطلاع دائم بأحدث التطورات في عالم المحاسبة، الضرائب، والأعمال. نقدم لك تحليلات احترافية ونصائح قيمة لدعم مسيرة نجاحك.",
  articles_page_subtitle_en: "Stay up to date with the latest developments in accounting, tax, and business. We offer professional insights and valuable tips to support your success.",
  about_page_title: "من نحن",
  about_page_title_en: "About Us",
  founder_name: "أ. ولاء مجدي العشماوي",
  founder_name_en: "Wlaa Magdy Al-Ashmawy",
  founder_role: "المؤسس ورئيس مجلس الإدارة",
  founder_role_en: "Founder & Chairman",
  about_licenses_title: "التراخيص والعضويات",
  about_licenses_title_en: "Licenses & Memberships",
  about_license_1: "وزارة المالية - سجل المحاسبين والمراجعين",
  about_license_1_en: "Ministry of Finance - Register of Accountants and Auditors",
  about_license_2: "جمعية الضرائب المصرية",
  about_license_2_en: "Egyptian Tax Association",
  vision_title: "الرؤية",
  vision_title_en: "Vision",
  mission_title: "الرسالة",
  mission_title_en: "Mission",
  contact_page_title: "تواصل معنا",
  contact_page_title_en: "Contact Us",
  contact_page_subtitle: "نحن هنا للإجابة على كافة استفساراتكم وتقديم الدعم الذي تحتاجونه. لا تترددوا في التواصل معنا.",
  contact_page_subtitle_en: "We are here to answer all your inquiries and provide the support you need. Don't hesitate to reach out to us.",
  contact_form_title: "أرسل لنا رسالة",
  contact_form_title_en: "Send a Message",
  footer_description: "شريكك الموثوق في تقديم حلول محاسبية وضريبية متكاملة لضمان نجاح واستدامة أعمالك.",
  footer_description_en: "Your trusted partner in providing comprehensive accounting and tax solutions to ensure the success and sustainability of your business.",
};
const output = join(root, "public/content/cms-seed.json");

await mkdir(dirname(output), { recursive: true });
await writeFile(output, JSON.stringify({ articles, testimonials, settings }, null, 2) + "\n", "utf8");
console.log(`Prepared ${articles.length} articles and ${testimonials.length} testimonials for the dashboard.`);
