import assert from "node:assert/strict";
import test from "node:test";

import {
  normalizeSocialUrl,
  normalizeWhatsAppNumber,
  parseSettingList,
} from "../src/lib/contact";
import { sanitizeHtml } from "../src/lib/sanitizeHtml";
import {
  allServiceSlugs,
  canonicalServiceSlug,
  serviceIdFromSlug,
  servicePath,
} from "../src/lib/serviceRoutes";

test("service routes resolve canonical slugs and legacy aliases", () => {
  assert.equal(new Set(allServiceSlugs).size, allServiceSlugs.length);
  assert.equal(allServiceSlugs.length, 16);
  assert.equal(serviceIdFromSlug("bookkeeping"), 1);
  assert.equal(serviceIdFromSlug("e-invoice"), 5);
  assert.equal(serviceIdFromSlug("not-a-service"), null);
  assert.equal(canonicalServiceSlug(8), "industrial-licensing");
  assert.equal(servicePath(4, "ar"), "/company-formation");
  assert.equal(servicePath(4, "en"), "/en/company-formation");
});

test("setting lists retain useful fallbacks", () => {
  assert.deepEqual(parseSettingList('[" 011 ", "023"]'), ["011", "023"]);
  assert.deepEqual(parseSettingList("first, second"), ["first", "second"]);
  assert.deepEqual(parseSettingList("[]", ["fallback"]), ["fallback"]);
  assert.deepEqual(parseSettingList([], ["fallback"]), ["fallback"]);
});

test("WhatsApp numbers are normalized for Egypt", () => {
  assert.equal(normalizeWhatsAppNumber("0115 572 9429"), "201155729429");
  assert.equal(normalizeWhatsAppNumber("+20 115 572 9429"), "201155729429");
  assert.equal(normalizeWhatsAppNumber("0020 115 572 9429"), "201155729429");
});

test("only real HTTPS social profile URLs are exposed", () => {
  assert.equal(
    normalizeSocialUrl("https://www.facebook.com/afc.cpa", "facebook"),
    "https://www.facebook.com/afc.cpa",
  );
  assert.equal(normalizeSocialUrl("https://facebook.com", "facebook"), null);
  assert.equal(
    normalizeSocialUrl("https://example.com/afc", "facebook"),
    null,
  );
  assert.equal(
    normalizeSocialUrl("http://instagram.com/afc", "instagram"),
    null,
  );
});

test("CMS HTML sanitizer removes executable markup", () => {
  const dirty =
    '<p onclick="alert(1)">Safe</p><script>alert(1)</script>' +
    '<a href="javascript:alert(1)">link</a>' +
    '<img src="data:text/html,<script>alert(1)</script>">';
  const clean = sanitizeHtml(dirty);

  assert.match(clean, /<p>Safe<\/p>/);
  assert.doesNotMatch(clean, /onclick|<script|javascript:|data:text\/html/i);
});
