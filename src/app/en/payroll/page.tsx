import type { Metadata } from "next";
import ServiceClientPage from "@/components/pages/ServiceClientPage";

export const metadata: Metadata = {
  title: "Payroll Services | AFC Accounting Egypt | CPA Wlaa Magdy",
  description: "Efficient payroll management services in Egypt. Let AFC handle your employee salaries, taxes, and compliance.",
  keywords: ["Payroll Services", "Accounting Firm Egypt", "Wlaa Magdy", "AFC", "CPA", "Tax Services"],
};

export default function Page() {
  return <ServiceClientPage lang="en" slug="payroll" />;
}
