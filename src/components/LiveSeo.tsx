"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSiteContent } from "@/components/SiteContentProvider";
import { serviceIdFromSlug } from "@/lib/serviceRoutes";

function setMeta(name: string, content: string) {
  if (!content) return;
  const tags = Array.from(
    document.querySelectorAll<HTMLMetaElement>(`meta[name="${name}"]`),
  );
  if (!tags.length) return;
  tags[0].content = content;
  tags.slice(1).forEach((tag) => tag.remove());
}

export default function LiveSeo() {
  const pathname = usePathname();
  const { settings } = useSiteContent();

  useEffect(() => {
    const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
    const localPath = (isEnglish ? pathname.replace(/^\/en(?=\/|$)/, "") : pathname).replace(/^\/+|\/+$/g, "");
    let prefix = "seo";

    if (localPath === "about") prefix = "seo_about";
    else if (localPath === "services") prefix = "seo_services";
    else if (localPath === "contact") prefix = "seo_contact";
    else {
      let serviceId = serviceIdFromSlug(localPath);
      if (!serviceId && localPath === "service-details") {
        serviceId = Number(new URLSearchParams(window.location.search).get("id")) || null;
      }
      if (serviceId) prefix = `seo_service_${serviceId}`;
    }

    const languageSuffix = isEnglish ? "_en" : "";
    const titleKey = prefix === "seo" ? `seo_title${languageSuffix}` : `${prefix}_title${languageSuffix}`;
    const descriptionKey = prefix === "seo" ? `seo_desc${languageSuffix}` : `${prefix}_desc${languageSuffix}`;
    const title = String(settings[titleKey] || "").trim();
    const description = String(settings[descriptionKey] || "").trim();

    if (title) document.title = title;
    setMeta("description", description);
    setMeta("keywords", String(settings.seo_keywords || "").trim());
  }, [pathname, settings]);

  return null;
}
