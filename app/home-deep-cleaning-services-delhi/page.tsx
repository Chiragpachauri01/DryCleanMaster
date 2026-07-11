import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import HomeDeepCleaningContent from "@/components/HomeDeepCleaningContent";

export const metadata: Metadata = {
  title: "Home Deep Cleaning Services in Delhi NCR from ₹3498 | DryClean Masters",
  description:
    "Professional home deep cleaning services in Delhi NCR from ₹3,498. Verified experts, eco-friendly products, and transparent pricing for apartments, villas, and independent houses. Same-day appointments available.",
  keywords:
    "home deep cleaning services delhi ncr, home deep cleaning delhi, full house deep cleaning delhi, apartment deep cleaning delhi, move in cleaning delhi, move out cleaning delhi, post renovation cleaning delhi, festival cleaning delhi ncr, house deep cleaning services",
  alternates: {
    canonical: "https://www.drycleanmasters.com/home-deep-cleaning-services-delhi",
  },
  openGraph: {
    title: "Home Deep Cleaning Services in Delhi NCR from ₹3498 | DryClean Masters",
    description:
      "Professional home deep cleaning services in Delhi NCR from ₹3,498. Verified experts, eco-friendly products, and transparent pricing for apartments, villas, and independent houses.",
    url: "https://www.drycleanmasters.com/home-deep-cleaning-services-delhi",
    siteName: "DryClean Masters",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.drycleanmasters.com/img/home_deep_cleaning/real_home_deep.webp",
        width: 1200,
        height: 630,
        alt: "Home Deep Cleaning Services in Delhi NCR - DryClean Masters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Deep Cleaning Services in Delhi NCR from ₹3498 | DryClean Masters",
    description:
      "Professional home deep cleaning services in Delhi NCR from ₹3,498. Verified experts, eco-friendly products, and transparent pricing.",
    images: ["https://www.drycleanmasters.com/img/home_deep_cleaning/real_home_deep.webp"],
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
  name: "Home Deep Cleaning Services in Delhi NCR",
  description:
    "Professional home deep cleaning services in Delhi NCR for apartments, villas, and independent houses. Full house deep cleaning, festival cleaning, move-in and move-out cleaning, and post-renovation cleaning. Starting ₹3,498.",
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
      reviewCount: "15000",
    },
  },
  areaServed: { "@type": "AdministrativeArea", name: "Delhi NCR" },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "3498",
    highPrice: "8998",
    priceCurrency: "INR",
    offerCount: "4",
  },
  serviceType: "Home Deep Cleaning",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home Deep Cleaning Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "1 BHK Home Deep Cleaning",
          description: "Full home deep cleaning for a 1 BHK apartment",
        },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "3498",
          priceCurrency: "INR",
          unitText: "per home",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "2 BHK Home Deep Cleaning",
          description: "Full home deep cleaning for a 2 BHK apartment",
        },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "4998",
          priceCurrency: "INR",
          unitText: "per home",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "3 BHK Home Deep Cleaning",
          description: "Full home deep cleaning for a 3 BHK apartment",
        },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "6998",
          priceCurrency: "INR",
          unitText: "per home",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "4 BHK / Villa Home Deep Cleaning",
          description: "Full home deep cleaning for a 4 BHK apartment or villa",
        },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "8998",
          priceCurrency: "INR",
          unitText: "per home",
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
      name: "How much does home deep cleaning cost in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our home deep cleaning services start at ₹3,498 for a 1 BHK apartment, ₹4,998 for a 2 BHK, ₹6,998 for a 3 BHK, and ₹8,998 for a 4 BHK or villa. Final costs are determined by home size, bathroom count, current condition, and any add-ons you select.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a home deep cleaning take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 1 BHK typically takes 4-5 hours, a 2 BHK takes 5-7 hours, a 3 BHK takes 7-9 hours, and a 4 BHK or villa takes 9-12 hours. Actual time depends on the current condition of the home and any add-on services selected.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to be present during the entire cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Someone needs to provide house access and do a quick walkthrough with our team at the start. After that, you're free to leave and return in time for the final inspection.",
      },
    },
    {
      "@type": "Question",
      name: "Are your cleaning products safe for children and pets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all our products are non-toxic and eco-friendly. That said, we recommend keeping children and pets away from the specific area being actively cleaned until it dries.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer same-day home deep cleaning in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, same-day service is available for most Delhi NCR locations when you book before noon.",
      },
    },
    {
      "@type": "Question",
      name: "Is your cleaning team background-verified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, every technician undergoes background verification before joining our team.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I'm not satisfied with an area?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Any area that doesn't meet our cleaning standard is re-cleaned free of charge — just point it out during the final inspection.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I book a home deep cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every 3-6 months for a typical household, and quarterly for homes with children, pets, or allergy-prone family members.",
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
      name: "Home Deep Cleaning Services in Delhi NCR",
      item: "https://www.drycleanmasters.com/home-deep-cleaning-services-delhi",
    },
  ],
};

export default function HomeDeepCleaningPage() {
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
      <HomeDeepCleaningContent />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
