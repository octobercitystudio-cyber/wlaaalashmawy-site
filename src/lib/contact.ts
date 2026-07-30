export function parseSettingList(
  value: unknown,
  fallback: string[] = [],
): string[] {
  if (Array.isArray(value)) {
    const items = value.map(String).map((item) => item.trim()).filter(Boolean);
    return items.length > 0 ? items : fallback;
  }

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        const items = parsed.map(String).map((item) => item.trim()).filter(Boolean);
        return items.length > 0 ? items : fallback;
      }
    } catch {
      const items = value
        .split(/[\n,]/)
        .map((item) => item.trim())
        .filter(Boolean);
      return items.length > 0 ? items : fallback;
    }
  }

  return fallback;
}

export function normalizeWhatsAppNumber(value: unknown): string {
  let digits = String(value ?? "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = `20${digits.slice(1)}`;
  return digits || "201155729429";
}

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "youtube"
  | "linkedin"
  | "tiktok";

const socialHosts: Record<SocialPlatform, string[]> = {
  facebook: ["facebook.com"],
  instagram: ["instagram.com"],
  youtube: ["youtube.com", "youtu.be"],
  linkedin: ["linkedin.com"],
  tiktok: ["tiktok.com"],
};

/**
 * Returns only a real HTTPS profile/channel URL for the requested platform.
 * Bare platform homepages are placeholders, not AFC social profiles.
 */
export function normalizeSocialUrl(
  value: unknown,
  platform: SocialPlatform,
): string | null {
  if (typeof value !== "string" || !value.trim()) return null;

  try {
    const url = new URL(value.trim());
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    const hostAllowed = socialHosts[platform].some(
      (host) => hostname === host || hostname.endsWith(`.${host}`),
    );
    const hasProfilePath = url.pathname.replace(/\/+$/, "") !== "";

    return url.protocol === "https:" && hostAllowed && hasProfilePath
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}
