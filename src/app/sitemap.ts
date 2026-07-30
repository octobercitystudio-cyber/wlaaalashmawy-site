import type { MetadataRoute } from "next";
import { serviceRoutes } from "@/lib/serviceRoutes";

const siteUrl = "https://www.afc-cpa.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date();
  const coreRoutes = ["", "/about", "/services", "/sectors", "/articles", "/contact", "/privacy"];
  const entries: MetadataRoute.Sitemap = [];

  for (const route of coreRoutes) {
    entries.push({
      url: `${siteUrl}${route}/`,
      lastModified: updatedAt,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: {
          ar: `${siteUrl}${route}/`,
          en: `${siteUrl}/en${route}/`,
        },
      },
    });
    entries.push({
      url: `${siteUrl}/en${route}/`,
      lastModified: updatedAt,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 0.9 : 0.7,
      alternates: {
        languages: {
          ar: `${siteUrl}${route}/`,
          en: `${siteUrl}/en${route}/`,
        },
      },
    });
  }

  for (const service of serviceRoutes) {
    entries.push({
      url: `${siteUrl}/${service.slug}/`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${siteUrl}/${service.slug}/`,
          en: `${siteUrl}/en/${service.slug}/`,
        },
      },
    });
    entries.push({
      url: `${siteUrl}/en/${service.slug}/`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          ar: `${siteUrl}/${service.slug}/`,
          en: `${siteUrl}/en/${service.slug}/`,
        },
      },
    });
  }

  return entries;
}
