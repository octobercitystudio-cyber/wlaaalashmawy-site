import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "E-Receipt Services | AFC Accounting Egypt | CPA Wlaa Magdy",
  description: "Complete e-receipt system support and integration in Egypt. Rely on AFC for seamless tax compliance.",
  keywords: ["E-Receipt Services", "Accounting Firm Egypt", "Wlaa Magdy", "AFC", "CPA", "Tax Services"],
};

export default function Page() {
  return <ServiceClientPage lang="en" slug="e-receipt" />;
}
