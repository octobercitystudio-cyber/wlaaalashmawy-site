import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

import { fetchSettings, fetchServices } from '@/lib/api';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchSettings();
  const services = await fetchServices();

  return (
    <>
      <Navbar settings={settings} services={services} />
      {children}
      <Footer settings={settings} services={services} />
      <WhatsAppButton settings={settings} />
    </>
  );
}
