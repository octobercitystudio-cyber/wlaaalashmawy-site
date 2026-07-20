import ServiceDetailsPage from "@/components/pages/ServiceDetailsPage";
import { fetchServices } from "@/lib/api";

export async function generateStaticParams() {
  const services = await fetchServices();
  return services.map((service: any) => ({
    id: service.id.toString(),
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) { 
  const resolvedParams = await params;
  return <ServiceDetailsPage id={resolvedParams.id} lang="ar" />; 
}
