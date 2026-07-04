import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import OfficeCleaningContent from "@/components/OfficeCleaningContent";

export const metadata: Metadata = {
  title: "Professional Office Cleaning Services in Delhi NCR | DryClean Masters",
  description:
    "Professional office cleaning services in Delhi NCR for corporate offices, startups, clinics, and commercial spaces. Deep cleaning, office chair cleaning, carpet care, and flexible after-hours service. Get a free quote today.",
  keywords:
    "office cleaning services delhi ncr, commercial office cleaning delhi, office deep cleaning services delhi, corporate office cleaning, after-hours office cleaning, office carpet cleaning, office chair cleaning delhi, commercial cleaning delhi ncr",
  alternates: {
    canonical: "https://www.drycleanmasters.com/office-cleaning-services-delhi",
  },
  openGraph: {
    title: "Professional Office Cleaning Services in Delhi NCR | DryClean Masters",
    description:
      "Professional office cleaning services in Delhi NCR for corporate offices, startups, clinics, and commercial spaces. Deep cleaning, office chair cleaning, carpet care, and flexible after-hours service.",
    url: "https://www.drycleanmasters.com/office-cleaning-services-delhi",
    siteName: "DryClean Masters",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.drycleanmasters.com/img/office_cleaning_Delhi/1.webp",
        width: 1200,
        height: 630,
        alt: "Professional Office Cleaning Services in Delhi NCR - DryClean Masters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Office Cleaning Services in Delhi NCR | DryClean Masters",
    description:
      "Professional office cleaning services in Delhi NCR for corporate offices, startups, clinics, and commercial spaces.",
    images: ["https://www.drycleanmasters.com/img/office_cleaning_Delhi/1.webp"],
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
  name: "Office Cleaning Services in Delhi NCR",
  description:
    "Professional office cleaning, commercial office cleaning and office deep cleaning services in Delhi NCR. Workstation, chair, carpet, reception, pantry, washroom and high-touch sanitisation with flexible after-hours scheduling. Starting ₹6 per sq.ft.",
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
    lowPrice: "2999",
    highPrice: "9998",
    priceCurrency: "INR",
    offerCount: "4",
  },
  serviceType: "Office Cleaning",
};

const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is included in office cleaning services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our office cleaning services in Delhi cover workstation cleaning, washroom cleaning, pantry cleaning, reception area cleaning, meeting room cleaning, glass partition cleaning, carpet vacuuming, floor mopping, waste removal, and complete office sanitisation. Office chair cleaning and carpet deep cleaning are also available as additional services.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between office cleaning and office deep cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Regular office cleaning is maintenance. It helps maintain the standard of your office on regular days. Office deep cleaning services in Delhi NCR mean restoration, accessing areas that routine cleaning does not. Deep cleaning is done quarterly, while regular cleaning can be done as many times a week.",
      },
    },
    {
      "@type": "Question",
      name: "How often should an office be professionally cleaned?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most Delhi offices can do well with regular cleaning of 2-3 times a week, combined with a quarterly deep clean. For offices with high traffic, we recommend more frequent professional cleaning.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide after-hours office cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! At DryClean Masters, we provide a 24-hour service, 7 days a week. You can book early morning slots or later in the evening so that your office hours are not disrupted.",
      },
    },
    {
      "@type": "Question",
      name: "Can you clean office chairs and carpets as part of the service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, office chair cleaning and carpet vacuuming are available in our commercial office cleaning services. However, if you require office chair extraction cleaning and carpet deep cleaning, they would be available as additional services, which you can opt for.",
      },
    },
    {
      "@type": "Question",
      name: "How much does office cleaning cost in Delhi NCR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our office cleaning costs start from ₹6 per sq.ft for small offices and vary based on office size, number of workstations, and requirements. Pricing would be confirmed after the first inspection.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer same-day office cleaning in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for urgent requirements and if you book before noon, same-day commercial cleaning is available in most Delhi NCR areas.",
      },
    },
    {
      "@type": "Question",
      name: "Which industries do you serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We clean corporate offices, startups, coworking spaces, BPOs, call centres, clinics, educational institutions, retail offices, restaurants, and cafes across Delhi and NCR areas.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide one-time service as well as commercial cleaning contracts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide recurring service contracts as well as one-time service. You can schedule our visits accordingly. You will get a dedicated contact person and fixed monthly pricing. If you want consistent and managed office hygiene, a contract is the best thing.",
      },
    },
    {
      "@type": "Question",
      name: "Can office cleaning be done without disrupting office operations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with our 24-hour service, you can schedule your slots around your office timings. If you require cleaning during office hours, we also do sectional cleaning, in which one part is finished before moving on to the other, to ensure the whole office doesn't get disturbed.",
      },
    },
    {
      "@type": "Question",
      name: "Do you bring your own equipment and supplies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely. All chemicals, equipment, and supplies are provided by our team. You won't need to stock any chemicals or prepare anything.",
      },
    },
    {
      "@type": "Question",
      name: "How long does office cleaning take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard clean for a 1,000 sq ft office with 20 workstations takes approximately 2-3 hours. Deep cleaning that space might take 4-6 hours. We will tell you the estimated time during the inspection.",
      },
    },
    {
      "@type": "Question",
      name: "Do you compensate for any damage done during cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, in case our technicians do any damage, we compensate for that. Our technicians are trained to work around high-value equipment and the damages are rare to non-existent. Still, it is advised that you remove any valuable products and pieces before we arrive.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide a free inspection as part of your office cleaning services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The inspection is included in our service contact. Once you register a service, we arrive and assess your workplace to give you a price quote. Stand-alone inspection, however, is not included with our services.",
      },
    },
    {
      "@type": "Question",
      name: "Can you clean IT equipment and work desks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we clean monitors, keyboards, untangle wires, and other office equipment without damage. We know how much dust these workstations hold and any office cleaning without cleaning them is incomplete.",
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
      name: "Office Cleaning Services in Delhi NCR",
      item: "https://www.drycleanmasters.com/office-cleaning-services-delhi",
    },
  ],
};

export default function OfficeCleaningPage() {
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
      <OfficeCleaningContent />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
