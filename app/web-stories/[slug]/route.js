/**
 * app/web-stories/[slug]/route.js
 *
 * Serves the Web Story as a valid, SELF-CANONICAL AMP document directly at its
 * public URL (/web-stories/<slug>/) — the setup Google Web Stories requires for
 * the Discover "Stories" carousel and Search "Visual Stories".
 *
 * A Route Handler (not page.jsx) so we return the exact <html ⚡> bytes with no
 * Next.js runtime scripts/CSS and no site layout (navbar/footer) — correct for
 * an immersive standalone story. `amp-story` provides the interactive player
 * UX natively, so no custom React slider is needed.
 */

import { getStoryBySlug, getPublishedStories } from "@/lib/webstories";
import { brand, logoUrl } from "@/lib/brand";

export const revalidate = 30;
export const dynamicParams = true;

const SITE_URL  = brand.siteUrl;
const SITE_NAME = brand.name;

const storyUrl = (slug) => `${SITE_URL}/web-stories/${slug}/`;

export async function generateStaticParams() {
  const stories = await getPublishedStories();
  return stories.map((s) => ({ slug: s.slug }));
}

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slidePageHtml(slide, i) {
  const id = `s-${i + 1}`;
  const img = slide.image
    ? `<amp-img src="${esc(slide.image)}" width="720" height="1280" layout="fill" alt="${esc(slide.alt || slide.heading || "")}"></amp-img>`
    : "";
  const heading = slide.heading ? `<h2 class="title">${esc(slide.heading)}</h2>` : "";
  const body = slide.body ? `<p class="body">${esc(slide.body)}</p>` : "";
  const cta =
    i > 0 && slide.cta?.label && slide.cta?.url
      ? `<amp-story-cta-layer>
           <a href="${esc(slide.cta.url)}" class="cta" target="_blank" rel="noopener">${esc(slide.cta.label)}</a>
         </amp-story-cta-layer>`
      : "";

  return `
    <amp-story-page id="${id}">
      <amp-story-grid-layer template="fill">
        ${img}
      </amp-story-grid-layer>
      <amp-story-grid-layer template="vertical" class="overlay">
        <div class="text-wrap">
          ${heading}
          ${body}
        </div>
      </amp-story-grid-layer>
      ${cta}
    </amp-story-page>`;
}

function buildAmp(story) {
  const canonical = storyUrl(story.slug); // SELF-canonical
  const poster = story.posterImage || story.slides.find((s) => s.image)?.image || logoUrl;
  const publisherLogo = logoUrl;
  const description = story.shortDescription || story.excerpt || story.title;
  const pages = story.slides.map((s, i) => slidePageHtml(s, i)).join("\n");

  const firstImage = story.slides.find((s) => s.image)?.image || "";
  const preloadFirst = firstImage ? `<link rel="preload" as="image" href="${esc(firstImage)}">` : "";

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description,
    image: [poster],
    datePublished: story.publishedAt || story.createdAt,
    dateModified: story.updatedAt || story.publishedAt || story.createdAt,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: publisherLogo },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Web Stories", item: `${SITE_URL}/web-stories/` },
      { "@type": "ListItem", position: 3, name: story.title, item: canonical },
    ],
  };

  return `<!doctype html>
<html ⚡ lang="en">
<head>
  <meta charset="utf-8">
  <title>${esc(story.title)} | ${esc(SITE_NAME)}</title>
  <link rel="canonical" href="${esc(canonical)}">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta name="description" content="${esc(description)}">
  <link rel="preconnect" href="https://firebasestorage.googleapis.com" crossorigin>
  <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com">
  ${preloadFirst}
  <meta property="og:type" content="article">
  <meta property="og:title" content="${esc(story.title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:image" content="${esc(poster)}">
  <meta name="twitter:card" content="summary_large_image">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <style amp-custom>
    amp-story { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
    .overlay { background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.35) 100%); }
    .text-wrap { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px; }
    .title { color: #fff; font-size: 1.7rem; font-weight: 800; line-height: 1.15; margin: 0 0 8px; text-shadow: 0 2px 8px rgba(0,0,0,.5); }
    .body { color: rgba(255,255,255,.9); font-size: 0.95rem; line-height: 1.5; margin: 0; text-shadow: 0 1px 4px rgba(0,0,0,.5); }
    .cta { background: #fff; color: ${brand.accent}; font-weight: 700; padding: 10px 22px; border-radius: 999px; text-decoration: none; font-size: 0.9rem; }
  </style>
  <script type="application/ld+json">${JSON.stringify(article)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
</head>
<body>
  <amp-story standalone
    title="${esc(story.title)}"
    publisher="${esc(SITE_NAME)}"
    publisher-logo-src="${esc(publisherLogo)}"
    poster-portrait-src="${esc(poster)}">
    ${pages}
  </amp-story>
</body>
</html>`;
}

export async function GET(_req, { params }) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story || story.status !== "published" || story.slides.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(buildAmp(story), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=86400",
    },
  });
}
