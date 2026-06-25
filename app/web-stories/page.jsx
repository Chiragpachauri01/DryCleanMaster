/**
 * app/web-stories/page.jsx
 *
 * Web Stories listing page for drycleanmaster.in
 *  - Server-side Firestore fetch (brand-filtered, published only, newest first)
 *  - SEO metadata + JSON-LD (ItemList of stories)
 *  - Poster grid; each card links to the full-screen story player
 *
 * Mirrors the blog listing data pattern (same adminDb, same brand filter)
 * and the same site chrome (TopBar / Header / Footer / FloatingWhatsApp).
 */

export const revalidate = 60;

import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { brand } from "@/lib/brand";
import { getPublishedStories } from "@/lib/webstories";

const SITE_URL  = brand.siteUrl;
const SITE_NAME = brand.name;
const PER_PAGE  = 12;

export const metadata = {
  title:       `Web Stories | ${SITE_NAME}`,
  description: "Quick, visual fabric-care and upholstery cleaning stories from Dryclean Master. Tap through bite-sized tips for sofas, carpets, and curtains.",
  alternates:  { canonical: `${SITE_URL}/web-stories/` },
  openGraph: {
    title:    `Web Stories | ${SITE_NAME}`,
    description: "Quick, visual fabric-care and upholstery cleaning stories.",
    type:     "website",
    url:      `${SITE_URL}/web-stories/`,
    siteName: SITE_NAME,
  },
  robots: { index: true, follow: true },
};

function JsonLd({ stories }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: stories.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/web-stories/${s.slug}/`,
      name: s.title,
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Web Stories", item: `${SITE_URL}/web-stories/` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}

export default async function WebStoriesPage({ searchParams }) {
  const sp = await searchParams;
  const all = await getPublishedStories();

  const totalPages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const rawPage = parseInt(sp?.page, 10);
  const page = Number.isFinite(rawPage) ? Math.min(Math.max(rawPage, 1), totalPages) : 1;
  const start = (page - 1) * PER_PAGE;
  const stories = all.slice(start, start + PER_PAGE);
  const pageHref = (p) => (p <= 1 ? "/web-stories/" : `/web-stories/?page=${p}`);

  return (
    <>
      <JsonLd stories={stories} />
      <TopBar />
      <Header />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600 font-medium">
                <li><Link href="/" className="hover:text-gray-700 transition-colors">Home</Link></li>
                <li aria-hidden>/</li>
                <li className="text-gray-600" aria-current="page">Web Stories</li>
              </ol>
            </nav>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-3">Web Stories</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight mb-4 leading-[1.1]">
              Quick fabric-care guides
            </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed">
              Tap through bite-sized sofa, carpet, and upholstery care stories.
              {all.length > 0 && (
                <> <span className="font-semibold text-gray-700">{all.length} stor{all.length !== 1 ? "ies" : "y"}</span> to explore.</>
              )}
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {all.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-4xl mb-3">📖</p>
              <p>No web stories published yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {stories.map((s) => (
                  // Plain <a>: story URL is an AMP Route Handler, not an RSC page.
                  <a key={s.id} href={`/web-stories/${s.slug}/`}
                    className="group relative block aspect-[9/16] overflow-hidden rounded-2xl bg-gray-900 shadow-sm ring-1 ring-black/5 transition hover:shadow-xl hover:-translate-y-1">
                    {s.posterImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.posterImage} alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                      ▶ {s.slideCount}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-sm font-bold leading-tight text-white drop-shadow line-clamp-3">{s.title}</p>
                    </div>
                  </a>
                ))}
              </div>

              {totalPages > 1 && (
                <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2 text-sm">
                  {page > 1 && (
                    <Link href={pageHref(page - 1)} rel="prev"
                      className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-sky-500 transition">← Previous</Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link key={p} href={pageHref(p)} aria-current={p === page ? "page" : undefined}
                      className={`px-4 py-2 rounded-lg border transition ${p === page ? "border-sky-600 bg-sky-600 text-white" : "border-gray-200 bg-white text-gray-700 hover:border-sky-500"}`}>{p}</Link>
                  ))}
                  {page < totalPages && (
                    <Link href={pageHref(page + 1)} rel="next"
                      className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-sky-500 transition">Next →</Link>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
