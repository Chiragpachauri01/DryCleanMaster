import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CarpetCleaningContent from "@/components/CarpetCleaningContent";

export const metadata: Metadata = {
  title: "Best Carpet Cleaning Services in Delhi at DryClean Masters",
  description:
    "Book expert carpet cleaning services in Delhi with DryClean Masters. Deep stain removal, carpet shampooing, sanitisation, same-day and doorstep service available.",
  keywords:
    "carpet cleaning services delhi, carpet cleaning near me, doorstep carpet cleaning delhi, carpet shampooing service delhi, professional carpet cleaning delhi, rug cleaning delhi, office carpet cleaning delhi, carpet stain removal delhi",
  alternates: {
    canonical: "https://www.drycleanmasters.com/carpet-cleaning-services-delhi",
  },
  openGraph: {
    title: "Best Carpet Cleaning Services in Delhi at DryClean Masters",
    description:
      "Book expert carpet cleaning services in Delhi with DryClean Masters. Deep stain removal, carpet shampooing, sanitisation, same-day and doorstep service available.",
    url: "https://www.drycleanmasters.com/carpet-cleaning-services-delhi",
    siteName: "DryClean Masters",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.drycleanmasters.com/img/carpet_cleaning/Carpet_Image_Hero_Banner.webp",
        width: 1200,
        height: 630,
        alt: "Professional Carpet Cleaning Services in Delhi - DryClean Masters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Carpet Cleaning Services in Delhi at DryClean Masters",
    description:
      "Book expert carpet cleaning services in Delhi with DryClean Masters. Deep stain removal, carpet shampooing, sanitisation, same-day and doorstep service available.",
    images: [
      "https://www.drycleanmasters.com/img/carpet_cleaning/Carpet_Image_Hero_Banner.webp",
    ],
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
  "@id": "https://www.drycleanmasters.com/carpet-cleaning-services-delhi#service",
  name: "Carpet Cleaning Services in Delhi",
  url: "https://www.drycleanmasters.com/carpet-cleaning-services-delhi",
  description:
    "DryClean Masters provides professional Carpet Cleaning Services in Delhi for homes, offices and commercial spaces. Whether you are searching for Carpet Cleaning Near Me, Carpet Shampooing Service Delhi, Doorstep Carpet Cleaning Delhi, Office Carpet Cleaning Services Delhi or Best Rug Cleaners in Delhi, our trained team delivers deep carpet cleaning, stain removal, shampooing, sanitisation and odour removal using professional equipment at your doorstep across Delhi.",
  serviceType: "Carpet Cleaning Service",
  category: "Cleaning Service",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Delhi NCR",
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
      name: "How long does carpet cleaning take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depending on your carpet size, it might take around 1.5-3.5 hours. The time includes all steps, including inspection and grooming. We will tell you the time estimate after inspection before starting.",
      },
    },
    {
      "@type": "Question",
      name: "Is carpet shampooing safe for all carpet types?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, for wool, silk, or handwoven carpets, shampooing might not be the best option. For these carpets, dry cleaning methods are best suitable. Carpet shampooing methods are generally preferred for synthetic carpets.",
      },
    },
    {
      "@type": "Question",
      name: "Can old and set-in stains be removed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depending on the stain type, the type of carpet fabric, and whether your previous DIY treatments have changed the stain, most old stains can be removed with our specific stain-targeted treatment. We will tell you during the inspection stage whether a stain can be removed.",
      },
    },
    {
      "@type": "Question",
      name: "Is professional carpet cleaning safe for children and pets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all the products we use are environmentally friendly and non-toxic. Even then, we recommend keeping children and pets out of the room while we clean, but after an hour of finishing, the room is fit for everyone.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer doorstep carpet cleaning in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, that's our speciality. We do not ask you to transport anything; we would come to your doorstep, clean your carpet, and leave your room just like we found it, without creating any ruckus.",
      },
    },
    {
      "@type": "Question",
      name: "How long would my carpet take to dry after cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For synthetic carpets, it would take 2-4 hours to dry, but for thick pile carpets like wool, it might take 4-6 hours to dry off completely. We aid in drying with our air-mover equipment and leave your carpet slightly damp, rather than dripping.",
      },
    },
    {
      "@type": "Question",
      name: "Can professional cleaning remove bad odour from my carpet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most odours like food, dust, or mustiness, yes, the odour would go away completely. But for deep-set odours like pet urine, it would take specialised treatment using bio-enzymes. The results would be satisfactory.",
      },
    },
    {
      "@type": "Question",
      name: "Do you clean office carpets and commercial spaces?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, office carpet cleaning services Delhi are our specialised service. We offer office-friendly hours, including weekend, early morning, and evening hours, so that your operations are not disrupted.",
      },
    },
    {
      "@type": "Question",
      name: "Do you use machines in carpet cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we use commercial hot water extraction machines, HEPA vacuums, rotary pile grooming machines, and air-mover dryers to give a deep cleaning to your carpet.",
      },
    },
    {
      "@type": "Question",
      name: "How often should carpets be professionally cleaned?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For an average Delhi house with children and pets, every 3-6 months is a suitable time. For offices with high traffic, consider getting professional cleaning every 3-4 months.",
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
      name: "Carpet Cleaning Services in Delhi",
      item: "https://www.drycleanmasters.com/carpet-cleaning-services-delhi",
    },
  ],
};

export default function CarpetCleaningPage() {
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
      <CarpetCleaningContent />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
