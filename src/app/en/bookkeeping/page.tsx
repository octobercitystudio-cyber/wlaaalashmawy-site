import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "Bookkeeping Services | AFC Accounting Egypt | CPA Wlaa Magdy",
  description: "Accurate and reliable bookkeeping services in Egypt. AFC keeps your daily accounts organized and compliant.",
  keywords: ["Bookkeeping Services", "Accounting Firm Egypt", "Wlaa Magdy", "AFC", "CPA", "Tax Services"],
};

export default function Page() {
  return <ServiceClientPage lang="en" slug="bookkeeping" />;
}
