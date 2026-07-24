import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "Accounting Services | AFC Accounting Egypt | CPA Wlaa Magdy",
  description: "Comprehensive accounting services for businesses in Egypt. Rely on AFC and CPA Wlaa Magdy for accurate financial reporting.",
  keywords: ["Accounting Services", "Accounting Firm Egypt", "Wlaa Magdy", "AFC", "CPA", "Tax Services"],
};

export default function Page() {
  return <ServiceClientPage lang="en" slug="accounting-services" />;
}
