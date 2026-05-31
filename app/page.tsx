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

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <WhyChoose />
        <Services />
        <About />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQ />
        <HomeContactForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
