import type { Metadata } from "next";
import Script from "next/script";
import { DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// ── SEO Metadata ──────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  manifest: "/site.webmanifest",
  verification: {
    google: "By-kRE7r8hD7_QdRpW9ag0POYy6CbcPEzFjFTuJOiLk",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "DryClean Masters" }],
  publisher: "DryClean Masters",
  other: {
    "geo.region": "IN",
    "geo.placename": "New Delhi",
    "geo.position": "28.613895;77.209006",
    "ICBM": "28.613895, 77.209006",
  },
};

// ── JSON-LD Structured Data ───────────────────────────────────────────────────

const schemaLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "DryClean Masters",
  logo: "https://www.drycleanmasters.com/img/Logo/DryCleanLogo-transparent.png",
  image: [
    "https://www.drycleanmasters.com/img/Logo/DryCleanLogo-transparent.png",
  ],
  "@id": "https://www.drycleanmasters.com/#localbusiness",
  url: "https://www.drycleanmasters.com/",
  telephone: "+918882631413",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "AJ 52E, Block BJ, West Shalimar Bagh, Shalimar Bagh",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110088",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.7159,
    longitude: 77.1558,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "09:00",
    closes: "21:00",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Delhi" },
    { "@type": "AdministrativeArea", name: "Noida" },
    { "@type": "AdministrativeArea", name: "Gurugram" },
    { "@type": "AdministrativeArea", name: "Ghaziabad" },
    { "@type": "AdministrativeArea", name: "Faridabad" },
  ],
  description:
    "Professional doorstep dry cleaning services in Delhi NCR specializing exclusively in premium furniture, upholstery, sofa, carpet, and office chair deep cleaning. We do NOT provide clothing laundry services.",
};

const schemaService = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Dry Cleaning Services in Delhi",
  provider: {
    "@type": "LocalBusiness",
    name: "DryClean Masters",
    url: "https://www.drycleanmasters.com/",
    logo: "https://www.drycleanmasters.com/img/Logo/DryCleanLogo-transparent.png",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Delhi NCR" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Furnishing and Upholstery Cleaning Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sofa Dry Cleaning",
          description:
            "Deep foam extraction, stain removal, and sanitization for fabric, suede, and velvet sofas.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Carpet Dry Cleaning",
          description:
            "Low-moisture shampooing and deep dirt extraction for residential rugs and commercial carpets.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Office Chair Dry Cleaning",
          description:
            "Bulk mesh and fabric desk chair dry cleaning for corporate offices with zero workspace downtime.",
        },
      },
    ],
  },
};

const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DryClean Masters",
  url: "https://www.drycleanmasters.com/",
  logo: "https://www.drycleanmasters.com/img/Logo/DryCleanLogo-transparent.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+918882631413",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  sameAs: [
    "https://www.facebook.com/DryCleanMasters/",
    "https://www.instagram.com/drycleanmasters/",
  ],
};

const schemaWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DryClean Masters",
  url: "https://www.drycleanmasters.com/",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.drycleanmasters.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const schemaImageObject = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": "https://www.drycleanmasters.com/#logo",
  url: "https://www.drycleanmasters.com/img/Logo/DryCleanLogo-transparent.png",
  caption: "DryClean Masters Official Logo",
  width: "128",
  height: "auto",
};

// ── Layout ────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${outfit.variable}`}>
      <head>
        {/* ── Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaImageObject) }}
        />
      </head>

      <body className="antialiased">
        {/* ── Google Tag Manager (noscript fallback) ── */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-558JJPM6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}

        {/* ── Google Tag Manager ── runs before React hydration */}
        <Script id="gtm" strategy="beforeInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-558JJPM6');
        `}</Script>

        {/* ── Google Analytics (GA4) ── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1JSJLYML1Z"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1JSJLYML1Z');
        `}</Script>

        {/* ── Microsoft Clarity ── lazy, non-critical */}
        <Script id="clarity" strategy="lazyOnload">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","wynpnob6ig");
        `}</Script>
      </body>
    </html>
  );
}
