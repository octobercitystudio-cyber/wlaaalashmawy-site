import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "IFRS Advisory | AFC Accounting Egypt | CPA Wlaa Magdy",
  description: "Professional IFRS advisory services in Egypt. Ensure your financial statements comply with international standards with AFC.",
  keywords: ["IFRS Advisory", "Accounting Firm Egypt", "Wlaa Magdy", "AFC", "CPA", "Tax Services"],
};

export default function Page() {
  return <ServiceClientPage lang="en" slug="ifrs" />;
}
