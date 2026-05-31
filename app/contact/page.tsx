import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | DryClean Masters Delhi",
  description:
    "Get in touch with DryClean Masters for professional sofa, carpet, and upholstery cleaning in Delhi NCR. Call, WhatsApp, or fill in the form.",
};

export default function ContactPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
