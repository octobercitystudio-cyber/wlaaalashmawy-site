export type Sector = {
  id: string;
  image: string;
  title: { ar: string; en: string };
  shortDesc: { ar: string; en: string };
};

export const sectorsData: Sector[] = [
  {
    id: "manufacturing",
    image: "/images/sectors/manufacturing.jpg",
    title: { ar: "التصنيع", en: "Manufacturing" },
    shortDesc: {
      ar: "نقدم حلولاً مالية وضريبية متكاملة لقطاع التصنيع لدعم الكفاءة التشغيلية، وتقليل تكاليف الإنتاج.",
      en: "We provide integrated financial and tax solutions to support operational efficiency and reduce production costs."
    }
  },
  {
    id: "trade-retail",
    image: "/images/sectors/trade_retail.jpg",
    title: { ar: "التجارة", en: "Trade & Retail" },
    shortDesc: {
      ar: "دعم مالي واستراتيجي لقطاع التجارة لمواجهة تحديات سلسلة التوريد وتعزيز ربحية المبيعات.",
      en: "Strategic support for the trade sector to navigate supply chain challenges and enhance sales profitability."
    }
  },
  {
    id: "food-beverage",
    image: "/images/sectors/food_beverage.jpg",
    title: { ar: "الاغذية والمشروبات", en: "Food & Beverage" },
    shortDesc: {
      ar: "استشارات متخصصة لضمان كفاءة سلاسل الإمداد، التوافق الضريبي، وإدارة التكاليف المتغيرة بكفاءة عالية.",
      en: "Specialized advisory to ensure supply chain efficiency, tax compliance, and variable cost management."
    }
  },
  {
    id: "general-contracting",
    image: "/images/sectors/general_contracting.jpg",
    title: { ar: "مقاولات عامة", en: "General Contracting" },
    shortDesc: {
      ar: "خدمات شاملة تشمل إدارة الحسابات المرحلية، تخطيط السيولة المالية، وتخفيف المخاطر التعاقدية للمقاولين.",
      en: "Comprehensive services including interim account management, liquidity planning, and contractual risk mitigation."
    }
  },
  {
    id: "real-estate",
    image: "/images/sectors/real_estate.jpg",
    title: { ar: "عقارات والتشييد", en: "Real Estate & Construction" },
    shortDesc: {
      ar: "توجيه استراتيجي لمطوري العقارات لتعظيم العائد على الاستثمار، وإدارة التدفقات النقدية للمشاريع الطويلة.",
      en: "Strategic guidance to maximize ROI and manage cash flows for long-term real estate development projects."
    }
  },
  {
    id: "mining-petroleum",
    image: "/images/sectors/mining_petroleum.jpg",
    title: { ar: "التعدين والبترول", en: "Mining & Petroleum" },
    shortDesc: {
      ar: "خبرة واسعة في الاستشارات الضريبية والمحاسبية لقطاع التعدين، مع التركيز على الامتثال التنظيمي للموارد.",
      en: "Extensive expertise in tax and accounting advisory, focusing on regulatory compliance and sustainability."
    }
  },
  {
    id: "technology-telecom",
    image: "/images/sectors/technology_telecom.jpg",
    title: { ar: "التكنولوجيا والاتصالات", en: "Technology & Telecommunications" },
    shortDesc: {
      ar: "حلول مبتكرة لدعم النمو السريع، هيكلة الاستثمارات التقنية، والامتثال لمعايير التقارير المالية الدولية.",
      en: "Innovative solutions to support rapid growth, investment structuring, and IFRS compliance for tech firms."
    }
  },
  {
    id: "pharmaceutical",
    image: "/images/sectors/pharmaceutical.jpg",
    title: { ar: "الصناعات الدوائية", en: "Pharmaceutical Industries" },
    shortDesc: {
      ar: "دعم مالي دقيق يلبي متطلبات الرقابة الصارمة، ويُحسن ميزانيات البحث والتطوير للصناعات الدوائية.",
      en: "Precise financial support meeting strict regulatory demands and optimizing R&D budgets for pharma."
    }
  },
  {
    id: "hospitality",
    image: "/images/sectors/hospitality.jpg",
    title: { ar: "الفنادق", en: "Hotels & Hospitality" },
    shortDesc: {
      ar: "استراتيجيات مالية مخصصة لقطاع الضيافة تهدف إلى تحسين هوامش الربح وإدارة التكاليف التشغيلية الموسمية.",
      en: "Financial strategies tailored for hospitality aimed at improving profit margins and managing seasonal costs."
    }
  },
  {
    id: "education",
    image: "/images/sectors/education.jpg",
    title: { ar: "المؤسسات التعليمية", en: "Educational Institutions" },
    shortDesc: {
      ar: "خدمات تركز على الإدارة المالية المستدامة، التخطيط طويل الأجل، وتطوير البنية التحتية التعليمية.",
      en: "Services focused on sustainable financial management, long-term planning, and infrastructure development."
    }
  },
  {
    id: "non-profit",
    image: "/images/sectors/non_profit.jpg",
    title: { ar: "المنظمات غير الهادفة للربح", en: "Non-Profit Organizations" },
    shortDesc: {
      ar: "ضمان أعلى مستويات الشفافية والحوكمة من خلال تقارير مالية دقيقة وإدارة رشيدة للمنح والتمويل الخيري.",
      en: "Ensuring high transparency and governance through accurate financial reporting and prudent grant management."
    }
  }
];
