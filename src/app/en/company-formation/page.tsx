import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "Company Formation | AFC Accounting Egypt | CPA Wlaa Magdy",
  description: "Start your business smoothly. AFC offers complete company formation and registration services in Egypt.",
  keywords: ["Company Formation", "Accounting Firm Egypt", "Wlaa Magdy", "AFC", "CPA", "Tax Services"],
};

export default function Page() {
  return <ServiceClientPage lang="en" slug="company-formation" />;
}
