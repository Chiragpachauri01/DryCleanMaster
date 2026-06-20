import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SofaDryCleaningContent from "@/components/SofaDryCleaningContent";

export const metadata: Metadata = {
  title: "Sofa Dry Cleaning Services in Delhi at DryClean Masters",
  description:
    "Book premium sofa dry cleaning services in Delhi with DryClean Masters. Doorstep cleaning, fabric-safe shampooing, leather polishing, and free inspection visit.",
  keywords:
    "sofa dry cleaning Delhi, sofa dry cleaning services in Delhi, sofa cleaning near me, sofa shampooing service Delhi, leather sofa cleaning Delhi, doorstep sofa dry cleaning in Delhi, sofa dry cleaning charges Delhi, best sofa dry cleaners Delhi",
  alternates: {
    canonical: "https://www.drycleanmasters.com/sofa-dry-cleaning-delhi",
  },
  openGraph: {
    title: "Sofa Dry Cleaning Services in Delhi at DryClean Masters",
    description:
      "Book premium sofa dry cleaning services in Delhi with DryClean Masters. Doorstep cleaning, fabric-safe shampooing, leather polishing, and free inspection visit.",
    url: "https://www.drycleanmasters.com/sofa-dry-cleaning-delhi",
    siteName: "DryClean Masters",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.drycleanmasters.com/img/service-sofa-dry.webp",
        width: 1200,
        height: 630,
        alt: "Sofa Dry Cleaning Services in Delhi - DryClean Masters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sofa Dry Cleaning Services in Delhi at DryClean Masters",
    description:
      "Book premium sofa dry cleaning services in Delhi with DryClean Masters. Doorstep cleaning, fabric-safe shampooing, leather polishing, and free inspection visit.",
    images: ["https://www.drycleanmasters.com/img/service-sofa-dry.webp"],
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "New Delhi",
    "geo.position": "28.613895;77.209006",
    "ICBM": "28.613895, 77.209006",
  },
};

// ── Page-level JSON-LD schemas ────────────────────────────────────────────────

const schemaService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Sofa Dry Cleaning Services in Delhi",
  description:
    "Professional doorstep sofa dry cleaning services in Delhi. Fabric-safe treatments for velvet, suede, leather, and all upholstery types. Starting ₹200 per seat.",
  provider: {
    "@type": "LocalBusiness",
    name: "DryClean Masters",
    "@id": "https://www.drycleanmasters.com/#localbusiness",
    telephone: "+918882625522",
    url: "https://www.drycleanmasters.com/",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      reviewCount: "12000",
    },
  },
  areaServed: { "@type": "AdministrativeArea", name: "Delhi" },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "200",
    highPrice: "900",
    priceCurrency: "INR",
    offerCount: "15",
  },
  serviceType: "Sofa Dry Cleaning",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sofa Dry Cleaning Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fabric Sofa Dry Cleaning",
          description: "Dry cleaning for fabric, cotton, polyester sofas",
        },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "200",
          priceCurrency: "INR",
          unitText: "per seat",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Velvet Sofa Dry Cleaning",
          description: "Specialist dry cleaning for velvet sofas",
        },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "250",
          priceCurrency: "INR",
          unitText: "per seat",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Leather Sofa Cleaning and Polishing",
          description:
            "Deep cleaning, conditioning, and polishing for leather sofas",
        },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "700",
          priceCurrency: "INR",
          unitText: "full package per seat",
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
      name: "What are the sofa dry cleaning charges in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our pricing starts at ₹200 per seat for standard fabric sofas with dry cleaning, and ₹250 per seat for wet shampoo cleaning. A 3-seater sofa dry clean starts from approximately ₹600. Leather sofa cleaning and polishing Delhi starts at ₹350 per seat. All prices are confirmed after a free in-person inspection.",
      },
    },
    {
      "@type": "Question",
      name: "How often should a sofa be professionally cleaned?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DryClean Masters provides doorstep sofa dry cleaning across all Delhi areas - South, North, East, West, and Central. You can book via our website, call us at +91 8882625522, or WhatsApp us for a same-day or next-day appointment.",
      },
    },
    {
      "@type": "Question",
      name: "How long does sofa dry cleaning take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a standard 3-seater sofa, the dry cleaning process takes approximately 1.5 to 2.5 hours. A full 7-seater set takes 3 to 4 hours. Wet shampoo cleaning takes slightly longer due to the drying process.",
      },
    },
    {
      "@type": "Question",
      name: "How long before a shampooed sofa is ready to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After wet shampoo cleaning with our high-power moisture extraction, sofas are typically dry and ready to sit on within 3 to 5 hours.",
      },
    },
    {
      "@type": "Question",
      name: "Is dry cleaning safe for velvet and suede sofas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! In fact, dry cleaning is the only recommended method for velvet and genuine suede. Wet washing or steam cleaning can permanently damage the pile of velvet and cause severe water-marking on suede. Our velvet and suede cleaning methods are specifically designed to protect these sensitive fabrics.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in leather sofa cleaning and polishing in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our full leather care package includes pH-balanced deep cleaning to remove surface grime and body oil, deep conditioning to restore moisture and prevent cracking, colour-matched polishing to restore surface lustre, and a UV-protective finishing coat. We stock products matched to all leather types, including full grain, aniline, semi-aniline, and pigmented leather.",
      },
    },
    {
      "@type": "Question",
      name: "Can you remove old, set-in stains from sofas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In many cases, yes, but results depend on the stain type, the fabric, how long the stain has been there, and whether previous DIY cleaning attempts have altered it. Our technician will assess each stain during the inspection and give you an honest answer before cleaning begins.",
      },
    },
    {
      "@type": "Question",
      name: "Do you bring your own equipment and chemicals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, entirely. Our technicians arrive with professional industrial extraction equipment, HEPA vacuums, full chemical kits, protective covers, and all necessary tools. You don't need to provide anything.",
      },
    },
    {
      "@type": "Question",
      name: "Is the sofa dry cleaning service safe for children and pets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All our products are non-toxic, biodegradable, and free from harmful chemical residues. We recommend keeping children and pets away from the sofa during cleaning and for approximately 1 hour after. Once the sofa is dry, it is completely safe.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I choose DryClean Masters over other sofa dry cleaners in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "10+ years of specialist upholstery experience, 40+ certified technicians, free in-person inspection, fabric-safe guarantee, eco-safe chemical standards, transparent pricing, and a track record of 12,000+ sofa cleans across Delhi.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer same-day sofa dry cleaning in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. For most Delhi areas, same-day doorstep service is available when you book before noon. Contact us via WhatsApp or phone to check same-day availability for your specific location.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I get my sofa professionally cleaned?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a sofa in regular daily use in a Delhi home, professional cleaning every 6 to 12 months is recommended. Homes with pets, young children, or allergy sufferers should consider cleaning every 3 to 6 months.",
      },
    },
    {
      "@type": "Question",
      name: "Can you clean a sofa with a \"DryClean Only\" care label?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our dry cleaning service is specifically designed for sofas with dry-clean-only care instructions. We use low-moisture methods that comply with these care requirements.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I'm not satisfied with the results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a free redo guarantee. If any aspect of the service doesn't meet your expectations, we will address it at zero charge.",
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
      name: "Sofa Dry Cleaning Services in Delhi",
      item: "https://www.drycleanmasters.com/sofa-dry-cleaning-delhi",
    },
  ],
};

export default function SofaDryCleaningPage() {
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
      <SofaDryCleaningContent />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
