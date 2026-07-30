import ContactPage from "@/components/pages/ContactPage";
export const metadata = {
  title: "Contact Us",
  description: "Contact AFC for an accounting, audit, tax or company formation consultation.",
  alternates: { canonical: "/en/contact/", languages: { ar: "/contact/", en: "/en/contact/" } },
};
export default function Page() { return <ContactPage lang="en" />; }
