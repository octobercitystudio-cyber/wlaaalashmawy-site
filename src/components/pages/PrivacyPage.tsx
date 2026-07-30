import type { Lang } from "@/lib/dictionary";

export default function PrivacyPage({ lang }: { lang: Lang }) {
  const isEnglish = lang === "en";
  return (
    <main className="legal-page">
      <div className="container legal-content">
        <h1>{isEnglish ? "Privacy Policy" : "سياسة الخصوصية"}</h1>
        <p>
          {isEnglish
            ? "This policy explains what information AFC receives through this website and how it is used."
            : "توضح هذه السياسة المعلومات التي يستقبلها موقع AFC وكيفية استخدامها."}
        </p>

        <h2>{isEnglish ? "Information you provide" : "المعلومات التي تقدمها"}</h2>
        <p>
          {isEnglish
            ? "The contact form prepares the details you enter and opens them in WhatsApp. The website does not store the form fields before you choose to send the message through WhatsApp."
            : "يقوم نموذج التواصل بتجهيز البيانات التي تدخلها وفتحها في واتساب. لا يخزن الموقع حقول النموذج قبل اختيارك إرسال الرسالة عبر واتساب."}
        </p>

        <h2>{isEnglish ? "Basic visit analytics" : "إحصاءات الزيارات الأساسية"}</h2>
        <p>
          {isEnglish
            ? "The website may record the visited page, time and an anonymous browser identifier to understand aggregate traffic and improve the website. Raw IP addresses are not stored in page analytics, analytics records older than 180 days are deleted, and the data is not used for advertising profiling."
            : "قد يسجل الموقع الصفحة التي تمت زيارتها ووقت الزيارة ومعرف متصفح مجهولًا لفهم الزيارات الإجمالية وتحسين الموقع. لا تُخزن عناوين IP الخام ضمن إحصاءات الصفحات، وتُحذف سجلات الإحصاءات الأقدم من 180 يومًا، ولا تُستخدم البيانات لإنشاء ملفات إعلانية."}
        </p>

        <h2>{isEnglish ? "Third-party services" : "الخدمات الخارجية"}</h2>
        <p>
          {isEnglish
            ? "When you open WhatsApp, Google Maps, YouTube or a social network, that service applies its own privacy policy."
            : "عند فتح واتساب أو خرائط Google أو YouTube أو إحدى منصات التواصل، تطبق الخدمة الخارجية سياسة الخصوصية الخاصة بها."}
        </p>

        <h2>{isEnglish ? "Your choices" : "اختياراتك"}</h2>
        <p>
          {isEnglish
            ? "You may block local browser storage or contact AFC to ask about access, correction or deletion of information you have directly provided."
            : "يمكنك منع التخزين المحلي من إعدادات المتصفح أو التواصل مع AFC للاستفسار عن الوصول إلى المعلومات التي قدمتها مباشرة أو تصحيحها أو حذفها."}
        </p>

        <h2>{isEnglish ? "Contact" : "التواصل"}</h2>
        <p>
          {isEnglish
            ? "For privacy questions, email info@afc-cpa.com."
            : "للاستفسارات المتعلقة بالخصوصية، راسلنا على info@afc-cpa.com."}
        </p>
      </div>
    </main>
  );
}
