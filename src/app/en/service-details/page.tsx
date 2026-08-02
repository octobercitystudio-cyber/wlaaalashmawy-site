import { Suspense } from "react";
import DynamicServicePage from "@/components/pages/DynamicServicePage";

export default function Page() {
  return <Suspense fallback={null}><DynamicServicePage lang="en" /></Suspense>;
}
