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
  home_seo_paragraph_1: "في AFC – العشماوي للاستشارات المالية نقدم حلولًا متكاملة في المحاسبة والمراجعة والضرائب لمساعدة الشركات والمستثمرين على إدارة أعمالهم بثقة وتحقيق الامتثال المالي والضريبي.",
  home_seo_paragraph_2: "يعمل المكتب تحت إدارة الأستاذة ولاء مجدي العشماوي – محاسب قانوني CPA، وبمشاركة فريق من المتخصصين في إعداد القوائم والتقارير المالية، ومراجعة الحسابات، والاستشارات الضريبية، وتأسيس الشركات والمنشآت، والفحص الضريبي، والتسجيل في منظومة الفاتورة والإيصال الإلكتروني.",
  home_seo_paragraph_3: "نخدم الشركات الصغيرة والمتوسطة والمستثمرين ورواد الأعمال في 6 أكتوبر والشيخ زايد والجيزة وجميع أنحاء مصر، ونقدم حلولًا عملية تتناسب مع طبيعة كل نشاط وتساعد على تقليل المخاطر وتحسين القرارات المالية.",
  home_seo_paragraph_4: "سواء كنت تبدأ شركة جديدة، أو تحتاج إلى تنظيم حساباتك، أو تمثيل منشأتك أمام الجهات الضريبية، فإن فريق AFC مستعد ليكون شريكك المالي والضريبي في كل مرحلة.",
  home_seo_text_en: "AFC – Al-Ashmawy Financial Consulting provides integrated accounting, audit and tax solutions for companies, investors and entrepreneurs across Egypt.",
  home_seo_cta: "احجز استشارتك الآن مع مكتب AFC، ودع فريقنا يساعدك في بناء منظومة مالية وضريبية أكثر كفاءة واستقرارًا.",
  home_seo_cta_en: "Book your consultation with AFC and let our team help you build a more efficient and stable financial and tax system.",
  seo_keywords: "مكتب محاسبة في 6 أكتوبر, محاسب قانوني في 6 أكتوبر, مكتب محاسب قانوني في الجيزة, ولاء مجدي العشماوي, مكتب العشماوي للمحاسبة, استشارات مالية في مصر, استشارات ضريبية للشركات, مراجعة حسابات الشركات, تأسيس شركات في مصر, فحص ضريبي, إعداد القوائم المالية, التسجيل في الفاتورة الإلكترونية, استخراج التراخيص الصناعية, إقامة المستثمرين في مصر",
  google_business_description: "مكتب AFC – العشماوي للاستشارات المالية، بإدارة الأستاذة ولاء مجدي العشماوي، يقدم خدمات المحاسبة القانونية، ومراجعة الحسابات، والاستشارات الضريبية، وإعداد القوائم والتقارير المالية، وتأسيس الشركات والمنشآت، والفحص الضريبي، وإجراءات الفاتورة الإلكترونية، وإقامات المستثمرين والتراخيص الصناعية. نخدم الشركات ورواد الأعمال والمستثمرين في 6 أكتوبر والشيخ زايد والجيزة وجميع أنحاء مصر.",
  seo_about_title: "ولاء مجدي العشماوي – محاسب قانوني ومؤسس AFC",
  seo_about_desc: "تعرف على أ. ولاء مجدي العشماوي، مؤسس ورئيس مجلس إدارة مكتب AFC للمحاسبة والاستشارات المالية، ورؤية المكتب في دعم الشركات والمستثمرين.",
  seo_services_title: "خدمات المحاسبة والضرائب والمراجعة في مصر | AFC",
  seo_services_desc: "اكتشف خدمات AFC في المحاسبة والمراجعة والاستشارات الضريبية وتأسيس الشركات والفحص الضريبي والتراخيص وإقامات المستثمرين.",
  seo_contact_title: "تواصل مع مكتب AFC للمحاسبة في 6 أكتوبر",
  seo_contact_desc: "تواصل مع مكتب العشماوي للاستشارات المالية في 6 أكتوبر للحصول على استشارة في المحاسبة والضرائب والمراجعة وتأسيس الشركات.",
  seo_service_1_title: "استشارات محاسبية وإعداد تقارير مالية | AFC",
  seo_service_1_desc: "خدمات إعداد القوائم والتقارير المالية وتطوير السياسات المحاسبية وتطبيق معايير IFRS وIAS وEAS للشركات والمؤسسات.",
  seo_service_2_title: "مراجعة حسابات الشركات وإبداء الرأي المهني | AFC",
  seo_service_2_desc: "خدمات مراجعة الحسابات والقوائم المالية وتقييم الرقابة الداخلية وإدارة المخاطر وفق المعايير المصرية والدولية.",
  seo_service_3_title: "استشارات ضريبية وامتثال ضريبي في مصر | AFC",
  seo_service_3_desc: "استشارات ضريبية متكاملة للشركات، تشمل الإقرارات والتخطيط الضريبي والامتثال وتمثيل العملاء أمام مصلحة الضرائب المصرية.",
  seo_service_4_title: "تأسيس الشركات والمنشآت في مصر | مكتب AFC",
  seo_service_4_desc: "نساعدك في تأسيس الشركات واختيار الشكل القانوني واستخراج السجل التجاري والبطاقة الضريبية واستكمال إجراءات بدء النشاط.",
  seo_service_5_title: "الإجراءات والخدمات الضريبية للشركات | AFC",
  seo_service_5_desc: "تنفيذ ومتابعة الإجراءات الضريبية، والإقرارات، والقيمة المضافة، والفاتورة الإلكترونية، والإيصال الإلكتروني والتأمينات.",
  seo_service_6_title: "الفحص الضريبي وتمثيل الشركات أمام الضرائب | AFC",
  seo_service_6_desc: "استعداد وتمثيل احترافي أثناء فحص ضريبة الدخل والقيمة المضافة وكسب العمل والخصم والإضافة مع تقليل المخاطر الضريبية.",
  seo_service_7_title: "استخراج وتجديد إقامات المستثمرين في مصر | AFC",
  seo_service_7_desc: "خدمات استخراج وتجديد إقامات المستثمرين الأجانب واستكمال المستندات والإجراءات المطلوبة لدى الجهات المختصة في مصر.",
  seo_service_8_title: "استخراج التراخيص الصناعية في مصر | AFC",
  seo_service_8_desc: "مساعدة المصانع والمستثمرين في استخراج وتجديد التراخيص الصناعية واستكمال إجراءات التشغيل والامتثال للجهات المختصة.",
};
const overwriteSettings = {
  seo_title: "AFC – العشماوي للاستشارات المالية | محاسب قانوني في 6 أكتوبر",
  seo_desc: "مكتب AFC بإدارة أ. ولاء مجدي العشماوي يقدم خدمات المحاسبة والمراجعة والضرائب وتأسيس الشركات في 6 أكتوبر والجيزة وجميع أنحاء مصر.",
  seo_title_en: "AFC – Al-Ashmawy Financial Consulting | Accounting, Audit & Tax Services in Egypt",
  seo_desc_en: "AFC – Al-Ashmawy Financial Consulting provides professional accounting, audit, tax, company formation and financial advisory services in Egypt.",
  hero_title: "AFC – العشماوي للاستشارات المالية",
  hero_title_en: "AFC – Al-Ashmawy Financial Consulting",
};
const output = join(root, "public/content/cms-seed.json");

await mkdir(dirname(output), { recursive: true });
await writeFile(output, JSON.stringify({ articles, testimonials, settings, overwriteSettings }, null, 2) + "\n", "utf8");
console.log(`Prepared ${articles.length} articles and ${testimonials.length} testimonials for the dashboard.`);
