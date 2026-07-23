import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChoose from "@/components/WhyChoose";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import HomeContactForm from "@/components/HomeContactForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import RelatedWebStories from "@/components/webstory/RelatedWebStories";

export const metadata: Metadata = {
  title: "DryClean Masters | Home & Office Cleaning Services in Delhi NCR",
  description:
    "Professional Home & Office Cleaning Services in Delhi NCR. Sofa, Carpet, Mattress, Office Chair, Restaurant & Deep Cleaning with Same-Day Doorstep Service.",
  keywords:
    "sofa dry cleaning Delhi, carpet cleaning Delhi, mattress cleaning, upholstery cleaning, wet cleaning, fabric shampoo, premium cleaning service",
  alternates: {
    canonical: "https://www.drycleanmasters.com/",
  },
};

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <HomeContactForm />
        <WhyChoose />
        <Services />
        <About />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQ />
        {/* Latest web stories — after content, before footer */}
        <RelatedWebStories pageType="home" max={6} heading="Fabric-Care Tips & Web Stories" />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
