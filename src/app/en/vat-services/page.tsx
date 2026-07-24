import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "VAT Services | AFC Accounting Egypt | CPA Wlaa Magdy",
  description: "Accurate VAT registration and filing services in Egypt. AFC ensures complete compliance with local tax laws.",
  keywords: ["VAT Services", "Accounting Firm Egypt", "Wlaa Magdy", "AFC", "CPA", "Tax Services"],
};

export default function Page() {
  return <ServiceClientPage lang="en" slug="vat-services" />;
}
