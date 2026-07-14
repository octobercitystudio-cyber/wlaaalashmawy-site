import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const servicesData = [
  {
    id: "accounting-advisory",
    image: "/images/services/accounting.jpg",
    titleAr: "الاستشارات المحاسبية وإعداد التقارير المالية",
    titleEn: "Accounting Advisory & Financial Reporting",
    shortDescAr: "نقدم حلولاً محاسبية تساعد المؤسسات على بناء منظومة مالية قوية وتعزيز الشفافية.",
    shortDescEn: "We provide accounting solutions that help organizations build a strong financial framework and enhance transparency.",
    contentAr: "في بيئة أعمال تتسم بالتغير المستمر، والتطور المتسارع في المعايير المحاسبية، وزيادة المتطلبات التنظيمية، أصبحت القرارات المالية أكثر تعقيدًا من أي وقت مضى. ولم يعد نجاح المؤسسات يعتمد فقط على إعداد قوائم مالية دقيقة، بل على قدرتها على تفسير المعلومات المالية، وإدارة المخاطر، وتحقيق الامتثال، ودعم القرارات الاستراتيجية التي تحقق النمو المستدام.\n\nفي **AFC – AL-Ashmawy Financial Consulting** نقدم خدمات الاستشارات المحاسبية وإعداد التقارير المالية باعتبارها عنصرًا استراتيجيًا يساعد المؤسسات على بناء منظومة مالية قوية، وتعزيز الشفافية، ورفع جودة التقارير المالية، وترسيخ ثقة المستثمرين والممولين والجهات الرقابية.\n\nنعمل جنبًا إلى جنب مع الإدارة التنفيذية والإدارات المالية لتقديم حلول عملية تتوافق مع طبيعة كل نشاط، مع مراعاة أهدافه التشغيلية والاستثمارية والتوسعية، بما يضمن تحقيق التوازن بين الامتثال للمتطلبات النظامية وتعظيم القيمة الاقتصادية للأعمال.\n\nتعتمد خدماتنا على أفضل الممارسات المهنية والمعايير الدولية، بما في ذلك **المعايير الدولية لإعداد التقارير المالية (IFRS)**، و**معايير المحاسبة الدولية (IAS)**، و**معايير المحاسبة المصرية (EAS)**، إضافة إلى المتطلبات التشريعية والتنظيمية ذات الصلة، بما يضمن إعداد تقارير مالية تتسم بالدقة والشفافية وقابلية الاعتماد.\n\n### لماذا تختار AFC؟\n\nنحن لا نقدم حلولًا محاسبية تقليدية، بل نوفر رؤية مالية واستراتيجية تساعد المؤسسات على اتخاذ قرارات أكثر كفاءة، وإدارة التغيرات التنظيمية بثقة، وتحسين جودة المعلومات المالية، وتعزيز الأداء المؤسسي.\n\nويضم فريقنا نخبة من المتخصصين الذين يجمعون بين الخبرة الفنية والرؤية التجارية، بما يمكنهم من معالجة أكثر المعاملات المحاسبية تعقيدًا، وتقديم حلول عملية تتماشى مع أفضل الممارسات الدولية، مع مراعاة طبيعة السوق المحلي ومتطلبات الجهات الرقابية.\n\n### نطاق خدماتنا\n\nتشمل خدماتنا الاستشارية والمحاسبية مجموعة متكاملة من الحلول، من أبرزها:\n\n- إعداد ومراجعة السياسات المحاسبية وفقًا للمعايير الدولية والمصرية.\n- تقديم الاستشارات الفنية المتعلقة بتطبيق معايير **IFRS** و **IAS** و **EAS**.\n- إعداد القوائم المالية المستقلة والمجمعة والإفصاحات المصاحبة لها.\n- دعم عمليات التحول إلى المعايير الدولية وإدارة مشروعات التحول المحاسبي.\n- تقديم الاستشارات الخاصة بالاندماج والاستحواذ وإعادة هيكلة الشركات من الناحية المحاسبية.\n- إعداد القوائم المالية الافتتاحية وتخصيص سعر الشراء (**Purchase Price Allocation – PPA**) عند عمليات الاستحواذ.\n- تقديم الدعم الفني في المعالجات المحاسبية للمعاملات غير التقليدية والمعقدة.\n- إعداد النماذج المالية وتحليل الآثار المحاسبية والمالية للقرارات الاستثمارية.\n- تصميم وتطوير الدليل المحاسبي والسياسات والإجراءات المالية.\n- دعم الإدارات المالية في إعداد التقارير الموجهة للمستثمرين والبنوك والجهات التنظيمية.\n- تقييم جودة التقارير المالية وتحسين عمليات الإغلاق المالي وإعداد التقارير الدورية.\n- تقديم الاستشارات المتعلقة بإعداد التقارير المالية للشركات قبل الطرح العام أو جذب المستثمرين.\n\n### القيمة التي نقدمها\n\nنساعد عملاءنا على تحويل البيانات المالية إلى أداة لاتخاذ القرار، وليس مجرد وسيلة للامتثال.\n\nومن خلال الدمج بين الخبرة المهنية، والتحليل المالي، والتطبيق الدقيق للمعايير الدولية، نمكّن المؤسسات من تحسين جودة التقارير المالية، وتعزيز كفاءة الأداء، وتقليل المخاطر، ورفع مستوى الحوكمة، ودعم خطط النمو والتوسع بثقة.\n\nفي **AFC** نؤمن بأن المحاسبة ليست مجرد تسجيل للمعاملات، بل هي لغة الأعمال، وأساس الثقة، ومحرك رئيسي لاتخاذ القرارات التي تصنع مستقبل المؤسسات.",
    contentEn: "In today's rapidly evolving business environment, organizations are facing unprecedented financial reporting challenges driven by changing accounting standards, increasing regulatory requirements, and growing stakeholder expectations. Success is no longer measured solely by the accuracy of financial statements, but by an organization's ability to transform financial information into strategic insight, manage risk effectively, ensure regulatory compliance, and support sustainable business growth.\n\nAt **AFC – AL-Ashmawy Financial Consulting**, we view accounting advisory and financial reporting as strategic business enablers rather than compliance functions. We partner with organizations to strengthen financial governance, enhance transparency, improve reporting quality, and provide reliable financial information that supports confident decision-making and long-term value creation.\n\nWorking closely with executive management and finance teams, we develop practical, business-focused solutions tailored to each client's industry, operational environment, and strategic objectives. Our integrated approach enables organizations to meet regulatory expectations while improving operational performance and maximizing business value.\n\nOur services are delivered in accordance with internationally recognized professional standards, including the International Financial Reporting Standards (IFRS), International Accounting Standards (IAS), Egyptian Accounting Standards (EAS), and other applicable regulatory and legislative requirements, ensuring financial reporting that is transparent, reliable, and decision-oriented.\n\n### Why Choose AFC?\n\nAt AFC, we go beyond technical accounting advice.\n\nWe provide strategic financial insight that enables organizations to respond confidently to evolving regulatory requirements, improve financial reporting quality, strengthen governance, and make informed business decisions.\n\nOur professionals combine deep technical expertise with commercial understanding to address complex accounting challenges, delivering practical solutions that align with international best practices while reflecting the realities of the local business environment.\n\n### Scope of Services\n\nOur Accounting Advisory & Financial Reporting services include:\n\n- Development and review of accounting policies in accordance with IFRS, IAS, and Egyptian Accounting Standards (EAS).\n- Technical accounting advisory for complex financial transactions.\n- Preparation of standalone and consolidated financial statements and related disclosures.\n- IFRS implementation and accounting conversion projects.\n- Accounting advisory for mergers, acquisitions, business combinations, and corporate restructuring.\n- Purchase Price Allocation (PPA) and opening balance sheet preparation.\n- Technical support for complex accounting treatments and financial reporting matters.\n- Financial modelling and accounting impact assessments for strategic business decisions.\n- Design and enhancement of accounting manuals, financial policies, and internal procedures.\n- Support in preparing financial reports for investors, financial institutions, regulators, and other stakeholders.\n- Financial reporting quality assessments and financial close optimization.\n- IPO readiness and financial reporting support for organizations seeking investment or public listing.\n\n### The Value We Deliver\n\nWe help organizations transform financial reporting from a compliance requirement into a strategic management tool.\n\nBy combining technical excellence, commercial insight, and internationally recognized accounting practices, we enable our clients to improve reporting quality, strengthen financial governance, enhance operational efficiency, reduce business risk, and support sustainable growth.\n\nAt AFC, we believe that accounting is far more than recording transactions—it is the language of business, the foundation of trust, and a critical driver of strategic decision-making and long-term success."
  },
  {
    id: "tax-advisory",
    image: "/images/services/tax.jpg",
    titleAr: "الاستشارات الضريبية والزكوية",
    titleEn: "Tax & Zakat Advisory",
    shortDescAr: "ضمان الامتثال الضريبي مع تحسين الهيكل الضريبي لتحقيق أقصى استفادة ضمن الإطار القانوني.",
    shortDescEn: "Ensuring tax compliance while optimizing the tax structure to maximize benefits within the legal framework.",
    contentAr: "نقدم حلولاً ضريبية مبتكرة لتقليل العبء الضريبي ضمن الأطر القانونية المسموح بها، مع ضمان الامتثال التام للأنظمة لتجنب الغرامات.",
    contentEn: "We provide innovative tax solutions to minimize the tax burden within permissible legal frameworks, ensuring full compliance to avoid penalties."
  },
  {
    id: "audit-advisory",
    image: "/images/services/audit.jpg",
    titleAr: "المراجعة والتدقيق",
    titleEn: "Audit & Assurance",
    shortDescAr: "نعزز الثقة في القوائم المالية من خلال عمليات مراجعة شفافة ومستقلة تدعم أصحاب المصلحة.",
    shortDescEn: "We enhance trust in financial statements through transparent and independent audits supporting stakeholders.",
    contentAr: "خدمات المراجعة لدينا ترتكز على الشفافية والتدقيق الشامل الذي لا يقتصر على الأرقام، بل يمتد لتقييم كفاءة العمليات التشغيلية والمالية.",
    contentEn: "Our audit services focus on transparency and comprehensive auditing that extends beyond numbers to evaluate the efficiency of operational and financial processes."
  },
  {
    id: "company-formation",
    image: "/images/services/company_formation.jpg",
    titleAr: "تأسيس الشركات",
    titleEn: "Company Formation",
    shortDescAr: "خدمات متكاملة لتأسيس الشركات واختيار الكيان القانوني الأنسب لتجنب المخاطر القانونية والضريبية.",
    shortDescEn: "Integrated company formation services, including selecting the most suitable legal entity to avoid legal and tax risks.",
    contentAr: "من الفكرة إلى التشغيل، نساعد رواد الأعمال في إطلاق شركاتهم بسلاسة، باختيار الشكل القانوني الأمثل، وإتمام كافة الإجراءات القانونية والتنظيمية المطلوبة بسرعة ودقة.",
    contentEn: "From idea to operation, we assist entrepreneurs in launching their companies smoothly by choosing the optimal legal structure and completing all necessary legal and regulatory procedures quickly and accurately."
  }
];

const sectorsData = [
  {
    id: "manufacturing",
    image: "/images/sectors/manufacturing.jpg",
    titleAr: "التصنيع",
    titleEn: "Manufacturing",
    shortDescAr: "نقدم حلولاً مالية وضريبية متكاملة لقطاع التصنيع لدعم الكفاءة التشغيلية، وتقليل تكاليف الإنتاج.",
    shortDescEn: "We provide integrated financial and tax solutions to support operational efficiency and reduce production costs."
  },
  {
    id: "trade-retail",
    image: "/images/sectors/trade_retail.jpg",
    titleAr: "التجارة",
    titleEn: "Trade & Retail",
    shortDescAr: "دعم مالي واستراتيجي لقطاع التجارة لمواجهة تحديات سلسلة التوريد وتعزيز ربحية المبيعات.",
    shortDescEn: "Strategic support for the trade sector to navigate supply chain challenges and enhance sales profitability."
  },
  {
    id: "food-beverage",
    image: "/images/sectors/food_beverage.jpg",
    titleAr: "الاغذية والمشروبات",
    titleEn: "Food & Beverage",
    shortDescAr: "استشارات متخصصة لضمان كفاءة سلاسل الإمداد، التوافق الضريبي، وإدارة التكاليف المتغيرة بكفاءة عالية.",
    shortDescEn: "Specialized advisory to ensure supply chain efficiency, tax compliance, and variable cost management."
  },
  {
    id: "general-contracting",
    image: "/images/sectors/general_contracting.jpg",
    titleAr: "مقاولات عامة",
    titleEn: "General Contracting",
    shortDescAr: "خدمات شاملة تشمل إدارة الحسابات المرحلية، تخطيط السيولة المالية، وتخفيف المخاطر التعاقدية للمقاولين.",
    shortDescEn: "Comprehensive services including interim account management, liquidity planning, and contractual risk mitigation."
  },
  {
    id: "real-estate",
    image: "/images/sectors/real_estate.jpg",
    titleAr: "عقارات والتشييد",
    titleEn: "Real Estate & Construction",
    shortDescAr: "توجيه استراتيجي لمطوري العقارات لتعظيم العائد على الاستثمار، وإدارة التدفقات النقدية للمشاريع الطويلة.",
    shortDescEn: "Strategic guidance for real estate developers to maximize ROI and manage cash flows for long-term projects."
  }
];

const articlesData = [
  { 
    title: "تأثير ضريبة القيمة المضافة على المشاريع الصغيرة", 
    date: "١٥ مايو ٢٠٢٦", 
    category: "الاستشارات الضريبية", 
    image: "/images/articles/vat_small_business.jpg",
    content: "تعتبر ضريبة القيمة المضافة تحدياً وفرصة في الوقت ذاته للمشاريع الصغيرة. من ناحية، تتطلب الالتزام بتسجيل دقيق للحسابات، ومن ناحية أخرى تساعد على تنظيم الدورة المالية للمشروع. أهم الخطوات التي يجب اتخاذها تشمل تحديث النظم المحاسبية، تدريب الموظفين، وضمان وجود سيولة نقدية كافية لتغطية الالتزامات الضريبية الدورية. كما يُنصح دائماً بالاستعانة بمستشار ضريبي لتجنب الغرامات والمشاكل القانونية التي قد تنشأ عن سوء الفهم لتطبيق القوانين الجديدة."
  },
  { 
    title: "أهمية مسك الدفاتر للشركات الناشئة", 
    date: "٣ أبريل ٢٠٢٦", 
    category: "الاستشارات المحاسبية", 
    image: "/images/articles/bookkeeping_startup.jpg",
    content: "في خضم التركيز على تطوير المنتج وجذب العملاء، قد يغفل مؤسسو الشركات الناشئة عن مسك الدفاتر بشكل منتظم. هذا الإهمال قد يؤدي إلى فقدان السيطرة على التدفقات النقدية وعدم القدرة على تقييم الأداء المالي بدقة. البدء بممارسات محاسبية سليمة من اليوم الأول يضمن لك شفافية مالية، ويسهل عليك لاحقاً الحصول على التمويل من المستثمرين أو البنوك، حيث تعتبر السجلات المالية الدقيقة من أهم المتطلبات لجهات التمويل."
  },
  { 
    title: "معايير المحاسبة الدولية IFRS وتطبيقها", 
    date: "٢٠ فبراير ٢٠٢٦", 
    category: "المراجعة والتدقيق", 
    image: "/images/articles/ifrs_standards.jpg",
    content: "مع التوجه العالمي نحو توحيد المعايير المالية، أصبح التحول إلى معايير IFRS ضرورة للشركات التي تطمح للنمو وجذب استثمارات أجنبية. يساهم هذا التحول في تحسين جودة التقارير المالية، وزيادة الشفافية والموثوقية، وتسهيل المقارنة بين أداء الشركات على المستوى الدولي. يتطلب هذا الانتقال تخطيطاً دقيقاً، وتعديلاً في السياسات المحاسبية، وبرامج تدريبية للكوادر المالية، ولكنه في النهاية يضع الشركة في موقف تنافسي أقوى."
  },
  { 
    title: "كيف تستعد لنهاية السنة المالية؟", 
    date: "١٠ ديسمبر ٢٠٢٥", 
    category: "الاستشارات المالية", 
    image: "/images/articles/financial_year_end.jpg",
    content: "يعتبر إغلاق السنة المالية من أكثر الأوقات حرجاً للإدارات المالية. لضمان سير العملية بسلاسة، يجب البدء مبكراً بمراجعة وتسوية الحسابات، جرد المخزون، والتأكد من تسجيل جميع الإيرادات والمصروفات. من الضروري أيضاً مراجعة القوانين الضريبية والتأكد من الامتثال الكامل لها قبل إعداد الإقرارات النهائية. الاستعداد الجيد والتنظيم المسبق هما المفتاح لتجنب الضغوطات في اللحظات الأخيرة."
  }
];

async function main() {
  console.log("Seeding database...");

  // Insert User
  // Admin with default password "admin123"
  const adminUser = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: "admin123" 
    }
  });

  // Insert Services
  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { id: s.id },
      update: {},
      create: s
    });
  }

  // Insert Sectors
  for (const s of sectorsData) {
    await prisma.sector.upsert({
      where: { id: s.id },
      update: {},
      create: s
    });
  }

  // Insert Articles
  await prisma.article.deleteMany({});
  for (const article of articlesData) {
    await prisma.article.create({
      data: article,
    });
  }
  
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'admin123',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
