/**
 * app/blog/page.jsx
 *
 * Blog listing page for drycleanmaster.in
 *
 * Features:
 *  - Full SEO metadata (title, description, OG, Twitter, canonical)
 *  - JSON-LD: Blog schema + BreadcrumbList
 *  - Server-side Firestore fetch (brand-filtered, published only, newest first)
 *  - Client-side search, tag filter, pagination via BlogListClient
 *  - Suspense loading skeleton
 *  - Mobile-first responsive layout
 */

export const revalidate = 60; // ISR: revalidate every 60 seconds

import { Suspense }    from "react";
// Blog content lives in the shared BlogSpot project (quick-cleaning-services-20400),
// which DryClean exposes as `qcsDb` (NOT `adminDb`, DryClean's own bookings project).
import { qcsDb as adminDb } from "@/firebase/firebase.admin";
import { autoExcerpt, collectAllTags } from "@/components/blog/BlogUtils";
import BlogListClient  from "@/components/blog/BlogListClient";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "@/app/styles/blog.css";

// ─── Site constants ───────────────────────────────────────────────────────────
const SITE_URL  = "https://drycleanmaster.in";
const SITE_NAME = "Dryclean Master";
const BRAND_ID  = "dryclean-master";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata = {
  title:       "Dry Cleaning Tips & Guides | Dryclean Master Blog",
  description: "Expert dry cleaning tips, fabric care guides, and upholstery maintenance advice from Dryclean Master. Professional sofa, carpet, and curtain care at your doorstep in Delhi NCR.",
  alternates:  { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title:       "Dry Cleaning Tips & Guides | Dryclean Master Blog",
    description: "Expert dry cleaning tips, fabric care guides, and upholstery maintenance advice.",
    type:        "website",
    url:         `${SITE_URL}/blog`,
    siteName:    SITE_NAME,
    images: [{
      url:    `${SITE_URL}/og-blog.jpg`,
      width:  1200,
      height: 630,
      alt:    "Dryclean Master Blog",
    }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Dry Cleaning Tips & Guides | Dryclean Master Blog",
    description: "Expert dry cleaning tips, fabric care guides, and upholstery maintenance advice.",
  },
  robots: { index: true, follow: true },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
function JsonLd({ blogs }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":       "Blog",
        "@id":         `${SITE_URL}/blog#blog`,
        name:          `${SITE_NAME} Blog`,
        url:           `${SITE_URL}/blog`,
        description:   "Expert dry cleaning tips, fabric care guides, and upholstery maintenance advice.",
        inLanguage:    "en-IN",
        publisher: {
          "@type": "Organization",
          name:    SITE_NAME,
          url:     SITE_URL,
        },
        blogPost: blogs.slice(0, 10).map((b) => ({
          "@type":       "BlogPosting",
          headline:      b.title,
          url:           `${SITE_URL}/blog/${b.slug}`,
          datePublished: b.createdAt,
          ...(b.image && { image: b.image }),
          description:   b.excerpt,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Server data fetch ────────────────────────────────────────────────────────
async function getPublishedBlogs() {
  try {
    const snap = await adminDb
      .collection("blogs")
      .where("brand",  "==", BRAND_ID)
      .where("status", "==", "published")
      .orderBy("createdAt", "desc")
      .get();

    return snap.docs.map((d) => {
      const data = d.data();

      const createdAt = data.createdAt?.toDate?.()?.toISOString() ?? null;
      const updatedAt = data.updatedAt?.toDate?.()?.toISOString() ?? null;

      return {
        id:          d.id,
        title:       data.title       || "",
        slug:        data.slug        || "",
        excerpt:     data.excerpt     || autoExcerpt(data.content || ""),
        image:       data.image       || "",
        tags:        data.tags        || [],
        status:      data.status      || "draft",
        readingTime: data.readingTime || null,
        layout:      data.layout      || "default",
        showTOC:     data.showTOC     ?? false,
        tocPosition: data.tocPosition || "sidebar",
        createdAt,
        updatedAt,
        content: "",
      };
    });
  } catch (err) {
    console.error("[blog/page] Firestore fetch failed:", err);
    return [];
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPage() {
  const blogs = await getPublishedBlogs();
  const tags  = collectAllTags(blogs);

  return (
    <>
      <JsonLd blogs={blogs} />
      <TopBar />
      <Header />

      <div className="min-h-screen bg-gray-50">

        {/* Page header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600 font-medium">
                <li>
                  <Link href="/" className="hover:text-gray-700 transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-gray-600" aria-current="page">Blog</li>
              </ol>
            </nav>

            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-3">
              Our Blog
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight mb-4 leading-[1.1]">
              Dry Cleaning Tips &amp; Guides
            </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed">
              Professional fabric care advice, sofa cleaning guides, and upholstery maintenance tips from the Dryclean Master team.
              {blogs.length > 0 && (
                <>
                  {" "}
                  <span className="font-semibold text-gray-700">
                    {blogs.length} article{blogs.length !== 1 ? "s" : ""}
                  </span>{" "}
                  and counting.
                </>
              )}
            </p>

            {/* Quick stat chips */}
            {blogs.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-full">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path
                      d="M2 6h8M6 2l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {blogs.length} Articles
                </span>
                {tags.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full">
                    🏷️ {tags.length} Topics
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Blog list (client: search + filter + pagination) */}
        <div id="main-content" aria-label="Blog posts">
          <Suspense fallback={<BlogListSkeleton />}>
            <BlogListClient initialBlogs={blogs} allTags={tags} />
          </Suspense>
        </div>

        {/* Bottom CTA strip */}
        <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50 border-t border-sky-100 mt-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                Need professional dry cleaning at your doorstep?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-md">
                Expert sofa, carpet, and upholstery cleaning in Delhi NCR. Fast service, spotless results, affordable pricing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="tel:+918882631413"
                className="inline-flex items-center justify-center gap-2 bg-white border border-sky-200 hover:border-sky-400 text-sky-600 font-semibold text-sm px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                📞 Call Now
              </Link>
              <Link
                href="https://wa.me/918882631413"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all duration-200"
              >
                💬 WhatsApp
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-lg shadow-sky-200 transition-all duration-200"
              >
                Book Now
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

      </div>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function BlogListSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex gap-4 mb-8">
        <div className="h-11 w-full max-w-sm bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-11 w-24 bg-gray-200 rounded-xl animate-pulse" />
      </div>
      <div className="flex gap-2 mb-8 flex-wrap">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-7 w-16 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>
      <div className="mb-6 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
        <div className="h-56 sm:h-72 bg-gray-100" />
        <div className="p-7 space-y-3">
          <div className="h-3 w-24 bg-gray-100 rounded-full" />
          <div className="h-7 w-3/4 bg-gray-100 rounded-full" />
          <div className="h-4 w-full bg-gray-100 rounded-full" />
          <div className="h-4 w-2/3 bg-gray-100 rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse"
          >
            <div className="h-48 bg-gray-100" />
            <div className="p-6 space-y-3">
              <div className="h-3 w-20 bg-gray-100 rounded-full" />
              <div className="h-5 w-full bg-gray-100 rounded-full" />
              <div className="h-5 w-3/4 bg-gray-100 rounded-full" />
              <div className="h-3 w-full bg-gray-100 rounded-full mt-3" />
              <div className="h-3 w-2/3 bg-gray-100 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
