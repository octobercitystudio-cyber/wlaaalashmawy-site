const fs = require('fs');
const path = require('path');

const services = [
  { slug: 'accounting-services', arTitle: 'خدمات المحاسبة', enTitle: 'Accounting Services', arDesc: 'نقدم خدمات محاسبة مالية وإدارية متكاملة للشركات في مصر. استعن بأفضل مكتب محاسبة قانوني (CPA) بقيادة أ. ولاء مجدي (AFC).', enDesc: 'Comprehensive accounting services for businesses in Egypt. Rely on AFC and CPA Wlaa Magdy for accurate financial reporting.' },
  { slug: 'audit-services', arTitle: 'خدمات المراجعة وتدقيق الحسابات', enTitle: 'Audit & Assurance Services', arDesc: 'مكتب العشماوي (AFC) يقدم خدمات المراجعة وتدقيق الحسابات للشركات في مصر بشفافية واحترافية عالية، لتأمين مستقبلك المالي.', enDesc: 'Professional audit and assurance services in Egypt by AFC. Ensure financial transparency and compliance with CPA Wlaa Magdy.' },
  { slug: 'tax-services', arTitle: 'الاستشارات والخدمات الضريبية', enTitle: 'Tax Advisory Services', arDesc: 'تجنب المخاطر الضريبية مع خدمات مكتب العشماوي للمحاسبة (AFC). نقدم تخطيطاً ضريبياً وحلولاً احترافية لضريبة الشركات في مصر.', enDesc: 'Expert tax consulting and advisory services in Egypt. AFC helps you navigate corporate tax laws efficiently.' },
  { slug: 'bookkeeping', arTitle: 'خدمات إمساك الدفاتر', enTitle: 'Bookkeeping Services', arDesc: 'خدمات إمساك الدفاتر المحاسبية بدقة واحترافية. اعتمد على AFC لتنظيم حسابات شركتك اليومية في مصر بقيادة أ. ولاء مجدي.', enDesc: 'Accurate and reliable bookkeeping services in Egypt. AFC keeps your daily accounts organized and compliant.' },
  { slug: 'payroll', arTitle: 'خدمات الرواتب وشؤون العاملين', enTitle: 'Payroll Services', arDesc: 'إدارة الرواتب وشؤون الموظفين بفعالية تامة. مكتب العشماوي للمحاسبة (AFC) يقدم لك حلولاً متكاملة توفر وقتك ومجهودك.', enDesc: 'Efficient payroll management services in Egypt. Let AFC handle your employee salaries, taxes, and compliance.' },
  { slug: 'company-formation', arTitle: 'تأسيس الشركات', enTitle: 'Company Formation', arDesc: 'ابدأ نشاطك التجاري الآن! مكتب العشماوي للمحاسبة (AFC) يقدم خدمات تأسيس الشركات في مصر واستخراج كافة التراخيص اللازمة.', enDesc: 'Start your business smoothly. AFC offers complete company formation and registration services in Egypt.' },
  { slug: 'financial-consulting', arTitle: 'الاستشارات المالية', enTitle: 'Financial Consulting', arDesc: 'استشارات مالية استراتيجية لدعم نمو أعمالك في مصر. AFC شريكك المالي الموثوق بقيادة المحاسب القانوني ولاء مجدي.', enDesc: 'Strategic financial consulting to grow your business in Egypt. AFC is your trusted financial partner.' },
  { slug: 'ifrs', arTitle: 'استشارات معايير IFRS', enTitle: 'IFRS Advisory', arDesc: 'تطبيق معايير التقارير المالية الدولية (IFRS) باحترافية. مكتب العشماوي (AFC) يساعد شركتك على التوافق مع أحدث المعايير.', enDesc: 'Professional IFRS advisory services in Egypt. Ensure your financial statements comply with international standards with AFC.' },
  { slug: 'vat-services', arTitle: 'خدمات ضريبة القيمة المضافة', enTitle: 'VAT Services', arDesc: 'إعداد وتقديم إقرارات ضريبة القيمة المضافة بدقة. AFC يضمن لشركتك التوافق التام مع قوانين الضرائب في مصر.', enDesc: 'Accurate VAT registration and filing services in Egypt. AFC ensures complete compliance with local tax laws.' },
  { slug: 'e-invoice', arTitle: 'الفاتورة الإلكترونية', enTitle: 'E-Invoice Services', arDesc: 'تسجيل وتفعيل منظومة الفاتورة الإلكترونية في مصر بسهولة. مكتب العشماوي للمحاسبة (AFC) يقدم الدعم الفني والقانوني المتكامل.', enDesc: 'Seamless e-invoice registration and integration services in Egypt. AFC provides full support for digital invoicing.' },
  { slug: 'e-receipt', arTitle: 'الإيصال الإلكتروني', enTitle: 'E-Receipt Services', arDesc: 'الانضمام لمنظومة الإيصال الإلكتروني بخطوات بسيطة. AFC معك لضمان التزام شركتك بقوانين مصلحة الضرائب المصرية.', enDesc: 'Complete e-receipt system support and integration in Egypt. Rely on AFC for seamless tax compliance.' },
  { slug: 'internal-audit', arTitle: 'المراجعة الداخلية', enTitle: 'Internal Audit', arDesc: 'تقييم المخاطر وتعزيز الرقابة عبر خدمات المراجعة الداخلية من مكتب العشماوي (AFC). نضمن حماية أصول شركتك.', enDesc: 'Strengthen your corporate governance with AFCs internal audit services in Egypt. Protect your assets and mitigate risks.' }
];

services.forEach(s => {
  // ARABIC
  const arDir = path.join(__dirname, 'src/app/(ar)', s.slug);
  const arContent = `import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "${s.arTitle} | مكتب العشماوي للمحاسبة | AFC | CPA ولاء مجدي",
  description: "${s.arDesc}",
  keywords: ["${s.arTitle}", "مكتب العشماوي للمحاسبة", "ولاء مجدي", "AFC", "CPA", "محاسب قانوني مصر"],
};

export default function Page() {
  return <ServiceClientPage lang="ar" slug="${s.slug}" />;
}
`;
  if (!fs.existsSync(arDir)) fs.mkdirSync(arDir, { recursive: true });
  fs.writeFileSync(path.join(arDir, 'page.tsx'), arContent);

  // ENGLISH
  const enDir = path.join(__dirname, 'src/app/en', s.slug);
  const enContent = `import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "${s.enTitle} | AFC Accounting Egypt | CPA Wlaa Magdy",
  description: "${s.enDesc}",
  keywords: ["${s.enTitle}", "Accounting Firm Egypt", "Wlaa Magdy", "AFC", "CPA", "Tax Services"],
};

export default function Page() {
  return <ServiceClientPage lang="en" slug="${s.slug}" />;
}
`;
  if (!fs.existsSync(enDir)) fs.mkdirSync(enDir, { recursive: true });
  fs.writeFileSync(path.join(enDir, 'page.tsx'), enContent);
});

console.log('Service pages generated successfully.');
