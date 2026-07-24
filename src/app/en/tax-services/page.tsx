import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "Tax Advisory Services | AFC Accounting Egypt | CPA Wlaa Magdy",
  description: "Expert tax consulting and advisory services in Egypt. AFC helps you navigate corporate tax laws efficiently.",
  keywords: ["Tax Advisory Services", "Accounting Firm Egypt", "Wlaa Magdy", "AFC", "CPA", "Tax Services"],
};

export default function Page() {
  return <ServiceClientPage lang="en" slug="tax-services" />;
}
