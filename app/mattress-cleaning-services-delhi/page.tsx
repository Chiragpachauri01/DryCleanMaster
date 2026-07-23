import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MattressCleaningContent from "@/components/MattressCleaningContent";

export const metadata: Metadata = {
  title: "Mattress Cleaning Services in Delhi NCR | DryClean Masters",
  description:
    "Professional mattress deep cleaning & sanitisation in Delhi. Doorstep service, UV-C dust mite reduction, stain treatment. Book today! Services starting from ₹399",
  keywords:
    "mattress cleaning services Delhi, mattress deep cleaning Delhi, mattress sanitisation Delhi, mattress dry cleaning Delhi, bed mattress cleaning services, doorstep mattress cleaning Delhi, professional mattress cleaning, UV sanitisation mattress Delhi",
  alternates: {
    canonical: "https://www.drycleanmasters.com/mattress-cleaning-services-delhi",
  },
  openGraph: {
    title: "Mattress Cleaning Services in Delhi NCR | DryClean Masters",
    description:
      "Professional mattress deep cleaning & sanitisation in Delhi. Doorstep service, UV-C dust mite reduction, stain treatment. Book today! Services starting from ₹399",
    url: "https://www.drycleanmasters.com/mattress-cleaning-services-delhi",
    siteName: "DryClean Masters",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.drycleanmasters.com/img/Mattress/3.webp",
        width: 1200,
        height: 630,
        alt: "Mattress Cleaning Services in Delhi - DryClean Masters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mattress Cleaning Services in Delhi NCR | DryClean Masters",
    description:
      "Professional mattress deep cleaning & sanitisation in Delhi. Doorstep service, UV-C dust mite reduction, stain treatment. Book today! Services starting from ₹399",
    images: ["https://www.drycleanmasters.com/img/Mattress/3.webp"],
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "New Delhi",
    "geo.position": "28.613895;77.209006",
    "ICBM": "28.613895, 77.209006",
  },
};

const schemaService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.drycleanmasters.com/mattress-cleaning-services-delhi#service",
  name: "Mattress Cleaning Services in Delhi",
  url: "https://www.drycleanmasters.com/mattress-cleaning-services-delhi",
  description:
    "DryClean Masters provides professional mattress cleaning services Delhi residents can book conveniently at their doorstep. Our bed mattress cleaning services and mattress deep cleaning services help remove embedded dust, dirt, stains, unpleasant odours and allergens from different types of mattresses. Customers looking for mattress cleaning at home, mattress cleaning in Delhi or mattress dry cleaning Delhi can schedule an on-site service according to their mattress type and condition. We also provide mattress sanitization services to improve mattress hygiene and freshness.",
  serviceType: "Mattress Cleaning and Sanitization",
  category: "Mattress Cleaning Service",
  areaServed: {
    "@type": "City",
    name: "Delhi",
  },
  provider: {
    "@id": "https://www.drycleanmasters.com/#localbusiness",
  },
};

const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does mattress cleaning cost in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our mattress cleaning services in Delhi start at ₹399 for a single mattress deep clean and ₹599 for a double mattress. Queen and king sizes range from ₹699 to ₹999. Final pricing is confirmed after on-site inspection based on stain severity and treatment required.",
      },
    },
    {
      "@type": "Question",
      name: "How long does mattress cleaning take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard double or queen mattress deep clean takes approximately 1 to 1.5 hours, including inspection, vacuuming, treatment, and UV-C sanitisation. Larger mattresses or those with multiple stains may take slightly longer.",
      },
    },
    {
      "@type": "Question",
      name: "How long before I can sleep on the mattress after cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With our low-moisture method, most mattresses are ready for bedding within 3 to 5 hours. We recommend allowing the full drying window before placing sheets back on to ensure complete moisture removal.",
      },
    },
    {
      "@type": "Question",
      name: "Can you remove old urine stains and odour completely?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In most cases, yes. Our bio-enzyme treatment is specifically designed to break down urine compounds chemically and not just mask the odour. Very old, deeply set stains may require two treatment sessions for complete removal, which our technician will advise during inspection.",
      },
    },
    {
      "@type": "Question",
      name: "Is mattress cleaning safe for children and people with allergies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, in fact it is specifically beneficial for allergy sufferers. All chemicals used are non-toxic and child-safe, and the UV-C sanitisation process is specifically designed to target the dust mites that trigger childhood allergies and asthma.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer mattress cleaning at home, or do I need to bring it somewhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All our services are doorstep-based. We bring our complete professional equipment and team to your home so that your mattress does not need to be transported anywhere.",
      },
    },
    {
      "@type": "Question",
      name: "Can you clean both sides of the mattress?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, this is available as an add-on service. Many customers don't realise the underside often has more hidden contamination, particularly moisture-related issues, than the top, especially with non-ventilated bed bases.",
      },
    },
    {
      "@type": "Question",
      name: "Do you sanitise the mattress or just clean it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our standard deep cleaning service includes UV-C sanitisation as part of the process, not as a separate optional extra. This is specifically what targets dust mites and bacteria beyond visible dirt and stains.",
      },
    },
    {
      "@type": "Question",
      name: "Is mattress dry cleaning in Delhi different from wet cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our process uses a controlled low-moisture method specifically because mattress foam cannot handle the kind of heavy water extraction used on carpets or sofas. This protects against fungus risk while still achieving a genuine deep clean.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I get my mattress professionally cleaned?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every 6 months for a standard household mattress in regular use and every 3 to 4 months for households with allergy-sensitive sleepers, pets, or young children. Post-monsoon cleaning is also strongly recommended for Delhi homes.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer same-day mattress cleaning in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for most areas when you book before noon, our team will arrive on the same day and finish the job. WhatsApp us your location and mattress size for same-day confirmation.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a sanitisation-only service and a full deep cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sanitisation only includes HEPA vacuuming and UV-C treatment. This is ideal for routine maintenance on a relatively clean mattress. Full deep cleaning adds stain treatment and low-moisture extraction, which is recommended when there is visible staining, odour, or it has been a long time since the last professional service.",
      },
    },
    {
      "@type": "Question",
      name: "Can hotels and PGs book recurring mattress cleaning services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer scheduled recurring service plans for hospitality businesses, PG accommodations, and rental property managers with bulk pricing for multi-mattress bookings.",
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
      name: "Mattress Cleaning Services in Delhi",
      item: "https://www.drycleanmasters.com/mattress-cleaning-services-delhi",
    },
  ],
};

export default function MattressCleaningPage() {
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
      <MattressCleaningContent />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
