export const articleCategories = [
  {
    key: "accounting",
    ar: "محاسبة",
    en: "Accounting",
    aliases: ["الاستشارات المحاسبية", "Accounting Advisory"],
  },
  {
    key: "audit",
    ar: "مراجعة",
    en: "Audit",
    aliases: ["المراجعة", "المراجعة والتدقيق", "Audit & Assurance", "Auditing"],
  },
  {
    key: "taxes",
    ar: "ضرايب",
    en: "Taxes",
    aliases: ["ضرائب", "الاستشارات الضريبية", "Tax Advisory"],
  },
  {
    key: "company-formation",
    ar: "تأسيس الشركات والمنشآت",
    en: "Company Formation",
    aliases: ["تأسيس الشركات والمنشات", "تأسيس الشركات والمؤسسات", "تأسيس الشركات"],
  },
  {
    key: "investor-residency",
    ar: "إقامات مستثمرين",
    en: "Investor Residency",
    aliases: ["إقامات المستثمرين", "اقامات مستثمرين", "Investor Residency Services"],
  },
  {
    key: "industrial-licensing",
    ar: "تراخيص صناعية",
    en: "Industrial Licensing",
    aliases: ["تراخيص صناعيه", "التراخيص الصناعية"],
  },
] as const;

export type ArticleCategory = (typeof articleCategories)[number];

function normalizeCategoryName(value: unknown) {
  return String(value || "")
    .trim()
    .toLocaleLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه");
}

export function resolveArticleCategory(category: unknown, categoryEn?: unknown): ArticleCategory | undefined {
  const candidates = [category, categoryEn].map(normalizeCategoryName).filter(Boolean);

  return articleCategories.find((option) =>
    [option.ar, option.en, ...option.aliases]
      .map(normalizeCategoryName)
      .some((name) => candidates.includes(name)),
  );
}
