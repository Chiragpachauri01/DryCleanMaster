import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import HomeDeepCleaningContent from "@/components/HomeDeepCleaningContent";

export const metadata: Metadata = {
  title: "Home Deep Cleaning Services in Delhi NCR from ₹3498 | DryClean Masters",
  description:
    "Book professional home deep cleaning services in Delhi NCR with DryClean Masters. Verified experts, eco-friendly products, transparent pricing, and same-day appointments. Get a free quote today.",
  keywords:
    "home deep cleaning services delhi ncr, home deep cleaning delhi, full house deep cleaning delhi, apartment deep cleaning delhi, move in cleaning delhi, move out cleaning delhi, post renovation cleaning delhi, festival cleaning delhi ncr, house deep cleaning services",
  alternates: {
    canonical: "https://www.drycleanmasters.com/home-deep-cleaning-services-delhi",
  },
  openGraph: {
    title: "Home Deep Cleaning Services in Delhi NCR from ₹3498 | DryClean Masters",
    description:
      "Book professional home deep cleaning services in Delhi NCR with DryClean Masters. Verified experts, eco-friendly products, transparent pricing, and same-day appointments. Get a free quote today.",
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
      "Book professional home deep cleaning services in Delhi NCR with DryClean Masters. Verified experts, eco-friendly products, transparent pricing, and same-day appointments.",
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
      name: "How much does home deep cleaning cost in Delhi NCR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Home deep cleaning in Delhi NCR starts from 3498 for a 1 BHK house and 4998 for a 2 BHK. Final pricing would depend on your house's size, number of bathrooms, your house's condition, and any additional services. We would confirm the exact price before we start our job.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the cleaning take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 1 BHK takes about 4 to 5 hours, while a 3 BHK can take up to 7 to 9 hours. Cleaning time also depends on the services you opt for.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to be at home the whole time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. Someone just needs to walk us through the house and hand it over to us. Many customers leave after the walkthrough and return later only for inspection.",
      },
    },
    {
      "@type": "Question",
      name: "Are your products safe for children and pets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely. All our products are non-toxic and eco-friendly. We recommend keeping kids and pets away while we are cleaning. Once the surfaces are dry, everything is safe.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer same-day home deep cleaning in Delhi NCR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for most Delhi NCR areas, when you book before noon, we can come on the same day and clean your house. Just WhatsApp us your location and your house size for a same-day slot confirmation.",
      },
    },
    {
      "@type": "Question",
      name: "Do your team members come verified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, every team member is background verified before joining. We do not send unverified people into our customers' homes. You can seek information from us on any person who comes to your house.",
      },
    },
    {
      "@type": "Question",
      name: "What payment methods do you accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UPI, bank transfer, cash, and all major digital wallets are acceptable. You only need to pay after the service is complete, not before.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a satisfaction guarantee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If any part of the service doesn't meet our standards, we return and re-clean that area at no extra charge.",
      },
    },
    {
      "@type": "Question",
      name: "Do you do move-in cleaning for new homes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, top-to-bottom sanitisation of the entire house is a part of our service before your furniture arrives. It is one of our most popular service types.",
      },
    },
    {
      "@type": "Question",
      name: "Do you do festival cleaning before Diwali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, festival slots, especially in the week before Diwali, book up very quickly. We recommend booking at least a week in advance to ensure you get your preferred slot.",
      },
    },
    {
      "@type": "Question",
      name: "Can you clean a home that has never been professionally deep cleaned?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely, and honestly, these show the most dramatic results. The before-and-after difference in a first-time deep clean is usually surprising. If you have never booked a deep clean before, now would be the best time to do that.",
      },
    },
    {
      "@type": "Question",
      name: "Do you bring all your own equipment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Entirely. Machines, chemicals, cloths, mops - we bring everything ourselves. We might, however, need water and electricity from you.",
      },
    },
    {
      "@type": "Question",
      name: "Can I ask for extra attention on specific areas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, that is a part of our custom deep cleaning services in Delhi NCR. During the initial walkthrough, you can mention the areas that you want specific attention on. Our team would note that and ensure that these areas are given priority.",
      },
    },
    {
      "@type": "Question",
      name: "Do you clean independent houses and villas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We inspect larger properties on-site and give you a price quote based on the team size needed and other factors.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I book a deep clean in Delhi NCR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Considering Delhi's pollution, every 3 to 6 months is optimum for most households. However, if your house has children, pets, or allergy-sensitive individuals, a three-month cycle would be the best choice for you. For working households too, quarterly booking might be the right rhythm.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between regular cleaning and deep cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Regular cleaning is about the maintenance of the house; it keeps things from getting worse. Deep cleaning is restoring your house and reaching what regular cleaning has been missing. Think of this as a difference between wiping a kitchen and actually cleaning a kitchen.",
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
