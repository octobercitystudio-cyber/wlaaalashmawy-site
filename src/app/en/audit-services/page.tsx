import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "Audit & Assurance Services | AFC Accounting Egypt | CPA Wlaa Magdy",
  description: "Professional audit and assurance services in Egypt by AFC. Ensure financial transparency and compliance with CPA Wlaa Magdy.",
  keywords: ["Audit & Assurance Services", "Accounting Firm Egypt", "Wlaa Magdy", "AFC", "CPA", "Tax Services"],
};

export default function Page() {
  return <ServiceClientPage lang="en" slug="audit-services" />;
}
