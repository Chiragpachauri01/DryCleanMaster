/**
 * lib/webstories.js  (server-only)
 *
 * Central read layer for Web Stories. The archive page, the story page, the
 * sitemap, and the <RelatedWebStories /> component all read through here so the
 * Firestore shape and relevance rules live in one place.
 *
 * Strategy: published stories for one brand are a small set, so we fetch them
 * once and filter/rank in memory — no array-contains composite indexes needed.
 */

import "server-only";
// Web Stories are written by the shared BlogSpot admin to the
// quick-cleaning-services-20400 project, which DryClean exposes as `qcsDb`
// (NOT `adminDb`, which is DryClean's own bookings project). Aliased to keep
// the rest of this file identical to the other brands.
import { qcsDb as adminDb } from "@/firebase/firebase.admin";
import { brand } from "@/lib/brand";

const arr = (v) => (Array.isArray(v) ? v : []);

/** Poster for cards: explicit posterImage → thumbnail → first slide image. */
function posterFor(d) {
  if (d.posterImage) return d.posterImage;
  if (d.thumbnail) return d.thumbnail;
  return arr(d.slides).find((s) => s?.image)?.image || "";
}

/** Serialize a Firestore doc into a plain, client-safe story object. */
export function serializeStory(d, id) {
  return {
    id,
    title: d.title || "",
    slug: d.slug || "",
    excerpt: d.excerpt || "",
    shortDescription: d.shortDescription || d.excerpt || "",
    thumbnail: d.thumbnail || "",
    posterImage: posterFor(d),
    serviceCategories: arr(d.serviceCategories),
    locations: arr(d.locations),
    tags: arr(d.tags),
    priority: typeof d.priority === "number" ? d.priority : 0,
    slideCount: arr(d.slides).length,
    slides: arr(d.slides).map((s) => ({
      heading: s.heading || "",
      body: s.body || "",
      image: s.image || "",
      alt: s.alt || s.heading || "",
      cta: { label: s?.cta?.label || "", url: s?.cta?.url || "" },
    })),
    status: d.status || "draft",
    publishedAt: d.publishedAt?.toDate?.()?.toISOString() ?? d.createdAt?.toDate?.()?.toISOString() ?? null,
    createdAt: d.createdAt?.toDate?.()?.toISOString() ?? null,
    updatedAt: d.updatedAt?.toDate?.()?.toISOString() ?? null,
  };
}

/** All published stories for this brand, newest first. */
export async function getPublishedStories() {
  try {
    const snap = await adminDb
      .collection("webstories")
      .where("brand", "==", brand.id)
      .where("status", "==", "published")
      .orderBy("createdAt", "desc")
      .get();
    return snap.docs.map((d) => serializeStory(d.data(), d.id));
  } catch (err) {
    console.error("[webstories] getPublishedStories failed:", err);
    return [];
  }
}

/** A single published story by slug, or null. */
export async function getStoryBySlug(slug) {
  try {
    const snap = await adminDb
      .collection("webstories")
      .where("slug", "==", slug)
      .where("brand", "==", brand.id)
      .where("status", "==", "published")
      .limit(1)
      .get();
    if (snap.empty) return null;
    const d = snap.docs[0];
    return serializeStory(d.data(), d.id);
  } catch (err) {
    console.error("[webstories] getStoryBySlug failed:", err);
    return null;
  }
}

// Rank by priority (desc), then recency (desc) — used within each relevance tier.
const byPriorityThenRecency = (a, b) =>
  (b.priority - a.priority) || ((b.publishedAt || "") < (a.publishedAt || "") ? -1 : 1);

/**
 * Related stories for a context, applying the relevance cascade:
 *   1. service category → 2. category+location → 3. category-only → 4. tags.
 * Never pads with unrelated stories. Excludes excludeSlug. pageType "home"
 * (or no category/tags) returns highest-priority / newest.
 */
export async function getRelatedStories(opts = {}) {
  const {
    pageType = "home",
    serviceCategory,
    location,
    tags = [],
    excludeSlug,
    max = 6,
    pool,
  } = opts;

  const all = (pool || (await getPublishedStories())).filter((s) => s.slug !== excludeSlug);

  if (pageType === "home" || (!serviceCategory && (!tags || tags.length === 0))) {
    return [...all].sort(byPriorityThenRecency).slice(0, max);
  }

  const picked = [];
  const seen = new Set();
  const take = (list) => {
    for (const s of [...list].sort(byPriorityThenRecency)) {
      if (picked.length >= max) break;
      if (seen.has(s.slug)) continue;
      seen.add(s.slug);
      picked.push(s);
    }
  };

  const inCategory = serviceCategory
    ? all.filter((s) => s.serviceCategories.includes(serviceCategory))
    : [];

  if (serviceCategory && location) {
    take(inCategory.filter((s) => s.locations.includes(location)));
  }

  if (pageType === "location") {
    return picked.slice(0, max);
  }

  if (serviceCategory) take(inCategory);

  if (picked.length < max && tags.length) {
    const tagSet = new Set(tags);
    take(all.filter((s) => s.tags.some((t) => tagSet.has(t))));
  }

  return picked.slice(0, max);
}
