"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type SiteContent = {
  settings: Record<string, any>;
  services: any[];
  sectors: any[];
  features: any[];
  stats: any[];
  testimonials: any[];
  articles: any[];
};

const emptyContent: SiteContent = {
  settings: {},
  services: [],
  sectors: [],
  features: [],
  stats: [],
  testimonials: [],
  articles: [],
};

const SiteContentContext = createContext<SiteContent & { refresh: () => Promise<void> }>({
  ...emptyContent,
  refresh: async () => {},
});

function mergeRowsPreservingEnglish(currentRows: any[], incomingRows: any[]) {
  const currentById = new Map(
    currentRows
      .filter((row) => row?.id !== undefined && row?.id !== null)
      .map((row) => [String(row.id), row]),
  );
  const currentByArabicTitle = new Map(
    currentRows
      .map((row) => {
        const title = typeof row?.title === "string" ? row.title : row?.title?.ar;
        return [String(title || "").trim(), row] as const;
      })
      .filter(([title]) => Boolean(title)),
  );

  return incomingRows.map((incoming) => {
    const currentByMatchingId = incoming?.id !== undefined && incoming?.id !== null
      ? currentById.get(String(incoming.id))
      : undefined;
    const incomingTitle = typeof incoming?.title === "string" ? incoming.title.trim() : "";
    const current = currentByMatchingId || currentByArabicTitle.get(incomingTitle);
    if (!current) return incoming;

    const merged = { ...current, ...incoming };
    Object.keys(current).forEach((key) => {
      if (!key.endsWith("_en")) return;
      const incomingValue = incoming[key];
      if (typeof incomingValue !== "string" || !incomingValue.trim()) {
        merged[key] = current[key];
      }
    });
    return merged;
  });
}

export function SiteContentProvider({
  initialContent,
  children,
}: {
  initialContent?: Partial<SiteContent>;
  children: React.ReactNode;
}) {
  const [content, setContent] = useState<SiteContent>({ ...emptyContent, ...initialContent });

  const refresh = useCallback(async () => {
    const stamp = Date.now();
    const endpoints = ["settings", "services", "sectors", "features", "stats", "testimonials", "articles"] as const;
    const results = await Promise.allSettled(
      endpoints.map(async (endpoint) => {
        const response = await fetch(`/api/${endpoint}.php?fresh=${stamp}`, { cache: "no-store" });
        if (!response.ok) throw new Error(`${endpoint}: ${response.status}`);
        return [endpoint, await response.json()] as const;
      }),
    );

    setContent((current) => {
      const next = { ...current };
      for (const result of results) {
        if (result.status !== "fulfilled") continue;
        const [key, value] = result.value;
        if (key === "settings" && value && !Array.isArray(value)) next.settings = value;
        if (key !== "settings" && Array.isArray(value)) {
          next[key] = mergeRowsPreservingEnglish(current[key], value);
        }
      }
      return next;
    });
  }, []);

  useEffect(() => {
    void refresh();
    const interval = window.setInterval(() => void refresh(), 30000);
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    document.addEventListener("visibilitychange", refreshWhenVisible);
    window.addEventListener("focus", refreshWhenVisible);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      window.removeEventListener("focus", refreshWhenVisible);
    };
  }, [refresh]);

  const value = useMemo(() => ({ ...content, refresh }), [content, refresh]);
  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
