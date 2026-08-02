"use client";

import { useSearchParams } from "next/navigation";
import ServiceDetailsPage from "@/components/pages/ServiceDetailsPage";
import type { Lang } from "@/lib/dictionary";

export default function DynamicServicePage({ lang }: { lang: Lang }) {
  const id = useSearchParams().get("id") || "";
  return <ServiceDetailsPage id={id} lang={lang} />;
}
