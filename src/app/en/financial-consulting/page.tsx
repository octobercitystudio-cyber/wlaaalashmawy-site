import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "Financial Consulting | AFC Accounting Egypt | CPA Wlaa Magdy",
  description: "Strategic financial consulting to grow your business in Egypt. AFC is your trusted financial partner.",
  keywords: ["Financial Consulting", "Accounting Firm Egypt", "Wlaa Magdy", "AFC", "CPA", "Tax Services"],
};

export default function Page() {
  return <ServiceClientPage lang="en" slug="financial-consulting" />;
}
