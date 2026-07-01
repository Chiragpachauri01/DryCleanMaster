/**
 * app/blog/[slug]/page.jsx
 *
 * Blog detail page for drycleanmaster.in
 * - Full JSON-LD: BlogPosting + BreadcrumbList + FAQPage (conditional)
 * - Dynamic metadata (title, description, OG, Twitter, canonical)
 * - notFound() for missing/unpublished posts
 * - Related posts fetched in parallel (no waterfall)
 */

export const revalidate = 30;

import { notFound }   from "next/navigation";
// Blog content lives in the shared BlogSpot project (quick-cleaning-services-20400),
// which DryClean exposes as `qcsDb` (NOT `adminDb`, DryClean's own bookings project).
import { qcsDb as adminDb } from "@/firebase/firebase.admin";
import { BlogDetailLayout } from "@/components/blog/BlogLayouts";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import {
  toISOString, calcReadingTime, autoExcerpt,
  extractFAQs, addIdsToHeadings,
} from "@/components/blog/BlogUtils";
import "@/app/styles/blog.css";

// ─── Site constants ───────────────────────────────────────────────────────────
const SITE_URL  = "https://drycleanmaster.in";
const SITE_NAME = "Dryclean Master";
const SITE_LOGO = `${SITE_URL}/logo.png`;
const BRAND_ID  = "dryclean-master";

// ─── Firestore helpers ────────────────────────────────────────────────────────
async function getBlogBySlug(slug) {
  try {
    const snap = await adminDb
      .collection("blogs")
      .where("slug",   "==", slug)
      .where("brand",  "==", BRAND_ID)
      .where("status", "==", "published")
      .limit(1)
      .get();
    if (snap.empty) return null;
    const d = snap.docs[0];
    return serialize({ id: d.id, ...d.data() });
  } catch (err) {
    console.error("[blog/[slug]] getBlogBySlug failed:", err);
    return null;
  }
}

async function getAllPublishedBlogs() {
  try {
    const snap = await adminDb
      .collection("blogs")
      .where("brand",  "==", BRAND_ID)
      .where("status", "==", "published")
      .orderBy("createdAt", "desc")
      .get();
    return snap.docs.map((d) => serialize({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

/**
 * serialize() — Firestore document -> plain JSON-safe object.
 */
function serialize(data) {
  const raw = data.content || "";
  const content = addIdsToHeadings(raw);

  return {
    id:          data.id           || "",
    title:       data.title        || "",
    slug:        data.slug         || "",
    excerpt:     data.excerpt      || autoExcerpt(raw),
    content,
    image:       data.image        || "",
    tags:        Array.isArray(data.tags) ? data.tags : [],
    status:      data.status       || "draft",
    readingTime: data.readingTime  || calcReadingTime(raw),
    layout:      data.layout       || "default",
    showTOC:     data.showTOC      ?? false,
    tocPosition: data.tocPosition  || "sidebar",
    seo: {
      metaTitle:       data.seo?.metaTitle       || "",
      metaDescription: data.seo?.metaDescription || "",
      canonicalUrl:    data.seo?.canonicalUrl     || "",
      ogTitle:         data.seo?.ogTitle          || "",
      ogDescription:   data.seo?.ogDescription    || "",
      focusKeyword:    data.seo?.focusKeyword      || "",
    },
    createdAt: toISOString(data.createdAt),
    updatedAt: toISOString(data.updatedAt),
  };
}

// ─── Static params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  try {
    const snap = await adminDb
      .collection("blogs")
      .where("brand",  "==", BRAND_ID)
      .where("status", "==", "published")
      .get();
    return snap.docs.map((d) => ({ slug: d.data().slug || d.id }));
  } catch {
    return [];
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Not Found" };

  const canonical   = blog.seo.canonicalUrl || `${SITE_URL}/blog/${blog.slug}/`;
  const title       = blog.seo.metaTitle       || blog.title;
  const description = blog.seo.metaDescription || blog.excerpt;
  const ogTitle     = blog.seo.ogTitle          || title;
  const ogDesc      = blog.seo.ogDescription    || description;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type:          "article",
      title:         ogTitle,
      description:   ogDesc,
      url:           canonical,
      siteName:      SITE_NAME,
      publishedTime: blog.createdAt,
      modifiedTime:  blog.updatedAt,
      tags:          blog.tags,
      images: blog.image
        ? [{ url: blog.image, width: 1200, height: 630, alt: title }]
        : [{ url: SITE_LOGO,  width: 512,  height: 512,  alt: SITE_NAME }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       ogTitle,
      description: ogDesc,
      images:      blog.image ? [blog.image] : [SITE_LOGO],
    },
    robots: {
      index:  true,
      follow: true,
    },
  };
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
function JsonLd({ blog }) {
  const canonical = blog.seo.canonicalUrl || `${SITE_URL}/blog/${blog.slug}/`;
  const faqs      = extractFAQs(blog.content);
  const wordCount =
    (blog.content || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

  const graph = [
    {
      "@type":       "BlogPosting",
      "@id":         `${canonical}#article`,
      headline:      blog.title,
      description:   blog.excerpt,
      url:           canonical,
      datePublished: blog.createdAt,
      dateModified:  blog.updatedAt || blog.createdAt,
      wordCount,
      timeRequired:  `PT${blog.readingTime || 1}M`,
      inLanguage:    "en-IN",
      ...(blog.image && {
        image: {
          "@type":    "ImageObject",
          url:        blog.image,
          contentUrl: blog.image,
          width:      1200,
          height:     630,
        },
      }),
      keywords: blog.tags.join(", "),
      author: {
        "@type": "Organization",
        "@id":   `${SITE_URL}/#organization`,
        name:    SITE_NAME,
        url:     SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        "@id":   `${SITE_URL}/#organization`,
        name:    SITE_NAME,
        url:     SITE_URL,
        logo:    { "@type": "ImageObject", url: SITE_LOGO },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      isPartOf: {
        "@type": "Blog",
        "@id":   `${SITE_URL}/blog#blog`,
        name:    `${SITE_NAME} Blog`,
        url:     `${SITE_URL}/blog`,
      },
    },
    {
      "@type": "Organization",
      "@id":   `${SITE_URL}/#organization`,
      name:    SITE_NAME,
      url:     SITE_URL,
      logo:    { "@type": "ImageObject", url: SITE_LOGO },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home",     item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog",     item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: blog.title, item: canonical },
      ],
    },
  ];

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id":   `${canonical}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name:    faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  const schema = JSON.parse(
    JSON.stringify({ "@context": "https://schema.org", "@graph": graph })
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  const [blog, allPosts] = await Promise.all([
    getBlogBySlug(slug),
    getAllPublishedBlogs(),
  ]);

  if (!blog || blog.status !== "published") {
    notFound();
  }

  return (
    <>
      <JsonLd blog={blog} />
      <TopBar />
      <Header />
      <BlogDetailLayout blog={blog} allPosts={allPosts} />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
