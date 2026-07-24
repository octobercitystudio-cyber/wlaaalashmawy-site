import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "Internal Audit | AFC Accounting Egypt | CPA Wlaa Magdy",
  description: "Strengthen your corporate governance with AFCs internal audit services in Egypt. Protect your assets and mitigate risks.",
  keywords: ["Internal Audit", "Accounting Firm Egypt", "Wlaa Magdy", "AFC", "CPA", "Tax Services"],
};

export default function Page() {
  return <ServiceClientPage lang="en" slug="internal-audit" />;
}
