import ContactPage from "@/components/pages/ContactPage";
export const metadata = {
  title: "تواصل معنا",
  description: "تواصل مع فريق AFC لطلب استشارة في المحاسبة والمراجعة والضرائب وتأسيس الشركات.",
  alternates: { canonical: "/contact/", languages: { ar: "/contact/", en: "/en/contact/" } },
};
export default function Page() { return <ContactPage lang="ar" />; }
