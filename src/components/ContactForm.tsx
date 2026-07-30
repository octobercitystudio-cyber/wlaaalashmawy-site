"use client";

import { FormEvent, useState } from "react";
import type { Lang } from "@/lib/dictionary";
import { normalizeWhatsAppNumber } from "@/lib/contact";

export default function ContactForm({
  lang,
  whatsappNumber,
}: {
  lang: Lang;
  whatsappNumber: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const inquiry = String(data.get("inquiry") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const body =
      lang === "en"
        ? [
            "Hello AFC, I would like to request a consultation.",
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Inquiry: ${inquiry}`,
            `Message: ${message}`,
          ].join("\n")
        : [
            "مرحبًا AFC، أرغب في طلب استشارة.",
            `الاسم: ${name}`,
            `البريد الإلكتروني: ${email}`,
            `الهاتف: ${phone}`,
            `نوع الاستفسار: ${inquiry}`,
            `الرسالة: ${message}`,
          ].join("\n");

    const url = `https://wa.me/${normalizeWhatsAppNumber(whatsappNumber)}?text=${encodeURIComponent(body)}`;
    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (popup) popup.opener = null;
    setSubmitted(true);
  }

  const fieldStyle = {
    width: "100%",
    padding: "1.1rem",
    borderRadius: "8px",
    border: "1px solid var(--color-border)",
    background: "var(--color-bg-body)",
    color: "var(--color-text-main)",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.8,
  } as const;

  const labelStyle = {
    display: "block",
    marginBottom: "0.6rem",
    color: "var(--color-text-main)",
    fontWeight: 600,
  } as const;

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <div className="grid grid-cols-1 md-grid-cols-2 gap-md">
        <div>
          <label htmlFor="contact-name" style={labelStyle}>
            {lang === "en" ? "Full Name *" : "الاسم بالكامل *"}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            style={fieldStyle}
            placeholder={lang === "en" ? "Enter your full name" : "أدخل اسمك الكريم"}
            required
          />
        </div>
        <div>
          <label htmlFor="contact-email" style={labelStyle}>
            {lang === "en" ? "Email Address *" : "البريد الإلكتروني *"}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            style={fieldStyle}
            placeholder="example@email.com"
            required
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" style={labelStyle}>
          {lang === "en" ? "Phone Number *" : "رقم الهاتف *"}
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          maxLength={30}
          style={fieldStyle}
          placeholder={lang === "en" ? "Your phone number" : "رقم الهاتف للتواصل"}
          required
          dir="ltr"
        />
      </div>

      <div>
        <label htmlFor="contact-inquiry" style={labelStyle}>
          {lang === "en" ? "Inquiry Type" : "نوع الاستفسار"}
        </label>
        <select id="contact-inquiry" name="inquiry" style={fieldStyle}>
          <option value={lang === "en" ? "Accounting consulting" : "استشارات محاسبية"}>
            {lang === "en" ? "Accounting Consulting" : "استشارات محاسبية"}
          </option>
          <option value={lang === "en" ? "Tax consulting" : "استشارات ضريبية"}>
            {lang === "en" ? "Tax Consulting" : "استشارات ضريبية"}
          </option>
          <option value={lang === "en" ? "Company formation" : "تأسيس شركات"}>
            {lang === "en" ? "Company Formation" : "تأسيس شركات"}
          </option>
          <option value={lang === "en" ? "Audit and assurance" : "المراجعة والتدقيق"}>
            {lang === "en" ? "Audit & Assurance" : "المراجعة والتدقيق"}
          </option>
          <option value={lang === "en" ? "Other" : "أخرى"}>
            {lang === "en" ? "Other" : "أخرى"}
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" style={labelStyle}>
          {lang === "en" ? "How can we help you? *" : "كيف يمكننا مساعدتك؟ *"}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={2000}
          style={{ ...fieldStyle, resize: "vertical" }}
          placeholder={
            lang === "en"
              ? "Write the details of your inquiry here..."
              : "اكتب تفاصيل استفسارك هنا..."
          }
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{
          marginTop: "0.5rem",
          width: "100%",
          padding: "1.2rem",
          fontSize: "1.2rem",
          fontWeight: "bold",
          borderRadius: "8px",
        }}
      >
        <i className="bi bi-whatsapp" aria-hidden="true" />
        {lang === "en" ? "Continue on WhatsApp" : "متابعة الإرسال عبر واتساب"}
      </button>

      <p className="form-note">
        {lang === "en"
          ? "Your message will open in WhatsApp for your review before it is sent."
          : "ستفتح الرسالة في واتساب لمراجعتها قبل الإرسال."}
      </p>
      <p role="status" aria-live="polite" className="sr-status">
        {submitted
          ? lang === "en"
            ? "Your message was prepared in WhatsApp."
            : "تم تجهيز رسالتك في واتساب."
          : ""}
      </p>
    </form>
  );
}
