/**
 * Conservative HTML sanitizer for CMS-authored rich text. The PHP API also
 * sanitizes writes; this second layer protects previously stored content.
 */
export function sanitizeHtml(input: unknown): string {
  if (typeof input !== "string") return "";

  let html = input.replace(/<!--[\s\S]*?-->/g, "");
  const blockedTags =
    "script|style|iframe|object|embed|svg|math|form|input|button|textarea|select|option|link|meta|base";

  html = html
    .replace(
      new RegExp(`<\\s*(${blockedTags})\\b[^>]*>[\\s\\S]*?<\\/\\s*\\1\\s*>`, "gi"),
      "",
    )
    .replace(new RegExp(`<\\/?\\s*(${blockedTags})\\b[^>]*>`, "gi"), "")
    .replace(/\s+(?:on[a-z]+|style|srcdoc|formaction)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(
      /\s+(href|src)\s*=\s*(["'])\s*(?:javascript|vbscript|data\s*:\s*text\/html)[\s\S]*?\2/gi,
      "",
    )
    .replace(
      /\s+(href|src)\s*=\s*(?:javascript|vbscript|data\s*:\s*text\/html)[^\s>]*/gi,
      "",
    );

  return html;
}
