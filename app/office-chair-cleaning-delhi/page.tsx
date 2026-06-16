import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ChairCleaningContent from "@/components/ChairCleaningContent";

export const metadata: Metadata = {
  title: "Office Chair Cleaning Services in Delhi | DryClean Masters",
  description:
    "Professional home and office chair cleaning services in Delhi. Same-day doorstep service, fabric-safe chemicals & deep-extraction. Book now - ₹149/chair onwards",
  keywords:
    "office chair cleaning services delhi, chair cleaning near me, desk chair cleaning delhi, office chair dry cleaning charges, commercial chair cleaning service delhi, gaming chair cleaning, chair shampooing near me, bulk chair cleaning delhi",
  alternates: {
    canonical: "https://www.drycleanmasters.com/office-chair-cleaning-delhi",
  },
  openGraph: {
    title: "Office Chair Cleaning Services in Delhi | DryClean Masters",
    description:
      "Professional home and office chair cleaning services in Delhi. Same-day doorstep service, fabric-safe chemicals & deep-extraction. Book now - ₹149/chair onwards",
    url: "https://www.drycleanmasters.com/office-chair-cleaning-delhi",
    siteName: "DryClean Masters",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.drycleanmasters.com/img/office_images/21.webp",
        width: 1200,
        height: 630,
        alt: "Professional Office Chair Cleaning Services in Delhi - DryClean Masters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Office Chair Cleaning Services in Delhi | DryClean Masters",
    description:
      "Professional home and office chair cleaning services in Delhi. Same-day doorstep service, fabric-safe chemicals & deep-extraction.",
    images: ["https://www.drycleanmasters.com/img/office_images/21.webp"],
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "New Delhi",
    "geo.position": "28.613895;77.209006",
    ICBM: "28.613895, 77.209006",
  },
};

const schemaService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Office Chair Cleaning Services in Delhi",
  description:
    "Professional doorstep office chair cleaning services in Delhi NCR. Deep extraction, anti-microbial sanitisation, same-day service for all chair types. Starting ₹149/chair.",
  provider: {
    "@type": "LocalBusiness",
    name: "DryClean Masters",
    "@id": "https://www.drycleanmasters.com/#localbusiness",
    telephone: "+918882631413",
    url: "https://www.drycleanmasters.com/",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      reviewCount: "12000",
    },
  },
  areaServed: { "@type": "AdministrativeArea", name: "Delhi NCR" },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "149",
    highPrice: "299",
    priceCurrency: "INR",
    offerCount: "7",
  },
  serviceType: "Chair Cleaning",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Chair Cleaning Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Standard Office / Task Chair Cleaning",
          description: "Deep extraction cleaning for standard office chairs",
        },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "149",
          priceCurrency: "INR",
          unitText: "per chair",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Executive Chair Cleaning (Fabric)",
          description: "Professional cleaning for executive fabric chairs",
        },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "199",
          priceCurrency: "INR",
          unitText: "per chair",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Executive Chair Cleaning (Leather)",
          description: "Leather-safe cleaning and conditioning for executive chairs",
        },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "299",
          priceCurrency: "INR",
          unitText: "per chair",
        },
      },
    ],
  },
};

const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does a cleaned chair take to dry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard fabric chair takes 2-4 hours to dry, leather chairs are usable within 1-2 hours, thick velvet and heavily padded chairs may take up to 5-6 hours to dry.",
      },
    },
    {
      "@type": "Question",
      name: "Can you remove the sweat smell from office chairs completely?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Our anti-microbial treatment eliminates the bacterial source of the odour, not just the surface smell. However, chairs with severe odour buildup may need 2 sessions to eliminate it completely.",
      },
    },
    {
      "@type": "Question",
      name: "Do you handle bulk office chair cleaning in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, bulk office chairs from 10 chairs upwards are a core part of our business. We would provide a team dedicated to large-volume jobs which can be completed in after-hours and weekend slots.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer same-day chair cleaning in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for most areas when booked before noon. WhatsApp us your location and quantity, and we will come and clean your chairs on the same day.",
      },
    },
    {
      "@type": "Question",
      name: "Is chair cleaning safe for expensive executive chairs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, as we do fabric assessment before applying any product, our methods are safe for expensive executive chairs. We've cleaned executive chairs from Herman Miller, Haworth, Steelcase, and most premium brands without issue.",
      },
    },
    {
      "@type": "Question",
      name: "How often should office chairs be professionally cleaned?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For chairs in daily use, consider professional cleaning every 3-6 months. House chairs can be cleaned every 6-8 months. Coworking space chairs should be cleaned quarterly.",
      },
    },
    {
      "@type": "Question",
      name: "Can you clean ergonomic mesh chairs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, mesh chairs require a different approach than a fabric chair. It requires specialist tools to get into the mesh structure. Our technicians are specially trained for mesh chair cleaning.",
      },
    },
  ],
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.drycleanmasters.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Office Chair Cleaning Services in Delhi",
      item: "https://www.drycleanmasters.com/office-chair-cleaning-delhi",
    },
  ],
};

export default function ChairCleaningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />
      <TopBar />
      <Header />
      <ChairCleaningContent />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
