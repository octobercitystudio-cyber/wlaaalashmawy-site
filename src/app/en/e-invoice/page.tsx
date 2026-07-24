import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "E-Invoice Services | AFC Accounting Egypt | CPA Wlaa Magdy",
  description: "Seamless e-invoice registration and integration services in Egypt. AFC provides full support for digital invoicing.",
  keywords: ["E-Invoice Services", "Accounting Firm Egypt", "Wlaa Magdy", "AFC", "CPA", "Tax Services"],
};

export default function Page() {
  return <ServiceClientPage lang="en" slug="e-invoice" />;
}
