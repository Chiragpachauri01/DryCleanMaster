import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us | DryClean Masters Delhi-NCR",
  description:
    "Learn the DryClean Masters story: premium doorstep sofa, carpet, mattress, curtain, chair, and upholstery dry cleaning across Delhi-NCR.",
};

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <Header />
      <AboutPageContent />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
