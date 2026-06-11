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

export const metadata: Metadata = {
  title: "Premium Sofa and Carpet Cleaning in Delhi: DryClean Masters",
  description:
    "Looking for professional dry cleaning services in Delhi? DryClean Masters offers same-day dry clean service at home for sofas, carpets, etc. Contact us today!",
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

      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
