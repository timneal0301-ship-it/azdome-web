"use client";

import { usePathname } from "next/navigation";

import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import TranslationProgressBanner from "./TranslationProgressBanner";

export default function PublicChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }
  return (
    <>
      <AnnouncementBar />
      <TranslationProgressBanner />
      <Navbar />
      {children}
      <Footer />
      <CartDrawer />
    </>
  );
}
