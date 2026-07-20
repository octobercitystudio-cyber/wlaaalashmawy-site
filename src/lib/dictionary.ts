export const dictionaries = {
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    services: "خدماتنا",
    sectors: "القطاعات",
    articles: "المقالات",
    contact: "تواصل معنا",
    readMore: "اقرأ المزيد",
    viewAll: "عرض الكل",
    contactUs: "استشارة",
    allRightsReserved: "جميع الحقوق محفوظة",
    quickLinks: "روابط سريعة",
    ourServices: "الخدمات المحاسبية",
    contactInfo: "معلومات التواصل",
    langSwitch: "EN",
    langSwitchUrl: "/en",
    whatsapp: "تواصل عبر واتساب",
    callUs: "اتصل بنا",
    emailUs: "راسلنا"
  },
  en: {
    home: "Home",
    about: "About Us",
    services: "Services",
    sectors: "Sectors",
    articles: "Articles",
    contact: "Contact Us",
    readMore: "Read More",
    viewAll: "View All",
    contactUs: "Consultation",
    allRightsReserved: "All Rights Reserved",
    quickLinks: "Quick Links",
    ourServices: "Our Services",
    contactInfo: "Contact Info",
    langSwitch: "AR",
    langSwitchUrl: "/",
    whatsapp: "WhatsApp Us",
    callUs: "Call Us",
    emailUs: "Email Us"
  }
};

export type Lang = keyof typeof dictionaries;

export function getDictionary(lang: Lang) {
  return dictionaries[lang];
}
